import { TuneMark, type TuneMarkName } from "@/components/tune-mark"
import { cn } from "@/lib/utils"

type TuneLayoutItem = {
  name: TuneMarkName
  className: string
}

/** Hand-placed scatter patterns, picked by `variant` so no two neighbours look alike. */
const TUNE_LAYOUTS: TuneLayoutItem[][] = [
  [
    { name: "music", className: "top-2 left-[9%] -rotate-12" },
    { name: "lines", className: "top-2.5 left-[63%]" },
    { name: "music4", className: "top-1.5 left-[88%] rotate-12 max-sm:hidden" },
  ],
  [
    { name: "music3", className: "top-2.5 left-[27%] rotate-6" },
    { name: "music", className: "top-1.5 left-[74%] -rotate-6" },
  ],
  [
    { name: "lines", className: "top-2 left-[6%]" },
    { name: "music2", className: "top-2.5 left-[46%] rotate-12" },
    { name: "music", className: "top-2 left-[91%] -rotate-12 max-sm:hidden" },
  ],
  [
    { name: "music4", className: "top-1.5 left-[18%] -rotate-6" },
    { name: "music3", className: "top-2.5 left-[81%] rotate-12" },
  ],
  [
    { name: "music2", className: "top-2 left-[38%] rotate-6" },
    { name: "lines", className: "top-2.5 left-[69%] max-sm:hidden" },
    { name: "music", className: "top-1.5 left-[95%] -rotate-12" },
  ],
]

type SectionSeparatorProps = {
  /** Which scatter pattern to use; wraps around the available layouts. */
  variant?: number
  className?: string
}

export const SectionSeparator = ({
  variant = 0,
  className,
}: SectionSeparatorProps) => {
  const tuneLayout = TUNE_LAYOUTS[variant % TUNE_LAYOUTS.length]

  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "after:absolute after:top-0 after:-left-[100vw] after:-z-1 after:h-px after:w-[200vw] after:bg-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    >
      {tuneLayout.map(({ name, className: tuneClassName }) => (
        <TuneMark
          key={`${name}-${tuneClassName}`}
          name={name}
          className={cn("absolute", tuneClassName)}
        />
      ))}
    </div>
  )
}
