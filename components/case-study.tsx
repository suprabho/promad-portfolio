"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileTextIcon } from "@phosphor-icons/react"
import Image from "next/image"

import { CaseStudyDetails, SimpleDetails } from "@/types/project"

interface CaseStudyProps {
  details: CaseStudyDetails | SimpleDetails
  thumbnail: string
  onClick?: () => void
}

export function CaseStudy({ details, thumbnail, onClick }: CaseStudyProps) {
  const isCaseStudy = 'title' in details;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" onClick={onClick}>
          <FileTextIcon className="mr-2 h-4 w-4" />
          {isCaseStudy ? 'View Case Study' : 'View Details'}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-5xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isCaseStudy ? (details as CaseStudyDetails).title : details.heading}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-8">
          {isCaseStudy ? (
            <>
              <div className="space-y-4">
                <p className="text-muted-foreground">{(details as CaseStudyDetails).projectOverview}</p>
              </div>
              <Image src={thumbnail} alt={(details as CaseStudyDetails).title} width={1000} height={1000} />
              <section>
                <h3 className="text-lg font-semibold mb-4">{(details as CaseStudyDetails).theChallenge.heading}</h3>
                <div className="space-y-4">
                  <p>{(details as CaseStudyDetails).theChallenge.description}</p>
                  <ul className="list-disc pl-6 space-y-2">
                    {(details as CaseStudyDetails).theChallenge.interfaceQualities?.map((quality, index) => (
                      <li key={index}>{quality}</li>
                    ))}
                    {(details as CaseStudyDetails).theChallenge.animationGoals?.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-4">{(details as CaseStudyDetails).ourApproach.heading}</h3>
                <div className="space-y-6">
                  <p>{(details as CaseStudyDetails).ourApproach.description}</p>
                  <div className="grid gap-4">
                    {(details as CaseStudyDetails).ourApproach.phases.map((phase, index) => (
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
                <h3 className="text-lg font-semibold mb-4">{(details as CaseStudyDetails).keyOutcomes.heading}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {(details as CaseStudyDetails).keyOutcomes.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-4">{(details as CaseStudyDetails).lessonsLearned.heading}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {(details as CaseStudyDetails).lessonsLearned.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </section>

              <div className="p-4 bg-muted rounded-lg">
                <p className="italic">{(details as CaseStudyDetails).conclusion}</p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <p className="text-muted-foreground">{details.description}</p>
              </div>
              <Image src={thumbnail} alt={details.heading} width={1000} height={1000} />
              {details.phases && (
                <div className="grid gap-4">
                  {details.phases.map((phase, index) => (
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
              )}
              {details.keyOutcomes && (
                <section>
                  <h3 className="text-lg font-semibold mb-4">{details.keyOutcomes.heading}</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {details.keyOutcomes.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 