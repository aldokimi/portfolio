# Deployment & CI (Cloudflare Workers)

The app runs on **Cloudflare Workers** via **`@opennextjs/cloudflare`**. Build output is **`.open-next/`**. Posts live in **D1** — no rebuild needed when content changes.

---

## 1. One-time setup

1. Create D1: `npx wrangler d1 create portfolio-posts`
2. Put `database_id` in [`wrangler.jsonc`](../wrangler.jsonc)
3. Migrate: `npm run d1:migrate:remote`
4. Login: `npx wrangler login`
5. Deploy: `npm run deploy`
6. Add custom domain in Cloudflare dashboard
7. Configure **Cloudflare Access** on `/admin` — see [admin-blog.md](admin-blog.md)

---

## 2. Deploy from CLI

```bash
npm run deploy
```

Preview locally in Workers runtime:

```bash
npm run preview
```

---

## Troubleshooting

| Symptom | Check |
|--------|--------|
| `/logs` empty but posts exist | D1 migrations applied on remote; `database_id` in wrangler.jsonc |
| `D1 binding DB is not configured` | `wrangler.jsonc` binding name is `DB`; redeploy after config change |
| Admin 404 in prod | Route is `/admin/`; Access app path matches |
| Build fails on Next peer dep | Next.js **≥ 16.2.6** for current `@opennextjs/cloudflare` |
| `npm ci` — lock file out of sync / missing `esbuild@0.28.0` | Commit updated `package-lock.json`; run `npm install` locally before push |
| Local admin works, prod empty DB | Run `npm run d1:migrate:remote` |
