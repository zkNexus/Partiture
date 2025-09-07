"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Piano, Volume2, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface PianoKey {
  note: string
  frequency: number
  isBlack: boolean
  isPressed: boolean
}

interface VirtualPianoProps {
  onNotePlay?: (note: string, frequency: number) => void
  activeNotes?: string[]
  className?: string
}

export function VirtualPiano({ onNotePlay, activeNotes = [], className }: VirtualPianoProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({})
  const [volume, setVolume] = useState(0.3)

  // Piano keys configuration (2 octaves)
  const pianoKeys: PianoKey[] = [
    { note: "C4", frequency: 261.63, isBlack: false, isPressed: false },
    { note: "C#4", frequency: 277.18, isBlack: true, isPressed: false },
    { note: "D4", frequency: 293.66, isBlack: false, isPressed: false },
    { note: "D#4", frequency: 311.13, isBlack: true, isPressed: false },
    { note: "E4", frequency: 329.63, isBlack: false, isPressed: false },
    { note: "F4", frequency: 349.23, isBlack: false, isPressed: false },
    { note: "F#4", frequency: 369.99, isBlack: true, isPressed: false },
    { note: "G4", frequency: 392.0, isBlack: false, isPressed: false },
    { note: "G#4", frequency: 415.3, isBlack: true, isPressed: false },
    { note: "A4", frequency: 440.0, isBlack: false, isPressed: false },
    { note: "A#4", frequency: 466.16, isBlack: true, isPressed: false },
    { note: "B4", frequency: 493.88, isBlack: false, isPressed: false },
    { note: "C5", frequency: 523.25, isBlack: false, isPressed: false },
    { note: "C#5", frequency: 554.37, isBlack: true, isPressed: false },
    { note: "D5", frequency: 587.33, isBlack: false, isPressed: false },
    { note: "D#5", frequency: 622.25, isBlack: true, isPressed: false },
    { note: "E5", frequency: 659.25, isBlack: false, isPressed: false },
    { note: "F5", frequency: 698.46, isBlack: false, isPressed: false },
    { note: "F#5", frequency: 739.99, isBlack: true, isPressed: false },
    { note: "G5", frequency: 783.99, isBlack: false, isPressed: false },
    { note: "G#5", frequency: 830.61, isBlack: true, isPressed: false },
    { note: "A5", frequency: 880.0, isBlack: false, isPressed: false },
    { note: "A#5", frequency: 932.33, isBlack: true, isPressed: false },
    { note: "B5", frequency: 987.77, isBlack: false, isPressed: false },
  ]

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playNote = (note: string, frequency: number) => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    // Resume audio context if suspended (required by some browsers)
    if (audioContext.state === "suspended") {
      audioContext.resume()
    }

    // Create oscillator for the note
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = "sine"

    // Set volume envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)

    // Visual feedback
    setIsPlaying((prev) => ({ ...prev, [note]: true }))
    setTimeout(() => {
      setIsPlaying((prev) => ({ ...prev, [note]: false }))
    }, 200)

    onNotePlay?.(note, frequency)
    console.log(`[v0] Playing note: ${note} at ${frequency}Hz`)
  }

  const handleKeyPress = (key: PianoKey) => {
    playNote(key.note, key.frequency)
  }

  // Keyboard mapping for computer keyboard
  useEffect(() => {
    const keyMap: Record<string, PianoKey> = {
      a: pianoKeys[0], // C4
      w: pianoKeys[1], // C#4
      s: pianoKeys[2], // D4
      e: pianoKeys[3], // D#4
      d: pianoKeys[4], // E4
      f: pianoKeys[5], // F4
      t: pianoKeys[6], // F#4
      g: pianoKeys[7], // G4
      y: pianoKeys[8], // G#4
      h: pianoKeys[9], // A4
      u: pianoKeys[10], // A#4
      j: pianoKeys[11], // B4
      k: pianoKeys[12], // C5
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = keyMap[event.key.toLowerCase()]
      if (key && !isPlaying[key.note]) {
        handleKeyPress(key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPlaying])

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Piano className="h-5 w-5" />
            Virtual Piano
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Use keyboard: A-K keys</Badge>
            <Button size="sm" variant="ghost">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Piano Keys */}
        <div className="relative bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-center">
            <div className="relative">
              {/* White Keys */}
              <div className="flex">
                {pianoKeys
                  .filter((key) => !key.isBlack)
                  .map((key) => (
                    <button
                      key={key.note}
                      className={cn(
                        "w-12 h-32 bg-white border border-gray-300 rounded-b-lg shadow-sm transition-all duration-75",
                        "hover:bg-gray-50 active:bg-gray-100",
                        (isPlaying[key.note] || activeNotes.includes(key.note)) && "bg-blue-100 border-blue-300",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                      )}
                      onClick={() => handleKeyPress(key)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <span className="text-xs text-gray-600 mt-auto block pb-2">{key.note}</span>
                    </button>
                  ))}
              </div>

              {/* Black Keys */}
              <div className="absolute top-0 flex">
                {pianoKeys.map((key, index) => {
                  if (!key.isBlack) return null

                  // Calculate position based on white key positions
                  const whiteKeysBefore = pianoKeys.slice(0, index).filter((k) => !k.isBlack).length
                  const leftOffset = whiteKeysBefore * 48 - 16 // 48px width, 16px offset

                  return (
                    <button
                      key={key.note}
                      className={cn(
                        "absolute w-8 h-20 bg-gray-800 rounded-b-lg shadow-lg transition-all duration-75",
                        "hover:bg-gray-700 active:bg-gray-600",
                        (isPlaying[key.note] || activeNotes.includes(key.note)) && "bg-blue-600",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                      )}
                      style={{ left: `${leftOffset}px` }}
                      onClick={() => handleKeyPress(key)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <span className="text-xs text-white mt-auto block pb-1">{key.note}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Volume: {Math.round(volume * 100)}%</span>
          </div>
          <div className="text-xs text-muted-foreground">Click keys or use keyboard (A-K) to play notes</div>
        </div>
      </CardContent>
    </Card>
  )
}
