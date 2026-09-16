import type { Locale, LocaleDictionaries } from "@/core/i18n";
import type {
  TreeLinkCollaboratorName,
  TreeLinkSocialId,
} from "@/features/tree-link/content/tree-link";

interface TreeLinkTranslations {
  metadataTitle: string;
  metadataDescription: string;
  identityTagline: string;
  websiteLabel: string;
  websiteDescription: string;
  eventsHeading: string;
  agendaTitle: string;
  agendaDescription: string;
  eventSlotLabels: readonly [string, string, string];
  eventPending: string;
  socialsHeading: string;
  socialDescriptions: Record<TreeLinkSocialId, string>;
  pendingLink: string;
  collaboratorsHeading: string;
  collaboratorsDescription: string;
  collaboratorDescriptions: Record<TreeLinkCollaboratorName, string>;
  visitCollaborator: string;
  opensNewTab: string;
  theme: {
    switchToDark: string;
    switchToLight: string;
  };
  share: {
    open: string;
    close: string;
    title: string;
    previewLabel: string;
    copy: string;
    copied: string;
    copyError: string;
    shareOn: string;
    withFacebook: string;
    withWhatsapp: string;
    withLinkedin: string;
    withX: string;
    withEmail: string;
    emailOption: string;
    more: string;
    fallbackCopied: string;
  };
}

export const treeLinkTranslations = {
  es: {
    metadataTitle: "MOSAÏQUE — Enlaces y experiencias",
    metadataDescription:
      "Descubre el sitio web, la agenda, las redes y los colaboradores de MOSAÏQUE ÉVÉNEMENTS.",
    identityTagline: "Creamos eventos que se viven, se recuerdan y se comparten.",
    websiteLabel: "Visita nuestro sitio web",
    websiteDescription: "Organización y experiencias",
    eventsHeading: "Próximos eventos",
    agendaTitle: "Agenda MOSAÏQUE",
    agendaDescription: "Descubre lo próximo.",
    eventSlotLabels: ["Evento 01", "Evento 02", "Evento 03"],
    eventPending: "Información próximamente",
    socialsHeading: "Sigue la experiencia",
    socialDescriptions: {
      instagram: "Eventos, inspiración y detrás de escena.",
      tiktok: "Momentos, tendencias y experiencias.",
      facebook: "Eventos, novedades y comunidad.",
    },
    pendingLink: "Enlace próximamente",
    collaboratorsHeading: "Nuestros colaboradores",
    collaboratorsDescription: "Personas y marcas con las que creamos grandes experiencias.",
    collaboratorDescriptions: {
      "Hey PC": "Promoción y producción de experiencias.",
      "Pharus Creative": "Fotografía y producción audiovisual.",
      "Microverse Solution": "Soluciones tecnológicas para nuestras experiencias.",
      Latinova: "Servicios profesionales de limpieza.",
    },
    visitCollaborator: "Visitar el sitio de",
    opensNewTab: "se abre en una pestaña nueva",
    theme: {
      switchToDark: "Cambiar a modo oscuro",
      switchToLight: "Cambiar a modo claro",
    },
    share: {
      open: "Compartir esta página",
      close: "Cerrar opciones para compartir",
      title: "Compartir MOSAÏQUE",
      previewLabel: "Página oficial de enlaces",
      copy: "Copiar enlace",
      copied: "Enlace copiado",
      copyError: "No se pudo copiar el enlace. Inténtalo de nuevo.",
      shareOn: "Compartir en",
      withFacebook: "Compartir en Facebook",
      withWhatsapp: "Compartir en WhatsApp",
      withLinkedin: "Compartir en LinkedIn",
      withX: "Compartir en X",
      withEmail: "Compartir por email",
      emailOption: "Correo",
      more: "Más opciones",
      fallbackCopied: "El menú para compartir no está disponible. Enlace copiado.",
    },
  },
  en: {
    metadataTitle: "MOSAÏQUE — Links and experiences",
    metadataDescription:
      "Discover the website, agenda, social channels, and collaborators of MOSAÏQUE ÉVÉNEMENTS.",
    identityTagline: "We create events to experience, remember, and share.",
    websiteLabel: "Visit our website",
    websiteDescription: "Event planning and experiences",
    eventsHeading: "Upcoming events",
    agendaTitle: "MOSAÏQUE agenda",
    agendaDescription: "Discover what’s next.",
    eventSlotLabels: ["Event 01", "Event 02", "Event 03"],
    eventPending: "Details coming soon",
    socialsHeading: "Follow the experience",
    socialDescriptions: {
      instagram: "Events, inspiration, and behind the scenes.",
      tiktok: "Moments, trends, and experiences.",
      facebook: "Events, updates, and community.",
    },
    pendingLink: "Link coming soon",
    collaboratorsHeading: "Our collaborators",
    collaboratorsDescription:
      "People and brands we collaborate with to create remarkable experiences.",
    collaboratorDescriptions: {
      "Hey PC": "Event promotion and experience production.",
      "Pharus Creative": "Photography and audiovisual production.",
      "Microverse Solution": "Technology solutions for our experiences.",
      Latinova: "Professional cleaning services.",
    },
    visitCollaborator: "Visit the website of",
    opensNewTab: "opens in a new tab",
    theme: {
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
    },
    share: {
      open: "Share this page",
      close: "Close sharing options",
      title: "Share MOSAÏQUE",
      previewLabel: "Official links page",
      copy: "Copy link",
      copied: "Link copied",
      copyError: "The link could not be copied. Please try again.",
      shareOn: "Share on",
      withFacebook: "Share on Facebook",
      withWhatsapp: "Share on WhatsApp",
      withLinkedin: "Share on LinkedIn",
      withX: "Share on X",
      withEmail: "Share by email",
      emailOption: "Email",
      more: "More options",
      fallbackCopied: "The share menu is unavailable. Link copied.",
    },
  },
  fr: {
    metadataTitle: "MOSAÏQUE — Liens et expériences",
    metadataDescription:
      "Découvrez le site, l’agenda, les réseaux et les collaborateurs de MOSAÏQUE ÉVÉNEMENTS.",
    identityTagline: "Nous créons des événements à vivre, à retenir et à partager.",
    websiteLabel: "Visitez notre site web",
    websiteDescription: "Organisation et expériences événementielles",
    eventsHeading: "Événements à venir",
    agendaTitle: "Agenda MOSAÏQUE",
    agendaDescription: "Découvrez ce qui s’en vient.",
    eventSlotLabels: ["Événement 01", "Événement 02", "Événement 03"],
    eventPending: "Détails à venir",
    socialsHeading: "Suivez l’expérience",
    socialDescriptions: {
      instagram: "Événements, inspiration et coulisses.",
      tiktok: "Moments, tendances et expériences.",
      facebook: "Événements, nouveautés et communauté.",
    },
    pendingLink: "Lien à venir",
    collaboratorsHeading: "Nos collaborateurs",
    collaboratorsDescription:
      "Des personnes et des marques avec qui nous créons des expériences mémorables.",
    collaboratorDescriptions: {
      "Hey PC": "Promotion et production d’expériences.",
      "Pharus Creative": "Photographie et production audiovisuelle.",
      "Microverse Solution": "Solutions technologiques pour nos expériences.",
      Latinova: "Services professionnels de nettoyage.",
    },
    visitCollaborator: "Visiter le site de",
    opensNewTab: "s’ouvre dans un nouvel onglet",
    theme: {
      switchToDark: "Passer au mode sombre",
      switchToLight: "Passer au mode clair",
    },
    share: {
      open: "Partager cette page",
      close: "Fermer les options de partage",
      title: "Partager MOSAÏQUE",
      previewLabel: "Page officielle de liens",
      copy: "Copier le lien",
      copied: "Lien copié",
      copyError: "Impossible de copier le lien. Veuillez réessayer.",
      shareOn: "Partager sur",
      withFacebook: "Partager sur Facebook",
      withWhatsapp: "Partager sur WhatsApp",
      withLinkedin: "Partager sur LinkedIn",
      withX: "Partager sur X",
      withEmail: "Partager par courriel",
      emailOption: "Courriel",
      more: "Plus d’options",
      fallbackCopied: "Le menu de partage n’est pas disponible. Lien copié.",
    },
  },
} satisfies LocaleDictionaries<TreeLinkTranslations>;

export const getTreeLinkTranslations = (locale: Locale = "es") => treeLinkTranslations[locale];
