import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIcon } from "@/components/category-icon";
import { RecipeCard } from "@/components/recipe-card";
import { categories, categoryBySlug } from "@/lib/categories";
import { getRecipesByCategory } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = categoryBySlug(params.slug);
  return { title: category?.nameAr ?? "قسم" };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categoryBySlug(params.slug);
  if (!category) notFound();

  const recipes = await getRecipesByCategory(params.slug);

  return (
    <div className="space-y-6 pt-2">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-ink-700/60 transition hover:text-clay-600 dark:text-cream-100/50 dark:hover:text-clay-400"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 -scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
        كل الأقسام
      </Link>

      <header className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clay-500/12 text-clay-600 dark:text-clay-400">
          <CategoryIcon slug={category.slug} className="h-7 w-7" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-cream-100">
            {category.nameAr}
          </h1>
          <p className="text-sm text-ink-700/55 dark:text-cream-100/45">
            {recipes.length} وصفة
          </p>
        </div>
      </header>

      {recipes.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-cream-300 bg-cream-50/50 px-4 py-8 text-center text-sm text-ink-700/60 dark:border-ink-800 dark:bg-ink-900/40 dark:text-cream-100/60">
          لا توجد وصفات في هذا القسم بعد.
        </p>
      ) : (
        <div className="space-y-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
