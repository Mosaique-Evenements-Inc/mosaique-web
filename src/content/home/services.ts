import type { ContentLink } from "../types";

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
      index: "01",
      title: "Organización y producción integral",
      description:
        "Diseñamos y coordinamos tu evento de principio a fin: concepto, logística, proveedores, montaje y ejecución.",
      idealFor: "Quienes buscan delegar la producción completa de su evento.",
      cta: { label: "Cotizar producción integral", href: "/contact" } satisfies ContentLink,
      media: { status: "pending" },
    },
    {
      id: "service-02",
      index: "02",
      title: "Bodas y celebraciones privadas",
      description:
        "Creamos celebraciones personales y memorables, cuidando la atmósfera, el montaje y cada momento de la experiencia.",
      idealFor: "Bodas, aniversarios, cumpleaños, cenas privadas y celebraciones familiares.",
      cta: { label: "Planear una celebración", href: "/contact" } satisfies ContentLink,
      media: { status: "pending" },
    },
    {
      id: "service-03",
      index: "03",
      title: "Eventos corporativos",
      description:
        "Producimos encuentros profesionales alineados con el objetivo, la identidad y la experiencia que tu marca quiere crear.",
      idealFor: "Lanzamientos, activaciones, cenas, networking y celebraciones corporativas.",
      cta: { label: "Crear un evento corporativo", href: "/contact" } satisfies ContentLink,
      media: { status: "pending" },
    },
    {
      id: "service-04",
      index: "04",
      title: "Alianzas con venues",
      description:
        "Creamos experiencias junto a restaurantes, hoteles y espacios que quieren atraer público y activar su venue.",
      idealFor: "Venues que buscan desarrollar eventos propios o colaboraciones estratégicas.",
      cta: { label: "Proponer una alianza", href: "/contact" } satisfies ContentLink,
      media: { status: "pending" },
    },
    {
      id: "service-05",
      index: "05",
      title: "Montaje y logística",
      description:
        "Nos encargamos de la instalación, organización del espacio, movimiento de mobiliario y desmontaje del evento.",
      idealFor: "Planners, venues y clientes que necesitan apoyo operativo puntual.",
      cta: { label: "Solicitar soporte logístico", href: "/contact" } satisfies ContentLink,
      media: { status: "pending" },
    },
    {
      id: "service-06",
      index: "06",
      title: "Alquiler de mobiliario",
      description:
        "Ofrecemos mobiliario, equipos e insumos para complementar tu evento de forma individual o dentro de una producción.",
      idealFor:
        "Eventos que necesitan recursos específicos sin contratar un servicio completo.",
      cta: { label: "Ver opciones de alquiler", href: "/contact" } satisfies ContentLink,
      media: { status: "pending" },
    },
    {
      id: "service-07",
      index: "07",
      title: "Paquetes personalizados",
      description:
        "Combinamos producción, montaje, logística, ambientación y alquiler según las necesidades reales de tu evento.",
      idealFor: "Quienes buscan flexibilidad y pagar únicamente por lo que necesitan.",
      cta: { label: "Crear mi paquete", href: "/contact" } satisfies ContentLink,
      media: { status: "pending" },
    },
  ],
} as const;

export type ServiceContentItem = (typeof servicesContent.items)[number];
export type ServicesPanelRevealContent = typeof servicesContent.panelReveal;
