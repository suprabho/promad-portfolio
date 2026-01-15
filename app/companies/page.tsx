import { getCompaniesWithProjects } from '@/lib/payload'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Companies | Promad Design',
  description: 'Explore all the companies we have worked with and our contributions to their success.',
}

export default async function CompaniesPage() {
  const companies = await getCompaniesWithProjects()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collaborations and the impact we've made with each company
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.slug || company.id}`}
                className="group"
              >
                <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative h-48 w-full bg-muted">
                    {company.thumbnail && (
                      <Image
                        src={company.thumbnail}
                        alt={`${company.name} thumbnail`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/70" />
                    {(company.logo?.dark || company.logo?.light) && (
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur rounded-lg p-2">
                        <Image
                          src={company.logo?.dark || company.logo?.light || ''}
                          alt={`${company.name} logo`}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-serif italic text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {company.name}
                    </h2>
                    {company.period && (
                      <p className="font-mono text-sm text-muted-foreground mb-3">
                        {company.period}
                      </p>
                    )}
                    {company.description && (
                      <p className="text-muted-foreground line-clamp-2">
                        {company.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {company.projects.length} project{company.projects.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
