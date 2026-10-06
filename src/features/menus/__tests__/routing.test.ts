import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";

import { localeConfig, type Locale } from "../../../core/i18n/config/locales.ts";
import { menuProviders } from "../data/providers.ts";
import {
  composeMenuLanguageHref,
  getLocalizedMenuStaticPaths,
  getMenuContentPath,
  getMenuStaticPaths,
} from "../routing/paths.ts";
import type { MenuProvider } from "../types/index.ts";

const fixtureProviders: MenuProvider[] = [
  {
    id: "provider-fixture-01",
    slug: "first-provider",
    config: {
      backgroundColor: "#ffffff",
      surfaceColor: "#ffffff",
      textColor: "#000000",
      mutedTextColor: "#444444",
      accentColor: "#999999",
    },
    menu: { sections: [] },
  },
  {
    id: "provider-fixture-02",
    slug: "second-provider",
    config: {
      backgroundColor: "#ffffff",
      surfaceColor: "#ffffff",
      textColor: "#000000",
      mutedTextColor: "#444444",
      accentColor: "#999999",
    },
    menu: { sections: [] },
  },
];

const localizePath = (path: string, locale: Locale) => {
  const prefix = localeConfig[locale].path;
  return `${prefix ? `/${prefix}` : ""}${path}/`;
};

test("static paths enumerate only canonical providers in EN, ES, and FR", () => {
  const english = getMenuStaticPaths(fixtureProviders);
  assert.deepEqual(
    english.map(({ params }) => params),
    [{ provider: "first-provider" }, { provider: "second-provider" }],
  );
  assert.equal(english[0].props.provider, fixtureProviders[0]);

  const localized = getLocalizedMenuStaticPaths(fixtureProviders);
  assert.deepEqual(
    localized.map(({ params }) => params),
    [
      { locale: "es", provider: "first-provider" },
      { locale: "es", provider: "second-provider" },
      { locale: "fr", provider: "first-provider" },
      { locale: "fr", provider: "second-provider" },
    ],
  );
  assert.equal(localized[0].props.provider, fixtureProviders[0]);
  assert.deepEqual(
    getMenuStaticPaths(fixtureProviders).map(({ params }) => params.provider),
    ["first-provider", "second-provider"],
  );
  assert.equal(getMenuContentPath(fixtureProviders[0]), "/menu/first-provider");
  assert.ok(!english.some(({ params }) => params.provider === "unknown-provider"));
});

test("production registry emits exactly three Alfajores Fleur pages", async () => {
  assert.deepEqual(
    getMenuStaticPaths(menuProviders).map(({ params }) => params),
    [{ provider: "alfajores-fleur" }],
  );
  assert.deepEqual(
    getLocalizedMenuStaticPaths(menuProviders).map(({ params }) => params),
    [
      { locale: "es", provider: "alfajores-fleur" },
      { locale: "fr", provider: "alfajores-fleur" },
    ],
  );

  const distUrl = new URL("../../../../dist/", import.meta.url);
  for (const path of [
    "menu/alfajores-fleur/index.html",
    "es/menu/alfajores-fleur/index.html",
    "fr/menu/alfajores-fleur/index.html",
  ]) {
    await assert.doesNotReject(stat(new URL(path, distUrl)));
  }
  for (const path of ["en/menu/alfajores-fleur/index.html", "menu/first-provider/index.html"]) {
    await assert.rejects(stat(new URL(path, distUrl)), { code: "ENOENT" });
  }
});

test("Alfajores Fleur language targets preserve its slug without an English prefix", () => {
  for (const [locale, expected] of [
    ["en", "/menu/alfajores-fleur/?table=4#desserts"],
    ["es", "/es/menu/alfajores-fleur/?table=4#desserts"],
    ["fr", "/fr/menu/alfajores-fleur/?table=4#desserts"],
  ] as const) {
    assert.equal(
      composeMenuLanguageHref(
        menuProviders[0],
        locale,
        "/menu/alfajores-fleur?table=4#desserts",
        localizePath,
      ),
      expected,
    );
  }
});

test("language targets keep provider identity, query, and hash", () => {
  const provider = fixtureProviders[0];
  assert.equal(
    composeMenuLanguageHref(
      provider,
      "es",
      "/menu/first-provider?table=4#drinks",
      localizePath,
    ),
    "/es/menu/first-provider/?table=4#drinks",
  );
  assert.equal(
    composeMenuLanguageHref(
      provider,
      "fr",
      "/es/menu/first-provider?table=4#drinks",
      localizePath,
    ),
    "/fr/menu/first-provider/?table=4#drinks",
  );
  assert.equal(
    composeMenuLanguageHref(
      provider,
      "en",
      "/fr/menu/first-provider?table=4#drinks",
      localizePath,
    ),
    "/menu/first-provider/?table=4#drinks",
  );
  assert.throws(
    () =>
      composeMenuLanguageHref(provider, "de" as Locale, "/menu/first-provider", localizePath),
    /Unsupported menu locale/,
  );
});
