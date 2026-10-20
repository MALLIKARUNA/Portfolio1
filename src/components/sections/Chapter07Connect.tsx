"use client";

import React, { useState } from "react";
import styles from "./Chapter07Connect.module.scss";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Send, CheckCircle2, Loader2, AlertCircle, RotateCcw } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/BrandIcons";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Chapter07Connect() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Idea Exchange",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Unable to deliver message at this time. Please try again or reach out directly via email."
        );
      }

      setStatus("success");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again or reach out directly.";
      setStatus("error");
      setErrorMessage(message);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      topic: "Idea Exchange",
      message: "",
      honeypot: "",
    });
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="chapter-07" className={styles.connectSection}>
      <div className={styles.horizonGlow} />

      <div className="container">
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

            {status === "success" ? (
              <div className={styles.successMessage}>
                <CheckCircle2
                  size={36}
                  style={{ margin: "0 auto 0.75rem", display: "block" }}
                />
                <div className={styles.successTitle}>Message Dispatched to Inbox</div>
                <p style={{ margin: "0.5rem 0 0 0", color: "var(--text-secondary)" }}>
                  Thank you, <strong>{formData.name || "friend"}</strong>. Your note was
                  successfully accepted by the delivery service and forwarded to
                  Mallikarjun&apos;s personal inbox.
                </p>
                <button type="button" onClick={handleReset} className={styles.resetBtn}>
                  <RotateCcw size={14} />
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field for anti-spam bots */}
                <input
                  type="text"
                  name="company"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className={styles.honeypotField}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Ada Lovelace"
                    className={styles.formInput}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === "loading"}
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
                    maxLength={254}
                    placeholder="ada@example.com"
                    className={styles.formInput}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === "loading"}
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
                    disabled={status === "loading"}
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
                    maxLength={3000}
                    placeholder="What are you building or exploring?"
                    className={styles.formTextarea}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status === "loading"}
                  />
                  <span className={styles.charCount}>
                    {formData.message.length} / 3000
                  </span>
                </div>

                {status === "error" && (
                  <div className={styles.errorMessage} role="alert">
                    <AlertCircle size={18} className={styles.errorIcon} />
                    <div className={styles.errorText}>
                      <span>{errorMessage}</span>
                      <div>
                        Or reach out directly at
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className={styles.errorFallbackLink}
                        >
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className={styles.spinner} />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
