import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Upload, Play, PlusCircle } from "lucide-react"
import Link from "next/link"
import { UniversalHeader } from "@/components/universal-header"
import { FarcasterReadySignal } from "@/components/farcaster-ready"

// Mock data for shared music sheets
const sharedMusicSheets = [
  {
    id: 1,
    title: "Moonlight Sonata - 1st Movement",
    composer: "Ludwig van Beethoven",
    sharedBy: "ClassicalPianist",
    genre: "Classical",
    duration: "5:32",
    plays: 1247,
    createdAt: "2 days ago",
  },
  {
    id: 2,
    title: "Bohemian Rhapsody",
    composer: "Queen",
    sharedBy: "RockFan92",
    genre: "Rock",
    duration: "5:55",
    plays: 892,
    createdAt: "1 week ago",
  },
  {
    id: 3,
    title: "Clair de Lune",
    composer: "Claude Debussy",
    sharedBy: "FrenchComposer",
    genre: "Impressionist",
    duration: "4:23",
    plays: 634,
    createdAt: "3 days ago",
  },
  {
    id: 4,
    title: "All of Me",
    composer: "John Legend",
    sharedBy: "JazzLover",
    genre: "Contemporary",
    duration: "4:29",
    plays: 1156,
    createdAt: "5 days ago",
  },
  {
    id: 5,
    title: "Canon in D",
    composer: "Johann Pachelbel",
    sharedBy: "WeddingPianist",
    genre: "Baroque",
    duration: "3:47",
    plays: 2103,
    createdAt: "1 day ago",
  },
  {
    id: 6,
    title: "Imagine",
    composer: "John Lennon",
    sharedBy: "PeacefulMelodies",
    genre: "Pop",
    duration: "3:01",
    plays: 1789,
    createdAt: "4 days ago",
  },
]

export default function HomePage() {
  return (
    <>
      <FarcasterReadySignal />
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

      {/* Hero Section */}
      <section className="py-10 px-4 bg-gradient-to-br from-background via-card/30 to-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/beautiful-music-studio-with-piano-sheet-music-and-.jpg"
            alt="Music studio background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-card/60 to-muted/70"></div>
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="mb-8">
            {/* <Badge variant="secondary" className="mb-6 px-4 py-2 text-base font-semibold shadow-lg">
              🎵 AI-Powered Music Sheet Generation
            </Badge> */}
            <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Transform Your Music into
              <span className="text-primary bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text">
                {" "}
                Beautiful Sheets
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto leading-relaxed">
              Upload MP3 files to generate professional sheet music, share your compositions with the world, and play
              music like never before.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="xl" className="gap-3 shadow-xl w-full sm:w-auto">
                <Upload className="h-6 w-6" />
                Start Creating
              </Button>
            </Link>
            <Button
              variant="outline"
              size="xl"
              className="gap-3 shadow-xl w-full sm:w-auto bg-background border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Play className="h-6 w-6" />
              Watch Demo
            </Button>
          </div>

          <div className="relative mb-16">
            <div className="mx-auto max-w-2xl">
              <img
                src="/modern-music-sheet-with-colorful-notes-and-piano-k.jpg"
                alt="Music sheet with colorful notes"
                className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white/20 backdrop-blur-sm"
              />
              <div className="absolute -top-4 -left-4 p-3 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg animate-bounce">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -right-4 p-3 bg-gradient-to-br from-secondary to-primary rounded-xl shadow-lg animate-pulse">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Music Sheets Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-muted/40 to-card/60">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold mb-2 text-primary">Community Sheets</h3>
              <p className="text-muted-foreground text-lg">
                Discover and play sheet music shared by our talented community
              </p>
            </div>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 shadow-lg bg-background/80 backdrop-blur-sm border-2"
              >
                <PlusCircle className="h-5 w-5" />
                Share Yours
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sharedMusicSheets.slice(0, 5).map((sheet) => (
              <Card
                key={sheet.id}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 bg-gradient-to-br from-card to-background/50 dark:from-card/80 dark:to-background/30"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-balance leading-tight mb-1">{sheet.title}</CardTitle>
                      <CardDescription className="text-sm">by {sheet.composer}</CardDescription>
                    </div>
                    <Button size="default" variant="secondary" className="shrink-0 ml-2 shadow-lg">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="text-xs border-2 bg-primary text-white border-primary font-medium"
                    >
                      {sheet.genre}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">{sheet.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Shared by {sheet.sharedBy}</span>
                    <span className="font-medium">{sheet.plays} plays</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{sheet.createdAt}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/explore">
              <Button variant="outline" size="lg" className="shadow-lg bg-background/80 backdrop-blur-sm border-2">
                Explore More Sheets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Music className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Partiture</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The ultimate platform for music sheet generation and sharing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/dashboard" className="hover:text-primary transition-colors cursor-pointer">
                    MP3 to Sheet Music
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-primary transition-colors cursor-pointer">
                    Sheet Music Sharing
                  </Link>
                </li>
                <li>
                  <Link href="/player" className="hover:text-primary transition-colors cursor-pointer">
                    Virtual Playback
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="hover:text-primary transition-colors cursor-pointer">
                    Community Library
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors cursor-pointer">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors cursor-pointer">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-primary transition-colors cursor-pointer">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-primary transition-colors cursor-pointer">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors cursor-pointer">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors cursor-pointer">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-primary transition-colors cursor-pointer">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/dmca" className="hover:text-primary transition-colors cursor-pointer">
                    DMCA
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Partiture. All rights reserved.
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
