import type { LocaleDictionaries } from "@/core/i18n";
import type { ServiceId } from "../types";

export interface ServiceTranslation {
  title: string;
  description: string;
  idealFor: string;
  ctaLabel: string;
}

type ServiceTranslations = Record<ServiceId, ServiceTranslation>;

const es: ServiceTranslations = {
  "service-01": {
    title: "Organización y producción integral",
    description:
      "Diseñamos y coordinamos tu evento de principio a fin: concepto, logística, proveedores, montaje y ejecución.",
    idealFor: "Quienes buscan delegar la producción completa de su evento.",
    ctaLabel: "Cotizar producción integral",
  },
  "service-02": {
    title: "Celebraciones",
    description:
      "Creamos celebraciones memorables alrededor de cada ocasión, combinando concepto, ambientación, montaje y producción para transformar cada encuentro en una experiencia única.",
    idealFor:
      "Cumpleaños, baby showers, aniversarios, fiestas temáticas y otras celebraciones personales o sociales.",
    ctaLabel: "Planear una celebración",
  },
  "service-03": {
    title: "Eventos corporativos",
    description:
      "Producimos encuentros profesionales alineados con el objetivo, la identidad y la experiencia que tu marca quiere crear.",
    idealFor: "Lanzamientos, activaciones, cenas, networking y celebraciones corporativas.",
    ctaLabel: "Crear un evento corporativo",
  },
  "service-04": {
    title: "Alianzas con venues",
    description:
      "Creamos experiencias junto a restaurantes, hoteles y espacios que quieren atraer público y activar su venue.",
    idealFor: "Venues que buscan desarrollar eventos propios o colaboraciones estratégicas.",
    ctaLabel: "Proponer una alianza",
  },
  "service-05": {
    title: "Montaje y logística",
    description:
      "Nos encargamos de la instalación, organización del espacio, movimiento de mobiliario y desmontaje del evento.",
    idealFor: "Planners, venues y clientes que necesitan apoyo operativo puntual.",
    ctaLabel: "Solicitar soporte logístico",
  },
  "service-06": {
    title: "Alquiler de mobiliario",
    description:
      "Ofrecemos mobiliario, equipos e insumos para complementar tu evento de forma individual o dentro de una producción.",
    idealFor: "Eventos que necesitan recursos específicos sin contratar un servicio completo.",
    ctaLabel: "Ver opciones de alquiler",
  },
  "service-07": {
    title: "Paquetes personalizados",
    description:
      "Combinamos producción, montaje, logística, ambientación y alquiler según las necesidades reales de tu evento.",
    idealFor: "Quienes buscan flexibilidad y pagar únicamente por lo que necesitan.",
    ctaLabel: "Crear mi paquete",
  },
  "service-08": {
    title: "Bodas",
    description:
      "Diseñamos y producimos bodas que reflejan la historia, el estilo y la personalidad de cada pareja, cuidando cada detalle desde la planificación hasta el último momento de la celebración.",
    idealFor:
      "Parejas que buscan una boda personalizada, cuidadosamente producida y pensada como una experiencia completa.",
    ctaLabel: "Planear nuestra boda",
  },
};

const en: ServiceTranslations = {
  "service-01": {
    title: "Full-service event production",
    description:
      "We design and coordinate your event from first idea to final execution: concept, logistics, suppliers, setup, and delivery.",
    idealFor: "For those who want to entrust the full production of their event.",
    ctaLabel: "Request full production",
  },
  "service-02": {
    title: "Celebrations",
    description:
      "We create memorable celebrations for every occasion, combining concept, atmosphere, setup, and production to make each gathering feel unique.",
    idealFor:
      "Birthdays, baby showers, anniversaries, themed parties, and personal or social celebrations.",
    ctaLabel: "Plan a celebration",
  },
  "service-03": {
    title: "Corporate events",
    description:
      "We produce professional gatherings aligned with the objective, identity, and experience your brand wants to create.",
    idealFor: "Launches, activations, dinners, networking events, and corporate celebrations.",
    ctaLabel: "Create a corporate event",
  },
  "service-04": {
    title: "Venue partnerships",
    description:
      "We create experiences with restaurants, hotels, and spaces looking to attract audiences and activate their venue.",
    idealFor: "Venues seeking to develop their own events or strategic collaborations.",
    ctaLabel: "Propose a partnership",
  },
  "service-05": {
    title: "Setup and logistics",
    description:
      "We handle installation, space organization, furniture movement, and event teardown.",
    idealFor: "Planners, venues, and clients who need focused operational support.",
    ctaLabel: "Request logistics support",
  },
  "service-06": {
    title: "Furniture rental",
    description:
      "We provide furniture, equipment, and supplies to complement your event on their own or as part of a production.",
    idealFor: "Events that need specific resources without booking full production.",
    ctaLabel: "View rental options",
  },
  "service-07": {
    title: "Custom packages",
    description:
      "We combine production, setup, logistics, atmosphere, and rental around the real needs of your event.",
    idealFor: "Those who want flexibility and to pay only for what they need.",
    ctaLabel: "Create my package",
  },
  "service-08": {
    title: "Weddings",
    description:
      "We design and produce weddings that reflect each couple's story, style, and personality, caring for every detail from planning through the final moment.",
    idealFor:
      "Couples seeking a personal, carefully produced wedding conceived as a complete experience.",
    ctaLabel: "Plan our wedding",
  },
};

const fr: ServiceTranslations = {
  "service-01": {
    title: "Organisation et production événementielle",
    description:
      "Nous concevons et coordonnons votre événement du début à la fin : concept, logistique, fournisseurs, montage et réalisation.",
    idealFor:
      "Pour celles et ceux qui souhaitent confier la production complète de leur événement.",
    ctaLabel: "Demander une production complète",
  },
  "service-02": {
    title: "Célébrations",
    description:
      "Nous créons des célébrations mémorables pour chaque occasion, en réunissant concept, ambiance, montage et production pour rendre chaque rencontre unique.",
    idealFor:
      "Anniversaires, fêtes prénatales, anniversaires de mariage, fêtes thématiques et célébrations personnelles ou sociales.",
    ctaLabel: "Planifier une célébration",
  },
  "service-03": {
    title: "Événements corporatifs",
    description:
      "Nous produisons des rencontres professionnelles alignées sur l’objectif, l’identité et l’expérience que votre marque souhaite créer.",
    idealFor: "Lancements, activations, soupers, réseautage et célébrations corporatives.",
    ctaLabel: "Créer un événement corporatif",
  },
  "service-04": {
    title: "Partenariats avec des lieux",
    description:
      "Nous créons des expériences avec des restaurants, des hôtels et des espaces qui souhaitent attirer leur public et dynamiser leur lieu.",
    idealFor:
      "Lieux qui souhaitent développer leurs propres événements ou des collaborations stratégiques.",
    ctaLabel: "Proposer un partenariat",
  },
  "service-05": {
    title: "Montage et logistique",
    description:
      "Nous prenons en charge l’installation, l’organisation de l’espace, le déplacement du mobilier et le démontage de l’événement.",
    idealFor:
      "Planificateurs, lieux et clients qui ont besoin d’un soutien opérationnel ciblé.",
    ctaLabel: "Demander un soutien logistique",
  },
  "service-06": {
    title: "Location de mobilier",
    description:
      "Nous offrons du mobilier, de l’équipement et des fournitures pour compléter votre événement, séparément ou dans le cadre d’une production.",
    idealFor:
      "Événements qui ont besoin de ressources précises sans réserver une production complète.",
    ctaLabel: "Voir les options de location",
  },
  "service-07": {
    title: "Forfaits personnalisés",
    description:
      "Nous combinons production, montage, logistique, ambiance et location selon les besoins réels de votre événement.",
    idealFor:
      "Pour celles et ceux qui recherchent de la flexibilité et souhaitent payer seulement ce dont ils ont besoin.",
    ctaLabel: "Créer mon forfait",
  },
  "service-08": {
    title: "Mariages",
    description:
      "Nous concevons et produisons des mariages qui reflètent l’histoire, le style et la personnalité de chaque couple, avec soin jusque dans le dernier moment.",
    idealFor:
      "Couples à la recherche d’un mariage personnalisé, soigneusement produit et pensé comme une expérience complète.",
    ctaLabel: "Planifier notre mariage",
  },
};

export const serviceTranslations = {
  es,
  en,
  fr,
} satisfies LocaleDictionaries<ServiceTranslations>;

export const getServiceTranslation = (
  id: ServiceId,
  locale: keyof typeof serviceTranslations,
) => serviceTranslations[locale][id];
