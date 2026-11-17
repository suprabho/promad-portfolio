import { cn } from "@/lib/utils"
import {
  ADD_ONS,
  DEFAULT_TEASER,
  TEASER_TIERS,
  TRACK_A,
  TRACK_A_ASSET_COUNT,
  TRACK_A_TOTAL,
  bundleTotal,
  formatINR,
} from "../content"
import { Estimator } from "./Estimator"
import { Lede, Note, RailSection, SubHeading, TD, TH, TableFrame } from "./ui"

const AMOUNT = "whitespace-nowrap text-right font-motion-mono font-semibold"
const QTY = "whitespace-nowrap font-motion-mono text-motion-muted"

export function PricingSection() {
  const summary = [
    { label: "A · Animation library", value: TRACK_A_TOTAL },
    { label: "B · Concept teaser", value: DEFAULT_TEASER },
    { label: "Both tracks", value: TRACK_A_TOTAL + DEFAULT_TEASER },
    { label: "Bundle price", value: bundleTotal(TRACK_A_TOTAL, DEFAULT_TEASER), highlight: true },
  ]

  return (
    <RailSection id="pricing" number="04" title="Rate card & estimate" chip="INR · excl. GST">
      <Lede>
        Every line uses our standard motion rates: <b>per asset</b> for the library and{" "}
        <b>per finished second</b> for the teaser. Quantities are based on a typical scope for an app like RTW,
        and we&apos;ll lock them against your screens before we start.
      </Lede>

      <div className="grid grid-cols-2 gap-2.5 min-[641px]:grid-cols-4">
        {summary.map((slab) => (
          <div
            key={slab.label}
            className={cn(
              "rounded-[10px] border-[1.5px] p-3.5",
              slab.highlight
                ? "border-[#E4EC00] bg-motion-yellow text-motion-yellow-foreground"
                : "border-motion-line bg-motion-surface",
            )}
          >
            <div className={cn("text-[13px]", slab.highlight ? "text-[#3a3a00]" : "text-motion-muted")}>
              {slab.label}
            </div>
            <div className="mt-1 font-motion-mono text-[24px] font-semibold">{formatINR(slab.value)}</div>
          </div>
        ))}
      </div>

      <div>
        <SubHeading>Track A · Lottie &amp; Rive animation library</SubHeading>
        <TableFrame tableClassName="min-w-[680px]">
          <thead>
            <tr>
              <th className={TH}>Item</th>
              <th className={TH}>What&apos;s included</th>
              <th className={TH}>Qty × rate</th>
              <th className={cn(TH, "text-right")}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {TRACK_A.map((item) => (
              <tr key={item.id}>
                <td className={cn(TD, "min-w-[170px]")}>
                  <b>{item.title}</b>
                  <small className="mt-0.5 block text-[13px] text-motion-muted">{item.tag}</small>
                </td>
                <td className={TD}>{item.description}</td>
                <td className={cn(TD, QTY)}>
                  {item.qty}
                  {item.unit === "h" ? " h" : ""} × {formatINR(item.rate)}
                </td>
                <td className={cn(TD, AMOUNT)}>{formatINR(item.qty * item.rate)}</td>
              </tr>
            ))}
            <tr className="bg-motion-surface-2 font-bold">
              <td colSpan={3} className={TD}>
                Track A total · {TRACK_A_ASSET_COUNT} animated assets
              </td>
              <td className={cn(TD, AMOUNT)}>{formatINR(TRACK_A_TOTAL)}</td>
            </tr>
          </tbody>
        </TableFrame>
      </div>

      <div>
        <SubHeading>Track B · Concept teaser video, priced per finished second</SubHeading>
        <div className="grid gap-3.5 min-[901px]:grid-cols-3">
          {TEASER_TIERS.map((tier) => (
            <div
              key={tier.title}
              className={cn(
                "flex flex-col rounded-[14px] border-[1.5px] bg-motion-surface p-[22px]",
                tier.recommended
                  ? "border-motion-ink shadow-[0_10px_30px_rgba(20,20,18,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                  : "border-motion-line",
              )}
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-motion-muted">{tier.kicker}</span>
              <h4 className="mt-1.5 text-[21px] font-extrabold tracking-[-0.02em]">{tier.title}</h4>
              <div className="mt-3.5 whitespace-nowrap font-motion-mono text-[clamp(28px,2.6vw,34px)] font-semibold leading-none tracking-[-0.03em]">
                {tier.price}{" "}
                <small className="whitespace-nowrap text-[14px] font-medium tracking-normal text-motion-muted">{tier.per}</small>
              </div>
              <div className="mt-1.5 font-motion-mono text-[12.5px] text-motion-muted">{tier.rate}</div>
              <p className="mt-3.5 text-[14.5px]">{tier.pitch}</p>
              <ul className="mt-3.5 space-y-[7px] border-t-[1.5px] border-motion-line pt-3.5 text-[14px] text-motion-muted">
                {tier.includes.map((line) => (
                  <li key={line} className="relative pl-[18px]">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.55em] size-[9px] rounded-[2px] border-[1.5px] border-[#141412] bg-motion-yellow"
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-4 text-[13px] text-motion-muted">
                {tier.bestFor[0]}
                <b className="font-motion-mono font-semibold text-motion-foreground">{tier.bestFor[1]}</b>
                {tier.bestFor[2]}
              </p>
            </div>
          ))}
        </div>
        <Note className="mt-2.5">
          Voice-over, licensed music and stock elements are billed at cost and are usually ₹15,000–₹40,000 for a
          teaser like this. A full 3D production would be quoted separately.
        </Note>
      </div>

      <div>
        <SubHeading>Add-ons and adjustments</SubHeading>
        <TableFrame>
          <tbody>
            {ADD_ONS.map((addOn) => (
              <tr key={addOn.title}>
                <td className={TD}>
                  <b>{addOn.title}</b>
                  {addOn.detail && <> {addOn.detail}</>}
                </td>
                <td className={cn(TD, AMOUNT)}>
                  {addOn.price}
                  {addOn.unit && (
                    <span className="font-normal text-[12.5px] text-motion-muted"> {addOn.unit}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </TableFrame>
      </div>

      <Estimator />
    </RailSection>
  )
}
