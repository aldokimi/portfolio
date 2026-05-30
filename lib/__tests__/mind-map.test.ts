import { describe, expect, it } from "vitest";
import { buildMindMapGraph, nodeMatchesClusterSelection } from "@/lib/mind-map";

describe("mind-map", () => {
  it("builds a connected graph with root and hubs", () => {
    const graph = buildMindMapGraph();
    expect(graph.nodes.some((n) => n.id === "root")).toBe(true);
    expect(graph.nodes.some((n) => n.id === "hub-experience")).toBe(true);
    expect(graph.edges.some((e) => e.from === "root" && e.to === "hub-certs")).toBe(
      true,
    );
    expect(graph.nodes.length).toBeGreaterThan(15);
  });

  it("matches cluster selection to nodes", () => {
    const graph = buildMindMapGraph();
    const platform = graph.nodes.find((n) => n.clusterId === "platform");
    expect(platform).toBeDefined();
    expect(nodeMatchesClusterSelection(platform!, "platform")).toBe(true);
    expect(nodeMatchesClusterSelection(graph.nodes[0]!, "core")).toBe(true);
  });
});
