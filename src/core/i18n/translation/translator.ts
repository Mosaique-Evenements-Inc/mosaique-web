import { defaultLocale, type Locale } from "../config/locales";
import type { LocaleDictionaries, TranslationKey } from "./contracts";

type Translator<TDictionary extends object> = (key: TranslationKey<TDictionary>) => string;

export function createTranslator<TDictionary extends object>(
  dictionaries: LocaleDictionaries<TDictionary>,
  locale: Locale,
): Translator<TDictionary> {
  const dictionary = dictionaries[locale] ?? dictionaries[defaultLocale];

  return (key) => {
    const value = dictionary?.[key] ?? dictionaries[defaultLocale]?.[key];
    if (typeof value === "string" && value) return value;

    if (import.meta.env?.DEV) {
      throw new Error(`Missing translation: ${String(key)} (${locale})`);
    }

    return "";
  };
}
