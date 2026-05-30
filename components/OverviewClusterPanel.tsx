"use client";

import { ClusterStatus } from "@/components/ClusterStatus";
import { MindMapGraph } from "@/components/MindMapGraph";
import { buildClusterResources } from "@/lib/cluster-status";
import { useMemo, useState } from "react";

export function OverviewClusterPanel() {
  const resources = useMemo(() => buildClusterResources(), []);
  const [selectedId, setSelectedId] = useState<string | null>(
    () => resources.find((r) => r.highlight)?.id ?? null,
  );

  return (
    <div className="space-y-4">
      <MindMapGraph
        selectedClusterId={selectedId}
        onSelectCluster={setSelectedId}
      />
      <ClusterStatus
        resources={resources}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </div>
  );
}
