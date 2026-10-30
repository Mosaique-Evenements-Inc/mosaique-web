import { defaultLocale } from "../../../core/i18n/config/locales.ts";
import type { LocaleDictionaries } from "../../../core/i18n/translation/contracts.ts";
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
  "event-slot-08": {
    title: "Latino Fake Mariage",
    description:
      "Una experiencia inmersiva que recrea una boda, donde los asistentes participan como invitados mientras disfrutan de una puesta en escena, música, comida y baile.",
    categoryLabel: "Celebración",
    media: {
      featuredAlt: "Imagen de portada de Latino Fake Mariage pendiente.",
      galleryAlts: [
        "Primera fotografía de Latino Fake Mariage pendiente.",
        "Segunda fotografía de Latino Fake Mariage pendiente.",
      ],
    },
  },
  "event-slot-07": {
    title: "Amante o Amigo",
    description:
      "Conexiones, conversaciones y nuevas experiencias en una noche creada para conocer personas y dejarse sorprender.",
    categoryLabel: "Celebración",
    media: {
      featuredAlt:
        "Grupo musical actuando en el escenario de Amante o Amigo bajo iluminación roja.",
      galleryAlts: [
        "Presentadora y asistentes frente al escenario de Amante o Amigo.",
        "Asistentes conversando alrededor de una mesa bajo luces rojas.",
        "Manos sosteniendo tarjetas junto a la barra de Amante o Amigo.",
        "Grupo de asistentes conversando junto al escenario.",
        "Vista amplia de asistentes reunidos bajo globos y telas rojas.",
        "Asistentes participando alrededor de una mesa con velas.",
        "Asistentes escribiendo en tarjetas alrededor de una mesa.",
        "Presentador y asistentes celebrando frente al escenario.",
        "Músicos actuando en el escenario bajo iluminación roja.",
        "Asistentes aplaudiendo y levantando los brazos durante la celebración.",
        "Personal de barra atendiendo a los asistentes de Amante o Amigo.",
        "Vista desde arriba de asistentes bailando junto al escenario.",
      ],
    },
  },
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
  "event-slot-08": {
    title: "Latino Fake Mariage",
    description:
      "An immersive experience that recreates a wedding, where attendees take part as guests while enjoying a staged production, music, food, and dancing.",
    categoryLabel: "Celebration",
    media: {
      featuredAlt: "Cover image for Latino Fake Mariage pending.",
      galleryAlts: [
        "First Latino Fake Mariage photo pending.",
        "Second Latino Fake Mariage photo pending.",
      ],
    },
  },
  "event-slot-07": {
    title: "Amante o Amigo",
    description:
      "Connections, conversations and new experiences in a night created to meet new people and embrace the unexpected.",
    categoryLabel: "Celebration",
    media: {
      featuredAlt: "A musical group performing on the Amante o Amigo stage under red lighting.",
      galleryAlts: [
        "A host and attendees in front of the Amante o Amigo stage.",
        "Attendees talking around a table under red lighting.",
        "Hands holding cards beside the bar at Amante o Amigo.",
        "A group of attendees talking beside the stage.",
        "A wide view of attendees gathered beneath red balloons and drapes.",
        "Attendees taking part around a candlelit table.",
        "Attendees writing on cards around a table.",
        "A host and attendees celebrating in front of the stage.",
        "Musicians performing on stage under red lighting.",
        "Attendees applauding and raising their arms during the celebration.",
        "Bar staff serving attendees at Amante o Amigo.",
        "An overhead view of attendees dancing beside the stage.",
      ],
    },
  },
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
  "event-slot-08": {
    title: "Latino Fake Mariage",
    description:
      "Une expérience immersive qui recrée un mariage, où les participants prennent part à la fête en tant qu’invités tout en profitant d’une mise en scène, de musique, de nourriture et de danse.",
    categoryLabel: "Célébration",
    media: {
      featuredAlt: "Image de couverture de Latino Fake Mariage à venir.",
      galleryAlts: [
        "Première photo de Latino Fake Mariage à venir.",
        "Deuxième photo de Latino Fake Mariage à venir.",
      ],
    },
  },
  "event-slot-07": {
    title: "Amante o Amigo",
    description:
      "Des rencontres, des conversations et de nouvelles expériences lors d’une soirée pensée pour faire connaissance et se laisser surprendre.",
    categoryLabel: "Célébration",
    media: {
      featuredAlt: "Un groupe musical sur la scène d’Amante o Amigo sous un éclairage rouge.",
      galleryAlts: [
        "Une animatrice et des participants devant la scène d’Amante o Amigo.",
        "Des participants discutant autour d’une table sous des lumières rouges.",
        "Des mains tenant des cartes près du bar d’Amante o Amigo.",
        "Un groupe de participants discutant près de la scène.",
        "Vue d’ensemble des participants réunis sous des ballons et des tentures rouges.",
        "Des participants prenant part à une activité autour d’une table éclairée aux chandelles.",
        "Des participants écrivant sur des cartes autour d’une table.",
        "Un animateur et des participants célébrant devant la scène.",
        "Des musiciens sur scène sous un éclairage rouge.",
        "Des participants applaudissant et levant les bras pendant la célébration.",
        "Le personnel du bar servant les participants d’Amante o Amigo.",
        "Vue plongeante des participants dansant près de la scène.",
      ],
    },
  },
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
  locale: keyof typeof eventTranslations = defaultLocale,
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
    collaborator: "Fuimos colaboradores",
    producer: "Fuimos productores",
    moreExperiences: "Más experiencias",
    nextExperience: "Siguiente experiencia",
    relatedEvents: "Eventos relacionados",
  },
  en: {
    collaborator: "We were collaborators",
    producer: "We were producers",
    moreExperiences: "More experiences",
    nextExperience: "Next experience",
    relatedEvents: "Related events",
  },
  fr: {
    collaborator: "Nous étions collaborateurs",
    producer: "Nous étions producteurs",
    moreExperiences: "Plus d’expériences",
    nextExperience: "Expérience suivante",
    relatedEvents: "Événements associés",
  },
} satisfies LocaleDictionaries<{
  collaborator: string;
  producer: string;
  moreExperiences: string;
  nextExperience: string;
  relatedEvents: string;
}>;
