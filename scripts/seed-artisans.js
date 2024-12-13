import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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
});

const db = getFirestore();

// Sample artisan data
const artisans = [
  {
    name: "Rajesh Kumar",
    craft: "Madhubani Painting",
    location: "Madhubani, Bihar",
    bio: "Rajesh Kumar is a master Madhubani artist with over 30 years of experience. His intricate designs and vibrant colors bring ancient stories to life on canvas.",
    imageUrl: "https://images.unsplash.com/photo-1604684768394-52a862c2955a",
    products: [
      { id: "product1", name: "Traditional Madhubani Painting", price: 5000 },
      { id: "product2", name: "Modern Madhubani Art Print", price: 2500 },
    ]
  },
  {
    name: "Amrita Patel",
    craft: "Bandhani Textile",
    location: "Bhuj, Gujarat",
    bio: "Amrita Patel is a skilled Bandhani artisan, preserving the ancient tie-dye technique of Gujarat. Her colorful creations are both traditional and contemporary.",
    imageUrl: "https://images.unsplash.com/photo-1590019012497-b44f1aaa40d3",
    products: [
      { id: "product3", name: "Bandhani Silk Saree", price: 8000 },
      { id: "product4", name: "Bandhani Cotton Dupatta", price: 1500 },
    ]
  },
  {
    name: "Vijay Singh",
    craft: "Blue Pottery",
    location: "Jaipur, Rajasthan",
    bio: "Vijay Singh is a renowned Blue Pottery artist from Jaipur. His exquisite pieces showcase the perfect blend of Persian and Indian aesthetics.",
    imageUrl: "https://images.unsplash.com/photo-1605032840762-94b0f44b0a39",
    products: [
      { id: "product5", name: "Blue Pottery Vase", price: 3500 },
      { id: "product6", name: "Blue Pottery Dinner Set", price: 7500 },
    ]
  },
  {
    name: "Lakshmi Devi",
    craft: "Kanchipuram Silk Weaving",
    location: "Kanchipuram, Tamil Nadu",
    bio: "Lakshmi Devi is a master weaver of Kanchipuram silk sarees. Her intricate designs and use of pure zari have earned her national recognition.",
    imageUrl: "https://images.unsplash.com/photo-1622032493735-b7b053f2d31e",
    products: [
      { id: "product7", name: "Kanchipuram Silk Bridal Saree", price: 25000 },
      { id: "product8", name: "Kanchipuram Silk Blouse Piece", price: 5000 },
    ]
  },
  {
    name: "Mohammad Ismail",
    craft: "Bidri Craft",
    location: "Bidar, Karnataka",
    bio: "Mohammad Ismail is a skilled Bidri craftsman, known for his intricate silver inlay work on blackened alloy. His pieces are a testament to this ancient art form.",
    imageUrl: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81",
    products: [
      { id: "product9", name: "Bidri Vase", price: 12000 },
      { id: "product10", name: "Bidri Jewelry Box", price: 8000 },
    ]
  }
];

// Function to add artisans to Firestore
async function addArtisans() {
  for (const artisan of artisans) {
    const artisanRef = await db.collection('artisans').add(artisan);
    console.log(`Added artisan ${artisan.name} with ID: ${artisanRef.id}`);
    
    // Add products for each artisan
    for (const product of artisan.products) {
      await db.collection('products').add({
        ...product,
        artisanId: artisanRef.id,
        artisanName: artisan.name,
        craft: artisan.craft
      });
      console.log(`Added product ${product.name} for artisan ${artisan.name}`);
    }
  }
}

// Run the seeding process
addArtisans().then(() => {
  console.log('Artisan data seeded successfully');
  process.exit(0);
}).catch((error) => {
  console.error('Error seeding artisan data:', error);
  process.exit(1);
});

