import type { ContentLink } from "../types";

export const navigationContent = {
  logo: "MOSAÏQUE ÉVÉNEMENTS",
  items: [
    { label: "Inicio", href: "#top" },
    { label: "Nosotros", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Experiencias", href: "#experiences" },
    { label: "Proceso", href: "#process" },
    { label: "Preguntas", href: "#faq" },
    { label: "Contacto", href: "/contact" },
  ] satisfies ContentLink[],
  cta: { label: "Cotizar un evento", href: "/contact" } satisfies ContentLink,
} as const;
