import { cn } from "@/lib/utils"

/** Centered 1180px column with fluid side gutters */
export function Wrap({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto max-w-[1180px] px-[clamp(16px,4vw,48px)]", className)}>{children}</div>
  )
}
