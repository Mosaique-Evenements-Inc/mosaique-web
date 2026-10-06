import type { MenuProvider } from "../types/index.ts";
import { menuTranslations } from "../i18n/index.ts";
import { validateMenuRegistry } from "../utils/validate.ts";

// No restaurant content has been approved for publication yet.
export const menuProviders: readonly MenuProvider[] = [];

validateMenuRegistry(menuProviders, menuTranslations);
