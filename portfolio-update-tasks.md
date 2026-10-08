# Portfolio Update Tasks (from Resume_Rajvardhan.pdf — July 2026)

Sections to update in the existing portfolio to match the new resume. **No new sections.**

---

## 1. Experiences — `raj/src/features/portfolio/data/experiences.ts` 🔴 highest priority

The entire file is still template/someone-else's data (WashU, Illumio, ego (YC W24), Rivian, ASU). None of it matches the resume. Replace with:

- [ ] **University of Colorado (ICS Department)** — Full Stack Developer, May 2026 – Present (current employer) — Python, Flask, MongoDB, JavaScript, NLP (VerbNet/UMR)
- [ ] **University of Colorado (CEAE Department)** — Software Engineering Student Assistant, March 2026 – Present (current employer) — FastAPI, React, TypeScript, Plotly, Python
- [ ] **Computer Association of Kolhapur (CAK)** — Software Developer (Volunteer), January 2026 – Present — Next.js, FastAPI, PostgreSQL, Razorpay, JWT
- [ ] **Konark Computers** — Software Engineering Intern, January 2025 – May 2025 — Scripting, Grafana, Networking
- [ ] **VinnovateIT** — Application Developer Lead (Dec 2023 – Dec 2024) + Senior Core Member (Nov 2022 – Nov 2023) — two positions under one company entry — React, Figma, Testing
- [ ] **Walstar Technologies** — Software Engineering Intern, August 2023 – October 2023 — Flutter, Laravel, PHP, MySQL, Figma
- [ ] **Valsco Technologies** — Software Engineering Intern, May 2023 – July 2023 — Flutter, Push Notifications, API Integration
- [ ] **Education entry**: replace ASU (2020–2024) with **CU Boulder — Master's in CS, Aug 2025 – May 2027** (coursework: Quantum Computing, Database Systems, Data Mining, Neural Networks, Deep Learning, Big Data Architecture); fix **VIT — Bachelor's in CSE, July 2021 – May 2025, GPA 3.4** (currently shows 2018–2020)

## 2. Projects — `raj/src/features/portfolio/data/projects.ts` 🔴 highest priority

Stale/mismatched entries. Remove: Black Myth Wukong AI Agent, Accomplice, Alzheimer's Research (not on resume); fix MessIt (it's a mess-menu app, not a "messaging application"); fix GradBro description ("Building to 1M MRR" → resume copy). Replace with the resume's project list:

- [ ] **Manter** — AI-powered dating app (React Native/Expo, Node.js, PostgreSQL, Socket.IO, Claude AI, AWS S3)
- [ ] **Buff Bites** — AI dining companion for CU Boulder, 50+ users day one (Next.js, FastAPI, MongoDB, Firebase Auth, Claude LLMs)
- [ ] **GradBro** — AI SOP editor, 1500+ users (Next.js, LLMs, AWS CloudFront)
- [ ] **Gradmits** — grad admissions toolkit (Next.js, Tailwind, AWS, FastAPI, MongoDB)
- [ ] **Saber** — building energy audit platform (Next.js 14, FastAPI, Pandas, SciPy, Matplotlib)
- [ ] **CAK Membership Portal** — membership management system (Next.js, FastAPI, PostgreSQL, Supabase, Razorpay)
- [ ] **Pumped Up Kicks** — lecture intelligence platform (RAG, ChromaDB, Ollama, Whisper STT)
- [ ] **Redbro** — Reddit marketing automation (Python, PRAW, PostgreSQL, Redis, OpenAI API, Docker)
- [ ] **MessIt** — mess menu push notifications (React, Node.js, MongoDB, Redux, Firebase)
- [ ] Add real project `link`s from the resume (most currently point to the generic GitHub profile)

## 3. User / About — `raj/src/features/portfolio/data/user.ts` 🟠

- [ ] Fix template leftovers: `firstName: "Kshitij"`, `lastName: "Dhyani"`, `username: "wimpywarlord"`, and the `keywords` array (all still Kshitij Dhyani's)
- [ ] Update `jobs`: resume now shows **two** current CU roles — ICS Dept (Full Stack Developer) + CEAE Dept (SWE Student Assistant); currently only one generic "Software Developer" entry
- [ ] Refresh `about` bullets — add Manter and Buff Bites (currently missing); keep Gradmits/GradBro/Redbro/Saber/CAK/MessIt

## 4. Tech Stack — `raj/src/features/portfolio/data/tech-stack.ts` 🟠

Missing several resume skills. Consider adding (icons permitting):

- [ ] FastAPI, PostgreSQL, Flutter, Firebase, MySQL, GraphQL
- [ ] TensorFlow / scikit-learn, GitHub Actions, Vercel, Grafana
- [ ] Java, PHP (languages)
- [ ] Review whether Redis/Motion still belong (Redis is only in Redbro; fine to keep)

## 5. Chatbot System Prompt — `raj/src/features/portfolio/data/chat-system-prompt.ts` 🟡

Mostly current, but missing the newest resume items:

- [ ] Add **CU ICS Department — Full Stack Developer (May 2026 – Present)** under Work Experience (VerbNet/UMR, Flask, MongoDB, NLP)
- [ ] Add projects **Manter** and **Buff Bites**
- [ ] Add the published research (smart refrigerator, YOLOv10, AIP Conference Proceedings Vol. 3388) — fits under existing content, no new site section needed
- [ ] Add LiveKit/MediaPipe/Whisper already present — verify skills list matches resume's updated Skills section (gRPC, Telemetry, TDD already there ✓)

## 6. Homepage sections — `raj/src/app/(app)/(root)/page.tsx` 🟡

- [ ] `<Experiences />` and `<Projects />` are currently **commented out** on the homepage. Once their data files are fixed (tasks 1 & 2), re-enable them — otherwise the updates never render.

---

## Not needed

- **Awards / Certifications** (`awards.ts`, `certifications.ts`) — empty, and the resume has none. Leave as is.
- **Research section** — resume has one, but portfolio doesn't and no new sections are allowed; covered via the chatbot prompt (task 5).
- Social links, testimonials, bookmarks, blog — unaffected by the resume.
