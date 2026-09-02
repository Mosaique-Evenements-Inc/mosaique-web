import type { ContentLink } from "@/core/common/types/content";
import { services as serviceCatalog } from "@/features/services";

const serviceLinks = serviceCatalog.map(({ slug, title }) => ({
  label: title,
  href: `/services/${slug}`,
})) satisfies ContentLink[];

export const footerContent = {
  logo: "MOSAÏQUE EVENTS",
  description:
    "Empresa integral de eventos en Montréal especializada en producción, organización, montaje, logística, alquiler de mobiliario y creación de experiencias en alianza con venues.",
  links: [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/about" },
    { label: "Servicios", href: "/#services" },
    { label: "Eventos", href: "/gallery" },
    { label: "Proceso", href: "/#process" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contacto", href: "/contact" },
  ] satisfies ContentLink[],
  // Lista editorial anterior conservada como referencia; ya no controla las entradas visibles.
  // services: [
  //   "Producción integral",
  //   "Bodas",
  //   "Celebraciones",
  //   "Eventos corporativos",
  //   "Alquiler de mobiliario",
  //   "Montaje y desmontaje",
  //   "Alianzas con venues",
  // ],
  services: serviceLinks,
  contact: {
    location: "Montréal, Québec",
    purpose: "Cotizaciones y alianzas",
    phone: {
      label: "438 459 0481",
      href: "tel:+14384590481",
    } satisfies ContentLink,
    email: {
      label: "info@mosaiqueevenements.com",
      href: "mailto:info@mosaiqueevenements.com",
    } satisfies ContentLink,
  },
  closingStatement: "Every detail has its place.",
  legal: "©️ MOSAÏQUE EVENTS. All rights reserved.",
} as const;
