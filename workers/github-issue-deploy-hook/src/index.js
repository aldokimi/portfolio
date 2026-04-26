/**
 * Verifies GitHub Issues webhooks, then POSTs to a Cloudflare Pages Deploy Hook
 * to start a new production build (see Cloudflare dashboard → Pages → Deploy hooks).
 */

function hex(buf) {
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function verifyGithubSignature256(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) return false;
  const theirs = signatureHeader.slice("sha256=".length);
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  const ours = hex(mac);
  return timingSafeEqualHex(ours.toLowerCase(), theirs.toLowerCase());
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Use POST (GitHub webhook)", { status: 405 });
    }

    const raw = await request.text();
    const sig = request.headers.get("x-hub-signature-256");
    const ok = await verifyGithubSignature256(
      raw,
      sig,
      env.GITHUB_WEBHOOK_SECRET,
    );
    if (!ok) return new Response("Invalid signature", { status: 401 });

    const event = request.headers.get("x-github-event");
    if (event !== "issues") {
      return new Response(JSON.stringify({ ignored: true, event }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      return new Response("Bad JSON", { status: 400 });
    }

    const actions = new Set([
      "opened",
      "edited",
      "deleted",
      "labeled",
      "unlabeled",
    ]);
    if (!actions.has(payload.action)) {
      return new Response(JSON.stringify({ ignored: true, action: payload.action }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const hookUrl = env.PAGES_DEPLOY_HOOK_URL;
    if (!hookUrl) {
      return new Response("Missing PAGES_DEPLOY_HOOK_URL secret", { status: 500 });
    }

    const res = await fetch(hookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    });

    const text = await res.text();
    return new Response(
      JSON.stringify({
        github_action: payload.action,
        deploy_hook_status: res.status,
        deploy_hook_body: text.slice(0, 500),
      }),
      {
        status: res.ok ? 200 : 502,
        headers: { "content-type": "application/json" },
      },
    );
  },
};
