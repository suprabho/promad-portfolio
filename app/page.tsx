import { HeroSection } from "@/components/hero-section"
import { CompaniesGrid } from "@/components/companies-grid"
import { SkillsGrid } from "@/components/skills-grid"
import { Header } from "@/components/header"
import { CardsSection } from "@/components/cards-section"
import { PeopleSection } from "@/components/people-section"
import { Footer } from "@/components/footer"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CompaniesGrid />
      <PeopleSection />
      <SkillsGrid />
      <Footer />
    </div>
  )
}
