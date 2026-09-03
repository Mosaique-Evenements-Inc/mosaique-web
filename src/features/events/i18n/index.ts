import type { LocaleDictionaries } from "@/core/i18n";
import type { EventCategoryId } from "../types/category";
import type { Event } from "../types/event";

export interface EventTranslation {
  title: string;
  description: string;
  categoryLabel: string;
  media?: {
    featuredAlt: string;
    galleryAlts: readonly string[];
  };
}

type EventTranslations = Record<string, EventTranslation>;

const es: EventTranslations = {
  "event-slot-01": {
    title: "Brasil en el Mundial 2026",
    description: "Fútbol, comunidad y emprendimiento reunidos en una experiencia de festival.",
    categoryLabel: "Festival",
    media: {
      featuredAlt:
        "Partida de billar durante Brasil en el Mundial 2026, rodeada de asistentes con camisetas de Brasil.",
      galleryAlts: [
        "Vista general de los asistentes reunidos para Brasil en el Mundial 2026.",
        "Familia con camisetas brasileñas posando durante Brasil en el Mundial 2026.",
        "Asistentes jugando futbolín durante Brasil en el Mundial 2026.",
        "Puesto de productos brasileños dentro de Brasil en el Mundial 2026.",
        "Presentación musical frente a los asistentes de Brasil en el Mundial 2026.",
        "Asistentes compartiendo alrededor de las mesas durante Brasil en el Mundial 2026.",
      ],
    },
  },
  "event-slot-02": {
    title: "Celebración Brasileña",
    description: "Ritmo, baile y esencia brasileña en una experiencia hecha para celebrar.",
    categoryLabel: "Celebración",
    media: {
      featuredAlt:
        "DJ compartiendo la cabina durante Celebración Brasileña bajo una iluminación naranja.",
      galleryAlts: [
        "Ambiente detrás de la cabina durante Celebración Brasileña.",
        "Pista y asistentes de Celebración Brasileña bajo luces rojas.",
      ],
    },
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
    title: "Brazil at the 2026 World Cup",
    description:
      "Football, community, and entrepreneurship brought together in a festival experience.",
    categoryLabel: "Festival",
    media: {
      featuredAlt:
        "A game of pool at Brazil at the 2026 World Cup, surrounded by attendees wearing Brazil jerseys.",
      galleryAlts: [
        "An overview of attendees gathered for Brazil at the 2026 World Cup.",
        "A family posing in Brazil jerseys at Brazil at the 2026 World Cup.",
        "Attendees playing foosball at Brazil at the 2026 World Cup.",
        "A stall selling Brazilian products at Brazil at the 2026 World Cup.",
        "A musical performance for attendees at Brazil at the 2026 World Cup.",
        "Attendees sharing tables at Brazil at the 2026 World Cup.",
      ],
    },
  },
  "event-slot-02": {
    title: "Brazilian Celebration",
    description: "Rhythm, dancing, and Brazilian spirit in an experience made for celebration.",
    categoryLabel: "Celebration",
    media: {
      featuredAlt: "A DJ sharing the booth at Brazilian Celebration under orange lighting.",
      galleryAlts: [
        "The atmosphere behind the DJ booth at Brazilian Celebration.",
        "The dance floor and attendees at Brazilian Celebration under red lights.",
      ],
    },
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
    title: "Le Brésil à la Coupe du monde 2026",
    description:
      "Football, communauté et entrepreneuriat réunis dans une expérience de festival.",
    categoryLabel: "Festival",
    media: {
      featuredAlt:
        "Une partie de billard lors de l’événement « Le Brésil à la Coupe du monde 2026 », entourée de participants portant des maillots du Brésil.",
      galleryAlts: [
        "Vue d’ensemble des participants réunis pour l’événement « Le Brésil à la Coupe du monde 2026 ».",
        "Une famille posant en maillots du Brésil lors de l’événement « Le Brésil à la Coupe du monde 2026 ».",
        "Des participants jouant au baby-foot lors de l’événement « Le Brésil à la Coupe du monde 2026 ».",
        "Un kiosque de produits brésiliens lors de l’événement « Le Brésil à la Coupe du monde 2026 ».",
        "Une prestation musicale devant les participants de l’événement « Le Brésil à la Coupe du monde 2026 ».",
        "Des participants réunis autour des tables lors de l’événement « Le Brésil à la Coupe du monde 2026 ».",
      ],
    },
  },
  "event-slot-02": {
    title: "Célébration brésilienne",
    description: "Rythme, danse et esprit brésilien dans une expérience faite pour célébrer.",
    categoryLabel: "Célébration",
    media: {
      featuredAlt:
        "Un DJ partageant la cabine lors de Célébration brésilienne sous un éclairage orangé.",
      galleryAlts: [
        "L’ambiance derrière la cabine du DJ lors de Célébration brésilienne.",
        "La piste de danse et les participants de Célébration brésilienne sous des lumières rouges.",
      ],
    },
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
): Event => {
  const { media, ...translation } = eventTranslations[locale][event.id] ?? {};

  return {
    ...event,
    ...translation,
    ...(media && {
      featuredMedia: { ...event.featuredMedia, alt: media.featuredAlt },
      gallery: event.gallery.map((image, index) => ({
        ...image,
        alt: media.galleryAlts[index] ?? image.alt,
      })),
    }),
  };
};

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
    collaboration: "Fuimos colaboradores",
    moreExperiences: "Más experiencias",
    nextExperience: "Siguiente experiencia",
    relatedEvents: "Eventos relacionados",
  },
  en: {
    collaboration: "We were collaborators",
    moreExperiences: "More experiences",
    nextExperience: "Next experience",
    relatedEvents: "Related events",
  },
  fr: {
    collaboration: "Nous étions collaborateurs",
    moreExperiences: "Plus d’expériences",
    nextExperience: "Expérience suivante",
    relatedEvents: "Événements associés",
  },
} satisfies LocaleDictionaries<{
  collaboration: string;
  moreExperiences: string;
  nextExperience: string;
  relatedEvents: string;
}>;
