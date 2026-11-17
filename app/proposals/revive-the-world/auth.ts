// Server-only: reads the password from the environment and the request cookies
import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

/** Where the proposal lives; the access cookie is scoped to this path */
export const PROPOSAL_PATH = "/proposals/revive-the-world"

export const ACCESS_COOKIE = "rtw_proposal_access"

/** How long a correct password keeps the proposal unlocked */
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30

/**
 * Password for this proposal, set as RTW_PROPOSAL_PASSWORD in the Vercel
 * project (and in .env.local for local dev). Without it the page stays locked.
 */
function configuredPassword() {
  const password = process.env.RTW_PROPOSAL_PASSWORD?.trim()
  return password ? password : null
}

export function isPasswordConfigured() {
  return configuredPassword() !== null
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest()
}

/** Constant-time compare that also works for inputs of different lengths */
function safeEqual(a: string, b: string) {
  return timingSafeEqual(sha256(a), sha256(b))
}

/**
 * Cookie value derived from the password, so it can't be forged without
 * knowing it, and changing the password signs everyone out.
 */
export function accessToken() {
  const password = configuredPassword()
  if (!password) return null
  return createHmac("sha256", password).update("rtw-proposal-access-v1").digest("hex")
}

export function checkPassword(attempt: string) {
  const password = configuredPassword()
  if (!password) return false
  return safeEqual(attempt.trim(), password)
}

export async function hasAccess() {
  const token = accessToken()
  if (!token) return false
  const cookie = (await cookies()).get(ACCESS_COOKIE)?.value
  return cookie ? safeEqual(cookie, token) : false
}
