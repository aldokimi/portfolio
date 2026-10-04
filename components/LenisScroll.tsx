"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function LenisScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
}
