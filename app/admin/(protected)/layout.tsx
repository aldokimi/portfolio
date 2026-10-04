import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminPassword, SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  try {
    const password = await getAdminPassword();
    return verifySessionToken(token, password);
  } catch {
    return false;
  }
}

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login/");
  }

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="mono-label">Admin · Blog</p>
          <nav className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
            <Link href="/admin/" className="hover:text-[var(--accent)] transition-colors">
              All posts
            </Link>
            <Link href="/admin/posts/new/" className="hover:text-[var(--accent)] transition-colors">
              New post
            </Link>
            <Link href="/blog/" className="hover:text-[var(--accent)] transition-colors">
              Public blog
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="hover:text-[var(--accent)] transition-colors">
                Log out
              </button>
            </form>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
