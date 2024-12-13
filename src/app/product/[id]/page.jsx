'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'react-hot-toast'
import { Heart, Star, Minus, Plus, ShoppingCart, ChevronRight, Truck } from 'lucide-react'
import ReviewList from '@/components/ReviewList'
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', id))
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() })
        } else {
          toast.error('Product not found')
        }

        // Fetch reviews (implement this part based on your API)
        // const reviewsData = await fetchReviews(id)
        // setReviews(reviewsData)

      } catch (error) {
        console.error('Error fetching product and reviews:', error)
        toast.error('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProductAndReviews()
  }, [id])

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart`)
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success(`${product.name} removed from wishlist`)
    } else {
      addToWishlist(product)
      toast.success(`${product.name} added to wishlist`)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-96 w-full mb-4"></div>
          <div className="bg-gray-300 h-8 w-3/4 mb-4"></div>
          <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
          <div className="bg-gray-300 h-4 w-full mb-4"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p>Sorry, the product you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 space-y-6">
          <div className="flex gap-4">
            <div className="w-1/5">
              <ScrollArea className="h-[400px]">
                <div className="flex flex-col space-y-4">
                  {product.images?.map((image, index) => (
                    <button
                      key={index}
                      className={`relative w-full aspect-square rounded-md overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="w-4/5">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.images?.[currentImageIndex] || product.imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <Button variant="outline">
                Write a Review
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <ReviewList reviews={reviews} />
          </div>
        </div>
        <div className="lg:w-1/2 space-y-6">
          <div>
            <Link href={`/shop/${product.category.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-500 hover:underline">
              {product.category}
            </Link>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({reviews ? reviews.length : 0} {reviews && reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-4xl font-bold text-primary mb-2">₹{product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Local taxes included (where applicable)</p>
            <p className="text-sm font-medium mt-2">
              {product.stock > 0 ? (
                <span className="text-green-600">In stock</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-12 text-center border-0 p-0 h-8"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleAddToCart} 
                disabled={product.stock === 0} 
                className="flex-grow"
                size="lg"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button 
                onClick={handleWishlistToggle} 
                variant={isInWishlist(product.id) ? "secondary" : "outline"}
                size="lg"
                className="w-12 flex-shrink-0"
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="font-semibold">Highlights</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Handmade item</li>
              <li>Made to order</li>
              <li>Dispatches from a small business in India</li>
            </ul>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="font-semibold">Shipping</h3>
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="w-5 h-5" />
              <span>Estimated delivery: 5-7 business days</span>
            </div>
            <p className="text-sm text-gray-700">Cost to ship: ₹150 within India</p>
          </div>
        </div>
      </div>
    </div>
  )
}

