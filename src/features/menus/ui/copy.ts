import type { Locale } from "@/core/i18n/config/locales";

const menuUiCopy = {
  en: {
    languages: "Menu language",
    socialLinks: "Provider social profiles",
    opensNewTab: "opens in a new tab",
    attribution: "Discover the Mosaïque universe",
    menu: "Menu",
    follow: "Follow us on",
  },
  es: {
    languages: "Idioma del menú",
    socialLinks: "Redes sociales del establecimiento",
    opensNewTab: "se abre en una pestaña nueva",
    attribution: "Descubre el universo Mosaïque",
    menu: "Menú",
    follow: "Síguenos en",
  },
  fr: {
    languages: "Langue du menu",
    socialLinks: "Réseaux sociaux de l’établissement",
    opensNewTab: "s’ouvre dans un nouvel onglet",
    attribution: "Découvrez l’univers Mosaïque",
    menu: "Menu",
    follow: "Suivez-nous sur",
  },
} as const satisfies Record<
  Locale,
  {
    languages: string;
    socialLinks: string;
    opensNewTab: string;
    attribution: string;
    menu: string;
    follow: string;
  }
>;

export const getMenuUiCopy = (locale: Locale) => menuUiCopy[locale];
