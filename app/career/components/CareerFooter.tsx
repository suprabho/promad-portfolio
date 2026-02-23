import { FOOTER_LINKS } from "../content"

export function CareerFooter() {
  return (
    <footer className="py-12 px-6 text-center" style={{ borderTop: "1px solid #1e1e24" }}>
      <div className="flex justify-center flex-wrap gap-8 mb-6">
        {FOOTER_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.75rem] tracking-[0.1em] uppercase transition-colors"
            style={{ color: "#8a8690" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ede6")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8690")}
          >
            {label}
          </a>
        ))}
      </div>
      <p className="text-[0.65rem]" style={{ color: "#5a5660" }}>
        © 2026 Suprabho Dhenki · Built with Promad
      </p>
    </footer>
  )
}
