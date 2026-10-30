import {
  amanteOAmigo0525,
  amanteOAmigo0553,
  amanteOAmigo0685,
  amanteOAmigo0721,
  amanteOAmigo0722,
  amanteOAmigo0789,
  amanteOAmigo0804,
  amanteOAmigo0962,
  amanteOAmigo1032,
  amanteOAmigo1201,
  amanteOAmigo1219,
  amanteOAmigo1308,
  amanteOAmigoMain,
} from "../../../assets/images/events";
import { SERVICE_IDS } from "../../services";
import type { Event } from "../types/event";

export const amanteOAmigoEvent = {
  categoryId: "celebration",
  description:
    "Conexiones, conversaciones y nuevas experiencias en una noche creada para conocer personas y dejarse sorprender.",
  relationship: "producer",
  featuredMedia: {
    alt: "Grupo musical actuando en el escenario de Amante o Amigo bajo iluminación roja.",
    kind: "image",
    src: amanteOAmigoMain,
    status: "approved",
  },
  gallery: [
    {
      alt: "Presentadora y asistentes frente al escenario de Amante o Amigo.",
      layout: "full-landscape",
      src: amanteOAmigo0525,
      status: "approved",
    },
    {
      alt: "Asistentes conversando alrededor de una mesa bajo luces rojas.",
      layout: "full-landscape",
      src: amanteOAmigo0553,
      status: "approved",
    },
    {
      alt: "Manos sosteniendo tarjetas junto a la barra de Amante o Amigo.",
      layout: "pair-portrait",
      src: amanteOAmigo0685,
      status: "approved",
    },
    {
      alt: "Grupo de asistentes conversando junto al escenario.",
      layout: "pair-portrait",
      src: amanteOAmigo0721,
      status: "approved",
    },
    {
      alt: "Vista amplia de asistentes reunidos bajo globos y telas rojas.",
      layout: "full-landscape",
      src: amanteOAmigo0722,
      status: "approved",
    },
    {
      alt: "Asistentes participando alrededor de una mesa con velas.",
      layout: "pair-landscape",
      src: amanteOAmigo0789,
      status: "approved",
    },
    {
      alt: "Asistentes escribiendo en tarjetas alrededor de una mesa.",
      layout: "pair-landscape",
      src: amanteOAmigo0804,
      status: "approved",
    },
    {
      alt: "Presentador y asistentes celebrando frente al escenario.",
      layout: "full-landscape",
      src: amanteOAmigo0962,
      status: "approved",
    },
    {
      alt: "Músicos actuando en el escenario bajo iluminación roja.",
      layout: "pair-portrait",
      src: amanteOAmigo1032,
      status: "approved",
    },
    {
      alt: "Asistentes aplaudiendo y levantando los brazos durante la celebración.",
      layout: "pair-portrait",
      src: amanteOAmigo1201,
      status: "approved",
    },
    {
      alt: "Personal de barra atendiendo a los asistentes de Amante o Amigo.",
      layout: "pair-landscape",
      src: amanteOAmigo1219,
      status: "approved",
    },
    {
      alt: "Vista desde arriba de asistentes bailando junto al escenario.",
      layout: "pair-landscape",
      src: amanteOAmigo1308,
      status: "approved",
    },
  ],
  id: "event-slot-07",
  serviceId: SERVICE_IDS.celebrations,
  slug: "amante-o-amigo",
  status: "approved",
  title: "Amante o Amigo",
} satisfies Event;
