import { cn } from "@/lib/utils"

type HoverSwapNameProps = {
  devanagari: string
  english: string
  className?: string
}

/** Shows the name in Devanagari and swaps it to English while hovered. */
export const HoverSwapName = ({
  devanagari,
  english,
  className,
}: HoverSwapNameProps) => {
  return (
    <span className={cn("group/name", className)}>
      <span className="font-devanagari group-hover/name:hidden" lang="hi">
        {devanagari}
      </span>
      <span className="hidden font-sans text-[0.8em] tracking-tighter uppercase group-hover/name:inline">
        {english}
      </span>
    </span>
  )
}
