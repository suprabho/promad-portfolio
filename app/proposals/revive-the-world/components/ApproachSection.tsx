import { cn } from "@/lib/utils"
import { DELIVERABLES, GANTT, GANTT_WEEKS, STAGES, type GanttTone } from "../content"
import { Lede, Note, RailSection, SubHeading, WithCode } from "./ui"

const BAR: Record<GanttTone, string> = {
  milestone: "bg-motion-yellow text-motion-yellow-foreground",
  leaf: "bg-motion-leaf-soft text-motion-leaf",
  plain: "bg-motion-surface-2 text-motion-muted",
}

const CELL = "border-b-[1.5px] border-motion-line px-1.5 py-2 text-center text-[12px] [tr:last-child>&]:border-b-0"

export function ApproachSection() {
  const weeks = Array.from({ length: GANTT_WEEKS }, (_, index) => `W${index + 1}`)

  return (
    <RailSection id="approach" number="03" title="Approach & timeline" chip="8 weeks · 2 parallel tracks">
      <Lede>
        We start with a shared motion language, prove it on the hero moments, then scale up. The teaser runs in
        parallel and borrows the same palette, characters and growth animations, so the film and the app feel
        like one product.
      </Lede>

      <div className="grid gap-3.5 min-[761px]:grid-cols-3">
        {STAGES.map((stage) => (
          <div key={stage.when} className="rounded-xl border-[1.5px] border-motion-line bg-motion-surface p-5">
            <span className="font-motion-mono text-[12px] text-motion-muted">{stage.when}</span>
            <h3 className="mt-1.5 text-[18px] font-bold tracking-[-0.015em]">{stage.title}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-[18px] text-[14.5px] text-motion-muted">
              {stage.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <SubHeading>Week-by-week plan</SubHeading>
        <div className="overflow-x-auto rounded-xl border-[1.5px] border-motion-line bg-motion-surface">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr>
                <th className={cn(CELL, "w-[190px] whitespace-nowrap pl-3.5 text-left text-[13px] font-bold")}>
                  Workstream
                </th>
                {weeks.map((week) => (
                  <th key={week} className={cn(CELL, "font-bold text-motion-muted")}>
                    {week}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GANTT.map((row) => (
                <tr key={row.workstream}>
                  <td className={cn(CELL, "whitespace-nowrap pl-3.5 text-left text-[13px] font-bold")}>
                    {row.workstream}
                    <small className="block text-[11.5px] font-normal text-motion-muted">{row.track}</small>
                  </td>
                  {row.weeks.map((cell, index) => (
                    <td key={index} className={CELL}>
                      {cell && (
                        <span
                          className={cn("block rounded-[5px] px-1 py-1.5 text-[11px] font-bold leading-[1.2]", BAR[cell.tone])}
                        >
                          {cell.label}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note className="mt-2.5">
          Weeks start from kickoff, once we have your Figma files, brand assets and the final asset list. Yellow
          marks a milestone you sign off. If you only book one track, the library takes about 8 weeks and the
          teaser about 6.
        </Note>
      </div>

      <div>
        <SubHeading>What your developers receive</SubHeading>
        <div className="grid gap-3.5 min-[761px]:grid-cols-2">
          {DELIVERABLES.map((spec) => (
            <div key={spec.title} className="rounded-xl border-[1.5px] border-motion-line bg-motion-surface px-5 py-[18px]">
              <h4 className="flex items-center gap-2 text-[15px] font-bold">
                <span className="rounded-[3px] bg-motion-ink px-1.5 py-0.5 font-motion-mono text-[11px] font-semibold text-motion-paper">
                  {spec.format}
                </span>
                {spec.title}
              </h4>
              <ul className="mt-2.5 list-disc space-y-[5px] pl-[18px] text-[14px] text-motion-muted">
                {spec.points.map((point) => (
                  <li key={point}>
                    <WithCode text={point} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </RailSection>
  )
}
