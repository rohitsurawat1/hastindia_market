import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { toast } from 'react-hot-toast'
import { Heart } from 'lucide-react'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success(`${product.name} removed from wishlist`)
    } else {
      addToWishlist(product)
      toast.success(`${product.name} added to wishlist`)
    }
  }

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative h-48">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.category}</p>
          <p className="text-xl font-bold mb-4">₹{product.price.toFixed(2)}</p>
          <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>
        </div>
      </div>
    </Link>
  )
}

