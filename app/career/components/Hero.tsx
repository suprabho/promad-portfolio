import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-8 overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 -z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(78,205,196,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(167,139,250,0.04) 0%, transparent 50%)",
        }}
        animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.p
        className="text-[0.7rem] tracking-[0.35em] uppercase mb-8"
        style={{ color: "#5a5660" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        An Ever-Expanding Web Of Interest
      </motion.p>

      <motion.h1
        className="font-serif italic font-semibold leading-[1.1] tracking-tight mb-6"
        style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.02em" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Suprabho Dhenki
        <br />
        <em style={{ color: "#4ECDC4" }}>The Evolution of a Designer</em>
      </motion.h1>

      <motion.p
        className="max-w-lg leading-relaxed"
        style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)", color: "#8a8690" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        From crafting user experiences to building products, managing programs, writing code,
        and founding a creative studio — a career that never stopped widening.
      </motion.p>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        style={{ color: "#5a5660" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-[0.65rem] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, #5a5660, transparent)" }}
          animate={{ scaleY: [0.7, 1, 0.7], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
