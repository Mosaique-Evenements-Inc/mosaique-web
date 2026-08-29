import { assertUniqueValues } from "../integrity";

export const EVENT_CATEGORIES = {
  wedding: {
    label: "Boda",
    slug: "boda",
  },
  celebration: {
    label: "Celebración",
    slug: "celebracion",
  },
  privateCelebration: {
    label: "Celebración privada",
    slug: "celebracion-privada",
  },
  birthday: {
    label: "Cumpleaños",
    slug: "cumpleanos",
  },
  festival: {
    label: "Festival",
    slug: "festival",
  },
} as const;

export type EventCategoryId = keyof typeof EVENT_CATEGORIES;
export type EventCategoryLabel = (typeof EVENT_CATEGORIES)[EventCategoryId]["label"];

assertUniqueValues(
  "Event category",
  "slugs",
  Object.values(EVENT_CATEGORIES).map((category) => category.slug),
);
