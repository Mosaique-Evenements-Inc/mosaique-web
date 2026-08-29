import type { ContentLink } from "../types";
import type { GalleryImage } from "../media";

export interface ServiceContentItem {
  cta: ContentLink;
  description: string;
  gallery: readonly GalleryImage[];
  id: string;
  idealFor: string;
  index: string;
  media: { status: "pending" };
  relatedEvents: readonly string[];
  slug: string;
  title: string;
}

const createPendingGallery = (title: string): GalleryImage[] => [
  {
    alt: `Contenido visual pendiente para ${title}.`,
    height: 900,
    layout: "full-landscape",
    src: null,
    status: "pending",
    width: 1600,
  },
];

export const servicesContent = {
  intro: {
    title: "Todo lo que un evento necesita",
    text: "MOSAÏQUE ofrece servicios integrales y modulares. Podemos encargarnos de la producción completa de un evento o apoyar etapas específicas como montaje, desmontaje, logística, mobiliario, insumos, ambientación o coordinación con venues.",
    highlight:
      "Tú eliges el nivel de acompañamiento. Nosotros nos encargamos de que cada pieza encaje.",
  },
  panelReveal: {
    title: "Servicios para cada ocasión",
    text: "Cada evento tiene una escala, un propósito y una dinámica distinta. Por eso nuestros servicios pueden contratarse de forma independiente o combinarse en paquetes personalizados según las necesidades del cliente, el espacio y el tipo de experiencia.",
    cta: { label: "Explorar servicios", href: "#services-list" } satisfies ContentLink,
  },
  items: [
    {
      id: "service-01",
      slug: "organizacion-produccion-integral",
      index: "01",
      title: "Organización y producción integral",
      description:
        "Diseñamos y coordinamos tu evento de principio a fin: concepto, logística, proveedores, montaje y ejecución.",
      idealFor: "Quienes buscan delegar la producción completa de su evento.",
      cta: {
        label: "Cotizar producción integral",
        href: "/contact?service=organizacion-produccion-integral",
      } satisfies ContentLink,
      gallery: createPendingGallery("Organización y producción integral"),
      media: { status: "pending" },
      relatedEvents: [],
    },
    {
      id: "service-02",
      slug: "bodas-celebraciones-privadas",
      index: "02",
      title: "Bodas y celebraciones privadas",
      description:
        "Creamos celebraciones personales y memorables, cuidando la atmósfera, el montaje y cada momento de la experiencia.",
      idealFor: "Bodas, aniversarios, cumpleaños, cenas privadas y celebraciones familiares.",
      cta: {
        label: "Planear una celebración",
        href: "/contact?service=bodas-celebraciones-privadas",
      } satisfies ContentLink,
      gallery: createPendingGallery("Bodas y celebraciones privadas"),
      media: { status: "pending" },
      relatedEvents: [],
    },
    {
      id: "service-03",
      slug: "eventos-corporativos",
      index: "03",
      title: "Eventos corporativos",
      description:
        "Producimos encuentros profesionales alineados con el objetivo, la identidad y la experiencia que tu marca quiere crear.",
      idealFor: "Lanzamientos, activaciones, cenas, networking y celebraciones corporativas.",
      cta: {
        label: "Crear un evento corporativo",
        href: "/contact?service=eventos-corporativos",
      } satisfies ContentLink,
      gallery: createPendingGallery("Eventos corporativos"),
      media: { status: "pending" },
      relatedEvents: [],
    },
    {
      id: "service-04",
      slug: "alianzas-venues",
      index: "04",
      title: "Alianzas con venues",
      description:
        "Creamos experiencias junto a restaurantes, hoteles y espacios que quieren atraer público y activar su venue.",
      idealFor: "Venues que buscan desarrollar eventos propios o colaboraciones estratégicas.",
      cta: {
        label: "Proponer una alianza",
        href: "/contact?service=alianzas-venues",
      } satisfies ContentLink,
      gallery: createPendingGallery("Alianzas con venues"),
      media: { status: "pending" },
      relatedEvents: [],
    },
    {
      id: "service-05",
      slug: "montaje-logistica",
      index: "05",
      title: "Montaje y logística",
      description:
        "Nos encargamos de la instalación, organización del espacio, movimiento de mobiliario y desmontaje del evento.",
      idealFor: "Planners, venues y clientes que necesitan apoyo operativo puntual.",
      cta: {
        label: "Solicitar soporte logístico",
        href: "/contact?service=montaje-logistica",
      } satisfies ContentLink,
      gallery: createPendingGallery("Montaje y logística"),
      media: { status: "pending" },
      relatedEvents: [],
    },
    {
      id: "service-06",
      slug: "alquiler-mobiliario",
      index: "06",
      title: "Alquiler de mobiliario",
      description:
        "Ofrecemos mobiliario, equipos e insumos para complementar tu evento de forma individual o dentro de una producción.",
      idealFor:
        "Eventos que necesitan recursos específicos sin contratar un servicio completo.",
      cta: {
        label: "Ver opciones de alquiler",
        href: "/contact?service=alquiler-mobiliario",
      } satisfies ContentLink,
      gallery: createPendingGallery("Alquiler de mobiliario"),
      media: { status: "pending" },
      relatedEvents: [],
    },
    {
      id: "service-07",
      slug: "paquetes-personalizados",
      index: "07",
      title: "Paquetes personalizados",
      description:
        "Combinamos producción, montaje, logística, ambientación y alquiler según las necesidades reales de tu evento.",
      idealFor: "Quienes buscan flexibilidad y pagar únicamente por lo que necesitan.",
      cta: {
        label: "Crear mi paquete",
        href: "/contact?service=paquetes-personalizados",
      } satisfies ContentLink,
      gallery: createPendingGallery("Paquetes personalizados"),
      media: { status: "pending" },
      relatedEvents: [],
    },
  ] satisfies readonly ServiceContentItem[],
} as const;

export type ServicesPanelRevealContent = typeof servicesContent.panelReveal;
