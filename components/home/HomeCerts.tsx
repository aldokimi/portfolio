import { CertsTerminal } from "@/components/CertsTerminal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function HomeCerts() {
  return (
    <div id="certs" className="scroll-mt-28 space-y-4">
      <SectionHeading label="Certifications" title="Trust store" />
      <CertsTerminal />
    </div>
  );
}
