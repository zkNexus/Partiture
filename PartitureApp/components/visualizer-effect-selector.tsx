"use client"

import { VisualizerEffect } from "./music-visualizer"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Waves, Sparkles, BarChart3, Target, Shuffle } from "lucide-react"

interface VisualizerEffectSelectorProps {
  selectedEffect: VisualizerEffect
  onEffectChange: (effect: VisualizerEffect) => void
}

const effects: { 
  id: VisualizerEffect
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  preview: string
}[] = [
  {
    id: "waves",
    name: "Waves",
    description: "Pulsing circular waves",
    icon: Waves,
    preview: "from-blue-500 to-cyan-500"
  },
  {
    id: "particles",
    name: "Particles",
    description: "Floating light particles",
    icon: Sparkles,
    preview: "from-purple-500 to-pink-500"
  },
  {
    id: "bars",
    name: "Bars",
    description: "Radiating audio bars",
    icon: BarChart3,
    preview: "from-green-500 to-emerald-500"
  },
  {
    id: "ripples",
    name: "Ripples",
    description: "Water ripple effects",
    icon: Target,
    preview: "from-orange-500 to-red-500"
  },
  {
    id: "spiral",
    name: "Spiral",
    description: "Spinning spiral patterns",
    icon: Shuffle,
    preview: "from-violet-500 to-fuchsia-500"
  }
]

export function VisualizerEffectSelector({ selectedEffect, onEffectChange }: VisualizerEffectSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Visual Effect</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {effects.map((effect) => {
          const Icon = effect.icon
          const isSelected = selectedEffect === effect.id
          
          return (
            <Card
              key={effect.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${
                isSelected 
                  ? "ring-2 ring-primary ring-offset-2 bg-primary/5" 
                  : "hover:shadow-lg"
              }`}
              onClick={() => onEffectChange(effect.id)}
            >
              <div className="text-center space-y-3">
                <div
                  className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-r ${effect.preview} flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{effect.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{effect.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}