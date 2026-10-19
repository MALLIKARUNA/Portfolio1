import { NextResponse } from "next/server";
import { FAQ_KNOWLEDGE_BASE, PERSONAL_INFO, PROJECTS, TECHNICAL_SKILLS } from "@/data/portfolioData";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
    }

    const query = message.toLowerCase().trim();

    // Check curated FAQ knowledge base for closest grounded match
    let bestMatch = FAQ_KNOWLEDGE_BASE.find(
      (item) =>
        query.includes(item.question.toLowerCase().replace(/[^a-z0-9 ]/g, "")) ||
        item.question.toLowerCase().split(" ").some((word) => word.length > 4 && query.includes(word))
    );

    // Contextual matching across verified portfolio data
    if (!bestMatch) {
      if (query.includes("hackathon") || query.includes("future") || query.includes("winner") || query.includes("award")) {
        bestMatch = {
          question: "Hackathon Achievement",
          answer:
            "Mallikarjun secured 1st Place as part of his team in the FUTURE U – 2-Day AI Product Building Challenge on 24–25 August 2026 at BITM, Ballari, organized in collaboration with Sophyra AI. The challenge focused on rapidly prototyping an AI-powered product to solve real-world problems under time constraints.",
        };
      } else if (query.includes("classroom") || query.includes("yolo") || query.includes("surveillance") || query.includes("ai")) {
        bestMatch = {
          question: "AI Smart Classroom System",
          answer:
            "Mallikarjun co-developed the AI-Based Smart Classroom Monitoring System using FastAPI (Python 3.11), Next.js 16, and a dual-model YOLOv8 pipeline. It tracks classroom occupancy and detects 7 student behaviors (Fighting, Sleeping, Using Phone, Reading, Writing, Hand Raising, Eating) with built-in alert cooldowns and automated evidence capture.",
        };
      } else if (query.includes("placement") || query.includes("prd") || query.includes("product") || query.includes("interview")) {
        bestMatch = {
          question: "Placement Command & Product Thinking",
          answer:
            "Mallikarjun authored the 52KB Product Requirements Document (PRD v1.2) for Placement Command, detailing 21 modules. He designed the scheduling engine with PostgreSQL btree_gist exclusion constraints to mathematically guarantee zero double-booking, paired with a simulate → propose → approve → publish recovery loop.",
        };
      } else if (query.includes("backend") || query.includes("node") || query.includes("express") || query.includes("mongo") || query.includes("postgres")) {
        bestMatch = {
          question: "Backend & Systems",
          answer:
            "Mallikarjun's backend stack includes Node.js, Express.js, and FastAPI (Python). He works with PostgreSQL (Prisma), MongoDB Atlas (Mongoose), SQLite3, and Redis. He has built REST APIs with strict HTTP status conventions and engineered memory-buffer upload pipelines with Multer and ImageKit.",
        };
      } else if (query.includes("contact") || query.includes("email") || query.includes("reach") || query.includes("connect")) {
        bestMatch = {
          question: "How to connect",
          answer: `You can reach Mallikarjun directly via email at ${PERSONAL_INFO.email}, connect on LinkedIn (${PERSONAL_INFO.socials.linkedin}), or check out his code on GitHub (${PERSONAL_INFO.socials.github}).`,
        };
      } else if (query.includes("education") || query.includes("college") || query.includes("degree") || query.includes("bitm")) {
        bestMatch = {
          question: "Education & Background",
          answer:
            "Mallikarjun is currently an engineering student pursuing his Bachelor of Engineering in Computer Science and Engineering at Ballari Institute of Technology and Management (BITM) in Ballari, Karnataka, India.",
        };
      }
    }

    if (bestMatch) {
      return NextResponse.json({
        reply: bestMatch.answer,
        grounded: true,
      });
    }

    // Default honest fallback
    return NextResponse.json({
      reply:
        "I can only answer questions verified by Mallikarjun's authentic portfolio and project documentation. You can ask about his 1st Place win at the FUTURE U AI Challenge, the AI Smart Classroom Monitoring System, Placement Command and his PRD work, his full-stack backend experience, or his engineering journey at BITM.",
      grounded: true,
      suggestedPrompts: [
        "Tell me about his 1st Place win at FUTURE U",
        "Tell me about the AI Smart Classroom project",
        "What is Placement Command and his PRD?",
        "What is his backend and database experience?",
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process chat query" },
      { status: 500 }
    );
  }
}
