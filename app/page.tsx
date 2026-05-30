import { HomeCerts } from "@/components/home/HomeCerts";
import { HomeEducation } from "@/components/home/HomeEducation";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeOverview } from "@/components/home/HomeOverview";
import { HomeProjects } from "@/components/home/HomeProjects";
import { HomeSkills } from "@/components/home/HomeSkills";
import { HomeTabs } from "@/components/home/HomeTabs";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <HomeTabs
        overview={<HomeOverview />}
        experience={<HomeExperience />}
        skills={<HomeSkills />}
        certs={<HomeCerts />}
        education={<HomeEducation />}
        projects={<HomeProjects />}
      />
    </main>
  );
}
