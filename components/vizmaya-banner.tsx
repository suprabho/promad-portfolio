"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Compass,
  MapTrifold,
  ChartLineUp,
  Stack,
} from "@phosphor-icons/react"
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { useTicker } from "@/hooks/use-ticker"

const GOLD = "#d9a84a"

const pillars = [
  {
    icon: MapTrifold,
    title: "Scroll-synced storytelling",
    desc: "Mapbox maps, ECharts visualizations, and prose driven by a single scroll position — the map flies, charts step, text snap-locks.",
    Visual: SyncRail,
  },
  {
    icon: ChartLineUp,
    title: "13+ published narratives",
    desc: "Geopolitical, economic, and technology stories with map and data layers — from press freedom to the rise of GPU economies.",
    Visual: StoryStack,
  },
  {
    icon: Stack,
    title: "Static-generated, themeable",
    desc: "Stories authored in Markdown + YAML, statically generated at build time, with per-story color systems via CSS variables.",
    Visual: ThemeFile,
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
          <div className="relative overflow-hidden bg-[#0d1220] py-16 text-[#e4e8f0] md:py-24">
            {/* Glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-[#d9a84a]/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#3b5bdb]/10 blur-3xl"
            />

            <div className="container relative mx-auto px-4">
              <div className="mb-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Copy */}
                <div className="lg:col-span-5">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d9a84a]/15">
                      <Compass size={22} weight="duotone" className="text-[#d9a84a]" />
                    </span>
                    <span className="rounded bg-[#d9a84a] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0d1220]">
                      New
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#e4e8f0]/50">
                      Just launched
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
                    vizmaya<span className="text-[#d9a84a]">.fyi</span>
                  </h2>
                  <p className="mt-4 max-w-md text-base text-[#e4e8f0]/65 md:text-lg">
                    Data-driven narratives on geopolitics, technology, and the
                    asymmetries reshaping markets.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Mapbox GL", "Apache ECharts", "Markdown + YAML"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#e4e8f0]/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9a84a] px-5 py-3 font-medium text-[#0d1220] transition-all group-hover:gap-3">
                    <span>Read the stories</span>
                    <ArrowRight className="h-5 w-5" weight="bold" />
                  </div>
                </div>

                {/* Product mockup */}
                <div className="lg:col-span-7">
                  <StoryMockup />
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
                    className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] transition-colors group-hover:border-[#d9a84a]/25"
                  >
                    <div className="relative h-28 border-b border-white/[0.06] bg-black/20">
                      <pillar.Visual />
                    </div>
                    <div className="flex items-start gap-3 p-4 md:p-5">
                      <pillar.icon
                        size={20}
                        weight="duotone"
                        className="mt-0.5 shrink-0 text-[#d9a84a]"
                      />
                      <div>
                        <div className="text-sm font-semibold md:text-base">
                          {pillar.title}
                        </div>
                        <div className="mt-1 text-xs leading-relaxed text-[#e4e8f0]/55 md:text-sm">
                          {pillar.desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
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
            className="fixed left-0 right-0 z-40 top-[7.5rem] bg-[#0d1220] border-b border-white/[0.08] shadow-sm"
          >
            <a
              href="https://vizmaya.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className="container mx-auto flex items-center justify-center gap-3 py-2.5 px-4 text-sm font-medium text-[#e4e8f0] hover:opacity-80 transition-opacity"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#d9a84a] text-[#0d1220]">
                New
              </span>
              <span>
                vizmaya.fyi — Scroll-synced data narratives on geopolitics &amp; markets
              </span>
              <ArrowRight className="w-4 h-4 shrink-0 text-[#d9a84a]" weight="bold" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Visuals ──────────────────────────────────────────────────────

function useLiveVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-40px" })
  const reduce = useReducedMotion()
  return { ref, live: inView && !reduce }
}

// Rough continents as ellipses in a 400×240 space, rendered as a dot matrix.
const CONTINENTS = [
  [85, 70, 55, 32],
  [120, 160, 22, 42],
  [205, 62, 26, 18],
  [212, 135, 28, 42],
  [290, 72, 72, 36],
  [335, 175, 26, 14],
] as const

const MAP_DOTS: [number, number][] = []
for (let x = 3; x < 400; x += 6) {
  for (let y = 3; y < 240; y += 6) {
    const inside = CONTINENTS.some(
      ([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1
    )
    if (inside) MAP_DOTS.push([x, y])
  }
}

// Each scroll step: where the camera flies, the route drawn, and the chart state.
const STEPS = [
  { focus: [205, 62], from: [85, 70], to: [205, 62], bars: [30, 45, 38, 60, 52, 70], hi: 1 },
  { focus: [290, 80], from: [205, 62], to: [300, 90], bars: [40, 36, 58, 50, 74, 66], hi: 4 },
  { focus: [320, 150], from: [300, 90], to: [335, 175], bars: [28, 52, 44, 70, 62, 88], hi: 5 },
] as const

// Keeps the 1.25× zoomed map from exposing its edges (max offset is 12.5%).
const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v))

function arc([x1, y1]: readonly number[], [x2, y2]: readonly number[]) {
  const mx = (x1 + x2) / 2
  const my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.35 - 10
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`
}

function StoryMockup() {
  const { ref, live } = useLiveVisual()
  const step = useTicker(STEPS.length, 2800, live)
  const s = STEPS[step]
  const [fx, fy] = s.focus

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1b] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:-translate-y-1"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <div className="flex-1 truncate rounded-md bg-white/[0.05] px-3 py-1 text-center font-mono text-[11px] text-[#e4e8f0]/50">
          vizmaya.fyi
        </div>
      </div>

      <div className="relative grid aspect-[16/10] grid-cols-[38%_1fr] sm:aspect-[16/9]">
        {/* Prose column */}
        <div className="relative flex flex-col justify-center gap-4 border-r border-white/[0.06] py-4 pl-6 pr-4">
          {/* Scroll rail */}
          <div className="absolute bottom-4 left-2.5 top-4 w-[2px] rounded-full bg-white/10">
            <motion.div
              className="absolute left-0 right-0 top-0 rounded-full bg-[#d9a84a]"
              animate={{ height: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
          {STEPS.map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: i === step ? 1 : 0.25 }}
              transition={{ duration: 0.4 }}
              className={`space-y-1.5 rounded-lg border-l-2 py-1.5 pl-2.5 transition-colors ${
                i === step ? "border-[#d9a84a] bg-white/[0.04]" : "border-transparent"
              }`}
            >
              <div className="h-1.5 w-2/3 rounded-full bg-[#e4e8f0]/70" />
              <div className="h-1 w-full rounded-full bg-[#e4e8f0]/25" />
              <div className="h-1 w-5/6 rounded-full bg-[#e4e8f0]/25" />
              <div className="hidden h-1 w-3/4 rounded-full bg-[#e4e8f0]/25 sm:block" />
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <div className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: 1.25,
              x: `${clamp((200 - fx) * 0.3125, 12.5)}%`,
              y: `${clamp((120 - fy) * 0.52, 12.5)}%`,
            }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          >
            <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
              {/* Graticule */}
              {[40, 80, 120, 160, 200].map((y) => (
                <line key={y} x1={0} x2={400} y1={y} y2={y} stroke="white" strokeOpacity={0.04} />
              ))}
              {[50, 100, 150, 200, 250, 300, 350].map((x) => (
                <line key={x} y1={0} y2={240} x1={x} x2={x} stroke="white" strokeOpacity={0.04} />
              ))}
              {MAP_DOTS.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={1.1} fill="#e4e8f0" fillOpacity={0.25} />
              ))}
              {/* Route */}
              <motion.path
                key={`route-${step}`}
                d={arc(s.from, s.to)}
                fill="none"
                stroke={GOLD}
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
              <circle cx={s.from[0]} cy={s.from[1]} r={2.5} fill={GOLD} />
              <circle cx={s.to[0]} cy={s.to[1]} r={3} fill={GOLD} />
              <motion.circle
                key={`pulse-${step}`}
                cx={s.to[0]}
                cy={s.to[1]}
                fill="none"
                stroke={GOLD}
                initial={{ r: 3, opacity: 0.9 }}
                animate={{ r: 14, opacity: 0 }}
                transition={{ duration: 1.4, repeat: live ? Infinity : 0, delay: 1 }}
              />
            </svg>
          </motion.div>

          {/* Chart card */}
          <div className="absolute bottom-3 right-3 w-[46%] rounded-xl border border-white/10 bg-[#0d1220]/85 p-2.5 backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between">
              <div className="h-1 w-10 rounded-full bg-[#e4e8f0]/50" />
              <span className="font-mono text-[9px] text-[#d9a84a]">
                {String(step + 1).padStart(2, "0")}/{String(STEPS.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex h-10 items-end gap-1 sm:h-14">
              {s.bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  animate={{
                    height: `${h}%`,
                    backgroundColor: i === s.hi ? GOLD : "rgba(228,232,240,0.2)",
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.03 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SyncRail() {
  const { ref, live } = useLiveVisual()
  const step = useTicker(4, 900, live)
  const layers = [
    { icon: MapTrifold, label: "map" },
    { icon: ChartLineUp, label: "chart" },
    { icon: Stack, label: "prose" },
  ]

  return (
    <div ref={ref} className="absolute inset-0 flex items-center gap-4 px-5">
      <div className="relative h-20 w-1.5 rounded-full bg-white/10">
        <motion.div
          className="absolute left-0 right-0 h-5 rounded-full bg-[#d9a84a]"
          animate={{ top: `${(step / 3) * 75}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {layers.map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <l.icon size={12} weight="duotone" className="text-[#e4e8f0]/50" />
            <div className="flex flex-1 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-colors duration-500 ${
                    i <= step ? "bg-[#d9a84a]" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const STORY_LINE = "M0,70 C30,66 50,60 80,52 S130,40 160,30 S210,14 240,8"

function StoryStack() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {[-8, 0, 8].map((rot, i) => (
        <div
          key={rot}
          className="absolute h-20 w-32 rounded-lg border border-white/10 bg-[#141b2d] shadow-lg transition-transform duration-500 group-hover:[transform:var(--fan)]"
          style={{
            transform: `rotate(${rot}deg) translateX(${rot * 3}px)`,
            ["--fan" as string]: `rotate(${rot * 1.6}deg) translateX(${rot * 6}px)`,
            zIndex: i === 1 ? 2 : 1,
          }}
        >
          {i === 1 && (
            <svg viewBox="0 0 240 80" className="h-full w-full p-2">
              <motion.path
                d={STORY_LINE}
                fill="none"
                stroke={GOLD}
                strokeWidth={4}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            </svg>
          )}
        </div>
      ))}
      <span className="absolute right-4 top-3 z-10 font-mono text-2xl font-bold text-[#d9a84a]">
        13+
      </span>
    </div>
  )
}

const THEMES = [
  ["#d9a84a", "#0d1220"],
  ["#e05a47", "#1a1010"],
  ["#4fb3a9", "#0c1a1a"],
]

function ThemeFile() {
  const { ref, live } = useLiveVisual()
  const theme = useTicker(THEMES.length, 1800, live)
  const [accent, bg] = THEMES[theme]

  return (
    <div ref={ref} className="absolute inset-0 flex items-center gap-3 px-5">
      <div className="flex-1 space-y-1 font-mono text-[10px] leading-tight text-[#e4e8f0]/55">
        <div className="text-[#e4e8f0]/30">---</div>
        <div>
          <span className="text-[#e4e8f0]/80">theme:</span>
        </div>
        <div className="pl-3">
          accent:{" "}
          <motion.span animate={{ color: accent }} transition={{ duration: 0.4 }}>
            &quot;{accent}&quot;
          </motion.span>
        </div>
        <div className="pl-3">
          surface: <span className="text-[#e4e8f0]/80">&quot;{bg}&quot;</span>
        </div>
        <div className="text-[#e4e8f0]/30">---</div>
      </div>
      <motion.div
        className="flex h-20 w-24 shrink-0 flex-col justify-end gap-1 rounded-lg border border-white/10 p-2"
        animate={{ backgroundColor: bg }}
        transition={{ duration: 0.4 }}
      >
        <motion.div className="h-1.5 w-2/3 rounded-full" animate={{ backgroundColor: accent }} />
        <div className="h-1 w-full rounded-full bg-white/25" />
        <div className="h-1 w-4/5 rounded-full bg-white/25" />
      </motion.div>
    </div>
  )
}
