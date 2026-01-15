import { getCompanyBySlug, getCompanies } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'

// Generate static params for all companies at build time
export async function generateStaticParams() {
  const companies = await getCompanies()
  return companies
    .filter((company) => company.slug)
    .map((company) => ({
      slug: company.slug!,
    }))
}

// Generate metadata for each company page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)

  if (!company) {
    return {
      title: 'Company Not Found | Promad Design',
    }
  }

  return {
    title: `${company.name} | Promad Design`,
    description: company.description || `Explore our work with ${company.name}`,
  }
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)

  if (!company) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
          {company.thumbnail && (
            <Image
              src={company.thumbnail}
              alt={`${company.name} banner`}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <Link href="/companies">
                <Button variant="ghost" size="sm" className="mb-4 -ml-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Companies
                </Button>
              </Link>
              <div className="flex items-center gap-6">
                {(company.logo?.dark || company.logo?.light) && (
                  <div className="bg-background/90 backdrop-blur rounded-xl p-3 shadow-lg">
                    <Image
                      src={company.logo?.dark || company.logo?.light || ''}
                      alt={`${company.name} logo`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{company.name}</h1>
                  {company.period && (
                    <p className="font-mono text-lg text-muted-foreground">
                      {company.period}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {company.description && (
          <div className="container mx-auto px-4 py-12">
            <p className="text-xl text-muted-foreground max-w-3xl">
              {company.description}
            </p>
          </div>
        )}

        {/* Projects Section */}
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Projects ({company.projects.length})
          </h2>

          {company.projects.length === 0 ? (
            <p className="text-muted-foreground">No projects available yet.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {company.projects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug || project.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-full min-h-[200px] bg-muted">
                        {project.thumbnail && (
                          <Image
                            src={project.thumbnail}
                            alt={`${project.name} thumbnail`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <h3 className="font-serif italic text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        {project.description && (
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {project.description}
                          </p>
                        )}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 4).map((tagObj, tagIndex) => (
                              tagObj.tag && (
                                <Badge key={tagIndex} variant="secondary">
                                  {tagObj.tag}
                                </Badge>
                              )
                            ))}
                            {project.tags.length > 4 && (
                              <Badge variant="outline">+{project.tags.length - 4}</Badge>
                            )}
                          </div>
                        )}
                        <span className="text-primary font-medium text-sm">
                          View Project →
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
