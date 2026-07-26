import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/category-view";
import { categories, categoryBySlug } from "@/lib/categories";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const category = categoryBySlug(params.slug);
  return { title: category?.nameAr ?? "قسم" };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categoryBySlug(params.slug);
  if (!category) notFound();
  return <CategoryView category={category} />;
}
