import { getLocalizedService, services } from "../../services";
import { getQuoteTranslations } from "../i18n";

export const quoteContent = {
  eyebrow: "Solicitud de cotización",
  title: "Cuéntanos sobre tu evento",
  mobileTitle: "Cotizar un evento",
  steps: [
    { id: "basic", index: "01", label: "Información básica" },
    { id: "additional", index: "02", label: "Información adicional" },
  ],
  services: [
    ...services.map(({ id, slug, title }) => ({
      value: id,
      slug,
      label: title,
    })),
    { value: "guidance", slug: "", label: "No estoy seguro / necesito orientación" },
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

export const getQuoteContent = (locale: "es" | "en" | "fr" = "es") => {
  const translations = getQuoteTranslations(locale);
  return {
    ...quoteContent,
    eyebrow: translations.eyebrow,
    title: translations.title,
    mobileTitle: translations.mobileTitle,
    steps: [
      { id: "basic", index: "01", label: translations.basicStep },
      { id: "additional", index: "02", label: translations.additionalStep },
    ],
    services: [
      ...services.map((service) => {
        const localized = getLocalizedService(service, locale);
        return { value: service.id, slug: service.slug, label: localized.title };
      }),
      { value: "guidance", slug: "", label: translations.serviceGuidance },
    ],
    eventTypes: translations.eventTypes,
    guestRanges: translations.guestRanges,
    preferredLanguages: translations.preferredLanguages,
    venueOptions: translations.venueOptions,
    budgets: translations.budgets,
  };
};
