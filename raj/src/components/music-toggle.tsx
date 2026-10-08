"use client"

import { PauseIcon, PlayIcon } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { Tooltip, TooltipContent, TooltipTrigger } from "./base/ui/tooltip"
import { Button } from "./ui/button"
import { Kbd } from "./ui/kbd"

const MUSIC_SRC = "/assets/audio/background.mp3"
const MUSIC_PAUSED_STORAGE_KEY = "background-music-paused"
const UNLOCK_EVENTS = ["pointerdown", "touchend", "click", "keydown"] as const

const readIsPausedPreference = (): boolean => {
  try {
    return localStorage.getItem(MUSIC_PAUSED_STORAGE_KEY) === "true"
  } catch {
    return false
  }
}

const saveIsPausedPreference = (isPaused: boolean) => {
  try {
    localStorage.setItem(MUSIC_PAUSED_STORAGE_KEY, String(isPaused))
  } catch {
    console.log("[music] could not persist the paused preference")
  }
}

export const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)

  const handleUnavailable = useCallback(() => {
    console.log(`[music] ${MUSIC_SRC} could not be loaded, hiding the toggle`)
    setIsAvailable(false)
  }, [])

  // Browsers block audible autoplay, so start on load when allowed and
  // otherwise on the visitor's first interaction with the page.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (readIsPausedPreference()) {
      console.log("[music] visitor paused music earlier, staying silent")
      return
    }

    const removeUnlockListeners = () => {
      UNLOCK_EVENTS.forEach((eventName) =>
        document.removeEventListener(eventName, handleFirstInteraction)
      )
    }

    const handleFirstInteraction = (event: Event) => {
      // The toggle handles its own clicks; starting here too would cancel out.
      if (buttonRef.current?.contains(event.target as Node)) return
      removeUnlockListeners()
      console.log("[music] first interaction, starting playback")
      audio.play().catch(handleUnavailable)
    }

    audio.play().catch((error: DOMException) => {
      if (error.name !== "NotAllowedError") {
        handleUnavailable()
        return
      }
      console.log("[music] autoplay blocked, waiting for first interaction")
      UNLOCK_EVENTS.forEach((eventName) =>
        document.addEventListener(eventName, handleFirstInteraction)
      )
    })

    return removeUnlockListeners
  }, [handleUnavailable])

  const handleToggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      console.log("[music] play")
      saveIsPausedPreference(false)
      audio.play().catch(handleUnavailable)
      return
    }

    console.log("[music] pause")
    saveIsPausedPreference(true)
    audio.pause()
  }, [handleUnavailable])

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
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleUnavailable}
      />
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              ref={buttonRef}
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
