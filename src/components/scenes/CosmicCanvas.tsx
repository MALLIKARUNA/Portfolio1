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
    gradient.addColorStop(0.22, "rgba(235, 248, 255, 0.90)");
    gradient.addColorStop(0.50, "rgba(112, 214, 255, 0.45)");
    gradient.addColorStop(0.78, "rgba(30, 79, 255, 0.12)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ── Layer A: Procedural Fluid Field with Flowing Light Bands ────────
const fluidVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

const fluidFragmentShader = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_scroll;
  uniform float u_intensity;

  varying vec2 vUv;

  // 2D Simplex Noise for organic fluid undulations
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    vec2 uv = (vUv - 0.5) * aspect;

    // Dynamic, visibly evolving cosmic time
    float t = u_time * 0.22;
    vec2 mouseOffset = u_mouse * 0.14;

    // Deep Obsidian Base #020408
    vec3 cVoid   = vec3(0.008, 0.015, 0.030);
    vec3 cNavy   = vec3(0.024, 0.060, 0.140); // Deep rich navy #060F24
    vec3 cCobalt = vec3(0.120, 0.310, 1.000); // Luminous cobalt #1E4FFF
    vec3 cCyan   = vec3(0.440, 0.840, 1.000); // Electric cyan #70D6FF
    vec3 cViolet = vec3(0.510, 0.430, 1.000); // Cosmic violet #836FFF
    vec3 cWarm   = vec3(1.000, 0.690, 0.370); // Warm solar ember #FFB060

    // Domain Warping: continuous, living fluid current
    vec2 q = vec2(
      snoise(uv * 0.72 + vec2(0.0, t * 0.42)),
      snoise(uv * 0.72 + vec2(4.8, -t * 0.36))
    );

    vec2 r = vec2(
      snoise(uv * 0.92 + 1.9 * q + vec2(1.7, 9.2) + mouseOffset + t * 0.30),
      snoise(uv * 0.92 + 1.9 * q + vec2(8.3, 2.8) - mouseOffset + t * 0.26)
    );

    float f = snoise(uv * 0.82 + 2.1 * r);

    // Flowing Energy Light Bands (visibly traveling waves across the field)
    float wave1 = sin(f * 3.8 + t * 1.4 + uv.x * 1.8 - uv.y * 1.2);
    float bands1 = pow(0.5 + 0.5 * wave1, 3.2);

    float wave2 = cos(f * 3.0 - t * 1.1 - uv.x * 1.4 + uv.y * 1.6);
    float bands2 = pow(0.5 + 0.5 * wave2, 2.8);

    // Interactive pointer luminescence pool (Eddy Naboulet-inspired)
    vec2 mousePos = u_mouse * 0.48;
    float mouseDist = length(uv - mousePos);
    float mouseGlow = exp(-mouseDist * mouseDist * 5.0) * 0.28;

    // Section-aware color weighting across chapters (MORPHO-inspired)
    // 0.0 = Home, 0.25 = Journey, 0.5 = Systems, 0.75 = Work, 1.0 = Connect
    float wViolet = smoothstep(0.08, 0.35, u_scroll) * (1.0 - smoothstep(0.48, 0.78, u_scroll));
    float wCyan   = 0.50 + 0.50 * sin(u_scroll * 3.14159);
    float wWarm   = smoothstep(0.70, 1.0, u_scroll);

    // Composite living atmosphere
    vec3 color = cVoid;
    color += cNavy * (0.35 + 0.45 * (0.5 + 0.5 * f));
    color += mix(cCobalt, cViolet, wViolet * 0.65) * (bands1 * 0.55 + max(0.0, f) * 0.25);
    color += cCyan * (bands2 * 0.42 * wCyan + mouseGlow);
    color += cWarm * (wWarm * bands1 * 0.40);

    // Content Protection & High-Contrast Vignette:
    // Ensures text and portrait pop with absolute clarity against the deep obsidian background
    float centerDist = length((vUv - vec2(0.38, 0.5)) * vec2(1.15, 1.0));
    float textVignette = smoothstep(0.12, 0.88, centerDist);
    color *= (0.50 + 0.65 * textVignette) * u_intensity;

    color = clamp(color, 0.0, 0.85);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ── Layer B: Traveling Energy Ribbon Shaders ─────────────────────────
const ribbonVertexShader = `
  attribute float aProgress;
  attribute float aSide;
  varying float vProgress;
  varying float vSide;

  void main() {
    vProgress = aProgress;
    vSide = aSide;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ribbonFragmentShader = `
  precision highp float;
  varying float vProgress;
  varying float vSide;

  uniform float u_head;
  uniform float u_length;
  uniform vec3 u_colorHead;
  uniform vec3 u_colorTail;
  uniform float u_opacity;

  void main() {
    float dist = u_head - vProgress;
    if (dist < 0.0 || dist > u_length) {
      discard;
    }

    // Longitudinal falloff along the trail (t = 1.0 at head, 0.0 at tail)
    float t = 1.0 - (dist / max(u_length, 0.001));
    float longIntensity = pow(t, 1.8);

    // Transverse falloff across the ribbon width (soft Gaussian beam profile)
    float transIntensity = exp(-vSide * vSide * 3.0);

    // Intense core highlight at leading tip
    float core = smoothstep(0.88, 1.0, t) * exp(-vSide * vSide * 6.5);

    vec3 col = mix(u_colorTail, u_colorHead, pow(t, 1.2));
    col = mix(col, vec3(1.0, 1.0, 1.0), core * 0.90);

    float alpha = (longIntensity * transIntensity + core * 0.6) * u_opacity;
    gl_FragColor = vec4(col, alpha);
  }
`;

// ── Helper: Build 3D Tapered Ribbon Mesh along Catmull-Rom Curve ────
function createRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  samples: number,
  baseWidth: number
): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  const pts = curve.getPoints(samples);
  const numVerts = (samples + 1) * 2;
  const positions = new Float32Array(numVerts * 3);
  const progress = new Float32Array(numVerts);
  const sides = new Float32Array(numVerts);
  const indices: number[] = [];

  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const pt = pts[i];
    const tangent = curve.getTangent(t);
    const normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
    if (normal.lengthSq() < 0.001) normal.set(0, 1, 0);

    // Aerodynamic comet taper: fuller in the mid-body, slender at edges
    const widthFactor = 0.35 + 0.65 * Math.sin(t * Math.PI);
    const currentWidth = baseWidth * widthFactor;

    const left = pt.clone().addScaledVector(normal, -currentWidth * 0.5);
    const right = pt.clone().addScaledVector(normal, currentWidth * 0.5);

    const v = i * 2;
    positions[v * 3] = left.x;
    positions[v * 3 + 1] = left.y;
    positions[v * 3 + 2] = left.z;
    progress[v] = t;
    sides[v] = -1.0;

    positions[(v + 1) * 3] = right.x;
    positions[(v + 1) * 3 + 1] = right.y;
    positions[(v + 1) * 3 + 2] = right.z;
    progress[v + 1] = t;
    sides[v + 1] = 1.0;

    if (i < samples) {
      indices.push(v, v + 1, v + 2);
      indices.push(v + 1, v + 3, v + 2);
    }
  }

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aProgress", new THREE.BufferAttribute(progress, 1));
  geo.setAttribute("aSide", new THREE.BufferAttribute(sides, 1));
  geo.setIndex(indices);
  return geo;
}

interface RibbonState {
  curve: THREE.CatmullRomCurve3;
  mesh: THREE.Mesh;
  headGlow: THREE.Mesh;
  material: THREE.ShaderMaterial;
  head: number;
  speed: number;
  length: number;
  waitTimer: number;
  waitDuration: number;
  opacity: number;
}

interface ParticleLayer {
  points: THREE.Points;
  velocities: Float32Array;
  count: number;
  depthZ: number;
  parallaxScale: number;
}

export function CosmicCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility: prefers-reduced-motion check
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

    // 3. Three.js Scene & Perspective Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020408, 0.0014);

    const camera = new THREE.PerspectiveCamera(52, width / height, 1, 1600);
    camera.position.set(0, 0, 420);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x020408, 0);

    container.appendChild(renderer.domElement);

    // 4. Layer A: Procedural Fluid Light Field Plane
    const fluidGeometry = new THREE.PlaneGeometry(2, 2);
    const fluidMaterial = new THREE.ShaderMaterial({
      vertexShader: fluidVertexShader,
      fragmentShader: fluidFragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_scroll: { value: 0 },
        u_intensity: { value: 0.90 },
      },
      depthWrite: false,
      depthTest: false,
    });
    const fluidMesh = new THREE.Mesh(fluidGeometry, fluidMaterial);
    scene.add(fluidMesh);

    // 5. Layer B: Traveling Energy Ribbons (Visible Within Seconds)
    const ribbonsGroup = new THREE.Group();
    scene.add(ribbonsGroup);

    // 3 sweeping 3D curves positioned within the active viewport
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-240, 75, -20),
      new THREE.Vector3(-80, 110, 30),
      new THREE.Vector3(80, 65, 10),
      new THREE.Vector3(240, 95, -30),
    ]);

    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(120, 130, -10),
      new THREE.Vector3(210, 20, 35),
      new THREE.Vector3(175, -75, 20),
      new THREE.Vector3(75, -135, -25),
    ]);

    const curve3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-230, -85, -10),
      new THREE.Vector3(-75, -125, 25),
      new THREE.Vector3(75, -65, 10),
      new THREE.Vector3(230, -105, -20),
    ]);

    const ribbonConfigs = [
      {
        curve: curve1,
        width: 28,
        headColor: new THREE.Vector3(0.50, 0.88, 1.0), // Electric Cyan
        tailColor: new THREE.Vector3(0.12, 0.31, 1.0), // Cobalt Blue
        speed: 0.0065,
        length: 0.32,
        initialHead: 0.15, // ALREADY VISIBLY TRAVELING ON PAGE LOAD
        initialDelay: 0,
        repeatDelay: 120, // 2s rest between glides
        opacity: 0.92,
      },
      {
        curve: curve2,
        width: 24,
        headColor: new THREE.Vector3(0.65, 0.88, 1.0), // Ice Cyan
        tailColor: new THREE.Vector3(0.51, 0.43, 1.0), // Cosmic Violet
        speed: 0.0058,
        length: 0.28,
        initialHead: -0.20,
        initialDelay: 75, // starts ~1.2s in
        repeatDelay: 150, // 2.5s rest
        opacity: 0.88,
      },
      {
        curve: curve3,
        width: 30,
        headColor: new THREE.Vector3(0.18, 0.45, 1.0), // Cobalt
        tailColor: new THREE.Vector3(0.08, 0.16, 0.38), // Deep Indigo
        speed: 0.0052,
        length: 0.35,
        initialHead: -0.30,
        initialDelay: 150, // starts ~2.5s in
        repeatDelay: 180, // 3s rest
        opacity: 0.82,
      },
    ];

    const ribbonStates: RibbonState[] = [];
    const headGlowGeo = new THREE.SphereGeometry(4.2, 12, 12);

    ribbonConfigs.forEach((cfg) => {
      const geo = createRibbonGeometry(cfg.curve, 110, cfg.width);
      const mat = new THREE.ShaderMaterial({
        vertexShader: ribbonVertexShader,
        fragmentShader: ribbonFragmentShader,
        uniforms: {
          u_head: { value: cfg.initialHead },
          u_length: { value: cfg.length },
          u_colorHead: { value: cfg.headColor },
          u_colorTail: { value: cfg.tailColor },
          u_opacity: { value: cfg.opacity },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);
      ribbonsGroup.add(mesh);

      const headMat = new THREE.MeshBasicMaterial({
        color: 0x8fd9ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const headGlow = new THREE.Mesh(headGlowGeo, headMat);
      ribbonsGroup.add(headGlow);

      ribbonStates.push({
        curve: cfg.curve,
        mesh,
        headGlow,
        material: mat,
        head: cfg.initialHead,
        speed: cfg.speed,
        length: cfg.length,
        waitTimer: cfg.initialDelay,
        waitDuration: cfg.repeatDelay,
        opacity: cfg.opacity,
      });
    });

    // 6. Layer C: Depth Particles with Independent 3D Drift Vectors
    const particleTexture = createSoftParticleTexture();

    const createParticleLayer = (
      count: number,
      size: number,
      opacity: number,
      zRange: [number, number],
      speedScale: number,
      parallaxScale: number,
      colors: THREE.Color[]
    ): ParticleLayer => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const vel = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 850;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 750;
        pos[i * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0]);

        vel[i * 3] = (Math.random() - 0.5) * 0.14 * speedScale;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.12 * speedScale;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.08 * speedScale;

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

      return { points, velocities: vel, count, depthZ: (zRange[0] + zRange[1]) / 2, parallaxScale };
    };

    const particleLayers: ParticleLayer[] = [
      // Layer 1: Distant stardust (180 particles)
      createParticleLayer(
        180,
        1.5,
        0.35,
        [-400, -160],
        0.6,
        0.04,
        [new THREE.Color(0x1e4fff), new THREE.Color(0x836fff), new THREE.Color(0xf5f3ef)]
      ),
      // Layer 2: Midground ambient motes (110 particles)
      createParticleLayer(
        110,
        2.8,
        0.65,
        [-150, 60],
        1.0,
        0.08,
        [new THREE.Color(0x70d6ff), new THREE.Color(0x1e4fff), new THREE.Color(0xf5f3ef)]
      ),
      // Layer 3: Foreground curated floating motes (30 particles)
      createParticleLayer(
        30,
        5.0,
        0.85,
        [70, 220],
        1.5,
        0.18,
        [new THREE.Color(0x70d6ff), new THREE.Color(0xffb060), new THREE.Color(0xffffff)]
      ),
    ];

    // 7. Faint Celestial Ambient Horizon Ring
    const ringGeometry = new THREE.RingGeometry(220, 221.8, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e4fff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    const ambientRing = new THREE.Mesh(ringGeometry, ringMaterial);
    ambientRing.position.set(140, -60, -200);
    ambientRing.rotation.x = Math.PI / 3.2;
    ambientRing.rotation.y = Math.PI / 8;
    scene.add(ambientRing);

    // 8. Layer D: Subtle Pointer Parallax & Scroll-Aware State Tracking
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
      targetX = (e.clientX - halfWidth) * 0.06;
      targetY = (e.clientY - halfHeight) * 0.06;
    };

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScroll = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Window Resize Handler
    const onResize = () => {
      if (!renderer || !camera) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      fluidMaterial.uniforms.u_resolution.value.set(width, height);
      onScroll();
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Tab Visibility Listener to pause rendering in hidden tabs
    let isTabVisible = true;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // 9. Continuous Dynamic Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer damping (lerp)
      const lerpSpeed = 0.045;
      currentX += (targetX - currentX) * lerpSpeed;
      currentY += (targetY - currentY) * lerpSpeed;

      // Smooth scroll progression interpolation
      currentScroll += (targetScroll - currentScroll) * 0.05;

      // Autonomous breathing wave (ensures fluid organic motion when cursor is still or on touch)
      const autoWaveX = Math.sin(elapsedTime * 0.35) * 8.5;
      const autoWaveY = Math.cos(elapsedTime * 0.28) * 6.5;

      const effectiveX = (isTouch ? 0 : currentX) + autoWaveX;
      const effectiveY = (isTouch ? 0 : currentY) + autoWaveY;

      // A. Section-Aware Camera Spatial Drift (MORPHO-inspired)
      camera.position.x = effectiveX * 0.18;
      camera.position.y = -currentScroll * 150.0 - effectiveY * 0.18;
      camera.position.z = 420.0 + Math.sin(currentScroll * Math.PI) * 35.0;
      camera.lookAt(0, -currentScroll * 150.0, 0);

      // B. Update Procedural Fluid Light Uniforms
      fluidMaterial.uniforms.u_time.value = elapsedTime;
      fluidMaterial.uniforms.u_scroll.value = currentScroll;
      fluidMaterial.uniforms.u_mouse.value.set(
        effectiveX / (width * 0.5),
        effectiveY / (height * 0.5)
      );

      // C. Update Traveling Energy Ribbons
      ribbonStates.forEach((rb) => {
        if (rb.waitTimer > 0) {
          rb.waitTimer -= 1;
          rb.material.uniforms.u_head.value = -0.35;
          (rb.headGlow.material as THREE.MeshBasicMaterial).opacity = 0;
          return;
        }

        rb.head += rb.speed;
        rb.material.uniforms.u_head.value = rb.head;

        // Position head bead along curve
        if (rb.head >= 0.0 && rb.head <= 1.0) {
          const pt = rb.curve.getPointAt(rb.head);
          rb.headGlow.position.copy(pt);
          const edgeFade = Math.sin(rb.head * Math.PI);
          (rb.headGlow.material as THREE.MeshBasicMaterial).opacity = edgeFade * rb.opacity;
        } else {
          (rb.headGlow.material as THREE.MeshBasicMaterial).opacity = 0;
        }

        // When ribbon completes transit across the curve, enter brief rest interval
        if (rb.head > 1.0 + rb.length) {
          rb.head = -0.35;
          rb.waitTimer = rb.waitDuration + Math.random() * 90;
        }
      });

      ribbonsGroup.position.x = effectiveX * 0.14;
      ribbonsGroup.position.y = -effectiveY * 0.14;

      // D. Update 3D Depth Particles (Individual Drift + Bound Wrap)
      particleLayers.forEach((layer) => {
        const positions = layer.points.geometry.attributes.position.array as Float32Array;
        const vel = layer.velocities;
        for (let i = 0; i < layer.count; i++) {
          positions[i * 3] += vel[i * 3];
          positions[i * 3 + 1] += vel[i * 3 + 1];
          positions[i * 3 + 2] += vel[i * 3 + 2];

          // Wrap 3D bounds smoothly
          if (positions[i * 3] < -450) positions[i * 3] = 450;
          if (positions[i * 3] > 450) positions[i * 3] = -450;
          if (positions[i * 3 + 1] < -420) positions[i * 3] = 420;
          if (positions[i * 3 + 1] > 420) positions[i * 3] = -420;
        }
        layer.points.geometry.attributes.position.needsUpdate = true;

        layer.points.position.x = effectiveX * layer.parallaxScale;
        layer.points.position.y = -effectiveY * layer.parallaxScale;
      });

      // Modulate foreground layer breathing opacity
      const fgMat = particleLayers[2].points.material as THREE.PointsMaterial;
      fgMat.opacity = 0.65 + Math.sin(elapsedTime * 1.6) * 0.20;

      // Ambient celestial ring rotation
      ambientRing.rotation.z = elapsedTime * 0.012;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Clean Teardown & Resource Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      // Dispose Fluid Shader
      fluidGeometry.dispose();
      fluidMaterial.dispose();

      // Dispose Ribbons
      headGlowGeo.dispose();
      ribbonStates.forEach((rb) => {
        rb.mesh.geometry.dispose();
        rb.material.dispose();
        (rb.headGlow.material as THREE.Material).dispose();
      });

      // Dispose Particles
      particleTexture.dispose();
      particleLayers.forEach((layer) => {
        layer.points.geometry.dispose();
        (layer.points.material as THREE.Material).dispose();
      });

      // Dispose Ring & Renderer
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
      {/* Background static cosmic gradient fallback (always available for instantaneous paint) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(30, 79, 255, 0.14), transparent 70%), radial-gradient(ellipse 60% 40% at 90% 60%, rgba(131, 111, 255, 0.08), transparent 70%), #020408",
          zIndex: -2,
        }}
      />
    </div>
  );
}
