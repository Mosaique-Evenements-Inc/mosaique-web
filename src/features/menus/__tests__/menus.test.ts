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
    displayFontFamily: "var(--font-family-display)",
    bodyFontFamily: '"Quicksand Variable", var(--font-family-body)',
  });
  assert.deepEqual(projectMenuTheme(eventConfig), {
    "--menu-background": "#F3E5D2",
    "--menu-surface": "#FDE39F",
    "--menu-text": "#211B19",
    "--menu-muted-text": "#7D0C0C",
    "--menu-accent": "#C6963E",
    "--menu-secondary": "#D88F98",
    "--menu-font-display": "var(--font-family-display)",
    "--menu-font-body": '"Quicksand Variable", var(--font-family-body)',
  });
  assert.notDeepEqual(realProvider.config, eventConfig);
  assert.equal(
    Object.values(projectMenuTheme(eventConfig)).includes(realProvider.config.backgroundColor),
    false,
  );
});

test("real event override toggles to the unchanged base presentation without changing identity or content", () => {
  const realProvider = menuProviders[0];
  const original = structuredClone(realProvider);
  const localizedBefore = (["en", "es", "fr"] as const).map((locale) =>
    getLocalizedMenu(realProvider, locale),
  );
  const { eventConfig, ...baseFields } = realProvider;
  const baseOnly = Object.freeze(baseFields);

  assert.ok(eventConfig);
  assert.equal(resolveMenuTheme(realProvider), eventConfig);
  assert.equal(resolveMenuTheme(baseOnly), realProvider.config);
  assert.deepEqual(projectMenuTheme(resolveMenuTheme(baseOnly)), {
    "--menu-background": "#f6f1e8",
    "--menu-surface": "#ffffff",
    "--menu-text": "#000000",
    "--menu-muted-text": "#444444",
    "--menu-accent": "#000000",
  });
  assert.equal(resolveMenuTheme(baseOnly).logo, undefined);
  assert.equal(resolveMenuTheme(baseOnly).secondaryColor, undefined);
  assert.equal(resolveMenuTheme(baseOnly).typography, undefined);
  assert.equal(baseOnly.id, realProvider.id);
  assert.equal(baseOnly.slug, realProvider.slug);
  assert.equal(baseOnly.socialLinks, realProvider.socialLinks);
  assert.equal(baseOnly.menu, realProvider.menu);
  assert.deepEqual(
    (["en", "es", "fr"] as const).map((locale) => getLocalizedMenu(baseOnly, locale)),
    localizedBefore,
  );
  assert.deepEqual(realProvider, original);
});

test("real AOA override wins every presentation role over a distinguishable base fixture", () => {
  const realProvider = menuProviders[0];
  const conflictingBase: MenuProvider["config"] = {
    backgroundColor: "#111111",
    surfaceColor: "#222222",
    textColor: "#333333",
    mutedTextColor: "#444444",
    accentColor: "#555555",
    secondaryColor: "#666666",
    logo: { assetId: "aoa", alt: "Base fixture logo" },
    typography: {
      displayFontFamily: "Base Display, serif",
      bodyFontFamily: "Base Body, sans-serif",
    },
  };
  const fixture: MenuProvider = { ...realProvider, config: conflictingBase };
  const before = structuredClone(fixture);
  const event = realProvider.eventConfig;
  assert.ok(event);

  const resolved = resolveMenuTheme(fixture);
  assert.equal(resolved, event);
  for (const role of [
    "backgroundColor",
    "surfaceColor",
    "textColor",
    "mutedTextColor",
    "accentColor",
    "secondaryColor",
  ] as const) {
    assert.equal(resolved[role], event[role]);
    assert.notEqual(resolved[role], conflictingBase[role]);
  }
  assert.deepEqual(resolved.logo, event.logo);
  assert.notDeepEqual(resolved.logo, conflictingBase.logo);
  assert.equal(resolved.typography?.displayFontFamily, event.typography?.displayFontFamily);
  assert.equal(resolved.typography?.bodyFontFamily, event.typography?.bodyFontFamily);
  assert.notEqual(
    resolved.typography?.displayFontFamily,
    conflictingBase.typography?.displayFontFamily,
  );
  assert.notEqual(
    resolved.typography?.bodyFontFamily,
    conflictingBase.typography?.bodyFontFamily,
  );
  assert.deepEqual(projectMenuTheme(resolved), projectMenuTheme(event));
  assert.deepEqual(fixture, before);
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
    assert.match(main, /--menu-surface:#FDE39F/);
    assert.match(main, /--menu-text:#211B19/);
    assert.match(main, /--menu-muted-text:#7D0C0C/);
    assert.match(main, /--menu-accent:#C6963E/);
    assert.match(main, /--menu-secondary:#D88F98/);
    assert.match(main, /--menu-font-display:var\(--font-family-display\)/);
    assert.match(
      main,
      /--menu-font-body:&quot;Quicksand Variable&quot;, var\(--font-family-body\)/,
    );
    assert.doesNotMatch(main, /TAN Ashford/);
    assert.match(main, /<h1\b/);
    assert.match(main, /<h2\b/);
    assert.match(main, /aria-current="page"/);
    assert.doesNotMatch(main.slice(0, main.indexOf(">")), /#f6f1e8/i);
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

test("built editorial menus preserve localized actions, accessible decoration, and formatted prices", () => {
  for (const [prefix, locale, eyebrow, follow] of [
    ["", "en", "Menu", "Follow us on"],
    ["es/", "es", "Menú", "Síguenos en"],
    ["fr/", "fr", "Menu", "Suivez-nous sur"],
  ] as const) {
    const html = readFileSync(
      new URL(`../../../../dist/${prefix}menu/alfajores-fleur/index.html`, import.meta.url),
      "utf8",
    );
    assert.ok(html.includes(`class="menu-page__eyebrow">${eyebrow}</p>`));
    assert.ok(html.includes(`${follow} Instagram`));
    assert.match(
      html,
      /href="https:\/\/www.instagram.com\/alfajoresfleur\/" target="_blank" rel="noopener noreferrer"/,
    );
    assert.equal((html.match(/class="menu-page__leader" aria-hidden="true"/g) ?? []).length, 7);
    assert.match(html, /class="menu-page__atmosphere" aria-hidden="true"/);
    assert.match(html, /mosaique_logo_complete/);
    assert.ok(
      html.indexOf('id="menu-section-food"') < html.indexOf('id="menu-section-desserts"'),
    );
    for (const item of menuProviders[0].menu.sections.flatMap(({ items }) => items)) {
      assert.ok(html.includes(formatMenuPrice(item.price, locale)));
    }
    assert.doesNotMatch(
      html,
      /<astro-island\b|href="\/en\/|Sabores que conectan culturas|Cocina latina con/,
    );
  }
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
    assert.match(formatted, /CAD/);
    assert.doesNotMatch(formatted, /\$/);
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
