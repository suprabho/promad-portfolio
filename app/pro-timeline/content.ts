export const REPO = "suprabho/pro-timeline"
export const REPO_URL = `https://github.com/${REPO}`
export const RELEASES_URL = `${REPO_URL}/releases`
export const ISSUES_URL = `${REPO_URL}/issues`
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`
/** Always serves the newest stable release; GitHub's `latest` ignores pre-releases. */
export const LATEST_ZXP_URL = `${RELEASES_URL}/latest/download/com.promad.protimeline.zxp`
export const ZXP_INSTALLER_URL = "https://aescripts.com/learn/post/zxp-installer"

export const LOGO_SRC = "/images/products/pro-timeline/pro-timeline-master.svg"

export const REQUIREMENTS = [
  { term: "Host", detail: "After Effects 2024 (24.0) or newer" },
  { term: "Platforms", detail: "macOS and Windows" },
  { term: "Price", detail: "Free for personal and commercial work" },
]

export const DETAILS = [
  {
    icon: "fingerprint",
    title: "Keyed to layer ids",
    body: "Groups follow After Effects' persistent layer ids, not names or positions. Rename, reorder and write expressions freely.",
  },
  {
    icon: "floppy",
    title: "Saved with the project",
    body: "Group data lives in the project's metadata and travels with the .aep. Per-layer tags let groups be recovered if that data is lost.",
  },
  {
    icon: "undo",
    title: "One undo per action",
    body: "Grouping, collapsing, relabelling and moving in time each land as a single step in After Effects' undo history.",
  },
  {
    icon: "eye",
    title: "Whole-group switches",
    body: "Solo, lock, hide, relabel or select every layer in a group from its header row.",
  },
  {
    icon: "gauge",
    title: "Built for dense comps",
    body: "A virtualised outline and one script round-trip per action. Tested against 500-layer compositions.",
  },
  {
    icon: "bell",
    title: "Quiet update notice",
    body: "The panel checks GitHub once on launch and notes a newer version in its status bar. No project data is sent.",
  },
] as const

export const INSTALL_STEPS: { title: string; body: string; menu?: string }[] = [
  {
    title: "Download the installer file",
    body: "Get com.promad.protimeline.zxp from the download button or from GitHub Releases.",
  },
  {
    title: "Install it with the ZXP/UXP Installer",
    body: "Install the free aescripts ZXP/UXP Installer, then drag the .zxp file onto its window.",
  },
  {
    title: "Open the panel",
    body: "Restart After Effects, open the panel from the Window menu and dock it beside your timeline.",
    menu: "Window › Extensions › Pro Timeline",
  },
]

export const FAQ = [
  {
    q: "Is Pro Timeline free?",
    a: "Yes. You can use it on any number of computers for personal and commercial work, including client projects. It is proprietary freeware, so please link to this page rather than re-sharing the installer.",
  },
  {
    q: "Does it add native folders to After Effects?",
    a: "No. After Effects has no native layer folders. Each group is a null header layer with its members parented to it. Collapsing a group marks its members shy and turns on Hide Shy Layers; expanding restores each layer's previous shy state.",
  },
  {
    q: "What happens if I open the project without the panel?",
    a: "Everything is ordinary After Effects: header nulls, parenting and shy switches stay as they were. Collaborators without Pro Timeline can open and render the project as usual.",
  },
  {
    q: "Does it replace the timeline?",
    a: "No. Pro Timeline is a dockable panel that sits beside the After Effects timeline. It shows an outline of the active comp with a compact track area for moving layers and groups in time.",
  },
  {
    q: "Where do I report a bug?",
    a: "Open an issue on GitHub with your After Effects version, operating system and the steps that led to the problem.",
  },
]

export type Release = {
  version: string
  date: string
  url: string
  notes: string[]
  prerelease: boolean
  zxpUrl: string | null
}

type GitHubRelease = {
  tag_name: string
  html_url: string
  body: string | null
  draft: boolean
  prerelease: boolean
  published_at: string | null
  assets: { name: string; browser_download_url: string }[]
}

/** Bullet points of a release body; wrapped continuation lines are joined to their bullet. */
function parseNotes(body: string | null): string[] {
  const notes: string[] = []
  for (const raw of (body ?? "").split(/\r?\n/)) {
    const line = raw.trim()
    if (/^[-*] /.test(line)) notes.push(line.slice(2))
    else if (line && notes.length && /^\s{2,}/.test(raw)) notes[notes.length - 1] += ` ${line}`
  }
  return notes
}

/**
 * Newest published release, read at build time and revalidated hourly so visitors never
 * hit GitHub's rate limit. Stable releases win over pre-releases; null when there are none.
 */
export async function getLatestRelease(): Promise<Release | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=10`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const releases = ((await res.json()) as GitHubRelease[]).filter((r) => !r.draft)
    const release = releases.find((r) => !r.prerelease) ?? releases[0]
    if (!release) return null
    return {
      version: release.tag_name.replace(/^v/, ""),
      date: release.published_at ?? "",
      url: release.html_url,
      notes: parseNotes(release.body),
      prerelease: release.prerelease,
      zxpUrl: release.assets.find((a) => a.name.endsWith(".zxp"))?.browser_download_url ?? null,
    }
  } catch {
    return null
  }
}

/** Where the main download button points for a given release state. */
export function downloadHref(release: Release | null) {
  if (release && !release.prerelease) return LATEST_ZXP_URL
  return release?.zxpUrl ?? RELEASES_URL
}

/** Highlights from the 1.0.0 section of CHANGELOG.md, shown until a release is published. */
export const FALLBACK_NOTES = [
  "Layer groups for the After Effects timeline: group, collapse, solo, lock, relabel and select whole groups of layers, each in one undo step.",
  "Group membership keyed by After Effects' persistent layer ids, so reordering and expressions keep working.",
  "Groups are saved in the project's XMP metadata and travel with the .aep; per-layer tags let groups be recovered if that data is lost.",
  "Track area beside the outline: time ruler, playhead, layer bars, keyframe marks and group bars. Drag a bar to move a layer, the selection or a whole group in time.",
]
