import type { ImageMetadata } from "astro";
import type { GalleryImage, GalleryLayout } from "../media";

export type EventCategory =
  "Boda" | "Celebración" | "Celebración privada" | "Cumpleaños" | "Festival";

export type EventGalleryLayout = GalleryLayout;

export type EventDetailImage = GalleryImage;

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
