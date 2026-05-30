# Deployment & CI (Cloudflare Workers)

The app runs on **Cloudflare Workers** via **`@opennextjs/cloudflare`**. Build output is **`.open-next/`**. Posts live in **D1** — no rebuild needed when content changes.

---

## 1. One-time setup

1. Create D1: `npx wrangler d1 create portfolio-posts`
2. Put `database_id` in [`wrangler.jsonc`](../wrangler.jsonc)
3. Migrate: `yarn d1:migrate:remote`
4. Login: `npx wrangler login`
5. Deploy: `yarn deploy`
6. Add custom domain in Cloudflare dashboard
7. Configure **Cloudflare Access** on `/admin` — see [admin-blog.md](admin-blog.md)

---

## 2. Cloudflare Pages (Git build)

**Do not use `yarn build` as the Pages build command.** That runs `next build` only — no OpenNext adapter step, no usable Worker bundle.

| Field | Value |
|-------|--------|
| **Build command** | `yarn install --immutable && yarn cf:build` |
| **Build output directory** | Leave **empty** (OpenNext + `wrangler.jsonc` use `.open-next/`; not `out/`) |
| **Node** | `22.14.0` or newer (match [`.nvmrc`](../.nvmrc)) |
| **`SKIP_DEPENDENCY_INSTALL`** | `1` if Cloudflare’s default `npm clean-install` runs before your command and breaks Yarn — then your command must include `yarn install --immutable` |

If build stops at **Running TypeScript…** then exits (often **OOM / exit 137**): add env **`NODE_OPTIONS`** = `--max-old-space-size=6144` on the Pages project.

---

## 3. Deploy from CLI

```bash
yarn deploy
```

Preview locally in Workers runtime:

```bash
yarn preview
```

---

## 4. Deploy failed: D1 `database_id`

If Wrangler / Pages shows:

> `binding DB of type d1 must have a valid database_id specified` **[code 10021]**

Then `wrangler.jsonc` still has a **placeholder** or wrong UUID.

1. Create DB (once): `npx wrangler d1 create portfolio-posts`
2. Copy the printed **`database_id`** (UUID) into `wrangler.jsonc` → `d1_databases[0].database_id`
3. Apply schema remotely: `yarn d1:migrate:remote`
4. Redeploy

`database_name` alone is not enough for deploy — **`database_id` is required**.

---

## 5. Troubleshooting

| Symptom | Check |
|--------|--------|
| Deploy **10021** — invalid D1 `database_id` | Replace placeholder in `wrangler.jsonc` with UUID from `wrangler d1 create`; run `yarn d1:migrate:remote` |
| `D1 binding DB is not configured` | `wrangler.jsonc` binding name is `DB`; redeploy after config change |
| Admin: *Posts table is missing* | Run `yarn d1:migrate:remote` after `wrangler login` — deploy alone does not create D1 tables |
| Admin 404 in prod | Route is `/admin/`; Access app path matches |
| Build hangs / dies after `Running TypeScript` on Pages | Often OOM — set `NODE_OPTIONS=--max-old-space-size=6144`; use `yarn cf:build` not `yarn build` |
| Build fails on Next peer dep | Next.js **≥ 16.2.6** for current `@opennextjs/cloudflare` |
| `yarn install --immutable` fails (lock out of sync) | Run `yarn install`, commit `yarn.lock` |
| `yarn cf-typegen:check` fails in CI | Run `yarn cf-typegen`, commit updated `worker-configuration.d.ts` |
