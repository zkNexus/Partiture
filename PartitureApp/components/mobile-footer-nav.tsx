"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Plus, User, Music } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/create", icon: Plus, label: "Create" },
  { href: "/playlist", icon: Music, label: "Playlist" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function MobileFooterNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
