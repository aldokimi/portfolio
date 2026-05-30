"use client";

import {
  SKILL_CATEGORIES,
  filterSkills,
  indexedSkills,
  rolesUsingSkill,
} from "@/lib/skills";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

const CATEGORY_SHORT: Record<string, string> = {
  "Programming Languages": "Lang",
  "Backend & Frameworks": "Backend",
  "Cloud & Infrastructure": "Cloud",
  "Tools and Technologies": "Tools",
  Security: "Security",
  "AI/ML": "AI/ML",
  "Collaboration & Methodologies": "Collab",
};

export function SkillsTerminal() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(
    () => filterSkills(indexedSkills, { query, category }),
    [query, category],
  );

  const selectedSkill = useMemo(
    () => indexedSkills.find((s) => s.name === selected) ?? null,
    [selected],
  );

  const roles = useMemo(
    () => (selectedSkill ? rolesUsingSkill(selectedSkill.name) : []),
    [selectedSkill],
  );

  const statusLine = useMemo(() => {
    const parts = [
      `${filtered.length} shown`,
      `${indexedSkills.length} total`,
      category ? CATEGORY_SHORT[category] ?? category : "all categories",
    ];
    if (query.trim()) parts.unshift(`filter:"${query.trim()}"`);
    return parts.join(" · ");
  }, [filtered.length, category, query]);

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-slate-950/80 font-mono text-[13px] shadow-[0_0_40px_-16px_rgba(34,211,238,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 px-4 py-2">
        <span className="text-cyan-500/80">$ skills --interactive</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-600">
          {statusLine}
        </span>
      </div>

      <div className="space-y-4 border-b border-slate-800/80 px-4 py-4">
        <label className="block space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-slate-500">
            $ skills --filter
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="python, k8s, security…"
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-500/40"
          />
        </label>

        <div
          className="flex flex-wrap gap-1.5"
          role="tablist"
          aria-label="Skill categories"
        >
          <CategoryPill
            active={category === null}
            onClick={() => setCategory(null)}
            label="All"
          />
          {SKILL_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              active={category === cat}
              onClick={() =>
                setCategory((c) => (c === cat ? null : cat))
              }
              label={CATEGORY_SHORT[cat] ?? cat}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_minmax(12rem,16rem)]">
        <div className="max-h-[min(22rem,50vh)] overflow-y-auto px-4 py-4">
          {filtered.length === 0 ? (
            <p className="text-slate-500">
              No skills match. Try clearing the filter or another category.
            </p>
          ) : (
            <motion.ul
              layout
              className="flex flex-wrap gap-2"
              role="listbox"
              aria-label="Skills"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((skill) => (
                  <motion.li
                    key={`${skill.category}-${skill.name}`}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.15 }}
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected === skill.name}
                      onClick={() =>
                        setSelected((s) =>
                          s === skill.name ? null : skill.name,
                        )
                      }
                      className={`rounded-md border px-2.5 py-1 text-[12px] transition ${
                        selected === skill.name
                          ? "border-cyan-400/60 bg-cyan-500/15 text-cyan-100"
                          : "border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-cyan-500/30 hover:bg-slate-800/80 hover:text-cyan-100/90"
                      }`}
                    >
                      {skill.name}
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>

        <aside className="border-t border-slate-800/80 bg-slate-900/25 px-4 py-4 lg:border-t-0 lg:border-l">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">
            $ skills describe
          </p>
          {selectedSkill ? (
            <div className="mt-3 space-y-3 text-[12px] leading-relaxed">
              <p className="text-lg text-cyan-200/95">{selectedSkill.name}</p>
              <p className="text-slate-300">{selectedSkill.description}</p>
              <p className="text-slate-400">
                <span className="text-slate-500">category:</span>{" "}
                {selectedSkill.category}
              </p>
              <div>
                <p className="text-slate-500">roles (from stack tags):</p>
                {roles.length > 0 ? (
                  <ul className="mt-1 space-y-1">
                    {roles.map((role) => (
                      <li key={role.id}>
                        <Link
                          href="/#experience"
                          className="text-cyan-400/90 hover:text-cyan-300"
                        >
                          {role.company}
                        </Link>
                        <span className="text-slate-600"> · {role.id}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-slate-600">
                    Not tagged on a role card — still in inventory.
                  </p>
                )}
              </div>
              <p className="text-[10px] text-slate-600">
                Tip: run{" "}
                <span className="text-cyan-500/80">
                  dokictl get skills
                </span>{" "}
                in{" "}
                <Link href="/terminal/" className="text-cyan-500/80 hover:underline">
                  /terminal
                </Link>
              </p>
            </div>
          ) : (
            <p className="mt-3 text-slate-600">
              Select a skill chip to read a short definition, see its category,
              and which experience nodes reference it.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

function CategoryPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-widest transition ${
        active
          ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
          : "border-slate-700/80 text-slate-500 hover:border-slate-600 hover:text-slate-300"
      }`}
    >
      {label}
    </button>
  );
}
