import { CompaniesTimeline } from "@/components/companies-timeline"

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-8 pb-4 container">
        <h1 className="text-4xl font-bold">Career Timeline</h1>
        <p className="text-muted-foreground mt-2">A chronological journey through my professional experience</p>
      </div>
      <CompaniesTimeline />
    </div>
  )
} 