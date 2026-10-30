import type { Locale, LocaleDictionaries } from "@/core/i18n";
import type { EventLinkTranslation } from "../types/index.ts";
import type { amanteOAmigoEventLink } from "../data/amante-o-amigo.ts";

type EventLinkId = typeof amanteOAmigoEventLink.eventId;

export const eventLinkLanguageNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

export const eventLinkTranslations = {
  en: {
    "event-slot-07": {
      slogan: "A night to meet, connect, and let yourself be surprised.",
      landingDescription:
        "A space to meet new people, share moments, and experience something different in a social, dynamic, and authentic atmosphere.",
      labels: {
        languages: "Event page language",
        opensNewTab: "opens in a new tab",
        upcomingEvent: "Upcoming event",
        photoGallery: "Photo gallery",
        pastEditions: "Past editions",
        galleryAvailableSingular: "gallery available",
        galleryAvailablePlural: "galleries available",
        socialMedia: "Social media",
        menuAction: "View the menu",
        ticketAction: "View event and tickets",
        upcomingShare: "Share the upcoming event",
        landingShare: "Share Amante o Amigo",
        copyLink: "Copy link",
        copied: "Link copied",
        copyError: "Could not copy the link. Please try again.",
        closeShare: "Close sharing options",
        shareVia: "Share via",
        emailShare: "Email",
        moreShare: "More options",
        producedBy: "Produced by MOSAÏQUE",
        editionSingular: "edition",
        editionPlural: "editions",
      },
      share: {
        ticketPrefix: "Tickets:",
        landingInvitation: "Discover the experience.",
      },
      pastEditions: {},
    },
  },
  es: {
    "event-slot-07": {
      slogan: "Una noche para conocer, conectar y dejarte sorprender.",
      landingDescription:
        "Un espacio para conocer nuevas personas, compartir momentos y vivir experiencias diferentes en un ambiente social, dinámico y auténtico.",
      labels: {
        languages: "Idioma de la página del evento",
        opensNewTab: "se abre en una pestaña nueva",
        upcomingEvent: "Próximo evento",
        photoGallery: "Galería de fotos",
        pastEditions: "Ediciones anteriores",
        galleryAvailableSingular: "galería disponible",
        galleryAvailablePlural: "galerías disponibles",
        socialMedia: "Redes sociales",
        menuAction: "Ver el menú",
        ticketAction: "Ver evento y entradas",
        upcomingShare: "Compartir el próximo evento",
        landingShare: "Compartir Amante o Amigo",
        copyLink: "Copiar enlace",
        copied: "Enlace copiado",
        copyError: "No se pudo copiar el enlace. Inténtalo de nuevo.",
        closeShare: "Cerrar opciones para compartir",
        shareVia: "Compartir por",
        emailShare: "Correo",
        moreShare: "Más opciones",
        producedBy: "Producido por MOSAÏQUE",
        editionSingular: "edición",
        editionPlural: "ediciones",
      },
      share: {
        ticketPrefix: "Entradas:",
        landingInvitation: "Descubre la experiencia.",
      },
      pastEditions: {},
    },
  },
  fr: {
    "event-slot-07": {
      slogan: "Une soirée pour faire des rencontres, créer des liens et se laisser surprendre.",
      landingDescription:
        "Un espace pour rencontrer de nouvelles personnes, partager des moments et vivre des expériences différentes dans une ambiance sociale, dynamique et authentique.",
      labels: {
        languages: "Langue de la page de l’événement",
        opensNewTab: "s’ouvre dans un nouvel onglet",
        upcomingEvent: "Prochain événement",
        photoGallery: "Galerie photos",
        pastEditions: "Éditions précédentes",
        galleryAvailableSingular: "galerie disponible",
        galleryAvailablePlural: "galeries disponibles",
        socialMedia: "Réseaux sociaux",
        menuAction: "Voir le menu",
        ticketAction: "Voir l’événement et les billets",
        upcomingShare: "Partager le prochain événement",
        landingShare: "Partager Amante o Amigo",
        copyLink: "Copier le lien",
        copied: "Lien copié",
        copyError: "Impossible de copier le lien. Réessayez.",
        closeShare: "Fermer les options de partage",
        shareVia: "Partager via",
        emailShare: "Courriel",
        moreShare: "Autres options",
        producedBy: "Produit par MOSAÏQUE",
        editionSingular: "édition",
        editionPlural: "éditions",
      },
      share: {
        ticketPrefix: "Billets :",
        landingInvitation: "Découvrez l’expérience.",
      },
      pastEditions: {},
    },
  },
} satisfies LocaleDictionaries<Record<EventLinkId, EventLinkTranslation>>;
