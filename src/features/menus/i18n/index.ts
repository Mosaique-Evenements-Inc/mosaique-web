import type { LocaleDictionaries } from "../../../core/i18n/translation/contracts.ts";
import type { MenuTranslation } from "../types/index.ts";

// Only approved provider copy belongs here. Test fixtures never enter this registry.
export const menuTranslations = {
  en: {},
  es: {},
  fr: {},
} satisfies LocaleDictionaries<Record<string, MenuTranslation>>;
