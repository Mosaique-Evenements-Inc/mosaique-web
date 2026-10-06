import assert from "node:assert/strict";
import test from "node:test";

import { menuProviders } from "../data/providers.ts";
import {
  findMenuProviderBySlug,
  getMenuProviderBySlug,
  localizeMenu,
  resolveMenuTheme,
} from "../selectors/index.ts";
import type { MenuProvider } from "../types/index.ts";
import { formatMenuPrice } from "../utils/format-price.ts";
import { validateMenuRegistry, type MenuTranslationRegistry } from "../utils/validate.ts";

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

test("production registry has no unpublished sample provider", () => {
  assert.deepEqual(menuProviders, []);
  assert.equal(findMenuProviderBySlug(menuProviders, "sample-provider"), undefined);
  assert.equal(getMenuProviderBySlug("sample-provider"), undefined);
});

test("valid registry and slug lookup retain canonical identity", () => {
  assert.doesNotThrow(() => validateMenuRegistry([provider], translations));
  assert.equal(findMenuProviderBySlug([provider], provider.slug), provider);
  assert.equal(findMenuProviderBySlug([provider], "missing"), undefined);
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
    /missing IDs/,
  );
});
