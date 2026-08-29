import type { ServiceId } from "../services/types";
import { EVENT_CATEGORIES, type EventCategoryId } from "./categories";
import { eventDetails } from "./data";
import type { Event } from "./types";

export const getEventBySlug = (slug: string): Event | undefined =>
  eventDetails.find((event) => event.slug === slug);

export const getEventsByServiceId = (serviceId: ServiceId): Event[] =>
  eventDetails.filter((event) => event.serviceId === serviceId);

export const getEventCategory = (categoryId: EventCategoryId) => EVENT_CATEGORIES[categoryId];

export const getEventHref = (event: Pick<Event, "slug">) => `/events/${event.slug}`;
