"use client";

import React from "react";
import styles from "./Chapter00Hero.module.scss";

/**
 * HeroCosmicBackground
 * Renders lightweight, hardware-accelerated CSS ambient light pools in Chapter 00 Hero.
 * Provides immediate atmospheric color before and alongside WebGL hydration,
 * avoiding duplicate canvas render loops and resource contention.
 */
export function HeroCosmicBackground() {
  return (
    <div className={styles.heroCosmicBackground} aria-hidden="true">
      {/* Soft atmospheric ambient light pools */}
      <div className={styles.ambientGlowPrimary} />
      <div className={styles.ambientGlowSecondary} />
      <div className={styles.ambientGlowCyan} />
    </div>
  );
}
