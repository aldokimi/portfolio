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
yarn d1:migrate:remote   # production
```

### 3. Cloudflare Access

Zero Trust → **Access** → **Applications** → add self-hosted app:

- **Domain:** your production hostname
- **Path:** `/admin`
- **Policy:** allow your email only

No in-app login. Access handles auth at the edge.

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
docker compose build
docker compose run --rm app yarn install
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
