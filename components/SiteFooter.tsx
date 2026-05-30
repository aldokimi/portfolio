import Link from "next/link";
import { profile } from "@/lib/profile";

const extraLinks = [
  { label: "Terminal", href: "/terminal/", internal: true as const },
  { label: "Source", href: "https://github.com/aldokimi/portfolio" },
] as const;

const contactLabels = new Set(["GitHub", "LinkedIn", "Email"]);

export function SiteFooter() {
  const year = new Date().getFullYear();
  const contact = profile.links.filter((l) => contactLabels.has(l.label));

  return (
    <footer className="mt-auto border-t border-slate-800/80 py-4">
      <div className="mx-auto max-w-3xl px-4 text-center font-mono text-[11px] text-slate-600">
        <p className="text-slate-500">
          © {year} {profile.name} · {profile.location}
        </p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {[...contact, ...extraLinks].map((item, i) => (
            <span key={item.href} className="inline-flex items-center gap-2">
              {i > 0 ? <span className="text-slate-800">·</span> : null}
              {"internal" in item && item.internal ? (
                <Link href={item.href} className="hover:text-cyan-400/90">
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-cyan-400/90"
                  {...(item.href.startsWith("http")
                    ? { rel: "noreferrer", target: "_blank" }
                    : {})}
                >
                  {item.label}
                </a>
              )}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
