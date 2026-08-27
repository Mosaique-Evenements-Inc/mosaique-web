import type { ContentLink } from "../types";

export interface EventGalleryItem {
  context: string;
  href: string;
  id: string;
  media: { status: "pending" };
  slug: string;
  status: "placeholder";
  title: string;
}

type EventGallerySourceItem = Omit<EventGalleryItem, "href" | "slug">;

const createEventGalleryItem = (event: EventGallerySourceItem): EventGalleryItem => {
  const slug = event.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return { ...event, slug, href: `/events/${slug}` };
};

export const eventGalleryItems = [
  createEventGalleryItem({
    id: "event-slot-01",
    title: "Nossa Copa",
    context: "Fútbol, comunidad y emprendimiento reunidos en una experiencia de festival.",
    status: "placeholder",
    media: { status: "pending" },
  }),
  createEventGalleryItem({
    id: "event-slot-02",
    title: "Baila da Zaza",
    context: "Ritmo, baile y esencia brasileña en una experiencia hecha para celebrar.",
    status: "placeholder",
    media: { status: "pending" },
  }),
  createEventGalleryItem({
    id: "event-slot-03",
    title: "Baby Shower",
    context: "Una celebración íntima para compartir la llegada de un nuevo comienzo.",
    status: "placeholder",
    media: { status: "pending" },
  }),
  createEventGalleryItem({
    id: "event-slot-04",
    title: "Wedding R&R",
    context: "Una celebración de inspiración Amalfi en el entorno de Riverest.",
    status: "placeholder",
    media: { status: "pending" },
  }),
  createEventGalleryItem({
    id: "event-slot-05",
    title: "Cumpleaños Ana Paula",
    context:
      "Juego, celebración y momentos en familia en una experiencia pensada para los más pequeños.",
    status: "placeholder",
    media: { status: "pending" },
  }),
  createEventGalleryItem({
    id: "event-slot-06",
    title: "Fan Fest Club",
    context:
      "Fútbol, música y entretenimiento reunidos en una experiencia para celebrar juntos.",
    status: "placeholder",
    media: { status: "pending" },
  }),
] satisfies readonly EventGalleryItem[];

export const eventGalleryContent = {
  status: "placeholder",
  title: "Eventos que ya tomaron forma.",
  introduction:
    "Una selección de celebraciones, producciones y experiencias que hemos llevado de la idea a la realidad.",
  cta: { label: "Explorar eventos", href: "#experiences" } satisfies ContentLink,
} as const;
