export const MENU_LOGO_ASSET_IDS = ["aoa"] as const;

export type MenuLogoAssetId = (typeof MENU_LOGO_ASSET_IDS)[number];

export interface MenuThemeConfig {
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedTextColor: string;
  accentColor: string;
  secondaryColor?: string;
  logo?: MenuLogoConfig;
  typography?: MenuTypographyConfig;
}

export interface MenuLogoConfig {
  assetId: MenuLogoAssetId;
  alt: string;
}

export interface MenuTypographyConfig {
  displayFontFamily: string;
  bodyFontFamily: string;
}
