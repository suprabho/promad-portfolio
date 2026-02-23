// ─── Phase System ─────────────────────────────────────────────────

export type PhaseKey = "ux" | "motion" | "product" | "pm" | "dev" | "founder"

export const PHASE: Record<
  PhaseKey,
  { color: string; bg: string; border: string; hoverBg: string; hoverBorder: string }
> = {
  ux:      { color: "#4ECDC4", bg: "rgba(78,205,196,0.06)",  border: "rgba(78,205,196,0.15)",  hoverBg: "rgba(78,205,196,0.1)",  hoverBorder: "rgba(78,205,196,0.3)"  },
  motion:  { color: "#FF6B6B", bg: "rgba(255,107,107,0.06)", border: "rgba(255,107,107,0.15)", hoverBg: "rgba(255,107,107,0.1)", hoverBorder: "rgba(255,107,107,0.3)" },
  product: { color: "#A78BFA", bg: "rgba(167,139,250,0.06)", border: "rgba(167,139,250,0.15)", hoverBg: "rgba(167,139,250,0.1)", hoverBorder: "rgba(167,139,250,0.3)" },
  pm:      { color: "#F59E0B", bg: "rgba(245,158,11,0.06)",  border: "rgba(245,158,11,0.15)",  hoverBg: "rgba(245,158,11,0.1)",  hoverBorder: "rgba(245,158,11,0.3)"  },
  dev:     { color: "#34D399", bg: "rgba(52,211,153,0.06)",  border: "rgba(52,211,153,0.15)",  hoverBg: "rgba(52,211,153,0.1)",  hoverBorder: "rgba(52,211,153,0.3)"  },
  founder: { color: "#F472B6", bg: "rgba(244,114,182,0.06)", border: "rgba(244,114,182,0.15)", hoverBg: "rgba(244,114,182,0.1)", hoverBorder: "rgba(244,114,182,0.3)" },
}

// ─── Timeline ─────────────────────────────────────────────────────

export interface TimelineBox {
  phase: PhaseKey
  flex: number
  shortName?: string
  shortOpacity?: number
  shortFontSize?: string
  label?: string
  title?: string
  companies?: string
  skills?: string[]
}

export interface TimelineRow {
  year: string
  trackWidth: string
  delay: number
  boxes: TimelineBox[]
}

export const TIMELINE: TimelineRow[] = [
  {
    year: "2016 –", trackWidth: "35%", delay: 0,
    boxes: [
      { phase: "ux", flex: 1, label: "Phase 01", title: "UX Designer",
        companies: "IIT Guwahati · CHI Publication · Microsoft",
        skills: ["User Research", "Information Architecture", "Wireframing", "Prototyping"] },
    ],
  },
  {
    year: "2018 –", trackWidth: "45%", delay: 0.1,
    boxes: [
      { phase: "ux", flex: 1, shortName: "UX Design", shortOpacity: 0.5, shortFontSize: "0.85rem" },
      { phase: "motion", flex: 1.2, label: "Phase 02", title: "Branding & Motion Designer",
        companies: "1mg",
        skills: ["Motion Graphics", "Brand Identity", "After Effects", "Storyboarding"] },
    ],
  },
  {
    year: "2020 –", trackWidth: "60%", delay: 0.2,
    boxes: [
      { phase: "ux",     flex: 0.6, shortName: "UX",     shortOpacity: 0.4, shortFontSize: "0.8rem" },
      { phase: "motion", flex: 0.6, shortName: "Motion", shortOpacity: 0.4, shortFontSize: "0.8rem" },
      { phase: "product", flex: 1.5, label: "Phase 03", title: "Product Designer",
        companies: "1mg · ClearTax · Merkle Science",
        skills: ["Design Systems", "Enterprise SaaS", "Data Visualization", "Complex Workflows"] },
    ],
  },
  {
    year: "2022 –", trackWidth: "75%", delay: 0.3,
    boxes: [
      { phase: "ux",      flex: 0.4, shortName: "UX",            shortOpacity: 0.35, shortFontSize: "0.75rem" },
      { phase: "motion",  flex: 0.4, shortName: "Motion",        shortOpacity: 0.35, shortFontSize: "0.75rem" },
      { phase: "product", flex: 0.8, shortName: "Product Design", shortOpacity: 0.35, shortFontSize: "0.75rem" },
      { phase: "pm", flex: 1.5, label: "Phase 04", title: "Product Designer + Product Manager",
        companies: "ClearTax · Merkle Science · Kidzovo ",
        skills: ["Product Strategy", "Roadmap Planning", "Stakeholder Mgmt", "OKRs"] },
    ],
  },
  {
    year: "2024 –", trackWidth: "88%", delay: 0.4,
    boxes: [
      { phase: "ux",      flex: 0.3, shortName: "UX",      shortOpacity: 0.3, shortFontSize: "0.7rem" },
      { phase: "motion",  flex: 0.3, shortName: "Motion",  shortOpacity: 0.3, shortFontSize: "0.7rem" },
      { phase: "product", flex: 0.5, shortName: "Product", shortOpacity: 0.3, shortFontSize: "0.7rem" },
      { phase: "pm",      flex: 0.5, shortName: "PM",      shortOpacity: 0.3, shortFontSize: "0.7rem" },
      { phase: "dev", flex: 1.5, label: "Phase 05", title: "Front-end Developer",
        companies: "Kidzovo  ·  Promad",
        skills: ["Flutter UI", "React/Next.js", "1000+ Commits", "40K+ Lines"] },
    ],
  },
  {
    year: "Now", trackWidth: "100%", delay: 0.5,
    boxes: [
      { phase: "ux",      flex: 0.25, shortName: "UX",      shortOpacity: 0.25, shortFontSize: "0.65rem" },
      { phase: "motion",  flex: 0.25, shortName: "Motion",  shortOpacity: 0.25, shortFontSize: "0.65rem" },
      { phase: "product", flex: 0.35, shortName: "Product", shortOpacity: 0.25, shortFontSize: "0.65rem" },
      { phase: "pm",      flex: 0.35, shortName: "PM",      shortOpacity: 0.25, shortFontSize: "0.65rem" },
      { phase: "dev",     flex: 0.4,  shortName: "Dev",     shortOpacity: 0.25, shortFontSize: "0.65rem" },
      { phase: "founder", flex: 1.8, label: "Phase 06 — Today", title: "Founder & Creative Technologist",
        companies: "Kidzovo  ·  Promad",
        skills: ["Studio Leadership", "AI Workflows", "Figma Plugins", "Video Production", "EdTech"] },
    ],
  },
]

// ─── Problem Section ──────────────────────────────────────────────

export const TOOL_FRAGMENTS = [
  { icon: "📋", label: "Requirements",   tool: "Notion / Jira" },
  { icon: "🔍", label: "Research",       tool: "Notion" },
  { icon: "💡", label: "Ideation",       tool: "FigJam / Miro" },
  { icon: "🗂️", label: "IA & Flows",    tool: "FigJam" },
  { icon: "🎨", label: "UI Design",      tool: "Figma" },
  { icon: "📐", label: "Design System",  tool: "Figma" },
  { icon: "🤝", label: "Alignment",      tool: "Slack / Loom" },
  { icon: "🔧", label: "Dev Handoff",    tool: "Figma Dev Mode" },
  { icon: "🧪", label: "QA & Testing",   tool: "TestFlight / BrowserStack" },
  { icon: "📹", label: "Feature Videos", tool: "After Effects / Premiere" },
  { icon: "📊", label: "Analytics",      tool: "Mixpanel / Amplitude" },
  { icon: "🧬", label: "A/B Testing",    tool: "Mixpanel / Firebase" },
]

// ─── Epiphany Section ─────────────────────────────────────────────

export const CODE_WORKS = [
  "Reliable — it just works, every time",
  "Translates clearly across stages",
  "Every change is saved, versioned, documented",
  "Every decision has a why attached",
  "Works seamlessly across devices, platforms, IDEs",
  "One source of truth, always",
]

export const DESIGN_TOOLS = [
  "Figma canvas feels limited after code",
  "Adobe suite has become clunky",
  "Repetitive setup for every new client",
  "No real version history with intent",
  "Context scattered across apps",
  "Even Figma's Dev Mode admits design → code gap",
]

// ─── Solution Units ───────────────────────────────────────────────

export const SOLUTION_UNITS = [
  {
    num: "01",
    accent: "#4ECDC4",
    accentBg: "rgba(78,205,196,0.1)",
    title: "Brand System Setup — from 1 week to 4 hours",
    problem:
      "Every new client meant rebuilding the same foundations: color tokens, typography scales, spacing systems, design tokens — all manually, all fragile.",
    solution:
      "Built 3 Figma plugins and a standalone color tool that generate Tailwind-compatible palettes, duplicate text styles across variants, and update nested tokens in bulk across component libraries. A personal design system that's fast, portable, and only needs to work for one person — but can be compared across projects to spot what's truly different.",
    impact: "1 week → 4 hours",
    tools: ["colors.promad.design", "Cross-Collection Color Token Mapper", "Variant Selector", "Text Style Duplicator"],
  },
  {
    num: "02",
    accent: "#FF6B6B",
    accentBg: "rgba(255,107,107,0.1)",
    title: "Visual Generation — code as the creative medium",
    problem:
      "Photoshop felt clunky. After Effects felt like overkill for backgrounds. Canvas too basic. Meanwhile, Stripe and others were making stunning visuals — all in code.",
    solution:
      "Started 'Beautiful Headers' for website hero sections, which evolved into Aura — a tool that generates dynamic, variable backgrounds used in static assets, animated videos, website embeds, and slide decks. Not generative AI, but parametric design: controllable, reproducible, beautiful.",
    impact: "From static to living visuals",
    tools: ["aura.promad.design", "223+ Scene Catalogue", "Video Export", "Web Embeds"],
  },
  {
    num: "03",
    accent: "#A78BFA",
    accentBg: "rgba(167,139,250,0.1)",
    title: "Creative Production — modular, not monolithic",
    problem:
      "Video ads, feature announcements, and marketing assets were one-shot efforts. Every brief started from zero. No reusable components.",
    solution:
      "Developed a modular framework where creative briefs generate interchangeable hooks, content blocks, CTAs, and visual screenplays. Mix-and-match any combination to produce 100+ video variations from a single brief. Scene-by-scene breakdowns with timing, assets, narration, and sound design — shoot-ready documentation from AI-assisted workflows.",
    impact: "1 brief → 100+ variations",
    tools: ["AI Brief → Screenplay Pipeline", "Modular Hook/Content/CTA System", "Scene-level Asset Mapping"],
  },
]

// ─── Companies ────────────────────────────────────────────────────

export const COMPANIES = [
  "Microsoft", "Merkle Science", "ClearTax", "1mg",
  "Kidzovo", "Promad",
]

// ─── Stats ────────────────────────────────────────────────────────

export const STATS = [
  { number: "1000+",   label: "Code Commits" },
  { number: "40K+",    label: "Lines of Code" },
  { number: "3",       label: "Figma Plugins Built" },
  { number: "∞",       label: "Still Expanding" },
]

// ─── Footer ───────────────────────────────────────────────────────

export const FOOTER_LINKS = [
  { label: "promad.design", href: "https://promad.design" },
  { label: "LinkedIn",      href: "https://linkedin.com/in/shuprobho" },
]
