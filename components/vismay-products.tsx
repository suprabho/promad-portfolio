"use client"

import { useRef, type ReactNode } from "react"
import Image from "next/image"
import { ArrowUpRight } from "@phosphor-icons/react"
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { useTicker } from "@/hooks/use-ticker"
import { LAUNCHED_PRODUCTS, type LaunchedProduct } from "@/app/ai-playbook/content"

const VIZF1_RED = "#ff4346"

const byTitle = (title: string) =>
  LAUNCHED_PRODUCTS.find((p) => p.title === title) as LaunchedProduct

export function VismayProducts() {
  const footshorts = byTitle("footshorts.com")
  const vizf1 = byTitle("vizf1.com")

  return (
    <section className="relative z-10 bg-[#0d1220] pb-16 text-[#e4e8f0] md:pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#e4e8f0]/50">
            Same engine, new verticals
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ProductCard
            product={footshorts}
            className="bg-[#FEF7F3] text-[#1c1410]"
            muted="text-[#1c1410]/60"
            tagClass="border-[#C2410C]/20 bg-[#F5845E]/10 text-[#C2410C]"
            ctaClass="bg-[#F5845E] text-white"
            visual={<SwipeFeed />}
          />
          <ProductCard
            product={vizf1}
            className="border border-[#1f2330] bg-[#0b0d12] text-[#f5f5f5]"
            muted="text-[#f5f5f5]/55"
            tagClass="border-white/10 bg-white/[0.04] text-[#f5f5f5]/75"
            ctaClass="bg-[#ff4346] text-[#0b0d12]"
            visual={<RaceChart />}
          />
        </div>
      </div>
    </section>
  )
}

function ProductCard({
  product,
  className,
  muted,
  tagClass,
  ctaClass,
  visual,
}: {
  product: LaunchedProduct
  className: string
  muted: string
  tagClass: string
  ctaClass: string
  visual: ReactNode
}) {
  return (
    <motion.a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group/card relative grid overflow-hidden rounded-3xl sm:grid-cols-[1fr_1.1fr] ${className}`}
    >
      <div className="flex flex-col p-6 md:p-8">
        {product.logo && (
          <Image
            src={product.logo}
            alt={`${product.title} logo`}
            width={48}
            height={48}
            className="mb-5 h-12 w-12 rounded-xl shadow-md"
          />
        )}
        <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
          {product.title}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
          {product.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${tagClass}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all group-hover/card:gap-2.5 ${ctaClass}`}
        >
          Visit site
          <ArrowUpRight size={16} weight="bold" />
        </span>
      </div>
      <div className="relative min-h-[280px] overflow-hidden">{visual}</div>
    </motion.a>
  )
}

function useLiveVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-40px" })
  const reduce = useReducedMotion()
  return { ref, live: inView && !reduce }
}

// ─── footshorts: swipeable 60-word cards ──────────────────────────

const FEED_CARDS = [
  { league: "Premier League", home: "#DA291C", away: "#6CABDD", score: "2 – 1" },
  { league: "La Liga", home: "#A50044", away: "#FFFFFF", score: "0 – 0" },
  { league: "Serie A", home: "#0068A8", away: "#000000", score: "3 – 2" },
  { league: "Bundesliga", home: "#DC052D", away: "#FDE100", score: "1 – 1" },
]

function SwipeFeed() {
  const { ref, live } = useLiveVisual()
  const index = useTicker(FEED_CARDS.length, 2600, live)

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-end justify-center bg-gradient-to-br from-[#F5845E] to-[#C2410C] pt-8"
    >
      {/* Pitch lines */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full opacity-15"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="100" cy="100" r="36" fill="none" stroke="white" strokeWidth="1.5" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="white" strokeWidth="1.5" />
        <rect x="55" y="-1" width="90" height="34" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="55" y="167" width="90" height="34" fill="none" stroke="white" strokeWidth="1.5" />
      </svg>

      {/* Phone */}
      <div className="relative h-[92%] w-[62%] max-w-[220px] translate-y-6 rounded-t-[28px] border-[6px] border-b-0 border-[#1c1410] bg-[#FEF7F3] p-2.5 shadow-2xl transition-transform duration-500 group-hover/card:translate-y-3">
        <div className="mx-auto mb-2.5 h-1 w-10 rounded-full bg-[#1c1410]/20" />
        <div className="relative h-[calc(100%-14px)]">
          <AnimatePresence initial={false}>
            {FEED_CARDS.map((card, i) => {
              const offset = (i - index + FEED_CARDS.length) % FEED_CARDS.length
              if (offset > 2) return null
              return (
                <motion.div
                  key={card.league}
                  className="absolute inset-x-0 top-0 flex h-full flex-col rounded-2xl border border-[#C2410C]/10 bg-white p-3 shadow-md"
                  style={{ zIndex: 3 - offset }}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={{
                    opacity: 1 - offset * 0.3,
                    y: offset * 8,
                    scale: 1 - offset * 0.05,
                    x: 0,
                    rotate: 0,
                  }}
                  exit={{ x: -220, rotate: -14, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#F5845E]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#C2410C]">
                      {card.league}
                    </span>
                    <span className="font-mono text-[9px] text-[#1c1410]/40">60w</span>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#0B3D24] py-2">
                    <span className="h-3 w-3 rounded-full border border-white/40" style={{ backgroundColor: card.home }} />
                    <span className="font-mono text-sm font-bold text-white">{card.score}</span>
                    <span className="h-3 w-3 rounded-full border border-white/40" style={{ backgroundColor: card.away }} />
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <div className="h-2 w-11/12 rounded-full bg-[#1c1410]/80" />
                    <div className="h-2 w-2/3 rounded-full bg-[#1c1410]/80" />
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {[100, 94, 98, 88, 96, 70].map((w, j) => (
                      <div
                        key={j}
                        className="h-1 rounded-full bg-[#1c1410]/15"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-1 pt-2 text-[9px] font-semibold text-[#C2410C]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C2410C]" />
                    AI summary
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─── vizf1: race position chart + live timing ─────────────────────

// Positions (1 = leader) per lap sample for five cars.
const RACE = [
  { color: VIZF1_RED, code: "CAR 1", pos: [3, 2, 2, 1, 1, 1, 1] },
  { color: "#3671C6", code: "CAR 2", pos: [1, 1, 1, 2, 2, 3, 2] },
  { color: "#FF8000", code: "CAR 3", pos: [2, 3, 3, 3, 4, 2, 3] },
  { color: "#27F4D2", code: "CAR 4", pos: [5, 4, 4, 4, 3, 4, 4] },
  { color: "#B6BABD", code: "CAR 5", pos: [4, 5, 5, 5, 5, 5, 5] },
]
const LAPS = RACE[0].pos.length
const TOTAL_LAPS = 57

function RaceChart() {
  const { ref, live } = useLiveVisual()
  const step = useTicker(LAPS, 1100, live)
  const lap = Math.round(((step + 1) / LAPS) * TOTAL_LAPS)

  const W = 260
  const H = 150
  const x = (i: number) => 16 + (i / (LAPS - 1)) * (W - 32)
  const y = (p: number) => 14 + ((p - 1) / 4) * (H - 28)

  const standings = [...RACE]
    .map((car) => ({ ...car, now: car.pos[step] }))
    .sort((a, b) => a.now - b.now)

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col gap-3 border-t border-[#1f2330] bg-[#13161d] p-4 sm:border-l sm:border-t-0"
    >
      <div className="flex items-center justify-between font-mono text-[10px]">
        <span className="flex items-center gap-1.5 text-[#f5f5f5]/70">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff4346]" />
          LIVE TIMING
        </span>
        <span className="text-[#ff4346]">
          LAP {String(lap).padStart(2, "0")}/{TOTAL_LAPS}
        </span>
      </div>

      {/* Bump chart */}
      <div className="relative flex-1 rounded-xl border border-[#1f2330] bg-[#0b0d12]">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {[1, 2, 3, 4, 5].map((p) => (
            <line key={p} x1={0} x2={W} y1={y(p)} y2={y(p)} stroke="white" strokeOpacity={0.05} />
          ))}
          <motion.line
            y1={0}
            y2={H}
            stroke="white"
            strokeOpacity={0.15}
            strokeDasharray="2 3"
            animate={{ x1: x(step), x2: x(step) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          {RACE.map((car, ci) => {
            const d = car.pos.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p)}`).join(" ")
            return (
              <motion.path
                key={car.code}
                d={d}
                fill="none"
                stroke={car.color}
                strokeWidth={ci === 0 ? 2.5 : 1.5}
                strokeOpacity={ci === 0 ? 1 : 0.55}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.12 }}
              />
            )
          })}
        </svg>
        {/* Car markers (HTML so they stay round under preserveAspectRatio="none") */}
        {RACE.map((car) => (
          <motion.span
            key={car.code}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[#0b0d12]"
            style={{ backgroundColor: car.color }}
            animate={{
              left: `${(x(step) / W) * 100}%`,
              top: `${(y(car.pos[step]) / H) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Timing tower */}
      <div className="space-y-1">
        {standings.slice(0, 3).map((car, i) => (
          <motion.div
            layout
            key={car.code}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="flex items-center gap-2 rounded-md bg-[#0b0d12] px-2 py-1 font-mono text-[10px]"
          >
            <span className="w-3 text-[#f5f5f5]/50">{i + 1}</span>
            <span className="h-3 w-[3px] rounded-full" style={{ backgroundColor: car.color }} />
            <span className="flex-1 text-[#f5f5f5]/85">{car.code}</span>
            <span className="text-[#f5f5f5]/50">
              {i === 0 ? "LEADER" : `+${(i * 0.412 + car.now * 0.137).toFixed(3)}`}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
