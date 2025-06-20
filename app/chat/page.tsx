"use client"

import { useState } from "react"
import Header from "@/components/header"
import Chat from "@/components/chat"
import "./chat.css";

export default function ChatPage() {
  const [isChatOpen, setIsChatOpen] = useState(true)

  const closeChat = () => {
    setIsChatOpen(false)
    window.history.back() // Go back to previous page when chat is closed
  }

  return (
    <div className="min-h-dvh bg-background">
      <Header />
      {isChatOpen && <Chat onClose={closeChat} />}
    </div>
  )
} 