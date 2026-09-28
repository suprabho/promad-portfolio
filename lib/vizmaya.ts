const STORIES_ENDPOINT = "https://vizmaya.fyi/api/stories/themes"

/** Shown when vizmaya.fyi can't be reached. */
export const FALLBACK_STORY_COUNT = 13

/**
 * Number of published stories on vizmaya.fyi, cached for an hour.
 * The endpoint returns one entry per non-draft story.
 */
export async function getVizmayaStoryCount(): Promise<number> {
  try {
    const res = await fetch(STORIES_ENDPOINT, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return FALLBACK_STORY_COUNT
    const stories: unknown = await res.json()
    return Array.isArray(stories) && stories.length > 0
      ? stories.length
      : FALLBACK_STORY_COUNT
  } catch {
    return FALLBACK_STORY_COUNT
  }
}

/** Replaces `{stories}` in copy with the live story count, e.g. "42+". */
export function withStoryCount(text: string, count: number) {
  return text.replaceAll("{stories}", `${count}+`)
}
