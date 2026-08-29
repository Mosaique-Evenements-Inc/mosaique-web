import { services } from "../data/services";
import type { Service, ServiceId } from "../types";

export const getServiceById = (serviceId: ServiceId): Service | undefined =>
  services.find((service) => service.id === serviceId);

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
