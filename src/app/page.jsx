'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Heart, ShoppingCart } from 'lucide-react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 400) // Adjust this value as needed
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 relative">
        <div className="relative h-[600px] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9"
            alt="Handcrafted Indian products"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Discover Unique Indian Handicrafts</h1>
            <p className="text-xl md:text-2xl mb-8 text-center">Handmade with love, delivered to your doorstep</p>
            <div className={`w-full max-w-md transition-all duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for anything"
                  className="w-full pl-10 pr-4 py-2 rounded-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338' },
            { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38' },
            { name: 'Clothing', image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de' },
            { name: 'Art', image: 'https://images.unsplash.com/photo-1579783483458-83d02161294e' },
            { name: 'Accessories', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d' },
            { name: 'Pottery', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa' },
          ].map((category) => (
            <Link key={category.name} href={`/shop/${category.name.toLowerCase().replace(' ', '-')}`} className="group">
              <div className="relative h-32 rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-200 flex items-center justify-center">
                  <h3 className="text-white text-lg font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, name: 'Handwoven Silk Scarf', price: 2999, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d' },
            { id: 2, name: 'Brass Dhokra Figurine', price: 1499, image: 'https://images.unsplash.com/photo-1610464747759-0063071c7ca6' },
            { id: 3, name: 'Madhubani Painting', price: 3999, image: 'https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9' },
            { id: 4, name: 'Handcrafted Leather Bag', price: 4999, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7' },
          ].map((product) => (
            <Card key={product.id} className="group">
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Button size="icon" variant="secondary" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Artisan Name</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">₹{product.price}</span>
                    <Badge variant="secondary">New</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Shops */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Shops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, name: 'Rajasthani Textiles', products: 120, image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0' },
            { id: 2, name: 'Kerala Crafts', products: 85, image: 'https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9' },
            { id: 3, name: 'Bengal Pottery', products: 150, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa' },
            { id: 4, name: 'Madhubani Art Gallery', products: 200, image: 'https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9' },
          ].map((shop) => (
            <Link key={shop.id} href={`/shop/${shop.id}`} className="group">
              <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <h3 className="font-semibold">{shop.name}</h3>
              <p className="text-sm text-gray-500">{shop.products}+ products</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sell on HastIndia */}
      <section className="mb-12">
        <div className="bg-primary/10 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Sell on HastIndia</h2>
            <p className="text-xl mb-6 text-muted-foreground">Join our community of artisans and reach customers worldwide</p>
          </div>
          <Button asChild size="lg">
            <Link href="/sell/start-selling">Start Selling</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

