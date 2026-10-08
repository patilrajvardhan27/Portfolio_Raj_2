import { BoxIcon, InfinityIcon, LinkIcon } from "lucide-react"
import Image from "next/image"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Markdown } from "@/components/markdown"
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible"
import { Tag } from "@/components/ui/tag"
import { ProseMono } from "@/components/ui/typography"
import { UTM_PARAMS } from "@/config/site"
import { addQueryParams } from "@/utils/url"

import type { Project } from "../../types/projects"

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  const { period, link } = project
  const isOngoing = !period?.end
  const isSinglePeriod = period?.end === period?.start

  return (
    <CollapsibleWithContext defaultOpen={project.isExpanded} asChild>
      <div className={className}>
        <div className="flex items-center hover:bg-accent-muted">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={32}
              height={32}
              quality={100}
              className="mx-4 flex size-6 shrink-0 select-none dark:grayscale"
              unoptimized
              aria-hidden="true"
            />
          ) : (
            <div
              className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none"
              aria-hidden="true"
            >
              <BoxIcon className="size-4" />
            </div>
          )}

          <div className="flex-1 border-l border-dashed border-edge">
            <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 pr-2 text-left">
              <div className="flex-1">
                <h3 className="leading-snug font-bold text-balance not-last:mb-1">
                  {project.title}
                </h3>

                {period && (
                  <dl className="text-sm text-muted-foreground">
                    <dt className="sr-only">Period</dt>
                    <dd className="flex items-center gap-0.5">
                      <span>{period.start}</span>
                      {!isSinglePeriod && (
                        <>
                          <span className="font-mono">—</span>
                          {isOngoing ? (
                            <>
                              <InfinityIcon
                                className="size-4.5 translate-y-[0.5px]"
                                aria-hidden
                              />
                              <span className="sr-only">Present</span>
                            </>
                          ) : (
                            <span>{period.end}</span>
                          )}
                        </>
                      )}
                    </dd>
                  </dl>
                )}
              </div>

              {link && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2.5 hover:text-foreground"
                        href={addQueryParams(link, UTM_PARAMS)}
                        target="_blank"
                        rel="noopener"
                      >
                        <LinkIcon className="pointer-events-none size-4" />
                        <span className="sr-only">Open Project Link</span>
                      </a>
                    }
                  />
                  <TooltipContent>
                    <p>Open Project Link</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <div
                className="shrink-0 text-muted-foreground [&_svg]:size-4"
                aria-hidden
              >
                <CollapsibleChevronsIcon />
              </div>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="overflow-hidden duration-300 data-open:animate-collapsible-down data-closed:animate-collapsible-up">
          <div className="space-y-4 border-t border-edge p-4">
            {project.description && (
              <ProseMono>
                <Markdown>{project.description}</Markdown>
              </ProseMono>
            )}

            {project.skills.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {project.skills.map((skill, index) => (
                  <li key={index} className="flex">
                    <Tag>{skill}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  )
}
