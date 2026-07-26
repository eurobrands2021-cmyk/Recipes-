// Arabic-aware normalisation shared by server search and the client search box.
// Strips diacritics/tatweel and folds alef/hamza, teh-marbuta and alef-maqsura
// so users find recipes without exact spelling.
export function normalizeArabic(input: string): string {
  return input
    .replace(/[ً-ْٰـ]/g, "") // harakat, superscript alef, tatweel
    .replace(/[آأإ]/g, "ا") // آ أ إ -> ا
    .replace(/ى/g, "ي") // ى -> ي
    .replace(/ة/g, "ه") // ة -> ه
    .replace(/ؤ/g, "و") // ؤ -> و
    .replace(/ئ/g, "ي") // ئ -> ي
    .toLowerCase()
    .trim();
}
