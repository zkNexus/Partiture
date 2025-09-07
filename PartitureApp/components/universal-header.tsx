"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, Menu, ArrowLeft, Music } from "lucide-react"
import type { ReactNode } from "react"

interface UniversalHeaderProps {
  // Layout options
  position?: "fixed" | "sticky" | "relative"
  showBackButton?: boolean
  backHref?: string

  // Content options
  title?: string
  subtitle?: string
  showLogo?: boolean

  // Navigation
  navigationItems?: Array<{
    label: string
    href: string
    variant?: "ghost" | "default" | "outline"
  }>

  // Actions
  actions?: ReactNode

  // Styling
  className?: string
  transparent?: boolean
}

export function UniversalHeader({
  position = "sticky",
  showBackButton = false,
  backHref = "/",
  title,
  subtitle,
  showLogo = true,
  navigationItems = [],
  actions,
  className = "",
  transparent = false,
}: UniversalHeaderProps) {
  const pathname = usePathname()
  // Mock user data - replace with actual auth
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/musician-profile.png",
  }

  const isLoggedIn = true // Replace with actual auth state

  const positionClasses = {
    fixed: "fixed top-0 left-0 right-0",
    sticky: "sticky top-0",
    relative: "relative",
  }

  const backgroundClasses = transparent ? "bg-transparent" : "bg-background/95 backdrop-blur-sm border-b border-border"

  return (
    <header className={`${positionClasses[position]} z-50 ${backgroundClasses} ${className}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {showBackButton && (
              <Link href={backHref}>
                <Button variant="ghost" size="sm" className="h-10 px-3">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
            )}

            {showBackButton && (showLogo || title) && <div className="h-6 w-px bg-border" />}

            {showLogo && (
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="font-bold text-lg text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text hidden sm:block">
                  Partiture
                </span>
              </Link>
            )}

            {title && (
              <div className="flex items-center gap-2">
                {!showLogo && <Music className="h-6 w-6 text-primary" />}
                <div>
                  <h1 className="text-xl font-semibold">{title}</h1>
                  {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Center Section - Navigation - Hidden on mobile since we have footer nav */}
          {navigationItems.length > 0 && (
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button 
                      variant={isActive ? "default" : "ghost"} 
                      size="sm" 
                      className={`h-10 px-4 ${
                        isActive 
                          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Custom Actions */}
            {actions}

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent h-10 px-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium hidden sm:block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-10 px-4">
                  Login
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground h-10 px-4">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
