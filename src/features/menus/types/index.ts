export interface MenuThemeConfig {
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedTextColor: string;
  accentColor: string;
}

export interface MenuItemRecord {
  id: string;
  price: number;
}

export interface MenuSectionRecord {
  id: string;
  items: readonly MenuItemRecord[];
}

export interface MenuProvider {
  id: string;
  slug: string;
  config: MenuThemeConfig;
  eventConfig?: MenuThemeConfig;
  menu: {
    sections: readonly MenuSectionRecord[];
  };
}

export interface MenuItem extends MenuItemRecord {
  name: string;
  description?: string;
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

export interface MenuItemTranslation {
  name: string;
  description?: string;
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
