import { motion } from "framer-motion"
import { STATS } from "../content"

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export function Stats() {
  return (
    <section className="py-16 pb-24 px-6 max-w-[900px] mx-auto">
      <motion.div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            className="rounded-lg text-center"
            style={{ background: "var(--career-card-bg)", border: "1px solid var(--career-card-border)", padding: "1.5rem" }}
            variants={fadeUp}
            whileHover={{ y: -2, borderColor: "var(--career-hover-border)" }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="font-serif leading-none mb-2"
              style={{ fontSize: "2.2rem", color: "var(--career-text)" }}
            >
              {stat.number}
            </div>
            <div
              className="text-[0.7rem] tracking-[0.1em] uppercase leading-snug"
              style={{ color: "var(--career-text-muted)" }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
