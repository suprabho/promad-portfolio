import type { Metadata } from "next"
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google"
import { cn } from "@/lib/utils"
import { MotionFooter } from "@/app/motion/components/MotionFooter"
import { hasAccess } from "./auth"
import { ApproachSection } from "./components/ApproachSection"
import { BriefSection } from "./components/BriefSection"
import { PasswordGate } from "./components/PasswordGate"
import { PricingSection } from "./components/PricingSection"
import { ProposalHero } from "./components/ProposalHero"
import { RelevantWork } from "./components/RelevantWork"
import { TermsSection } from "./components/TermsSection"

// Same typefaces as /motion; mapped to font-motion-* in tailwind.config.ts
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })
const fraunces = Fraunces({ subsets: ["latin"], style: "italic", axes: ["opsz"], variable: "--font-fraunces" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

// Access depends on the request cookie, so never prerender or cache this page
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Revive The World × Promad — Motion Proposal & Rate Card",
  description: "A private motion proposal and rate card from Promad Design Studio.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: null,
  twitter: null,
}

export default async function ReviveTheWorldProposalPage() {
  const unlocked = await hasAccess()

  return (
    <div
      className={cn(
        jakarta.variable,
        fraunces.variable,
        jetbrainsMono.variable,
        "min-h-screen bg-motion-ground font-motion-display text-[16px] leading-[1.55] text-motion-foreground antialiased",
      )}
    >
      {unlocked ? (
        <>
          <ProposalHero />
          <main>
            <BriefSection />
            <RelevantWork />
            <ApproachSection />
            <PricingSection />
            <TermsSection />
          </main>
          <MotionFooter note="RTW motion proposal · v1.0 · Nov 2026" />
        </>
      ) : (
        <PasswordGate />
      )}
    </div>
  )
}
