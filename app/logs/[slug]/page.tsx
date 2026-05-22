import { MarkdownArticle } from "@/components/MarkdownArticle";
import { getPublishedPostBySlug } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Log" };
  return { title: post.title };
}

export default async function LogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

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
          <h1 className="font-mono text-xl text-slate-50">{post.title}</h1>
        </header>
        <MarkdownArticle source={post.body} />
      </article>
    </main>
  );
}
