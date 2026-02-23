"use client"

import { motion } from "framer-motion"
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

import { AnimatedCounter } from "./components/AnimatedCounter"
import { Section } from "./components/Section"
import { SectionHeading } from "./components/SectionHeading"
import { LinkCard } from "./components/LinkCard"
import { ProcessStep } from "./components/ProcessStep"
import { StatBar } from "./components/StatBar"
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
  visible: { transition: { staggerChildren: 0.12 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
}

// ─── Page Layout ──────────────────────────────────────────────────

export default function AIPlaybook() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="flex-col relative overflow-hidden min-h-[80vh] flex justify-center items-center">
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
          <iframe
            src="https://aura.promad.design/embed/abstract-dark-gradient-striking-black-gold-design?hideText=true"
            style={{ width: "100%", height: "1000px" }}
            allowFullScreen
          />
        </div>
      </section>

      {/* ── Design System Infrastructure ─────────────────── */}
      <Section id="design-system">
        <SectionHeading
          icon={Cube}
          title="Design System Infrastructure"
          subtitle="A unified pipeline from color definition to production code."
        />

        <motion.div variants={fadeUp} className="mb-10">
          <a href="https://colors.promad.design" target="_blank" rel="noopener noreferrer" className="block">
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
          <SectionHeading icon={Gradient} title="Visual Asset Generation" />
        </div>
        <motion.div variants={fadeUp} className="max-w-2xl z-10 mx-auto">
          <a href="https://aura.promad.design" target="_blank" rel="noopener noreferrer" className="block">
            <Card className="z-10 group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "conic-gradient(from 0deg, #FAFF00, #FF3B30, #AF52DE, #007AFF, #34C759, #FAFF00)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[1px] bg-card rounded-[inherit]" />
              <CardHeader className="relative text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FAFF00] to-[#FF9500] text-black flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="https://aura.promad.design/apple-touch-icon.png"
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
          <iframe
            src="https://aura.promad.design/embed/dark-abstract-header-luminous-green-flow-for-websites?hideText="
            style={{ width: "100%", height: "100%", border: "none" }}
            allowFullScreen
          />
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
          {EXPERIMENTS.map((exp) => (
            <LinkCard key={exp.title} {...exp} />
          ))}
        </motion.div>
      </Section>

      {/* ── Creative Production Pipeline ──────────────────── */}
      <Section id="production" className="bg-secondary/30">
        <SectionHeading icon={FilmSlate} title="Creative Production Pipeline" />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div variants={fadeUp}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-[#FAFF00] text-black flex items-center justify-center mb-3">
                  <FilmSlate size={24} weight="duotone" />
                </div>
                <CardTitle className="text-xl">Modular Video Ad System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  {PROCESS_STEPS.map((title, i) => (
                    <ProcessStep key={i} number={i + 1} title={title} delay={i * 0.1} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-secondary text-foreground flex items-center justify-center mb-3">
                  <FilmScript size={24} weight="duotone" />
                </div>
                <CardTitle className="text-xl">Video Brief Development</CardTitle>
                <CardDescription>From concept to shoot-ready documentation</CardDescription>
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
                          animate={{ scale: [0, 1, 0.6, 1], opacity: [0, 1, 0.5, 1] }}
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
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-baseline gap-3">
              <span className="font-mono font-extrabold text-6xl md:text-8xl">
                <AnimatedCounter target={TOTAL_COMMITS} duration={2.5} />
              </span>
              <span className="text-xl md:text-2xl text-muted-foreground">commits</span>
            </div>
            <p className="text-muted-foreground mt-2">across 4 production codebases</p>
          </motion.div>

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

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8">
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

          <motion.p variants={fadeUp} className="text-center text-muted-foreground mt-8 text-sm">
            Plus: AI-generated coloring sheets in Creator Studio for SEO landing pages.
          </motion.p>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
