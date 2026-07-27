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
  const ar = bundle.content["ar-EG"] ?? bundle.content.ar;
  const category = categoryBySlug(bundle.categorySlug);
  const description = `${ar.title} — من مطبخ تيتا${
    category ? ` · ${category.nameAr}` : ""
  }. ${ar.ingredients.slice(0, 4).join("، ")}`;
  return {
    title: ar.title,
    description,
    alternates: { canonical: `/recipe/${bundle.id}` },
    openGraph: {
      title: ar.title,
      description,
      type: "article",
      url: `/recipe/${bundle.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: ar.title,
      description,
    },
  };
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const bundle = getRecipeBundle(params.id);
  if (!bundle) notFound();
  const category = categoryBySlug(bundle.categorySlug)!;
  return <RecipeDetail bundle={bundle} category={category} />;
}
