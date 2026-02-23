import { Reveal } from "./Reveal"
import { CODE_WORKS, DESIGN_TOOLS } from "../content"

export function EpiphanyBlock() {
  return (
    <div className="py-12 mb-16 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <Reveal>
        <p
          className="text-[0.65rem] tracking-[0.3em] uppercase mb-6"
          style={{ color: "#4ECDC4", opacity: 0.7 }}
        >
          The Epiphany
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <h2
          className="font-serif italic font-semibold leading-snug mb-8"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
        >
          Since I started writing code, coming back to design tools feels <em>limited</em>
        </h2>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div
            className="rounded-lg p-6"
            style={{ background: "#111114", border: "1px solid rgba(52,211,153,0.2)" }}
          >
            <h4
              className="text-[0.65rem] tracking-[0.2em] uppercase mb-4"
              style={{ color: "#34D399" }}
            >
              How Code Works
            </h4>
            {CODE_WORKS.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 mb-3 text-[0.85rem] leading-relaxed"
                style={{ color: "#8a8690" }}
              >
                <span className="text-[0.75rem] mt-0.5" style={{ color: "#34D399" }}>✦</span>
                {item}
              </div>
            ))}
          </div>

          <div
            className="rounded-lg p-6"
            style={{ background: "#111114", border: "1px solid rgba(239,68,68,0.15)" }}
          >
            <h4
              className="text-[0.65rem] tracking-[0.2em] uppercase mb-4"
              style={{ color: "#EF4444", opacity: 0.7 }}
            >
              How Design Tools Work
            </h4>
            {DESIGN_TOOLS.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 mb-3 text-[0.85rem] leading-relaxed"
                style={{ color: "#8a8690" }}
              >
                <span className="text-[0.75rem] mt-0.5" style={{ color: "#EF4444", opacity: 0.5 }}>✕</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
