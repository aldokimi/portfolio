import { OverviewClusterPanel } from "@/components/OverviewClusterPanel";
import { TerminalHero } from "@/components/TerminalHero";
import { SectionHeading } from "@/components/home/SectionHeading";

export function HomeOverview() {
  return (
    <div className="space-y-14">
      <section id="top" className="scroll-mt-28 space-y-6">
        <SectionHeading label="Architecture" title="System overview" />
        <TerminalHero />
        <OverviewClusterPanel />
      </section>
    </div>
  );
}
