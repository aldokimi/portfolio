# Admin blog (D1)

The **Logs** section (`/logs/`) reads **published** posts from **Cloudflare D1** at request time. Write and manage posts at **`/admin`** (protected by **Cloudflare Access**).

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

### 3. Cloudflare Access

Zero Trust → **Access** → **Applications** → add self-hosted app:

- **Domain:** your production hostname (or `*.workers.dev` subdomain)
- **Path:** `/admin` — enable **Include subpaths** (covers `/admin/posts/new/`, edit pages, and form POSTs for Server Actions)
- **Policy:** allow your email only

No in-app login. Access handles auth at the edge.

If saves fail after login with no error, widen the Access application path to `/admin*` or add a second policy for `/_next/*` only if your deployment routes actions outside `/admin` (unusual for this app).

### 4. Worker binding types (`worker-configuration.d.ts`)

Regenerate from [`wrangler.jsonc`](../wrangler.jsonc) after binding changes (same as Cloudflare’s `npx wrangler types`; this repo wraps it):

```bash
yarn cf-typegen
```

Uses **`--include-runtime=false`** so file stays small and safe to commit. Full runtime dump (huge): `yarn wrangler types --config wrangler.jsonc --env-interface CloudflareEnv`.

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

- Public logs: http://localhost:3000/logs/
- Admin: http://localhost:3000/admin/ (no Access locally — protect in production only)

Use `yarn preview` to test in the Workers runtime locally.

---

## Admin workflow

| Route | Purpose |
|-------|---------|
| `/admin` | List all posts (draft + published) |
| `/admin/posts/new` | Create post |
| `/admin/posts/[id]/edit` | Edit, publish, unpublish, delete |

- **Save draft** — hidden from `/logs`
- **Publish** — live immediately (no redeploy)
- **Unpublish** — back to draft
- **Delete** — hard delete

Posts use **markdown** body and slug URLs: `/logs/<slug>/`.

---

## Deploy

```bash
yarn deploy
```

Builds via OpenNext and deploys Worker + assets with D1 binding.

For CI, see [deployment-and-ci.md](deployment-and-ci.md).

---

## Code pointers

- D1 queries: [`lib/posts.ts`](../lib/posts.ts)
- Slug / excerpt helpers: [`lib/post-utils.ts`](../lib/post-utils.ts)
- Server Actions: [`app/admin/actions.ts`](../app/admin/actions.ts)
- Public feed: [`components/LogFeed.tsx`](../components/LogFeed.tsx)
