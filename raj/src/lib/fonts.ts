import { GeistMono } from "geist/font/mono"
import { GeistPixelSquare } from "geist/font/pixel"
import { Montserrat } from "next/font/google"

export const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})
export const fontMono = GeistMono
export const fontPixelSquare = GeistPixelSquare
