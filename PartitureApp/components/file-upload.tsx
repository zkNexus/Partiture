"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileMusic, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  type: "mp3" | "sheet"
  onUploadComplete?: (file: File, result: any) => void
  className?: string
}

interface UploadFile extends File {
  id: string
  progress: number
  status: "uploading" | "completed" | "error"
  error?: string
}

export function FileUpload({ type, onUploadComplete, className }: FileUploadProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])

  const acceptedFileTypes =
    type === "mp3"
      ? { "audio/mpeg": [".mp3"], "audio/wav": [".wav"] }
      : { "application/pdf": [".pdf"], "image/*": [".png", ".jpg", ".jpeg"] }

  const maxSize = type === "mp3" ? 50 * 1024 * 1024 : 10 * 1024 * 1024 // 50MB for audio, 10MB for sheets

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: "uploading" as const,
    }))

    setUploadFiles((prev) => [...prev, ...newFiles])

    // Simulate upload for each file
    newFiles.forEach((file) => {
      uploadFile(file)
    })
  }, [])

  const uploadFile = async (file: UploadFile) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, progress: Math.min(f.progress + Math.random() * 20, 90) } : f)),
        )
      }, 200)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()

      setUploadFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, progress: 100, status: "completed" as const } : f)),
      )

      onUploadComplete?.(file, result)
    } catch (error) {
      setUploadFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: "error" as const, error: "Upload failed" } : f)),
      )
    }
  }

  const removeFile = (fileId: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize,
    multiple: true,
  })

  const title = type === "mp3" ? "Upload MP3 File" : "Upload Music Sheet"
  const description =
    type === "mp3"
      ? "Our AI will generate sheet music from your audio file"
      : "Upload existing sheet music in PDF or image format"
  const icon = type === "mp3" ? Upload : FileMusic

  const IconComponent = icon

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
        )}
      >
        <input {...getInputProps()} />
        <IconComponent className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {isDragActive ? (
          <p className="text-primary font-medium">Drop files here...</p>
        ) : (
          <Button variant={type === "mp3" ? "default" : "outline"} className={type === "sheet" ? "bg-transparent" : ""}>
            Choose {type === "mp3" ? "MP3" : "Sheet"} File
          </Button>
        )}
      </div>

      {uploadFiles.length > 0 && (
        <div className="space-y-3">
          {uploadFiles.map((file) => (
            <div key={file.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      file.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : file.status === "error"
                          ? "bg-red-100 text-red-600"
                          : "bg-primary/10 text-primary",
                    )}
                  >
                    {file.status === "completed" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : file.status === "error" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <IconComponent className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {file.status === "uploading" && (
                <div className="space-y-2">
                  <Progress value={file.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Uploading... {Math.round(file.progress)}%</p>
                </div>
              )}

              {file.status === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{file.error}</AlertDescription>
                </Alert>
              )}

              {file.status === "completed" && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Upload completed successfully</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
