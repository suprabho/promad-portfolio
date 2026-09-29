import Link from "next/link"
import { ArrowDownIcon, ArrowLeftIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr"
import { downloadHref, REQUIREMENTS, type Release } from "../content"
import { Lockup, Mark, PrimaryLink, SecondaryLink, Wrap } from "./Brand"

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#install", label: "Install" },
  { href: "#changelog", label: "Changelog" },
  { href: "#faq", label: "FAQ" },
]

export function Header({ release }: { release: Release | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-pt-line/70 bg-pt-graphite/85 backdrop-blur-md">
      <Wrap className="flex h-16 items-center justify-between gap-6">
        <a href="#top" aria-label="Pro Timeline by Promad, back to top" className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pt-lime">
          <Lockup size={36} byline={false} />
        </a>
        <nav aria-label="Page" className="hidden items-center gap-7 text-[14px] text-pt-sage md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-pt-chalk">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={downloadHref(release)}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-pt-lime px-3.5 text-[14px] font-medium text-pt-graphite transition-colors hover:bg-[#d4f78a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pt-lime"
        >
          <DownloadSimpleIcon aria-hidden weight="bold" className="size-4" />
          Download
        </a>
      </Wrap>
    </header>
  )
}

export function Hero({ release }: { release: Release | null }) {
  const versionLabel = release
    ? `v${release.version}${release.prerelease ? " · beta" : ""}`
    : "1.0 in beta"

  return (
    <section id="top" className="relative overflow-hidden">
      <Wrap className="pb-[clamp(48px,7vw,96px)] pt-[clamp(24px,4vw,40px)]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.1em] text-pt-sage transition-colors hover:text-pt-chalk"
        >
          <ArrowLeftIcon aria-hidden weight="bold" className="size-3.5" />
          promad.design
        </Link>

        <div className="mt-[clamp(32px,6vw,72px)] grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div>
            <Mark size={72} priority className="mb-8 lg:hidden" />
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-pt-line px-3 py-1 text-[13px] text-pt-sage">
              <span aria-hidden className="size-1.5 rounded-full bg-pt-lime" />
              Layer groups for After Effects
            </p>
            <h1 className="text-balance text-[clamp(44px,7.4vw,96px)] font-semibold leading-[0.98] tracking-[-0.035em] text-pt-chalk">
              Make room for motion.
            </h1>
            <p className="mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,20px)] leading-[1.5] text-pt-sage">
              Pro Timeline brings clear structure to your busiest After Effects compositions. Organize related
              layers into groups, collapse the busy parts, and move whole groups in time together.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PrimaryLink href={downloadHref(release)}>
                <DownloadSimpleIcon aria-hidden weight="bold" className="size-[18px]" />
                Download Pro Timeline
              </PrimaryLink>
              <SecondaryLink href="#demo">
                See it in action
                <ArrowDownIcon aria-hidden className="size-4" />
              </SecondaryLink>
            </div>

            <dl className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-pt-sage">
              <div className="flex gap-1.5">
                <dt className="sr-only">Version</dt>
                <dd className="tabular-nums text-pt-chalk">{versionLabel}</dd>
              </div>
              {REQUIREMENTS.map((r) => (
                <div key={r.term} className="flex gap-1.5">
                  <dt className="sr-only">{r.term}</dt>
                  <dd>{r.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The approved mark on graphite, with generous clear space */}
          <div className="hidden justify-center lg:flex">
            <div className="grid aspect-square w-full max-w-[380px] place-items-center rounded-3xl border border-pt-line">
              <Mark size={240} priority />
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  )
}
