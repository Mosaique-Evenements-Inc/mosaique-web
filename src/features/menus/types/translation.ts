export interface MenuItemTranslation {
  name: string;
  description?: string;
  imageAlt?: string;
}

export interface MenuSectionTranslation {
  title: string;
  items: Record<string, MenuItemTranslation>;
}

export interface MenuTranslation {
  title: string;
  description?: string;
  sections: Record<string, MenuSectionTranslation>;
}
