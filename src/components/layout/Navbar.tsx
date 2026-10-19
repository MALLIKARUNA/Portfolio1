"use client";

import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { Sparkles, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenAI: () => void;
}

export function Navbar({ onOpenAI }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section for clean active state styling
  useEffect(() => {
    const sectionIds = [
      "chapter-00",
      "chapter-01",
      "chapter-02",
      "chapter-03",
      "chapter-04",
      "chapter-05",
      "chapter-06",
      "chapter-07",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    setMobileMenuOpen(false);
    scrollTo(targetId, { offset: -80 });
  };

  const navItems = [
    { label: "Journey", id: "#chapter-01" },
    { label: "Systems", id: "#chapter-02" },
    { label: "Thinking", id: "#chapter-03" },
    { label: "Work", id: "#chapter-04" },
    { label: "Milestones", id: "#chapter-05" },
    { label: "Perspective", id: "#chapter-06" },
    { label: "Connect", id: "#chapter-07" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* Typographic Identity — Strict No Logo / Symbol requirement */}
        <div className={styles.brandGroup}>
          <a
            href="#chapter-00"
            onClick={(e) => handleNavClick(e, "#chapter-00")}
            className={styles.brandName}
            aria-label="Mallikarjun Alyal Home"
          >
            {PERSONAL_INFO.name}
          </a>

          <div className={styles.hackathonBadge} title="1st Place · FUTURE U AI Product Building Challenge">
            <span className={styles.badgePulse} />
          </div>
        </div>

        {/* Desktop Navigation — Pure minimal labels without numeric prefixes */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Group */}
        <div className={styles.actionGroup}>
          <button
            type="button"
            className={styles.aiTriggerBtn}
            onClick={onOpenAI}
            aria-label="Ask about Mallikarjun's journey"
            title="Interactive grounded portfolio assistant"
          >
            <Sparkles size={14} color="#8FD9FF" />
            <span>Ask AI</span>
          </button>

          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`${styles.mobileNavLink} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
