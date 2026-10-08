"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type AlternatingNameProps = {
  devanagari: string
  english: string
  className?: string
}

/** How long each script stays on screen before blurring into the other. */
const ALTERNATE_INTERVAL_MS = 3500

const SCRIPT_BASE_CLASS =
  "col-start-1 row-start-1 text-gradient-brand transition-[opacity,filter] duration-700 ease-in-out motion-reduce:transition-none"
const SCRIPT_VISIBLE_CLASS = "blur-none opacity-100"
const SCRIPT_HIDDEN_CLASS = "opacity-0 blur-sm"

/**
 * Shows the name in Devanagari and English in turn, blurring from one to the
 * other. Both versions share one grid cell at the same font size, so the
 * surrounding layout never shifts.
 */
export const AlternatingName = ({
  devanagari,
  english,
  className,
}: AlternatingNameProps) => {
  const [isEnglish, setIsEnglish] = useState(false)

  useEffect(() => {
    const interval = setInterval(
      () => setIsEnglish((current) => !current),
      ALTERNATE_INTERVAL_MS
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={cn("inline-grid items-center", className)}>
      <span
        className={cn(
          SCRIPT_BASE_CLASS,
          "font-devanagari",
          isEnglish ? SCRIPT_HIDDEN_CLASS : SCRIPT_VISIBLE_CLASS
        )}
        lang="hi"
        aria-hidden={isEnglish}
      >
        {devanagari}
      </span>
      <span
        className={cn(
          SCRIPT_BASE_CLASS,
          "font-sans tracking-tighter uppercase",
          isEnglish ? SCRIPT_VISIBLE_CLASS : SCRIPT_HIDDEN_CLASS
        )}
        aria-hidden={!isEnglish}
      >
        {english}
      </span>
    </span>
  )
}
