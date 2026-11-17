import { MILESTONES, SIGNATORIES, TERMS } from "../content"
import { RailSection, SubHeading, TD, TableFrame } from "./ui"

export function TermsSection() {
  return (
    <RailSection id="terms" number="05" title="Payment & terms">
      <div>
        <SubHeading>Milestone payments</SubHeading>
        <TableFrame>
          <tbody>
            {MILESTONES.map((milestone) => (
              <tr key={milestone.title}>
                <td className={`${TD} min-w-[170px]`}>
                  <b>{milestone.title}</b>
                </td>
                <td className={TD}>{milestone.detail}</td>
              </tr>
            ))}
          </tbody>
        </TableFrame>
      </div>

      <div className="gap-10 text-[14.5px] text-motion-muted min-[761px]:columns-2">
        {TERMS.map((term) => (
          <p key={term.title} className="mb-3 break-inside-avoid">
            <b className="text-motion-foreground">{term.title}</b> {term.body}
          </p>
        ))}
      </div>

      <div className="mt-2 grid gap-8 min-[601px]:grid-cols-2">
        {SIGNATORIES.map((person) => (
          <div key={person.name} className="border-t-[1.5px] border-motion-ink pt-2.5 text-[13.5px] text-motion-muted">
            <b className="block text-motion-foreground">{person.name}</b>
            {person.role}
          </div>
        ))}
      </div>
    </RailSection>
  )
}
