"use client";

import React, { useState } from "react";
import styles from "./Chapter02Build.module.scss";
import { TECHNICAL_SKILLS } from "@/data/portfolioData";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Server,
  Database,
  Code2,
  Layout,
} from "lucide-react";

export function Chapter02Build() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Technologies", icon: <Layers size={14} /> },
    { id: "languages", label: "Programming Languages", icon: <Code2 size={14} /> },
    { id: "frontend", label: "Frontend", icon: <Layout size={14} /> },
    { id: "backend", label: "Backend", icon: <Server size={14} /> },
    { id: "database", label: "Databases", icon: <Database size={14} /> },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? TECHNICAL_SKILLS
      : TECHNICAL_SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="chapter-02" className={styles.buildSection}>
      <div className="container">

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

                {skill.projectName && (
                  <div className={styles.cardFooter}>
                    <span className={styles.projectContextLabel}>Context</span>
                    <span
                      className={styles.projectContextTag}
                      title={`Verified context: ${skill.projectName}`}
                    >
                      {skill.projectName.split(" ")[0]}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
