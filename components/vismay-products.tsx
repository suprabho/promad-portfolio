"use client"

import { useLayoutEffect, useRef, useState, type ReactNode } from "react"
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
import type { FootshortsData } from "@/lib/footshorts"
import type { Vizf1Data } from "@/lib/vizf1"
import { productFontVars } from "@/lib/vismay-product-fonts"
import { LeagueGrid, MatchStrip, Schedule, Watchlist } from "@/components/footshorts-live"
import { ConstructorPodium, DriverPodium, StandingsChart } from "@/components/vizf1-live"

const byTitle = (title: string) =>
  LAUNCHED_PRODUCTS.find((p) => p.title === title) as LaunchedProduct

export function VismayProducts({
  footshortsData,
  vizf1Data,
}: {
  footshortsData: FootshortsData
  vizf1Data: Vizf1Data | null
}) {
  const footshorts = byTitle("footshorts.com")
  const vizf1 = byTitle("vizf1.com")

  // Live modules from each product's own data; a slide drops out when its data is missing.
  const footshortsSlides = [
    footshortsData.snapshot.length > 0 && (
      <MatchStrip key="matches" fixtures={footshortsData.snapshot} crests={footshortsData.leagueCrests} />
    ),
    footshortsData.teams.length > 0 && <Watchlist key="watchlist" teams={footshortsData.teams} />,
    footshortsData.schedule.length > 0 && <Schedule key="schedule" fixtures={footshortsData.schedule} />,
    footshortsData.leagues.length > 0 && <LeagueGrid key="leagues" leagues={footshortsData.leagues} />,
  ].filter(Boolean) as ReactNode[]

  const vizf1Slides = vizf1Data
    ? ([
        vizf1Data.drivers.length > 0 && <DriverPodium key="drivers" drivers={vizf1Data.drivers} />,
        vizf1Data.constructors.length > 0 && (
          <ConstructorPodium key="constructors" constructors={vizf1Data.constructors} />
        ),
        vizf1Data.lanes.length > 0 && (
          <StandingsChart key="standings" lanes={vizf1Data.lanes} season={vizf1Data.season} />
        ),
      ].filter(Boolean) as ReactNode[])
    : []

  return (
    <section
      className={`relative z-10 bg-[#F4F1EC] pb-16 pt-10 text-[#0C0C10] md:pb-24 md:pt-14 ${productFontVars}`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#0C0C10]/50">
            Same engine, new verticals
          </span>
          <span className="h-px flex-1 bg-[#0C0C10]/10" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ProductCard
            product={footshorts}
            className="border border-[#24242E] bg-[#0B0B0F] text-[#F4F4F5]"
            muted="text-[#8E8E99]"
            tagClass="border-[#F26A3C]/30 bg-[#F26A3C]/10 text-[#F26A3C]"
            ctaClass="bg-[#F26A3C] text-white"
            visual={
              <LiveCarousel
                slides={footshortsSlides}
                logo={footshorts.logo}
                className="bg-gradient-to-br from-[#F26A3C] to-[#C2410C] font-[family-name:var(--font-fs-sans)]"
                dotClass="bg-white"
                pitch
              />
            }
          />
          <ProductCard
            product={vizf1}
            className="border border-[#1f2330] bg-[#0b0d12] text-[#f5f5f5]"
            muted="text-[#f5f5f5]/55"
            tagClass="border-white/10 bg-white/[0.04] text-[#f5f5f5]/75"
            ctaClass="bg-[#ff4346] text-[#0b0d12]"
            visual={
              <LiveCarousel
                slides={vizf1Slides}
                logo={vizf1.logo}
                className="border-t border-[#1f2330] bg-[#0b0d12] sm:border-l sm:border-t-0"
                dotClass="bg-[#ff4346]"
              />
            }
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

// ─── Live module carousel ─────────────────────────────────────────

function LiveCarousel({
  slides,
  logo,
  className,
  dotClass,
  pitch = false,
}: {
  slides: ReactNode[]
  logo?: string
  className: string
  dotClass: string
  pitch?: boolean
}) {
  const { ref, live } = useLiveVisual()
  const index = useTicker(slides.length, 3600, live)

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      {pitch && (
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
      )}

      {slides.length === 0 ? (
        // No live data (e.g. the product's API is unreachable): just the mark.
        logo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src={logo} alt="" width={96} height={96} className="h-24 w-24 rounded-3xl opacity-90 shadow-2xl" />
          </div>
        )
      ) : (
        <>
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              className="absolute inset-4 bottom-10 flex items-center justify-center"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.5 }}
            >
              {/* Modules are laid out at their native width and scaled to fit the panel. */}
              <FitScale>{slides[index]}</FitScale>
            </motion.div>
          </AnimatePresence>
          {slides.length > 1 && <CarouselDots count={slides.length} index={index} className={dotClass} />}
        </>
      )}
    </div>
  )
}

/** Scales its child down (never up) so it fits the parent box. */
function FitScale({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const fit = () =>
      setScale(Math.min(1, o.clientWidth / i.offsetWidth, o.clientHeight / i.offsetHeight))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={outer} className="flex h-full w-full items-center justify-center">
      <div ref={inner} className="shrink-0" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

function CarouselDots({
  count,
  index,
  className,
}: {
  count: number
  index: number
  className: string
}) {
  return (
    <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/30 px-2 py-1.5 backdrop-blur">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === index ? `w-4 ${className}` : "w-1.5 bg-white/40"
          }`}
        />
      ))}
    </div>
  )
}
