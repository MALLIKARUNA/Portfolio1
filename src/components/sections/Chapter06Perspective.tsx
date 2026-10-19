"use client";

import React from "react";
import styles from "./Chapter06Perspective.module.scss";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { motion } from "motion/react";
import { Compass, Sparkles, Network } from "lucide-react";

export function Chapter06Perspective() {
  return (
    <section id="chapter-06" className={styles.perspectiveSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>Chapter 06 · What Moves Me</span>
        </div>

        <h2 className="section-title">Perspective & Philosophy</h2>
        <p className="section-lead">
          Engineering is not an isolated exercise in syntax. It is the bridge between understanding a
          human problem and crafting an intentional, reliable reality.
        </p>

        {/* Narrative Reflections Grid */}
        <div className={styles.perspectiveGrid}>
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className={styles.mainQuote}
          >
            &ldquo;I believe the best products aren&apos;t built by code alone. They emerge from{" "}
            <span>understanding people</span>, identifying the right problems, and bringing ideas
            thoughtfully to life.&rdquo;
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className={styles.philosophyBody}
          >
            <p>
              I care about <strong>why products exist</strong>, who they serve, the decisions behind
              them, and how thoughtful design and engineering can work together seamlessly.
            </p>
            <p>
              In software, complexity is easy to generate; restraint, clarity, and reliability require
              deliberate intention. Whether configuring database exclusion intervals, designing
              non-intrusive alert cooldowns for human supervisors, or sculpting typography that breathes,
              I look for solutions that feel inevitable rather than forced.
            </p>
            <p>
              This portfolio is a living record of that ongoing journey: the things I build, the
              mistakes I analyze, the lessons I internalize, and the people I collaborate with along the
              way.
            </p>
          </motion.div>
        </div>

        {/* Curiosity Pillars */}
        <div className={styles.curiosityPillars}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={styles.pillarBox}
          >
            <div className={styles.boxHeader}>What Inspires Me</div>
            <h3 className={styles.boxTitle}>Systems with Purpose</h3>
            <p className={styles.boxText}>
              Technology that disappears into the background to solve tangible friction—from emergency
              corridor routing in remote mountain regions to autonomous classroom safety monitoring.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.pillarBox}
          >
            <div className={styles.boxHeader}>Current Explorations</div>
            <h3 className={styles.boxTitle}>Distributed Rigor & Shaders</h3>
            <p className={styles.boxText}>
              Diving deeper into event-driven distributed architectures, database transaction
              isolation guarantees, and WebGL procedural shader visual experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.pillarBox}
          >
            <div className={styles.boxHeader}>What I Hope to Build Next</div>
            <h3 className={styles.boxTitle}>Collaborative Horizons</h3>
            <p className={styles.boxText}>
              Building high-impact products with engineers and designers who care about software
              craft, user empathy, and intellectual curiosity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
