import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ProjectActions } from "@/components/project-actions"
import { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
  isReversed?: boolean
}

export function ProjectCard({ project, isReversed = false }: ProjectCardProps) {
  const ContentSection = () => (
    <div className="flex flex-col items-start h-full justify-center">
      <h4 className="font-serif italic font-extrabold text-3xl">{project.name}</h4>
      <p className="text-muted-foreground">{project.description}</p>
      <div className="flex flex-wrap gap-2 my-4">
        {project.tags.map((tag, tagIndex) => (
          <Badge key={tagIndex} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <ProjectActions 
        url={project.url}
        urlName={project.urlName}
        details={project.details}
        thumbnail={project.thumbnail}
      />
    </div>
  )

  const ImageSection = () => (
    <div className="relative h-80 w-full bg-muted rounded-lg overflow-hidden">
      <Image
        src={project.thumbnail}
        alt={`${project.name} thumbnail`}
        fill
        className="object-cover"
      />
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {isReversed ? (
        <>
          <div className="md:col-start-2">
            <ImageSection />
          </div>
          <div className="md:col-start-1 md:row-start-1">
            <ContentSection />
          </div>
        </>
      ) : (
        <>
          <div>
            <ImageSection />
          </div>
          <div>
            <ContentSection />
          </div>
        </>
      )}
        
      </div>
    </div>
  )
} 