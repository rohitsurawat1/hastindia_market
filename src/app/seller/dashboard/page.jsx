'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function SellerDashboard() {
  const { user } = useAuth()
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentOrders: [],
    salesData: []
  })

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'seller') {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user) {
        try {
          // Fetch total sales and orders
          const ordersQuery = query(collection(db, 'orders'), where('sellerId', '==', user.uid))
          const ordersSnapshot = await getDocs(ordersQuery)
          const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
          const totalOrders = orders.length

          // Fetch total products
          const productsQuery = query(collection(db, 'products'), where('sellerId', '==', user.uid))
          const productsSnapshot = await getDocs(productsQuery)
          const totalProducts = productsSnapshot.size

          // Fetch recent orders
          const recentOrdersQuery = query(
            collection(db, 'orders'),
            where('sellerId', '==', user.uid),
            orderBy('createdAt', 'desc'),
            limit(5)
          )
          const recentOrdersSnapshot = await getDocs(recentOrdersQuery)
          const recentOrders = recentOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

          // Prepare sales data for chart
          const salesData = orders.reduce((acc, order) => {
            const date = new Date(order.createdAt.seconds * 1000).toLocaleDateString()
            const existingEntry = acc.find(entry => entry.date === date)
            if (existingEntry) {
              existingEntry.sales += order.total
            } else {
              acc.push({ date, sales: order.total })
            }
            return acc
          }, [])

          setDashboardData({
            totalSales,
            totalOrders,
            totalProducts,
            recentOrders,
            salesData
          })
        } catch (error) {
          console.error('Error fetching dashboard data:', error)
        }
      }
    }

    fetchDashboardData()
  }, [user])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'seller') {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{dashboardData.totalSales.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.totalProducts}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {dashboardData.recentOrders.map(order => (
                <li key={order.id} className="mb-2">
                  <Link href={`/seller/orders/${order.id}`} className="text-blue-600 hover:underline">
                    Order #{order.id.slice(-6)} - ₹{order.total.toFixed(2)}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-4">
              <Link href="/seller/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

