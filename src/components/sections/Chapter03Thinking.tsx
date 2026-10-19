"use client";

import React from "react";
import styles from "./Chapter03Thinking.module.scss";
import { PRODUCT_THINKING_PILLARS } from "@/data/portfolioData";
import { motion } from "motion/react";
import { Lightbulb, FileText, CheckCircle2, ShieldCheck, GitPullRequest } from "lucide-react";

export function Chapter03Thinking() {
  return (
    <section id="chapter-03" className={styles.thinkingSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>Chapter 03 · Thinking Beyond Code</span>
        </div>

        <h2 className="section-title">UI/UX & Product Thinking</h2>
        <p className="section-lead">
          Building software involves far more than making buttons trigger functions. It requires
          deeply understanding user mental models, anticipating operational friction, and enforcing
          correctness through intentional architecture.
        </p>

        {/* 4 Pillars of Product Strategy */}
        <div className={styles.pillarsGrid}>
          {PRODUCT_THINKING_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={styles.pillarCard}
            >
              <div className={styles.pillarNum}>
                <span>Pillar</span>
                <span>{pillar.number}</span>
              </div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarConcept}>{pillar.concept}</p>

              <div className={styles.practicalBox}>
                <div className={styles.practicalLabel}>Real Project Application</div>
                <div className={styles.practicalText}>{pillar.practicalApplication}</div>
                <div className={styles.evidenceRef}>
                  <FileText size={12} color="#8FD9FF" />
                  <span>Evidence: {pillar.evidenceReference}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PRD & System Rigor Evidence Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className={styles.prdShowcase}
        >
          <div className={styles.prdGrid}>
            <div>
              <div className={styles.prdBadge}>
                <ShieldCheck size={14} />
                <span>Formal PRD v1.2 Author</span>
              </div>

              <h3 className={styles.prdHeading}>Placement Command: Specification-First Engineering</h3>
              <p className={styles.prdBody}>
                Before writing a single line of backend logic for Placement Command, I authored a
                rigorous 52KB / 105KB Product Requirements Document (PRD) specifying 21 discrete
                functional modules (M01 to M21), acceptance criteria, and mathematical guarantees.
              </p>
              <p className={styles.prdBody}>
                Rather than treating product design as superficial wireframing, I believe UX begins with
                bulletproof state invariants: if a database can allow an accidental double-booking, no
                amount of animations or tooltips will save the user experience.
              </p>
            </div>

            <div className={styles.principlesList}>
              <div className={styles.principleItem}>
                <div className={styles.principleName}>1. Exclusion Constraints (`btree_gist`)</div>
                <div className={styles.principleDetail}>
                  Overlap prevention across students, interviewers, and rooms is enforced by PostgreSQL
                  half-open range intervals (`tstzrange`), making conflicts mathematically impossible.
                </div>
              </div>

              <div className={styles.principleItem}>
                <div className={styles.principleName}>2. Simulate → Propose → Approve → Publish</div>
                <div className={styles.principleDetail}>
                  When disruptions occur, the recovery engine simulates delays, ranks proposals, and
                  requires human coordinator approval before updating published appointments.
                </div>
              </div>

              <div className={styles.principleItem}>
                <div className={styles.principleName}>3. Decoupled Verification & Allocation</div>
                <div className={styles.principleDetail}>
                  Separated candidate academic eligibility from seat allocation to guarantee full
                  auditability and zero silent drops of qualified applicants.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
