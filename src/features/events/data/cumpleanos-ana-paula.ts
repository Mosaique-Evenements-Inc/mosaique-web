import {
  cumpleanosAnaPaula48,
  cumpleanosAnaPaula49,
  cumpleanosAnaPaula50,
  cumpleanosAnaPaula51,
  cumpleanosAnaPaula70,
} from "../../../assets/images/events";
import { SERVICE_IDS } from "../../services";
import type { Event } from "../types/event";

export const cumpleanosAnaPaulaEvent = {
  categoryId: "birthday",
  description:
    "Juego, celebración y momentos en familia en una experiencia pensada para los más pequeños.",
  featuredMedia: {
    alt: "Arreglo de globos rosados y lilas para el cumpleaños de Ana Paula.",
    kind: "image",
    src: cumpleanosAnaPaula48,
    status: "approved",
  },
  gallery: [
    {
      alt: "Pastel y decoración de cumpleaños inspirados en música pop.",
      layout: "pair-portrait",
      src: cumpleanosAnaPaula49,
      status: "approved",
    },
    {
      alt: "Vasos personalizados dispuestos sobre la mesa del cumpleaños.",
      layout: "pair-landscape",
      src: cumpleanosAnaPaula50,
      status: "approved",
    },
    {
      alt: "Recuerdos personalizados preparados para los invitados.",
      layout: "pair-landscape",
      src: cumpleanosAnaPaula51,
      status: "approved",
    },
    {
      alt: "Ana Paula compartiendo la mesa con sus invitados durante la celebración.",
      layout: "full-landscape",
      src: cumpleanosAnaPaula70,
      status: "approved",
    },
  ],
  id: "event-slot-05",
  serviceId: SERVICE_IDS.celebrations,
  slug: "cumpleanos-ana-paula",
  status: "approved",
  title: "Cumpleaños Ana Paula",
} satisfies Event;
