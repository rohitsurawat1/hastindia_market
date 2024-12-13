'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

export default function OrderHistory({ userId }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      const orderData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrders(orderData)
      setLoading(false)
    }

    fetchOrders()
  }, [userId])

  if (loading) {
    return <div>Loading order history...</div>
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Order #{order.id.slice(-6)}</h3>
            <span className="text-gray-500">{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</span>
          </div>
          <p>Total: ₹{order.total.toFixed(2)}</p>
          <p>Status: {order.status}</p>
          <Link href={`/order/${order.id}`} className="text-blue-600 hover:underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}

