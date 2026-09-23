"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from "@rive-app/react-canvas"
import { ArrowUpRightIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { OVO_COSTUME_LAYERS, OVO_STATES, asset } from "../content"

const STATE_MACHINE = "State Machine Main"

const BUTTON =
  "rounded-lg px-3 py-2 text-[13px] font-bold transition-transform duration-100 hover:-translate-y-px focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#141412] motion-reduce:transition-none"

export function OvoMascot() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [nearViewport, setNearViewport] = useState(false)
  const [rigReady, setRigReady] = useState(false)
  const [state, setState] = useState(OVO_STATES[0].value)
  const [costumeShuffles, setCostumeShuffles] = useState(0)

  // The rig is ~1.5 MB, so only fetch it once the stage is about to scroll into view
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNearViewport(true)
        observer.disconnect()
      },
      { rootMargin: "400px 0px" },
    )
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const handleRigReady = useCallback(() => setRigReady(true), [])

  return (
    <div className="grid items-center gap-6 rounded-2xl bg-[#2EC4BE] p-[clamp(16px,2.5vw,28px)] text-[#0d3b3a] min-[761px]:grid-cols-[minmax(260px,420px)_1fr]">
      <div
        ref={stageRef}
        className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-full bg-[#1a4a49] shadow-[0_0_0_10px_#fff,0_18px_40px_rgba(0,0,0,0.25)] min-[761px]:max-w-full"
      >
        {nearViewport && <OvoRig state={state} costumeShuffles={costumeShuffles} onReady={handleRigReady} />}
        {!rigReady && (
          <Image src={asset("ovo.jpg")} alt="Ovo the owl mascot" fill sizes="(max-width: 760px) 320px, 420px" className="object-cover" />
        )}
      </div>

      <div className="min-w-0">
        <p className="max-w-[52ch] text-[15.5px] leading-normal">
          One character, fourteen states and five swappable costume layers, driven by a single state machine
          so the product team can trigger any mood from code. Built in Rive, it ships at about 1.4 MB and runs
          on canvas in web and native apps.
        </p>

        <div role="group" aria-label="Ovo's states" className="mt-4 flex flex-wrap gap-2">
          {OVO_STATES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={state === value}
              onClick={() => setState(value)}
              className={cn(BUTTON, state === value ? "bg-[#FF2D6F] text-white" : "bg-[#FFC53D] text-[#E8365D]")}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setCostumeShuffles((count) => count + 1)}
            className={cn(BUTTON, "bg-[#5B5BD6] text-white")}
          >
            Random costume
          </button>
          <a
            href="https://ovo.app.promad.design"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[14px] font-bold underline underline-offset-2"
          >
            Open the live demo
            <ArrowUpRightIcon aria-hidden weight="bold" className="size-3.5" />
          </a>
        </div>

        <p className="mt-3.5 text-[13.5px] opacity-75">
          States: Standby, Searching, Suggestions, Painting, Listening, Talking, Bored, Success, Retry, Failure
          and four dance steps. Costume layers: skin, headgear, specs, muffler, background.
        </p>
      </div>
    </div>
  )
}

function OvoRig({
  state,
  costumeShuffles,
  onReady,
}: {
  state: number
  costumeShuffles: number
  onReady: () => void
}) {
  const { rive, RiveComponent } = useRive({
    src: "/rive/ovo.riv",
    stateMachines: STATE_MACHINE,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    autoplay: true,
  })
  const stateInput = useStateMachineInput(rive, STATE_MACHINE, "State")

  // useRive only hands back the instance once the file has loaded
  useEffect(() => {
    if (rive) onReady()
  }, [rive, onReady])

  // Also replays a state picked before the rig finished loading
  useEffect(() => {
    if (stateInput) stateInput.value = state
  }, [stateInput, state])

  useEffect(() => {
    if (!rive || costumeShuffles === 0) return
    const inputs = rive.stateMachineInputs(STATE_MACHINE) ?? []
    for (const { input, max } of OVO_COSTUME_LAYERS) {
      const layer = inputs.find((candidate) => candidate.name === input)
      if (layer) layer.value = Math.floor(Math.random() * (max + 1))
    }
  }, [rive, costumeShuffles])

  return <RiveComponent role="img" aria-label="Ovo the owl, animated mascot" className="absolute inset-0" />
}
