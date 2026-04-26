import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownArticle({ source }: { source: string }) {
  return (
    <div className="markdown-body text-sm leading-relaxed text-slate-200 [&_a]:text-cyan-400 [&_a]:underline-offset-2 hover:[&_a]:text-cyan-300 [&_code]:rounded [&_code]:bg-slate-900 [&_code]:px-1 [&_code]:font-mono [&_code]:text-cyan-200 [&_h1]:mb-3 [&_h1]:font-mono [&_h1]:text-lg [&_h1]:text-slate-50 [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:font-mono [&_h2]:text-base [&_h2]:text-slate-100 [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-slate-800 [&_pre]:bg-slate-950 [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-xs [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  );
}
