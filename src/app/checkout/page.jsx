'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-hot-toast'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [shippingDetails, setShippingDetails] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Here you would typically send the order details to your server
    // The server would create an order in Razorpay and return the order ID
    // For this example, we'll simulate this process
    
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: cartTotal * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "HastIndia",
      description: "Purchase from HastIndia",
      order_id: "order_" + Math.random().toString(36).substr(2, 9), // This should come from your server
      handler: function (response) {
        // Handle successful payment
        toast.success("Payment successful!")
        clearCart()
        router.push('/order-confirmation')
        // Here you would typically update your database with the order details
      },
      prefill: {
        name: shippingDetails.name,
        email: shippingDetails.email,
        contact: shippingDetails.phone,
      },
      theme: {
        color: "#F97316",
      },
    }

    const razorpay = new window.Razorpay(options)
    razorpay.open()
  }

  if (cart.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={shippingDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={shippingDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={shippingDetails.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                name="pincode"
                value={shippingDetails.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={shippingDetails.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">Place Order</Button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

