// ==============================================================================
// MALLIKARJUN ALYAL — PORTFOLIO DATA (VERIFIED SINGLE SOURCE OF TRUTH)
// ==============================================================================

import { ProjectCaseStudy, JourneyMilestone, TechItem } from "@/types";

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
  { id: "chapter-04", number: "04", title: "Ideas Made Real", subtitle: "Selected Work" },
  { id: "chapter-07", number: "07", title: "The Open Loop", subtitle: "Let's Connect" },
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "disastra",
    slug: "disastra",
    title: "DISASTRA — Adaptive Multi-Hazard Disaster Response Platform",
    tagline: "Adaptive incident intelligence and coordination prototype with human-in-the-loop decision workflows.",
    category: "AI & Systems",
    status: "Prototype (Simulated Data)",
    featured: true,
    image: "/images/projects/disastra.png",
    description:
      "An adaptive multi-hazard response platform prototype designed to integrate official alerts, environmental data, citizen SOS reports, and responder assignments, providing human-in-the-loop coordination recommendations with simulated situational data.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Leaflet",
    ],
    githubUrl: "https://github.com/MALLIKARUNA/DISASTRA",
  },
  {
    id: "placement-command",
    slug: "placement-command",
    title: "Placement Command — Campus Placement & Interview Scheduling",
    tagline: "Centralized placement operations and conflict-free interview coordination platform.",
    category: "Full Stack",
    status: "In Development",
    featured: true,
    image: "/images/projects/placement-command.png",
    description:
      "A centralized campus recruitment management platform engineered to coordinate student eligibility criteria, company drives, interview slots, and panel allocation, featuring database-backed scheduling and conflict-detection workflows.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Zod",
    ],
    githubUrl: "https://github.com/MALLIKARUNA/Campus-interview-main--1-",
  },
  {
    id: "movieverse",
    slug: "movieverse",
    title: "MovieVerse — Movie Discovery & Browsing",
    tagline: "Responsive entertainment discovery application with categorized browsing and animated search.",
    category: "Frontend",
    status: "Frontend Project",
    featured: false,
    image: "/images/projects/movieverse.png",
    description:
      "A responsive entertainment discovery web application featuring categorized movie and show collections, animated search filtering, detail view layouts, and client-side page routing.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router 7",
    ],
    githubUrl: "https://github.com/MALLIKARUNA/Movieverse",
  },
  {
    id: "stylehub",
    slug: "stylehub",
    title: "StyleHub — Fashion E-commerce Storefront",
    tagline: "Modern fashion storefront with dynamic product showcase and interactive cart interface.",
    category: "Frontend",
    status: "Interactive Demo",
    featured: false,
    image: "/images/projects/stylehub.png",
    description:
      "A responsive fashion retail storefront featuring a curated hero showcase, categorized product catalogs (Men & Women), responsive shopping cart state management, and smooth scroll navigation.",
    techStack: [
      "React 19",
      "Tailwind CSS",
      "JavaScript",
      "React Router 7",
      "Vite",
    ],
    githubUrl: "https://github.com/MALLIKARUNA/StyleHub",
    liveUrl: "https://style-hub-seven-omega.vercel.app/",
  },
  {
    id: "note-application",
    slug: "note-application",
    title: "NOTE-APPLICATION — Local Storage Notes Manager",
    tagline: "Reactive personal notes application with persistent browser storage synchronization.",
    category: "Web Applications",
    status: "Web Application",
    featured: false,
    image: "/images/projects/note-application.png",
    description:
      "A clean, reactive productivity application enabling instant creation, viewing, and deletion of structured personal notes with persistent client-side browser localStorage synchronization.",
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "LocalStorage API",
    ],
    githubUrl: "https://github.com/MALLIKARUNA/NOTE-APPLICATION",
  },
  {
    id: "weather-app",
    slug: "weather-app",
    title: "Weather App — Real-Time Meteorological Search",
    tagline: "Lightweight city weather search application powered by the OpenWeatherMap REST API.",
    category: "Web Applications",
    status: "API Application",
    featured: false,
    image: "/images/projects/weather-app.png",
    description:
      "A lightweight meteorological search tool built with vanilla JavaScript that queries the OpenWeatherMap REST API to retrieve and display current temperature, atmospheric conditions, and city metrics.",
    techStack: [
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "OpenWeatherMap API",
      "Fetch API",
    ],
    githubUrl: "https://github.com/MALLIKARUNA/weather-app",
  },
  {
    id: "portfolio-early",
    slug: "portfolio-early",
    title: "Personal Portfolio Website — Early Foundation",
    tagline: "Foundational multi-page personal website built with semantic HTML5, CSS3, and JavaScript.",
    category: "Personal Websites",
    status: "Early Web Project",
    featured: false,
    image: "/images/projects/portfolio.png",
    description:
      "A foundational multi-page personal website crafted with semantic HTML5, CSS3 Grid/Flexbox layouts, and custom responsive styling to introduce personal bio, skills, and initial coding projects.",
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "Flexbox & Grid",
    ],
    githubUrl: "https://github.com/MALLIKARUNA/PORTFOLIO",
  },
  {
    id: "portfolio1",
    slug: "portfolio1",
    title: "Portfolio1 — Next.js Personal Portfolio Website",
    tagline: "Modern personal portfolio with Next.js App Router, modular SCSS, and WebGL cosmic canvas.",
    category: "Personal Websites",
    status: "Active Portfolio",
    featured: false,
    image: "/images/projects/portfolio1.png",
    description:
      "An evolving, modern personal portfolio website built with Next.js App Router, TypeScript, and modular SCSS, featuring dynamic chapter navigation, responsive editorial typography, and interactive WebGL background effects.",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "SCSS Modules",
      "Three.js",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/MALLIKARUNA/Portfolio1",
  },
];

export const TECHNICAL_SKILLS: TechItem[] = [
  // Programming Languages
  {
    name: "C",
    category: "languages",
    status: "practiced",
    description: "A programming language used to learn core programming concepts.",
    details: "Explored as a foundational language to learn core procedural programming, memory pointers, control structures, and computational logic.",
    projectName: "Engineering Foundations (BITM)",
    projectLink: "#chapter-01",
    keyConcepts: ["Core Programming Concepts", "Memory & Pointers", "Control Flow", "Structured Logic"],
  },
  {
    name: "C++",
    category: "languages",
    status: "practiced",
    description: "A programming language used for programming fundamentals and data structures.",
    details: "Utilized to study object-oriented principles, explore classic data structures, and practice algorithmic problem-solving.",
    projectName: "Engineering Foundations (BITM)",
    projectLink: "#chapter-01",
    keyConcepts: ["Programming Fundamentals", "Data Structures", "Object-Oriented Logic", "Problem-Solving"],
  },
  {
    name: "JavaScript",
    category: "languages",
    status: "demonstrated",
    description: "A programming language for interactive web experiences and server-side development with Node.js.",
    details: "Applied across client-side web applications for interactive user experiences and server-side backend services with Node.js.",
    projectName: "Portfolio & Web Projects",
    projectLink: "#chapter-04",
    keyConcepts: ["ES6+ Syntax", "Asynchronous Events", "DOM Manipulation", "Full-Stack Scripting"],
  },
  {
    name: "TypeScript",
    category: "languages",
    status: "demonstrated",
    description: "A typed superset of JavaScript that helps structure and validate application code.",
    details: "Enforced strict static typing, explicit domain interfaces, and typed props to ensure type safety and structured web applications.",
    projectName: "Portfolio Application",
    projectLink: "#chapter-00",
    keyConcepts: ["Static Type Safety", "Interface Contracts", "Type Validation", "Application Structure"],
  },
  {
    name: "Python",
    category: "languages",
    status: "demonstrated",
    description: "A programming language used for scripting, backend development, and suitable AI or data-related applications.",
    details: "Utilized for backend service development, automation scripting, and orchestrating machine learning model pipelines.",
    projectName: "AI Smart Classroom Monitoring System",
    projectLink: "#chapter-04",
    keyConcepts: ["Scripting & Automation", "Backend Development", "ML Pipeline Integration", "Data Handling"],
  },

  // Frontend
  {
    name: "HTML",
    category: "frontend",
    status: "demonstrated",
    description: "The markup language used to structure web content.",
    details: "Structures modern web pages using semantic HTML5 elements for accessible, clear, and standards-compliant document hierarchy.",
    projectName: "Web Foundations & Portfolio",
    projectLink: "#chapter-00",
    keyConcepts: ["Semantic Elements", "Document Structure", "Web Accessibility", "DOM Tree"],
  },
  {
    name: "CSS",
    category: "frontend",
    status: "demonstrated",
    description: "The stylesheet language used to control layout and visual presentation.",
    details: "Controls layout, spacing, visual presentation, and responsive design across desktop, tablet, and mobile displays.",
    projectName: "Web Foundations & Portfolio",
    projectLink: "#chapter-00",
    keyConcepts: ["Layout & Presentation", "Flexbox & Grid", "Responsive Design", "Visual Hierarchy"],
  },
  {
    name: "SCSS",
    category: "frontend",
    status: "demonstrated",
    description: "A CSS-compatible stylesheet syntax that adds features such as variables and nesting.",
    details: "Extends CSS with maintainable nesting, design token variables, and reusable mixins to architect scalable styling systems.",
    projectName: "Portfolio Cosmic Design System",
    projectLink: "#chapter-00",
    keyConcepts: ["CSS-Compatible Syntax", "Variables & Mixins", "Rule Nesting", "Modular Architecture"],
  },
  {
    name: "React",
    category: "frontend",
    status: "demonstrated",
    description: "A JavaScript library for building component-based user interfaces.",
    details: "Builds modular, component-based user interfaces with declarative state management, reusable UI elements, and reactive render cycles.",
    projectName: "Portfolio & AI Classroom",
    projectLink: "#chapter-04",
    keyConcepts: ["JavaScript UI Library", "Component Architecture", "State & Props", "Declarative Views"],
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    status: "demonstrated",
    description: "A JavaScript runtime that executes JavaScript outside the browser.",
    details: "Executes server-side JavaScript using an asynchronous, event-driven runtime to run backend servers and process HTTP traffic.",
    projectName: "Notes API Project",
    projectLink: "#chapter-04",
    keyConcepts: ["JavaScript Runtime", "Event-Driven I/O", "npm Ecosystem", "Server-Side Execution"],
  },
  {
    name: "Express.js",
    category: "backend",
    status: "demonstrated",
    description: "A Node.js web framework for defining routes, middleware, and HTTP request handling.",
    details: "Constructs backend web services and REST APIs with route handlers, middleware functions, and standardized HTTP responses.",
    projectName: "Notes API Project",
    projectLink: "#chapter-04",
    keyConcepts: ["Node.js Web Framework", "Route Definitions", "Middleware Pipeline", "HTTP Request Handling"],
  },

  // Databases
  {
    name: "MongoDB",
    category: "database",
    status: "demonstrated",
    description: "A document-oriented NoSQL database.",
    details: "Stores application data in flexible JSON-like BSON documents within a NoSQL document database model, providing dynamic schemas and efficient document retrieval.",
    projectName: "Notes API Project",
    projectLink: "#chapter-04",
    keyConcepts: ["NoSQL Database Concept", "Document-Oriented Storage", "Collections & BSON", "Flexible Schemas"],
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
      "You can explore his code on GitHub (https://github.com/MALLIKARUNA), connect with him on LinkedIn (https://www.linkedin.com/in/mallikarjun-alyal-5380b0349/), or reach out via email at mallikarjunalyal262@gmail.com.",
  },
];
