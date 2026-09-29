import {
  ArrowCounterClockwiseIcon,
  BellIcon,
  EyeIcon,
  FingerprintIcon,
  FloppyDiskIcon,
  GaugeIcon,
} from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { DETAILS } from "../content"
import { Eyebrow, SectionTitle, Wrap } from "./Brand"

const BENEFITS = [
  {
    verb: "Group",
    title: "Organize related layers into clear groups.",
    body: "Select layers and press + Group. A header layer is added above them and the members are parented to it, so a whole group selects, solos, locks and relabels as one.",
    art: <GroupArt />,
  },
  {
    verb: "Collapse",
    title: "Collapse groups to keep complex timelines readable.",
    body: "Collapsing hides a group's members in the After Effects timeline and keeps its header in view. Expanding brings every layer back as it was, including layers you set to shy yourself.",
    art: <CollapseArt />,
  },
  {
    verb: "Move",
    title: "Shift whole groups in time together.",
    body: "Drag a group bar in the panel's track area. Every member and its keyframes move by the same frame-snapped offset, in one undo step.",
    art: <MoveArt />,
  },
]

const ICONS: Record<(typeof DETAILS)[number]["icon"], Icon> = {
  fingerprint: FingerprintIcon,
  floppy: FloppyDiskIcon,
  undo: ArrowCounterClockwiseIcon,
  eye: EyeIcon,
  gauge: GaugeIcon,
  bell: BellIcon,
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-pt-line">
      <Wrap className="py-[clamp(56px,8vw,112px)]">
        <Eyebrow>What it does</Eyebrow>
        <SectionTitle className="max-w-[18ch]">Clear structure for complex timelines.</SectionTitle>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <li key={b.verb} className="flex flex-col overflow-hidden rounded-2xl border border-pt-line bg-pt-surface">
              <div aria-hidden className="border-b border-pt-line px-6 py-7">
                {b.art}
              </div>
              <div className="flex grow flex-col p-6">
                <p className="text-[13px] font-medium tabular-nums text-pt-lime">
                  0{i + 1} · {b.verb}
                </p>
                <h3 className="mt-2 text-balance text-[20px] font-semibold leading-[1.25] tracking-[-0.015em] text-pt-chalk">
                  {b.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-pt-sage">{b.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-[clamp(56px,7vw,96px)] grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
          <div>
            <Eyebrow>Under the hood</Eyebrow>
            <h3 className="text-balance text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-pt-chalk">
              Made to hold up in real projects.
            </h3>
            <p className="mt-4 text-[15px] leading-[1.55] text-pt-sage">
              After Effects has no native layer folders. Pro Timeline builds groups from ordinary layers, parenting
              and shy switches, so your project stays standard After Effects.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {DETAILS.map((d) => {
              const Icon = ICONS[d.icon]
              return (
                <li key={d.title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-pt-line bg-pt-surface text-pt-chalk">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-[16px] font-medium text-pt-chalk">{d.title}</h4>
                    <p className="mt-1.5 text-[14px] leading-[1.55] text-pt-sage">{d.body}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Wrap>
    </section>
  )
}

/* Secondary timeline-bar graphics: illustrative only, never the logo. */

function Bar({ left, width, className }: { left: number; width: number; className?: string }) {
  return (
    <span
      className={cn("absolute h-3 rounded-[3px] bg-pt-line", className)}
      style={{ left: `${left}%`, width: `${width}%` }}
    />
  )
}

function Lane({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("relative h-3", className)}>{children}</div>
}

function GroupArt() {
  return (
    <div className="flex gap-3">
      <span className="w-[3px] rounded-full bg-pt-lime" />
      <div className="grow space-y-2">
        <Lane>
          <Bar left={0} width={100} className="border border-pt-lime bg-transparent" />
        </Lane>
        <Lane className="ml-3">
          <Bar left={6} width={52} className="bg-pt-sage/70" />
        </Lane>
        <Lane className="ml-3">
          <Bar left={18} width={60} className="bg-pt-sage/50" />
        </Lane>
        <Lane className="ml-3">
          <Bar left={0} width={44} className="bg-pt-sage/35" />
        </Lane>
      </div>
    </div>
  )
}

function CollapseArt() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <div className="space-y-2">
        <Lane>
          <Bar left={0} width={100} className="border border-pt-sage/60 bg-transparent" />
        </Lane>
        {[62, 80, 48, 70].map((w, i) => (
          <Lane key={i}>
            <Bar left={8} width={w} className="bg-pt-sage/45" />
          </Lane>
        ))}
      </div>
      <span className="text-[18px] text-pt-sage">→</span>
      <div className="space-y-2 self-start">
        <Lane>
          <Bar left={0} width={100} className="border border-pt-lime bg-transparent" />
        </Lane>
      </div>
    </div>
  )
}

function MoveArt() {
  return (
    <div className="relative space-y-2">
      <Lane>
        <Bar left={0} width={46} className="border border-dashed border-pt-sage/40 bg-transparent" />
        <Bar left={40} width={46} className="border border-pt-lime bg-pt-lime/15" />
      </Lane>
      {[
        [0, 30],
        [8, 38],
        [4, 26],
      ].map(([l, w], i) => (
        <Lane key={i}>
          <Bar left={l} width={w} className="bg-pt-line/60" />
          <Bar left={l + 40} width={w} className="bg-pt-sage/55" />
        </Lane>
      ))}
    </div>
  )
}
