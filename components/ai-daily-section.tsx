"use client"

import { useRef } from "react"
import Image from "next/image"
import {
  ArrowUpRight,
  TrendDown,
  TrendUp,
  type Icon,
} from "@phosphor-icons/react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { useTicker } from "@/hooks/use-ticker"
import { aiDailySerif, vizmayaFontVars } from "@/lib/vizmaya-fonts"
import { BrowserShot } from "@/components/browser-shot"

const SHOTS = "/images/products/vismay"
const EDITION_URL = "https://vizmaya.fyi/ai-daily/doom-v-boom"

// The edition's dark palette (apps/vizmaya-fyi/app/ai-daily/doom-v-boom/edition.css).
const DOOM = "#f87171"
const BOOM = "#4ade80"

const sides: {
  key: "doom" | "boom"
  label: string
  rule: string
  desc: string
  color: string
  icon: Icon
  shot: string
  alt: string
}[] = [
  {
    key: "doom",
    label: "Doom",
    rule: "Freezes, pauses, warnings → −1",
    desc: "Grid queues, paused leases, permitting freezes and power warnings pull the reading down.",
    color: DOOM,
    icon: TrendDown,
    shot: `${SHOTS}/ai-daily-doom.webp`,
    alt: "The doom side of a sample edition: the day's doom stories with their sources",
  },
  {
    key: "boom",
    label: "Boom",
    rule: "Expansion, demand, deals → +1",
    desc: "Power deals, capacity build-outs and sold-out supply chains push it up — each event weighted by relevance × impact.",
    color: BOOM,
    icon: TrendUp,
    shot: `${SHOTS}/ai-daily-boom.webp`,
    alt: "The boom side of a sample edition: the day's boom stories with their sources",
  },
]

export function AiDailySection() {
  return (
    <section
      className={`relative z-10 bg-[#F4F1EC] pb-6 ${vizmayaFontVars} ${aiDailySerif.variable}`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-[family-name:var(--font-vz-mono)] text-[10px] uppercase tracking-[0.2em] text-[#0C0C10]/50">
            New on vizmaya · Daily series
          </span>
          <span className="h-px flex-1 bg-[#0C0C10]/10" />
        </div>

        <motion.a
          href={EDITION_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="group/daily relative block overflow-hidden rounded-3xl border border-[#232b33] bg-[#0b0e12] p-6 text-[#dbe7f0] md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/3 h-[360px] w-[360px] rounded-full blur-3xl"
            style={{ backgroundColor: `${DOOM}14` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-20 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{ backgroundColor: `${BOOM}14` }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Copy */}
            <div className="lg:col-span-5">
              <span className="font-[family-name:var(--font-vz-mono)] text-[10.5px] uppercase tracking-[0.2em] text-[#22d3ee]">
                AI Daily · Every morning, 09:00 UTC
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-dv-serif)] text-5xl leading-none md:text-6xl">
                <span style={{ color: DOOM }}>Doom</span>{" "}
                <span className="text-[#8b98a5]">v</span>{" "}
                <span style={{ color: BOOM }}>Boom</span>
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#8b98a5] md:text-base">
                The AI Data Centers Daily reads the previous 24 hours of
                data-centre, energy and sustainability news and research, and
                scores whether it points to boom or doom — a Boom Score out of
                100, every claim traceable to its source. Composed each morning,
                frozen on publish.
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {["Boom Score", "By geography", "By AI layer", "New research", "AI + Energy"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#2f3941] px-2.5 py-1 font-[family-name:var(--font-vz-mono)] text-[10px] uppercase tracking-[0.1em] text-[#8b98a5]"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
              <span className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#22d3ee] px-4 py-2 font-[family-name:var(--font-vz-mono)] text-xs uppercase tracking-[0.1em] text-[#06282e] transition-all group-hover/daily:gap-2.5">
                Read today&apos;s edition
                <ArrowUpRight size={14} weight="bold" />
              </span>
            </div>

            {/* Edition screenshot */}
            <div className="lg:col-span-7">
              <BrowserShot
                src={`${SHOTS}/ai-daily-edition.webp`}
                alt="A Doom v Boom edition: the day's headline beside its Boom Score ring"
                url="vizmaya.fyi/ai-daily/doom-v-boom"
                badge="Sample edition"
                dark
                className="transition-transform duration-500 group-hover/daily:-translate-y-1"
              />
            </div>
          </div>

          <ScoreMeter />

          {/* Doom and Boom sides */}
          <div className="relative mt-6 grid gap-4 md:grid-cols-2">
            {sides.map((side) => (
              <div
                key={side.key}
                className="overflow-hidden rounded-2xl border border-[#232b33] bg-[#161b22]"
                style={{ borderTopColor: side.color, borderTopWidth: 2 }}
              >
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <side.icon size={22} weight="bold" style={{ color: side.color }} />
                      <span
                        className="font-[family-name:var(--font-dv-serif)] text-3xl leading-none"
                        style={{ color: side.color }}
                      >
                        {side.label}
                      </span>
                    </div>
                    <span className="rounded-full border border-[#2f3941] px-2.5 py-1 font-[family-name:var(--font-vz-mono)] text-[10px] text-[#dbe7f0]/75">
                      {side.rule}
                    </span>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#8b98a5]">
                    {side.desc}
                  </p>
                </div>
                <div className="px-5 pb-5 md:px-6 md:pb-6">
                  <Image
                    src={side.shot}
                    alt={side.alt}
                    width={900}
                    height={422}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="h-auto w-full rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.a>
      </div>
    </section>
  )
}

// Readings the meter sweeps through to show how the −1…+1 scale maps to a
// Boom Score; not a live edition.
const READINGS = [
  { score: 0.37, word: "Boom, clearly" },
  { score: -0.28, word: "Doom-leaning" },
  { score: 0.04, word: "Balanced" },
]

function ScoreMeter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-40px" })
  const reduce = useReducedMotion()
  const step = useTicker(READINGS.length, 2600, inView && !reduce)
  const r = READINGS[step]
  const pct = ((r.score + 1) / 2) * 100
  const color = r.score > 0.15 ? BOOM : r.score < -0.15 ? DOOM : "#dbe7f0"

  return (
    <div
      ref={ref}
      className="relative mt-10 rounded-2xl border border-[#232b33] bg-[#161b22] px-5 pb-5 pt-4 md:px-8"
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-[family-name:var(--font-vz-mono)] text-[10px] uppercase tracking-[0.16em] text-[#8b98a5]">
          How the day reads
        </span>
        <span className="flex items-baseline gap-3">
          <motion.span
            key={r.word}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-dv-serif)] text-2xl"
            style={{ color }}
          >
            {r.word}
          </motion.span>
          <span className="font-[family-name:var(--font-vz-mono)] text-xs tabular-nums text-[#8b98a5]">
            Boom Score {Math.round(pct)}
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between font-[family-name:var(--font-vz-mono)] text-[10px] uppercase tracking-[0.14em]">
        <span style={{ color: DOOM }}>◂ Doom</span>
        <span style={{ color: BOOM }}>Boom ▸</span>
      </div>
      <div className="relative mt-2 h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${DOOM}, #5f6b76 50%, ${BOOM})` }}>
        <motion.span
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#0b0e12] bg-[#dbe7f0] shadow"
          animate={{ left: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
      <div className="mt-2 flex justify-between font-[family-name:var(--font-vz-mono)] text-[10px] tabular-nums text-[#5f6b76]">
        <span>−1.00</span>
        <span>0</span>
        <span>+1.00</span>
      </div>
    </div>
  )
}
