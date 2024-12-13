'use client'

import { Star, ThumbsUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-center text-gray-500">No reviews yet. Be the first to review this product!</p>
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div key={review.id}>
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={review.userAvatar} alt={review.userName} />
              <AvatarFallback>{review.userName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt?.seconds * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful
              </Button>
            </div>
          </div>
          {index < reviews.length - 1 && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  )
}

