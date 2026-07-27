import { Bar, RecipeListSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-center gap-3">
        <Bar className="h-12 w-12 rounded-2xl" />
        <div className="space-y-2">
          <Bar className="h-6 w-32 rounded-md" />
          <Bar className="h-3 w-20 rounded-md" />
        </div>
      </div>
      <RecipeListSkeleton count={4} />
    </div>
  );
}
