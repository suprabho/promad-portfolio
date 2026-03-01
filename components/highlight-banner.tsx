"use client"

import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"

export function HighlightBanner() {
  return (
    <div className="sticky top-20 z-40 w-full bg-[#FAFF00] border-b border-black/10">
      <Link
        href="/ai-playbook"
        className="container mx-auto flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-black hover:opacity-80 transition-opacity"
      >
        <span>
          Explore our AI Playbook — a guide to integrating AI into your design
          workflow
        </span>
        <ArrowRight className="w-4 h-4 shrink-0" weight="bold" />
      </Link>
    </div>
  )
}
