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
npm run d1:migrate:local    # local dev
npm run d1:migrate:remote   # production
```

### 3. Cloudflare Access

Zero Trust → **Access** → **Applications** → add self-hosted app:

- **Domain:** your production hostname
- **Path:** `/admin`
- **Policy:** allow your email only

No in-app login. Access handles auth at the edge.

---

## Local development

```bash
npm install
npm run d1:migrate:local
npm run dev
```

- Public logs: http://localhost:3000/logs/
- Admin: http://localhost:3000/admin/ (no Access locally — protect in production only)

Use `npm run preview` to test in the Workers runtime locally.

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
npm run deploy
```

Builds via OpenNext and deploys Worker + assets with D1 binding.

For CI, see [deployment-and-ci.md](deployment-and-ci.md).

---

## Code pointers

- D1 queries: [`lib/posts.ts`](../lib/posts.ts)
- Slug / excerpt helpers: [`lib/post-utils.ts`](../lib/post-utils.ts)
- Server Actions: [`app/admin/actions.ts`](../app/admin/actions.ts)
- Public feed: [`components/LogFeed.tsx`](../components/LogFeed.tsx)
