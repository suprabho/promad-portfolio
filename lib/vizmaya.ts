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

const EDITIONS_ENDPOINT =
  "https://vizmaya.fyi/api/ai-data-centers/editions?limit=3"

/** One Doom v Boom edition, as vizmaya.fyi's editions API returns it. */
export interface DailyEdition {
  number: number | null
  /** YYYY-MM-DD */
  date: string
  headline: string
  /** The Doom v Boom reading, −1…+1; null when nothing was scored. */
  moodScore: number | null
}

/**
 * The latest three Doom v Boom editions, newest first, cached for 15 minutes
 * (vizmaya.fyi publishes one each morning). Empty when the API can't be reached.
 */
export async function getLatestDailyEditions(): Promise<DailyEdition[]> {
  try {
    const res = await fetch(EDITIONS_ENDPOINT, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return []
    const body: unknown = await res.json()
    const editions = (body as { editions?: unknown })?.editions
    if (!Array.isArray(editions)) return []
    return editions
      .filter(
        (e): e is DailyEdition =>
          typeof e?.date === "string" && typeof e?.headline === "string"
      )
      .slice(0, 3)
      .map((e) => ({
        number: typeof e.number === "number" ? e.number : null,
        date: e.date,
        headline: e.headline,
        moodScore: typeof e.moodScore === "number" ? e.moodScore : null,
      }))
  } catch {
    return []
  }
}
