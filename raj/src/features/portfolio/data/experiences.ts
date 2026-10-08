import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "cu-boulder",
    companyName: "University of Colorado Boulder",
    companyWebsite: "https://www.colorado.edu",
    positions: [
      {
        id: "cu-ics-fullstack",
        title: "Full Stack Developer — ICS Department",
        employmentPeriod: {
          start: "05.2026",
        },
        employmentType: "Part-time",
        icon: "code",
        description:
          "Building and maintaining the VerbNet and UMR platforms — a large-scale English verb lexicon used in NLP research worldwide — with Python/Flask backend services and MongoDB.",
        skills: ["Python", "Flask", "MongoDB", "JavaScript", "NLP"],
        isExpanded: true,
      },
      {
        id: "cu-ceae-swe",
        title: "Software Engineering Student Assistant — CEAE Department",
        employmentPeriod: {
          start: "03.2026",
        },
        employmentType: "Part-time",
        icon: "code",
        description:
          "Converting a PyQt5 desktop tool for building energy audit analysis into a full-stack web platform — FastAPI backend wrapping a Python energy modeling engine, React + TypeScript frontend with Plotly charts.",
        skills: ["FastAPI", "React", "TypeScript", "Python", "Plotly"],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "cak",
    companyName: "Computer Association of Kolhapur (CAK)",
    positions: [
      {
        id: "cak-software-developer",
        title: "Software Developer",
        employmentPeriod: {
          start: "01.2026",
        },
        employmentType: "Volunteer",
        icon: "code",
        description:
          "Built a full-stack membership portal with multi-step onboarding, Razorpay payments with automated PDF receipts, and a JWT-secured admin dashboard with bulk Excel import.",
        skills: ["Next.js", "FastAPI", "PostgreSQL", "Razorpay", "JWT"],
      },
    ],
  },
  {
    id: "konark",
    companyName: "Konark Computers",
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
        description:
          "Automated resolution of common networking issues via scripting and built Grafana telemetry dashboards for real-time LAN/WAN monitoring, improving response times by 20%.",
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
        description:
          "Led Bunkbuddies website development with React and Figma redesign, improving user engagement by 35% and reducing development time by 20% through reusable components.",
        skills: ["React", "Figma", "Testing"],
      },
      {
        id: "vinnovateit-senior-core",
        title: "Senior Core Member",
        employmentPeriod: {
          start: "11.2022",
          end: "11.2023",
        },
        icon: "code",
        description:
          "Drove end-to-end testing strategy and code maintenance for the MessIt application, reducing recurring bug reports by 10%.",
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
        description:
          "Engineered a rural dairy automation app used by 5+ cooperatives, reducing manual operations by 40% — Flutter frontend with 95% UI test coverage, Laravel backend, REST APIs in PHP/MySQL with 99.8% uptime.",
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
        description:
          "Shipped 4+ features for the Jurident app — Flutter widgets, authentication workflows, and API integrations — increasing user session time by 18% and feature adoption by 12%.",
        skills: ["Flutter", "Push Notifications", "API Integration"],
      },
    ],
  },
]
