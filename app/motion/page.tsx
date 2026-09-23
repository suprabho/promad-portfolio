import type { Metadata } from "next"
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google"
import { cn } from "@/lib/utils"
import { About } from "./components/About"
import { Hero } from "./components/Hero"
import { MotionFooter } from "./components/MotionFooter"
import { WorkSection } from "./components/WorkSection"

// Typefaces for this page only; mapped to font-motion-* in tailwind.config.ts
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })
const fraunces = Fraunces({ subsets: ["latin"], style: "italic", axes: ["opsz"], variable: "--font-fraunces" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

const title = "Video & Motion | Promad Design"
const description =
  "Seven years of motion work from Promad Design Studio: product teasers and explainers, course and training video, UI micro-interactions, brand and social motion, and a live Rive mascot rig."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://promad.design/motion",
    siteName: "Promad Design",
    images: [{ url: "/images/hero-bg.webp", width: 1200, height: 630, alt: "Promad Design Portfolio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bg.webp"],
    creator: "@suprabho",
  },
}

export default function MotionPage() {
  return (
    <div
      className={cn(
        jakarta.variable,
        fraunces.variable,
        jetbrainsMono.variable,
        "min-h-screen bg-motion-ground font-motion-display text-[16px] leading-[1.55] text-motion-foreground antialiased",
      )}
    >
      <Hero />
      <main>
        <About />
        <WorkSection />
      </main>
      <MotionFooter />
    </div>
  )
}
