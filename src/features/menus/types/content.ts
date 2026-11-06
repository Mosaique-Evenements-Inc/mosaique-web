export interface MenuItemRecord {
  id: string;
  price: number;
  imageId?: MenuDishImageId;
}

export interface MenuSectionRecord {
  id: string;
  items: readonly MenuItemRecord[];
}

export interface MenuItem extends MenuItemRecord {
  name: string;
  description?: string;
  imageAlt?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MenuContent {
  title: string;
  description?: string;
  sections: MenuSection[];
}

export interface MenuDefinition {
  sections: readonly MenuSectionRecord[];
}

export const MENU_DISH_IMAGE_IDS = [
  "lomo-saltado-tacos",
  "colombian-empanadas",
  "chicken-chaufa-rice",
  "tiramisu",
  "tres-leches",
] as const;
export type MenuDishImageId = (typeof MENU_DISH_IMAGE_IDS)[number];
