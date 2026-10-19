"use client";

import React, { useState, useEffect } from "react";
import styles from "./Chapter02Build.module.scss";
import { TECHNICAL_SKILLS } from "@/data/portfolioData";
import { TechItem } from "@/types";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Server,
  Database,
  Cpu,
  Terminal,
  ArrowRight,
  Code2,
  Copy,
  Check,
  RotateCcw,
  X,
  ExternalLink,
} from "lucide-react";

interface ArchitectureStep {
  id: string;
  stepNumber: string;
  label: string;
  subtitle: string;
  fileLabel: string;
  roleDescription: string;
  codeSnippet: string;
}

const ARCHITECTURE_STEPS: ArchitectureStep[] = [
  {
    id: "client",
    stepNumber: "01",
    label: "Client",
    subtitle: "HTTP Request",
    fileLabel: "client/api.js",
    roleDescription:
      "The client application (frontend UI or API tester) prepares and dispatches an asynchronous HTTP request. It sets standard headers including Content-Type: application/json and serializes the note payload into the request body.",
    codeSnippet: `// 1. Client dispatches an HTTP POST request with JSON payload
const response = await fetch('http://localhost:5000/api/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Architecture Review',
    content: 'Exploring the Node.js & Express request lifecycle.'
  })
});

const result = await response.json();`,
  },
  {
    id: "route",
    stepNumber: "02",
    label: "Express Route",
    subtitle: "Routing & Method",
    fileLabel: "routes/notes.js",
    roleDescription:
      "The Express.js router parses incoming traffic, matches the HTTP verb (POST) and URL pattern (/api/notes), and delegates execution to the configured middleware pipeline and controller handler.",
    codeSnippet: `// 2. Express router matches POST /api/notes and attaches pipeline
const express = require('express');
const router = express.Router();
const { createNote } = require('../controllers/notesController');
const { validateNoteBody } = require('../middleware/validation');

// Attach validation middleware before controller handler
router.post('/api/notes', validateNoteBody, createNote);

module.exports = router;`,
  },
  {
    id: "middleware",
    stepNumber: "03",
    label: "Middleware",
    subtitle: "Validation & Guards",
    fileLabel: "middleware/validation.js",
    roleDescription:
      "Middleware intercepts req and res before business logic runs. In the Notes API, input validation verifies that mandatory fields (such as note title) exist, rejecting invalid payloads early with a 400 Bad Request status.",
    codeSnippet: `// 3. Validation middleware inspecting request parameters & body
const validateNoteBody = (req, res, next) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Note title is required.'
    });
  }

  // Request validated — pass control to controller handler
  next();
};

module.exports = { validateNoteBody };`,
  },
  {
    id: "database",
    stepNumber: "04",
    label: "Mongoose / MongoDB",
    subtitle: "Schema Persistence",
    fileLabel: "controllers/notesController.js",
    roleDescription:
      "The controller interacts with MongoDB Atlas through the Mongoose model schema. It performs asynchronous document insertion and handles database connection errors gracefully.",
    codeSnippet: `// 4. Controller creates and saves document via Mongoose model
const Note = require('../models/Note');

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Asynchronously insert document into MongoDB collection
    const note = await Note.create({
      title: title.trim(),
      content: content ? content.trim() : '',
      createdAt: new Date()
    });

    return sendResponse(res, 201, note);
  } catch (err) {
    return res.status(500).json({ error: 'Database save failed' });
  }
};`,
  },
  {
    id: "response",
    stepNumber: "05",
    label: "JSON Response",
    subtitle: "HTTP 201 Created",
    fileLabel: "utils/responseHandler.js",
    roleDescription:
      "Express sets the standardized HTTP status code (201 Created for new resources) and serializes the structured JSON payload back to the client, concluding the request lifecycle cleanly.",
    codeSnippet: `// 5. Explicit HTTP status code and structured JSON response
const sendResponse = (res, statusCode, note) => {
  return res.status(statusCode).json({
    success: true,
    data: {
      id: note._id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt
    }
  });
};

module.exports = { sendResponse };`,
  },
];

export function Chapter02Build() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<TechItem | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const categories = [
    { id: "all", label: "All Architecture", icon: <Layers size={14} /> },
    { id: "frontend", label: "Frontend & UI", icon: <Layers size={14} /> },
    { id: "backend", label: "Backend & Systems", icon: <Server size={14} /> },
    { id: "database", label: "Data & Storage", icon: <Database size={14} /> },
    { id: "ai-system", label: "AI & Spatial", icon: <Cpu size={14} /> },
    { id: "tool", label: "Tools & DevOps", icon: <Terminal size={14} /> },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? TECHNICAL_SKILLS
      : TECHNICAL_SKILLS.filter((s) => s.category === activeCategory);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedSkill) {
        setSelectedSkill(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSkill]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedSkill) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSkill]);

  // Copy code helper
  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Graceful clipboard fallback
    }
  };

  return (
    <section id="chapter-02" className={styles.buildSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>Chapter 02 · Learning to Build</span>
        </div>

        <h2 className="section-title">Systems, Logic & Architecture</h2>
        <p className="section-lead">
          I don&apos;t collect technology logos. I build mental models of how software systems communicate,
          how data flows across boundaries, and how architectural decisions determine reliability.
        </p>

        {/* Category Filters */}
        <div className={styles.categoryTabs} role="tablist" aria-label="Technology categories">
          {categories.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.tabBtn} ${isActive ? styles.activeTab : ""}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid with Animated Transitions */}
        <motion.div layout className={styles.skillsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className={styles.skillCard}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-expanded={selectedSkill?.name === skill.name}
                onClick={() => setSelectedSkill(skill)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedSkill(skill);
                  }
                }}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.skillName}>{skill.name}</h3>
                    <span
                      className={`${styles.statusBadge} ${
                        skill.status === "demonstrated"
                          ? styles.demonstrated
                          : skill.status === "practiced"
                          ? styles.practiced
                          : styles.exploring
                      }`}
                    >
                      {skill.status}
                    </span>
                  </div>
                  <p className={styles.skillDesc}>{skill.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.cardActionCue}>
                    <span>Architecture Role</span>
                    <ArrowRight size={13} className={styles.actionArrow} />
                  </span>
                  {skill.projectName && (
                    <span
                      className={styles.projectContextTag}
                      title={`Verified context: ${skill.projectName}`}
                    >
                      {skill.projectName.split(" ")[0]}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Accessible Technology Detail Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className={styles.modalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="skill-modal-title"
                className={styles.modalCard}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <div className={styles.modalBadges}>
                    <span className={styles.categoryBadge}>{selectedSkill.category}</span>
                    <span
                      className={`${styles.statusBadge} ${
                        selectedSkill.status === "demonstrated"
                          ? styles.demonstrated
                          : selectedSkill.status === "practiced"
                          ? styles.practiced
                          : styles.exploring
                      }`}
                    >
                      {selectedSkill.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={() => setSelectedSkill(null)}
                    aria-label="Close details"
                  >
                    <X size={18} />
                  </button>
                </div>

                <h3 id="skill-modal-title" className={styles.modalTitle}>
                  {selectedSkill.name}
                </h3>
                <p className={styles.modalLead}>{selectedSkill.description}</p>

                <div className={styles.modalSection}>
                  <h4 className={styles.sectionSubtitle}>Engineering Application & Role</h4>
                  <p className={styles.modalDetails}>
                    {selectedSkill.details || selectedSkill.description}
                  </p>
                </div>

                {selectedSkill.keyConcepts && selectedSkill.keyConcepts.length > 0 && (
                  <div className={styles.modalSection}>
                    <h4 className={styles.sectionSubtitle}>Core Concepts & Patterns</h4>
                    <div className={styles.conceptsList}>
                      {selectedSkill.keyConcepts.map((concept) => (
                        <span key={concept} className={styles.conceptTag}>
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSkill.projectName && (
                  <div className={styles.modalSection}>
                    <h4 className={styles.sectionSubtitle}>Verified Project Context</h4>
                    <div className={styles.projectLinkBox}>
                      <div className={styles.projectMeta}>
                        <span className={styles.projectMetaLabel}>Project Implementation:</span>
                        <span className={styles.projectMetaName}>{selectedSkill.projectName}</span>
                      </div>
                      {selectedSkill.projectLink && (
                        <a
                          href={selectedSkill.projectLink}
                          className={styles.projectNavBtn}
                          onClick={() => setSelectedSkill(null)}
                        >
                          <span>Explore in Portfolio</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className={styles.statusLegend}>
                  <span className={styles.legendDot} />
                  <span className={styles.legendText}>
                    {selectedSkill.status === "demonstrated" &&
                      "Demonstrated: Implemented in verified project code or technical specifications."}
                    {selectedSkill.status === "practiced" &&
                      "Practiced: Explored hands-on in technical spikes and learning experiments."}
                    {selectedSkill.status === "exploring" &&
                      "Exploring: Actively studying fundamentals and architectural patterns."}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Architecture Spotlight: Notes API Request Lifecycle */}
        <div className={styles.architectureBox}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <Terminal size={20} color="#2457FF" />
              <span>Architectural Spotlight: Notes API Request Lifecycle</span>
            </div>
            <div className={styles.boxSubtitle}>Verified Learning & Practice · Node.js & Express.js</div>
          </div>

          <p className={styles.boxIntro}>
            A verified step-by-step walkthrough of how an HTTP request travels through the Notes API—from
            the initial client dispatch through routing, validation middleware, and Mongoose document
            modeling, to an explicit JSON response.
          </p>

          {/* Interactive Step Navigator */}
          <div className={styles.pipelineTrack} role="tablist" aria-label="Request flow steps">
            {ARCHITECTURE_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.pipelineStep} ${isActive ? styles.activeStep : ""}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className={styles.stepNum}>Step {step.stepNumber}</div>
                  <div className={styles.stepLabel}>{step.label}</div>
                  <div className={styles.stepDetail}>{step.subtitle}</div>
                  {idx < ARCHITECTURE_STEPS.length - 1 && (
                    <span className={styles.stepConnector} aria-hidden="true">
                      →
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Step Technical Walkthrough */}
          <div className={styles.stepWalkthrough}>
            <div className={styles.walkthroughHeader}>
              <div className={styles.walkthroughTitleGroup}>
                <span className={styles.walkthroughBadge}>
                  Step 0{activeStep + 1} of 0{ARCHITECTURE_STEPS.length}
                </span>
                <h4 className={styles.walkthroughTitle}>
                  {ARCHITECTURE_STEPS[activeStep].label}: {ARCHITECTURE_STEPS[activeStep].subtitle}
                </h4>
              </div>

              <div className={styles.flowControls}>
                {activeStep < ARCHITECTURE_STEPS.length - 1 ? (
                  <button
                    type="button"
                    className={styles.nextStepBtn}
                    onClick={() => setActiveStep((prev) => prev + 1)}
                  >
                    <span>Next: {ARCHITECTURE_STEPS[activeStep + 1].label}</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.nextStepBtn}
                    onClick={() => setActiveStep(0)}
                  >
                    <RotateCcw size={14} />
                    <span>Restart Flow</span>
                  </button>
                )}

                {activeStep > 0 && (
                  <button
                    type="button"
                    className={styles.resetBtn}
                    onClick={() => setActiveStep(0)}
                    title="Reset to Client Step 01"
                  >
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            <p className={styles.walkthroughDesc}>
              {ARCHITECTURE_STEPS[activeStep].roleDescription}
            </p>

            {/* Code Block with Working Copy Action */}
            <div className={styles.codeContainer}>
              <div className={styles.codeHeader}>
                <div className={styles.codeFileLabel}>
                  <Code2 size={14} color="#8FD9FF" />
                  <span>{ARCHITECTURE_STEPS[activeStep].fileLabel}</span>
                </div>
                <button
                  type="button"
                  className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
                  onClick={() => handleCopyCode(ARCHITECTURE_STEPS[activeStep].codeSnippet)}
                  aria-label="Copy code snippet"
                >
                  {copied ? (
                    <>
                      <Check size={13} color="#10B981" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className={styles.codeSnippet}>
                <code>{ARCHITECTURE_STEPS[activeStep].codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
