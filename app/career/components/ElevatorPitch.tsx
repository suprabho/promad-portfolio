import { Reveal } from "./Reveal"

export function ElevatorPitch() {
  return (
    <section className="py-24 px-8 max-w-[680px] mx-auto text-center">
      <Reveal>
        <blockquote
          className="font-serif italic leading-relaxed relative"
          style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", color: "#f0ede6" }}
        >
          <span
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl not-italic"
            style={{ color: "#4ECDC4", opacity: 0.3 }}
          >
            "
          </span>
          I started by understanding people. Then I learned to move them — with motion, with
          products, with strategy. Every role I've taken didn't replace the last — it expanded
          the canvas. Today I design, manage, code, and build companies, because great products
          need someone who's been on every side of the table.
        </blockquote>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="mt-8 text-[0.75rem] tracking-[0.15em] uppercase" style={{ color: "#5a5660" }}>
          — The elevator pitch
        </p>
      </Reveal>
    </section>
  )
}
