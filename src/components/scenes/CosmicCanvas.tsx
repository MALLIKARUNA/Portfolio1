"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function CosmicCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setWebGLSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL capability safely
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070d, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1200
    );
    camera.position.z = 450;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x05070d, 0);

    container.appendChild(renderer.domElement);

    // Particles Geometry
    const particleCount = 950;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x2457ff), // Cobalt Blue
      new THREE.Color(0x8f7cff), // Nebula Violet
      new THREE.Color(0x8fd9ff), // Ice Blue
      new THREE.Color(0xffb15c), // Warm Solar Glow
      new THREE.Color(0xf5f3ef), // Starlight White
    ];

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical / spherical spread across space
      const radius = 200 + Math.random() * 550;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 800;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius - 150;

      // Color variation
      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      scales[i] = Math.random() * 2.5 + 0.8;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Particle Material with Soft Circular Point Shader
    const material = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle celestial ambient ring in distant background
    const ringGeometry = new THREE.RingGeometry(220, 221.8, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x2457ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const ambientRing = new THREE.Mesh(ringGeometry, ringMaterial);
    ambientRing.position.set(120, -60, -200);
    ambientRing.rotation.x = Math.PI / 3.2;
    ambientRing.rotation.y = Math.PI / 8;
    scene.add(ambientRing);

    // Pointer Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      targetX = (e.clientX - halfWidth) * 0.04;
      targetY = (e.clientY - halfHeight) * 0.04;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      if (!renderer || !camera) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Visibility Listener to pause rendering in hidden tabs
    let isTabVisible = true;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Render Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer parallax damping (lerp)
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      // Slow organic rotation of cosmic field
      particles.rotation.y = elapsedTime * 0.02 + currentX * 0.005;
      particles.rotation.x = currentY * 0.005;

      ambientRing.rotation.z = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Clean teardown
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      geometry.dispose();
      material.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Background static cosmic gradient fallback */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(36, 87, 255, 0.12), transparent 70%), radial-gradient(ellipse 60% 40% at 90% 60%, rgba(143, 124, 255, 0.06), transparent 70%), #05070D",
          zIndex: -2,
        }}
      />
    </div>
  );
}
