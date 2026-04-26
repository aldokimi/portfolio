import { MarkdownArticle } from "@/components/MarkdownArticle";
import { fetchPublishedLogEntries } from "@/lib/github-issues";
import Link from "next/link";
import { notFound } from "next/navigation";

/** Allows `generateStaticParams` to return [] under `output: export` (see Next build E87 guard). */
export const revalidate = 0;

export async function generateStaticParams() {
  const entries = await fetchPublishedLogEntries();
  return entries
    .filter((e) => e.kind === "article")
    .map((e) => ({ id: String(e.number) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const num = Number(id);
  const entries = await fetchPublishedLogEntries();
  const entry = entries.find((e) => e.number === num && e.kind === "article");
  if (!entry) return { title: "Log" };
  return { title: entry.title };
}

export default async function LogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const num = Number(id);
  if (!Number.isFinite(num)) notFound();

  const entries = await fetchPublishedLogEntries();
  const entry = entries.find((e) => e.number === num && e.kind === "article");
  if (!entry) notFound();

  return (
    <main className="mx-auto max-w-3xl flex-1 space-y-6 px-4 py-12">
      <Link
        href="/logs/"
        className="font-mono text-xs uppercase tracking-widest text-cyan-500 hover:text-cyan-300"
      >
        ← Back to logs
      </Link>
      <article className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/35 p-6">
        <header className="space-y-2 border-b border-slate-800 pb-4">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
            article · #{entry.number}
          </p>
          <h1 className="font-mono text-xl text-slate-50">{entry.title}</h1>
          <a
            href={entry.htmlUrl}
            className="inline-block text-xs text-slate-500 underline-offset-2 hover:text-slate-400"
          >
            View issue on GitHub
          </a>
        </header>
        <MarkdownArticle source={entry.body} />
      </article>
    </main>
  );
}
