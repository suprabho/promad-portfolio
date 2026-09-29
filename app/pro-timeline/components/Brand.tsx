import Image from "next/image"
import { cn } from "@/lib/utils"
import { LOGO_SRC } from "../content"

/** The approved master SVG, placed as-is and scaled uniformly. */
export function Mark({ size, className, priority }: { size: number; className?: string; priority?: boolean }) {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={cn("shrink-0", className)}
      style={{ width: size, height: size }}
    />
  )
}

/** Symbol + name, with a gap of a quarter of the symbol's width. */
export function Lockup({ size = 36, byline = true }: { size?: number; byline?: boolean }) {
  return (
    <span className="inline-flex items-center" style={{ gap: size / 4 }}>
      <Mark size={size} priority />
      <span className="whitespace-nowrap text-[17px] font-semibold tracking-[-0.01em] text-pt-chalk">
        Pro Timeline
        {byline && <span className="ml-1.5 font-normal text-pt-sage">by Promad</span>}
      </span>
    </span>
  )
}

export function Wrap({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-pt-sage">{children}</p>
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-balance text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.025em] text-pt-chalk", className)}>
      {children}
    </h2>
  )
}

const BUTTON =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-lime motion-reduce:transition-none"

export function PrimaryLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={cn(BUTTON, "bg-pt-lime text-pt-graphite hover:bg-[#d4f78a]", className)}>
      {children}
    </a>
  )
}

export function SecondaryLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={cn(BUTTON, "border border-pt-line text-pt-chalk hover:border-pt-sage/60 hover:bg-pt-raised", className)}>
      {children}
    </a>
  )
}
