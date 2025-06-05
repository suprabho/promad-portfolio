"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Expand, Building2, Calendar } from "lucide-react"
import companiesJson from "@/data/companies.json"

export const companiesData = companiesJson.companies

const getItemKey = (item: string | { name: string }) => 
  typeof item === 'string' ? item : item.name

const getItemText = (item: string | { name: string }) => 
  typeof item === 'string' ? item : item.name

export function CompaniesTimeline() {
  const [selectedCompany, setSelectedCompany] = useState<(typeof companiesData)[0] | null>(null)

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A journey through innovative companies and impactful projects
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-12">
            {companiesData.map((company, index) => (
              <div key={company.name} className="relative flex items-start gap-8">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                {/* Company card */}
                <Card className="flex-1 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{company.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4" />
                          {company.period}
                        </CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="group">
                            <Expand className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{company.name}</DialogTitle>
                            <DialogDescription className="text-lg">{company.description}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-6 mt-6">
                            {company.projects.map((project) => (
                              <div key={project.name} className="space-y-3">
                                <h4 className="text-lg font-semibold text-primary">{project.name}</h4>
                                <p className="text-muted-foreground">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {project.tags.map((tag, index) => (
                                    <Badge 
                                      key={index}
                                      variant="secondary" 
                                      className="text-sm"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{company.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {company.projects.slice(0, 3).map((project) => (
                        <Badge key={project.name} variant="outline">
                          {project.name}
                        </Badge>
                      ))}
                      {company.projects.length > 3 && (
                        <Badge variant="outline">+{company.projects.length - 3} more</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
