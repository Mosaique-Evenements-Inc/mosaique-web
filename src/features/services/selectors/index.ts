import { defaultLocale, type Locale } from "@/core/i18n";
import { services } from "../data/services";
import { serviceTranslations } from "../i18n";
import type { Service, ServiceId } from "../types";

export const getServiceById = (serviceId: ServiceId): Service | undefined =>
  services.find((service) => service.id === serviceId);

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getLocalizedService = (
  service: Service,
  locale: Locale = defaultLocale,
): Service => {
  const translation = serviceTranslations[locale][service.id];

  return {
    ...service,
    title: translation.title,
    description: translation.description,
    idealFor: translation.idealFor,
    cta: { ...service.cta, label: translation.ctaLabel },
  };
};
