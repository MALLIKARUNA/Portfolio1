"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Chapter04Projects.module.scss";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectCaseStudy } from "@/types";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { motion } from "motion/react";
import { ArrowUpRight, Award, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

export function Chapter04Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectCaseStudy | null>(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "AI & Computer Vision", label: "AI & Computer Vision" },
    { id: "Product Architecture", label: "Product Architecture" },
    { id: "Frontend & Interface", label: "Frontend & Interface" },
    { id: "Systems & API", label: "Systems & API" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="chapter-04" className={styles.projectsSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>Chapter 04 · Ideas Made Real</span>
        </div>

        <h2 className="section-title">Selected Work & Case Studies</h2>
        <p className="section-lead">
          Real projects that solve tangible problems. Each case study details the core challenge,
          architectural trade-offs, technologies used, and lessons learned during implementation.
        </p>

        {/* Category Filters */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.filterBtn} ${
                selectedCategory === cat.id ? styles.activeFilter : ""
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={styles.projectCard}
              onClick={() => setActiveModalProject(project)}
            >
              {/* Card Media */}
              <div className={styles.cardMedia}>
                {project.category === "Hackathon Winner" && (
                  <div className={styles.featuredBadge}>
                    <Award size={13} color="#FFB15C" />
                    <span>Hackathon 1st Place</span>
                  </div>
                )}

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  className={styles.imageHoverZoom}
                />
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardMetaRow}>
                  <span className={styles.categoryTag}>{project.category}</span>
                  <span className={styles.timelineTag}>{project.timeline.split("·")[0]}</span>
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectTagline}>{project.tagline}</p>

                {/* Tech Stack Pills */}
                <div className={styles.techPillsRow}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tag-pill">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="tag-pill" style={{ color: "var(--ice-blue)" }}>
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Card Actions */}
                <div className={styles.cardActions}>
                  <div className={styles.caseStudyBtn}>
                    <span>Read Case Study</span>
                    <ArrowUpRight size={15} />
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubIconLink}
                      onClick={(e) => e.stopPropagation()}
                      title="View GitHub Repository"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <GithubIcon size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
