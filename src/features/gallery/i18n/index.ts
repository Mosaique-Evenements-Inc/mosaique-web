import type { LocaleDictionaries } from "@/core/i18n";

export interface GalleryTranslations {
  archiveTitle: string;
  archiveHeading: string;
  archiveDescription: string;
  all: string;
  eventCategories: string;
  visibleEvent: string;
  visibleEvents: string;
  eventsByBrand: string;
  eventGallery: string;
  openImage: string;
  expandedGallery: string;
  closeGallery: string;
  galleryNavigation: string;
  previousImage: string;
  nextImage: string;
  previous: string;
  next: string;
  image: string;
  of: string;
}

export const galleryTranslations = {
  es: {
    archiveTitle: "Galería de eventos realizados",
    archiveHeading: "Galería de eventos realizados",
    archiveDescription:
      "Una selección de celebraciones, producciones y experiencias que hemos llevado de la idea a la realidad.",
    all: "Todos",
    eventCategories: "Categorías de eventos",
    visibleEvent: "evento visible",
    visibleEvents: "eventos visibles",
    eventsByBrand: "Eventos realizados por Mosaïque",
    eventGallery: "Galería de",
    openImage: "Abrir imagen",
    expandedGallery: "Galería ampliada de",
    closeGallery: "Cerrar galería ampliada",
    galleryNavigation: "Navegación de la galería ampliada",
    previousImage: "Imagen anterior",
    nextImage: "Imagen siguiente",
    previous: "Anterior",
    next: "Siguiente",
    image: "Imagen",
    of: "de",
  },
  en: {
    archiveTitle: "Completed event gallery",
    archiveHeading: "Completed event gallery",
    archiveDescription:
      "A selection of celebrations, productions, and experiences brought from idea to reality.",
    all: "All",
    eventCategories: "Event categories",
    visibleEvent: "visible event",
    visibleEvents: "visible events",
    eventsByBrand: "Events produced by Mosaïque",
    eventGallery: "Gallery of",
    openImage: "Open image",
    expandedGallery: "Expanded gallery of",
    closeGallery: "Close expanded gallery",
    galleryNavigation: "Expanded gallery navigation",
    previousImage: "Previous image",
    nextImage: "Next image",
    previous: "Previous",
    next: "Next",
    image: "Image",
    of: "of",
  },
  fr: {
    archiveTitle: "Galerie des événements réalisés",
    archiveHeading: "Galerie des événements réalisés",
    archiveDescription:
      "Une sélection de célébrations, productions et expériences que nous avons menées de l’idée à la réalité.",
    all: "Tous",
    eventCategories: "Catégories d’événements",
    visibleEvent: "événement visible",
    visibleEvents: "événements visibles",
    eventsByBrand: "Événements réalisés par Mosaïque",
    eventGallery: "Galerie de",
    openImage: "Ouvrir l’image",
    expandedGallery: "Galerie agrandie de",
    closeGallery: "Fermer la galerie agrandie",
    galleryNavigation: "Navigation de la galerie agrandie",
    previousImage: "Image précédente",
    nextImage: "Image suivante",
    previous: "Précédente",
    next: "Suivante",
    image: "Image",
    of: "sur",
  },
} satisfies LocaleDictionaries<GalleryTranslations>;
