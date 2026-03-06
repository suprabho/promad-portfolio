import { motion } from "framer-motion"
import { Reveal } from "./Reveal"
import { TOOL_FRAGMENTS } from "../content"

export function ProblemBlock() {
  return (
    <div className="mb-24">
      <Reveal>
        <p
          className="text-[0.65rem] tracking-[0.3em] uppercase mb-6"
          style={{ color: "#EF4444", opacity: 0.7 }}
        >
          The Problem
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <h2
          className="font-serif italic font-semibold leading-snug mb-8"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          A designer's process is{" "}
          <span style={{ color: "#EF4444", opacity: 0.85 }}>fragmented across 12+ tools</span>{" "}
          that don't talk to each other
        </h2>
      </Reveal>
      <Reveal delay={0.3}>
        <p
          className="leading-relaxed mb-12 max-w-[720px]"
          style={{ fontSize: "1.05rem", color: "var(--career-text-secondary)" }}
        >
          From requirement gathering and hypothesis validation, through secondary research and
          solution brainstorming, to information architecture, user flows, stakeholder alignment,
          developer handoff, QA, feature marketing, performance analytics, A/B testing, and app
          store optimization — every phase lives in a different tool, a different context, a
          different mental model. The work is continuous. The tools are not.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <div
          className="grid gap-[3px] mb-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
        >
          {TOOL_FRAGMENTS.map((f, i) => (
            <motion.div
              key={i}
              className="relative rounded overflow-hidden text-center backdrop-blur-xl"
              style={{ background: "var(--career-backdrop-bg)", border: "1px solid var(--career-card-border)", padding: "0.8rem" }}
              whileHover={{ y: -2, borderColor: "rgba(239,68,68,0.3)" }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#EF4444] opacity-[0.3]" />
              <div className="text-xl mb-1 opacity-60">{f.icon}</div>
              <div
                className="text-[0.6rem] tracking-[0.08em] uppercase leading-snug"
                style={{ color: "var(--career-text-muted)" }}
              >
                {f.label}
              </div>
              <div className="text-[0.8rem] mt-1 text-[#EF4444]">
                {f.tool}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.6}>
        <p className="text-[0.7rem] text-center italic" style={{ color: "var(--career-text-muted)" }}>
          12 steps. 12+ tools. Zero continuity.
        </p>
      </Reveal>
    </div>
  )
}
