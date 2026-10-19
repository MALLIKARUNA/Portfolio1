"use client";

import React, { useState, useEffect } from "react";
import styles from "./Footer.module.scss";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioData";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowUp, Clock, Globe, ArrowUpRight } from "lucide-react";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTimeString(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollTo(targetId, { offset: -80 });
  };

  const handleBackToTop = () => {
    scrollTo("#chapter-00", { offset: 0 });
  };

  const chapterLinks = [
    { label: "Genesis & Purpose", id: "#chapter-00", num: "00" },
    { label: "The Beginning", id: "#chapter-01", num: "01" },
    { label: "How I Build", id: "#chapter-02", num: "02" },
    { label: "Product Thinking", id: "#chapter-03", num: "03" },
    { label: "Selected Work", id: "#chapter-04", num: "04" },
    { label: "Milestones & Proof", id: "#chapter-05", num: "05" },
    { label: "Perspective", id: "#chapter-06", num: "06" },
    { label: "Get in Touch", id: "#chapter-07", num: "07" },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand & Purpose Column - Strictly NO LOGO */}
          <div className={styles.brandCol}>
            <a
              href="#chapter-00"
              onClick={handleBackToTop}
              className={styles.brandSignature}
              aria-label="Mallikarjun Alyal Home"
            >
              {PERSONAL_INFO.name}
            </a>

            <p className={styles.brandTagline}>
              Engineering student at Ballari Institute of Technology and Management (BITM),
              full-stack developer, and UI/UX designer building resilient digital systems and
              thoughtful products.
            </p>

            <div className={styles.statusCard}>
              <span className={styles.statusIndicator} />
              <span>Available for engineering roles & collaborative ventures</span>
            </div>

            {timeString && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  marginTop: "4px",
                }}
              >
                <Clock size={13} color="var(--ice-blue)" />
                <span>Ballari, Karnataka · {timeString} IST (UTC+05:30)</span>
              </div>
            )}
          </div>

          {/* Chapters Column */}
          <div>
            <div className={styles.columnTitle}>
              <Globe size={13} />
              <span>Index / Chapters</span>
            </div>
            <ul className={styles.linkList}>
              {chapterLinks.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.id}
                    onClick={(e) => handleNavClick(e, c.id)}
                    className={styles.footerLink}
                  >
                    <span className={styles.linkNum}>{c.num}</span>
                    <span>{c.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Channels & Networks Column */}
          <div>
            <div className={styles.columnTitle}>
              <span>Channels & Work</span>
            </div>
            <ul className={styles.linkList}>
              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  <span>Instagram</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className={styles.footerLink}
                >
                  <span>Direct Email</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            &copy; 2026 {PERSONAL_INFO.name}. Designed & built with
            editorial craftsmanship.
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className={styles.backToTopBtn}
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
