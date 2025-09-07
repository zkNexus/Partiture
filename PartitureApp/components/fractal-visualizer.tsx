"use client"

import { useEffect, useRef, useState } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FractalVisualizerProps {
  isPlaying: boolean
  currentTrack?: string
  className?: string
}

export function FractalVisualizer({ isPlaying, currentTrack, className = "" }: FractalVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(8).fill(0))
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      // Simulate simple audio levels when playing
      const interval = setInterval(() => {
        setAudioLevels((prev) => prev.map(() => Math.random() * 0.8 + 0.2))
      }, 120)
      return () => clearInterval(interval)
    } else {
      // Fade out when not playing
      const interval = setInterval(() => {
        setAudioLevels((prev) => prev.map((val) => val * 0.9))
      }, 120)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const time = Date.now() * 0.002

      // Simple circular waves based on audio
      audioLevels.forEach((level, index) => {
        const radius = (level * Math.min(rect.width, rect.height) * 0.3) + 50
        const hue = (time * 30 + index * 45) % 360
        
        // Outer glow ring
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${level * 0.3})`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
        
        // Inner solid ring
        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${level * 0.6})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Floating particles
      for (let i = 0; i < 20; i++) {
        const particleTime = time + i * 0.5
        const avgLevel = audioLevels.reduce((a, b) => a + b, 0) / audioLevels.length
        const x = centerX + Math.cos(particleTime) * (100 + avgLevel * 150)
        const y = centerY + Math.sin(particleTime * 0.7) * (80 + avgLevel * 120)
        const size = 2 + avgLevel * 4
        const hue = (time * 50 + i * 20) % 360
        
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${avgLevel * 0.8})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Central pulsing circle
      const avgLevel = audioLevels.reduce((a, b) => a + b, 0) / audioLevels.length
      const pulseRadius = 20 + avgLevel * 30
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius)
      
      gradient.addColorStop(0, `hsla(${(time * 100) % 360}, 90%, 80%, 0.8)`)
      gradient.addColorStop(1, `hsla(${(time * 100) % 360}, 70%, 60%, 0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
      ctx.fill()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioLevels])

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen()
        }
        setIsFullscreen(true)
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        }
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gradient-to-br from-black/95 via-purple-900/60 to-blue-900/60 ${className} ${
        isFullscreen ? 'bg-black' : ''
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
      
      {/* Fullscreen Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-10 bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white border-white/10"
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </Button>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      
      {/* Fullscreen info overlay */}
      {isFullscreen && (
        <div className="absolute bottom-4 left-4 right-4 text-center text-white/70 text-sm pointer-events-none">
          Press ESC or click minimize to exit fullscreen
        </div>
      )}
    </div>
  )
}