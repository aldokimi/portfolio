"use client";

import Link from "next/link";

const routes = [
  { href: "/", label: "Overview" },
  { href: "/contact/", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b-2 border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-[var(--accent)] hover:text-[var(--fg)] transition-colors"
        >
          ~/portfolio
        </Link>
        <nav className="flex items-center gap-6 font-mono text-[11px] tracking-[0.15em] uppercase">
          {routes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-0 hover:after:w-full after:bg-[var(--accent)] after:transition-all after:duration-200"
            >
              {item.label}
            </Link>
          ))}
          {/* Sharp geometric theme toggle */}
          <button
            onClick={() => {
              document.documentElement.classList.toggle("dark");
            }}
            className="w-8 h-8 border-2 border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[var(--fg)]"
            aria-label="Toggle theme"
            title="Toggle light/dark theme"
          >
            <span className="block w-2 h-2 bg-current rotate-45" />
          </button>
        </nav>
      </div>
    </header>
  );
}
