import type { ContentLink } from "@/core/common/types/content";
import { services } from "@/features/services";

const navigationItems = [
  { label: "Inicio", href: "#top" },
  { label: "Nosotros", href: "/about" },
  { label: "Servicios", href: "#services" },
  { label: "Galería", href: "/gallery" },
  { label: "Proceso", href: "#process" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "/contact" },
] satisfies ContentLink[];

const desktopNavigationHrefs = new Set(["/about", "#services", "/gallery", "/contact"]);

export const serviceNavigationItems = services.map(({ slug, title }) => ({
  label: title,
  href: `/services/${slug}`,
}));

export const navigationContent = {
  logo: "MOSAÏQUE ÉVÉNEMENTS",
  items: navigationItems,
  desktopItems: navigationItems.filter((item) => desktopNavigationHrefs.has(item.href)),
} as const;
