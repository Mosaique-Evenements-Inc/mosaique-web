import setupLogisticsHomeImage from "@/assets/images/services/setup-and-logistics/AMANTEOAMIGO-0523.jpg";
import type { ContentLink } from "@/core/common/types/content";
import type { Locale } from "@/core/i18n";
import { getLocalizedService, SERVICE_IDS, services, type Service } from "@/features/services";

export const getHomeServicePreview = (service: Service, locale: Locale): Service => {
  const localizedService = getLocalizedService(service, locale);

  if (service.id !== SERVICE_IDS.setupLogistics) {
    return localizedService;
  }

  return {
    ...localizedService,
    featuredMedia: {
      alt: localizedService.title,
      kind: "image",
      src: setupLogisticsHomeImage,
      status: "approved",
    },
  };
};

export const servicesContent = {
  intro: {
    title: "Todo lo que un evento necesita",
    text: "MOSAÏQUE ofrece servicios integrales y modulares. Podemos encargarnos de la producción completa de un evento o apoyar etapas específicas como montaje, desmontaje, logística, mobiliario, insumos, ambientación o coordinación con venues.",
    highlight:
      "Tú eliges el nivel de acompañamiento. Nosotros nos encargamos de que cada pieza encaje.",
  },
  panelReveal: {
    title: "Servicios para cada ocasión",
    text: "Cada evento tiene una escala, un propósito y una dinámica distinta. Por eso nuestros servicios pueden contratarse de forma independiente o combinarse en paquetes personalizados según las necesidades del cliente, el espacio y el tipo de experiencia.",
    cta: { label: "Explorar servicios", href: "#services-list" } satisfies ContentLink,
  },
  items: services.map((service) => getLocalizedService(service)),
} as const;

export type ServicesPanelRevealContent = typeof servicesContent.panelReveal;
