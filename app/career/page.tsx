"use client"

import Header from "@/components/header"
import { Hero } from "./components/Hero"
import { ElevatorPitch } from "./components/ElevatorPitch"
import { TimelineSection } from "./components/TimelineSection"
import { ProblemBlock } from "./components/ProblemBlock"
import { EpiphanyBlock } from "./components/EpiphanyBlock"
import { SolutionBlock } from "./components/SolutionBlock"
import { Companies } from "./components/Companies"
import { Stats } from "./components/Stats"
import { CareerFooter } from "./components/CareerFooter"

export default function CareerPage() {
  return (
    <>
      <iframe
        src="https://aura.promad.design/embed/magenta-wavy-gradient-header-dynamic-website-design"
        className="fixed inset-0 w-full h-full border-0 z-0 pointer-events-none"
        style={{ borderRadius: 0 }}
        allowFullScreen
      />
      <div className="relative z-50">
        <Header />
      </div>
      <div
        className="relative z-10 min-h-screen overflow-x-hidden"
        style={{ color: "#f0ede6", fontFamily: "var(--font-manrope, sans-serif)" }}
      >
      <style>{`
        @media (max-width: 768px) {
          .timeline-track { max-width: 100% !important; }
        }
      `}</style>

      <Hero />
      <ElevatorPitch />
      <TimelineSection />

      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
      >
        <div className="max-w-[960px] mx-auto">
          <ProblemBlock />
          <EpiphanyBlock />
          <SolutionBlock />
        </div>
      </section>

      <Companies />
      <Stats />
      <CareerFooter />
      <div>
        
      </div>
    </div>
    </>
  )
}
