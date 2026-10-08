import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "gradbro",
    title: "GradBro",
    period: {
      start: "2024",
    },
    link: "https://www.gradbro.com/",
    skills: [
      "Next.js",
      "React",
      "LLMs",
      "AWS CloudFront",
      "Real-time Analysis",
    ],
    description:
      "AI-powered Statement of Purpose (SOP) editor with ideation, writing assistance, and review features for college application essays. Supports 1500+ users.",
    isExpanded: true,
  },
  {
    id: "gradmits",
    title: "Gradmits",
    period: {
      start: "2024",
    },
    link: "https://www.gradmits.com/",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "AWS",
      "LLMs",
      "FastAPI",
      "MongoDB",
    ],
    description:
      "Complete graduate admissions toolkit providing personalized university recommendations, application tracking, and consulting services for US Master's programs.",
  },
  {
    id: "saber",
    title: "SABER",
    period: {
      start: "2026",
    },
    link: "https://saber-six-rho.vercel.app/",
    skills: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Pandas",
      "SciPy",
    ],
    description:
      "Full-stack building energy audit platform guiding users through a multi-step audit workflow — geometry, envelope, HVAC, equipment, and ECM selection — running change-point analysis on utility data to generate energy conservation reports with PDF export.",
  },
  {
    id: "redbro",
    title: "Redbro",
    period: {
      start: "2025",
    },
    link: "https://github.com/patilrajvardhan27/Redbro",
    skills: [
      "Python",
      "PRAW",
      "PostgreSQL",
      "Redis",
      "OpenAI API",
      "Docker",
    ],
    description:
      "Reddit marketing automation system for AI video SaaS, featuring a high-intent post discovery engine with ML-based intent scoring, multi-account management with rate limiting, and automated engagement workflows.",
  },
  {
    id: "manter",
    title: "Manter",
    period: {
      start: "2026",
    },
    link: "https://github.com/patilrajvardhan27/Manter",
    skills: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Socket.IO",
      "Claude AI",
      "AWS S3",
    ],
    description:
      "AI-powered dating app built for women's priorities — men are evaluated through open-ended scenario questions analyzed by Claude AI, with real-time red flag detection on chat messages and compatibility scoring based on custom priorities.",
  },
]
