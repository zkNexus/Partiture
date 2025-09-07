"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { MusicVisualizer, VisualizerEffect } from "@/components/music-visualizer"
import { VisualizerEffectSelector } from "@/components/visualizer-effect-selector"
import { UniversalHeader } from "@/components/universal-header"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume2,
  Heart,
  MoreHorizontal,
  ArrowLeft,
  Search,
  Plus,
  Music,
  Sparkles,
  Globe,
  Lock,
  Edit3,
} from "lucide-react"

const colorOptions = [
  "from-pink-500 via-red-500 to-orange-500",
  "from-blue-500 via-purple-500 to-indigo-600",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-amber-500 via-yellow-500 to-orange-400",
  "from-red-600 via-rose-500 to-pink-500",
  "from-violet-500 via-purple-500 to-fuchsia-500",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-orange-500 via-red-500 to-pink-500",
  "from-cyan-500 via-blue-500 to-purple-500",
  "from-lime-500 via-green-500 to-emerald-500",
  "from-rose-500 via-pink-500 to-purple-500",
  "from-yellow-500 via-orange-500 to-red-500",
]

const mockPlaylists = [
  {
    id: 1,
    name: "My Favorites",
    description: "Your liked songs",
    coverColor: "from-pink-500 via-red-500 to-orange-500",
    visualizerEffect: "waves" as VisualizerEffect,
    sheets: [
      { id: 1, title: "Moonlight Sonata", composer: "Beethoven", duration: "5:32", isPlaying: false },
      { id: 5, title: "Canon in D", composer: "Pachelbel", duration: "3:47", isPlaying: false },
    ],
    isPublic: true,
  },
  {
    id: 2,
    name: "Classical Collection",
    description: "Timeless classical pieces",
    coverColor: "from-blue-500 via-purple-500 to-indigo-600",
    visualizerEffect: "particles" as VisualizerEffect,
    sheets: [
      { id: 3, title: "Clair de Lune", composer: "Debussy", duration: "4:23", isPlaying: false },
      { id: 7, title: "Für Elise", composer: "Beethoven", duration: "3:25", isPlaying: false },
    ],
    isPublic: true,
  },
  {
    id: 3,
    name: "Study Session",
    description: "Focus music for productivity",
    coverColor: "from-emerald-500 via-teal-500 to-cyan-500",
    visualizerEffect: "bars" as VisualizerEffect,
    sheets: [
      { id: 4, title: "All of Me", composer: "John Legend", duration: "4:29", isPlaying: false },
      { id: 6, title: "Imagine", composer: "John Lennon", duration: "3:01", isPlaying: false },
    ],
    isPublic: true,
  },
  {
    id: 4,
    name: "Jazz Vibes",
    description: "Smooth jazz collection",
    coverColor: "from-amber-500 via-yellow-500 to-orange-400",
    visualizerEffect: "ripples" as VisualizerEffect,
    sheets: [
      { id: 8, title: "Take Five", composer: "Dave Brubeck", duration: "5:24", isPlaying: false },
      { id: 9, title: "Autumn Leaves", composer: "Joseph Kosma", duration: "4:12", isPlaying: false },
    ],
    isPublic: true,
  },
  {
    id: 5,
    name: "Rock Anthems",
    description: "Epic rock songs",
    coverColor: "from-red-600 via-rose-500 to-pink-500",
    visualizerEffect: "spiral" as VisualizerEffect,
    sheets: [
      { id: 10, title: "Bohemian Rhapsody", composer: "Queen", duration: "5:55", isPlaying: false },
      { id: 11, title: "Hotel California", composer: "Eagles", duration: "6:30", isPlaying: false },
    ],
    isPublic: true,
  },
  {
    id: 6,
    name: "Chill Beats",
    description: "Relaxing instrumental",
    coverColor: "from-violet-500 via-purple-500 to-fuchsia-500",
    visualizerEffect: "waves" as VisualizerEffect,
    sheets: [
      { id: 12, title: "River Flows in You", composer: "Yiruma", duration: "3:18", isPlaying: false },
      { id: 13, title: "Comptine d'un autre été", composer: "Yann Tiersen", duration: "2:18", isPlaying: false },
    ],
    isPublic: true,
  },
]

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState(mockPlaylists)
  const [selectedPlaylist, setSelectedPlaylist] = useState<(typeof mockPlaylists)[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isShuffled, setIsShuffled] = useState(false)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPlaylist, setEditingPlaylist] = useState<(typeof mockPlaylists)[0] | null>(null)
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("")
  const [selectedColor, setSelectedColor] = useState(colorOptions[0])
  const [selectedVisualizerEffect, setSelectedVisualizerEffect] = useState<VisualizerEffect>("waves")
  const [isPublic, setIsPublic] = useState(true)

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length)
    setSelectedColor(colorOptions[randomIndex])
  }

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return

    const newPlaylist = {
      id: playlists.length + 1,
      name: newPlaylistName,
      description: newPlaylistDescription || "Custom playlist",
      coverColor: selectedColor,
      visualizerEffect: selectedVisualizerEffect,
      sheets: [],
      isPublic: isPublic,
    }

    setPlaylists([...playlists, newPlaylist])
    setNewPlaylistName("")
    setNewPlaylistDescription("")
    setSelectedColor(colorOptions[0])
    setSelectedVisualizerEffect("waves")
    setIsPublic(true)
    setShowCreateModal(false)
  }

  const editPlaylist = (playlist: (typeof mockPlaylists)[0]) => {
    setEditingPlaylist(playlist)
    setNewPlaylistName(playlist.name)
    setNewPlaylistDescription(playlist.description)
    setSelectedColor(playlist.coverColor)
    setSelectedVisualizerEffect(playlist.visualizerEffect)
    setIsPublic(playlist.isPublic)
    setShowEditModal(true)
  }

  const updatePlaylist = () => {
    if (!editingPlaylist || !newPlaylistName.trim()) return

    const updatedPlaylists = playlists.map((playlist) =>
      playlist.id === editingPlaylist.id
        ? {
            ...playlist,
            name: newPlaylistName,
            description: newPlaylistDescription || playlist.description,
            coverColor: selectedColor,
            visualizerEffect: selectedVisualizerEffect,
            isPublic: isPublic,
          }
        : playlist
    )

    setPlaylists(updatedPlaylists)
    
    // Update selectedPlaylist if it's the one being edited
    if (selectedPlaylist?.id === editingPlaylist.id) {
      setSelectedPlaylist(updatedPlaylists.find((p) => p.id === editingPlaylist.id)!)
    }

    setNewPlaylistName("")
    setNewPlaylistDescription("")
    setSelectedColor(colorOptions[0])
    setSelectedVisualizerEffect("waves")
    setIsPublic(true)
    setEditingPlaylist(null)
    setShowEditModal(false)
  }

  const playTrack = (trackId: number) => {
    setCurrentTrack(trackId)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    if (!selectedPlaylist || !currentTrack) return
    const currentIndex = selectedPlaylist.sheets.findIndex((s) => s.id === currentTrack)
    const nextIndex = (currentIndex + 1) % selectedPlaylist.sheets.length
    setCurrentTrack(selectedPlaylist.sheets[nextIndex].id)
  }

  const previousTrack = () => {
    if (!selectedPlaylist || !currentTrack) return
    const currentIndex = selectedPlaylist.sheets.findIndex((s) => s.id === currentTrack)
    const prevIndex = (currentIndex - 1 + selectedPlaylist.sheets.length) % selectedPlaylist.sheets.length
    setCurrentTrack(selectedPlaylist.sheets[prevIndex].id)
  }

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled)
  }

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )


  if (selectedPlaylist) {
    const currentSheet = selectedPlaylist.sheets.find((s) => s.id === currentTrack)

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <UniversalHeader
          position="sticky"
          showLogo={true}
          navigationItems={[
            { label: "Explore", href: "/explore" },
            { label: "Playlist", href: "/playlist" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Profile", href: "/profile" },
            { label: "Settings", href: "/settings" },
          ]}
        />

        <div className="hidden lg:flex h-[calc(100vh-200px)] gap-8 p-8">
          <div className="w-1/2 relative">
            <MusicVisualizer
              isPlaying={isPlaying}
              currentTrack={currentTrack?.toString()}
              effect={selectedPlaylist.visualizerEffect}
              className="h-full rounded-2xl"
            />
            <div className="absolute top-8 left-8 text-white z-10">
              <h2 className="text-2xl font-bold mb-2">Now Playing</h2>
              {currentSheet && (
                <div>
                  <p className="text-lg font-medium">{currentSheet.title}</p>
                  <p className="text-white/80">{currentSheet.composer}</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-1/2 overflow-y-auto bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50 p-8">
            <div className="mb-8">
              <div className="flex items-center gap-6 mb-6">
                <div
                  className={`w-20 h-20 rounded-xl bg-gradient-to-br ${selectedPlaylist.coverColor} flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20`}
                >
                  <Music className="h-10 w-10 text-white/90" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{selectedPlaylist.name}</h1>
                      <p className="text-muted-foreground mb-1">{selectedPlaylist.description}</p>
                      <p className="text-sm text-muted-foreground/80">{selectedPlaylist.sheets.length} songs</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editPlaylist(selectedPlaylist)}
                      className="transition-all duration-300 hover:shadow-md hover:bg-muted/50"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Transport Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={previousTrack}
                    className="h-10 w-10 rounded-full transition-all duration-300 hover:shadow-md hover:bg-muted/50"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTrack}
                    className="h-10 w-10 rounded-full transition-all duration-300 hover:shadow-md hover:bg-muted/50"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  variant={isShuffled ? "default" : "outline"}
                  size="sm"
                  onClick={toggleShuffle}
                  className={`transition-all duration-300 hover:shadow-md ${isShuffled ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted/50"}`}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
                <Button variant="outline" size="sm" className="transition-all duration-300 hover:shadow-md hover:bg-muted/50">
                  <Heart className="h-4 w-4 mr-2" />
                  Like
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {selectedPlaylist.sheets.map((sheet, index) => (
                <div
                  key={sheet.id}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg border backdrop-blur-sm ${
                    currentTrack === sheet.id 
                      ? "bg-primary/10 border-primary/20 shadow-md hover:shadow-primary/20" 
                      : "bg-card/80 border-border/30 hover:bg-card hover:border-border/60 hover:shadow-xl"
                  }`}
                  onClick={() => playTrack(sheet.id)}
                >
                  <div className="w-8 text-center text-sm text-muted-foreground">
                    {currentTrack === sheet.id && isPlaying ? (
                      <div className="flex justify-center">
                        <div className="w-1 h-4 bg-primary animate-pulse mr-1 rounded-full"></div>
                        <div className="w-1 h-4 bg-primary animate-pulse rounded-full"></div>
                      </div>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${currentTrack === sheet.id ? "text-primary" : ""}`}>{sheet.title}</h3>
                    <p className="text-sm text-muted-foreground">{sheet.composer}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{sheet.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className={`relative bg-gradient-to-b ${selectedPlaylist.coverColor} pb-8`}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-background"></div>

            <div className="container mx-auto px-6 py-10 relative z-10">
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div
                  className={`w-full md:w-64 h-64 rounded-2xl bg-gradient-to-br ${selectedPlaylist.coverColor} flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border-4 border-white/20`}
                >
                  <Music className="h-24 w-24 text-white/90 drop-shadow-lg" />
                </div>
                <div className="flex-1 flex flex-col justify-end text-white">
                  <p className="text-sm text-white/80 mb-2 font-medium">Playlist</p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance drop-shadow-lg">
                    {selectedPlaylist.name}
                  </h1>
                  <p className="text-white/90 mb-4 text-lg drop-shadow-sm">{selectedPlaylist.description}</p>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Music className="h-3 w-3" />
                    </div>
                    <span className="font-medium">Partiture</span>
                    <span>•</span>
                    <span>{selectedPlaylist.sheets.length} songs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/80 mt-2">
                    <div
                      className={`p-2 rounded-full ${selectedPlaylist.isPublic ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                    >
                      {selectedPlaylist.isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{selectedPlaylist.isPublic ? "Public" : "Private"}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedPlaylist.isPublic
                          ? "Anyone can see and play this playlist"
                          : "Only you can see this playlist"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Transport Controls */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={previousTrack}
                    className="text-white/80 hover:text-white hover:bg-white/10 h-12 w-12 rounded-full"
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={nextTrack}
                    className="text-white/80 hover:text-white hover:bg-white/10 h-12 w-12 rounded-full"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>
                
                <Button variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10">
                  <Heart className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => editPlaylist(selectedPlaylist)}
                >
                  <Edit3 className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10">
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-10">
            <div className="space-y-4">
              {selectedPlaylist.sheets.map((sheet, index) => (
                <div
                  key={sheet.id}
                  className={`flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-sm group ${
                    currentTrack === sheet.id 
                      ? "bg-primary/10 border-primary/20 shadow-lg hover:shadow-primary/30" 
                      : "bg-card/90 border-border/30 hover:bg-card hover:border-border/60 hover:shadow-2xl hover:scale-[1.02]"
                  }`}
                  onClick={() => playTrack(sheet.id)}
                >
                  <div className="w-8 text-center text-sm text-muted-foreground">
                    {currentTrack === sheet.id && isPlaying ? (
                      <div className="flex justify-center">
                        <div className="w-1 h-4 bg-primary animate-pulse mr-1 rounded-full"></div>
                        <div className="w-1 h-4 bg-primary animate-pulse rounded-full"></div>
                      </div>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${currentTrack === sheet.id ? "text-primary" : ""}`}>{sheet.title}</h3>
                    <p className="text-sm text-muted-foreground">{sheet.composer}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{sheet.duration}</span>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {currentSheet && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t p-4 z-50">
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded bg-gradient-to-br ${selectedPlaylist.coverColor} flex items-center justify-center`}
                  >
                    <Music className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{currentSheet.title}</h4>
                    <p className="text-sm text-muted-foreground">{currentSheet.composer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={previousTrack}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={nextTrack}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleShuffle}
                    className={isShuffled ? "text-primary" : ""}
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Repeat className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <UniversalHeader
        position="sticky"
        showLogo={true}
        navigationItems={[
          { label: "Explore", href: "/explore" },
          { label: "Playlist", href: "/playlist" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile", href: "/profile" },
          { label: "Settings", href: "/settings" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-orange-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {/* Create New Playlist Card */}
          <Card
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <CardHeader className="p-4 pb-2">
              <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold line-clamp-2 leading-tight">Create Playlist</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                Create a new playlist with custom effects
              </p>
            </CardContent>
          </Card>

          {filteredPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-orange-200/50 dark:hover:shadow-purple-500/20"
              onClick={() => setSelectedPlaylist(playlist)}
            >
              <CardHeader className="p-4 pb-2">
                <div
                  className={`w-full aspect-square rounded-lg bg-gradient-to-br ${playlist.coverColor} flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <Music className="h-8 w-8 text-white/90" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-4 w-4 text-gray-800 ml-0.5" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-sm font-semibold line-clamp-2 leading-tight">{playlist.name}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{playlist.description}</p>
                <span className="text-xs text-gray-500 dark:text-gray-500">{playlist.sheets.length} songs</span>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mt-2">
                  <div
                    className={`p-2 rounded-full ${playlist.isPublic ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    {playlist.isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{playlist.isPublic ? "Public" : "Private"}</p>
                    <p className="text-xs text-muted-foreground">
                      {playlist.isPublic ? "Anyone can see and play this playlist" : "Only you can see this playlist"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlaylists.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center">
              <Search className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No playlists found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try searching with different keywords</p>
          </div>
        )}
      </div>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-blue-500">
                <Music className="h-4 w-4 text-white" />
              </div>
              Create New Playlist
            </DialogTitle>
            <DialogDescription>
              Create a custom playlist with your favorite songs and choose a unique color theme.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="playlist-name">Playlist Name</Label>
              <Input
                id="playlist-name"
                placeholder="My Awesome Playlist"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playlist-description">Description (Optional)</Label>
              <Textarea
                id="playlist-description"
                placeholder="Describe your playlist..."
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-3">
              <Label>Privacy Settings</Label>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${isPublic ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    {isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{isPublic ? "Public" : "Private"}</p>
                    <p className="text-xs text-muted-foreground">
                      {isPublic ? "Anyone can see and play this playlist" : "Only you can see this playlist"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Choose Color Theme</Label>
                <Button variant="outline" size="sm" onClick={getRandomColor} className="h-8 px-3 bg-transparent">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Random
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${selectedColor} flex items-center justify-center shadow-lg`}
                >
                  <Music className="h-6 w-6 text-white/90" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Preview</p>
                  <p className="text-xs text-muted-foreground">This is how your playlist will look</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full h-12 rounded-lg bg-gradient-to-br ${color} transition-all duration-200 hover:scale-105 ${
                      selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <VisualizerEffectSelector
              selectedEffect={selectedVisualizerEffect}
              onEffectChange={setSelectedVisualizerEffect}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={createPlaylist}
              disabled={!newPlaylistName.trim()}
              className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Playlist Dialog */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-blue-500">
                <Edit3 className="h-4 w-4 text-white" />
              </div>
              Edit Playlist
            </DialogTitle>
            <DialogDescription>
              Update your playlist settings, including the visual effect and privacy options.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-playlist-name">Playlist Name</Label>
              <Input
                id="edit-playlist-name"
                placeholder="My Awesome Playlist"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-playlist-description">Description (Optional)</Label>
              <Textarea
                id="edit-playlist-description"
                placeholder="Describe your playlist..."
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-3">
              <Label>Privacy Settings</Label>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${isPublic ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    {isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{isPublic ? "Public" : "Private"}</p>
                    <p className="text-xs text-muted-foreground">
                      {isPublic ? "Anyone can see and play this playlist" : "Only you can see this playlist"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Choose Color Theme</Label>
                <Button variant="outline" size="sm" onClick={getRandomColor} className="h-8 px-3 bg-transparent">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Random
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${selectedColor} flex items-center justify-center shadow-lg`}
                >
                  <Music className="h-6 w-6 text-white/90" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Preview</p>
                  <p className="text-xs text-muted-foreground">This is how your playlist will look</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full h-12 rounded-lg bg-gradient-to-br ${color} transition-all duration-200 hover:scale-105 ${
                      selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <VisualizerEffectSelector
              selectedEffect={selectedVisualizerEffect}
              onEffectChange={setSelectedVisualizerEffect}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={updatePlaylist}
              disabled={!newPlaylistName.trim()}
              className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Update Playlist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
