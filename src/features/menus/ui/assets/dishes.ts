import type { ImageMetadata } from "astro";
import tacos from "@/assets/images/menus/alfajores-fleur/tacos-de-lomo-saltado.jpeg";
import empanadas from "@/assets/images/menus/alfajores-fleur/empanadas-colombianas.jpeg";
import rice from "@/assets/images/menus/alfajores-fleur/arroz-chaufa-de-pollo.jpeg";
import tiramisu from "@/assets/images/menus/alfajores-fleur/tiramisu-illustration.webp";
import tresLeches from "@/assets/images/menus/alfajores-fleur/tres-leches-illustration.webp";
import type { MenuDishImageId } from "../../types";

export const menuDishImages = {
  "lomo-saltado-tacos": tacos,
  "colombian-empanadas": empanadas,
  "chicken-chaufa-rice": rice,
  tiramisu,
  "tres-leches": tresLeches,
} satisfies Record<MenuDishImageId, ImageMetadata>;
