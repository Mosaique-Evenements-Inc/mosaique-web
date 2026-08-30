import type { Locale, LocaleDictionaries } from "@/core/i18n";

interface AboutTranslations {
  metadataTitle: string;
  metadataDescription: string;
  heroLines: readonly { text: string; emphasis: boolean }[];
  heroCaption: string;
  mosaicLabel: string;
}

export const aboutTranslations = {
  es: {
    metadataTitle: "Nosotros — MOSAÏQUE EVENTS",
    metadataDescription: "Creamos experiencias donde cada detalle tiene un lugar.",
    heroLines: [
      { text: "Creamos", emphasis: false },
      { text: "experiencias", emphasis: true },
      { text: "donde cada detalle", emphasis: false },
      { text: "tiene un lugar", emphasis: true },
    ],
    heroCaption: "No solo organizamos eventos. Componemos experiencias.",
    mosaicLabel: "Momentos de Mosaïque",
  },
  en: {
    metadataTitle: "About — MOSAÏQUE EVENTS",
    metadataDescription: "We create experiences where every detail has its place.",
    heroLines: [
      { text: "We create", emphasis: false },
      { text: "experiences", emphasis: true },
      { text: "where every detail", emphasis: false },
      { text: "has its place", emphasis: true },
    ],
    heroCaption: "We do more than organize events. We compose experiences.",
    mosaicLabel: "Mosaïque moments",
  },
  fr: {
    metadataTitle: "Nous — MOSAÏQUE EVENTS",
    metadataDescription: "Nous créons des expériences où chaque détail a sa place.",
    heroLines: [
      { text: "Nous créons", emphasis: false },
      { text: "des expériences", emphasis: true },
      { text: "où chaque détail", emphasis: false },
      { text: "a sa place", emphasis: true },
    ],
    heroCaption:
      "Nous ne faisons pas qu’organiser des événements. Nous composons des expériences.",
    mosaicLabel: "Moments Mosaïque",
  },
} satisfies LocaleDictionaries<AboutTranslations>;

export const getAboutTranslations = (locale: Locale = "es") => aboutTranslations[locale];
