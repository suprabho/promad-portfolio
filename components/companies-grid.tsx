"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Building2, Calendar } from "lucide-react"
import Link from "next/link"
import { ProjectDisplay } from "@/components/project-display"

// Using the same data structure from companies-timeline
import { companiesData } from "@/components/companies-timeline"

interface CompanyItem {
  name: string
  description: string
  thumbnail: string
  tags?: string[]
}

interface Category {
  name: string
  items: (CompanyItem | string)[]
}

interface Company {
  name: string
  period: string
  description: string
  categories: Category[]
}

export function CompaniesGrid() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Companies We've Worked With</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our work experience and contributions
          </p>
          <Link href="/timeline" className="inline-block mt-4">
            <Button variant="outline">View Timeline</Button>
          </Link>
        </div>
        
        <div className="mt-10 grid gap-4 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companiesData.map((company, index) => {
              // Define card styles based on position
              const isLargeCard = index === 0;
              const cardStyles = `
                group cursor-pointer transform transition-all duration-300 
                hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] 
                relative overflow-hidden bg-card
                ${isLargeCard ? 'md:row-span-2' : ''}
              `;

              return (
                <Sheet key={index}>
                  <SheetTrigger asChild>
                    <Card className={cardStyles}>
                      <div className={`relative ${isLargeCard ? 'h-[400px]' : 'h-48'} w-full bg-muted overflow-hidden`}>
                        <Image
                          src="/images/placeholder-company.png"
                          alt={`${company.name} thumbnail`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-2xl font-semibold mb-2">{company.name}</h3>
                          <p className="text-sm text-white/80">{company.description}</p>
                        </div>
                      </div>
                      <CardHeader className="relative">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {company.period}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="w-full text-center text-sm text-muted-foreground">
                          Click to view details
                        </div>
                      </CardContent>
                      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto w-[90vw] max-w-[1200px] sm:max-w-[1200px] p-0">
                    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                      <SheetHeader className="p-6">
                        <SheetTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5" />
                          {company.name}
                        </SheetTitle>
                        <SheetDescription>{company.description}</SheetDescription>
                      </SheetHeader>
                    </div>
                    <div className="p-6 mt-2 space-y-8">
                      {company.projects.map((project, projectIndex) => (
                        <div key={projectIndex}>
                          <ProjectDisplay project={project} index={projectIndex} />
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 