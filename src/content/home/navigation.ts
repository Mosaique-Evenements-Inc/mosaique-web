import type { ContentLink } from "../types";

const navigationItems = [
  { label: "Inicio", href: "#top" },
  { label: "Nosotros", href: "#about" },
  { label: "Servicios", href: "#services" },
  { label: "Experiencias", href: "#experiences" },
  { label: "Proceso", href: "#process" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "/contact" },
] satisfies ContentLink[];

const desktopNavigationHrefs = new Set(["#about", "#services", "#experiences", "/contact"]);

export const navigationContent = {
  logo: "MOSAÏQUE ÉVÉNEMENTS",
  items: navigationItems,
  desktopItems: navigationItems
    .filter((item) => desktopNavigationHrefs.has(item.href))
    .map((item) => (item.href === "#experiences" ? { ...item, label: "Galería" } : item)),
} as const;
