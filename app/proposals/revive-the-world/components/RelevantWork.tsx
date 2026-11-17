import { cn } from "@/lib/utils"
import { OvoMascot } from "@/app/motion/components/OvoMascot"
import { SerifAccent } from "@/app/motion/components/SerifAccent"
import { WorkCard } from "@/app/motion/components/WorkCard"
import { Wrap } from "@/app/motion/components/Wrap"
import { MASCOT_DESCRIPTION, WEATHER_CARD, WORK_GROUPS } from "../content"

export function RelevantWork() {
  return (
    <section id="work" className="border-t-[1.5px] border-motion-line py-[clamp(40px,6vw,80px)]">
      <Wrap>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-motion-muted">
              02 · Relevant work
            </span>
            <h2 className="mt-2 text-balance text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              The work, <SerifAccent>in motion</SerifAccent>
            </h2>
          </div>
          <p className="max-w-[52ch] text-motion-muted">
            We picked the work closest to the RTW brief: product micro-interactions, reward moments, a live Rive
            state machine and product films. Short loops play automatically, and YouTube films open in a new tab.
          </p>
        </div>

        <WorkGroup id="mascot" title="Interactive Rive & state machines" tagline="Ovo, the Kidzovo mascot. A live rig, so try the states" first>
          <OvoMascot description={MASCOT_DESCRIPTION} />
          <CardGrid className="mt-3.5">
            <WorkCard item={WEATHER_CARD} />
          </CardGrid>
        </WorkGroup>

        {WORK_GROUPS.map((group) => (
          <WorkGroup key={group.title} title={group.title} tagline={group.tagline}>
            <CardGrid>
              {group.items.map((item) => (
                <WorkCard key={item.title} item={item} />
              ))}
            </CardGrid>
          </WorkGroup>
        ))}
      </Wrap>
    </section>
  )
}

function WorkGroup({
  id,
  title,
  tagline,
  first,
  children,
}: {
  id?: string
  title: string
  tagline: string
  first?: boolean
  children: React.ReactNode
}) {
  return (
    <div id={id} className={first ? undefined : "mt-10"}>
      <div className="mb-3.5 flex flex-wrap items-baseline gap-3.5">
        <h3 className="text-balance text-[20px] font-bold tracking-[-0.02em]">{title}</h3>
        <span className="text-[14px] text-motion-muted">{tagline}</span>
      </div>
      {children}
    </div>
  )
}

function CardGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("grid grid-cols-12 items-start gap-3.5", className)}>{children}</div>
}
