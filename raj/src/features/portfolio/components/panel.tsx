import { Slot } from "radix-ui"
import React from "react"

import { TuneMark } from "@/components/tune-mark"
import { cn } from "@/lib/utils"

function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="panel"
      className={cn(
        "screen-line-before screen-line-after border-x border-edge",
        className
      )}
      {...props}
    />
  )
}

function PanelHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="panel-header"
      className={cn("screen-line-after px-4", className)}
      {...props}
    >
      {children}
      <TuneMark name="music2" className="absolute top-2.5 right-4 rotate-12" />
    </header>
  )
}

function PanelTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"h2"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "h2"

  return (
    <Comp
      data-slot="panel-title"
      className={cn("py-1 text-3xl leading-none font-black tracking-tighter text-gradient-brand uppercase sm:text-5xl", className)}
      {...props}
    />
  )
}

function PanelTitleSup({ className, ...props }: React.ComponentProps<"sup">) {
  return (
    <sup
      className={cn(
        "-top-[0.75em] ml-1 text-sm font-medium text-muted-foreground tabular-nums select-none",
        className
      )}
      {...props}
    />
  )
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="panel-body" className={cn("p-4", className)} {...props} />
  )
}

export { Panel, PanelContent, PanelHeader, PanelTitle, PanelTitleSup }
