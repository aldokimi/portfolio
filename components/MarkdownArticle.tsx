import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const proseCompact =
  "text-sm leading-relaxed text-[var(--card-muted)] [&_a]:text-[var(--accent)] [&_a]:underline-offset-2 hover:[&_a]:text-[var(--card-fg)] [&_code]:rounded [&_code]:bg-[var(--bg)] [&_code]:px-1 [&_code]:font-mono [&_code]:text-[var(--accent)] [&_h1]:mb-3 [&_h1]:font-mono [&_h1]:text-lg [&_h1]:text-[var(--card-fg)] [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:font-mono [&_h2]:text-base [&_h2]:text-[var(--card-fg)] [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-[var(--radius-card)] [&_pre]:border [&_pre]:border-[var(--border)] [&_pre]:bg-[var(--bg)] [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-xs [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5";

const prosePost =
  "w-full min-w-0 text-[1.0625rem] leading-[1.75] text-[var(--muted)] [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[var(--fg)] [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent)]/40 [&_blockquote]:pl-5 [&_blockquote]:text-[var(--muted)] [&_code]:rounded [&_code]:bg-[var(--card)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-[var(--accent)] [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--fg)] [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--fg)] [&_img]:my-8 [&_img]:w-full [&_img]:rounded-[var(--radius-card)] [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-6 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-[var(--radius-card)] [&_pre]:border [&_pre]:border-[var(--border)] [&_pre]:bg-[var(--card)] [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-[var(--fg)] [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6";

export function MarkdownArticle({
  source,
  variant = "compact",
}: {
  source: string;
  variant?: "compact" | "post";
}) {
  return (
    <div className={`markdown-body ${variant === "post" ? prosePost : proseCompact}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  );
}
