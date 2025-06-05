"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowsOutIcon, PaletteIcon, PlayIcon, FileTextIcon } from "@phosphor-icons/react"
  
const skillsData = [
  {
    name: "Motion",
    icon: PlayIcon,
    iconWeight: "fill",
    description: "Creating engaging animations and motion graphics",
    projects: ["1mg", "Kidzovo", "Avocure", "Dhyana", "Jupiter", "Taptalent", "Cubical", "Techniche"],
    color: "bg-blue-500",
  },
  {
    name: "Logofolio",
    icon: PaletteIcon,
    description: "Brand identity and logo design portfolio",
    projects: ["goSTOPS", "Keekoo", "Saujanya Foundation", "TMP", "Techniche"],
    color: "bg-purple-500",
  },
  {
    name: "Pitchdecks",
    icon: FileTextIcon,
    description: "Compelling presentation design for startups",
    projects: ["Kidzovo", "Merklescience", "Taptalent"],
    color: "bg-green-500",
  },
]

export function SkillsGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Specialized skills across design, motion, and branding
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillsData.map((skill) => {
            const IconComponent = skill.icon
            return (
              <Card key={skill.name} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 ${skill.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent weight="fill" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{skill.name}</CardTitle>
                  <CardDescription className="text-base">{skill.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {skill.projects.slice(0, 4).map((project) => (
                      <Badge key={project} variant="secondary" className="text-sm">
                        {project}
                      </Badge>
                    ))}
                    {skill.projects.length > 4 && <Badge variant="secondary">+{skill.projects.length - 4} more</Badge>}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full group/btn">
                        <ArrowsOutIcon className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" />
                        View All Projects
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${skill.color} rounded-full flex items-center justify-center`}>
                            <IconComponent weight="fill" className="w-6 h-6 text-white" />
                          </div>
                          {skill.name}
                        </DialogTitle>
                        <DialogDescription className="text-lg">{skill.description}</DialogDescription>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-4">All Projects</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {skill.projects.map((project) => (
                            <Card key={project} className="p-4 hover:bg-muted/50 transition-colors">
                              <div className="font-medium">{project}</div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional skills showcase */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Technical Skills</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Figma",
              "Adobe Creative Suite",
              "Sketch",
              "Principle",
              "Framer",
              "After Effects",
              "Lottie",
              "Rive",
              "Webflow",
              "WordPress",
              "Shopify",
              "React",
              "HTML/CSS",
              "JavaScript",
              "Design Systems",
            ].map((tech) => (
              <Badge key={tech} variant="outline" className="text-sm py-2 px-4">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
