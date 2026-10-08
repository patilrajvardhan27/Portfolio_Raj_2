import { RESEARCH_PAPERS } from "../../data/research"
import { Panel, PanelHeader, PanelTitle } from "../panel"
import { ResearchPaperItem } from "./research-paper-item"

export const Research = () => {
  return (
    <Panel id="research">
      <PanelHeader>
        <PanelTitle>Research</PanelTitle>
      </PanelHeader>

      {RESEARCH_PAPERS.map((paper) => (
        <ResearchPaperItem key={paper.id} paper={paper} />
      ))}
    </Panel>
  )
}
