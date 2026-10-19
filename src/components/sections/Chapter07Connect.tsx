"use client";

import React, { useState } from "react";
import styles from "./Chapter07Connect.module.scss";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { motion } from "motion/react";
import { Mail, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/BrandIcons";

export function Chapter07Connect() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Idea Exchange",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Compose mailto as accessible direct fallback
    const subject = encodeURIComponent(`[Portfolio Connect] ${formData.topic} from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
  };

  return (
    <section id="chapter-07" className={styles.connectSection}>
      <div className={styles.horizonGlow} />

      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>Chapter 07 · The Open Loop</span>
        </div>

        <div className={styles.connectGrid}>
          {/* Left Column: Invitation & Channels */}
          <div className={styles.leftCol}>
            <h2 className={styles.connectHeading}>Good ideas get better when they are shared.</h2>
            <p className={styles.connectLead}>
              I&apos;m interested in meeting people who enjoy building, exploring ideas, solving problems,
              and learning from one another. Whether you want to discuss system architectures, UI/UX
              trade-offs, or an exciting project idea, I&apos;d be glad to connect.
            </p>

            <div className={styles.channelsList}>
              <a href={`mailto:${PERSONAL_INFO.email}`} className={styles.channelItem}>
                <div className={styles.channelIcon}>
                  <Mail size={18} />
                </div>
                <div className={styles.channelInfo}>
                  <span className={styles.channelName}>Email</span>
                  <span className={styles.channelDetail}>{PERSONAL_INFO.email}</span>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelItem}
              >
                <div className={styles.channelIcon}>
                  <LinkedinIcon size={18} />
                </div>
                <div className={styles.channelInfo}>
                  <span className={styles.channelName}>LinkedIn</span>
                  <span className={styles.channelDetail}>Connect with Mallikarjun</span>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelItem}
              >
                <div className={styles.channelIcon}>
                  <GithubIcon size={18} />
                </div>
                <div className={styles.channelInfo}>
                  <span className={styles.channelName}>GitHub</span>
                  <span className={styles.channelDetail}>Explore Repositories & Commits</span>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelItem}
              >
                <div className={styles.channelIcon}>
                  <InstagramIcon size={18} />
                </div>
                <div className={styles.channelInfo}>
                  <span className={styles.channelName}>Instagram</span>
                  <span className={styles.channelDetail}>@mallikarjuna____03</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Initiate a Conversation</h3>
            <p className={styles.formSubtitle}>
              Send a note directly to my inbox. I usually reply within 24–48 hours.
            </p>

            {isSubmitted ? (
              <div className={styles.successMessage}>
                <CheckCircle2 size={32} style={{ margin: "0 auto 0.75rem", display: "block" }} />
                <strong>Opening your email client...</strong>
                <p style={{ marginTop: "0.5rem", color: "var(--text-secondary)" }}>
                  If your mail client didn&apos;t open automatically, feel free to write directly to{" "}
                  <a href={`mailto:${PERSONAL_INFO.email}`} style={{ color: "var(--ice-blue)", textDecoration: "underline" }}>
                    {PERSONAL_INFO.email}
                  </a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    className={styles.formInput}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="ada@example.com"
                    className={styles.formInput}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="topic" className={styles.formLabel}>
                    Conversation Topic
                  </label>
                  <select
                    id="topic"
                    className={styles.formSelect}
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  >
                    <option value="Idea Exchange">Idea Exchange & Collaboration</option>
                    <option value="FUTURE U Discussion">FUTURE U / AI Hackathon</option>
                    <option value="AI Classroom System">AI Smart Classroom Architecture</option>
                    <option value="Placement Command PRD">Placement Command & PRDs</option>
                    <option value="General Conversation">Say Hello</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="What are you building or exploring?"
                    className={styles.formTextarea}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Send size={15} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
