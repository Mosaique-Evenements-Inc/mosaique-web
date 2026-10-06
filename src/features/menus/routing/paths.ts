import {
  prefixedLocales,
  supportedLocales,
  type Locale,
} from "../../../core/i18n/config/locales.ts";
import type { MenuProvider } from "../types/index.ts";

type ProviderIdentity = Pick<MenuProvider, "slug">;

export const getMenuContentPath = ({ slug }: ProviderIdentity): string => `/menu/${slug}`;

export const getMenuStaticPaths = (providers: readonly MenuProvider[]) =>
  providers.map((provider) => ({
    params: { provider: provider.slug },
    props: { provider },
  }));

export const getLocalizedMenuStaticPaths = (providers: readonly MenuProvider[]) =>
  prefixedLocales.flatMap((locale) =>
    providers.map((provider) => ({
      params: { locale, provider: provider.slug },
      props: { provider },
    })),
  );

export function composeMenuLanguageHref(
  provider: ProviderIdentity,
  targetLocale: Locale,
  currentUrl: URL | string,
  localizePath: (path: string, locale: Locale) => string,
): string {
  if (!supportedLocales.includes(targetLocale)) {
    throw new Error(`Unsupported menu locale: ${targetLocale}.`);
  }
  const url =
    typeof currentUrl === "string" ? new URL(currentUrl, "https://mosaique.local") : currentUrl;
  return `${localizePath(getMenuContentPath(provider), targetLocale)}${url.search}${url.hash}`;
}
