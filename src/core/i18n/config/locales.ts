export const localeConfig = {
  es: {
    path: "",
    languageTag: "es",
  },
  en: {
    path: "en",
    languageTag: "en-CA",
  },
  fr: {
    path: "fr",
    languageTag: "fr-CA",
  },
} as const;

export const defaultLocale = "es" as const;
export const supportedLocales = ["es", "en", "fr"] as const;

export type Locale = (typeof supportedLocales)[number];
export type LanguageTag = (typeof localeConfig)[Locale]["languageTag"];
