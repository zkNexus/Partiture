"use client"

import { PropsWithChildren, useEffect } from "react"
import { callFarcasterReady } from "@/lib/farcaster-sdk"
import { FarcasterWalletHeader } from "@/components/wallet-header-farcaster"

/**
 * MiniKit Provider for Farcaster Mini Apps
 * Simplified provider for Partiture integration
 */
export function MiniKitProvider({ children }: PropsWithChildren) {
  return (
    <div className="minikit-provider">
      <MiniKitFrameReady>
        <div className="minikit-app-container">
          {/* Farcaster-specific wallet header */}
          {/* <div className="farcaster-wallet-header p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
            <FarcasterWalletHeader />
          </div> */}
          
          <div className="farcaster-content">
            {children}
          </div>
        </div>
      </MiniKitFrameReady>
    </div>
  )
}

/**
 * MiniKit Frame Ready Component
 * NOTE: Ready call moved to FarcasterReadySignal for proper timing (matches exampleApp)
 */
export function MiniKitFrameReady({ children }: PropsWithChildren) {
  useEffect(() => {
    console.log('📱 MiniKitFrameReady: Provider initialized (ready call handled by FarcasterReadySignal)')
  }, [])

  return <>{children}</>
}