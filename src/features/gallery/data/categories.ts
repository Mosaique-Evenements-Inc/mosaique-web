import type { Locale } from "@/core/i18n";
import {
  EVENT_CATEGORIES,
  getLocalizedEventCategory,
  type EventCategoryId,
} from "@/features/events";
import {
  eventGalleryItems,
  getLocalizedEventGalleryItems,
  type EventGalleryItem,
} from "./archive";

export interface GalleryCategory {
  categoryId: EventCategoryId;
  href: string;
  id: string;
  label: EventGalleryItem["category"];
}

export const galleryCategories = Array.from(
  new Set(eventGalleryItems.map((event) => event.categoryId)),
).map((categoryId: EventCategoryId) => {
  const category = EVENT_CATEGORIES[categoryId];

  return {
    categoryId,
    href: `/gallery/${category.slug}`,
    id: category.slug,
    label: category.label,
  } satisfies GalleryCategory;
});

export const getLocalizedGalleryCategories = (locale: Locale): GalleryCategory[] =>
  galleryCategories.map((category) => {
    return {
      ...category,
      label: getLocalizedEventCategory(category.categoryId, locale).label,
    };
  });

export const getGalleryEvents = (categoryId?: string, locale: Locale = "es") => {
  const items = getLocalizedEventGalleryItems(locale);

  return categoryId
    ? items.filter((event) => EVENT_CATEGORIES[event.categoryId].slug === categoryId)
    : items;
};
