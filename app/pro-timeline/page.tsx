import type { Metadata } from "next"
import { Instrument_Sans } from "next/font/google"
import { cn } from "@/lib/utils"
import { getLatestRelease, LOGO_SRC } from "./content"
import { Eyebrow, SectionTitle, Wrap } from "./components/Brand"
import { Features } from "./components/Features"
import { Header, Hero } from "./components/Hero"
import { PanelDemo } from "./components/PanelDemo"
import { Changelog, Faq, Footer, Install } from "./components/Sections"

// Typeface for this page only; mapped to font-pt in tailwind.config.ts
const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" })

const title = "Pro Timeline by Promad · Layer groups for After Effects"
const description = "Group, collapse, and move layers together in After Effects. A free, dockable panel from Promad."
const ogImage = "/images/products/pro-timeline/preview.png"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://promad.design/pro-timeline" },
  icons: { icon: [{ url: LOGO_SRC, type: "image/svg+xml" }] },
  openGraph: {
    title,
    description,
    url: "https://promad.design/pro-timeline",
    siteName: "Promad Design",
    images: [{ url: ogImage, width: 500, height: 500, alt: "Pro Timeline logo on graphite" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [ogImage],
    creator: "@suprabho",
  },
}

// Release data is fetched at build time and refreshed hourly
export const revalidate = 3600

export default async function ProTimelinePage() {
  const release = await getLatestRelease()

  return (
    <div
      className={cn(
        instrumentSans.variable,
        "min-h-screen bg-pt-graphite font-pt text-[16px] leading-[1.55] text-pt-chalk antialiased selection:bg-pt-lime selection:text-pt-graphite",
      )}
    >
      <Header release={release} />
      <main>
        <Hero release={release} />

        <section id="demo" className="scroll-mt-16 border-t border-pt-line bg-[#0E1114]">
          <Wrap className="py-[clamp(56px,8vw,112px)]">
            <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
              <div>
                <Eyebrow>See it in action</Eyebrow>
                <SectionTitle className="max-w-[20ch]">Try the panel right here.</SectionTitle>
              </div>
              <ul className="space-y-1.5 text-[15px] text-pt-sage">
                <li>
                  <span className="text-pt-chalk">Drag a group bar</span> to move every member and its keyframes.
                </li>
                <li>
                  <span className="text-pt-chalk">Press ⊟ or ⊞</span> to collapse or expand a group in the timeline.
                </li>
                <li>
                  <span className="text-pt-chalk">Shift-click loose layers</span>, then + Group.
                </li>
              </ul>
            </div>
            <PanelDemo />
          </Wrap>
        </section>

        <Features />
        <Install release={release} />
        <Changelog release={release} />
        <Faq />
      </main>
      <Footer release={release} />
    </div>
  )
}
