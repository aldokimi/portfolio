import Link from "next/link";
import { profile } from "@/lib/profile";

const extraLinks = [
  { label: "Source", href: "https://github.com/aldokimi/portfolio" },
] as const;

const contactLabels = new Set(["GitHub", "LinkedIn", "Email"]);

export function SiteFooter() {
  const year = new Date().getFullYear();
  const contact = profile.links.filter((l) => contactLabels.has(l.label));

  return (
    <footer className="mt-auto border-t-2 border-[var(--border)] bg-[var(--surface)] py-8">
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
                  {...(item.href.startsWith("http")
                    ? { rel: "noreferrer", target: "_blank" }
                    : {})}
                >
                  {item.label}
                </a>
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
