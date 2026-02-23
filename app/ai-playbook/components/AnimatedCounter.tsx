"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useTransform, animate } from "framer-motion"

export function AnimatedCounter({
  target,
  duration = 2,
}: {
  target: number
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (isInView) {
      animate(motionValue, target, { duration })
    }
  }, [isInView, motionValue, target, duration])

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return unsubscribe
  }, [rounded])

  return <span ref={ref}>0</span>
}
