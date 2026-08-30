import {
  babyShowerMain,
  bailaDaZazaMain,
  cumpleanosAnaPaula48,
  fanFestMain,
  nossaCopaMain,
  nossaCopa92,
  weddingEb59664,
  weddingEb59673,
} from "../../../assets/images/events";
import { assertUniqueValues } from "../../../core/common/utils/assert-unique-values";
import type { FeaturedMedia } from "../../../core/common/types/media";
import type { ContentLink } from "../../../core/common/types/content";
import { SERVICE_IDS, type Service } from "../types";

const createFeaturedMedia = (
  src: Extract<FeaturedMedia, { kind: "image" }>["src"],
  alt: string,
): FeaturedMedia => ({
  alt,
  kind: "image",
  src,
  status: "approved",
});

export const services = [
  {
    id: SERVICE_IDS.organizationProductionIntegral,
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
    featuredMedia: createFeaturedMedia(
      nossaCopa92,
      "Vista general de los asistentes reunidos para Nossa Copa.",
    ),
    gallery: [],
  },
  {
    id: SERVICE_IDS.weddings,
    slug: "bodas",
    index: "02",
    title: "Bodas",
    description:
      "Diseñamos y producimos bodas que reflejan la historia, el estilo y la personalidad de cada pareja, cuidando cada detalle desde la planificación hasta el último momento de la celebración.",
    idealFor:
      "Parejas que buscan una boda personalizada, cuidadosamente producida y pensada como una experiencia completa.",
    cta: {
      label: "Planear nuestra boda",
      href: "/contact?service=bodas",
    } satisfies ContentLink,
    featuredMedia: createFeaturedMedia(
      weddingEb59664,
      "Mesas de la boda R&R dispuestas al aire libre entre árboles y vegetación.",
    ),
    gallery: [],
  },
  {
    id: SERVICE_IDS.celebrations,
    slug: "celebraciones",
    index: "03",
    title: "Celebraciones",
    description:
      "Creamos celebraciones memorables alrededor de cada ocasión, combinando concepto, ambientación, montaje y producción para transformar cada encuentro en una experiencia única.",
    idealFor:
      "Cumpleaños, baby showers, aniversarios, fiestas temáticas y otras celebraciones personales o sociales.",
    cta: {
      label: "Planear una celebración",
      href: "/contact?service=celebraciones",
    } satisfies ContentLink,
    featuredMedia: createFeaturedMedia(
      babyShowerMain,
      "Decoración principal del baby shower con globos, flores y bloques de letras.",
    ),
    gallery: [],
  },
  {
    id: SERVICE_IDS.corporateEvents,
    slug: "eventos-corporativos",
    index: "04",
    title: "Eventos corporativos",
    description:
      "Producimos encuentros profesionales alineados con el objetivo, la identidad y la experiencia que tu marca quiere crear.",
    idealFor: "Lanzamientos, activaciones, cenas, networking y celebraciones corporativas.",
    cta: {
      label: "Crear un evento corporativo",
      href: "/contact?service=eventos-corporativos",
    } satisfies ContentLink,
    featuredMedia: createFeaturedMedia(
      fanFestMain,
      "Presentación musical frente a la afición reunida en Fan Fest Club.",
    ),
    gallery: [],
  },
  {
    id: SERVICE_IDS.venuePartnerships,
    slug: "alianzas-venues",
    index: "05",
    title: "Alianzas con venues",
    description:
      "Creamos experiencias junto a restaurantes, hoteles y espacios que quieren atraer público y activar su venue.",
    idealFor: "Venues que buscan desarrollar eventos propios o colaboraciones estratégicas.",
    cta: {
      label: "Proponer una alianza",
      href: "/contact?service=alianzas-venues",
    } satisfies ContentLink,
    featuredMedia: createFeaturedMedia(
      bailaDaZazaMain,
      "DJ compartiendo la cabina durante Baila da Zaza bajo una iluminación naranja.",
    ),
    gallery: [],
  },
  {
    id: SERVICE_IDS.setupLogistics,
    slug: "montaje-logistica",
    index: "06",
    title: "Montaje y logística",
    description:
      "Nos encargamos de la instalación, organización del espacio, movimiento de mobiliario y desmontaje del evento.",
    idealFor: "Planners, venues y clientes que necesitan apoyo operativo puntual.",
    cta: {
      label: "Solicitar soporte logístico",
      href: "/contact?service=montaje-logistica",
    } satisfies ContentLink,
    featuredMedia: createFeaturedMedia(
      cumpleanosAnaPaula48,
      "Arreglo de globos rosados y lilas para el cumpleaños de Ana Paula.",
    ),
    gallery: [],
  },
  {
    id: SERVICE_IDS.furnitureRental,
    slug: "alquiler-mobiliario",
    index: "07",
    title: "Alquiler de mobiliario",
    description:
      "Ofrecemos mobiliario, equipos e insumos para complementar tu evento de forma individual o dentro de una producción.",
    idealFor: "Eventos que necesitan recursos específicos sin contratar un servicio completo.",
    cta: {
      label: "Ver opciones de alquiler",
      href: "/contact?service=alquiler-mobiliario",
    } satisfies ContentLink,
    featuredMedia: createFeaturedMedia(
      weddingEb59673,
      "Mesa de dulces con detalles amarillos durante la recepción.",
    ),
    gallery: [],
  },
  {
    id: SERVICE_IDS.customPackages,
    slug: "paquetes-personalizados",
    index: "08",
    title: "Paquetes personalizados",
    description:
      "Combinamos producción, montaje, logística, ambientación y alquiler según las necesidades reales de tu evento.",
    idealFor: "Quienes buscan flexibilidad y pagar únicamente por lo que necesitan.",
    cta: {
      label: "Crear mi paquete",
      href: "/contact?service=paquetes-personalizados",
    } satisfies ContentLink,
    featuredMedia: createFeaturedMedia(
      nossaCopaMain,
      "Partida de billar durante Nossa Copa, rodeada de asistentes con camisetas de Brasil.",
    ),
    gallery: [],
  },
] as const satisfies readonly Service[];

assertUniqueValues(
  "Service",
  "IDs",
  services.map((service) => service.id),
);
assertUniqueValues(
  "Service",
  "slugs",
  services.map((service) => service.slug),
);

const declaredServiceIds = Object.values(SERVICE_IDS);
const serviceIds = new Set(services.map((service) => service.id));
const obsoleteServiceSlugs = new Set(["bodas-celebraciones-privadas"]);

if (
  services.length !== declaredServiceIds.length ||
  !declaredServiceIds.every((id) => serviceIds.has(id))
) {
  throw new Error("Service data must contain exactly one record for every SERVICE_IDS value.");
}

for (const service of services) {
  if (obsoleteServiceSlugs.has(service.slug)) {
    throw new Error(`Service ${service.id} uses obsolete slug ${service.slug}.`);
  }
}
