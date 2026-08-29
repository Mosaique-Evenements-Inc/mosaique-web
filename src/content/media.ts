import type { ImageMetadata } from "astro";

export type GalleryLayout = "full-landscape" | "pair-landscape" | "pair-portrait";

type ApprovedImage = {
  alt: string;
  src: ImageMetadata;
  status: "approved";
};

type PendingMedia = {
  alt: string;
  height: number;
  src: null;
  status: "pending";
  width: number;
};

export type FeaturedMedia =
  | (PendingMedia & { kind: "pending" })
  | (ApprovedImage & { kind: "image" })
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

export type GalleryImage = (ApprovedImage | PendingMedia) & {
  layout: GalleryLayout;
};
