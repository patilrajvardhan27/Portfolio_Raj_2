import type { Metadata } from "next"

import { Projects } from "@/features/portfolio/components/projects"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Projects",
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
      <div className="screen-line-after border-x border-edge">
        <div
          className={cn(
            "h-8",
            "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
          )}
        />
      </div>

      <Projects />
      <Separator />
    </div>
  )
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "after:absolute after:top-0 after:-left-[100vw] after:-z-1 after:h-px after:w-[200vw] after:bg-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  )
}
