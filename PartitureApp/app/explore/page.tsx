"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Heart, Play, Pause, Share2, Music, ArrowLeft, Volume2, VolumeX, Volume1, Plus, List, Search, X } from "lucide-react"
import Link from "next/link"
import { UniversalHeader } from "@/components/universal-header"

// Extended mock data for explore reels
const exploreSheets = [
  {
    id: 1,
    title: "Moonlight Sonata - 1st Movement",
    composer: "Ludwig van Beethoven",
    sharedBy: "ClassicalPianist",
    genre: "Classical",
    duration: "5:32",
    plays: 1247,
    likes: 89,
    isLiked: false,
    audioUrl: "/placeholder-audio.mp3",
    coverImage: "/classical-sheet-1.jpg",
    description: "A beautiful rendition of Beethoven's masterpiece with modern interpretation",
  },
  {
    id: 2,
    title: "Bohemian Rhapsody",
    composer: "Queen",
    sharedBy: "RockFan92",
    genre: "Rock",
    duration: "5:55",
    plays: 892,
    likes: 156,
    isLiked: true,
    audioUrl: "/placeholder-audio.mp3",
    coverImage: "/rock-sheet-1.jpg",
    description: "Epic rock ballad arranged for piano with all the iconic sections",
  },
  {
    id: 3,
    title: "Clair de Lune",
    composer: "Claude Debussy",
    sharedBy: "FrenchComposer",
    genre: "Impressionist",
    duration: "4:23",
    plays: 634,
    likes: 78,
    isLiked: false,
    audioUrl: "/placeholder-audio.mp3",
    coverImage: "/impressionist-sheet-1.jpg",
    description: "Dreamy impressionist piece that captures the essence of moonlight",
  },
  {
    id: 4,
    title: "All of Me",
    composer: "John Legend",
    sharedBy: "JazzLover",
    genre: "Contemporary",
    duration: "4:29",
    plays: 1156,
    likes: 203,
    isLiked: false,
    audioUrl: "/placeholder-audio.mp3",
    coverImage: "/contemporary-sheet-1.jpg",
    description: "Romantic contemporary ballad perfect for special occasions",
  },
  {
    id: 5,
    title: "Canon in D",
    composer: "Johann Pachelbel",
    sharedBy: "WeddingPianist",
    genre: "Baroque",
    duration: "3:47",
    plays: 2103,
    likes: 312,
    isLiked: true,
    audioUrl: "/placeholder-audio.mp3",
    coverImage: "/baroque-sheet-1.jpg",
    description: "Timeless baroque masterpiece, perfect for weddings and ceremonies",
  },
  {
    id: 6,
    title: "Imagine",
    composer: "John Lennon",
    sharedBy: "PeacefulMelodies",
    genre: "Pop",
    duration: "3:01",
    plays: 1789,
    likes: 245,
    isLiked: false,
    audioUrl: "/placeholder-audio.mp3",
    coverImage: "/pop-sheet-1.jpg",
    description: "Iconic peace anthem arranged for solo piano with beautiful harmonies",
  },
  {
    id: 7,
    title: "Für Elise",
    composer: "Ludwig van Beethoven",
    sharedBy: "PianoMaster",
    genre: "Classical",
    duration: "3:25",
    plays: 1456,
    likes: 189,
    isLiked: false,
    audioUrl: "/placeholder-audio.mp3",
    coverImage: "/classical-sheet-2.jpg",
    description: "The most beloved piano piece of all time, beautifully notated",
  },
]

// Fractal animation component
const FractalBackground = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`fractal-container ${isPlaying ? "animate-pulse" : ""}`}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full border-2 border-primary/20 ${
              isPlaying ? "animate-spin" : "animate-pulse"
            }`}
            style={{
              width: `${(i + 1) * 40}px`,
              height: `${(i + 1) * 40}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`inner-${i}`}
            className={`absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full ${
              isPlaying ? "animate-bounce" : "animate-ping"
            }`}
            style={{
              top: `${20 + i * 10}%`,
              left: `${15 + i * 8}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ExplorePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(75)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [allSheets] = useState(exploreSheets) // Keep original data
  const [sheets, setSheets] = useState(exploreSheets) // Filtered data
  const [showPlaylistDialog, setShowPlaylistDialog] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My Favorites", sheets: [] },
    { id: 2, name: "Classical Collection", sheets: [] },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  // Auto-advance to next sheet
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sheets.length)
    }, 8000) // 8 seconds per sheet

    return () => clearInterval(interval)
  }, [isPlaying, sheets.length])

  // Auto-play on mount
  useEffect(() => {
    setIsPlaying(true)
  }, [])

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSheets(allSheets)
      setCurrentIndex(0)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    const filteredSheets = allSheets.filter(sheet => 
      sheet.title.toLowerCase().includes(query) ||
      sheet.composer.toLowerCase().includes(query) ||
      sheet.genre.toLowerCase().includes(query) ||
      sheet.sharedBy.toLowerCase().includes(query) ||
      sheet.description.toLowerCase().includes(query)
    )
    
    setSheets(filteredSheets)
    setCurrentIndex(0)
    
    // Reset scroll position when search results change
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [searchQuery, allSheets])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY
  }

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) return

    const distance = touchStartY.current - touchEndY.current
    const isSignificantSwipe = Math.abs(distance) > 50

    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe up - next sheet
        goToNext()
      } else {
        // Swipe down - previous sheet
        goToPrevious()
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault()
        goToNext()
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === " ") {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPlaying])

  // Handle scroll-based navigation
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const itemHeight = container.clientHeight
      const newIndex = Math.round(scrollTop / itemHeight)
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < sheets.length) {
        setCurrentIndex(newIndex)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentIndex, sheets.length])

  const handleLike = (id: number) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === id
          ? { ...sheet, isLiked: !sheet.isLiked, likes: sheet.isLiked ? sheet.likes - 1 : sheet.likes + 1 }
          : sheet,
      ),
    )

    if (!sheets.find((s) => s.id === id)?.isLiked) {
      setShowPlaylistDialog(true)
    }
  }

  const addToPlaylist = (playlistId: number, sheetId: number) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId ? { ...playlist, sheets: [...playlist.sheets, sheetId] } : playlist,
      ),
    )
    setShowPlaylistDialog(false)
  }

  const createNewPlaylist = () => {
    if (!newPlaylistName.trim()) return

    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName,
      sheets: [currentSheet.id],
    }

    setPlaylists((prev) => [...prev, newPlaylist])
    setNewPlaylistName("")
    setShowPlaylistDialog(false)
  }

  const currentSheet = sheets[currentIndex]

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % sheets.length
    const container = containerRef.current
    if (container) {
      container.scrollTo({
        top: newIndex * container.clientHeight,
        behavior: 'smooth'
      })
    }
    setCurrentIndex(newIndex)
  }

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + sheets.length) % sheets.length
    const container = containerRef.current
    if (container) {
      container.scrollTo({
        top: newIndex * container.clientHeight,
        behavior: 'smooth'
      })
    }
    setCurrentIndex(newIndex)
  }

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX
    if (volume < 50) return Volume1
    return Volume2
  }

  const VolumeIcon = getVolumeIcon()

  const toggleMute = () => {
    setIsMuted(!isMuted)
    setShowVolumeSlider(false)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0]
    setVolume(volumeValue)
    if (volumeValue === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <UniversalHeader 
        position="sticky"
        showLogo={true}
        navigationItems={[
          { label: "Explore", href: "/explore" },
          { label: "Playlist", href: "/playlist" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile", href: "/profile" },
        ]}
      />

      {/* Search Interface - Always Visible */}
      <div className="bg-black/95 backdrop-blur-lg border-b border-white/10 px-4 py-3">
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search music sheets, composers, genres..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20 h-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-white/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Search Results Info */}
        {searchQuery && (
          <div className="text-center text-sm text-white/70 mt-2">
            {sheets.length === 0 ? (
              <span>No results found for "{searchQuery}"</span>
            ) : (
              <span>Found {sheets.length} result{sheets.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        )}

        {/* Quick Search Tags - Only show when no search query */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {['Classical', 'Jazz', 'Rock', 'Pop', 'Baroque', 'Contemporary'].map((genre) => (
              <Button
                key={genre}
                variant="outline"
                size="sm"
                onClick={() => handleSearch(genre)}
                className="bg-white/5 border-white/20 text-white/80 hover:bg-white/20 text-xs px-3 py-1 h-6"
              >
                {genre}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* TikTok-style Vertical Scroll Container */}
      <div
        ref={containerRef}
        className="relative overflow-y-scroll snap-y snap-mandatory md:h-[calc(100vh-140px)] h-[calc(100vh-220px)] scrollbar-hide"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sheets.length === 0 && searchQuery ? (
          // No results state
          <div className="relative snap-start md:h-[calc(100vh-140px)] h-[calc(100vh-220px)] flex items-center justify-center">
            <Card className="w-full max-w-md mx-4 bg-black/40 backdrop-blur-lg border-white/20 text-white text-center">
              <CardContent className="p-8">
                <Music className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Results Found</h3>
                <p className="text-white/70 mb-4">
                  No music sheets match your search for "{searchQuery}"
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-white/60">Try searching for:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Classical', 'Beethoven', 'Jazz', 'Contemporary'].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSearch(suggestion)}
                        className="bg-white/10 border-white/20 text-white/80 hover:bg-white/20 text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={clearSearch}
                    className="mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Clear Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          sheets.map((sheet, index) => (
          <div
            key={sheet.id}
            className="relative snap-start md:h-[calc(100vh-140px)] h-[calc(100vh-220px)] flex items-center justify-center"
          >
            {/* Fractal Background */}
            <FractalBackground isPlaying={isPlaying && index === currentIndex} />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />

            {/* Sheet Content */}
            <Card className="relative z-10 w-full max-w-md mx-4 bg-black/40 backdrop-blur-lg border-white/20 text-white">
              <CardContent className="p-6">
                {/* Cover Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg mb-4 flex items-center justify-center">
                  <Music className="h-16 w-16 text-white/60" />
                </div>

                {/* Sheet Info */}
                <div className="space-y-3">
                  <div>
                    <h2 className="text-xl font-bold text-balance leading-tight">{sheet.title}</h2>
                    <p className="text-white/80">by {sheet.composer}</p>
                  </div>

                  <p className="text-sm text-white/70 leading-relaxed">{sheet.description}</p>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {sheet.genre}
                    </Badge>
                    <span className="text-xs text-white/60">{sheet.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>@{sheet.sharedBy}</span>
                    <span>{sheet.plays} plays</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Side Actions */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation()
                  if (index === currentIndex) {
                    setIsPlaying(!isPlaying)
                  } else {
                    setCurrentIndex(index)
                    setIsPlaying(true)
                  }
                }}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                {isPlaying && index === currentIndex ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>

              <Dialog open={showPlaylistDialog} onOpenChange={setShowPlaylistDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(sheet.id)
                    }}
                    className={`w-14 h-14 rounded-full backdrop-blur-sm text-white ${
                      sheet.isLiked ? "bg-red-500/80 hover:bg-red-500/90" : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${sheet.isLiked ? "fill-current" : ""}`} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 backdrop-blur-lg border-white/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Add to Playlist</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {playlists.map((playlist) => (
                      <Button
                        key={playlist.id}
                        variant="outline"
                        className="w-full justify-start bg-white/10 border-white/20 hover:bg-white/20"
                        onClick={() => addToPlaylist(playlist.id, sheet.id)}
                      >
                        {playlist.name} ({playlist.sheets.length} songs)
                      </Button>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="New playlist name"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      <Button onClick={createNewPlaylist} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <span className="text-xs text-center text-white/70">{sheet.likes}</span>

              <Button
                variant="ghost"
                size="lg"
                onClick={(e) => e.stopPropagation()}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                <Share2 className="h-6 w-6" />
              </Button>

              {/* Volume Control */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMute()
                  }}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                >
                  <VolumeIcon className="h-6 w-6" />
                </Button>

                {/* Volume Slider Popup */}
                {showVolumeSlider && (
                  <div
                    className="absolute top-1/2 right-full -translate-y-1/2 mr-2 p-3 bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <VolumeX className="h-4 w-4 text-white/60" />
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <Volume2 className="h-4 w-4 text-white/60" />
                    </div>
                    <div className="text-xs text-center text-white/60 mt-1">{isMuted ? "Muted" : `${volume}%`}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar - only show for current playing sheet */}
            {isPlaying && index === currentIndex && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100"
                  style={{
                    width: `${((Date.now() % 8000) / 8000) * 100}%`,
                    animation: "progress 8s linear infinite",
                  }}
                />
              </div>
            )}
          </div>
          ))
        )}

        {/* Scroll Indicator */}
        <div className="fixed right-2 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1">
          {sheets.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-6 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}
