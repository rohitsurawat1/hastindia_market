'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { collection, getDocs, query, limit, startAfter, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import ArtisanCard from '@/components/ArtisanCard'
import FeaturedArtisan from '@/components/FeaturedArtisan'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUp } from 'lucide-react'

const ARTISANS_PER_PAGE = 9

export default function ArtisanSpotlight() {
  const [artisans, setArtisans] = useState([])
  const [filteredArtisans, setFilteredArtisans] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCraft, setSelectedCraft] = useState('all')
  const [crafts, setCrafts] = useState([])
  const [lastVisible, setLastVisible] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [featuredArtisan, setFeaturedArtisan] = useState(null)

  const observer = useRef()
  const lastArtisanRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMoreArtisans()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const fetchArtisans = async (isInitial = true) => {
    try {
      const artisansCollection = collection(db, 'artisans')
      let artisansQuery = query(artisansCollection, orderBy('name'), limit(ARTISANS_PER_PAGE))

      if (!isInitial && lastVisible) {
        artisansQuery = query(artisansCollection, orderBy('name'), startAfter(lastVisible), limit(ARTISANS_PER_PAGE))
      }

      const artisansSnapshot = await getDocs(artisansQuery)
      const artisansList = artisansSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      if (isInitial) {
        setArtisans(artisansList)
        setFilteredArtisans(artisansList)
        if (artisansList.length > 0) {
          setFeaturedArtisan(artisansList[0])
        }
      } else {
        setArtisans(prevArtisans => [...prevArtisans, ...artisansList])
        setFilteredArtisans(prevArtisans => [...prevArtisans, ...artisansList])
      }

      setLastVisible(artisansSnapshot.docs[artisansSnapshot.docs.length - 1])
      setHasMore(artisansList.length === ARTISANS_PER_PAGE)

      const uniqueCrafts = [...new Set(artisansList.map(artisan => artisan.craft))]
      setCrafts(prevCrafts => [...new Set([...prevCrafts, ...uniqueCrafts])])

      setLoading(false)
    } catch (error) {
      console.error('Error fetching artisans:', error)
      setLoading(false)
    }
  }

  const fetchMoreArtisans = () => {
    fetchArtisans(false)
  }

  useEffect(() => {
    fetchArtisans()
  }, [])

  useEffect(() => {
    const filtered = artisans.filter(artisan => 
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCraft === 'all' || artisan.craft === selectedCraft)
    )
    setFilteredArtisans(filtered)
  }, [searchTerm, selectedCraft, artisans])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && artisans.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-[#FFF3DE]">Loading artisans...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 text-[#FFF3DE]">
      <h1 className="text-3xl font-bold mb-8 text-[#DC9920]">Artisan Spotlight</h1>
      
      {featuredArtisan && <FeaturedArtisan artisan={featuredArtisan} />}

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Input
            type="text"
            placeholder="Search artisans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1A3A4F] text-[#FFF3DE] placeholder-[#8B4513]"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Select value={selectedCraft} onValueChange={setSelectedCraft}>
            <SelectTrigger className="bg-[#1A3A4F] text-[#FFF3DE]">
              <SelectValue placeholder="Filter by craft" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A3A4F] text-[#FFF3DE]">
              <SelectItem value="all">All Crafts</SelectItem>
              {crafts.map(craft => (
                <SelectItem key={craft} value={craft}>{craft}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredArtisans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.map((artisan, index) => (
            <div key={artisan.id} ref={index === filteredArtisans.length - 1 ? lastArtisanRef : null}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#8B4513]">No artisans found matching your criteria.</p>
      )}

      {loading && <p className="text-center mt-4 text-[#8B4513]">Loading more artisans...</p>}

      <Button
        className="fixed bottom-4 right-4 rounded-full p-2 bg-[#DC9920] text-[#1A3A4F] hover:bg-[#037964] transition-transform transform hover:scale-110"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  )
}
