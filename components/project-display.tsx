import { ProjectCard } from "@/components/project-card"

import { Project } from "@/types/project"

interface ProjectDisplayProps {
  project: Project
  index: number
}

export function ProjectDisplay({ project, index }: ProjectDisplayProps) {
  return <ProjectCard project={project} isReversed={index % 2 !== 0} />
} 