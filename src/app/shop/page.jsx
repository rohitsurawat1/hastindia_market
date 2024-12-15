'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
// import { collection, getDocs } from 'firebase/firestore'
// import { db } from '@/lib/firebase'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dummy data for products
    const dummyProducts = [
      { id: '1', name: 'Handcrafted Vase', category: 'Home Decor', price: 29.99 },
      { id: '2', name: 'Artisan Necklace', category: 'Jewelry', price: 49.99 },
      { id: '3', name: 'Wooden Sculpture', category: 'Art', price: 99.99 },
      { id: '4', name: 'Ceramic Bowl', category: 'Kitchenware', price: 19.99 },
    ]

    setProducts(dummyProducts)
    setFilteredProducts(dummyProducts)

    // Extract unique categories from dummy data
    const uniqueCategories = [...new Set(dummyProducts.map(product => product.category))]
    setCategories(uniqueCategories)

    setLoading(false)

    // Uncomment and implement Firebase fetching logic
    // const fetchProducts = async () => {
    //   const productsCollection = collection(db, 'products')
    //   const productsSnapshot = await getDocs(productsCollection)
    //   const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    //   setProducts(productsList)
    //   setFilteredProducts(productsList)
    //   const uniqueCategories = [...new Set(productsList.map(product => product.category))]
    //   setCategories(uniqueCategories)
    //   setLoading(false)
    // }
    // fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    )
    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products])

  const handleAddToCart = (productId) => {
    console.log(`Add to cart: ${productId}`)
  }

  const handleAddToWishlist = (productId) => {
    console.log(`Add to wishlist: ${productId}`)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading products...</div>
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-12">Explore Our Collection</h1>

        <div className="flex flex-col md:flex-row justify-center items-center mb-12 gap-6">
          <div className="w-full md:w-1/3">
            <Input
              id="search"
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="w-full md:w-1/3">
            <Select 
              value={selectedCategory} 
              onValueChange={(value) => setSelectedCategory(value === 'all' ? '' : value)}
            >
              <SelectTrigger id="category" className="border-2 border-gray-300 rounded-lg p-2">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-xl">No products found. Try a different search or category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
                <ProductCard product={product} />
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleAddToCart(product.id)} className="bg-blue-500 text-white rounded-lg px-4 py-2">Add to Cart</Button>
                  <Button onClick={() => handleAddToWishlist(product.id)} className="bg-green-500 text-white rounded-lg px-4 py-2">Wishlist</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}