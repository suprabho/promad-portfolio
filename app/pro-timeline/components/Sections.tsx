import {
  ArrowUpRightIcon,
  BugIcon,
  CaretDownIcon,
  DownloadSimpleIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/dist/ssr"
import {
  downloadHref,
  FALLBACK_NOTES,
  FAQ,
  INSTALL_STEPS,
  ISSUES_URL,
  LICENSE_URL,
  RELEASES_URL,
  REPO_URL,
  REQUIREMENTS,
  ZXP_INSTALLER_URL,
  type Release,
} from "../content"
import { Eyebrow, Lockup, PrimaryLink, SecondaryLink, SectionTitle, Wrap } from "./Brand"

export function Install({ release }: { release: Release | null }) {
  return (
    <section id="install" className="scroll-mt-16 border-t border-pt-line">
      <Wrap className="grid gap-12 py-[clamp(56px,8vw,112px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <Eyebrow>Installation guide</Eyebrow>
          <SectionTitle>Install in three steps.</SectionTitle>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.55] text-pt-sage">
            Pro Timeline ships as a signed .zxp extension. The ZXP/UXP Installer puts it in the right place on
            macOS and Windows.
          </p>

          <dl className="mt-8 divide-y divide-pt-line rounded-xl border border-pt-line">
            {REQUIREMENTS.map((r) => (
              <div key={r.term} className="flex justify-between gap-6 px-5 py-3.5 text-[14px]">
                <dt className="text-pt-sage">{r.term}</dt>
                <dd className="text-right text-pt-chalk">{r.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryLink href={downloadHref(release)}>
              <DownloadSimpleIcon aria-hidden weight="bold" className="size-[18px]" />
              Download Pro Timeline
            </PrimaryLink>
            <SecondaryLink href={ZXP_INSTALLER_URL}>
              ZXP/UXP Installer
              <ArrowUpRightIcon aria-hidden className="size-4" />
            </SecondaryLink>
          </div>
        </div>

        <ol className="space-y-3">
          {INSTALL_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-5 rounded-2xl border border-pt-line bg-pt-surface p-6">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-pt-lime text-[15px] font-semibold tabular-nums text-pt-graphite">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-pt-chalk">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.55] text-pt-sage">{step.body}</p>
                {step.menu && (
                  <p className="mt-3 inline-block rounded-md bg-pt-raised px-2.5 py-1 text-[14px] text-pt-chalk">
                    {step.menu}
                  </p>
                )}
              </div>
            </li>
          ))}
          <li className="px-1 pt-2 text-[14px] leading-[1.55] text-pt-sage">
            The panel checks GitHub once when it opens and notes a newer version in its status bar. Download
            the new file here and install it the same way.
          </li>
        </ol>
      </Wrap>
    </section>
  )
}

function formatDate(iso: string) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export function Changelog({ release }: { release: Release | null }) {
  const notes = release?.notes.length ? release.notes : FALLBACK_NOTES
  return (
    <section id="changelog" className="scroll-mt-16 border-t border-pt-line">
      <Wrap className="grid gap-10 py-[clamp(56px,8vw,112px)] lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <div>
          <Eyebrow>Changelog</Eyebrow>
          <SectionTitle>What&apos;s new</SectionTitle>
          <a
            href={RELEASES_URL}
            className="mt-6 inline-flex items-center gap-1.5 text-[15px] text-pt-chalk underline decoration-pt-line underline-offset-4 transition-colors hover:decoration-pt-lime"
          >
            All releases on GitHub
            <ArrowUpRightIcon aria-hidden className="size-4" />
          </a>
        </div>

        <article className="rounded-2xl border border-pt-line bg-pt-surface p-[clamp(24px,3vw,36px)]">
          <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-[24px] font-semibold tabular-nums tracking-[-0.02em] text-pt-chalk">
              {release ? `v${release.version}` : "1.0.0"}
            </h3>
            {release?.prerelease || !release ? (
              <span className="rounded-full border border-pt-lime/50 px-2.5 py-0.5 text-[12px] font-medium text-pt-lime">
                Beta
              </span>
            ) : null}
            <span className="text-[14px] text-pt-sage">
              {release ? formatDate(release.date) : "First public release, in beta testing"}
            </span>
          </header>
          <ul className="mt-6 space-y-3.5">
            {notes.map((note) => (
              <li key={note} className="flex gap-3 text-[15px] leading-[1.55] text-pt-sage">
                <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-[1px] bg-pt-lime" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
          {release && (
            <a
              href={release.url}
              className="mt-7 inline-flex items-center gap-1.5 text-[14px] text-pt-chalk underline decoration-pt-line underline-offset-4 hover:decoration-pt-lime"
            >
              Release notes on GitHub
              <ArrowUpRightIcon aria-hidden className="size-3.5" />
            </a>
          )}
        </article>
      </Wrap>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 border-t border-pt-line">
      <Wrap className="grid gap-10 py-[clamp(56px,8vw,112px)] lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <SectionTitle>Good to know</SectionTitle>
        </div>
        <div className="divide-y divide-pt-line border-y border-pt-line">
          {FAQ.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-pt-chalk marker:hidden [&::-webkit-details-marker]:hidden">
                {item.q}
                <CaretDownIcon
                  aria-hidden
                  className="size-4 shrink-0 text-pt-sage transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="max-w-[62ch] pb-6 text-[15px] leading-[1.6] text-pt-sage">
                {item.a}
                {item.q.startsWith("Where do I report") && (
                  <>
                    {" "}
                    <a href={ISSUES_URL} className="text-pt-chalk underline decoration-pt-line underline-offset-4 hover:decoration-pt-lime">
                      Open GitHub Issues
                    </a>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

export function Footer({ release }: { release: Release | null }) {
  return (
    <footer className="border-t border-pt-line">
      <Wrap className="py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Lockup size={48} />
            <p className="mt-5 max-w-[40ch] text-[15px] text-pt-sage">
              Group, collapse, and move layers together in After Effects.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryLink href={downloadHref(release)}>
              <DownloadSimpleIcon aria-hidden weight="bold" className="size-[18px]" />
              Download Pro Timeline
            </PrimaryLink>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-pt-line pt-8 text-[13px] text-pt-sage md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={REPO_URL} className="inline-flex items-center gap-1.5 hover:text-pt-chalk">
                <GithubLogoIcon aria-hidden className="size-4" /> GitHub
              </a>
            </li>
            <li>
              <a href={ISSUES_URL} className="inline-flex items-center gap-1.5 hover:text-pt-chalk">
                <BugIcon aria-hidden className="size-4" /> Report a bug
              </a>
            </li>
            <li>
              <a href={LICENSE_URL} className="hover:text-pt-chalk">
                Freeware license
              </a>
            </li>
            <li>
              <a href="mailto:hello@promad.design" className="hover:text-pt-chalk">
                hello@promad.design
              </a>
            </li>
          </ul>
          <p>
            © 2026{" "}
            <a href="/" className="hover:text-pt-chalk">
              Promad Design Studio
            </a>
          </p>
        </div>
        <p className="mt-6 max-w-[80ch] text-[12px] leading-[1.5] text-pt-sage/70">
          Adobe and After Effects are either registered trademarks or trademarks of Adobe in the United States
          and/or other countries. Pro Timeline is made by Promad and is not affiliated with Adobe.
        </p>
      </Wrap>
    </footer>
  )
}
