'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { Search, ShoppingCart, User, Heart, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const Header = () => {
  const { user, signOut } = useAuth()
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalWishlistItems = wishlist.length

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            HastIndia
          </Link>
          
          <div className="hidden md:flex items-center space-x-4 flex-grow justify-center">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <Input
                type="text"
                placeholder="Search for anything"
                className="w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </form>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="text-foreground hover:text-primary transition-colors relative">
              <Heart className="h-6 w-6" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalWishlistItems}
                </span>
              )}
            </Link>
            <Link href="/cart" className="text-foreground hover:text-primary transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalCartItems}
                </span>
              )}
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <User className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => router.push('/profile')}>
                    Your Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push('/orders')}>
                    Your Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push('/wishlist')}>
                    Your Wishlist
                  </DropdownMenuItem>
                  {user.role === 'seller' && (
                    <DropdownMenuItem onSelect={() => router.push('/seller/dashboard')}>
                      Seller Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onSelect={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        
        <nav className="mt-4 hidden md:flex justify-center space-x-6">
          <Link href="/shop" className="text-foreground hover:text-primary transition-colors">Shop All</Link>
          <Link href="/artisan-spotlight" className="text-foreground hover:text-primary transition-colors">Artisan Spotlight</Link>
          <Link href="/categories" className="text-foreground hover:text-primary transition-colors">Categories</Link>
          <Link href="/gifts" className="text-foreground hover:text-primary transition-colors">Gifts</Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">About Us</Link>
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden absolute top-4 right-4">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
              <Link href="/shop" className="text-foreground hover:text-primary transition-colors">Shop All</Link>
              <Link href="/artisan-spotlight" className="text-foreground hover:text-primary transition-colors">Artisan Spotlight</Link>
              <Link href="/categories" className="text-foreground hover:text-primary transition-colors">Categories</Link>
              <Link href="/gifts" className="text-foreground hover:text-primary transition-colors">Gifts</Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/wishlist" className="text-foreground hover:text-primary transition-colors">Wishlist</Link>
              <Link href="/cart" className="text-foreground hover:text-primary transition-colors">Cart</Link>
              {user ? (
                <>
                  <Link href="/profile" className="text-foreground hover:text-primary transition-colors">Your Profile</Link>
                  <Link href="/orders" className="text-foreground hover:text-primary transition-colors">Your Orders</Link>
                  {user.role === 'seller' && (
                    <Link href="/seller/dashboard" className="text-foreground hover:text-primary transition-colors">Seller Dashboard</Link>
                  )}
                  <button onClick={signOut} className="text-foreground hover:text-primary transition-colors text-left">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-foreground hover:text-primary transition-colors">Sign In</Link>
                  <Link href="/register" className="text-foreground hover:text-primary transition-colors">Register</Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header

