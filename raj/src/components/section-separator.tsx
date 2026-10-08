import { TuneMark, type TuneMarkName } from "@/components/tune-mark"
import { cn } from "@/lib/utils"

type TuneLayoutItem = {
  name: TuneMarkName
  className: string
}

/**
 * Hand-placed scatter patterns, picked by `variant` so no two neighbours look alike.
 * Every mark sits in the side gutters, outside the framed column, some drifting
 * below the strip. They only show once the gutters are wide enough (lg and up).
 */
const TUNE_LAYOUTS: TuneLayoutItem[][] = [
  [
    { name: "music", className: "top-2 -left-10 -rotate-12" },
    { name: "music4", className: "top-14 -left-24 rotate-12" },
    { name: "lines", className: "top-10 -right-20" },
  ],
  [
    { name: "music", className: "top-12 -left-16 -rotate-6" },
    { name: "music3", className: "top-1.5 -right-12 rotate-6" },
  ],
  [
    { name: "lines", className: "top-2.5 -left-20" },
    { name: "music", className: "top-3 -right-24 -rotate-12" },
    { name: "music2", className: "top-12 -right-10 rotate-12" },
  ],
  [
    { name: "music4", className: "top-10 -left-12 -rotate-6" },
    { name: "music3", className: "top-2 -right-16 rotate-12" },
  ],
  [
    { name: "lines", className: "top-2 -left-10" },
    { name: "music", className: "top-12 -left-24 -rotate-12" },
    { name: "music2", className: "top-1.5 -right-20 rotate-6" },
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
          className={cn("absolute hidden lg:block", tuneClassName)}
        />
      ))}
    </div>
  )
}
