"use client";

import { MarkdownArticle } from "@/components/MarkdownArticle";
import { slugify } from "@/lib/post-utils";
import type { Post, PostStatus } from "@/lib/types/post";
import { useState, useTransition } from "react";

type PostEditorProps = {
  mode: "create" | "edit";
  post?: Post;
  saveAction: (
    formData: FormData,
  ) => Promise<{ error?: string; ok?: true } | void>;
  deleteAction?: (id: number) => Promise<{ error?: string } | void>;
};

export function PostEditor({
  mode,
  post,
  saveAction,
  deleteAction,
}: PostEditorProps) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched && mode === "create") {
      setSlug(slugify(value));
    }
  }

  function submit(intent: "draft" | "publish" | "unpublish") {
    setError(null);
    const formData = new FormData();
    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("body", body);
    formData.set("intent", intent);

    startTransition(async () => {
      const result = await saveAction(formData);
      if (result && "error" in result && result.error) {
        setError(result.error);
      }
    });
  }

  function handleDelete() {
    if (!post || !deleteAction) return;
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      const result = await deleteAction(post.id);
      if (result && "error" in result && result.error) {
        setError(result.error);
      }
    });
  }

  const status: PostStatus = post?.status ?? "draft";

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
          /admin/posts/{mode === "create" ? "new" : `${post?.id}/edit`}
        </p>
        <h1 className="font-mono text-2xl text-slate-50">
          {mode === "create" ? "New post" : "Edit post"}
        </h1>
      </header>

      {error ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 font-mono text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
              Title
            </span>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-100 outline-none focus:border-cyan-500/50"
            />
          </label>

          <label className="block space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
              Slug
            </span>
            <input
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-100 outline-none focus:border-cyan-500/50"
            />
          </label>

          <label className="block space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
              Body (markdown)
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={18}
              className="w-full resize-y rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm leading-relaxed text-slate-100 outline-none focus:border-cyan-500/50"
            />
          </label>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
            Preview
          </p>
          <div className="min-h-[24rem] rounded-lg border border-slate-800 bg-slate-900/35 p-4">
            {body.trim() ? (
              <MarkdownArticle source={body} />
            ) : (
              <p className="font-mono text-sm text-slate-600">Nothing yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() => submit("draft")}
          className="rounded-lg border border-slate-700 px-4 py-2 font-mono text-xs uppercase tracking-widest text-slate-300 hover:border-slate-500 disabled:opacity-50"
        >
          Save draft
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => submit("publish")}
          className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50"
        >
          Publish
        </button>
        {status === "published" ? (
          <button
            type="button"
            disabled={pending}
            onClick={() => submit("unpublish")}
            className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-amber-300 hover:bg-amber-500/20 disabled:opacity-50"
          >
            Unpublish
          </button>
        ) : null}
        {mode === "edit" && deleteAction ? (
          <button
            type="button"
            disabled={pending}
            onClick={handleDelete}
            className="rounded-lg border border-red-500/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-red-300 hover:bg-red-500/10 disabled:opacity-50"
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}
