import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UniversalHeader } from "@/components/universal-header"
import {
  Music,
  Upload,
  FileMusic,
  Play,
  Share2,
  Download,
  MoreHorizontal,
  Plus,
  Clock,
  Eye,
  ListMusic,
} from "lucide-react"
import Link from "next/link"
import { ShareDialog } from "@/components/share-dialog"

// Mock data for user's music sheets
const userMusicSheets = [
  {
    id: 1,
    title: "My Piano Composition",
    type: "Generated from MP3",
    duration: "3:45",
    createdAt: "2 hours ago",
    plays: 23,
    isShared: true,
    status: "completed",
  },
  {
    id: 2,
    title: "Jazz Improvisation",
    type: "Uploaded Sheet",
    duration: "4:12",
    createdAt: "1 day ago",
    plays: 67,
    isShared: false,
    status: "completed",
  },
  {
    id: 3,
    title: "Guitar Melody",
    type: "Generated from MP3",
    duration: "2:58",
    createdAt: "3 days ago",
    plays: 145,
    isShared: true,
    status: "processing",
  },
]

const recentActivity = [
  { action: "Generated sheet music", item: "My Piano Composition", time: "2 hours ago" },
  { action: "Shared publicly", item: "Jazz Improvisation", time: "1 day ago" },
  { action: "Uploaded MP3", item: "Guitar Melody", time: "3 days ago" },
]

const userPlaylists = [
  { id: 1, name: "My Favorites", count: 12, lastUpdated: "2 hours ago" },
  { id: 2, name: "Classical Collection", count: 8, lastUpdated: "1 day ago" },
  { id: 3, name: "Jazz Sessions", count: 15, lastUpdated: "3 days ago" },
]

export default function DashboardPage() {
  const handleUploadComplete = (file: File, result: any) => {
    console.log("[v0] Upload completed:", file.name, result)
    // Here you would typically:
    // 1. Update the user's music library
    // 2. Show a success notification
    // 3. Refresh the library list
  }

  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log("[v0] Recording completed:", audioBlob)
    // Here you would typically:
    // 1. Process the audio blob
    // 2. Generate sheet music
    // 3. Add to user's library
  }

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

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Manage your music sheets and create new compositions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Sheet Music
                </CardTitle>
                <CardDescription>Transform your musical ideas into beautiful sheet music</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/create">
                  <Button className="w-full h-12 text-base font-medium">
                    <Music className="h-5 w-5 mr-2" />
                    Start Creating
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* User's Music Library */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">Your Music Library</CardTitle>
                    <CardDescription>Manage and organize your sheet music collection</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="h-10 bg-transparent">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-12">
                    <TabsTrigger value="all" className="text-sm">
                      All Sheets
                    </TabsTrigger>
                    <TabsTrigger value="generated" className="text-sm">
                      Generated
                    </TabsTrigger>
                    <TabsTrigger value="uploaded" className="text-sm">
                      Uploaded
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-6">
                    <div className="space-y-4">
                      {userMusicSheets.map((sheet) => (
                        <div
                          key={sheet.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4 sm:gap-0"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileMusic className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{sheet.title}</h4>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <span>{sheet.type}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{sheet.duration}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{sheet.createdAt}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            {sheet.status === "processing" && <Badge variant="secondary">Processing</Badge>}
                            {sheet.isShared && <Badge variant="outline">Public</Badge>}
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Eye className="h-4 w-4" />
                              <span>{sheet.plays}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-10 w-10">
                              <Play className="h-4 w-4" />
                            </Button>
                            <ShareDialog sheetId={sheet.id.toString()} title={sheet.title} isShared={sheet.isShared}>
                              <Button size="sm" variant="ghost" className="h-10 w-10">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </ShareDialog>
                            <Button size="sm" variant="ghost" className="h-10 w-10">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="generated">
                    <p className="text-center text-muted-foreground py-8">
                      Sheets generated from MP3 files will appear here
                    </p>
                  </TabsContent>
                  <TabsContent value="uploaded">
                    <p className="text-center text-muted-foreground py-8">Manually uploaded sheets will appear here</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ListMusic className="h-5 w-5" />
                    My Playlists
                  </CardTitle>
                  <Link href="/playlist">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userPlaylists.map((playlist) => (
                    <Link key={playlist.id} href="/playlist">
                      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <ListMusic className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{playlist.name}</p>
                            <p className="text-xs text-muted-foreground">{playlist.count} songs</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                    </Link>
                  ))}
                  <Link href="/playlist">
                    <Button variant="outline" size="sm" className="w-full h-10 bg-transparent">
                      View All Playlists
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.item}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2 h-12 bg-transparent" variant="outline">
                  <Upload className="h-4 w-4" />
                  Upload New File
                </Button>
                <Link href="/playlist">
                  <Button className="w-full justify-start gap-2 h-12 bg-transparent" variant="outline">
                    <ListMusic className="h-4 w-4" />
                    Manage Playlists
                  </Button>
                </Link>
                <Button className="w-full justify-start gap-2 h-12 bg-transparent" variant="outline">
                  <Share2 className="h-4 w-4" />
                  Share Collection
                </Button>
                <Button className="w-full justify-start gap-2 h-12 bg-transparent" variant="outline">
                  <Download className="h-4 w-4" />
                  Export Library
                </Button>
              </CardContent>
            </Card>

            {/* Pro Tips */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-1">Better Audio Quality</p>
                    <p className="text-muted-foreground">
                      Upload high-quality MP3 files for more accurate sheet music generation
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-1">Record Live Audio</p>
                    <p className="text-muted-foreground">Use the new recording feature to capture live performances</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-1">Share Your Work</p>
                    <p className="text-muted-foreground">Make your sheets public to get feedback from the community</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
