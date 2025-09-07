"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wand2, Music, FileMusic, CheckCircle, AlertCircle } from "lucide-react"

interface GenerationSettings {
  title: string
  composer: string
  key: string
  timeSignature: string
  tempo: number
  style: string
  complexity: string
  notes?: string
}

interface GenerationStep {
  id: string
  name: string
  description: string
  status: "pending" | "processing" | "completed" | "error"
  progress: number
}

export function SheetMusicGenerator() {
  const [settings, setSettings] = useState<GenerationSettings>({
    title: "",
    composer: "",
    key: "C",
    timeSignature: "4/4",
    tempo: 120,
    style: "classical",
    complexity: "intermediate",
    notes: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([
    {
      id: "analyze",
      name: "Audio Analysis",
      description: "Analyzing audio frequencies and patterns",
      status: "pending",
      progress: 0,
    },
    {
      id: "transcribe",
      name: "Note Transcription",
      description: "Converting audio to musical notation",
      status: "pending",
      progress: 0,
    },
    {
      id: "format",
      name: "Sheet Formatting",
      description: "Formatting notes into readable sheet music",
      status: "pending",
      progress: 0,
    },
    {
      id: "optimize",
      name: "Optimization",
      description: "Optimizing layout and readability",
      status: "pending",
      progress: 0,
    },
  ])

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate the generation process
    for (let i = 0; i < generationSteps.length; i++) {
      const step = generationSteps[i]

      // Start processing step
      setGenerationSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, status: "processing" } : s)))

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setGenerationSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, progress } : s)))
      }

      // Complete step
      setGenerationSteps((prev) =>
        prev.map((s) => (s.id === step.id ? { ...s, status: "completed", progress: 100 } : s)),
      )
    }

    setIsGenerating(false)
  }

  const updateSetting = (key: keyof GenerationSettings, value: string | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Generation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Sheet Music Generation Settings
          </CardTitle>
          <CardDescription>Configure how your audio file will be converted to sheet music</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter song title"
                value={settings.title}
                onChange={(e) => updateSetting("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="composer">Composer/Artist</Label>
              <Input
                id="composer"
                placeholder="Enter composer or artist name"
                value={settings.composer}
                onChange={(e) => updateSetting("composer", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="key">Key Signature</Label>
              <Select value={settings.key} onValueChange={(value) => updateSetting("key", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C">C Major</SelectItem>
                  <SelectItem value="G">G Major</SelectItem>
                  <SelectItem value="D">D Major</SelectItem>
                  <SelectItem value="A">A Major</SelectItem>
                  <SelectItem value="E">E Major</SelectItem>
                  <SelectItem value="F">F Major</SelectItem>
                  <SelectItem value="Bb">B♭ Major</SelectItem>
                  <SelectItem value="Eb">E♭ Major</SelectItem>
                  <SelectItem value="Am">A Minor</SelectItem>
                  <SelectItem value="Em">E Minor</SelectItem>
                  <SelectItem value="Bm">B Minor</SelectItem>
                  <SelectItem value="Dm">D Minor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSignature">Time Signature</Label>
              <Select value={settings.timeSignature} onValueChange={(value) => updateSetting("timeSignature", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4/4">4/4</SelectItem>
                  <SelectItem value="3/4">3/4</SelectItem>
                  <SelectItem value="2/4">2/4</SelectItem>
                  <SelectItem value="6/8">6/8</SelectItem>
                  <SelectItem value="9/8">9/8</SelectItem>
                  <SelectItem value="12/8">12/8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempo">Tempo (BPM)</Label>
              <Input
                id="tempo"
                type="number"
                min="60"
                max="200"
                value={settings.tempo}
                onChange={(e) => updateSetting("tempo", Number.parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="style">Musical Style</Label>
              <Select value={settings.style} onValueChange={(value) => updateSetting("style", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classical">Classical</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="folk">Folk</SelectItem>
                  <SelectItem value="blues">Blues</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="complexity">Complexity Level</Label>
              <Select value={settings.complexity} onValueChange={(value) => updateSetting("complexity", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific instructions or preferences for the sheet music generation..."
              value={settings.notes}
              onChange={(e) => updateSetting("notes", e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating || !settings.title} className="w-full" size="lg">
            {isGenerating ? (
              <>
                <Music className="h-4 w-4 mr-2 animate-spin" />
                Generating Sheet Music...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Sheet Music
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card>
          <CardHeader>
            <CardTitle>Generation Progress</CardTitle>
            <CardDescription>Converting your audio file to sheet music notation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generationSteps.map((step) => (
                <div key={step.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-full ${
                          step.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : step.status === "processing"
                              ? "bg-blue-100 text-blue-600"
                              : step.status === "error"
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : step.status === "error" ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <FileMusic className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{step.name}</p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        step.status === "completed"
                          ? "default"
                          : step.status === "processing"
                            ? "secondary"
                            : step.status === "error"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {step.status === "pending"
                        ? "Waiting"
                        : step.status === "processing"
                          ? "Processing"
                          : step.status === "completed"
                            ? "Complete"
                            : "Error"}
                    </Badge>
                  </div>
                  {step.status === "processing" && <Progress value={step.progress} className="h-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
