import { SERVICE_IDS } from "../../services";
import type { Event } from "../types/event";

export const latinoFakeMariageEvent = {
  categoryId: "celebration",
  description:
    "Una experiencia inmersiva que recrea una boda, donde los asistentes participan como invitados mientras disfrutan de una puesta en escena, música, comida y baile.",
  relationship: "producer",
  // THIS IS A TEMPORARY IMAGE PLACEHOLDER. Replace it with the approved event cover.
  featuredMedia: {
    alt: "Imagen de portada de Latino Fake Mariage pendiente.",
    height: 900,
    kind: "pending",
    src: null,
    status: "pending",
    width: 1600,
  },
  // THESE ARE TEMPORARY IMAGE PLACEHOLDERS. Replace them with approved event photos.
  gallery: [
    {
      alt: "Primera fotografía de Latino Fake Mariage pendiente.",
      height: 800,
      layout: "pair-landscape",
      src: null,
      status: "pending",
      width: 1200,
    },
    {
      alt: "Segunda fotografía de Latino Fake Mariage pendiente.",
      height: 800,
      layout: "pair-landscape",
      src: null,
      status: "pending",
      width: 1200,
    },
  ],
  id: "event-slot-08",
  serviceId: SERVICE_IDS.celebrations,
  slug: "latino-fake-mariage",
  status: "placeholder",
  title: "Latino Fake Mariage",
} satisfies Event;
