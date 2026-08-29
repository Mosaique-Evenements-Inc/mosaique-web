import type { FeaturedMedia, GalleryImage } from "../media";
import type { ContentLink } from "../types";

export const SERVICE_IDS = {
  organizationProductionIntegral: "service-01",
  celebrations: "service-02",
  corporateEvents: "service-03",
  venuePartnerships: "service-04",
  setupLogistics: "service-05",
  furnitureRental: "service-06",
  customPackages: "service-07",
  weddings: "service-08",
} as const;

export type ServiceId = (typeof SERVICE_IDS)[keyof typeof SERVICE_IDS];

export interface Service {
  cta: ContentLink;
  description: string;
  featuredMedia: FeaturedMedia;
  gallery: readonly GalleryImage[];
  id: ServiceId;
  idealFor: string;
  index: string;
  slug: string;
  title: string;
}
