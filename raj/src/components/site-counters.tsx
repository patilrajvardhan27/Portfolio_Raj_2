"use client"

import { useEffect } from "react"

import { MUSIC_STATUS_EVENT, type MusicStatus } from "@/config/site"
import { hitCounter } from "@/lib/counters"

const VISITOR_COUNTED_STORAGE_KEY = "visitor-counted"

/** Counts each browser once; private windows without storage are skipped. */
const countVisitorOnce = () => {
  try {
    if (localStorage.getItem(VISITOR_COUNTED_STORAGE_KEY)) return
    localStorage.setItem(VISITOR_COUNTED_STORAGE_KEY, "1")
  } catch {
    console.log("[counters] storage unavailable, visitor not counted")
    return
  }
  hitCounter("visitors")
}

/**
 * Renders nothing. Counts unique visitors and how many times the music was
 * started, for the badges in the README.
 */
export const SiteCounters = () => {
  useEffect(() => {
    countVisitorOnce()

    // One play per page load: pausing and resuming is still the same listen.
    const handleMusicStatus = (event: Event) => {
      if ((event as CustomEvent<MusicStatus>).detail !== "playing") return
      window.removeEventListener(MUSIC_STATUS_EVENT, handleMusicStatus)
      hitCounter("music-plays")
    }

    window.addEventListener(MUSIC_STATUS_EVENT, handleMusicStatus)
    return () =>
      window.removeEventListener(MUSIC_STATUS_EVENT, handleMusicStatus)
  }, [])

  return null
}
