# Environment variables

Values for local dev and deploy. Do not commit secrets.

---

## Local (`.env.local`)

Copy from [`.env.example`](../.env.example).

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BASE_PATH` | Rarely | Only if the site is under a **subpath**. |

D1 is configured in [`wrangler.jsonc`](../wrangler.jsonc), not env vars. Run `npm run d1:migrate:local` before `npm run dev`.

---

## Cloudflare Workers (production)

D1 binding is in `wrangler.jsonc`. After `wrangler d1 create`, set `database_id` and run `npm run d1:migrate:remote`.

**Cloudflare Access** protects `/admin` in the Zero Trust dashboard — not an env var.

See [admin-blog.md](admin-blog.md) for setup steps.
