'use client'

import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/contexts/CartContext'
import ProductCard from '@/components/ProductCard'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
    toast.success(`${product.name} moved to cart`)
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
        <p className="text-xl mb-8">Your wishlist is empty.</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            <Button 
              onClick={() => handleMoveToCart(product)}
              className="absolute top-2 left-2 z-10 bg-white text-orange-600 hover:bg-orange-100"
            >
              Move to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

