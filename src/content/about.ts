import type { ImageMetadata } from "astro";
import * as eventImages from "../assets/images/events";
import { aboutContent } from "./home/about";

export type AboutMediaItem = {
  id: string;
  kind: "image" | "gif";
  label: string;
  src: ImageMetadata;
};

const getMediaLabel = (id: string) => {
  if (id.startsWith("babyShower")) return "Baby Shower";
  if (id.startsWith("bailaDaZaza")) return "Baila da Zaza";
  if (id.startsWith("cumpleanosAnaPaula")) return "Cumpleaños Ana Paula";
  if (id.startsWith("fanFest")) return "Fan Fest Club";
  if (id.startsWith("nossaCopa")) return "Nossa Copa";
  if (id.startsWith("wedding")) return "Boda";

  return "Mosaïque Events";
};

const mediaItems = Object.entries(eventImages)
  .sort(([firstId], [secondId]) => firstId.localeCompare(secondId))
  .map(([id, src]) => ({
    id,
    kind: src.format === "gif" ? ("gif" as const) : ("image" as const),
    label: getMediaLabel(id),
    src,
  }));

export const aboutPageContent = {
  metadata: {
    title: "Nosotros — MOSAÏQUE EVENTS",
    description: aboutContent.primaryText,
  },
  hero: {
    lines: [
      { text: "Creamos", emphasis: false },
      { text: "experiencias", emphasis: true },
      { text: "donde cada detalle", emphasis: false },
      { text: "tiene un lugar", emphasis: true },
    ],
    caption: aboutContent.highlight,
  },
  mosaic: {
    label: "Momentos de Mosaïque",
    items: mediaItems,
  },
} as const satisfies {
  metadata: { title: string; description: string };
  hero: {
    lines: readonly { text: string; emphasis: boolean }[];
    caption: string;
  };
  mosaic: { label: string; items: readonly AboutMediaItem[] };
};
