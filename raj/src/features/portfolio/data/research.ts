import type { ResearchPaper } from "../types/research"

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "smart-refrigerator-yolov10",
    title: "Smart Refrigerator Model for Food Safety and Health Promotion",
    authors: [
      "Aditya Kumar Singh",
      "B. K. Tripathy",
      "Prakhar Varshney",
      "Rajvardhan Mohan Patil",
    ],
    ownAuthorName: "Rajvardhan Mohan Patil",
    venue: "AIP Conference Proceedings",
    venueDetails: ["Volume 3388", "Article 030008", "METASOFT 2024"],
    summary:
      "A YOLOv10-based system for real-time food identification and spoilage detection, plus an Android app for replenishment alerts.",
    highlight: {
      value: "97.5%",
      label: "detection accuracy",
    },
    skills: ["YOLOv10", "Computer Vision", "Android"],
    link: "https://pubs.aip.org/aip/acp/article-abstract/3388/1/030008/3394673/Smart-refrigerator-model-for-food-safety-and",
  },
]
