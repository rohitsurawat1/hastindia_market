import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ArtisanCard({ artisan }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={artisan.imageUrl || '/placeholder.svg?height=200&width=300'}
          alt={artisan.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-center px-4">{artisan.craft}</p>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{artisan.name}</h2>
        <p className="text-gray-600 mb-2">{artisan.location}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">{artisan.bio}</p>
        <Button asChild className="w-full">
          <Link href={`/artisan/${artisan.id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  )
}

