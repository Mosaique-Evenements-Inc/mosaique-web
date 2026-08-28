import type { ContentLink } from "../types";

export const heroContent = {
  brand: "MOSAÏQUE ÉVÉNEMENTS",
  title: "Creamos eventos que se viven, se recuerdan y se comparten",
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
