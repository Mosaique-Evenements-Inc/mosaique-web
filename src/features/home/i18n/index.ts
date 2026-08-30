import type { Locale, LocaleDictionaries } from "@/core/i18n";

export interface HomeTranslations {
  metadataTitle: string;
  metadataDescription: string;
  heroOverlay: string;
  planEvent: string;
  servicesAndExperiences: string;
  idealFor: string;
  service: string;
  viewMore: string;
  quoteEvent: string;
  completedEvents: string;
  previousEvent: string;
  nextEvent: string;
  previous: string;
  next: string;
  carousel: string;
  slide: string;
  eventStatus: string;
  pendingMedia: string;
  testimonialsStatus: string;
  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaAction: string;
  of: string;
}

export const homeTranslations = {
  es: {
    metadataTitle: "MOSAÏQUE EVENTS — Eventos en Montréal",
    metadataDescription:
      "Empresa integral de eventos en Montréal especializada en organización, producción, montaje y experiencias.",
    heroOverlay: "Every detail has its place.",
    planEvent: "Planear mi evento",
    servicesAndExperiences: "Servicios y experiencias Mosaïque",
    idealFor: "Ideal para:",
    service: "Servicio",
    viewMore: "Ver más",
    quoteEvent: "Cotizar",
    completedEvents: "Eventos realizados por Mosaïque",
    previousEvent: "Evento anterior",
    nextEvent: "Evento siguiente",
    previous: "Anterior",
    next: "Siguiente",
    carousel: "carrusel",
    slide: "diapositiva",
    eventStatus: "Evento",
    pendingMedia: "Media pendiente",
    testimonialsStatus: "placeholder",
    finalCtaTitle: "Construyamos una experiencia memorable",
    finalCtaText: "Cada gran evento comienza con una idea. Cuéntanos la tuya.",
    finalCtaAction: "Cotizar evento",
    of: "de",
  },
  en: {
    metadataTitle: "MOSAÏQUE EVENTS — Events in Montréal",
    metadataDescription:
      "Full-service event company in Montréal specializing in planning, production, setup, and experiences.",
    heroOverlay: "Every detail has its place.",
    planEvent: "Plan my event",
    servicesAndExperiences: "Mosaïque services and experiences",
    idealFor: "Ideal for:",
    service: "Service",
    viewMore: "View more",
    quoteEvent: "Request a quote",
    completedEvents: "Events produced by Mosaïque",
    previousEvent: "Previous event",
    nextEvent: "Next event",
    previous: "Previous",
    next: "Next",
    carousel: "carousel",
    slide: "slide",
    eventStatus: "Event",
    pendingMedia: "Media pending",
    testimonialsStatus: "placeholder",
    finalCtaTitle: "Let’s build a memorable experience",
    finalCtaText: "Every great event begins with an idea. Tell us yours.",
    finalCtaAction: "Request a quote",
    of: "of",
  },
  fr: {
    metadataTitle: "MOSAÏQUE EVENTS — Événements à Montréal",
    metadataDescription:
      "Entreprise événementielle intégrée à Montréal spécialisée en organisation, production, montage et expériences.",
    heroOverlay: "Chaque détail a sa place.",
    planEvent: "Planifier mon événement",
    servicesAndExperiences: "Services et expériences Mosaïque",
    idealFor: "Idéal pour :",
    service: "Service",
    viewMore: "Voir plus",
    quoteEvent: "Demander un devis",
    completedEvents: "Événements réalisés par Mosaïque",
    previousEvent: "Événement précédent",
    nextEvent: "Événement suivant",
    previous: "Précédent",
    next: "Suivant",
    carousel: "carrousel",
    slide: "diapositive",
    eventStatus: "Événement",
    pendingMedia: "Média à venir",
    testimonialsStatus: "placeholder",
    finalCtaTitle: "Construisons une expérience mémorable",
    finalCtaText: "Chaque grand événement commence par une idée. Parlez-nous de la vôtre.",
    finalCtaAction: "Demander un devis",
    of: "sur",
  },
} satisfies LocaleDictionaries<HomeTranslations>;

export const getHomeTranslations = (locale: Locale = "es") => homeTranslations[locale];

export interface HomeContentTranslations {
  heroTitle: string;
  heroSegments: readonly { text: string; emphasis: boolean }[];
  marqueeOptions: readonly string[];
  process: {
    title: string;
    introduction: string;
    steps: readonly { index: string; title: string; description: string }[];
    closingStatement: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: readonly { question: string; answer: string }[];
    prompt: string;
    ctaLabel: string;
  };
  testimonials: {
    title: string;
    items: readonly { name: string; quote: string }[];
    note: string;
  };
  servicesPanel: { title: string; text: string; ctaLabel: string };
  projects: { title: string; introduction: string; ctaLabel: string };
}

const processEs = [
  [
    "Escuchamos",
    "Conocemos tu idea, el tipo de evento, el número de invitados, el espacio, el estilo deseado, el presupuesto aproximado y el nivel de acompañamiento que necesitas.",
  ],
  [
    "Diseñamos la propuesta",
    "Creamos una propuesta adaptada al evento: concepto, servicios, mobiliario, logística, tiempos, necesidades técnicas y posibles paquetes.",
  ],
  [
    "Coordinamos",
    "Organizamos los recursos necesarios, validamos detalles, alineamos expectativas y coordinamos con clientes, venues, aliados o proveedores involucrados.",
  ],
  [
    "Producimos",
    "Ejecutamos el montaje, la ambientación, la logística y los elementos definidos para que el evento avance de manera clara y ordenada.",
  ],
  [
    "Cerramos",
    "Realizamos desmontaje, revisión final y cierre operativo, cuidando que la experiencia termine con la misma atención con la que empezó.",
  ],
] as const;
const processEn = [
  [
    "We listen",
    "We learn about your idea, event type, guest count, space, desired style, approximate budget, and the level of support you need.",
  ],
  [
    "We design the proposal",
    "We create a proposal tailored to the event: concept, services, furniture, logistics, timing, technical needs, and possible packages.",
  ],
  [
    "We coordinate",
    "We organize the necessary resources, validate details, align expectations, and coordinate with clients, venues, partners, and suppliers.",
  ],
  [
    "We produce",
    "We execute the setup, atmosphere, logistics, and defined elements so the event moves forward clearly and smoothly.",
  ],
  [
    "We close",
    "We handle teardown, final review, and operational closeout, giving the experience the same attention with which it began.",
  ],
] as const;
const processFr = [
  [
    "Nous écoutons",
    "Nous découvrons votre idée, le type d’événement, le nombre d’invités, le lieu, le style souhaité, le budget approximatif et le niveau d’accompagnement nécessaire.",
  ],
  [
    "Nous concevons la proposition",
    "Nous créons une proposition adaptée à l’événement : concept, services, mobilier, logistique, échéancier, besoins techniques et forfaits possibles.",
  ],
  [
    "Nous coordonnons",
    "Nous organisons les ressources nécessaires, validons les détails, alignons les attentes et coordonnons clients, lieux, partenaires et fournisseurs.",
  ],
  [
    "Nous produisons",
    "Nous exécutons le montage, l’ambiance, la logistique et les éléments définis pour que l’événement se déroule avec clarté et fluidité.",
  ],
  [
    "Nous finalisons",
    "Nous assurons le démontage, la révision finale et la fermeture opérationnelle avec la même attention qu’au début.",
  ],
] as const;
const makeProcess = (
  title: string,
  introduction: string,
  steps: readonly (readonly [string, string])[],
  closingStatement: string,
) => ({
  title,
  introduction,
  steps: steps.map(([stepTitle, description], index) => ({
    index: String(index + 1).padStart(2, "0"),
    title: stepTitle,
    description,
  })),
  closingStatement,
});

const faqEs = [
  [
    "¿MOSAÏQUE organiza eventos completos?",
    "Sí. Podemos encargarnos de la organización y producción integral de bodas, cumpleaños, celebraciones privadas y eventos corporativos, incluyendo planificación, montaje, logística, mobiliario y coordinación general.",
  ],
  [
    "¿Puedo contratar solo alquiler de mobiliario o insumos?",
    "Sí. Nuestros servicios pueden contratarse de forma independiente. Puedes alquilar mobiliario, equipos o insumos específicos sin necesidad de contratar la producción completa del evento.",
  ],
  [
    "¿Ofrecen montaje y desmontaje?",
    "Sí. Ofrecemos servicios de montaje, desmontaje y soporte logístico para clientes, planners, venues o proveedores que necesitan apoyo operativo en un evento.",
  ],
  [
    "¿Trabajan con restaurantes, salones o venues?",
    "Sí. MOSAÏQUE desarrolla alianzas con venues, restaurantes y espacios que quieren crear eventos propios, aumentar tráfico, mejorar posicionamiento o generar nuevas fuentes de ingreso a través de experiencias.",
  ],
  [
    "¿Pueden crear eventos propios con venta de entradas?",
    "Sí. Además de producir eventos para clientes, MOSAÏQUE puede crear, promover y operar experiencias propias o en colaboración con aliados, incluyendo modelos de venta de entradas, patrocinios o acuerdos comerciales.",
  ],
  [
    "¿Los paquetes son fijos?",
    "No necesariamente. Podemos ofrecer paquetes base, pero cada propuesta puede adaptarse según el tipo de evento, número de invitados, espacio, presupuesto y servicios requeridos.",
  ],
  [
    "¿Dónde trabajan?",
    "MOSAÏQUE EVENTS trabaja principalmente en Montréal y sus alrededores, con posibilidad de evaluar eventos en otras zonas según el proyecto.",
  ],
  [
    "¿Cómo puedo pedir una cotización?",
    "Puedes contactarnos a través del formulario, indicando el tipo de evento, fecha tentativa, número de invitados, ubicación y servicios que necesitas. Con esa información podremos preparar una propuesta adaptada.",
  ],
] as const;
const faqEn = [
  [
    "Does MOSAÏQUE produce complete events?",
    "Yes. We can manage full planning and production for weddings, birthdays, private celebrations, and corporate events, including planning, setup, logistics, furniture, and overall coordination.",
  ],
  [
    "Can I hire only furniture rental or supplies?",
    "Yes. Services can be booked independently. You can rent specific furniture, equipment, or supplies without booking full event production.",
  ],
  [
    "Do you offer setup and teardown?",
    "Yes. We provide setup, teardown, and logistics support for clients, planners, venues, and suppliers who need operational help at an event.",
  ],
  [
    "Do you work with restaurants, halls, or venues?",
    "Yes. MOSAÏQUE builds partnerships with venues, restaurants, and spaces that want to create events, increase traffic, strengthen positioning, or develop new revenue through experiences.",
  ],
  [
    "Can you create ticketed events?",
    "Yes. Alongside producing client events, MOSAÏQUE can create, promote, and operate its own experiences or collaborations, including ticketing, sponsorship, and commercial models.",
  ],
  [
    "Are packages fixed?",
    "Not necessarily. We can offer base packages, but each proposal can adapt to the event type, guest count, space, budget, and services required.",
  ],
  [
    "Where do you work?",
    "MOSAÏQUE EVENTS primarily works in Montréal and surrounding areas, with other locations considered according to the project.",
  ],
  [
    "How can I request a quote?",
    "Contact us through the form with your event type, tentative date, guest count, location, and required services. We can then prepare a tailored proposal.",
  ],
] as const;
const faqFr = [
  [
    "MOSAÏQUE organise-t-elle des événements complets?",
    "Oui. Nous pouvons prendre en charge l’organisation et la production de mariages, anniversaires, célébrations privées et événements corporatifs, incluant planification, montage, logistique, mobilier et coordination.",
  ],
  [
    "Puis-je louer seulement du mobilier ou des fournitures?",
    "Oui. Nos services peuvent être retenus séparément. Vous pouvez louer du mobilier, de l’équipement ou des fournitures sans production complète.",
  ],
  [
    "Offrez-vous le montage et le démontage?",
    "Oui. Nous offrons le montage, le démontage et le soutien logistique aux clients, planificateurs, lieux et fournisseurs.",
  ],
  [
    "Travaillez-vous avec des restaurants, salles ou lieux?",
    "Oui. MOSAÏQUE développe des partenariats avec des lieux, restaurants et espaces qui souhaitent créer des événements et développer de nouvelles expériences.",
  ],
  [
    "Pouvez-vous créer des événements avec billetterie?",
    "Oui. En plus de produire des événements clients, MOSAÏQUE peut créer, promouvoir et opérer ses propres expériences ou collaborations avec billetterie, commandites ou ententes commerciales.",
  ],
  [
    "Les forfaits sont-ils fixes?",
    "Pas nécessairement. Nous pouvons offrir des forfaits de base, puis adapter chaque proposition au type d’événement, au nombre d’invités, au lieu, au budget et aux services requis.",
  ],
  [
    "Où travaillez-vous?",
    "MOSAÏQUE EVENTS travaille principalement à Montréal et dans les environs; d’autres régions peuvent être évaluées selon le projet.",
  ],
  [
    "Comment demander un devis?",
    "Contactez-nous par le formulaire en indiquant le type d’événement, la date prévue, le nombre d’invités, le lieu et les services souhaités. Nous préparerons une proposition adaptée.",
  ],
] as const;
const makeFaq = (
  items: readonly (readonly [string, string])[],
  eyebrow: string,
  title: string,
  prompt: string,
  ctaLabel: string,
) => ({
  eyebrow,
  title,
  items: items.map(([question, answer]) => ({ question, answer })),
  prompt,
  ctaLabel,
});

export const homeContentTranslations = {
  es: {
    heroTitle: "Creamos eventos que se viven, se recuerdan y se comparten",
    heroSegments: [
      { text: "Creamos eventos que se ", emphasis: false },
      { text: "viven", emphasis: true },
      { text: ", se\u00a0", emphasis: false },
      { text: "recuerdan", emphasis: true },
      { text: " y se ", emphasis: false },
      { text: "comparten", emphasis: true },
    ],
    marqueeOptions: [
      "WEDDINGS · PRIVATE EVENTS · CORPORATE CELEBRATIONS · VENUE EXPERIENCES · EVENT PRODUCTION · FURNITURE RENTAL · LOGISTICS · MONTRÉAL",
      "CREATE · PRODUCE · CELEBRATE · CONNECT · TRANSFORM · GATHER · REMEMBER",
      "EVENTOS QUE CONECTAN · EXPERIENCIAS QUE PERMANECEN · ESPACIOS QUE COBRAN VIDA",
    ],
    process: makeProcess(
      "Nuestro proceso",
      "Un evento memorable necesita más que una buena idea. Necesita estructura, tiempos, coordinación y una visión clara desde el inicio.",
      processEs,
      "Cada paso existe para que el evento se sienta fluido, cuidado y memorable.",
    ),
    faq: makeFaq(
      faqEs,
      "Preguntas",
      "Preguntas frecuentes",
      "¿No encontraste tu respuesta?",
      "Hablemos",
    ),
    testimonials: {
      title: "Lo que buscamos generar en cada experiencia",
      items: [
        {
          name: "Valentina R.",
          quote: "Un evento elegante, organizado y visualmente impecable.",
        },
        {
          name: "Camila M.",
          quote: "Una experiencia que se sintió cuidada desde el primer detalle.",
        },
        { name: "Daniela P.", quote: "Más que una celebración, fue un momento memorable." },
        {
          name: "Andrés T.",
          quote: "Logística clara, estética premium y una ejecución confiable.",
        },
        { name: "Sofía L.", quote: "El espacio se transformó por completo." },
      ],
      note: "Cuando tengas clientes reales, estos textos deben reemplazarse por testimonios auténticos.",
    },
    servicesPanel: {
      title: "Servicios para cada ocasión",
      text: "Cada evento tiene una escala, un propósito y una dinámica distinta. Por eso nuestros servicios pueden contratarse de forma independiente o combinarse en paquetes personalizados según las necesidades del cliente, el espacio y el tipo de experiencia.",
      ctaLabel: "Explorar servicios",
    },
    projects: {
      title: "Eventos que ya tomaron forma",
      introduction:
        "Una selección de celebraciones, producciones y experiencias que hemos llevado de la idea a la realidad.",
      ctaLabel: "Explorar eventos",
    },
  },
  en: {
    heroTitle: "We create events that are lived, remembered, and shared",
    heroSegments: [
      { text: "We create events that are ", emphasis: false },
      { text: "lived", emphasis: true },
      { text: ", ", emphasis: false },
      { text: "remembered", emphasis: true },
      { text: ", and ", emphasis: false },
      { text: "shared", emphasis: true },
    ],
    marqueeOptions: [
      "WEDDINGS · PRIVATE EVENTS · CORPORATE CELEBRATIONS · VENUE EXPERIENCES · EVENT PRODUCTION · FURNITURE RENTAL · LOGISTICS · MONTRÉAL",
      "CREATE · PRODUCE · CELEBRATE · CONNECT · TRANSFORM · GATHER · REMEMBER",
      "EVENTS THAT CONNECT · EXPERIENCES THAT LAST · SPACES THAT COME ALIVE",
    ],
    process: makeProcess(
      "Our process",
      "A memorable event needs more than a good idea. It needs structure, timing, coordination, and a clear vision from the start.",
      processEn,
      "Every step exists to make the event feel fluid, considered, and memorable.",
    ),
    faq: makeFaq(
      faqEn,
      "Questions",
      "Frequently asked questions",
      "Didn’t find your answer?",
      "Let’s talk",
    ),
    testimonials: {
      title: "What we aim to create in every experience",
      items: [
        {
          name: "Valentina R.",
          quote: "An elegant, organized, and visually impeccable event.",
        },
        {
          name: "Camila M.",
          quote: "An experience that felt considered from the very first detail.",
        },
        { name: "Daniela P.", quote: "More than a celebration, it was a memorable moment." },
        {
          name: "Andrés T.",
          quote: "Clear logistics, premium aesthetics, and reliable execution.",
        },
        { name: "Sofía L.", quote: "The space was completely transformed." },
      ],
      note: "When real clients are available, replace these texts with authentic testimonials.",
    },
    servicesPanel: {
      title: "Services for every occasion",
      text: "Every event has its own scale, purpose, and rhythm. Our services can be booked independently or combined into tailored packages for the client, space, and experience.",
      ctaLabel: "Explore services",
    },
    projects: {
      title: "Events brought to life",
      introduction:
        "A selection of celebrations, productions, and experiences brought from idea to reality.",
      ctaLabel: "Explore events",
    },
  },
  fr: {
    heroTitle: "Nous créons des événements qui se vivent, se mémorisent et se partagent",
    heroSegments: [
      { text: "Nous créons des événements qui se ", emphasis: false },
      { text: "vivent", emphasis: true },
      { text: ", se ", emphasis: false },
      { text: "mémorisent", emphasis: true },
      { text: " et se ", emphasis: false },
      { text: "partagent", emphasis: true },
    ],
    marqueeOptions: [
      "MARIAGES · ÉVÉNEMENTS PRIVÉS · CÉLÉBRATIONS CORPORATIVES · EXPÉRIENCES DE LIEUX · PRODUCTION · LOCATION DE MOBILIER · LOGISTIQUE · MONTRÉAL",
      "CRÉER · PRODUIRE · CÉLÉBRER · CONNECTER · TRANSFORMER · RASSEMBLER · SE SOUVENIR",
      "DES ÉVÉNEMENTS QUI RASSEMBLENT · DES EXPÉRIENCES QUI RESTENT · DES ESPACES QUI PRENNENT VIE",
    ],
    process: makeProcess(
      "Notre processus",
      "Un événement mémorable demande plus qu’une bonne idée. Il demande une structure, un échéancier, de la coordination et une vision claire dès le départ.",
      processFr,
      "Chaque étape rend l’événement fluide, soigné et mémorable.",
    ),
    faq: makeFaq(
      faqFr,
      "Questions",
      "Questions fréquentes",
      "Vous n’avez pas trouvé votre réponse?",
      "Parlons-en",
    ),
    testimonials: {
      title: "Ce que nous cherchons à créer dans chaque expérience",
      items: [
        {
          name: "Valentina R.",
          quote: "Un événement élégant, organisé et visuellement impeccable.",
        },
        { name: "Camila M.", quote: "Une expérience soignée dès le premier détail." },
        { name: "Daniela P.", quote: "Plus qu’une célébration, un moment mémorable." },
        {
          name: "Andrés T.",
          quote: "Une logistique claire, une esthétique haut de gamme et une exécution fiable.",
        },
        { name: "Sofía L.", quote: "L’espace a été complètement transformé." },
      ],
      note: "Lorsque de vrais clients seront disponibles, remplacez ces textes par des témoignages authentiques.",
    },
    servicesPanel: {
      title: "Des services pour chaque occasion",
      text: "Chaque événement a sa propre échelle, son objectif et son rythme. Nos services peuvent être retenus séparément ou combinés en forfaits adaptés au client, au lieu et à l’expérience.",
      ctaLabel: "Explorer les services",
    },
    projects: {
      title: "Des événements qui prennent vie",
      introduction:
        "Une sélection de célébrations, productions et expériences que nous avons menées de l’idée à la réalité.",
      ctaLabel: "Explorer les événements",
    },
  },
} satisfies LocaleDictionaries<HomeContentTranslations>;

export const getHomeContentTranslations = (locale: Locale = "es") =>
  homeContentTranslations[locale];
