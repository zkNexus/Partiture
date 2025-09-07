"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Flag, ThumbsUp, Reply } from "lucide-react"
import { cn } from "@/lib/utils"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    username: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

interface SocialInteractionsProps {
  sheetId: string
  initialLikes?: number
  initialIsLiked?: boolean
  initialComments?: Comment[]
  className?: string
}

export function SocialInteractions({
  sheetId,
  initialLikes = 0,
  initialIsLiked = false,
  initialComments = [],
  className,
}: SocialInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
    console.log(`[v0] ${isLiked ? "Unliked" : "Liked"} sheet ${sheetId}`)
  }

  const handleShare = () => {
    // Open share dialog or copy link
    navigator.clipboard.writeText(`https://partiture.xyz/sheet/${sheetId}`)
    console.log(`[v0] Shared sheet ${sheetId}`)
  }

  const handleComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: "/abstract-geometric-shapes.png",
        username: "currentuser",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    }

    setComments((prev) => [comment, ...prev])
    setNewComment("")
    console.log(`[v0] Added comment to sheet ${sheetId}:`, comment.content)
  }

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: "/abstract-geometric-shapes.png",
        username: "currentuser",
      },
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [reply, ...(comment.replies || [])] } : comment,
      ),
    )
    setReplyContent("")
    setReplyingTo(null)
    console.log(`[v0] Added reply to comment ${commentId}:`, reply.content)
  }

  const handleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment,
      ),
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Action Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className={cn(isLiked && "bg-red-500 hover:bg-red-600")}
              >
                <Heart className={cn("h-4 w-4 mr-2", isLiked && "fill-current")} />
                {likes} {likes === 1 ? "Like" : "Likes"}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment */}
          <div className="space-y-3">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleComment} disabled={!newComment.trim()}>
                Post Comment
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <Badge variant="outline" className="text-xs">
                          @{comment.user.username}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCommentLike(comment.id)}
                        className="h-auto p-1 text-xs"
                      >
                        <ThumbsUp className={cn("h-3 w-3 mr-1", comment.isLiked && "fill-current text-blue-500")} />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="h-auto p-1 text-xs"
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="space-y-2 ml-4">
                        <Textarea
                          placeholder={`Reply to ${comment.user.name}...`}
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleReply(comment.id)} disabled={!replyContent.trim()}>
                            Reply
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-4 space-y-3 border-l-2 border-muted pl-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{reply.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-muted/30 rounded-lg p-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-xs">{reply.user.name}</span>
                                  <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                </div>
                                <p className="text-xs">{reply.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
