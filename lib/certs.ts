import {
  certificationDetails,
  RED_HAT_VERIFICATION,
  type CertificationDetail,
  type CertProvider,
  type CertTier,
} from "@/lib/certifications-data";

export type { CertificationDetail, CertProvider, CertTier };
export { certificationDetails, RED_HAT_VERIFICATION } from "@/lib/certifications-data";

export function certificationsByProvider(
  provider: CertProvider,
): CertificationDetail[] {
  return certificationDetails.filter((cert) => cert.provider === provider);
}

export const CERT_TIERS: { id: CertTier | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "architect", label: "Architect" },
  { id: "engineer", label: "Engineer" },
  { id: "administrator", label: "Admin" },
  { id: "specialist", label: "Specialist" },
  { id: "developer", label: "Developer" },
];

export function filterCertifications(
  certs: CertificationDetail[],
  options: { query: string; tier: CertTier | "all" },
): CertificationDetail[] {
  const q = options.query.trim().toLowerCase();
  return certs.filter((cert) => {
    if (options.tier !== "all" && cert.tier !== options.tier) return false;
    if (!q) return true;
    const haystack = [
      cert.name,
      cert.acronym,
      cert.summary,
      cert.technologies.join(" "),
      cert.technologiesLearned.join(" "),
      cert.skills.join(" "),
      cert.outcomes.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
