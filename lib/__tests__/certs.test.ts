import { describe, expect, it } from "vitest";
import {
  RED_HAT_VERIFICATION,
  certificationDetails,
  filterCertifications,
} from "@/lib/certs";

describe("certifications", () => {
  it("has verify url with cert id", () => {
    expect(RED_HAT_VERIFICATION.url).toContain("240-201-996");
    expect(RED_HAT_VERIFICATION.certId).toBe("240-201-996");
  });

  it("lists only verification credentials", () => {
    expect(certificationDetails).toHaveLength(11);
    expect(certificationDetails[1].id).toBe("rhcsa");
    expect(certificationDetails.map((c) => c.name)).toEqual([
      "Red Hat Certified Architect in Enterprise Linux",
      "Red Hat Certified System Administrator",
      "Red Hat Certified Engineer in Ansible",
      "Red Hat Certified Engineer in Enterprise Linux",
      "Red Hat Certified Engineer in OpenShift",
      "Red Hat Certified Specialist in Microsoft Windows Automation with Ansible",
      "Red Hat Certified Advanced System Administrator in Ansible",
      "Red Hat Certified Advanced System Administrator in OpenShift",
      "Red Hat Certified Developer in AI",
      "Red Hat Certified Developer in Cloud-native Applications",
      "Red Hat Certified System Administrator in OpenShift",
    ]);
  });

  it("uses technologies from Red Hat verify page only", () => {
    const rhceRhel = certificationDetails.find((c) => c.id === "rhce-rhel");
    expect(rhceRhel?.technologies).toEqual([
      "Ansible Automation Platform 2.2",
      "Red Hat Enterprise Linux 9",
    ]);

    const rhca = certificationDetails.find((c) => c.id === "rhca-rhel");
    expect(rhca?.technologies).toEqual([]);

    const rhcdCna = certificationDetails.find((c) => c.id === "rhcd-cna");
    expect(rhcdCna?.technologies).toEqual(["Podman 4"]);
  });

  it("includes technologies learned per credential", () => {
    for (const cert of certificationDetails) {
      expect(cert.technologiesLearned.length).toBeGreaterThan(0);
    }
    const rhceOcp = certificationDetails.find((c) => c.id === "rhce-ocp");
    expect(rhceOcp?.technologiesLearned).toContain("GitOps");
  });

  it("filters by tier", () => {
    const architects = filterCertifications(certificationDetails, {
      query: "",
      tier: "architect",
    });
    expect(architects.every((c) => c.tier === "architect")).toBe(true);
  });

  it("filters by learned technology query", () => {
    const matches = filterCertifications(certificationDetails, {
      query: "gitops",
      tier: "all",
    });
    expect(matches.some((c) => c.id === "rhce-ocp")).toBe(true);
  });
});
