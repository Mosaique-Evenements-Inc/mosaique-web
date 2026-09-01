import type { ImageMetadata } from "astro";
import * as eventImages from "@/assets/images/events";
import { aboutContent } from "./overview";

export type AboutMediaItem = {
  desktopColumnStart: boolean;
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

const mosaicMediaColumns = [
  [
    "babyShowerKarlaGino151",
    "babyShowerKarlaGino152",
    "babyShowerKarlaGino153",
    "babyShowerKarlaGino156",
  ],
  [
    "bailaDaZaza82",
    "bailaDaZazaMain",
    "cumpleanosAnaPaula48",
    "cumpleanosAnaPaula49",
    "cumpleanosAnaPaula50",
    "cumpleanosAnaPaula51",
  ],
  [
    "fanFestMexVsSouth128",
    "fanFestMexVsSouth158",
    "fanFestMexVsSouth3",
    "fanFestMexVsSouth8",
    "nossaCopa105",
  ],
  [
    "nossaCopaBrzVsEsc170",
    "nossaCopaBrzVsEsc199",
    "nossaCopaBrzVsEsc27",
    "nossaCopaBrzVsEsc4",
    "nossaCopaBrzVsEsc81",
  ],
  [
    "weddingEb53693",
    "weddingEb59642",
    "weddingEb59664",
    "weddingEb59668Edit",
    "weddingEb59670",
    "weddingEb59673",
  ],
  ["weddingKt36", "weddingKt37", "weddingKt38", "weddingKt39", "weddingKt4"],
] as const satisfies readonly (readonly (keyof typeof eventImages)[])[];

const mediaItems = mosaicMediaColumns.flatMap((column, columnIndex) =>
  column.map((id, itemIndex) => {
    const src = eventImages[id];

    return {
      desktopColumnStart: columnIndex > 0 && itemIndex === 0,
      id,
      kind: src.format === "gif" ? ("gif" as const) : ("image" as const),
      label: getMediaLabel(id),
      src,
    };
  }),
);

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
