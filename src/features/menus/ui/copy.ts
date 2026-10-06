import type { Locale } from "@/core/i18n/config/locales";

const menuUiCopy = {
  en: {
    languages: "Menu language",
    socialLinks: "Provider social profiles",
    opensNewTab: "opens in a new tab",
    attribution: "Powered by",
  },
  es: {
    languages: "Idioma del menú",
    socialLinks: "Redes sociales del establecimiento",
    opensNewTab: "se abre en una pestaña nueva",
    attribution: "Creado por",
  },
  fr: {
    languages: "Langue du menu",
    socialLinks: "Réseaux sociaux de l’établissement",
    opensNewTab: "s’ouvre dans un nouvel onglet",
    attribution: "Propulsé par",
  },
} as const satisfies Record<
  Locale,
  {
    languages: string;
    socialLinks: string;
    opensNewTab: string;
    attribution: string;
  }
>;

export const getMenuUiCopy = (locale: Locale) => menuUiCopy[locale];
