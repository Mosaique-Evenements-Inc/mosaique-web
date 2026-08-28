import {
  babyShowerKarlaGino151,
  babyShowerKarlaGino153,
  babyShowerKarlaGino190,
  babyShowerKarlaGino21,
  babyShowerKarlaGino6,
  babyShowerKarlaGino7,
  babyShowerMain,
} from "../../assets/images/events";
import type { EventDetail } from "./types";

export const babyShowerEvent = {
  category: "Celebración privada",
  description: "Una celebración íntima para compartir la llegada de un nuevo comienzo.",
  featuredMedia: {
    alt: "Decoración principal del baby shower con globos, flores y bloques de letras.",
    kind: "image",
    src: babyShowerMain,
    status: "approved",
  },
  gallery: [
    {
      alt: "Mesa de regalos enmarcada por un arco floral durante el baby shower.",
      layout: "full-landscape",
      src: babyShowerKarlaGino190,
      status: "approved",
    },
    {
      alt: "Regalos dispuestos junto a la decoración floral del baby shower.",
      layout: "pair-portrait",
      src: babyShowerKarlaGino151,
      status: "approved",
    },
    {
      alt: "Arreglo alto de flores blancas y follaje en el baby shower.",
      layout: "pair-portrait",
      src: babyShowerKarlaGino153,
      status: "approved",
    },
    {
      alt: "Vista amplia de la mesa de regalos y el arco floral del baby shower.",
      layout: "pair-landscape",
      src: babyShowerKarlaGino21,
      status: "approved",
    },
    {
      alt: "Mesa principal decorada con flores, globos y un oso de peluche.",
      layout: "pair-landscape",
      src: babyShowerKarlaGino7,
      status: "approved",
    },
    {
      alt: "Detalle frontal de la mesa principal y su arreglo floral.",
      layout: "full-landscape",
      src: babyShowerKarlaGino6,
      status: "approved",
    },
  ],
  href: "/events/baby-shower",
  id: "event-slot-03",
  slug: "baby-shower",
  status: "approved",
  title: "Baby Shower",
} satisfies EventDetail;
