# Partiture Backend Setup Guide

## Overview

Partiture uses Firebase as the backend with OpenAI for AI-powered audio-to-sheet-music transcription. This guide covers the complete backend setup process.

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App  │───▶│   Firebase       │───▶│   OpenAI API    │
│   (Frontend)   │    │   (Backend)      │    │   (AI Service)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Wallet Connect  │    │ • Authentication │    │ • Whisper ASR   │
│ Base Network    │    │ • Firestore DB   │    │ • GPT-4 Audio   │
│ Farcaster SDK   │    │ • Storage        │    │ • Music Analysis│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Firebase Setup

### 1. Create Firebase Project

```bash
# Visit https://console.firebase.google.com/
# Click "Create a project"
# Project name: "partiture-app"
# Enable Google Analytics (optional)
```

### 2. Enable Services

#### Authentication
```bash
# Go to Authentication > Sign-in method
# Enable providers:
# - Email/Password
# - Google
# - Anonymous (for guests)
```

#### Firestore Database
```bash
# Go to Firestore Database
# Click "Create database"
# Start in test mode (we'll add security rules later)
# Choose location closest to your users
```

#### Storage
```bash
# Go to Storage
# Click "Get started"
# Start in test mode
# Choose same location as Firestore
```

### 3. Get Configuration

#### Client Configuration
```bash
# Go to Project Settings > General
# Scroll to "Your apps" section
# Click "Web app" icon (</>)
# Register app: "Partiture Web App"
# Copy the config object
```

#### Admin SDK
```bash
# Go to Project Settings > Service Accounts
# Click "Generate new private key"
# Download JSON file (keep it secure!)
# Extract values for .env.local
```

## OpenAI Setup

### 1. Create API Key

```bash
# Visit https://platform.openai.com/api-keys
# Click "Create new secret key"
# Name: "Partiture Audio Transcription"
# Copy the key (starts with sk-proj-)
```

### 2. Set Usage Limits

```bash
# Go to Settings > Billing > Usage limits
# Set monthly limit (e.g., $50) to avoid surprises
# Enable email notifications at 80% usage
```

### 3. Get Organization Details

```bash
# Go to Settings > Organization
# Copy Organization ID (starts with org-)
# Go to Settings > Projects (if using projects)
# Copy Project ID (starts with proj_)
```

## Environment Variables Setup

### Required Variables

```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Essential for basic functionality
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
OPENAI_API_KEY=

# Firebase Client (get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK (from downloaded JSON)
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
```

## Database Schema

### Firestore Collections

#### Users Collection
```javascript
// users/{uid}
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  walletAddress: string, // Base network wallet
  farcasterFid: number, // Farcaster user ID
  createdAt: timestamp,
  updatedAt: timestamp,
  preferences: {
    theme: 'light' | 'dark',
    defaultInstrument: string,
    autoTranscribe: boolean
  }
}
```

#### Music Sheets Collection
```javascript
// musicSheets/{sheetId}
{
  id: string,
  title: string,
  composer: string,
  userId: string, // Owner
  audioFileUrl: string, // Firebase Storage URL
  sheetMusicUrl: string, // Generated sheet music
  midiUrl: string, // Generated MIDI file
  metadata: {
    duration: number, // seconds
    key: string, // Musical key
    timeSignature: string,
    tempo: number, // BPM
    genre: string,
    instruments: string[]
  },
  transcriptionData: {
    status: 'pending' | 'processing' | 'completed' | 'failed',
    openaiJobId: string,
    confidence: number, // 0-1
    processingTime: number, // milliseconds
    errorMessage: string
  },
  isPublic: boolean,
  tags: string[],
  plays: number,
  likes: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Playlists Collection
```javascript
// playlists/{playlistId}
{
  id: string,
  name: string,
  description: string,
  userId: string,
  sheetIds: string[], // References to musicSheets
  coverColor: string, // Gradient class
  visualizerEffect: 'waves' | 'particles' | 'bars' | 'ripples' | 'spiral',
  isPublic: boolean,
  tags: string[],
  plays: number,
  likes: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Audio Uploads Collection
```javascript
// audioUploads/{uploadId}
{
  id: string,
  userId: string,
  originalFileName: string,
  fileSize: number, // bytes
  mimeType: string,
  storageRef: string, // Firebase Storage reference
  uploadStatus: 'uploading' | 'completed' | 'failed',
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed',
  sheetMusicId: string, // Generated sheet reference
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## API Routes Structure

```
/api/
├── auth/
│   ├── login.ts          # Firebase Auth integration
│   ├── logout.ts         # Session cleanup
│   └── profile.ts        # User profile management
├── audio/
│   ├── upload.ts         # Handle audio file uploads
│   ├── process.ts        # Trigger AI transcription
│   └── status.ts         # Check processing status
├── sheets/
│   ├── generate.ts       # Create sheet music from AI data
│   ├── [id].ts          # Get/update specific sheet
│   └── search.ts         # Search public sheets
├── playlists/
│   ├── create.ts         # Create new playlist
│   ├── [id].ts          # CRUD operations
│   └── public.ts         # Get public playlists
└── openai/
    ├── transcribe.ts     # OpenAI Whisper integration
    └── analyze.ts        # Musical analysis with GPT-4
```

## Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Music sheets - public read, owner write
    match /musicSheets/{sheetId} {
      allow read: if resource.data.isPublic == true || 
                 (request.auth != null && request.auth.uid == resource.data.userId);
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Playlists - public read if public, owner full access
    match /playlists/{playlistId} {
      allow read: if resource.data.isPublic == true || 
                 (request.auth != null && request.auth.uid == resource.data.userId);
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Audio uploads - owner only
    match /audioUploads/{uploadId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Audio uploads - owner only, size limit 50MB
    match /audio-uploads/{userId}/{fileName} {
      allow read, write: if request.auth != null && request.auth.uid == userId
                        && resource.size < 50 * 1024 * 1024;
    }
    
    // Generated sheets - public read, owner write
    match /generated-sheets/{userId}/{sheetId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User profiles - owner only
    match /user-profiles/{userId}/{fileName} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Audio Processing Pipeline

### 1. File Upload
```typescript
// User uploads audio file
POST /api/audio/upload
→ Validate file (size, format, duration)
→ Upload to Firebase Storage
→ Create audioUploads document
→ Return upload ID
```

### 2. AI Transcription
```typescript
// Trigger OpenAI processing
POST /api/audio/process
→ Download audio from Storage
→ Send to OpenAI Whisper API
→ Get transcription + musical analysis
→ Create musicSheets document
→ Generate sheet music files
→ Update processing status
```

### 3. Sheet Generation
```typescript
// Generate visual sheet music
POST /api/sheets/generate
→ Use transcription data
→ Generate MusicXML/MIDI
→ Create PDF sheet music
→ Upload files to Storage
→ Update sheet document
```

## Deployment Checklist

### Pre-Deploy
- [ ] Firebase project created and configured
- [ ] OpenAI API key with billing enabled
- [ ] All environment variables set
- [ ] Security rules configured
- [ ] CORS configured for Storage

### Deploy
- [ ] Deploy to Vercel/Netlify
- [ ] Set production environment variables
- [ ] Test basic functionality
- [ ] Test file upload pipeline
- [ ] Test AI transcription
- [ ] Test in all three environments (Browser/Farcaster Web/Mobile)

### Post-Deploy
- [ ] Monitor Firebase usage
- [ ] Monitor OpenAI API usage
- [ ] Set up error monitoring
- [ ] Configure backup strategy
- [ ] Set up analytics

## Monitoring & Maintenance

### Firebase Console Monitoring
- Authentication usage
- Firestore read/write operations
- Storage bandwidth and requests
- Security rule violations

### OpenAI Usage Monitoring
- API request volume
- Token usage
- Processing time trends
- Error rates

### Application Monitoring
- File upload success rates
- Transcription accuracy
- User engagement metrics
- Error logs and debugging