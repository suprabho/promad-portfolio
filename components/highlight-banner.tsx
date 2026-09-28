"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Robot,
  GitCommit,
  FigmaLogo,
  FilmSlate,
  Sparkle,
  Code,
  DeviceMobile,
  GameController,
  AirplaneTilt,
  Cube,
  CloudSun,
} from "@phosphor-icons/react"
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { useTicker } from "@/hooks/use-ticker"

const YELLOW = "#FAFF00"

const stats = [
  { value: "1,026", label: "Production commits", icon: GitCommit },
  { value: "3", label: "Custom Figma plugins", icon: FigmaLogo },
  { value: "100+", label: "Video variations", icon: FilmSlate },
]

const pillars = [
  {
    index: "01",
    title: "AI-Assisted Design Creation",
    desc: "Intelligent tools that generate visual systems, interactive backgrounds, and animated 3D objects aligned with design intent",
    Visual: GenerativeCanvas,
  },
  {
    index: "02",
    title: "Accelerated Design System Setup",
    desc: "AI-powered color tools & Figma plugins setting-up modern and scalable design infrastructure compatible with Figma, NextJS and Flutter",
    Visual: TokenSystem,
  },
  {
    index: "03",
    title: "Vibe-Coded Experiments",
    desc: "Concept to working code in hours, building fun apps, games and tools",
    Visual: CodeToApp,
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
          <div className="relative overflow-hidden bg-[#FAFF00] py-16 md:py-24">
            {/* Dot grid texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
            />

            <div className="container relative mx-auto px-4">
              {/* Header */}
              <div className="mb-10 grid items-end gap-10 md:mb-14 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-black py-1.5 pl-1.5 pr-3.5 text-sm font-medium text-[#FAFF00]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FAFF00]">
                      <Robot size={14} weight="fill" className="text-black" />
                    </span>
                    AI Playbook
                  </div>
                  <h2 className="text-4xl font-bold leading-[1.02] tracking-tight text-black md:text-6xl">
                    AI as creative
                    <br />
                    infrastructure.
                  </h2>
                  <p className="mt-4 max-w-xl text-base text-black/60 md:text-lg">
                    Not just tools, but systems that multiply output — across
                    design, dev &amp; creative production.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid grid-cols-3 divide-x divide-black/15 border-y border-black/15">
                    {stats.map((stat) => (
                      <div key={stat.label} className="px-3 py-4 first:pl-0 md:px-5">
                        <stat.icon
                          size={18}
                          weight="duotone"
                          className="mb-2 text-black/50"
                        />
                        <div className="text-2xl font-bold tracking-tight text-black md:text-4xl">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-xs leading-snug text-black/55 md:text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 font-medium text-[#FAFF00] transition-all group-hover:gap-3">
                    <span>Explore the playbook</span>
                    <ArrowRight className="h-5 w-5" weight="bold" />
                  </div>
                </div>
              </div>

              {/* Pillars */}
              <div className="grid gap-4 md:grid-cols-3">
                {pillars.map((pillar, i) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    className="flex flex-col rounded-tl-[32px] rounded-br-[32px] rounded-tr-2xl rounded-bl-2xl bg-black p-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)]"
                  >
                    <div className="relative h-48 overflow-hidden rounded-tl-[26px] rounded-br-lg rounded-tr-xl rounded-bl-lg bg-neutral-900">
                      <pillar.Visual />
                    </div>
                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-xs text-[#FAFF00]">
                          {pillar.index}
                        </span>
                        <ArrowUpRight
                          size={16}
                          weight="bold"
                          className="text-white/30 transition-colors group-hover:text-[#FAFF00]"
                        />
                      </div>
                      <div className="text-base font-semibold text-white md:text-lg">
                        {pillar.title}
                      </div>
                      <div className="mt-1.5 text-sm leading-relaxed text-white/55">
                        {pillar.desc}
                      </div>
                    </div>
                  </motion.div>
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
              <span className="bg-black text-[#FAFF00] text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                New
              </span>
              <span>
                AI Playbook — AI across design, dev &amp; creative production
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" weight="bold" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Pillar visuals ───────────────────────────────────────────────

/** Runs looping animations only while the visual is on screen. */
function useLiveVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-40px" })
  const reduce = useReducedMotion()
  return { ref, live: inView && !reduce }
}

const PROMPTS = [
  "aurora gradient, soft violet glow",
  "glass torus, slow orbit",
  "ribbon waves, lime accent",
]

const BLOBS = [
  { color: "#AF52DE", className: "left-[8%] top-[10%] h-28 w-28", x: [0, 30, 0], y: [0, 20, 0], d: 7 },
  { color: YELLOW, className: "right-[10%] top-[18%] h-24 w-24", x: [0, -25, 0], y: [0, 25, 0], d: 6 },
  { color: "#00C7BE", className: "left-[30%] bottom-[-10%] h-32 w-32", x: [0, 20, 0], y: [0, -20, 0], d: 8 },
  { color: "#FF6482", className: "right-[25%] bottom-[5%] h-20 w-20", x: [0, -20, 0], y: [0, -15, 0], d: 5 },
]

function GenerativeCanvas() {
  const { ref, live } = useLiveVisual()
  const promptIndex = useTicker(PROMPTS.length, 3200, live)

  return (
    <div ref={ref} className="absolute inset-0">
      {BLOBS.map((b) => (
        <motion.div
          key={b.color}
          aria-hidden
          className={`absolute rounded-full opacity-70 blur-2xl ${b.className}`}
          style={{ backgroundColor: b.color }}
          animate={live ? { x: b.x, y: b.y } : undefined}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Gyroscope — a stand-in for generated 3D objects */}
      <div className="absolute left-1/2 top-[42%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 [perspective:400px]">
        {[65, -60, 0].map((tilt, i) => (
          <motion.div
            key={tilt}
            aria-hidden
            className="absolute inset-0 rounded-full border border-white/50"
            style={{ rotateX: tilt, rotateY: i === 2 ? 70 : 0 }}
            animate={live ? { rotateZ: i % 2 ? -360 : 360 } : undefined}
            transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div className="absolute inset-[38%] rounded-full bg-white shadow-[0_0_24px_6px_rgba(255,255,255,0.5)]" />
      </div>

      {/* Prompt bar */}
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs text-white/85 backdrop-blur-md">
        <Sparkle size={14} weight="fill" className="shrink-0 text-[#FAFF00]" />
        <div className="relative h-4 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={promptIndex}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 truncate"
            >
              {PROMPTS[promptIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="rounded-full bg-[#FAFF00] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
          Gen
        </span>
      </div>
    </div>
  )
}

const HUES = ["#FAFF00", "#FF9500", "#FF3B30", "#AF52DE", "#007AFF", "#34C759"]
const SHADES = [1, 0.75, 0.5, 0.3, 0.15]
const TARGETS = [
  { icon: FigmaLogo, label: "Figma" },
  { icon: Code, label: "Next.js" },
  { icon: DeviceMobile, label: "Flutter" },
]

function TokenSystem() {
  const { ref, live } = useLiveVisual()
  const active = useTicker(HUES.length, 1400, live)

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-[10px] text-white/80">
          color.brand.{(active + 1) * 100}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/40">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34C759]" />
          synced
        </span>
      </div>

      <div className="grid flex-1 grid-cols-6 gap-1.5">
        {HUES.map((hue, col) => (
          <div key={hue} className="flex flex-col gap-1.5">
            {SHADES.map((shade, row) => (
              <motion.div
                key={shade}
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: shade }}
                viewport={{ once: true }}
                transition={{ delay: (col + row) * 0.04, duration: 0.3 }}
                className={`flex-1 rounded-[4px] transition-shadow duration-300 ${
                  col === active && row === 0 ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900" : ""
                }`}
                style={{ backgroundColor: hue }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-1.5">
        {TARGETS.map((t) => (
          <span
            key={t.label}
            className="flex flex-1 items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 py-1 text-[10px] font-medium text-white/75"
          >
            <t.icon size={12} weight="duotone" />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  )
}

const CODE_LINES = [
  { indent: 0, parts: [["#FF6482", 22], ["#fff", 40]] },
  { indent: 1, parts: [["#00C7BE", 28], ["#FAFF00", 30]] },
  { indent: 2, parts: [["#AF52DE", 18], ["#fff", 46]] },
  { indent: 2, parts: [["#00C7BE", 34], ["#fff", 22]] },
  { indent: 1, parts: [["#FF9500", 44]] },
  { indent: 0, parts: [["#FF6482", 16]] },
] as const

const APPS = [
  { icon: GameController, label: "Games" },
  { icon: AirplaneTilt, label: "Trips" },
  { icon: Cube, label: "3D" },
  { icon: CloudSun, label: "Weather" },
]

function CodeToApp() {
  const { ref, live } = useLiveVisual()
  const appIndex = useTicker(APPS.length, 2000, live)
  const App = APPS[appIndex]

  return (
    <div ref={ref} className="absolute inset-0 flex items-center gap-3 p-4">
      {/* Editor */}
      <div className="h-full flex-[1.5] overflow-hidden rounded-xl border border-white/10 bg-black/60">
        <div className="flex gap-1 border-b border-white/10 px-2.5 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFD600]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#34C759]" />
        </div>
        <div className="space-y-2 p-2.5">
          {CODE_LINES.map((line, i) => (
            <div
              key={i}
              className="flex gap-1"
              style={{ paddingLeft: line.indent * 10 }}
            >
              {line.parts.map(([color, width], j) => (
                <motion.span
                  key={j}
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: color, opacity: color === "#fff" ? 0.3 : 0.9 }}
                  initial={{ width: 0 }}
                  whileInView={{ width }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12 + j * 0.05, duration: 0.35 }}
                />
              ))}
              {i === CODE_LINES.length - 1 && (
                <span className="ml-0.5 h-2.5 w-[2px] -translate-y-0.5 animate-pulse bg-[#FAFF00]" />
              )}
            </div>
          ))}
        </div>
      </div>

      <ArrowRight size={16} weight="bold" className="shrink-0 text-[#FAFF00]" />

      {/* Live preview */}
      <div className="relative flex h-[85%] flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#FAFF00]">
        <span className="absolute left-2 top-2 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-black/60">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF3B30]" />
          Live
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={App.label}
            initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-1"
          >
            <App.icon size={34} weight="duotone" className="text-black" />
            <span className="text-[11px] font-semibold text-black">{App.label}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
