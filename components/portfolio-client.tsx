"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import Chat component to avoid SSR issues with browser-only dependencies
const Chat = dynamic(() => import("@/components/chat"), { ssr: false })

export function PortfolioClient({ children }: { children: React.ReactNode }) {
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
    <>
      {children}
      {isChatOpen && <Chat onClose={closeChat} />}
    </>
  )
}
