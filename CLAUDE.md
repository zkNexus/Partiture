# CLAUDE.md - Partiture Development Context

## Project Overview

**Partiture** is a comprehensive music platform that transforms audio files into beautiful sheet music with advanced playlist management and customizable visual effects. The project is built as a modern web application with Base blockchain integration as a Mini App.

## Project Structure

### Main Application (`/PartitureApp/`)
- **Type**: Next.js 14 with App Router
- **Purpose**: Main web application for users
- **Tech Stack**: React, TypeScript, Tailwind CSS, Radix UI
- **Domain**: partiture.xyz

### Smart Contracts (`/PartitureContracts/`)
- **Type**: Hardhat project with Solidity contracts  
- **Purpose**: Blockchain contracts for NFT functionality
- **Tech Stack**: Solidity, Hardhat, OpenZeppelin
- **Networks**: Base Mainnet & Base Sepolia
- **Features**: Music sheet NFTs, royalties, metadata management

> **📋 Project Organization Rule**: All smart contracts MUST be placed in the `/PartitureContracts/` directory. The `/PartitureApp/` directory is exclusively for the main web application. This separation ensures clear organization between frontend and blockchain components.

## Current Implementation Status

### ✅ **Completed Features**

#### Core Application Structure
- **Next.js 14** with App Router and TypeScript
- **Mobile-first responsive design** with desktop optimization
- **Universal Header** navigation system
- **Mobile Footer Navigation** for seamless mobile experience
- **Theme system** with dark/light mode support

#### Visual Effects System
- **5 Custom Canvas-based Visualizers**:
  - **Waves**: Pulsing circular patterns with audio reactivity
  - **Particles**: Floating animated particles with movement
  - **Bars**: Radiating audio bars in circular arrangement
  - **Ripples**: Water-like ripple effects with fade
  - **Spiral**: Spinning spiral patterns with particles
- **Real-time Audio Visualization** with simulated audio levels
- **Performance Optimized** rendering (resolved browser freeze issues)

#### Playlist Management System
- **Complete CRUD Operations**: Create, Read, Update, Delete playlists
- **Visual Effect Assignment**: Each playlist can have custom visualizer
- **Privacy Controls**: Public/private playlist options
- **Color Theme System**: 12 gradient options for playlist covers
- **Metadata Management**: Name, description, song count, privacy settings
- **Edit Modal System**: Full-featured playlist editing with form validation

#### User Interface Components
- **File Upload System**: Drag-and-drop with React Dropzone
- **Form Management**: React Hook Form with Zod validation
- **Modal Dialogs**: Create/Edit playlist dialogs with shadcn/ui
- **Responsive Cards**: Playlist and music sheet display cards
- **Loading States**: Skeleton loaders and loading indicators

### 🚧 **In Development**

#### Audio Processing Pipeline
- File upload handlers (UI complete, backend integration needed)
- Audio transcription system (planned with AI integration)
- Sheet music generation (VexFlow integration planned)

#### Smart Contracts System
- **PartitureNFT Contract**: ERC-721 NFT contract with metadata storage
- **Base Network Integration**: Deployed on Base Mainnet & Base Sepolia
- **Features**: Royalty system, privacy controls, creator management
- **Verification**: BaseScan integration for contract verification

#### Base Blockchain Integration
- **Frontend Integration**: Wallet connection system (planned)
- **Farcaster Frame**: Mini App development (planned)  
- **IPFS Integration**: Metadata storage (planned)
- **Contract Interaction**: Web3 integration with deployed contracts

### 📱 **Application Structure**

```
PartitureApp/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page with hero and community sheets
│   ├── dashboard/page.tsx        # User dashboard with library management
│   ├── create/page.tsx          # Creation tools (upload/record/manual)
│   ├── playlist/page.tsx        # Playlist management with visual effects
│   ├── explore/page.tsx         # Community discovery
│   ├── profile/page.tsx         # User profile management
│   └── settings/page.tsx        # App settings and preferences
├── components/                   # Reusable UI components
│   ├── music-visualizer.tsx     # Main visualizer with 5 effects
│   ├── visualizer-effect-selector.tsx  # Effect selection UI
│   ├── universal-header.tsx     # Navigation header
│   ├── mobile-footer-nav.tsx    # Mobile navigation
│   ├── file-upload.tsx          # Drag-and-drop file upload
│   ├── audio-recorder.tsx       # Live audio recording
│   └── ui/                      # shadcn/ui components
└── lib/                         # Utilities and helpers
```

### 🎨 **Design System**

#### Color Schemes (12 Gradient Options)
1. `from-pink-500 via-red-500 to-orange-500`
2. `from-blue-500 via-purple-500 to-indigo-600`
3. `from-emerald-500 via-teal-500 to-cyan-500`
4. `from-amber-500 via-yellow-500 to-orange-400`
5. `from-red-600 via-rose-500 to-pink-500`
6. `from-violet-500 via-purple-500 to-fuchsia-500`
7. `from-green-500 via-emerald-500 to-teal-500`
8. `from-orange-500 via-red-500 to-pink-500`
9. `from-cyan-500 via-blue-500 to-purple-500`
10. `from-lime-500 via-green-500 to-emerald-500`
11. `from-rose-500 via-pink-500 to-purple-500`
12. `from-yellow-500 via-orange-500 to-red-500`

#### Typography & Spacing
- **Font**: Geist Sans with Geist Mono for code
- **Responsive breakpoints**: Mobile-first with md:, lg:, xl: variants
- **Consistent spacing**: Using Tailwind's spacing scale

### 🔧 **Technical Implementation Details**

#### Performance Optimizations
- **Canvas Rendering**: Optimized animation loops with `requestAnimationFrame`
- **Audio Levels**: Simulated with `Math.random()` for demo purposes
- **Component Memoization**: React patterns for efficient re-renders
- **Mobile Optimization**: Touch-friendly interfaces and responsive layouts

#### State Management
- **React Hooks**: useState, useEffect, useRef for local state
- **Form Validation**: React Hook Form with Zod schemas
- **Modal States**: Controlled dialogs with show/hide state management
- **Navigation State**: usePathname for active link highlighting

#### Data Structure Examples
```typescript
// Playlist Interface
interface Playlist {
  id: number
  name: string
  description: string
  coverColor: string  // Tailwind gradient class
  visualizerEffect: VisualizerEffect
  sheets: MusicSheet[]
  isPublic: boolean
}

// Visual Effects Type
type VisualizerEffect = "waves" | "particles" | "bars" | "ripples" | "spiral"

// Music Sheet Interface  
interface MusicSheet {
  id: number
  title: string
  composer: string
  duration: string
  isPlaying: boolean
}
```

### 🚀 **Next Development Phases**

#### Phase 1: Audio Processing Integration
1. **Backend API Development**
   - File upload endpoint implementation
   - Audio processing pipeline setup
   - AI transcription service integration
   
2. **Sheet Music Generation**
   - VexFlow integration for notation rendering
   - Playback system with Tone.js
   - Export functionality (PDF, MIDI, MusicXML)

#### Phase 2: Base Blockchain Integration
1. **Smart Contracts**
   - ERC-721 NFT contract for sheet music
   - Royalty distribution system
   - Metadata storage on IPFS
   
2. **Wallet Integration**
   - RainbowKit setup for wallet connections
   - Wagmi/Viem for blockchain interactions
   - Base network configuration

#### Phase 3: Farcaster Frame Development
1. **Frame Endpoints**
   - Upload and share functionality
   - Preview generation
   - Social interaction handlers
   
2. **Mini App Features**
   - Seamless Farcaster integration
   - Social sharing mechanisms
   - Community features

### 🛠️ **Development Commands**

```bash
# Development server
npm run dev

# Production build
npm run build

# Code linting
npm run lint

# Type checking
npm run type-check
```

### 📋 **Known Issues & Resolutions**

1. **Browser Freeze on Playlist Detail** ✅ **RESOLVED**
   - **Issue**: Complex fractal visualizer causing performance problems
   - **Solution**: Replaced with 5 optimized Canvas effects with reduced computational complexity

2. **Mobile Navigation** ✅ **COMPLETED**
   - **Implementation**: Mobile footer navigation with active state management
   - **Responsive**: Desktop sidebar + mobile footer pattern

3. **Edit Playlist Functionality** ✅ **COMPLETED**
   - **Feature**: Full edit dialog with form pre-population
   - **Validation**: Comprehensive form validation with error handling

### 🔮 **Future Considerations**

- **Real Audio Processing**: Integration with actual audio analysis libraries
- **Machine Learning**: AI-powered sheet music transcription
- **Social Features**: User following, sharing, and collaboration
- **Monetization**: Premium features, NFT marketplace
- **Mobile App**: React Native version for native mobile experience

---

**Last Updated**: Generated automatically during development session
**Status**: Active development with playlist management and visual effects complete