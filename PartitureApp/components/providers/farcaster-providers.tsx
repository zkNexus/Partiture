"use client"

import { PropsWithChildren } from "react"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createConfig, http } from "wagmi"
import { base, baseSepolia, mainnet } from "wagmi/chains"
import { injected } from "wagmi/connectors"
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'
import { MiniKitProvider } from "./minikit-provider"
import { logEnvironmentInfo } from "@/lib/environment-detection"

// Farcaster Mini App specific wagmi configuration
const farcasterWagmiConfig = createConfig({
  chains: [baseSepolia, base, mainnet], // Base Sepolia first for testing
  connectors: [
    farcasterMiniApp(), // Official Farcaster Mini App connector
    injected(), // Fallback for compatibility
  ],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_MAINNET_RPC_URL || 'https://mainnet.base.org'),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org'),
    [mainnet.id]: http(),
  },
  ssr: true,
})

const farcasterQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false, // Disable in mini app environment
    },
  },
})

/**
 * Farcaster Web Environment Providers
 * Optimized for Farcaster web client mini app
 */
export function FarcasterWebProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={farcasterWagmiConfig}>
      <QueryClientProvider client={farcasterQueryClient}>
        <MiniKitProvider>
          <FarcasterWebWrapper>
            {children}
          </FarcasterWebWrapper>
        </MiniKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

/**
 * Farcaster Mobile Environment Providers
 * Optimized for Farcaster mobile app integration
 */
export function FarcasterMobileProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={farcasterWagmiConfig}>
      <QueryClientProvider client={farcasterQueryClient}>
        <MiniKitProvider>
          <FarcasterMobileWrapper>
            {children}
          </FarcasterMobileWrapper>
        </MiniKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

/**
 * Farcaster Web Environment Wrapper
 * Handles web-specific optimizations and frame integration
 */
function FarcasterWebWrapper({ children }: PropsWithChildren) {
  console.log('🎯 Farcaster Web Environment Active')
  
  // Initialize Farcaster SDK if available
  if (typeof window !== 'undefined' && (window as any).farcaster) {
    console.log('🔗 Farcaster SDK detected and ready')
  }
  
  return (
    <div className="farcaster-web-app">
      {children}
    </div>
  )
}

/**
 * Farcaster Mobile Environment Wrapper
 * Handles mobile-specific optimizations and native UI patterns
 */
function FarcasterMobileWrapper({ children }: PropsWithChildren) {
  console.log('📱 Farcaster Mobile Environment Active')
  
  // Initialize MiniKit if available
  if (typeof window !== 'undefined' && (window as any).minikit) {
    console.log('📱 MiniKit SDK detected and ready')
  }
  
  return (
    <div className="farcaster-mobile-app">
      {children}
    </div>
  )
}

/**
 * Shared Farcaster Environment Provider
 * Auto-detects mobile vs web and applies appropriate styling
 */
export function FarcasterProviders({ children }: PropsWithChildren) {
  // Auto-detect mobile vs desktop within Farcaster environment
  const isMobile = typeof window !== 'undefined' && (
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768
  )

  if (isMobile) {
    return <FarcasterMobileProviders>{children}</FarcasterMobileProviders>
  }

  return <FarcasterWebProviders>{children}</FarcasterWebProviders>
}

/**
 * Shared Farcaster utilities for both web and mobile
 */
export const farcasterUtils = {
  /**
   * Check if Farcaster environment is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && 
           ((window as any).farcaster || (window as any).minikit)
  },

  /**
   * Get Farcaster user info if available
   */
  async getUserInfo() {
    if (typeof window !== 'undefined' && (window as any).farcaster) {
      try {
        // Farcaster SDK user info retrieval
        return await (window as any).farcaster.getUser()
      } catch (error) {
        console.warn('Failed to get Farcaster user info:', error)
        return null
      }
    }
    return null
  },

  /**
   * Send Farcaster frame action
   */
  async sendFrameAction(action: string, data: any) {
    if (typeof window !== 'undefined' && (window as any).farcaster) {
      try {
        return await (window as any).farcaster.sendAction(action, data)
      } catch (error) {
        console.error('Failed to send Farcaster frame action:', error)
        return null
      }
    }
    return null
  },

  /**
   * Share content via Farcaster
   */
  async shareContent(content: { text: string; url?: string; image?: string }) {
    if (typeof window !== 'undefined' && (window as any).farcaster) {
      try {
        return await (window as any).farcaster.share(content)
      } catch (error) {
        console.error('Failed to share via Farcaster:', error)
        return null
      }
    }
    return null
  }
}