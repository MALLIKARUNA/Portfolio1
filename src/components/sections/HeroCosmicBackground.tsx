"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Chapter00Hero.module.scss";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
  vx: number;
  vy: number;
}

interface OrbitalArc {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation: number;
  speed: number;
  progress: number;
  pulseColor: string;
  trailColor: string;
}

export function HeroCosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const isMobile = width < 768;
    const starCount = isMobile ? 32 : 55;

    const colors = [
      "rgba(245, 243, 239,", // Starlight warm-white
      "rgba(143, 217, 255,", // Cyan / Ice blue
      "rgba(36, 87, 255,",   // Cobalt
      "rgba(143, 124, 255,", // Nebula violet
    ];

    // Seed stars
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.6,
        baseAlpha: Math.random() * 0.45 + 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.4) * 0.16,
        vy: (Math.random() - 0.5) * 0.14,
      });
    }

    // Faint, elegant orbital curves
    const arcs: OrbitalArc[] = [
      {
        cx: width * 0.62,
        cy: height * 0.48,
        rx: Math.min(width, height) * 0.54,
        ry: Math.min(width, height) * 0.3,
        rotation: -Math.PI / 9,
        speed: 0.0007,
        progress: 0.25,
        pulseColor: "rgba(143, 217, 255, 0.42)",
        trailColor: "rgba(36, 87, 255, 0.07)",
      },
      {
        cx: width * 0.42,
        cy: height * 0.52,
        rx: Math.min(width, height) * 0.7,
        ry: Math.min(width, height) * 0.36,
        rotation: Math.PI / 12,
        speed: 0.0005,
        progress: 0.65,
        pulseColor: "rgba(143, 124, 255, 0.38)",
        trailColor: "rgba(143, 217, 255, 0.05)",
      },
    ];

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;

      arcs[0].cx = width * 0.62;
      arcs[0].cy = height * 0.48;
      arcs[0].rx = Math.min(width, height) * 0.54;
      arcs[0].ry = Math.min(width, height) * 0.3;

      arcs[1].cx = width * 0.42;
      arcs[1].cy = height * 0.52;
      arcs[1].rx = Math.min(width, height) * 0.7;
      arcs[1].ry = Math.min(width, height) * 0.36;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Intersection & Visibility Observer to pause render when tab or section is hidden
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting && document.visibilityState === "visible";
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let frame = 0;
    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      frame += 1;
      ctx.clearRect(0, 0, width, height);

      // Render faint orbital curves
      arcs.forEach((arc) => {
        arc.progress = (arc.progress + arc.speed) % 1;

        ctx.save();
        ctx.translate(arc.cx, arc.cy);
        ctx.rotate(arc.rotation);

        // Faint elliptical orbit path
        ctx.beginPath();
        ctx.ellipse(0, 0, arc.rx, arc.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = arc.trailColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Luminous gliding light point on the orbit
        const theta = arc.progress * Math.PI * 2;
        const px = arc.rx * Math.cos(theta);
        const py = arc.ry * Math.sin(theta);

        const beadGrad = ctx.createRadialGradient(px, py, 0, px, py, 14);
        beadGrad.addColorStop(0, arc.pulseColor);
        beadGrad.addColorStop(0.5, arc.pulseColor.replace(/[\d.]+\)$/, "0.15)"));
        beadGrad.addColorStop(1, "transparent");

        ctx.fillStyle = beadGrad;
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Render drifting stars with sinusoidal twinkle
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        // Wrap boundaries smoothly
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const alpha = Math.max(
          0.05,
          Math.min(0.9, star.baseAlpha + Math.sin(frame * star.pulseSpeed + star.pulsePhase) * 0.25)
        );

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color} ${alpha.toFixed(3)})`;
        ctx.fill();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.heroCosmicBackground} aria-hidden="true">
      {/* Soft atmospheric ambient light pools */}
      <div className={styles.ambientGlowPrimary} />
      <div className={styles.ambientGlowSecondary} />
      <div className={styles.ambientGlowCyan} />

      {/* Living particle & orbital canvas */}
      <canvas ref={canvasRef} className={styles.heroCosmicCanvas} />
    </div>
  );
}
