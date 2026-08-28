import type { ImageMetadata } from "astro";

import type { ContentLink } from "../types";
import { eventDetails, type EventCategory } from "../events";

export type { EventCategory } from "../events";

export interface EventGalleryItem {
  category: EventCategory;
  context: string;
  href: string;
  id: string;
  media: { alt: string; src: ImageMetadata; status: "approved" } | { status: "pending" };
  slug: string;
  status: "approved" | "placeholder";
  title: string;
}

export const eventGalleryItems = eventDetails.map((event): EventGalleryItem => {
  const media = event.featuredMedia;

  return {
    category: event.category,
    context: event.description,
    href: event.href,
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
  status: "placeholder",
  title: "Eventos que ya tomaron forma",
  introduction:
    "Una selección de celebraciones, producciones y experiencias que hemos llevado de la idea a la realidad.",
  cta: { label: "Explorar eventos", href: "/gallery" } satisfies ContentLink,
} as const;
