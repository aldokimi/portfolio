import { StatsDashboard } from "@/components/home/StatsDashboard";
import { SkillsBarChart } from "@/components/home/SkillsBarChart";
import { skillCategories } from "@/lib/profile";

export function DashboardPanels() {
  return (
    <div className="mx-auto grid w-full max-w-5xl items-stretch gap-6 lg:grid-cols-2">
      <StatsDashboard />
      <SkillsBarChart categories={skillCategories} />
    </div>
  );
}
