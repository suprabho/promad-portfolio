"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileTextIcon } from "@phosphor-icons/react"
import Image from "next/image"

interface CaseStudyProps {
  details: {
    title: string
    projectOverview: string
    theChallenge: {
      heading: string
      description: string
      interfaceQualities: string[]
    }
    ourApproach: {
      heading: string
      description: string
      phases: {
        name: string
        points: string[]
      }[]
    }
    keyOutcomes: {
      heading: string
      points: string[]
    }
    lessonsLearned: {
      heading: string
      points: string[]
    }
    conclusion: string
  }
  thumbnail: string
}

export function CaseStudy({ details, thumbnail }: CaseStudyProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <FileTextIcon className="mr-2 h-4 w-4" />
          View Case Study
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-5xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{details.title}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-8">
          <div className="space-y-4">
            <p className="text-muted-foreground">{details.projectOverview}</p>
          </div>
          <Image src={thumbnail} alt={details.title} width={1000} height={1000} />
          <section>
            <h3 className="text-lg font-semibold mb-4">{details.theChallenge.heading}</h3>
            <div className="space-y-4">
              <p>{details.theChallenge.description}</p>
              <ul className="list-disc pl-6 space-y-2">
                {details.theChallenge.interfaceQualities.map((quality, index) => (
                  <li key={index}>{quality}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">{details.ourApproach.heading}</h3>
            <div className="space-y-6">
              <p>{details.ourApproach.description}</p>
              <div className="grid gap-4">
                {details.ourApproach.phases.map((phase, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-3">{phase.name}</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        {phase.points.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">{details.keyOutcomes.heading}</h3>
            <ul className="list-disc pl-6 space-y-2">
              {details.keyOutcomes.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">{details.lessonsLearned.heading}</h3>
            <ul className="list-disc pl-6 space-y-2">
              {details.lessonsLearned.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <div className="p-4 bg-muted rounded-lg">
            <p className="italic">{details.conclusion}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 