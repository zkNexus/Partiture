# 🎵 Partiture

**AI-Powered Music Sheet Generation & Sharing Platform with Visual Effects**

Partiture is a comprehensive music platform that transforms audio files into beautiful sheet music, features playlist management with customizable visual effects, and is being developed as a Base Mini App for blockchain integration. Built with Next.js 14 and modern React patterns.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/partiture)
[![Base Network](https://img.shields.io/badge/Base-Blockchain-blue)](https://base.org)
[![Farcaster](https://img.shields.io/badge/Farcaster-Frame-purple)](https://farcaster.xyz)

## ✨ Features

### 🎼 Core Music Features
- **MP3 to Sheet Music**: Upload audio files and generate professional sheet music notation
- **Live Audio Recording**: Record live performances directly in the app
- **Manual Creation**: Create sheet music from scratch with visual editors
- **Multiple Formats**: Support for MP3, WAV, FLAC, and other audio formats
- **Interactive Playback**: Play back generated sheet music with virtual instruments

### 🎨 Visual Experience
- **5 Visual Effects**: Choose from Waves, Particles, Bars, Ripples, and Spiral visualizers
- **Real-time Audio Visualization**: Music-reactive effects that respond to audio playback
- **Customizable Themes**: Multiple gradient color schemes for playlist covers
- **Mobile-First Design**: Responsive UI optimized for all devices

### 📚 Playlist & Library Management
- **Smart Playlists**: Create and organize music collections with custom metadata
- **Visual Effect Assignment**: Each playlist can have its own visual effect
- **Privacy Controls**: Public and private playlist options
- **Edit & Share**: Full CRUD operations for playlist management
- **Community Sharing**: Discover and play community-shared sheet music

### 🚀 Planned Blockchain Features
- **Base Network Integration**: Deploy smart contracts on Base L2
- **NFT Minting**: Mint your compositions as NFTs
- **Farcaster Frames**: Native social sharing integration
- **Token Gating**: Premium features with token ownership
- **Decentralized Storage**: IPFS integration for sheet music metadata

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Base wallet (Coinbase Wallet, MetaMask, etc.)
- Farcaster account for Frame testing

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/partiture.git
cd partiture/PartitureApp

# Install dependencies
npm install

# Set up environment variables (when blockchain features are added)
cp .env.example .env.local
```

### Environment Variables (Future Integration)

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Partiture

# Base Blockchain (Planned)
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_CHAIN_ID=8453
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# Farcaster Integration (Planned)
NEXT_PUBLIC_FARCASTER_HUB_URL=https://nemes.farcaster.xyz:2281
FARCASTER_DEVELOPER_MNEMONIC=your_mnemonic_here

# Audio Processing APIs (To be integrated)
OPENAI_API_KEY=your_openai_key
REPLICATE_API_TOKEN=your_replicate_token
```

### Development

```bash
# Start the development server
npm run dev

# Open http://localhost:3000 (or auto-assigned port)

# Build for production
npm run build

# Lint code
npm run lint
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icon system
- **Canvas API** - For music visualization effects

### Current Features
- **Responsive Design** - Mobile-first approach with desktop optimization
- **Music Visualizations** - 5 custom Canvas-based visual effects
- **File Upload** - Drag-and-drop file handling with React Dropzone
- **Form Management** - React Hook Form with Zod validation
- **Theme System** - Dark/light mode with next-themes

### Planned Integrations
- **Base** - Layer 2 Ethereum blockchain
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **RainbowKit** - Wallet connection UI
- **Farcaster Frames** - Native social interactions
- **VexFlow** - Music notation rendering
- **Tone.js** - Audio processing and playback
- **Magenta.js** - Google's music AI library

## 📱 Current Application Structure

The PartitureApp includes the following main sections:

### 🏠 **Home Page** (`/`)
- Hero section with call-to-action
- Community sheets discovery
- Feature highlights and demo content

### 📊 **Dashboard** (`/dashboard`)
- User's music sheet library
- Upload and creation tools
- Recent activity tracking
- Playlist management overview

### 🎵 **Create** (`/create`)
- **Upload Audio**: MP3, WAV, FLAC file upload with drag-and-drop
- **Record Live**: Real-time audio recording capability
- **Manual Creation**: Sheet music editor (planned)
- Generation settings and instrument selection

### 📚 **Playlist Management** (`/playlist`)
- Create custom playlists with metadata
- 5 visual effect options (Waves, Particles, Bars, Ripples, Spiral)
- Public/private privacy controls
- Color theme customization
- Full CRUD operations (Create, Read, Update, Delete)

### 🎮 **Visual Effects System**
- **Waves**: Pulsing circular patterns
- **Particles**: Floating animated particles
- **Bars**: Radiating audio bars
- **Ripples**: Water-like ripple effects
- **Spiral**: Spinning spiral patterns
- Real-time audio-reactive animations

## 🚀 Planned Base Integration

### Smart Contract Features (In Development)
- **Composition NFTs**: Mint sheet music as unique NFTs
- **Royalty Distribution**: Automatic payments to creators
- **Metadata Storage**: IPFS integration for sheet music data
- **Transfer & Trading**: Full ERC-721 compatibility
- **Token Gating**: Premium features for token holders

### Contract Addresses (To Be Deployed)
```
Mainnet: 0x... (TBD)
Testnet: 0x... (TBD)
```

## 🎵 Audio Processing Pipeline (Planned)

1. **Upload**: Multi-format file upload with validation
2. **Preprocessing**: Audio normalization and cleanup
3. **AI Transcription**: Advanced ML models for note detection
4. **Post-processing**: Quantization and musical cleanup
5. **Visualization**: Real-time visual effects generation
6. **Storage**: Metadata storage on IPFS/Base

### Supported Audio Formats (Current/Planned)
- MP3 ✅ (UI ready)
- WAV ✅ (UI ready)
- FLAC ✅ (UI ready)
- M4A (planned)
- OGG (planned)

## 🔧 API Endpoints

### Audio Processing
```typescript
POST /api/upload
POST /api/transcribe
GET /api/download/:id
```

### Blockchain
```typescript
POST /api/mint
GET /api/nft/:tokenId
POST /api/metadata
```

### Farcaster
```typescript
POST /api/frame
GET /api/frame/image/:id
POST /api/frame/action
```

## 🎨 UI Components

### Core Components
- `AudioUploader` - Drag & drop MP3 upload
- `SheetMusicViewer` - VexFlow integration
- `PianoKeyboard` - Interactive piano preview
- `TranscriptionProgress` - Real-time processing status

### Blockchain Components
- `WalletConnect` - Base wallet integration
- `MintNFT` - NFT minting interface
- `NFTGallery` - User's minted compositions

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
```

### Docker
```bash
# Build Docker image
docker build -t partiture .

# Run container
docker run -p 3000:3000 partiture
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Test Farcaster Frame
npm run test:frame
```

## 📊 Performance

- **Audio Processing**: ~30-60 seconds for 3-minute songs
- **Sheet Music Rendering**: Real-time with VexFlow
- **Frame Response Time**: <2 seconds
- **Blockchain Transactions**: ~2-5 seconds on Base

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Test Farcaster Frame integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [partiture.xyz](https://partiture.xyz)
- **Farcaster**: [@partiture](https://warpcast.com/partiture)
- **Base Contract**: [Basescan](https://basescan.org/address/0x...)
- **Documentation**: [docs.partiture.xyz](https://docs.partiture.xyz)

## 🙏 Acknowledgments

- [VexFlow](https://vexflow.com) for music notation rendering
- [Magenta](https://magenta.tensorflow.org) for AI music processing
- [Base](https://base.org) for blockchain infrastructure
- [Farcaster](https://farcaster.xyz) for decentralized social features

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/partiture/issues)
- **Discord**: [Partiture Community](https://discord.gg/partiture)
- **Email**: support@partiture.xyz

---

**Made with 🎵 by the Partiture team**