/* eslint-disable @next/next/no-img-element -- crests are remote, arbitrary hosts */
import type { FootshortsFixture, FootshortsTeam } from "@/lib/footshorts"

/*
 * footshorts.com/about-us's live previews, ported from the vismay repo
 * (verticals/footshorts-viz MatchTile / MatchRow and the about-us page) in the
 * site's Pitch theme.
 */

const T = {
  bg: "#06140C",
  surface: "#0E2517",
  border: "#1B3A26",
  text: "#ECFDF1",
  muted: "#7FA48C",
  brand: "#F26A3C",
}

const COMPETITION_NAME: Record<string, string> = {
  "premier-league": "Premier League",
  "primera-division": "La Liga",
  bundesliga: "Bundesliga",
  "serie-a": "Serie A",
  "ligue-1": "Ligue 1",
  "champions-league": "Champions League",
  "europa-league": "Europa League",
  "world-cup": "World Cup",
  "european-championship": "Euros",
  eredivisie: "Eredivisie",
  "primeira-liga": "Primeira Liga",
  championship: "Championship",
  "campeonato-brasileiro-serie-a": "Brasileirão",
  "conference-league": "Conference League",
}

const COMPETITION_COLOR: Record<string, string> = {
  "premier-league": "#3D195B",
  "primera-division": "#E2231A",
  bundesliga: "#D20515",
  "serie-a": "#0066CC",
  "ligue-1": "#091C3E",
  "champions-league": "#0E1E5B",
  "europa-league": "#FF6900",
  "world-cup": "#7B2D26",
  "european-championship": "#001A70",
  eredivisie: "#F47C20",
  "primeira-liga": "#006B3F",
  championship: "#1A1A1A",
  "campeonato-brasileiro-serie-a": "#009C3B",
  "conference-league": "#00A85A",
}

const HEX = /^#[0-9a-fA-F]{6}$/

function darken(hex: string, amount = 0.4) {
  if (!HEX.test(hex)) return hex
  const c = (i: number) => Math.round(parseInt(hex.slice(i, i + 2), 16) * (1 - amount))
  return `rgb(${c(1)}, ${c(3)}, ${c(5)})`
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const pad = (n: number) => String(n).padStart(2, "0")

// UTC throughout, so the server and browser render the same label.
function kickoff(iso: string) {
  const d = new Date(iso)
  return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} · ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`
}

const teamName = (t: FootshortsTeam | null, fallback: string | null) => t?.name ?? fallback ?? "TBD"

function Crest({ url, size }: { url: string | null | undefined; size: number }) {
  return url ? (
    <img src={url} alt="" width={size} height={size} className="shrink-0 object-contain" style={{ width: size, height: size }} />
  ) : (
    <span className="shrink-0 rounded-full bg-white/30" style={{ width: size, height: size }} />
  )
}

export function MatchTile({ fixture, competitionCrest }: { fixture: FootshortsFixture; competitionCrest?: string }) {
  const fallback = COMPETITION_COLOR[fixture.competition_slug ?? ""] ?? "#1F2030"
  const home = fixture.home?.primary_color && HEX.test(fixture.home.primary_color) ? fixture.home.primary_color : fallback
  const away = fixture.away?.primary_color
  const background =
    away && HEX.test(away) && away.toLowerCase() !== home.toLowerCase()
      ? `linear-gradient(135deg, ${home} 0%, ${home} 55%, ${away} 100%)`
      : home
  const finished = fixture.status === "finished" && fixture.home_score != null && fixture.away_score != null

  return (
    <div className="relative h-32 overflow-hidden rounded-xl p-4 text-white shadow-xl" style={{ background }}>
      {competitionCrest && (
        <img
          src={competitionCrest}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 object-contain opacity-25"
        />
      )}
      <div className="relative flex h-full flex-col">
        <div className="text-xs font-bold uppercase tracking-wider">
          {finished ? (
            <span className="tabular-nums">
              {fixture.home_score} – {fixture.away_score}
            </span>
          ) : fixture.status === "live" ? (
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              LIVE
            </span>
          ) : (
            kickoff(fixture.kickoff_at)
          )}
        </div>
        <div className="mt-2 flex-1 space-y-1.5 overflow-hidden">
          {[
            { team: fixture.home, name: fixture.home_team_name },
            { team: fixture.away, name: fixture.away_team_name },
          ].map(({ team, name }, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/85">
                <Crest url={team?.crest_url} size={16} />
              </span>
              <span className="truncate text-sm font-semibold">{teamName(team, name)}</span>
            </div>
          ))}
        </div>
        <div className="truncate text-[10px] font-semibold uppercase tracking-wider text-white/80">
          {COMPETITION_NAME[fixture.competition_slug ?? ""] ?? fixture.competition_slug}
        </div>
      </div>
    </div>
  )
}

export function MatchStrip({ fixtures, crests }: { fixtures: FootshortsFixture[]; crests: Record<string, string> }) {
  return (
    <div className="w-56 space-y-3">
      {fixtures.map((f) => (
        <MatchTile key={f.id} fixture={f} competitionCrest={crests[f.competition_slug ?? ""]} />
      ))}
    </div>
  )
}

export function Watchlist({ teams }: { teams: FootshortsTeam[] }) {
  return (
    <div
      className="w-[300px] rounded-2xl border p-4 shadow-2xl"
      style={{ backgroundColor: T.surface, borderColor: T.border, color: T.text }}
    >
      <div
        className="mb-3 flex items-center gap-2 rounded-md border px-3 py-2 text-xs"
        style={{ borderColor: T.border, backgroundColor: `${T.bg}99`, color: T.muted }}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="7" cy="7" r="5" />
          <path d="m14 14-3-3" strokeLinecap="round" />
        </svg>
        Search teams, leagues…
      </div>
      <ul className="space-y-2">
        {teams.map((t, i) => (
          <li
            key={t.id}
            className="flex items-center justify-between rounded-md border px-3 py-2"
            style={{ borderColor: T.border, backgroundColor: `${T.bg}99` }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/40">
                <Crest url={t.crest_url} size={28} />
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{t.name}</div>
                {t.country && (
                  <div className="text-xs" style={{ color: T.muted }}>
                    {t.country}
                  </div>
                )}
              </div>
            </div>
            <span
              className="shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium"
              style={
                i < 2
                  ? { backgroundColor: T.brand, borderColor: T.brand, color: "#fff" }
                  : { borderColor: T.border, color: T.muted }
              }
            >
              {i < 2 ? "Following" : "Follow"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Schedule({ fixtures }: { fixtures: FootshortsFixture[] }) {
  return (
    <div
      className="w-[300px] overflow-hidden rounded-2xl border shadow-2xl"
      style={{ backgroundColor: T.surface, borderColor: T.border, color: T.text }}
    >
      {fixtures.map((f) => {
        const d = new Date(f.kickoff_at)
        return (
          <div key={f.id} className="flex items-center gap-2 border-b px-3 py-2.5 last:border-b-0" style={{ borderColor: T.border }}>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Crest url={f.home?.crest_url} size={20} />
              <span className="truncate text-xs">{teamName(f.home, f.home_team_name)}</span>
            </div>
            <div className="flex w-16 shrink-0 flex-col items-center">
              <span className="text-[11px]" style={{ color: `${T.text}cc` }}>
                vs
              </span>
              <span className="text-[9px] tabular-nums" style={{ color: `${T.text}80` }}>
                {MONTHS[d.getUTCMonth()]} {d.getUTCDate()} {pad(d.getUTCHours())}:{pad(d.getUTCMinutes())}
              </span>
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
              <span className="truncate text-right text-xs">{teamName(f.away, f.away_team_name)}</span>
              <Crest url={f.away?.crest_url} size={20} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function LeagueGrid({ leagues }: { leagues: FootshortsTeam[] }) {
  return (
    <div className="grid w-[300px] grid-cols-2 gap-2.5">
      {leagues.map((l) => {
        const base =
          l.primary_color && HEX.test(l.primary_color) ? l.primary_color : COMPETITION_COLOR[l.slug]
        return (
          <div
            key={l.id}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border shadow-lg"
            style={{
              borderColor: T.border,
              background: base ? `linear-gradient(135deg, ${base} 0%, ${darken(base)} 100%)` : T.surface,
            }}
          >
            <div className="flex h-full flex-col items-center p-2.5">
              <div className="flex min-h-0 flex-1 items-center justify-center">
                {l.crest_url && <img src={l.crest_url} alt="" className="max-h-12 w-auto max-w-[75%] object-contain" />}
              </div>
              <div className="w-full truncate text-center text-[11px] font-bold leading-tight text-white">{l.name}</div>
              {l.country && <div className="w-full truncate text-center text-[9px] text-white/75">{l.country}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
