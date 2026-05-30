"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { href: "/", label: "Architecture" },
  { href: "/logs/", label: "Logs" },
  { href: "/contact/", label: "Ping" },
];

const anchors = [
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header className="sticky top-0 z-20 border-b border-cyan-500/15 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-cyan-300/90 hover:text-cyan-200"
        >
          ~/portfolio
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-slate-400 sm:text-xs">
          {routes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
          {onHome
            ? anchors.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hidden text-slate-500 hover:text-cyan-300 sm:inline"
                >
                  {item.label}
                </Link>
              ))
            : null}
        </nav>
      </div>
    </header>
  );
}
