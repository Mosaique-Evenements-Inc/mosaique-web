import type { MenuThemeConfig, MenuLogoAssetId } from "./theme.ts";
import type { MenuSocialLink } from "./social.ts";
import type { MenuDefinition } from "./content.ts";

export interface MenuProvider {
  id: string;
  slug: string;
  config: MenuThemeConfig;
  eventConfig?: MenuThemeConfig;
  relatedEvent?: MenuRelatedEvent;
  socialLinks?: readonly MenuSocialLink[];
  menu: MenuDefinition;
}

export interface MenuRelatedEvent {
  name: string;
  href: string;
  logoAssetId: MenuLogoAssetId;
}
