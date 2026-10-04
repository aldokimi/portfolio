"use client";

import { useActionState } from "react";

type ActionState = { error?: string } | null;

export function LoginForm({
  action,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="card-sharp w-full space-y-5 p-8">
      <div className="space-y-1">
        <p className="mono-label">Admin</p>
        <h1 className="h3-card text-[var(--card-fg)]">Log in</h1>
      </div>

      {state?.error ? (
        <p className="rounded-[var(--radius-tag)] border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {state.error}
        </p>
      ) : null}

      <label className="block space-y-1">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--card-muted)]">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="w-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--fg)] outline-none focus:border-[var(--accent)]"
        />
      </label>

      <button type="submit" disabled={pending} className="btn-sharp w-full text-center disabled:opacity-50">
        {pending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
