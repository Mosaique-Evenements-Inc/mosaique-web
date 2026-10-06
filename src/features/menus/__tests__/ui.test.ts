import assert from "node:assert/strict";
import test from "node:test";

import { localeConfig, type Locale } from "../../../core/i18n/config/locales.ts";
import { composeMenuLanguageHref } from "../routing/paths.ts";
import { resolveMenuTheme } from "../selectors/index.ts";
import type { MenuProvider, MenuSocialLink, MenuThemeConfig } from "../types/index.ts";
import { getMenuLanguageOptions, getMenuSocialItems } from "../ui/presentation.ts";
import { projectMenuTheme } from "../ui/theme.ts";

const provider = { slug: "sample-provider" };
const currentUrl = "/fr/menu/sample-provider?table=4#drinks";
const localizePath = (path: string, locale: Locale) => {
  const prefix = localeConfig[locale].path;
  return `${prefix ? `/${prefix}` : ""}${path}/`;
};

test("each menu language has one current option and keeps the provider, query, and hash", () => {
  for (const locale of ["en", "es", "fr"] as const) {
    const options = getMenuLanguageOptions(locale, (target) =>
      composeMenuLanguageHref(provider, target, currentUrl, localizePath),
    );

    assert.deepEqual(
      options.map(({ locale: target }) => target),
      ["en", "es", "fr"],
    );
    assert.deepEqual(
      options.filter(({ current }) => current).map(({ locale: target }) => target),
      [locale],
    );
    assert.deepEqual(
      options.map(({ href }) => href),
      [
        "/menu/sample-provider/?table=4#drinks",
        "/es/menu/sample-provider/?table=4#drinks",
        "/fr/menu/sample-provider/?table=4#drinks",
      ],
    );
    assert.ok(options.every(({ href }) => !href.startsWith("/en/")));
    assert.ok(options.every(({ accessibleName }) => accessibleName.length > 0));
  }
});

test("social presentation is optional and retains canonical handles and URLs", () => {
  assert.deepEqual(getMenuSocialItems(), []);
  assert.deepEqual(getMenuSocialItems([]), []);

  const links: readonly MenuSocialLink[] = [
    { platform: "instagram", handle: "sample", url: "https://example.test/sample" },
    { platform: "tiktok", handle: "sample.video", url: "https://example.test/sample.video" },
  ];
  assert.deepEqual(getMenuSocialItems(links), [
    { platform: "Instagram", displayHandle: "@sample", url: links[0].url },
    { platform: "TikTok", displayHandle: "@sample.video", url: links[1].url },
  ]);
  assert.equal(links[0].handle, "sample");
  assert.equal(links[1].handle, "sample.video");

  const options = getMenuLanguageOptions("es", (target) =>
    composeMenuLanguageHref(provider, target, currentUrl, localizePath),
  );
  assert.equal(options[0].href, "/menu/sample-provider/?table=4#drinks");
});

test("resolved restaurant theme projects exactly five scoped Menu color roles", () => {
  const config: MenuThemeConfig = {
    backgroundColor: "#f5f0e6",
    surfaceColor: "#ffffff",
    textColor: "#161616",
    mutedTextColor: "#555555",
    accentColor: "#8a4000",
  };
  const themedProvider: MenuProvider = {
    id: "provider-fixture-01",
    slug: "sample-provider",
    config,
    menu: { sections: [] },
  };
  const original = structuredClone(themedProvider);
  const projected = projectMenuTheme(resolveMenuTheme(themedProvider));

  assert.deepEqual(projected, {
    "--menu-background": "#f5f0e6",
    "--menu-surface": "#ffffff",
    "--menu-text": "#161616",
    "--menu-muted-text": "#555555",
    "--menu-accent": "#8a4000",
  });
  assert.deepEqual(Object.keys(projected), [
    "--menu-background",
    "--menu-surface",
    "--menu-text",
    "--menu-muted-text",
    "--menu-accent",
  ]);
  assert.deepEqual(
    projectMenuTheme(resolveMenuTheme({ ...themedProvider, slug: "another-provider" })),
    projected,
  );
  assert.deepEqual(themedProvider, original);
});

test("event theme fully replaces restaurant colors before Menu projection", () => {
  const themedProvider: MenuProvider = {
    id: "provider-fixture-02",
    slug: "sample-provider",
    config: {
      backgroundColor: "#f5f0e6",
      surfaceColor: "#ffffff",
      textColor: "#161616",
      mutedTextColor: "#555555",
      accentColor: "#8a4000",
    },
    eventConfig: {
      backgroundColor: "#101010",
      surfaceColor: "#202020",
      textColor: "#f8f8f8",
      mutedTextColor: "#d5d5d5",
      accentColor: "#e8bb55",
    },
    menu: { sections: [] },
  };
  const original = structuredClone(themedProvider);
  const resolved = resolveMenuTheme(themedProvider);

  assert.equal(resolved, themedProvider.eventConfig);
  assert.deepEqual(projectMenuTheme(resolved), {
    "--menu-background": "#101010",
    "--menu-surface": "#202020",
    "--menu-text": "#f8f8f8",
    "--menu-muted-text": "#d5d5d5",
    "--menu-accent": "#e8bb55",
  });
  assert.deepEqual(themedProvider, original);
});

test("event resolution never inherits optional logo, secondary color, or typography", () => {
  const themedProvider: MenuProvider = {
    id: "provider-fixture-03",
    slug: "sample-provider",
    config: {
      backgroundColor: "#f5f0e6",
      surfaceColor: "#ffffff",
      textColor: "#161616",
      mutedTextColor: "#555555",
      accentColor: "#8a4000",
      secondaryColor: "#00ff00",
      logo: { assetId: "aoa", alt: "Base logo" },
      typography: {
        displayFontFamily: "Base Display, serif",
        bodyFontFamily: "Base Body, sans-serif",
      },
    },
    eventConfig: {
      backgroundColor: "#101010",
      surfaceColor: "#202020",
      textColor: "#f8f8f8",
      mutedTextColor: "#d5d5d5",
      accentColor: "#e8bb55",
    },
    menu: { sections: [] },
  };
  const resolved = resolveMenuTheme(themedProvider);
  assert.equal(resolved, themedProvider.eventConfig);
  assert.equal(resolved.logo, undefined);
  assert.equal(resolved.secondaryColor, undefined);
  assert.equal(resolved.typography, undefined);
  assert.deepEqual(Object.keys(projectMenuTheme(resolved)), [
    "--menu-background",
    "--menu-surface",
    "--menu-text",
    "--menu-muted-text",
    "--menu-accent",
  ]);
});
