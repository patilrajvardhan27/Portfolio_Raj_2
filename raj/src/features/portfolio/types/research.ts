export type ResearchPaper = {
  id: string
  title: string
  /** Authors in published order. */
  authors: string[]
  /** Which entry in `authors` is the site owner, highlighted in the UI. */
  ownAuthorName: string
  /** Publication venue, e.g. the proceedings series. */
  venue: string
  /** Volume, article number, conference and similar citation details. */
  venueDetails: string[]
  summary: string
  /** One headline result shown large beside the paper. */
  highlight: {
    value: string
    label: string
  }
  skills: string[]
  /** Link to the published version of record. */
  link: string
}
