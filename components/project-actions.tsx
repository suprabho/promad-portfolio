import { Button } from "@/components/ui/button"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { CaseStudy } from "@/components/case-study"
import { CaseStudyDetails } from "@/types/project"

interface ProjectActionsProps {
  url?: string
  urlText?: string
  details?: string | CaseStudyDetails
}

export function ProjectActions({ url, urlText, details }: ProjectActionsProps) {
  const hasCaseStudy = details && typeof details === 'object'

  return (
    <div className="flex flex-row gap-2">
      {url && (
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer" 
          >
            <ArrowSquareOutIcon />
            {urlText || 'Visit Project'}
          </a>
        </Button>
      )}
      {hasCaseStudy && typeof details === 'object' && (
        <CaseStudy details={details} />
      )}
    </div>
  )
} 