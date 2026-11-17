"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  PROPOSAL_PATH,
  accessToken,
  checkPassword,
  isPasswordConfigured,
} from "./auth"

export type UnlockState = { error: string | null }

export async function unlockProposal(_previous: UnlockState, formData: FormData): Promise<UnlockState> {
  if (!isPasswordConfigured()) {
    return { error: "This proposal isn't available yet. Please contact hello@promad.design." }
  }

  const attempt = formData.get("password")
  if (typeof attempt !== "string" || !checkPassword(attempt)) {
    // Slow down guessing
    await new Promise((resolve) => setTimeout(resolve, 600))
    return { error: "That password didn't match. Please try again." }
  }

  const store = await cookies()
  store.set(ACCESS_COOKIE, accessToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: PROPOSAL_PATH,
    maxAge: ACCESS_MAX_AGE,
  })
  redirect(PROPOSAL_PATH)
}

export async function lockProposal() {
  const store = await cookies()
  store.delete({ name: ACCESS_COOKIE, path: PROPOSAL_PATH })
  redirect(PROPOSAL_PATH)
}
