"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Share2, Copy, Facebook, Twitter, Link, Globe, Lock, CheckCircle } from "lucide-react"

interface ShareDialogProps {
  sheetId: string
  title: string
  isShared?: boolean
  children: React.ReactNode
}

interface ShareSettings {
  visibility: "public" | "unlisted" | "private"
  allowComments: boolean
  allowDownload: boolean
  description: string
  tags: string[]
}

export function ShareDialog({ sheetId, title, isShared = false, children }: ShareDialogProps) {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<ShareSettings>({
    visibility: isShared ? "public" : "private",
    allowComments: true,
    allowDownload: false,
    description: "",
    tags: [],
  })
  const [newTag, setNewTag] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const [shareUrl] = useState(`https://partiture.xyz/sheet/${sheetId}`)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(`[v0] Sharing sheet ${sheetId} with settings:`, settings)
    setIsSharing(false)
    setOpen(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy to clipboard:", err)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !settings.tags.includes(newTag.trim())) {
      setSettings((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setSettings((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const shareToSocial = (platform: string) => {
    const text = `Check out "${title}" on Partiture!`
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    }

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share "{title}"
          </DialogTitle>
          <DialogDescription>
            Configure sharing settings and share your music sheet with the community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Visibility Settings */}
          <div className="space-y-3">
            <Label>Visibility</Label>
            <Select
              value={settings.visibility}
              onValueChange={(value: any) => setSettings((prev) => ({ ...prev, visibility: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Public</div>
                      <div className="text-xs text-muted-foreground">Anyone can find and view</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="unlisted">
                  <div className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Unlisted</div>
                      <div className="text-xs text-muted-foreground">Only people with the link</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Private</div>
                      <div className="text-xs text-muted-foreground">Only you can view</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a description for your music sheet..."
              value={settings.description}
              onChange={(e) => setSettings((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
              />
              <Button onClick={addTag} size="sm">
                Add
              </Button>
            </div>
            {settings.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {settings.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <Label>Permissions</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Allow Comments</div>
                  <div className="text-xs text-muted-foreground">Let others comment on your sheet</div>
                </div>
                <Switch
                  checked={settings.allowComments}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, allowComments: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Allow Download</div>
                  <div className="text-xs text-muted-foreground">Let others download your sheet music</div>
                </div>
                <Switch
                  checked={settings.allowDownload}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, allowDownload: checked }))}
                />
              </div>
            </div>
          </div>

          {settings.visibility !== "private" && (
            <>
              <Separator />

              {/* Share Link */}
              <div className="space-y-3">
                <Label>Share Link</Label>
                <div className="flex gap-2">
                  <Input value={shareUrl} readOnly className="flex-1" />
                  <Button onClick={copyToClipboard} size="sm" variant="outline">
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Social Sharing */}
              <div className="space-y-3">
                <Label>Share on Social Media</Label>
                <div className="flex gap-2">
                  <Button onClick={() => shareToSocial("twitter")} size="sm" variant="outline" className="flex-1">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button onClick={() => shareToSocial("facebook")} size="sm" variant="outline" className="flex-1">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setOpen(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleShare} disabled={isSharing} className="flex-1">
              {isSharing ? "Sharing..." : settings.visibility === "private" ? "Save Settings" : "Share"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
