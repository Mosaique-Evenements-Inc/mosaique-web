export type TranslationDictionary = Record<string, string>;
export type TranslationKey<TDictionary extends object> = keyof TDictionary & string;

export type LocaleDictionaries<TDictionary extends object> = {
  es: TDictionary;
  en: TDictionary;
  fr: TDictionary;
};
