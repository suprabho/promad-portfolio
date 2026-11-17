import { SCOPE } from "../content"
import { Lede, RailSection } from "./ui"

export function BriefSection() {
  return (
    <RailSection id="brief" number="01" title="What you asked for" chip="2 tracks · 6 workstreams">
      <Lede>
        You already have the UI/UX and the product direction. What&apos;s missing is the motion that makes
        planting a tree feel rewarding, and a film that explains RTW in under two minutes. We see this as two
        tracks that share one motion language.
      </Lede>
      <p className="max-w-[66ch]">
        We&apos;re Promad, a small design and engineering studio from India. We&apos;ve been building motion for
        products for over seven years: micro-interaction libraries at 1mg and ClearTax, a Rive mascot with
        fourteen states for Kidzovo, and launch films for Merkle Science and Microsoft. Because the people who
        animate also write front-end code, every file we hand over is built around how your Flutter code will
        trigger it.
      </p>

      {/* The 1.5px gaps let the line colour show through as cell dividers */}
      <div className="grid gap-[1.5px] overflow-hidden rounded-xl border-[1.5px] border-motion-line bg-motion-line min-[641px]:grid-cols-2">
        {SCOPE.map((item) => (
          <div key={item.key} className="bg-motion-surface px-[22px] pb-6 pt-[22px]">
            <h3 className="flex items-baseline gap-2.5 text-balance text-[18px] font-bold tracking-[-0.015em]">
              <span className="font-motion-mono text-[12px] font-medium text-motion-muted">{item.key}</span>
              {item.title}
            </h3>
            <p className="mt-2 text-[15px] text-motion-muted">{item.description}</p>
            <p className="mt-3 font-motion-mono text-[13px]">
              {item.prefix && <>{item.prefix} </>}
              {item.rates.map((rate, index) => (
                <span key={rate}>
                  {index > 0 && " · "}
                  <b className="rounded-[3px] bg-motion-yellow px-1.5 py-0.5 font-semibold text-motion-yellow-foreground">
                    {rate}
                  </b>
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-[1.5px] border-motion-leaf bg-motion-leaf-soft px-5 py-[18px] text-[15px]">
        <b className="text-motion-leaf">Flutter integration is included in Track A</b>, not bolted on at the end:
        a naming convention agreed on day one, size budgets per asset, a sample widget per Rive component, and
        pairing hours with your developers.
      </div>
    </RailSection>
  )
}
