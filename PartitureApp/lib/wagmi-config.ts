import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base, baseSepolia, mainnet } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'Partiture - Music Sheet Generator & Sharing Platform',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [
    baseSepolia, // Default testnet for app functionality
    base,        // Base mainnet for production
    mainnet,     // Ethereum mainnet for ENS resolution
  ],
  ssr: true,
})