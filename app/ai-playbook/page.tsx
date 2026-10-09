"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useTransform, useReducedMotion, animate } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useVizmayaStoryCount } from "@/hooks/use-vizmaya-story-count"
import { withStoryCount } from "@/lib/vizmaya"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Gradient,
  FilmSlate,
  FilmScript,
  GitBranch,
  ArrowSquareOut,
  Lightning,
  Cube,
  Robot,
  Users,
  Compass,
  MapTrifold,
  ChartLineUp,
  Stack,
  ArrowRight,
  DownloadSimple,
  CaretRight,
} from "@phosphor-icons/react"
import {
  COLOR_PALETTE,
  FIGMA_PLUGINS,
  EXPERIMENTS,
  EQUATION_ITEMS,
  PROCESS_STEPS,
  VIDEO_BRIEF_ITEMS,
  REPO_STATS,
  MAX_COMMITS,
  TOTAL_COMMITS,
  TOTAL_LINES_ADDED,
  TOTAL_LINES_REMOVED,
  VISMAY_CAPABILITIES,
  LAUNCHED_PRODUCTS,
  PRO_TIMELINE_HIGHLIGHTS,
  PRO_TIMELINE_LAYERS,
  PRO_TIMELINE_TAGS,
} from "./content"
import { LATEST_ZXP_URL, LOGO_SRC as PRO_TIMELINE_LOGO } from "../pro-timeline/content"

// ─── Animation Variants ───────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
}

// ─── Animated Counter Component ───────────────────────────────────

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (isInView) {
      animate(motionValue, target, { duration })
    }
  }, [isInView, motionValue, target, duration])

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return unsubscribe
  }, [rounded])

  return <span ref={ref}>0</span>
}

// ─── Section Wrapper ──────────────────────────────────────────────

/** Shadecraft mark (charcoal on its yellow tile), from the Shadecraft brand kit. */
function ShadecraftMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="4 4 50 45" aria-hidden="true">
      <path
        fill="#221F1F"
        d="M7 12H19V26H7ZM7 31H19V41H7ZM23 6H35V26H23ZM23 31H35V47H23ZM39 17H51V26H39ZM39 31H51V46H39Z"
      />
    </svg>
  )
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <motion.section
      id={id}
      className={`py-20 md:py-28 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">{children}</div>
    </motion.section>
  )
}

// ─── Section Heading ──────────────────────────────────────────────

function SectionHeading({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string
  subtitle?: string
  icon?: React.ElementType
}) {
  return (
    <motion.div variants={fadeUp} className="mb-14 text-center">
      {Icon && (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAFF00]/20">
          <Icon size={28} weight="duotone" className="text-[#1A1A1A] dark:text-[#FAFF00]" />
        </div>
      )}
      <h2 className="font-serif italic font-extrabold text-3xl md:text-5xl mb-3">{title}</h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}

// ─── Link Card ────────────────────────────────────────────────────

function LinkCard({
  title,
  description,
  href,
  icon: Icon,
  iconSource,
  accent = false,
  users,
}: {
  title: string
  description: string
  href: string
  icon?: React.ElementType
  iconSource?: string
  accent?: boolean
  users?: number
}) {
  return (
    <motion.div variants={fadeUp}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        <Card
          className={`group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
            accent ? "border-[#FAFF00]/40 bg-[#FAFF00]/5" : ""
          }`}
        >
          <CardHeader>
            {iconSource ? (
              <Image src={iconSource} alt={title} width={48} height={48} className="w-12 h-12 rounded-xl mb-3 transition-transform group-hover:scale-110" />
            ) : Icon ? (
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${
                  accent
                    ? "bg-[#FAFF00] text-black"
                    : "bg-secondary text-foreground"
                }`}
              >
                <Icon size={24} weight="duotone" />
              </div>
            ) : null}
            <CardTitle className="text-xl flex items-center gap-2">
              {title}
              <ArrowSquareOut
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
              />
            </CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
            {users != null && (
              <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
                <Users size={16} />
                <span>{users} {users === 1 ? "user" : "users"}</span>
              </div>
            )}
          </CardHeader>
        </Card>
      </a>
    </motion.div>
  )
}

// ─── Process Step ─────────────────────────────────────────────────

function ProcessStep({
  number,
  title,
  delay = 0,
}: {
  number: number
  title: string
  delay?: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      className="flex items-start gap-4"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FAFF00] text-black font-bold flex items-center justify-center text-lg font-mono">
        {number}
      </div>
      <p className="text-base md:text-lg pt-1.5">{title}</p>
    </motion.div>
  )
}

// ─── Pro Timeline Preview ─────────────────────────────────────────

const ROW_HEIGHT = 28

/** Panel states the preview cycles through; `label` names the action that led to each. */
const PRO_TIMELINE_STEPS = [
  { label: "Move", shift: 0, open: true, ms: 1600 },
  { label: "Move", shift: 30, open: true, ms: 1400 },
  { label: "Collapse", shift: 30, open: false, ms: 1800 },
  { label: "Expand", shift: 30, open: true, ms: 1400 },
]

/** Looping sketch of the panel: the open group moves in time, collapses and expands again. */
function ProTimelinePreview() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.4 })
  const [step, setStep] = useState(0)
  const { label, shift, open, ms } = PRO_TIMELINE_STEPS[step]
  const ease = [0.4, 0, 0.2, 1] as const

  useEffect(() => {
    if (reduceMotion || !isInView) return
    const id = setTimeout(() => setStep((s) => (s + 1) % PRO_TIMELINE_STEPS.length), ms)
    return () => clearTimeout(id)
  }, [step, ms, reduceMotion, isInView])

  // Members fold away when the group collapses; other rows keep their height
  const rowHeight = (kind: string) => (kind === "member" && !open ? 0 : ROW_HEIGHT)
  const minHeight = PRO_TIMELINE_LAYERS.length * ROW_HEIGHT

  return (
    <div
      ref={ref}
      aria-hidden
      className="rounded-2xl border border-pt-line bg-pt-surface p-4 font-mono text-[11px]"
    >
      <div className="mb-3 flex items-center justify-between text-pt-sage">
        <span>Comp 1</span>
        {!reduceMotion && (
          <motion.span
            key={step}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full border border-pt-lime/40 px-2 py-0.5 text-pt-lime"
          >
            {label}
          </motion.span>
        )}
      </div>
      <div className="flex gap-3">
        {/* Layer outline */}
        <div className="w-[92px] shrink-0 pt-5 sm:w-[112px]" style={{ minHeight: minHeight + 20 }}>
          {PRO_TIMELINE_LAYERS.map((layer) => {
            const isGroup = layer.kind !== "member"
            return (
              <motion.div
                key={layer.name}
                initial={false}
                animate={{ height: rowHeight(layer.kind), opacity: rowHeight(layer.kind) ? 1 : 0 }}
                transition={{ duration: 0.45, ease }}
                className="overflow-hidden"
              >
                <div
                  className={`flex h-7 items-center gap-1 ${isGroup ? "text-pt-chalk" : "pl-4 text-pt-sage"}`}
                >
                  {isGroup && (
                    <motion.span
                      initial={false}
                      animate={{ rotate: layer.kind === "group" && open ? 90 : 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="flex shrink-0 text-pt-lime"
                    >
                      <CaretRight size={10} weight="bold" />
                    </motion.span>
                  )}
                  <span className="truncate">{layer.name}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Track area */}
        <div className="relative min-w-0 grow overflow-hidden" style={{ minHeight: minHeight + 20 }}>
          <div className="mb-2 flex h-3 justify-between border-b border-pt-line">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className={`w-px bg-pt-line ${i % 2 ? "h-1.5" : "h-2.5"}`} />
            ))}
          </div>
          {PRO_TIMELINE_LAYERS.map((layer) => (
            <motion.div
              key={layer.name}
              initial={false}
              animate={{ height: rowHeight(layer.kind), opacity: rowHeight(layer.kind) ? 1 : 0 }}
              transition={{ duration: 0.45, ease }}
              className="overflow-hidden"
            >
              <motion.div
                className="relative h-7"
                initial={false}
                animate={{ x: layer.kind === "collapsed" ? "0%" : `${shift}%` }}
                transition={{ duration: 0.9, ease }}
              >
                <span
                  className={`absolute top-1/2 h-3.5 -translate-y-1/2 rounded-[3px] ${
                    layer.kind === "group"
                      ? "border border-pt-lime bg-pt-lime/15"
                      : layer.kind === "collapsed"
                        ? "border border-pt-sage/50"
                        : "bg-pt-sage/50"
                  }`}
                  style={{ left: `${layer.left}%`, width: `${layer.width}%` }}
                />
              </motion.div>
            </motion.div>
          ))}
          <motion.span
            className="absolute inset-y-0 w-px bg-pt-lime/80"
            style={{ left: "38%" }}
            animate={reduceMotion ? undefined : { left: ["8%", "92%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────

export default function AIPlaybook() {
  const storyCount = useVizmayaStoryCount()
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="flex-col relative overflow-hidden min-h-[80vh] flex justify-center items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-[#FAFF00]/10 blur-3xl" />
          <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-[#FAFF00]/5 blur-3xl" />
          <motion.div
            className="absolute top-1/3 right-[20%] w-4 h-4 rounded-full bg-[#FAFF00]/40"
            animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-[15%] w-3 h-3 rounded-full bg-[#FAFF00]/30"
            animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-1/3 right-[35%] w-2 h-2 rounded-full bg-[#FAFF00]/50"
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </div>

        <div className="container mx-auto px-4 h-full z-10 py-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-6 font-mono text-sm px-4 py-1.5">
                <Robot size={14} weight="duotone" className="mr-1.5" />
                AI Playbook
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif italic font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6"
            >
              AI in My Creative
              <br />
              <span className="relative">
                & Dev Workflow
                <motion.span
                  className="absolute -bottom-2 left-0 h-3 bg-[#FAFF00]/30 rounded-full -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-[#fff]/80 max-w-3xl mx-auto leading-relaxed"
            >
              AI as creative infrastructure — not just using tools, but building AI-powered
              tools that multiply output across design systems, video production, and
              frontend development.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-full z-0 h-[120dvh]">
        <iframe title="Abstract Dark Gradient – Striking Black & Gold Design" src="https://aura.promad.design/embed/abstract-dark-gradient-striking-black-gold-design?hideText=true&hideIcons=true" style={{width:"100%", height:"1200px"}} allowFullScreen></iframe>
        </div>
      </section>

      {/* ── Design System Infrastructure ─────────────────── */}
      <Section id="design-system">
        <SectionHeading
          icon={Cube}
          title="Design System Infrastructure"
          subtitle="A unified pipeline from color definition to production code."
        />

        {/* Featured: Shadecraft (colors.promad.design) */}
        <motion.div variants={fadeUp} className="mb-10">
          <a
            href="https://colors.promad.design"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="group relative overflow-hidden border-[#FAFF00]/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FAFF00]/10 via-transparent to-[#FAFF00]/5" />
              <CardHeader className="relative">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#EDE23D] flex items-center justify-center">
                    <ShadecraftMark size={38} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex flex-wrap items-center gap-x-2 gap-y-1">
                      Shadecraft
                      <span className="text-sm font-normal text-muted-foreground">
                        colors.promad.design
                      </span>
                      <ArrowSquareOut
                        size={18}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
                      />
                    </CardTitle>
                    <CardDescription className="text-base">
                      Color palette studio. Shape OKLCH color scales, preview them in an
                      interface, and export to CSS, JSON, Dart or Figma. The hub that feeds
                      everything downstream.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              {/* Animated color strip */}
              <div className="px-6 pb-6">
                <div className="flex gap-1.5 h-3 rounded-full overflow-hidden">
                  {COLOR_PALETTE.map((color, i) => (
                    <motion.div
                      key={color}
                      className="flex-1 rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </a>
        </motion.div>

        {/* Figma Plugins */}
        <motion.div variants={fadeUp} className="mb-6">
          <h3 className="text-xl font-semibold text-center mb-1">Figma Plugins</h3>
          <p className="text-sm text-muted-foreground text-center">
            Custom tools for design systems, maps and generative backgrounds
          </p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {FIGMA_PLUGINS.map((plugin) => (
            <LinkCard key={plugin.title} {...plugin} />
          ))}
        </motion.div>
      </Section>

      {/* ── Visual Asset Generation ──────────────────────── */}
      <Section id="visual-assets" className="flex flex-col relative bg-secondary/30">
        <div className="relative z-10">
          <SectionHeading
            icon={Gradient}
            title="Visual Asset Generation"
          />
        </div>
        <motion.div variants={fadeUp} className="max-w-2xl z-10 mx-auto">
          <a
            href="https://aura.promad.design"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="z-10 group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "conic-gradient(from 0deg, #FAFF00, #FF3B30, #AF52DE, #007AFF, #34C759, #FAFF00)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[1px] bg-card rounded-[inherit]" />
              <CardHeader className="relative text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FAFF00] to-[#FF9500] text-black flex items-center justify-center mx-auto mb-4">
                  <Image
                   src={"https://aura.promad.design/apple-touch-icon.png"}
                   alt="Aura Logo"
                   width={64}
                   height={64}
                  />
                </div>
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  Aura Backgrounds
                  <ArrowSquareOut
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
                  />
                </CardTitle>
                <CardDescription className="text-base max-w-md mx-auto">
                  Dynamic, responsive background generation for static assets, motion
                  graphics, and website embeds.
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        </motion.div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe title="Dark Abstract Header – Luminous Green Flow for Websites" src="https://aura.promad.design/embed/dark-abstract-header-luminous-green-flow-for-websites?hideText=true" style={{width:"100%", height:"800px"}} allowFullScreen></iframe>
        </div>
      </Section>

      {/* ── Pro Timeline ──────────────────────────────────── */}
      <Section id="pro-timeline">
        <SectionHeading
          icon={FilmSlate}
          title="Pro Timeline"
          subtitle="Motion tooling — an After Effects panel for layer groups, built with AI from brand to release."
        />

        <motion.div variants={fadeUp} className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-pt-line bg-pt-graphite text-pt-chalk shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 85% 10%, rgba(200,243,107,0.14) 0%, transparent 50%)",
              }}
            />
            <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <Image
                    src={PRO_TIMELINE_LOGO}
                    alt="Pro Timeline logo"
                    width={56}
                    height={56}
                    className="w-14 h-14 shrink-0"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">Pro Timeline</h3>
                    <p className="text-sm text-pt-sage">Layer groups for After Effects</p>
                  </div>
                </div>

                <p className="text-base text-pt-sage leading-relaxed mb-6">
                  After Effects has no native layer folders. Pro Timeline is a dockable panel
                  that builds groups from ordinary layers, parenting and shy switches — so the
                  project stays standard After Effects.
                </p>

                <ol className="space-y-3 mb-6">
                  {PRO_TIMELINE_HIGHLIGHTS.map((h, i) => (
                    <li key={h.verb} className="flex gap-3 text-sm">
                      <span className="shrink-0 min-w-[7.5rem] font-mono font-medium tabular-nums text-pt-lime">
                        0{i + 1} · {h.verb}
                      </span>
                      <span className="text-pt-sage">{h.detail}</span>
                    </li>
                  ))}
                </ol>

                <div className="flex flex-wrap gap-2 mb-8">
                  {PRO_TIMELINE_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full border border-pt-line bg-pt-surface text-pt-sage"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/pro-timeline"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-pt-lime px-5 text-[15px] font-medium text-pt-graphite transition-colors hover:bg-[#d4f78a]"
                  >
                    Explore Pro Timeline
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                  <a
                    href={LATEST_ZXP_URL}
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-pt-line px-5 text-[15px] font-medium text-pt-chalk transition-colors hover:bg-pt-raised"
                  >
                    <DownloadSimple size={16} weight="bold" />
                    Download
                  </a>
                </div>
              </div>

              <ProTimelinePreview />
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ── Vismay Engine ─────────────────────────────────── */}
      <Section id="vismay">
        <SectionHeading
          icon={Stack}
          title="Vismay — The Viz Engine"
          subtitle="A reusable visualization and storytelling engine. One registry, one scroll model, one asset pipeline — powering four verticals so far."
        />

        <motion.div variants={fadeUp} className="max-w-4xl mx-auto mb-10">
          <Card className="group relative overflow-hidden border-[#FAFF00]/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FAFF00]/10 via-transparent to-[#FAFF00]/5" />
            <CardHeader className="relative">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-2xl bg-[#FAFF00] text-black flex items-center justify-center shrink-0">
                  <Stack size={28} weight="duotone" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl">Vismay</CardTitle>
                  <CardDescription className="text-base">
                    A monorepo viz engine — registry, slot dispatchers, asset
                    pipeline, capture pipeline — composed once and reused across
                    vizmaya.fyi, footshorts.com, vizf1.com, and VizNBA.
                  </CardDescription>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {VISMAY_CAPABILITIES.map(({ icon: Icon, label, detail }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#FAFF00]/20 text-[#1A1A1A] dark:text-[#FAFF00] flex items-center justify-center shrink-0">
                      <Icon size={18} weight="duotone" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </Section>

      {/* ── Launched Products ─────────────────────────────── */}
      <Section id="launched-products">
        <SectionHeading
          icon={Compass}
          title="Launched Products"
          subtitle="AI-assisted from concept to production — public platforms shipped end-to-end on the Vismay engine."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {LAUNCHED_PRODUCTS.map((product) => {
            const Icon = product.icon
            return (
              <motion.div key={product.title} variants={fadeUp}>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card
                    className="group h-full relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                    style={{
                      backgroundColor: product.surface,
                      borderColor: product.border,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 80% 20%, ${product.accentSoft} 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                      }}
                    />
                    {product.screenshot && (
                      <div className="relative px-6 pt-6">
                        <div
                          className="overflow-hidden rounded-xl border shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                          style={{ borderColor: product.border }}
                        >
                          <Image
                            src={product.screenshot}
                            alt={`${product.title} homepage`}
                            width={1280}
                            height={800}
                            className="block aspect-[16/10] w-full object-cover object-top"
                          />
                        </div>
                      </div>
                    )}
                    <CardHeader className="relative">
                      {product.logo ? (
                        <Image
                          src={product.logo}
                          alt={`${product.title} logo`}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-2xl shrink-0 mb-3 object-cover shadow-md"
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mb-3"
                          style={{ backgroundColor: product.accentSoft }}
                        >
                          <Icon
                            size={28}
                            weight="duotone"
                            style={{ color: product.accent }}
                          />
                        </div>
                      )}
                      <CardTitle
                        className="text-2xl flex items-center gap-2"
                        style={{ color: product.accentText }}
                      >
                        {product.title}
                        <ArrowSquareOut
                          size={18}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: product.accent }}
                        />
                      </CardTitle>
                      <CardDescription
                        className="text-base mt-1"
                        style={{ color: `${product.accentText}b3` }}
                      >
                        {withStoryCount(product.description, storyCount)}
                      </CardDescription>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {product.tags.map((tag) => withStoryCount(tag, storyCount)).map((label) => (
                          <span
                            key={label}
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.06)",
                              color: `${product.accentText}d9`,
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                  </Card>
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* ── Vibe-Coded Experiments ────────────────────────── */}
      <Section id="experiments">
        <SectionHeading
          icon={Lightning}
          title="Vibe-Coded Experiments"
          subtitle="Quick interactive prototypes — concept to working code in hours."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {EXPERIMENTS.map((experiment) => (
            <LinkCard key={experiment.title} {...experiment} />
          ))}
        </motion.div>
      </Section>

      <Footer />
    </div>
  )
}
