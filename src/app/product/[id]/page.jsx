'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { Button } from "@/components/ui/button"
import { toast } from 'react-hot-toast'
import { Heart, Star } from 'lucide-react'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastVisible, setLastVisible] = useState(null)
  const [sortBy, setSortBy] = useState('createdAt')
  const [reviewToEdit, setReviewToEdit] = useState(null)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const fetchReviews = async (lastVisibleId = null) => {
    try {
      const response = await fetch(`/api/reviews?productId=${id}&lastVisible=${lastVisibleId}&sortBy=${sortBy}`)
      const data = await response.json()
      if (lastVisibleId) {
        setReviews(prevReviews => [...prevReviews, ...data.reviews])
      } else {
        setReviews(data.reviews || [])
      }
      setLastVisible(data.lastVisibleId)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast.error('Failed to load reviews')
    }
  }

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', id))
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() })
        } else {
          toast.error('Product not found')
        }

        await fetchReviews()
      } catch (error) {
        console.error('Error fetching product and reviews:', error)
        toast.error('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProductAndReviews()
  }, [id, sortBy])

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} added to cart`)
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

  const handleReviewAdded = (newReview) => {
    setReviews(prevReviews => [newReview, ...(prevReviews || [])])
  }

  const handleReviewUpdated = (updatedReview) => {
    setReviews(prevReviews =>
      (prevReviews || []).map(review =>
        review.id === updatedReview.id ? updatedReview : review
      )
    )
    setReviewToEdit(null)
  }

  const handleLoadMore = () => {
    if (lastVisible) {
      fetchReviews(lastVisible)
    }
  }

  const handleEditReview = (review) => {
    setReviewToEdit(review)
  }

  const handleDeleteReview = (reviewId) => {
    setReviews(prevReviews => (prevReviews || []).filter(review => review.id !== reviewId))
  }

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy)
    setLastVisible(null)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-64 w-full mb-4"></div>
          <div className="bg-gray-300 h-8 w-3/4 mb-4"></div>
          <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
          <div className="bg-gray-300 h-4 w-full mb-4"></div>
          <div className="bg-gray-300 h-4 w-full mb-4"></div>
          <div className="bg-gray-300 h-10 w-32"></div>
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="relative h-96 md:h-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({reviews ? reviews.length : 0} {reviews && reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
          <p className="text-xl font-semibold mb-4">₹{product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">Category: {product.category}</p>
          <p className="mb-4">In Stock: {product.stock}</p>
          <div className="flex space-x-4">
            <Button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-grow">
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button 
              onClick={handleWishlistToggle} 
              variant="outline"
              className={`p-2 ${isInWishlist(product.id) ? 'bg-red-100' : ''}`}
            >
              <Heart className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <ReviewList 
          reviews={reviews || []}
          onLoadMore={handleLoadMore} 
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            {reviewToEdit ? 'Edit Your Review' : 'Write a Review'}
          </h3>
          <ReviewForm 
            productId={product.id} 
            onReviewAdded={handleReviewAdded} 
            onReviewUpdated={handleReviewUpdated}
            reviewToEdit={reviewToEdit}
          />
        </div>
      </div>
    </div>
  )
}

