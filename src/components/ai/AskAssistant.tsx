"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./AskAssistant.module.scss";
import { Sparkles, X, Send, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQ_KNOWLEDGE_BASE } from "@/data/portfolioData";

interface AskAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

export function AskAssistant({ isOpen, onClose }: AskAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "assistant",
      text: "Hello! I'm Mallikarjun's grounded portfolio assistant. Ask me anything about his projects, hackathon win (RouteForge), AI Smart Classroom system, backend experience, or engineering journey.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const defaultPrompts = [
    "What did Mallikarjun build for the hackathon?",
    "Tell me about the AI Smart Classroom project",
    "What is Placement Command and his PRD?",
    "What is his backend and database stack?",
  ];

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: `a_${Date.now()}`,
        sender: "assistant",
        text: data.reply || "I couldn't retrieve that information.",
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Local knowledge fallback
      const match = FAQ_KNOWLEDGE_BASE.find((k) =>
        trimmed.toLowerCase().includes(k.question.toLowerCase().slice(0, 15))
      );

      const fallbackText = match
        ? match.answer
        : "Mallikarjun is an engineering student at BITM Ballari, 1× Hackathon Winner (1st Place at FUTURE U AI Challenge), and full-stack developer specializing in Next.js, Node.js, FastAPI, and PostgreSQL.";

      const assistantMsg: Message = {
        id: `a_${Date.now()}`,
        sender: "assistant",
        text: fallbackText,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.assistantOverlay} onClick={onClose}>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={styles.assistantDrawer}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.drawerHeader}>
            <div className={styles.headerTitleGroup}>
              <Sparkles size={16} color="#8FD9FF" />
              <span className={styles.assistantName}>Ask About Mallikarjun</span>
              <span className={styles.groundedBadge}>Grounded</span>
            </div>

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close assistant"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.messageBubble} ${m.sender === "user" ? styles.userMessage : styles.assistantMessage
                  }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className={`${styles.messageBubble} ${styles.assistantMessage}`}>
                <span style={{ color: "var(--ice-blue)", fontStyle: "italic" }}>
                  Synthesizing verified knowledge...
                </span>
              </div>
            )}

            {/* Suggested Prompts */}
            {messages.length < 5 && (
              <div className={styles.suggestedSection}>
                <div className={styles.suggestedHeading}>Frequently Asked</div>
                <div className={styles.promptPills}>
                  {defaultPrompts.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={styles.promptPill}
                      onClick={() => handleSendMessage(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className={styles.drawerInputArea}>
            <form
              className={styles.inputForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
            >
              <input
                type="text"
                placeholder="Ask about projects, hackathon, or stack..."
                className={styles.inputField}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className={styles.sendButton}
                disabled={!input.trim() || loading}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
