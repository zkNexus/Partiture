"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, User, LogOut, CheckCircle } from "lucide-react"
import { farcasterUtils } from "@/lib/farcaster-sdk"

/**
 * Farcaster-specific wallet header component
 * Does NOT use RainbowKit - uses native Farcaster wallet integration
 */
export function FarcasterWalletHeader() {
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Get Farcaster Mini App connector
  const farcasterConnector = connectors.find(c => 
    c.name.toLowerCase().includes('farcaster') || 
    c.id.includes('farcaster')
  )

  const handleConnect = async () => {
    if (farcasterConnector) {
      console.log('🎯 Connecting with Farcaster Mini App connector')
      connect({ connector: farcasterConnector })
    } else {
      // Fallback to first available connector (injected)
      console.log('🔧 Using fallback connector')
      connect({ connector: connectors[0] })
    }
  }

  const handleDisconnect = () => {
    console.log('🔌 Disconnecting Farcaster wallet')
    disconnect()
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected || !address) {
    return (
      <Card className="w-full max-w-sm mx-auto bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200/20">
        <CardContent className="p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Wallet className="h-5 w-5" />
              <span className="font-medium">🌐 Farcaster Wallet</span>
            </div>
            
            <Button 
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Farcaster Wallet
            </Button>
            
            {error && (
              <p className="text-sm text-red-500 text-center">
                Connection failed: {error.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm mx-auto bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200/20">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">🌐 Connected</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          <div className="bg-white/50 rounded-lg p-3 border border-green-200/30">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Wallet Address</span>
            </div>
            <p className="font-mono text-sm text-gray-800">
              {formatAddress(address)}
            </p>
          </div>

          {connector && (
            <div className="text-xs text-gray-500 text-center">
              Connected via {connector.name}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Simplified Farcaster wallet status for integration into other components
 */
export function FarcasterWalletStatus() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()

  const farcasterConnector = connectors.find(c => 
    c.name.toLowerCase().includes('farcaster') || 
    c.id.includes('farcaster')
  )

  if (!isConnected) {
    return (
      <Button
        onClick={() => farcasterConnector && connect({ connector: farcasterConnector })}
        size="sm"
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Wallet className="h-4 w-4 mr-2" />
        🌐 Connect
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
      <CheckCircle className="h-4 w-4" />
      <span className="font-mono">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}</span>
    </div>
  )
}