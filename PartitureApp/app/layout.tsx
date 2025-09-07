import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileFooterNav } from "@/components/mobile-footer-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { MultiEnvironmentProviders, EnvironmentStatus } from "@/components/providers/multi-environment-providers"
// import { AppHeader } from "@/components/app-header"
import "./globals.css"

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://www.partiture.xyz'
  
  return {
    title: "Partiture - Music Sheet Generator & Sharing Platform",
    description: "Upload MP3s to generate sheet music, share compositions, and play music with Partiture",
    generator: "Partiture",
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${URL}/icon.png`,
        button: {
          title: "Launch Partiture",
          action: {
            type: "launch_frame",
            name: "Partiture",
            url: URL,
            splashImageUrl: `${URL}/splash.png`,
            splashBackgroundColor: "#4338ca",
          },
        },
      }),
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <MultiEnvironmentProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* <DesktopSidebar /> */}

            <main className="pb-20 md:pb-0">
              <Suspense fallback={null}>{children}</Suspense>
            </main>

            <MobileFooterNav />
            <Analytics />
            {/* <EnvironmentStatus /> */}
          </ThemeProvider>
        </MultiEnvironmentProviders>
      </body>
    </html>
  )
}
