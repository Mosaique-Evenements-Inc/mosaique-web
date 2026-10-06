import { supportedLocales, type Locale } from "../../../core/i18n/config/locales.ts";
import type { MenuSocialLink } from "../types";

const platformLabels = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
} as const;

const languageNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

export function getMenuLanguageOptions(locale: Locale, hrefFor: (locale: Locale) => string) {
  return supportedLocales.map((targetLocale) => ({
    locale: targetLocale,
    href: hrefFor(targetLocale),
    current: targetLocale === locale,
    label: targetLocale.toUpperCase(),
    accessibleName: languageNames[targetLocale],
  }));
}

export function getMenuSocialItems(links?: readonly MenuSocialLink[]) {
  return (links ?? []).map((link) => ({
    platform: platformLabels[link.platform],
    displayHandle: `@${link.handle}`,
    url: link.url,
  }));
}
