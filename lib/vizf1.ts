/**
 * Live championship data for the vizf1 card, read the way vizf1.com does:
 * public, read-only PostgREST queries with the project's anon key. The points
 * maths mirrors apps/vizf1/web/lib/useStandings.ts and useStandingsOverTime.ts
 * in the vismay repo (OpenF1 has no points, so they're recomputed from
 * finishing positions).
 */

const RACE_POINTS: Record<number, number> = {
  1: 25, 2: 18, 3: 15, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2, 10: 1,
}
const SPRINT_POINTS: Record<number, number> = {
  1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1,
}

export interface F1DriverStanding {
  position: number
  driverId: string
  code: string | null
  name: string
  teamName: string
  color: string | null
  headshotUrl: string | null
  points: number
}

export interface F1ConstructorStanding {
  position: number
  constructorId: string
  name: string
  color: string | null
  logoUrl: string | null
  points: number
}

export interface F1Lane {
  driverId: string
  code: string | null
  name: string
  color: string
  headshotUrl: string | null
  points: { round: number; position: number }[]
}

export interface Vizf1Data {
  season: number
  drivers: F1DriverStanding[]
  constructors: F1ConstructorStanding[]
  /** Championship position after each raced round, for the top six drivers. */
  lanes: F1Lane[]
}

type RawRow = {
  position: number | null
  driver_id: string
  vizf1_sessions: {
    session_type: "race" | "sprint"
    vizf1_races: { round: number; season: string }
  }
  drivers: {
    given_name: string
    family_name: string
    code: string | null
    headshot_url: string | null
    primary_color: string | null
    constructor_id: string | null
    constructors: { name: string; primary_color: string | null; logo_url: string | null } | null
  } | null
}

const SELECT = [
  "position,driver_id",
  "vizf1_sessions!inner(session_type,vizf1_races!inner(season,round))",
  "drivers:vizf1_drivers!inner(given_name,family_name,code,headshot_url,primary_color,constructor_id,constructors:vizf1_constructors(name,primary_color,logo_url))",
].join(",")

function pointsFor(r: RawRow) {
  if (r.position == null) return 0
  const table = r.vizf1_sessions.session_type === "sprint" ? SPRINT_POINTS : RACE_POINTS
  return table[r.position] ?? 0
}

/** The season's standings and standings-by-round, refreshed every ten minutes. Null on any failure. */
export async function getVizf1Data(): Promise<Vizf1Data | null> {
  const url = process.env.VIZF1_SUPABASE_URL
  const key = process.env.VIZF1_SUPABASE_ANON_KEY
  if (!url || !key) return null
  const season = new Date().getFullYear()

  try {
    const params = new URLSearchParams({
      select: SELECT,
      "vizf1_sessions.session_type": "in.(race,sprint)",
      "vizf1_sessions.vizf1_races.season": `eq.${season}`,
    })
    const res = await fetch(`${url}/rest/v1/vizf1_session_results?${params}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(`vizf1_session_results: ${res.status}`)
    const rows = ((await res.json()) as RawRow[]).filter((r) => r.drivers)
    if (!rows.length) return null

    // ── Season totals ──
    const drivers = new Map<string, F1DriverStanding & { wins: number }>()
    const teams = new Map<string, F1ConstructorStanding & { wins: number }>()
    for (const r of rows) {
      const d = r.drivers!
      const pts = pointsFor(r)
      const win = r.vizf1_sessions.session_type === "race" && r.position === 1 ? 1 : 0
      const teamId = d.constructor_id ?? "unknown"
      const teamName = d.constructors?.name ?? teamId

      const drv = drivers.get(r.driver_id) ?? {
        position: 0,
        driverId: r.driver_id,
        code: d.code,
        name: `${d.given_name} ${d.family_name}`,
        teamName,
        color: d.primary_color,
        headshotUrl: d.headshot_url,
        points: 0,
        wins: 0,
      }
      drv.points += pts
      drv.wins += win
      drivers.set(r.driver_id, drv)

      const team = teams.get(teamId) ?? {
        position: 0,
        constructorId: teamId,
        name: teamName,
        color: d.primary_color ?? d.constructors?.primary_color ?? null,
        logoUrl: d.constructors?.logo_url ?? null,
        points: 0,
        wins: 0,
      }
      team.points += pts
      team.wins += win
      teams.set(teamId, team)
    }
    const rank = <T extends { points: number; wins: number }>(m: Map<string, T>) =>
      [...m.values()]
        .sort((a, b) => b.points - a.points || b.wins - a.wins)
        .map((x, i) => ({ ...x, position: i + 1 }))

    // ── Standings after each raced round ──
    const byRound = new Map<number, { rows: RawRow[]; hadRace: boolean }>()
    for (const r of rows) {
      const round = r.vizf1_sessions.vizf1_races.round
      const b = byRound.get(round) ?? { rows: [], hadRace: false }
      b.rows.push(r)
      if (r.vizf1_sessions.session_type === "race") b.hadRace = true
      byRound.set(round, b)
    }
    const rounds = [...byRound.keys()].filter((r) => byRound.get(r)!.hadRace).sort((a, b) => a - b)
    const cumPts = new Map<string, number>()
    const cumWins = new Map<string, number>()
    const byDriver = new Map<string, { round: number; position: number }[]>()
    const order = () =>
      [...cumPts.entries()]
        .sort(([a, ap], [b, bp]) => bp - ap || (cumWins.get(b) ?? 0) - (cumWins.get(a) ?? 0))
        .map(([id]) => id)
    for (const round of rounds) {
      for (const r of byRound.get(round)!.rows) {
        cumPts.set(r.driver_id, (cumPts.get(r.driver_id) ?? 0) + pointsFor(r))
        if (r.vizf1_sessions.session_type === "race" && r.position === 1)
          cumWins.set(r.driver_id, (cumWins.get(r.driver_id) ?? 0) + 1)
      }
      order().forEach((id, i) => {
        const list = byDriver.get(id) ?? []
        list.push({ round, position: i + 1 })
        byDriver.set(id, list)
      })
    }
    const lanes: F1Lane[] = order()
      .slice(0, 6)
      .map((id) => {
        const d = drivers.get(id)!
        return {
          driverId: id,
          code: d.code,
          name: d.name,
          color: d.color ?? "#9ca3af",
          headshotUrl: d.headshotUrl,
          points: byDriver.get(id) ?? [],
        }
      })

    return {
      season,
      drivers: rank(drivers).slice(0, 3),
      constructors: rank(teams).slice(0, 3),
      lanes,
    }
  } catch (err) {
    console.warn("[vizf1] live modules unavailable:", err)
    return null
  }
}
