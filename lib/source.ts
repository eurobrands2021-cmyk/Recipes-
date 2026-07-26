import type { Recipe, SourceType } from "./types";

// Human-facing labels for each source type (PRD §7.3 source badge).
export interface SourceMeta {
  label: string; // Arabic badge text
  labelEn: string;
  tone: "written" | "inferred" | "friend";
}

export function sourceMeta(recipe: Pick<Recipe, "sourceType" | "sourceNote">): SourceMeta {
  const type: SourceType = recipe.sourceType;
  switch (type) {
    case "GRANDMOTHER_WRITTEN":
      return { label: "بخط الجدة", labelEn: "In Teta's hand", tone: "written" };
    case "INFERRED":
      return { label: "مستنبطة", labelEn: "Reconstructed", tone: "inferred" };
    case "FRIEND_OR_RELATIVE":
      return {
        label: recipe.sourceNote?.trim() || "من صحاب الجدة",
        labelEn: "From a friend/relative",
        tone: "friend",
      };
    default:
      return { label: "بخط الجدة", labelEn: "In Teta's hand", tone: "written" };
  }
}
