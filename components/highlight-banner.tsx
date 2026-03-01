"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Robot,
  GitCommit,
  FigmaLogo,
  FilmSlate,
  Palette,
  Lightning,
} from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

const stats = [
  { value: "1,026", label: "Production Commits", icon: GitCommit },
  { value: "3", label: "Custom Figma Plugins", icon: FigmaLogo },
  { value: "100+", label: "Video Variations", icon: FilmSlate },
]

const pillars = [
  {
    icon: Palette,
    title: "Design Systems",
    desc: "AI-powered color tools & Figma plugins for scalable design infrastructure",
  },
  {
    icon: Lightning,
    title: "Vibe-Coded Experiments",
    desc: "Concept to working code in hours — 3D headers, apps, and interactive prototypes",
  },
  {
    icon: FilmSlate,
    title: "Creative Production",
    desc: "Modular video system generating 100+ ad variations from reusable components",
  },
]

export function HighlightBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBanner(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Full section */}
      <section ref={sectionRef} className="relative z-10">
        <Link href="/ai-playbook" className="block group">
          <div className="bg-[#FAFF00] py-12 md:py-16">
            <div className="container mx-auto px-4">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center shrink-0">
                    <Robot size={24} weight="duotone" className="text-black" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-black">
                      AI Playbook
                    </h2>
                    <p className="text-black/60 text-sm md:text-base">
                      AI as creative infrastructure — not just tools, but
                      systems that multiply output
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-black font-medium group-hover:gap-3 transition-all shrink-0">
                  <span>Explore the playbook</span>
                  <ArrowRight className="w-5 h-5" weight="bold" />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-black/5 rounded-2xl p-4 md:p-5"
                  >
                    <stat.icon
                      size={20}
                      weight="bold"
                      className="text-black/40 mb-2"
                    />
                    <div className="text-2xl md:text-3xl font-bold text-black">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-black/50 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pillars */}
              <div className="grid md:grid-cols-3 gap-4">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="flex items-start gap-3 bg-black/5 rounded-2xl p-4 md:p-5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-black/10 flex items-center justify-center shrink-0 mt-0.5">
                      <pillar.icon
                        size={18}
                        weight="duotone"
                        className="text-black"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-black text-sm md:text-base">
                        {pillar.title}
                      </div>
                      <div className="text-xs md:text-sm text-black/50 mt-0.5 leading-relaxed">
                        {pillar.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Sticky banner after scrolling past section */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#FAFF00] border-b border-black/10 shadow-sm"
          >
            <Link
              href="/ai-playbook"
              className="container mx-auto flex items-center justify-center gap-3 py-2.5 px-4 text-sm font-medium text-black hover:opacity-80 transition-opacity"
            >
              <Robot size={14} weight="duotone" />
              <span>
                AI Playbook — 1,026 commits, 3 Figma plugins, 100+ video
                variations
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" weight="bold" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
