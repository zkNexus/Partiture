import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingUp, Clock, Heart, Play, Filter } from "lucide-react"
import Link from "next/link"
import { UniversalHeader } from "@/components/universal-header"

// Mock data for community sheets
const communitySheets = [
  {
    id: 1,
    title: "Moonlight Sonata - 1st Movement",
    composer: "Ludwig van Beethoven",
    sharedBy: "ClassicalPianist",
    avatar: "/diverse-user-avatars.png",
    genre: "Classical",
    difficulty: "Advanced",
    duration: "5:32",
    plays: 1247,
    likes: 89,
    comments: 23,
    createdAt: "2 days ago",
    tags: ["piano", "classical", "beethoven", "sonata"],
    description: "Beautiful rendition of Beethoven's famous moonlight sonata, perfect for advanced pianists.",
  },
  {
    id: 2,
    title: "Bohemian Rhapsody",
    composer: "Queen",
    sharedBy: "RockFan92",
    avatar: "/rock-musician.jpg",
    genre: "Rock",
    difficulty: "Intermediate",
    duration: "5:55",
    plays: 892,
    likes: 156,
    comments: 45,
    createdAt: "1 week ago",
    tags: ["rock", "queen", "piano", "epic"],
    description: "Epic piano arrangement of Queen's masterpiece. Includes both the ballad and rock sections.",
  },
  {
    id: 3,
    title: "Clair de Lune",
    composer: "Claude Debussy",
    sharedBy: "FrenchComposer",
    avatar: "/classical-composer.jpg",
    genre: "Impressionist",
    difficulty: "Intermediate",
    duration: "4:23",
    plays: 634,
    likes: 78,
    comments: 12,
    createdAt: "3 days ago",
    tags: ["debussy", "impressionist", "piano", "romantic"],
    description: "Dreamy interpretation of Debussy's Clair de Lune with detailed fingering notations.",
  },
  {
    id: 4,
    title: "All of Me",
    composer: "John Legend",
    sharedBy: "JazzLover",
    avatar: "/jazz-pianist.jpg",
    genre: "Contemporary",
    difficulty: "Beginner",
    duration: "4:29",
    plays: 1156,
    likes: 203,
    comments: 67,
    createdAt: "5 days ago",
    tags: ["contemporary", "john-legend", "easy", "popular"],
    description: "Simplified arrangement perfect for beginners. Great for learning contemporary piano style.",
  },
  {
    id: 5,
    title: "Canon in D",
    composer: "Johann Pachelbel",
    sharedBy: "WeddingPianist",
    avatar: "/wedding-pianist.jpg",
    genre: "Baroque",
    difficulty: "Intermediate",
    duration: "3:47",
    plays: 2103,
    likes: 312,
    comments: 89,
    createdAt: "1 day ago",
    tags: ["baroque", "wedding", "pachelbel", "canon"],
    description: "Perfect wedding arrangement with beautiful harmonies. Includes chord symbols for accompaniment.",
  },
  {
    id: 6,
    title: "Imagine",
    composer: "John Lennon",
    sharedBy: "PeacefulMelodies",
    avatar: "/peace-musician.jpg",
    genre: "Pop",
    difficulty: "Beginner",
    duration: "3:01",
    plays: 1789,
    likes: 267,
    comments: 54,
    createdAt: "4 days ago",
    tags: ["john-lennon", "peace", "easy", "inspiring"],
    description: "Inspiring arrangement of John Lennon's timeless classic. Simple yet beautiful.",
  },
]

const trendingTags = ["piano", "classical", "beginner", "rock", "jazz", "contemporary", "wedding", "easy"]

export default function CommunityPage() {
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
          { label: "Settings", href: "/settings" },
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Discover Music Sheets</h2>
          <p className="text-muted-foreground">Explore thousands of sheet music shared by our talented community</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search for sheet music, composers, or users..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="classical">Classical</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="contemporary">Contemporary</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Trending Tags */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Trending tags:</p>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Most Liked
            </TabsTrigger>
            <TabsTrigger value="played" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Most Played
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communitySheets.map((sheet) => (
                <Card key={sheet.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-balance leading-tight mb-1">
                          <Link href={`/sheet/${sheet.id}`} className="hover:text-primary">
                            {sheet.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-sm">by {sheet.composer}</CardDescription>
                      </div>
                      <Button size="sm" variant="ghost" className="shrink-0 ml-2">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* User Info */}
                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={sheet.avatar || "/placeholder.svg"}
                        alt={sheet.sharedBy}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">Shared by {sheet.sharedBy}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{sheet.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {sheet.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {sheet.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{sheet.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <Badge variant="outline" className="text-xs">
                        {sheet.genre}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {sheet.difficulty}
                      </Badge>
                      <span>{sheet.duration}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Play className="h-3 w-3" />
                          <span>{sheet.plays}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{sheet.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{sheet.comments} comments</span>
                        </div>
                      </div>
                      <span>{sheet.createdAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline">Load More Sheets</Button>
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <p className="text-center text-muted-foreground py-8">Recent sheets will appear here</p>
          </TabsContent>

          <TabsContent value="popular">
            <p className="text-center text-muted-foreground py-8">Most liked sheets will appear here</p>
          </TabsContent>

          <TabsContent value="played">
            <p className="text-center text-muted-foreground py-8">Most played sheets will appear here</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
