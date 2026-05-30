import { describe, expect, it } from "vitest";
import { buildClusterResources } from "@/lib/cluster-status";

describe("cluster-status", () => {
  it("builds resources from profile data", () => {
    const resources = buildClusterResources();
    expect(resources.length).toBeGreaterThanOrEqual(5);
    expect(resources.some((r) => r.highlight && r.id === "platform")).toBe(true);
    expect(resources.every((r) => r.podLabel.length > 0)).toBe(true);
    expect(resources.find((r) => r.namespace === "certs")?.ready).toMatch(
      /^\d+\/\d+$/,
    );
  });
});
