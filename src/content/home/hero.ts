import type { ContentLink } from "../types";

export const heroContent = {
  brand: "MOSAÏQUE ÉVÉNEMENTS",
  title: "Creamos eventos que se viven, se recuerdan y se comparten",
  titleSegments: [
    { text: "Creamos eventos que se ", emphasis: false },
    { text: "viven", emphasis: true },
    { text: ", se\u00a0", emphasis: false },
    { text: "recuerdan", emphasis: true },
    { text: " y se ", emphasis: false },
    { text: "comparten", emphasis: true },
  ],
  actions: {
    primary: { label: "Planear mi evento", href: "/contact" } satisfies ContentLink,
  },
  overlay: "Every detail has its place.",
  media: {
    status: "pending",
    src: null as string | null,
    alt: "",
    position: "center",
  },
} as const;
