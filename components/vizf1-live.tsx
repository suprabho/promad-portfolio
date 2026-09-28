/* eslint-disable @next/next/no-img-element -- headshots and logos are remote */
import { useId, type CSSProperties, type ReactNode } from "react"
import type { F1ConstructorStanding, F1DriverStanding, F1Lane } from "@/lib/vizf1"

/*
 * vizf1.com's "The season, at a glance" podiums and "Driver position over time"
 * chart, ported from the vismay repo (apps/vizf1/web/components/Podium.tsx and
 * verticals/f1-viz PositionChart) in vizf1's palette.
 */

const T = { bg: "#0b0d12", surface: "#13161d", border: "#1f2330", text: "#f5f5f5", muted: "#8e8e99" }

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      className="w-[320px] overflow-hidden rounded-2xl border font-[family-name:var(--font-f1-sans)]"
      style={{ backgroundColor: T.surface, borderColor: T.border, color: T.text }}
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-4">
        <div>
          <h4 className="text-base font-semibold">{title}</h4>
          <p className="mt-0.5 text-[11px]" style={{ color: T.muted }}>
            Championship standings
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: T.muted, fontStretch: "125%" }}>
          Top 3
        </span>
      </div>
      {children}
    </section>
  )
}

type Entry = { position: number; name: string; subtitle: string; color: string | null; avatar: ReactNode; points: number }

function Podium({ entries }: { entries: Entry[] }) {
  return (
    <div className="grid grid-cols-3 items-end gap-1.5 px-3 pt-5">
      {[2, 1, 3].map((position) => {
        const e = entries.find((x) => x.position === position)
        const height = position === 1 ? "min-h-28" : position === 2 ? "min-h-20" : "min-h-16"
        return (
          <div key={position} className="min-w-0 text-center" style={{ "--podium": e?.color ?? T.border } as CSSProperties}>
            <div className="flex min-h-24 flex-col items-center justify-end gap-1.5 pb-2.5">
              {e && (
                <>
                  {e.avatar}
                  <span className="text-xs font-semibold leading-snug" style={{ fontStretch: "87.5%" }}>
                    {e.name}
                  </span>
                  <span className="text-[10px] leading-snug" style={{ color: T.muted }}>
                    {e.subtitle}
                  </span>
                </>
              )}
            </div>
            <div
              className={`${height} rounded-t-md border-t-[3px] px-1 py-2.5`}
              style={{
                borderColor: "var(--podium)",
                background: `linear-gradient(180deg, color-mix(in srgb, var(--podium) 14%, ${T.surface}), ${T.surface})`,
              }}
            >
              <span
                className="block text-xl font-extrabold italic leading-none"
                style={{ color: position === 1 ? T.text : T.muted, fontStretch: "125%" }}
              >
                {position}
              </span>
              <div className="mt-1.5 font-[family-name:var(--font-f1-mono)] text-xs font-bold tabular-nums">
                {e?.points ?? "—"} <span className="text-[9px] font-normal" style={{ color: T.muted }}>PTS</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DriverAvatar({ name, code, headshotUrl, color }: { name: string; code: string | null; headshotUrl: string | null; color: string | null }) {
  const ring = color ?? T.border
  return (
    <span
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 text-[11px] font-semibold"
      style={{ borderColor: ring, backgroundColor: T.surface }}
    >
      {headshotUrl ? (
        <img src={headshotUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        code ?? name.split(" ").map((p) => p[0]).slice(0, 2).join("")
      )}
    </span>
  )
}

function TeamBadge({ name, color, logoUrl }: { name: string; color: string | null; logoUrl: string | null }) {
  const c = color ?? T.muted
  const words = name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/).filter(Boolean)
  const abbr = words.length > 1 ? words.map((w) => w[0]).join("").slice(0, 3) : (words[0] ?? "").slice(0, 3)
  return (
    <span
      className="inline-flex h-11 w-11 items-center justify-center rounded-md p-1.5 text-xs font-semibold uppercase"
      style={{ backgroundColor: `${c}22`, color: c }}
    >
      {logoUrl ? <img src={logoUrl} alt={name} className="h-full w-full object-contain" /> : abbr}
    </span>
  )
}

export function DriverPodium({ drivers }: { drivers: F1DriverStanding[] }) {
  return (
    <Card title="Drivers">
      <Podium
        entries={drivers.map((d) => ({
          position: d.position,
          name: d.name,
          subtitle: d.teamName,
          color: d.color,
          points: d.points,
          avatar: <DriverAvatar name={d.name} code={d.code} headshotUrl={d.headshotUrl} color={d.color} />,
        }))}
      />
    </Card>
  )
}

export function ConstructorPodium({ constructors }: { constructors: F1ConstructorStanding[] }) {
  return (
    <Card title="Constructors">
      <Podium
        entries={constructors.map((c) => ({
          position: c.position,
          name: c.name,
          subtitle: "Constructor",
          color: c.color,
          points: c.points,
          avatar: <TeamBadge name={c.name} color={c.color} logoUrl={c.logoUrl} />,
        }))}
      />
    </Card>
  )
}

const W = 320
const PAD = { top: 14, right: 18, bottom: 22, left: 26 }
const AVATAR_R = 11

export function StandingsChart({ lanes, season }: { lanes: F1Lane[]; season: number }) {
  const uid = useId().replace(/:/g, "")
  const all = lanes.flatMap((l) => l.points)
  if (!all.length) return null
  const minR = Math.min(...all.map((p) => p.round))
  const maxR = Math.max(minR + 1, ...all.map((p) => p.round))
  const maxP = Math.max(2, ...all.map((p) => p.position))
  const plotH = Math.max(200, (maxP - 1) * (AVATAR_R * 2 + 4))
  const H = PAD.top + plotH + PAD.bottom
  const x = (r: number) => PAD.left + ((r - minR) / (maxR - minR)) * (W - PAD.left - PAD.right)
  const y = (p: number) => PAD.top + ((p - 1) / Math.max(1, maxP - 1)) * plotH

  // Teammates share a colour, so the second car of each team is dashed.
  const seen = new Set<string>()
  const dashed = new Set<string>()
  for (const l of lanes) {
    const c = l.color.toLowerCase()
    if (seen.has(c)) dashed.add(l.driverId)
    else seen.add(c)
  }
  const markers = lanes
    .map((lane) => {
      const last = [...lane.points].sort((a, b) => a.round - b.round).at(-1)!
      return { lane, cx: x(last.round), cy: y(last.position) }
    })
    .reverse()
  const yTicks = maxP <= 7 ? Array.from({ length: maxP }, (_, i) => i + 1) : [...new Set([1, Math.round((1 + maxP) / 2), maxP])]
  const xTicks = [...new Set([minR, Math.round((minR + maxR) / 2), maxR])]

  return (
    <div
      className="w-[320px] rounded-xl border p-3 font-[family-name:var(--font-f1-sans)]"
      style={{ backgroundColor: T.surface, borderColor: T.border, color: T.text }}
    >
      <div className="mb-2 flex items-center justify-between text-[10px]">
        <span className="uppercase tracking-wider" style={{ color: T.muted }}>
          Standings by round
        </span>
        <span>{season} season</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Drivers' championship position after each round, ${season}`}>
        <defs>
          {markers.map((m, i) =>
            m.lane.headshotUrl ? (
              <clipPath key={i} id={`hc-${uid}-${i}`}>
                <circle cx={m.cx} cy={m.cy} r={AVATAR_R - 1.5} />
              </clipPath>
            ) : null
          )}
        </defs>
        {yTicks.map((p) => (
          <g key={p}>
            <text x={PAD.left - 6} y={y(p) + 3} textAnchor="end" fill={T.muted} fontSize={9} fontFamily="var(--font-f1-mono)">
              P{p}
            </text>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(p)} y2={y(p)} stroke={T.border} strokeWidth={0.5} />
          </g>
        ))}
        {xTicks.map((r) => (
          <text key={r} x={x(r)} y={H - 5} textAnchor="middle" fill={T.muted} fontSize={9} fontFamily="var(--font-f1-mono)">
            R{r}
          </text>
        ))}
        {lanes.map((lane) => (
          <path
            key={lane.driverId}
            d={[...lane.points]
              .sort((a, b) => a.round - b.round)
              .map((p, i) => `${i ? "L" : "M"} ${x(p.round)} ${y(p.position)}`)
              .join(" ")}
            fill="none"
            stroke={lane.color}
            strokeWidth={1.5}
            strokeDasharray={dashed.has(lane.driverId) ? "5 3" : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {markers.map((m, i) => (
          <g key={m.lane.driverId}>
            <circle cx={m.cx} cy={m.cy} r={AVATAR_R} fill={T.surface} />
            {m.lane.headshotUrl ? (
              <image
                href={m.lane.headshotUrl}
                x={m.cx - (AVATAR_R - 1.5)}
                y={m.cy - (AVATAR_R - 1.5)}
                width={(AVATAR_R - 1.5) * 2}
                height={(AVATAR_R - 1.5) * 2}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#hc-${uid}-${i})`}
              />
            ) : (
              <text x={m.cx} y={m.cy} textAnchor="middle" dominantBaseline="central" fill={T.text} fontSize={7} fontWeight={600}>
                {m.lane.code ?? m.lane.name.slice(0, 3).toUpperCase()}
              </text>
            )}
            <circle cx={m.cx} cy={m.cy} r={AVATAR_R} fill="none" stroke={m.lane.color} strokeWidth={1.5} />
          </g>
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1">
        {lanes.map((lane) => (
          <span key={lane.driverId} className="flex items-center gap-1 text-[10px]">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={dashed.has(lane.driverId) ? { border: `1.5px solid ${lane.color}` } : { backgroundColor: lane.color }}
            />
            {lane.code ?? lane.name}
          </span>
        ))}
      </div>
    </div>
  )
}
