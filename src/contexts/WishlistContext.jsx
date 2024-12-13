'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const WishlistContext = createContext()

export const useWishlist = () => {
  return useContext(WishlistContext)
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const wishlistRef = doc(db, 'wishlists', user.uid)
        const wishlistDoc = await getDoc(wishlistRef)
        if (wishlistDoc.exists()) {
          setWishlist(wishlistDoc.data().items || [])
        } else {
          setWishlist([])
        }
      } else {
        setWishlist([])
      }
    }

    fetchWishlist()
  }, [user])

  const addToWishlist = async (product) => {
    if (user) {
      const newWishlist = [...wishlist, product]
      setWishlist(newWishlist)
      await setDoc(doc(db, 'wishlists', user.uid), { items: newWishlist })
    }
  }

  const removeFromWishlist = async (productId) => {
    if (user) {
      const newWishlist = wishlist.filter(item => item.id !== productId)
      setWishlist(newWishlist)
      await setDoc(doc(db, 'wishlists', user.uid), { items: newWishlist })
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

