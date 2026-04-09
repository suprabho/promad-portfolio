import { FOOTER_LINKS } from "../content"

export function CareerFooter() {
  return (
    <footer className="py-12 px-6 text-center" style={{ borderTop: "1px solid var(--career-card-border)" }}>
      <div className="flex justify-center flex-wrap gap-8 mb-6">
        {FOOTER_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.75rem] tracking-[0.1em] uppercase transition-colors"
            style={{ color: "var(--career-text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--career-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--career-text-secondary)")}
          >
            {label}
          </a>
        ))}
      </div>
      <p className="text-[0.65rem]" style={{ color: "#4ECDC4" }}>
        © 2026 Suprabho Dhenki · Built with Promad
      </p>
    </footer>
  )
}
