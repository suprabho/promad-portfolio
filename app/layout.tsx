import type { Metadata } from 'next'
import './globals.css'
import { Manrope, Playfair_Display, Space_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { GoogleAnalytics } from '@/components/google-analytics'

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Promad by Suprabho | Product Design & Creative Technologist Collective Portfolio',
  description: 'A showcase of creative design work and development projects',
  icons: {
    icon: [
      { url: "/images/icons/favicon.ico", sizes: "any" },
      { url: "/images/icons/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/images/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable} ${spaceMono.variable}`}>
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
