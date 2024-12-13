'use client'

import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import ProductCard from '@/components/ProductCard'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Shop() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'))
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProducts(productsData)

        // Set initial price range
        const prices = productsData.map(product => product.price)
        setPriceRange([Math.min(...prices), Math.max(...prices)])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
  }, [products, searchTerm, selectedCategories, priceRange])

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setPriceRange([0, 10000])
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading products...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Our Collection</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 space-y-6">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block">Categories</Label>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label
                    htmlFor={category}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div>
            <Label>Price Range</Label>
            <div className="flex justify-between mb-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
          <Button onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>

        <Separator orientation="vertical" className="hidden lg:block" />

        <div className="w-full lg:w-3/4">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found matching your criteria.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

