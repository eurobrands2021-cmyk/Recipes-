import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/category-view";
import { categories, categoryBySlug } from "@/lib/categories";
import { categoryCounts } from "@/lib/localized";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const category = categoryBySlug(params.slug);
  if (!category) return { title: "قسم" };
  const count = categoryCounts()[category.slug] ?? 0;
  const description = `${category.nameAr} — ${count} وصفة من دفتر الجدة المكتوب بخط يدها.`;
  return {
    title: category.nameAr,
    description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${category.nameAr} · مطبخ الجدة`,
      description,
      type: "website",
      url: `/category/${category.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.nameAr} · مطبخ الجدة`,
      description,
    },
  };
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
