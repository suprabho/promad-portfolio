"use client"

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import { ArrowCounterClockwiseIcon, InfoIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

/*
 * An interactive illustration of the Pro Timeline panel. It mirrors the real panel's
 * layout (outline + track area) and behaviour (fold vs. collapse, whole-group moves),
 * but runs entirely in the browser on made-up layers.
 */

const DURATION = 10 // seconds
const FPS = 24
const OUTLINE_W = 244

// After Effects' default label colours (subset, same indices as the plugin)
const LABELS: Record<number, string> = {
  0: "#5c5c5c",
  2: "#e3d34b",
  4: "#edb7c6",
  5: "#aea9d9",
  8: "#5a7fd6",
  9: "#4ba84b",
  11: "#e88b34",
  14: "#45b0c7",
  15: "#a9a07c",
}
const NEW_GROUP_LABELS = [11, 5, 14, 4, 2]

type Layer = {
  id: string
  name: string
  label: number
  start: number
  end: number
  keys: number[]
  group: string | null
  enabled: boolean
}
type Group = { id: string; name: string; label: number; collapsed: boolean; folded: boolean; locked: boolean }
type State = { order: string[]; layers: Record<string, Layer>; groups: Record<string, Group>; nextGroup: number }

const layer = (id: string, name: string, label: number, start: number, end: number, keys: number[], group: string | null = null): Layer => ({
  id, name, label, start, end, keys, group, enabled: true,
})

function initialState(): State {
  const layers = [
    layer("cursor", "Cursor", 2, 5, 8.25, [5, 5.75, 6.5, 7.5]),
    layer("ripple", "Tap ripple", 4, 6.5, 7.5, [6.5, 7.25]),
    layer("headline", "Headline", 9, 0.5, 4.25, [0.5, 1, 3.75, 4.25], "g-title"),
    layer("subhead", "Subhead", 9, 0.75, 4.25, [0.75, 1.25, 3.75], "g-title"),
    layer("plate", "Title plate", 9, 0.25, 4.5, [0.25, 0.75], "g-title"),
    layer("screen", "Screen UI", 8, 3.75, 9.25, [3.75, 4.5, 6, 7.25], "g-phone"),
    layer("frame", "Phone frame", 8, 3.5, 9.5, [3.5, 4.25], "g-phone"),
    layer("shadow", "Soft shadow", 8, 3.5, 9.5, [3.5, 4.25], "g-phone"),
    layer("sting", "Logo sting", 11, 8.5, 10, [8.5, 9.25]),
    layer("camera", "Camera", 0, 0, 10, [0, 10]),
    layer("bg", "Background", 15, 0, 10, []),
  ]
  return {
    order: ["cursor", "ripple", "g-title", "headline", "subhead", "plate", "g-phone", "screen", "frame", "shadow", "sting", "camera", "bg"],
    layers: Object.fromEntries(layers.map((l) => [l.id, l])),
    groups: {
      "g-title": { id: "g-title", name: "Title card", label: 9, collapsed: false, folded: false, locked: false },
      "g-phone": { id: "g-phone", name: "Phone mockup", label: 8, collapsed: true, folded: false, locked: false },
    },
    nextGroup: 3,
  }
}

type Row =
  | { kind: "group"; group: Group; members: Layer[]; index: number }
  | { kind: "layer"; layer: Layer; index: number; depth: number; hidden: boolean }

const snap = (t: number) => Math.round(t * FPS) / FPS
const pct = (t: number) => `${(t / DURATION) * 100}%`

function timecode(t: number) {
  const frames = Math.round(Math.abs(t) * FPS)
  const s = Math.floor(frames / FPS)
  const f = frames % FPS
  return `${t < 0 ? "−" : "+"}${s}s ${String(f).padStart(2, "0")}f`
}

function playheadCode(t: number) {
  const frames = Math.round(t * FPS)
  const s = Math.floor(frames / FPS)
  return `0:00:${String(s).padStart(2, "0")}:${String(frames % FPS).padStart(2, "0")}`
}

type Drag = { ids: string[]; delta: number; startX: number; width: number; min: number; max: number; label: string }

export function PanelDemo() {
  const [state, setState] = useState(initialState)
  const [selected, setSelected] = useState<string[]>([])
  const [drag, setDrag] = useState<Drag | null>(null)
  const [playhead, setPlayhead] = useState(2.5)
  const [composer, setComposer] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const { order, layers, groups } = state

  const rows = useMemo(() => {
    const out: Row[] = []
    for (const id of order) {
      const index = order.indexOf(id) + 1
      const group = groups[id]
      if (group) {
        const members = order.filter((m) => layers[m]?.group === id).map((m) => layers[m])
        out.push({ kind: "group", group, members, index })
        if (!group.folded)
          for (const m of members)
            out.push({ kind: "layer", layer: m, index: order.indexOf(m.id) + 1, depth: 1, hidden: group.collapsed })
      } else if (!layers[id].group) {
        out.push({ kind: "layer", layer: layers[id], index, depth: 0, hidden: false })
      }
    }
    return out
  }, [order, layers, groups])

  // What the After Effects timeline itself would show: collapsed members are shy and hidden
  const aeRows = order.filter((id) => {
    const g = layers[id]?.group
    return !(g && groups[g].collapsed)
  })

  const loose = selected.filter((id) => layers[id] && !layers[id].group)
  const canGroup = selected.length > 0 && loose.length === selected.length
  const groupCount = Object.keys(groups).length

  const offsetFor = (id: string) => (drag && drag.ids.includes(id) ? drag.delta : 0)

  function select(ids: string[], additive: boolean) {
    setSelected((prev) => {
      if (!additive) return ids
      const allIn = ids.every((id) => prev.includes(id))
      return allIn ? prev.filter((id) => !ids.includes(id)) : [...new Set([...prev, ...ids])]
    })
  }

  function updateGroup(id: string, patch: Partial<Group>) {
    setState((s) => ({ ...s, groups: { ...s.groups, [id]: { ...s.groups[id], ...patch } } }))
  }

  function setAllCollapsed(collapsed: boolean) {
    setState((s) => ({
      ...s,
      groups: Object.fromEntries(Object.entries(s.groups).map(([k, g]) => [k, { ...g, collapsed }])),
    }))
  }

  function toggleLayerEnabled(id: string) {
    setState((s) => ({ ...s, layers: { ...s.layers, [id]: { ...s.layers[id], enabled: !s.layers[id].enabled } } }))
  }

  function setGroupEnabled(id: string, enabled: boolean) {
    setState((s) => {
      const next = { ...s.layers }
      for (const l of Object.values(next)) if (l.group === id) next[l.id] = { ...l, enabled }
      return { ...s, layers: next }
    })
  }

  function createGroup(name: string) {
    if (!canGroup) return
    setState((s) => {
      const id = `g-${s.nextGroup}`
      const members = s.order.filter((o) => loose.includes(o))
      // The header null goes above the topmost selected layer; members follow it
      const topIndex = s.order.indexOf(members[0])
      const before = s.order.slice(0, topIndex).filter((o) => !loose.includes(o))
      const after = s.order.slice(topIndex).filter((o) => !loose.includes(o))
      const label = NEW_GROUP_LABELS[(s.nextGroup - 3) % NEW_GROUP_LABELS.length]
      const nextLayers = { ...s.layers }
      for (const m of members) nextLayers[m] = { ...nextLayers[m], group: id }
      return {
        order: [...before, id, ...members, ...after],
        layers: nextLayers,
        groups: { ...s.groups, [id]: { id, name, label, collapsed: false, folded: false, locked: false } },
        nextGroup: s.nextGroup + 1,
      }
    })
    setSelected([])
    setComposer(null)
  }

  function moveIds(ids: string[], delta: number) {
    if (!delta) return
    setState((s) => {
      const next = { ...s.layers }
      for (const id of ids) {
        const l = next[id]
        next[id] = { ...l, start: l.start + delta, end: l.end + delta, keys: l.keys.map((k) => k + delta) }
      }
      return { ...s, layers: next }
    })
  }

  /** Layers a bar moves: a group's members, or the selection when the bar's layer is part of it. */
  function dragTargets(row: Row): { ids: string[]; label: string } {
    if (row.kind === "group") return { ids: row.members.map((m) => m.id), label: row.group.name }
    const id = row.layer.id
    if (selected.includes(id) && selected.length > 1) {
      const ids = selected.filter((s) => layers[s])
      return { ids, label: `${ids.length} layers` }
    }
    return { ids: [id], label: row.layer.name }
  }

  function bounds(ids: string[]) {
    const ls = ids.map((id) => layers[id])
    return {
      min: -Math.min(...ls.map((l) => l.start)),
      max: DURATION - Math.max(...ls.map((l) => l.end)),
    }
  }

  function isLocked(row: Row) {
    return row.kind === "group" ? row.group.locked : !!(row.layer.group && groups[row.layer.group].locked)
  }

  function onBarDown(row: Row, e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 || isLocked(row)) return
    e.preventDefault()
    const width = trackRef.current?.getBoundingClientRect().width ?? 1
    const { ids, label } = dragTargets(row)
    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag({ ids, delta: 0, startX: e.clientX, width, label, ...bounds(ids) })
  }

  function onBarMove(e: PointerEvent<HTMLDivElement>) {
    if (!drag) return
    const raw = ((e.clientX - drag.startX) / drag.width) * DURATION
    const delta = snap(Math.max(drag.min, Math.min(drag.max, raw)))
    if (delta !== drag.delta) setDrag({ ...drag, delta })
  }

  function onBarUp() {
    if (!drag) return
    moveIds(drag.ids, drag.delta)
    setDrag(null)
  }

  function onBarKey(row: Row, e: KeyboardEvent<HTMLDivElement>) {
    if ((e.key !== "ArrowLeft" && e.key !== "ArrowRight") || isLocked(row)) return
    e.preventDefault()
    const { ids } = dragTargets(row)
    const { min, max } = bounds(ids)
    const step = (e.shiftKey ? 10 : 1) / FPS
    const delta = Math.max(min, Math.min(max, e.key === "ArrowLeft" ? -step : step))
    moveIds(ids, snap(delta))
  }

  function scrub(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setPlayhead(snap(Math.max(0, Math.min(DURATION, ((e.clientX - rect.left) / rect.width) * DURATION))))
  }

  function reset() {
    setState(initialState())
    setSelected([])
    setDrag(null)
    setComposer(null)
    setPlayhead(2.5)
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_200px]">
      <div className="min-w-0">
        <div className="relative overflow-x-auto rounded-xl border border-pt-line bg-[#1b1b1b] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.6)]">
          <div className="min-w-[640px] select-none font-[system-ui,-apple-system,'Segoe_UI',sans-serif] text-[12px] text-[#d6d6d6]">
            {/* Panel tab, as docked in After Effects */}
            <div className="flex h-8 items-end gap-1 border-b border-white/[0.08] bg-[#1b1b1b] px-2">
              <span className="flex h-7 items-center gap-2 rounded-t-md bg-[#232323] px-3 text-[12px] text-[#e6e6e6]">
                <span aria-hidden className="text-[#8a8a8a]">≡</span> Pro Timeline
              </span>
              <span className="flex h-7 items-center px-3 text-[#8a8a8a]">Product launch</span>
            </div>

            <div className="bg-[#232323]">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 border-b border-white/[0.08] px-2 py-1.5">
                <PanelButton
                  primary
                  disabled={!canGroup}
                  title={
                    canGroup
                      ? `Group ${selected.length} selected layer(s)`
                      : selected.length
                        ? "In this demo, select layers that are not in a group yet"
                        : "Select layers first"
                  }
                  onClick={() => setComposer((c) => (c === null ? `Group ${groupCount + 1}` : null))}
                >
                  + Group{canGroup ? ` (${selected.length})` : ""}
                </PanelButton>
                <Sep />
                <PanelButton title="Collapse every group in the timeline" disabled={!groupCount} onClick={() => setAllCollapsed(true)}>
                  ⊞ All
                </PanelButton>
                <PanelButton title="Expand every group in the timeline" disabled={!groupCount} onClick={() => setAllCollapsed(false)}>
                  ⊟ All
                </PanelButton>
                <span className="grow" />
                <span className="tabular-nums text-[#8a8a8a]">
                  {drag ? `${drag.label} ${timecode(drag.delta)}` : playheadCode(playhead)}
                </span>
                <Sep />
                <PanelButton title="Reset the demo" onClick={reset}>
                  <ArrowCounterClockwiseIcon aria-hidden className="size-3.5" />
                  <span className="sr-only">Reset demo</span>
                </PanelButton>
              </div>

              {composer !== null && (
                <form
                  className="flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.03] px-2 py-1.5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    createGroup(composer.trim() || "Group")
                  }}
                >
                  <input
                    autoFocus
                    aria-label="Group name"
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && setComposer(null)}
                    className="h-6 w-44 rounded border border-white/10 bg-[#1b1b1b] px-2 text-[12px] text-[#e6e6e6] outline-none focus:border-[#4d8ef0]"
                  />
                  <PanelButton primary type="submit">
                    Create
                  </PanelButton>
                  <PanelButton onClick={() => setComposer(null)}>Cancel</PanelButton>
                </form>
              )}

              {/* Ruler */}
              <div className="flex h-6 border-b border-white/[0.08]">
                <div style={{ width: OUTLINE_W }} className="flex shrink-0 items-center px-2 text-[11px] text-[#8a8a8a]">
                  Layer
                </div>
                <div
                  className="relative grow cursor-ew-resize border-l border-white/[0.08]"
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId)
                    scrub(e)
                  }}
                  onPointerMove={(e) => e.buttons === 1 && scrub(e)}
                  aria-label="Time ruler"
                >
                  {Array.from({ length: DURATION + 1 }, (_, s) => (
                    <span key={s} className="absolute bottom-0 h-2 border-l border-white/20" style={{ left: pct(s) }}>
                      {s < DURATION && (
                        <span className="absolute -top-3.5 left-1 text-[10px] tabular-nums text-[#8a8a8a]">{s}s</span>
                      )}
                    </span>
                  ))}
                  <span className="absolute inset-y-0 w-px bg-[#4d8ef0]" style={{ left: pct(playhead) }}>
                    <span className="absolute -left-[5px] top-0 h-2 w-[11px] rounded-b-sm bg-[#4d8ef0]" />
                  </span>
                </div>
              </div>

              {/* Rows */}
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 z-10"
                  style={{ left: OUTLINE_W }}
                >
                  <span className="absolute inset-y-0 w-px bg-[#4d8ef0]/70" style={{ left: pct(playhead) }} />
                </div>

                {rows.map((row) => {
                  const key = row.kind === "group" ? row.group.id : row.layer.id
                  const ids = row.kind === "group" ? row.members.map((m) => m.id) : [row.layer.id]
                  const isSelected = ids.length > 0 && ids.every((id) => selected.includes(id))
                  const hidden = row.kind === "layer" && row.hidden
                  const enabled = row.kind === "group" ? row.members.some((m) => m.enabled) : row.layer.enabled
                  const label = row.kind === "group" ? row.group.label : row.layer.label
                  const name = row.kind === "group" ? row.group.name : row.layer.name
                  const depth = row.kind === "group" ? 0 : row.depth

                  // Span and keys, including any in-flight drag offset
                  let start: number, end: number, keys: number[]
                  if (row.kind === "group") {
                    const ms = row.members
                    start = Math.min(...ms.map((m) => m.start + offsetFor(m.id)))
                    end = Math.max(...ms.map((m) => m.end + offsetFor(m.id)))
                    keys = [...new Set(ms.flatMap((m) => m.keys.map((k) => k + offsetFor(m.id))))]
                  } else {
                    const o = offsetFor(row.layer.id)
                    start = row.layer.start + o
                    end = row.layer.end + o
                    keys = row.layer.keys.map((k) => k + o)
                  }
                  const dragging = !!drag && ids.some((id) => drag.ids.includes(id))

                  return (
                    <div
                      key={key}
                      className={cn(
                        "flex h-[26px] border-b border-white/[0.04]",
                        row.kind === "group" && "bg-white/[0.035]",
                        isSelected && "bg-[#4d8ef0]/25",
                        hidden && "opacity-45",
                        !enabled && "opacity-50",
                      )}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`${row.kind === "group" ? "Group" : "Layer"} ${name}${hidden ? ", hidden in After Effects" : ""}`}
                        style={{ width: OUTLINE_W, paddingLeft: 6 + depth * 14 }}
                        className="flex shrink-0 cursor-default items-center gap-1.5 pr-1.5 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#4d8ef0]"
                        onClick={(e) => select(ids, e.shiftKey || e.metaKey || e.ctrlKey)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            select(ids, e.shiftKey || e.metaKey || e.ctrlKey)
                          }
                        }}
                      >
                        {row.kind === "group" ? (
                          <button
                            type="button"
                            title={row.group.folded ? "Unfold in panel" : "Fold in panel"}
                            aria-label={row.group.folded ? `Unfold ${name} in panel` : `Fold ${name} in panel`}
                            aria-expanded={!row.group.folded}
                            className={cn(
                              "grid size-4 place-items-center text-[10px] text-[#8a8a8a] transition-transform hover:text-white motion-reduce:transition-none",
                              !row.group.folded && "rotate-90",
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              updateGroup(row.group.id, { folded: !row.group.folded })
                            }}
                          >
                            ▸
                          </button>
                        ) : (
                          <span className="size-4" />
                        )}
                        <span
                          aria-hidden
                          className="size-2.5 shrink-0 rounded-sm"
                          style={{ background: label === 0 ? "transparent" : LABELS[label], boxShadow: label === 0 ? "inset 0 0 0 1px #5c5c5c" : undefined }}
                        />
                        <span className={cn("min-w-0 grow truncate", row.kind === "group" && "font-semibold text-[#ececec]")}>
                          {name}
                          {row.kind === "group" && (
                            <span className="ml-1.5 rounded bg-white/10 px-1 text-[10px] font-normal tabular-nums text-[#a0a0a0]">
                              {row.members.length}
                            </span>
                          )}
                        </span>
                        <span className="w-5 text-right text-[10px] tabular-nums text-[#5c5c5c]">{row.index}</span>
                        <span className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                          {row.kind === "group" ? (
                            <>
                              <Switch
                                on={row.group.collapsed}
                                title={row.group.collapsed ? "Expand group in timeline" : "Collapse group in timeline"}
                                onClick={() => updateGroup(row.group.id, { collapsed: !row.group.collapsed })}
                              >
                                {row.group.collapsed ? "⊞" : "⊟"}
                              </Switch>
                              <Switch on={enabled} title="Video: enable or disable the whole group" onClick={() => setGroupEnabled(row.group.id, !enabled)}>
                                ●
                              </Switch>
                              <Switch on={row.group.locked} title="Lock the whole group" onClick={() => updateGroup(row.group.id, { locked: !row.group.locked })}>
                                <LockGlyph />
                              </Switch>
                            </>
                          ) : (
                            <>
                              <span className="size-5" />
                              <Switch on={row.layer.enabled} title="Video" onClick={() => toggleLayerEnabled(row.layer.id)}>
                                ●
                              </Switch>
                              <span className="size-5" />
                            </>
                          )}
                        </span>
                      </div>

                      {/* Track */}
                      <div ref={row === rows[0] ? trackRef : undefined} className="relative grow border-l border-white/[0.08]">
                        <div
                          role="slider"
                          tabIndex={isLocked(row) ? -1 : 0}
                          aria-label={`Move ${row.kind === "group" ? "group " : ""}${name} in time`}
                          aria-valuemin={0}
                          aria-valuemax={DURATION}
                          aria-valuenow={Math.round(start * 100) / 100}
                          aria-valuetext={`Starts at ${playheadCode(start)}`}
                          title={isLocked(row) ? "Locked" : row.kind === "group" ? "Drag to move the whole group in time" : "Drag to move in time"}
                          className={cn(
                            "absolute top-[5px] h-[15px] rounded-[3px] outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                            isLocked(row) ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing",
                            row.kind === "group" ? "border-[1.5px] bg-transparent" : "opacity-80",
                            dragging && "ring-1 ring-white/60",
                          )}
                          style={{
                            left: pct(start),
                            width: pct(Math.max(0.05, end - start)),
                            background:
                              row.kind === "group"
                                ? `repeating-linear-gradient(135deg, ${LABELS[label]}33 0 4px, transparent 4px 8px)`
                                : LABELS[label],
                            borderColor: row.kind === "group" ? LABELS[label] : undefined,
                          }}
                          onPointerDown={(e) => onBarDown(row, e)}
                          onPointerMove={onBarMove}
                          onPointerUp={onBarUp}
                          onPointerCancel={onBarUp}
                          onKeyDown={(e) => onBarKey(row, e)}
                        />
                        {keys.map((k) => (
                          <span
                            key={k}
                            aria-hidden
                            className={cn(
                              "pointer-events-none absolute top-[9px] size-[7px] -translate-x-1/2 rotate-45 border border-black/40",
                              row.kind === "group" ? "bg-[#cfcfcf]/70" : "bg-[#f0f0f0]",
                            )}
                            style={{ left: pct(k) }}
                          />
                        ))}
                        {dragging && row.kind === "group" && drag && (
                          <span
                            className="pointer-events-none absolute -top-5 z-20 rounded bg-[#4d8ef0] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white"
                            style={{ left: pct(start) }}
                          >
                            {timecode(drag.delta)}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Status bar */}
              <div className="flex h-6 items-center gap-2 border-t border-white/[0.08] px-2 text-[11px] text-[#8a8a8a]">
                <span>Product launch</span>
                <span className="grow" />
                <span className="tabular-nums">
                  {order.length} layers · {groupCount} groups · {aeRows.length} visible in timeline
                </span>
                <span className={cn("size-1.5 rounded-full", drag ? "bg-[#e0b341]" : "bg-[#4ba84b]")} />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 flex items-start gap-2 text-[13px] text-pt-sage">
          <InfoIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>
            Interactive illustration of the panel with sample layers, not a screenshot. Fold hides rows in the panel;
            collapse hides them in the After Effects timeline.
          </span>
        </p>
      </div>

      {/* The After Effects timeline, as it would look with collapsed groups hidden */}
      <aside aria-label="After Effects timeline preview" className="hidden lg:block">
        <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.08em] text-pt-sage">In the AE timeline</p>
        <ol className="overflow-hidden rounded-lg border border-pt-line bg-[#232323] font-[system-ui,-apple-system,'Segoe_UI',sans-serif] text-[11px] text-[#cfcfcf]">
          {aeRows.map((id) => {
            const g = groups[id]
            const l = layers[id]
            const label = g ? g.label : l.label
            return (
              <li key={id} className="flex h-[22px] items-center gap-1.5 border-b border-white/[0.05] px-2 last:border-b-0">
                <span className="w-4 text-right tabular-nums text-[#5c5c5c]">{order.indexOf(id) + 1}</span>
                <span
                  aria-hidden
                  className="size-2 shrink-0 rounded-[2px]"
                  style={{ background: label === 0 ? "transparent" : LABELS[label], boxShadow: label === 0 ? "inset 0 0 0 1px #5c5c5c" : undefined }}
                />
                <span className={cn("truncate", g && "font-semibold text-white")}>{g ? `▸ ${g.name}` : l.name}</span>
              </li>
            )
          })}
        </ol>
        <p className="mt-2 text-[12px] tabular-nums text-pt-sage">
          {aeRows.length} of {order.length} layers visible
        </p>
      </aside>
    </div>
  )
}

function PanelButton({
  primary,
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded px-2 text-[12px] transition-colors disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none",
        primary ? "bg-[#4d8ef0] text-white enabled:hover:bg-[#5f9af2]" : "bg-white/[0.06] text-[#d6d6d6] enabled:hover:bg-white/[0.12]",
        className,
      )}
    />
  )
}

function Switch({ on, title, onClick, children }: { on: boolean; title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "grid size-5 place-items-center rounded text-[11px] leading-none hover:bg-white/10",
        on ? "text-[#e6e6e6]" : "text-[#5c5c5c]",
      )}
    >
      {children}
    </button>
  )
}

function LockGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 12 12" className="size-3" fill="currentColor">
      <path d="M3.5 5V3.75a2.5 2.5 0 0 1 5 0V5H9.5v5.5h-7V5h1Zm1 0h3V3.75a1.5 1.5 0 0 0-3 0V5Z" />
    </svg>
  )
}

function Sep() {
  return <span aria-hidden className="mx-0.5 h-4 w-px bg-white/10" />
}
