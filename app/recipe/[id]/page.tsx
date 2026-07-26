import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeDetail } from "@/components/recipe-detail";
import { categoryBySlug } from "@/lib/categories";
import { getRecipeBundle } from "@/lib/localized";
import { recipes } from "@/lib/recipes-data";

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const bundle = getRecipeBundle(params.id);
  if (!bundle) return { title: "وصفة غير موجودة" };
  const ar = bundle.content.ar;
  return {
    title: ar.title,
    description: `${ar.title} — من مطبخ الجدة. ${ar.ingredients.slice(0, 4).join("، ")}`,
  };
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const bundle = getRecipeBundle(params.id);
  if (!bundle) notFound();
  const category = categoryBySlug(bundle.categorySlug)!;
  return <RecipeDetail bundle={bundle} category={category} />;
}
