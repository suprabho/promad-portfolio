import { motion } from "framer-motion"
import { PHASE } from "../content"
import type { TimelineBox } from "../content"

export function PhaseBox({ box }: { box: TimelineBox }) {
  const cfg = PHASE[box.phase]
  const isCurrent = !!box.label

  return (
    <motion.div
      className="relative rounded-md flex flex-col justify-center transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        flex: box.flex,
        padding: isCurrent ? "1rem 1.2rem" : "1rem 0.75rem",
        marginLeft: "2px",
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        minWidth: 0,
        cursor: "default",
      }}
      whileHover={{ background: cfg.hoverBg, borderColor: cfg.hoverBorder }}
      transition={{ duration: 0.3 }}
    >
      {isCurrent ? (
        <>
          <p className="text-[0.6rem] tracking-[0.15em] uppercase mb-1" style={{ color: cfg.color }}>
            {box.label}
          </p>
          <p className="font-serif italic font-semibold text-lg leading-snug text-[#f0ede6]">
            {box.title}
          </p>
          {box.companies && (
            <p className="text-[0.72rem] mt-1 leading-relaxed" style={{ color: "#8a8690" }}>
              {box.companies}
            </p>
          )}
          {box.skills && (
            <div className="flex flex-wrap gap-1 mt-2">
              {box.skills.map((s) => (
                <span
                  key={s}
                  className="text-[0.58rem] px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#8a8690" }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </>
      ) : (
        <p
          className="font-serif italic truncate text-center"
          style={{ fontSize: box.shortFontSize, opacity: box.shortOpacity, color: "#f0ede6" }}
        >
          {box.shortName}
        </p>
      )}
    </motion.div>
  )
}
