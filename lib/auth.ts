import { getCloudflareContext } from "@opennextjs/cloudflare";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time string compare — avoids leaking password/signature length via timing. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function getAdminPassword(): Promise<string> {
  const { env } = await getCloudflareContext({ async: true });
  const password = (env as unknown as { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD;
  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD is not configured. Set it with `wrangler secret put ADMIN_PASSWORD` in production, or add it to .dev.vars for local dev.",
    );
  }
  return password;
}

export function checkPassword(input: string, expected: string): boolean {
  return input.length > 0 && timingSafeEqual(input, expected);
}

export async function createSessionToken(secret: string): Promise<string> {
  const exp = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(String(exp)));
  return `${exp}.${toHex(sig)}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const [expStr, sigHex] = token.split(".");
  const exp = Number(expStr);
  if (!expStr || !sigHex || !Number.isFinite(exp) || exp < Date.now()) return false;
  const key = await getKey(secret);
  const expected = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(expStr));
  return timingSafeEqual(toHex(expected), sigHex);
}
