export { EVENT_CATEGORIES } from "./categories";
export type { EventCategoryId, EventCategoryLabel } from "./categories";
export { eventDetails } from "./data";
export {
  getEventBySlug,
  getEventCategory,
  getEventHref,
  getEventsByServiceId,
} from "./selectors";
export type { Event } from "./types";

export const eventDetailNavigationContent = {
  heading: "Más experiencias",
  nextLabel: "Siguiente experiencia",
} as const;
