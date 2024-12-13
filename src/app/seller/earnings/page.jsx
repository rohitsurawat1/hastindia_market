'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function SellerEarnings() {
  const { user } = useAuth()
  const [earningsData, setEarningsData] = useState({
    totalEarnings: 0,
    monthlyEarnings: [],
    recentTransactions: []
  })

  useEffect(() => {
    const fetchEarningsData = async () => {
      if (user) {
        try {
          const ordersQuery = query(
            collection(db, 'orders'),
            where('sellerId', '==', user.uid),
            orderBy('createdAt', 'desc')
          )
          const ordersSnapshot = await getDocs(ordersQuery)
          const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

          const totalEarnings = orders.reduce((sum, order) => sum + order.total, 0)

          const monthlyEarnings = orders.reduce((acc, order) => {
            const date = new Date(order.createdAt.seconds * 1000)
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`
            const existingEntry = acc.find(entry => entry.month === monthYear)
            if (existingEntry) {
              existingEntry.earnings += order.total
            } else {
              acc.push({ month: monthYear, earnings: order.total })
            }
            return acc
          }, [])

          const recentTransactions = orders.slice(0, 10).map(order => ({
            id: order.id,
            date: new Date(order.createdAt.seconds * 1000).toLocaleDateString(),
            amount: order.total
          }))

          setEarningsData({
            totalEarnings,
            monthlyEarnings,
            recentTransactions
          })
        } catch (error) {
          console.error('Error fetching earnings data:', error)
        }
      }
    }

    fetchEarningsData()
  }, [user])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Earnings</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">₹{earningsData.totalEarnings.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData.monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {earningsData.recentTransactions.map(transaction => (
              <li key={transaction.id} className="mb-2">
                {transaction.date} - ₹{transaction.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

