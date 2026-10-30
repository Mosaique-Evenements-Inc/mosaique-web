import type { EventLinkConfig } from "../types/index.ts";

export const amanteOAmigoEventLink = {
  eventId: "event-slot-07",
  visual: {
    paper: "#F3E5D2",
    surface: "#FDE39F",
    ink: "#211B19",
    wine: "#7D0C0C",
    gold: "#C6963E",
    pink: "#D88F98",
  },
  brand: {
    logoAssetId: "aoa",
    logoAlt: "Amante o Amigo",
  },
  upcomingEdition: {
    date: "2026-11-06",
    startTime: "19:00",
    timezone: "America/Toronto",
    location: {
      venue: "Lola Bar",
      city: "Montréal",
    },
    ticketUrl: "https://www.jasspass.com/event/amante-o-amigo",
  },
  menuUrl: "https://mosaiqueevenements.com/es/menu/alfajores-fleur/",
  socialProfiles: [
    {
      platform: "instagram",
      handle: "amanteoamigo.mtl",
      url: "https://www.instagram.com/amanteoamigo.mtl/",
    },
    {
      platform: "tiktok",
      handle: "amanteoamigo.mtl",
      url: "https://www.tiktok.com/@amanteoamigo.mtl",
    },
  ],
  pastEditions: [],
  sponsors: [],
  producer: {
    id: "mosaique",
    logoAssetId: "mosaique-complete",
    logoAlt: "MOSAÏQUE ÉVÉNEMENTS",
    href: "/",
  },
  share: { titleMark: "❤️" },
} as const satisfies EventLinkConfig;
