import { LogFeed } from "@/components/LogFeed";
import { fetchPublishedLogEntries } from "@/lib/github-issues";

export const metadata = {
  title: "Logs",
};

export default async function LogsPage() {
  const entries = await fetchPublishedLogEntries();

  return (
    <main className="mx-auto max-w-3xl flex-1 space-y-8 px-4 py-12">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
          /var/log/mo
        </p>
        <h1 className="font-mono text-2xl text-slate-50">Logs</h1>
        <p className="text-sm text-slate-400">
          Notes and articles from GitHub Issues. Only issues labeled{" "}
          <code className="text-cyan-300/90">published</code> appear here.
          Use <code className="text-cyan-300/90">note</code> or{" "}
          <code className="text-cyan-300/90">article</code>, or let length infer
          the shape.
        </p>
      </header>
      <LogFeed entries={entries} />
    </main>
  );
}
