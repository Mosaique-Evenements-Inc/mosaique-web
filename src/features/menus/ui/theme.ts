import type { MenuThemeConfig } from "../types";

/** Project the already-resolved provider theme onto the Menu page only. */
export const projectMenuTheme = (theme: Readonly<MenuThemeConfig>) => ({
  "--menu-background": theme.backgroundColor,
  "--menu-surface": theme.surfaceColor,
  "--menu-text": theme.textColor,
  "--menu-muted-text": theme.mutedTextColor,
  "--menu-accent": theme.accentColor,
  ...(theme.secondaryColor !== undefined && { "--menu-secondary": theme.secondaryColor }),
  ...(theme.typography !== undefined && {
    "--menu-font-display": theme.typography.displayFontFamily,
    "--menu-font-body": theme.typography.bodyFontFamily,
  }),
});
