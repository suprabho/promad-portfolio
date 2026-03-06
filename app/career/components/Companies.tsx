import { motion } from "framer-motion"
import { COMPANIES } from "../content"

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export function Companies() {
  return (
    <section className="py-16 px-6 max-w-[900px] mx-auto text-center">
      <p className="text-[0.65rem] tracking-[0.3em] uppercase mb-8" style={{ color: "var(--career-text-muted)" }}>
        Companies & Projects Along The Way
      </p>
      <motion.div
        className="flex flex-wrap justify-center gap-x-8 gap-y-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {COMPANIES.map((name, i) => (
          <motion.span
            key={name}
            className="font-serif italic text-lg"
            style={{ color: "var(--career-text-secondary)" }}
            variants={fadeUp}
            custom={i}
          >
            {name}
            {i < COMPANIES.length - 1 && (
              <span className="ml-8 not-italic" style={{ color: "var(--career-text-muted)", opacity: 0.3 }}>·</span>
            )}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
