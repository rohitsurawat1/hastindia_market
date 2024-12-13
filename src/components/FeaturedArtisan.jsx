import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function FeaturedArtisan({ artisan }) {
  return (
    <div className="bg-orange-100 rounded-lg shadow-md overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <div className="relative h-64 w-full md:w-64">
            <Image
              src={artisan.imageUrl || '/placeholder.svg?height=300&width=300'}
              alt={artisan.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">Featured Artisan</div>
          <h2 className="mt-2 text-2xl leading-8 font-semibold text-gray-900">{artisan.name}</h2>
          <p className="mt-2 text-gray-600">{artisan.craft}</p>
          <p className="mt-4 text-gray-500">{artisan.bio}</p>
          <div className="mt-6">
            <Button asChild>
              <Link href={`/artisan/${artisan.id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

