import { servicesContent } from "./services";

export const quoteContent = {
  eyebrow: "Solicitud de cotización",
  title: "Cuéntanos sobre tu evento",
  mobileTitle: "Cotizar un evento",
  steps: [
    { id: "basic", index: "01", label: "Información básica" },
    { id: "additional", index: "02", label: "Información adicional" },
  ],
  services: [
    ...servicesContent.items.map(({ id, title }) => ({ value: id, label: title })),
    { value: "guidance", label: "No estoy seguro / necesito orientación" },
  ],
  eventTypes: [
    "Boda",
    "Cumpleaños",
    "Celebración privada",
    "Evento corporativo",
    "Activación / experiencia de marca",
    "Evento para venue",
    "Otro",
  ],
  guestRanges: ["Menos de 25", "25–50", "51–100", "101–200", "200+", "Aún no lo sé"],
  preferredLanguages: [
    { value: "es", label: "Español" },
    { value: "fr", label: "Francés" },
    { value: "en", label: "Inglés" },
  ],
  venueOptions: [
    { value: "yes", label: "Sí" },
    { value: "no", label: "No" },
    { value: "searching", label: "Estoy buscando" },
  ],
  budgets: [
    "Menos de $2,500",
    "$2,500–$5,000",
    "$5,000–$10,000",
    "$10,000–$20,000",
    "$20,000+",
    "Aún no tengo un presupuesto definido",
  ],
} as const;
