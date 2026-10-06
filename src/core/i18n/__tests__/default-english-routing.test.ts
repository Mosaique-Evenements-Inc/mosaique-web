import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import {
  defaultLocale,
  localeConfig,
  prefixedLocales,
  supportedLocales,
} from "../config/locales.ts";

const distUrl = new URL("../../../../dist/client/", import.meta.url);

test("locale registry keeps English unprefixed", () => {
  assert.equal(defaultLocale, "en");
  assert.deepEqual(supportedLocales, ["en", "es", "fr"]);
  assert.deepEqual(prefixedLocales, ["es", "fr"]);
  assert.deepEqual(localeConfig, {
    en: { path: "", languageTag: "en-CA" },
    es: { path: "es", languageTag: "es" },
    fr: { path: "fr", languageTag: "fr-CA" },
  });
});

test("technical robots page remains prerendered without CMS", async () => {
  const robots = await readFile(new URL("robots.txt", distUrl), "utf8");
  assert.match(robots, /Sitemap: https:\/\/mosaiqueevenements\.com\/sitemap-index\.xml/);
  assert.match(robots, /Sitemap: https:\/\/mosaiqueevenements\.com\/cms-sitemap\.xml/);
  await assert.rejects(stat(new URL("en/index.html", distUrl)), { code: "ENOENT" });
});
