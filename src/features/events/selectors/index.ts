import { getLocalizedHref, type Locale } from "@/core/i18n";
import type { ServiceId } from "../../services";
import { eventCategoryTranslations } from "../i18n";
import { EVENT_CATEGORIES } from "../data/categories";
import { eventDetails } from "../data/events";
import type { EventCategoryId } from "../types/category";
import type { Event } from "../types/event";

export const getEventBySlug = (slug: string): Event | undefined =>
  eventDetails.find((event) => event.slug === slug);

export const getEventsByServiceId = (serviceId: ServiceId): Event[] =>
  eventDetails.filter((event) => event.serviceId === serviceId);

export const getEventCategory = (categoryId: EventCategoryId) => EVENT_CATEGORIES[categoryId];

export const getLocalizedEventCategory = (
  categoryId: EventCategoryId,
  locale: keyof typeof eventCategoryTranslations = "es",
) => ({
  ...EVENT_CATEGORIES[categoryId],
  label: eventCategoryTranslations[locale][categoryId],
});

export const getEventHref = (event: Pick<Event, "slug">, locale: Locale = "es") =>
  getLocalizedHref(`/events/${event.slug}`, locale);
