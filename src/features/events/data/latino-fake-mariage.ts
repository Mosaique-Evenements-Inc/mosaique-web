import {
  latinoFakeMariageCover,
  latinoFakeMariage3941,
  latinoFakeMariageGroup,
  latinoFakeMariage4,
  latinoFakeMariage5,
  latinoFakeMariage120,
  latinoFakeMariage422,
  latinoFakeMariage487,
  latinoFakeMariage501,
  latinoFakeMariage525,
  latinoFakeMariage721,
} from "../../../assets/images/events";
import { SERVICE_IDS } from "../../services";
import type { Event } from "../types/event";

export const latinoFakeMariageEvent = {
  categoryId: "celebration",
  description:
    "Una experiencia inmersiva que recrea una boda, donde los asistentes participan como invitados mientras disfrutan de una puesta en escena, música, comida y baile.",
  relationship: "producer",
  featuredMedia: {
    alt: "Asistentes reunidos alrededor de una pareja durante Latino Fake Mariage.",
    kind: "image",
    src: latinoFakeMariageCover,
    status: "approved",
  },
  gallery: [
    {
      alt: "Mesas y decoración del salón de Latino Fake Mariage bajo luces violetas.",
      layout: "full-landscape",
      src: latinoFakeMariage4,
      status: "approved",
    },
    {
      alt: "Tres cantantes actuando con micrófonos durante Latino Fake Mariage.",
      layout: "full-landscape",
      src: latinoFakeMariage3941,
      status: "approved",
    },
    {
      alt: "Iniciales luminosas junto a las mesas del evento.",
      layout: "pair-portrait",
      src: latinoFakeMariage5,
      status: "approved",
    },
    {
      alt: "Presentadora con velo durante la celebración.",
      layout: "pair-portrait",
      src: latinoFakeMariage422,
      status: "approved",
    },
    {
      alt: "Iniciales luminosas de Latino Fake Mariage.",
      layout: "full-landscape",
      src: latinoFakeMariage120,
      status: "approved",
    },
    {
      alt: "Invitada con velo rodeada de asistentes durante Latino Fake Mariage.",
      layout: "pair-landscape",
      src: latinoFakeMariage525,
      status: "approved",
    },
    {
      alt: "Invitado con traje y micrófono frente a la persona con velo.",
      layout: "pair-landscape",
      src: latinoFakeMariage501,
      status: "approved",
    },
    {
      alt: "Grupo de asistentes posando juntos durante la fiesta.",
      layout: "full-landscape",
      src: latinoFakeMariage721,
      status: "approved",
    },
    {
      alt: "Grupo de personas posando para una fotografía durante Latino Fake Mariage.",
      layout: "full-landscape",
      src: latinoFakeMariageGroup,
      status: "approved",
    },
    {
      alt: "Pareja con micrófonos durante la puesta en escena de la boda.",
      layout: "pair-portrait",
      src: latinoFakeMariage487,
      status: "approved",
    },
  ],
  id: "event-slot-08",
  serviceId: SERVICE_IDS.celebrations,
  slug: "latino-fake-mariage",
  status: "approved",
  title: "Latino Fake Mariage",
} satisfies Event;
