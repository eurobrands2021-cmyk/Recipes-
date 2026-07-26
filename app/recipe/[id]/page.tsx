import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReviewNote } from "@/components/review-note";
import { ShareButton } from "@/components/share-button";
import { SourceBadge } from "@/components/source-badge";
import { getAllRecipes, getRecipe } from "@/lib/data";

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const recipe = await getRecipe(params.id);
  if (!recipe) return { title: "وصفة غير موجودة" };
  return {
    title: recipe.titleAr,
    description: `${recipe.titleAr} — من مطبخ الجدة. ${recipe.ingredients
      .slice(0, 4)
      .join("، ")}`,
  };
}

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await getRecipe(params.id);
  if (!recipe) notFound();

  return (
    <article className="space-y-8 pt-2">
      <Link
        href={`/category/${recipe.category.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-700/60 transition hover:text-clay-600 dark:text-cream-100/50 dark:hover:text-clay-400"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 -scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
        {recipe.category.nameAr}
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-balance font-display text-3xl font-bold leading-tight text-ink-800 dark:text-cream-100">
          {recipe.titleAr}
        </h1>
        <div className="flex flex-wrap items-center gap-2.5">
          <SourceBadge recipe={recipe} />
          {recipe.notebookPage != null && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-200/70 px-2.5 py-1 text-xs text-ink-700/70 dark:bg-ink-800/70 dark:text-cream-100/60">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 4h11l5 5v11H4z" />
                <path d="M15 4v5h5" />
              </svg>
              صفحة الدفتر {recipe.notebookPage}
            </span>
          )}
        </div>
        {recipe.sourceNote && recipe.sourceType === "FRIEND_OR_RELATIVE" && (
          <p className="text-sm text-ink-700/70 dark:text-cream-100/60">
            {recipe.sourceNote}
          </p>
        )}
      </header>

      {/* Ingredients */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink-800 dark:text-cream-100">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-clay-500" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 3h14l-1 7a6 6 0 0 1-12 0z" />
            <path d="M9 21h6M12 16v5" />
          </svg>
          المقادير
        </h2>
        <ul className="overflow-hidden rounded-2xl border border-cream-200 bg-cream-50/60 dark:border-ink-800 dark:bg-ink-900/40">
          {recipe.ingredients.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 border-b border-cream-200/70 px-4 py-3 last:border-b-0 dark:border-ink-800/70"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-400" aria-hidden />
              <span className="leading-relaxed text-ink-800 dark:text-cream-100/90">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Method */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink-800 dark:text-cream-100">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-clay-500" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h10" />
          </svg>
          طريقة التحضير
        </h2>
        <ol className="space-y-3">
          {recipe.steps.map((step, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-2xl border border-cream-200 bg-cream-50/60 p-4 dark:border-ink-800 dark:bg-ink-900/40"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay-500/15 font-display text-sm font-bold text-clay-600 dark:text-clay-400">
                {i + 1}
              </span>
              <p className="pt-0.5 leading-relaxed text-ink-800 dark:text-cream-100/90">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Teta's notes */}
      {recipe.notes && (
        <section className="rounded-2xl border border-olive-500/30 bg-olive-500/5 p-4">
          <h2 className="mb-1.5 flex items-center gap-2 font-display text-base font-bold text-olive-600 dark:text-olive-500">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 15.6 7 18.2l1-5.5-4-3.9L9.5 8z" />
            </svg>
            من نصائح الجدة
          </h2>
          <p className="leading-relaxed text-ink-800/90 dark:text-cream-100/80">
            {recipe.notes}
          </p>
        </section>
      )}

      {/* Review note (collapsible) */}
      {recipe.reviewNote && <ReviewNote note={recipe.reviewNote} />}

      {/* Share */}
      <div className="flex items-center justify-between border-t border-cream-200/70 pt-6 dark:border-ink-800/70">
        <p className="text-xs text-ink-700/50 dark:text-cream-100/40">
          شاركها مع العائلة
        </p>
        <ShareButton title={recipe.titleAr} />
      </div>
    </article>
  );
}
