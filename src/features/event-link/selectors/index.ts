import { localeConfig, type Locale } from "../../../core/i18n/config/locales.ts";
import { eventTranslations } from "../../events/i18n/index.ts";
import type { Event } from "../../events/types/event.ts";
import { amanteOAmigoEventLink } from "../data/amante-o-amigo.ts";
import { eventLinkTranslations } from "../i18n/index.ts";
import type {
  EventLinkConfig,
  EventLinkEvent,
  EventLinkGalleryDirectoryView,
  EventLinkPastEdition,
  EventLinkTranslation,
  EventLinkUpcomingView,
  SharePayload,
} from "../types/index.ts";

function formatUpcomingDateTime(locale: Locale, date: string, startTime: string) {
  const languageTag = localeConfig[locale].languageTag;
  // Calendar dates and local wall-clock times must not shift with the build machine's timezone.
  const dateValue = new Date(`${date}T12:00:00.000Z`);
  const timeValue = new Date(`${date}T${startTime}:00.000Z`);

  return {
    dateLabel: new Intl.DateTimeFormat(languageTag, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(dateValue),
    timeLabel: new Intl.DateTimeFormat(languageTag, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(timeValue),
  };
}

function formatShareDateTime(locale: Locale, date: string, startTime: string) {
  const dateValue = new Date(`${date}T12:00:00.000Z`);
  const timeValue = new Date(`${date}T${startTime}:00.000Z`);
  const dateLabel = new Intl.DateTimeFormat(localeConfig[locale].languageTag, {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(dateValue);
  const timeLabel = new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-US", {
    hour: "numeric",
    ...(locale === "fr" ? { hourCycle: "h23" as const } : { minute: "2-digit", hour12: true }),
    timeZone: "UTC",
  }).format(timeValue);
  return `${dateLabel} · ${timeLabel}`;
}

export function getEventLinkGalleryDirectory(
  locale: Locale,
  editions: readonly EventLinkPastEdition[],
  translation: Pick<EventLinkTranslation, "labels" | "pastEditions">,
): EventLinkGalleryDirectoryView | null {
  if (editions.length === 0) return null;

  const countLabel =
    editions.length === 1
      ? translation.labels.galleryAvailableSingular
      : translation.labels.galleryAvailablePlural;

  return {
    sectionLabel: translation.labels.photoGallery,
    directoryLabel: translation.labels.pastEditions,
    availableCount: `${editions.length} ${countLabel}`,
    opensNewTab: translation.labels.opensNewTab,
    editions: editions.map((edition) => {
      const localized = translation.pastEditions[edition.id];
      if (!localized?.title) {
        throw new Error(`Missing Event Link past-edition title: ${edition.id} (${locale}).`);
      }
      return {
        id: edition.id,
        title: localized.title,
        ...(localized.description && { description: localized.description }),
        ...(edition.date && {
          date: edition.date,
          dateLabel: new Intl.DateTimeFormat(localeConfig[locale].languageTag, {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          }).format(new Date(`${edition.date}T12:00:00.000Z`)),
        }),
        galleryUrl: edition.galleryUrl,
      };
    }),
  };
}

export function resolveEventLinkEvent<TEvent extends EventLinkEvent>(
  config: Pick<EventLinkConfig, "eventId">,
  events: readonly TEvent[],
): TEvent {
  const event = events.find((candidate) => candidate.id === config.eventId);
  if (!event) throw new Error(`Missing Event for Event Link Page: ${config.eventId}.`);
  return event;
}

export function getLocalizedAmanteOAmigoEventLink(
  locale: Locale,
  events: readonly (EventLinkEvent & Partial<Pick<Event, "featuredMedia">>)[],
) {
  const config = amanteOAmigoEventLink;
  const event = resolveEventLinkEvent(config, events);
  const eventCopy = eventTranslations[locale][event.id];
  const copy = eventLinkTranslations[locale][config.eventId];
  const shareTitle = `${event.title} ${config.share.titleMark}`;
  const edition = config.upcomingEdition;
  const eventShare: SharePayload = {
    title: shareTitle,
    text: `${formatShareDateTime(locale, edition.date, edition.startTime)}\n${edition.location.venue}\n${copy.slogan}\n${copy.share.ticketPrefix} ${edition.ticketUrl}`,
    url: edition.ticketUrl,
  };
  const landingShare = {
    title: shareTitle,
    text: `${copy.slogan}\n${copy.share.landingInvitation}`,
    slug: event.slug,
  };
  const upcoming: EventLinkUpcomingView = {
    categoryLabel: copy.labels.upcomingEvent,
    title: event.title,
    description: eventCopy.description,
    date: edition.date,
    startTime: edition.startTime,
    ...formatUpcomingDateTime(locale, edition.date, edition.startTime),
    location: edition.location,
    ...(event.featuredMedia?.kind === "image" && {
      image: {
        ...event.featuredMedia,
        alt: eventCopy.media?.featuredAlt ?? event.featuredMedia.alt,
      },
    }),
    ticketUrl: edition.ticketUrl,
    ticketLabel: copy.labels.ticketAction,
    opensNewTab: copy.labels.opensNewTab,
  };

  return {
    config,
    event,
    copy,
    upcoming,
    producer: {
      ...config.producer,
      label: copy.labels.producedBy,
    },
    menuEntry: {
      href: config.menuUrl,
      label: copy.labels.menuAction,
    },
    socials: config.socialProfiles.map((profile) => ({
      ...profile,
      displayHandle: `@${profile.handle}`,
    })),
    galleryDirectory: getEventLinkGalleryDirectory(locale, config.pastEditions, copy),
    share: {
      upcoming: {
        title: shareTitle,
        slogan: copy.slogan,
        date: config.upcomingEdition.date,
        startTime: config.upcomingEdition.startTime,
        timezone: config.upcomingEdition.timezone,
        location: config.upcomingEdition.location,
        ticketUrl: config.upcomingEdition.ticketUrl,
        ticketPrefix: copy.share.ticketPrefix,
      },
      landing: {
        title: shareTitle,
        slogan: copy.slogan,
        invitation: copy.share.landingInvitation,
        slug: event.slug,
      },
    },
    sharePayloads: { event: eventShare, landing: landingShare },
  };
}
