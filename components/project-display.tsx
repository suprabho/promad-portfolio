import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CaseStudy } from "@/components/case-study"

interface CaseStudyDetails {
  title: string
  projectOverview: string
  theChallenge: {
    heading: string
    description: string
    interfaceQualities: string[]
  }
  ourApproach: {
    heading: string
    description: string
    phases: {
      name: string
      points: string[]
    }[]
  }
  keyOutcomes: {
    heading: string
    points: string[]
  }
  lessonsLearned: {
    heading: string
    points: string[]
  }
  conclusion: string
}

interface Project {
  name: string
  description: string
  thumbnail: string
  tags: string[]
  details?: string | CaseStudyDetails
}

interface ProjectDisplayProps {
  project: Project
  index: number
}

export function ProjectDisplay({ project, index }: ProjectDisplayProps) {
  const hasCaseStudy = project.details && typeof project.details === 'object'

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {index % 2 === 0 ? (
          <>
            <div className="space-y-2">
              <h4 className="font-semibold mb-4 text-lg">{project.name}</h4>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              {hasCaseStudy && typeof project.details === 'object' && (
              <div className="mt-4">
                <CaseStudy details={project.details} />
              </div>
            )}
            </div>
            <div className="relative h-48 w-full bg-muted rounded-lg overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={`${project.name} thumbnail`}
                fill
                className="object-cover"
              />
            </div>
            
          </>
        ) : (
          <>
            <div className="relative h-48 w-full bg-muted rounded-lg overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={`${project.name} thumbnail`}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold mb-4 text-lg">{project.name}</h4>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            {hasCaseStudy && typeof project.details === 'object' && (
              <div className="mt-4">
                <CaseStudy details={project.details} />
              </div>
            )}
          </>
        )}
      </div>

      

    </div>
  )
} 