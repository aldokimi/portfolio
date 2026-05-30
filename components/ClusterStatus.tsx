"use client";

import type { ClusterResource, ClusterResourceStatus } from "@/lib/cluster-status";
import { useEffect, useState } from "react";

const STATUS_COLOR: Record<ClusterResourceStatus, string> = {
  Running: "text-emerald-300",
  Ready: "text-cyan-300",
  Complete: "text-violet-300",
};

function formatSyncTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

type ClusterStatusProps = {
  resources: ClusterResource[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

export function ClusterStatus({
  resources,
  selectedId,
  onSelect,
}: ClusterStatusProps) {
  const [syncedAt, setSyncedAt] = useState<Date | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setSyncedAt(new Date());
    const clock = window.setInterval(() => {
      setSyncedAt(new Date());
      setTick((t) => t + 1);
    }, 3000);
    return () => window.clearInterval(clock);
  }, []);

  const healthOk = tick % 2 === 0;
  const selected = resources.find((r) => r.id === selectedId);

  return (
    <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 font-mono text-[11px] shadow-[inset_0_1px_0_0_rgba(34,211,238,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 px-3 py-2">
        <span className="text-cyan-500/80">$ dokictl get all</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-600">
          {syncedAt ? (
            <>
              sync {formatSyncTime(syncedAt)}
              <span
                className={`ml-2 inline-block h-1.5 w-1.5 rounded-full ${healthOk ? "bg-emerald-400" : "bg-emerald-400/40"}`}
                aria-hidden
              />
            </>
          ) : (
            "syncing…"
          )}
        </span>
      </div>

      <div className="overflow-x-auto px-3 py-2">
        <table className="w-full min-w-[28rem] border-collapse">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-widest text-slate-600">
              <th className="pb-2 pr-3 font-normal">namespace</th>
              <th className="pb-2 pr-3 font-normal">name</th>
              <th className="pb-2 pr-3 text-right font-normal">ready</th>
              <th className="pb-2 text-right font-normal">status</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => {
              const isSelected = resource.id === selectedId;
              return (
                <tr key={resource.id}>
                  <td colSpan={4} className="p-0">
                    <button
                      type="button"
                      onClick={() =>
                        onSelect(isSelected ? null : resource.id)
                      }
                      className={`grid w-full grid-cols-[auto_1fr_auto_auto] gap-x-3 px-0 py-1 text-left transition ${
                        isSelected
                          ? "bg-cyan-500/10 ring-1 ring-inset ring-cyan-500/30"
                          : resource.highlight
                            ? "bg-cyan-500/5 hover:bg-slate-800/50"
                            : "hover:bg-slate-800/40"
                      }`}
                    >
                      <span className="py-0.5 pr-3 text-slate-500">
                        {resource.namespace}
                      </span>
                      <span className="py-0.5 pr-3 text-slate-300">
                        {resource.kind}/{resource.name}
                      </span>
                      <span className="py-0.5 pr-3 text-right text-slate-400">
                        {resource.ready}
                      </span>
                      <span
                        className={`py-0.5 text-right font-medium ${STATUS_COLOR[resource.status]}`}
                      >
                        {resource.status}
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected ? (
        <p className="border-t border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-[10px] text-cyan-100/80">
          <span className="text-cyan-500/70">describe pod/{selected.podLabel}</span>
          {" · "}
          {selected.description}
        </p>
      ) : (
        <p className="border-t border-slate-800/80 px-3 py-2 text-[10px] text-slate-600">
          Click a row or a pod in the mesh to inspect. Live data from this
          portfolio.
        </p>
      )}
    </div>
  );
}
