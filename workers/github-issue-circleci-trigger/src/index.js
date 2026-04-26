/**
 * Relays GitHub "issues" webhooks to CircleCI pipeline API.
 * Deploy with Wrangler; set secrets and vars per README in this folder.
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

    const branch = env.BUILD_BRANCH || "main";
    const url = `https://circleci.com/api/v2/project/github/${env.GH_ORG}/${env.GH_REPO}/pipeline`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Circle-Token": env.CIRCLE_API_TOKEN,
      },
      body: JSON.stringify({
        branch,
        parameters: { issue_refresh: true },
      }),
    });

    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") || "text/plain" },
    });
  },
};
