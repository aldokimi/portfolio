# Logs (blog) from GitHub Issues

The **Logs** section (`/logs/`) is generated **at build time** from Issues in a GitHub repository. There is no runtime CMS in the static bundle.

---

## Publishing rules

| Label | Role |
|-------|------|
| **`published`** | **Required** for an Issue to appear on the site. Without it, the Issue is ignored. |
| **`note`** | Short card in the feed (no separate long-form page). |
| **`article`** | Feed shows an excerpt + **Read more** → `/logs/<issue-number>/`. |

If `published` is set but neither `note` nor `article` is set, the build **infers** the type from body length (see [design spec constants](../lib/config.ts): `INFER_NOTE_MAX_CHARS`, etc.).

Issues are sorted by **`updated_at`** (newest first). Empty bodies for `published` issues are skipped with a build warning.

---

## Authoring flow

1. Create or edit an Issue in the configured repo (`PORTFOLIO_REPO` in `.env.local` or in **Cloudflare Pages** env vars).
2. Add the **`published`** label when it should go live; remove it to hide without deleting.
3. Ensure a **new production build** runs so HTML includes the latest Issues (**git push**, **Deploy Hook** / Worker, **Retry deployment** in Cloudflare, or `wrangler pages deploy`).

---

## Implementation pointers

- Fetch & normalize: [`lib/github-issues.ts`](../lib/github-issues.ts), [`lib/config.ts`](../lib/config.ts).
- Feed UI: [`components/LogFeed.tsx`](../components/LogFeed.tsx).
- Article pages: [`app/logs/[id]/page.tsx`](../app/logs/[id]/page.tsx) (uses `export const revalidate = 0` so an empty article list still passes static export — see Next **E87**).

---

## Design spec

Full product rules (CI triggers, edge cases): **`2026-04-26-portfolio-website-design.md`** in the parent monorepo under `docs/superpowers/specs/`, if you keep the portfolio inside that workspace.
