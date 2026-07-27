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
  | "aboutTitle"
  | "aboutBody"
  | "aboutHeritage";

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
  notFoundBack: "Back to Teta's Kitchen",
  notFoundHome: "Browse the recipes",
  navAbout: "About",
  aboutTitle: "About Teta's Kitchen",
  aboutBody:
    "This is Teta's handwritten recipe notebook, kept online for the whole family — to browse, cook from, and remember her with a kind prayer. May every dish cooked from it be an ongoing charity in her name.",
  aboutHeritage:
    "Every recipe here was written or noted in her own hand. Some methods were gently reconstructed where a step was only implied; those are marked so nothing is mistaken for her exact words.",
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
  notFoundBack: "العودة إلى مطبخ الجدة",
  notFoundHome: "تصفّح الوصفات",
  navAbout: "عن المطبخ",
  aboutTitle: "عن مطبخ الجدة",
  aboutBody:
    "هذا دفتر وصفات الجدة المكتوب بخط يدها، محفوظاً على الإنترنت لكل أفراد العائلة — نتصفحه، ونطبخ منه، ونذكرها بدعوة خير. اللهم اجعل كل طبق يُطبخ منه صدقة جارية باسمها.",
  aboutHeritage:
    "كل وصفة هنا كُتبت أو دُوّنت بخط يدها. بعض الطرق أُعيد بناؤها بلطف حين كانت الخطوة مُلمّحاً إليها فقط، وهذه مُعلَّمة حتى لا يختلط شيء بكلامها الأصلي.",
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
  notFoundBody: "يمكن الوصفة اتنقلت مكان… تعالى نرجع للمطبخ تاني.",
  notFoundBack: "ارجع لمطبخ الجدة",
  notFoundHome: "اتفرج على الوصفات",
  navAbout: "عن المطبخ",
  aboutTitle: "عن مطبخ الجدة",
  aboutBody:
    "ده دفتر وصفات الجدة اللي كاتباه بخط إيدها، متحفوظ على النت لكل العيلة — نتفرج عليه، ونطبخ منه، ونفتكرها بدعوة حلوة. اللهم اجعل كل طبق يتطبخ منه صدقة جارية باسمها.",
  aboutHeritage:
    "كل وصفة هنا اتكتبت أو اتدوّنت بخط إيدها. بعض الطرق اترتّبت بلطف لما الخطوة كانت مفهومة ضمنياً بس، ودي متعلّمة عشان محدش يخلط بينها وبين كلامها بالظبط.",
};

export const UI: Record<Locale, Dict> = {
  en,
  ar: arFormal,
  "ar-EG": arEG,
};

export const t = (locale: Locale, key: UIKey): string => UI[locale][key];
