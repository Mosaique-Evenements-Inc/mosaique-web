import type { FeaturedMedia, GalleryImage } from "../media";
import type { ServiceId } from "../services/types";
import type { EventCategoryId } from "./categories";

export interface Event {
  categoryId: EventCategoryId;
  description: string;
  featuredMedia: FeaturedMedia;
  gallery: GalleryImage[];
  id: string;
  serviceId: ServiceId;
  slug: string;
  status: "approved" | "placeholder";
  title: string;
}
