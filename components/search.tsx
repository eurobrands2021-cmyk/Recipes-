"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSettings } from "./settings-provider";
import { SourceBadge } from "./source-badge";
import { cards, localizedCategories } from "@/lib/localized";
import { normalizeArabic } from "@/lib/normalize";

export function Search() {
  const { locale, t } = useSettings();
  const [query, setQuery] = useState("");
  const q = normalizeArabic(query);

  const catNames = useMemo(() => {
    const m: Record<string, string> = {};
    for (const c of localizedCategories(locale)) m[c.slug] = c.name;
    return m;
  }, [locale]);

  // Match across all locales (index is prebuilt); also match the raw query for
  // Latin (English) text.
  const results = useMemo(() => {
    if (!q) return [];
    const raw = query.trim().toLowerCase();
    return cards.filter(
      (c) => c.search.includes(q) || (raw && c.search.includes(raw)),
    );
  }, [q, query]);

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-ink-700/40 dark:text-cream-100/40">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" />
          </svg>
        </span>
        <input
          type="search"
          inputMode="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="w-full rounded-2xl border border-cream-300 bg-cream-50/80 py-3.5 pe-12 ps-4 text-base text-ink-800 shadow-sm outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30 dark:border-ink-800 dark:bg-ink-900/60 dark:text-cream-100"
        />
      </div>

      {q && (
        <div className="mt-4 animate-pop-in">
          {results.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-cream-300 bg-cream-50/50 px-4 py-6 text-center text-sm text-ink-700/60 dark:border-ink-800 dark:bg-ink-900/40 dark:text-cream-100/60">
              {t("searchNone")}
            </p>
          ) : (
            <>
              <p className="mb-2 text-xs text-ink-700/60 dark:text-cream-100/50">
                {results.length} {t("searchResults")}
              </p>
              <ul className="space-y-2">
                {results.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/recipe/${c.id}`}
                      className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-cream-200 bg-cream-50/70 px-4 py-3 transition-all hover:border-accent-400/60 hover:bg-white active:scale-[0.99] dark:border-ink-800 dark:bg-ink-900/50 dark:hover:bg-ink-900"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-display font-bold text-ink-800 dark:text-cream-100">
                          {c.title[locale]}
                        </span>
                        <span className="text-xs text-ink-700/55 dark:text-cream-100/45">
                          {catNames[c.categorySlug]}
                          {c.notebookPage != null ? ` · ${c.notebookPage}` : ""}
                        </span>
                      </span>
                      <SourceBadge
                        sourceType={c.sourceType}
                        sourceNote={c.sourceNote[locale]}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
