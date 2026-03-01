import Link from "next/link"

export function CareerNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(10,10,12,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <Link
        href="/"
        className="text-xs tracking-[0.2em] uppercase transition-colors"
        style={{ color: "#5a5660" }}
      >
        ← promad.design
      </Link>
      <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#5a5660" }}>
        Career Evolution
      </span>
    </nav>
  )
}
