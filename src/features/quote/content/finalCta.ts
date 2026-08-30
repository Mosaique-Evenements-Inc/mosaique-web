import type { ContentLink } from "@/core/common/types/content";

export const finalCtaContent = {
  title: "Construyamos una experiencia memorable",
  text: "Cada gran evento comienza con una idea. Cuéntanos la tuya.",
  action: { label: "Cotizar evento", href: "/contact" } satisfies ContentLink,
} as const;
