'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchTerm) {
      searchProducts(searchTerm)
    }
  }, [searchTerm])

  const searchProducts = async (term) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`)
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error('Error searching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      searchProducts(searchTerm.trim())
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <Input
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  )
}

