import type { ImageMetadata } from "astro";

export type GalleryLayout = "full-landscape" | "pair-landscape" | "pair-portrait";

export type GalleryImage =
  | {
      alt: string;
      layout: GalleryLayout;
      src: ImageMetadata;
      status: "approved";
    }
  | {
      alt: string;
      height: number;
      layout: GalleryLayout;
      src: null;
      status: "pending";
      width: number;
    };
