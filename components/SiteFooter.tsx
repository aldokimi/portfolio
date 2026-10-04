"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/profile";

const extraLinks = [
  { label: "Source", href: "https://github.com/aldokimi/portfolio" },
] as const;

const contactLabels = new Set(["GitHub", "LinkedIn", "Email"]);

export function FooterContent() {
  const year = new Date().getFullYear();
  const contact = profile.links.filter((l) => contactLabels.has(l.label));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="font-mono text-xs text-[var(--muted)] tracking-wide">
        <span className="text-[var(--accent)] font-semibold">SECURE</span> · © {year} {profile.name}
      </div>
      <div className="flex flex-wrap gap-4 font-mono text-xs">
        {[...contact, ...extraLinks].map((item, i) => (
          <span key={item.href}>
            {i > 0 && <span className="text-[var(--border)] mx-2">|</span>}
            {"internal" in item && item.internal ? (
              <Link href={item.href} className="text-[var(--accent)] hover:text-[var(--fg)] transition-colors">
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                className="text-[var(--accent)] hover:text-[var(--fg)] transition-colors"
                {...(item.href.startsWith("http") ? { rel: "noreferrer", target: "_blank" } : {})}
              >
                {item.label}
              </a>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  // Homepage has its own fixed-height scroll container; the footer lives inside it
  // (see app/page.tsx) so it's only reachable by scrolling that panel to its end,
  // instead of adding extra height to the page and creating an outer scrollbar.
  if (pathname === "/") return null;

  return (
    <footer className="mt-auto border-t-2 border-[var(--border)] bg-[var(--surface)] py-8">
      <FooterContent />
    </footer>
  );
}
