'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';


const AuthContext = createContext(undefined)

export const AuthProvider = ({ children}) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        setUser({ ...user, role: userData?.role || 'customer' });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email, password, name, role = 'customer') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      displayName: name,
      email,
      role
    });
    await updateProfile(userCredential.user, { displayName: name });
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
  }

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

