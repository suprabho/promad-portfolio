import { cn } from "@/lib/utils"

/** Italic serif phrase set inside a sans headline */
export function SerifAccent({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <em className={cn("font-motion-serif font-normal italic tracking-[-0.01em]", className)}>{children}</em>
  )
}
