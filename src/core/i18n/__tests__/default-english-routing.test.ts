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
      path: "services/synthetic-service/index.html",
      lang: "en-CA",
      title: "Service en",
      canonical: "/services/synthetic-service/",
      alternates: {
        en: "/services/synthetic-service/",
        es: "/es/services/synthetic-service/",
        fr: "/fr/services/synthetic-service/",
      },
      xDefault: "/services/synthetic-service/",
    },
    {
      path: "es/events/synthetic-event/index.html",
      lang: "es",
      title: "Event es",
      canonical: "/es/events/synthetic-event/",
      alternates: {
        en: "/events/synthetic-event/",
        es: "/es/events/synthetic-event/",
        fr: "/fr/events/synthetic-event/",
      },
      xDefault: "/events/synthetic-event/",
    },
    {
      path: "fr/gallery/celebration/index.html",
      lang: "fr-CA",
      title: "Célébration — Galerie des événements réalisés — MOSAÏQUE EVENTS",
      canonical: "/fr/gallery/celebration/",
      alternates: {
        en: "/gallery/celebration/",
        es: "/es/gallery/celebration/",
        fr: "/fr/gallery/celebration/",
      },
      xDefault: "/gallery/celebration/",
    },
  ] as const;

  for (const page of cases) {
    await expectMetadata(page.path, page);
  }

  const englishService = await readBuiltPage("services/synthetic-service/index.html");
  assert.match(englishService, /href="\/es\/services\/synthetic-service\/"/);
  assert.match(englishService, /href="\/fr\/services\/synthetic-service\/"/);

  const spanishService = await readBuiltPage("es/services/synthetic-service/index.html");
  assert.match(spanishService, /href="\/services\/synthetic-service\/"/);
  assert.match(spanishService, /href="\/fr\/services\/synthetic-service\/"/);

  const frenchService = await readBuiltPage("fr/services/synthetic-service/index.html");
  assert.match(frenchService, /href="\/services\/synthetic-service\/"/);
  assert.match(frenchService, /href="\/es\/services\/synthetic-service\/"/);
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
