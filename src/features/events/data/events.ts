import { assertUniqueValues } from "../../../core/common/utils/assert-unique-values";
import { services } from "../../services";
import { babyShowerEvent } from "./baby-shower";
import { bailaDaZazaEvent } from "./baila-da-zaza";
import { cumpleanosAnaPaulaEvent } from "./cumpleanos-ana-paula";
import { EVENT_CATEGORIES } from "./categories";
import { fanFestClubEvent } from "./fan-fest-club";
import { nossaCopaEvent } from "./nossa-copa";
import type { Event } from "../types/event";
import { weddingRrEvent } from "./wedding-r-r";

export const eventDetails: Event[] = [
  nossaCopaEvent,
  bailaDaZazaEvent,
  babyShowerEvent,
  weddingRrEvent,
  cumpleanosAnaPaulaEvent,
  fanFestClubEvent,
];

assertUniqueValues(
  "Event",
  "IDs",
  eventDetails.map((event) => event.id),
);
assertUniqueValues(
  "Event",
  "slugs",
  eventDetails.map((event) => event.slug),
);

const serviceIds = new Set(services.map((service) => service.id));

for (const event of eventDetails) {
  if (!serviceIds.has(event.serviceId)) {
    throw new Error(`Event ${event.id} references missing Service ${event.serviceId}.`);
  }

  if (!Object.hasOwn(EVENT_CATEGORIES, event.categoryId)) {
    throw new Error(`Event ${event.id} references missing category ${event.categoryId}.`);
  }
}
