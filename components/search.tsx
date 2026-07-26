"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories } from "@/lib/categories";
import { normalizeArabic } from "@/lib/normalize";
import { recipes } from "@/lib/recipes-data";
import { sourceMeta } from "@/lib/source";

// Lightweight client-side search index (mock data is small and static).
const catName = (slug: string) =>
  categories.find((c) => c.slug === slug)?.nameAr ?? "";

const index = recipes.map((r) => ({
  id: r.id,
  titleAr: r.titleAr,
  categoryAr: catName(r.categorySlug),
  page: r.notebookPage,
  badge: sourceMeta(r).label,
  haystack: normalizeArabic(
    [r.titleAr, r.titleEn ?? "", catName(r.categorySlug), ...r.ingredients].join(" "),
  ),
}));

export function Search() {
  const [query, setQuery] = useState("");
  const q = normalizeArabic(query);

  const results = useMemo(() => {
    if (!q) return [];
    return index.filter((r) => r.haystack.includes(q));
  }, [q]);

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-ink-700/40 dark:text-cream-100/40">
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
          placeholder="ابحث عن وصفة أو مكوّن..."
          aria-label="بحث في الوصفات"
          className="w-full rounded-2xl border border-cream-300 bg-cream-50/80 py-3.5 pe-12 ps-4 text-base text-ink-800 shadow-sm outline-none transition focus:border-clay-400 focus:ring-2 focus:ring-clay-400/30 dark:border-ink-800 dark:bg-ink-900/60 dark:text-cream-100"
        />
      </div>

      {q && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-cream-300 bg-cream-50/50 px-4 py-6 text-center text-sm text-ink-700/60 dark:border-ink-800 dark:bg-ink-900/40 dark:text-cream-100/60">
              لا توجد وصفة مطابقة لبحثك.
            </p>
          ) : (
            <>
              <p className="mb-2 text-xs text-ink-700/60 dark:text-cream-100/50">
                {results.length} نتيجة
              </p>
              <ul className="space-y-2">
                {results.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/recipe/${r.id}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-cream-200 bg-cream-50/70 px-4 py-3 transition hover:border-clay-400/60 hover:bg-white dark:border-ink-800 dark:bg-ink-900/50 dark:hover:bg-ink-900"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-display font-bold text-ink-800 dark:text-cream-100">
                          {r.titleAr}
                        </span>
                        <span className="text-xs text-ink-700/55 dark:text-cream-100/45">
                          {r.categoryAr}
                          {r.page != null ? ` · صفحة ${r.page}` : ""}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-clay-600 dark:text-clay-400">
                        {r.badge}
                      </span>
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
