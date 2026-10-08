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
        description: `- Operate the UVI Flask/MongoDB platform serving 4 linguistic resources (VerbNet, PropBank, FrameNet, OntoNotes) to NLP researchers worldwide; triaged and resolved critical production defects to sustain 99.99% uptime, verified by 18,772 automated health checks rather than self-reported status.
- Designed a shared behavioral representation across 4 heterogeneous corpora: built an automated NLP ETL pipeline (spaCy dependency parsing, NLTK tokenization) that mines, normalizes, and cross-links inconsistent source annotations into structured, semantically comparable MongoDB collections powering REST search endpoints.
- Cut page-load and search latency across 20+ views through query, index, and Jinja2 render optimization; administer 2 production Linux servers with zero-downtime gunicorn deployments, OpenSSL CVE remediation from Qualys scans, and a Flask 3 / Python 3.12 stack upgrade executed without a single service interruption.`,
        skills: [
          "Python",
          "Flask",
          "MongoDB",
          "spaCy",
          "NLTK",
          "REST APIs",
          "Linux",
          "Gunicorn",
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
        description: `- Architected [SABER](https://saber-web.azurewebsites.net/), a full-stack energy audit platform: FastAPI/Python backend on Azure exposing asynchronous REST APIs over a change-point regression engine, with an LLM/RAG pipeline that returns no unsupported answer — every standards citation traces back to a retrieved source passage — plus a React/TypeScript frontend with Plotly visualizations.
- Built Panel Sizer, a containerized FastAPI NEC Article 220 load calculator deployed on Azure Container Apps with auto-scaling and an integrated RAG assistant, replacing a manual spreadsheet workflow with a repeatable, API-driven microservice.
- Developed the TBEEC Compliance Tool, an LLM/RAG service on Azure that automatically compares submitted designs against energy-code text and explains which requirements are met, partially met, or unaddressed; packaged into 2 distribution formats (installable Python library and Windows executable) for consultant use.`,
        skills: [
          "FastAPI",
          "Python",
          "Azure",
          "LLM/RAG",
          "React",
          "TypeScript",
          "Plotly",
          "Docker",
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
        description: `- Replaced a fully manual, paper-based membership process with a full-stack portal (Next.js, FastAPI, PostgreSQL) featuring multi-step digital onboarding, Razorpay payment integration, automated PDF receipt generation, and event-driven membership activation on payment confirmation.
- Delivered a JWT-secured admin dashboard with real-time membership and revenue reporting, plus a bulk Excel import pipeline that parses, validates, and deduplicates records before insertion, producing a structured audit trail of every membership state change.`,
        skills: ["Next.js", "FastAPI", "PostgreSQL", "Razorpay", "JWT"],
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
          start: "12.2023",
          end: "12.2024",
        },
        icon: "code",
        description: `- Built out Bunkbuddies website functionality using React and redesigned the UI with Figma, improving user engagement by 35% and reducing development time by 20% through reusable component design.
- Leveraged AI coding assistants (GitHub Copilot) to accelerate development velocity by 30% while maintaining code quality standards through structured code review processes.
- Facilitated 100+ teams during VinHack by troubleshooting GitHub workflows and providing technical guidance, improving project submission rate by 20%.`,
        skills: ["React", "Figma", "GitHub Copilot", "Code Review"],
      },
      {
        id: "vinnovateit-senior-core",
        title: "Senior Core Member",
        employmentPeriod: {
          start: "11.2022",
          end: "11.2023",
        },
        icon: "code",
        description: `- Implemented comprehensive end-to-end testing strategies for the MessIt application and drove code maintenance initiatives, which improved code quality, leading to a 10% decrease in recurring bug reports.`,
        skills: ["React", "Testing", "Code Review"],
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
        description: `- Digitally transformed a manual, paper-driven dairy operation into an end-to-end app (Flutter, Laravel, MySQL) adopted by 5+ cooperatives, cutting manual operations 40% and saving each cooperative roughly 7 hours per week.
- Built REST APIs in PHP/MySQL sustaining 99.8% uptime under test load; prototyped UI/UX in Figma and shipped an Android frontend validated at 95% UI test coverage.`,
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
