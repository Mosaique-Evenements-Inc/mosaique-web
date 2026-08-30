export {
  defaultLocale,
  localeConfig,
  supportedLocales,
  type LanguageTag,
  type Locale,
} from "./config/locales";
export {
  getContentPathFromUrl,
  getLocalizedHref,
  getLocalizedPath,
  getLocaleFromUrl,
  switchLocalePath,
  switchLocaleUrl,
} from "./routing/paths";
export type {
  LocaleDictionaries,
  TranslationDictionary,
  TranslationKey,
} from "./translation/contracts";
export { createTranslator } from "./translation/translator";
export { getLanguageTag, getLocaleAlternates, getOpenGraphLocale } from "./seo/language";
