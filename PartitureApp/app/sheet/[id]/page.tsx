import { UniversalHeader } from "@/components/universal-header"
import { SheetMusicViewer } from "@/components/sheet-music-viewer"
import { SocialInteractions } from "@/components/social-interactions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock sheet music data - in a real app, this would come from a database
const mockSheetData = {
  id: "1",
  title: "Moonlight Sonata - 1st Movement",
  composer: "Ludwig van Beethoven",
  key: "C# Minor",
  timeSignature: "4/4",
  tempo: 60,
  measures: [
    {
      id: "m1",
      notes: [
        { pitch: "C#4", duration: "quarter", position: 0 },
        { pitch: "E4", duration: "quarter", position: 1 },
        { pitch: "G#4", duration: "quarter", position: 2 },
        { pitch: "C#5", duration: "quarter", position: 3 },
      ],
    },
    {
      id: "m2",
      notes: [
        { pitch: "B3", duration: "quarter", position: 0 },
        { pitch: "D#4", duration: "quarter", position: 1 },
        { pitch: "F#4", duration: "quarter", position: 2 },
        { pitch: "B4", duration: "quarter", position: 3 },
      ],
    },
  ],
  metadata: {
    duration: "5:32",
    difficulty: "Advanced",
    genre: "Classical",
  },
}

// Mock comments data
const mockComments = [
  {
    id: "1",
    user: {
      name: "Piano Enthusiast",
      avatar: "/piano-player.png",
      username: "pianolover",
    },
    content: "Beautiful arrangement! The fingering suggestions are really helpful for the difficult passages.",
    timestamp: "2 hours ago",
    likes: 12,
    isLiked: false,
  },
  {
    id: "2",
    user: {
      name: "Classical Student",
      avatar: "/music-student.png",
      username: "classicalstudent",
    },
    content: "This is exactly what I was looking for to practice. Thank you for sharing!",
    timestamp: "1 day ago",
    likes: 8,
    isLiked: true,
    replies: [
      {
        id: "2-1",
        user: {
          name: "ClassicalPianist",
          avatar: "/classical-pianist.jpg",
          username: "classicalpianist",
        },
        content: "Glad it helps! Make sure to practice slowly at first.",
        timestamp: "1 day ago",
        likes: 3,
        isLiked: false,
      },
    ],
  },
]

interface SheetPageProps {
  params: {
    id: string
  }
}

export default function SheetPage({ params }: SheetPageProps) {
  // In a real app, you would fetch the sheet data based on the ID
  const sheetData = mockSheetData

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
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-semibold">Sheet Music Viewer</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SheetMusicViewer sheetData={sheetData} />
          </div>
          <div>
            <SocialInteractions
              sheetId={params.id}
              initialLikes={89}
              initialIsLiked={false}
              initialComments={mockComments}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
