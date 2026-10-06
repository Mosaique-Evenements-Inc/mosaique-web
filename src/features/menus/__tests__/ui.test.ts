import assert from "node:assert/strict";
import test from "node:test";

import { localeConfig, type Locale } from "../../../core/i18n/config/locales.ts";
import { composeMenuLanguageHref } from "../routing/paths.ts";
import type { MenuSocialLink } from "../types/index.ts";
import { getMenuLanguageOptions, getMenuSocialItems } from "../ui/presentation.ts";

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
