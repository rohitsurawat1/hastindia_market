'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-hot-toast'

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function SellerOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    if (user) {
      const ordersQuery = query(collection(db, 'orders'), where('sellerId', '==', user.uid))
      const ordersSnapshot = await getDocs(ordersQuery)
      const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setOrders(ordersList)
    }
  }

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus })
      fetchOrders()
      toast.success('Order status updated successfully')
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.error('Failed to update order status')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id.slice(0, 8)}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</TableCell>
              <TableCell>₹{order.total.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(newStatus) => handleUpdateOrderStatus(order.id, newStatus)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

