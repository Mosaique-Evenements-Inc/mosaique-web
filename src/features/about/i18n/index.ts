import { defaultLocale, type Locale, type LocaleDictionaries } from "@/core/i18n";

interface AboutTranslations {
  metadataTitle: string;
  metadataDescription: string;
  heroLines: readonly { text: string; emphasis: boolean }[];
  heroCaption: string;
  mosaicLabel: string;
  team: {
    eyebrow: string;
    heading: string;
    labels: {
      name: string;
      role: string;
      occupation: string;
    };
    placeholder: {
      role: string;
      occupation: string;
      description: string;
    };
    selectedPrefix: string;
    selectMemberLabel: string;
  };
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
    team: {
      eyebrow: "Nuestro equipo",
      heading: "Las personas detrás de MOSAÏQUE.",
      labels: { name: "Nombre", role: "Cargo", occupation: "Ocupación" },
      placeholder: {
        role: "Cargo por definir",
        occupation: "Ocupación por definir",
        description: "Descripción del cargo por definir.",
      },
      selectedPrefix: "Miembro seleccionado:",
      selectMemberLabel: "Seleccionar a",
    },
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
    team: {
      eyebrow: "Our team",
      heading: "The people behind MOSAÏQUE.",
      labels: { name: "Name", role: "Role", occupation: "Occupation" },
      placeholder: {
        role: "Role to be defined",
        occupation: "Occupation to be defined",
        description: "Role description to be defined.",
      },
      selectedPrefix: "Selected team member:",
      selectMemberLabel: "Select",
    },
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
    team: {
      eyebrow: "Notre équipe",
      heading: "Les personnes derrière MOSAÏQUE.",
      labels: { name: "Nom", role: "Rôle", occupation: "Occupation" },
      placeholder: {
        role: "Rôle à définir",
        occupation: "Occupation à définir",
        description: "Description du rôle à définir.",
      },
      selectedPrefix: "Membre sélectionné :",
      selectMemberLabel: "Sélectionner",
    },
  },
} satisfies LocaleDictionaries<AboutTranslations>;

export const getAboutTranslations = (locale: Locale = defaultLocale) =>
  aboutTranslations[locale];
