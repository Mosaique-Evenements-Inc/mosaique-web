export const EVENT_CATEGORY_IDS = {
  birthday: "birthday",
  celebration: "celebration",
  festival: "festival",
  privateCelebration: "privateCelebration",
  wedding: "wedding",
} as const;

export type EventCategoryId = (typeof EVENT_CATEGORY_IDS)[keyof typeof EVENT_CATEGORY_IDS];
