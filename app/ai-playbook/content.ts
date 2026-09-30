import {
  Swatches,
  CursorClick,
  Globe,
  CloudSun,
  GameController,
  Cube,
  AirplaneTilt,
  Compass,
  SoccerBall,
  FlagCheckered,
  Lightning,
  Robot,
} from "@phosphor-icons/react"
import { Play } from "@phosphor-icons/react/dist/ssr"
import type { ElementType } from "react"
import figmaStats from "@/data/figma-plugin-stats.json"

// ─── Types ────────────────────────────────────────────────────────

export type LinkCardData = {
  title: string
  description: string
  href: string
  icon?: ElementType
  iconSource?: string
  accent?: boolean
  users?: number
}

export type LaunchedProduct = {
  title: string
  href: string
  description: string
  icon: ElementType
  /** App icon shown in place of `icon`, from /public. */
  logo?: string
  /** Homepage screenshot (16:10), from /public. Hidden when not set. */
  screenshot?: string
  accent: string
  accentSoft: string
  accentText: string
  surface: string
  border: string
  tags: string[]
}

export type EngineCapability = {
  icon: ElementType
  label: string
  detail: string
}

export type RepoStat = {
  repo: string
  commits: number
  added: string
  removed: string
  href: string
}

export type EquationItem = {
  label: string
  n: number
}

// ─── Color Palette ────────────────────────────────────────────────

export const COLOR_PALETTE = [
  "#FAFF00", "#FFD600", "#FF9500", "#FF3B30",
  "#AF52DE", "#5856D6", "#007AFF", "#34C759",
  "#00C7BE", "#FF6482",
]

// ─── Figma Plugins ────────────────────────────────────────────────

// Icons are self-hosted: Figma's icon URLs either change or are signed S3
// links that expire, which left the cards with broken images.
const FIGMA_PLUGIN_LIST: LinkCardData[] = [
  {
    iconSource: "/images/figma-plugins/cross-collection-color-token-mapper.png",
    title: "Cross Collection Color Token Mapper",
    description:
      "Transform color groups into semantic tokens. Create new collections, duplicate with remapping, update values across libraries.",
    href: "https://www.figma.com/community/plugin/1570424472381396729/cross-collection-color-token-mapper",
    users: 51,
  },
  {
    iconSource: "/images/figma-plugins/variant-selector.png",
    title: "Variant Selector",
    description:
      "Filter variants by properties and select in bulk. Handle complex component sets with hundreds of variants.",
    href: "https://www.figma.com/community/plugin/1574982950051298625/variant-selector",
    users: 151,
  },
  {
    iconSource: "/images/figma-plugins/text-style-duplicator.png",
    title: "Text Style Duplicator",
    description:
      "Duplicate entire text style hierarchies with custom mapping. Preserves folder structure across collections.",
    href: "https://www.figma.com/community/plugin/1574985201888606536/text-style-duplicator",
    users: 105,
  },
  {
    iconSource: "/images/figma-plugins/custom-mapbox-maps.png",
    title: "Custom Mapbox Maps",
    description:
      "Design and drop renders of Mapbox maps straight into Figma.",
    href: "https://www.figma.com/community/plugin/1638873804562766019/custom-mapbox-maps-by-promad",
    users: 364,
  },
  {
    iconSource: "/images/figma-plugins/shadescraft.png",
    title: "Shadescraft",
    description:
      "Generate OKLCH shade scales from Tailwind defaults or your own colors, then push them into Figma as variables and paint styles.",
    href: "https://www.figma.com/community/plugin/1686668398679195683/shadescraft-by-promad",
    users: 1,
  },
]

// User counts come from data/figma-plugin-stats.json, refreshed daily by
// .github/workflows/figma-stats.yml; the numbers above are fallbacks.
const pluginStats: Record<string, { users: number }> = figmaStats.plugins

export const FIGMA_PLUGINS: LinkCardData[] = FIGMA_PLUGIN_LIST.map((plugin) => {
  const id = plugin.href.match(/\/plugin\/(\d+)/)?.[1]
  return { ...plugin, users: (id && pluginStats[id]?.users) || plugin.users }
})

// ─── Vibe-Coded Experiments ───────────────────────────────────────

export const EXPERIMENTS: LinkCardData[] = [
  {
    icon: AirplaneTilt,
    title: "Trip Planner",
    description: "AI-powered trip planning tool for organizing and visualizing travel itineraries.",
    href: "https://trip.promad.design",
    accent: true,
  },
  {
    icon: Cube,
    title: "SVG to 3D headers",
    description: "Interactive app turn svg logos into web-friendly, embed-ready 3D animations ",
    href: "https://animated-3d-headers.vercel.app/",
    accent: true,
  },
  {
    icon: Play,
    title: "Web based 3D part animation",
    description: "Interactive browser-based viewer for the gate assembly model, built from a .STEP file with no external viewer dependency.",
    href: "https://opening-gates.vercel.app",
    accent: true,
  },
  {
    icon: Globe,
    title: "OVO App",
    description: "Interactive app prototype built with AI-assisted rapid development.",
    href: "https://ovo.app.promad.design",
    accent: true,
  },
  {
    icon: CloudSun,
    title: "Weather",
    description: "Beautiful weather visualization with dynamic, responsive data display.",
    href: "https://weather.promad.design",
    accent: true,
  },
  {
    icon: GameController,
    title: "MOW App",
    description: "Playful app concept brought to life from idea to working code.",
    href: "https://mow.app.promad.design",
    accent: true,
  },
  
]

// ─── Modular Video Ad System ──────────────────────────────────────

export const EQUATION_ITEMS: EquationItem[] = [
  { label: "hooks", n: 5 },
  { label: "content", n: 5 },
  { label: "CTAs", n: 5 },
  { label: "scripts", n: 5 },
]

export const PROCESS_STEPS = [
  "Creative brief as input",
  "Generate modular script components like hook and CTA",
  "Generate screenplay options for each script component",
  "Mix-and-match any combination",
  "Create final ouput compiling generated videos and audios",
]

export const VIDEO_BRIEF_ITEMS = [
  "Scene-by-scene breakdown with timing",
  "Complete visual asset lists per scene",
  "Narration scripting and direction",
  "Music and sound design mapped for generation",
  "Generation-ready image and video prompt direction",
]

// ─── Vismay Engine ────────────────────────────────────────────────

export const VISMAY_CAPABILITIES: EngineCapability[] = [
  {
    icon: Cube,
    label: "Composable viz registry",
    detail:
      "Maps, charts, and prose slots dispatched from a single registry — reusable across verticals.",
  },
  {
    icon: Globe,
    label: "Scroll-driven storytelling",
    detail:
      "One scroll position drives Mapbox flights, ECharts step states, and text snap-locks together.",
  },
  {
    icon: Lightning,
    label: "Markdown + YAML authoring",
    detail:
      "Stories authored as MD + YAML, statically generated, themed per-story via CSS variables.",
  },
  {
    icon: Robot,
    label: "Asset + capture pipeline",
    detail:
      "Admin uploader, Compose panel, and capture pipeline shared by every Vismay vertical.",
  },
]

// ─── Pro Timeline ─────────────────────────────────────────────────

export const PRO_TIMELINE_HIGHLIGHTS = [
  { verb: "Group", detail: "Organize related layers into groups that select, solo, lock and relabel as one." },
  { verb: "Collapse", detail: "Hide a group's members to keep dense compositions readable." },
  { verb: "Move", detail: "Drag a group bar to shift every member and its keyframes in one undo step." },
]

/** Outline rows for the animated panel preview; `member` rows sit inside the open group. */
export const PRO_TIMELINE_LAYERS = [
  { name: "Title card", kind: "group", left: 4, width: 62 },
  { name: "Logo", kind: "member", left: 6, width: 38 },
  { name: "Headline", kind: "member", left: 14, width: 48 },
  { name: "Subhead", kind: "member", left: 22, width: 40 },
  { name: "Background", kind: "collapsed", left: 0, width: 100 },
] as const

export const PRO_TIMELINE_TAGS = ["After Effects 2024+", "macOS + Windows", "Free"]

// ─── Launched Products ────────────────────────────────────────────

export const LAUNCHED_PRODUCTS: LaunchedProduct[] = [
  {
    title: "vizmaya.fyi",
    logo: "/images/products/vizmaya-icon.png",
    href: "https://vizmaya.fyi",
    description:
      "Scroll-synced data narratives — Mapbox maps, ECharts visualizations, and prose unified by a single scroll position. {stories} published stories on geopolitics, economics, and technology.",
    icon: Compass,
    accent: "#d9a84a",
    accentSoft: "rgba(217,168,74,0.15)",
    accentText: "#e4e8f0",
    surface: "#0d1220",
    border: "rgba(217,168,74,0.4)",
    tags: ["{stories} stories", "Mapbox GL", "Apache ECharts"],
  },
  {
    title: "footshorts.com",
    logo: "/images/products/footshorts-icon.svg",
    href: "https://footshorts.com",
    description:
      "InShorts-style football news — swipeable 60-word AI-summarized cards, follow leagues, teams, and players, with live match context inline. Powered by the same Vismay viz engine.",
    icon: SoccerBall,
    accent: "#22c55e",
    accentSoft: "rgba(34,197,94,0.15)",
    accentText: "#ecfdf5",
    surface: "#08120b",
    border: "rgba(34,197,94,0.4)",
    tags: ["RN + Next.js", "Gemini summaries", "Hourly ingest"],
  },
  {
    title: "vizf1.com",
    logo: "/images/products/vizf1-icon.svg",
    href: "https://vizf1.com",
    description:
      "F1 race storytelling — driver, team, and race discovery pages with editorial stories backed by live timing data. Built on Vismay for charts, maps, and scroll-driven race recaps.",
    icon: FlagCheckered,
    accent: "#ef4444",
    accentSoft: "rgba(239,68,68,0.15)",
    accentText: "#fef2f2",
    surface: "#160708",
    border: "rgba(239,68,68,0.4)",
    tags: ["Race recaps", "Live timing", "Editorial CMS"],
  },
]

// ─── Repo Stats ───────────────────────────────────────────────────

export const REPO_STATS: RepoStat[] = [
  { repo: "flp-web",               commits: 848, added: "35,579", removed: "15,460", href: "https://beta.beginlearning.com" },
  { repo: "kidzovo-website",        commits: 76,  added: "2,388",  removed: "547",   href: "https://kidzovo.vercel.app" },
  { repo: "kidzovo-flutter-ui",     commits: 71,  added: "880",    removed: "315",   href: "https://app.kidzovo.com" },
  { repo: "kidzovo-creator-studio", commits: 31,  added: "1,267",  removed: "1,020", href: "https://studio.kidovo.com/" },
]

export const MAX_COMMITS = 848

export const TOTAL_COMMITS = 1026
export const TOTAL_LINES_ADDED = 40114
export const TOTAL_LINES_REMOVED = 17342
