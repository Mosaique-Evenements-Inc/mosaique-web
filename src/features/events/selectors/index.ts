import type { ServiceId } from "../../services";
import { EVENT_CATEGORIES } from "../data/categories";
import { eventDetails } from "../data/events";
import type { EventCategoryId } from "../types/category";
import type { Event } from "../types/event";

export const getEventBySlug = (slug: string): Event | undefined =>
  eventDetails.find((event) => event.slug === slug);

export const getEventsByServiceId = (serviceId: ServiceId): Event[] =>
  eventDetails.filter((event) => event.serviceId === serviceId);

export const getEventCategory = (categoryId: EventCategoryId) => EVENT_CATEGORIES[categoryId];

export const getEventHref = (event: Pick<Event, "slug">) => `/events/${event.slug}`;
