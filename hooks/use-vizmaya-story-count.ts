"use client"

import { useEffect, useState } from "react"
import { FALLBACK_STORY_COUNT } from "@/lib/vizmaya"

/** Live vizmaya.fyi story count for client components; starts at the fallback. */
export function useVizmayaStoryCount() {
  const [count, setCount] = useState(FALLBACK_STORY_COUNT)

  useEffect(() => {
    let cancelled = false
    fetch("/api/vizmaya-stories")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (!cancelled && typeof data?.count === "number") setCount(data.count)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return count
}
