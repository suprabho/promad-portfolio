"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Robot } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

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
          <div className="bg-[#FAFF00] py-10 md:py-14">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center shrink-0">
                  <Robot size={24} weight="duotone" className="text-black" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-black">
                    AI Playbook
                  </h2>
                  <p className="text-black/70 text-sm md:text-base">
                    How we integrate AI into our design &amp; dev workflow
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-black font-medium group-hover:gap-3 transition-all">
                <span>Explore</span>
                <ArrowRight className="w-5 h-5" weight="bold" />
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
              className="container mx-auto flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-black hover:opacity-80 transition-opacity"
            >
              <Robot size={14} weight="duotone" />
              <span>
                Explore our AI Playbook — AI in our design &amp; dev workflow
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" weight="bold" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
