"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./HeroPortalVisual.module.scss";

interface Particle {
  x: number;
  y: number;
  z: number;
  radius: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  alpha: number;
  pulsePhase: number;
}

export function HeroPortalVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Mouse tilt target and current values
  const tiltTarget = useRef({ x: 0, y: 0 });
  const tiltCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check prefers-reduced-motion
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);

    const handleMqlChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mql.addEventListener("change", handleMqlChange);
    return () => mql.removeEventListener("change", handleMqlChange);
  }, []);

  // Handle pointer movement for restrained 3D tilt
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Restrained tilt angles (max ~8 degrees)
      tiltTarget.current.x = -y * 14;
      tiltTarget.current.y = x * 14;
    },
    [reducedMotion]
  );

  const handlePointerLeave = useCallback(() => {
    tiltTarget.current.x = 0;
    tiltTarget.current.y = 0;
  }, []);

  // Visibility and intersection observer to pause animations when off-screen or tab hidden
  useEffect(() => {
    const checkVisibility = () => {
      const isDocVisible = document.visibilityState === "visible";
      const isIntersecting = isVisibleRef.current;
      const active = isDocVisible && isIntersecting;
      setIsPaused(!active);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          checkVisibility();
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      checkVisibility();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Canvas particle simulation (restrained stardust orbiting the portal)
  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize restrained stardust particles around the ring perimeter
    const particleColors = [
      "#8FD9FF", // Ice blue
      "#FFB15C", // Solar amber
      "#8F7CFF", // Nebula violet
      "#FFFFFF", // Pure star
      "#2457FF", // Cobalt
    ];

    const particles: Particle[] = [];
    const count = 75;
    const baseRadius = width * 0.42;

    for (let i = 0; i < count; i++) {
      const radiusVariation = (Math.random() - 0.5) * 50;
      particles.push({
        x: 0,
        y: 0,
        z: Math.random() * 20 - 10,
        radius: baseRadius + radiusVariation,
        angle: Math.random() * Math.PI * 2,
        speed: (0.0015 + Math.random() * 0.003) * (Math.random() > 0.4 ? 1 : -1),
        size: 1 + Math.random() * 2.2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: 0.25 + Math.random() * 0.65,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth tilt interpolation (lerp)
      tiltCurrent.current.x += (tiltTarget.current.x - tiltCurrent.current.x) * 0.08;
      tiltCurrent.current.y += (tiltTarget.current.y - tiltCurrent.current.y) * 0.08;

      if (tiltRef.current) {
        tiltRef.current.style.transform = `perspective(1000px) rotateX(${tiltCurrent.current.x.toFixed(
          2
        )}deg) rotateY(${tiltCurrent.current.y.toFixed(2)}deg)`;
      }

      // Only draw particles if visible and not hidden
      if (isVisibleRef.current && document.visibilityState === "visible" && ctx) {
        ctx.clearRect(0, 0, width, height);
        const centerX = width / 2;
        const centerY = height / 2;

        const currentBaseRadius = Math.min(width, height) * 0.41;

        particles.forEach((p) => {
          p.angle += p.speed;
          p.pulsePhase += delta * 1.5;

          const dynamicAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulsePhase));
          const px = centerX + Math.cos(p.angle) * (currentBaseRadius + (p.radius - baseRadius));
          const py = centerY + Math.sin(p.angle) * (currentBaseRadius * 0.94 + (p.radius - baseRadius));

          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, dynamicAlpha));
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        });
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`${styles.portalContainer} ${isPaused ? styles.isPaused : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <div ref={tiltRef} className={styles.tiltWrapper}>
        {/* Background Atmospheric Radiant Aura */}
        <div className={styles.ambientGlow} />

        {/* Lower Solar Horizon Glow */}
        <div className={styles.solarAura} />

        {/* Concentric Astronomical Alignment Rings */}
        <svg
          className={styles.orbitalSvg}
          viewBox="0 0 480 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer dashed instrument ring (counter-clockwise 45s) */}
          <circle
            className={styles.outerOrbit}
            cx="240"
            cy="240"
            r="230"
            stroke="rgba(143, 217, 255, 0.16)"
            strokeWidth="1"
            strokeDasharray="4 12"
          />
          {/* Subtle tick markers at quarter coordinates */}
          <line x1="240" y1="6" x2="240" y2="14" stroke="rgba(143, 217, 255, 0.4)" strokeWidth="1.5" />
          <line x1="240" y1="466" x2="240" y2="474" stroke="rgba(143, 217, 255, 0.4)" strokeWidth="1.5" />
          <line x1="6" y1="240" x2="14" y2="240" stroke="rgba(143, 217, 255, 0.4)" strokeWidth="1.5" />
          <line x1="466" y1="240" x2="474" y2="240" stroke="rgba(143, 217, 255, 0.4)" strokeWidth="1.5" />

          {/* Secondary solar orbit (clockwise 60s) */}
          <circle
            className={styles.innerOrbit}
            cx="240"
            cy="240"
            r="215"
            stroke="rgba(255, 177, 92, 0.14)"
            strokeWidth="1"
            strokeDasharray="2 16"
          />

          {/* Inner vortex depth ring (counter-clockwise 24s) */}
          <circle
            className={styles.vortexOrbit}
            cx="240"
            cy="240"
            r="130"
            stroke="rgba(143, 217, 255, 0.22)"
            strokeWidth="1"
            strokeDasharray="3 18"
          />
        </svg>

        {/* Feathered Luminous Portal Ring Frame (Clockwise 30s) */}
        <div className={styles.portalRingFrame}>
          <Image
            src="/images/cosmic/02-portal-ring.jpg"
            alt="Cosmic Portal Ring"
            fill
            sizes="(max-width: 768px) 300px, (max-width: 1200px) 420px, 480px"
            priority
            loading="eager"
            className={styles.portalImage}
          />
        </div>

        {/* Interactive Stardust Particle Overlay */}
        {!reducedMotion && <canvas ref={canvasRef} className={styles.canvasOverlay} />}
      </div>
    </div>
  );
}
