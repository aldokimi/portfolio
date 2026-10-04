import { HomeHero } from "@/components/home/HomeHero";
import { DashboardPanels } from "@/components/home/DashboardPanels";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeSkills } from "@/components/home/HomeSkills";
import { HomeCerts } from "@/components/home/HomeCerts";
import { HomeEducation } from "@/components/home/HomeEducation";
import { HomeProjects } from "@/components/home/HomeProjects";
import { SpringReveal } from "@/components/SpringReveal";
import { SectionNavDots } from "@/components/SectionNavDots";
import { FooterContent } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SectionNavDots />
      <div className="mx-auto flex h-[calc(100dvh-5rem)] w-full max-w-7xl">
        {/* Pinned intro — desktop only. Stays in place while the panel on the right scrolls. */}
        <aside className="relative hidden h-full w-[38%] shrink-0 lg:block">
          <HomeHero showNav />
        </aside>

        <main
          data-lenis-prevent
          className="snap-container relative h-full flex-1 overflow-y-auto"
        >
          {/* Mobile/tablet only — no room for a pinned sidebar below lg, so the intro becomes the first section. */}
          <SpringReveal id="hero" className="lg:hidden">
            <HomeHero />
          </SpringReveal>
          <SpringReveal id="stats" className="mx-auto w-full max-w-5xl items-center">
            <DashboardPanels />
          </SpringReveal>
          <SpringReveal id="experience" className="mx-auto w-full max-w-4xl">
            <HomeExperience />
          </SpringReveal>
          <SpringReveal id="skills" className="mx-auto w-full max-w-4xl">
            <HomeSkills />
          </SpringReveal>
          <SpringReveal id="certs" className="mx-auto w-full max-w-4xl">
            <HomeCerts />
          </SpringReveal>
          <SpringReveal id="education" className="mx-auto w-full max-w-4xl">
            <HomeEducation />
          </SpringReveal>
          <SpringReveal id="projects">
            <HomeProjects />
          </SpringReveal>
          <footer className="snap-end border-t-2 border-[var(--border)] bg-[var(--surface)] py-8">
            <FooterContent />
          </footer>
        </main>
      </div>
    </>
  );
}
