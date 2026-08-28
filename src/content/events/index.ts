import type { ImageMetadata } from "astro";

import { eventGalleryItems } from "../home/projects";

export type EventGalleryLayout = "full-landscape" | "pair-landscape" | "pair-portrait";

export type EventDetailImage =
  | {
      alt: string;
      layout: EventGalleryLayout;
      src: ImageMetadata;
      status: "approved";
    }
  | {
      alt: string;
      height: number;
      layout: EventGalleryLayout;
      src: null;
      status: "pending";
      width: number;
    };

export type EventDetailFeaturedMedia =
  | {
      alt: string;
      height: number;
      kind: "pending";
      src: null;
      status: "pending";
      width: number;
    }
  | {
      alt: string;
      kind: "image";
      src: ImageMetadata;
      status: "approved";
    }
  | {
      alt: string;
      captions: {
        label: string;
        src: string;
        srclang: string;
      };
      height: number;
      kind: "video";
      mimeType: string;
      poster?: string;
      src: string;
      status: "approved";
      width: number;
    };

export interface EventDetail {
  description: string;
  featuredMedia: EventDetailFeaturedMedia;
  gallery: EventDetailImage[];
  href: string;
  slug: string;
  status: "approved" | "placeholder";
  title: string;
}

export const eventDetailNavigationContent = {
  heading: "Más experiencias",
  nextLabel: "Siguiente experiencia",
} as const;

const pendingGallerySlots = [
  { height: 1067, layout: "pair-landscape", width: 1600 },
  { height: 1067, layout: "pair-landscape", width: 1600 },
  { height: 1800, layout: "pair-portrait", width: 1200 },
  { height: 1800, layout: "pair-portrait", width: 1200 },
  { height: 1067, layout: "full-landscape", width: 1600 },
  { height: 1067, layout: "full-landscape", width: 1600 },
] as const;

const createPendingGallery = (): EventDetailImage[] =>
  pendingGallerySlots.map(({ height, layout, width }, index) => ({
    alt: `Fotografía ${index + 1} pendiente de aprobación.`,
    height,
    layout,
    src: null,
    status: "pending",
    width,
  }));

export const eventDetails: EventDetail[] = eventGalleryItems.map((event) => ({
  description: event.context,
  featuredMedia: {
    alt: "Media principal pendiente de aprobación.",
    height: 900,
    kind: "pending",
    src: null,
    status: "pending",
    width: 1600,
  },
  gallery: createPendingGallery(),
  href: event.href,
  slug: event.slug,
  status: event.status,
  title: event.title,
}));
