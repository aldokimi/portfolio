import { LogFeed } from "@/components/LogFeed";
import { listPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Logs",
};

export default async function LogsPage() {
  let entries;
  try {
    entries = await listPublishedPosts();
  } catch {
    return (
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
        <p className="font-mono text-sm text-red-400">
          Logs temporarily unavailable. Try again later.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl flex-1 space-y-8 px-4 py-12">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
          /var/log/mo
        </p>
        <h1 className="font-mono text-2xl text-slate-50">Logs</h1>
        <p className="text-sm text-slate-400">Notes and articles.</p>
      </header>
      <LogFeed entries={entries} />
    </main>
  );
}
