import type { ContentLink } from "../types";

export const footerContent = {
  logo: "MOSAÏQUE EVENTS",
  description:
    "Empresa integral de eventos en Montréal especializada en producción, organización, montaje, logística, alquiler de mobiliario y creación de experiencias en alianza con venues.",
  links: [
    { label: "Inicio", href: "#top" },
    { label: "Nosotros", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Experiencias", href: "#experiences" },
    { label: "Proceso", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contacto", href: "/contact" },
  ] satisfies ContentLink[],
  services: [
    "Producción integral",
    "Bodas y celebraciones privadas",
    "Eventos corporativos",
    "Alquiler de mobiliario",
    "Montaje y desmontaje",
    "Alianzas con venues",
  ],
  contact: {
    location: "Montréal, Québec",
    purpose: "Cotizaciones y alianzas",
    phone: {
      label: "438 459 0481",
      href: "tel:+14384590481",
    } satisfies ContentLink,
    email: {
      label: "info@mosaique-events.com",
      href: "mailto:info@mosaique-events.com",
    } satisfies ContentLink,
  },
  closingStatement: "Every detail has its place.",
  legal: "©️ MOSAÏQUE EVENTS. All rights reserved.",
} as const;
