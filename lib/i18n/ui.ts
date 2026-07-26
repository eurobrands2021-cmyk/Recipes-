import type { Locale } from "./locales";

// UI chrome strings per locale. `ar-EG` uses warm colloquial phrasing; `ar`
// keeps the formal written tone; `en` is plain home-cooking English.
export type UIKey =
  | "appName"
  | "dedicationKicker"
  | "dedicationTitle"
  | "dedicationSub"
  | "footerLine"
  | "footerSub"
  | "sectionCategories"
  | "countRecipes"
  | "searchPlaceholder"
  | "searchResults"
  | "searchNone"
  | "navFavorites"
  | "navSettings"
  | "navHome"
  | "allCategories"
  | "recipeIngredients"
  | "recipeMethod"
  | "recipeTetaNotes"
  | "recipeReviewNote"
  | "recipePage"
  | "recipeShare"
  | "recipeShareCopied"
  | "recipeStartCooking"
  | "recipeShareWithFamily"
  | "ratingTitle"
  | "ratingClear"
  | "servingsTitle"
  | "servingsHint"
  | "servingsReset"
  | "surprise"
  | "aboutTitle"
  | "aboutNav"
  | "footerCredit"
  | "footerRequest"
  | "requestTitle"
  | "requestRecipe"
  | "requestRecipeDesc"
  | "requestShare"
  | "requestShareDesc"
  | "requestClose"
  | "favoriteAdd"
  | "favoriteRemove"
  | "favoritesTitle"
  | "favoritesEmpty"
  | "favoritesBrowse"
  | "cookingPrep"
  | "cookingMethod"
  | "cookingServing"
  | "cookingReset"
  | "cookingExit"
  | "cookingBack"
  | "cookingNext"
  | "cookingFinish"
  | "cookingDone"
  | "cookingPrepDone"
  | "cookingStartMethod"
  | "cookingAllDone"
  | "cookingResume"
  | "cookingStartTimer"
  | "cookingTimerDone"
  | "settingsTitle"
  | "settingsLanguage"
  | "settingsLanguageHint"
  | "settingsFont"
  | "settingsFontHint"
  | "settingsAccent"
  | "settingsAccentHint"
  | "settingsTheme"
  | "settingsThemeLight"
  | "settingsThemeDark"
  | "settingsThemeSystem"
  | "settingsReset"
  | "settingsResetDone"
  | "sourceWritten"
  | "sourceInferred"
  | "sourceFriend"
  | "notFoundTitle"
  | "notFoundBody"
  | "notFoundBack";

type Dict = Record<UIKey, string>;

const en: Dict = {
  appName: "Teta's Kitchen",
  dedicationKicker: "An ongoing charity",
  dedicationTitle: "From Teta's Kitchen",
  dedicationSub:
    "Her handwritten recipe notebook, kept for the whole family — to browse, cook from, and remember her with a kind prayer.",
  footerLine: "From Teta's kitchen… an ongoing charity in her name",
  footerSub: "May it be counted among her good deeds",
  sectionCategories: "Categories",
  countRecipes: "recipes",
  searchPlaceholder: "Search for a recipe or an ingredient…",
  searchResults: "results",
  searchNone: "No recipe matches your search.",
  navFavorites: "Favorites",
  navSettings: "Settings",
  navHome: "Home",
  allCategories: "All categories",
  recipeIngredients: "Ingredients",
  recipeMethod: "Method",
  recipeTetaNotes: "Teta's tips",
  recipeReviewNote: "Review note",
  recipePage: "Notebook page",
  recipeShare: "Share",
  recipeShareCopied: "Link copied",
  recipeStartCooking: "Start Cooking",
  recipeShareWithFamily: "Share it with the family",
  ratingTitle: "Rate this recipe",
  ratingClear: "Clear",
  servingsTitle: "Servings",
  servingsHint: "Adjust and the quantities scale with you.",
  servingsReset: "Reset",
  surprise: "Surprise me",
  aboutTitle: "About this site",
  aboutNav: "About",
  footerCredit: "Built by her grandson, Ahmed Sameh Shaker",
  footerRequest: "Request a recipe · Share the site",
  requestTitle: "Get in touch",
  requestRecipe: "Ask for a recipe",
  requestRecipeDesc: "Want a specific dish added? Send a note.",
  requestShare: "Share the whole site",
  requestShareDesc: "Pass Teta's Kitchen on to the family.",
  requestClose: "Close",
  favoriteAdd: "Add to favorites",
  favoriteRemove: "Remove from favorites",
  favoritesTitle: "Favorites",
  favoritesEmpty: "You haven't saved any recipes yet.",
  favoritesBrowse: "Browse the categories",
  cookingPrep: "Prep the ingredients",
  cookingMethod: "Method",
  cookingServing: "Doneness & serving",
  cookingReset: "Start over",
  cookingExit: "Exit",
  cookingBack: "Back",
  cookingNext: "Next",
  cookingFinish: "Finish",
  cookingDone: "Done",
  cookingPrepDone: "Ingredients ready — start the method",
  cookingStartMethod: "Start the method",
  cookingAllDone: "Bil-hana wesh-shifa — enjoy!",
  cookingResume: "Resume cooking",
  cookingStartTimer: "Start timer",
  cookingTimerDone: "Time's up!",
  settingsTitle: "Settings",
  settingsLanguage: "Language",
  settingsLanguageHint:
    "Applies to the whole app and recipe content. Saved on this device.",
  settingsFont: "Arabic font",
  settingsFontHint: "Choose the typeface for Arabic text.",
  settingsAccent: "Accent color",
  settingsAccentHint: "A single warm accent across the app.",
  settingsTheme: "Theme",
  settingsThemeLight: "Light",
  settingsThemeDark: "Dark",
  settingsThemeSystem: "System",
  settingsReset: "Reset to defaults",
  settingsResetDone: "Settings reset",
  sourceWritten: "In Teta's hand",
  sourceInferred: "Reconstructed",
  sourceFriend: "From a friend/relative",
  notFoundTitle: "We couldn't find this page",
  notFoundBody: "The recipe may not exist or has moved to another category.",
  notFoundBack: "Back to Teta's Kitchen",
};

const arFormal: Dict = {
  appName: "مطبخ الجدة",
  dedicationKicker: "صدقة جارية",
  dedicationTitle: "من مطبخ الجدة",
  dedicationSub:
    "دفتر وصفاتها المكتوب بخط يدها، محفوظاً لأجيال العائلة — نتصفحه، نطبخ منه، ونذكرها بدعوة خير.",
  footerLine: "من مطبخ الجدة... صدقة جارية لها",
  footerSub: "اللهم اجعله في ميزان حسناتها",
  sectionCategories: "الأقسام",
  countRecipes: "وصفة",
  searchPlaceholder: "ابحث عن وصفة أو مكوّن...",
  searchResults: "نتيجة",
  searchNone: "لا توجد وصفة مطابقة لبحثك.",
  navFavorites: "المفضلة",
  navSettings: "الإعدادات",
  navHome: "الرئيسية",
  allCategories: "كل الأقسام",
  recipeIngredients: "المقادير",
  recipeMethod: "طريقة التحضير",
  recipeTetaNotes: "من نصائح الجدة",
  recipeReviewNote: "ملاحظة المراجعة",
  recipePage: "صفحة الدفتر",
  recipeShare: "مشاركة",
  recipeShareCopied: "تم نسخ الرابط",
  recipeStartCooking: "ابدأ التحضير",
  recipeShareWithFamily: "شاركها مع العائلة",
  ratingTitle: "قيّم الوصفة",
  ratingClear: "مسح",
  servingsTitle: "عدد الأفراد",
  servingsHint: "غيّر العدد وتتغيّر المقادير معك تلقائياً.",
  servingsReset: "إعادة",
  surprise: "فاجئني",
  aboutTitle: "عن الموقع",
  aboutNav: "عن الموقع",
  footerCredit: "تم تطوير الموقع من قِبل حفيدها أحمد سامح شاكر",
  footerRequest: "اطلب وصفة · شارك الموقع",
  requestTitle: "تواصل معنا",
  requestRecipe: "اطلب وصفة",
  requestRecipeDesc: "تريد إضافة طبق معيّن؟ راسِلنا.",
  requestShare: "شارك الموقع كله",
  requestShareDesc: "مرّر مطبخ الجدة إلى العائلة.",
  requestClose: "إغلاق",
  favoriteAdd: "أضف إلى المفضلة",
  favoriteRemove: "إزالة من المفضلة",
  favoritesTitle: "المفضلة",
  favoritesEmpty: "لم تحفظ أي وصفة بعد.",
  favoritesBrowse: "تصفّح الأقسام",
  cookingPrep: "تجهيز المقادير",
  cookingMethod: "الطريقة",
  cookingServing: "التسوية والتقديم",
  cookingReset: "البدء من جديد",
  cookingExit: "خروج",
  cookingBack: "السابق",
  cookingNext: "التالي",
  cookingFinish: "إنهاء",
  cookingDone: "تم",
  cookingPrepDone: "المقادير جاهزة — ابدأ الطريقة",
  cookingStartMethod: "ابدأ الطريقة",
  cookingAllDone: "بالهنا والشفا!",
  cookingResume: "استكمال التحضير",
  cookingStartTimer: "ابدأ المؤقت",
  cookingTimerDone: "انتهى الوقت!",
  settingsTitle: "الإعدادات",
  settingsLanguage: "اللغة",
  settingsLanguageHint:
    "تُطبّق على كامل التطبيق ومحتوى الوصفات. محفوظة على هذا الجهاز.",
  settingsFont: "خط اللغة العربية",
  settingsFontHint: "اختر شكل الخط للنصوص العربية.",
  settingsAccent: "اللون المميّز",
  settingsAccentHint: "لون دافئ واحد يميّز التطبيق.",
  settingsTheme: "المظهر",
  settingsThemeLight: "فاتح",
  settingsThemeDark: "داكن",
  settingsThemeSystem: "النظام",
  settingsReset: "إعادة الضبط الافتراضي",
  settingsResetDone: "تمت إعادة الضبط",
  sourceWritten: "بخط الجدة",
  sourceInferred: "مستنبطة",
  sourceFriend: "من صحاب الجدة",
  notFoundTitle: "لم نعثر على هذه الصفحة",
  notFoundBody: "قد تكون الوصفة غير موجودة أو انتقلت إلى قسم آخر.",
  notFoundBack: "العودة إلى مطبخ الجدة",
};

const arEG: Dict = {
  ...arFormal,
  dedicationSub:
    "دفتر وصفاتها اللي كاتباه بخط إيدها، محفوظ لكل العيلة — نتفرج عليه، نطبخ منه، ونفتكرها بدعوة حلوة.",
  searchPlaceholder: "دوّر على وصفة أو مكوّن...",
  searchNone: "مفيش وصفة بتطابق اللي بتدوّر عليه.",
  recipeTetaNotes: "نصايح الجدة",
  recipeStartCooking: "يلا نحضّر",
  recipeShareWithFamily: "ابعتها للعيلة",
  servingsHint: "غيّر العدد والمقادير هتتحسب معاك لوحدها.",
  requestRecipeDesc: "عايز طبق معيّن يتضاف؟ ابعت لنا.",
  requestShareDesc: "مرّر مطبخ الجدة للعيلة.",
  cookingPrepDone: "المقادير جاهزة — يلا نبدأ الطريقة",
  cookingStartMethod: "يلا نبدأ الطريقة",
  cookingResume: "كمّل تحضير",
  settingsLanguageHint:
    "بتتطبّق على التطبيق كله وعلى الوصفات. متسجّلة على الجهاز ده.",
  settingsFontHint: "اختار شكل الخط للكلام العربي.",
  settingsAccentHint: "لون دافي واحد يميّز التطبيق.",
  settingsTheme: "الشكل",
  notFoundBody: "يمكن الوصفة مش موجودة أو اتنقلت لقسم تاني.",
  notFoundBack: "ارجع لمطبخ الجدة",
};

export const UI: Record<Locale, Dict> = {
  en,
  ar: arFormal,
  "ar-EG": arEG,
};

export const t = (locale: Locale, key: UIKey): string => UI[locale][key];
