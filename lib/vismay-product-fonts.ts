import { Martian_Mono, Saira, Space_Grotesk } from "next/font/google"

// Each product card renders its live modules in that product's own type.
export const footshortsSans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fs-sans",
})

export const vizf1Sans = Saira({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-f1-sans",
})

export const vizf1Mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-f1-mono",
})

export const productFontVars = `${footshortsSans.variable} ${vizf1Sans.variable} ${vizf1Mono.variable}`
