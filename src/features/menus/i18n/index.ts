import type { LocaleDictionaries } from "../../../core/i18n/translation/contracts.ts";
import type { MenuTranslation } from "../types/index.ts";

// Only approved provider copy belongs here. Test fixtures never enter this registry.
export const menuTranslations = {
  en: {
    "alfajores-fleur": {
      title: "Alfajores Fleur",
      sections: {
        food: {
          title: "Main dishes",
          items: {
            "tacos-de-lomo-saltado": {
              name: "Lomo saltado tacos",
              description:
                "Beef loin sautéed with onion, tomato and lomo sauce, served in tortillas.",
            },
            "empanadas-colombianas": {
              name: "Colombian empanadas",
              description: "Corn dough empanadas filled with meat and potato.",
            },
            "arroz-chaufa-de-pollo": {
              name: "Chicken chaufa rice",
              description:
                "Fried rice with soy sauce, chicken, egg, bell pepper and scallions.",
            },
          },
        },
        desserts: {
          title: "Desserts",
          items: {
            tiramisu: {
              name: "Tiramisu",
              description:
                "Italian dessert with layers of sponge cake and mascarpone cream, dusted with cocoa.",
              imageAlt: "Illustrative image of a slice of tiramisu with cocoa",
            },
            "tres-leches": {
              name: "Tres leches",
              description: "Moist sponge cake topped with whipped cream.",
              imageAlt: "Illustrative image of a slice of tres leches cake with whipped cream",
            },
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
          title: "Platos principales",
          items: {
            "tacos-de-lomo-saltado": {
              name: "Tacos de lomo saltado",
              description:
                "Lomo de res salteado con cebolla, tomate y salsa de lomo, servido en tortillas.",
            },
            "empanadas-colombianas": {
              name: "Empanadas colombianas",
              description: "Empanadas de masa de maíz, rellenas de carne y papa.",
            },
            "arroz-chaufa-de-pollo": {
              name: "Arroz chaufa de pollo",
              description:
                "Arroz frito con salsa de soya, pollo, huevo, pimentón y cebolla larga.",
            },
          },
        },
        desserts: {
          title: "Postres",
          items: {
            tiramisu: {
              name: "Tiramisú",
              description:
                "Postre italiano con capas de bizcocho y crema de mascarpone, cubierto de cacao.",
              imageAlt: "Imagen ilustrativa de una porción de tiramisú con cacao",
            },
            "tres-leches": {
              name: "Tres leches",
              description: "Bizcocho húmedo con cobertura de crema batida.",
              imageAlt:
                "Imagen ilustrativa de una porción de pastel tres leches con crema batida",
            },
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
          title: "Plats principaux",
          items: {
            "tacos-de-lomo-saltado": {
              name: "Tacos de lomo saltado",
              description:
                "Longe de bœuf sautée avec oignon, tomate et sauce lomo, servie dans des tortillas.",
            },
            "empanadas-colombianas": {
              name: "Empanadas colombiennes",
              description:
                "Empanadas à la pâte de maïs, farcies de viande et de pommes de terre.",
            },
            "arroz-chaufa-de-pollo": {
              name: "Riz chaufa au poulet",
              description:
                "Riz frit à la sauce soya avec poulet, œuf, poivron et oignons verts.",
            },
          },
        },
        desserts: {
          title: "Desserts",
          items: {
            tiramisu: {
              name: "Tiramisu",
              description:
                "Dessert italien composé de couches de biscuit et de crème au mascarpone, saupoudré de cacao.",
              imageAlt: "Image illustrative d’une portion de tiramisu au cacao",
            },
            "tres-leches": {
              name: "Tres leches",
              description: "Gâteau moelleux et humide garni de crème fouettée.",
              imageAlt:
                "Image illustrative d’une portion de gâteau tres leches à la crème fouettée",
            },
          },
        },
      },
    },
  },
} satisfies LocaleDictionaries<Record<string, MenuTranslation>>;
