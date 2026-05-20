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

export const FIGMA_PLUGINS: LinkCardData[] = [
  {
    iconSource: "https://www.figma.com/community/resource/ae9863ef-b283-4dba-bd61-e23e4be81c08/icon",
    title: "Cross Collection Color Token Mapper",
    description:
      "Transform color groups into semantic tokens. Create new collections, duplicate with remapping, update values across libraries.",
    href: "https://www.figma.com/community/plugin/1570424472381396729/cross-collection-color-token-mapper",
    users: 33,
  },
  {
    iconSource: "https://www.figma.com/community/resource/cf6e1e18-4d82-4ccd-8fee-91783079204a/icon",
    title: "Variant Selector",
    description:
      "Filter variants by properties and select in bulk. Handle complex component sets with hundreds of variants.",
    href: "https://www.figma.com/community/plugin/1574982950051298625/variant-selector",
    users: 75,
  },
  {
    iconSource: "https://www.figma.com/community/resource/722beb9b-9897-4a15-90e5-31c76364d064/icon",
    title: "Text Style Duplicator",
    description:
      "Duplicate entire text style hierarchies with custom mapping. Preserves folder structure across collections.",
    href: "https://www.figma.com/community/plugin/1574985201888606536/text-style-duplicator",
    users: 57,
  },
]

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

// ─── Launched Products ────────────────────────────────────────────

export const LAUNCHED_PRODUCTS: LaunchedProduct[] = [
  {
    title: "vizmaya.fyi",
    href: "https://vizmaya.fyi",
    description:
      "Scroll-synced data narratives — Mapbox maps, ECharts visualizations, and prose unified by a single scroll position. 13+ published stories on geopolitics, economics, and technology.",
    icon: Compass,
    accent: "#d9a84a",
    accentSoft: "rgba(217,168,74,0.15)",
    accentText: "#e4e8f0",
    surface: "#0d1220",
    border: "rgba(217,168,74,0.4)",
    tags: ["13+ stories", "Mapbox GL", "Apache ECharts"],
  },
  {
    title: "footshorts.com",
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
