import type { LocaleDictionaries } from "@/core/i18n";
import type { EventCategoryId } from "../types/category";
import type { Event } from "../types/event";

export interface EventTranslation {
  title: string;
  description: string;
  categoryLabel: string;
}

type EventTranslations = Record<string, EventTranslation>;

const es: EventTranslations = {
  "event-slot-01": {
    title: "Nossa Copa",
    description: "Fútbol, comunidad y emprendimiento reunidos en una experiencia de festival.",
    categoryLabel: "Festival",
  },
  "event-slot-02": {
    title: "Baila da Zaza",
    description: "Ritmo, baile y esencia brasileña en una experiencia hecha para celebrar.",
    categoryLabel: "Celebración",
  },
  "event-slot-03": {
    title: "Baby Shower",
    description: "Una celebración íntima para compartir la llegada de un nuevo comienzo.",
    categoryLabel: "Celebración privada",
  },
  "event-slot-04": {
    title: "Wedding R&R",
    description: "Una celebración de inspiración Amalfi en el entorno de Riverest.",
    categoryLabel: "Boda",
  },
  "event-slot-05": {
    title: "Cumpleaños Ana Paula",
    description:
      "Juego, celebración y momentos en familia en una experiencia pensada para los más pequeños.",
    categoryLabel: "Cumpleaños",
  },
  "event-slot-06": {
    title: "Fan Fest Club",
    description:
      "Fútbol, música y entretenimiento reunidos en una experiencia para celebrar juntos.",
    categoryLabel: "Festival",
  },
};

const en: EventTranslations = {
  "event-slot-01": {
    title: "Nossa Copa",
    description:
      "Football, community, and entrepreneurship brought together in a festival experience.",
    categoryLabel: "Festival",
  },
  "event-slot-02": {
    title: "Baila da Zaza",
    description: "Rhythm, dancing, and Brazilian spirit in an experience made for celebration.",
    categoryLabel: "Celebration",
  },
  "event-slot-03": {
    title: "Baby Shower",
    description: "An intimate celebration welcoming a new beginning.",
    categoryLabel: "Private celebration",
  },
  "event-slot-04": {
    title: "Wedding R&R",
    description: "An Amalfi-inspired celebration at Riverest.",
    categoryLabel: "Wedding",
  },
  "event-slot-05": {
    title: "Ana Paula's Birthday",
    description:
      "Play, celebration, and family moments in an experience designed for little ones.",
    categoryLabel: "Birthday",
  },
  "event-slot-06": {
    title: "Fan Fest Club",
    description:
      "Football, music, and entertainment brought together in an experience to celebrate as one.",
    categoryLabel: "Festival",
  },
};

const fr: EventTranslations = {
  "event-slot-01": {
    title: "Nossa Copa",
    description:
      "Football, communauté et entrepreneuriat réunis dans une expérience de festival.",
    categoryLabel: "Festival",
  },
  "event-slot-02": {
    title: "Baila da Zaza",
    description: "Rythme, danse et esprit brésilien dans une expérience faite pour célébrer.",
    categoryLabel: "Célébration",
  },
  "event-slot-03": {
    title: "Baby Shower",
    description: "Une célébration intime pour accueillir un nouveau départ.",
    categoryLabel: "Célébration privée",
  },
  "event-slot-04": {
    title: "Wedding R&R",
    description: "Une célébration d’inspiration amalfitaine dans le décor de Riverest.",
    categoryLabel: "Mariage",
  },
  "event-slot-05": {
    title: "Anniversaire d’Ana Paula",
    description:
      "Jeu, célébration et moments en famille dans une expérience pensée pour les tout-petits.",
    categoryLabel: "Anniversaire",
  },
  "event-slot-06": {
    title: "Fan Fest Club",
    description:
      "Football, musique et divertissement réunis dans une expérience pour célébrer ensemble.",
    categoryLabel: "Festival",
  },
};

export const eventTranslations = { es, en, fr } satisfies LocaleDictionaries<EventTranslations>;

export const getLocalizedEvent = (
  event: Event,
  locale: keyof typeof eventTranslations = "es",
): Event => ({
  ...event,
  ...eventTranslations[locale][event.id],
});

export const eventCategoryTranslations = {
  es: {
    wedding: "Boda",
    celebration: "Celebración",
    privateCelebration: "Celebración privada",
    birthday: "Cumpleaños",
    festival: "Festival",
  },
  en: {
    wedding: "Wedding",
    celebration: "Celebration",
    privateCelebration: "Private celebration",
    birthday: "Birthday",
    festival: "Festival",
  },
  fr: {
    wedding: "Mariage",
    celebration: "Célébration",
    privateCelebration: "Célébration privée",
    birthday: "Anniversaire",
    festival: "Festival",
  },
} satisfies LocaleDictionaries<Record<EventCategoryId, string>>;

export const eventDetailTranslations = {
  es: {
    moreExperiences: "Más experiencias",
    nextExperience: "Siguiente experiencia",
    relatedEvents: "Eventos relacionados",
  },
  en: {
    moreExperiences: "More experiences",
    nextExperience: "Next experience",
    relatedEvents: "Related events",
  },
  fr: {
    moreExperiences: "Plus d’expériences",
    nextExperience: "Expérience suivante",
    relatedEvents: "Événements associés",
  },
} satisfies LocaleDictionaries<{
  moreExperiences: string;
  nextExperience: string;
  relatedEvents: string;
}>;
