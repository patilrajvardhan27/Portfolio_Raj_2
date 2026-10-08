import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "topopulse",
    title: "TopoPulse",
    skills: [
      "Python",
      "Containerlab",
      "Cisco IOS",
      "Grafana",
      "Prometheus",
      "Netmiko",
    ],
    description:
      "Python-based network monitoring and management platform for a Containerlab-emulated Cisco IOS topology, polling device telemetry via SSH/Netmiko and streaming health metrics into a Grafana dashboard for real-time visualization. Automated configuration and validation of Cisco proprietary protocols — VPC, HSRP, GLBP, and CDP — for redundant gateway failover and topology discovery.",
    isExpanded: true,
  },
  {
    id: "clearrail",
    title: "ClearRail",
    skills: ["Java", "REST", "gRPC", "Kafka", "JDBC", "Docker"],
    description:
      "Fault-tolerant payment gateway and processor routing verified, encrypted requests across independent Authorization, Clearing, and Settlement microservices behind a load balancer, with async fraud detection. Load-tested for sustained throughput, autoscaling, DoS resilience, and zero dropped transactions on single-service failure.",
  },
  {
    id: "queuewright",
    title: "QueueWright",
    skills: ["Python", "Django", "LLM Agents", "PostgreSQL", "Celery"],
    description:
      "Django workflow platform with an AI quality-review agent that pulls items from a QA queue, executes the QA workflow, runs a quality check, and assigns to a human instead of auto-approving. Reviewer edits are approver-gated and logged as a structured audit trail (client, entries, users).",
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
      "Azure",
      "LLM/RAG",
      "React",
      "TypeScript",
      "Plotly",
    ],
    description:
      "Full-stack energy audit platform: FastAPI/Python backend on Azure exposing asynchronous REST APIs over a change-point regression engine, with an LLM/RAG pipeline that returns no unsupported answer — every standards citation traces back to a retrieved source passage — plus a React/TypeScript frontend with Plotly visualizations.",
  },
  {
    id: "panel-sizer",
    title: "Panel Sizer",
    period: {
      start: "2026",
    },
    skills: ["FastAPI", "Docker", "Azure Container Apps", "RAG"],
    description:
      "Containerized FastAPI NEC Article 220 load calculator deployed on Azure Container Apps with auto-scaling and an integrated RAG assistant, replacing a manual spreadsheet workflow with a repeatable, API-driven microservice.",
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
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Supabase",
      "Razorpay",
    ],
    description:
      "Full-stack membership management system for the Computer Association of Kolhapur, featuring multi-step onboarding with GST certificate and photo uploads to Supabase Storage, Razorpay payment integration with automated PDF receipt generation, and a JWT-secured admin dashboard with bulk Excel member import.",
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
      "AI-powered dating app built for women's priorities, featuring a 23-quality character framework where men are evaluated through open-ended scenario questions analyzed by Claude AI, eliminating identity faking. Includes real-time red flag detection on chat messages and compatibility scoring based on women's custom priorities.",
  },
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
    id: "pumped-up-kicks",
    title: "Pumped Up Kicks",
    link: "https://github.com/patilrajvardhan27/Pumped-Up-Kicks",
    skills: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "RAG",
      "ChromaDB",
      "Ollama",
      "Whisper STT",
    ],
    description:
      "AI-powered lecture intelligence platform that converts video lectures into searchable, timestamped transcripts with conversational Q&A and instant navigation to relevant moments.",
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
    id: "messit",
    title: "MessIt",
    link: "https://play.google.com/store/apps/details?id=com.vinnovateit.messit",
    skills: ["React", "Node.js", "MongoDB", "Redux", "Firebase"],
    description:
      "Implemented and refined real-time push notifications for MessIt's menu updates, which directly contributed to a 10% increase in user engagement with daily menu options.",
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
