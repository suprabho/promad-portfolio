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

  const renderItem = (item: CompanyItem | string) => {
    if (typeof item === 'string') {
      return (
        <Badge variant="secondary">
          {item}
        </Badge>
      )
    }
    
    return (
      <div className="flex flex-col p-6 rounded-xl bg-card border">
        <div className="relative w-12 h-12 mb-4 rounded-lg overflow-hidden bg-muted">
          <Image
            src={item.thumbnail}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-muted-foreground mb-4">{item.description}</p>
        {item.tags && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {item.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    )
  }

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companiesData.map((company, index) => (
            <Sheet key={index}>
              <SheetTrigger asChild>
                <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
                  <div className="relative h-48 w-full bg-muted overflow-hidden">
                    <Image
                      src="/images/placeholder-company.png"
                      alt={`${company.name} thumbnail`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {company.name}
                      </CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {company.period}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">{company.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full text-center text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to view details
                    </div>
                  </CardContent>
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
          ))}
        </div>
      </div>
    </section>
  )
} 