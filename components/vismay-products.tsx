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
            visual={<RaceReplay />}
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

// ─── footshorts: native editorial story on a phone ────────────────

const FOOTSHORTS_SHOTS = [
  {
    src: `${SHOTS}/footshorts-story.webp`,
    alt: "A footshorts editorial story, “Carrick restores the balance”, on mobile",
  },
  {
    src: `${SHOTS}/footshorts-pitch.webp`,
    alt: "An animated 4-2-3-1 pitch diagram inside the same footshorts story",
  },
]

function FootshortsPhone() {
  const { ref, live } = useLiveVisual()
  const index = useTicker(FOOTSHORTS_SHOTS.length, 3200, live)

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
            <Image
              src={FOOTSHORTS_SHOTS[index].src}
              alt={FOOTSHORTS_SHOTS[index].alt}
              fill
              sizes="220px"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── vizf1: race replay ───────────────────────────────────────────

function RaceReplay() {
  return (
    <div className="absolute inset-0 border-t border-[#1f2330] bg-[#0b0d12] sm:border-l sm:border-t-0">
      <Image
        src={`${SHOTS}/vizf1-replay-crop.webp`}
        alt="The vizf1 race replay: a 2D circuit map with cars on track beside the live timing tower"
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover object-[35%_top] transition-transform duration-700 group-hover/card:scale-[1.03]"
      />
    </div>
  )
}
