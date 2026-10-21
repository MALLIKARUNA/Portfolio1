"use client";

import React from "react";
import Image from "next/image";
import styles from "./Chapter00Hero.module.scss";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowRight, Compass, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import { HeroCosmicBackground } from "./HeroCosmicBackground";
import { motion } from "motion/react";

export function Chapter00Hero() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="chapter-00" className={styles.heroSection}>
      {/* Subtle Living Cosmic Background */}
      <HeroCosmicBackground />

      <div className="container">
        <div className={styles.heroGrid}>
          {/* Left Column: Narrative & Primary Actions */}
          <div className={styles.leftColumn}>
            {/* Status Header Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={styles.statusHeader}
            >
              <span className={`${styles.signalBeacon} animate-beacon`} />
              <span className={styles.statusText}>
                Engineering Student & Full-Stack Builder · {PERSONAL_INFO.location}
              </span>
            </motion.div>

            {/* Name & Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={styles.heroName}
            >
              <span className={styles.gradientText}>{PERSONAL_INFO.name}</span>
            </motion.h1>

            {/* Role Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={styles.roleTagline}
            >
              <span>Full Stack Developer</span>
              <span className={styles.separator}>·</span>
              <span>UI/UX Designer</span>
              <span className={styles.separator}>·</span>
              <span>Product Thinker</span>
              <span className={styles.separator}>·</span>
              <span style={{ color: "var(--warm-solar)" }}>1× Hackathon Winner</span>
            </motion.div>

            {/* Lead Intro */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={styles.heroLead}
            >
              {PERSONAL_INFO.headline} As an engineering student at{" "}
              <strong>Ballari Institute of Technology and Management</strong>, I explore how thoughtful
              interfaces, solid backend architectures, and product intuition intersect to solve
              genuine problems.
            </motion.p>

            {/* Dual Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={styles.actionRow}
            >
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => scrollTo("#chapter-04", { offset: -70 })}
              >
                <span>Explore My Work</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => scrollTo("#chapter-01", { offset: -70 })}
              >
                <Compass size={16} />
                <span>Read My Journey</span>
              </button>
            </motion.div>

            {/* Social Profiles Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className={styles.socialRow}
            >
              <span className={styles.socialLabel}>Profiles</span>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="GitHub Profile"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="Instagram Profile"
              >
                <InstagramIcon size={15} />
                <span>Instagram</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Static portrait (portal temporarily hidden — restore by re-adding <HeroPortalVisual /> below) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={styles.rightColumn}
          >
            {/* PORTAL RESTORE POINT — uncomment to re-enable:
            <div className={styles.portalComposite}>
              <HeroPortalVisual />
              <div className={styles.portraitLayer} aria-hidden="true">
                <div className={styles.portraitMask}>
                  <Image src="/images/mallikarjun_photo.jpeg" alt="" fill
                    sizes="(max-width: 768px) 160px, 220px"
                    className={styles.portraitImg} priority />
                  <div className={styles.portraitAura} />
                </div>
              </div>
            </div>
            */}

            {/* Portrait Card */}
            <div className={styles.portraitCard}>
              <div className={styles.portraitCardMedia}>
                <Image
                  src="/images/mallikarjun.png"
                  alt="Mallikarjun Alyal — Full-Stack Developer · Product Manager"
                  fill
                  sizes="(max-width: 768px) 310px, (max-width: 1024px) 380px, 470px"
                  className={styles.portraitImage}
                  priority
                />
              </div>

              <div className={styles.portraitCaption}>
                <div className={styles.portraitName}>Mallikarjun Alyal</div>
                <div className={styles.portraitRole}>
                  FULL-STACK DEVELOPER · PRODUCT MANAGER
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <div className={styles.scrollLine} />
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
