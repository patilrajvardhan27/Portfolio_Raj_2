import { USER } from "@/features/portfolio/data/user"
import type { NavItem } from "@/types/nav"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://portfolio-raj-2.vercel.app/",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

/** Fired on `window` when the visitor drops the needle on the entry gate. */
export const ENTRY_GATE_ENTER_EVENT = "entry-gate:enter"

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Experience",
    href: "/experience",
  },
  {
    title: "Projects",
    href: "/projects",
  },
]

export const GITHUB_USERNAME = "patilrajvardhan27"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/patilrajvardhan27/Portfolio_Raj_2"

export const UTM_PARAMS = {
  utm_source: "rajvardhanpatil.com",
}
