"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { ProjectDisplay } from "@/components/project-display"

// Using the same data structure from companies-timeline
import { XIcon } from "@phosphor-icons/react/dist/ssr"  
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
        
        <div className="mt-10 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[100px]">
            {companiesData.map((company, index) => {
              let gridClass = '';
              
              switch(index) {
                // Column 1
                case 0:
                  gridClass = 'lg:col-span-4 lg:row-span-6 lg:col-start-1 lg:row-start-1 md:col-span-6 md:row-span-6 md:col-start-1 md:row-start-1 col-span-1 row-span-4'; // Large card
                  break;
                case 1:
                  gridClass = 'lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-7 md:col-span-3 md:row-span-3 md:col-start-1 md:row-start-7 col-span-1 row-span-3'; // Small card
                  break;
                case 2:
                  gridClass = 'lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-7 md:col-span-3 md:row-span-3 md:col-start-4 md:row-start-7 col-span-1 row-span-3'; // Small card
                  break;

                // Column 2
                case 3:
                  gridClass = 'lg:col-span-4 lg:row-span-3 lg:col-start-5 lg:row-start-1 md:col-span-6 md:row-span-3 md:col-start-7 md:row-start-1 col-span-1 row-span-4'; // Wide card top
                  break;
                case 4:
                  gridClass = 'lg:col-span-4 lg:row-span-3 lg:col-start-5 lg:row-start-4 md:col-span-6 md:row-span-3 md:col-start-7 md:row-start-4 col-span-1 row-span-3'; // Wide card middle
                  break;
                case 5:
                  gridClass = 'lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-7 md:col-span-3 md:row-span-3 md:col-start-7 md:row-start-7 col-span-1 row-span-3'; // Small card bottom left
                  break;
                case 6:
                  gridClass = 'lg:col-span-2 lg:row-span-2 lg:col-start-7 lg:row-start-7 md:col-span-3 md:row-span-3 md:col-start-10 md:row-start-7 col-span-1 row-span-2'; // Small card top left
                  break;
                // Column 3
                case 7:
                  gridClass = 'lg:col-span-2 lg:row-span-2 lg:col-start-9 lg:row-start-1 md:col-span-6 md:row-span-3 md:col-start-1 md:row-start-10 col-span-1 row-span-3'; // Small card top left
                  break;
                case 8:
                  gridClass = 'lg:col-span-2 lg:row-span-2 lg:col-start-11 lg:row-start-1 md:col-span-6 md:row-span-3 md:col-start-1 md:row-start-14 col-span-1 row-span-3'; // Small card top right
                  break;
                case 9:
                  gridClass = 'lg:col-span-4 lg:row-span-6 lg:col-start-9 lg:row-start-3 md:col-span-6 md:row-span-6 md:col-start-7 md:row-start-10 col-span-1 row-span-4'; // Large card bottom
                  break;  

                default:
                  gridClass = 'lg:col-span-2 lg:row-span-2 md:col-span-6 md:row-span-4 col-span-1 row-span-4'; // Default small
              }

              const cardStyles = `
                group cursor-pointer transform transition-all duration-300 
                hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] 
                relative overflow-hidden bg-card rounded-tr-0 rounded-br-3xl rounded-tl-3xl rounded-tl-0
                ${gridClass}
              `;

              return (
                <Sheet key={index}>
                  <SheetTrigger asChild onClick={() => {
                    // Pause Rive animation
                    const riveContainer = document.querySelector('.RiveContainer');
                    if (riveContainer) {
                      const riveInstance = (riveContainer as any)._rive;
                      if (riveInstance) {
                        riveInstance.pause();
                      }
                    }
                    
                    // Pause Spline animation
                    const splineContainer = document.querySelector('spline-viewer');
                    if (splineContainer) {
                      (splineContainer as any)?.pause?.();
                    }
                  }}>
                    <Card className={cardStyles}>
                      <div className="relative w-full h-full bg-muted overflow-hidden">
                        <Image
                          src={company.thumbnail}
                          alt={`${company.name} thumbnail`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <div>
                            <h3 className="text-2xl font-semibold mb-2 text-white">{company.name}</h3>
                            <p className="text-sm text-white/80 mb-4">{company.description}</p>
                            <div className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Click to view details
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto w-[90vw] max-w-[1200px] sm:max-w-[1200px] p-0">
                    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                      <SheetHeader className="p-6 flex items-center gap-2">
                        <Image
                            src={company.logo?.dark || company.logo?.light || ""}
                            alt={`${company.name} logo`}
                            width={60}
                            height={60}  
                            className="object-contain"
                          />
                         <div>
                          <SheetTitle className="flex gap-2">
                            {company.name}
                          </SheetTitle>
                          <SheetDescription>{company.description}</SheetDescription>
                          <SheetClose 
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                            onClick={() => {
                              // Resume Rive animation
                              const riveContainer = document.querySelector('.RiveContainer');
                              if (riveContainer) {
                                const riveInstance = (riveContainer as any)._rive;
                                if (riveInstance) {
                                  riveInstance.play();
                                }
                              }
                              
                              // Resume Spline animation  
                              const splineContainer = document.querySelector('spline-viewer');
                              if (splineContainer) {
                                (splineContainer as any)?.play?.();
                              }
                            }}
                          >
                            <XIcon className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                          </SheetClose>
                        </div> 
                        
                        
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