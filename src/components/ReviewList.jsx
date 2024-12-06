'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Star, Edit, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-hot-toast'

export default function ReviewList({ reviews, onLoadMore, onEdit, onDelete, sortBy, onSortChange }) {
  const { user } = useAuth()
  const [expandedReviews, setExpandedReviews] = useState({})

  const toggleExpand = (reviewId) => {
    setExpandedReviews(prev => ({ ...prev, [reviewId]: !prev[reviewId] }))
  }

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews?id=${reviewId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete review')
      }

      onDelete(reviewId)
      toast.success('Review deleted successfully')
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.error('Failed to delete review. Please try again.')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Most Recent</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt?.seconds * 1000).toLocaleDateString()}
              </span>
            </div>
            {user && user.uid === review.userId && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(review)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(review.id)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          <p className={`text-gray-700 ${expandedReviews[review.id] ? '' : 'line-clamp-3'}`}>
            {review.comment}
          </p>
          {review.comment.length > 150 && (
            <button
              onClick={() => toggleExpand(review.id)}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              {expandedReviews[review.id] ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      ))}
      {reviews.length > 0 && (
        <Button onClick={onLoadMore} variant="outline" className="w-full">
          Load More Reviews
        </Button>
      )}
    </div>
  )
}

