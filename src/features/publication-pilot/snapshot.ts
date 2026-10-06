export type PilotLocale = "en" | "es" | "fr";

export interface MediaReference {
  code: string;
  version: string;
}

interface LocalizedContent {
  title: string;
  mainAlt: string;
}

interface PilotService {
  code: string;
  slug: string;
  mainImage: MediaReference;
  gallery: readonly MediaReference[];
  locales: Record<PilotLocale, LocalizedContent>;
}

export interface PilotEvent extends PilotService {
  start: string | null;
  end: string | null;
  showInTree: boolean;
}

export interface PublicationSnapshot {
  schemaVersion: 1;
  publicationId: string;
  media: readonly MediaReference[];
  services: readonly PilotService[];
  events: readonly PilotEvent[];
  home: {
    serviceCodes: readonly string[];
    eventCodes: readonly string[];
  };
  tree: {
    eventCodes: readonly string[];
  };
}

// CMS-01 only: approved Web copy and existing repo assets, without invented event dates.
export const pilotPublication: PublicationSnapshot = {
  schemaVersion: 1,
  publicationId: "cms-01-static-pilot",
  media: [
    {
      code: "celebrations-main",
      version: "8740e1701ce0dc134bf6d0994d458a4d14c325cf6075d012d06e1c19a2c3cbf0",
    },
    {
      code: "nossa-copa-main",
      version: "50153cdfa88f1495cb1f3d0e5c15c738c309f40b030aa8337bddb0e11c512ba8",
    },
    {
      code: "nossa-copa-92",
      version: "9a73807a388933cf8800ae6cf959c0aa7de8e16bac3b05b9f7d6346900432c14",
    },
  ],
  services: [
    {
      code: "service-02",
      slug: "celebraciones",
      mainImage: {
        code: "celebrations-main",
        version: "8740e1701ce0dc134bf6d0994d458a4d14c325cf6075d012d06e1c19a2c3cbf0",
      },
      gallery: [],
      locales: {
        en: { title: "Celebrations", mainAlt: "Celebrations" },
        es: { title: "Celebraciones", mainAlt: "Celebraciones" },
        fr: { title: "Célébrations", mainAlt: "Célébrations" },
      },
    },
  ],
  events: [
    {
      code: "event-slot-01",
      slug: "nossa-copa",
      mainImage: {
        code: "nossa-copa-main",
        version: "50153cdfa88f1495cb1f3d0e5c15c738c309f40b030aa8337bddb0e11c512ba8",
      },
      gallery: [
        {
          code: "nossa-copa-92",
          version: "9a73807a388933cf8800ae6cf959c0aa7de8e16bac3b05b9f7d6346900432c14",
        },
      ],
      start: null,
      end: null,
      showInTree: false,
      locales: {
        en: {
          title: "Brazil at the 2026 World Cup",
          mainAlt:
            "A game of pool at Brazil at the 2026 World Cup, surrounded by attendees wearing Brazil jerseys.",
        },
        es: {
          title: "Brasil en el Mundial 2026",
          mainAlt:
            "Partida de billar durante Brasil en el Mundial 2026, rodeada de asistentes con camisetas de Brasil.",
        },
        fr: {
          title: "Le Brésil à la Coupe du monde 2026",
          mainAlt:
            "Une partie de billard lors de l’événement « Le Brésil à la Coupe du monde 2026 », entourée de participants portant des maillots du Brésil.",
        },
      },
    },
  ],
  home: { serviceCodes: ["service-02"], eventCodes: ["event-slot-01"] },
  tree: { eventCodes: ["event-slot-01"] },
};
