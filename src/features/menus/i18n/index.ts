import type { LocaleDictionaries } from "../../../core/i18n/translation/contracts.ts";
import type { MenuTranslation } from "../types/index.ts";

// Only approved provider copy belongs here. Test fixtures never enter this registry.
export const menuTranslations = {
  en: {
    "alfajores-fleur": {
      title: "Alfajores Fleur",
      sections: {
        food: {
          title: "Menu",
          items: {
            "tacos-de-lomo-saltado": { name: "Tacos de lomo saltado" },
            "causa-de-pollo": { name: "Causa de pollo" },
            "arroz-con-mariscos": { name: "Arroz con mariscos" },
            "ceviche-colombiano-de-camarones": {
              name: "Ceviche colombiano de camarones",
            },
            "empanadas-colombianas": { name: "Empanadas colombianas" },
          },
        },
        desserts: {
          title: "Desserts",
          items: {
            alfajores: { name: "Alfajores" },
            "tres-leches": { name: "Tres leches" },
          },
        },
      },
    },
  },
  es: {
    "alfajores-fleur": {
      title: "Alfajores Fleur",
      sections: {
        food: {
          title: "Menú",
          items: {
            "tacos-de-lomo-saltado": { name: "Tacos de lomo saltado" },
            "causa-de-pollo": { name: "Causa de pollo" },
            "arroz-con-mariscos": { name: "Arroz con mariscos" },
            "ceviche-colombiano-de-camarones": {
              name: "Ceviche colombiano de camarones",
            },
            "empanadas-colombianas": { name: "Empanadas colombianas" },
          },
        },
        desserts: {
          title: "Postres",
          items: {
            alfajores: { name: "Alfajores" },
            "tres-leches": { name: "Tres leches" },
          },
        },
      },
    },
  },
  fr: {
    "alfajores-fleur": {
      title: "Alfajores Fleur",
      sections: {
        food: {
          title: "Menu",
          items: {
            "tacos-de-lomo-saltado": { name: "Tacos de lomo saltado" },
            "causa-de-pollo": { name: "Causa de pollo" },
            "arroz-con-mariscos": { name: "Arroz con mariscos" },
            "ceviche-colombiano-de-camarones": {
              name: "Ceviche colombiano de camarones",
            },
            "empanadas-colombianas": { name: "Empanadas colombianas" },
          },
        },
        desserts: {
          title: "Desserts",
          items: {
            alfajores: { name: "Alfajores" },
            "tres-leches": { name: "Tres leches" },
          },
        },
      },
    },
  },
} satisfies LocaleDictionaries<Record<string, MenuTranslation>>;
