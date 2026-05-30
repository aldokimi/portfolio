import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const proseCompact =
  "text-sm leading-relaxed text-slate-200 [&_a]:text-cyan-400 [&_a]:underline-offset-2 hover:[&_a]:text-cyan-300 [&_code]:rounded [&_code]:bg-slate-900 [&_code]:px-1 [&_code]:font-mono [&_code]:text-cyan-200 [&_h1]:mb-3 [&_h1]:font-mono [&_h1]:text-lg [&_h1]:text-slate-50 [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:font-mono [&_h2]:text-base [&_h2]:text-slate-100 [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-slate-800 [&_pre]:bg-slate-950 [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-xs [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5";

const prosePost =
  "w-full min-w-0 text-[1.0625rem] leading-[1.75] text-slate-200 [&_a]:text-cyan-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-cyan-300 [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-cyan-500/40 [&_blockquote]:pl-5 [&_blockquote]:text-slate-400 [&_code]:rounded [&_code]:bg-slate-900/80 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-cyan-200/90 [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-slate-50 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-100 [&_img]:my-8 [&_img]:w-full [&_img]:rounded-lg [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-6 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-slate-800 [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-slate-100 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6";

export function MarkdownArticle({
  source,
  variant = "compact",
}: {
  source: string;
  variant?: "compact" | "post";
}) {
  return (
    <div
      className={`markdown-body ${variant === "post" ? prosePost : proseCompact}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  );
}
