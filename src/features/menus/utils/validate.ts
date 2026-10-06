import { assertUniqueValues } from "../../../core/common/utils/assert-unique-values.ts";
import { supportedLocales, type Locale } from "../../../core/i18n/config/locales.ts";
import type { LocaleDictionaries } from "../../../core/i18n/translation/contracts.ts";
import { MENU_SOCIAL_PLATFORMS } from "../types/index.ts";
import type {
  MenuProvider,
  MenuSocialLink,
  MenuThemeConfig,
  MenuTranslation,
} from "../types/index.ts";

export type MenuTranslationRegistry = LocaleDictionaries<Record<string, MenuTranslation>>;

const requireText = (value: string, label: string) => {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be nonempty text.`);
  }
};

const assertSameKeys = (
  expected: readonly string[],
  actual: readonly string[],
  label: string,
) => {
  const missing = expected.filter((id) => !actual.includes(id));
  const unknown = actual.filter((id) => !expected.includes(id));

  if (missing.length || unknown.length) {
    throw new Error(
      `${label} has missing IDs [${missing.join(", ")}] or unknown IDs [${unknown.join(", ")}].`,
    );
  }
};

const validateTheme = (theme: MenuThemeConfig, label: string) => {
  const roles = [
    "backgroundColor",
    "surfaceColor",
    "textColor",
    "mutedTextColor",
    "accentColor",
  ] as const;
  assertSameKeys(roles, Object.keys(theme), label);
  for (const role of roles) {
    requireText(theme[role], `${label}.${role}`);
  }
};

const validateSocialLink = (link: MenuSocialLink, providerId: string) => {
  if (!MENU_SOCIAL_PLATFORMS.some((platform) => platform === link.platform)) {
    throw new Error(`Menu provider ${providerId} has an unsupported social platform.`);
  }

  requireText(link.handle, `Menu provider ${providerId} ${link.platform} handle`);
  if (link.handle !== link.handle.trim() || link.handle.includes("@")) {
    throw new Error(
      `Menu provider ${providerId} ${link.platform} handle must omit @ and padding.`,
    );
  }

  let url: URL;
  try {
    if (
      typeof link.url !== "string" ||
      link.url !== link.url.trim() ||
      !link.url.startsWith("https://")
    ) {
      throw new Error("Invalid URL text");
    }
    url = new URL(link.url);
  } catch {
    throw new Error(`Menu provider ${providerId} ${link.platform} has an invalid social URL.`);
  }
  if (url.protocol !== "https:") {
    throw new Error(`Menu provider ${providerId} ${link.platform} social URL must use HTTPS.`);
  }
};

export function validateMenuRegistry(
  providers: readonly MenuProvider[],
  translations: MenuTranslationRegistry,
): void {
  assertUniqueValues(
    "Menu provider",
    "IDs",
    providers.map(({ id }) => id),
  );
  assertUniqueValues(
    "Menu provider",
    "slugs",
    providers.map(({ slug }) => slug),
  );

  for (const provider of providers) {
    requireText(provider.id, "Menu provider ID");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(provider.slug)) {
      throw new Error(`Menu provider ${provider.id} has an invalid URL slug.`);
    }
    validateTheme(provider.config, `Menu provider ${provider.id} config`);
    if (provider.eventConfig)
      validateTheme(provider.eventConfig, `Menu provider ${provider.id} eventConfig`);
    if (provider.socialLinks) {
      assertUniqueValues(
        `Menu provider ${provider.id} social`,
        "platforms",
        provider.socialLinks.map(({ platform }) => platform),
      );
      for (const link of provider.socialLinks) validateSocialLink(link, provider.id);
    }

    const sections = provider.menu.sections;
    assertUniqueValues(
      "Menu section",
      "IDs",
      sections.map(({ id }) => id),
    );
    const itemIds = sections.flatMap(({ items }) => items.map(({ id }) => id));
    assertUniqueValues("Menu item", "IDs", itemIds);

    for (const section of sections) {
      requireText(section.id, `Menu provider ${provider.id} section ID`);
      for (const item of section.items) {
        requireText(item.id, `Menu provider ${provider.id} item ID`);
        if (!Number.isFinite(item.price) || item.price < 0) {
          throw new Error(`Menu provider ${provider.id} item ${item.id} has an invalid price.`);
        }
      }
    }
  }

  const providerIds = providers.map(({ id }) => id);
  for (const locale of supportedLocales) {
    const localizedProviders = translations[locale] as
      Record<string, MenuTranslation> | undefined;
    if (!localizedProviders) throw new Error(`Menus is missing locale ${locale}.`);
    assertSameKeys(providerIds, Object.keys(localizedProviders), `Menus ${locale}`);

    for (const provider of providers) {
      const translation = localizedProviders[provider.id];
      validateMenuTranslation(provider, translation, locale);
    }
  }
}

function validateMenuTranslation(
  provider: MenuProvider,
  translation: MenuTranslation,
  locale: Locale,
): void {
  const label = `Menu provider ${provider.id} ${locale}`;
  requireText(translation.title, `${label} title`);
  if (translation.description !== undefined)
    requireText(translation.description, `${label} description`);

  const sectionIds = provider.menu.sections.map(({ id }) => id);
  assertSameKeys(sectionIds, Object.keys(translation.sections), `${label} sections`);

  for (const section of provider.menu.sections) {
    const localizedSection = translation.sections[section.id];
    requireText(localizedSection.title, `${label} section ${section.id} title`);
    assertSameKeys(
      section.items.map(({ id }) => id),
      Object.keys(localizedSection.items),
      `${label} section ${section.id} items`,
    );
    for (const item of section.items) {
      const localizedItem = localizedSection.items[item.id];
      requireText(localizedItem.name, `${label} item ${item.id} name`);
      if (localizedItem.description !== undefined) {
        requireText(localizedItem.description, `${label} item ${item.id} description`);
      }
    }
  }
}
