/**
 * Public, read-only PostgREST reads against the vismay Supabase project that
 * backs footshorts and vizf1, with its anon key, as their sites do in the
 * browser. Throws when the env isn't set or a query fails.
 */
export async function vismayQuery<T>(
  table: string,
  params: Record<string, string>,
  revalidate: number
): Promise<T[]> {
  const url = process.env.VISMAY_SUPABASE_URL
  const key = process.env.VISMAY_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error("VISMAY_SUPABASE_URL / VISMAY_SUPABASE_ANON_KEY not set")
  const res = await fetch(`${url}/rest/v1/${table}?${new URLSearchParams(params)}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: { revalidate },
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) throw new Error(`${table}: ${res.status}`)
  return res.json()
}
