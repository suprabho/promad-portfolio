import { cn } from "@/lib/utils"
import { MASCOT_GROUP, WEATHER_WITH_OVO, WORK_GROUPS } from "../content"
import { OvoMascot } from "./OvoMascot"
import { SerifAccent } from "./SerifAccent"
import { WorkCard } from "./WorkCard"
import { Wrap } from "./Wrap"

export function WorkSection() {
  return (
    <section id="work" className="border-t-[1.5px] border-motion-line py-[clamp(40px,6vw,80px)]">
      <Wrap>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-motion-muted">
              02 · Selected work
            </span>
            <h2 className="mt-2 text-balance text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              The work, <SerifAccent>in motion</SerifAccent>
            </h2>
          </div>
          <p className="max-w-[52ch] text-motion-muted">
            Short loops play automatically. Longer pieces play on tap with sound; client films marked YouTube
            open in a new tab. The Ovo mascot below is a live Rive rig — press the buttons and it responds.
          </p>
        </div>

        {WORK_GROUPS.map((group) => (
          <WorkGroup key={group.title} title={group.title} tagline={group.tagline}>
            <CardGrid>
              {group.items.map((item) => (
                <WorkCard key={item.title} item={item} />
              ))}
            </CardGrid>
          </WorkGroup>
        ))}

        <WorkGroup id="mascot" title={MASCOT_GROUP.title} tagline={MASCOT_GROUP.tagline}>
          <OvoMascot />
          <CardGrid className="mt-3.5">
            <WorkCard item={WEATHER_WITH_OVO} />
          </CardGrid>
        </WorkGroup>
      </Wrap>
    </section>
  )
}

function WorkGroup({
  id,
  title,
  tagline,
  children,
}: {
  id?: string
  title: string
  tagline: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="mt-10">
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
