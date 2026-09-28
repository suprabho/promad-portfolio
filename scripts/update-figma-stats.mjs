#!/usr/bin/env node
/**
 * Refreshes data/figma-plugin-stats.json with the current user counts of the
 * Figma Community plugins listed in app/ai-playbook/content.ts.
 *
 * Figma has no public stats API and its bot protection rejects headless
 * browsers, so this drives a headed Chromium (CI wraps it in xvfb-run) and
 * reads each plugin page. It prefers the `unique_run_count` field from the
 * JSON the page loads, and falls back to the "N users" text on the page.
 *
 * Strict: if any plugin can't be read, or a count drops by more than half
 * (almost certainly a parse error), it exits non-zero and writes nothing.
 * The file is only rewritten when a count actually changed.
 *
 *   xvfb-run -a node scripts/update-figma-stats.mjs
 *
 * Set PLAYWRIGHT_MODULE to a playwright entry file if it isn't resolvable
 * from the repo (the workflow installs it outside the project).
 */
import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath, pathToFileURL } from "node:url"
import path from "node:path"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const CONTENT_FILE = path.join(ROOT, "app/ai-playbook/content.ts")
const STATS_FILE = path.join(ROOT, "data/figma-plugin-stats.json")

/** Parses "364", "1,204" or "1.2k" into a number. */
export function parseCount(text) {
  const match = /^([\d.,]+)\s*([kKmM]?)$/.exec(text.trim())
  if (!match) return null
  const n = Number.parseFloat(match[1].replace(/,/g, ""))
  if (!Number.isFinite(n)) return null
  const mult = { k: 1e3, m: 1e6 }[match[2].toLowerCase()] ?? 1
  return Math.round(n * mult)
}

/** Finds `unique_run_count` on the object whose `id` is the plugin id. */
export function findRunCount(json, id) {
  if (!json || typeof json !== "object") return null
  if (String(json.id) === id && typeof json.unique_run_count === "number") {
    return json.unique_run_count
  }
  for (const value of Object.values(json)) {
    const found = findRunCount(value, id)
    if (found != null) return found
  }
  return null
}

/** Reads the user count off an already-configured Playwright page. */
export async function readPluginUsers(page, id, url) {
  let fromApi = null
  page.on("response", async (res) => {
    if (!(res.headers()["content-type"] ?? "").includes("json")) return
    try {
      const found = findRunCount(await res.json(), id)
      if (found != null) fromApi = found
    } catch {}
  })

  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 })
  if (fromApi != null) return fromApi

  const label = await page
    .getByText(/^[\d.,]+\s*[kKmM]?\s+users?$/i)
    .first()
    .textContent({ timeout: 10_000 })
    .catch(() => null)
  return label ? parseCount(label.replace(/users?/i, "")) : null
}

async function main() {
  const content = await readFile(CONTENT_FILE, "utf8")
  const ids = [...new Set([...content.matchAll(/figma\.com\/community\/plugin\/(\d+)/g)].map((m) => m[1]))]
  if (ids.length === 0) throw new Error("No Figma plugin URLs found in content.ts")

  const stats = JSON.parse(await readFile(STATS_FILE, "utf8"))
  const { chromium } = await import(
    process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : "playwright"
  )
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({ locale: "en-US", viewport: { width: 1280, height: 900 } })

  const next = {}
  const failures = []
  for (const id of ids) {
    const page = await context.newPage()
    const users = await readPluginUsers(page, id, `https://www.figma.com/community/plugin/${id}`).catch(
      (err) => (console.error(`  ${id}: ${err.message}`), null)
    )
    await page.close()

    const previous = stats.plugins[id]?.users
    if (users == null) failures.push(`${id}: no user count found`)
    else if (previous && users < previous / 2) failures.push(`${id}: ${previous} → ${users} looks wrong`)
    else next[id] = { users }
    console.log(`${id}: ${previous ?? "—"} → ${users ?? "?"}`)
  }
  await browser.close()

  if (failures.length) {
    console.error(`\nNot updating:\n  ${failures.join("\n  ")}`)
    process.exit(1)
  }

  const changed = ids.some((id) => stats.plugins[id]?.users !== next[id].users)
  if (!changed) {
    console.log("\nNo changes.")
    return
  }
  const updated = { updatedAt: new Date().toISOString().slice(0, 10), plugins: next }
  await writeFile(STATS_FILE, JSON.stringify(updated, null, 2) + "\n")
  console.log(`\nUpdated ${path.relative(ROOT, STATS_FILE)}.`)
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
