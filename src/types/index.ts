// ==============================================================================
// MALLIKARJUN ALYAL — PORTFOLIO TYPE DEFINITIONS
// ==============================================================================

export type TechStatus = "demonstrated" | "practiced" | "exploring";

export interface TechItem {
  name: string;
  category: "languages" | "frontend" | "backend" | "database";
  status: TechStatus;
  description: string;
  details?: string;
  projectName?: string;
  projectLink?: string;
  keyConcepts?: string[];
}

export interface ProjectDecision {
  title: string;
  rationale: string;
}

export type ProjectCategory =
  | "AI & Systems"
  | "Full Stack"
  | "Frontend"
  | "Web Applications"
  | "Personal Websites";

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  status: string;
  role?: string;
  timeline?: string;
  featured?: boolean;
  image: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface JourneyMilestone {
  year: string;
  title: string;
  category: string;
  location?: string;
  event?: string;
  description: string;
  highlights: string[];
  acknowledgement?: string;
  isFirstPlace?: boolean;
}


export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
}
