import { UniversalHeader } from "@/components/universal-header"
import { SheetMusicGenerator } from "@/components/sheet-music-generator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Music } from "lucide-react"
import Link from "next/link"

export default function GeneratePage() {
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Music className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">Sheet Music Generator</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Generate Sheet Music</h2>
          <p className="text-muted-foreground">
            Configure settings and generate professional sheet music from your uploaded audio files
          </p>
        </div>

        <SheetMusicGenerator />
      </div>
    </div>
  )
}
