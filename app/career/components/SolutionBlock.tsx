import { motion } from "framer-motion"
import { Reveal } from "./Reveal"
import { SOLUTION_UNITS } from "../content"

export function SolutionBlock() {
  return (
    <div className="py-12 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <Reveal>
        <p
          className="text-[0.65rem] tracking-[0.3em] uppercase mb-6"
          style={{ color: "#4ECDC4", opacity: 0.7 }}
        >
          What I'm Building
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <h2
          className="font-serif italic font-semibold leading-snug mb-3"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
        >
          Units of design that compound across phases
        </h2>
      </Reveal>
      <Reveal delay={0.25}>
        <p
          className="leading-relaxed mb-12 max-w-[680px]"
          style={{ fontSize: "1rem", color: "#8a8690" }}
        >
          Instead of waiting for one tool to rule them all, I've been building small, sharp
          tools — each one closing a specific gap in my workflow. Each one a "unit" that
          makes the next phase faster.
        </p>
      </Reveal>

      <div className="flex flex-col gap-6">
        {SOLUTION_UNITS.map((unit, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <motion.div
              className="relative rounded-xl overflow-hidden backdrop-blur-3xl bg-[#111114]/60"
              style={{ border: "1px solid #1e1e24" }}
              whileHover={{ y: -2, borderColor: "#2a2a32" }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                style={{ background: unit.accent }}
              />
              <div className="grid md:grid-cols-[80px_1fr] gap-6 p-6">
                <div className="font-serif text-[2.5rem] leading-none" style={{ opacity: 0.15 }}>
                  {unit.num}
                </div>
                <div>
                  <h3 className="font-serif italic font-semibold text-xl mb-3">{unit.title}</h3>
                  <p className="text-[0.8rem] leading-relaxed mb-3" style={{ color: "#5a5660" }}>
                    {unit.problem}
                  </p>
                  <p className="text-[0.85rem] leading-relaxed mb-4" style={{ color: "#8a8690" }}>
                    {unit.solution}
                  </p>
                  <span
                    className="inline-block text-[0.7rem] px-3 py-1 rounded-full font-medium"
                    style={{ background: unit.accentBg, color: unit.accent }}
                  >
                    {unit.impact}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {unit.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[0.6rem] px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(255,255,255,0.04)", color: "#5a5660" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Vision block */}
      <Reveal delay={0.3}>
        <div
          className="mt-16 relative rounded-xl text-center overflow-hidden"
          style={{ background: "#111114", border: "1px solid #1e1e24", padding: "3rem" }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(to right, #4ECDC4, #A78BFA, #F472B6)" }}
          />
          <p className="text-[0.6rem] tracking-[0.3em] uppercase mb-6" style={{ color: "#5a5660" }}>
            The Vision
          </p>
          <p
            className="font-serif italic leading-relaxed mx-auto mb-6 max-w-[640px]"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "#f0ede6" }}
          >
            Design should work like <span style={{ color: "#34D399" }}>code</span> — reliable,
            versioned, continuous. Each tool I build is a step toward a workflow where{" "}
            <span style={{ color: "#A78BFA" }}>design decisions compound</span> instead of being
            scattered. Where the units of your work grow together, phase by phase, tool by tool.
          </p>
          <p className="text-[0.75rem] tracking-[0.1em]" style={{ color: "#5a5660" }}>
            This is where all my expanding fields converge.
          </p>
        </div>
      </Reveal>
    </div>
  )
}
