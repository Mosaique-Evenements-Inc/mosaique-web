import type { ImageMetadata } from "astro";
import amanteOAmigo0442 from "@/assets/images/about-us/mosaico/AMANTEOAMIGO-0442.jpg";
import amanteOAmigo0455 from "@/assets/images/about-us/mosaico/AMANTEOAMIGO-0455.jpg";
import amanteOAmigo0461 from "@/assets/images/about-us/mosaico/AMANTEOAMIGO-0461.jpg";
import amanteOAmigo0463 from "@/assets/images/about-us/mosaico/AMANTEOAMIGO-0463.jpg";
import amanteOAmigo0485 from "@/assets/images/about-us/mosaico/AMANTEOAMIGO-0485.jpg";
import amanteOAmigo0650 from "@/assets/images/about-us/mosaico/AMANTEOAMIGO-0650.jpg";
import amanteOAmigo0745 from "@/assets/images/about-us/mosaico/AMANTEOAMIGO-0745.jpg";
import amanteOAmigo0749 from "@/assets/images/about-us/mosaico/AMANTEOAMIGO-0749.jpg";
import amanteOAmigo1442 from "@/assets/images/about-us/mosaico/AMANTEOAMIGO-1442.jpg";
import * as eventImages from "@/assets/images/events";
import type { Locale } from "@/core/i18n";
import { eventTranslations } from "@/features/events/i18n";
import { aboutContent } from "./overview";

const mosaicImages = {
  ...eventImages,
  amanteOAmigo0442,
  amanteOAmigo0455,
  amanteOAmigo0461,
  amanteOAmigo0463,
  amanteOAmigo0485,
  amanteOAmigo0650,
  amanteOAmigo0745,
  amanteOAmigo0749,
  amanteOAmigo1442,
};

export type AboutMediaItem = {
  desktopColumnStart: boolean;
  id: string;
  kind: "image" | "gif";
  label: string;
  src: ImageMetadata;
};

const getMediaLabel = (id: string, locale: Locale = "es") => {
  if (id.startsWith("babyShower")) return "Baby Shower";
  if (id.startsWith("bailaDaZaza")) return eventTranslations[locale]["event-slot-02"].title;
  if (id.startsWith("cumpleanosAnaPaula")) return "Cumpleaños Ana Paula";
  if (id.startsWith("fanFest")) return "Fan Fest Club";
  if (id.startsWith("nossaCopa")) return eventTranslations[locale]["event-slot-01"].title;
  if (id.startsWith("wedding")) return "Boda";

  return "Mosaïque Events";
};

const mosaicMediaColumns = [
  ["amanteOAmigo0442", "babyShowerKarlaGino152", "amanteOAmigo0461", "babyShowerKarlaGino156"],
  [
    "amanteOAmigo0455",
    "bailaDaZazaMain",
    "cumpleanosAnaPaula48",
    "amanteOAmigo0485",
    "cumpleanosAnaPaula50",
    "cumpleanosAnaPaula51",
  ],
  [
    "fanFestMexVsSouth128",
    "amanteOAmigo0650",
    "amanteOAmigo0463",
    "fanFestMexVsSouth8",
    "nossaCopa105",
  ],
  [
    "amanteOAmigo0745",
    "nossaCopaBrzVsEsc199",
    "nossaCopaBrzVsEsc27",
    "nossaCopaBrzVsEsc4",
    "nossaCopaBrzVsEsc81",
  ],
  [
    "weddingEb53693",
    "amanteOAmigo0749",
    "weddingEb59664",
    "weddingEb59668Edit",
    "weddingEb59670",
    "weddingEb59673",
  ],
  ["weddingKt36", "amanteOAmigo1442", "weddingKt38", "weddingKt39", "weddingKt4"],
] as const satisfies readonly (readonly (keyof typeof mosaicImages)[])[];

const mediaItems = mosaicMediaColumns.flatMap((column, columnIndex) =>
  column.map((id, itemIndex) => {
    const src = mosaicImages[id];

    return {
      desktopColumnStart: columnIndex > 0 && itemIndex === 0,
      id,
      kind: src.format === "gif" ? ("gif" as const) : ("image" as const),
      label: getMediaLabel(id),
      src,
    };
  }),
);

export const getLocalizedAboutMedia = (locale: Locale): AboutMediaItem[] =>
  mediaItems.map((item) => ({ ...item, label: getMediaLabel(item.id, locale) }));

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
