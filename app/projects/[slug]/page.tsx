import { getProjectBySlug, getProjects, type CompanyFromCMS } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects
    .filter((project) => project.slug)
    .map((project) => ({
      slug: project.slug!,
    }))
}

// Generate metadata for each project page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Promad Design',
    }
  }

  return {
    title: `${project.name} | Promad Design`,
    description: project.description || `Explore our ${project.name} project`,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const companyData = typeof project.company === 'object'
    ? project.company as CompanyFromCMS
    : null

  // Get case study data if available
  const caseStudyBlock = project.details?.find(
    (block: any) => block.blockType === 'caseStudy'
  )
  const simpleDetailsBlock = project.details?.find(
    (block: any) => block.blockType === 'simpleDetails'
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt={`${project.name} banner`}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="mb-4 -ml-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
              <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {project.name}
              </h1>
              {companyData && (
                <Link
                  href={`/companies/${companyData.slug || companyData.id}`}
                  className="inline-flex items-center gap-2 font-mono text-lg text-primary hover:underline"
                >
                  @ {companyData.name}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Tags & Actions Section */}
        <div className="container mx-auto px-4 py-8 border-b">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tagObj, index) => (
                tagObj.tag && (
                  <Badge key={index} variant="secondary">
                    {tagObj.tag}
                  </Badge>
                )
              ))}
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  {project.urlName || 'Visit Project'}
                  <ArrowSquareOut className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Description Section */}
        {project.description && (
          <div className="container mx-auto px-4 py-12">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* Case Study Section */}
        {caseStudyBlock && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Project Overview */}
              {caseStudyBlock.projectOverview && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {caseStudyBlock.projectOverview}
                  </p>
                </section>
              )}

              {/* The Challenge */}
              {caseStudyBlock.theChallenge && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {caseStudyBlock.theChallenge.heading || 'The Challenge'}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {caseStudyBlock.theChallenge.description}
                  </p>
                  {(caseStudyBlock.theChallenge.interfaceQualities?.length > 0 || 
                    caseStudyBlock.theChallenge.animationGoals?.length > 0) && (
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      {caseStudyBlock.theChallenge.interfaceQualities?.map((q: any, i: number) => (
                        <li key={`iq-${i}`}>{q.item}</li>
                      ))}
                      {caseStudyBlock.theChallenge.animationGoals?.map((g: any, i: number) => (
                        <li key={`ag-${i}`}>{g.item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {/* Our Approach */}
              {caseStudyBlock.ourApproach && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {caseStudyBlock.ourApproach.heading || 'Our Approach'}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {caseStudyBlock.ourApproach.description}
                  </p>
                  {caseStudyBlock.ourApproach.phases?.length > 0 && (
                    <div className="grid gap-4">
                      {caseStudyBlock.ourApproach.phases.map((phase: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <h4 className="font-semibold text-lg mb-3">{phase.name}</h4>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                              {phase.points?.map((point: any, pointIndex: number) => (
                                <li key={pointIndex}>{point.point}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Key Outcomes */}
              {caseStudyBlock.keyOutcomes && (
                <section className="bg-muted/50 rounded-xl p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {caseStudyBlock.keyOutcomes.heading || 'Key Outcomes'}
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {caseStudyBlock.keyOutcomes.points?.map((point: any, index: number) => (
                      <li key={index}>{point.point}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Lessons Learned */}
              {caseStudyBlock.lessonsLearned && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {caseStudyBlock.lessonsLearned.heading || 'Lessons Learned'}
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {caseStudyBlock.lessonsLearned.points?.map((point: any, index: number) => (
                      <li key={index}>{point.point}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Conclusion */}
              {caseStudyBlock.conclusion && (
                <section className="border-l-4 border-primary pl-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Conclusion</h2>
                  <p className="text-muted-foreground italic text-lg">
                    {caseStudyBlock.conclusion}
                  </p>
                </section>
              )}
            </div>
          </div>
        )}

        {/* Simple Details Section */}
        {simpleDetailsBlock && !caseStudyBlock && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl">
              {simpleDetailsBlock.heading && (
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {simpleDetailsBlock.heading}
                </h2>
              )}
              {simpleDetailsBlock.description && (
                <p className="text-muted-foreground mb-8">
                  {simpleDetailsBlock.description}
                </p>
              )}
              {simpleDetailsBlock.phases && simpleDetailsBlock.phases.length > 0 && (
                <div className="space-y-6">
                  {simpleDetailsBlock.phases.map((phase: any, index: number) => (
                    <div key={index} className="border-l-2 border-primary pl-6">
                      <h3 className="font-semibold text-lg mb-2">{phase.name}</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {phase.points?.map((point: any, pointIndex: number) => (
                          <li key={pointIndex}>{point.point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {simpleDetailsBlock.keyOutcomes && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">
                    {simpleDetailsBlock.keyOutcomes.heading || 'Key Outcomes'}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {simpleDetailsBlock.keyOutcomes.points?.map((point: any, index: number) => (
                      <li key={index}>{point.point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="container mx-auto px-4 pt-12">
          <div className="flex flex-wrap gap-4">
            <Link href="/projects">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Projects
              </Button>
            </Link>
            {companyData && (
              <Link href={`/companies/${companyData.slug || companyData.id}`}>
                <Button variant="outline">
                  More from {companyData.name}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
