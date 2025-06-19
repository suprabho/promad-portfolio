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
import { 
  DeviceMobileIcon, 
  DesktopIcon, 
  BriefcaseIcon, 
  RobotIcon, 
  PaintBrushIcon, 
  SparkleIcon,
  PresentationIcon,
  ArrowsOutIcon 
} from "@phosphor-icons/react"
  
const skillsData = [
  {
    name: "App Design",
    icon: DeviceMobileIcon,
    iconWeight: "fill",
    description: "Creating intuitive and engaging mobile experiences",
    skills: ["User Experience Design", "Interaction Design", "Wireframing", "Prototyping", "User Research", "Mobile Design Patterns"],
    color: "bg-gradient-to-br from-[#EFF100] to-white",
  },
  {
    name: "Website Design",
    icon: DesktopIcon,
    description: "Crafting responsive and modern web experiences",
    skills: ["Responsive Design", "Web Architecture", "UI Components", "Design Systems", "Performance Optimization", "Accessibility"],
    color: "bg-gradient-to-tr from-[#EFF100] via-white to-black/20",
  },
  {
    name: "Enterprise SaaS Design",
    icon: BriefcaseIcon,
    description: "Building complex systems for business solutions",
    skills: ["Information Architecture", "Complex Workflows", "Data Visualization", "Enterprise UX", "B2B Design", "System Design"],
    color: "bg-gradient-to-bl from-[#EFF100]/80 via-white to-[#EFF100]",
  },
  {
    name: "AI Design",
    icon: RobotIcon,
    description: "Designing intelligent and intuitive AI interfaces",
    skills: ["Conversational UI", "AI Interaction", "Machine Learning UX", "Data-Driven Design", "Predictive Interfaces", "AI Ethics"],
    color: "bg-gradient-to-r from-black/10 via-[#EFF100] to-white",
  },
  {
    name: "Branding",
    icon: PaintBrushIcon,
    description: "Creating memorable brand identities",
    skills: ["Logo Design", "Visual Identity", "Brand Guidelines", "Typography", "Color Theory", "Brand Strategy"],
    color: "bg-gradient-to-tl from-[#EFF100]/80 via-white to-black/10",
  },
  {
    name: "Motion",
    icon: SparkleIcon,
    iconWeight: "fill",
    description: "Creating engaging animations and motion graphics",
    skills: ["Animation Principles", "Motion Graphics", "Micro-interactions", "Storyboarding", "Character Animation", "Rive Animation"],
    color: "bg-gradient-to-l from-[#EFF100] via-[#EFF100]/60 to-white",
  },
  {
    name: "Pitchdecks and Courses",
    icon: PresentationIcon,
    description: "Creating compelling presentations and educational content",
    skills: ["Visual Storytelling", "Information Design", "Course Structure", "Learning Experience", "Presentation Design", "Content Strategy"],
    color: "bg-gradient-to-b from-white via-[#EFF100]/70 to-black/5",
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
                    <IconComponent weight="bold" className="w-8 h-8 text-black" />
                  </div>
                  <CardTitle className="text-2xl">{skill.name}</CardTitle>
                  <CardDescription className="text-base">{skill.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.slice(0, 4).map((skillItem) => (
                      <Badge key={skillItem} variant="secondary" className="text-sm">
                        {skillItem}
                      </Badge>
                    ))}
                    {skill.skills.length > 4 && <Badge variant="secondary">+{skill.skills.length - 4} more</Badge>}
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
                        <h4 className="text-lg font-semibold mb-4">All Skills</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {skill.skills.map((skillItem) => (
                            <Card key={skillItem} className="p-4 hover:bg-muted/50 transition-colors">
                              <div className="font-medium">{skillItem}</div>
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
              "Framer",
              "Midjourney",
              "Runway",
              "Cursor",
              "Rive",
              "Webflow",
              "WordPress",
              "Shopify",
              "Next.js",
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
