import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/og-image";
import { categoryBySlug } from "@/lib/categories";
import { getRecipeBundle } from "@/lib/localized";
import { recipes } from "@/lib/recipes-data";

export const alt = "وصفة من دفتر تيتا";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Pre-generate a share card for every recipe at build time.
export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export default function OpengraphImage({
  params,
}: {
  params: { id: string };
}) {
  const bundle = getRecipeBundle(params.id);
  if (!bundle) {
    return renderOgImage({ title: "وصفة تيتا زينب", chip: "أكل العيلة" });
  }
  const c = bundle.content["ar-EG"] ?? bundle.content.ar;
  const category = categoryBySlug(bundle.categorySlug);
  const excerpt = c.ingredients.slice(0, 3).join(" · ");
  return renderOgImage({
    title: c.title,
    subtitle: excerpt || undefined,
    chip: category?.nameAr,
    slug: bundle.categorySlug,
  });
}
