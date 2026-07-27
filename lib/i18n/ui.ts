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
  | "settingsFontSize"
  | "settingsFontSizeHint"
  | "settingsFontSizeNormal"
  | "settingsFontSizeLarge"
  | "settingsFontSizeXLarge"
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
  | "notFoundBack"
  | "notFoundHome"
  | "navAbout"
  | "navSurprise"
  | "aboutTitle"
  | "ratingTitle"
  | "ratingYours"
  | "ratingClear"
  | "scaleTitle"
  | "scaleHint";

type Dict = Record<UIKey, string>;

const en: Dict = {
  appName: "Teta Zeinab's Recipe",
  dedicationKicker: "The food that keeps us together",
  dedicationTitle: "Teta Zeinab's Recipe",
  dedicationSub:
    "A little notebook that always sat on my grandmother Zeinab's kitchen shelf, holding every dish she used to make for us. We don't ask much of this site — just that the food which brings our family together stays with us, that we can come back to it whenever we like, and cook it exactly the way she did. May God have mercy on her and grant her peace.",
  footerLine: "Teta Zeinab's Recipe — the family's kitchen notebook",
  footerSub: "In her loving memory",
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
  settingsFontSize: "Text size",
  settingsFontSizeHint: "Make everything bigger and easier to read.",
  settingsFontSizeNormal: "Normal",
  settingsFontSizeLarge: "Large",
  settingsFontSizeXLarge: "Extra large",
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
  notFoundTitle: "This page isn't here",
  notFoundBody:
    "The recipe may have moved to another spot — let's head back to the kitchen.",
  notFoundBack: "Back to Teta Zeinab's Recipe",
  notFoundHome: "Browse the recipes",
  navAbout: "About",
  navSurprise: "Surprise me",
  aboutTitle: "About Teta Zeinab's Recipe",
  ratingTitle: "Rating",
  ratingYours: "Your rating",
  ratingClear: "Clear",
  scaleTitle: "Amount",
  scaleHint: "Adjust the quantities to what you're cooking.",
};

const arFormal: Dict = {
  appName: "وصفة تيتا زينب",
  dedicationKicker: "أكل العيلة",
  dedicationTitle: "وصفة تيتا زينب",
  dedicationSub:
    "دفترٌ صغير، كان دائماً على رفّ مطبخ جدتي زينب، فيه كل الوصفات التي كانت تُعِدّها لنا. لا نطلب من هذا الموقع شيئاً كبيراً، فقط أن يبقى الطعام الذي يجمعنا كعائلة موجوداً، نعود إليه متى شئنا، ونطبخه تماماً كما كانت تصنعه. رحمها الله وأسكنها فسيح جناته.",
  footerLine: "وصفة تيتا زينب — دفتر أكل العيلة",
  footerSub: "الله يرحمها",
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
  settingsFontSize: "حجم الخط",
  settingsFontSizeHint: "كبّر حجم النص ليصبح أوضح وأسهل في القراءة.",
  settingsFontSizeNormal: "عادي",
  settingsFontSizeLarge: "كبير",
  settingsFontSizeXLarge: "كبير جداً",
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
  notFoundTitle: "هذه الصفحة غير موجودة",
  notFoundBody: "قد تكون الوصفة قد انتقلت إلى مكان آخر — لنَعُد إلى المطبخ.",
  notFoundBack: "العودة إلى وصفة تيتا زينب",
  notFoundHome: "تصفّح الوصفات",
  navAbout: "عن الموقع",
  navSurprise: "فاجئني",
  aboutTitle: "عن وصفة تيتا زينب",
  ratingTitle: "التقييم",
  ratingYours: "تقييمك",
  ratingClear: "مسح",
  scaleTitle: "الكمية",
  scaleHint: "زوّد أو قلّل المقادير حسب اللي بتطبخه.",
};

const arEG: Dict = {
  ...arFormal,
  dedicationSub:
    "دفتر صغير، كان دايماً على رف مطبخ جدتي زينب، فيه كل الوصفات الي كانت بتعملهلنا. مش عايزين حاجة كبيرة من الموقع ده، بس عايزين إن الأكل اللي بيجمعنا كعيلة يفضل موجود، ونقدر نرجعله وقت ما حبينا، ونطبخه بالظبط زي ما كانت بتعمله. الله يرحمها ويسكنها فسيح جناته.",
  searchPlaceholder: "دوّر على وصفة أو مكوّن...",
  searchNone: "مفيش وصفة بتطابق اللي بتدوّر عليه.",
  recipeTetaNotes: "نصايح الجدة",
  recipeStartCooking: "يلا نحضّر",
  recipeShareWithFamily: "ابعتها للعيلة",
  cookingPrepDone: "المقادير جاهزة — يلا نبدأ الطريقة",
  cookingStartMethod: "يلا نبدأ الطريقة",
  cookingResume: "كمّل تحضير",
  settingsLanguageHint:
    "بتتطبّق على التطبيق كله وعلى الوصفات. متسجّلة على الجهاز ده.",
  settingsFontHint: "اختار شكل الخط للكلام العربي.",
  settingsFontSize: "حجم الخط",
  settingsFontSizeHint: "كبّر حجم الكلام عشان يبقى أوضح وأسهل في القراية.",
  settingsFontSizeNormal: "عادي",
  settingsFontSizeLarge: "كبير",
  settingsFontSizeXLarge: "كبير قوي",
  settingsAccentHint: "لون دافي واحد يميّز التطبيق.",
  settingsTheme: "الشكل",
  notFoundTitle: "الصفحة دي مش موجودة",
  notFoundBody: "يمكن الوصفة اتنقلت مكان… تعالى نرجع تاني.",
  notFoundBack: "ارجع لوصفة تيتا زينب",
  notFoundHome: "اتفرج على الوصفات",
  navAbout: "عن الموقع",
  aboutTitle: "عن وصفة تيتا زينب",
  scaleHint: "زوّد أو قلّل المقادير حسب اللي بتطبخه.",
};

export const UI: Record<Locale, Dict> = {
  en,
  ar: arFormal,
  "ar-EG": arEG,
};

export const t = (locale: Locale, key: UIKey): string => UI[locale][key];
