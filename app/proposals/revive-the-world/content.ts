import { asset, type WorkCardData, type WorkGroupData } from "@/app/motion/content"

// ─── Proposal meta ────────────────────────────────────────────────

export const META = [
  { label: "Prepared for", value: "Ketan B, Founder, Revive The World" },
  { label: "Prepared by", value: "Promad Design Studio, Gurgaon, India" },
  { label: "Issued", value: "17 November 2026" },
  { label: "Valid until", value: "31 January 2027" },
  { label: "Currency", value: "INR, excl. GST" },
]

// ─── 01 · Brief ───────────────────────────────────────────────────

export type ScopeItem = {
  key: string
  title: string
  description: string
  /** Rate shown under the description; segments in `rates` are highlighted */
  prefix?: string
  rates: string[]
}

export const SCOPE: ScopeItem[] = [
  {
    key: "A1",
    title: "UI elements & micro-interactions",
    description:
      "Buttons, toggles, tab bar, like and share, pull-to-refresh, success and error states, delivered as optimised Lottie JSON.",
    prefix: "from",
    rates: ["₹5,000 / asset"],
  },
  {
    key: "A2",
    title: "Planting & watering",
    description:
      "Seed drop, watering, growth from seed to sapling to tree, and the “impact verified” moment when a real-world tree is confirmed.",
    rates: ["₹12,000 / sequence"],
  },
  {
    key: "A3",
    title: "XP, rewards & achievements",
    description:
      "XP gain, level-up bursts, streaks, badge unlocks, reward chests, quest completion and leaderboard rank changes.",
    rates: ["₹12,000 / effect"],
  },
  {
    key: "A4",
    title: "Animated icons, loaders & onboarding",
    description:
      "Navigation and feature icons, a sprouting loader, progress states, and animated onboarding screens that tell the RTW story.",
    prefix: "from",
    rates: ["₹5,000 / icon", "₹12,000 / onboarding screen"],
  },
  {
    key: "A5",
    title: "Interactive Rive & state machines",
    description:
      "Living components driven from code: a tree that reacts to watering and health, an XP ring, a reward chest and a tab bar, each with named inputs.",
    rates: ["₹30,000 / component"],
  },
  {
    key: "B",
    title: "Cinematic concept teaser",
    description:
      "The RTW vision, core features, gaming loop and environmental impact in one scripted, storyboarded film with sound design, plus social cutdowns.",
    prefix: "from",
    rates: ["₹500 / second", "recommended ₹750 / second"],
  },
]

// ─── 02 · Relevant work ───────────────────────────────────────────

export const MASCOT_DESCRIPTION =
  "One character with fourteen states and five swappable costume layers, all driven by a single state machine, so the product team can trigger any mood from code. Your living tree, XP ring and reward chest would be built the same way. It ships at about 1.4 MB and runs on canvas in Flutter, web and native."

export const WEATHER_CARD: WorkCardData = {
  kind: "link",
  size: "full",
  aspect: "1568 / 540",
  title: "Weather with Ovo",
  caption:
    "Two layered Rive files driven by live data, the same pattern as a tree that responds to real watering and impact data",
  poster: asset("weather.jpg"),
  href: "https://weather.promad.design",
  meta: "Live demo",
}

export const WORK_GROUPS: WorkGroupData[] = [
  {
    title: "Rewards, success states & micro-interactions",
    tagline: "Product moments for ClearTax, 1mg, Microsoft and Dhyana",
    items: [
      loop("square", "ClearTax — success burst", "Confetti confirmation, close to an XP or level-up moment", "gstn"),
      loop("square", "ClearTax — invite sent", "Social action feedback", "invite"),
      loop("square", "ClearTax — mascot state", "Character reacting to an action", "cleartax"),
      loop("square", "Microsoft SharePoint — splash", "App launch animation", "splash"),
      loop("tall", "1mg — add to cart", "Quantity sheet and cart feedback", "addtocart"),
      loop("tall", "1mg — Care Plan upsell", "Inline promotion moment", "joindcp"),
      loop("square", "Dhyana — onboarding step", "Device pairing sequence, step 1", "dhyana_pair1"),
      loop("square", "Dhyana — onboarding complete", "Device pairing sequence, final step", "dhyana_pair3"),
      loop("square", "1mg — 404 character", "Empty and error state", "404"),
    ],
  },
  {
    title: "Product films & teasers",
    tagline: "Scripted, storyboarded and animated by our team",
    items: [
      film("Merkle Science — Compass", "Product film for a blockchain risk platform", "yt_compass", "kCY5BrvUCcY"),
      film("Microsoft — SMS Organizer", "Product video for a Microsoft Garage app", "yt_smsorg", "EuxA3ajJ5Sg"),
      film("Merkle Science — Profile", "Company vision film", "yt_profile", "Ba8dLgy1TcM"),
      film("Brelo — product explainer", "Ecosystem walkthrough for a CRM platform", "yt_brelo", "qLE76y4SaKY"),
    ],
  },
  {
    title: "World-building & brand motion",
    tagline: "From a 30-piece Movember series and a crypto launch",
    items: [
      loop("square", "Movember — “Pentagons”", "Social series", "pentagons"),
      loop("square", "Movember — “Explorations”", "Social series", "explorations"),
      { ...loop("wide", "Crypto — animated hero banner", "Looping world-building scene", "banner"), meta: "0:20" },
    ],
  },
]

function loop(size: "square" | "tall" | "wide", title: string, caption: string, file: string): WorkCardData {
  return { kind: "loop", size, title, caption, poster: asset(`${file}.jpg`), src: asset(`${file}.mp4`), meta: "loop" }
}

function film(title: string, caption: string, poster: string, youtubeId: string): WorkCardData {
  return {
    kind: "link",
    size: "wide",
    title,
    caption,
    poster: asset(`${poster}.jpg`),
    href: `https://www.youtube.com/watch?v=${youtubeId}`,
    meta: "YouTube",
  }
}

// ─── 03 · Approach & timeline ─────────────────────────────────────

export const STAGES = [
  {
    when: "Stage 1 · Weeks 1–2",
    title: "Motion system & hero assets",
    points: [
      "Audit of your UI files and a full asset inventory",
      "Motion principles: easing, durations, personality, haptics cues",
      "Hero set for sign-off: planting, level-up, living-tree Rive",
      "Teaser script, moodboard and three style frames",
    ],
  },
  {
    when: "Stage 2 · Weeks 3–6",
    title: "Library production",
    points: [
      "Assets delivered in weekly batches of 8–10",
      "Each batch tested on a mid-range Android and an iPhone",
      "Rive components shipped with sample Flutter widgets",
      "Teaser storyboard, animatic, then animation",
    ],
  },
  {
    when: "Stage 3 · Weeks 7–8",
    title: "Integration & final",
    points: [
      "Pairing sessions with your Flutter developers",
      "Performance pass: file size, frame rate, memory",
      "Teaser sound design, VO mix, grade and cutdowns",
      "Handover: library repo, docs and source files",
    ],
  },
]

/** milestone = sign-off (yellow), leaf = hero or pairing work (green), plain = regular work */
export type GanttTone = "milestone" | "leaf" | "plain"
export type GanttCell = { label: string; tone: GanttTone } | null

const ms = (label: string): GanttCell => ({ label, tone: "milestone" })
const lf = (label: string): GanttCell => ({ label, tone: "leaf" })
const pl = (label: string): GanttCell => ({ label, tone: "plain" })

export const GANTT_WEEKS = 8

export const GANTT: { workstream: string; track: string; weeks: GanttCell[] }[] = [
  {
    workstream: "Motion system",
    track: "A · setup",
    weeks: [ms("Audit + principles"), ms("Sign-off"), null, null, null, null, null, null],
  },
  {
    workstream: "Hero assets",
    track: "A2 · A3 · A5",
    weeks: [null, lf("Plant, level-up, tree"), ms("Approved"), null, null, null, null, null],
  },
  {
    workstream: "Library batches",
    track: "A1–A5",
    weeks: [null, null, pl("Batch 1"), pl("Batch 2"), pl("Batch 3"), pl("Batch 4"), pl("Batch 5"), null],
  },
  {
    workstream: "Flutter integration",
    track: "A · support",
    weeks: [pl("Naming + budgets"), null, lf("Pairing"), null, lf("Pairing"), null, lf("QA pass"), ms("Handover")],
  },
  {
    workstream: "Concept teaser",
    track: "B",
    weeks: [
      pl("Script"),
      ms("Style frames"),
      ms("Storyboard"),
      ms("Animatic"),
      pl("Animating"),
      ms("First cut"),
      pl("Revisions"),
      ms("Final + cuts"),
    ],
  },
]

/** Segments wrapped in backticks render as inline code */
export const DELIVERABLES = [
  {
    format: ".json",
    title: "Lottie library",
    points: [
      "Optimised Lottie JSON (dotLottie on request), for the `lottie` Flutter package",
      "Typical budget under 60 KB per asset, no embedded rasters",
      "Consistent naming: `rtw_xp_levelup.json`",
      "GIF and MP4 previews for design and marketing",
    ],
  },
  {
    format: ".riv",
    title: "Rive components",
    points: [
      "One state machine per component, with documented inputs such as `water`, `health` and `level`",
      "A sample widget for the `rive` Flutter package",
      "Typical budget under 200 KB per file, tested at 60 fps",
      "Editable .rev source files",
    ],
  },
  {
    format: ".md",
    title: "Motion spec",
    points: [
      "Easing curves and durations as Flutter `Curves` and tokens",
      "Trigger map: which event fires which animation",
      "Do's and don'ts for adding new motion later",
    ],
  },
  {
    format: ".mp4",
    title: "Concept teaser",
    points: [
      "Hero cut in 16:9, 4K or 1080p",
      "Cutdowns in 9:16 and 1:1 for Reels, Shorts and stores",
      "Script, storyboard and style frames as PDF",
      "Source project files (Premium tier)",
    ],
  },
]

// ─── 04 · Rate card ───────────────────────────────────────────────

export type LineItem = {
  id: string
  title: string
  tag: string
  description: string
  /** Short label for the estimator */
  label: string
  qty: number
  rate: number
  /** "h" for hours; omitted for assets */
  unit?: "h"
  /** How the estimator describes the rate */
  rateNote: "fixed" | "each" | "/ hour"
}

export const TRACK_A: LineItem[] = [
  {
    id: "setup",
    title: "Motion system & library setup",
    tag: "Foundation",
    description:
      "Asset inventory, motion principles, easing and duration tokens, naming convention, plus 5 reference components",
    label: "Motion system setup",
    qty: 1,
    rate: 80000,
    rateNote: "fixed",
  },
  {
    id: "ui",
    title: "UI micro-interactions",
    tag: "A1 · simple",
    description: "Buttons, toggles, tab switches, like and share, pull-to-refresh, copy and success ticks",
    label: "UI micro-interactions",
    qty: 12,
    rate: 5000,
    rateNote: "each",
  },
  {
    id: "icons",
    title: "Animated icons",
    tag: "A4 · simple",
    description: "Navigation and feature icons with active and idle states",
    label: "Animated icons",
    qty: 12,
    rate: 5000,
    rateNote: "each",
  },
  {
    id: "load",
    title: "Loaders & progress",
    tag: "A4 · simple",
    description: "Sprouting-seed loader, leaf spinner, progress fill, skeleton shimmer",
    label: "Loaders & progress",
    qty: 4,
    rate: 5000,
    rateNote: "each",
  },
  {
    id: "plant",
    title: "Planting & watering sequences",
    tag: "A2 · complex",
    description: "Seed drop, watering, three growth stages and the “impact verified” celebration",
    label: "Planting & watering",
    qty: 6,
    rate: 12000,
    rateNote: "each",
  },
  {
    id: "xp",
    title: "XP, rewards & achievements",
    tag: "A3 · complex",
    description: "XP gain, level-up, streak, badge unlock, reward chest, coins, quest complete, rank change",
    label: "XP, rewards & achievements",
    qty: 8,
    rate: 12000,
    rateNote: "each",
  },
  {
    id: "onb",
    title: "Onboarding screens",
    tag: "A4 · complex",
    description: "Five animated story screens covering the vision, planting, play, impact and community",
    label: "Onboarding screens",
    qty: 5,
    rate: 12000,
    rateNote: "each",
  },
  {
    id: "rive",
    title: "Interactive Rive components",
    tag: "A5 · state machines",
    description:
      "Living tree (water, health and growth inputs), XP ring, reward chest, tab bar, watering-can gesture and streak flame. Each has up to 4 states and a sample widget",
    label: "Interactive Rive components",
    qty: 6,
    rate: 30000,
    rateNote: "each",
  },
  {
    id: "flut",
    title: "Flutter integration support",
    tag: "Engineering",
    description:
      "Integration guide, sample widgets, on-device QA and pairing with your developers. Covers up to 20 hours across the project",
    label: "Flutter support hours",
    qty: 20,
    rate: 4000,
    unit: "h",
    rateNote: "/ hour",
  },
]

/** Animated assets in Track A: everything except the setup and support hours */
export const TRACK_A_ASSET_COUNT = TRACK_A.filter((item) => item.id !== "setup" && item.unit !== "h").reduce(
  (count, item) => count + item.qty,
  0,
)

export const TRACK_A_TOTAL = TRACK_A.reduce((sum, item) => sum + item.qty * item.rate, 0)

export type TeaserTier = {
  value: number
  kicker: string
  title: string
  price: string
  per: string
  rate: string
  pitch: string
  includes: string[]
  /** Closing line; the middle segment is bold */
  bestFor: [string, string, string?]
  recommended?: boolean
  /** Label in the estimator's teaser picker */
  option: string
}

export const TEASER_TIERS: TeaserTier[] = [
  {
    value: 30000,
    kicker: "Option 1",
    title: "Custom 2D teaser",
    price: "₹30,000",
    per: "/ 60 s",
    rate: "₹500 / second · ~4 weeks",
    pitch: "A crisp, illustrated product teaser that walks through the app's features and gaming loop.",
    includes: [
      "Script refinement and storyboard",
      "Three visual-style options",
      "Original 2D assets animated in After Effects",
      "Licensed music and sound design",
      "16:9 hero plus one vertical cut",
    ],
    bestFor: ["Best if the main goal is ", "explaining the product"],
    option: "Option 1 · Custom 2D, 60 s (₹30,000)",
  },
  {
    value: 67500,
    kicker: "Option 2 · recommended",
    title: "Cinematic teaser",
    price: "₹67,500",
    per: "/ 90 s",
    rate: "₹750 / second · ~6 weeks",
    pitch:
      "A cinematic film that builds the RTW world: a dying planet brought back to life by players, then the app, the game and the real-world impact.",
    includes: [
      "Everything in Custom 2D",
      "World and character design, 2.5D parallax and camera moves",
      "Frame-by-frame hero moments (the first sprout, the forest bloom)",
      "Custom sound design pass",
      "Source files included",
    ],
    bestFor: ["Best for ", "investor decks, launch and the stores"],
    recommended: true,
    option: "Option 2 · Cinematic, 90 s (₹67,500)",
  },
  {
    value: 85500,
    kicker: "Option 3",
    title: "Cinematic + launch kit",
    price: "₹85,500",
    per: "/ total",
    rate: "Option 2 + ₹18,000 in cutdowns",
    pitch: "The 90-second film plus ready-to-post edits for every channel at launch.",
    includes: [
      "Everything in the cinematic teaser",
      "30 s and 15 s cutdowns re-edited from the master",
      "9:16 and 1:1 versions of each cutdown",
      "End cards with store badges",
    ],
    bestFor: ["Included in the ", `${formatINR(bundleTotal(TRACK_A_TOTAL, 85500))} bundle`, " above"],
    option: "Option 3 · Cinematic + launch kit (₹85,500)",
  },
]

/** The teaser tier the summary and the estimator start from */
export const DEFAULT_TEASER = 85500

/** Both tracks booked together: about 5% off, rounded down to the nearest ₹10,000 */
export function bundleTotal(trackA: number, trackB: number) {
  const sum = trackA + trackB
  if (trackA <= 0 || trackB <= 0) return sum
  return Math.floor((sum * 0.95) / 10000) * 10000
}

export function formatINR(amount: number) {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`
}

export const ADD_ONS: { title: string; detail?: string; price: string; unit?: string }[] = [
  { title: "Additional micro-interaction or icon", price: "₹5,000", unit: "/ asset" },
  { title: "Additional complex sequence", detail: "(reward, planting, onboarding)", price: "₹12,000", unit: "/ asset" },
  { title: "Additional Rive component", detail: "with state machine", price: "₹30,000", unit: "/ component" },
  { title: "Extra state", detail: "on a Rive component beyond the four included", price: "₹10,000", unit: "/ state" },
  { title: "Mascot / guide character", detail: "rig with up to 6 states, if RTW wants one", price: "₹1,40,000" },
  { title: "Additional integration hours", price: "₹4,000", unit: "/ hour" },
  {
    title: "Teaser language versions",
    detail: "re-timed to a new voice-over",
    price: "30%",
    unit: "of teaser price, per language",
  },
  { title: "Additional revision round", detail: "beyond the three included", price: "+10%", unit: "of item price" },
  { title: "Rush delivery", detail: "in under 60% of the plan above", price: "+25%" },
  {
    title: "Ongoing motion retainer",
    detail: "after launch (live-ops events, seasonal rewards)",
    price: "from ₹3,500",
    unit: "/ hour at 100 h+",
  },
]

// ─── 05 · Payment & terms ─────────────────────────────────────────

export const MILESTONES = [
  { title: "40% · Kickoff", detail: "Before work starts on either track" },
  {
    title: "30% · Midpoint",
    detail: "When the hero assets and the teaser storyboard are approved (end of Week 3)",
  },
  { title: "30% · Final delivery", detail: "On handover of the complete library, the final teaser and its cutdowns" },
  {
    title: "Invoicing",
    detail: "INR by bank transfer (NEFT/RTGS/IMPS) or UPI, due within 7 days. GST at 18% is added to every invoice.",
  },
]

export const TERMS = [
  {
    title: "Paid resources.",
    body: "Fonts, stock footage, music, voice-over and icons are not included in the prices above. They are billed at cost, and the rights to use them belong to you.",
  },
  {
    title: "Scope changes.",
    body: "New assets or scenes beyond the agreed list are estimated at the add-on rates above before work begins.",
  },
  {
    title: "Timelines.",
    body: "Week counts start once we receive the Figma files, brand assets and final asset list. Milestones move with feedback time, and each stage waits for the previous sign-off.",
  },
  {
    title: "Revisions.",
    body: "Three rounds per batch and for the teaser. A round is one consolidated set of feedback. Changes to an approved motion system or storyboard after production has started count as new scope.",
  },
  {
    title: "Usage rights.",
    body: "Once the work is complete and paid for, you own the rights to all final deliverables, including Lottie, Rive and source files where stated.",
  },
  {
    title: "Portfolio.",
    body: "Promad may show the work in its portfolio after RTW's public launch, or earlier with your permission.",
  },
  {
    title: "Cancellation.",
    body: "If the project is cancelled after work has started, you pay for the work completed up to that point.",
  },
  {
    title: "Termination.",
    body: "Either party may end the project for unforeseen reasons. Ownership of completed work stays with Promad until the relevant payment is made. No refunds are given on termination.",
  },
]

export const SIGNATORIES = [
  { name: "Suprabho Dhenki", role: "Founder, Promad Design Studio · hello@promad.design" },
  { name: "Ketan B", role: "Founder, Revive The World · signature and date" },
]
