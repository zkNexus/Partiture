"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, ZoomIn, ZoomOut, Download, Share2, Edit, Piano } from "lucide-react"
import { cn } from "@/lib/utils"
import { AudioPlayer } from "./audio-player"
import { VirtualPiano } from "./virtual-piano"

interface SheetMusicData {
  id: string
  title: string
  composer: string
  key: string
  timeSignature: string
  tempo: number
  measures: MeasureData[]
  metadata?: {
    duration: string
    difficulty: string
    genre: string
  }
}

interface MeasureData {
  id: string
  notes: NoteData[]
}

interface NoteData {
  pitch: string
  duration: string
  position: number
}

interface SheetMusicViewerProps {
  sheetData: SheetMusicData
  className?: string
}

export function SheetMusicViewer({ sheetData, className }: SheetMusicViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMeasure, setCurrentMeasure] = useState(0)
  const [zoom, setZoom] = useState([100])
  const [playbackPosition, setPlaybackPosition] = useState(0)
  const [showPiano, setShowPiano] = useState(false)
  const [activeNotes, setActiveNotes] = useState<string[]>([])

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control audio playback and highlight notes
    if (!isPlaying) {
      // Simulate note highlighting during playback
      simulateNotePlayback()
    }
  }

  const simulateNotePlayback = () => {
    // Simulate highlighting notes as they play
    const notes = ["C4", "E4", "G4", "C5"]
    let noteIndex = 0

    const interval = setInterval(() => {
      if (!isPlaying) {
        clearInterval(interval)
        setActiveNotes([])
        return
      }

      setActiveNotes([notes[noteIndex % notes.length]])
      noteIndex++

      if (noteIndex > 20) {
        // Stop after a while
        clearInterval(interval)
        setIsPlaying(false)
        setActiveNotes([])
      }
    }, 500)
  }

  const handleZoomChange = (value: number[]) => {
    setZoom(value)
  }

  const handleNotePlay = (note: string, frequency: number) => {
    console.log(`[v0] Piano note played: ${note} at ${frequency}Hz`)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Sheet Music Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{sheetData.title}</CardTitle>
              <p className="text-muted-foreground mb-4">by {sheetData.composer}</p>
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="outline">Key: {sheetData.key}</Badge>
                <Badge variant="outline">Time: {sheetData.timeSignature}</Badge>
                <Badge variant="outline">Tempo: {sheetData.tempo} BPM</Badge>
                {sheetData.metadata && (
                  <>
                    <Badge variant="secondary">{sheetData.metadata.difficulty}</Badge>
                    <Badge variant="secondary">{sheetData.metadata.genre}</Badge>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowPiano(!showPiano)}>
                <Piano className="h-4 w-4 mr-2" />
                {showPiano ? "Hide" : "Show"} Piano
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <AudioPlayer
        title={sheetData.title}
        artist={sheetData.composer}
        duration={sheetData.metadata?.duration || "0:00"}
        onTimeUpdate={(currentTime, duration) => {
          // Sync playback position with sheet music
          const progress = duration > 0 ? (currentTime / duration) * 400 : 0
          setPlaybackPosition(progress)
        }}
      />

      {/* Playback Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={togglePlayback}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline">
                <SkipForward className="h-4 w-4" />
              </Button>
              <div className="text-sm text-muted-foreground">
                Measure {currentMeasure + 1} of {sheetData.measures.length}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ZoomOut className="h-4 w-4" />
                <div className="w-24">
                  <Slider value={zoom} onValueChange={handleZoomChange} min={50} max={200} step={10} />
                </div>
                <ZoomIn className="h-4 w-4" />
                <span className="text-sm text-muted-foreground w-12">{zoom[0]}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sheet Music Display */}
      <Card>
        <CardContent className="p-6">
          <div
            className="sheet-music-container bg-white border rounded-lg p-8 min-h-[600px]"
            style={{ transform: `scale(${zoom[0] / 100})`, transformOrigin: "top left" }}
          >
            {/* Staff Lines */}
            <div className="space-y-16">
              {/* Treble Clef Staff */}
              <div className="relative">
                <div className="text-lg font-bold mb-4 text-gray-800">Treble Clef</div>
                <svg width="100%" height="120" className="staff">
                  {/* Staff Lines */}
                  {[0, 1, 2, 3, 4].map((line) => (
                    <line
                      key={line}
                      x1="0"
                      y1={20 + line * 15}
                      x2="100%"
                      y2={20 + line * 15}
                      stroke="#333"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Treble Clef Symbol */}
                  <text x="10" y="50" fontSize="40" fill="#333" fontFamily="serif">
                    𝄞
                  </text>

                  {/* Time Signature */}
                  <text x="60" y="35" fontSize="20" fill="#333" fontWeight="bold">
                    4
                  </text>
                  <text x="60" y="55" fontSize="20" fill="#333" fontWeight="bold">
                    4
                  </text>

                  {/* Sample Notes with highlighting */}
                  <g transform="translate(100, 0)">
                    {/* Measure 1 */}
                    <circle cx="20" cy="35" r="4" fill={activeNotes.includes("C4") ? "#ef4444" : "#333"} />
                    <line x1="24" y1="35" x2="24" y2="5" stroke="#333" strokeWidth="2" />

                    <circle cx="60" cy="50" r="4" fill={activeNotes.includes("E4") ? "#ef4444" : "#333"} />
                    <line x1="64" y1="50" x2="64" y2="20" stroke="#333" strokeWidth="2" />

                    <circle cx="100" cy="42" r="4" fill={activeNotes.includes("G4") ? "#ef4444" : "#333"} />
                    <line x1="104" y1="42" x2="104" y2="12" stroke="#333" strokeWidth="2" />

                    <circle cx="140" cy="35" r="4" fill={activeNotes.includes("C5") ? "#ef4444" : "#333"} />
                    <line x1="144" y1="35" x2="144" y2="5" stroke="#333" strokeWidth="2" />

                    {/* Measure separator */}
                    <line x1="170" y1="20" x2="170" y2="80" stroke="#333" strokeWidth="1" />
                  </g>

                  {/* Additional measures */}
                  <g transform="translate(280, 0)">
                    <circle cx="20" cy="27" r="4" fill="#333" />
                    <line x1="24" y1="27" x2="24" y2="-3" stroke="#333" strokeWidth="2" />

                    <circle cx="60" cy="35" r="4" fill="#333" />
                    <line x1="64" y1="35" x2="64" y2="5" stroke="#333" strokeWidth="2" />

                    <circle cx="100" cy="50" r="4" fill="#333" />
                    <line x1="104" y1="50" x2="104" y2="20" stroke="#333" strokeWidth="2" />

                    <circle cx="140" cy="42" r="4" fill="#333" />
                    <line x1="144" y1="42" x2="144" y2="12" stroke="#333" strokeWidth="2" />

                    <line x1="170" y1="20" x2="170" y2="80" stroke="#333" strokeWidth="1" />
                  </g>

                  {/* Playback cursor */}
                  {isPlaying && (
                    <line
                      x1={100 + playbackPosition}
                      y1="15"
                      x2={100 + playbackPosition}
                      y2="85"
                      stroke="#ef4444"
                      strokeWidth="2"
                      opacity="0.8"
                    />
                  )}
                </svg>
              </div>

              {/* Bass Clef Staff */}
              <div className="relative">
                <div className="text-lg font-bold mb-4 text-gray-800">Bass Clef</div>
                <svg width="100%" height="120" className="staff">
                  {/* Staff Lines */}
                  {[0, 1, 2, 3, 4].map((line) => (
                    <line
                      key={line}
                      x1="0"
                      y1={20 + line * 15}
                      x2="100%"
                      y2={20 + line * 15}
                      stroke="#333"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Bass Clef Symbol */}
                  <text x="10" y="55" fontSize="30" fill="#333" fontFamily="serif">
                    𝄢
                  </text>

                  {/* Time Signature */}
                  <text x="60" y="35" fontSize="20" fill="#333" fontWeight="bold">
                    4
                  </text>
                  <text x="60" y="55" fontSize="20" fill="#333" fontWeight="bold">
                    4
                  </text>

                  <g transform="translate(100, 0)">
                    <circle cx="20" cy="65" r="4" fill="#333" />
                    <line x1="16" y1="65" x2="16" y2="95" stroke="#333" strokeWidth="2" />

                    <circle cx="60" cy="57" r="4" fill="#333" />
                    <line x1="56" y1="57" x2="56" y2="87" stroke="#333" strokeWidth="2" />

                    <circle cx="100" cy="50" r="4" fill="#333" />
                    <line x1="96" y1="50" x2="96" y2="80" stroke="#333" strokeWidth="2" />

                    <circle cx="140" cy="65" r="4" fill="#333" />
                    <line x1="136" y1="65" x2="136" y2="95" stroke="#333" strokeWidth="2" />

                    <line x1="170" y1="20" x2="170" y2="80" stroke="#333" strokeWidth="1" />
                  </g>

                  <g transform="translate(280, 0)">
                    <circle cx="20" cy="72" r="4" fill="#333" />
                    <line x1="16" y1="72" x2="16" y2="102" stroke="#333" strokeWidth="2" />

                    <circle cx="60" cy="65" r="4" fill="#333" />
                    <line x1="56" y1="65" x2="56" y2="95" stroke="#333" strokeWidth="2" />

                    <circle cx="100" cy="57" r="4" fill="#333" />
                    <line x1="96" y1="57" x2="96" y2="87" stroke="#333" strokeWidth="2" />

                    <circle cx="140" cy="50" r="4" fill="#333" />
                    <line x1="96" y1="50" x2="96" y2="80" stroke="#333" strokeWidth="2" />

                    <line x1="170" y1="20" x2="170" y2="80" stroke="#333" strokeWidth="1" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPiano && <VirtualPiano onNotePlay={handleNotePlay} activeNotes={activeNotes} />}

      {/* Sheet Music Analysis */}
      {sheetData.metadata && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Duration</p>
                <p className="text-muted-foreground">{sheetData.metadata.duration}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Difficulty</p>
                <p className="text-muted-foreground">{sheetData.metadata.difficulty}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Genre</p>
                <p className="text-muted-foreground">{sheetData.metadata.genre}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
