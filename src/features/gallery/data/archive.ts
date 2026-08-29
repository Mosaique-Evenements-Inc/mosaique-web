import type { ContentLink } from "@/core/common/types/content";
import type { StaticImageSource } from "@/core/common/types/media";
import {
  eventDetails,
  getEventCategory,
  getEventHref,
  type EventCategoryId,
  type EventCategoryLabel,
} from "@/features/events";

export interface EventGalleryItem {
  category: EventCategoryLabel;
  categoryId: EventCategoryId;
  context: string;
  href: string;
  id: string;
  media: { alt: string; src: StaticImageSource; status: "approved" } | { status: "pending" };
  slug: string;
  status: "approved" | "placeholder";
  title: string;
}

export const eventGalleryItems = eventDetails.map((event): EventGalleryItem => {
  const media = event.featuredMedia;
  const category = getEventCategory(event.categoryId);

  return {
    category: category.label,
    categoryId: event.categoryId,
    context: event.description,
    href: getEventHref(event),
    id: event.id,
    media:
      media.kind === "image"
        ? { alt: media.alt, src: media.src, status: "approved" }
        : { status: "pending" },
    slug: event.slug,
    status: event.status,
    title: event.title,
  };
});

export const eventGalleryContent = {
  status: "approved",
  title: "Eventos que ya tomaron forma",
  introduction:
    "Una selección de celebraciones, producciones y experiencias que hemos llevado de la idea a la realidad.",
  cta: { label: "Explorar eventos", href: "/gallery" } satisfies ContentLink,
} as const;
