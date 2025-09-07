"use client"

import { useEffect, useRef, useState } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type VisualizerEffect = "waves" | "particles" | "bars" | "ripples" | "spiral"

interface MusicVisualizerProps {
  isPlaying: boolean
  currentTrack?: string
  effect?: VisualizerEffect
  className?: string
}

export function MusicVisualizer({ 
  isPlaying, 
  currentTrack, 
  effect = "waves", 
  className = "" 
}: MusicVisualizerProps) {
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
      const interval = setInterval(() => {
        setAudioLevels((prev) => prev.map(() => Math.random() * 0.8 + 0.2))
      }, 120)
      return () => clearInterval(interval)
    } else {
      const interval = setInterval(() => {
        setAudioLevels((prev) => prev.map((val) => val * 0.9))
      }, 120)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const drawWaves = (ctx: CanvasRenderingContext2D, rect: DOMRect, time: number) => {
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Pulsing rings
    audioLevels.forEach((level, index) => {
      const radius = (level * Math.min(rect.width, rect.height) * 0.3) + 50
      const hue = (time * 30 + index * 45) % 360
      
      ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${level * 0.4})`
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
    })

    // Central pulse
    const avgLevel = audioLevels.reduce((a, b) => a + b, 0) / audioLevels.length
    const pulseRadius = 20 + avgLevel * 30
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius)
    
    gradient.addColorStop(0, `hsla(${(time * 100) % 360}, 90%, 80%, 0.8)`)
    gradient.addColorStop(1, `hsla(${(time * 100) % 360}, 70%, 60%, 0)`)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawParticles = (ctx: CanvasRenderingContext2D, rect: DOMRect, time: number) => {
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const avgLevel = audioLevels.reduce((a, b) => a + b, 0) / audioLevels.length

    for (let i = 0; i < 30; i++) {
      const particleTime = time + i * 0.3
      const x = centerX + Math.cos(particleTime) * (80 + avgLevel * 200)
      const y = centerY + Math.sin(particleTime * 1.2) * (60 + avgLevel * 150)
      const size = 3 + avgLevel * 8
      const hue = (time * 80 + i * 12) % 360
      
      ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${avgLevel * 0.9})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // Central glow
    const glowRadius = 40 + avgLevel * 40
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius)
    gradient.addColorStop(0, `hsla(${(time * 120) % 360}, 80%, 70%, 0.6)`)
    gradient.addColorStop(1, `hsla(${(time * 120) % 360}, 60%, 50%, 0)`)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawBars = (ctx: CanvasRenderingContext2D, rect: DOMRect, time: number) => {
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const barCount = 16
    const maxBarHeight = Math.min(rect.width, rect.height) * 0.3

    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * Math.PI * 2
      const levelIndex = i % audioLevels.length
      const barHeight = audioLevels[levelIndex] * maxBarHeight
      const barWidth = 8
      
      const x1 = centerX + Math.cos(angle) * 60
      const y1 = centerY + Math.sin(angle) * 60
      const x2 = centerX + Math.cos(angle) * (60 + barHeight)
      const y2 = centerY + Math.sin(angle) * (60 + barHeight)
      
      const hue = (time * 50 + i * 22.5) % 360
      
      ctx.strokeStyle = `hsla(${hue}, 80%, 65%, 0.8)`
      ctx.lineWidth = barWidth
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    // Central circle
    ctx.fillStyle = `hsla(${(time * 60) % 360}, 70%, 60%, 0.7)`
    ctx.beginPath()
    ctx.arc(centerX, centerY, 25, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawRipples = (ctx: CanvasRenderingContext2D, rect: DOMRect, time: number) => {
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    for (let i = 0; i < 6; i++) {
      const rippleTime = time + i * 0.8
      const maxRadius = Math.min(rect.width, rect.height) * 0.4
      const radius = (Math.sin(rippleTime) * 0.5 + 0.5) * maxRadius
      const avgLevel = audioLevels.reduce((a, b) => a + b, 0) / audioLevels.length
      const alpha = (Math.sin(rippleTime) * 0.3 + 0.2) * avgLevel
      
      const hue = (time * 40 + i * 60) % 360
      
      ctx.strokeStyle = `hsla(${hue}, 70%, 65%, ${alpha})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Animated center
    const pulseSize = 15 + (audioLevels.reduce((a, b) => a + b, 0) / audioLevels.length) * 20
    ctx.fillStyle = `hsla(${(time * 150) % 360}, 85%, 75%, 0.9)`
    ctx.beginPath()
    ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawSpiral = (ctx: CanvasRenderingContext2D, rect: DOMRect, time: number) => {
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const avgLevel = audioLevels.reduce((a, b) => a + b, 0) / audioLevels.length

    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      const hue = (time * 60 + i * 120) % 360
      ctx.strokeStyle = `hsla(${hue}, 75%, 65%, 0.6)`
      ctx.lineWidth = 4
      
      const spiralTime = time + i * Math.PI * 0.67
      for (let angle = 0; angle < Math.PI * 6; angle += 0.1) {
        const radius = (angle * 3) + avgLevel * 50
        const x = centerX + Math.cos(angle + spiralTime) * radius
        const y = centerY + Math.sin(angle + spiralTime) * radius
        
        if (angle === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    }

    // Spiral particles
    for (let i = 0; i < 15; i++) {
      const angle = (time * 2 + i * 0.4) % (Math.PI * 6)
      const radius = (angle * 4) + avgLevel * 60
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      const size = 4 + avgLevel * 6
      
      ctx.fillStyle = `hsla(${(time * 100 + i * 24) % 360}, 80%, 70%, 0.8)`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const time = Date.now() * 0.002

      switch (effect) {
        case "waves":
          drawWaves(ctx, rect, time)
          break
        case "particles":
          drawParticles(ctx, rect, time)
          break
        case "bars":
          drawBars(ctx, rect, time)
          break
        case "ripples":
          drawRipples(ctx, rect, time)
          break
        case "spiral":
          drawSpiral(ctx, rect, time)
          break
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioLevels, effect])

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
      
      {isFullscreen && (
        <div className="absolute bottom-4 left-4 right-4 text-center text-white/70 text-sm pointer-events-none">
          Press ESC or click minimize to exit fullscreen
        </div>
      )}
    </div>
  )
}