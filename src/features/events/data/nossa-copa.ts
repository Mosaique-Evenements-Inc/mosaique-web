import {
  nossaCopa11,
  nossaCopa60,
  nossaCopa71,
  nossaCopa92,
  nossaCopaBrzVsEsc16,
  nossaCopaBrzVsEsc199,
  nossaCopaMain,
} from "../../../assets/images/events";
import { SERVICE_IDS } from "../../services";
import type { Event } from "../types/event";

export const nossaCopaEvent = {
  categoryId: "festival",
  description: "Fútbol, comunidad y emprendimiento reunidos en una experiencia de festival.",
  featuredMedia: {
    alt: "Partida de billar durante Nossa Copa, rodeada de asistentes con camisetas de Brasil.",
    kind: "image",
    src: nossaCopaMain,
    status: "approved",
  },
  gallery: [
    {
      alt: "Vista general de los asistentes reunidos para Nossa Copa.",
      layout: "full-landscape",
      src: nossaCopa92,
      status: "approved",
    },
    {
      alt: "Familia posando con camisetas de Brasil en Nossa Copa.",
      layout: "pair-portrait",
      src: nossaCopaBrzVsEsc199,
      status: "approved",
    },
    {
      alt: "Asistentes jugando futbolín durante Nossa Copa.",
      layout: "pair-portrait",
      src: nossaCopaBrzVsEsc16,
      status: "approved",
    },
    {
      alt: "Puesto de productos brasileños dentro de Nossa Copa.",
      layout: "pair-landscape",
      src: nossaCopa60,
      status: "approved",
    },
    {
      alt: "Presentación musical frente a los asistentes de Nossa Copa.",
      layout: "pair-landscape",
      src: nossaCopa71,
      status: "approved",
    },
    {
      alt: "Asistentes compartiendo alrededor de las mesas durante Nossa Copa.",
      layout: "full-landscape",
      src: nossaCopa11,
      status: "approved",
    },
  ],
  id: "event-slot-01",
  serviceId: SERVICE_IDS.celebrations,
  slug: "nossa-copa",
  status: "approved",
  title: "Nossa Copa",
} satisfies Event;
