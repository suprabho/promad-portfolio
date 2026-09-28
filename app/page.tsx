import { HeroSection } from "@/components/hero-section"
import { CompaniesGrid } from "@/components/companies-grid"
import { SkillsGrid } from "@/components/skills-grid"
import Header from "@/components/header"
import { PeopleSection } from "@/components/people-section"
import { Footer } from "@/components/footer"
import { ActionSection } from "@/components/action-section"
import { PortfolioClient } from "@/components/portfolio-client"
import { HighlightBanner } from "@/components/highlight-banner"
import { VizmayaBanner } from "@/components/vizmaya-banner"
import { VismayProducts } from "@/components/vismay-products"
import { AiDailySection } from "@/components/ai-daily-section"
import { getCompaniesWithProjects } from "@/lib/payload"
import { getVizmayaStoryCount } from "@/lib/vizmaya"

export const dynamic = 'force-dynamic'

export default async function Portfolio() {
  // Fetch data from Payload CMS
  const [companies, storyCount] = await Promise.all([
    getCompaniesWithProjects(),
    getVizmayaStoryCount(),
  ])

  return (
    <PortfolioClient>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <HighlightBanner />
        <VizmayaBanner storyCount={storyCount} />
        <AiDailySection />
        <VismayProducts />
        <CompaniesGrid companies={companies} />
        <PeopleSection />
        <SkillsGrid />
        <ActionSection />
        <Footer />
      </div>
    </PortfolioClient>
  )
}
