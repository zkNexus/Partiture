import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileFooterNav } from "@/components/mobile-footer-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
// import { AppHeader } from "@/components/app-header"
import "./globals.css"

export const metadata: Metadata = {
  title: "Partiture - Music Sheet Generator & Sharing Platform",
  description: "Upload MP3s to generate sheet music, share compositions, and play music with Partiture",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DesktopSidebar />

          <main className="pb-20 md:pb-0">
            <Suspense fallback={null}>{children}</Suspense>
          </main>

          <MobileFooterNav />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
