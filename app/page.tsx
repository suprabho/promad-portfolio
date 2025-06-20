"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { CompaniesGrid } from "@/components/companies-grid"
import { SkillsGrid } from "@/components/skills-grid"
import Header from "@/components/header"
import { PeopleSection } from "@/components/people-section"
import { Footer } from "@/components/footer"
import Chat from "@/components/chat"

export default function Portfolio() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
    console.log("Chat toggle clicked - chat is", !isChatOpen ? "opening" : "closing")
  }

  const closeChat = () => {
    setIsChatOpen(false)
    console.log("Chat closed")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onChatToggle={toggleChat} />
      <HeroSection />
      <CompaniesGrid />
      <PeopleSection />
      <SkillsGrid />
      <Footer />
      {isChatOpen && <Chat onClose={closeChat} />}
    </div>
  )
}
