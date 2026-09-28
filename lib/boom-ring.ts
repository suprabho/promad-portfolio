/**
 * The Doom v Boom score ring's still dots, ported from the vismay monorepo
 * (apps/vizmaya-fyi/app/ai-daily/doom-v-boom/components/particleRing.ts) so the
 * cards here draw the same ring vizmaya.fyi does: seeded particles on a tilted
 * ring, the boom share of them green and the rest red.
 */

const CAMERA_Z = 8
const TAN_HALF_FOV = Math.tan((25 * Math.PI) / 180)
const MAX_R = CAMERA_Z * TAN_HALF_FOV

const RING = {
  ringRadius: 0.62,
  ringWidth: 0.1,
  dispersion: 0.14,
  particleSize: 2.1,
  tiltX: (78 * Math.PI) / 180,
}

/** The same seed as vizmaya.fyi's rings, so every ring of the series is one shape. */
const SEED = 7

export interface RingDot {
  x: number
  y: number
  r: number
  /** Boom-coloured while u < the day's boom share. */
  u: number
}

/** mulberry32 */
function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** The Doom v Boom reading (−1…+1) as the share of scored stories that were boom (0…1). */
export function boomShare(score: number): number {
  return (Math.max(-1, Math.min(1, score)) + 1) / 2
}

/** `count` dots at rest in a 100 × 100 viewBox. */
export function ringDots(count: number): RingDot[] {
  const rnd = seededRandom(SEED * 7919 + 101)
  // Stratified thresholds make the boom share exact, then shuffle them round the ring.
  const u = Array.from({ length: count }, (_, i) => (i + 0.5) / count)
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[u[i], u[j]] = [u[j], u[i]]
  }
  const box = 320
  const k = 100 / box
  const size = Math.max(RING.particleSize, 260 / box)
  const cosX = Math.cos(RING.tiltX)
  const sinX = Math.sin(RING.tiltX)

  return u.map((threshold, i) => {
    rnd() // angle: replaced by an even spread so a few dozen dots still read as a ring
    const baseRadius = RING.ringRadius + (rnd() - 0.5) * RING.ringWidth
    const dX = (rnd() - 0.5) * RING.dispersion
    const dY = (rnd() - 0.5) * RING.dispersion
    const dZ = (rnd() - 0.5) * RING.dispersion * 0.3
    const pSize = 0.5 + rnd() * 0.5
    const phase = rnd() * Math.PI * 2
    rnd() // pulseSpeed
    const delay = rnd()

    const angle = ((i + delay * 0.8) / count) * Math.PI * 2
    const radius = (baseRadius + Math.sin(phase) * 0.02) * MAX_R
    const lx = Math.cos(angle) * radius + dX * MAX_R
    const lz = Math.sin(angle) * radius + dZ * MAX_R
    const ly = dY * MAX_R * 0.3
    const distFactor = 1 - Math.min(Math.sqrt(lx * lx + ly * ly + lz * lz) / MAX_R, 1)
    const scale = size * pSize * 0.04 * (0.4 + distFactor * 1.2)
    const wy = ly * cosX - lz * sinX
    const wz = ly * sinX + lz * cosX
    const f = box / 2 / (Math.max(CAMERA_Z - wz, 0.5) * TAN_HALF_FOV)
    const round2 = (n: number) => Math.round(n * 100) / 100
    return {
      x: round2((box / 2 + lx * f) * k),
      y: round2((box / 2 - wy * f) * k),
      r: round2(Math.max(0.45, scale * f) * k),
      u: threshold,
    }
  })
}
