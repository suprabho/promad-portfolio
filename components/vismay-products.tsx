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

const SHOTS = "/images/products/vismay"

const byTitle = (title: string) =>
  LAUNCHED_PRODUCTS.find((p) => p.title === title) as LaunchedProduct

export function VismayProducts() {
  const footshorts = byTitle("footshorts.com")
  const vizf1 = byTitle("vizf1.com")

  return (
    <section className="relative z-10 bg-[#F4F1EC] pb-16 pt-10 text-[#0C0C10] md:pb-24 md:pt-14">
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
            visual={<FootshortsPhone />}
          />
          <ProductCard
            product={vizf1}
            className="border border-[#1f2330] bg-[#0b0d12] text-[#f5f5f5]"
            muted="text-[#f5f5f5]/55"
            tagClass="border-white/10 bg-white/[0.04] text-[#f5f5f5]/75"
            ctaClass="bg-[#ff4346] text-[#0b0d12]"
            visual={<SeasonModules />}
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

// ─── footshorts: the about-us page on a phone ─────────────────────

const FOOTSHORTS_SHOTS = [
  {
    src: `${SHOTS}/footshorts-about-hero.webp`,
    alt: "footshorts.com/about-us: “Football, but only the good bits.”",
    fit: "object-cover object-top",
  },
  {
    src: `${SHOTS}/footshorts-about-themes.webp`,
    alt: "The three footshorts themes: Classic, Pitch and Terrace",
    fit: "object-cover object-top",
  },
  {
    src: `${SHOTS}/footshorts-about-cta.webp`,
    alt: "The footshorts sign-up card: “Get the good bits.”",
    fit: "object-contain object-center",
  },
]

function FootshortsPhone() {
  const { ref, live } = useLiveVisual()
  const index = useTicker(FOOTSHORTS_SHOTS.length, 3200, live)
  const shot = FOOTSHORTS_SHOTS[index]

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-end justify-center bg-gradient-to-br from-[#F26A3C] to-[#C2410C] pt-8"
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
      <div className="relative h-[92%] w-[62%] max-w-[220px] translate-y-6 overflow-hidden rounded-t-[28px] border-[6px] border-b-0 border-[#0B0B0F] bg-[#0B0B0F] shadow-2xl transition-transform duration-500 group-hover/card:translate-y-3">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image src={shot.src} alt={shot.alt} fill sizes="220px" className={shot.fit} />
          </motion.div>
        </AnimatePresence>
      </div>
      <CarouselDots count={FOOTSHORTS_SHOTS.length} index={index} className="bg-white" position="top-3" />
    </div>
  )
}

// ─── vizf1: season modules ────────────────────────────────────────

const VIZF1_SHOTS = [
  {
    src: `${SHOTS}/vizf1-drivers.webp`,
    alt: "vizf1 drivers' championship podium: Antonelli, Russell and Hamilton",
  },
  {
    src: `${SHOTS}/vizf1-constructors.webp`,
    alt: "vizf1 constructors' championship podium: Mercedes, Ferrari and McLaren",
  },
  {
    src: `${SHOTS}/vizf1-standings.webp`,
    alt: "vizf1 driver position over time: championship standings through round 19",
  },
]

function SeasonModules() {
  const { ref, live } = useLiveVisual()
  const index = useTicker(VIZF1_SHOTS.length, 3200, live)
  const shot = VIZF1_SHOTS[index]

  return (
    <div
      ref={ref}
      className="absolute inset-0 border-t border-[#1f2330] bg-[#0b0d12] sm:border-l sm:border-t-0"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-3 bottom-9"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>
      <CarouselDots count={VIZF1_SHOTS.length} index={index} className="bg-[#ff4346]" position="bottom-3" />
    </div>
  )
}

function CarouselDots({
  count,
  index,
  className,
  position,
}: {
  count: number
  index: number
  className: string
  position: "top-3" | "bottom-3"
}) {
  return (
    <div className={`absolute ${position} left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/30 px-2 py-1.5 backdrop-blur`}>
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
