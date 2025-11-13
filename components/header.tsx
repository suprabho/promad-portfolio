"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { LogoRive } from "./logo-rive"
import { Button } from "./ui/button"
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { usePathname } from "next/navigation"
import { sendAnalyticsEvent } from "@/lib/analytics"

interface HeaderProps {
  onChatToggle?: () => void
}

export default function Header() {
  const pathname = usePathname()
  
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