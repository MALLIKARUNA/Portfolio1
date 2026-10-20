"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Chapter00Hero } from "@/components/sections/Chapter00Hero";
import { Chapter01Journey } from "@/components/sections/Chapter01Journey";
import { Chapter02Build } from "@/components/sections/Chapter02Build";
import { Chapter04Projects } from "@/components/sections/Chapter04Projects";
import { Chapter07Connect } from "@/components/sections/Chapter07Connect";
import { AskAssistant } from "@/components/ai/AskAssistant";

// Dynamically import the Three.js cosmic canvas with SSR disabled to guarantee smooth client-side WebGL hydration
const CosmicCanvas = dynamic(
  () => import("@/components/scenes/CosmicCanvas").then((mod) => mod.CosmicCanvas),
  { ssr: false }
);

export default function Home() {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <>
      {/* Background WebGL Cosmic Atmosphere */}
      <CosmicCanvas />

      {/* Editorial Navigation */}
      <Navbar onOpenAI={() => setIsAIOpen(true)} />

      {/* Main Narrative Chapters */}
      <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
        <Chapter00Hero />
        <Chapter01Journey />
        <Chapter02Build />
        <Chapter04Projects />
        <Chapter07Connect />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Interactive Grounded Portfolio Assistant */}
      <AskAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </>
  );
}
