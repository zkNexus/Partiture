"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Heart, Play, Share2, Edit3, Calendar, Trophy, Upload, Clock, Crown, Zap, Star, Settings } from "lucide-react"
import { UniversalHeader } from "@/components/universal-header"
import Link from "next/link"

// Mock user data
const userData = {
  name: "Alex Rodriguez",
  username: "@alexmusic",
  bio: "Passionate musician and composer. Love creating and sharing beautiful melodies with the world 🎵",
  avatar: "/musician-profile.png",
  coverImage: "/music-studio-background.jpg",
  joinDate: "March 2023",
  location: "Los Angeles, CA",
  website: "alexmusic.com",
  currentPlan: "Silver", // Added current membership plan
  stats: {
    sheetsCreated: 47,
    playlists: 12,
    followers: 1247,
    following: 389,
    totalPlays: 15420,
    likes: 3892,
  },
}

const membershipTiers = [
  {
    name: "Freemium",
    icon: Music,
    color: "from-gray-500 to-gray-600",
    price: "Free",
    storage: "100 MB",
    songsLimit: "5 songs",
    playlistsLimit: "2 playlists",
    features: ["Basic sheet music generation", "Limited sharing", "Community access"],
  },
  {
    name: "Silver",
    icon: Zap,
    color: "from-blue-500 to-blue-600",
    price: "$9.99/month",
    storage: "1 GB",
    songsLimit: "50 songs",
    playlistsLimit: "15 playlists",
    features: ["Advanced sheet music generation", "Unlimited sharing", "Priority support", "Export options"],
  },
  {
    name: "Gold",
    icon: Crown,
    color: "from-yellow-500 to-orange-600",
    price: "$19.99/month",
    storage: "10 GB",
    songsLimit: "Unlimited",
    playlistsLimit: "Unlimited",
    features: ["Premium AI features", "Collaboration tools", "Advanced analytics", "Custom branding", "API access"],
  },
]

// Mock user sheets and playlists data
const userSheets = [
  {
    id: 1,
    title: "Summer Breeze",
    genre: "Jazz",
    duration: "3:45",
    plays: 120,
    createdAt: "2023-04-01",
    likes: 250,
    isPublic: true,
  },
  // Add more sheets as needed
]

const userPlaylists = [
  {
    id: 1,
    name: "Chill Vibes",
    trackCount: 24,
    description: "A collection of relaxing tracks",
    plays: 500,
    color: "from-secondary to-primary",
    isPublic: true,
  },
  // Add more playlists as needed
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
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

      {/* Profile Header */}
      <section className="relative">
        {/* Cover Image */}
        <div className="h-48 md:h-64 bg-gradient-to-br from-primary via-accent to-secondary relative overflow-hidden">
          <img
            src={userData.coverImage || "/placeholder.svg"}
            alt="Profile cover"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-accent/60 to-secondary/60"></div>
        </div>

        {/* Profile Info */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                  <p className="text-muted-foreground mb-2">{userData.username}</p>
                  <p className="text-sm leading-relaxed max-w-2xl">{userData.bio}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {userData.joinDate}
                    </span>
                    <span>{userData.location}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    size="lg"
                    className="gap-2"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="h-5 w-5" />
                    {isEditing ? "Save" : "Edit Profile"}
                  </Button>
                  <Link href="/settings">
                    <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card className="text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{userData.stats.sheetsCreated}</div>
                <div className="text-sm text-muted-foreground">Sheets Created</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-secondary/10 to-primary/10 border-2">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-secondary">{userData.stats.playlists}</div>
                <div className="text-sm text-muted-foreground">Playlists</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-accent/10 to-secondary/10 border-2">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-accent">{userData.stats.followers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-2">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{userData.stats.following}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-secondary/10 to-accent/10 border-2">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-secondary">{userData.stats.totalPlays.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Plays</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-accent/10 to-primary/10 border-2">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-accent">{userData.stats.likes.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Likes Received</div>
              </CardContent>
            </Card>
          </div>

          {/* Membership Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                Membership
              </h2>
              <Badge variant="outline" className="bg-primary text-white border-primary px-3 py-1">
                Current: {userData.currentPlan}
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {membershipTiers.map((tier) => {
                const Icon = tier.icon
                const isCurrentPlan = tier.name === userData.currentPlan

                return (
                  <Card
                    key={tier.name}
                    className={`relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isCurrentPlan ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                  >
                    {isCurrentPlan && (
                      <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                        CURRENT
                      </div>
                    )}

                    <div className={`h-20 bg-gradient-to-br ${tier.color} relative`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute bottom-3 left-4 flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{tier.name}</h3>
                          <p className="text-white/80 text-sm font-medium">{tier.price}</p>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Storage</span>
                            <span className="font-medium">{tier.storage}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Songs</span>
                            <span className="font-medium">{tier.songsLimit}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Playlists</span>
                            <span className="font-medium">{tier.playlistsLimit}</span>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-2 text-sm">Features:</h4>
                          <ul className="space-y-1">
                            {tier.features.map((feature, index) => (
                              <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Button
                        className={`w-full ${isCurrentPlan ? "bg-muted text-muted-foreground" : ""}`}
                        disabled={isCurrentPlan}
                        variant={isCurrentPlan ? "outline" : "default"}
                      >
                        {isCurrentPlan ? "Current Plan" : tier.name === "Freemium" ? "Downgrade" : "Upgrade"}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="container mx-auto px-4 pb-12">
        <Tabs defaultValue="sheets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-14">
            <TabsTrigger value="sheets" className="text-base gap-2">
              <Music className="h-5 w-5" />
              My Sheets
            </TabsTrigger>
            <TabsTrigger value="playlists" className="text-base gap-2">
              <Heart className="h-5 w-5" />
              Playlists
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-base gap-2">
              <Clock className="h-5 w-5" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sheets">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSheets.map((sheet) => (
                <Card key={sheet.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{sheet.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-primary text-white border-primary">
                            {sheet.genre}
                          </Badge>
                          {!sheet.isPublic && (
                            <Badge variant="outline" className="bg-muted">
                              Private
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button size="default" variant="secondary" className="shrink-0 ml-2">
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>{sheet.duration}</span>
                      <span>{sheet.plays} plays</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{sheet.createdAt}</span>
                      <span className="flex items-center gap-1 text-accent">
                        <Heart className="h-4 w-4" />
                        {sheet.likes}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPlaylists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 overflow-hidden"
                >
                  <div className={`h-32 bg-gradient-to-br ${playlist.color} relative`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-1">{playlist.name}</h3>
                      <p className="text-white/80 text-sm">{playlist.trackCount} tracks</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-3">{playlist.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{playlist.plays} plays</span>
                      <div className="flex gap-2">
                        {!playlist.isPublic && (
                          <Badge variant="outline" className="bg-muted text-xs">
                            Private
                          </Badge>
                        )}
                        <Button size="sm" variant="secondary">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-4">
              <Card className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-full">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Uploaded new sheet music</p>
                      <p className="text-sm text-muted-foreground">"Summer Breeze" - Jazz composition</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-secondary to-primary rounded-full">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Created new playlist</p>
                      <p className="text-sm text-muted-foreground">"Chill Vibes" with 24 tracks</p>
                      <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-accent to-secondary rounded-full">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Reached 1,000 followers!</p>
                      <p className="text-sm text-muted-foreground">Thank you for the amazing support</p>
                      <p className="text-xs text-muted-foreground mt-1">2 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
