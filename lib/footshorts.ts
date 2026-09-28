/**
 * Live data for the footshorts card, read the same way footshorts.com/about-us
 * does: public, read-only PostgREST queries with the project's anon key.
 * Queries mirror apps/footshorts/web/app/about-us/page.tsx in the vismay repo.
 */

export interface FootshortsTeam {
  id: string
  slug: string
  name: string
  crest_url: string | null
  primary_color?: string | null
  country?: string | null
}

export interface FootshortsFixture {
  id: string
  competition_slug: string | null
  kickoff_at: string
  status: string
  home_score: number | null
  away_score: number | null
  home_team_name: string | null
  away_team_name: string | null
  home: FootshortsTeam | null
  away: FootshortsTeam | null
}

export interface FootshortsData {
  /** Recent results then upcoming kick-offs, as the about-us match strip. */
  snapshot: FootshortsFixture[]
  /** Next four kick-offs, as the about-us schedule. */
  schedule: FootshortsFixture[]
  /** Popular clubs, as the about-us watchlist. */
  teams: FootshortsTeam[]
  /** Covered leagues, as the about-us coverage grid. */
  leagues: FootshortsTeam[]
  /** League slug → crest, for the match tiles' watermark. */
  leagueCrests: Record<string, string>
}

const EMPTY: FootshortsData = {
  snapshot: [],
  schedule: [],
  teams: [],
  leagues: [],
  leagueCrests: {},
}

const POPULAR_TEAM_SLUGS = [
  "arsenal",
  "chelsea",
  "liverpool",
  "manchester-city",
  "manchester-united",
  "tottenham-hotspur",
  "real-madrid",
  "barcelona",
]

const POPULAR_LEAGUE_SLUGS = [
  "premier-league",
  "primera-division",
  "bundesliga",
  "serie-a",
  "ligue-1",
  "champions-league",
  "europa-league",
  "primeira-liga",
  "eredivisie",
  "championship",
  "campeonato-brasileiro-serie-a",
  "european-championship",
  "world-cup",
]

const TEAM_COLS = "id,slug,name,crest_url,primary_color"
const FIXTURE_COLS = [
  "id,competition_slug,kickoff_at,status,home_score,away_score,home_team_name,away_team_name",
  `home:entities!fixtures_home_team_id_fkey(${TEAM_COLS})`,
  `away:entities!fixtures_away_team_id_fkey(${TEAM_COLS})`,
].join(",")

const priority = (slug: string, list: string[]) => {
  const i = list.indexOf(slug)
  return i === -1 ? Number.POSITIVE_INFINITY : i
}

async function query<T>(table: string, params: Record<string, string>): Promise<T[]> {
  const url = process.env.FOOTSHORTS_SUPABASE_URL
  const key = process.env.FOOTSHORTS_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error("footshorts Supabase env not set")
  const res = await fetch(`${url}/rest/v1/${table}?${new URLSearchParams(params)}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) throw new Error(`footshorts ${table}: ${res.status}`)
  return res.json()
}

/** Everything the footshorts card shows, refreshed every five minutes. Empty on any failure. */
export async function getFootshortsData(): Promise<FootshortsData> {
  try {
    const now = new Date().toISOString()
    const [past, upcoming, teams, leagues] = await Promise.all([
      query<FootshortsFixture>("fixtures", {
        select: FIXTURE_COLS,
        status: "eq.finished",
        kickoff_at: `lt.${now}`,
        order: "kickoff_at.desc",
        limit: "3",
      }),
      query<FootshortsFixture>("fixtures", {
        select: FIXTURE_COLS,
        kickoff_at: `gte.${now}`,
        order: "kickoff_at.asc",
        limit: "6",
      }),
      query<FootshortsTeam>("entities", {
        select: "id,slug,name,country,crest_url,primary_color",
        type: "eq.team",
        slug: `in.(${POPULAR_TEAM_SLUGS.join(",")})`,
        crest_url: "not.is.null",
      }),
      query<FootshortsTeam>("entities", {
        select: "id,slug,name,country,crest_url,primary_color",
        type: "eq.league",
        crest_url: "not.is.null",
        limit: "30",
      }),
    ])

    const leagueCrests: Record<string, string> = {}
    for (const l of leagues) if (l.crest_url) leagueCrests[l.slug] = l.crest_url

    return {
      snapshot: [...past].reverse().concat(upcoming).slice(0, 4),
      schedule: upcoming.slice(0, 4),
      teams: teams
        .sort((a, b) => priority(a.slug, POPULAR_TEAM_SLUGS) - priority(b.slug, POPULAR_TEAM_SLUGS))
        .slice(0, 5),
      leagues: leagues
        .sort(
          (a, b) =>
            priority(a.slug, POPULAR_LEAGUE_SLUGS) - priority(b.slug, POPULAR_LEAGUE_SLUGS) ||
            a.name.localeCompare(b.name)
        )
        .slice(0, 6),
      leagueCrests,
    }
  } catch (err) {
    console.warn("[footshorts] live cards unavailable:", err)
    return EMPTY
  }
}
