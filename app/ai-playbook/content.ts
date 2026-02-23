import { Swatches, CursorClick, Globe, CloudSun, GameController } from "@phosphor-icons/react"
import type { ElementType } from "react"

// ─── Types ────────────────────────────────────────────────────────

export type LinkCardData = {
  title: string
  description: string
  href: string
  icon?: ElementType
  iconSource?: string
  accent?: boolean
}

export type RepoStat = {
  repo: string
  commits: number
  added: string
  removed: string
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
    icon: Swatches,
    title: "Cross Collection Color Token Mapper",
    description:
      "Transform color groups into semantic tokens. Create new collections, duplicate with remapping, update values across libraries.",
    href: "https://www.figma.com/community/plugin/1570424472381396729/cross-collection-color-token-mapper",
  },
  {
    icon: CursorClick,
    title: "Variant Selector",
    description:
      "Filter variants by properties and select in bulk. Handle complex component sets with hundreds of variants.",
    href: "https://www.figma.com/community/plugin/1574982950051298625/variant-selector",
  },
  {
    iconSource: "https://www.figma.com/community/resource/722beb9b-9897-4a15-90e5-31c76364d064/icon",
    title: "Text Style Duplicator",
    description:
      "Duplicate entire text style hierarchies with custom mapping. Preserves folder structure across collections.",
    href: "https://www.figma.com/community/plugin/1574985201888606536/text-style-duplicator",
  },
]

// ─── Vibe-Coded Experiments ───────────────────────────────────────

export const EXPERIMENTS: LinkCardData[] = [
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
  "Creative brief input",
  "AI generates modular script components",
  "Separate screenplay options for visuals",
  "Mix-and-match any combination",
]

export const VIDEO_BRIEF_ITEMS = [
  "Scene-by-scene breakdown with timing",
  "Complete visual asset lists per scene",
  "Narration scripting and direction",
  "Music and sound design mapped",
  "Shoot-ready documentation output",
]

// ─── Repo Stats ───────────────────────────────────────────────────

export const REPO_STATS: RepoStat[] = [
  { repo: "flp-web",               commits: 848, added: "35,579", removed: "15,460" },
  { repo: "kidzovo-website",        commits: 76,  added: "2,388",  removed: "547"    },
  { repo: "kidzovo-flutter-ui",     commits: 71,  added: "880",    removed: "315"    },
  { repo: "kidzovo-creator-studio", commits: 31,  added: "1,267",  removed: "1,020"  },
]

export const MAX_COMMITS = 848

export const TOTAL_COMMITS = 1026
export const TOTAL_LINES_ADDED = 40114
export const TOTAL_LINES_REMOVED = 17342
