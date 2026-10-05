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
import { getCompanies } from "@/lib/portfolio"
import { getLatestDailyEditions, getVizmayaStoryCount } from "@/lib/vizmaya"
import { getFootshortsData } from "@/lib/footshorts"
import { getVizf1Data } from "@/lib/vizf1"

export const dynamic = 'force-dynamic'

export default async function Portfolio() {
  const companies = getCompanies()
  const [storyCount, dailyEditions, footshortsData, vizf1Data] = await Promise.all([
    getVizmayaStoryCount(),
    getLatestDailyEditions(),
    getFootshortsData(),
    getVizf1Data(),
  ])

  return (
    <PortfolioClient>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <CompaniesGrid companies={companies} />
        <HighlightBanner />
        <PeopleSection />
        <SkillsGrid />
        <VizmayaBanner storyCount={storyCount} />
        <AiDailySection editions={dailyEditions} />
        <VismayProducts footshortsData={footshortsData} vizf1Data={vizf1Data} />
        <ActionSection />
        <Footer />
      </div>
    </PortfolioClient>
  )
}
