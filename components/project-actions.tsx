import { Button } from "@/components/ui/button"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { sendAnalyticsEvent } from "@/lib/analytics"

interface ProjectActionsProps {
  url?: string
  urlName?: string
}

export function ProjectActions({ url, urlName }: ProjectActionsProps) {
  if (!url) return null

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="font-mono hover:bg-[#FAFF00] hover:text-black"
        asChild
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"

          onClick={() => {
            sendAnalyticsEvent('project_link_click', {
              project_url: url,
              project_name: urlName || 'Visit Project'
            })
          }}
        >
          <ArrowSquareOutIcon />
          {urlName || 'Visit Project'}
        </a>
      </Button>
    </div>
  )
}
