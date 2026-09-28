"use client"

import { useEffect } from "react"
import {
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceColor,
} from "@rive-app/react-canvas"

/**
 * The animated vizmaya wordmark, ported from the vismay monorepo
 * (`packages/render-surface/src/story/SurfaceLogo.tsx`). The .riv exposes its
 * colors through a view model, so the same file recolors for any surface.
 */
export type VizmayaLogoPalette = Partial<
  Record<"text" | "teal" | "accent" | "accent2" | "surface" | "muted" | "line", string>
>

/** The palette vizmaya.fyi's own nav uses on its cream page. */
export const VIZMAYA_LIGHT_PALETTE: VizmayaLogoPalette = {
  text: "#111111",
  teal: "#0BBFAB",
  accent: "#E84D7A",
  accent2: "#2B4ACF",
  surface: "#FFFFFF",
  muted: "#1D1D1D",
  line: "#111111",
}

function parseHex(hex: string) {
  const m = hex.replace("#", "")
  if (m.length !== 3 && m.length !== 6) return null
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m
  const n = parseInt(full, 16)
  if (Number.isNaN(n)) return null
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff }
}

export function VizmayaLogo({
  className,
  palette = VIZMAYA_LIGHT_PALETTE,
}: {
  className?: string
  palette?: VizmayaLogoPalette
}) {
  const { rive, RiveComponent } = useRive({
    src: "/rive/vizmaya.riv",
    autoplay: true,
  })

  const viewModel = useViewModel(rive, { useDefault: true })
  const instance = useViewModelInstance(viewModel, { rive })
  const text = useViewModelInstanceColor("textColor", instance)
  const teal = useViewModelInstanceColor("tealColor", instance)
  const accent = useViewModelInstanceColor("accentColor", instance)
  const accent2 = useViewModelInstanceColor("accent2Color", instance)
  const surface = useViewModelInstanceColor("surfaceColor", instance)
  const muted = useViewModelInstanceColor("mutedColor", instance)
  const line = useViewModelInstanceColor("lineColor", instance)

  useEffect(() => {
    const apply = (
      hex: string | undefined,
      target: { setRgba?: (r: number, g: number, b: number, a: number) => void } | null
    ) => {
      if (!hex || !target?.setRgba) return
      const rgb = parseHex(hex)
      if (rgb) target.setRgba(rgb.r, rgb.g, rgb.b, 255)
    }
    apply(palette.text, text)
    apply(palette.teal, teal)
    apply(palette.accent, accent)
    apply(palette.accent2, accent2)
    apply(palette.surface, surface)
    apply(palette.muted, muted)
    apply(palette.line, line)
  }, [palette, text, teal, accent, accent2, surface, muted, line])

  return (
    <div className={className}>
      <RiveComponent style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
