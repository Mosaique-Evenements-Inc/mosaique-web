import { bailaDaZaza6, bailaDaZaza82, bailaDaZazaMain } from "../../assets/images/events";
import { SERVICE_IDS } from "../services/types";
import type { Event } from "./types";

export const bailaDaZazaEvent = {
  categoryId: "celebration",
  description: "Ritmo, baile y esencia brasileña en una experiencia hecha para celebrar.",
  featuredMedia: {
    alt: "DJ compartiendo la cabina durante Baila da Zaza bajo una iluminación naranja.",
    kind: "image",
    src: bailaDaZazaMain,
    status: "approved",
  },
  gallery: [
    {
      alt: "Ambiente detrás de la cabina durante Baila da Zaza.",
      layout: "pair-portrait",
      src: bailaDaZaza6,
      status: "approved",
    },
    {
      alt: "Pista y asistentes de Baila da Zaza bajo luces rojas.",
      layout: "full-landscape",
      src: bailaDaZaza82,
      status: "approved",
    },
  ],
  id: "event-slot-02",
  serviceId: SERVICE_IDS.celebrations,
  slug: "baila-da-zaza",
  status: "approved",
  title: "Baila da Zaza",
} satisfies Event;
