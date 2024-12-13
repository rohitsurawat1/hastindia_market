'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

export default function ArtisanProfile() {
  const { id } = useParams()
  const [artisan, setArtisan] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtisanAndProducts = async () => {
      try {
        const artisanDoc = await getDoc(doc(db, 'artisans', id))
        if (artisanDoc.exists()) {
          setArtisan({ id: artisanDoc.id, ...artisanDoc.data() })

          // Fetch associated products
          const productsQuery = query(collection(db, 'products'), where('artisanId', '==', id))
          const productsSnapshot = await getDocs(productsQuery)
          const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setProducts(productsList)
        } else {
          console.error('Artisan not found')
        }
      } catch (error) {
        console.error('Error fetching artisan and products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtisanAndProducts()
  }, [id])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading artisan profile...</div>
  }

  if (!artisan) {
    return <div className="container mx-auto px-4 py-8">Artisan not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
            <Image
              src={artisan.imageUrl || '/placeholder.svg?height=200&width=200'}
              alt={artisan.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{artisan.name}</h1>
          <p className="text-xl text-gray-600 mb-2">{artisan.craft}</p>
          <p className="text-gray-500">{artisan.location}</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About the Artisan</h2>
          <p className="text-gray-700">{artisan.bio}</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Artisan's Products</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No products available at the moment.</p>
          )}
        </div>
        <div className="text-center">
          <Button asChild>
            <Link href="/shop">Explore More Artisan Products</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

