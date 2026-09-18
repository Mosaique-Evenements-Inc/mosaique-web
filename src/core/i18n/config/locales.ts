export const localeConfig = {
  en: {
    path: "",
    languageTag: "en-CA",
  },
  es: {
    path: "es",
    languageTag: "es",
  },
  fr: {
    path: "fr",
    languageTag: "fr-CA",
  },
} as const;

export const defaultLocale = "en" as const;
export const supportedLocales = ["en", "es", "fr"] as const;

export type Locale = (typeof supportedLocales)[number];
export type LanguageTag = (typeof localeConfig)[Locale]["languageTag"];

export const prefixedLocales = supportedLocales.filter(
  (locale): locale is Exclude<Locale, typeof defaultLocale> => locale !== defaultLocale,
);
