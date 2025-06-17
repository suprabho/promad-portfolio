"use client"

import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"
import { ThemeToggle } from "./theme-toggle"
import { LogoRive } from "./logo-rive"
import { Button } from "./ui/button"
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  console.log('=== Header Rendering ===');
  console.log('About to render LogoRive');
  
  return (
    <header className="sticky top-0  z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl justify-between items-center mx-auto">
        <div className="mx-auto md:ml-4 h-full w-40 RiveContainer">
          <LogoRive />
        </div>
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="chat.promad.design" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Chat with AI
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-state={isOpen ? "open" : "closed"} className={isOpen ? "bg-accent" : ""}>
                {isOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <ListIcon className="h-6 w-6" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-2" align="end">
              <nav className="flex flex-col gap-1">
                <Link href="/" className="flex w-full items-center px-2 py-1.5 text-base hover:bg-accent hover:text-accent-foreground rounded-sm">
                  Home
                </Link>
                <Link href="#about" className="flex w-full items-center px-2 py-1.5 text-base hover:bg-accent hover:text-accent-foreground rounded-sm">
                  About
                </Link>
                <Link href="#projects" className="flex w-full items-center px-2 py-1.5 text-base hover:bg-accent hover:text-accent-foreground rounded-sm">
                  Projects
                </Link>
                <Link href="#contact" className="flex w-full items-center px-2 py-1.5 text-base hover:bg-accent hover:text-accent-foreground rounded-sm">
                  Contact
                </Link>
              </nav>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 