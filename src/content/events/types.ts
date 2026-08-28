import type { ImageMetadata } from "astro";

export type EventCategory =
  "Boda" | "Celebración" | "Celebración privada" | "Cumpleaños" | "Festival";

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
  category: EventCategory;
  description: string;
  featuredMedia: EventDetailFeaturedMedia;
  gallery: EventDetailImage[];
  href: string;
  id: string;
  slug: string;
  status: "approved" | "placeholder";
  title: string;
}
