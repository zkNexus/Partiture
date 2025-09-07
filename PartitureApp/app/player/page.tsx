import { UniversalHeader } from "@/components/universal-header"
import { AudioPlayer } from "@/components/audio-player"
import { VirtualPiano } from "@/components/virtual-piano"
import { WaveformVisualizer } from "@/components/waveform-visualizer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Music } from "lucide-react"
import Link from "next/link"

export default function PlayerPage() {
  const handleNotePlay = (note: string, frequency: number) => {
    console.log(`[v0] Note played: ${note} at ${frequency}Hz`)
  }

  const handleTimeUpdate = (currentTime: number, duration: number) => {
    // This could be used to sync with sheet music display
    console.log(`[v0] Playback time: ${currentTime}/${duration}`)
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
                <h1 className="text-xl font-semibold">Audio Player & Piano</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Interactive Audio Player</h2>
          <p className="text-muted-foreground">
            Play audio files, visualize waveforms, and practice with the virtual piano
          </p>
        </div>

        <div className="space-y-8">
          {/* Audio Player */}
          <AudioPlayer
            title="Moonlight Sonata - 1st Movement"
            artist="Ludwig van Beethoven"
            duration="5:32"
            onTimeUpdate={handleTimeUpdate}
          />

          {/* Waveform Visualizer */}
          <WaveformVisualizer isPlaying={false} currentTime={0} duration={332} />

          {/* Virtual Piano */}
          <VirtualPiano onNotePlay={handleNotePlay} activeNotes={[]} />
        </div>
      </div>
    </div>
  )
}
