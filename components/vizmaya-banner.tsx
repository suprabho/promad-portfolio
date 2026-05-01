"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Compass,
  MapTrifold,
  ChartLineUp,
  Stack,
} from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

const NAVY = "#0d1220"
const GOLD = "#d9a84a"
const CREAM = "#e4e8f0"

const pillars = [
  {
    icon: MapTrifold,
    title: "Scroll-synced storytelling",
    desc: "Mapbox maps, ECharts visualizations, and prose driven by a single scroll position — the map flies, charts step, text snap-locks.",
  },
  {
    icon: ChartLineUp,
    title: "13+ published narratives",
    desc: "Geopolitical, economic, and technology stories with map and data layers — from press freedom to the rise of GPU economies.",
  },
  {
    icon: Stack,
    title: "Static-generated, themeable",
    desc: "Stories authored in Markdown + YAML, statically generated at build time, with per-story color systems via CSS variables.",
  },
]

export function VizmayaBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const update = () => {
      const rect = section.getBoundingClientRect()
      // Show sticky only after the section has scrolled out of view past the top.
      setShowBanner(rect.bottom <= 0)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <>
      {/* Full section */}
      <section ref={sectionRef} className="relative z-10">
        <a
          href="https://vizmaya.fyi"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div
            className="py-12 md:py-16 relative overflow-hidden"
            style={{ backgroundColor: NAVY, color: CREAM }}
          >
            {/* Subtle radial glow */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 80% 50%, ${GOLD}22 0%, transparent 50%)`,
              }}
            />

            <div className="container mx-auto px-4 relative">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${GOLD}22` }}
                  >
                    <Compass size={24} weight="duotone" style={{ color: GOLD }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: GOLD, color: NAVY }}
                      >
                        New
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: `${CREAM}80` }}
                      >
                        Just launched
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold" style={{ color: CREAM }}>
                      vizmaya.fyi
                    </h2>
                    <p className="text-sm md:text-base" style={{ color: `${CREAM}99` }}>
                      Data-driven narratives on geopolitics, technology, and the
                      asymmetries reshaping markets.
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 font-medium group-hover:gap-3 transition-all shrink-0"
                  style={{ color: GOLD }}
                >
                  <span>Read the stories</span>
                  <ArrowRight className="w-5 h-5" weight="bold" />
                </div>
              </div>

              {/* Pillars */}
              <div className="grid md:grid-cols-3 gap-4">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="flex items-start gap-3 rounded-2xl p-4 md:p-5 backdrop-blur-sm"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${GOLD}22` }}
                    >
                      <pillar.icon
                        size={18}
                        weight="duotone"
                        style={{ color: GOLD }}
                      />
                    </div>
                    <div>
                      <div
                        className="font-semibold text-sm md:text-base"
                        style={{ color: CREAM }}
                      >
                        {pillar.title}
                      </div>
                      <div
                        className="text-xs md:text-sm mt-0.5 leading-relaxed"
                        style={{ color: `${CREAM}80` }}
                      >
                        {pillar.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </a>
      </section>

      {/* Sticky banner after scrolling past section */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-0 right-0 z-40 shadow-sm"
            style={{
              top: "7.5rem",
              backgroundColor: NAVY,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <a
              href="https://vizmaya.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className="container mx-auto flex items-center justify-center gap-3 py-2.5 px-4 text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: CREAM }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                New
              </span>
              <span>
                vizmaya.fyi — Scroll-synced data narratives on geopolitics &amp; markets
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" weight="bold" style={{ color: GOLD }} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
