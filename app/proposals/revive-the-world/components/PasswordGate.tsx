"use client"

import { useActionState } from "react"
import Image from "next/image"
import { ArrowRightIcon, LockSimpleIcon, SpinnerGapIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { asset } from "@/app/motion/content"
import { SerifAccent } from "@/app/motion/components/SerifAccent"
import { unlockProposal, type UnlockState } from "../actions"

const INITIAL: UnlockState = { error: null }

export function PasswordGate() {
  const [state, formAction, pending] = useActionState(unlockProposal, INITIAL)

  return (
    <main className="grid min-h-screen place-items-center bg-motion-yellow px-4 py-12 text-motion-yellow-foreground">
      <div className="w-full max-w-[440px]">
        <Image src={asset("logo.png")} alt="Promad" width={800} height={382} priority className="h-9 w-auto" />

        <h1 className="mt-10 text-balance text-[clamp(32px,6vw,48px)] font-extrabold leading-[1] tracking-[-0.03em]">
          A proposal <SerifAccent>for</SerifAccent> Revive The World
        </h1>
        <p className="mt-4 text-[16px] leading-[1.5] text-[#3a3a00]">
          This motion proposal and rate card is private. Enter the password we shared with you to open it.
        </p>

        <form action={formAction} className="mt-8 rounded-2xl bg-[#141412] p-5 text-[#F3F3E9] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
          <label htmlFor="proposal-password" className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#a3a392]">
            <LockSimpleIcon aria-hidden weight="bold" className="size-3.5" />
            Password
          </label>
          <div className="mt-2.5 flex gap-2">
            <input
              id="proposal-password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              aria-invalid={state.error ? true : undefined}
              aria-describedby={state.error ? "proposal-password-error" : undefined}
              className="min-w-0 flex-1 rounded-lg border-[1.5px] border-[#2A2A24] bg-[#1F1F1B] px-3 py-2.5 font-motion-mono text-[15px] text-[#F3F3E9] placeholder:text-[#6B6B5C] focus-visible:border-motion-yellow focus-visible:outline-none"
              placeholder="••••••••"
            />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-motion-yellow px-4 py-2.5 text-[14px] font-bold text-motion-yellow-foreground transition-transform hover:-translate-y-px disabled:translate-y-0 disabled:opacity-70 motion-reduce:transition-none"
            >
              {pending ? (
                <SpinnerGapIcon aria-hidden weight="bold" className="size-4 animate-spin motion-reduce:animate-none" />
              ) : (
                <ArrowRightIcon aria-hidden weight="bold" className="size-4" />
              )}
              Open
            </button>
          </div>
          {state.error && (
            <p id="proposal-password-error" role="alert" className="mt-3 flex items-start gap-1.5 text-[13.5px] text-[#FF8A8A]">
              <WarningCircleIcon aria-hidden weight="bold" className="mt-0.5 size-4 shrink-0" />
              {state.error}
            </p>
          )}
        </form>

        <p className="mt-6 text-[13px] text-[#3a3a00]">
          Need access?{" "}
          <a href="mailto:hello@promad.design" className="font-semibold underline underline-offset-2">
            hello@promad.design
          </a>
        </p>
      </div>
    </main>
  )
}
