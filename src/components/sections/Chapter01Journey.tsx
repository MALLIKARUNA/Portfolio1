"use client";

import React from "react";
import styles from "./Chapter01Journey.module.scss";
import { PERSONAL_INFO, JOURNEY_MILESTONES } from "@/data/portfolioData";
import { motion } from "motion/react";
import { Compass, Trophy } from "lucide-react";

export function Chapter01Journey() {
  return (
    <section id="chapter-01" className={styles.journeySection}>
      <div className="container">

        <h2 className="section-title">From Curiosity to Creation</h2>
        <p className={`section-lead ${styles.constrainedLead}`}>
          Software engineering is more than syntax. It is the discipline of transforming an abstract
          curiosity into a reliable digital experience that serves real people.
        </p>

        {/* Asymmetric Editorial Story Layout */}
        <div className={styles.storyLayout}>
          {/* Left Column: Focused Pull-Quote */}
          <aside className={styles.quoteColumn}>
            <div className={styles.quoteWrapper}>
              <blockquote className={styles.quoteBlock}>
                &ldquo;{PERSONAL_INFO.statement}&rdquo;
              </blockquote>
              <div className={styles.quoteAttribution}>
                <span className={styles.attributionAuthor}>{PERSONAL_INFO.name}</span>
                <span className={styles.attributionNote}>Core Principle</span>
              </div>
            </div>
          </aside>

          {/* Right Column: Three Story Stages */}
          <div className={styles.narrativeColumn}>
            <div className={styles.stageTrack}>
              {/* Stage 01 */}
              <div className={styles.stageBlock}>
                <div className={styles.stageHeader}>
                  <div className={styles.stageBadge}>
                    <span className={styles.stageNumber}>01</span>
                    <span className={styles.stageLine} />
                  </div>
                  <h3 className={styles.stageTitle}>Where it began</h3>
                </div>
                <p className={styles.stageParagraph}>
                  My engineering journey began at the{" "}
                  <strong>Ballari Institute of Technology and Management</strong>. Like many who
                  enter computer science, I started with the fundamental mechanics of computing—C,
                  C++, and data structures.
                </p>
              </div>

              {/* Stage 02 */}
              <div className={styles.stageBlock}>
                <div className={styles.stageHeader}>
                  <div className={styles.stageBadge}>
                    <span className={styles.stageNumber}>02</span>
                    <span className={styles.stageLine} />
                  </div>
                  <h3 className={styles.stageTitle}>The question</h3>
                </div>
                <p className={styles.stageParagraph}>
                  Writing terminal algorithms quickly revealed a deeper question:{" "}
                  <em>how do these theoretical lines of logic translate into products people actually rely on every day?</em>
                </p>
              </div>

              {/* Stage 03 */}
              <div className={styles.stageBlock}>
                <div className={styles.stageHeader}>
                  <div className={styles.stageBadge}>
                    <span className={styles.stageNumber}>03</span>
                    <span className={styles.stageLine} />
                  </div>
                  <h3 className={styles.stageTitle}>Connecting the pieces</h3>
                </div>
                <p className={styles.stageParagraph}>
                  That question pulled me into web development and full-stack systems. Rather than
                  viewing frontend interfaces and backend servers as disconnected silos, I wanted to
                  understand the complete path: how an HTTP request is dispatched, how headers and
                  binary streams are parsed, how relational models guarantee integrity, and how
                  intuitive micro-interactions keep users grounded.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className={styles.timelineSection}>
          <h3 className={styles.timelineHeading}>
            <Compass size={20} color="#2457FF" />
            <span>Milestones in Progress</span>
          </h3>

          <div className={styles.timelineTrack}>
            {JOURNEY_MILESTONES.map((milestone, idx) => {
              const isFirstPlace = Boolean(milestone.isFirstPlace);
              return (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`${styles.timelineNode} ${isFirstPlace ? styles.firstPlaceNode : ""}`}
                >
                  <div
                    className={`${styles.nodeMarker} ${isFirstPlace ? styles.firstPlaceMarker : ""}`}
                  />

                  <div className={styles.nodeMeta}>
                    <span
                      className={`${styles.nodeYear} ${isFirstPlace ? styles.firstPlaceYear : ""}`}
                    >
                      {milestone.year}
                    </span>
                    {milestone.location && (
                      <span className={styles.nodeLocation}>{milestone.location}</span>
                    )}
                  </div>

                  <div
                    className={`${styles.nodeContent} ${isFirstPlace ? styles.firstPlaceContent : ""}`}
                  >
                    <div className={styles.nodeHeaderRow}>
                      <div className={styles.nodeTitleWrapper}>
                        {isFirstPlace && (
                          <div className={styles.firstPlaceIcon} aria-label="First Place Achievement">
                            <Trophy size={18} />
                          </div>
                        )}
                        <h4
                          className={`${styles.nodeTitle} ${isFirstPlace ? styles.firstPlaceTitle : ""}`}
                        >
                          {milestone.title}
                        </h4>
                      </div>
                      {isFirstPlace && (
                        <span className={styles.firstPlaceBadge}>1st Place Award</span>
                      )}
                    </div>

                    <div
                      className={`${styles.nodeCategory} ${isFirstPlace ? styles.firstPlaceCategory : ""}`}
                    >
                      {milestone.category}
                    </div>

                    {milestone.event && (
                      <div className={styles.nodeEventRow}>
                        <span className={styles.nodeEventLabel}>Event:</span>
                        <span className={styles.nodeEventValue}>{milestone.event}</span>
                      </div>
                    )}

                    <p className={styles.nodeDesc}>{milestone.description}</p>

                    <div className={styles.highlightList}>
                      {milestone.highlights.map((item) => (
                        <div
                          key={item}
                          className={`${styles.highlightItem} ${isFirstPlace ? styles.firstPlaceHighlight : ""}`}
                        >
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {milestone.acknowledgement && (
                      <div className={styles.acknowledgementRow}>
                        <span className={styles.ackLabel}>Acknowledgement:</span>{" "}
                        <span className={styles.ackText}>{milestone.acknowledgement}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
