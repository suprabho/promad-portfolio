import Header from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Playbook | Promad Design",
  description:
    "A guide to integrating AI into your design workflow — tools, processes, and principles we use at Promad.",
}

export default function AIPlaybookPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            AI Playbook
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A guide to integrating AI into your design workflow — tools,
            processes, and principles we use at Promad.
          </p>
          <div className="mt-16 rounded-lg border border-border p-8 text-center text-muted-foreground">
            Coming soon.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
