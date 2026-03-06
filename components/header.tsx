"use client"

import Link from "next/link"
import { LogoRive } from "./logo-rive"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl justify-between items-center mx-auto">
        <Link href="/" className="mx-auto md:ml-4 h-full w-40 RiveContainer">
          <div className="pointer-events-none h-full w-full">
            <LogoRive />
          </div>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
} 