import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { menuProviders } from "../data/providers.ts";
import { menuTranslations } from "../i18n/index.ts";
import {
  findMenuProviderBySlug,
  getLocalizedMenu,
  getMenuProviderBySlug,
  localizeMenu,
  resolveMenuTheme,
} from "../selectors/index.ts";
import type { MenuProvider, MenuSocialLink, MenuSocialPlatform } from "../types/index.ts";
import { formatMenuPrice } from "../utils/format-price.ts";
import { validateMenuRegistry, type MenuTranslationRegistry } from "../utils/validate.ts";
import { projectMenuTheme } from "../ui/theme.ts";

const restaurantTheme = {
  backgroundColor: "#fff8ed",
  surfaceColor: "#ffffff",
  textColor: "#202020",
  mutedTextColor: "#555555",
  accentColor: "#8a4000",
};

const eventTheme = {
  backgroundColor: "#101010",
  surfaceColor: "#202020",
  textColor: "#ffffff",
  mutedTextColor: "#dddddd",
  accentColor: "#ffbb33",
};

const provider: MenuProvider = {
  id: "provider-fixture-01",
  slug: "sample-provider",
  config: restaurantTheme,
  menu: {
    sections: [
      {
        id: "mains",
        items: [
          { id: "dish-01", price: 18.5 },
          { id: "dish-02", price: 0 },
        ],
      },
    ],
  },
};

const instagramLink: MenuSocialLink = {
  platform: "instagram",
  handle: "samplehandle",
  url: "https://instagram.example.test/samplehandle",
};

const translations: MenuTranslationRegistry = {
  en: {
    [provider.id]: {
      title: "Sample provider",
      description: "Test menu",
      sections: {
        mains: {
          title: "Mains",
          items: {
            "dish-01": { name: "First dish", description: "A test description" },
            "dish-02": { name: "Second dish" },
          },
        },
      },
    },
  },
  es: {
    [provider.id]: {
      title: "Proveedor de prueba",
      sections: {
        mains: {
          title: "Platos principales",
          items: {
            "dish-01": { name: "Primer plato", description: "Descripción de prueba" },
            "dish-02": { name: "Segundo plato" },
          },
        },
      },
    },
  },
  fr: {
    [provider.id]: {
      title: "Fournisseur de test",
      sections: {
        mains: {
          title: "Plats principaux",
          items: {
            "dish-01": { name: "Premier plat", description: "Description de test" },
            "dish-02": { name: "Deuxième plat" },
          },
        },
      },
    },
  },
};

const copyTranslations = () => structuredClone(translations);

test("production registry contains only Alfajores Fleur", () => {
  assert.equal(menuProviders.length, 1);
  assert.equal(menuProviders[0].id, "alfajores-fleur");
  assert.equal(menuProviders[0].slug, "alfajores-fleur");
  assert.equal(getMenuProviderBySlug("alfajores-fleur"), menuProviders[0]);
  assert.equal(findMenuProviderBySlug(menuProviders, "sample-provider"), undefined);
  assert.equal(getMenuProviderBySlug("sample-provider"), undefined);
});

test("Alfajores Fleur retains approved items, prices, social identity, and AOA event branding", () => {
  const realProvider = menuProviders[0];
  assert.deepEqual(
    realProvider.menu.sections.map(({ id }) => id),
    ["food", "desserts"],
  );
  assert.deepEqual(
    realProvider.menu.sections.flatMap(({ items }) =>
      items.map(({ id, price }) => [id, price]),
    ),
    [
      ["tacos-de-lomo-saltado", 20],
      ["causa-de-pollo", 18],
      ["arroz-con-mariscos", 25],
      ["ceviche-colombiano-de-camarones", 25],
      ["empanadas-colombianas", 16],
      ["alfajores", 4.5],
      ["tres-leches", 8],
    ],
  );
  assert.ok(
    realProvider.menu.sections
      .flatMap(({ items }) => items)
      .every(({ price }) => typeof price === "number"),
  );
  assert.ok(
    realProvider.menu.sections
      .flatMap(({ items }) => items)
      .every((item) => Object.keys(item).sort().join(",") === "id,price"),
  );
  assert.deepEqual(realProvider.socialLinks, [
    {
      platform: "instagram",
      handle: "alfajoresfleur",
      url: "https://www.instagram.com/alfajoresfleur/",
    },
  ]);
  assert.deepEqual(Object.keys(realProvider.config).sort(), [
    "accentColor",
    "backgroundColor",
    "mutedTextColor",
    "surfaceColor",
    "textColor",
  ]);
  const eventConfig = realProvider.eventConfig;
  assert.ok(eventConfig);
  assert.doesNotThrow(() => validateMenuRegistry(menuProviders, menuTranslations));
  assert.equal(resolveMenuTheme(realProvider), eventConfig);
  assert.deepEqual(Object.keys(eventConfig).sort(), [
    "accentColor",
    "backgroundColor",
    "logo",
    "mutedTextColor",
    "secondaryColor",
    "surfaceColor",
    "textColor",
    "typography",
  ]);
  assert.deepEqual(
    {
      backgroundColor: eventConfig.backgroundColor,
      surfaceColor: eventConfig.surfaceColor,
      textColor: eventConfig.textColor,
      mutedTextColor: eventConfig.mutedTextColor,
      accentColor: eventConfig.accentColor,
      secondaryColor: eventConfig.secondaryColor,
    },
    {
      backgroundColor: "#F3E5D2",
      surfaceColor: "#FDE39F",
      textColor: "#211B19",
      mutedTextColor: "#7D0C0C",
      accentColor: "#C6963E",
      secondaryColor: "#D88F98",
    },
  );
  assert.equal(eventConfig.logo?.assetId, "aoa");
  assert.equal(eventConfig.logo?.alt, "AOA");
  assert.deepEqual(eventConfig.typography, {
    displayFontFamily: '"TAN Ashford", var(--font-family-display)',
    bodyFontFamily: "Quicksand, var(--font-family-body)",
  });
  assert.deepEqual(projectMenuTheme(eventConfig), {
    "--menu-background": "#F3E5D2",
    "--menu-surface": "#FDE39F",
    "--menu-text": "#211B19",
    "--menu-muted-text": "#7D0C0C",
    "--menu-accent": "#C6963E",
    "--menu-secondary": "#D88F98",
    "--menu-font-display": '"TAN Ashford", var(--font-family-display)',
    "--menu-font-body": "Quicksand, var(--font-family-body)",
  });
  assert.notDeepEqual(realProvider.config, eventConfig);
  assert.equal(
    Object.values(projectMenuTheme(eventConfig)).includes(realProvider.config.backgroundColor),
    false,
  );
});

test("Alfajores Fleur localizes section labels while preserving approved dish names", () => {
  const approvedNames = [
    "Tacos de lomo saltado",
    "Causa de pollo",
    "Arroz con mariscos",
    "Ceviche colombiano de camarones",
    "Empanadas colombianas",
    "Alfajores",
    "Tres leches",
  ];
  for (const [locale, sectionLabels] of [
    ["en", ["Menu", "Desserts"]],
    ["es", ["Menú", "Postres"]],
    ["fr", ["Menu", "Desserts"]],
  ] as const) {
    const menu = getLocalizedMenu(menuProviders[0], locale);
    assert.equal(menu.title, "Alfajores Fleur");
    assert.equal(menu.description, undefined);
    assert.deepEqual(
      menu.sections.map(({ title }) => title),
      sectionLabels,
    );
    assert.deepEqual(
      menu.sections.flatMap(({ items }) => items.map(({ name }) => name)),
      approvedNames,
    );
    assert.ok(
      menu.sections
        .flatMap(({ items }) => items)
        .every(({ description }) => description === undefined),
    );
    assert.match(formatMenuPrice(4.5, locale), /4[.,]50/);
  }
});

test("built Alfajores Fleur menus render generic event branding above content and attribution below", () => {
  for (const prefix of ["", "es/", "fr/"]) {
    const html = readFileSync(
      new URL(`../../../../dist/${prefix}menu/alfajores-fleur/index.html`, import.meta.url),
      "utf8",
    );
    const main = html.slice(html.indexOf('<main class="menu-page"'));
    const logoIndex = main.indexOf("aoa_logo");
    const titleIndex = main.indexOf("Alfajores Fleur");
    const itemsIndex = main.indexOf('class="menu-page__items"');
    const attributionIndex = main.indexOf('class="menu-page__attribution"');

    assert.ok(logoIndex >= 0 && logoIndex < titleIndex && titleIndex < itemsIndex);
    assert.ok(attributionIndex > itemsIndex);
    assert.match(main, /alt="AOA"/);
    assert.equal((main.match(/class="menu-page__item"/g) ?? []).length, 7);
    assert.match(main, /@alfajoresfleur/);
    assert.match(main.slice(attributionIndex), /MOSAÏQUE ÉVÉNEMENTS/);
    assert.match(main, /--menu-background:#F3E5D2/);
    assert.match(main, /--menu-text:#211B19/);
    assert.match(main, /--menu-secondary:#D88F98/);
    assert.doesNotMatch(
      main.slice(0, main.indexOf('><div class="menu-page__inner"')),
      /#f6f1e8/i,
    );
    assert.doesNotMatch(main, /menu-page--(?:alfajores|aoa)/i);
  }
  const pageSource = readFileSync(
    new URL("../ui/pages/MenuPage.astro", import.meta.url),
    "utf8",
  );
  const styleSource = readFileSync(
    new URL("../ui/styles/menu-page.css", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(`${pageSource}\n${styleSource}`, /alfajores|aoa/i);
});

test("valid registry and slug lookup retain canonical identity", () => {
  assert.doesNotThrow(() => validateMenuRegistry([provider], translations));
  assert.equal(findMenuProviderBySlug([provider], provider.slug), provider);
  assert.equal(findMenuProviderBySlug([provider], "missing"), undefined);
});

test("social links are optional canonical provider data across all locales", () => {
  assert.doesNotThrow(() => validateMenuRegistry([provider], translations));
  assert.doesNotThrow(() =>
    validateMenuRegistry([{ ...provider, socialLinks: [] }], translations),
  );

  const socialProvider: MenuProvider = { ...provider, socialLinks: [instagramLink] };
  assert.doesNotThrow(() => validateMenuRegistry([socialProvider], translations));
  for (const locale of ["en", "es", "fr"] as const) {
    const menu = localizeMenu(socialProvider, locale, translations);
    assert.equal(socialProvider.socialLinks?.[0], instagramLink);
    assert.equal("socialLinks" in menu, false);
    assert.equal("socialLinks" in translations[locale][provider.id], false);
  }
});

test("social handles must be present and stored without @ or padding", () => {
  for (const handle of ["", "   ", "@samplehandle", "sample@handle", " samplehandle "]) {
    const invalid: MenuProvider = {
      ...provider,
      socialLinks: [{ ...instagramLink, handle }],
    };
    assert.throws(() => validateMenuRegistry([invalid], translations), /handle/);
  }
});

test("social URLs must be complete valid HTTPS URLs", () => {
  for (const url of [
    "not-a-url",
    "/samplehandle",
    "https://",
    "https:example.test/user",
    "http://example.test/user",
  ] as const) {
    const invalid: MenuProvider = {
      ...provider,
      socialLinks: [{ ...instagramLink, url }],
    };
    assert.throws(() => validateMenuRegistry([invalid], translations), /social URL/);
  }
});

test("duplicate and unsupported social platforms are rejected", () => {
  const duplicate: MenuProvider = {
    ...provider,
    socialLinks: [instagramLink, { ...instagramLink, handle: "anotherhandle" }],
  };
  assert.throws(() => validateMenuRegistry([duplicate], translations), /duplicate platforms/);

  const unsupported: MenuProvider = {
    ...provider,
    socialLinks: [{ ...instagramLink, platform: "unsupported" as MenuSocialPlatform }],
  };
  assert.throws(
    () => validateMenuRegistry([unsupported], translations),
    /unsupported social platform/,
  );
});

test("English, Spanish, and French map the same sections, dishes, and prices", () => {
  for (const [locale, title, sectionTitle, itemName] of [
    ["en", "Sample provider", "Mains", "First dish"],
    ["es", "Proveedor de prueba", "Platos principales", "Primer plato"],
    ["fr", "Fournisseur de test", "Plats principaux", "Premier plat"],
  ] as const) {
    const menu = localizeMenu(provider, locale, translations);
    assert.equal(menu.title, title);
    assert.equal(menu.sections[0].id, "mains");
    assert.equal(menu.sections[0].title, sectionTitle);
    assert.equal(menu.sections[0].items[0].id, "dish-01");
    assert.equal(menu.sections[0].items[0].name, itemName);
    assert.equal(menu.sections[0].items[0].price, 18.5);
    assert.equal(menu.sections[0].items[1].price, 0);
  }
});

test("missing and unknown localized providers, sections, and items are rejected", () => {
  const missingLocale = copyTranslations() as Partial<MenuTranslationRegistry>;
  delete missingLocale.fr;
  assert.throws(
    () => validateMenuRegistry([provider], missingLocale as MenuTranslationRegistry),
    /missing locale fr/,
  );

  const missingProvider = copyTranslations();
  delete missingProvider.fr[provider.id];
  assert.throws(() => validateMenuRegistry([provider], missingProvider), /missing IDs/);

  const unknownProvider = copyTranslations();
  unknownProvider.en.extra = translations.en[provider.id];
  assert.throws(() => validateMenuRegistry([provider], unknownProvider), /unknown IDs/);

  const missingSection = copyTranslations();
  delete missingSection.es[provider.id].sections.mains;
  assert.throws(() => validateMenuRegistry([provider], missingSection), /missing IDs/);

  const unknownSection = copyTranslations();
  unknownSection.en[provider.id].sections.extra = translations.en[provider.id].sections.mains;
  assert.throws(() => validateMenuRegistry([provider], unknownSection), /unknown IDs/);

  const missingItem = copyTranslations();
  delete missingItem.fr[provider.id].sections.mains.items["dish-01"];
  assert.throws(() => validateMenuRegistry([provider], missingItem), /missing IDs/);

  const unknownItem = copyTranslations();
  unknownItem.es[provider.id].sections.mains.items.extra = { name: "Extra" };
  assert.throws(() => validateMenuRegistry([provider], unknownItem), /unknown IDs/);

  assert.throws(
    () => localizeMenu(provider, "fr", missingProvider),
    /Missing menu translation/,
  );
});

test("duplicate identities and invalid slugs are rejected", () => {
  assert.throws(
    () => validateMenuRegistry([provider, provider], translations),
    /duplicate IDs/,
  );
  assert.throws(
    () =>
      validateMenuRegistry(
        [provider, { ...provider, id: "provider-fixture-02" }],
        translations,
      ),
    /duplicate slugs/,
  );

  const duplicateSection: MenuProvider = {
    ...provider,
    menu: { sections: [provider.menu.sections[0], provider.menu.sections[0]] },
  };
  assert.throws(() => validateMenuRegistry([duplicateSection], translations), /duplicate IDs/);

  const duplicateItem: MenuProvider = {
    ...provider,
    menu: {
      sections: [
        {
          id: "mains",
          items: [provider.menu.sections[0].items[0], provider.menu.sections[0].items[0]],
        },
      ],
    },
  };
  assert.throws(() => validateMenuRegistry([duplicateItem], translations), /duplicate IDs/);

  assert.throws(
    () => validateMenuRegistry([{ ...provider, slug: "Invalid Slug" }], translations),
    /invalid URL slug/,
  );
});

test("prices are finite non-negative numbers and format as CAD in each locale", () => {
  for (const price of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
    const invalid: MenuProvider = {
      ...provider,
      menu: { sections: [{ id: "mains", items: [{ id: "dish-01", price }] }] },
    };
    assert.throws(() => validateMenuRegistry([invalid], translations), /invalid price/);
    assert.throws(() => formatMenuPrice(price, "en"), /finite, non-negative/);
  }

  for (const locale of ["en", "es", "fr"] as const) {
    const formatted = formatMenuPrice(18.5, locale);
    assert.match(formatted, /18[.,]50/);
    assert.match(formatted, /\$|CAD/);
  }
});

test("event configuration fully replaces restaurant theme when present", () => {
  assert.equal(resolveMenuTheme(provider), provider.config);
  const eventProvider = { ...provider, eventConfig: eventTheme };
  assert.equal(resolveMenuTheme(eventProvider), eventTheme);
  assert.deepEqual(resolveMenuTheme(eventProvider), eventTheme);

  const incompleteEventProvider = {
    ...provider,
    eventConfig: { backgroundColor: "#000000" } as MenuProvider["config"],
  };
  assert.throws(
    () => validateMenuRegistry([incompleteEventProvider], translations),
    /missing roles/,
  );

  const incompleteTypography: MenuProvider = {
    ...provider,
    eventConfig: {
      ...eventTheme,
      typography: { displayFontFamily: "Display" } as NonNullable<
        MenuProvider["eventConfig"]
      >["typography"],
    },
  };
  assert.throws(
    () => validateMenuRegistry([incompleteTypography], translations),
    /missing IDs/,
  );
});
