import Link from "next/link";
import { CategoryIcon } from "@/components/category-icon";
import { Search } from "@/components/search";
import { getCategories, getCategoryCounts } from "@/lib/data";

export default async function HomePage() {
  const [categories, counts] = await Promise.all([
    getCategories(),
    getCategoryCounts(),
  ]);

  return (
    <div className="space-y-10 pt-2">
      {/* Dedication */}
      <section className="text-center">
        <p className="font-display text-sm text-clay-600 dark:text-clay-400">
          صدقة جارية
        </p>
        <h1 className="mt-2 text-balance font-display text-3xl font-bold leading-tight text-ink-800 dark:text-cream-100 sm:text-4xl">
          من مطبخ الجدة
        </h1>
        <p className="mx-auto mt-3 max-w-md text-balance text-ink-700/70 dark:text-cream-100/60">
          دفتر وصفاتها المكتوب بخط يدها، محفوظاً لأجيال العائلة — نتصفحه، نطبخ منه،
          ونذكرها بدعوة خير.
        </p>
      </section>

      {/* Search */}
      <section>
        <Search />
      </section>

      {/* Categories */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink-800 dark:text-cream-100">
          الأقسام
          <span className="h-px flex-1 bg-cream-200 dark:bg-ink-800" />
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((cat) => {
            const count = counts[cat.slug] ?? 0;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-clay-400/60 hover:bg-white dark:border-ink-800 dark:bg-ink-900/50 dark:hover:border-clay-500/50 dark:hover:bg-ink-900"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-clay-500/12 text-clay-600 dark:text-clay-400">
                  <CategoryIcon slug={cat.slug} />
                </span>
                <span>
                  <span className="block font-display font-bold text-ink-800 group-hover:text-clay-600 dark:text-cream-100 dark:group-hover:text-clay-400">
                    {cat.nameAr}
                  </span>
                  <span className="text-xs text-ink-700/55 dark:text-cream-100/45">
                    {count} وصفة
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
