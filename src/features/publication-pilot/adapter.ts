import type {
  MediaReference,
  PilotEvent,
  PilotLocale,
  PublicationSnapshot,
} from "./snapshot.ts";

const locales = ["en", "es", "fr"] as const;

const findByCode = <T extends { code: string }>(items: readonly T[], code: string): T => {
  const item = items.find((candidate) => candidate.code === code);
  if (!item) throw new Error(`Publication references missing code: ${code}`);
  return item;
};

const resolveMedia = (
  snapshot: PublicationSnapshot,
  reference: MediaReference,
): MediaReference => {
  const media = findByCode(snapshot.media, reference.code);
  if (media.version !== reference.version) {
    throw new Error(`Publication references missing media version: ${reference.code}`);
  }
  return media;
};

export function validatePilotPublication(snapshot: PublicationSnapshot): void {
  if (snapshot.schemaVersion !== 1 || !snapshot.publicationId.trim()) {
    throw new Error("Invalid publication identity or schema version");
  }

  for (const items of [snapshot.media, snapshot.services, snapshot.events]) {
    const codes = items.map((item) => item.code);
    if (new Set(codes).size !== codes.length) throw new Error("Duplicate publication code");
  }

  for (const item of [...snapshot.services, ...snapshot.events]) {
    if (!item.mainImage?.code || !item.mainImage.version) {
      throw new Error(`Missing explicit main image: ${item.code}`);
    }
    resolveMedia(snapshot, item.mainImage);
    item.gallery.forEach((reference) => resolveMedia(snapshot, reference));
    for (const locale of locales) {
      if (!item.locales[locale]?.title.trim() || !item.locales[locale]?.mainAlt.trim()) {
        throw new Error(`Missing ${locale} content: ${item.code}`);
      }
    }
  }

  snapshot.home.serviceCodes.forEach((code) => findByCode(snapshot.services, code));
  snapshot.home.eventCodes.forEach((code) => findByCode(snapshot.events, code));
  snapshot.tree.eventCodes.forEach((code) => findByCode(snapshot.events, code));

  for (const event of snapshot.events) {
    if (!event.showInTree) continue;
    if (
      !event.start ||
      !event.end ||
      !Number.isFinite(Date.parse(event.start)) ||
      !Number.isFinite(Date.parse(event.end)) ||
      Date.parse(event.start) >= Date.parse(event.end)
    ) {
      throw new Error(`Invalid Tree dates: ${event.code}`);
    }
  }
}

export function getPilotHomeSelection(snapshot: PublicationSnapshot, locale: PilotLocale) {
  validatePilotPublication(snapshot);
  const project = (item: PublicationSnapshot["services"][number] | PilotEvent) => ({
    code: item.code,
    title: item.locales[locale].title,
    mainAlt: item.locales[locale].mainAlt,
    mainImage: resolveMedia(snapshot, item.mainImage),
    gallery: item.gallery.map((reference) => resolveMedia(snapshot, reference)),
  });

  return {
    services: snapshot.home.serviceCodes.map((code) =>
      project(findByCode(snapshot.services, code)),
    ),
    events: snapshot.home.eventCodes.map((code) => project(findByCode(snapshot.events, code))),
  };
}

export function getCurrentTreeEvents(snapshot: PublicationSnapshot, asOf: Date): PilotEvent[] {
  if (!Number.isFinite(asOf.getTime())) throw new Error("Invalid asOf date");
  validatePilotPublication(snapshot);
  return snapshot.tree.eventCodes
    .map((code) => findByCode(snapshot.events, code))
    .filter(
      (event) =>
        event.showInTree && event.end !== null && asOf.getTime() < Date.parse(event.end),
    )
    .sort(
      (left, right) =>
        Date.parse(left.start!) - Date.parse(right.start!) ||
        left.code.localeCompare(right.code),
    );
}
