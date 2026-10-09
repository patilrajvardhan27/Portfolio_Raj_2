import { USER } from "@/features/portfolio/data/user"
import type { NavItem } from "@/types/nav"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://portfolio-raj-2.vercel.app/",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

/** Longest chat message the widget sends and the API accepts. */
export const CHAT_MAX_INPUT_CHARS = 1000

/** Fired on `window` when the visitor drops the needle on the entry gate. */
export const ENTRY_GATE_ENTER_EVENT = "entry-gate:enter"

/** Fired on `window` by the music player so the entry gate knows what happened. */
export const MUSIC_STATUS_EVENT = "background-music:status"

/**
 * - `playing`: the track has started
 * - `blocked`: the browser refused because the gesture did not qualify
 * - `unavailable`: the track could not be loaded at all
 */
export type MusicStatus = "playing" | "blocked" | "unavailable"

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

export const UTM_PARAMS = {
  utm_source: "rajvardhanpatil.com",
}
