import { cn } from "@/lib/utils"
import { Wrap } from "@/app/motion/components/Wrap"

/** Numbered section with a sticky title rail on the left (stacks below 900px) */
export function RailSection({
  id,
  number,
  title,
  chip,
  children,
}: {
  id: string
  number: string
  title: React.ReactNode
  chip?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="border-t-[1.5px] border-motion-line">
      <Wrap className="grid gap-5 py-[clamp(40px,6vw,80px)] min-[901px]:grid-cols-[280px_1fr] min-[901px]:gap-[clamp(24px,5vw,72px)]">
        <aside className="min-w-0 self-start pt-0.5 min-[901px]:sticky min-[901px]:top-0 print:static">
          <span className="mb-2.5 block font-motion-mono text-[12px] text-motion-muted">{number}</span>
          <h2 className="text-balance text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            {title}
          </h2>
          {chip && (
            <span className="mt-3.5 inline-block rounded bg-motion-yellow px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-motion-yellow-foreground">
              {chip}
            </span>
          )}
        </aside>
        <div className="min-w-0 space-y-7">{children}</div>
      </Wrap>
    </section>
  )
}

export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[60ch] text-[clamp(18px,1.7vw,22px)] leading-[1.45] tracking-[-0.01em]">{children}</p>
  )
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 text-[20px] font-extrabold tracking-[-0.02em]">{children}</h3>
}

export function Note({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-[13.5px] text-motion-muted", className)}>{children}</p>
}

/** Bordered, horizontally scrollable table frame */
export function TableFrame({
  className,
  tableClassName,
  children,
}: {
  className?: string
  tableClassName?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border-[1.5px] border-motion-line bg-motion-surface",
        className,
      )}
    >
      <table className={cn("w-full border-collapse text-[14.5px]", tableClassName)}>{children}</table>
    </div>
  )
}

export const TH =
  "border-b-[1.5px] border-motion-line bg-motion-surface-2 px-3.5 py-3 text-left align-top text-[12px] font-bold uppercase tracking-[0.1em] text-motion-muted"

/** Body cell; the last row drops its border */
export const TD =
  "border-b-[1.5px] border-motion-line px-3.5 py-3 text-left align-top [overflow-wrap:break-word] [tr:last-child>&]:border-b-0"

/** Renders `backtick` segments as inline code */
export function WithCode({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, index) =>
        part.startsWith("`") ? (
          <code
            key={index}
            className="rounded-[3px] bg-motion-surface-2 px-[5px] py-px font-motion-mono text-[12.5px] text-motion-foreground"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  )
}
