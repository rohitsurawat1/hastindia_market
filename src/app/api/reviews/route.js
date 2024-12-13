import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, query, where, getDocs, serverTimestamp, orderBy, limit, startAfter, updateDoc, deleteDoc, doc } from 'firebase/firestore'

export async function POST(request) {
  const { productId, userId, rating, comment } = await request.json()

  if (!productId || !userId || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const reviewData = {
      productId,
      userId,
      rating,
      comment,
      createdAt: serverTimestamp(),
      isApproved: false, // Add moderation status
    }

    const docRef = await addDoc(collection(db, 'reviews'), reviewData)

    return NextResponse.json({ id: docRef.id, ...reviewData })
  } catch (error) {
    console.error('Error adding review:', error)
    return NextResponse.json({ error: 'An error occurred while adding the review' }, { status: 500 })
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const lastVisible = searchParams.get('lastVisible')
  const sortBy = searchParams.get('sortBy') || 'createdAt'
  const order = searchParams.get('order') || 'desc'
  const pageSize = 10

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
  }

  try {
    let reviewsQuery = query(
      collection(db, 'reviews'),
      where('productId', '==', productId),
      where('isApproved', '==', true),
      orderBy(sortBy, order),
      limit(pageSize)
    )

    if (lastVisible) {
      const lastVisibleDoc = await getDoc(doc(db, 'reviews', lastVisible))
      reviewsQuery = query(reviewsQuery, startAfter(lastVisibleDoc))
    }

    const querySnapshot = await getDocs(reviewsQuery)
    const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    const lastVisibleId = querySnapshot.docs[querySnapshot.docs.length - 1]?.id

    return NextResponse.json({ reviews, lastVisibleId })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'An error occurred while fetching reviews' }, { status: 500 })
  }
}

export async function PUT(request) {
  const { id, rating, comment } = await request.json()

  if (!id || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await updateDoc(doc(db, 'reviews', id), { rating, comment, isApproved: false })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json({ error: 'An error occurred while updating the review' }, { status: 500 })
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Review ID is required' }, { status: 400 })
  }

  try {
    await deleteDoc(doc(db, 'reviews', id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'An error occurred while deleting the review' }, { status: 500 })
  }
}

