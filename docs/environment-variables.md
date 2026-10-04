# Environment variables

Values for local dev and deploy. Do not commit secrets.

---

## Local (`.dev.vars`, gitignored)

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Yes, for `/admin` | Shared password for the in-app admin login. Any value for local dev. |
| `NEXT_PUBLIC_BASE_PATH` | Rarely | Only if the site is under a **subpath**. |

D1 is configured in [`wrangler.jsonc`](../wrangler.jsonc), not env vars. Run `yarn d1:migrate:local` before `yarn dev`.

---

## Cloudflare Workers (production)

D1 binding is in `wrangler.jsonc`. After `wrangler d1 create`, set `database_id` and run `yarn d1:migrate:remote`.

**`ADMIN_PASSWORD`** protects `/admin` — set it as a Workers secret, not a `wrangler.jsonc` var:

```bash
npx wrangler secret put ADMIN_PASSWORD
```

See [admin-blog.md](admin-blog.md) for full setup steps.
