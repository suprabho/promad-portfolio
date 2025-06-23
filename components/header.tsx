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

export default function Header({ onChatToggle }: HeaderProps) {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl justify-between items-center mx-auto">
        <div className="mx-auto md:ml-4 h-full w-40 RiveContainer">
          <LogoRive />
        </div>
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="block">
            <Tabs value={pathname}>
              <TabsList className="w-[150px] sm:w-[400px] grid-cols-2 [&>*]:flex-1">
                <Link 
                  href="/" 
                  className="w-full"
                  onClick={() => {
                    sendAnalyticsEvent('tab_click', {
                      tab_name: 'home',
                      path: '/'
                    })
                  }}
                >
                  <TabsTrigger value="/" className="w-full text-base">Home</TabsTrigger>
                </Link>
                <Link 
                  href="/chat" 
                  className="w-full"
                  onClick={() => {
                    sendAnalyticsEvent('tab_click', {
                      tab_name: 'chat',
                      path: '/chat'
                    })
                  }}
                >
                  <TabsTrigger value="/chat" className="w-full text-base">Chat</TabsTrigger>
                </Link>
              </TabsList>
            </Tabs>
          </div>


          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 