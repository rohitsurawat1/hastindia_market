import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { toast } from 'react-hot-toast'
import { Heart, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    <Card className="overflow-hidden">
      <Link href={`/product/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-square">
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
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h2>
          <Badge variant="secondary" className="mb-2">{product.category}</Badge>
          <p className="text-xl font-bold">₹{product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

