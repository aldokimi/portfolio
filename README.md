# Portfolio (Next.js on Cloudflare)

Cloud-native terminal-themed portfolio with a **Logs** blog backed by **Cloudflare D1**, **Next.js SSR** via **OpenNext**, and an **`/admin`** editor protected by **Cloudflare Access**.

## Documentation

| | |
|--|--|
| **Index** | [`docs/README.md`](docs/README.md) |
| **Admin blog & D1** | [`docs/admin-blog.md`](docs/admin-blog.md) |
| **Deploy** | [`docs/deployment-and-ci.md`](docs/deployment-and-ci.md) |
| **Env vars** | [`docs/environment-variables.md`](docs/environment-variables.md) |

Design spec: [`docs/superpowers/specs/2026-05-23-admin-blog-d1-design.md`](docs/superpowers/specs/2026-05-23-admin-blog-d1-design.md)

---

## Local development

```bash
npm install
npm run d1:migrate:local
npm run dev
```

Open **http://localhost:3000**. Admin at **http://localhost:3000/admin/**.

## Deploy

```bash
npm run deploy
```

Requires `wrangler login` and D1 `database_id` set in `wrangler.jsonc`.

## Logs

Public feed at **`/logs/`**. Posts are markdown articles at **`/logs/<slug>/`**. Manage via **`/admin`** (Access-protected in production).

Details: [`docs/admin-blog.md`](docs/admin-blog.md).
