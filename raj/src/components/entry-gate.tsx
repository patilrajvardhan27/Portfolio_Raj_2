"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { TuneMark } from "@/components/tune-mark"
import { ENTRY_GATE_ENTER_EVENT } from "@/config/site"
import { USER } from "@/features/portfolio/data/user"
import { cn } from "@/lib/utils"

type EntryGatePhase = "idle" | "placing" | "revealing" | "done"

/** Time for the tonearm to swing onto the record before the reveal starts. */
const NEEDLE_DROP_MS = 900
/** Must match the `entry-reveal` animation duration in globals.css. */
const REVEAL_MS = 1200
/** Speeds the idle spin up to roughly 33⅓ RPM once the needle is down. */
const PLAYING_SPIN_RATE = 3.3

/**
 * Full-screen turntable shown on every page load. Dropping the needle is the
 * user interaction browsers require before audio may play, so it starts the
 * background music and then opens the site with a circular reveal.
 */
export const EntryGate = () => {
  const [phase, setPhase] = useState<EntryGatePhase>("idle")
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const discRef = useRef<HTMLSpanElement | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach(clearTimeout)
  }, [])

  // Keep the page behind the gate from scrolling until it has opened.
  useEffect(() => {
    if (phase === "done") return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [phase])

  const handlePlaceNeedle = useCallback(() => {
    if (phase !== "idle") return
    console.log("[entry-gate] needle placed, starting music")
    window.dispatchEvent(new Event(ENTRY_GATE_ENTER_EVENT))

    const overlay = overlayRef.current
    const disc = discRef.current
    if (overlay && disc) {
      // Open the reveal from the centre of the record.
      const { left, top, width, height } = disc.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      // Just far enough to clear the furthest corner, so the pace stays even.
      const maxRadius = Math.hypot(
        Math.max(centerX, window.innerWidth - centerX),
        Math.max(centerY, window.innerHeight - centerY)
      )
      overlay.style.setProperty("--entry-reveal-x", `${centerX}px`)
      overlay.style.setProperty("--entry-reveal-y", `${centerY}px`)
      overlay.style.setProperty("--entry-reveal-max", `${maxRadius}px`)
      disc
        .getAnimations()
        .forEach((animation) => animation.updatePlaybackRate(PLAYING_SPIN_RATE))
    }

    setPhase("placing")
    timersRef.current.push(
      setTimeout(() => {
        console.log("[entry-gate] revealing site")
        setPhase("revealing")
      }, NEEDLE_DROP_MS),
      setTimeout(() => {
        console.log("[entry-gate] done")
        setPhase("done")
      }, NEEDLE_DROP_MS + REVEAL_MS)
    )
  }, [phase])

  if (phase === "done") return null

  const isNeedlePlaced = phase !== "idle"

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Enter the site"
      className={cn(
        "fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 overflow-hidden bg-linear-to-b from-(--brand-red) to-(--brand-red-deep) px-4 text-zinc-50 sm:gap-10",
        phase === "revealing" && "pointer-events-none entry-reveal-mask"
      )}
    >
      <div className="flex items-center gap-2 text-sm font-black text-zinc-50/80 sm:text-base">
        <TuneMark className="text-zinc-50/80" />
        <span className="font-devanagari" lang="hi">
          {USER.displayNameDevanagari}
        </span>
      </div>

      <button
        type="button"
        autoFocus
        disabled={isNeedlePlaced}
        aria-label="Place the needle on the record to start the music and enter the site"
        onClick={handlePlaceNeedle}
        className="group relative aspect-5/4 w-70 cursor-pointer rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-zinc-50/50 focus-visible:ring-offset-8 focus-visible:ring-offset-transparent disabled:cursor-default sm:w-100"
      >
        {/* Record */}
        <span className="absolute top-0 left-0 block aspect-square h-full rounded-full shadow-2xl shadow-black/60">
          <span
            ref={discRef}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-[repeating-radial-gradient(circle,#09090b_0,#09090b_2px,#1f1f23_3px,#09090b_4px)] motion-safe:animate-[spin_6s_linear_infinite]"
          >
            <span className="flex aspect-square w-[38%] flex-col items-center justify-between rounded-full bg-linear-to-b from-[#e3262d] to-(--brand-red) py-[7%] ring-2 ring-black/50">
              <span
                className="font-devanagari text-sm leading-none font-black sm:text-lg"
                lang="hi"
              >
                {USER.shortNameDevanagari}
              </span>
              <span className="text-[0.5rem] leading-none font-extrabold tracking-widest sm:text-[0.625rem]">
                33⅓ RPM
              </span>
            </span>
            <span className="absolute block aspect-square w-[3.5%] rounded-full bg-zinc-950 ring-1 ring-zinc-50/60" />
          </span>
          {/* Static light sheen, so only the record itself appears to turn */}
          <span className="pointer-events-none absolute inset-0 block rounded-full bg-[conic-gradient(from_25deg,transparent_0deg,rgba(255,255,255,0.16)_30deg,transparent_60deg,transparent_180deg,rgba(255,255,255,0.16)_210deg,transparent_240deg)]" />
        </span>

        {/* Tonearm, pivoting from the top-right corner */}
        <span className="absolute top-[12%] left-[89.6%] block aspect-square w-[12%] -translate-1/2 rounded-full bg-zinc-300 shadow-lg ring-4 ring-black/25" />
        <span
          className={cn(
            "absolute top-[12%] left-[89.6%] block h-[72%] w-1.5 origin-top -translate-x-1/2 rounded-full bg-zinc-200 shadow-md shadow-black/40 transition-transform duration-700 ease-in-out sm:w-2",
            isNeedlePlaced
              ? "rotate-[28deg]"
              : "rotate-[-6deg] group-hover:rotate-[2deg]"
          )}
        >
          <span className="absolute -bottom-1 left-1/2 block h-[15%] w-4 -translate-x-1/2 rounded-sm bg-zinc-950 ring-1 ring-zinc-50/50 sm:w-5" />
          {!isNeedlePlaced && (
            <span className="absolute -bottom-2 left-1/2 block size-7 -translate-x-1/2 rounded-full border-2 border-zinc-50 motion-safe:animate-ping" />
          )}
        </span>
        <span className="absolute top-[12%] left-[89.6%] block aspect-square w-[5%] -translate-1/2 rounded-full bg-zinc-950" />
      </button>

      <div className="text-center" aria-live="polite">
        <p className="text-4xl leading-none font-black tracking-tighter uppercase sm:text-6xl">
          {isNeedlePlaced ? "Now playing" : "Drop the needle"}
        </p>
        <p className="mt-2 text-xs font-bold tracking-wide text-zinc-50/80 uppercase sm:mt-3 sm:text-sm">
          {isNeedlePlaced
            ? "Opening the site"
            : "Tap the tonearm onto the record to start the music and enter"}
        </p>
      </div>
    </div>
  )
}
