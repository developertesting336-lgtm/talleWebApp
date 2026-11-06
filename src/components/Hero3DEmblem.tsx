"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3DEmblem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // Knot Group with Subtle 3D Perspective Tilt
    const knotGroup = new THREE.Group();
    const baseRotX = 0.08;
    const baseRotY = -0.10;
    knotGroup.rotation.x = baseRotX;
    knotGroup.rotation.y = baseRotY;
    scene.add(knotGroup);

    // 2. Geometry: Authentic Tallee Logo Blueprint (Extracted from SVG)
    // Blueprint Structure:
    // - Four Outer Loops (North, East, South, West cardinal semicircular loops)
    // - Central Four-Petal Knot (Two diagonal overlapping ellipses at +/-45 deg)
    // - True 3D volumetric tubular sampling with over-under Z-weaving
    const SVG_TO_3D = 0.0076; // Maps 200 SVG radius units to ~1.52 3D world units

    // A. Outer Cardinal Semicircle Loops (Top, Right, Bottom, Left)
    const OUTER_R = 100 * SVG_TO_3D; // ~0.76
    const OUTER_OFFSET = 100 * SVG_TO_3D; // ~0.76
    const POINTS_PER_OUTER_LOOP = 3500;
    const NUM_OUTER_LOOPS = 4;

    // B. Central Four-Petal Knot (Two Diagonal Ellipses)
    const INNER_RX = 58 * SVG_TO_3D; // ~0.441
    const INNER_RY = 135 * SVG_TO_3D; // ~1.026
    const POINTS_PER_INNER_LOOP = 7000;
    const NUM_INNER_LOOPS = 2;

    const TOTAL_POINTS =
      POINTS_PER_OUTER_LOOP * NUM_OUTER_LOOPS +
      POINTS_PER_INNER_LOOP * NUM_INNER_LOOPS; // Exactly 28,000 particles

    // C. 3D Volumetric Depth & Interlocking Weave
    // SVG stroke-width is 24 units; tube radius is ~half-width
    const tubeRadius = (24 / 2) * SVG_TO_3D * 0.65; // ~0.059
    const zAmp = 0.09; // Over-under weave amplitude

    // Physics Buffers: positions, resting origins, velocities, normals, and dynamic displacement
    const positions = new Float32Array(TOTAL_POINTS * 3);
    const origPositions = new Float32Array(TOTAL_POINTS * 3);
    const velocities = new Float32Array(TOTAL_POINTS * 3);
    const normals = new Float32Array(TOTAL_POINTS * 3);
    const displacements = new Float32Array(TOTAL_POINTS);
    const phases = new Float32Array(TOTAL_POINTS);
    const sizes = new Float32Array(TOTAL_POINTS);
    const ringIds = new Float32Array(TOTAL_POINTS);

    const goldenRatio = 1.61803398875;
    let ptr = 0;

    // 1. Sample the 4 Outer Cardinal Semicircles (Top, Right, Bottom, Left)
    // Semicircles correspond to the outer circles masked out in the central 200x200 box
    for (let loop = 0; loop < NUM_OUTER_LOOPS; loop++) {
      // Rotation angle for each cardinal direction:
      // loop 0: Top (0), loop 1: Right (-PI/2), loop 2: Bottom (-PI), loop 3: Left (-3PI/2)
      const rotAngle = -loop * (Math.PI / 2);
      const cosRot = Math.cos(rotAngle);
      const sinRot = Math.sin(rotAngle);

      // Slight angular overshoot (0.05 rad) ensures seamless connection with inner knot tips
      const arcOvershoot = 0.05;

      for (let i = 0; i < POINTS_PER_OUTER_LOOP; i++) {
        const t = i / (POINTS_PER_OUTER_LOOP - 1);
        const theta = -arcOvershoot + t * (Math.PI + 2 * arcOvershoot);
        const phi = (i * goldenRatio * Math.PI * 2) % (Math.PI * 2);
        const rad = tubeRadius * (0.75 + 0.25 * Math.sqrt(Math.random()));

        // Centerline point of unrotated Top semicircle (center at (0, OUTER_OFFSET), radius OUTER_R)
        const cx0 = OUTER_R * Math.cos(theta);
        const cy0 = OUTER_OFFSET + OUTER_R * Math.sin(theta);

        // 2D Normal in XY
        const nx0 = Math.cos(theta);
        const ny0 = Math.sin(theta);

        // Rotate into cardinal position
        const cx = cx0 * cosRot - cy0 * sinRot;
        const cy = cx0 * sinRot + cy0 * cosRot;
        const nx2d = nx0 * cosRot - ny0 * sinRot;
        const ny2d = nx0 * sinRot + ny0 * cosRot;

        // Cross-section tube offset
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        // Subtle alternating Z elevation at corners
        const zWeave = zAmp * 0.3 * Math.sin(2 * theta);

        const px = cx + rad * cosPhi * nx2d;
        const py = cy + rad * cosPhi * ny2d;
        const pz = rad * sinPhi + zWeave;

        const nx = cosPhi * nx2d;
        const ny = cosPhi * ny2d;
        const nz = sinPhi;

        const idx3 = ptr * 3;
        positions[idx3] = px;
        positions[idx3 + 1] = py;
        positions[idx3 + 2] = pz;

        origPositions[idx3] = px;
        origPositions[idx3 + 1] = py;
        origPositions[idx3 + 2] = pz;

        normals[idx3] = nx;
        normals[idx3 + 1] = ny;
        normals[idx3 + 2] = nz;

        phases[ptr] = Math.random() * Math.PI * 2;
        sizes[ptr] = 0.85 + 0.3 * Math.random();
        ringIds[ptr] = loop;

        ptr++;
      }
    }

    // 2. Sample the Central Four-Petal Knot (Two Diagonal Intersecting Ellipses)
    for (let loop = 0; loop < NUM_INNER_LOOPS; loop++) {
      // Loop 0: +45 deg (+PI/4), Loop 1: -45 deg (-PI/4)
      const rotAngle = (loop === 0 ? 1 : -1) * (Math.PI / 4);
      const cosRot = Math.cos(rotAngle);
      const sinRot = Math.sin(rotAngle);

      for (let i = 0; i < POINTS_PER_INNER_LOOP; i++) {
        const theta = (i / POINTS_PER_INNER_LOOP) * Math.PI * 2;
        const phi = (i * goldenRatio * Math.PI * 2) % (Math.PI * 2);
        const rad = tubeRadius * (0.75 + 0.25 * Math.sqrt(Math.random()));

        // Unrotated ellipse point: rx along X, ry along Y
        const ex0 = INNER_RX * Math.cos(theta);
        const ey0 = INNER_RY * Math.sin(theta);

        // Outward 2D normal of unrotated ellipse
        const rawNx = INNER_RY * Math.cos(theta);
        const rawNy = INNER_RX * Math.sin(theta);
        const nLen = Math.sqrt(rawNx * rawNx + rawNy * rawNy) || 1;
        const nx0 = rawNx / nLen;
        const ny0 = rawNy / nLen;

        // Rotate by rotAngle
        const cx = ex0 * cosRot - ey0 * sinRot;
        const cy = ex0 * sinRot + ey0 * cosRot;
        const nx2d = nx0 * cosRot - ny0 * sinRot;
        const ny2d = nx0 * sinRot + ny0 * cosRot;

        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        // True 3D Alternating Over-Under Weave at crossings
        // Loop 0 weaves over at Top/Bottom and under at Left/Right
        // Loop 1 weaves the exact inverse, creating a true interlocking knot
        const zWeave = (loop === 0 ? 1 : -1) * zAmp * Math.sin(2 * theta);

        const px = cx + rad * cosPhi * nx2d;
        const py = cy + rad * cosPhi * ny2d;
        const pz = rad * sinPhi + zWeave;

        const nx = cosPhi * nx2d;
        const ny = cosPhi * ny2d;
        const nz = sinPhi;

        const idx3 = ptr * 3;
        positions[idx3] = px;
        positions[idx3 + 1] = py;
        positions[idx3 + 2] = pz;

        origPositions[idx3] = px;
        origPositions[idx3 + 1] = py;
        origPositions[idx3 + 2] = pz;

        normals[idx3] = nx;
        normals[idx3 + 1] = ny;
        normals[idx3 + 2] = nz;

        phases[ptr] = Math.random() * Math.PI * 2;
        sizes[ptr] = 0.85 + 0.3 * Math.random();
        ringIds[ptr] = 4 + loop;

        ptr++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    const posAttribute = new THREE.BufferAttribute(positions, 3);
    const dispAttribute = new THREE.BufferAttribute(displacements, 1);

    geometry.setAttribute("position", posAttribute);
    geometry.setAttribute("aNormal", new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aRing", new THREE.BufferAttribute(ringIds, 1));
    geometry.setAttribute("aDisp", dispAttribute);
    geometry.computeBoundingSphere();

    // 3. Custom GLSL ShaderMaterial with Dynamic Disruption Reactions
    const vertexShader = `
      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uBaseSize;

      attribute vec3 aNormal;
      attribute float aPhase;
      attribute float aSize;
      attribute float aRing;
      attribute float aDisp;

      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying float vPhase;
      varying float vRing;
      varying float vDisp;

      void main() {
        vNormal = normalize(normalMatrix * aNormal);
        vPhase = aPhase;
        vRing = aRing;
        vDisp = aDisp;

        // Subtle ambient harmonic shimmer when resting
        vec3 displacedPos = position;
        float idleWave = sin(uTime * 1.5 + aPhase * 2.0) * 0.012;
        displacedPos += aNormal * idleWave;

        vec4 mvPosition = modelViewMatrix * vec4(displacedPos, 1.0);
        vViewPosition = -mvPosition.xyz;

        // Dynamic Size Reaction: scattered particles slightly expand,
        // then compress back to crisp stippled points upon settling
        float scatterScale = 1.0 + aDisp * 0.75;
        float pSize = aSize * scatterScale * uBaseSize * uPixelRatio * (6.5 / -mvPosition.z);
        gl_PointSize = clamp(pSize, 1.0, 14.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uColorHighlight; // Specular white-gold
      uniform vec3 uColorGold;      // Pure rich luminous brand gold
      uniform vec3 uColorShadow;    // Warm rich honey amber shadow

      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying float vPhase;
      varying float vRing;
      varying float vDisp;

      void main() {
        // 1. Crisp anti-aliased circular dot shape with solid core
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) {
          discard;
        }

        float circleAlpha = smoothstep(0.5, 0.08, dist);

        // 2. Dynamic 3D Studio Lighting with Warm Ambient Fill
        vec3 N = normalize(vNormal);
        vec3 V = normalize(vViewPosition);

        vec3 keyLightDir = normalize(vec3(0.55, 0.75, 0.85));
        float diffKey = max(0.0, dot(N, keyLightDir));

        vec3 fillLightDir = normalize(vec3(-0.6, -0.45, 0.35));
        float diffFill = max(0.0, dot(N, fillLightDir)) * 0.35;

        float ambient = 0.45;
        float diffuse = clamp(diffKey * 0.65 + diffFill + ambient, 0.0, 1.0);

        // Specular highlight (Blinn-Phong)
        vec3 H = normalize(keyLightDir + V);
        float spec = pow(max(0.0, dot(N, H)), 32.0);

        // Fresnel rim lighting for rich volumetric edge gleam
        float fresnel = pow(1.0 - max(0.0, dot(N, V)), 2.5);

        // 3. Multi-Tone Radiant Metallic Gold Palette
        vec3 baseColor = mix(uColorShadow, uColorGold, smoothstep(0.1, 0.85, diffuse));
        vec3 finalColor = baseColor;
        finalColor = mix(finalColor, uColorHighlight, clamp(spec * 1.25 + fresnel * 0.45, 0.0, 1.0));
        finalColor += uColorGold * 0.25 + uColorHighlight * (spec * 0.65);

        // 4. Dynamic Visual Reaction During Disruption
        vec3 flareColor = mix(finalColor, uColorHighlight, clamp(vDisp * 1.5, 0.0, 1.0));
        flareColor += uColorHighlight * (vDisp * 0.9);

        // 5. Living Motion & Starry Twinkle with High Solid Alpha
        float twinkle = 0.92 + 0.08 * sin(uTime * 1.8 + vPhase * 3.14159);
        float finalAlpha = circleAlpha * clamp(twinkle + vDisp * 0.35, 0.0, 1.0);

        gl_FragColor = vec4(flareColor * 1.2, finalAlpha);
      }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uBaseSize: { value: 1 },
        uColorHighlight: { value: new THREE.Color("#f1eee3ff") },
        uColorGold: { value: new THREE.Color("#DFB360") },
        uColorShadow: { value: new THREE.Color("#8C5A14") },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    });

    const points = new THREE.Points(geometry, shaderMaterial);
    knotGroup.add(points);

    // 4. Interactive 3D Raycasting & Mouse Tracking
    let isPointerInWindow = false;
    const pointerNDC = new THREE.Vector2(-1000, -1000);
    const raycaster = new THREE.Raycaster();
    const emblemPlane = new THREE.Plane();
    const planeIntersection = new THREE.Vector3();
    const targetLocalMouse = new THREE.Vector3(9999, 9999, 9999);
    const currentLocalMouse = new THREE.Vector3(9999, 9999, 9999);

    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        return;
      }

      pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      isPointerInWindow = true;

      targetParallaxX = (e.clientX / window.innerWidth) * 2 - 1;
      targetParallaxY = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const onPointerUp = () => {
      isPointerInWindow = false;
      pointerNDC.set(-1000, -1000);
      targetLocalMouse.set(9999, 9999, 9999);
      targetParallaxX = 0;
      targetParallaxY = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerUp);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    // 5. Responsive Resize & Screen Adaptation (Mobile, Tablet, Desktop)
    const handleResize = () => {
      if (!container || !canvas) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 700;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(pixelRatio);

      // Dynamic calculation of visible bounds in 3D world space at z = 0
      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      // The unscaled particle knot has an outer diameter of ~3.10 world units
      const emblemDiameter = 3.10;

      let targetScale = 1.0;
      let baseSize = 1.15;

      if (w < 640) {
        // Mobile screens: target ~76% screen width coverage so knot is never cropped
        const targetWidth = visibleWidth * 0.76;
        targetScale = Math.min(0.62, Math.max(0.40, targetWidth / emblemDiameter));
        baseSize = 0.80;
      } else if (w < 1024) {
        // Tablet screens (portrait & landscape)
        if (camera.aspect < 1.0) {
          // Tablet portrait (e.g. iPad 768px, 820px, 834px)
          const targetWidth = visibleWidth * 0.74;
          targetScale = Math.min(0.85, Math.max(0.60, targetWidth / emblemDiameter));
          baseSize = 0.95;
        } else {
          // Tablet landscape
          targetScale = 0.88;
          baseSize = 1.05;
        }
      } else {
        // Desktop displays
        targetScale = 1.0;
        baseSize = 1.15;
      }

      knotGroup.scale.set(targetScale, targetScale, targetScale);

      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uPixelRatio.value = pixelRatio;
        shaderMaterial.uniforms.uBaseSize.value = baseSize;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    handleResize();

    // Pause rendering when hero is scrolled out of viewport to save mobile battery & GPU
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    // 6. Interactive Physics Parameters (scaled to new geometry)
    const interactionRadius = 0.50;
    const interactionRadiusSq = interactionRadius * interactionRadius;
    const repelStrength = 0.22;

    const springStiffness = 0.052;
    const springDamping = 0.902;

    // 7. 60 FPS Physics Simulation & Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      shaderMaterial.uniforms.uTime.value = elapsedTime;

      // Smooth damped parallax tilt
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.045;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.045;

      const ambientFloatX = Math.sin(elapsedTime * 0.25) * 0.02;
      const ambientFloatY = Math.cos(elapsedTime * 0.2) * 0.025;
      const ambientRollZ = Math.sin(elapsedTime * 0.15) * 0.012;

      knotGroup.rotation.x = baseRotX - currentParallaxY * 0.22 + ambientFloatX;
      knotGroup.rotation.y = baseRotY + currentParallaxX * 0.28 + ambientFloatY;
      knotGroup.rotation.z = ambientRollZ + currentParallaxX * 0.06;
      knotGroup.position.y = Math.sin(elapsedTime * 0.35) * 0.04;

      // 3D Raycasting: unproject cursor into the local plane of the particle emblem
      if (isPointerInWindow) {
        const planeNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(knotGroup.quaternion);
        emblemPlane.setFromNormalAndCoplanarPoint(planeNormal, knotGroup.position);

        raycaster.setFromCamera(pointerNDC, camera);
        if (raycaster.ray.intersectPlane(emblemPlane, planeIntersection)) {
          knotGroup.worldToLocal(planeIntersection);
          targetLocalMouse.copy(planeIntersection);
        }
      } else {
        targetLocalMouse.set(9999, 9999, 9999);
      }

      currentLocalMouse.lerp(targetLocalMouse, 0.35);

      const mx = currentLocalMouse.x;
      const my = currentLocalMouse.y;
      const mz = currentLocalMouse.z;

      const minX = mx - interactionRadius;
      const maxX = mx + interactionRadius;
      const minY = my - interactionRadius;
      const maxY = my + interactionRadius;

      const isCursorNearEmblem =
        isPointerInWindow &&
        mx > -2.6 && mx < 2.6 &&
        my > -2.6 && my < 2.6;

      let anyParticleDisplaced = false;

      // High-performance typed-array physics loop
      for (let i = 0; i < TOTAL_POINTS; i++) {
        const idx3 = i * 3;

        let px = positions[idx3];
        let py = positions[idx3 + 1];
        let pz = positions[idx3 + 2];

        const ox = origPositions[idx3];
        const oy = origPositions[idx3 + 1];
        const oz = origPositions[idx3 + 2];

        let vx = velocities[idx3];
        let vy = velocities[idx3 + 1];
        let vz = velocities[idx3 + 2];

        let hasDispersalImpulse = false;

        // 1. Repulsion & Shatter Calculation
        if (isCursorNearEmblem && px >= minX && px <= maxX && py >= minY && py <= maxY) {
          const dx = px - mx;
          const dy = py - my;
          const dz = pz - mz;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < interactionRadiusSq && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const proximity = 1.0 - (dist / interactionRadius);
            const repelForce = Math.pow(proximity, 1.8) * repelStrength;

            const invDist = 1.0 / dist;
            let dirX = dx * invDist;
            let dirY = dy * invDist;
            let dirZ = dz * invDist;

            const turbAngle = phases[i] + dist * 5.0 + elapsedTime * 1.5;
            dirX += Math.sin(turbAngle) * 0.35;
            dirY += Math.cos(turbAngle) * 0.35;
            dirZ += Math.sin(turbAngle * 2.0) * 0.45;

            vx += dirX * repelForce;
            vy += dirY * repelForce;
            vz += dirZ * repelForce;

            hasDispersalImpulse = true;
          }
        }

        const toOrigX = ox - px;
        const toOrigY = oy - py;
        const toOrigZ = oz - pz;
        const distFromOrigSq = toOrigX * toOrigX + toOrigY * toOrigY + toOrigZ * toOrigZ;

        // Spatial thresholding & sleeping optimization
        if (!hasDispersalImpulse && distFromOrigSq < 0.00008 && (vx * vx + vy * vy + vz * vz) < 0.00002) {
          positions[idx3] = ox;
          positions[idx3 + 1] = oy;
          positions[idx3 + 2] = oz;
          velocities[idx3] = 0;
          velocities[idx3 + 1] = 0;
          velocities[idx3 + 2] = 0;
          displacements[i] = 0;
          continue;
        }

        anyParticleDisplaced = true;

        // 2. Elastic Reshaping / Spring Return
        vx = (vx + toOrigX * springStiffness) * springDamping;
        vy = (vy + toOrigY * springStiffness) * springDamping;
        vz = (vz + toOrigZ * springStiffness) * springDamping;

        px += vx;
        py += vy;
        pz += vz;

        positions[idx3] = px;
        positions[idx3 + 1] = py;
        positions[idx3 + 2] = pz;

        velocities[idx3] = vx;
        velocities[idx3 + 1] = vy;
        velocities[idx3 + 2] = vz;

        const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
        const distFromOrig = Math.sqrt(distFromOrigSq);
        displacements[i] = Math.min(1.0, distFromOrig * 1.25 + speed * 3.5);
      }

      if (anyParticleDisplaced || isCursorNearEmblem) {
        posAttribute.needsUpdate = true;
        dispAttribute.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("pointerleave", onPointerUp);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);

      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* Background vignette: placed BEHIND canvas so 3D particles are never dimmed */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.15) 75%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

      {/* Ambient background gold bloom (responsively sized for mobile, tablet, and desktop) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] sm:h-[400px] sm:w-[400px] md:h-[550px] md:w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[60px] sm:blur-[80px] md:blur-[100px]" />

      {/* 3D WebGL Canvas Layer - completely unobstructed, crisp, and vibrant */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}