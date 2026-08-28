import { eventGalleryItems, type EventGalleryItem } from "./home/projects";

export interface GalleryCategory {
  href: string;
  id: string;
  label: EventGalleryItem["category"];
}

export const toGalleryCategoryId = (category: string) =>
  category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const galleryCategories = Array.from(
  new Set(eventGalleryItems.map((event) => event.category)),
).map((label) => {
  const id = toGalleryCategoryId(label);

  return {
    href: `/gallery/${id}`,
    id,
    label,
  } satisfies GalleryCategory;
});

export const getGalleryEvents = (categoryId?: string) =>
  categoryId
    ? eventGalleryItems.filter((event) => toGalleryCategoryId(event.category) === categoryId)
    : eventGalleryItems;
