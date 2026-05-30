"use client";

import {
  CERT_TIERS,
  RED_HAT_VERIFICATION,
  certificationDetails,
  certificationsByProvider,
  filterCertifications,
  type CertificationDetail,
  type CertTier,
} from "@/lib/certs";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

export function CertsTerminal() {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<CertTier | "all">("all");
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const filtered = useMemo(
    () => filterCertifications(certificationDetails, { query, tier }),
    [query, tier],
  );

  const opened = useMemo(
    () => certificationDetails.find((c) => c.id === openedId) ?? null,
    [openedId],
  );

  const resetFilters = useCallback((nextQuery: string, nextTier: CertTier | "all") => {
    setQuery(nextQuery);
    setTier(nextTier);
    setOpenedId(null);
    setFocusIndex(0);
  }, []);

  const openCert = useCallback((cert: CertificationDetail) => {
    setOpenedId(cert.id);
    const index = filtered.findIndex((c) => c.id === cert.id);
    if (index >= 0) setFocusIndex(index);
    requestAnimationFrame(() => {
      itemRefs.current.get(cert.id)?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    });
  }, [filtered]);

  function moveFocus(delta: number) {
    if (filtered.length === 0) return;
    setFocusIndex(
      (i) => (i + delta + filtered.length) % filtered.length,
    );
  }

  function handleListKeyDown(e: React.KeyboardEvent) {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveFocus(1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      moveFocus(-1);
    }
    if (e.key === "Home") {
      e.preventDefault();
      setFocusIndex(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setFocusIndex(filtered.length - 1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const cert = filtered[focusIndex];
      if (cert) openCert(cert);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpenedId(null);
    }
  }

  const focusedCert = filtered[focusIndex];
  const redHatCerts = useMemo(
    () => certificationsByProvider("redhat"),
    [],
  );

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-slate-950/80 font-mono text-[13px] shadow-[0_0_40px_-16px_rgba(34,211,238,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-2">
        <span className="text-cyan-500/80">$ certs --trust-store</span>
        <a
          href={RED_HAT_VERIFICATION.url}
          target="_blank"
          rel="noreferrer"
          className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-emerald-300 hover:bg-emerald-500/20"
        >
          Red Hat · Verify #{RED_HAT_VERIFICATION.certId}
        </a>
      </div>

      <div className="border-b border-slate-800/80 px-4 py-3 text-[11px] leading-relaxed text-slate-400">
        <p>
          <span className="text-slate-500">credentials:</span>{" "}
          {certificationDetails.length} listed
        </p>
        <p>
          <span className="text-slate-500">red hat:</span> {redHatCerts.length}{" "}
          · <span className="text-slate-500">verify-id:</span>{" "}
          {RED_HAT_VERIFICATION.certId}
        </p>
        <p className="text-slate-600">
          <span className="text-slate-500">red hat owner:</span>{" "}
          {RED_HAT_VERIFICATION.owner}
        </p>
        <p className="mt-1 text-slate-600">
          Click a credential to describe · ↑↓ move focus · Enter open · Esc close
        </p>
      </div>

      <div className="space-y-4 border-b border-slate-800/80 px-4 py-4">
        <label className="block space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-slate-500">
            $ certs --filter
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              resetFilters(e.target.value, tier);
            }}
            placeholder="openshift, ansible, EX294…"
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-500/40"
          />
        </label>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Cert tiers">
          {CERT_TIERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tier === id}
              onClick={() => resetFilters(query, id)}
              className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-widest transition ${
                tier === id
                  ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                  : "border-slate-700/80 text-slate-500 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid max-h-[min(32rem,65vh)] min-h-[20rem] grid-rows-1 gap-0 lg:grid-cols-2">
        <div className="flex min-h-0 flex-col border-b border-slate-800/80 lg:border-b-0 lg:border-r lg:border-slate-800/80">
          <p className="shrink-0 border-b border-slate-800/60 px-4 py-2 text-[10px] uppercase tracking-widest text-slate-500">
            credentials ({filtered.length})
          </p>
          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-slate-500">No credentials match this filter.</p>
          ) : (
            <ul
              className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-3 outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/40"
              role="listbox"
              aria-label="Certifications"
              aria-activedescendant={
                focusedCert ? `cert-option-${focusedCert.id}` : undefined
              }
              tabIndex={0}
              onKeyDown={handleListKeyDown}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((cert, index) => {
                  const isOpened = openedId === cert.id;
                  const isFocused = focusIndex === index && !isOpened;
                  return (
                    <motion.li
                      key={cert.id}
                      layout
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <button
                        ref={(node) => {
                          if (node) itemRefs.current.set(cert.id, node);
                          else itemRefs.current.delete(cert.id);
                        }}
                        id={`cert-option-${cert.id}`}
                        type="button"
                        role="option"
                        aria-selected={isOpened}
                        onClick={() => {
                          setFocusIndex(index);
                          setOpenedId((id) => (id === cert.id ? null : cert.id));
                        }}
                        className={`relative w-full rounded-lg border px-3 py-2.5 text-left transition ${
                          isOpened
                            ? "border-cyan-400/60 bg-cyan-500/15 shadow-[inset_3px_0_0_0_rgba(34,211,238,0.9)]"
                            : isFocused
                              ? "border-slate-500 bg-slate-800/70"
                              : cert.highlight
                                ? "border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/35 hover:bg-slate-800/60"
                                : "border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span
                            className={`text-[12px] font-medium ${
                              isOpened ? "text-cyan-100" : "text-slate-200"
                            }`}
                          >
                            {cert.acronym}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] leading-snug text-slate-400">
                          {cert.name}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-600">
                          until {cert.validUntil}
                        </p>
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>

        <aside className="flex min-h-0 flex-col bg-slate-900/25">
          <p className="shrink-0 border-b border-slate-800/60 px-4 py-2 text-[10px] uppercase tracking-widest text-slate-500">
            $ certs describe
            {opened ? ` · ${opened.acronym}` : ""}
          </p>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <AnimatePresence mode="wait">
              {opened ? (
                <motion.div
                  key={opened.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4 text-[12px] leading-relaxed"
                >
                  <div>
                    <p className="text-base text-cyan-200/95">{opened.acronym}</p>
                    <p className="mt-1 text-slate-300">{opened.name}</p>
                    <p className="mt-3 text-slate-300">{opened.summary}</p>
                  </div>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[11px]">
                    <dt className="text-slate-500">valid until</dt>
                    <dd className="text-slate-300">{opened.validUntil}</dd>
                    {opened.earnedDate ? (
                      <>
                        <dt className="text-slate-500">earned</dt>
                        <dd className="text-slate-300">{opened.earnedDate}</dd>
                      </>
                    ) : null}
                    <dt className="text-slate-500">tier</dt>
                    <dd className="uppercase text-slate-300">{opened.tier}</dd>
                  </dl>
                  {opened.technologies.length > 0 ? (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">
                        technologies used
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {opened.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-slate-700/80 bg-slate-950/80 px-2 py-0.5 text-[10px] text-cyan-100/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {opened.technologiesLearned.length > 0 ? (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">
                        technologies learned
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {opened.technologiesLearned.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-200/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                      skills demonstrated
                    </p>
                    <ul className="mt-1 list-inside list-disc text-slate-300 marker:text-cyan-500/50">
                      {opened.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                      learning outcomes
                    </p>
                    <ul className="mt-1 list-inside list-disc text-slate-300 marker:text-emerald-500/50">
                      {opened.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                  {opened.provider === "redhat" ? (
                    <a
                      href={RED_HAT_VERIFICATION.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block rounded border border-emerald-500/40 px-3 py-1.5 text-[10px] uppercase tracking-widest text-emerald-300 hover:bg-emerald-500/10"
                    >
                      Verify on Red Hat (#{RED_HAT_VERIFICATION.certId})
                    </a>
                  ) : null}
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-600"
                >
                  Click a credential to load its description, skills, and learning
                  outcomes. Red Hat entries link to Certification Central; other
                  issuers will show their own verification when added.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </div>
  );
}
