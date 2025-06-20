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
  ArrowsOutIcon,
  IconWeight 
} from "@phosphor-icons/react"
import skillsData from "@/data/skills.json"

// Map of icon names to their components
const iconMap = {
  DeviceMobileIcon,
  DesktopIcon,
  BriefcaseIcon,
  PaintBrushIcon,
  SparkleIcon,
  PresentationIcon,
}

// Map of skill names to their gradient colors
const colorMap = {
  appDesign: "bg-gradient-to-br from-[#FAFF00] to-white",
  websiteDesign: "bg-gradient-to-tr from-[#FAFF00] via-white from-[#FAFF00]",
  enterpriseSaas: "bg-gradient-to-bl from-[#FAFF00]/80 via-white to-[#FAFF00]",
  branding: "bg-gradient-to-tl from-[#FAFF00]/80 via-white to-[#FAFF00]/10",
  motion: "bg-gradient-to-l from-[#FAFF00] via-[#FAFF00]/60 to-white",
  pitchdecks: "bg-gradient-to-b from-white via-[#FAFF00]/70 to-[#FAFF00]/20"
}

// Map skill names to color keys
const skillColorKeys = {
  "App Design": "appDesign",
  "Website Design": "websiteDesign",
  "Enterprise SaaS Design": "enterpriseSaas",
  "Branding": "branding",
  "Motion": "motion",
  "Pitchdecks and Courses": "pitchdecks"
}

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
          {skillsData.skills.map((skill) => {
            const IconComponent = iconMap[skill.icon as keyof typeof iconMap]
            const colorKey = skillColorKeys[skill.name as keyof typeof skillColorKeys]
            return (
              <Card key={skill.name} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 ${colorMap[colorKey as keyof typeof colorMap]} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent
                      size={24}
                      weight={(skill.iconWeight || "bold") as IconWeight}
                      className="w-8 h-8 text-black"
                    />
                  </div>
                  <CardTitle className="font-serif italic font-extrabold text-2xl">{skill.name}</CardTitle>
                  <CardDescription className="text-base">{skill.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center mx-auto">
                    {skill.skills.slice(0, 4).map((skillItem) => (
                      <Badge key={skillItem} variant="secondary" className="text-sm">
                        {skillItem}
                      </Badge>
                    ))}
                    {skill.skills.length > 4 && <Badge variant="secondary">+{skill.skills.length - 4} more</Badge>}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="font-mono w-full group/btn opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowsOutIcon className=" w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" />
                        View All
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${colorMap[colorKey as keyof typeof colorMap]} rounded-full flex items-center justify-center`}>
                            <IconComponent
                              size={24}
                              weight={(skill.iconWeight || "bold") as IconWeight}
                              className="w-6 h-6 text-white"
                            />
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
