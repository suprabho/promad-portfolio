import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr"

interface PersonCard {
  name: string
  role: string
  image: string
  linkedin?: string
  skills?: string[]
}

const people: PersonCard[] = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "/team/john-doe.jpg",
    linkedin: "https://linkedin.com/in/johndoe",
    skills: ["Leadership", "Strategy", "Product Vision", "Business Development"]
  },
  {
    name: "Jane Smith",
    role: "Lead Designer",
    image: "/team/jane-smith.jpg",
    linkedin: "https://linkedin.com/in/janesmith",
    skills: ["UI/UX", "Brand Design", "Motion Graphics", "Design Systems"]
  },
  // Add more team members as needed
]

export function PeopleSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the talented individuals behind our success
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {people.map((person, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardHeader className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl">{person.name}</CardTitle>
                <CardDescription className="text-base">{person.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {person.skills && (
                  <div className="flex flex-wrap gap-2">
                    {person.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
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
                    className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <LinkedinLogoIcon weight="fill" className="w-4 h-4" />
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