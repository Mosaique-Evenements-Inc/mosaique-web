import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

import {
  defaultLocale,
  localeConfig,
  prefixedLocales,
  supportedLocales,
} from "../config/locales.ts";

const distUrl = new URL("../../../../dist/", import.meta.url);
const relativeUrlBase = "https://mosaique.local";

const readBuiltPage = (path: string) => readFile(new URL(path, distUrl), "utf8");

const getMetadataUrl = (html: string, rel: string, hreflang?: string) => {
  const links = Array.from(html.matchAll(/<link\b[^>]*>/g));
  const link = links.find(([tag]) => {
    const matchesRel = new RegExp(`\\brel="${rel}"`).test(tag);
    const matchesHreflang = hreflang ? new RegExp(`\\bhreflang="${hreflang}"`).test(tag) : true;

    return matchesRel && matchesHreflang;
  });
  const href = link?.[0].match(/\bhref="([^"]+)"/)?.[1];

  assert.ok(href, `Expected ${hreflang ?? rel} metadata link.`);
  return new URL(href, relativeUrlBase);
};

const assertMetadataUrl = (url: URL, expectedPathname: string) => {
  assert.equal(url.pathname, expectedPathname);

  if (process.env.SITE_URL) {
    assert.equal(url.origin, new URL(process.env.SITE_URL).origin);
  }
};

const expectMetadata = async (
  path: string,
  expected: {
    lang: string;
    title: string;
    canonical: string;
    alternates: { en: string; es: string; fr: string };
    xDefault: string;
  },
) => {
  const html = await readBuiltPage(path);

  assert.match(html, new RegExp(`<html[^>]*lang="${expected.lang}"`));
  assert.match(html, new RegExp(`<title>${expected.title}</title>`));
  assertMetadataUrl(getMetadataUrl(html, "canonical"), expected.canonical);
  assertMetadataUrl(getMetadataUrl(html, "alternate", "en-CA"), expected.alternates.en);
  assertMetadataUrl(getMetadataUrl(html, "alternate", "es"), expected.alternates.es);
  assertMetadataUrl(getMetadataUrl(html, "alternate", "fr-CA"), expected.alternates.fr);
  assertMetadataUrl(getMetadataUrl(html, "alternate", "x-default"), expected.xDefault);

  return html;
};

test("locale registry makes English unprefixed and centralizes prefixed locales", () => {
  assert.equal(defaultLocale, "en");
  assert.deepEqual(supportedLocales, ["en", "es", "fr"]);
  assert.deepEqual(prefixedLocales, ["es", "fr"]);
  assert.deepEqual(localeConfig, {
    en: { path: "", languageTag: "en-CA" },
    es: { path: "es", languageTag: "es" },
    fr: { path: "fr", languageTag: "fr-CA" },
  });
});

test("built static routes localize root, dynamic paths, and language switches", async () => {
  const cases = [
    {
      path: "about/index.html",
      lang: "en-CA",
      title: "About — MOSAÏQUE EVENTS",
      canonical: "/about/",
      alternates: { en: "/about/", es: "/es/about/", fr: "/fr/about/" },
      xDefault: "/about/",
    },
    {
      path: "es/about/index.html",
      lang: "es",
      title: "Nosotros — MOSAÏQUE EVENTS",
      canonical: "/es/about/",
      alternates: { en: "/about/", es: "/es/about/", fr: "/fr/about/" },
      xDefault: "/about/",
    },
    {
      path: "fr/about/index.html",
      lang: "fr-CA",
      title: "Nous — MOSAÏQUE EVENTS",
      canonical: "/fr/about/",
      alternates: { en: "/about/", es: "/es/about/", fr: "/fr/about/" },
      xDefault: "/about/",
    },
    {
      path: "services/bodas/index.html",
      lang: "en-CA",
      title: "Weddings — MOSAÏQUE EVENTS",
      canonical: "/services/bodas/",
      alternates: {
        en: "/services/bodas/",
        es: "/es/services/bodas/",
        fr: "/fr/services/bodas/",
      },
      xDefault: "/services/bodas/",
    },
    {
      path: "es/events/nossa-copa/index.html",
      lang: "es",
      title: "Brasil en el Mundial 2026 — MOSAÏQUE EVENTS",
      canonical: "/es/events/nossa-copa/",
      alternates: {
        en: "/events/nossa-copa/",
        es: "/es/events/nossa-copa/",
        fr: "/fr/events/nossa-copa/",
      },
      xDefault: "/events/nossa-copa/",
    },
    {
      path: "fr/gallery/festival/index.html",
      lang: "fr-CA",
      title: "Festival — Galerie des événements réalisés — MOSAÏQUE EVENTS",
      canonical: "/fr/gallery/festival/",
      alternates: {
        en: "/gallery/festival/",
        es: "/es/gallery/festival/",
        fr: "/fr/gallery/festival/",
      },
      xDefault: "/gallery/festival/",
    },
  ] as const;

  for (const page of cases) {
    await expectMetadata(page.path, page);
  }

  const englishService = await readBuiltPage("services/bodas/index.html");
  assert.match(englishService, /href="\/es\/services\/bodas\/"/);
  assert.match(englishService, /href="\/fr\/services\/bodas\/"/);

  const spanishService = await readBuiltPage("es/services/bodas/index.html");
  assert.match(spanishService, /href="\/services\/bodas\/"/);
  assert.match(spanishService, /href="\/fr\/services\/bodas\/"/);

  const frenchService = await readBuiltPage("fr/services/bodas/index.html");
  assert.match(frenchService, /href="\/services\/bodas\/"/);
  assert.match(frenchService, /href="\/es\/services\/bodas\/"/);
});

test("legacy English pages are absent and the general 404 is English", async () => {
  await assert.rejects(stat(new URL("en/index.html", distUrl)), { code: "ENOENT" });

  await expectMetadata("404.html", {
    lang: "en-CA",
    title: "Page not found — MOSAÏQUE ÉVÉNEMENTS",
    canonical: "/404/",
    alternates: { en: "/404/", es: "/es/404/", fr: "/fr/404/" },
    xDefault: "/404/",
  });
});
