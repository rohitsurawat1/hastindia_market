'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from 'react-hot-toast'
import { Star } from 'lucide-react'

export default function ReviewForm({ productId, onReviewAdded, onReviewUpdated, reviewToEdit }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating)
      setComment(reviewToEdit.comment)
    }
  }, [reviewToEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('You must be logged in to leave a review')
      return
    }
    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }

    try {
      const method = reviewToEdit ? 'PUT' : 'POST'
      const url = reviewToEdit ? `/api/reviews` : '/api/reviews'
      const body = reviewToEdit
        ? { id: reviewToEdit.id, rating, comment }
        : { productId, userId: user.uid, rating, comment }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error('Failed to submit review')
      }

      const newReview = await response.json()
      toast.success(reviewToEdit ? 'Review updated successfully' : 'Review submitted successfully')
      setRating(0)
      setComment('')
      reviewToEdit ? onReviewUpdated(newReview) : onReviewAdded(newReview)
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error('Failed to submit review. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="mb-2">Rating:</p>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <Star className="w-6 h-6" fill={star <= rating ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Textarea
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>
      <Button type="submit">{reviewToEdit ? 'Update Review' : 'Submit Review'}</Button>
    </form>
  )
}

