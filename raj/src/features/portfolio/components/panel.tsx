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
      {/* Sit far out in the side gutters, clear of the separator marks */}
      <TuneMark
        name="music2"
        className="absolute top-4 -left-40 hidden -rotate-12 xl:block"
      />
      <TuneMark
        name="music"
        className="absolute -right-44 bottom-0 hidden rotate-12 xl:block"
      />
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

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="panel-body" className={cn("p-4", className)} {...props} />
  )
}

export { Panel, PanelContent, PanelHeader, PanelTitle }
