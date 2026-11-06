import type { Locale } from "@/core/i18n/config/locales";

const menuUiCopy = {
  en: {
    languages: "Menu language",
    socialLinks: "Provider social profiles",
    opensNewTab: "opens in a new tab",
    attribution: "Discover the Mosaïque universe",
    relatedEventAttribution: "Discover the {event} universe",
    menu: "Menu",
    follow: "Follow us on",
    viewDish: "View details: {dish}",
    closeDish: "Close dish details",
    mainDish: "Main course",
    dessert: "Dessert",
  },
  es: {
    languages: "Idioma del menú",
    socialLinks: "Redes sociales del establecimiento",
    opensNewTab: "se abre en una pestaña nueva",
    attribution: "Descubre el universo Mosaïque",
    relatedEventAttribution: "Descubre el universo de {event}",
    menu: "Menú",
    follow: "Síguenos en",
    viewDish: "Ver detalles: {dish}",
    closeDish: "Cerrar detalles del plato",
    mainDish: "Plato principal",
    dessert: "Postre",
  },
  fr: {
    languages: "Langue du menu",
    socialLinks: "Réseaux sociaux de l’établissement",
    opensNewTab: "s’ouvre dans un nouvel onglet",
    attribution: "Découvrez l’univers Mosaïque",
    relatedEventAttribution: "Découvrez l’univers d’{event}",
    menu: "Menu",
    follow: "Suivez-nous sur",
    viewDish: "Voir les détails : {dish}",
    closeDish: "Fermer les détails du plat",
    mainDish: "Plat principal",
    dessert: "Dessert",
  },
} as const satisfies Record<
  Locale,
  {
    languages: string;
    socialLinks: string;
    opensNewTab: string;
    attribution: string;
    relatedEventAttribution: string;
    menu: string;
    follow: string;
    viewDish: string;
    closeDish: string;
    mainDish: string;
    dessert: string;
  }
>;

export const getMenuUiCopy = (locale: Locale) => menuUiCopy[locale];
