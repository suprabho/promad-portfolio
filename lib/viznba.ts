/**
 * Live league data for the VizNBA card, read the way VizNBA does: ESPN's free
 * public NBA site API (no key). The normalising mirrors
 * apps/viznba/web/lib/espn.ts in the vismay repo, trimmed to what the card's
 * modules show.
 */

const SITE = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba"
const STANDINGS = "https://site.api.espn.com/apis/v2/sports/basketball/nba/standings"

// ESPN abbreviation → VizNBA's display abbreviation and on-dark tint (apps/viznba/web/lib/teams.ts).
const TEAMS: Record<string, { abbr: string; dot: string }> = {
  ATL: { abbr: "ATL", dot: "#ff6b6b" }, BOS: { abbr: "BOS", dot: "#1f9d55" },
  BKN: { abbr: "BKN", dot: "#c9c9d1" }, CHA: { abbr: "CHA", dot: "#2fb7c9" },
  CHI: { abbr: "CHI", dot: "#ff5577" }, CLE: { abbr: "CLE", dot: "#e0457b" },
  DAL: { abbr: "DAL", dot: "#4aa3e8" }, DEN: { abbr: "DEN", dot: "#FEC524" },
  DET: { abbr: "DET", dot: "#ef4b5f" }, GS: { abbr: "GSW", dot: "#FFC72C" },
  HOU: { abbr: "HOU", dot: "#ff4f6d" }, IND: { abbr: "IND", dot: "#FDBB30" },
  LAC: { abbr: "LAC", dot: "#5b8def" }, LAL: { abbr: "LAL", dot: "#a07ae0" },
  MEM: { abbr: "MEM", dot: "#8fa6d6" }, MIA: { abbr: "MIA", dot: "#F9A01B" },
  MIL: { abbr: "MIL", dot: "#3fae6a" }, MIN: { abbr: "MIN", dot: "#78BE20" },
  NO: { abbr: "NOP", dot: "#c9a96a" }, NY: { abbr: "NYK", dot: "#F58426" },
  OKC: { abbr: "OKC", dot: "#38a8f0" }, ORL: { abbr: "ORL", dot: "#4fb0ef" },
  PHI: { abbr: "PHI", dot: "#ff4d73" }, PHX: { abbr: "PHX", dot: "#E56020" },
  POR: { abbr: "POR", dot: "#ff5c60" }, SAC: { abbr: "SAC", dot: "#9b6bd1" },
  SA: { abbr: "SAS", dot: "#C4CED4" }, TOR: { abbr: "TOR", dot: "#ff4f6d" },
  UTAH: { abbr: "UTA", dot: "#9d6bdc" }, WSH: { abbr: "WAS", dot: "#ff5266" },
}

export interface NbaTeam {
  abbr: string
  dot: string
  logo: string | null
}

export interface NbaGameSide {
  team: NbaTeam
  score: number | null
  winner: boolean
}

export interface NbaGame {
  id: string
  /** "FINAL", "FINAL/OT", "Q3 4:12", "HALF". */
  status: string
  live: boolean
  away: NbaGameSide
  home: NbaGameSide
}

export interface NbaStandingRow {
  team: NbaTeam
  seed: number
  wins: number
  losses: number
  pct: string
  streak: string
  diff: number
}

export interface ViznbaData {
  season: string
  /** ET date (YYYY-MM-DD) of the games shown. */
  gamesDay: string | null
  games: NbaGame[]
  conferences: { name: string; rows: NbaStandingRow[] }[]
}

function team(espnAbbr: string | undefined): NbaTeam {
  const key = (espnAbbr ?? "").toUpperCase()
  const known = TEAMS[key]
  if (!known) return { abbr: key.slice(0, 4) || "TBD", dot: "#8e8e99", logo: null }
  return {
    ...known,
    logo: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500-dark/${key.toLowerCase()}.png&w=56&h=56`,
  }
}

async function getJson<T>(url: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; promad-portfolio)" },
      next: { revalidate },
      signal: AbortSignal.timeout(5000),
    })
    return res.ok ? ((await res.json()) as T) : null
  } catch {
    return null
  }
}

type EspnCompetitor = {
  homeAway: "home" | "away"
  winner?: boolean
  score?: string
  team: { abbreviation?: string }
}

type EspnEvent = {
  id: string
  competitions: {
    status?: { period?: number; displayClock?: string; type?: { name?: string; state?: string } }
    competitors: EspnCompetitor[]
  }[]
}

function period(p: number) {
  if (p <= 4) return `Q${p}`
  return p === 5 ? "OT" : `${p - 4}OT`
}

function normaliseEvent(e: EspnEvent): NbaGame | null {
  const comp = e.competitions?.[0]
  const s = comp?.status
  const state = s?.type?.state
  if (!comp || (state !== "in" && state !== "post")) return null
  if (s?.type?.name === "STATUS_POSTPONED" || s?.type?.name === "STATUS_CANCELED") return null
  const home = comp.competitors.find((c) => c.homeAway === "home")
  const away = comp.competitors.find((c) => c.homeAway === "away")
  if (!home || !away) return null
  const p = s?.period ?? 0
  const status =
    state === "post"
      ? p > 4 ? `FINAL/${period(p)}` : "FINAL"
      : s?.type?.name === "STATUS_HALFTIME"
        ? "HALF"
        : `${period(p)} ${s?.displayClock ?? ""}`.trim()
  const side = (c: EspnCompetitor): NbaGameSide => {
    const n = Number(c.score)
    return { team: team(c.team.abbreviation), score: Number.isFinite(n) ? n : null, winner: !!c.winner }
  }
  return { id: e.id, status, live: state === "in", away: side(away), home: side(home) }
}

/** US-Eastern calendar day, `daysAgo` days back, as YYYY-MM-DD. */
function etDay(daysAgo: number) {
  return new Date(Date.now() - daysAgo * 86_400_000).toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  })
}

/** The most recent ET day in the past week with games underway or finished. */
async function latestGames(): Promise<{ day: string | null; games: NbaGame[] }> {
  for (let back = 0; back < 7; back++) {
    const day = etDay(back)
    const data = await getJson<{ events?: EspnEvent[] }>(
      `${SITE}/scoreboard?dates=${day.replaceAll("-", "")}&limit=100`,
      back <= 1 ? 60 : 3600
    )
    if (!data) return { day: null, games: [] }
    const games = (data.events ?? []).map(normaliseEvent).filter((g): g is NbaGame => g !== null)
    if (games.length) return { day, games: games.slice(0, 5) }
  }
  return { day: null, games: [] }
}

type EspnStandings = {
  children?: {
    name: string
    standings?: {
      seasonDisplayName?: string
      entries?: {
        team: { abbreviation?: string }
        stats: { name: string; value?: number; displayValue?: string }[]
      }[]
    }
  }[]
}

async function standings(): Promise<Pick<ViznbaData, "season" | "conferences">> {
  const data = await getJson<EspnStandings>(STANDINGS, 3600)
  const conferences = (data?.children ?? []).map((c) => {
    const rows = (c.standings?.entries ?? []).map((e) => {
      const s = Object.fromEntries(e.stats.map((x) => [x.name, x]))
      const num = (k: string) => Number(s[k]?.value ?? s[k]?.displayValue ?? 0)
      return {
        team: team(e.team.abbreviation),
        seed: num("playoffSeed"),
        wins: num("wins"),
        losses: num("losses"),
        pct: s.winPercent?.displayValue ?? ".000",
        streak: s.streak?.displayValue ?? "",
        diff: num("differential"),
      }
    })
    rows.sort((a, b) => (a.seed || 99) - (b.seed || 99) || b.wins - a.wins)
    return { name: c.name, rows }
  })
  // Before tip-off of a new season every row is 0–0: nothing worth showing.
  const played = conferences.some((c) => c.rows.some((r) => r.wins + r.losses > 0))
  return {
    season: data?.children?.[0]?.standings?.seasonDisplayName ?? "",
    conferences: played ? conferences : [],
  }
}

export async function getViznbaData(): Promise<ViznbaData> {
  const [{ day, games }, table] = await Promise.all([latestGames(), standings()])
  return { ...table, gamesDay: day, games }
}
