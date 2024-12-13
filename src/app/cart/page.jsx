'use client'

import { useCart } from '@/contexts/CartContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1")
      return
    }
    updateQuantity(productId, newQuantity)
  }

  const handleRemove = (productId) => {
    removeFromCart(productId)
    toast.success("Item removed from cart")
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <p className="text-xl mb-4">Your cart is empty.</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <div className="w-24 h-24 relative mr-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 mx-2 text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="ml-4"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>₹0.00</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
            <span>Total:</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <Button asChild className="w-full mt-4">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

