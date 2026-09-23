"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRightIcon, PlayIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import type { WorkCardData, WorkCardSize } from "../content"

const SPAN: Record<WorkCardSize, string> = {
  wide: "col-span-12 min-[601px]:col-span-6",
  tall: "col-span-6 min-[601px]:col-span-4 min-[901px]:col-span-3",
  square: "col-span-6 min-[601px]:col-span-4 min-[901px]:col-span-3",
  full: "col-span-12",
}

const ASPECT: Record<WorkCardSize, string> = {
  wide: "16 / 9",
  tall: "9 / 16",
  square: "1 / 1",
  full: "16 / 9",
}

const SIZES: Record<WorkCardSize, string> = {
  wide: "(max-width: 600px) 100vw, 590px",
  tall: "(max-width: 600px) 50vw, (max-width: 900px) 33vw, 295px",
  square: "(max-width: 600px) 50vw, (max-width: 900px) 33vw, 295px",
  full: "(max-width: 1180px) 100vw, 1180px",
}

const PLAY_OVERLAY =
  "group/play absolute inset-0 grid place-items-center bg-gradient-to-t from-black/35 to-transparent to-55% focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-motion-yellow print:hidden"

export function WorkCard({ item }: { item: WorkCardData }) {
  return (
    <figure
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-xl border-[1.5px] border-motion-line bg-motion-surface",
        SPAN[item.size],
      )}
    >
      <div className="relative bg-[#0f0f0d]" style={{ aspectRatio: item.aspect ?? ASPECT[item.size] }}>
        {item.kind === "loop" && <LoopVideo src={item.src} poster={item.poster} />}
        {item.kind === "video" && <TapToPlayVideo item={item} />}
        {item.kind === "link" && (
          <>
            <Poster src={item.poster} size={item.size} />
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.title} (${item.meta}, opens in a new tab)`}
              className={PLAY_OVERLAY}
            >
              <PlayBadge />
            </a>
          </>
        )}
      </div>

      <figcaption className="flex items-start justify-between gap-3 px-3.5 pb-3.5 pt-3">
        <div className="min-w-0">
          <span className="block text-[14px] font-bold tracking-[-0.01em]">{item.title}</span>
          <span className="mt-0.5 block text-[12.5px] text-motion-muted">{item.caption}</span>
        </div>
        <span className="flex shrink-0 items-center gap-1 whitespace-nowrap pt-0.5 font-motion-mono text-[11.5px] text-motion-muted">
          {item.meta}
          {item.kind === "link" && <ArrowUpRightIcon aria-hidden className="size-3" />}
        </span>
      </figcaption>
    </figure>
  )
}

function Poster({ src, size }: { src: string; size: WorkCardSize }) {
  return <Image src={src} alt="" fill sizes={SIZES[size]} className="object-cover" />
}

function PlayBadge() {
  return (
    <span className="grid size-14 place-items-center rounded-full bg-motion-yellow text-motion-yellow-foreground shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-transform duration-150 ease-out group-hover/play:scale-[1.06] motion-reduce:transition-none">
      <PlayIcon aria-hidden weight="fill" className="ml-[3px] size-[22px]" />
    </span>
  )
}

/** Only one tap-to-play film plays at a time */
function pauseOtherPlayers(current: HTMLVideoElement) {
  document.querySelectorAll<HTMLVideoElement>("video[data-motion-player]").forEach((video) => {
    if (video !== current && !video.paused) video.pause()
  })
}

function TapToPlayVideo({ item }: { item: Extract<WorkCardData, { kind: "video" }> }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  // The play button unmounts once started, so hand keyboard focus to the player controls
  useEffect(() => {
    if (started) videoRef.current?.focus()
  }, [started])

  const start = () => {
    setStarted(true)
    // Call play() inside the click so the browser allows playback with sound
    videoRef.current?.play().catch(() => {})
  }

  return (
    <>
      {!started && <Poster src={item.poster} size={item.size} />}
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        preload="none"
        playsInline
        controls
        hidden={!started}
        data-motion-player
        onPlay={(event) => pauseOtherPlayers(event.currentTarget)}
        className="absolute inset-0 size-full object-cover"
      />
      {!started && (
        <button type="button" onClick={start} aria-label={`Play ${item.title}`} className={PLAY_OVERLAY}>
          <PlayBadge />
        </button>
      )}
    </>
  )
}

/** Muted loop that plays while at least a quarter of it is on screen */
function LoopVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Respect reduced motion: no autoplay, hand the viewer the controls instead
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true)
      return
    }

    video.muted = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reducedMotion}
      className="absolute inset-0 size-full object-cover"
    />
  )
}
