import { normalizeArabic } from "./normalize";

// A gentle, decorative layer: one tasteful emoji next to an ingredient, and a
// light action emoji at the start of a method step when there's a clear verb.
// Matched at render time (keyword → emoji) so it is language-independent (Arabic
// + English), applies to any future edits, and simply adds nothing when there's
// no good match — exactly the "leave it out if unsure" behaviour we want.
//
// Keep it sparse: the goal is a warm visual hint, not a WhatsApp-style pile-up.

const norm = (s: string) => normalizeArabic(s);

// Lines where a generic rule below would otherwise pick a misleading emoji.
const SKIP: string[] = [
  "فلفل اسود",
  "فلفل ابيض",
  "ماء ورد",
  "ماء زهر",
  "ماء الورد",
  "ماء الزهر",
];

// Ordered rules — the first whose keyword is contained in the (normalized) line
// wins. More specific entries come before the general ones they'd collide with.
const INGREDIENT_RULES: { emoji: string; keys: string[] }[] = [
  { emoji: "🧅", keys: ["بصل", "onion"] },
  { emoji: "🧄", keys: ["ثوم", "garlic"] },
  { emoji: "🥚", keys: ["بيض", "بيضه", "صفار", "بياض", "egg", "yolk"] },
  { emoji: "🧈", keys: ["سمن", "سمنه", "زبد", "زبده", "butter", "ghee", "margarine"] },
  { emoji: "🥛", keys: ["لبن", "حليب", "زبادي", "قشطه", "قشده", "كريمه", "كريم", "milk", "yogurt", "yoghurt", "cream"] },
  { emoji: "🧀", keys: ["جبن", "جبنه", "cheese", "mozzarella"] },
  { emoji: "🍚", keys: ["ارز", "رز", "rice"] },
  { emoji: "🍝", keys: ["مكرونه", "معكرونه", "شعريه", "لسان عصفور", "pasta", "spaghetti", "noodle", "vermicelli"] },
  { emoji: "🍞", keys: ["خبز", "عيش", "توست", "بقسماط", "bread", "toast", "breadcrumb"] },
  { emoji: "🌾", keys: ["دقيق", "طحين", "سميد", "نخاله", "flour", "semolina", "wheat"] },
  { emoji: "🥩", keys: ["لحم", "لحمه", "مفروم", "كفته", "ضاني", "بتلو", "كبده", "كبد", "meat", "beef", "mince", "lamb", "veal", "liver"] },
  { emoji: "🍗", keys: ["فراخ", "فرخه", "دجاج", "chicken", "poultry"] },
  { emoji: "🦐", keys: ["جمبري", "shrimp", "prawn"] },
  { emoji: "🐟", keys: ["سمك", "سمكه", "فيليه", "بلطي", "بوري", "تونه", "سردين", "fish", "tuna", "sardine"] },
  { emoji: "🍅", keys: ["طماطم", "طماطه", "قوطه", "صلصه", "tomato", "passata"] },
  { emoji: "🌶️", keys: ["شطه", "فلفل حار", "فلفل شطه", "chili", "chilli", "hot pepper", "paprika"] },
  { emoji: "🫑", keys: ["فلفل", "pepper", "capsicum", "bell pepper"] },
  { emoji: "🍋", keys: ["ليمون", "lemon", "lime"] },
  { emoji: "🍊", keys: ["برتقال", "يوسفي", "orange", "mandarin"] },
  { emoji: "🍎", keys: ["تفاح", "apple"] },
  { emoji: "🍌", keys: ["موز", "banana"] },
  { emoji: "🍓", keys: ["فراوله", "strawberry"] },
  { emoji: "🥭", keys: ["مانجه", "مانجو", "mango"] },
  { emoji: "🍇", keys: ["عنب", "زبيب", "grape", "raisin"] },
  { emoji: "🍉", keys: ["بطيخ", "watermelon"] },
  { emoji: "🍈", keys: ["شمام", "كنتالوب", "melon", "cantaloupe"] },
  { emoji: "🍑", keys: ["خوخ", "peach"] },
  { emoji: "🍒", keys: ["كرز", "كريز", "cherry"] },
  { emoji: "🍍", keys: ["اناناس", "pineapple"] },
  { emoji: "🥝", keys: ["كيوي", "kiwi"] },
  { emoji: "🍯", keys: ["عسل", "honey"] },
  { emoji: "🍫", keys: ["كاكاو", "شوكولاته", "شيكولاته", "نوتيلا", "cocoa", "chocolate"] },
  { emoji: "🥥", keys: ["جوز هند", "جوزهند", "coconut"] },
  { emoji: "🥜", keys: ["فول سوداني", "سوداني", "peanut"] },
  { emoji: "🌽", keys: ["ذره", "corn"] },
  { emoji: "🥕", keys: ["جزر", "carrot"] },
  { emoji: "🥔", keys: ["بطاطس", "بطاطا", "potato"] },
  { emoji: "🍠", keys: ["بطاطا حلوه", "sweet potato"] },
  { emoji: "🍆", keys: ["باذنجان", "بتنجان", "eggplant", "aubergine"] },
  { emoji: "🥒", keys: ["خيار", "كوسه", "مخلل", "cucumber", "zucchini", "courgette", "pickle"] },
  { emoji: "🥬", keys: ["خس", "ملوخيه", "سبانخ", "كرنب", "lettuce", "spinach", "cabbage", "molokhia"] },
  { emoji: "🍄", keys: ["مشروم", "فطر", "عيش الغراب", "mushroom"] },
  { emoji: "🫛", keys: ["بسله", "بازلاء", "peas"] },
  { emoji: "🫘", keys: ["فاصوليا", "فول", "عدس", "حمص", "لوبيا", "beans", "lentil", "chickpea", "fava"] },
  { emoji: "🫒", keys: ["زيتون", "olive"] },
  { emoji: "🌿", keys: ["بقدونس", "كزبره", "شبت", "نعناع", "نعنع", "ريحان", "parsley", "coriander", "cilantro", "mint", "dill", "basil", "herb"] },
  { emoji: "🍃", keys: ["ورق عنب", "grape leaves", "vine leaves"] },
  { emoji: "🧂", keys: ["ملح", "salt"] },
  { emoji: "🍬", keys: ["سكر", "sugar"] },
  { emoji: "💧", keys: ["ماء", "مياه", "water"] },
];

const STEP_RULES: { emoji: string; keys: string[] }[] = [
  {
    emoji: "🔥",
    keys: [
      "نار", "تقلي", "قلي", "اقلي", "يقلى", "تقلى", "حمر", "تحمير", "محمر",
      "سخن", "تسخين", "سخني", "شوح", "تشويح", "سبك", "تسبيك", "اطبخ", "طبخ",
      "تطبخ", "سلق", "اسلق", "يغلي", "غلي", "تغلي", "فرن", "اخبز", "خبز",
      "تخبز", "تشوى", "شوي", "تحمر",
      "fry", "heat", "cook", "boil", "bake", "oven", "roast", "grill", "sauté", "saute", "simmer",
    ],
  },
  {
    emoji: "🧊",
    keys: ["ثلاجه", "التلاجه", "تلاجه", "برد", "تبريد", "بردي", "يبرد", "تبرد", "بارد", "مجمد", "fridge", "chill", "cool", "refrigerate", "freeze"],
  },
  {
    emoji: "⏱️",
    keys: ["تخمير", "يخمر", "خمر", "تترك", "يترك", "سيبها", "سيبيها", "ترتاح", "يرتاح", "راحه", "تنقع", "نقع", "انتظر", "rest", "proof", "ferment", "soak", "leave", "set aside", "marinate"],
  },
  {
    emoji: "🥄",
    keys: ["اخلط", "تخلط", "يخلط", "خلط", "قلب", "تقليب", "قلبي", "اعجن", "عجن", "تعجن", "اضرب", "خفق", "تخفق", "مزج", "امزج", "mix", "stir", "whisk", "knead", "beat", "combine", "fold"],
  },
];

function firstMatch(
  line: string,
  rules: { emoji: string; keys: string[] }[],
): string | null {
  const n = norm(line);
  for (const r of rules) {
    if (r.keys.some((k) => n.includes(norm(k)))) return r.emoji;
  }
  return null;
}

/** Emoji for an ingredient line, or null when nothing fits. */
export function ingredientEmoji(line: string): string | null {
  const n = norm(line);
  if (SKIP.some((k) => n.includes(norm(k)))) return null;
  return firstMatch(line, INGREDIENT_RULES);
}

/** Action emoji for a method step, or null when there's no clear action. */
export function stepEmoji(step: string): string | null {
  return firstMatch(step, STEP_RULES);
}
