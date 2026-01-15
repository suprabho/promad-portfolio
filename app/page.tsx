import { HeroSection } from "@/components/hero-section"
import { CompaniesGrid } from "@/components/companies-grid"
import { SkillsGrid } from "@/components/skills-grid"
import Header from "@/components/header"
import { PeopleSection } from "@/components/people-section"
import { Footer } from "@/components/footer"
import { ActionSection } from "@/components/action-section"
import { PortfolioClient } from "@/components/portfolio-client"
import { getCompaniesWithProjects } from "@/lib/payload"

export default async function Portfolio() {
  // Fetch data from Payload CMS
  const companies = await getCompaniesWithProjects()

  return (
    <PortfolioClient>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <CompaniesGrid companies={companies} />
        <PeopleSection />
        <SkillsGrid />
        <ActionSection />
        <Footer />
      </div>
    </PortfolioClient>
  )
}
