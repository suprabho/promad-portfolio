import { getProjects, type CompanyFromCMS } from '@/lib/payload'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Promad Design',
  description: 'Browse all our projects and case studies across various companies and industries.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our complete portfolio of design and development work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const companyData = typeof project.company === 'object' 
                ? project.company as CompanyFromCMS 
                : null

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug || project.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative h-48 w-full bg-muted">
                      {project.thumbnail && (
                        <Image
                          src={project.thumbnail}
                          alt={`${project.name} thumbnail`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60" />
                    </div>
                    <div className="p-6">
                      <h2 className="font-serif italic text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h2>
                      {companyData && (
                        <p className="font-mono text-sm text-primary/80 mb-3">
                          @ {companyData.name}
                        </p>
                      )}
                      {project.description && (
                        <p className="text-muted-foreground line-clamp-2 mb-4">
                          {project.description}
                        </p>
                      )}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tagObj, tagIndex) => (
                            tagObj.tag && (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tagObj.tag}
                              </Badge>
                            )
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      <span className="text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        View Project →
                      </span>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects available yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
