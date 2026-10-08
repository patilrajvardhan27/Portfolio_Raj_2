import { GeistMono } from "geist/font/mono"
import { GeistPixelSquare } from "geist/font/pixel"
import { Montserrat, Poppins } from "next/font/google"

export const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})
/** Heavy Devanagari face for the name, matched to the Latin display weight. */
export const fontDevanagari = Poppins({
  subsets: ["devanagari"],
  weight: "900",
  variable: "--font-poppins-devanagari",
  display: "swap",
})
export const fontMono = GeistMono
export const fontPixelSquare = GeistPixelSquare
