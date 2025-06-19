"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
  {
    title: "Web Development",
    description: "Building modern, responsive web applications using cutting-edge technologies.",
    icon: "🌐"
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces with attention to detail.",
    icon: "🎨"
  },
  {
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications for iOS and Android.",
    icon: "📱"
  },
  {
    title: "Cloud Solutions",
    description: "Implementing scalable cloud infrastructure and serverless applications.",
    icon: "☁️"
  }
]

export function CardsSection() {
  return (
    <section id="services" className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Services
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Comprehensive solutions for your digital needs
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {cards.map((card, index) => (
            <Card key={index} className="flex flex-col items-start gap-2 p-6 transition-all hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="mb-3 text-4xl">{card.icon}</div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 