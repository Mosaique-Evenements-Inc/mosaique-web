import { bailaDaZaza6, bailaDaZaza82, bailaDaZazaMain } from "../../../assets/images/events";
import { SERVICE_IDS } from "../../services";
import type { Event } from "../types/event";

export const bailaDaZazaEvent = {
  categoryId: "celebration",
  collaboration: true,
  description: "Ritmo, baile y esencia brasileña en una experiencia hecha para celebrar.",
  featuredMedia: {
    alt: "DJ compartiendo la cabina durante Celebración Brasileña bajo una iluminación naranja.",
    kind: "image",
    src: bailaDaZazaMain,
    status: "approved",
  },
  gallery: [
    {
      alt: "Ambiente detrás de la cabina durante Celebración Brasileña.",
      layout: "pair-portrait",
      src: bailaDaZaza6,
      status: "approved",
    },
    {
      alt: "Pista y asistentes de Celebración Brasileña bajo luces rojas.",
      layout: "full-landscape",
      src: bailaDaZaza82,
      status: "approved",
    },
  ],
  id: "event-slot-02",
  serviceId: SERVICE_IDS.celebrations,
  slug: "baila-da-zaza",
  status: "approved",
  title: "Celebración Brasileña",
} satisfies Event;
