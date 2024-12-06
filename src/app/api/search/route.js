import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get('q')

  if (!searchTerm) {
    return NextResponse.json({ error: 'Search term is required' }, { status: 400 })
  }

  try {
    const productsRef = collection(db, 'products')
    const q = query(
      productsRef,
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    )
    const querySnapshot = await getDocs(q)
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'An error occurred while searching' }, { status: 500 })
  }
}

