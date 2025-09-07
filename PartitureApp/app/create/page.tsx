"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Mic, Edit3, Settings, Sparkles, Clock, Zap, Target } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { AudioRecorder } from "@/components/audio-recorder"
import { UniversalHeader } from "@/components/universal-header"

export default function CreatePage() {
  const handleUploadComplete = (file: File, result: any) => {
    console.log("[v0] Upload completed:", file.name, result)
  }

  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log("[v0] Recording completed:", audioBlob)
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

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Sheet Music Generation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Transform Your Music Into
            <span className="text-primary"> Beautiful Sheets</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload audio files, record live performances, or create from scratch. Our AI will generate professional
            sheet music in seconds.
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-14 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Audio
            </TabsTrigger>
            <TabsTrigger value="record" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Record Live
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Create Manual
            </TabsTrigger>
          </TabsList>

          {/* Upload Audio Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Audio File
                    </CardTitle>
                    <CardDescription>Support for MP3, WAV, FLAC, and other audio formats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUpload type="mp3" onUploadComplete={handleUploadComplete} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Generation Settings</CardTitle>
                    <CardDescription>Customize how your sheet music will be generated</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="instrument">Instrument</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select instrument" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="piano">Piano</SelectItem>
                            <SelectItem value="guitar">Guitar</SelectItem>
                            <SelectItem value="violin">Violin</SelectItem>
                            <SelectItem value="drums">Drums</SelectItem>
                            <SelectItem value="auto">Auto-detect</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="key">Key Signature</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Auto-detect" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto-detect</SelectItem>
                            <SelectItem value="c-major">C Major</SelectItem>
                            <SelectItem value="g-major">G Major</SelectItem>
                            <SelectItem value="d-major">D Major</SelectItem>
                            <SelectItem value="a-minor">A Minor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="complexity">Complexity Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Medium" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple">Simple - Basic notes only</SelectItem>
                          <SelectItem value="medium">Medium - Standard notation</SelectItem>
                          <SelectItem value="advanced">Advanced - Full details</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>Add information about your sheet music</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Enter sheet music title" />
                    </div>
                    <div>
                      <Label htmlFor="composer">Composer/Artist</Label>
                      <Input id="composer" placeholder="Enter composer or artist name" />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Add a description (optional)" rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input id="tags" placeholder="classical, piano, jazz (comma separated)" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                      <Target className="h-4 w-4" />
                      Use AI Tempo Detection
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                      <Settings className="h-4 w-4" />
                      Advanced Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                      <Clock className="h-4 w-4" />
                      Schedule Generation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Record Live Tab */}
          <TabsContent value="record" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="h-5 w-5" />
                      Live Recording
                    </CardTitle>
                    <CardDescription>
                      Record your performance directly and generate sheet music in real-time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AudioRecorder onRecordingComplete={handleRecordingComplete} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recording Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <p>Use a quiet environment for best results</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <p>Play at a steady tempo for accurate transcription</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <p>Record in segments for complex pieces</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Real-time Settings</CardTitle>
                    <CardDescription>Configure live transcription options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="sensitivity">Sensitivity</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Medium" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Less sensitive</SelectItem>
                          <SelectItem value="medium">Medium - Balanced</SelectItem>
                          <SelectItem value="high">High - Very sensitive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="metronome">Metronome</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Off" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="off">Off</SelectItem>
                          <SelectItem value="60">60 BPM</SelectItem>
                          <SelectItem value="80">80 BPM</SelectItem>
                          <SelectItem value="100">100 BPM</SelectItem>
                          <SelectItem value="120">120 BPM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Manual Creation Tab */}
          <TabsContent value="manual" className="space-y-6">
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Edit3 className="h-4 w-4" />
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold mb-4">Manual Sheet Music Editor</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Create sheet music from scratch with our intuitive drag-and-drop editor. Add notes, rests, dynamics, and
                more.
              </p>
              <Button variant="outline" size="lg">
                Join Waitlist
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
