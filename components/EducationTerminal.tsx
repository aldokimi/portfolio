"use client";

import {
  CURRICULUM_CATEGORIES,
  CURRICULUM_CATEGORY_LABELS,
  ELTE_BSC_CURRICULUM_URL,
  curriculumSemesterFilters,
  filterCurriculum,
  formatCurriculumSemester,
  getCurriculum,
  type CurriculumCategory,
  type CurriculumSemester,
  type CurriculumSubject,
} from "@/lib/education";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

const CATEGORY_STYLE: Record<CurriculumSubject["category"], string> = {
  core: "border-slate-600/60 text-slate-300",
  math: "border-violet-500/30 text-violet-200/80",
  cs: "border-cyan-500/30 text-cyan-200/80",
  thesis: "border-emerald-500/30 text-emerald-200/80",
};

function FilterPill({
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
      className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider transition ${
        active
          ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-200"
          : "border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
      }`}
    >
      {label}
    </button>
  );
}

export function EducationTerminal({ curriculumId }: { curriculumId: string }) {
  const subjects = useMemo(() => getCurriculum(curriculumId), [curriculumId]);
  const semesterFilters = useMemo(
    () => curriculumSemesterFilters(subjects),
    [subjects],
  );
  const [query, setQuery] = useState("");
  const [semester, setSemester] = useState<CurriculumSemester | "all">("all");
  const [category, setCategory] = useState<CurriculumCategory | "all">("all");
  const [openedId, setOpenedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => filterCurriculum(subjects, { query, semester, category }),
    [subjects, query, semester, category],
  );

  const opened = useMemo(
    () => subjects.find((s) => s.id === openedId) ?? null,
    [subjects, openedId],
  );

  const statusLine = useMemo(() => {
    const semesterLabel =
      semester === "all"
        ? "all semesters"
        : semesterFilters.find((f) => f.id === semester)?.label ?? String(semester);
    const categoryLabel =
      category === "all"
        ? "all types"
        : CURRICULUM_CATEGORY_LABELS[category];
    const parts = [
      `${filtered.length} shown`,
      `${subjects.length} in curriculum`,
      semesterLabel,
      categoryLabel,
    ];
    if (query.trim()) parts.unshift(`filter:"${query.trim()}"`);
    return parts.join(" · ");
  }, [filtered.length, subjects.length, semester, category, query, semesterFilters]);

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-slate-950/80 font-mono text-[13px] shadow-[0_0_40px_-16px_rgba(34,211,238,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 px-4 py-2">
        <span className="text-cyan-500/80">$ curriculum --explore</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-600">
          {statusLine}
        </span>
      </div>

      <div className="space-y-3 border-b border-slate-800/80 px-4 py-3">
        <label className="block space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-slate-500">
            $ courses --filter
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="algorithms, database, web…"
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-500/40"
          />
        </label>

        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-slate-600">
            semester
          </p>
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="Semester filter"
          >
            {semesterFilters.map(({ id, label }) => (
              <FilterPill
                key={String(id)}
                active={semester === id}
                label={label}
                onClick={() => setSemester(id)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-slate-600">
            type
          </p>
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="Course type filter"
          >
            {CURRICULUM_CATEGORIES.map(({ id, label }) => (
              <FilterPill
                key={id}
                active={category === id}
                label={label}
                onClick={() => setCategory(id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid max-h-[min(32rem,65vh)] min-h-[20rem] grid-rows-1 gap-0 lg:grid-cols-2">
        <div className="flex min-h-0 flex-col border-b border-slate-800/80 lg:border-b-0 lg:border-r lg:border-slate-800/80">
          <ul
            className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-3"
            role="listbox"
            aria-label="Curriculum subjects"
          >
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <li className="text-slate-500">No courses match this filter.</li>
              ) : (
                filtered.map((subject) => {
                  const isOpened = openedId === subject.id;
                  return (
                    <motion.li
                      key={subject.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={isOpened}
                        onClick={() =>
                          setOpenedId((id) =>
                            id === subject.id ? null : subject.id,
                          )
                        }
                        className={`relative w-full rounded-lg border px-3 py-2.5 text-left transition ${
                          isOpened
                            ? "border-cyan-400/60 bg-cyan-500/15 shadow-[inset_3px_0_0_0_rgba(34,211,238,0.9)]"
                            : "border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-[11px] text-cyan-300/90">
                            {subject.code}
                          </span>
                          <span
                            className={`rounded border px-1.5 py-0.5 text-[9px] uppercase tracking-wide ${CATEGORY_STYLE[subject.category]}`}
                          >
                            {CURRICULUM_CATEGORY_LABELS[subject.category]}
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] leading-snug text-slate-200">
                          {subject.name}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-600">
                          {formatCurriculumSemester(subject.semester)} ·{" "}
                          {subject.schedule}
                        </p>
                      </button>
                    </motion.li>
                  );
                })
              )}
            </AnimatePresence>
          </ul>
        </div>

        <aside className="min-h-0 overflow-y-auto px-4 py-4">
          <AnimatePresence mode="wait">
            {opened ? (
              <motion.div
                key={opened.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">
                    {opened.code}
                  </p>
                  <p className="mt-1 text-base text-cyan-200/95">{opened.name}</p>
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[11px]">
                  <dt className="text-slate-500">semester</dt>
                  <dd className="text-slate-300">
                    {formatCurriculumSemester(opened.semester)}
                  </dd>
                  <dt className="text-slate-500">schedule</dt>
                  <dd className="text-slate-300">{opened.schedule}</dd>
                  <dt className="text-slate-500">type</dt>
                  <dd className="text-slate-300">
                    {CURRICULUM_CATEGORY_LABELS[opened.category]}
                  </dd>
                </dl>
                <p className="text-sm leading-relaxed text-slate-400">
                  {opened.description}
                </p>
                {opened.prerequisites && opened.prerequisites.length > 0 ? (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                      prerequisites
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {opened.prerequisites.map((pre) => (
                        <span
                          key={pre}
                          className="rounded border border-slate-700/80 bg-slate-950/80 px-2 py-0.5 text-[10px] text-slate-400"
                        >
                          {pre}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-600"
              >
                Click a course to view its description, schedule, and
                prerequisites. Based on the official ELTE Computer Science BSc
                curriculum (2018, English).
              </motion.p>
            )}
          </AnimatePresence>
          <a
            href={ELTE_BSC_CURRICULUM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block text-[10px] uppercase tracking-widest text-cyan-500/70 hover:text-cyan-400"
          >
            Official curriculum PDF →
          </a>
        </aside>
      </div>
    </div>
  );
}
