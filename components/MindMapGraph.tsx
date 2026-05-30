"use client";

import {
  buildMindMapGraph,
  navigateHomeTab,
  nodeMatchesClusterSelection,
  type MindMapNode,
} from "@/lib/mind-map";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const MIN_SCALE = 0.45;
const MAX_SCALE = 2.2;
const DRAG_CLICK_THRESHOLD_PX = 5;
const LAYOUT_STORAGE_KEY = "portfolio-mind-map-positions";

function positionsFromGraph(nodes: MindMapNode[]) {
  return Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));
}

function loadSavedPositions(): Record<string, { x: number; y: number }> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, { x: number; y: number }>;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

const GROUP_STYLE: Record<
  MindMapNode["group"],
  { fill: string; stroke: string; r: number }
> = {
  root: { fill: "rgba(34,211,238,0.2)", stroke: "rgba(34,211,238,0.7)", r: 34 },
  hub: { fill: "rgba(15,23,42,0.95)", stroke: "rgba(56,189,248,0.45)", r: 26 },
  leaf: { fill: "rgba(15,23,42,0.9)", stroke: "rgba(100,116,139,0.5)", r: 18 },
};

type ViewTransform = { x: number; y: number; scale: number };

function defaultTransform(
  width: number,
  height: number,
  graphWidth: number,
  graphHeight: number,
): ViewTransform {
  const scale = Math.min(width / graphWidth, height / graphHeight) * 0.88;
  return {
    scale,
    x: (width - graphWidth * scale) / 2,
    y: (height - graphHeight * scale) / 2,
  };
}

type MindMapGraphProps = {
  selectedClusterId: string | null;
  onSelectCluster: (id: string | null) => void;
  className?: string;
};

export function MindMapGraph({
  selectedClusterId,
  onSelectCluster,
  className = "",
}: MindMapGraphProps) {
  const graph = useMemo(() => buildMindMapGraph(), []);
  const defaultPositions = useMemo(
    () => positionsFromGraph(graph.nodes),
    [graph.nodes],
  );
  const [positions, setPositions] =
    useState<Record<string, { x: number; y: number }>>(defaultPositions);
  const [query, setQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [containerSize, setContainerSize] = useState({ w: 640, h: 320 });
  const [transform, setTransform] = useState<ViewTransform>({
    x: 0,
    y: 0,
    scale: 0.75,
  });
  const panRef = useRef({
    active: false,
    ox: 0,
    oy: 0,
    tx: 0,
    ty: 0,
  });
  const nodeDragRef = useRef({
    active: false,
    nodeId: "",
    ox: 0,
    oy: 0,
    nx: 0,
    ny: 0,
    moved: false,
  });
  const containerEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadSavedPositions();
    if (!saved) return;
    setPositions((prev) => {
      const next = { ...prev };
      for (const node of graph.nodes) {
        const p = saved[node.id];
        if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
          next[node.id] = p;
        }
      }
      return next;
    });
  }, [graph.nodes]);

  const getPosition = useCallback(
    (nodeId: string) => positions[nodeId] ?? defaultPositions[nodeId],
    [positions, defaultPositions],
  );

  const clientToGraph = useCallback(
    (clientX: number, clientY: number) => {
      const rect = containerEl.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: (clientX - rect.left - transform.x) / transform.scale,
        y: (clientY - rect.top - transform.y) / transform.scale,
      };
    },
    [transform.x, transform.y, transform.scale],
  );

  useEffect(() => {
    const node = containerEl.current;
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry?.contentRect ?? {
        width: 640,
        height: 320,
      };
      setContainerSize({ w: width, h: height });
      setTransform(defaultTransform(width, height, graph.width, graph.height));
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, [graph.width, graph.height, fullscreen]);

  const selectedNode = graph.nodes.find((n) => n.id === selectedNodeId);
  const q = query.trim().toLowerCase();

  useEffect(() => {
    if (selectedClusterId === "core") {
      setSelectedNodeId("root");
      return;
    }
    const match = graph.nodes.find((n) =>
      nodeMatchesClusterSelection(n, selectedClusterId),
    );
    setSelectedNodeId(match?.id ?? null);
  }, [selectedClusterId, graph.nodes]);

  useEffect(() => {
    if (!fullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  const fitView = useCallback(() => {
    setTransform(
      defaultTransform(
        containerSize.w,
        containerSize.h,
        graph.width,
        graph.height,
      ),
    );
  }, [containerSize, graph.width, graph.height]);

  const resetLayout = useCallback(() => {
    setPositions(defaultPositions);
    localStorage.removeItem(LAYOUT_STORAGE_KEY);
  }, [defaultPositions]);

  const zoom = useCallback((factor: number) => {
    setTransform((t) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, t.scale * factor));
      const cx = containerSize.w / 2;
      const cy = containerSize.h / 2;
      const ratio = next / t.scale;
      return {
        scale: next,
        x: cx - (cx - t.x) * ratio,
        y: cy - (cy - t.y) * ratio,
      };
    });
  }, [containerSize.w, containerSize.h]);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      zoom(e.deltaY > 0 ? 0.92 : 1.08);
    },
    [zoom],
  );

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("[data-node]")) return;
      panRef.current = {
        active: true,
        ox: e.clientX,
        oy: e.clientY,
        tx: transform.x,
        ty: transform.y,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [transform.x, transform.y],
  );

  const activateNode = useCallback(
    (node: MindMapNode) => {
      setSelectedNodeId(node.id);
      if (node.clusterId) onSelectCluster(node.clusterId);
      else if (node.id === "root") onSelectCluster("core");
      else onSelectCluster(null);
      if (node.tab) navigateHomeTab(node.tab);
    },
    [onSelectCluster],
  );

  const onNodePointerDown = useCallback(
    (e: ReactPointerEvent<SVGGElement>, node: MindMapNode) => {
      e.stopPropagation();
      const pos = getPosition(node.id);
      nodeDragRef.current = {
        active: true,
        nodeId: node.id,
        ox: e.clientX,
        oy: e.clientY,
        nx: pos.x,
        ny: pos.y,
        moved: false,
      };
      containerEl.current?.setPointerCapture(e.pointerId);
    },
    [getPosition],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (nodeDragRef.current.active) {
        const dx = e.clientX - nodeDragRef.current.ox;
        const dy = e.clientY - nodeDragRef.current.oy;
        if (
          !nodeDragRef.current.moved &&
          Math.hypot(dx, dy) > DRAG_CLICK_THRESHOLD_PX
        ) {
          nodeDragRef.current.moved = true;
        }
        if (nodeDragRef.current.moved) {
          const start = clientToGraph(
            nodeDragRef.current.ox,
            nodeDragRef.current.oy,
          );
          const current = clientToGraph(e.clientX, e.clientY);
          const id = nodeDragRef.current.nodeId;
          setPositions((prev) => ({
            ...prev,
            [id]: {
              x: nodeDragRef.current.nx + (current.x - start.x),
              y: nodeDragRef.current.ny + (current.y - start.y),
            },
          }));
        }
        return;
      }
      if (!panRef.current.active) return;
      setTransform((t) => ({
        ...t,
        x: panRef.current.tx + (e.clientX - panRef.current.ox),
        y: panRef.current.ty + (e.clientY - panRef.current.oy),
      }));
    },
    [clientToGraph],
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (nodeDragRef.current.active) {
        const { nodeId, moved } = nodeDragRef.current;
        nodeDragRef.current.active = false;
        if (moved) {
          setPositions((latest) => {
            localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(latest));
            return latest;
          });
        } else {
          const node = graph.nodes.find((n) => n.id === nodeId);
          if (node) activateNode(node);
        }
        e.currentTarget.releasePointerCapture(e.pointerId);
        return;
      }
      panRef.current.active = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
    },
    [graph.nodes, activateNode],
  );

  function nodeMatchesSearch(node: MindMapNode): boolean {
    if (!q) return true;
    const hay = `${node.label} ${node.description} ${node.subtitle ?? ""}`.toLowerCase();
    return hay.includes(q);
  }

  const shell = (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-cyan-500/15 bg-slate-950/80 ${
        fullscreen ? "fixed inset-3 z-50 shadow-2xl sm:inset-6" : ""
      } ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          mind map
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => zoom(1.15)}
            className="rounded border border-slate-700 px-2 py-0.5 font-mono text-xs text-slate-400 hover:text-cyan-300"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => zoom(1 / 1.15)}
            className="rounded border border-slate-700 px-2 py-0.5 font-mono text-xs text-slate-400 hover:text-cyan-300"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={fitView}
            className="rounded border border-slate-700 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400 hover:text-cyan-300"
          >
            fit
          </button>
          <button
            type="button"
            onClick={resetLayout}
            className="rounded border border-slate-700 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400 hover:text-cyan-300"
            title="Reset node positions"
          >
            reset
          </button>
          <button
            type="button"
            onClick={() => setFullscreen((f) => !f)}
            className="rounded border border-slate-700 px-2 py-0.5 font-mono text-sm text-slate-300 hover:text-cyan-200"
            aria-label={fullscreen ? "Exit fullscreen" : "Expand"}
          >
            {fullscreen ? "✕" : "⛶"}
          </button>
        </div>
      </div>

      <div className="border-b border-slate-800/80 px-3 py-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search nodes…"
          className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 font-mono text-[11px] text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-500/40"
        />
      </div>

      <div
        ref={containerEl}
        className={`relative w-full bg-slate-950/50 ${
          fullscreen ? "min-h-0 flex-1" : "h-80"
        }`}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg
          width="100%"
          height="100%"
          className="block h-full w-full touch-none"
          role="img"
          aria-label="Portfolio mind map"
        >
          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
            {graph.edges.map((edge) => {
              const from = graph.nodes.find((n) => n.id === edge.from);
              const to = graph.nodes.find((n) => n.id === edge.to);
              if (!from || !to) return null;
              const fromPos = getPosition(from.id);
              const toPos = getPosition(to.id);
              const dimmed =
                q.length > 0 &&
                (!nodeMatchesSearch(from) || !nodeMatchesSearch(to));
              const active =
                selectedNodeId === from.id ||
                selectedNodeId === to.id ||
                nodeMatchesClusterSelection(from, selectedClusterId) ||
                nodeMatchesClusterSelection(to, selectedClusterId);
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={
                    active
                      ? "rgba(34,211,238,0.5)"
                      : dimmed
                        ? "rgba(30,41,59,0.35)"
                        : "rgba(51,65,85,0.55)"
                  }
                  strokeWidth={active ? 2 : 1.25}
                />
              );
            })}
            {graph.nodes.map((node) => {
              const style = GROUP_STYLE[node.group];
              const pos = getPosition(node.id);
              const selected =
                selectedNodeId === node.id ||
                nodeMatchesClusterSelection(node, selectedClusterId);
              const dimmed = q.length > 0 && !nodeMatchesSearch(node);
              const r = selected ? style.r + 3 : style.r;
              return (
                <g
                  key={node.id}
                  data-node
                  transform={`translate(${pos.x},${pos.y})`}
                  className="cursor-grab active:cursor-grabbing"
                  opacity={dimmed ? 0.25 : 1}
                  onPointerDown={(e) => onNodePointerDown(e, node)}
                >
                  <circle
                    r={r}
                    fill={style.fill}
                    stroke={selected ? "#22d3ee" : style.stroke}
                    strokeWidth={selected ? 2.5 : 1.5}
                  />
                  <text
                    textAnchor="middle"
                    y={node.subtitle ? -2 : 1}
                    className="pointer-events-none select-none font-mono text-[9px] font-medium fill-slate-100"
                  >
                    {node.label.length > 11
                      ? `${node.label.slice(0, 10)}…`
                      : node.label}
                  </text>
                  {node.subtitle ? (
                    <text
                      y={10}
                      textAnchor="middle"
                      className="pointer-events-none select-none font-mono text-[7px] fill-slate-500"
                    >
                      {node.subtitle}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        </svg>
        <p className="pointer-events-none absolute bottom-2 left-3 font-mono text-[9px] text-slate-600">
          drag nodes to move · background to pan · scroll to zoom · click to open
        </p>
      </div>

      {selectedNode ? (
        <div className="border-t border-cyan-500/20 bg-cyan-500/5 px-3 py-2 font-mono text-[10px] text-slate-300">
          <span className="text-cyan-400">{selectedNode.label}</span>
          {" — "}
          {selectedNode.description}
          {selectedNode.href ? (
            <>
              {" "}
              {selectedNode.external ? (
                <a
                  href={selectedNode.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  open →
                </a>
              ) : (
                <Link href={selectedNode.href} className="text-cyan-400 hover:text-cyan-300">
                  open →
                </Link>
              )}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      {fullscreen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
          aria-hidden
          onClick={() => setFullscreen(false)}
        />
      ) : null}
      {shell}
    </>
  );
}
