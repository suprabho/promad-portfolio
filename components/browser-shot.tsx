import Image from "next/image"

/** A product screenshot inside minimal browser chrome. */
export function BrowserShot({
  src,
  alt,
  url,
  width = 1600,
  height = 1000,
  dark = false,
  badge,
  priority,
  className = "",
}: {
  src: string
  alt: string
  url: string
  width?: number
  height?: number
  dark?: boolean
  badge?: string
  priority?: boolean
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-[0_40px_80px_-30px_rgba(12,12,16,0.45)] ${
        dark ? "border-white/10 bg-[#13161d]" : "border-black/10 bg-white"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 border-b px-3.5 py-2 ${
          dark ? "border-white/[0.07]" : "border-black/[0.07] bg-[#2A2824]/[0.04]"
        }`}
      >
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div
          className={`flex-1 truncate rounded px-3 py-0.5 text-center font-mono text-[10px] ${
            dark ? "bg-white/[0.05] text-white/45" : "bg-black/[0.05] text-black/45"
          }`}
        >
          {url}
        </div>
        {badge && (
          <span
            className={`hidden rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider sm:inline ${
              dark ? "border-white/15 text-white/50" : "border-black/15 text-black/45"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="block h-auto w-full"
      />
    </div>
  )
}
