import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "gradmits",
    title: "Gradmits",
    period: {
      start: "2024",
    },
    link: "https://www.gradmits.com/",
    skills: ["Next.js", "FastAPI", "MongoDB", "AWS", "LLMs"],
    description:
      "Shortlists US Master's programs from 250K+ real admission decisions, with LLM recommendations, visa interview insights, faculty discovery, and application tracking.",
    isExpanded: true,
  },
  {
    id: "gradbro",
    title: "GradBro",
    period: {
      start: "2024",
    },
    link: "https://www.gradbro.com/",
    skills: ["Next.js", "FastAPI", "AWS CloudFront", "Claude", "OpenAI"],
    description:
      "Writing copilot for graduate Statements of Purpose used by 1,500+ applicants. A FastAPI backend calls Claude and OpenAI to suggest edits rather than rewrite, so the essay stays in the applicant's voice.",
  },
  {
    id: "manter",
    title: "Manter",
    period: {
      start: "2026",
    },
    link: "https://github.com/patilrajvardhan27/Manter",
    skills: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "Claude Haiku",
    ],
    description:
      "Dating PWA that matches on character, not photos. A 14-scenario quiz is scored deterministically across 23 traits and weighted by each user's priorities; realtime chat runs a Claude Haiku red-flag scan through an idempotent endpoint that re-fetches messages server-side instead of trusting the client.",
  },
  {
    id: "pumped-up-kicks",
    title: "Pumped Up Kicks",
    link: "https://github.com/patilrajvardhan27/Pumped-Up-Kicks",
    skills: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Alembic",
      "Clerk",
      "Whisper",
      "Claude",
    ],
    description:
      "Team of 4. Q&A over recorded lectures: Whisper transcribes with timestamps, chunks are embedded in pgvector, and top-k semantic retrieval sends only matching excerpts to Claude; answers stream over SSE and link to the exact moment in the video.",
  },
  {
    id: "saber",
    title: "SABER",
    period: {
      start: "2026",
    },
    link: "https://saber-web.azurewebsites.net/",
    skills: [
      "FastAPI",
      "Python",
      "pandas",
      "NumPy",
      "Azure",
      "RAG",
      "React",
      "TypeScript",
      "Plotly",
    ],
    description:
      "Rewrite of a PyQt5 desktop energy-audit tool into a web app, led with 2 co-developers: a FastAPI backend on Azure runs the change-point regression engine (pandas/NumPy) behind async endpoints so long fits don't block other requests, a RAG pipeline handles standards lookups, and a React/TypeScript frontend plots energy use against weather in Plotly.",
  },
  {
    id: "panel-sizer",
    title: "Panel Sizer",
    period: {
      start: "2026",
    },
    skills: ["FastAPI", "Docker", "Azure Container Apps", "Terraform", "RAG"],
    description:
      "NEC Article 220 residential load calculator in FastAPI, Dockerized and deployed on Azure Container Apps with infrastructure as code in Terraform, plus a RAG assistant for NEC code questions.",
  },
  {
    id: "tunbeec-compliance-tool",
    title: "TUNBEEC Compliance Tool",
    period: {
      start: "2026",
    },
    skills: ["FastAPI", "Next.js", "Azure App Service", "PyInstaller"],
    description:
      "Wrapped the existing Tunisian energy-code engine, unmodified, in a thin FastAPI layer, built a Next.js frontend at parity with the PySide6 desktop app on Azure App Service, and shipped an offline Windows installer (PyInstaller).",
  },
  {
    id: "cak-membership-portal",
    title: "CAK Membership Portal",
    period: {
      start: "2026",
    },
    link: "https://cak-kolhapur.com/",
    skills: [
      "Next.js",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "Razorpay",
      "Firebase Auth",
    ],
    description:
      "Membership portal that replaced manual signups for 30+ members of the Computer Association of Kolhapur: multi-step onboarding and Razorpay payments, where payment confirmation triggers membership activation and an auto-generated PDF receipt, plus an admin dashboard secured by Firebase-issued JWTs with live membership and revenue stats and a bulk Excel import.",
  },
  {
    id: "buff-bites",
    title: "Buff Bites",
    link: "https://buffbites.live/",
    skills: [
      "Next.js",
      "React",
      "FastAPI",
      "MongoDB",
      "Firebase Auth",
      "Claude",
      "GitHub Actions",
    ],
    description:
      "AI-powered dining companion for CU Boulder that generates personalized, macro-balanced meal combos from daily dining hall menus, with a community feed for sharing and upvoting combos and a trends leaderboard. Reached 50+ users within the first day of launch.",
  },
  {
    id: "messit",
    title: "MessIt",
    link: "https://play.google.com/store/apps/details?id=com.vinnovateit.messit",
    skills: ["React", "Node.js", "MongoDB"],
    description:
      "Campus mess menu app with 20,000+ users, developed at VinnovateIT with a shared component library and end-to-end tests in the release process.",
  },
  {
    id: "redbro",
    title: "Redbro",
    period: {
      start: "2025",
    },
    skills: ["Python", "PRAW", "PostgreSQL", "Redis", "OpenAI API", "Docker"],
    description:
      "Reddit marketing automation system for AI video SaaS, featuring a high-intent post discovery engine with ML-based intent scoring, multi-account management with rate limiting, and automated engagement workflows.",
  },
  {
    id: "sober-space",
    title: "Sober-Space",
    link: "https://github.com/patilrajvardhan27/SoberSpace",
    skills: ["React", "Next.js", "Tailwind CSS", "FastAPI", "LLMs"],
    description:
      "Anonymous substance addiction reporting with AI-generated insights via LLM-powered analysis and a secure FastAPI backend.",
  },
  {
    id: "dret",
    title: "Dret",
    link: "https://github.com/patilrajvardhan27/Dret-",
    skills: [
      "React",
      "Next.js",
      "MediaPipe",
      "FastAPI",
      "LiveKit",
      "Tailwind CSS",
    ],
    description:
      "Canvas combined with hand gesture detection to enable intuitive, real-time drawing and interaction on the board in a video conference web application.",
  },
]
