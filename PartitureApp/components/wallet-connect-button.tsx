"use client"

import { useState, useEffect } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { detectEnvironment, isFarcasterEnvironment } from "@/lib/environment-detection"
import { farcasterUtils } from "@/lib/farcaster-sdk"

/**
 * Universal Wallet Connect Button
 * Automatically adapts to browser, Farcaster web, or Farcaster mobile environments
 */
export function WalletConnectButton() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [environment, setEnvironment] = useState<string>('browser')
  const [farcasterUser, setFarcasterUser] = useState<any>(null)

  useEffect(() => {
    const env = detectEnvironment()
    setEnvironment(env)
    
    // Get Farcaster user info if in Farcaster environment
    if (isFarcasterEnvironment()) {
      farcasterUtils.getUserInfo().then(setFarcasterUser)
    }
  }, [])

  // In browser environment, use RainbowKit's ConnectButton
  if (environment === 'browser') {
    return <ConnectButton />
  }

  // In Farcaster environments, use custom wallet connection
  return (
    <div className="flex flex-col gap-2">
      {isConnected ? (
        <div className="flex flex-col gap-2">
          {/* <div className="text-sm text-muted-foreground">
            {environment === 'farcaster-mobile' ? '📱 ' : '🌐 '}
            Connected via Farcaster
          </div> */}
          
          {farcasterUser && (
            <div className="text-sm text-muted-foreground">
              👤 {farcasterUser.username || farcasterUser.displayName || 'Farcaster User'}
            </div>
          )}
          
          <div className="font-mono text-sm">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
          </div>
          
          {/* <Button 
            variant="outline" 
            size="sm" 
            onClick={() => disconnect()}
          >
            Disconnect
          </Button> */}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            {environment === 'farcaster-mobile' ? '📱 ' : '🌐 '}
            Farcaster Mini App
          </div>
          
          {farcasterUser && (
            <div className="text-sm text-muted-foreground">
              👤 {farcasterUser.username || farcasterUser.displayName || 'Farcaster User'}
            </div>
          )}
          
          <FarcasterConnectButton />
        </div>
      )}
    </div>
  )
}

/**
 * Farcaster-specific connection button
 * Uses native Farcaster wallet integration
 */
function FarcasterConnectButton() {
  const { connect, connectors, isPending } = useConnect()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    
    try {
      // Look for Farcaster or MiniKit connector
      const farcasterConnector = connectors.find(
        connector => 
          connector.name.toLowerCase().includes('farcaster') ||
          connector.name.toLowerCase().includes('minikit') ||
          connector.id === 'miniApp'
      )
      
      if (farcasterConnector) {
        await connect({ connector: farcasterConnector })
      } else {
        // Fallback to first available connector
        const firstConnector = connectors[0]
        if (firstConnector) {
          await connect({ connector: firstConnector })
        } else {
          console.warn('No wallet connectors available')
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Button 
      onClick={handleConnect}
      disabled={isPending || isConnecting}
      className="w-full"
    >
      {(isPending || isConnecting) ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  )
}

/**
 * Wallet Status Display Component
 * Shows connection status across all environments
 */
export function WalletStatus() {
  const { address, isConnected, chain } = useAccount()
  const [environment, setEnvironment] = useState<string>('browser')

  useEffect(() => {
    setEnvironment(detectEnvironment())
  }, [])

  if (!isConnected) {
    return (
      <div className="text-sm text-muted-foreground">
        Wallet not connected
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="font-mono">
        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
      </div>
      
      {chain && (
        <div className="text-muted-foreground">
          Network: {chain.name}
        </div>
      )}
      
      <div className="text-muted-foreground">
        Environment: {environment}
      </div>
    </div>
  )
}