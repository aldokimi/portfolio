import { SectionHeading } from "@/components/home/SectionHeading";
import { CertGrid } from "@/components/CertGrid";

export function HomeCerts() {
  return (
    <div id="certs" className="scroll-mt-28 space-y-4">
      <SectionHeading label="Certifications" title="Trust store" />
      <CertGrid />
    </div>
  );
}
