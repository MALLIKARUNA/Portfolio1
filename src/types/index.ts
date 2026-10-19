// ==============================================================================
// MALLIKARJUN ALYAL — PORTFOLIO TYPE DEFINITIONS
// ==============================================================================

export type TechStatus = "demonstrated" | "practiced" | "exploring";

export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "ai-system" | "tool";
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

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "AI & Computer Vision" | "Hackathon Winner" | "Product Architecture" | "Frontend & Interface" | "Systems & API";
  role: string;
  timeline: string;
  featured: boolean;
  image: string;
  previewImages?: string[];
  problem: string;
  context: string;
  myContribution: string;
  techStack: string[];
  keyDecisions: ProjectDecision[];
  challenges: string;
  outcome: string;
  whatILearned: string;
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;
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

export interface ProductThinkingStep {
  number: string;
  title: string;
  concept: string;
  practicalApplication: string;
  evidenceReference: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
}
