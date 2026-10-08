import { cn } from "@/lib/utils"

type HoverSwapNameProps = {
  devanagari: string
  english: string
  /** Lets touch and keyboard users swap the name by tapping or focusing it. */
  isTappable?: boolean
  className?: string
}

/** Shows the name in Devanagari and swaps it to English while hovered or focused. */
export const HoverSwapName = ({
  devanagari,
  english,
  isTappable = false,
  className,
}: HoverSwapNameProps) => {
  return (
    <span
      className={cn("group/name outline-none", className)}
      tabIndex={isTappable ? 0 : undefined}
    >
      <span
        className="font-devanagari group-hover/name:hidden group-focus/name:hidden"
        lang="hi"
      >
        {devanagari}
      </span>
      <span className="hidden font-sans text-[0.8em] tracking-tighter uppercase group-hover/name:inline group-focus/name:inline">
        {english}
      </span>
    </span>
  )
}
