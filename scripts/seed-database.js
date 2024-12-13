import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

// Initialize Firebase Admin SDK
const serviceAccount = {
    "type": "service_account",
    "project_id": "hastindia-c5e6f",
    "private_key_id": "98fbeec67d9a872889f921ee09f5fa5f9e3a8942",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDUqYCOzUbw96tr\nEB7Cf5EEmwsiTAqNzdebNqf/LzMiSbGjFicu4MW5SJYbxT02egSTse+TjIxn9u4N\nS0mMp/eTsatX0ROjPCPidnsPxCYlYW1O2xlzLtlqsScoaVpvatkO4biif/rH89C7\nailGwPTAsV+vYFfAJt1QT/sdOSaUT1x/JD8n90K2svLfhB5mddQngYIcE+me8u1q\nKLy97K1ZXaJaU7ut9GdZ0uP3+tQ/YomdX/QjbuSuXHdeQx0BM7fRcgNsX8VdSX1T\nHiRbyuEyzTmm17rE4y1EZwBtKQ4bO9wvgb3DkHrtQSdBzwjPenkqafyEn4FRSHzB\ny2IZXsGpAgMBAAECgf8jkMsGr6Sm61+3ZwKQw5/Ecphi1cH57j4J4pP8gQayJF3E\nXIgIuK+BjG5FLqEb2rhUQypmi6XuolL0GmOFp6YjWvWLDVchV8X5RAp3/NlyUf5N\n3JfAuFb4mFfpI4yW+SNRUPSlQT5PLaCxocfD0PyUMY5e+hqffsR8gfLcMjA8+kDr\nuNGI+k0dx1fOidinZTtreOxxHKKoaLUmEH93QQov+3Ibej088tQWHNEE7kc2AIeA\nzs8oHM1rImjMKqZ+URXP+2iLKmSmMAdMD6elapwYf9N8gGgrV3gy60Sdm6x1rfgi\n+3mK6lSCLSZb3BGb/NATAAjIx87TaneuXEzFv4ECgYEA/mrqDp26jMAUC0Y1IR/i\ns8CsnZzUOa1tPt5/jOqgYooPafj9kGnk3uG3vqinNEHt7nJIlj1k24dgMX2Hy6ws\nl7LdoJFlwgxLBm9m7lvarZD7KnNvPzjmqyxDIeRWNpv5CG+1syr6OgJGdcD+ooh5\nxXCfzsN3qqPAjPEJg1AkjCkCgYEA1fwavIw7/mclu75rxqT0q8qMUW+Xm/c2APtT\n3vEqAMHLuziDBVp3SKXuiteuTNuNj8M05zb1VW+XtcAlEMAkmJK/3Fet/1LsQWFc\nfSv5THaD7CBlbyAT5ZwlEmn7+ni+/YXQHGKDR7XmJOdhNAv3H+069IMyesm2cdBX\nQp2nOYECgYAyJ/Gsn/u+877/2f9vYFHZDgr5p4lPNZlr44FRzo9/3afcRHH4nme4\naNdIhwcvji/R6kXVGJVhkfasywqSZIcGAQUgOonND49a3Wt1YjZiMUrSu58a36TZ\n6gfyDonQij82Io+3mqlp9jjdzgZlFHKtMd7PbEmTImU7Y+l0McCCwQKBgQCAwYMs\n9Iyc1V/lCf07t8HpJKUt0yG8nRGHobKjsST+850s+CIONJMVyZIxRPoCERGq8WCB\nx5XzZIQ6vnUPES50B8keQjvWKAU0ierm/nCxS5axnASsyvZt8Hh2DgOqgMEbN0sz\n6SrpGVBz4C2i7ZgzQ8F3owHa1EjNTvlSgh4/AQKBgFzLIQ0yiyUo+NZBPTc5NeN/\nx9eLjPabCtZR9XeohPqM/Bk4cAnEP/xMi2FXqmWhVpBIlo0vuHjrYNf9ZaB6INbn\n8L+FUu17uPVA+Tn1qjElDAUK6twrcOy1V5AbbkhId07PR7F6wY/zKqcchpQwbr2q\nEjtCwBnWqdw/tH62VehS\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-gfbqt@hastindia-c5e6f.iam.gserviceaccount.com",
    "client_id": "105476286060153788148",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gfbqt%40hastindia-c5e6f.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()
const auth = getAuth()

// Sample product data
const products = [
  {
    name: "Handwoven Silk Saree",
    description: "Exquisite handwoven silk saree from Varanasi",
    price: 15000,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    stock: 10
  },
  {
    name: "Madhubani Painting",
    description: "Traditional Madhubani painting on handmade paper",
    price: 5000,
    category: "Art",
    imageUrl: "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9",
    stock: 5
  },
  {
    name: "Brass Dhokra Figurine",
    description: "Handcrafted Dhokra art figurine from Chhattisgarh",
    price: 2500,
    category: "Home Decor",
    imageUrl: "https://images.unsplash.com/photo-1580974852861-c381510bc98a",
    stock: 15
  },
  {
    name: "Pashmina Shawl",
    description: "Authentic Kashmiri Pashmina shawl",
    price: 8000,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1601244005535-a48d21d951ac",
    stock: 8
  },
  {
    name: "Blue Pottery Vase",
    description: "Hand-painted Blue Pottery vase from Jaipur",
    price: 3500,
    category: "Home Decor",
    imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
    stock: 12
  }
];

// Sample user data
const users = [
  {
    email: "customer@example.com",
    password: "customer@example.com",
    displayName: "Demo Customer",
    role: "customer"
  },
  {
    email: "seller@example.com",
    password: "password123",
    displayName: "Demo Seller",
    role: "seller"
  }
]

// Function to add products to Firestore
async function addProducts() {
  for (const product of products) {
    await db.collection('products').add(product)
  }
  console.log('Products added successfully')
}

// Function to create users in Firebase Authentication and Firestore
async function createUsers() {
  for (const user of users) {
    try {
      const userRecord = await auth.createUser({
        email: user.email,
        password: user.password,
        displayName: user.displayName
      })
      
      await db.collection('users').doc(userRecord.uid).set({
        email: user.email,
        displayName: user.displayName,
        role: user.role
      })
      
      console.log(`User ${user.email} created successfully`)
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error)
    }
  }
}

// Main function to seed the database
async function seedDatabase() {
  try {
    await addProducts()
    await createUsers()
    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

// Run the seeding process
seedDatabase()