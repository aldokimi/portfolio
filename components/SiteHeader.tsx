import Link from "next/link";

const nav = [
  { href: "/", label: "Architecture" },
  { href: "/logs/", label: "Logs" },
  { href: "/contact/", label: "Ping" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-cyan-500/15 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-cyan-300/90 hover:text-cyan-200"
        >
          ~/portfolio
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-4 font-mono text-xs uppercase tracking-widest text-slate-400">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
