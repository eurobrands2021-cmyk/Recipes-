import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/og-image";
import { categories, categoryBySlug } from "@/lib/categories";
import { categoryCounts } from "@/lib/localized";

export const alt = "قسم من مطبخ الجدة";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categoryBySlug(params.slug);
  if (!category) {
    return renderOgImage({ title: "مطبخ الجدة", chip: "صدقة جارية" });
  }
  const count = categoryCounts()[category.slug] ?? 0;
  return renderOgImage({
    title: category.nameAr,
    subtitle: `${count} وصفة من دفتر الجدة المكتوب بخط يدها`,
    chip: "قسم",
    slug: category.slug,
  });
}
