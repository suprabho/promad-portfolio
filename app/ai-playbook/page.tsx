"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Palette,
  Gradient,
  FilmSlate,
  FilmScript,
  GitBranch,
  ArrowSquareOut,
  Lightning,
  Cube,
  Robot,
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
} from "./content"

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
          <Icon size={28} weight="duotone" className="text-[#FAFF00] dark:text-[#FAFF00]" />
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
}: {
  title: string
  description: string
  href: string
  icon?: React.ElementType
  iconSource?: string
  accent?: boolean
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

// ─── Stat Bar ─────────────────────────────────────────────────────

function StatBar({
  repo,
  commits,
  added,
  removed,
  href,
  maxCommits,
}: {
  repo: string
  commits: number
  added: string
  removed: string
  href: string
  maxCommits: number
}) {
  const percentage = (commits / maxCommits) * 100
  return (
    <motion.div variants={fadeUp}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block group space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="font-mono text-sm font-semibold group-hover:text-[#FAFF00] transition-colors flex items-center gap-1.5">
            {repo}
            <ArrowSquareOut
              size={12}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
            />
          </span>
          <span className="text-sm text-muted-foreground font-mono">
            {commits} commits
          </span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#FAFF00] to-[#FAFF00]/60"
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground font-mono">
          <span className="text-green-500">+{added}</span>
          <span className="text-red-400">-{removed}</span>
        </div>
      </a>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────

export default function AIPlaybook() {
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
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              AI as creative infrastructure — not just using tools, but building AI-powered
              tools that multiply output across design systems, video production, and
              frontend development.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-full z-0 h-[120dvh]">
          <iframe src="https://aura.promad.design/embed/abstract-dark-gradient-striking-black-gold-design?hideText=true" style={{width:"100%", height:"1000px",}} allowFullScreen></iframe>
        </div>
      </section>

      {/* ── Design System Infrastructure ─────────────────── */}
      <Section id="design-system">
        <SectionHeading
          icon={Cube}
          title="Design System Infrastructure"
          subtitle="A unified pipeline from color definition to production code."
        />

        {/* Featured: colors.promad.design */}
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
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFF00] text-black flex items-center justify-center">
                    <Palette size={28} weight="duotone" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      colors.promad.design
                      <ArrowSquareOut
                        size={18}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
                      />
                    </CardTitle>
                    <CardDescription className="text-base">
                      Visualize and export Tailwind-compatible color palettes. The hub that
                      feeds everything downstream.
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
            Custom tools for design system management
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
          <iframe src="https://aura.promad.design/embed/magenta-wavy-gradient-header-dynamic-website-design" style={{width:"100%", height:"100%", border:"none"}} allowFullScreen></iframe>
        </div>
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

      {/* ── Creative Production Pipeline ──────────────────── */}
      <Section id="production" className="bg-secondary/30">
        <SectionHeading
          icon={FilmSlate}
          title="Creative Production Pipeline"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Modular Video Ad System */}
          <motion.div variants={fadeUp}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-[#FAFF00] text-black flex items-center justify-center mb-3">
                  <FilmSlate size={24} weight="duotone" />
                </div>
                <CardTitle className="text-xl">Modular Video Ad System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Animated equation */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-center font-mono text-lg">
                  {EQUATION_ITEMS.map((item, i) => (
                    <motion.div key={item.label} variants={scaleIn} className="flex items-center gap-2">
                      {i > 0 && <span className="text-muted-foreground">×</span>}
                      <div className="bg-secondary rounded-lg px-3 py-2">
                        <div className="text-2xl font-bold">{item.n}</div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                      </div>
                    </motion.div>
                  ))}
                  <motion.div variants={scaleIn} className="flex items-center gap-2">
                    <span className="text-muted-foreground">=</span>
                    <div className="bg-[#FAFF00] text-black rounded-lg px-3 py-2">
                      <div className="text-2xl font-bold">100+</div>
                      <div className="text-xs">variations</div>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-3 pt-2">
                  {PROCESS_STEPS.map((step, i) => (
                    <ProcessStep key={i} number={i + 1} title={step} delay={i * 0.1} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Video Brief Development */}
          <motion.div variants={fadeUp}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-secondary text-foreground flex items-center justify-center mb-3">
                  <FilmScript size={24} weight="duotone" />
                </div>
                <CardTitle className="text-xl">Video Brief Development</CardTitle>
                <CardDescription>
                  From concept to generation-ready documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {VIDEO_BRIEF_ITEMS.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#FAFF00]/20 flex items-center justify-center flex-shrink-0">
                        <motion.div
                          className="w-2.5 h-2.5 rounded-full bg-[#FAFF00]"
                          animate={{
                            scale: [0, 1, 0.6, 1],
                            opacity: [0, 1, 0.5, 1],
                          }}
                          transition={{
                            delay: i * 0.15,
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* ── Shipping Product ──────────────────────────────── */}
      <Section id="shipping">
        <SectionHeading
          icon={GitBranch}
          title="Shipping Product"
          subtitle="Regular frontend contributions while building all of the above."
        />

        <div className="max-w-4xl mx-auto">
          {/* Big number */}
          <motion.div
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="inline-flex items-baseline gap-3">
              <span className="font-mono font-extrabold text-6xl md:text-8xl">
                <AnimatedCounter target={TOTAL_COMMITS} duration={2.5} />
              </span>
              <span className="text-xl md:text-2xl text-muted-foreground">commits</span>
            </div>
            <p className="text-muted-foreground mt-2">across 4 production codebases</p>
          </motion.div>

          {/* Repo bars */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6 mb-14"
          >
            {REPO_STATS.map((stat) => (
              <StatBar key={stat.repo} {...stat} maxCommits={MAX_COMMITS} />
            ))}
          </motion.div>

          {/* Totals */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-8"
          >
            <div className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-green-500">
                +<AnimatedCounter target={TOTAL_LINES_ADDED} duration={2} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">lines added</p>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-red-400">
                -<AnimatedCounter target={TOTAL_LINES_REMOVED} duration={2} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">lines removed</p>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-center text-muted-foreground mt-8 text-sm"
          >
            Plus: AI-generated coloring sheets in Creator Studio for SEO landing pages.
          </motion.p>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
