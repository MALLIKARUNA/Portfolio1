// ==============================================================================
// MALLIKARJUN ALYAL — PORTFOLIO DATA (VERIFIED SINGLE SOURCE OF TRUTH)
// ==============================================================================

import { ProjectCaseStudy, JourneyMilestone, ProductThinkingStep, TechItem } from "@/types";

export const PERSONAL_INFO = {
  name: "Mallikarjun Alyal",
  title: "Full Stack Developer · UI/UX Designer · Product Thinker",
  headline: "Building digital products at the intersection of technology, design, and ideas.",
  subheadline:
    "I'm an engineering student, full-stack developer, and UI/UX designer exploring how thoughtful design, backend systems, and product thinking come together to solve meaningful real-world problems.",
  tagline: "From curiosity to creation.",
  institution: "Ballari Institute of Technology and Management (BITM)",
  degree: "Bachelor of Engineering — Computer Science & Engineering",
  location: "Ballari, Karnataka, India",
  achievementSummary: "1× Hackathon Winner · FUTURE U",
  email: "mallikarjunalyal262@gmail.com",
  socials: {
    github: "https://github.com/MALLIKARUNA",
    linkedin: "https://www.linkedin.com/in/mallikarjun-alyal-5380b0349/",
    instagram: "https://www.instagram.com/mallikarjuna____03/",
  },
  statement:
    "I'm not here just to showcase what I've done. I'm here to share what I'm learning, what I'm thinking about, and what I hope to build next.",
};

export const SOCIAL_LINKS = PERSONAL_INFO.socials;

export const CHAPTERS = [
  { id: "chapter-00", number: "00", title: "The Signal", subtitle: "Introduction" },
  { id: "chapter-01", number: "01", title: "The Beginning", subtitle: "My Journey" },
  { id: "chapter-02", number: "02", title: "Learning to Build", subtitle: "Systems & Architecture" },
  { id: "chapter-03", number: "03", title: "Thinking Beyond Code", subtitle: "UI/UX & Product Thinking" },
  { id: "chapter-04", number: "04", title: "Ideas Made Real", subtitle: "Selected Work" },
  { id: "chapter-05", number: "05", title: "Moments That Mattered", subtitle: "Milestones & Achievements" },
  { id: "chapter-06", number: "06", title: "What Moves Me", subtitle: "Reflections & Philosophy" },
  { id: "chapter-07", number: "07", title: "The Open Loop", subtitle: "Let's Connect" },
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "routeforge",
    slug: "routeforge",
    title: "RouteForge",
    tagline: "AI-Based Smart Logistics & Accessibility Intelligence Platform for India's North Eastern Region (NER)",
    category: "Systems & API",
    role: "Full-Stack Developer & Architecture",
    timeline: "August 2026",
    featured: true,
    image: "/images/cosmic/01-rocket-launch.jpg",
    context:
      "Prototyped a logistics and route safety platform designed to explore the mission-critical question: 'Which route is currently safest and most practical for moving essential supplies in difficult terrain?'",
    problem:
      "The North Eastern Region (NER) of India suffers from extreme terrain, seasonal monsoons, landslides, and unpredictable infrastructure failures. Supply convoys face hazardous conditions without unified, real-time risk assessment or offline communication support.",
    myContribution:
      "Led the core platform architecture and full-stack implementation: built the GIS routing integration using Leaflet and OpenRouteService, structured the multi-criteria risk engine, integrated OpenWeatherMap alerts, and engineered the offline incident queue with Dexie.js (IndexedDB).",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Leaflet GIS",
      "OpenRouteService",
      "OpenWeatherMap",
      "Zustand",
      "Dexie.js (IndexedDB)",
      "Docker Compose",
    ],
    keyDecisions: [
      {
        title: "Deterministic Risk Engine over Black-Box AI",
        rationale:
          "For relief convoy safety, route scores must be transparent and explainable. The engine computes weighted risk scores (weather severity + road grade + historical landslides + report freshness) with clear human approval checkpoints before route recalculation.",
      },
      {
        title: "Offline-First Incident Queue with IndexedDB",
        rationale:
          "Because cellular connectivity vanishes in remote mountain passes, field drivers can log road closures and attach geotagged photos offline. Entries are synced automatically via a background queue upon signal restoration.",
      },
      {
        title: "Multi-Criteria Route Evaluation",
        rationale:
          "Instead of merely calculating the shortest distance, RouteForge compares primary, secondary, and emergency relief corridors across elevation variance, weather hazard exposure, and transit stability.",
      },
    ],
    challenges:
      "Balancing heavy spatial calculations on low-bandwidth field devices without lag. Overcame this by performing heavy routing calculations server-side and caching vector tiles and incident markers locally on the client.",
    outcome:
      "Engineered an end-to-end prototype demonstrating multi-route comparison, simulated landslide blockage, real-time rerouting, and coordinator dispatch workflow.",
    whatILearned:
      "Real-world engineering demands fault tolerance: offline resilience, transparent algorithmic decisions, and prioritizing user safety above aesthetic gimmicks.",
    githubUrl: "https://github.com/MALLIKARUNA",
    stats: [
      { label: "Focus", value: "GIS & Routing" },
      { label: "Stack", value: "Full-Stack TS" },
      { label: "Status", value: "Prototype Complete" },
    ],
  },
  {
    id: "ai-smart-classroom",
    slug: "ai-smart-classroom",
    title: "AI Smart Classroom Monitoring System",
    tagline: "Autonomous Surveillance, Behavioral Intelligence & Multi-Classroom Command Center",
    category: "AI & Computer Vision",
    role: "Full-Stack Developer (FastAPI + Next.js UI + Pipeline)",
    timeline: "October 2026",
    featured: true,
    image: "/images/projects/smart-classroom.png",
    previewImages: [
      "/images/projects/smart-classroom.png",
      "/images/projects/classroom-session.png",
      "/images/projects/active-alerts.png",
    ],
    context:
      "Academic blocks and computer laboratories face challenges monitoring student safety, exam integrity, and engagement across multiple classrooms simultaneously.",
    problem:
      "Passive CCTV footage only records incidents without preventing escalation. Security and faculty cannot manually watch dozens of video feeds simultaneously to catch emergencies like physical altercations or severe disengagement.",
    myContribution:
      "Co-developed the unified dual-model YOLOv8 pipeline, FastAPI backend services, low-latency live MJPEG stream handler, custom SVG telemetry charts, automated screenshot retention with 60-day purge policy, and ReportLab server-side PDF generator.",
    techStack: [
      "FastAPI (Python 3.11)",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "YOLOv8 (Ultralytics)",
      "PyTorch",
      "OpenCV",
      "SQLite3",
      "ReportLab PDF",
      "SCSS Modules",
    ],
    keyDecisions: [
      {
        title: "Dual-Model YOLO Pipeline",
        rationale:
          "Separated general object detection (COCO model for laptops, phones, chairs) from student behavioral classification (custom fine-tuned model for 7 behaviors: Fighting, Sleeping, Using Phone, Reading, Writing, Hand Raising, and Eating) to optimize inference speed and accuracy.",
      },
      {
        title: "10-Minute Alert Flooding Protection",
        rationale:
          "To avoid alert fatigue for room supervisors, built an automatic 600-second cooldown per classroom and alert type, consolidating ongoing events into one incident session rather than spamming continuous popups.",
      },
      {
        title: "Priority Fighting Emergency Modal",
        rationale:
          "Designed an instant full-screen alert overlay with automated evidence snapshot and audible alarm whenever physical altercation confidence exceeds the threshold.",
      },
    ],
    challenges:
      "Maintaining high-FPS live video streaming with simultaneous inference bounding boxes over HTTP. Solved by decoupling frame grabbing from model prediction threads using an asynchronous queue.",
    outcome:
      "Working end-to-end command center running with live multi-camera onboarding, dynamic occupancy counting, interactive engagement charts, and executive PDF report export.",
    whatILearned:
      "Computer vision engineering is only as useful as the human interface consuming it. Reducing false alarms and providing clean incident evidence is crucial for operational trust.",
    githubUrl: "https://github.com/MALLIKARUNA",
    stats: [
      { label: "Behaviors Tracked", value: "7 Classes" },
      { label: "Cooldown", value: "600s Anti-Fatigue" },
      { label: "Pipeline", value: "Dual YOLOv8" },
    ],
  },
  {
    id: "placement-command",
    slug: "placement-command",
    title: "Placement Command",
    tagline: "Intelligent Campus Placement & Conflict-Free Interview Scheduling Platform",
    category: "Product Architecture",
    role: "Product Specification Author & Backend Architect",
    timeline: "October 2026",
    featured: true,
    image: "/images/projects/placement-command.png",
    previewImages: [
      "/images/projects/placement-command.png",
    ],
    context:
      "Campus placement drives involve hundreds of students, dozens of recruiting companies, limited interview cabins, and shifting panel availability. Manual spreadsheets inevitably cause room conflicts and delayed schedules.",
    problem:
      "Coordinating interviews across competing student schedules, interviewer delays, and room constraints leads to chaotic delays, missed opportunities, and communication breakdowns.",
    myContribution:
      "Authored the exhaustive 52KB / 105KB Product Requirements Document (PRD v1.2) detailing 21 functional modules, database constraints, business rules, and state machines. Implemented the core scheduling and allocation algorithms.",
    techStack: [
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Supabase Realtime",
      "Kysely",
      "Zod",
      "Vitest",
      "React",
      "Vite",
    ],
    keyDecisions: [
      {
        title: "PostgreSQL btree_gist Exclusion Constraints",
        rationale:
          "Guaranteed 100% collision-free scheduling at the database level using PostgreSQL exclusion constraints over half-open timestamp intervals (`tstzrange`), preventing overlapping appointments for students, panel members, and rooms regardless of concurrency.",
      },
      {
        title: "Simulate → Propose → Approve → Publish Recovery Loop",
        rationale:
          "When an interviewer is delayed or absent, the system does not silently rearrange appointments. It runs a deterministic simulation, generates ranked recovery options with delay propagation metrics, and requires explicit coordinator approval before updating published schedules.",
      },
      {
        title: "Decoupled Eligibility from Allocation",
        rationale:
          "Separated eligibility checking (rule-based evaluation of CGPA, backlogs, branch) from slot allocation, ensuring that student qualifications remain verifiable and auditable independently of interview capacity.",
      },
    ],
    challenges:
      "Designing complex interval overlap queries that remain fast under high concurrency during mass recruitment drives. Solved using specialized GiST indexes.",
    outcome:
      "Complete implementation-ready specification with formal module contracts (M01 to M20), deterministic allocation engines, and conflict recovery workflows.",
    whatILearned:
      "Rigorous software engineering begins with deep problem framing and strict architectural contracts before writing code. Enforcing constraints in the database prevents catastrophic bugs in the UI.",
    githubUrl: "https://github.com/MALLIKARUNA",
    stats: [
      { label: "PRD Spec", value: "52KB / 21 Modules" },
      { label: "Conflict Guarantee", value: "btree_gist GiST" },
      { label: "Status", value: "Core Architecture" },
    ],
  },
  {
    id: "movieverse",
    slug: "movieverse",
    title: "MovieVerse",
    tagline: "Dynamic Cinema Discovery & Interactive Media Explorer",
    category: "Frontend & Interface",
    role: "Frontend Developer & UI Designer",
    timeline: "2026",
    featured: false,
    image: "/images/cosmic/02-portal-ring.jpg",
    context:
      "A personal project exploring modern client-side routing, responsive component hierarchies, and interactive media browsing.",
    problem:
      "Creating a smooth, responsive film discovery application that handles asynchronous API pagination, dynamic category filtering, and modal detail views without layout shifts.",
    myContribution:
      "Designed and coded the responsive interface, implemented TMDB REST API integrations, configured client-side routing with React Router, and crafted custom search and filter states.",
    techStack: [
      "React",
      "TypeScript",
      "React Router",
      "REST APIs (TMDB)",
      "SCSS Modules",
      "CSS Grid & Flexbox",
    ],
    keyDecisions: [
      {
        title: "Component Reusability",
        rationale:
          "Architected atomic card and modal components that handle image loading fallbacks and responsive metadata cleanly across mobile and desktop viewports.",
      },
      {
        title: "Debounced Search Experience",
        rationale:
          "Implemented custom debounced input hooks to reduce unnecessary external API calls while providing instant UI feedback.",
      },
    ],
    challenges:
      "Managing asynchronous image load times from external CDNs. Handled with custom skeleton states and smooth fade-in transitions.",
    outcome:
      "Clean, responsive, interactive movie discovery application demonstrating solid React fundamentals and modern TypeScript patterns.",
    whatILearned:
      "The value of fluid interface states, graceful loading skeletons, and thoughtful error handling when working with external third-party APIs.",
    githubUrl: "https://github.com/MALLIKARUNA",
    stats: [
      { label: "Type", value: "Web App" },
      { label: "Language", value: "TypeScript" },
    ],
  },
  {
    id: "backend-storage-pipeline",
    slug: "backend-storage-pipeline",
    title: "Notes API & Cloud Storage Service",
    tagline: "Exploration of HTTP Request Lifecycles, Multer RAM Buffers & Cloud Storage Integrations",
    category: "Systems & API",
    role: "Backend Developer (Learning & Architecture)",
    timeline: "September – October 2026",
    featured: false,
    image: "/images/cosmic/03-light-ribbons.jpg",
    context:
      "A series of deep backend experiments focused on mastering the Node.js runtime, Express middleware pipelines, RESTful status contracts, MongoDB Atlas document modeling, and multipart file upload flows.",
    problem:
      "Understanding how files actually travel from a client request through the server to cloud storage without causing disk bloat or server memory leaks.",
    myContribution:
      "Built custom Express.js middleware, designed MongoDB schemas with Mongoose, and engineered a memory-buffer upload pipeline with Multer (`memoryStorage`) that forwards binary streams to ImageKit cloud storage and saves the returned media URL in the database.",
    techStack: [
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Mongoose",
      "Multer (memoryStorage)",
      "ImageKit SDK",
      "Postman",
    ],
    keyDecisions: [
      {
        title: "RAM Buffer over Disk Storage",
        rationale:
          "Configured Multer with `memoryStorage()` to keep uploaded files in RAM as temporary buffers before direct cloud dispatch, avoiding disk cleanup overhead on stateless servers.",
      },
      {
        title: "Strict REST Status Code Conventions",
        rationale:
          "Maintained explicit HTTP status discipline (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error) across all CRUD endpoints.",
      },
    ],
    challenges:
      "Debugging buffer streaming issues between Multer multipart parsing and ImageKit upload authentication headers. Resolved by inspecting raw request payloads and standardizing error response schemas.",
    outcome:
      "Solid, verified grasp of the complete request lifecycle: Client → Multer → req.file.buffer → Storage Service → Cloud CDN → MongoDB URL persistence.",
    whatILearned:
      "Backend reliability comes from understanding buffers, streams, asynchronous lifecycle management, and clear protocol semantics.",
    githubUrl: "https://github.com/MALLIKARUNA",
    stats: [
      { label: "Focus", value: "HTTP & Buffers" },
      { label: "Database", value: "MongoDB Atlas" },
    ],
  },
];

export const TECHNICAL_SKILLS: TechItem[] = [
  // Frontend
  {
    name: "React & Next.js (App Router)",
    category: "frontend",
    status: "demonstrated",
    description: "Production components, server/client boundaries, dynamic routing",
    details: "Architected dynamic interfaces with Next.js App Router, combining client-side interactivity and server-rendered data loading.",
    projectName: "AI Smart Classroom Frontend",
    projectLink: "#chapter-04",
    keyConcepts: ["App Router Architecture", "Server/Client Boundaries", "State Hydration"],
  },
  {
    name: "TypeScript",
    category: "frontend",
    status: "demonstrated",
    description: "Strict domain typing, generics, interface contracts",
    details: "Enforced strict static typing, explicit API response interfaces, and generic utility types across frontend code and architectural specifications.",
    projectName: "Placement Command PRD",
    projectLink: "#chapter-04",
    keyConcepts: ["Strict Type Contracts", "Interface Modeling", "Compile-Time Safety"],
  },
  {
    name: "SCSS & CSS Modules",
    category: "frontend",
    status: "demonstrated",
    description: "Responsive token systems, mixins, fluid typography",
    details: "Built scoped component styling systems with CSS Custom Properties, mathematical spacing scales, and fluid typography tokens.",
    projectName: "Portfolio Cosmic Design System",
    projectLink: "#chapter-00",
    keyConcepts: ["Scoped CSS Modules", "Design Tokens & Mixins", "Responsive Fluid Layouts"],
  },
  {
    name: "Three.js / WebGL",
    category: "frontend",
    status: "practiced",
    description: "Particle scenes, procedural shaders, camera interactions",
    details: "Explored GPU-accelerated canvas animations, mathematical particle distributions, and camera interactions for visual atmosphere.",
    projectName: "Hero Cosmic Background",
    projectLink: "#chapter-00",
    keyConcepts: ["Particle Buffers", "Procedural Motion", "Shader Render Loop"],
  },
  {
    name: "Zustand & TanStack Query",
    category: "frontend",
    status: "demonstrated",
    description: "Client state management and server-state caching",
    details: "Managed asynchronous server state and atomic client UI state, preventing redundant network requests and decoupling state from views.",
    projectName: "AI Smart Classroom & RouteForge",
    projectLink: "#chapter-04",
    keyConcepts: ["Atomic State Stores", "Cache Invalidation", "Decoupled Data Fetching"],
  },

  // Backend
  {
    name: "Node.js & Express.js",
    category: "backend",
    status: "demonstrated",
    description: "REST APIs, middleware, HTTP status conventions",
    details: "Constructed RESTful HTTP APIs with explicit status codes, route controllers, and reusable middleware chains for request processing.",
    projectName: "Notes API Learning Project",
    projectLink: "#chapter-04",
    keyConcepts: ["HTTP Route Handlers", "Middleware Lifecycles", "REST Status Standards"],
  },
  {
    name: "FastAPI (Python)",
    category: "backend",
    status: "demonstrated",
    description: "Asynchronous backend endpoints, camera streaming, ML pipeline orchestration",
    details: "Implemented asynchronous Python endpoints for handling live MJPEG camera streams and orchestrating computer vision model inference.",
    projectName: "AI Smart Classroom Backend",
    projectLink: "#chapter-04",
    keyConcepts: ["Asynchronous Routing", "Pydantic Schemas", "Live MJPEG Streaming"],
  },
  {
    name: "Fastify",
    category: "backend",
    status: "practiced",
    description: "High-performance schema-based routing, Zod validation",
    details: "Explored schema-first routing, high-throughput JSON serialization, and low-overhead request parsing for high-concurrency systems.",
    projectName: "Placement Command Architecture",
    projectLink: "#chapter-04",
    keyConcepts: ["JSON Schema Validation", "Low-Overhead Routing", "Plugin Architecture"],
  },
  {
    name: "JWT & RBAC Middleware",
    category: "backend",
    status: "demonstrated",
    description: "Role-based access control, token authentication",
    details: "Implemented authentication checks, authorization guards, and role-based permissions to protect administrative endpoints.",
    projectName: "Backend Exploration",
    projectLink: "#chapter-04",
    keyConcepts: ["Bearer Token Verification", "Role Permission Guards", "Route Authorization"],
  },
  {
    name: "Multer & Cloud Storage",
    category: "backend",
    status: "demonstrated",
    description: "Memory buffer streaming to ImageKit & cloud CDNs",
    details: "Engineered an in-memory buffer upload pipeline using Multer memoryStorage(), streaming binary data to ImageKit cloud CDN without disk bloat.",
    projectName: "Notes API Cloud Storage Service",
    projectLink: "#chapter-04",
    keyConcepts: ["RAM Buffer Streaming", "Multipart Request Parsing", "Cloud CDN Persistence"],
  },

  // Database & Queues
  {
    name: "PostgreSQL & Prisma",
    category: "database",
    status: "demonstrated",
    description: "Relational data modeling, exclusion constraints, migrations",
    details: "Modeled relational data tables, foreign keys, migrations, and database-level collision prevention constraints using exclusion logic.",
    projectName: "Placement Command PRD",
    projectLink: "#chapter-04",
    keyConcepts: ["Relational Data Integrity", "Prisma Migrations", "btree_gist Exclusion Constraints"],
  },
  {
    name: "MongoDB & Mongoose",
    category: "database",
    status: "demonstrated",
    description: "Document schemas, Atlas clusters, CRUD pipelines",
    details: "Designed document schemas with typed validation, indexing, and asynchronous CRUD operations for flexible JSON document storage.",
    projectName: "Notes API Learning Project",
    projectLink: "#chapter-04",
    keyConcepts: ["Document Schema Modeling", "CRUD Operations", "Connection Pooling"],
  },
  {
    name: "SQLite3",
    category: "database",
    status: "demonstrated",
    description: "Embedded database for real-time edge classroom analytics",
    details: "Utilized embedded relational storage for real-time edge classroom attendance logs and local analytical query execution.",
    projectName: "AI Smart Classroom Monitoring System",
    projectLink: "#chapter-04",
    keyConcepts: ["Embedded Database", "Zero-Configuration Storage", "Edge Query Performance"],
  },
  {
    name: "Redis & BullMQ",
    category: "database",
    status: "practiced",
    description: "Asynchronous job queues and event dispatching",
    details: "Studied in-memory message brokers and background worker queues to decouple time-consuming tasks from the HTTP response loop.",
    projectName: "Backend Queue Exploration",
    projectLink: "#chapter-04",
    keyConcepts: ["Job Queues & Workers", "Event Dispatching", "In-Memory Caching"],
  },
  {
    name: "Dexie.js (IndexedDB)",
    category: "database",
    status: "demonstrated",
    description: "Structured client-side offline storage queue",
    details: "Implemented client-side browser database storage to queue offline incident reports and sync automatically when internet connectivity returns.",
    projectName: "RouteForge Offline Queue",
    projectLink: "#chapter-04",
    keyConcepts: ["Client IndexedDB", "Offline-First Sync", "Schema Versioning"],
  },

  // AI & Systems
  {
    name: "YOLOv8 & PyTorch",
    category: "ai-system",
    status: "demonstrated",
    description: "Object detection, student behavior classification, model inference",
    details: "Configured dual computer vision models for object detection and fine-tuned student behavioral classification across 7 real-time behaviors.",
    projectName: "AI Smart Classroom Monitoring System",
    projectLink: "#chapter-04",
    keyConcepts: ["Model Inference Pipeline", "Multi-Class Behavior Detection", "Bounding Box Extraction"],
  },
  {
    name: "Leaflet GIS & ORS",
    category: "ai-system",
    status: "demonstrated",
    description: "Geospatial mapping, hazard layer rendering, route calculation",
    details: "Integrated interactive geospatial mapping, polyline route calculation, and environmental hazard layer overlays using OpenRouteService.",
    projectName: "RouteForge GIS Mapping",
    projectLink: "#chapter-04",
    keyConcepts: ["Geospatial Coordinates", "Polyline Rendering", "Interactive Map Layers"],
  },
  {
    name: "OpenCV",
    category: "ai-system",
    status: "demonstrated",
    description: "Real-time frame extraction, MJPEG streaming, annotation overlays",
    details: "Handled camera video capture, extracted video frames, rendered visual bounding boxes, and converted frames into HTTP streaming formats.",
    projectName: "AI Smart Classroom Video Pipeline",
    projectLink: "#chapter-04",
    keyConcepts: ["Frame Extraction", "Bounding Box Annotations", "MJPEG Video Encoding"],
  },
  {
    name: "Docker Compose",
    category: "tool",
    status: "practiced",
    description: "Multi-container application orchestration",
    details: "Defined multi-service container configurations to run frontend, backend, and database dependencies in isolated environments.",
    projectName: "Multi-Container Services",
    projectLink: "https://github.com/MALLIKARUNA",
    keyConcepts: ["Multi-Container Definition", "Network Isolation", "Local Reproducibility"],
  },
  {
    name: "Git & GitHub",
    category: "tool",
    status: "demonstrated",
    description: "Version control, collaborative workflows, issue tracking",
    details: "Maintained clean version control, semantic commit hygiene, feature branching, and documented repositories for open-source review.",
    projectName: "Personal GitHub Repositories",
    projectLink: "https://github.com/MALLIKARUNA",
    keyConcepts: ["Version Control", "Semantic Commit Hygiene", "Issue & Branch Tracking"],
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    year: "2024",
    title: "The Spark of Curiosity",
    category: "ENGINEERING FOUNDATIONS",
    location: "BITM, Ballari",
    description:
      "My engineering journey began at Ballari Institute of Technology and Management (BITM), Ballari. I started building my understanding of computer science through programming fundamentals, problem-solving, and the technologies that bring digital experiences to life.",
    highlights: [
      "Learning programming fundamentals through C and C++",
      "Exploring data structures and algorithms",
      "Beginning to understand web development through HTML, CSS, and JavaScript",
    ],
  },
  {
    year: "Early 2026",
    title: "Exploring Backend Development",
    category: "BACKEND & FULL-STACK LEARNING",
    location: "Ballari, India",
    description:
      "My interest in building complete applications led me to backend development. I began exploring how HTTP requests, REST APIs, server-side logic, middleware, and databases work together to power real applications.",
    highlights: [
      "Node.js and Express.js REST API endpoints and HTTP methods",
      "Database modeling with MongoDB and Mongoose through a Notes API learning project",
      "Exploring request parameters, body parsing, middleware, and Multer file upload integrations",
    ],
  },
  {
    year: "24–25 August 2026",
    title: "1st Place — FUTURE U",
    category: "AI PRODUCT BUILDING · FIRST-PLACE ACHIEVEMENT",
    event: "FUTURE U – 2-Day AI Product Building Challenge",
    location: "Ballari Institute of Technology and Management (BITM), Ballari, Karnataka, India",
    description:
      "Our team secured 1st place in the FUTURE U – 2-Day AI Product Building Challenge, held on 24 and 25 August 2026 at BITM, Ballari. The challenge gave us an opportunity to turn an idea into an AI-powered product under time constraints, collaborate with teammates, and explore ways to use technology to address real-world problems.",
    acknowledgement: "BITM, Sophyra AI, the organizers, mentors, and teammates.",
    isFirstPlace: true,
    highlights: [
      "1st Place team achievement among participating student engineering teams",
      "Rapid AI-powered product prototyping and collaborative problem solving under time constraints",
    ],
  },
  {
    year: "October 2026",
    title: "Exploring AI Systems and Product Design",
    category: "AI APPLICATIONS · FULL-STACK DEVELOPMENT",
    location: "BITM, Ballari",
    description:
      "I have been working on an AI Smart Classroom Monitoring System that combines a Python backend, a Next.js frontend, classroom analytics, and live data connections. The project has helped me explore how multiple application components come together to support a real-world use case.",
    highlights: [
      "Running, testing, and integrating Python backend and Next.js frontend services",
      "Exploring classroom analytics, occupancy data, and live connection architecture",
      "Connecting system requirements and user experience through practical implementation",
    ],
  },
];

export const PRODUCT_THINKING_PILLARS: ProductThinkingStep[] = [
  {
    number: "01",
    title: "Understanding the Real Human Problem",
    concept:
      "A product should never exist merely because a technology is trendy. It exists because someone experiences friction, delay, or confusion.",
    practicalApplication:
      "When designing emergency or relief logistics interfaces, operators do not just need raw maps; they need situational awareness under unpredictable conditions and offline resilience when network connectivity drops.",
    evidenceReference: "Logistics & Offline Sync Architecture",
  },
  {
    number: "02",
    title: "Structuring User Journeys Before Writing Code",
    concept:
      "Designing interface flows and information hierarchy creates clarity that saves hundreds of hours of rewriting code later.",
    practicalApplication:
      "In Placement Command, we mapped the differing needs of the Placement Coordinator, Interview Panelist, and Student Applicant before designing a single database schema or writing a route.",
    evidenceReference: "Placement Command Backend PRD v1.2",
  },
  {
    number: "03",
    title: "Deterministic Guarantees Over Black Boxes",
    concept:
      "When business correctness or user safety is at stake, critical rules must be enforced deterministically by the database and core algorithms, not left to chance.",
    practicalApplication:
      "Enforced interview room and panel conflict-prevention via PostgreSQL `btree_gist` exclusion constraints over half-open timestamp ranges, guaranteeing that double-booking is mathematically impossible.",
    evidenceReference: "Placement Command Scheduling Engine",
  },
  {
    number: "04",
    title: "Operator Empathy & Alert Fatigue Protection",
    concept:
      "A system that constantly shouts is just as useless as a system that says nothing. Cognitive load must be actively managed.",
    practicalApplication:
      "In the AI Smart Classroom Monitoring System, we implemented a 10-minute (600-second) cooldown on notification popups per classroom, consolidating continuous behavior into ongoing incidents so supervisors aren't overwhelmed.",
    evidenceReference: "AI Smart Classroom System Architecture",
  },
];

export const FAQ_KNOWLEDGE_BASE = [
  {
    question: "Who is Mallikarjun Alyal?",
    answer:
      "Mallikarjun Alyal is an engineering student at Ballari Institute of Technology and Management (BITM), full-stack developer, and UI/UX designer. He is interested in the complete product journey—from identifying problems and thinking through user experience to designing interfaces, architecting backend systems, and exploring computer vision.",
  },
  {
    question: "What hackathon achievement does Mallikarjun have?",
    answer:
      "Mallikarjun secured 1st Place as part of his team in the FUTURE U – 2-Day AI Product Building Challenge on 24–25 August 2026 at BITM, Ballari, organized in collaboration with Sophyra AI. The challenge gave our team an opportunity to turn an idea into an AI-powered product under time constraints and collaborate to solve real-world problems.",
  },
  {
    question: "What is the AI Smart Classroom Monitoring System?",
    answer:
      "It is an autonomous surveillance and behavioral intelligence platform Mallikarjun co-developed using FastAPI (Python 3.11), Next.js 16, and a dual-model YOLOv8 pipeline. It tracks classroom occupancy and detects 7 student behaviors in real time (Fighting, Sleeping, Using Phone, Reading, Writing, Hand Raising, Eating) with built-in alert cooldowns and automated evidence capture.",
  },
  {
    question: "What is his backend and database experience?",
    answer:
      "Mallikarjun has hands-on experience building backend systems with Node.js, Express.js, and FastAPI. He works with PostgreSQL (Prisma ORM, btree_gist exclusion constraints), MongoDB Atlas (Mongoose), SQLite3, and Redis/BullMQ. He has also authored detailed Product Requirements Documents (PRDs) and engineered buffer-based cloud file upload pipelines using Multer and ImageKit.",
  },
  {
    question: "What are his UI/UX design and product thinking interests?",
    answer:
      "Mallikarjun believes products succeed through human understanding, not code alone. He focuses on problem definition, user journey mapping, information hierarchy, and balancing technical constraints with user experience. He demonstrated this by authoring the 52KB PRD for Placement Command and designing anti-fatigue alert systems for computer vision surveillance.",
  },
  {
    question: "Is Mallikarjun open to work or job inquiries?",
    answer:
      "Mallikarjun created this portfolio as a living record of his learning journey, ideas, and projects. His purpose is to establish his identity, share what he's exploring, and connect with people who enjoy thinking, building, and creating meaningful products. He welcomes thoughtful conversations, knowledge exchange, and collaboration.",
  },
  {
    question: "Where can I find his source code and profiles?",
    answer:
      "You can explore his code on GitHub (https://github.com/MALLIKARUNA), connect with him on LinkedIn (https://www.linkedin.com/in/mallikarjun-alyal-5380b0349/), or reach out via email at mallikarjunalyal03@gmail.com.",
  },
];
