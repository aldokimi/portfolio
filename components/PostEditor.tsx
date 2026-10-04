"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { slugify } from "@/lib/post-utils";
import type { Post, PostStatus } from "@/lib/types/post";
import { noopAction } from "@/app/admin/actions";

type SaveState = { error?: string; ok?: true } | null;
type DeleteState = { error?: string } | null;

type PostEditorProps = {
  mode: "create" | "edit";
  post?: Post;
  saveAction: (prev: SaveState, formData: FormData) => Promise<SaveState>;
  deleteAction?: (prev: DeleteState, formData: FormData) => Promise<DeleteState>;
};

export function PostEditor({ mode, post, saveAction, deleteAction }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const loadedInitialBody = useRef(false);

  const editor = useCreateBlockNote();

  useEffect(() => {
    if (loadedInitialBody.current || !post?.body) return;
    loadedInitialBody.current = true;
    const blocks = editor.tryParseMarkdownToBlocks(post.body);
    editor.replaceBlocks(editor.document, blocks);
  }, [editor, post?.body]);

  const [saveState, saveFormAction, savePending] = useActionState(saveAction, null);
  const [deleteState, deleteFormAction, deletePending] = useActionState(
    deleteAction ?? noopAction,
    null,
  );
  const [, startTransition] = useTransition();

  const status: PostStatus = post?.status ?? "draft";
  const error = saveState?.error ?? deleteState?.error ?? null;
  const pending = savePending || deletePending;

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched && mode === "create") setSlug(slugify(value));
  }

  function handleSave(intent: "draft" | "publish" | "unpublish") {
    const markdown = editor.blocksToMarkdownLossy(editor.document);
    const formData = new FormData();
    if (mode === "edit" && post) formData.set("postId", String(post.id));
    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("body", markdown);
    formData.set("intent", intent);
    startTransition(() => {
      saveFormAction(formData);
    });
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="mono-label">/admin/posts/{mode === "create" ? "new" : `${post?.id}/edit`}</p>
        <h1 className="h2-section text-[var(--fg)]">{mode === "create" ? "New post" : "Edit post"}</h1>
      </header>

      {error ? (
        <p className="rounded-[var(--radius-tag)] border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error}
        </p>
      ) : null}
      {saveState?.ok ? (
        <p className="rounded-[var(--radius-tag)] border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-2 text-sm text-[var(--accent)]">
          Saved.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">Title</span>
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--card-fg)] outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="block space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">Slug</span>
          <input
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            required
            className="w-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--card-fg)] outline-none focus:border-[var(--accent)]"
          />
        </label>
      </div>

      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">Body</span>
        <div className="mt-1 min-h-[28rem] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]">
          <BlockNoteView editor={editor} theme="dark" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" disabled={pending} onClick={() => handleSave("draft")} className="btn-sharp">
          Save draft
        </button>
        <button type="button" disabled={pending} onClick={() => handleSave("publish")} className="btn-sharp">
          Publish
        </button>
        {status === "published" ? (
          <button type="button" disabled={pending} onClick={() => handleSave("unpublish")} className="btn-sharp">
            Unpublish
          </button>
        ) : null}
      </div>

      {mode === "edit" && post && deleteAction ? (
        <form
          action={deleteFormAction}
          className="border-t border-[var(--border)] pt-6"
          onSubmit={(e) => {
            if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="postId" value={post.id} />
          <button type="submit" disabled={pending} className="btn-sharp">
            Delete
          </button>
        </form>
      ) : null}
    </div>
  );
}
