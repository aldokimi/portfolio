import { profile } from "@/lib/profile";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-32">
      <div className="max-w-3xl text-center space-y-10">
        <p className="mono-label">Security Engineer</p>
        <h1 className="h1-display">
          {profile.name}
        </h1>
        <p className="body-text mx-auto text-[var(--fg)]/70">
          {profile.bio}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link href="/contact/" className="btn-sharp">
            Get in touch
          </Link>
          <a
            href="https://github.com/aldokimi"
            rel="noreferrer"
            target="_blank"
            className="btn-sharp"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
