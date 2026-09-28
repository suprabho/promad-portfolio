"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  MapTrifold,
  Books,
  Palette,
  type Icon,
} from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { FALLBACK_STORY_COUNT, withStoryCount } from "@/lib/vizmaya"
import { vizmayaFontVars } from "@/lib/vizmaya-fonts"

// The studio story vizmaya.fyi embeds on its own home page, loaded live.
const EMBED_STORY = "vizmaya-studio"

const pillars: {
  icon: Icon
  title: string
  desc: string
}[] = [
  {
    icon: MapTrifold,
    title: "Scroll-synced storytelling",
    desc: "Maps, ECharts visualizations, and prose driven by a single scroll position — the map flies, charts step, text snap-locks.",
  },
  {
    icon: Books,
    title: "{stories} published narratives",
    desc: "Geopolitics, economics, and technology — from press freedom and GDP growth to the rise of GPU economies.",
  },
  {
    icon: Palette,
    title: "Every story, its own theme",
    desc: "Stories and epics carry their own palette, type, and aura — authored in Markdown + YAML, rendered by the shared Vismay engine.",
  },
]

export function VizmayaBanner({
  storyCount = FALLBACK_STORY_COUNT,
}: {
  storyCount?: number
}) {
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
      <section ref={sectionRef} className={`relative z-10 ${vizmayaFontVars}`}>
        <div>
          <div className="relative overflow-hidden bg-[#F4F1EC] py-16 text-[#0C0C10] md:py-24">
            {/* Brand glows: the three circles of the vizmaya mark */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-24 h-[480px] w-[480px] rounded-full bg-[#0BBFAB]/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-1/3 top-1/2 h-[320px] w-[320px] rounded-full bg-[#E84D7A]/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#2B4ACF]/10 blur-3xl"
            />

            <div className="container relative mx-auto px-4">
              <h2 className="sr-only">vizmaya.fyi</h2>
              <div className="mb-12">
                {/* One live story */}
                <div>
                  <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_40px_80px_-30px_rgba(12,12,16,0.45)]">
                    <div className="flex items-center gap-3 border-b border-black/[0.07] bg-[#2A2824]/[0.04] px-3.5 py-2">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                      </div>
                      <a
                        href={`https://vizmaya.fyi/story/${EMBED_STORY}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 truncate rounded bg-black/[0.05] px-3 py-0.5 text-center font-mono text-[10px] text-black/45 hover:text-black/70"
                      >
                        vizmaya.fyi/story/{EMBED_STORY}
                      </a>
                    </div>
                    <iframe
                      src={`https://vizmaya.fyi/story/${EMBED_STORY}?embed=1`}
                      title="Vizmaya Studio"
                      loading="lazy"
                      className="block h-[clamp(360px,70vh,760px)] w-full border-0 bg-[#F4F1EC]"
                    />
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
                    className="overflow-hidden rounded-2xl border border-[#0C0C10]/[0.08] bg-white/60"
                  >
                    <div className="flex items-start gap-3 p-4 md:p-5">
                      <pillar.icon
                        size={20}
                        weight="duotone"
                        className="mt-0.5 shrink-0 text-[#0BBFAB]"
                      />
                      <div>
                        <div className="font-[family-name:var(--font-vz-serif)] text-base font-semibold md:text-lg">
                          {withStoryCount(pillar.title, storyCount)}
                        </div>
                        <div className="mt-1 text-xs leading-relaxed text-[#4A4742] md:text-sm">
                          {pillar.desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky banner after scrolling past section */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-0 right-0 top-[7.5rem] z-40 border-b border-[#0C0C10]/10 bg-[#F4F1EC] shadow-sm"
          >
            <a
              href="https://vizmaya.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className="container mx-auto flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-[#0C0C10] transition-opacity hover:opacity-80"
            >
              <span className="rounded bg-[#0C0C10] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F4F1EC]">
                New
              </span>
              <span>
                vizmaya.fyi — Data stories on geopolitics &amp; markets, plus the
                AI Daily
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#0BBFAB]" weight="bold" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
