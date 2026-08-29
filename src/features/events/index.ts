export { EVENT_CATEGORIES } from "./data/categories";
export type { EventCategoryLabel } from "./data/categories";
export { eventDetails } from "./data/events";
export { EVENT_CATEGORY_IDS } from "./types/category";
export type { EventCategoryId } from "./types/category";
export {
  getEventBySlug,
  getEventCategory,
  getEventHref,
  getEventsByServiceId,
} from "./selectors";
export type { Event } from "./types/event";

export const eventDetailNavigationContent = {
  heading: "Más experiencias",
  nextLabel: "Siguiente experiencia",
} as const;
