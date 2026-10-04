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
  if (!post) return { title: "Blog" };
  return { title: post.title };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const publishedLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="mx-auto min-w-0 w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto w-full max-w-[42rem] space-y-8">
        <Link
          href="/blog/"
          className="inline-block font-mono text-xs uppercase tracking-widest text-[var(--accent)] hover:text-[var(--fg)] transition-colors"
        >
          ← Back to blog
        </Link>
        <article className="w-full space-y-10">
          <header className="space-y-4 border-b border-[var(--border)] pb-8">
            <h1 className="h1-intro text-[var(--fg)]">{post.title}</h1>
            {publishedLabel ? (
              <time dateTime={post.publishedAt ?? undefined} className="block font-mono text-xs text-[var(--muted)]">
                {publishedLabel}
              </time>
            ) : null}
          </header>
          <MarkdownArticle source={post.body} variant="post" />
        </article>
      </div>
    </main>
  );
}
