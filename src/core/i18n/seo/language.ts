import { getRelativeLocaleUrl } from "astro:i18n";

import { localeConfig, supportedLocales, type Locale } from "../config/locales";

export function getLanguageTag(locale: Locale): string {
  return localeConfig[locale].languageTag;
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === "es" ? "es_CA" : getLanguageTag(locale).replace("-", "_");
}

export function getLocaleAlternates(path: string) {
  return supportedLocales.map((locale) => ({
    href: getRelativeLocaleUrl(locale, path.replace(/^\/+/, "")),
    hreflang: getLanguageTag(locale),
  }));
}
