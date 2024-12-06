import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="relative h-[70vh] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9"
            alt="Traditional Indian Handicrafts"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Discover Unique Indian Handicrafts</h1>
            <p className="text-xl md:text-2xl mb-8 text-center">Handmade with love, delivered to your doorstep</p>
            <Button asChild size="lg">
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Madhubani Paintings',
              image: 'https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9'
            },
            {
              name: 'Dhokra Art',
              image: 'https://images.unsplash.com/photo-1580974852861-c381510bc98a'
            },
            {
              name: 'Handwoven Textiles',
              image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
            },
            {
              name: 'Blue Pottery',
              image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61'
            }
          ].map((category) => (
            <Link 
              key={category.name} 
              href={`/shop/${category.name.toLowerCase().replace(' ', '-')}`} 
              className="group"
            >
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-200 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="bg-primary/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Sell on HastIndia</h2>
          <p className="text-xl mb-6 text-muted-foreground">Join our community of artisans and reach customers worldwide</p>
          <Button asChild>
            <Link href="/sell/start-selling">Start Selling</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

