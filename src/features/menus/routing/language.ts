import { getLocalizedPath, type Locale } from "@/core/i18n";
import type { MenuProvider } from "../types";
import { composeMenuLanguageHref } from "./paths";

export const getMenuLanguageHref = (
  provider: Pick<MenuProvider, "slug">,
  targetLocale: Locale,
  currentUrl: URL | string,
): string => composeMenuLanguageHref(provider, targetLocale, currentUrl, getLocalizedPath);
