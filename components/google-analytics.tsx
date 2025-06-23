"use client"

import Script from "next/script"
import { analytics } from "@/lib/firebase"
import { Analytics, logEvent } from "firebase/analytics"

export const GoogleAnalytics = ({ gaId }: { gaId: string }) => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
} 