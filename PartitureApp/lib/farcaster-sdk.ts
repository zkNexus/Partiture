"use client"

/**
 * Farcaster SDK Integration for Partiture
 * Handles frame initialization and SDK interactions
 */

/**
 * Call the official Farcaster ready function 
 * Enhanced for production environments with robust error handling
 */
export async function callFarcasterReady() {
  console.log('🚀 callFarcasterReady: Attempting SDK ready call')
  
  if (typeof window === 'undefined') {
    console.log('❌ Server side, skipping ready call')
    return
  }

  // Wait a moment for any pending rendering
  await new Promise(resolve => setTimeout(resolve, 100))

  try {
    // Check for official Farcaster SDK first
    const { sdk } = await import('@farcaster/miniapp-sdk')
    
    if (sdk && sdk.actions && sdk.actions.ready) {
      console.log('✅ Calling await sdk.actions.ready() - official SDK')
      await sdk.actions.ready()
      console.log('✅ Official ready call successful - splash screen dismissed')
      ;(window as any).__farcaster_ready_success = true
      return
    }
  } catch (error) {
    console.warn('⚠️ Official SDK not available, using fallback methods:', error)
  }

  // Enhanced fallback methods for production reliability
  const fallbackMethods = [
    // Method 1: Direct window SDK call
    () => {
      if (typeof (window as any).ready === 'function') {
        console.log('🔧 Fallback 1: window.ready()')
        ;(window as any).ready()
        return true
      }
      return false
    },
    
    // Method 2: Farcaster SDK ready
    () => {
      if (typeof (window as any).farcaster?.ready === 'function') {
        console.log('🔧 Fallback 2: window.farcaster.ready()')
        ;(window as any).farcaster.ready()
        return true
      }
      return false
    },
    
    // Method 3: MiniKit ready
    () => {
      if (typeof (window as any).minikit?.ready === 'function') {
        console.log('🔧 Fallback 3: window.minikit.ready()')
        ;(window as any).minikit.ready()
        return true
      }
      return false
    },
    
    // Method 4: PostMessage to parent
    () => {
      if (window.parent && window.parent !== window) {
        console.log('🔧 Fallback 4: PostMessage to parent frame')
        window.parent.postMessage({
          type: 'frame_ready',
          ready: true,
          timestamp: Date.now(),
          source: 'partiture-miniapp'
        }, '*')
        return true
      }
      return false
    },
    
    // Method 5: Custom ready event
    () => {
      console.log('🔧 Fallback 5: Custom ready event dispatch')
      const readyEvent = new CustomEvent('farcaster-ready', {
        detail: { ready: true, timestamp: Date.now() }
      })
      window.dispatchEvent(readyEvent)
      if (window.parent) {
        window.parent.postMessage({ type: 'farcaster-ready', ready: true }, '*')
      }
      return true
    }
  ]

  // Try each fallback method
  for (const method of fallbackMethods) {
    try {
      if (method()) {
        console.log('✅ Fallback method successful')
        break
      }
    } catch (fallbackError) {
      console.warn('⚠️ Fallback method failed:', fallbackError)
    }
  }
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