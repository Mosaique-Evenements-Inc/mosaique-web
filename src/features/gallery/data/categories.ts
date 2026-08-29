import { EVENT_CATEGORIES, type EventCategoryId } from "@/features/events";
import { eventGalleryItems, type EventGalleryItem } from "./archive";

export interface GalleryCategory {
  href: string;
  id: string;
  label: EventGalleryItem["category"];
}

export const galleryCategories = Array.from(
  new Set(eventGalleryItems.map((event) => event.categoryId)),
).map((categoryId: EventCategoryId) => {
  const category = EVENT_CATEGORIES[categoryId];

  return {
    href: `/gallery/${category.slug}`,
    id: category.slug,
    label: category.label,
  } satisfies GalleryCategory;
});

export const getGalleryEvents = (categoryId?: string) =>
  categoryId
    ? eventGalleryItems.filter(
        (event) => EVENT_CATEGORIES[event.categoryId].slug === categoryId,
      )
    : eventGalleryItems;
