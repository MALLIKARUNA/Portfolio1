"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./ProjectModal.module.scss";
import { ProjectCaseStudy } from "@/types";
import { X, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { motion, AnimatePresence } from "motion/react";

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.modalHeader}>
            <span className={styles.modalCategory}>{project.category}</span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close project modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className={styles.modalBody}>
            <h2 className={styles.modalTitle}>{project.title}</h2>
            <div className={styles.modalTagline}>{project.tagline}</div>

            {/* Metadata bar */}
            <div className={styles.metaGrid}>
              <div>
                <div className={styles.metaLabel}>Role</div>
                <div className={styles.metaValue}>{project.role}</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Timeline</div>
                <div className={styles.metaValue}>{project.timeline}</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Verification</div>
                <div className={styles.metaValue} style={{ color: "#34D399" }}>
                  Verified Implementation
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className={styles.heroImageWrap}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 960px) 100vw, 920px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Real Screenshots Preview Gallery if available */}
            {project.previewImages && project.previewImages.length > 1 && (
              <div className={styles.previewGallery}>
                {project.previewImages.map((img, i) => (
                  <div key={i} className={styles.previewThumb}>
                    <Image
                      src={img}
                      alt={`${project.title} evidence screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Problem & Context */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.blockTitle}>
                <AlertTriangle size={18} color="#FFB15C" />
                <span>The Challenge & Problem</span>
              </h3>
              <p className={styles.blockText}>{project.problem}</p>
            </div>

            {/* My Contribution */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.blockTitle}>
                <CheckCircle2 size={18} color="#2457FF" />
                <span>My Exact Contribution</span>
              </h3>
              <p className={styles.blockText}>{project.myContribution}</p>
            </div>

            {/* Architectural & Design Decisions */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.blockTitle}>
                <ShieldCheck size={18} color="#8F7CFF" />
                <span>Key Technical & Design Decisions</span>
              </h3>
              <div className={styles.decisionsList}>
                {project.keyDecisions.map((decision) => (
                  <div key={decision.title} className={styles.decisionItem}>
                    <div className={styles.decisionHeading}>{decision.title}</div>
                    <div className={styles.decisionBody}>{decision.rationale}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Obstacles & Lessons */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.blockTitle}>
                <Layers size={18} color="#8FD9FF" />
                <span>Obstacles Overcome & Lessons Learned</span>
              </h3>
              <p className={styles.blockText}>{project.challenges}</p>
              <p className={styles.blockText} style={{ marginTop: "0.75rem", fontStyle: "italic" }}>
                &ldquo;{project.whatILearned}&rdquo;
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div className={styles.sectionBlock}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted-text)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                Technologies Used
              </div>
              <div className={styles.tagsContainer}>
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with Links */}
            <div className={styles.modalFooter}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Author: Mallikarjun Alyal
              </div>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubBtn}
                >
                  <GithubIcon size={15} />
                  <span>Inspect Code on GitHub</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
