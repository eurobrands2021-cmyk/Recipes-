import type { Locale } from "./i18n/locales";

// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for the heritage "welcome" message.
//
// This exact text is shown in TWO places:
//   1. The first-visit Welcome card (components/welcome-message.tsx), once per
//      device, remembered in localStorage.
//   2. The "About" page (/about), so the family can come back and reread it any
//      time.
//
// To change the wording, edit ONLY the strings below — nothing else in the app
// hardcodes this message.
// ─────────────────────────────────────────────────────────────────────────────

// The kicker (small line above the message on the card / about page).
export const WELCOME_KICKER: Record<Locale, string> = {
  "ar-EG": "أهلاً بيك في مطبخ الجدة",
  ar: "أهلاً بك في مطبخ الجدة",
  en: "Welcome to Teta's Kitchen",
};

// The heart of it — the message itself. The Egyptian-colloquial (ar-EG) copy is
// the original, authoritative wording; `ar` and `en` mirror its meaning.
export const WELCOME_MESSAGE: Record<Locale, string> = {
  "ar-EG":
    "دفتر صغير، كان دايماً على رف مطبخ جدتي، فيه كل الوصفات الي كانت بتعملهلنا. مش عايزين حاجة كبيرة من الموقع ده، بس عايزين إن الأكل اللي بيجمعنا كعيلة يفضل موجود، ونقدر نرجعله وقت ما حبينا، ونطبخه بالظبط زي ما كانت بتعمله.",
  ar:
    "دفترٌ صغير، كان دائماً على رفّ مطبخ جدتي، فيه كل الوصفات التي كانت تُعِدّها لنا. لا نريد شيئاً كبيراً من هذا الموقع، بل نريد أن يبقى الطعام الذي يجمعنا كعائلة موجوداً، نرجع إليه متى شئنا، ونطبخه تماماً كما كانت تصنعه.",
  en:
    "A small notebook that always sat on my grandmother's kitchen shelf, holding every recipe she used to make for us. We don't want anything grand from this site — only that the food which brings our family together stays here, so we can return to it whenever we like and cook it exactly the way she did.",
};

// The button that dismisses the Welcome card and enters the site.
export const WELCOME_ENTER: Record<Locale, string> = {
  "ar-EG": "يلا بينا",
  ar: "لندخل",
  en: "Come in",
};
