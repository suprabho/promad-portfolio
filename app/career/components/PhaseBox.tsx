import { motion } from "framer-motion"
import { PHASE } from "../content"
import type { TimelineBox } from "../content"

export function PhaseBox({ box }: { box: TimelineBox }) {
  const cfg = PHASE[box.phase]

  return (
    <motion.div
      className="relative rounded-md flex flex-col backdrop-blur-xl justify-center transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        flex: box.flex,
        padding: "1rem 0.75rem",
        marginLeft: "2px",
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        minWidth: 0,
        cursor: "default",
      }}
      whileHover={{ background: cfg.hoverBg, borderColor: cfg.hoverBorder }}
      transition={{ duration: 0.3 }}
    >
      <p
        className="font-serif italic text-center text-[0.65rem] sm:text-sm break-words"
        style={{ color: "var(--career-text)", opacity: 0.6 }}
      >
        {box.shortName}
      </p>
    </motion.div>
  )
}
