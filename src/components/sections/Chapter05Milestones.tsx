"use client";

import React from "react";
import styles from "./Chapter05Milestones.module.scss";
import { motion } from "motion/react";
import { Trophy, GraduationCap, FileCode2, BookOpen } from "lucide-react";

export function Chapter05Milestones() {
  const milestones = [
    {
      icon: <Trophy size={20} color="#FFB15C" />,
      badge: "1st Place Winner",
      title: "1st Place — FUTURE U 2-Day AI Product Building Challenge",
      org: "BITM & Sophyra AI · 24–25 August 2026",
      desc: "Our team secured 1st place in the FUTURE U – 2-Day AI Product Building Challenge at BITM, Ballari. Rapidly ideated and prototyped an AI-powered product under time constraints, collaborating closely with teammates to tackle real-world problems.",
      takeaway:
        "Building under hackathon time constraints reinforced how to prioritize essential product value, communicate clearly, and collaborate effectively as a team.",
    },
    {
      icon: <GraduationCap size={20} color="#8FD9FF" />,
      badge: "Academic Rigor",
      title: "Computer Science & Engineering at BITM",
      org: "Ballari Institute of Technology and Management",
      desc: "Pursuing Bachelor of Engineering in Computer Science. Building a deep academic grounding in operating systems, database management systems, network protocols, computer architecture, and discrete mathematics while actively applying theory to real software.",
      takeaway:
        "Academic foundations provide the mental clarity needed to understand why systems behave the way they do under load.",
    },
    {
      icon: <FileCode2 size={20} color="#8F7CFF" />,
      badge: "Specification",
      title: "Authoring Placement Command PRD v1.2",
      org: "Technical Architecture & Invariants",
      desc: "Penned an exhaustive 52KB product and backend specification covering 21 modules, formal acceptance criteria, and database guarantees. Championed interval-based exclusion constraints in PostgreSQL to eliminate scheduling collisions at the database layer.",
      takeaway:
        "Writing a thorough PRD before coding saves weeks of debugging and forces you to confront edge cases early.",
    },
    {
      icon: <BookOpen size={20} color="#2457FF" />,
      badge: "Continuous Learning",
      title: "Structured Exploration & Engineering Discipline",
      org: "Self-Directed Mastery & GitHub",
      desc: "Maintaining daily documentation of technical lessons—from HTTP status codes (200, 201, 400, 404, 500) and Express middleware pipelines to Multer memory buffers, Mongoose schemas, and PyTorch computer vision pipelines.",
      takeaway:
        "True understanding comes from building things from scratch, making mistakes, and documenting the journey honestly.",
    },
  ];

  return (
    <section id="chapter-05" className={styles.milestonesSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>Chapter 05 · Moments That Mattered</span>
        </div>

        <h2 className="section-title">Milestones & Achievements</h2>
        <p className="section-lead">
          Growth is measured by real challenges embraced, lessons learned under pressure, and the
          discipline of turning curiosity into verified accomplishments.
        </p>

        <div className={styles.cardsGrid}>
          {milestones.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={styles.achievementCard}
            >
              <div className={styles.cardTopRow}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <span className={styles.highlightBadge}>{item.badge}</span>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <div className={styles.cardOrg}>{item.org}</div>
              <p className={styles.cardDesc}>{item.desc}</p>

              <div className={styles.takeawayBox}>
                <div className={styles.takeawayLabel}>Core Lesson</div>
                <div className={styles.takeawayText}>&ldquo;{item.takeaway}&rdquo;</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
