"use client"

import { PauseIcon, PlayIcon } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { ENTRY_GATE_ENTER_EVENT } from "@/config/site"

import { Tooltip, TooltipContent, TooltipTrigger } from "./base/ui/tooltip"
import { Button } from "./ui/button"
import { Kbd } from "./ui/kbd"

const MUSIC_SRC = "/assets/audio/background.mp3"
/**
 * Events every browser accepts as a user gesture for starting audio. Mobile
 * Safari does not always count the `pointerup` that ends a drag, but it does
 * count the `touchend` that follows it.
 */
const PLAYBACK_GESTURE_EVENTS = ["touchend", "click", "keydown"] as const

export const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)

  const handleUnavailable = useCallback(() => {
    console.log(`[music] ${MUSIC_SRC} could not be loaded, hiding the toggle`)
    setIsAvailable(false)
  }, [])

  const startPlayback = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.play().catch((error: DOMException) => {
      if (error.name === "NotAllowedError") {
        console.log("[music] browser blocked playback, needs a user gesture")
        return
      }
      handleUnavailable()
    })
  }, [handleUnavailable])

  // Browsers only allow audible playback after a user gesture, so the music
  // starts when the visitor drops the needle on the entry gate. If the browser
  // refuses that first attempt, keep retrying on each following gesture until
  // the track is actually playing.
  useEffect(() => {
    const removeGestureListeners = () => {
      PLAYBACK_GESTURE_EVENTS.forEach((eventName) =>
        document.removeEventListener(eventName, handleGesture, true)
      )
    }

    const handleGesture = () => {
      const audio = audioRef.current
      if (!audio || !audio.paused) {
        removeGestureListeners()
        return
      }
      console.log("[music] retrying playback on user gesture")
      startPlayback()
    }

    const handleEntryGateEnter = () => {
      console.log("[music] entry gate opened, starting playback")
      PLAYBACK_GESTURE_EVENTS.forEach((eventName) =>
        document.addEventListener(eventName, handleGesture, true)
      )
      startPlayback()
    }

    window.addEventListener(ENTRY_GATE_ENTER_EVENT, handleEntryGateEnter)
    return () => {
      window.removeEventListener(ENTRY_GATE_ENTER_EVENT, handleEntryGateEnter)
      removeGestureListeners()
    }
  }, [startPlayback])

  const handleToggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      console.log("[music] play")
      startPlayback()
      return
    }

    console.log("[music] pause")
    audio.pause()
  }, [startPlayback])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)

  useHotkeys("m", handleToggle)

  if (!isAvailable) return null

  const label = isPlaying ? "Pause music" : "Play music"

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="auto"
        playsInline
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleUnavailable}
      />
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="relative"
              variant="ghost"
              size="icon"
              aria-label={label}
              aria-pressed={isPlaying}
              onClick={handleToggle}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </Button>
          }
        />
        <TooltipContent className="pr-2 pl-3">
          <div className="flex items-center gap-3">
            {label}
            <Kbd>M</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </>
  )
}
