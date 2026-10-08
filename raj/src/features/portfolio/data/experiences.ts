import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "cu-boulder",
    companyName: "University of Colorado Boulder",
    companyWebsite: "https://www.colorado.edu",
    positions: [
      {
        id: "cu-ics-swe",
        title: "Software Engineer (Student Assistant) — Institute of Cognitive Science",
        employmentPeriod: {
          start: "05.2026",
        },
        employmentType: "Part-time",
        icon: "code",
        description: `- Contribute to a Flask/MongoDB [Unified Verb Index](https://uvi.colorado.edu/), serving VerbNet, PropBank, FrameNet, and OntoNotes to NLP researchers; run 2 production Linux servers at 99.99% uptime over 18,772 health checks with zero-downtime gunicorn reloads under systemd.
- Rebuilt ingest as a Python ETL pipeline: NLTK parses FrameNet, spaCy dependency parses generate syntactic frame diagrams, and cross-links across 4 corpora (3K+ entries) are computed once into denormalized collections, replacing request-time joins with single-document reads.
- Cut p95 search and page latency from 897ms to 287ms across 20+ views by replacing full collection scans with MongoDB indexes and moving repeated Jinja2 lookups into precomputed fields; patched OpenSSL CVEs and upgraded to Flask 3 / Python 3.12, gated by pytest in GitHub Actions CI.`,
        skills: [
          "Python",
          "Flask",
          "MongoDB",
          "spaCy",
          "NLTK",
          "Linux",
          "Gunicorn",
          "GitHub Actions",
        ],
        isExpanded: true,
      },
      {
        id: "cu-ceae-swe",
        title:
          "Software Engineer (Student Assistant) — Civil & Architectural Engineering",
        employmentPeriod: {
          start: "03.2026",
        },
        employmentType: "Part-time",
        icon: "code",
        description: `- **[SABER](https://saber-web.azurewebsites.net/):** Led the rewrite of a PyQt5 desktop energy-audit tool into a web app with 2 co-developers: a FastAPI backend on Azure runs the change-point regression engine (pandas/NumPy) behind async endpoints so long fits don't block other requests, a RAG pipeline handles standards lookups, and a React/TypeScript frontend plots energy use against weather in Plotly.
- **Panel Sizer:** NEC Article 220 residential load calculator in FastAPI, Dockerized and deployed on Azure Container Apps with infrastructure as code in Terraform, plus a RAG assistant for NEC code questions.
- **TUNBEEC Compliance Tool:** Wrapped the existing Tunisian energy-code engine, unmodified, in a thin FastAPI layer, built a Next.js frontend at parity with the PySide6 desktop app on Azure App Service, and shipped an offline Windows installer (PyInstaller).`,
        skills: [
          "FastAPI",
          "Python",
          "Azure",
          "RAG",
          "React",
          "TypeScript",
          "Plotly",
          "Docker",
          "Terraform",
          "Next.js",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "cak",
    companyName: "Computer Association of Kolhapur (CAK)",
    companyWebsite: "https://cak-kolhapur.com/",
    positions: [
      {
        id: "cak-software-developer",
        title: "Software Developer",
        employmentPeriod: {
          start: "01.2026",
        },
        employmentType: "Volunteer · Remote",
        icon: "code",
        description: `- Built the membership portal (Next.js, FastAPI, Supabase/PostgreSQL) that replaced manual signups for 30+ members: multi-step onboarding and Razorpay payments, where payment confirmation triggers membership activation and an auto-generated PDF receipt.
- Built the admin dashboard, secured by Firebase-issued JWTs verified server-side in FastAPI, with live membership and revenue stats and a bulk Excel import that validates and deduplicates member records before insert.`,
        skills: [
          "Next.js",
          "FastAPI",
          "Supabase",
          "PostgreSQL",
          "Razorpay",
          "Firebase Auth",
        ],
      },
    ],
  },
  {
    id: "konark",
    companyName: "Konark Computers",
    companyWebsite: "https://www.konark-computers.in/",
    positions: [
      {
        id: "konark-swe-intern",
        title: "Software Engineering Intern",
        employmentPeriod: {
          start: "01.2025",
          end: "05.2025",
        },
        employmentType: "Internship",
        icon: "code",
        description: `- Collaborated on a project to automate the resolution of 5 common networking issues through scripting, which boosted self-service adoption rates by reducing reliance on manual intervention.
- Implemented telemetry dashboards using Grafana for real-time monitoring of LAN/WAN performance, enabling data-driven optimization that improved application response times by 20%.
- Revamped the maintenance schedule for 12 high-volume printers, focusing on paper feed mechanisms and toner replacements, which cut printer-related service requests by 45%.`,
        skills: ["Scripting", "Grafana", "Networking", "Linux"],
      },
    ],
  },
  {
    id: "vinnovateit",
    companyName: "VinnovateIT",
    positions: [
      {
        id: "vinnovateit-app-dev-lead",
        title: "Application Developer Lead",
        employmentPeriod: {
          start: "11.2022",
          end: "12.2024",
        },
        employmentType: "Volunteer & Leadership",
        icon: "code",
        description: `- Led development of MessIt (20,000+ users) and Bunkbuddies (React, Node.js, MongoDB); built a shared component library and added end-to-end tests to the release process, cutting recurring bug reports from 8 to 0 per month.`,
        skills: ["React", "Node.js", "MongoDB", "End-to-end Testing"],
      },
    ],
  },
  {
    id: "walstar",
    companyName: "Walstar Technologies",
    positions: [
      {
        id: "walstar-swe-intern",
        title: "Software Engineering Intern",
        employmentPeriod: {
          start: "08.2023",
          end: "10.2023",
        },
        employmentType: "Internship",
        icon: "code",
        description: `- Built a dairy cooperative app (Flutter, Laravel, MySQL) replacing paper records; adopted by 5+ cooperatives, saving each 7 hours/week (about 40% of manual work).
- Designed the PHP/MySQL REST APIs and Figma prototypes, and shipped the Android frontend with 95% UI test coverage.`,
        skills: ["Flutter", "Laravel", "PHP", "MySQL", "Figma"],
      },
    ],
  },
  {
    id: "valsco",
    companyName: "Valsco Technologies",
    positions: [
      {
        id: "valsco-swe-intern",
        title: "Software Engineering Intern",
        employmentPeriod: {
          start: "05.2023",
          end: "07.2023",
        },
        employmentType: "Internship",
        icon: "code",
        description: `- Programmed and validated push notification workflows and in-app navigation flows, increasing feature adoption by 12%.
- Shipped 4+ new features for the Jurident app by implementing Flutter widgets, authentication workflows, and API integrations, increasing user session time by 18%.`,
        skills: ["Flutter", "Push Notifications", "API Integration"],
      },
    ],
  },
]
