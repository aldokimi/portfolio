"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 50;
const LINK_DISTANCE = 150;

type Particle = { x: number; y: number; phase: number; speed: number; radius: number };

export default function HeroCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;

    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      width = w;
      height = h;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.25,
        radius: 1 + Math.random() * 1.5,
      });
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);
      const pos = particles.map((p) => ({
        x: p.x * width + Math.sin(t * p.speed + p.phase) * 30,
        y: p.y * height + Math.cos(t * p.speed + p.phase) * 30,
        r: p.radius,
      }));

      ctx!.lineWidth = 1;
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const dx = pos[i].x - pos[j].x;
          const dy = pos[i].y - pos[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DISTANCE) {
            ctx!.strokeStyle = `rgba(0, 230, 118, ${(1 - d / LINK_DISTANCE) * 0.35})`;
            ctx!.beginPath();
            ctx!.moveTo(pos[i].x, pos[i].y);
            ctx!.lineTo(pos[j].x, pos[j].y);
            ctx!.stroke();
          }
        }
      }
      ctx!.fillStyle = "rgba(0, 230, 118, 0.7)";
      for (const p of pos) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    resize();
    window.addEventListener("resize", resize);

    if (!reduced) {
      const start = performance.now();
      const loop = (now: number) => {
        draw((now - start) / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
