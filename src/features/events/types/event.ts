import type { FeaturedMedia, GalleryImage } from "../../../core/common/types/media";
import type { ServiceId } from "../../services";
import type { EventCategoryId } from "./category";

export interface Event {
  categoryId: EventCategoryId;
  collaboration?: boolean;
  description: string;
  featuredMedia: FeaturedMedia;
  gallery: GalleryImage[];
  id: string;
  serviceId: ServiceId;
  slug: string;
  status: "approved" | "placeholder";
  title: string;
}
