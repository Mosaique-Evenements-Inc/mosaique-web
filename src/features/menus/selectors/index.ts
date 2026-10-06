import { type Locale } from "../../../core/i18n/config/locales.ts";
import { menuProviders } from "../data/providers.ts";
import { menuTranslations } from "../i18n/index.ts";
import type { MenuContent, MenuProvider, MenuThemeConfig } from "../types/index.ts";
import type { MenuTranslationRegistry } from "../utils/validate.ts";

export const findMenuProviderBySlug = (
  providers: readonly MenuProvider[],
  slug: string,
): MenuProvider | undefined => providers.find((provider) => provider.slug === slug);

export const getMenuProviderBySlug = (slug: string): MenuProvider | undefined =>
  findMenuProviderBySlug(menuProviders, slug);

export const resolveMenuTheme = (provider: MenuProvider): MenuThemeConfig =>
  provider.eventConfig ?? provider.config;

export function localizeMenu(
  provider: MenuProvider,
  locale: Locale,
  translations: MenuTranslationRegistry,
): MenuContent {
  const translation = translations[locale][provider.id];
  if (!translation) throw new Error(`Missing menu translation for ${provider.id} (${locale}).`);

  return {
    title: translation.title,
    ...(translation.description !== undefined && { description: translation.description }),
    sections: provider.menu.sections.map((section) => {
      const localizedSection = translation.sections[section.id];
      if (!localizedSection) {
        throw new Error(`Missing menu section ${section.id} for ${provider.id} (${locale}).`);
      }

      return {
        id: section.id,
        title: localizedSection.title,
        items: section.items.map((item) => {
          const localizedItem = localizedSection.items[item.id];
          if (!localizedItem) {
            throw new Error(`Missing menu item ${item.id} for ${provider.id} (${locale}).`);
          }
          return { ...item, ...localizedItem };
        }),
      };
    }),
  };
}

export const getLocalizedMenu = (provider: MenuProvider, locale: Locale): MenuContent =>
  localizeMenu(provider, locale, menuTranslations);
