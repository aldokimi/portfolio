"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const routes = [
  { href: "/", label: "Overview" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="2.2">
      <circle cx="12" cy="12" r="4.5" />
      <path
        strokeLinecap="round"
        d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const [isLight, setIsLight] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("light")
  );

  const activeHref =
    routes.find((r) => r.href === pathname) ??
    routes.find((r) => r.href !== "/" && pathname?.startsWith(r.href)) ??
    routes[0];

  useLayoutEffect(() => {
    const el = linkRefs.current[activeHref.href];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({ left: elRect.left - navRect.left, width: elRect.width });
  }, [activeHref.href]);

  useEffect(() => {
    const onResize = () => {
      const el = linkRefs.current[activeHref.href];
      const nav = navRef.current;
      if (!el || !nav) return;
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({ left: elRect.left - navRect.left, width: elRect.width });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeHref.href]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="glass-surface flex items-center gap-4 px-4 py-2 sm:gap-6 sm:px-5">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-[var(--accent)] hover:text-[var(--fg)] transition-colors"
        >
          ~/portfolio
        </Link>
        <nav>
          <ul
            ref={navRef}
            className="relative flex items-center gap-1 font-mono text-[11px] tracking-[0.15em] uppercase"
          >
            {indicator ? (
              <span
                aria-hidden="true"
                className="absolute top-0 h-full rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 transition-[left,width] duration-300"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  transitionTimingFunction: "var(--ease-bounce)",
                }}
              />
            ) : null}
            {routes.map((item) => (
              <li key={item.href} className="relative z-10">
                <Link
                  ref={(el) => {
                    linkRefs.current[item.href] = el;
                  }}
                  href={item.href}
                  className={`block rounded-full px-3 py-1.5 transition-colors ${
                    item.href === activeHref.href
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={() => {
            document.documentElement.classList.toggle("light");
            setIsLight((v) => !v);
          }}
          className="relative h-6 w-12 shrink-0 rounded-full border border-[var(--border)] bg-[var(--card)]"
          aria-label="Toggle theme"
          aria-pressed={isLight}
          title="Toggle light/dark theme"
        >
          <motion.span
            className="absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)]"
            animate={{ x: isLight ? 0 : 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            {isLight ? <SunIcon /> : <MoonIcon />}
          </motion.span>
        </button>
      </div>
    </header>
  );
}
