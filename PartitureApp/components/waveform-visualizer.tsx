"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface WaveformVisualizerProps {
  audioUrl?: string
  isPlaying?: boolean
  currentTime?: number
  duration?: number
  className?: string
}

export function WaveformVisualizer({
  audioUrl,
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  className,
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number>()
  const [waveformData, setWaveformData] = useState<number[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      startVisualization()
    } else {
      stopVisualization()
    }
  }, [isPlaying])

  const startVisualization = () => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256
    analyserRef.current = analyser

    // Generate mock waveform data for demonstration
    generateMockWaveform()

    animate()
  }

  const stopVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const generateMockWaveform = () => {
    // Generate realistic-looking waveform data
    const dataArray = new Array(128).fill(0).map((_, i) => {
      const base = Math.sin(i * 0.1) * 50 + 50
      const variation = Math.random() * 30 - 15
      const envelope = Math.sin((i / 128) * Math.PI) * 0.8 + 0.2
      return Math.max(0, Math.min(255, (base + variation) * envelope))
    })
    setWaveformData(dataArray)
  }

  const animate = () => {
    if (!canvasRef.current || !analyserRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Generate dynamic waveform data
    const dataArray = new Array(128).fill(0).map((_, i) => {
      const time = Date.now() * 0.001
      const base = Math.sin(i * 0.1 + time) * 50 + 50
      const variation = Math.sin(i * 0.05 + time * 2) * 20
      const envelope = Math.sin((i / 128) * Math.PI) * 0.8 + 0.2
      return Math.max(0, Math.min(255, (base + variation) * envelope))
    })

    // Draw waveform
    const barWidth = canvas.width / dataArray.length
    const centerY = canvas.height / 2

    ctx.fillStyle = "#3b82f6"

    dataArray.forEach((value, i) => {
      const barHeight = (value / 255) * (canvas.height * 0.8)
      const x = i * barWidth
      const y = centerY - barHeight / 2

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
      gradient.addColorStop(0, "#3b82f6")
      gradient.addColorStop(1, "#1d4ed8")
      ctx.fillStyle = gradient

      ctx.fillRect(x, y, barWidth - 1, barHeight)
    })

    // Draw progress indicator
    if (duration > 0) {
      const progressX = (currentTime / duration) * canvas.width
      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(progressX, 0)
      ctx.lineTo(progressX, canvas.height)
      ctx.stroke()
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Audio Waveform
          </CardTitle>
          <Badge variant={isPlaying ? "default" : "secondary"}>{isPlaying ? "Playing" : "Paused"}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-32 bg-muted/30 rounded-lg"
            style={{ width: "100%", height: "128px" }}
          />
          {!isPlaying && waveformData.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Play audio to see waveform</p>
              </div>
            </div>
          )}
        </div>

        {duration > 0 && (
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0")}
            </span>
            <span>
              {Math.floor(duration / 60)}:
              {Math.floor(duration % 60)
                .toString()
                .padStart(2, "0")}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
