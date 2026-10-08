import { ArrowUpRightIcon } from "lucide-react"

import { Markdown } from "@/components/markdown"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { ProseMono } from "@/components/ui/typography"
import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/utils/url"

import type { ResearchPaper } from "../../types/research"

type ResearchPaperItemProps = {
  paper: ResearchPaper
}

export const ResearchPaperItem = ({ paper }: ResearchPaperItemProps) => {
  return (
    <article className="flex flex-col sm:flex-row">
      {/* Headline result, set large like the section titles */}
      <div className="flex shrink-0 items-baseline gap-2 border-b border-edge px-4 py-3 sm:w-44 sm:flex-col sm:items-start sm:justify-center sm:gap-1 sm:border-r sm:border-b-0 sm:py-4">
        <span className="text-4xl leading-none font-black tracking-tighter text-gradient-brand sm:text-5xl">
          {paper.highlight.value}
        </span>
        <span className="text-xs font-extrabold tracking-wider text-muted-foreground uppercase">
          {paper.highlight.label}
        </span>
      </div>

      <div className="flex-1 space-y-3 p-4 sm:space-y-4">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-extrabold tracking-wider text-muted-foreground uppercase">
          <span className="text-foreground">{paper.venue}</span>
          {paper.venueDetails.map((detail) => (
            <span key={detail} className="flex items-center gap-2">
              <span aria-hidden="true">·</span>
              {detail}
            </span>
          ))}
        </p>

        <h3 className="text-lg leading-snug font-extrabold text-balance sm:text-xl">
          {paper.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {paper.authors.map((author, index) => (
            <span key={author}>
              <span
                className={cn(
                  author === paper.ownAuthorName && "font-bold text-foreground"
                )}
              >
                {author}
              </span>
              {index < paper.authors.length - 1 && ", "}
            </span>
          ))}
        </p>

        <ProseMono>
          <Markdown>{paper.summary}</Markdown>
        </ProseMono>

        <ul className="flex flex-wrap gap-1.5">
          {paper.skills.map((skill) => (
            <li key={skill} className="flex">
              <Tag>{skill}</Tag>
            </li>
          ))}
        </ul>

        <Button className="h-10 w-full sm:h-9 sm:w-auto" asChild>
          <a
            href={addQueryParams(paper.link, UTM_PARAMS)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read the paper: ${paper.title}`}
          >
            Read the paper
            <ArrowUpRightIcon />
          </a>
        </Button>
      </div>
    </article>
  )
}
