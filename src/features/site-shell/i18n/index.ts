import type { Locale, LocaleDictionaries } from "@/core/i18n";

export interface SiteShellTranslations {
  "navigation.open": string;
  "navigation.close": string;
  "navigation.main": string;
  "navigation.language": string;
  "navigation.currentLanguage": string;
  "footer.navigation": string;
  "footer.company": string;
  "footer.resources": string;
  "footer.services": string;
  "footer.collaborators": string;
  "footer.visitSite": string;
  "footer.opensNewTab": string;
  "footer.phone": string;
  "footer.email": string;
  "footer.location": string;
  "navigation.about": string;
  "navigation.services": string;
  "navigation.gallery": string;
  "navigation.contact": string;
  "navigation.skipToContent": string;
  "metadata.defaultTitle": string;
  "metadata.defaultDescription": string;
  navigationLabels: readonly string[];
  serviceLabels: readonly string[];
  footerLinkLabels: readonly string[];
  footerServiceLabels: readonly string[];
  footerPurpose: string;
  footerClosing: string;
  footerLegal: string;
}

export type SiteShellLocaleDictionaries = LocaleDictionaries<SiteShellTranslations>;

export const siteShellTranslations = {
  es: {
    "navigation.open": "Abrir navegación",
    "navigation.close": "Cerrar navegación",
    "navigation.main": "Navegación principal",
    "navigation.language": "Seleccionar idioma",
    "navigation.currentLanguage": "idioma actual",
    "footer.navigation": "Navegación del pie de página",
    "footer.company": "Compañía",
    "footer.resources": "Recursos",
    "footer.services": "Servicios",
    "footer.collaborators": "Colaboradores",
    "footer.visitSite": "Visitar el sitio de",
    "footer.opensNewTab": "se abre en una pestaña nueva",
    "footer.phone": "Teléfono",
    "footer.email": "Email",
    "footer.location": "Ubicación",
    "navigation.about": "Nosotros",
    "navigation.services": "Servicios",
    "navigation.gallery": "Eventos",
    "navigation.contact": "Contacto",
    "navigation.skipToContent": "Saltar al contenido principal",
    "metadata.defaultTitle": "MOSAÏQUE EVENTS",
    "metadata.defaultDescription":
      "Organización, producción y experiencias para eventos en Montréal.",
    navigationLabels: [
      "Inicio",
      "Nosotros",
      "Servicios",
      "Eventos",
      "Proceso",
      "Preguntas",
      "Contacto",
    ],
    serviceLabels: [
      "Organización y producción integral",
      "Bodas",
      "Celebraciones",
      "Eventos corporativos",
      "Alianzas con venues",
      "Montaje y logística",
      "Alquiler de mobiliario",
      "Paquetes personalizados",
    ],
    footerLinkLabels: [
      "Inicio",
      "Nosotros",
      "Servicios",
      "Eventos",
      "Proceso",
      "FAQ",
      "Contacto",
    ],
    footerServiceLabels: [
      "Organización y producción integral",
      "Bodas",
      "Celebraciones",
      "Eventos corporativos",
      "Alianzas con venues",
      "Montaje y logística",
      "Alquiler de mobiliario",
      "Paquetes personalizados",
    ],
    footerPurpose: "Cotizaciones y alianzas",
    footerClosing: "Every detail has its place.",
    footerLegal: "Todos los derechos reservados.",
  },
  en: {
    "navigation.open": "Open navigation",
    "navigation.close": "Close navigation",
    "navigation.main": "Main navigation",
    "navigation.language": "Select language",
    "navigation.currentLanguage": "current language",
    "footer.navigation": "Footer navigation",
    "footer.company": "Company",
    "footer.resources": "Resources",
    "footer.services": "Services",
    "footer.collaborators": "Collaborators",
    "footer.visitSite": "Visit the website of",
    "footer.opensNewTab": "opens in a new tab",
    "footer.phone": "Phone",
    "footer.email": "Email",
    "footer.location": "Location",
    "navigation.about": "About",
    "navigation.services": "Services",
    "navigation.gallery": "Events",
    "navigation.contact": "Contact",
    "navigation.skipToContent": "Skip to main content",
    "metadata.defaultTitle": "MOSAÏQUE EVENTS",
    "metadata.defaultDescription": "Event planning, production, and experiences in Montréal.",
    navigationLabels: [
      "Home",
      "About",
      "Services",
      "Events",
      "Process",
      "Questions",
      "Contact",
    ],
    serviceLabels: [
      "Full event planning and production",
      "Weddings",
      "Celebrations",
      "Corporate events",
      "Venue partnerships",
      "Setup and logistics",
      "Furniture rental",
      "Custom packages",
    ],
    footerLinkLabels: ["Home", "About", "Services", "Events", "Process", "FAQ", "Contact"],
    footerServiceLabels: [
      "Full-service event production",
      "Weddings",
      "Celebrations",
      "Corporate events",
      "Venue partnerships",
      "Setup and logistics",
      "Furniture rental",
      "Custom packages",
    ],
    footerPurpose: "Quotes and partnerships",
    footerClosing: "Every detail has its place.",
    footerLegal: "All rights reserved.",
  },
  fr: {
    "navigation.open": "Ouvrir la navigation",
    "navigation.close": "Fermer la navigation",
    "navigation.main": "Navigation principale",
    "navigation.language": "Choisir la langue",
    "navigation.currentLanguage": "langue actuelle",
    "footer.navigation": "Navigation du pied de page",
    "footer.company": "Entreprise",
    "footer.resources": "Ressources",
    "footer.services": "Services",
    "footer.collaborators": "Collaborateurs",
    "footer.visitSite": "Visiter le site de",
    "footer.opensNewTab": "s’ouvre dans un nouvel onglet",
    "footer.phone": "Téléphone",
    "footer.email": "Courriel",
    "footer.location": "Emplacement",
    "navigation.about": "Nous",
    "navigation.services": "Services",
    "navigation.gallery": "Événements",
    "navigation.contact": "Contact",
    "navigation.skipToContent": "Passer au contenu principal",
    "metadata.defaultTitle": "MOSAÏQUE EVENTS",
    "metadata.defaultDescription":
      "Organisation, production et expériences événementielles à Montréal.",
    navigationLabels: [
      "Accueil",
      "Nous",
      "Services",
      "Événements",
      "Processus",
      "Questions",
      "Contact",
    ],
    serviceLabels: [
      "Organisation et production intégrale",
      "Mariages",
      "Célébrations",
      "Événements corporatifs",
      "Partenariats avec des lieux",
      "Montage et logistique",
      "Location de mobilier",
      "Forfaits personnalisés",
    ],
    footerLinkLabels: [
      "Accueil",
      "Nous",
      "Services",
      "Événements",
      "Processus",
      "FAQ",
      "Contact",
    ],
    footerServiceLabels: [
      "Organisation et production événementielle",
      "Mariages",
      "Célébrations",
      "Événements corporatifs",
      "Partenariats avec des lieux",
      "Montage et logistique",
      "Location de mobilier",
      "Forfaits personnalisés",
    ],
    footerPurpose: "Devis et partenariats",
    footerClosing: "Chaque détail a sa place.",
    footerLegal: "Tous droits réservés.",
  },
} satisfies LocaleDictionaries<SiteShellTranslations>;

export const getSiteShellTranslations = (locale: Locale = "es") =>
  siteShellTranslations[locale];
