import type { OverrideMap } from "../types";

// Egyptian colloquial (عامية مصرية) rewrites, keyed by recipe id.
// Phrasing and verbs become everyday/colloquial (حطي، اخلطي، سيبيها، لحد ما...)
// but units, numbers and quantities (كوب، جرام، ملعقة) stay exactly as written.
// Warm and simple — like someone's mum talking, not heavy slang.
//
// When adding a NEW recipe, add its `ar-EG` override here (see the checklist in
// recipes.en.ts). Missing fields fall back to the formal Arabic content.

export const arEgOverrides: OverrideMap = {};
