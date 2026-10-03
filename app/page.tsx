import { HomeHero } from "@/components/home/HomeHero";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeSkills } from "@/components/home/HomeSkills";
import { HomeCerts } from "@/components/home/HomeCerts";
import { HomeEducation } from "@/components/home/HomeEducation";
import { HomeProjects } from "@/components/home/HomeProjects";
import { ScrollAnimations } from "@/components/ScrollAnimations";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:py-24">
      <HomeHero />
      <ScrollAnimations>
        <div className="mt-20 space-y-24">
          <div data-scroll-anim>
            <HomeExperience />
          </div>
          <div data-scroll-anim>
            <HomeSkills />
          </div>
          <div data-scroll-anim>
            <HomeCerts />
          </div>
          <div data-scroll-anim>
            <HomeEducation />
          </div>
          <div data-scroll-anim>
            <HomeProjects />
          </div>
        </div>
      </ScrollAnimations>
    </main>
  );
}
