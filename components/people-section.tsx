import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr"
import teamData from "@/data/team.json"

interface PersonCard {
  name: string
  role: string
  image: string
  linkedin?: string
  skills?: string[]
}

const people: PersonCard[] = teamData.team

export function PeopleSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Team</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the talented individuals behind our success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {people.map((person, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              <CardHeader className="text-center flex-grow">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl sm:text-2xl">{person.name}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{person.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 mx-auto">
                {person.skills && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mx-auto justify-center">
                    {person.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="text-xs sm:text-sm px-2 py-0.5"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 sm:gap-2 text-primary hover:text-primary/80 transition-colors text-sm sm:text-base"
                  >
                    <LinkedinLogoIcon weight="fill" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 