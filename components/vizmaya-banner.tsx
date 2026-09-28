"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
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
import { VizmayaLogo } from "@/components/vizmaya-logo"
import { BrowserShot } from "@/components/browser-shot"

const SHOTS = "/images/products/vismay"

const pillars: {
  icon: Icon
  title: string
  desc: string
  shot: string
  alt: string
}[] = [
  {
    icon: MapTrifold,
    title: "Scroll-synced storytelling",
    desc: "Maps, ECharts visualizations, and prose driven by a single scroll position — the map flies, charts step, text snap-locks.",
    shot: `${SHOTS}/vizmaya-story.webp`,
    alt: "A vizmaya story with a payload-to-orbit bar chart beside its prose",
  },
  {
    icon: Books,
    title: "{stories} published narratives",
    desc: "Geopolitics, economics, and technology — from press freedom and GDP growth to the rise of GPU economies.",
    shot: `${SHOTS}/vizmaya-archive.webp`,
    alt: "The vizmaya.fyi archive listing every published story",
  },
  {
    icon: Palette,
    title: "Every story, its own theme",
    desc: "Stories and epics carry their own palette, type, and aura — authored in Markdown + YAML, rendered by the shared Vismay engine.",
    shot: `${SHOTS}/vizmaya-themes.webp`,
    alt: "The vizmaya.fyi bento grid of story cards, each in its own color theme",
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
        <a
          href="https://vizmaya.fyi"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
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
              <div className="mb-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Copy */}
                <div className="lg:col-span-5">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="rounded bg-[#0C0C10] px-1.5 py-0.5 font-[family-name:var(--font-vz-mono)] text-[10px] font-medium uppercase tracking-wider text-[#F4F1EC]">
                      New
                    </span>
                    <span className="inline-flex items-center gap-2.5 font-[family-name:var(--font-vz-mono)] text-[10.5px] uppercase tracking-[0.22em] text-[#0BBFAB]">
                      <span className="h-px w-4 bg-current" />
                      Vizmaya Labs
                    </span>
                  </div>

                  <h2 className="sr-only">vizmaya.fyi</h2>
                  <VizmayaLogo className="-ml-1 h-[58px] w-[236px] md:h-[76px] md:w-[308px]" />

                  <p className="mt-6 max-w-md font-[family-name:var(--font-vz-serif)] text-2xl font-semibold leading-[1.1] tracking-tight md:text-[34px]">
                    We turn complex data into stories{" "}
                    <em className="font-normal">impossible to ignore.</em>
                  </p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-[#4A4742]">
                    A two-person data-journalism studio on geopolitics,
                    technology, and the asymmetries reshaping markets. The map
                    does the argument, the prose does the meaning.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      `${storyCount}+ stories`,
                      "Mapbox GL",
                      "Apache ECharts",
                      "Daily editions",
                    ].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#0C0C10]/15 px-3 py-1 font-[family-name:var(--font-vz-mono)] text-[10px] uppercase tracking-[0.12em] text-[#4A4742]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 rounded-[3px] bg-[#0C0C10] px-5 py-3 font-[family-name:var(--font-vz-mono)] text-xs uppercase tracking-[0.14em] text-[#F4F1EC] transition-all group-hover:gap-3">
                    <span>Read the stories</span>
                    <ArrowRight className="h-4 w-4 text-[#0BBFAB]" weight="bold" />
                  </div>
                </div>

                {/* Live product screenshot */}
                <div className="lg:col-span-7">
                  <BrowserShot
                    src={`${SHOTS}/vizmaya-home.webp`}
                    alt="The vizmaya.fyi home page: the studio statement beside a bento carousel of themed story cards"
                    url="vizmaya.fyi"
                    className="transition-transform duration-500 group-hover:-translate-y-1"
                  />
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
                    className="overflow-hidden rounded-2xl border border-[#0C0C10]/[0.08] bg-white/60 transition-colors group-hover:border-[#0BBFAB]/40"
                  >
                    <div className="relative h-40 overflow-hidden border-b border-[#0C0C10]/[0.06] bg-[#0C0C10]">
                      <Image
                        src={pillar.shot}
                        alt={pillar.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
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
