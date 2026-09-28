"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

/**
 * Cycles an index from 0 to `length - 1` every `interval` ms while `active`.
 * Holds at 0 when the user prefers reduced motion.
 */
export function useTicker(length: number, interval: number, active = true) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!active || reduce || length < 2) return
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % length),
      interval
    )
    return () => window.clearInterval(id)
  }, [length, interval, active, reduce])

  return index
}
