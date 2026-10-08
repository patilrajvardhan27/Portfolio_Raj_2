"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type AlternatingNameProps = {
  devanagari: string
  english: string
  /** Badge or icon that sits right after the name and follows its width. */
  trailing?: React.ReactNode
  className?: string
}

type ScriptWidths = {
  devanagari: number
  english: number
}

/** How long each script stays on screen before blurring into the other. */
const ALTERNATE_INTERVAL_MS = 3500
/** Space between the end of the name and the trailing badge, in px. */
const TRAILING_GAP_PX = 8

const SCRIPT_BASE_CLASS =
  "col-start-1 row-start-1 transition-[opacity,filter] duration-700 ease-in-out motion-reduce:transition-none"
const SCRIPT_VISIBLE_CLASS = "blur-none opacity-100"
const SCRIPT_HIDDEN_CLASS = "opacity-0 blur-sm"

/**
 * Shows the name in Devanagari and English in turn, blurring from one to the
 * other. Both versions share one grid cell at the same font size, so the
 * surrounding layout never shifts; only the trailing badge slides to stay
 * right after whichever script is showing.
 */
export const AlternatingName = ({
  devanagari,
  english,
  trailing,
  className,
}: AlternatingNameProps) => {
  const [isEnglish, setIsEnglish] = useState(false)
  const [widths, setWidths] = useState<ScriptWidths | null>(null)
  const rootRef = useRef<HTMLSpanElement | null>(null)
  const devanagariTextRef = useRef<HTMLSpanElement | null>(null)
  const englishTextRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const interval = setInterval(
      () => setIsEnglish((current) => !current),
      ALTERNATE_INTERVAL_MS
    )
    return () => clearInterval(interval)
  }, [])

  // Track the rendered width of each script (its widest line when wrapped),
  // re-measuring when fonts load or the available space changes.
  useEffect(() => {
    const root = rootRef.current
    if (!root || !trailing) return

    const measure = () => {
      const devanagariText = devanagariTextRef.current
      const englishText = englishTextRef.current
      if (!devanagariText || !englishText) return

      setWidths({
        devanagari: devanagariText.getBoundingClientRect().width,
        english: englishText.getBoundingClientRect().width,
      })
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(root)
    document.fonts.ready.then(measure)

    return () => resizeObserver.disconnect()
  }, [trailing])

  const activeWidth = isEnglish ? widths?.english : widths?.devanagari

  return (
    <span
      ref={rootRef}
      className={cn(
        "relative inline-grid items-center",
        // Reserves room for the badge beside the wider script.
        trailing && "pr-7",
        className
      )}
    >
      <span
        className={cn(
          SCRIPT_BASE_CLASS,
          "font-devanagari",
          isEnglish ? SCRIPT_HIDDEN_CLASS : SCRIPT_VISIBLE_CLASS
        )}
        lang="hi"
        aria-hidden={isEnglish}
      >
        <span ref={devanagariTextRef} className="text-gradient-brand">
          {devanagari}
        </span>
      </span>
      <span
        className={cn(
          SCRIPT_BASE_CLASS,
          "font-sans tracking-tighter uppercase",
          isEnglish ? SCRIPT_VISIBLE_CLASS : SCRIPT_HIDDEN_CLASS
        )}
        aria-hidden={!isEnglish}
      >
        <span ref={englishTextRef} className="text-gradient-brand">
          {english}
        </span>
      </span>

      {trailing && (
        <span
          style={{
            translate: `${(activeWidth ?? 0) + TRAILING_GAP_PX}px -50%`,
          }}
          className={cn(
            "absolute top-1/2 left-0 flex transition-[translate,opacity] duration-700 ease-in-out motion-reduce:transition-none",
            // Hidden until measured, so it never flashes in the wrong spot.
            activeWidth === undefined ? "opacity-0" : "opacity-100"
          )}
        >
          {trailing}
        </span>
      )}
    </span>
  )
}
