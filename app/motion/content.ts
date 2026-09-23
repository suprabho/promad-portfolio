// ─── Assets ───────────────────────────────────────────────────────

/**
 * Public Supabase Storage bucket that hosts every poster, loop and film on
 * this page, so visitors' video traffic is served from Supabase egress
 * instead of Vercel bandwidth. The bucket mirrors public/motion; to add or
 * replace a file, upload it by name (a recursive cp nests into a "motion/"
 * prefix, so copy files one at a time):
 *   supabase storage cp public/motion/<file> ss:///motion/<file> --experimental
 */
export const MOTION_ASSET_BASE_URL =
  "https://grbrfpaznehikakupavx.supabase.co/storage/v1/object/public/motion"

/** Absolute URL of a file in the motion bucket, e.g. asset("banner.mp4") */
export const asset = (file: string) => `${MOTION_ASSET_BASE_URL}/${file}`

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
  /** Poster frame, an asset() URL */
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
        poster: asset("yt_compass.jpg"),
        href: "https://www.youtube.com/watch?v=kCY5BrvUCcY",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Merkle Science — Profile",
        caption: "Company profile video",
        poster: asset("yt_profile.jpg"),
        href: "https://www.youtube.com/watch?v=Ba8dLgy1TcM",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Brelo — product explainer",
        caption: "Unified customer view and churn-detection CRM",
        poster: asset("yt_brelo.jpg"),
        href: "https://www.youtube.com/watch?v=qLE76y4SaKY",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "TapTalent — product explainer",
        caption: "Hiring platform walkthrough",
        poster: asset("yt_taptalent.jpg"),
        href: "https://www.youtube.com/watch?v=9TuneozzXrc",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Microsoft — SMS Organizer",
        caption: "Product video for a Microsoft Garage app on Google Play",
        poster: asset("yt_smsorg.jpg"),
        href: "https://www.youtube.com/watch?v=EuxA3ajJ5Sg",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Cubical — explainer 1",
        caption: "Startup product explainer",
        poster: asset("yt_cubical1.jpg"),
        href: "https://www.youtube.com/watch?v=_67HiGqXaAM",
        meta: "YouTube",
      },
      {
        kind: "link",
        size: "wide",
        title: "Cubical — explainer 2",
        caption: "Startup product explainer",
        poster: asset("yt_cubical2.jpg"),
        href: "https://www.youtube.com/watch?v=DMRWIZrbWRI",
        meta: "YouTube",
      },
      {
        kind: "video",
        size: "tall",
        title: "Dhyana — 21-minute session",
        caption: "In-app narrative walkthrough for a meditation app",
        poster: asset("dhyana_tease1.jpg"),
        src: asset("dhyana_tease1.mp4"),
        meta: "1:00",
      },
      {
        kind: "video",
        size: "tall",
        title: "Dhyana — onboarding video",
        caption: "First-run walkthrough explaining the app",
        poster: asset("dhyana_tease2.jpg"),
        src: asset("dhyana_tease2.mp4"),
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
        poster: asset("approach1.jpg"),
        src: asset("approach1.mp4"),
        meta: "1:25",
      },
      {
        kind: "video",
        size: "wide",
        title: "Course explainer — illustrated approach",
        caption: "Icon and illustration driven, animated in After Effects",
        poster: asset("approach3.jpg"),
        src: asset("approach3.mp4"),
        meta: "0:47",
      },
      {
        kind: "video",
        size: "wide",
        title: "1mg — Ask a Doctor product walkthrough",
        caption: "Feature explainer for an in-app consultation flow",
        poster: asset("askdr.jpg"),
        src: asset("askdr.mp4"),
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
        poster: asset("addtocart.jpg"),
        src: asset("addtocart.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "tall",
        title: "1mg — Care Plan upsell",
        caption: "Inline promotion on product page",
        poster: asset("joindcp.jpg"),
        src: asset("joindcp.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "1mg — 404 illustration",
        caption: "Error state character",
        poster: asset("404.jpg"),
        src: asset("404.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Microsoft SharePoint — splash",
        caption: "App launch animation",
        poster: asset("splash.jpg"),
        src: asset("splash.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "ClearTax — mascot state",
        caption: "Character reacting to a filing action",
        poster: asset("cleartax.jpg"),
        src: asset("cleartax.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "ClearTax — GSTN success",
        caption: "Success confirmation with confetti",
        poster: asset("gstn.jpg"),
        src: asset("gstn.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "ClearTax — invite sent",
        caption: "Team invitation confirmation",
        poster: asset("invite.jpg"),
        src: asset("invite.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, step 1",
        caption: "Bluetooth pairing state animation",
        poster: asset("dhyana_pair1.jpg"),
        src: asset("dhyana_pair1.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, step 2",
        caption: "Bluetooth pairing state animation",
        poster: asset("dhyana_pair2.jpg"),
        src: asset("dhyana_pair2.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, step 2a",
        caption: "Bluetooth pairing state animation",
        poster: asset("dhyana_pair2a.jpg"),
        src: asset("dhyana_pair2a.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, step 2b",
        caption: "Bluetooth pairing state animation",
        poster: asset("dhyana_pair2b.jpg"),
        src: asset("dhyana_pair2b.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Dhyana — device pairing, complete",
        caption: "Bluetooth pairing state animation",
        poster: asset("dhyana_pair3.jpg"),
        src: asset("dhyana_pair3.mp4"),
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
        poster: asset("pentagons.jpg"),
        src: asset("pentagons.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Robotics”",
        caption: "Social series, piece 28 of 30",
        poster: asset("robotics.jpg"),
        src: asset("robotics.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Explorations”",
        caption: "Social series, piece 23 of 30",
        poster: asset("explorations.jpg"),
        src: asset("explorations.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Ignition”",
        caption: "Social series, piece 9 of 30",
        poster: asset("ignition.jpg"),
        src: asset("ignition.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Buds”",
        caption: "Social series, piece 2 of 30",
        poster: asset("buds.jpg"),
        src: asset("buds.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Alarm”",
        caption: "Social series, piece 21 of 30",
        poster: asset("alarm.jpg"),
        src: asset("alarm.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Rock”",
        caption: "Social series, piece 24 of 30",
        poster: asset("rock.jpg"),
        src: asset("rock.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Plots”",
        caption: "Social series, piece 17 of 30",
        poster: asset("plots.jpg"),
        src: asset("plots.mp4"),
        meta: "loop",
      },
      {
        kind: "loop",
        size: "square",
        title: "Movember — “Team”",
        caption: "Social series, piece 22 of 30",
        poster: asset("team.jpg"),
        src: asset("team.mp4"),
        meta: "loop",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 1",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: asset("tmpal1.jpg"),
        src: asset("tmpal1.mp4"),
        meta: "0:21",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 2",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: asset("tmpal4.jpg"),
        src: asset("tmpal4.mp4"),
        meta: "0:17",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 3",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: asset("tmpal6.jpg"),
        src: asset("tmpal6.mp4"),
        meta: "0:28",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 4",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: asset("tmpal8.jpg"),
        src: asset("tmpal8.mp4"),
        meta: "0:27",
      },
      {
        kind: "video",
        size: "tall",
        aspect: "4 / 5",
        title: "TMPal — social piece 5",
        caption: "Vertical brand-awareness video, Instagram/Reels cut",
        poster: asset("tmpal9.jpg"),
        src: asset("tmpal9.mp4"),
        meta: "0:21",
      },
      {
        kind: "loop",
        size: "wide",
        aspect: "16 / 5",
        title: "Crypto — animated web banner",
        caption: "Hero banner, 1920×600",
        poster: asset("banner.jpg"),
        src: asset("banner.mp4"),
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
  poster: asset("weather.jpg"),
  href: "https://weather.promad.design",
  meta: "Live demo",
}
