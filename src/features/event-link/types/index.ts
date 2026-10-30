import type { Event } from "@/features/events";
import type { FeaturedMedia } from "@/core/common/types/media";

export type EventLinkEvent = Pick<Event, "id" | "slug" | "title">;
export type EventLinkDate = `${number}-${number}-${number}`;
export type EventLinkTime = `${number}:${number}`;
export type HttpsUrl = `https://${string}`;
export interface SharePayload {
  title: string;
  text: string;
  url: string;
}

export interface ShareActionLabels {
  dialogTitle: string;
  close: string;
  copy: string;
  copied: string;
  copyError: string;
  shareVia: string;
  email: string;
  moreShare: string;
  opensNewTab: string;
}
export type EventLinkGalleryUrl = HttpsUrl | `/${string}`;

export interface EventLinkLocation {
  venue: string;
  city: string;
  streetAddress?: string;
  region?: string;
}

export interface EventLinkUpcomingEdition {
  date: EventLinkDate;
  startTime: EventLinkTime;
  endTime?: EventLinkTime;
  timezone: string;
  location: EventLinkLocation;
  ticketUrl: HttpsUrl;
}

export interface EventLinkUpcomingView {
  categoryLabel: string;
  title: string;
  description: string;
  date: EventLinkDate;
  dateLabel: string;
  startTime: EventLinkTime;
  timeLabel: string;
  location: EventLinkLocation;
  image?: Extract<FeaturedMedia, { kind: "image" }>;
  ticketUrl: HttpsUrl;
  ticketLabel: string;
  opensNewTab: string;
}

export type EventLinkSocialPlatform = "instagram" | "tiktok" | "facebook";

export interface EventLinkSocialProfile {
  platform: EventLinkSocialPlatform;
  handle: string;
  url: HttpsUrl;
}

export interface EventLinkPastEdition {
  id: string;
  date?: EventLinkDate;
  galleryUrl: EventLinkGalleryUrl;
}

export interface EventLinkGalleryDirectoryView {
  sectionLabel: string;
  directoryLabel: string;
  statusLabel: string;
  emptyLabel: string;
  opensNewTab: string;
  editions: readonly {
    id: string;
    title: string;
    description?: string;
    date?: EventLinkDate;
    dateLabel?: string;
    galleryUrl: EventLinkGalleryUrl;
  }[];
}

export interface EventLinkSponsor {
  id: string;
  name: string;
  logoAssetId: string;
  url?: HttpsUrl;
}

export interface EventLinkVisual {
  paper: string;
  surface: string;
  ink: string;
  wine: string;
  gold: string;
  pink: string;
}

export interface EventLinkConfig {
  eventId: EventLinkEvent["id"];
  visual: EventLinkVisual;
  brand: {
    logoAssetId: "aoa";
    logoAlt: string;
  };
  upcomingEdition: EventLinkUpcomingEdition;
  menuUrl: HttpsUrl;
  socialProfiles: readonly EventLinkSocialProfile[];
  pastEditions: readonly EventLinkPastEdition[];
  sponsors: readonly EventLinkSponsor[];
  producer: {
    id: "mosaique";
    logoAssetId: "mosaique-complete";
    logoAlt: string;
    href: "/";
  };
  share: {
    titleMark: string;
  };
}

export type EventLinkProducerView = EventLinkConfig["producer"] & {
  label: string;
};

export interface EventLinkTranslation {
  slogan: string;
  landingDescription: string;
  labels: {
    languages: string;
    opensNewTab: string;
    eventsHeading: string;
    socialEvents: string;
    eventShare: string;
    upcomingEvent: string;
    photoGallery: string;
    pastEditions: string;
    galleryAvailableSingular: string;
    galleryAvailablePlural: string;
    galleryEmpty: string;
    socialMedia: string;
    menuHeading: string;
    menuAction: string;
    ticketAction: string;
    upcomingShare: string;
    landingShare: string;
    shareDialogTitle: string;
    copyLink: string;
    copied: string;
    copyError: string;
    closeShare: string;
    shareVia: string;
    emailShare: string;
    moreShare: string;
    producedBy: string;
    editionSingular: string;
    editionPlural: string;
  };
  share: {
    ticketPrefix: string;
    landingInvitation: string;
  };
  pastEditions: Record<string, { title: string; description?: string }>;
}
