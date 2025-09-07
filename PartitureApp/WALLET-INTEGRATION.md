# Multi-Environment Wallet Integration

PartitureApp now supports wallet connections across **3 environments**:
- 🌐 **Browser** (Standard web app with full RainbowKit support)
- 🌐 **Farcaster Web** (Farcaster web client mini app)
- 📱 **Farcaster Mobile** (Farcaster mobile app integration)

## Quick Start

### 1. Environment Variables Setup
Copy `.env.local` and configure your API keys:

```bash
# Required: Get from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional: Enhanced features
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_key_here
NEXT_PUBLIC_DEBUG_ENVIRONMENT=true
```

### 2. Using Wallet Connect Button
```tsx
import { WalletConnectButton, WalletStatus } from "@/components/wallet-connect-button"

export default function MyComponent() {
  return (
    <div>
      <WalletConnectButton />
      <WalletStatus />
    </div>
  )
}
```

### 3. Using Wallet State
```tsx
import { useAccount, useConnect, useDisconnect } from "wagmi"

export default function WalletInfo() {
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {address}</p>
          <p>Network: {chain?.name}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  )
}
```

## Automatic Environment Detection

The app automatically detects the environment and loads appropriate providers:

### Detection Logic
```typescript
// Browser: Default environment, full RainbowKit UI
// Farcaster Web: Desktop Farcaster client (window width >= 768px)
// Farcaster Mobile: Mobile Farcaster app (window width < 768px)

import { detectEnvironment } from "@/lib/environment-detection"

const environment = detectEnvironment() // 'browser' | 'farcaster-web' | 'farcaster-mobile'
```

### Environment Indicators
- Browser: Full RainbowKit modal with all wallet options
- Farcaster Web: 🌐 Simplified connection with Farcaster branding
- Farcaster Mobile: 📱 Mobile-optimized UI with native integration

## Supported Networks

All environments support Base networks:
- **Base Sepolia** (Testnet) - Default for development
- **Base Mainnet** (Production)
- **Ethereum Mainnet** (ENS resolution)

## Architecture Overview

### Provider Stack
```
MultiEnvironmentProviders
├── Browser: RainbowKitProvider + WagmiProvider + QueryClient
├── Farcaster Web: MiniKitProvider + WagmiProvider + QueryClient
└── Farcaster Mobile: MiniKitProvider + WagmiProvider + QueryClient (mobile-optimized)
```

### Key Components
- `MultiEnvironmentProviders`: Main provider router with auto-detection
- `FarcasterProviders`: Farcaster-specific provider stack
- `MiniKitProvider`: Farcaster Mini App SDK integration
- `WalletConnectButton`: Universal wallet connect component
- `EnvironmentStatus`: Development environment indicator

### Files Structure
```
components/
├── providers/
│   ├── multi-environment-providers.tsx  # Main provider router
│   ├── farcaster-providers.tsx         # Farcaster-specific providers
│   └── minikit-provider.tsx            # MiniKit SDK integration
├── wallet-connect-button.tsx           # Universal wallet button
lib/
├── environment-detection.ts            # Auto environment detection
├── wagmi-config.ts                     # Wagmi configuration
└── farcaster-sdk.ts                    # Farcaster SDK utilities
```

## Development Testing

### Browser Environment
```bash
npm run dev
# Open http://localhost:3000
# Should show "ENV: browser" indicator (bottom right)
# Wallet button shows full RainbowKit modal
```

### Farcaster Environment Testing
For testing Farcaster environments, you'll need:
1. Deploy to a public URL (Vercel, Netlify, etc.)
2. Create Farcaster Mini App configuration
3. Test via Farcaster web client or mobile app

### Environment Debug Info
In development mode, the app logs detailed environment information:
```typescript
// Console output example:
🎯 Partiture Environment Detection Results:
📱 Environment: browser
⚙️ Configuration: { providersNeeded: ['wagmi', 'rainbowkit', 'query'], ... }
🔗 User Agent: Mozilla/5.0...
📏 Viewport: 1920x1080
🪟 Window objects: { farcaster: false, minikit: false, ethereum: true }
```

## Integration with Existing Components

### Desktop Sidebar
The desktop sidebar now includes a wallet section that automatically adapts to the current environment:

```tsx
// Added to desktop-sidebar.tsx:
import { WalletConnectButton } from "@/components/wallet-connect-button"

// Wallet section with Wallet icon and connect button
<div className="p-4 border-t border-border">
  <div className="flex items-center space-x-2 mb-3">
    <Wallet className="h-4 w-4 text-muted-foreground" />
    <span className="text-sm font-medium">Wallet</span>
  </div>
  <WalletConnectButton />
</div>
```

## Troubleshooting

### Common Issues
1. **403 Errors during build**: Expected with placeholder WalletConnect project ID
2. **Connection failures**: Verify correct project ID and network configuration
3. **Environment not detected**: Check console logs for detection details

### Debug Mode
Enable debug logging:
```bash
NEXT_PUBLIC_DEBUG_ENVIRONMENT=true
```

This enables:
- Environment detection logs
- Provider initialization logs  
- Wallet connection status logs
- MiniKit SDK interaction logs

### Network Issues
If having trouble with specific networks:
```typescript
// Check current network
import { useAccount } from "wagmi"

const { chain } = useAccount()
console.log('Current network:', chain)
```

## Farcaster Mini App Configuration

### Manifest File Setup
The app includes a Farcaster manifest at `/public/.well-known/farcaster.json`:

```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjAwMDAwLCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4VGJkIn0",
    "payload": "eyJkb21haW4iOiJwYXJ0aXR1cmUtYXBwLnZlcmNlbC5hcHAifQ",
    "signature": "TBD"
  },
  "frame": {
    "name": "Partiture",
    "homeUrl": "https://partiture-app.vercel.app",
    "iconUrl": "https://partiture-app.vercel.app/partiture-icon.png",
    "imageUrl": "https://partiture-app.vercel.app/partiture-hero.png",
    "splashImageUrl": "https://partiture-app.vercel.app/partiture-splash.png",
    "description": "Upload MP3s to generate sheet music, share compositions, and play music with Partiture"
  }
}
```

### Frame Metadata Integration
The app layout includes Farcaster frame metadata for Mini App discovery:

```tsx
// Added to app/layout.tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${URL}/partiture-hero.png`,
        button: {
          title: "Launch Partiture",
          action: {
            type: "launch_frame",
            name: "Partiture",
            url: URL,
            splashImageUrl: `${URL}/partiture-splash.png`,
            splashBackgroundColor: "#4338ca",
          },
        },
      }),
    },
  }
}
```

## Production Deployment

### Required Environment Variables
```bash
# Production .env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_real_project_id
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_real_api_key
NEXT_PUBLIC_URL=https://your-domain.com
NEXT_PUBLIC_FARCASTER_APP_URL=https://your-domain.com
```

### Deployment Checklist
- [ ] Valid WalletConnect Project ID configured
- [ ] Base network RPCs accessible
- [ ] Farcaster Mini App properly registered (if using)
- [ ] Update `.well-known/farcaster.json` with your domain and account info
- [ ] Create and host required images (icon, hero, splash)
- [ ] HTTPS enabled (required for wallet connections)
- [ ] Environment variables set in deployment platform

### Farcaster Mini App Registration
1. Deploy your app to a public URL
2. Update `public/.well-known/farcaster.json` with your domain
3. Add your Farcaster account association and signature
4. Test the Mini App in Farcaster clients
5. Submit for Farcaster App Directory (optional)

## Next Steps

The multi-environment wallet system is now fully integrated and ready for use across all three environments. The system automatically detects the environment and provides the appropriate wallet connection experience for each platform.

To start using it:
1. Get a WalletConnect project ID from https://cloud.walletconnect.com/
2. Update your `.env.local` file
3. The wallet connect button will appear in the desktop sidebar
4. All existing wagmi hooks will work across all environments