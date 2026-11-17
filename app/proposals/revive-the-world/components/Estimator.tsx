"use client"

import { useId, useState } from "react"
import { DEFAULT_TEASER, TEASER_TIERS, TRACK_A, bundleTotal, formatINR } from "../content"

const FIELD =
  "w-full rounded-lg border-[1.5px] border-motion-yellow-foreground bg-white px-2.5 py-2 text-[15px] text-motion-yellow-foreground focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-motion-yellow-foreground"

export function Estimator() {
  const id = useId()
  const [quantities, setQuantities] = useState<Record<string, string>>(() =>
    Object.fromEntries(TRACK_A.map((item) => [item.id, String(item.qty)])),
  )
  const [teaser, setTeaser] = useState(DEFAULT_TEASER)
  const [rush, setRush] = useState(false)
  const [extraRevision, setExtraRevision] = useState(false)

  const trackA = TRACK_A.reduce(
    (sum, item) => sum + Math.max(0, Number.parseInt(quantities[item.id], 10) || 0) * item.rate,
    0,
  )
  const lines: [string, string][] = [
    ["Track A · library", formatINR(trackA)],
    ["Track B · teaser", formatINR(teaser)],
  ]
  const base = bundleTotal(trackA, teaser)
  const discount = trackA + teaser - base
  if (discount > 0) lines.push(["Bundle discount (~5%)", `−${formatINR(discount)}`])

  let total = base
  if (rush) {
    lines.push(["Rush +25%", formatINR(base * 0.25)])
    total += base * 0.25
  }
  if (extraRevision) {
    lines.push(["Extra revision round +10%", formatINR(base * 0.1)])
    total += base * 0.1
  }

  return (
    <div
      id="estimate"
      className="grid gap-6 rounded-2xl bg-motion-yellow p-[clamp(20px,3vw,32px)] text-motion-yellow-foreground min-[761px]:grid-cols-[1.15fr_0.85fr] print:hidden"
    >
      <div>
        <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">Build your own scope</h3>
        <p className="mt-1.5 text-[14px] text-[#3a3a00]">
          Change the quantities to see the total update. We&apos;ll confirm a fixed quote after reviewing your
          screens.
        </p>

        <div className="mt-[18px] grid gap-2">
          {TRACK_A.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_88px] items-center gap-2.5 text-[14px]">
              <label htmlFor={`${id}-${item.id}`}>
                {item.label}
                <small className="block font-motion-mono text-[11.5px] text-[#3a3a00]">
                  {formatINR(item.rate)} {item.rateNote}
                </small>
              </label>
              <input
                id={`${id}-${item.id}`}
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                value={quantities[item.id]}
                onChange={(event) => setQuantities((current) => ({ ...current, [item.id]: event.target.value }))}
                className={FIELD}
              />
            </div>
          ))}
        </div>

        <label className="mt-3.5 grid gap-[5px] text-[12px] font-bold uppercase tracking-[0.08em]">
          Concept teaser
          <select
            value={teaser}
            onChange={(event) => setTeaser(Number(event.target.value))}
            className={`${FIELD} normal-case tracking-normal`}
          >
            <option value={0}>No teaser</option>
            {TEASER_TIERS.map((tier) => (
              <option key={tier.value} value={tier.value}>
                {tier.option}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2.5">
          <label className="flex items-center gap-[7px] text-[14px]">
            <input
              type="checkbox"
              checked={rush}
              onChange={(event) => setRush(event.target.checked)}
              className="size-4 accent-motion-yellow-foreground"
            />
            Rush (+25%)
          </label>
          <label className="flex items-center gap-[7px] text-[14px]">
            <input
              type="checkbox"
              checked={extraRevision}
              onChange={(event) => setExtraRevision(event.target.checked)}
              className="size-4 accent-motion-yellow-foreground"
            />
            One extra revision round (+10%)
          </label>
        </div>
      </div>

      <div aria-live="polite" className="flex flex-col rounded-xl bg-[#141412] p-[22px] text-[#F3F3E9]">
        <span className="text-[12px] uppercase tracking-[0.12em] text-[#a3a392]">Estimated total</span>
        <div className="mt-2 font-motion-mono text-[clamp(34px,4vw,48px)] font-semibold leading-none tracking-[-0.03em]">
          {formatINR(total)}
        </div>
        <ul className="mt-[18px] space-y-1.5 border-t border-[#333] pt-3 font-motion-mono text-[13px] text-[#cfcfc2]">
          {lines.map(([label, value]) => (
            <li key={label} className="flex justify-between gap-3">
              <span>{label}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-4 text-[12px] text-[#8a8a7c]">
          Excludes GST, voice-over, music and stock licences. The bundle discount (about 5%, rounded down to the
          nearest ₹10,000) applies when both tracks are booked together.
        </p>
      </div>
    </div>
  )
}
