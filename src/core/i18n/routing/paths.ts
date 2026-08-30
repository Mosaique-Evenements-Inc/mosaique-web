import { getRelativeLocaleUrl } from "astro:i18n";

import { defaultLocale, localeConfig, supportedLocales, type Locale } from "../config/locales";

const localeByPath = new Map<string, Locale>(
  supportedLocales.map((locale) => [localeConfig[locale].path, locale]),
);

const cleanPath = (path: string) => path.replace(/^\/+|\/+$/g, "");

const isExternalHref = (href: string) =>
  /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href) && !href.startsWith("http://mosaique.local");

export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname =
    typeof url === "string" ? new URL(url, "https://mosaique.local").pathname : url.pathname;
  const [firstSegment = ""] = cleanPath(pathname).split("/");
  return localeByPath.get(firstSegment) ?? defaultLocale;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  return getRelativeLocaleUrl(locale, cleanPath(path));
}

export function getContentPathFromUrl(url: URL | string): string {
  const resolvedUrl = typeof url === "string" ? new URL(url, "https://mosaique.local") : url;
  const currentLocale = getLocaleFromUrl(resolvedUrl);
  const currentPath = cleanPath(resolvedUrl.pathname);
  const localePrefix = localeConfig[currentLocale].path;

  if (!localePrefix) return currentPath;
  if (currentPath === localePrefix) return "";
  if (currentPath.startsWith(`${localePrefix}/`)) {
    return currentPath.slice(localePrefix.length + 1);
  }

  return currentPath;
}

export function switchLocalePath(currentUrl: URL | string, targetLocale: Locale): string {
  const url =
    typeof currentUrl === "string" ? new URL(currentUrl, "https://mosaique.local") : currentUrl;
  return getLocalizedPath(getContentPathFromUrl(url), targetLocale);
}

export function switchLocaleUrl(currentUrl: URL | string, targetLocale: Locale): string {
  const url =
    typeof currentUrl === "string" ? new URL(currentUrl, "https://mosaique.local") : currentUrl;

  return `${switchLocalePath(url, targetLocale)}${url.search}${url.hash}`;
}

export function getLocalizedHref(href: string, locale: Locale): string {
  if (!href || href.startsWith("#") || isExternalHref(href)) return href;

  const url = new URL(href, "https://mosaique.local");
  return `${getLocalizedPath(getContentPathFromUrl(url), locale)}${url.search}${url.hash}`;
}
