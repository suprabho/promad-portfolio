"use client"

import { ThemeToggle } from "./theme-toggle"
import { LogoRive } from "./logo-rive"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl justify-between items-center mx-auto">
        <div className="mx-auto md:ml-4 h-full w-40 RiveContainer">
          <LogoRive />
        </div>
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
        <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 