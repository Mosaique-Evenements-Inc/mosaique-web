import {
  weddingDsc08265,
  weddingEb50054,
  weddingEb50055,
  weddingEb53654,
  weddingEb53673,
  weddingEb59664,
  weddingEb59673,
  weddingEb59675,
} from "../../assets/images/events";
import type { EventDetail } from "./types";

export const weddingRrEvent = {
  category: "Boda",
  description: "Una celebración de inspiración Amalfi en el entorno de Riverest.",
  featuredMedia: {
    alt: "Mesas de la boda R&R dispuestas al aire libre entre árboles y vegetación.",
    kind: "image",
    src: weddingEb59664,
    status: "approved",
  },
  gallery: [
    {
      alt: "Iniciales R&R colocadas sobre una mesa de madera en la boda.",
      layout: "full-landscape",
      src: weddingDsc08265,
      status: "approved",
    },
    {
      alt: "Letrero de bienvenida rodeado de vegetación en la boda R&R.",
      layout: "pair-portrait",
      src: weddingEb50054,
      status: "approved",
    },
    {
      alt: "Detalle decorativo con limones y un mensaje para la pareja.",
      layout: "pair-portrait",
      src: weddingEb50055,
      status: "approved",
    },
    {
      alt: "Mesa de invitados preparada con vajilla blanca y cristalería.",
      layout: "pair-portrait",
      src: weddingEb53654,
      status: "approved",
    },
    {
      alt: "Montaje de mesa en tonos claros para la recepción de la boda.",
      layout: "pair-portrait",
      src: weddingEb53673,
      status: "approved",
    },
    {
      alt: "Mesa de dulces con detalles amarillos durante la recepción.",
      layout: "full-landscape",
      src: weddingEb59673,
      status: "approved",
    },
    {
      alt: "Bola de espejos suspendida sobre el espacio exterior de la celebración.",
      layout: "full-landscape",
      src: weddingEb59675,
      status: "approved",
    },
  ],
  href: "/events/wedding-r-r",
  id: "event-slot-04",
  slug: "wedding-r-r",
  status: "approved",
  title: "Wedding R&R",
} satisfies EventDetail;
