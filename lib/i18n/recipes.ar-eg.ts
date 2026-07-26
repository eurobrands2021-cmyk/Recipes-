import type { OverrideMap } from "../types";
import { arEgPart1 } from "./ar-eg/part1";
import { arEgPart2 } from "./ar-eg/part2";
import { arEgPart3 } from "./ar-eg/part3";
import { arEgPart4 } from "./ar-eg/part4";

// Egyptian colloquial (عامية مصرية) rewrites, keyed by recipe id (assembled from
// parts). Phrasing and verbs become everyday/colloquial (حطي، اخلطي، سيبيها،
// لحد ما...) but units, numbers and quantities (كوب، جرام، ملعقة) stay exactly
// as written. Mostly the method steps (and instruction-style notes); titles and
// ingredient lists fall back to the formal Arabic, which reads the same.
//
// When adding a NEW recipe, add its `ar-EG` override in the appropriate
// lib/i18n/ar-eg/partN.ts (see the checklist in recipes.en.ts). Missing fields
// fall back to the formal Arabic content.

export const arEgOverrides: OverrideMap = {
  ...arEgPart1,
  ...arEgPart2,
  ...arEgPart3,
  ...arEgPart4,
};
