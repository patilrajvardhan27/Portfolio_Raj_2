/** A technology item displayed in the Tech Stack section. */
export type TechStack = {
  /** Unique identifier. */
  key: string
  /** Monochrome icon component; inherits the current text color. */
  icon: React.ComponentType<{ className?: string }>
  /** Display name of the technology. */
  title: string
  /** Official website URL. */
  href: string
  /** Category tags used for grouping/filtering. */
  categories: string[]
}
