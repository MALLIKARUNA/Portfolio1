"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Chapter04Projects.module.scss";
import { PROJECTS } from "@/data/portfolioData";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

export function Chapter04Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "AI & Systems", label: "AI & Systems" },
    { id: "Full Stack", label: "Full Stack" },
    { id: "Frontend", label: "Frontend" },
    { id: "Web Applications", label: "Web Applications" },
    { id: "Personal Websites", label: "Personal Websites" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="chapter-04" className={styles.projectsSection}>
      <div className="container">

        <h2 className="section-title">Selected Work & Real Projects</h2>
        <p className="section-lead">
          Verified applications, full-stack architectures, and web experiments built with modern
          technologies. Each entry reflects the authentic codebase, technical scope, and verified
          implementation status.
        </p>

        {/* Category Filters */}
        <div className={styles.filterBar} role="tablist" aria-label="Project categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`${styles.filterBtn} ${
                selectedCategory === cat.id ? styles.activeFilter : ""
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className={styles.filterCount}>
                {cat.id === "all"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className={`${styles.projectCard} ${project.featured ? styles.featuredCard : ""}`}
              >
                {/* Card Media Preview */}
                <div className={styles.cardMedia}>
                  {project.status && (
                    <div className={styles.statusBadge}>
                      <span className={styles.statusDot} />
                      <span>{project.status}</span>
                    </div>
                  )}

                  <Image
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    fill
                    sizes="(max-width: 680px) 100vw, (max-width: 1120px) 50vw, 400px"
                    className={styles.imageHoverZoom}
                  />
                  <div className={styles.mediaOverlay} />
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardMetaRow}>
                    <span className={styles.categoryTag}>{project.category}</span>
                    {project.featured && (
                      <span className={styles.featuredTag}>Featured</span>
                    )}
                  </div>

                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>

                  {/* Tech Stack Pills */}
                  <div className={styles.techPillsRow}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className={styles.techPill}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Explicit Accessible Action Links (No popup/modal) */}
                  <div className={styles.cardActions}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceBtn}
                      title={`View ${project.title} repository on GitHub`}
                      aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
                    >
                      <GithubIcon size={16} />
                      <span>View Source</span>
                      <ExternalLink size={13} className={styles.linkArrow} />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.liveDemoBtn}
                        title={`Open live deployment for ${project.title}`}
                        aria-label={`Open live deployment for ${project.title} (opens in new tab)`}
                      >
                        <Sparkles size={14} />
                        <span>Live Demo</span>
                        <ArrowUpRight size={15} className={styles.linkArrow} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
