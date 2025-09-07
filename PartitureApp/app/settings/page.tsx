"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Monitor, Bell, Volume2, Download, Share2, Palette, Music } from "lucide-react"
import { UniversalHeader } from "@/components/universal-header"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)
  const [downloadQuality, setDownloadQuality] = useState("high")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
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

      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Appearance Settings */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Appearance</CardTitle>
                <CardDescription>Customize how Partiture looks on your device</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Theme</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="h-16 flex-col gap-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-blue-100 opacity-20" />
                  <Sun className="h-5 w-5" />
                  <span className="text-sm font-medium">Light</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="h-16 flex-col gap-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-20" />
                  <Moon className="h-5 w-5" />
                  <span className="text-sm font-medium">Dark</span>
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="h-16 flex-col gap-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <Monitor className="h-5 w-5" />
                  <span className="text-sm font-medium">System</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Choose your preferred theme. System will match your device settings.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Audio Settings */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-accent">
                <Volume2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Audio & Playback</CardTitle>
                <CardDescription>Configure audio settings and playback preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Auto-play in Explore</Label>
                <p className="text-sm text-muted-foreground">Automatically play music when browsing sheets</p>
              </div>
              <Switch checked={autoPlay} onCheckedChange={setAutoPlay} />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-base font-medium">Download Quality</Label>
              <Select value={downloadQuality} onValueChange={setDownloadQuality}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Quality (128kbps)</SelectItem>
                  <SelectItem value="medium">Medium Quality (256kbps)</SelectItem>
                  <SelectItem value="high">High Quality (320kbps)</SelectItem>
                  <SelectItem value="lossless">Lossless (FLAC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-primary">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about new features and updates</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Account & Data */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Music className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Account & Data</CardTitle>
                <CardDescription>Manage your account and data preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 justify-start gap-3 bg-transparent">
                <Download className="h-4 w-4" />
                Export My Data
              </Button>
              <Button variant="outline" className="h-12 justify-start gap-3 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share Profile
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Used</span>
                <Badge variant="secondary">2.4 GB / 10 GB</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: "24%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">Partiture v1.0.0 • Made with ♪ for musicians</p>
        </div>
      </div>
    </div>
  )
}
