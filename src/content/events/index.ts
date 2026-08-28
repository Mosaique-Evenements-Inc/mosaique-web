import { babyShowerEvent } from "./baby-shower";
import { bailaDaZazaEvent } from "./baila-da-zaza";
import { cumpleanosAnaPaulaEvent } from "./cumpleanos-ana-paula";
import { fanFestClubEvent } from "./fan-fest-club";
import { nossaCopaEvent } from "./nossa-copa";
import { weddingRrEvent } from "./wedding-r-r";
import type { EventDetail } from "./types";

export type {
  EventCategory,
  EventDetail,
  EventDetailFeaturedMedia,
  EventDetailImage,
  EventGalleryLayout,
} from "./types";

export const eventDetailNavigationContent = {
  heading: "Más experiencias",
  nextLabel: "Siguiente experiencia",
} as const;

export const eventDetails: EventDetail[] = [
  nossaCopaEvent,
  bailaDaZazaEvent,
  babyShowerEvent,
  weddingRrEvent,
  cumpleanosAnaPaulaEvent,
  fanFestClubEvent,
];
