'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SellerAnalytics() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [timeFrame, setTimeFrame] = useState('weekly')
  const [analyticsData, setAnalyticsData] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
  })

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  useEffect(() => {
    calculateAnalytics()
  }, [orders, timeFrame])

  const fetchOrders = async () => {
    const ordersQuery = query(collection(db, 'orders'), where('sellerId', '==', user.uid))
    const ordersSnapshot = await getDocs(ordersQuery)
    const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setOrders(ordersList)
  }

  const calculateAnalytics = () => {
    const now = new Date()
    const timeFrames = {
      weekly: 7,
      monthly: 30,
      yearly: 365
    }
    const daysToShow = timeFrames[timeFrame]

    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt.seconds * 1000)
      return (now - orderDate) / (1000 * 60 * 60 * 24) <= daysToShow
    })

    const totalSales = filteredOrders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = filteredOrders.length
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

    const productSales = {}
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        if (productSales[item.productId]) {
          productSales[item.productId].quantity += item.quantity
          productSales[item.productId].total += item.price * item.quantity
        } else {
          productSales[item.productId] = {
            name: item.name,
            quantity: item.quantity,
            total: item.price * item.quantity
          }
        }
      })
    })

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

    setAnalyticsData({
      totalSales,
      totalOrders,
      averageOrderValue,
      topProducts,
    })
  }

  const prepareChartData = () => {
    const now = new Date()
    const timeFrames = {
      weekly: 7,
      monthly: 30,
      yearly: 12
    }
    const daysToShow = timeFrames[timeFrame]

    const salesByPeriod = {}
    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
      const key = timeFrame === 'yearly' 
        ? date.toLocaleString('default', { month: 'short' }) 
        : date.toISOString().split('T')[0]
      salesByPeriod[key] = 0
    }

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt.seconds * 1000)
      const key = timeFrame === 'yearly'
        ? orderDate.toLocaleString('default', { month: 'short' })
        : orderDate.toISOString().split('T')[0]
      if (salesByPeriod.hasOwnProperty(key)) {
        salesByPeriod[key] += order.total
      }
    })

    return Object.entries(salesByPeriod).map(([date, sales]) => ({ date, sales })).reverse()
  }

  const chartData = prepareChartData()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{analyticsData.totalSales.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analyticsData.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{analyticsData.averageOrderValue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Coming Soon</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Sales Over Time</h2>
        <div className="mb-4">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Top Products</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analyticsData.topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" name="Total Sales" />
            <Bar dataKey="quantity" fill="#82ca9d" name="Quantity Sold" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

