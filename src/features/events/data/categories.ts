import { assertUniqueValues } from "../../../core/common/utils/assert-unique-values";
import { EVENT_CATEGORY_IDS, type EventCategoryId } from "../types/category";

export const EVENT_CATEGORIES = {
  [EVENT_CATEGORY_IDS.wedding]: {
    label: "Boda",
    slug: "boda",
  },
  [EVENT_CATEGORY_IDS.celebration]: {
    label: "Celebración",
    slug: "celebracion",
  },
  [EVENT_CATEGORY_IDS.privateCelebration]: {
    label: "Celebración privada",
    slug: "celebracion-privada",
  },
  [EVENT_CATEGORY_IDS.birthday]: {
    label: "Cumpleaños",
    slug: "cumpleanos",
  },
  [EVENT_CATEGORY_IDS.festival]: {
    label: "Festival",
    slug: "festival",
  },
} as const satisfies Record<EventCategoryId, { label: string; slug: string }>;

export type EventCategoryLabel = (typeof EVENT_CATEGORIES)[EventCategoryId]["label"];

assertUniqueValues(
  "Event category",
  "slugs",
  Object.values(EVENT_CATEGORIES).map((category) => category.slug),
);
