import { ProjectCard } from "@/components/project-card"

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
  logo?: {
    dark: string
    light: string
  }
  description: string
  thumbnail: string
  tags: string[]
  details?: string | CaseStudyDetails
  url?: string
  urlName?: string
}

interface ProjectDisplayProps {
  project: Project
  index: number
}

export function ProjectDisplay({ project, index }: ProjectDisplayProps) {
  return <ProjectCard project={project} isReversed={index % 2 !== 0} />
} 