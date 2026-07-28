"use client";

import Link from "next/link";
import { RecipeCard } from "./recipe-card";
import { RecipeListSkeleton } from "./skeletons";
import { useHistory } from "./history-provider";
import { useSettings } from "./settings-provider";
import { cardById, localizedCategories } from "@/lib/localized";

export function HistoryView() {
  const { orderedIds, history, ready } = useHistory();
  const { locale, t } = useSettings();

  const catNames: Record<string, string> = {};
  for (const c of localizedCategories(locale)) catNames[c.slug] = c.name;

  const dateFmt = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "ar-EG", {
    day: "numeric",
    month: "long",
  });

  const entries = orderedIds
    .map((id) => ({ card: cardById(id), entry: history[id] }))
    .filter((x): x is { card: NonNullable<ReturnType<typeof cardById>>; entry: typeof history[string] } =>
      Boolean(x.card),
    );

  const noteFor = (count: number, lastAt: number) => {
    const times =
      count === 1 ? t("historyOnce") : `${count} ${t("historyTimes")}`;
    return `${times} · ${t("historyLast")} ${dateFmt.format(new Date(lastAt))}`;
  };

  return (
    <div className="space-y-6 pt-2">
      <header className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-500/12 text-accent-600 dark:text-accent-400">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 8v4l3 2" />
            <path d="M3.05 11a9 9 0 1 1 .5 4" />
            <path d="M3 4v4h4" />
          </svg>
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-cream-100">
            {t("historyTitle")}
          </h1>
          <p className="text-sm text-ink-700/55 dark:text-cream-100/45">
            {ready ? `${entries.length} ${t("countRecipes")}` : "…"}
          </p>
        </div>
      </header>

      {!ready ? (
        <RecipeListSkeleton count={3} />
      ) : entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-cream-300 bg-cream-50/50 px-6 py-12 text-center dark:border-ink-800 dark:bg-ink-900/40">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-500/10 text-accent-500/70">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 8v4l3 2" />
              <path d="M3.05 11a9 9 0 1 1 .5 4" />
              <path d="M3 4v4h4" />
            </svg>
          </div>
          <p className="mt-4 text-ink-700/70 dark:text-cream-100/60">
            {t("historyEmpty")}
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-600"
          >
            {t("favoritesBrowse")}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map(({ card, entry }) => (
            <RecipeCard
              key={card.id}
              card={card}
              categoryName={catNames[card.categorySlug]}
              note={noteFor(entry.count, entry.lastAt)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
