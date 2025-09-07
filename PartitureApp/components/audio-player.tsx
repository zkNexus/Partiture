"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Download, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  audioUrl?: string
  title: string
  artist: string
  duration?: string
  onTimeUpdate?: (currentTime: number, duration: number) => void
  className?: string
}

export function AudioPlayer({ audioUrl, title, artist, duration = "0:00", onTimeUpdate, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [playbackRate, setPlaybackRate] = useState([1])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setTotalDuration(audio.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      onTimeUpdate?.(audio.currentTime, audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("loadstart", handleLoadStart)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("loadstart", handleLoadStart)
    }
  }, [onTimeUpdate])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (value[0] / 100) * totalDuration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    setVolume(value)
    audio.volume = value[0] / 100
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume[0] / 100
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const handlePlaybackRateChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    setPlaybackRate(value)
    audio.playbackRate = value[0]
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.max(0, audio.currentTime - 10)
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.min(totalDuration, audio.currentTime + 10)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        {/* Hidden audio element */}
        <audio ref={audioRef} src={audioUrl || "/placeholder-audio.mp3"} preload="metadata" />

        {/* Track Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm">{artist}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{formatTime(totalDuration)}</Badge>
            <Button size="sm" variant="ghost">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <Slider value={[progressPercentage]} onValueChange={handleSeek} max={100} step={0.1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button size="sm" variant="ghost">
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={skipBackward}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button size="lg" onClick={togglePlayPause} disabled={isLoading} className="h-12 w-12 rounded-full">
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
          <Button size="sm" variant="ghost" onClick={skipForward}>
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <Repeat className="h-4 w-4" />
          </Button>
        </div>

        {/* Secondary Controls */}
        <div className="flex items-center justify-between">
          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <div className="w-20">
              <Slider value={isMuted ? [0] : volume} onValueChange={handleVolumeChange} max={100} step={1} />
            </div>
          </div>

          {/* Playback Speed */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Speed:</span>
            <div className="w-20">
              <Slider value={playbackRate} onValueChange={handlePlaybackRateChange} min={0.5} max={2} step={0.1} />
            </div>
            <span className="text-xs text-muted-foreground w-8">{playbackRate[0]}x</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
