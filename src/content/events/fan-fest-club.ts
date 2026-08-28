import {
  fanFestColVsCon3,
  fanFestColVsPor41,
  fanFestColVsPor48,
  fanFestColVsUzb16,
  fanFestColVsUzb64,
  fanFestMain,
  fanFestMexVsSouth128,
} from "../../assets/images/events";
import type { EventDetail } from "./types";

export const fanFestClubEvent = {
  category: "Festival",
  description:
    "Fútbol, música y entretenimiento reunidos en una experiencia para celebrar juntos.",
  featuredMedia: {
    alt: "Presentación musical frente a la afición reunida en Fan Fest Club.",
    kind: "image",
    src: fanFestMain,
    status: "approved",
  },
  gallery: [
    {
      alt: "Músico con acordeón animando al público de Fan Fest Club.",
      layout: "pair-portrait",
      src: fanFestColVsPor41,
      status: "approved",
    },
    {
      alt: "Acordeonista interpretando música entre asistentes con camisetas de Colombia.",
      layout: "pair-portrait",
      src: fanFestColVsPor48,
      status: "approved",
    },
    {
      alt: "Cantantes y músicos durante una presentación de Fan Fest Club.",
      layout: "pair-landscape",
      src: fanFestColVsCon3,
      status: "approved",
    },
    {
      alt: "Asistentes celebrando juntos durante un partido en Fan Fest Club.",
      layout: "pair-landscape",
      src: fanFestColVsUzb64,
      status: "approved",
    },
    {
      alt: "Aficionados de Colombia celebrando frente a la pantalla del partido.",
      layout: "full-landscape",
      src: fanFestColVsUzb16,
      status: "approved",
    },
    {
      alt: "Aficionados de México disfrutando la música y el partido en Fan Fest Club.",
      layout: "full-landscape",
      src: fanFestMexVsSouth128,
      status: "approved",
    },
  ],
  href: "/events/fan-fest-club",
  id: "event-slot-06",
  slug: "fan-fest-club",
  status: "approved",
  title: "Fan Fest Club",
} satisfies EventDetail;
