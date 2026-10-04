import { HomeHero } from "@/components/home/HomeHero";
import { SectionHeading } from "@/components/home/SectionHeading";

export function HomeOverview() {
  return (
    <div className="space-y-16">
      <section className="scroll-mt-28 space-y-6">
        <SectionHeading label="Overview" title="About me" />
        <HomeHero />
      </section>
    </div>
  );
}
