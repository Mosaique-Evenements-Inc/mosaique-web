import type { ContentLink } from "@/core/common/types/content";

export const faqContent = {
  eyebrow: "Preguntas",
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿MOSAÏQUE organiza eventos completos?",
      answer:
        "Sí. Podemos encargarnos de la organización y producción integral de bodas, cumpleaños, celebraciones privadas y eventos corporativos, incluyendo planificación, montaje, logística, mobiliario y coordinación general.",
    },
    {
      question: "¿Puedo contratar solo alquiler de mobiliario o insumos?",
      answer:
        "Sí. Nuestros servicios pueden contratarse de forma independiente. Puedes alquilar mobiliario, equipos o insumos específicos sin necesidad de contratar la producción completa del evento.",
    },
    {
      question: "¿Ofrecen montaje y desmontaje?",
      answer:
        "Sí. Ofrecemos servicios de montaje, desmontaje y soporte logístico para clientes, planners, venues o proveedores que necesitan apoyo operativo en un evento.",
    },
    {
      question: "¿Trabajan con restaurantes, salones o venues?",
      answer:
        "Sí. MOSAÏQUE desarrolla alianzas con venues, restaurantes y espacios que quieren crear eventos propios, aumentar tráfico, mejorar posicionamiento o generar nuevas fuentes de ingreso a través de experiencias.",
    },
    {
      question: "¿Pueden crear eventos propios con venta de entradas?",
      answer:
        "Sí. Además de producir eventos para clientes, MOSAÏQUE puede crear, promover y operar experiencias propias o en colaboración con aliados, incluyendo modelos de venta de entradas, patrocinios o acuerdos comerciales.",
    },
    {
      question: "¿Los paquetes son fijos?",
      answer:
        "No necesariamente. Podemos ofrecer paquetes base, pero cada propuesta puede adaptarse según el tipo de evento, número de invitados, espacio, presupuesto y servicios requeridos.",
    },
    {
      question: "¿Dónde trabajan?",
      answer:
        "MOSAÏQUE EVENTS trabaja principalmente en Montréal y sus alrededores, con posibilidad de evaluar eventos en otras zonas según el proyecto.",
    },
    {
      question: "¿Cómo puedo pedir una cotización?",
      answer:
        "Puedes contactarnos a través del formulario, indicando el tipo de evento, fecha tentativa, número de invitados, ubicación y servicios que necesitas. Con esa información podremos preparar una propuesta adaptada.",
    },
  ],
  contact: {
    prompt: "¿No encontraste tu respuesta?",
    cta: { label: "Hablemos", href: "/contact" } satisfies ContentLink,
  },
} as const;
