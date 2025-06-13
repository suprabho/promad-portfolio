"use client";

import { C1Chat } from "@thesysai/genui-sdk";
import "@crayonai/react-ui/styles/index.css";

export default function ChatPage() {
  return (
    <div className="h-screen">
      <C1Chat apiUrl="/api/chat" theme={{ mode: "dark" }} />
    </div>
  );
} 