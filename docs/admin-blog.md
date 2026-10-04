# Admin blog (D1)

The **Blog** section (`/blog/`) reads **published** posts from **Cloudflare D1** at request time. Write and manage posts at **`/admin`**, protected by an **in-app password login** (not Cloudflare Access).

---

## One-time setup

### 1. Create D1 database

```bash
npx wrangler d1 create portfolio-posts
```

Copy the `database_id` into `wrangler.jsonc` → `d1_databases[0].database_id`.

### 2. Apply migrations

```bash
yarn d1:migrate:local    # local dev
yarn d1:migrate:remote   # production (required once per D1 database)
```

**Production:** `yarn deploy` does **not** run migrations automatically. If admin shows *“Posts table is missing”*, the remote D1 never got the schema — run the commands below.

```bash
npx wrangler login
yarn d1:migrate:remote
```

Confirm tables exist:

```bash
yarn wrangler d1 execute portfolio-posts --remote --command "SELECT name FROM sqlite_master WHERE type='table';"
```

You should see `posts` in the result. No redeploy needed after migrate; retry `/admin/` immediately.

For future deploys from your machine: `yarn deploy:prod` (migrates, then builds and deploys).

### 3. Admin password

Auth is a single shared password — no username, no external identity provider. On login it's checked against the `ADMIN_PASSWORD` secret, and a signed, httpOnly session cookie (`admin_session`, scoped to `/admin`, 7-day expiry) is set. The signature is an HMAC over the expiry timestamp, keyed by `ADMIN_PASSWORD` itself — see [`lib/auth.ts`](../lib/auth.ts).

**Production:**

```bash
npx wrangler secret put ADMIN_PASSWORD
```

**Local dev:** add to `.dev.vars` (gitignored):

```
ADMIN_PASSWORD=choose-a-local-password
```

If `/admin` shows "Admin password is not configured," the secret/var is missing in that environment.

### 4. Worker binding types (`worker-configuration.d.ts`)

Regenerate from [`wrangler.jsonc`](../wrangler.jsonc) after binding changes (same as Cloudflare’s `npx wrangler types`; this repo wraps it):

```bash
yarn cf-typegen
```

Uses **`--include-runtime=false`** so file stays small and safe to commit. Full runtime dump (huge): `yarn wrangler types --config wrangler.jsonc --env-interface CloudflareEnv`.

`ADMIN_PASSWORD` is a **secret**, not a `wrangler.jsonc` var, so it's intentionally absent from the generated `CloudflareEnv` type — [`lib/auth.ts`](../lib/auth.ts) reads it via a narrow cast instead of hand-editing the generated file.

CI: `yarn cf-typegen:check` fails if committed types drift vs current `wrangler.jsonc`.

---

## Local development

**Docker (recommended — install runs inside Linux container)**

```bash
docker compose build --pull
docker compose run --rm app yarn install
docker compose run --rm app yarn cf-typegen
docker compose run --rm app yarn d1:migrate:local
docker compose up
```

Or **Cursor / VS Code** → reopen in Dev Container (`.devcontainer`).

**Yarn on host:**

```bash
corepack enable
yarn install
yarn d1:migrate:local
yarn dev
```

- Public blog: http://localhost:3000/blog/
- Admin: http://localhost:3000/admin/ → redirects to http://localhost:3000/admin/login/ until you log in with `ADMIN_PASSWORD` from `.dev.vars`.

Use `yarn preview` to test in the Workers runtime locally.

---

## Admin workflow

| Route | Purpose |
|-------|---------|
| `/admin/login` | Password login |
| `/admin` | List all posts (draft + published) |
| `/admin/posts/new` | Create post |
| `/admin/posts/[id]/edit` | Edit, publish, unpublish, delete |

The editor (`components/PostEditor.tsx`) is a **Notion-style block editor** ([BlockNote](https://www.blocknote.js.org/)), not a plain markdown textarea. It edits rich blocks in the browser; on save, content is converted to markdown (`editor.blocksToMarkdownLossy()`) before hitting the server action, and converted back to blocks on load (`editor.tryParseMarkdownToBlocks()`) — so the D1 `posts.body` column stays plain markdown text, and the public `/blog` pages keep rendering with `react-markdown` unchanged.

- **Save draft** — hidden from `/blog`
- **Publish** — live immediately (no redeploy)
- **Unpublish** — back to draft
- **Delete** — hard delete
- **Log out** — in the admin nav, clears the session cookie

Posts use **markdown** body and slug URLs: `/blog/<slug>/`.

---

## Deploy

```bash
yarn deploy
```

Builds via OpenNext and deploys Worker + assets with D1 binding. Don't forget `wrangler secret put ADMIN_PASSWORD` once per environment (see above) — it isn't part of the build.

For CI, see [deployment-and-ci.md](deployment-and-ci.md).

---

## Code pointers

- Auth (password check, session token sign/verify): [`lib/auth.ts`](../lib/auth.ts)
- D1 queries: [`lib/posts.ts`](../lib/posts.ts)
- Slug / excerpt helpers: [`lib/post-utils.ts`](../lib/post-utils.ts)
- Server Actions (login, logout, create/update/delete post): [`app/admin/actions.ts`](../app/admin/actions.ts)
- Auth guard + admin nav chrome: [`app/admin/(protected)/layout.tsx`](../app/admin/(protected)/layout.tsx)
- Notion-style editor: [`components/PostEditor.tsx`](../components/PostEditor.tsx)
- Public feed: [`components/BlogFeed.tsx`](../components/BlogFeed.tsx)
