import { localeConfig, type Locale } from "../../../core/i18n/config/locales.ts";

const canadianLocale: Record<Locale, string> = {
  en: localeConfig.en.languageTag,
  es: "es-CA",
  fr: localeConfig.fr.languageTag,
};

export function formatMenuPrice(price: number, locale: Locale): string {
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Menu price must be a finite, non-negative number.");
  }

  return new Intl.NumberFormat(canadianLocale[locale], {
    style: "currency",
    currency: "CAD",
  }).format(price);
}
