'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await resetPassword(email)
      toast.success('Password reset email sent. Check your inbox.')
    } catch (error) {
      console.error('Password reset error:', error)
      toast.error('Failed to send password reset email. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Send Reset Link</Button>
        </form>
        <div className="mt-6 text-center">
          <p>Remember your password? <Link href="/login" className="text-blue-600 hover:underline">Log in here</Link></p>
        </div>
      </div>
    </div>
  )
}

