"use client";

import { C1Chat } from "@thesysai/genui-sdk";
import "@crayonai/react-ui/styles/index.css";
import { themePresets } from "@crayonai/react-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { sendAnalyticsEvent } from "@/lib/analytics";

interface ChatProps {
  onClose?: () => void;
}

export default function Chat({ onClose }: ChatProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed z-50 w-full h-full bg-background border border-border rounded-lg shadow-lg overflow-hidden">
      <div className="h-full -mt-20 pt-20">
        <C1Chat 
          apiUrl="/api/chat" 
          agentName="Promad"
          logoUrl="/images/icons/android-chrome-512x512.png"
          formFactor="full-page"
          theme={{
            ...themePresets.neon, 
            mode: theme === "dark" ? "dark" : "light"
          }}
          customizeC1={{
            thinkComponent: (props) => {
              return <div className="crayon-shell-thread-message-assistant__content">
                <p>Thinking...</p>
              </div>
            }
          }}
        />
      </div>
    </div>
  );
}   