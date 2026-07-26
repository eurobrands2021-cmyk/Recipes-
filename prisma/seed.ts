// Seeds a live PostgreSQL database from the same curated content used by Mock
// Mode. Run with `npm run db:seed` (requires DATABASE_URL + a migrated schema).
import { PrismaClient } from "@prisma/client";
import { categories } from "../lib/categories";
import { recipes } from "../lib/recipes-data";

const prisma = new PrismaClient();

async function main() {
  // Clean slate so re-seeding is idempotent.
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
      },
    });
  }

  console.log(
    `Seeded ${categories.length} categories and ${recipes.length} recipes.`,
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
