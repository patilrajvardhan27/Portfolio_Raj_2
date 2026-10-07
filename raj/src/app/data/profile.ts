import { Entry, Fact, Link, Question, Tab } from './models';

const GITHUB = 'https://github.com/patilrajvardhan27';

export const PROFILE = {
  name: 'Rajvardhan Patil',
  shortName: 'Raj',
  wordmark: 'Rajvardhan',
  pronouns: 'he/him',
  role: 'Software engineer',
  tagline: 'Full-stack and AI engineer · MS Computer Science, CU Boulder',
  location: 'Boulder, Colorado',
  hometown: 'Kolhapur, Maharashtra',
  photo: 'images/rajvardhan-patil.jpg',
  resume: 'Rajvardhan_Patil_Resume.pdf',
  // Kept in two pieces so the address is not sitting in the markup for scrapers.
  emailUser: 'patilrajvardhan27',
  emailHost: 'gmail.com',
  bio:
    'Rajvardhan Patil is a software engineer and computer science graduate student at the ' +
    'University of Colorado Boulder. He builds full-stack and AI-powered products end to end, ' +
    'maintains the VerbNet and UMR research platforms at CU, and is a published author in ' +
    'AIP Conference Proceedings.',
};

export const EMAIL = `${PROFILE.emailUser}@${PROFILE.emailHost}`;

export const SOCIALS: (Link & { handle: string; mark: string })[] = [
  { label: 'GitHub', handle: '@patilrajvardhan27', url: GITHUB, mark: 'GH' },
  {
    label: 'LinkedIn',
    handle: 'in/patilrajvardhan27',
    url: 'https://www.linkedin.com/in/patilrajvardhan27/',
    mark: 'in',
  },
  { label: 'X', handle: '@radian_27', url: 'https://x.com/radian_27', mark: 'X' },
];

export const TABS: Tab[] = [
  { id: 'all', label: 'All', icon: 'search' },
  { id: 'experience', label: 'Experience', icon: 'work' },
  { id: 'project', label: 'Projects', icon: 'code' },
  { id: 'research', label: 'Research', icon: 'science' },
  { id: 'education', label: 'Education', icon: 'school' },
  { id: 'skills', label: 'Skills', icon: 'bolt' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];

export const HIGHLIGHTS = [
  { value: '1,500+', label: 'users on GradBro' },
  { value: '9', label: 'products built' },
  { value: '7', label: 'engineering roles' },
  { value: '97.5%', label: 'accuracy, published model' },
];

export const FACTS: Fact[] = [
  { label: 'Based in', value: 'Boulder, Colorado, USA' },
  { label: 'From', value: 'Kolhapur, Maharashtra, India' },
  {
    label: 'Currently',
    value:
      'Full Stack Developer and Software Engineering Student Assistant, University of Colorado',
  },
  { label: 'Education', value: 'MS Computer Science, CU Boulder (2025 – 2027)' },
  { label: 'Undergraduate', value: 'B.Tech Computer Science and Engineering, VIT Vellore' },
  {
    label: 'Published in',
    value: 'AIP Conference Proceedings, Vol. 3388',
    url: 'https://doi.org/10.1063/5.0317878',
  },
  { label: 'Works with', value: 'TypeScript, Python, React, Next.js, FastAPI, Flutter' },
];

export const ABOUT: Entry = {
  id: 'about',
  kind: 'about',
  source: PROFILE.name,
  trail: ['about'],
  title: 'Rajvardhan Patil — Software Engineer',
  summary: PROFILE.bio,
  points: [
    'Started writing code to fix problems he kept running into himself, and still picks projects that way.',
    'Works across the stack: React, Next.js and Flutter on the front, FastAPI, Node.js and Laravel behind it, with PostgreSQL and MongoDB underneath.',
    'Ships LLM features that hold up in production, including structured output, retrieval, and scoring pipelines on Claude, GPT and local models.',
  ],
  keywords: ['who', 'bio', 'about', 'summary', 'profile', 'introduction', 'engineer', 'developer'],
};

export const ENTRIES: Entry[] = [
  // ── Experience ────────────────────────────────────────────────────────────
  {
    id: 'cu-ics',
    kind: 'experience',
    source: 'University of Colorado Boulder',
    trail: ['colorado.edu', 'Institute of Cognitive Science', 'VerbNet · UMR'],
    title: 'Full Stack Developer — Institute of Cognitive Science (ICS)',
    url: 'https://verbs.colorado.edu',
    period: 'May 2026 – Present',
    location: 'Boulder, CO, USA',
    summary:
      'Keeps the VerbNet and UMR project websites fast and stable. VerbNet is a large-scale ' +
      'English verb lexicon that NLP researchers around the world depend on.',
    points: [
      'Resolving critical bugs and optimizing performance across the VerbNet and UMR project websites, improving platform stability for a large-scale English verb lexicon used in NLP research worldwide.',
      'Building and maintaining backend services using Python and Flask, enhancing API reliability and data processing pipelines for VerbNet’s syntactic-semantic verb class database.',
      'Integrating HTML, CSS, and JavaScript with MongoDB to improve frontend responsiveness and database query efficiency across both the VerbNet and UMR platforms.',
      'Collaborating with cross-functional research teams to implement new features based on structured user feedback, supporting downstream NLP applications including word sense disambiguation and semantic role labeling.',
    ],
    tags: ['Python', 'Flask', 'MongoDB', 'JavaScript', 'HTML', 'CSS', 'NLP'],
    links: [
      { label: 'Unified Verb Index', url: 'https://uvi.colorado.edu' },
      { label: 'Uniform Meaning Representation', url: 'https://umr4nlp.github.io/web/' },
    ],
    keywords: ['current', 'now', 'cu', 'boulder', 'verbnet', 'umr', 'linguistics', 'backend'],
  },
  {
    id: 'cu-ceae',
    kind: 'experience',
    source: 'University of Colorado Boulder',
    trail: ['colorado.edu', 'CEAE', 'Building energy'],
    title:
      'Software Engineering Student Assistant — Civil, Environmental and Architectural Engineering (CEAE)',
    url: 'https://www.colorado.edu/ceae/larsonlab',
    period: 'March 2026 – Present',
    location: 'Boulder, CO, USA',
    summary:
      'Turning a PyQt5 desktop tool for building energy audits into a web platform that ' +
      'engineers and energy consultants can open in a browser.',
    points: [
      'Developing a full-stack web application for building energy audit analysis, converting a PyQt5 desktop tool into a browser-accessible platform serving engineers and energy consultants across multiple commercial building projects.',
      'Engineering a RESTful API backend using FastAPI wrapping a Python energy modeling engine (change-point inverse models, Building Load Coefficient analysis, EEM savings calculations), enabling asynchronous execution of long-running NOAA weather fetch and EEM analysis jobs.',
      'React + TypeScript frontend with Plotly-powered interactive charts (psychrometric, end-use breakdown, measure ROI rankings), replacing 78-field PyQt5 forms with a tabbed, validated web UI.',
    ],
    tags: ['FastAPI', 'React', 'TypeScript', 'Python', 'Plotly', 'REST APIs'],
    keywords: ['current', 'now', 'cu', 'boulder', 'energy', 'audit', 'saber', 'frontend'],
  },
  {
    id: 'cak',
    kind: 'experience',
    source: 'Computer Association of Kolhapur',
    trail: ['cak-kolhapur.com', 'Volunteer'],
    title: 'Software Developer (Volunteer) — Computer Association of Kolhapur (CAK)',
    url: 'https://cak-kolhapur.com',
    period: 'January 2026 – Present',
    location: 'Kolhapur, MH, India',
    summary:
      'Replaced the association’s paper membership process with a portal that handles ' +
      'registration, renewals, payments and receipts on its own.',
    points: [
      'Designed and built a full-stack membership portal handling new registrations and renewals, replacing a manual process with a multi-step digital onboarding flow covering personal, business, and payment details.',
      'Integrated Razorpay payment gateway with automatic PDF receipt generation using ReportLab, triggering membership activation and expiry extension upon successful payment confirmation.',
      'Built a JWT-secured admin dashboard exposing real-time membership stats (active, pending, expired, revenue) and a bulk Excel import pipeline that parses, validates, and deduplicates member records before inserting them into the database.',
    ],
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Razorpay', 'ReportLab', 'JWT'],
    keywords: ['volunteer', 'volunteering', 'community', 'payments', 'non-profit'],
  },
  {
    id: 'konark',
    kind: 'experience',
    source: 'Konark Computers',
    trail: ['konark-computers.in', 'Internship'],
    title: 'Software Engineering Intern — Konark Computers',
    url: 'https://www.konark-computers.in',
    period: 'January 2025 – May 2025',
    location: 'Kolhapur, MH, India',
    summary:
      'Scripted fixes for recurring network faults and put LAN/WAN performance on live ' +
      'Grafana dashboards, improving application response times by 20%.',
    points: [
      'Collaborated on a project to automate the resolution of 5 common networking issues through scripting, which boosted self-service adoption rates by reducing reliance on manual intervention.',
      'Implemented telemetry dashboards using Grafana for real-time monitoring of LAN/WAN performance, enabling data-driven optimization that improved application response times by 20%.',
      'Revamped the maintenance schedule for 12 high-volume printers, focusing on paper feed mechanisms and toner replacements, which cut printer-related service requests by 45%.',
    ],
    tags: ['Scripting', 'Grafana', 'Networking', 'Telemetry', 'Linux'],
    links: [{ label: 'Website source', url: `${GITHUB}/Konark` }],
    keywords: ['intern', 'internship', 'observability', 'monitoring', 'it'],
  },
  {
    id: 'vinnovateit',
    kind: 'experience',
    source: 'VinnovateIT',
    trail: ['vinnovateit.com', 'VIT Vellore', 'Student tech club'],
    title: 'Application Developer Lead — VinnovateIT',
    url: 'https://vinnovateit.com',
    period: 'November 2022 – December 2024',
    location: 'Vellore, TN, India',
    summary:
      'Two years with VinnovateIT at VIT, first as a senior core member and then leading ' +
      'application development on Bunkbuddies and MessIt.',
    roles: [
      { title: 'Application Developer Lead', period: 'December 2023 – December 2024' },
      { title: 'Senior Core Member', period: 'November 2022 – November 2023' },
    ],
    points: [
      'Built out Bunkbuddies website functionality using React, and redesigned the UI with Figma, improving user engagement by 35% and reducing development time by 20% through reusable component design.',
      'Leveraged AI coding assistants (GitHub Copilot) to accelerate development velocity by 30% while maintaining code quality standards through structured code review processes.',
      'Implemented comprehensive end-to-end testing strategies for the MessIt application and drove code maintenance initiatives, which improved code quality, leading to a 10% decrease in recurring bug reports.',
    ],
    tags: ['React', 'Figma', 'End-to-end testing', 'Code review', 'Leadership'],
    links: [
      {
        label: 'MessIt on Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.vinnovateit.messit',
      },
    ],
    keywords: ['lead', 'leadership', 'club', 'bunkbuddies', 'messit', 'team'],
  },
  {
    id: 'walstar',
    kind: 'experience',
    source: 'Walstar Technologies',
    trail: ['walstartechnologies.com', 'Internship'],
    title: 'Software Engineering Intern — Walstar Technologies',
    url: 'https://www.walstartechnologies.com',
    period: 'August 2023 – October 2023',
    location: 'Kolhapur, MH, India',
    summary:
      'Built a rural dairy automation app from design to deployment. Five-plus cooperatives ' +
      'use it, and each saves about 7 hours of manual work a week.',
    points: [
      'Engineered end-to-end development of a rural dairy automation app used by 5+ cooperatives, reducing manual operations by 40% and saving each cooperative approximately 7 hours per week.',
      'Architected and prototyped UI/UX in Figma, with a Flutter frontend for Android at 95% UI test coverage, integrated with a scalable Laravel backend.',
      'Delivered robust REST APIs using PHP and MySQL, achieving 99.8% uptime and preventing data loss during testing, which facilitated reliable data transmission for end users.',
    ],
    tags: ['Flutter', 'Laravel', 'PHP', 'MySQL', 'Figma', 'REST APIs'],
    links: [{ label: 'Dairy app source', url: `${GITHUB}/Dairy_App` }],
    keywords: ['intern', 'internship', 'mobile', 'android', 'dairy'],
  },
  {
    id: 'valsco',
    kind: 'experience',
    source: 'Valsco Technologies',
    trail: ['Valsco Technologies', 'Internship'],
    title: 'Software Engineering Intern — Valsco Technologies',
    period: 'May 2023 – July 2023',
    location: 'Vellore, TN, India',
    summary:
      'Shipped four-plus features for the Jurident app in Flutter, lifting user session ' +
      'time by 18% and feature adoption by 12%.',
    points: [
      'Programmed and validated push notification workflows and in-app navigation flows, increasing feature adoption by 12%.',
      'Contributed 4+ new features to Jurident by implementing Flutter widgets, authentication workflows, and API integrations, increasing user session time by 18%.',
    ],
    tags: ['Flutter', 'Push notifications', 'Authentication', 'API integration'],
    keywords: ['intern', 'internship', 'mobile', 'jurident'],
  },

  // ── Projects ──────────────────────────────────────────────────────────────
  {
    id: 'manter',
    kind: 'project',
    source: 'Manter',
    trail: ['manter.vercel.app'],
    title: 'Manter — AI-powered dating app built around women’s priorities',
    url: 'https://manter.vercel.app',
    summary:
      'A 23-quality character framework where men are evaluated through open-ended scenario ' +
      'questions analyzed by Claude, which takes identity faking off the table.',
    points: [
      '23-quality character framework: men answer open-ended scenario questions that Claude analyzes, eliminating identity faking.',
      'Real-time red flag detection on chat messages.',
      'Compatibility scoring based on each woman’s own custom priorities.',
    ],
    tags: ['React Native (Expo)', 'Node.js', 'PostgreSQL', 'Socket.IO', 'Claude AI', 'AWS S3'],
    links: [{ label: 'Source on GitHub', url: `${GITHUB}/Manter` }],
    keywords: ['ai', 'llm', 'mobile', 'app', 'realtime', 'chat'],
  },
  {
    id: 'buff-bites',
    kind: 'project',
    source: 'Buff Bites',
    trail: ['buffbites.live'],
    title: 'Buff Bites — AI dining companion for CU Boulder',
    url: 'https://buffbites.live',
    summary:
      'Generates personalized, macro-balanced meal combos from the day’s dining hall menus. ' +
      'Reached 50+ users within the first day of launch.',
    points: [
      'Generates personalized, macro-balanced meal combos from daily dining hall menus.',
      'Community feed for sharing and upvoting combos, plus a trends leaderboard.',
      'Menus are scraped automatically every day through GitHub Actions.',
      'Reached 50+ users within the first day of launch.',
    ],
    tags: [
      'Next.js',
      'React',
      'FastAPI',
      'MongoDB',
      'Firebase Auth',
      'Claude (structured output)',
      'GitHub Actions',
    ],
    keywords: ['ai', 'llm', 'food', 'nutrition', 'cu', 'boulder', 'scraping'],
  },
  {
    id: 'gradbro',
    kind: 'project',
    source: 'GradBro',
    trail: ['gradbro.com'],
    title: 'GradBro — AI-powered Statement of Purpose editor',
    url: 'https://www.gradbro.com',
    summary:
      'An SOP editor with ideation, writing assistance and review features for college ' +
      'application essays. Supports 1,500+ users.',
    points: [
      'Ideation, writing assistance, and review features built for college application essays.',
      'Real-time text analysis while the applicant writes.',
      'Supports 1,500+ users.',
    ],
    tags: ['Next.js', 'React', 'LLMs', 'AWS CloudFront', 'Real-time text analysis'],
    keywords: ['ai', 'sop', 'essay', 'admissions', 'writing', 'startup', 'saas'],
  },
  {
    id: 'gradmits',
    kind: 'project',
    source: 'Gradmits',
    trail: ['gradmits.com'],
    title: 'Gradmits — Complete graduate admissions toolkit',
    url: 'https://www.gradmits.com',
    summary:
      'Personalized university recommendations, application tracking and consulting ' +
      'services for students applying to US Master’s programs.',
    points: [
      'Personalized university recommendations.',
      'Application tracking across programs.',
      'Consulting services for US Master’s applicants.',
    ],
    tags: ['Next.js', 'React', 'Tailwind CSS', 'AWS', 'LLMs', 'FastAPI', 'MongoDB'],
    keywords: ['ai', 'admissions', 'university', 'masters', 'startup', 'saas'],
  },
  {
    id: 'saber',
    kind: 'project',
    source: 'Saber',
    trail: ['Saber', 'Building energy audits'],
    title: 'Saber — Full-stack building energy audit platform',
    summary:
      'Guides users through a multi-step audit workflow and runs change-point analysis on ' +
      'utility data to produce energy conservation measure reports with PDF export.',
    points: [
      'Multi-step audit workflow covering geometry, envelope, HVAC, equipment, and ECM selection.',
      'Runs change-point analysis on utility data to generate energy conservation measure reports.',
      'Reports export to PDF.',
    ],
    tags: [
      'Next.js 14',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'Python',
      'Pandas',
      'SciPy',
      'Matplotlib',
    ],
    keywords: ['energy', 'audit', 'hvac', 'data', 'analysis', 'ceae'],
  },
  {
    id: 'cak-portal',
    kind: 'project',
    source: 'CAK Membership Portal',
    trail: ['cak-kolhapur.com'],
    title: 'CAK Membership Portal — Membership management for the Computer Association of Kolhapur',
    url: 'https://cak-kolhapur.com',
    summary:
      'Multi-step onboarding, Razorpay payments with automated PDF receipts, and a ' +
      'JWT-secured admin dashboard with bulk Excel member import.',
    points: [
      'Multi-step onboarding with GST certificate and photo uploads to Supabase Storage.',
      'Razorpay payment integration with automated PDF receipt generation.',
      'JWT-secured admin dashboard with bulk Excel member import.',
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Supabase',
      'Razorpay',
    ],
    keywords: ['payments', 'dashboard', 'admin', 'kolhapur', 'volunteer'],
  },
  {
    id: 'pumped-up-kicks',
    kind: 'project',
    source: 'Pumped Up Kicks',
    trail: ['github.com', 'patilrajvardhan27', 'Pumped-Up-Kicks'],
    title: 'Pumped Up Kicks — AI lecture intelligence platform',
    url: `${GITHUB}/Pumped-Up-Kicks`,
    summary:
      'Converts video lectures into searchable, timestamped transcripts with conversational ' +
      'Q&A and instant navigation to the relevant moment.',
    points: [
      'Converts video lectures into searchable, timestamped transcripts.',
      'Conversational Q&A over lecture content using retrieval-augmented generation.',
      'Jumps straight to the moment in the video that answers the question.',
      'Built as a set of microservices.',
    ],
    tags: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'RAG',
      'ChromaDB',
      'Ollama',
      'Whisper STT',
      'Microservices',
    ],
    keywords: ['ai', 'llm', 'vector', 'database', 'speech', 'video', 'education'],
  },
  {
    id: 'redbro',
    kind: 'project',
    source: 'Redbro',
    trail: ['Redbro', 'Marketing automation'],
    title: 'Redbro — Reddit marketing automation for an AI video SaaS',
    summary:
      'A high-intent post discovery engine with ML-based intent scoring, multi-account ' +
      'management with rate limiting, and automated engagement workflows.',
    points: [
      'High-intent post discovery engine with ML-based intent scoring.',
      'Multi-account management with rate limiting.',
      'Automated engagement workflows.',
    ],
    tags: ['Python', 'PRAW', 'PostgreSQL', 'Redis', 'OpenAI API', 'Docker'],
    keywords: ['ai', 'ml', 'automation', 'reddit', 'growth', 'backend'],
  },
  {
    id: 'messit',
    kind: 'project',
    source: 'MessIt',
    trail: ['play.google.com', 'store', 'apps', 'MessIt'],
    title: 'MessIt — Real-time mess menu notifications for VIT',
    url: 'https://play.google.com/store/apps/details?id=com.vinnovateit.messit',
    summary:
      'Implemented and refined real-time push notifications for menu updates, which ' +
      'contributed directly to a 10% increase in engagement with daily menu options.',
    points: [
      'Implemented and refined real-time push notifications for MessIt’s menu updates.',
      'Directly contributed to a 10% increase in user engagement with daily menu options.',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Redux', 'Firebase push notifications'],
    keywords: ['mobile', 'android', 'vit', 'vinnovateit', 'campus', 'food'],
  },

  // ── Research ──────────────────────────────────────────────────────────────
  {
    id: 'smart-refrigerator',
    kind: 'research',
    source: 'AIP Conference Proceedings',
    trail: ['pubs.aip.org', 'acp', 'Vol. 3388', '030008'],
    title: 'Smart refrigerator model for food safety and health promotion using YOLOv10',
    url: 'https://doi.org/10.1063/5.0317878',
    period: '2026',
    location: 'METASOFT 2024 · Bhubaneswar, India',
    summary:
      'A smart refrigerator model that uses YOLOv10 for real-time food identification, ' +
      'freshness monitoring and spoilage detection, achieving 97.5% accuracy.',
    points: [
      'Developed a smart refrigerator model leveraging YOLOv10 for real-time food identification, freshness monitoring, and spoilage detection, achieving 97.5% accuracy.',
      'Integrated an Android application that alerts users when items need replenishing and delivers dietary recommendations based on consumption patterns.',
      'Authors: Aditya Kumar Singh, B. K. Tripathy, Prakhar Varshney, Rajvardhan Mohan Patil.',
      'Published in AIP Conference Proceedings, Volume 3388, Issue 1, article 030008. Presented at Metaheuristics in Engineering & Its Applications (METASOFT 2024).',
      'DOI: 10.1063/5.0317878',
    ],
    tags: ['YOLOv10', 'Python', 'Android', 'OpenCV', 'IoT sensors', 'Computer vision'],
    links: [
      {
        label: 'Read on AIP Publishing',
        url: 'https://pubs.aip.org/aip/acp/article-abstract/3388/1/030008/3394673/',
      },
    ],
    keywords: [
      'paper',
      'publication',
      'published',
      'research',
      'journal',
      'conference',
      'ml',
      'deep',
      'learning',
      'detection',
      'vision',
    ],
  },

  // ── Education ─────────────────────────────────────────────────────────────
  {
    id: 'cu-boulder',
    kind: 'education',
    source: 'University of Colorado Boulder',
    trail: ['colorado.edu', 'Computer Science', 'Graduate'],
    title: 'Master of Science in Computer Science — University of Colorado Boulder',
    url: 'https://www.colorado.edu/cs/',
    period: 'August 2025 – May 2027',
    location: 'Boulder, Colorado, USA',
    summary:
      'Graduate coursework in quantum computing, database systems, data mining, neural ' +
      'networks, deep learning and big data architecture.',
    tags: [
      'Quantum Computing',
      'Database Systems',
      'Data Mining',
      'Neural Networks',
      'Deep Learning',
      'Big Data Architecture',
    ],
    keywords: ['masters', 'ms', 'degree', 'graduate', 'university', 'college', 'cu', 'coursework'],
  },
  {
    id: 'vit',
    kind: 'education',
    source: 'Vellore Institute of Technology',
    trail: ['vit.ac.in', 'Computer Science and Engineering'],
    title: 'Bachelor of Technology in Computer Science and Engineering — VIT Vellore',
    url: 'https://vit.ac.in',
    period: 'July 2021 – May 2025',
    location: 'Vellore, Tamil Nadu, India',
    summary:
      'GPA 3.4. Coursework in data structures and algorithms, theory of computation, ' +
      'design and analysis of algorithms, and software engineering.',
    tags: [
      'Data Structures & Algorithms',
      'Theory of Computation',
      'Design & Analysis of Algorithms',
      'Software Engineering',
    ],
    keywords: ['bachelors', 'btech', 'degree', 'undergraduate', 'university', 'college', 'gpa'],
  },

  // ── Skills ────────────────────────────────────────────────────────────────
  {
    id: 'skills-languages',
    kind: 'skills',
    source: 'Skills',
    trail: ['skills', 'languages'],
    title: 'Languages',
    summary: 'The languages Rajvardhan writes day to day, from typed frontends to Python services.',
    tags: ['JavaScript (ES5/ES6)', 'TypeScript', 'Python', 'Java', 'HTML', 'CSS', 'PHP'],
    keywords: ['stack', 'tech', 'programming', 'languages'],
  },
  {
    id: 'skills-frameworks',
    kind: 'skills',
    source: 'Skills',
    trail: ['skills', 'frameworks-and-databases'],
    title: 'Frameworks and databases',
    summary: 'Web, mobile and backend frameworks, and the data stores behind them.',
    tags: [
      'Node.js',
      'React.js',
      'Next.js',
      'Redux',
      'Express.js',
      'FastAPI',
      'Laravel',
      'Flutter',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'GraphQL',
      'Firebase',
      'Tailwind CSS',
    ],
    keywords: ['stack', 'tech', 'frontend', 'backend', 'database', 'mobile', 'frameworks'],
  },
  {
    id: 'skills-ai',
    kind: 'skills',
    source: 'Skills',
    trail: ['skills', 'ai-ml'],
    title: 'AI and machine learning',
    summary: 'Classical ML, deep learning, and LLM application work including retrieval.',
    tags: [
      'scikit-learn',
      'TensorFlow',
      'RAG',
      'LLMs (GPT, Claude, Ollama)',
      'Vector databases',
      'GitHub Copilot',
      'Claude Code',
    ],
    keywords: ['stack', 'tech', 'ai', 'ml', 'machine', 'learning', 'llm'],
  },
  {
    id: 'skills-tools',
    kind: 'skills',
    source: 'Skills',
    trail: ['skills', 'tools-and-cloud'],
    title: 'Tools and cloud',
    summary: 'Cloud services, CI, observability, testing, design and real-time media tooling.',
    tags: [
      'Git',
      'AWS (S3, CloudFront, Lambda)',
      'Docker',
      'REST APIs',
      'Linux',
      'Postman',
      'Figma',
      'GitHub Actions',
      'Vercel',
      'Grafana',
      'Cypress',
      'Jest',
      'LiveKit',
      'Whisper STT',
      'MediaPipe',
    ],
    keywords: ['stack', 'tech', 'devops', 'cloud', 'testing', 'tools'],
  },
  {
    id: 'skills-practices',
    kind: 'skills',
    source: 'Skills',
    trail: ['skills', 'engineering-practices'],
    title: 'Engineering practices',
    summary: 'How the work gets done: process, architecture and quality.',
    tags: [
      'Agile',
      'SCRUM',
      'SDLC',
      'CI/CD',
      'Microservices',
      'gRPC',
      'RESTful APIs',
      'Telemetry & Observability',
      'Real-time Analytics',
      'UI/UX Design',
      'Test-Driven Development',
    ],
    keywords: ['stack', 'process', 'architecture', 'practices', 'tdd'],
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  {
    id: 'contact-email',
    kind: 'contact',
    source: 'Email',
    trail: ['mail', PROFILE.emailHost],
    title: EMAIL,
    url: `mailto:${EMAIL}`,
    summary: 'The fastest way to reach Rajvardhan about roles, projects or collaborations.',
    keywords: ['contact', 'email', 'mail', 'reach', 'hire', 'hiring', 'touch'],
  },
  {
    id: 'contact-linkedin',
    kind: 'contact',
    source: 'LinkedIn',
    trail: ['linkedin.com', 'in', 'patilrajvardhan27'],
    title: 'Rajvardhan Patil on LinkedIn',
    url: 'https://www.linkedin.com/in/patilrajvardhan27/',
    summary: 'Professional history and updates, and the easiest place to connect.',
    keywords: ['contact', 'linkedin', 'social', 'connect', 'network', 'hire'],
  },
  {
    id: 'contact-github',
    kind: 'contact',
    source: 'GitHub',
    trail: ['github.com', 'patilrajvardhan27'],
    title: 'patilrajvardhan27 on GitHub',
    url: GITHUB,
    summary:
      'Public repositories including Manter and Pumped Up Kicks, plus earlier Flutter and ' +
      'Kotlin work.',
    links: [
      { label: 'Manter', url: `${GITHUB}/Manter` },
      { label: 'Pumped-Up-Kicks', url: `${GITHUB}/Pumped-Up-Kicks` },
      { label: 'Dairy_App', url: `${GITHUB}/Dairy_App` },
    ],
    keywords: ['contact', 'github', 'code', 'repos', 'repositories', 'source', 'social'],
  },
  {
    id: 'contact-x',
    kind: 'contact',
    source: 'X',
    trail: ['x.com', 'radian_27'],
    title: '@radian_27 on X',
    url: 'https://x.com/radian_27',
    summary: 'Find him on X as @radian_27.',
    keywords: ['contact', 'twitter', 'x', 'social'],
  },
  {
    id: 'contact-resume',
    kind: 'contact',
    source: 'Résumé',
    trail: ['resume', 'pdf'],
    title: 'Rajvardhan Patil — Résumé (PDF)',
    url: PROFILE.resume,
    summary: 'Two pages covering education, experience, projects, research and skills.',
    keywords: ['resume', 'cv', 'pdf', 'download', 'contact', 'hire'],
  },
];

export const QUESTIONS: Question[] = [
  {
    question: 'What is Rajvardhan working on right now?',
    answer:
      'Two roles at the University of Colorado. At the Institute of Cognitive Science he is the full stack developer on the VerbNet and UMR websites (Python, Flask, MongoDB). In the CEAE department he is rebuilding a PyQt5 building-energy audit tool as a FastAPI and React web platform. Alongside both, he volunteers as the developer of the Computer Association of Kolhapur’s membership portal while completing his MS in Computer Science.',
    query: 'current',
  },
  {
    question: 'What has he built that people actually use?',
    answer:
      'GradBro, an AI Statement of Purpose editor, supports 1,500+ users. Buff Bites reached 50+ users on its first day at CU Boulder. His dairy automation app runs in 5+ rural cooperatives and saves each about 7 hours a week. MessIt is live on Google Play, and the CAK portal handles real registrations and Razorpay payments.',
    query: 'projects',
  },
  {
    question: 'Has he published any research?',
    answer:
      'Yes. “Smart refrigerator model for food safety and health promotion using YOLOv10” appears in AIP Conference Proceedings, Volume 3388 (article 030008), co-authored with Aditya Kumar Singh, B. K. Tripathy and Prakhar Varshney. The model reaches 97.5% accuracy on food identification, freshness monitoring and spoilage detection.',
    query: 'research',
  },
  {
    question: 'What is his technical stack?',
    answer:
      'TypeScript and Python first. React, Next.js and Flutter for interfaces; FastAPI, Node.js, Express and Laravel for services; PostgreSQL, MongoDB, MySQL and Redis for data. On the AI side he works with RAG, vector databases, and Claude, GPT and Ollama models, and deploys on AWS, Vercel and Docker with GitHub Actions.',
    query: 'skills',
  },
  {
    question: 'Where did he study?',
    answer:
      'He is pursuing a Master’s in Computer Science at the University of Colorado Boulder (August 2025 – May 2027) and holds a Bachelor’s in Computer Science and Engineering from Vellore Institute of Technology (2021 – 2025, GPA 3.4).',
    query: 'education',
  },
  {
    question: 'How do I get in touch?',
    answer: `Email ${EMAIL}, or message him on LinkedIn at in/patilrajvardhan27. His résumé is available as a PDF from the Contact tab.`,
    query: 'contact',
  },
];

export const SUGGESTIONS = [
  'rajvardhan patil',
  'rajvardhan patil experience',
  'rajvardhan patil projects',
  'rajvardhan patil research paper',
  'rajvardhan patil skills',
  'rajvardhan patil education',
  'rajvardhan patil resume',
  'rajvardhan patil contact',
  'gradbro',
  'buff bites cu boulder',
  'manter dating app',
  'verbnet full stack developer',
  'yolov10 smart refrigerator',
  'fastapi',
  'flutter internships',
  'llm projects',
];

export const RELATED = [
  'gradbro sop editor',
  'buff bites cu boulder',
  'verbnet and umr',
  'yolov10 smart refrigerator',
  'fastapi projects',
  'flutter internships',
  'rag and vector databases',
  'rajvardhan patil resume',
];
