"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/* 1. Interactive particle orb: points on a sphere, 3 rings, mouse-follow, gold glow */
export function ParticleOrb({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const N = 420;
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(t) * r, y, z: Math.sin(t) * r, s: 0.6 + ((i * 37) % 10) / 12 };
    });
    const rings = [
      { tilt: 1.15, rad: 1.35, spd: 0.4 },
      { tilt: 0.45, rad: 1.55, spd: -0.3 },
      { tilt: -0.8, rad: 1.2, spd: 0.55 },
    ];

    let w = 0, h = 0, raf = 0, a = 0, visible = true;
    let tx = 0, ty = 0, mx = 0, my = 0;

    const resize = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const b = canvas.getBoundingClientRect();
      w = b.width; h = b.height;
      canvas.width = w * d; canvas.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      tx = ((e.clientX - b.left) / b.width - 0.5) * 2;
      ty = ((e.clientY - b.top) / b.height - 0.5) * 2;
    };

    const project = (x: number, y: number, z: number, ry: number, rx: number) => {
      const cx = Math.cos(ry), sx = Math.sin(ry);
      let X = x * cx + z * sx, Z = -x * sx + z * cx;
      const cy = Math.cos(rx), sy = Math.sin(rx);
      const Y = y * cy - Z * sy; Z = y * sy + Z * cy;
      const f = 3 / (3 - Z);
      const R = Math.min(w, h) * 0.3;
      return { px: w / 2 + X * f * R, py: h / 2 + Y * f * R, z: Z, f };
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      mx += (tx - mx) * 0.06; my += (ty - my) * 0.06;
      if (!reduce) a += 0.004;
      ctx.clearRect(0, 0, w, h);

      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * 0.5);
      g.addColorStop(0, "rgba(212,175,55,0.22)");
      g.addColorStop(0.6, "rgba(212,175,55,0.06)");
      g.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const ry = a + mx * 0.7, rx = my * 0.5;

      for (const p of pts) {
        const q = project(p.x, p.y, p.z, ry, rx);
        const alpha = 0.15 + ((q.z + 1) / 2) * 0.85;
        ctx.fillStyle = `rgba(232,196,90,${alpha})`;
        ctx.beginPath();
        ctx.arc(q.px, q.py, p.s * q.f * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      rings.forEach((r, k) => {
        ctx.strokeStyle = `rgba(212,175,55,${0.35 - k * 0.07})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const t = (i / 120) * Math.PI * 2 + a * r.spd * 4;
          const x = Math.cos(t) * r.rad;
          const y0 = Math.sin(t) * r.rad;
          const y = y0 * Math.cos(r.tilt);
          const z = y0 * Math.sin(r.tilt);
          const q = project(x, y, z, ry * 0.6, rx);
          i ? ctx.lineTo(q.px, q.py) : ctx.moveTo(q.px, q.py);
        }
        ctx.stroke();
      });
    };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`h-full w-full ${className}`} />;
}

/* 2. Vertical glowing line that fills as you scroll through its section */
export function GlowLine({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const b = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.6 - b.top) / b.height));
      el.style.setProperty("--p", String(p));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={wrap} className="glow-line-wrap relative">
      <div aria-hidden="true" className="glow-line hidden lg:block" />
      {children}
    </div>
  );
}

/* 3. Gentle float + depth shadow. Wrap inside <Tilt> so transforms don't clash */
export function Float({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="float-y" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* 4. Ambient gold background: drifting blurred light + tiny particles */
export function AmbientGold({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`ambient-gold pointer-events-none absolute inset-0 -z-10 overflow-clip ${className}`}>
      <span className="ambient-blob" style={{ left: "-10%", top: "10%", width: 420, height: 420 }} />
      <span className="ambient-blob" style={{ right: "-8%", top: "45%", width: 520, height: 520, animationDelay: "-8s" }} />
      <span className="ambient-wave" />
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          className="ambient-dot"
          style={
            {
              left: `${(i * 53) % 100}%`,
              top: `${(i * 31 + 7) % 100}%`,
              animationDelay: `${-(i * 1.7)}s`,
              animationDuration: `${9 + (i % 5) * 3}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* 5. Animated gold border + cursor spotlight + hover lift */
export function GoldFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`gold-frame ${className}`}
      onPointerMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
      }}
    >
      {children}
    </div>
  );
}

/* 7. Scroll-linked scale/opacity entry (CSS scroll timelines; no-op where unsupported) */
export function SectionFx({ children }: { children: ReactNode }) {
  return <div className="section-fx">{children}</div>;
}