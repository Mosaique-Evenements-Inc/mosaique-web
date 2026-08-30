import type { ContentLink } from "@/core/common/types/content";
import type { StaticImageSource } from "@/core/common/types/media";
import {
  eventDetails,
  getLocalizedEvent,
  getLocalizedEventCategory,
  getEventHref,
  type EventCategoryId,
} from "@/features/events";
import type { Locale } from "@/core/i18n";

export interface EventGalleryItem {
  category: string;
  categoryId: EventCategoryId;
  context: string;
  href: string;
  id: string;
  media: { alt: string; src: StaticImageSource; status: "approved" } | { status: "pending" };
  slug: string;
  status: "approved" | "placeholder";
  title: string;
}

export const getLocalizedEventGalleryItems = (locale: Locale): EventGalleryItem[] =>
  eventDetails.map((sourceEvent): EventGalleryItem => {
    const event = getLocalizedEvent(sourceEvent, locale);
    const media = event.featuredMedia;
    const category = getLocalizedEventCategory(event.categoryId, locale);

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

export const eventGalleryItems = getLocalizedEventGalleryItems("es");

export const eventGalleryContent = {
  status: "approved",
  title: "Eventos que ya tomaron forma",
  introduction:
    "Una selección de celebraciones, producciones y experiencias que hemos llevado de la idea a la realidad.",
  cta: { label: "Explorar eventos", href: "/gallery" } satisfies ContentLink,
} as const;
