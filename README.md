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

**Recommended (isolated deps + Yarn inside Docker)**

```bash
docker compose build
docker compose run --rm app yarn install
docker compose run --rm app yarn d1:migrate:local
docker compose up
```

Or open folder in Cursor / VS Code → **Reopen in Dev Container** (`./.devcontainer` runs `yarn install` on create).

Open **http://localhost:3000**. Admin **http://localhost:3000/admin/**.

**Host Yarn** (still isolated by lockfile):

```bash
corepack enable
yarn install
yarn d1:migrate:local
yarn dev
```

## Deploy

```bash
yarn deploy
```

Requires `wrangler login` and D1 `database_id` set in `wrangler.jsonc`. On **Cloudflare Pages**, build with `yarn cf:build` (see [deployment-and-ci.md](docs/deployment-and-ci.md)), not `yarn build` alone.

## Logs

Public feed at **`/logs/`**. Posts are markdown articles at **`/logs/<slug>/`**. Manage via **`/admin`** (Access-protected in production).

Details: [`docs/admin-blog.md`](docs/admin-blog.md).
