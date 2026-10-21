"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// ── Soft Radial Particle Sprite Texture ─────────────────────────────
function createSoftParticleTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.22, "rgba(240, 230, 255, 0.90)");
    gradient.addColorStop(0.50, "rgba(192, 132, 252, 0.40)");
    gradient.addColorStop(0.78, "rgba(45, 212, 191, 0.12)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ── Background Atmosphere Plane (Soft Cinematic Deep Space) ─────────
// Replaces all previous liquid-marble shaders with a deep, spatial void
// featuring subtle atmospheric aurora glow that shifts gently with camera elevation.
const atmosphereVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

const atmosphereFragmentShader = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_scroll;

  varying vec2 vUv;

  void main() {
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    vec2 uv = (vUv - 0.5) * aspect;

    float t = u_time * 0.18;
    vec2 mouseOffset = u_mouse * 0.08;

    // Palette Colors (Strictly Non-Marble, Spatial Deep Tone)
    vec3 cVoid    = vec3(0.020, 0.024, 0.043); // #05060B Near-black base
    vec3 cNavy    = vec3(0.039, 0.063, 0.125); // #0A1020 Deep midnight navy
    vec3 cViolet  = vec3(0.545, 0.361, 0.965); // #8B5CF6 Electric violet
    vec3 cOrchid  = vec3(0.753, 0.518, 0.988); // #C084FC Soft orchid
    vec3 cTeal    = vec3(0.176, 0.831, 0.749); // #2DD4BF Teal
    vec3 cCyan    = vec3(0.404, 0.910, 0.976); // #67E8F9 Cyan
    vec3 cAmber   = vec3(0.961, 0.620, 0.043); // #F59E0B Warm amber

    // Soft celestial atmospheric clouds (gentle Gaussian drift)
    float cloud1 = exp(-length(uv - vec2(0.55 + mouseOffset.x, 0.35 + sin(t * 0.4) * 0.15)) * 1.6);
    float cloud2 = exp(-length(uv - vec2(-0.45 - mouseOffset.x, -0.30 + cos(t * 0.35) * 0.15)) * 1.8);
    float cloud3 = exp(-length(uv - vec2(0.20, -0.55 + sin(t * 0.5) * 0.12)) * 2.2);

    // Section progression modulation
    float pWarm = smoothstep(0.15, 0.38, u_scroll) * (1.0 - smoothstep(0.42, 0.65, u_scroll));
    float pTeal = smoothstep(0.35, 0.55, u_scroll) * (1.0 - smoothstep(0.68, 0.85, u_scroll));
    float pAmber = smoothstep(0.75, 1.0, u_scroll);

    vec3 col = cVoid;
    col += cNavy * 0.50;
    col += mix(cViolet, cOrchid, 0.5 + 0.5 * sin(t)) * (cloud1 * 0.36);
    col += mix(cTeal, cCyan, pTeal) * (cloud2 * 0.30);
    col += cAmber * (cloud3 * (0.15 + 0.35 * (pWarm + pAmber)));

    // Center-left text protection vignette
    float centerDist = length((vUv - vec2(0.38, 0.50)) * vec2(1.2, 1.0));
    float textProtection = smoothstep(0.15, 0.88, centerDist);
    col *= (0.45 + 0.65 * textProtection);

    col = clamp(col, 0.0, 0.85);
    gl_FragColor = vec4(col, 1.0);
  }
`;

// ── Node & Link Data Structures ─────────────────────────────────────
interface NetworkNode {
  pos: THREE.Vector3;
  color: THREE.Color;
  size: number;
}

interface NetworkPulse {
  startNode: number;
  endNode: number;
  progress: number;
  speed: number;
  color: THREE.Color;
  size: number;
  mesh: THREE.Mesh;
}

export function CosmicCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility: respects prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = mountRef.current;
    if (!container) return;

    // 2. Safe WebGL Context Detection
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 3. Three.js Scene, Fog & Perspective Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060b, 0.0011);

    const camera = new THREE.PerspectiveCamera(52, width / height, 1, 1800);
    camera.position.set(0, 30, 460);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x05060b, 0);

    container.appendChild(renderer.domElement);

    // 4. Background Cinematic Atmosphere Quad
    const atmosphereGeo = new THREE.PlaneGeometry(2, 2);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_scroll: { value: 0 },
      },
      depthWrite: false,
      depthTest: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // 5. EDOLUS 3D Network Environment
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Color definitions
    const colViolet = new THREE.Color(0x8b5cf6);
    const colOrchid = new THREE.Color(0xc084fc);
    const colTeal = new THREE.Color(0x2dd4bf);
    const colCyan = new THREE.Color(0x67e8f9);
    const colAmber = new THREE.Color(0xf59e0b);

    // A. 3D Spatial Nodes distributed along the vertical chapter trajectory
    // Y spans from +80 (Home) down to -560 (Connect)
    const rawNodePositions: [number, number, number, THREE.Color, number][] = [
      // Zone 0: HOME Lattice (y: +80 to -40)
      [0, 20, 0, colViolet, 3.8],
      [-75, 55, 30, colOrchid, 2.6],
      [85, 40, -25, colTeal, 2.8],
      [-50, -30, 40, colCyan, 2.4],
      [65, -25, 20, colViolet, 2.8],
      [110, 80, -40, colAmber, 2.2],
      [-110, 70, -30, colTeal, 2.0],

      // Zone 1: JOURNEY Cloud (y: -70 to -180)
      [30, -90, 25, colViolet, 3.2],
      [-40, -125, -20, colOrchid, 2.8],
      [70, -145, 35, colAmber, 3.0],
      [10, -170, -10, colOrchid, 2.6],
      [-85, -160, 20, colTeal, 2.4],
      [95, -110, -35, colViolet, 2.2],

      // Zone 2: SYSTEMS Matrix (y: -210 to -320)
      [-50, -230, -10, colTeal, 3.6],
      [45, -245, 20, colCyan, 3.2],
      [-30, -280, 30, colTeal, 2.8],
      [60, -290, -25, colCyan, 2.8],
      [-80, -310, 15, colViolet, 2.5],
      [90, -270, 35, colTeal, 2.4],
      [0, -260, -40, colAmber, 2.6],

      // Zone 3: WORK Architectural Lattice (y: -350 to -450)
      [75, -370, 15, colViolet, 3.4],
      [-60, -390, -25, colCyan, 3.0],
      [95, -415, 30, colOrchid, 2.8],
      [40, -430, -20, colTeal, 2.6],
      [-80, -440, 25, colAmber, 2.5],
      [115, -400, -35, colViolet, 2.2],

      // Zone 4: CONNECT Horizon (y: -480 to -560)
      [0, -505, -15, colAmber, 3.8],
      [-55, -525, 25, colOrchid, 2.8],
      [65, -535, 10, colAmber, 3.0],
      [-30, -555, -20, colViolet, 2.4],
      [40, -565, 30, colTeal, 2.4],
      [85, -515, -30, colOrchid, 2.2],
    ];

    const nodes: NetworkNode[] = rawNodePositions.map((n) => ({
      pos: new THREE.Vector3(n[0], n[1], n[2]),
      color: n[3],
      size: n[4],
    }));

    // B. Build Network Connection Lines between Nearby Nodes
    const lineIndices: [number, number][] = [];
    const maxLinkDistance = 125;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < maxLinkDistance) {
          lineIndices.push([i, j]);
        }
      }
    }

    const linePositions = new Float32Array(lineIndices.length * 6);
    const lineColors = new Float32Array(lineIndices.length * 6);

    lineIndices.forEach(([i, j], idx) => {
      const p1 = nodes[i].pos;
      const p2 = nodes[j].pos;
      const c1 = nodes[i].color;
      const c2 = nodes[j].color;

      linePositions[idx * 6] = p1.x;
      linePositions[idx * 6 + 1] = p1.y;
      linePositions[idx * 6 + 2] = p1.z;
      linePositions[idx * 6 + 3] = p2.x;
      linePositions[idx * 6 + 4] = p2.y;
      linePositions[idx * 6 + 5] = p2.z;

      lineColors[idx * 6] = c1.r;
      lineColors[idx * 6 + 1] = c1.g;
      lineColors[idx * 6 + 2] = c1.b;
      lineColors[idx * 6 + 3] = c2.r;
      lineColors[idx * 6 + 4] = c2.g;
      lineColors[idx * 6 + 5] = c2.b;
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(networkLines);

    // C. Glowing Node Spheres (Instanced for high performance)
    const nodeGeometry = new THREE.SphereGeometry(1, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const nodeInstanced = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodes.length);
    const dummy = new THREE.Object3D();

    nodes.forEach((node, i) => {
      dummy.position.copy(node.pos);
      dummy.scale.set(node.size, node.size, node.size);
      dummy.updateMatrix();
      nodeInstanced.setMatrixAt(i, dummy.matrix);
      nodeInstanced.setColorAt(i, node.color);
    });
    nodeInstanced.instanceMatrix.needsUpdate = true;
    if (nodeInstanced.instanceColor) nodeInstanced.instanceColor.needsUpdate = true;
    networkGroup.add(nodeInstanced);

    // D. Data Pulses: Light beads traveling along network connections
    const pulseCount = Math.min(22, lineIndices.length);
    const pulses: NetworkPulse[] = [];
    const pulseGeo = new THREE.SphereGeometry(2.4, 10, 10);

    for (let p = 0; p < pulseCount; p++) {
      const link = lineIndices[(p * 3) % lineIndices.length];
      const startNode = link[0];
      const endNode = link[1];
      const col = nodes[startNode].color;

      const pMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.90,
        blending: THREE.AdditiveBlending,
      });

      const pMesh = new THREE.Mesh(pulseGeo, pMat);
      pMesh.position.copy(nodes[startNode].pos);
      networkGroup.add(pMesh);

      pulses.push({
        startNode,
        endNode,
        progress: (p / pulseCount),
        speed: 0.006 + (p % 5) * 0.002,
        color: col,
        size: 2.4,
        mesh: pMesh,
      });
    }

    // 6. EDOLUS Orbital Geometric Structures (Layered 3D Depth)
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    // Object A: Home Crystalline Orbital Complex at (0, 15, 0)
    const homeRingGeo1 = new THREE.RingGeometry(110, 111.8, 64);
    const homeRingMat1 = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const homeRing1 = new THREE.Mesh(homeRingGeo1, homeRingMat1);
    homeRing1.position.set(0, 15, 0);
    homeRing1.rotation.x = Math.PI / 2.8;
    orbitalGroup.add(homeRing1);

    const homeRingGeo2 = new THREE.RingGeometry(85, 86.6, 64);
    const homeRingMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const homeRing2 = new THREE.Mesh(homeRingGeo2, homeRingMat2);
    homeRing2.position.set(0, 15, 0);
    homeRing2.rotation.y = Math.PI / 3.4;
    orbitalGroup.add(homeRing2);

    const homeCoreGeo = new THREE.IcosahedronGeometry(26, 0);
    const homeCoreMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const homeCore = new THREE.Mesh(homeCoreGeo, homeCoreMat);
    homeCore.position.set(0, 15, 0);
    orbitalGroup.add(homeCore);

    // Object B: Systems Crystalline Matrix at (-45, -255, -15)
    const systemsPolyGeo = new THREE.OctahedronGeometry(36, 0);
    const systemsPolyMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });
    const systemsPoly = new THREE.Mesh(systemsPolyGeo, systemsPolyMat);
    systemsPoly.position.set(-45, -255, -15);
    orbitalGroup.add(systemsPoly);

    const systemsOuterGeo = new THREE.DodecahedronGeometry(58, 0);
    const systemsOuterMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const systemsOuter = new THREE.Mesh(systemsOuterGeo, systemsOuterMat);
    systemsOuter.position.set(-45, -255, -15);
    orbitalGroup.add(systemsOuter);

    // Object C: Work Architectural Horizon at (80, -395, 10)
    const workRingGeo = new THREE.RingGeometry(95, 96.5, 64);
    const workRingMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.20,
      blending: THREE.AdditiveBlending,
    });
    const workRing = new THREE.Mesh(workRingGeo, workRingMat);
    workRing.position.set(80, -395, 10);
    workRing.rotation.x = Math.PI / 3.0;
    workRing.rotation.y = Math.PI / 6.0;
    orbitalGroup.add(workRing);

    // Object D: Connect Serene Horizon Ring at (0, -520, -25)
    const connectRingGeo = new THREE.RingGeometry(140, 141.5, 64);
    const connectRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const connectRing = new THREE.Mesh(connectRingGeo, connectRingMat);
    connectRing.position.set(0, -520, -25);
    connectRing.rotation.x = Math.PI / 2.4;
    orbitalGroup.add(connectRing);

    // 7. Spatial Particles (Prismatic Depth Clouds)
    const particleTexture = createSoftParticleTexture();

    const createDustField = (
      count: number,
      size: number,
      opacity: number,
      zRange: [number, number],
      colors: THREE.Color[]
    ) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const vel = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 850;
        pos[i * 3 + 1] = 120 - Math.random() * 740; // Spans full y trajectory
        pos[i * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0]);

        vel[i * 3] = (Math.random() - 0.5) * 0.14;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.10;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.08;

        const c = colors[i % colors.length];
        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);
      return { points, velocities: vel, count };
    };

    const dustField = createDustField(
      150,
      2.4,
      0.65,
      [-220, 160],
      [colViolet, colOrchid, colTeal, colCyan, colAmber]
    );

    // 8. EDOLUS Camera Trajectory Spline (Scroll-Driven Journey)
    // 5 Stations corresponding to: Home, Journey, Systems, Work, Connect
    const cameraKeypoints = [
      { t: 0.00, pos: new THREE.Vector3(0, 30, 460), target: new THREE.Vector3(0, 15, 0) },
      { t: 0.25, pos: new THREE.Vector3(45, -110, 320), target: new THREE.Vector3(15, -125, -10) },
      { t: 0.50, pos: new THREE.Vector3(-75, -250, 275), target: new THREE.Vector3(-15, -260, -25) },
      { t: 0.75, pos: new THREE.Vector3(95, -390, 340), target: new THREE.Vector3(-20, -400, -15) },
      { t: 1.00, pos: new THREE.Vector3(0, -515, 430), target: new THREE.Vector3(0, -525, 0) },
    ];

    // Helper: Interpolate camera station along trajectory
    const currentCameraPos = new THREE.Vector3(0, 30, 460);
    const currentCameraTarget = new THREE.Vector3(0, 15, 0);
    const targetCameraPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    function evaluateCameraPath(scrollNorm: number) {
      const s = Math.min(1.0, Math.max(0.0, scrollNorm));
      // Locate interval
      let idx = 0;
      for (let i = 0; i < cameraKeypoints.length - 1; i++) {
        if (s >= cameraKeypoints[i].t && s <= cameraKeypoints[i + 1].t) {
          idx = i;
          break;
        }
      }
      const k1 = cameraKeypoints[idx];
      const k2 = cameraKeypoints[idx + 1];
      const span = k2.t - k1.t;
      const alpha = span > 0 ? (s - k1.t) / span : 0;
      // Smooth cubic easing between keyframes
      const easeAlpha = alpha * alpha * (3 - 2 * alpha);

      targetCameraPos.lerpVectors(k1.pos, k2.pos, easeAlpha);
      targetLookAt.lerpVectors(k1.target, k2.target, easeAlpha);
    }

    // 9. Interaction & Scroll Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetScroll = 0;
    let currentScroll = 0;
    let isTouch = false;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        isTouch = true;
        return;
      }
      isTouch = false;
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      targetX = (e.clientX - halfWidth) * 0.055;
      targetY = (e.clientY - halfHeight) * 0.055;
    };

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScroll = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Resize Handler
    const onResize = () => {
      if (!renderer || !camera) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      atmosphereMat.uniforms.u_resolution.value.set(width, height);
      onScroll();
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Tab Visibility
    let isTabVisible = true;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // 10. Continuous Dynamic Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Damped pointer offset
      const lerpSpeed = 0.045;
      currentX += (targetX - currentX) * lerpSpeed;
      currentY += (targetY - currentY) * lerpSpeed;

      // Damped scroll progression
      currentScroll += (targetScroll - currentScroll) * 0.048;

      // Autonomous breathing wave (keeps scene alive when idle or on mobile)
      const autoWaveX = Math.sin(elapsedTime * 0.32) * 7.5;
      const autoWaveY = Math.cos(elapsedTime * 0.26) * 5.5;

      const effectiveX = (isTouch ? 0 : currentX) + autoWaveX;
      const effectiveY = (isTouch ? 0 : currentY) + autoWaveY;

      // A. Evaluate & Interpolate EDOLUS Scroll Camera Journey
      evaluateCameraPath(currentScroll);

      // Add gentle pointer parallax offset to camera position
      targetCameraPos.x += effectiveX * 0.22;
      targetCameraPos.y += -effectiveY * 0.22;

      currentCameraPos.lerp(targetCameraPos, 0.05);
      currentCameraTarget.lerp(targetLookAt, 0.05);

      camera.position.copy(currentCameraPos);
      camera.lookAt(currentCameraTarget);

      // B. Update Atmosphere Shader Uniforms
      atmosphereMat.uniforms.u_time.value = elapsedTime;
      atmosphereMat.uniforms.u_scroll.value = currentScroll;
      atmosphereMat.uniforms.u_mouse.value.set(
        effectiveX / (width * 0.5),
        effectiveY / (height * 0.5)
      );

      // C. Continuous Autonomous Rotation of Geometric Orbital Structures
      homeRing1.rotation.z = elapsedTime * 0.045;
      homeRing2.rotation.x = elapsedTime * -0.055;
      homeCore.rotation.x = elapsedTime * 0.08;
      homeCore.rotation.y = elapsedTime * 0.12;

      systemsPoly.rotation.x = elapsedTime * 0.10;
      systemsPoly.rotation.z = elapsedTime * -0.08;
      systemsOuter.rotation.y = elapsedTime * 0.04;

      workRing.rotation.z = elapsedTime * 0.035;
      connectRing.rotation.z = elapsedTime * -0.025;

      // D. Update Network Pulses (Moving data packets along connections)
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1.0) {
          pulse.progress = 0;
        }

        const p1 = nodes[pulse.startNode].pos;
        const p2 = nodes[pulse.endNode].pos;
        pulse.mesh.position.lerpVectors(p1, p2, pulse.progress);

        // Pulse intensity breathes at ends
        const edgeFade = Math.sin(pulse.progress * Math.PI);
        (pulse.mesh.material as THREE.MeshBasicMaterial).opacity = 0.35 + 0.65 * edgeFade;
      });

      // E. Update Spatial Dust Drift & Boundary Wrap
      const dustPos = dustField.points.geometry.attributes.position.array as Float32Array;
      const vel = dustField.velocities;
      for (let i = 0; i < dustField.count; i++) {
        dustPos[i * 3] += vel[i * 3];
        dustPos[i * 3 + 1] += vel[i * 3 + 1];
        dustPos[i * 3 + 2] += vel[i * 3 + 2];

        if (dustPos[i * 3] < -440) dustPos[i * 3] = 440;
        if (dustPos[i * 3] > 440) dustPos[i * 3] = -440;
        if (dustPos[i * 3 + 1] > 140) dustPos[i * 3 + 1] = -580;
        if (dustPos[i * 3 + 1] < -580) dustPos[i * 3 + 1] = 140;
      }
      dustField.points.geometry.attributes.position.needsUpdate = true;

      // Gentle network breathing scale
      const networkScale = 1.0 + Math.sin(elapsedTime * 0.4) * 0.015;
      networkGroup.scale.set(networkScale, networkScale, networkScale);

      renderer.render(scene, camera);
    };

    animate();

    // 11. Clean Teardown & Resource Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      // Dispose Atmosphere
      atmosphereGeo.dispose();
      atmosphereMat.dispose();

      // Dispose Network
      lineGeometry.dispose();
      lineMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      nodeInstanced.dispose();

      // Dispose Pulses
      pulseGeo.dispose();
      pulses.forEach((p) => {
        (p.mesh.material as THREE.Material).dispose();
      });

      // Dispose Orbitals
      homeRingGeo1.dispose();
      homeRingMat1.dispose();
      homeRingGeo2.dispose();
      homeRingMat2.dispose();
      homeCoreGeo.dispose();
      homeCoreMat.dispose();

      systemsPolyGeo.dispose();
      systemsPolyMat.dispose();
      systemsOuterGeo.dispose();
      systemsOuterMat.dispose();

      workRingGeo.dispose();
      workRingMat.dispose();
      connectRingGeo.dispose();
      connectRingMat.dispose();

      // Dispose Particles
      particleTexture.dispose();
      dustField.points.geometry.dispose();
      (dustField.points.material as THREE.Material).dispose();

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
      {/* Background static fallback (guarantees instant paint, non-blue) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 45% at 65% -15%, rgba(139, 92, 246, 0.12), transparent 70%), radial-gradient(ellipse 60% 40% at 85% 65%, rgba(45, 212, 191, 0.08), transparent 70%), #05060B",
          zIndex: -2,
        }}
      />
    </div>
  );
}
