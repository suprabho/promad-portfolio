/* eslint-disable @next/next/no-img-element -- team logos are remote */
import type { ReactNode } from "react"
import type { NbaGame, NbaGameSide, NbaStandingRow, NbaTeam } from "@/lib/viznba"

/*
 * VizNBA's scoreboard, conference table and "Season Tracker" point-differential
 * bars, ported from the vismay repo (apps/viznba/web components GameLine,
 * EditorialGrid and StandingsCharts) in VizNBA's palette. VizNBA shares vizf1's
 * Saira / Martian Mono, so these use the same font variables.
 */

const T = { surface: "#13161d", border: "#1f2330", grid: "#2a2f3d", text: "#f5f5f5", muted: "#8e8e99", accent: "#ff8a3d" }

function Card({ title, kicker, children }: { title: string; kicker: string; children: ReactNode }) {
  return (
    <section
      className="w-[320px] overflow-hidden rounded-2xl border pb-3 font-[family-name:var(--font-f1-sans)]"
      style={{ backgroundColor: T.surface, borderColor: T.border, color: T.text }}
    >
      <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-4">
        <h4 className="text-base font-semibold">{title}</h4>
        <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: T.muted, fontStretch: "125%" }}>
          {kicker}
        </span>
      </div>
      {children}
    </section>
  )
}

function TeamMark({ team, size = 22 }: { team: NbaTeam; size?: number }) {
  return team.logo ? (
    <img src={team.logo} alt="" width={size} height={size} className="shrink-0 object-contain" style={{ width: size, height: size }} />
  ) : (
    <span className="shrink-0 rounded-full" style={{ width: size * 0.5, height: size * 0.5, backgroundColor: team.dot }} />
  )
}

const mono = "font-[family-name:var(--font-f1-mono)] tabular-nums"

function formatDay(day: string) {
  return new Date(`${day}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
}

function SideLine({ side }: { side: NbaGameSide }) {
  return (
    <div className="flex items-center gap-2">
      <TeamMark team={side.team} size={18} />
      <span className="text-[13px] font-semibold" style={{ opacity: side.winner ? 1 : 0.6 }}>
        {side.team.abbr}
      </span>
      <span className={`ml-auto text-[13px] font-bold ${mono}`} style={{ color: side.winner ? T.text : T.muted }}>
        {side.score ?? "—"}
      </span>
    </div>
  )
}

export function Scoreboard({ games, day }: { games: NbaGame[]; day: string | null }) {
  return (
    <Card title="Scores" kicker={day ? formatDay(day) : "Latest"}>
      <div className="grid gap-1.5 px-3">
        {games.map((g) => (
          <div
            key={g.id}
            className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border px-3 py-1.5"
            style={{ borderColor: T.border, backgroundColor: "#0f1219" }}
          >
            <div className="grid gap-0.5">
              <SideLine side={g.away} />
              <SideLine side={g.home} />
            </div>
            <span
              className={`w-16 text-right text-[10px] font-semibold ${mono}`}
              style={{ color: g.live ? "#ff7a7c" : T.muted }}
            >
              {g.live && <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff4d4f] align-middle" />}
              {g.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function ConferenceTable({ name, rows, season }: { name: string; rows: NbaStandingRow[]; season: string }) {
  const top = rows.slice(0, 6)
  const peak = Math.max(1, ...top.map((r) => r.wins))
  return (
    <Card title={name} kicker={season || "Standings"}>
      <div className={`grid grid-cols-[18px_1fr_46px_40px_30px] gap-x-2 px-4 pb-1 text-[9px] uppercase tracking-wider`} style={{ color: T.muted }}>
        <span />
        <span>Team</span>
        <span className="text-right">W–L</span>
        <span className="text-right">Pct</span>
        <span className="text-right">Strk</span>
      </div>
      <div className="grid gap-1 px-3">
        {top.map((r, i) => (
          <div key={r.team.abbr} className="relative grid grid-cols-[18px_1fr_46px_40px_30px] items-center gap-x-2 overflow-hidden rounded-md px-1 py-1.5">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 rounded-md"
              style={{ width: `${(r.wins / peak) * 100}%`, backgroundColor: i === 0 ? T.accent : r.team.dot, opacity: 0.12 }}
            />
            <span className={`relative text-[11px] font-bold ${mono}`} style={{ color: i === 0 ? T.accent : T.muted }}>
              {r.seed || i + 1}
            </span>
            <span className="relative flex items-center gap-2 text-[13px] font-semibold">
              <TeamMark team={r.team} size={18} />
              {r.team.abbr}
            </span>
            <span className={`relative text-right text-[12px] ${mono}`}>
              {r.wins}–{r.losses}
            </span>
            <span className={`relative text-right text-[11px] ${mono}`} style={{ color: T.muted }}>
              {r.pct}
            </span>
            <span
              className={`relative text-right text-[11px] font-semibold ${mono}`}
              style={{ color: r.streak.startsWith("W") ? T.accent : T.muted }}
            >
              {r.streak}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

/** Point differential per team across the league, sorted: the "Season Tracker". */
export function DiffBars({ rows, season }: { rows: NbaStandingRow[]; season: string }) {
  const sorted = [...rows].sort((a, b) => b.diff - a.diff)
  const peak = Math.max(1, ...sorted.map((r) => Math.abs(r.diff)))
  const width = 296
  const height = 150
  const bw = width / Math.max(1, sorted.length)
  const mid = height / 2
  const best = sorted[0]
  const worst = sorted.at(-1)
  return (
    <Card title="Season Tracker" kicker={season || "Point diff"}>
      <div className="px-3">
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Average point differential per team">
          <line x1="0" y1={mid} x2={width} y2={mid} stroke={T.grid} strokeDasharray="2 3" />
          {sorted.map((r, i) => {
            const h = (Math.abs(r.diff) / peak) * (mid - 4)
            return (
              <rect
                key={r.team.abbr}
                x={i * bw + 0.8}
                y={r.diff >= 0 ? mid - h : mid}
                width={Math.max(1, bw - 1.6)}
                height={Math.max(1, h)}
                rx="1.5"
                fill={r.diff >= 0 ? T.accent : "#5a6070"}
              />
            )
          })}
        </svg>
        {best && worst && (
          <div className={`mt-2 flex justify-between text-[11px] ${mono}`}>
            <span className="flex items-center gap-1.5">
              <TeamMark team={best.team} size={16} />
              {best.team.abbr} <span style={{ color: T.accent }}>{best.diff > 0 ? "+" : ""}{best.diff.toFixed(1)}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <TeamMark team={worst.team} size={16} />
              {worst.team.abbr} <span style={{ color: T.muted }}>{worst.diff > 0 ? "+" : ""}{worst.diff.toFixed(1)}</span>
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
