// Seeds a live PostgreSQL database from the same curated content used by Mock
// Mode. Run with `npm run db:seed` (requires DATABASE_URL + a migrated schema).
import { PrismaClient } from "@prisma/client";
import { categories } from "../lib/categories";
import { recipes } from "../lib/recipes-data";
import { allLocaleContent } from "../lib/i18n/recipe-content";
import { LOCALES } from "../lib/i18n/locales";

const prisma = new PrismaClient();

async function main() {
  // Clean slate so re-seeding is idempotent.
  await prisma.recipeTranslation.deleteMany();
  await prisma.step.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.category.deleteMany();

  const slugToId = new Map<string, string>();
  for (const cat of categories) {
    const created = await prisma.category.create({
      data: {
        nameAr: cat.nameAr,
        nameEn: cat.nameEn,
        slug: cat.slug,
        order: cat.order,
      },
    });
    slugToId.set(cat.slug, created.id);
  }

  for (const r of recipes) {
    const categoryId = slugToId.get(r.categorySlug);
    if (!categoryId) {
      console.warn(`Skipping "${r.titleAr}" — unknown category ${r.categorySlug}`);
      continue;
    }
    const content = allLocaleContent(r);
    await prisma.recipe.create({
      data: {
        titleAr: r.titleAr,
        titleEn: r.titleEn,
        notebookPage: r.notebookPage,
        categoryId,
        sourceType: r.sourceType,
        sourceNote: r.sourceNote,
        notes: r.notes,
        reviewNote: r.reviewNote,
        ingredients: {
          create: r.ingredients.map((text, order) => ({ text, order })),
        },
        steps: {
          create: r.steps.map((text, order) => ({ text, order })),
        },
        translations: {
          create: LOCALES.map((locale) => {
            const c = content[locale];
            return {
              locale,
              title: c.title,
              ingredients: c.ingredients,
              steps: c.steps,
              notes: c.notes,
              sourceNote: c.sourceNote,
              reviewNote: c.reviewNote,
            };
          }),
        },
      },
    });
  }

  console.log(
    `Seeded ${categories.length} categories, ${recipes.length} recipes, and ${
      recipes.length * LOCALES.length
    } translations.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
