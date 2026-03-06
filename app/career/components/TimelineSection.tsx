import { motion } from "framer-motion"
import { Reveal } from "./Reveal"
import { PhaseBox } from "./PhaseBox"
import { TIMELINE, PHASE } from "../content"

export function TimelineSection() {
  return (
    <section className="py-8 pb-28 px-6 max-w-[1100px] mx-auto">
      <div className="text-center mb-20">
        <Reveal>
          <h2
            className="font-serif italic font-semibold"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
          >
            The Expanding Field
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-[0.8rem] tracking-[0.15em] uppercase mt-3" style={{ color: "var(--career-text-muted)" }}>
            Each phase didn't replace the last — it added a new dimension
          </p>
        </Reveal>
      </div>

      <div className="relative flex flex-col gap-0">
        {/* Vertical connector */}
        <div
          className="absolute top-0 bottom-0 w-px pointer-events-none left-[120px] md:left-[240px]"
          style={{
            background:
              "linear-gradient(to bottom, #4ECDC4, #FF6B6B 20%, #A78BFA 40%, #F59E0B 60%, #34D399 80%, #F472B6)",
            opacity: 0.15,
          }}
        />

        {TIMELINE.map((row, rowIdx) => {
          const currentBox = row.boxes.find((b) => !!b.label)
          const currentCfg = currentBox ? PHASE[currentBox.phase] : null

          return (
            <motion.div
              key={rowIdx}
              className="flex items-stretch"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: row.delay }}
            >
              {/* Year + current phase details */}
              <div
                className="flex-shrink-0 flex flex-col justify-center pt-5 w-[120px] md:w-[240px]"
              >
                <p className="text-[0.7rem] tracking-[0.1em] tabular-nums" style={{ color: "var(--career-text-muted)" }}>
                  {row.year}
                </p>
                {currentBox && currentCfg && (
                  <div className="mt-2">
                    <p className="text-[0.6rem] tracking-[0.15em] uppercase mb-1" style={{ color: currentCfg.color }}>
                      {currentBox.label}
                    </p>
                    <p className="font-serif italic font-semibold text-lg leading-snug" style={{ color: "var(--career-text)" }}>
                      {currentBox.title}
                    </p>
                    {currentBox.companies && (
                      <p className="text-[0.72rem] mt-1 leading-relaxed" style={{ color: "var(--career-text-secondary)" }}>
                        {currentBox.companies}
                      </p>
                    )}
                    {currentBox.skills && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {currentBox.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[0.58rem] px-1.5 py-0.5 rounded-full"
                            style={{ background: "var(--career-subtle-bg)", color: "var(--career-text-secondary)" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Phase track boxes */}
              <div
                className="timeline-track flex min-h-[72px]"
                style={{ width: row.trackWidth }}
              >
                {row.boxes.map((box, boxIdx) => (
                  <PhaseBox key={boxIdx} box={box} />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
