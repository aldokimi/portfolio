import { profile, type ProfileLink } from "@/lib/profile";

function LinkItem({ link }: { link: ProfileLink }) {
  const external = link.external ?? link.href.startsWith("http");
  return (
    <a
      href={link.href}
      className="rounded-md border border-slate-800 bg-slate-900/50 px-3 py-1.5 font-mono text-xs text-cyan-300/90 transition hover:border-cyan-500/40 hover:text-cyan-200"
      {...(external ? { rel: "noreferrer", target: "_blank" } : {})}
    >
      {link.label}
    </a>
  );
}

export function ContactStrip({
  variant = "full",
}: {
  variant?: "compact" | "full";
}) {
  const links =
    variant === "compact"
      ? profile.links.filter((l) => l.label !== "Phone")
      : profile.links;

  return (
    <div className="space-y-3">
      {variant === "full" ? (
        <p className="text-sm text-slate-400">
          Open to interesting platform, cloud-native, and security engineering
          work.
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <LinkItem key={link.href} link={link} />
        ))}
      </div>
    </div>
  );
}
