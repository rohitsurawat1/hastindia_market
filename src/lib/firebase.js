import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAzM83JbjsJP9MQpFKTK46fI2WiE-CUKws",
  authDomain: "hastindia-c5e6f.firebaseapp.com",
  projectId: "hastindia-c5e6f",
  storageBucket: "hastindia-c5e6f.firebasestorage.app",
  messagingSenderId: "958981151307",
  appId: "1:958981151307:web:939ff53ee3b6d7ecfa0bce",
  measurementId: "G-VR12805RP6"
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }

