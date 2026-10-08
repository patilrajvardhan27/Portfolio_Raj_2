import {
  AudioLinesIcon,
  type LucideIcon,
  Music2Icon,
  Music3Icon,
  Music4Icon,
  MusicIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const TUNE_ICONS = {
  music: MusicIcon,
  music2: Music2Icon,
  music3: Music3Icon,
  music4: Music4Icon,
  lines: AudioLinesIcon,
} satisfies Record<string, LucideIcon>

export type TuneMarkName = keyof typeof TUNE_ICONS

type TuneMarkProps = {
  name?: TuneMarkName
  className?: string
}

/** Small decorative red music glyph. Purely ornamental, hidden from assistive tech. */
export const TuneMark = ({ name = "music", className }: TuneMarkProps) => {
  const Icon = TUNE_ICONS[name]

  return (
    <Icon
      aria-hidden="true"
      strokeWidth={2.75}
      className={cn(
        "pointer-events-none size-3 shrink-0 text-brand select-none sm:size-3.5",
        className
      )}
    />
  )
}
