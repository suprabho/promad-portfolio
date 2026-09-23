// ─── Types ────────────────────────────────────────────────────────

export type Service = {
  key: string
  title: string
  description: string
}

/** Column span of a card in the 12-column work grid */
export type WorkCardSize = "wide" | "tall" | "square" | "full"

type WorkCardBase = {
  title: string
  caption: string
  /** Poster frame, served from /public/motion */
  poster: string
  size: WorkCardSize
  /** Overrides the default aspect ratio for the card's size, e.g. "4 / 5" */
  aspect?: string
  /** Mono label in the caption: a duration, "loop" or where a link goes */
  meta: string
}

export type WorkCardData =
  /** Opens in a new tab (YouTube films, live demos) */
  | (WorkCardBase & { kind: "link"; href: string })
  /** Plays inline with sound on tap */
  | (WorkCardBase & { kind: "video"; src: string })
  /** Muted loop that autoplays while on screen */
  | (WorkCardBase & { kind: "loop"; src: string })

export type WorkGroupData = {
  title: string
  tagline: string
  items: WorkCardData[]
}

// ─── What we do ───────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    key: "A",
    title: "Product teasers & explainers",
    description:
      "Custom 2D motion graphics in After Effects: script refinement, storyboard, three visual-style options, animatics, animation, sound.",
  },
  {
    key: "B",
    title: "Template-led & typography video",
    description:
      "Fast, on-brand video built on licensed templates or kinetic typography, synced to your voice-over and music.",
  },
  {
    key: "C",
    title: "Course & training video",
    description:
      "Slide-by-slide explainer videos for courses: whiteboard, presentation-led or illustrated styles.",
  },
  {
    key: "D",
    title: "UI micro-interactions & Lottie",
    description:
      "Loaders, success states, onboarding moments and rigged mascots with state machines, delivered as Lottie, Rive, GIF or MP4 with a motion spec.",
  },
  {
    key: "E",
    title: "Brand & social motion",
    description:
      "Logo reveals, splash screens, animated banners and short-form social series in your brand system.",
  },
  {
    key: "F",
    title: "Mascot & character animation",
    description:
      "Character design, rigging and state machines built in Rive, ready to drive from product code on web and native.",
  },
]

// ─── Selected work ────────────────────────────────────────────────

export const WORK_GROUPS: WorkGroupData[] = [
  {
    title: "A · Product teasers & explainers",
    tagline: "Custom 2D motion graphics, scripted and storyboarded",
    items: [
      {
        kind: "link",
        size: "wide",
        title: "Merkle Science — Compass",
        caption: "Product film for a blockchain risk & compliance platform",
        poster: "/motion/yt_compass.jpg",
        href: "https://www.youtube.com/watch?v=kCY5BrvUCcY",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Merkle Science — Profile",
        caption: "Company profile video",
        poster: "/motion/yt_profile.jpg",
        href: "https://www.youtube.com/watch?v=Ba8dLgy1TcM",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Brelo — product explainer",
        caption: "Unified customer view and churn-detection CRM",
        poster: "/motion/yt_brelo.jpg",
        href: "https://www.youtube.com/watch?v=qLE76y4SaKY",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "TapTalent — product explainer",
        caption: "Hiring platform walkthrough",
        poster: "/motion/yt_taptalent.jpg",
        href: "https://www.youtube.com/watch?v=9TuneozzXrc",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Microsoft — SMS Organizer",
        caption: "Product video for a Microsoft Garage app on Google Play",
        poster: "/motion/yt_smsorg.jpg",
        href: "https://www.youtube.com/watch?v=EuxA3ajJ5Sg",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Cubical — explainer 1",
        caption: "Startup product explainer",
        poster: "/motion/yt_cubical1.jpg",
        href: "https://www.youtube.com/watch?v=_67HiGqXaAM",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Cubical — explainer 2",
        caption: "Startup product explainer",
        poster: "/motion/yt_cubical2.jpg",
        href: "https://www.youtube.com/watch?v=DMRWIZrbWRI",
        meta: "YouTube",
      },
      {
        kind: "video",
        size: "tall",
        title: "Dhyana — 21-minute session",
        caption: "In-app narrative walkthrough for a meditation app",
        poster: "/motion/dhyana_tease1.jpg",
        src: "/motion/dhyana_tease1.mp4",
        meta: "1:00",
      },
      {
        kind: "video",
        size: "tall",
        title: "Dhyana — onboarding video",
        caption: "First-run walkthrough explaining the app",
        poster: "/motion/dhyana_tease2.jpg",
        src: "/motion/dhyana_tease2.mp4",
        meta: "1:15",
      },
    ],
  },
  {
    title: "C · Course & training video",
    tagline: "Three production approaches at three price points",
    items: [
      {
        kind: "video",
        size: "wide",
        title: "Course explainer — whiteboard approach",
        caption: "Hand-drawn style, fastest turnaround per slide",
        poster: "/motion/approach1.jpg",
        src: "/motion/approach1.mp4",
        meta: "1:25",
      },
      {
        kind: "video",
        size: "wide",
        title: "Course explainer — illustrated approach",
        caption: "Icon and illustration driven, animated in After Effects",
        poster: "/motion/approach3.jpg",
        src: "/motion/approach3.mp4",
        meta: "0:47",
      },
      {
        kind: "video",
        size: "wide",
        title: "1mg — Ask a Doctor product walkthrough",
        caption: "Feature explainer for an in-app consultation flow",
        poster: "/motion/askdr.jpg",
        src: "/motion/askdr.mp4",
        meta: "0:38",
      },
    ],
  },
  {
    title: "D · UI micro-interactions & Lottie",
    tagline: "Product moments for 1mg, ClearTax, Microsoft and Dhyana",
    items: [
      {
        kind: "loop",
        size: "tall",
        title: "1mg — add to cart",
        caption: "Quantity sheet and cart feedback",
        poster: "/motion/addtocart.jpg",
        src: "/motion/addtocart.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "tall",
        title: "1mg — Care Plan upsell",
        caption: "Inline promotion on product page",
        poster: "/motion/joindcp.jpg",
        src: "/motion/joindcp.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "1mg — 404 illustration",
        caption: "Error state character",
        poster: "/motion/404.jpg",
        src: "/motion/404.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Microsoft SharePoint — splash",
        caption: "App launch animation",
        poster: "/motion/splash.jpg",
        src: "/motion/splash.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "ClearTax — mascot state",
        caption: "Character reacting to a filing action",
        poster: "/motion/cleartax.jpg",
        src: "/motion/cleartax.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "ClearTax — GSTN success",
        caption: "Success confirmation with confetti",
        poster: "/motion/gstn.jpg",
        src: "/motion/gstn.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "ClearTax — invite sent",
        caption: "Team invitation confirmation",
        poster: "/motion/invite.jpg",
        src: "/motion/invite.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, step 1",
        caption: "Bluetooth pairing state animation",
        poster: "/motion/dhyana_pair1.jpg",
        src: "/motion/dhyana_pair1.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, step 2",
        caption: "Bluetooth pairing state animation",
        poster: "/motion/dhyana_pair2.jpg",
        src: "/motion/dhyana_pair2.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, step 2a",
        caption: "Bluetooth pairing state animation",
        poster: "/motion/dhyana_pair2a.jpg",
        src: "/motion/dhyana_pair2a.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, step 2b",
        caption: "Bluetooth pairing state animation",
        poster: "/motion/dhyana_pair2b.jpg",
        src: "/motion/dhyana_pair2b.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, complete",
        caption: "Bluetooth pairing state animation",
        poster: "/motion/dhyana_pair3.jpg",
        src: "/motion/dhyana_pair3.mp4",
        meta: "loop",
      },
    ],
  },
  {
    title: "E · Brand & social motion",
    tagline: "A 30-piece Movember series, TMPal social videos and animated banners",
    items: [
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Pentagons”",
        caption: "Social series, piece 1 of 30",
        poster: "/motion/pentagons.jpg",
        src: "/motion/pentagons.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Robotics”",
        caption: "Social series, piece 28 of 30",
        poster: "/motion/robotics.jpg",
        src: "/motion/robotics.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Explorations”",
        caption: "Social series, piece 23 of 30",
        poster: "/motion/explorations.jpg",
        src: "/motion/explorations.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Ignition”",
        caption: "Social series, piece 9 of 30",
        poster: "/motion/ignition.jpg",
        src: "/motion/ignition.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Buds”",
        caption: "Social series, piece 2 of 30",
        poster: "/motion/buds.jpg",
        src: "/motion/buds.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Alarm”",
        caption: "Social series, piece 21 of 30",
        poster: "/motion/alarm.jpg",
        src: "/motion/alarm.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Rock”",
        caption: "Social series, piece 24 of 30",
        poster: "/motion/rock.jpg",
        src: "/motion/rock.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Plots”",
        caption: "Social series, piece 17 of 30",
        poster: "/motion/plots.jpg",
        src: "/motion/plots.mp4",
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Team”",
        caption: "Social series, piece 22 of 30",
        poster: "/motion/team.jpg",
        src: "/motion/team.mp4",
        meta: "loop",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 1",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: "/motion/tmpal1.jpg",
        src: "/motion/tmpal1.mp4",
        meta: "0:21",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 2",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: "/motion/tmpal4.jpg",
        src: "/motion/tmpal4.mp4",
        meta: "0:17",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 3",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: "/motion/tmpal6.jpg",
        src: "/motion/tmpal6.mp4",
        meta: "0:28",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 4",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: "/motion/tmpal8.jpg",
        src: "/motion/tmpal8.mp4",
        meta: "0:27",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 5",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: "/motion/tmpal9.jpg",
        src: "/motion/tmpal9.mp4",
        meta: "0:21",
      },
      {
        kind: "loop",
        size: "wide",
        aspect: "16 / 5",
        title: "Crypto — animated web banner",
        caption: "Hero banner, 1920×600",
        poster: "/motion/banner.jpg",
        src: "/motion/banner.mp4",
        meta: "0:20",
      },
    ],
  },
]

// ─── Mascot: Ovo (live Rive rig) ──────────────────────────────────

export const MASCOT_GROUP = {
  title: "F · Mascot & character animation",
  tagline: "Ovo, the Kidzovo mascot — live Rive rig, try the states",
}

/** Values of the rig's "State" number input */
export const OVO_STATES = [
  { value: 0, label: "Standby" },
  { value: 1, label: "Searching" },
  { value: 2, label: "Suggestions" },
  { value: 3, label: "Painting" },
  { value: 4, label: "Listening" },
  { value: 5, label: "Talking" },
  { value: 101, label: "Bored" },
  { value: 102, label: "Success" },
  { value: 103, label: "Retry" },
  { value: 104, label: "Failure" },
  { value: 105, label: "Dance 1" },
  { value: 106, label: "Dance 2" },
  { value: 107, label: "Dance 3" },
  { value: 108, label: "Dance 4" },
]

/** Costume number inputs on the rig and the highest variant index each accepts */
export const OVO_COSTUME_LAYERS = [
  { input: "Skin", max: 2 },
  { input: "Headgear", max: 15 },
  { input: "Specs", max: 5 },
  { input: "Muffler", max: 5 },
  { input: "BG", max: 5 },
]

export const WEATHER_WITH_OVO: WorkCardData = {
  kind: "link",
  size: "full",
  aspect: "1568 / 540",
  title: "Weather with Ovo",
  caption:
    "Same mascot reused in a different product surface — two layered Rive files (background scene + Ovo and weather props) driven by live city data",
  poster: "/motion/weather.jpg",
  href: "https://weather.promad.design",
  meta: "Live demo",
}
