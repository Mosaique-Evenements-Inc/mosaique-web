import type { MenuProvider } from "../types/index.ts";
import { menuTranslations } from "../i18n/index.ts";
import { validateMenuRegistry } from "../utils/validate.ts";

export const menuProviders: readonly MenuProvider[] = [
  {
    id: "alfajores-fleur",
    slug: "alfajores-fleur",
    // Provisional neutral colors; the provider has not supplied an approved brand palette.
    config: {
      backgroundColor: "#f6f1e8",
      surfaceColor: "#ffffff",
      textColor: "#000000",
      mutedTextColor: "#444444",
      accentColor: "#000000",
    },
    eventConfig: {
      backgroundColor: "#F3E5D2",
      surfaceColor: "#FDE39F",
      textColor: "#211B19",
      mutedTextColor: "#7D0C0C",
      accentColor: "#C6963E",
      secondaryColor: "#D88F98",
      logo: { assetId: "aoa", alt: "AOA" },
      // Reuse Web display tokens; the Menu page self-hosts the variable body font.
      typography: {
        displayFontFamily: "var(--font-family-display)",
        bodyFontFamily: '"Quicksand Variable", var(--font-family-body)',
      },
    },
    socialLinks: [
      {
        platform: "instagram",
        handle: "alfajoresfleur",
        url: "https://www.instagram.com/alfajoresfleur/",
      },
    ],
    menu: {
      sections: [
        {
          id: "food",
          items: [
            { id: "tacos-de-lomo-saltado", price: 20 },
            { id: "causa-de-pollo", price: 18 },
            { id: "arroz-con-mariscos", price: 25 },
            { id: "ceviche-colombiano-de-camarones", price: 25 },
            { id: "empanadas-colombianas", price: 16 },
          ],
        },
        {
          id: "desserts",
          items: [
            { id: "alfajores", price: 4.5 },
            { id: "tres-leches", price: 8 },
          ],
        },
      ],
    },
  },
];

validateMenuRegistry(menuProviders, menuTranslations);
