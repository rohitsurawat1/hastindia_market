import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function OrderConfirmation() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-xl mb-8">Your order has been successfully placed and is being processed.</p>
      <Button asChild>
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </div>
  )
}

