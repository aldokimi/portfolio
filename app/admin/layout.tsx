import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-0">
      <div className="border-b border-slate-800/80 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-500/80">
            Admin · Logs CMS
          </p>
          <nav className="flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-widest text-slate-400">
            <Link href="/admin/" className="hover:text-cyan-300">
              All posts
            </Link>
            <Link href="/admin/posts/new/" className="hover:text-cyan-300">
              New post
            </Link>
            <Link href="/logs/" className="hover:text-cyan-300">
              Public logs
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
