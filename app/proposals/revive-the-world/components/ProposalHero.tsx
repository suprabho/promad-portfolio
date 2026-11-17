import Image from "next/image"
import { LockSimpleIcon } from "@phosphor-icons/react/dist/ssr"
import { asset } from "@/app/motion/content"
import { SerifAccent } from "@/app/motion/components/SerifAccent"
import { Wrap } from "@/app/motion/components/Wrap"
import { lockProposal } from "../actions"
import { META } from "../content"

export function ProposalHero() {
  return (
    <header className="bg-motion-yellow pb-[clamp(36px,6vw,72px)] pt-[clamp(40px,7vw,96px)] text-motion-yellow-foreground">
      <Wrap>
        <div className="mb-[clamp(40px,8vw,110px)] flex flex-wrap items-center justify-between gap-6">
          <Image
            src={asset("logo.png")}
            alt="Promad"
            width={800}
            height={382}
            priority
            className="h-9 w-auto min-[761px]:h-12"
          />
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.06em]">
              Proposal &amp; rate card · for Revive The World
            </p>
            <form action={lockProposal} className="print:hidden">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-md border-[1.5px] border-current px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.06em] opacity-70 transition-opacity hover:opacity-100"
              >
                <LockSimpleIcon aria-hidden weight="bold" className="size-3.5" />
                Lock
              </button>
            </form>
          </div>
        </div>

        <h1 className="max-w-[15ch] text-balance text-[clamp(40px,7.2vw,96px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          A living motion library, <SerifAccent>and a film</SerifAccent> to launch it.
        </h1>

        <div className="mt-7 grid items-end gap-8 min-[761px]:grid-cols-[1.2fr_0.8fr]">
          <p className="max-w-[46ch] text-[clamp(17px,1.6vw,21px)] leading-[1.45]">
            A Lottie and Rive animation library for the RTW Flutter app (micro-interactions, planting and
            watering, XP and rewards, icons, loaders, onboarding and interactive state machines), plus a
            cinematic concept teaser for the whole ecosystem. Each item is priced from our standard motion rate
            card.
          </p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-[18px] gap-y-1.5 border-t-[1.5px] border-motion-yellow-foreground pt-3.5 font-motion-mono text-[14px]">
            {META.map(({ label, value }) => (
              <div key={label} className="contents">
                <dt className="font-bold">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Wrap>
    </header>
  )
}
