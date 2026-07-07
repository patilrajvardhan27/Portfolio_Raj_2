import { USER } from "@/features/portfolio/data/user"
import type { NavItem } from "@/types/nav"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://portfolio-raj-2.vercel.app/",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
]

export const GITHUB_USERNAME = "patilrajvardhan27"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/patilrajvardhan27/Portfolio_Raj_2"

export const UTM_PARAMS = {
  utm_source: "rajvardhanpatil.com",
}
