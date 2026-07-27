// Warm loading placeholders shown during navigation transitions (via route
// loading.tsx) and while client data (favorites) hydrates. They mirror the
// real layout so content doesn't jump when it arrives.

export function Bar({ className = "" }: { className?: string }) {
  return <span className={`skeleton block ${className}`} aria-hidden />;
}

export function RecipeCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-4 dark:border-ink-800 dark:bg-ink-900/50">
      <Bar className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1 space-y-2.5">
        <Bar className="h-4 w-2/3 rounded-md" />
        <Bar className="h-3 w-1/3 rounded-md" />
      </div>
      <Bar className="h-8 w-8 shrink-0 rounded-full" />
    </div>
  );
}

export function RecipeListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-3" role="status" aria-label="loading">
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      role="status"
      aria-label="loading"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-start gap-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-4 dark:border-ink-800 dark:bg-ink-900/50"
        >
          <Bar className="h-11 w-11 rounded-xl" />
          <Bar className="h-4 w-3/4 rounded-md" />
          <Bar className="h-3 w-1/2 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function RecipeDetailSkeleton() {
  return (
    <div className="space-y-8 pt-2" role="status" aria-label="loading">
      <Bar className="h-4 w-28 rounded-md" />
      <div className="space-y-3">
        <Bar className="h-9 w-2/3 rounded-lg" />
        <Bar className="h-6 w-40 rounded-full" />
      </div>
      <Bar className="h-16 w-full rounded-2xl" />
      <div className="space-y-3">
        <Bar className="h-5 w-32 rounded-md" />
        <Bar className="h-40 w-full rounded-2xl" />
      </div>
      <div className="space-y-3">
        <Bar className="h-5 w-32 rounded-md" />
        <Bar className="h-56 w-full rounded-2xl" />
      </div>
    </div>
  );
}
