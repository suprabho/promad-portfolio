import { motion } from "framer-motion"
import { Reveal } from "./Reveal"
import { PhaseBox } from "./PhaseBox"
import { TIMELINE } from "../content"

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
          <p className="text-[0.8rem] tracking-[0.15em] uppercase mt-3" style={{ color: "#5a5660" }}>
            Each phase didn't replace the last — it added a new dimension
          </p>
        </Reveal>
      </div>

      <div className="relative flex flex-col gap-0">
        {/* Vertical connector */}
        <div
          className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{
            left: "80px",
            background:
              "linear-gradient(to bottom, #4ECDC4, #FF6B6B 20%, #A78BFA 40%, #F59E0B 60%, #34D399 80%, #F472B6)",
            opacity: 0.15,
          }}
        />

        {TIMELINE.map((row, rowIdx) => (
          <motion.div
            key={rowIdx}
            className="flex items-stretch"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: row.delay }}
          >
            <div
              className="flex-shrink-0 flex items-start pt-5 text-[0.7rem] tracking-[0.1em] tabular-nums"
              style={{ width: "80px", color: "#5a5660" }}
            >
              {row.year}
            </div>
            <div
              className="timeline-track flex min-h-[72px]"
              style={{ maxWidth: row.trackWidth, flex: 1 }}
            >
              {row.boxes.map((box, boxIdx) => (
                <PhaseBox key={boxIdx} box={box} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
