import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat | Promad Portfolio",
  description: "Chat application powered by Thesys C1",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="chat-layout">
      {children}
    </div>
  );
} 