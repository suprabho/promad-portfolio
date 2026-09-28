import { Fraunces, JetBrains_Mono, Prata } from "next/font/google"

// vizmaya.fyi's editorial type: Fraunces for display, JetBrains Mono for
// kickers and data labels. Scoped to the vizmaya sections via CSS variables.
export const vizmayaSerif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-vz-serif",
})

export const vizmayaMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-vz-mono",
})

export const vizmayaFontVars = `${vizmayaSerif.variable} ${vizmayaMono.variable}`

// The AI Daily edition's display face.
export const aiDailySerif = Prata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dv-serif",
})
