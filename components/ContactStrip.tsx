import { profile, type ProfileLink } from "@/lib/profile";

function LinkItem({ link }: { link: ProfileLink }) {
  const external = link.external ?? link.href.startsWith("http");
  return (
    <a
      href={link.href}
      className="btn-sharp text-xs"
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
  const links = profile.links;

  return (
    <div className="space-y-4">
      {variant === "full" ? (
        <p className="text-base text-[var(--muted)] leading-relaxed">
          Open to interesting platform, cloud-native, and security engineering work.
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
