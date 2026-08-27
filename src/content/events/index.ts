import type { ImageMetadata } from "astro";

import { eventGalleryItems } from "../home/projects";

export type EventDetailImage =
  | {
      alt: string;
      src: ImageMetadata;
      status: "approved";
    }
  | {
      alt: string;
      height: number;
      src: null;
      status: "pending";
      width: number;
    };

export interface EventDetail {
  description: string;
  images: EventDetailImage[];
  slug: string;
  status: "approved" | "placeholder";
  title: string;
}

const pendingImageRatios = [
  [1200, 1600],
  [1600, 1067],
  [1200, 1500],
  [1600, 1200],
  [1200, 1800],
  [1600, 1280],
] as const;

const createPendingImages = (): EventDetailImage[] =>
  pendingImageRatios.map(([width, height], index) => ({
    alt: `Fotografía ${index + 1} pendiente de aprobación.`,
    height,
    src: null,
    status: "pending",
    width,
  }));

export const eventDetails: EventDetail[] = eventGalleryItems.map((event) => ({
  description: event.context,
  images: createPendingImages(),
  slug: event.slug,
  status: event.status,
  title: event.title,
}));
