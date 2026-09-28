import { boomShare, ringDots } from "@/lib/boom-ring"
import { vizmayaFontVars } from "@/lib/vizmaya-fonts"
import type { DailyEdition } from "@/lib/vizmaya"

const SERIES_URL = "https://vizmaya.fyi/ai-daily/doom-v-boom"

// The edition's dark palette (apps/vizmaya-fyi/app/ai-daily/doom-v-boom/edition.css).
const C = {
  surface: "#0b0e12",
  bone: "#dbe7f0",
  muted: "#8b98a5",
  dim: "#5f6b76",
  line: "#232b33",
  accent: "#22d3ee",
  boom: "#4ade80",
  doom: "#f87171",
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** 'Mon 28 Sep' */
function formatDate(date: string) {
  const d = new Date(`${date}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return date
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`
}

/** 'Boom-leaning', 'Doom, clearly', … — the same words vizmaya.fyi uses. */
function moodWord(score: number | null) {
  if (score == null) return "Unscored"
  const a = Math.abs(score)
  if (a < 0.1) return "Balanced"
  const side = score > 0 ? "Boom" : "Doom"
  return side + (a < 0.3 ? "-leaning" : a < 0.6 ? ", clearly" : ", decisively")
}

function toneColor(score: number | null) {
  if (score == null) return C.muted
  return score > 0.1 ? C.boom : score < -0.1 ? C.doom : C.muted
}

function formatSigned(v: number | null) {
  if (v == null) return "—"
  const sign = v > 0 ? "+" : v < 0 ? "−" : ""
  return `${sign}${Math.abs(v).toFixed(2)}`
}

const DOTS = ringDots(120)

function ScoreRing({ score }: { score: number | null }) {
  const share = score == null ? null : boomShare(score)
  return (
    <span className="relative grid aspect-square w-24 shrink-0 place-items-center md:w-28">
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full">
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r * 1.7}
            fill={share == null ? C.dim : d.u < share ? C.boom : C.doom}
            opacity={share == null ? 0.5 : 0.9}
          />
        ))}
      </svg>
      <span
        className="relative font-[family-name:var(--font-vz-serif)] text-3xl tabular-nums md:text-4xl"
        style={{ color: C.bone }}
      >
        {share == null ? "—" : Math.round(share * 100)}
      </span>
    </span>
  )
}

/** The latest three Doom v Boom editions: each morning's Boom Score ring and headline. */
export function AiDailySection({ editions }: { editions: DailyEdition[] }) {
  if (!editions.length) return null

  return (
    <section className={`relative z-10 bg-[#0C0C10] pb-16 text-[#F4F1EC] md:pb-24 ${vizmayaFontVars}`}>
      <div className="container mx-auto border-t border-white/10 px-4 pt-12">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
          <span className="inline-flex items-center gap-2.5 font-[family-name:var(--font-vz-mono)] text-[10.5px] uppercase tracking-[0.22em] text-[#0BBFAB]">
            <span className="h-px w-4 bg-current" />
            AI Daily · Doom v Boom
          </span>
          <a
            href={SERIES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-vz-mono)] text-[10px] uppercase tracking-[0.14em] underline-offset-4 hover:underline"
          >
            Every edition →
          </a>
        </div>
        <p className="mb-6 max-w-[62ch] text-sm leading-relaxed text-[#F4F1EC]/60">
          Each morning vizmaya reads the previous day of AI data-centre, energy
          and sustainability news and scores it: a Boom Score out of 100, where
          50 is balanced.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {editions.map((e, i) => (
            <a
              key={e.date}
              href={`${SERIES_URL}/${e.date}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-5 rounded-lg border border-[#232b33] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22d3ee]/40 md:p-6"
              style={{ backgroundColor: C.surface, color: C.bone }}
            >
              <div
                className="flex justify-between font-[family-name:var(--font-vz-mono)] text-[9.5px] uppercase tracking-[0.14em]"
                style={{ color: C.muted }}
              >
                <span>{i === 0 ? `Latest · ${formatDate(e.date)}` : formatDate(e.date)}</span>
                {e.number != null && <span>№ {e.number}</span>}
              </div>
              <div className="flex items-center gap-4">
                <ScoreRing score={e.moodScore} />
                <span className="grid gap-1.5">
                  <span
                    className="font-[family-name:var(--font-vz-mono)] text-[9px] uppercase tracking-[0.12em]"
                    style={{ color: C.muted }}
                  >
                    Boom Score{e.moodScore != null ? " / 100" : ""}
                  </span>
                  <span
                    className="font-[family-name:var(--font-vz-serif)] text-lg leading-tight md:text-xl"
                    style={{ color: toneColor(e.moodScore) }}
                  >
                    {moodWord(e.moodScore)}
                  </span>
                  <span
                    className="font-[family-name:var(--font-vz-mono)] text-[11px]"
                    style={{ color: C.dim }}
                  >
                    {formatSigned(e.moodScore)}
                  </span>
                </span>
              </div>
              <h3 className="text-pretty font-[family-name:var(--font-vz-serif)] text-lg font-medium leading-snug md:text-xl">
                {e.headline}
              </h3>
              <span
                className="mt-auto font-[family-name:var(--font-vz-mono)] text-[9.5px] uppercase tracking-[0.14em]"
                style={{ color: C.accent }}
              >
                Read the edition →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
