import { profile } from "@/lib/profile";
import HeroCanvas from "@/components/HeroCanvas";
import { HeroObject } from "@/components/home/HeroObject";
import { ShimmerText } from "@/components/ShimmerText";
import { ParticleButton } from "@/components/ParticleButton";
import { SidebarNav } from "@/components/home/SidebarNav";

export function HomeHero({ showNav = false }: { showNav?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-6 py-16 lg:justify-start lg:px-10">
      <HeroCanvas />
      <HeroObject />
      <div className="relative z-10 max-w-md space-y-8">
        <p className="mono-label">Security Engineer</p>
        <h1 className="h1-intro">
          <ShimmerText text={profile.name} />
        </h1>
        <p className="body-text text-[var(--fg)]/70">{profile.bio}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <ParticleButton href="/contact/" className="btn-sharp">
            Get in touch
          </ParticleButton>
          <ParticleButton href="https://github.com/aldokimi" external className="btn-sharp">
            GitHub
          </ParticleButton>
        </div>
        {showNav ? <SidebarNav /> : null}
      </div>
    </div>
  );
}
