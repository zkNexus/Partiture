"use client"

import { PropsWithChildren, useEffect, useState } from "react"
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FarcasterProviders } from "./farcaster-providers"
import { wagmiConfig } from "@/lib/wagmi-config"
import { detectEnvironment, logEnvironmentInfo, type AppEnvironment } from "@/lib/environment-detection"

import "@rainbow-me/rainbowkit/styles.css"

// Create query client instance for browser environment
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

/**
 * Browser Environment Providers
 * Full RainbowKit + Wagmi setup for web browsers
 */
function BrowserProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider
          appInfo={{
            appName: 'Partiture - Music Sheet Generator & Sharing Platform',
            learnMoreUrl: 'https://partiture.app',
          }}
          showRecentTransactions={true}
          coolMode
        >
          <div className="browser-app">
            {children}
          </div>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

/**
 * Multi-Environment Provider Router
 * Automatically detects environment and loads appropriate providers
 */
export function MultiEnvironmentProviders({ children }: PropsWithChildren) {
  const [environment, setEnvironment] = useState<AppEnvironment>('browser')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Detect environment on client side
    const detectedEnv = detectEnvironment()
    setEnvironment(detectedEnv)
    setIsLoading(false)

    // Log environment info in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 Multi-Environment Provider Router')
      console.log('📱 Detected Environment:', detectedEnv)
      logEnvironmentInfo()
    }
  }, [])

  // Show loading state during environment detection
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Route to appropriate provider based on environment
  switch (environment) {
    case 'browser':
      return <BrowserProviders>{children}</BrowserProviders>
    
    case 'farcaster-web':
    case 'farcaster-mobile':
      return <FarcasterProviders>{children}</FarcasterProviders>
    
    default:
      console.warn(`⚠️ Unknown environment: ${environment}, falling back to browser`)
      return <BrowserProviders>{children}</BrowserProviders>
  }
}

/**
 * Environment Status Component
 * Shows current environment (for development)
 */
export function EnvironmentStatus() {
  const [environment, setEnvironment] = useState<AppEnvironment>('browser')

  useEffect(() => {
    setEnvironment(detectEnvironment())
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-mono">
      {/* ENV: {environment} */}
    </div>
  )
}