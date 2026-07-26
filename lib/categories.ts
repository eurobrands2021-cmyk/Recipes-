import type { Category } from "./types";

// Manageable category list (PRD §5). New categories can be appended as later
// notebook batches are reviewed.
export const categories: Category[] = [
  {
    id: "cat-sweets",
    nameAr: "حلويات",
    nameEn: "Sweets",
    slug: "sweets",
    order: 1,
  },
  {
    id: "cat-savory",
    nameAr: "أكل رئيسي",
    nameEn: "Savory Dishes",
    slug: "savory",
    order: 2,
  },
  {
    id: "cat-pickles",
    nameAr: "مخللات ومربى",
    nameEn: "Pickles & Preserves",
    slug: "pickles",
    order: 3,
  },
  {
    id: "cat-spices",
    nameAr: "بهارات وصوصات",
    nameEn: "Spice Blends & Condiments",
    slug: "spices",
    order: 4,
  },
  {
    id: "cat-household",
    nameAr: "منزلية",
    nameEn: "Household",
    slug: "household",
    order: 5,
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
