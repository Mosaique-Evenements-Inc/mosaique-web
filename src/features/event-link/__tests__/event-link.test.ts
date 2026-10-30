import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { supportedLocales } from "../../../core/i18n/config/locales.ts";
import { eventTranslations } from "../../events/i18n/index.ts";
import { amanteOAmigoEventLink } from "../data/amante-o-amigo.ts";
import { eventLinkLanguageNames, eventLinkTranslations } from "../i18n/index.ts";
import {
  getEventLinkGalleryDirectory,
  getLocalizedAmanteOAmigoEventLink,
  resolveEventLinkEvent,
} from "../selectors/index.ts";
import {
  getShareProviderUrl,
  isShareCancellation,
  resolveSharePayload,
} from "../ui/share/share-action.ts";

const canonicalEvent = {
  id: "event-slot-07",
  slug: "amante-o-amigo",
  title: "Amante o Amigo",
};

test("AOA resolves its existing Event identity without duplicating its slug or title", () => {
  assert.equal(amanteOAmigoEventLink.eventId, canonicalEvent.id);
  assert.equal(resolveEventLinkEvent(amanteOAmigoEventLink, [canonicalEvent]), canonicalEvent);
  assert.throws(() => resolveEventLinkEvent(amanteOAmigoEventLink, []), /Missing Event/);
  assert.equal(
    getLocalizedAmanteOAmigoEventLink("es", [canonicalEvent]).event.slug,
    canonicalEvent.slug,
  );
});

test("AOA keeps one approved upcoming edition and clean canonical destinations", () => {
  const { upcomingEdition, menuUrl, socialProfiles, pastEditions, sponsors } =
    amanteOAmigoEventLink;
  assert.deepEqual(
    {
      date: upcomingEdition.date,
      startTime: upcomingEdition.startTime,
      timezone: upcomingEdition.timezone,
      location: upcomingEdition.location,
      ticketUrl: upcomingEdition.ticketUrl,
    },
    {
      date: "2026-11-06",
      startTime: "19:00",
      timezone: "America/Toronto",
      location: { venue: "Lola Bar", city: "Montréal" },
      ticketUrl: "https://www.jasspass.com/event/amante-o-amigo",
    },
  );
  assert.equal(menuUrl, "https://mosaiqueevenements.com/es/menu/alfajores-fleur/");
  assert.deepEqual(socialProfiles, [
    {
      platform: "instagram",
      handle: "amanteoamigo.mtl",
      url: "https://www.instagram.com/amanteoamigo.mtl/",
    },
  ]);
  assert.deepEqual(pastEditions, []);
  assert.deepEqual(sponsors, []);
  assert.equal(amanteOAmigoEventLink.producer.id, "mosaique");
  assert.equal(amanteOAmigoEventLink.producer.logoAssetId, "mosaique-complete");
  assert.equal(amanteOAmigoEventLink.producer.href, "/");
});

test("EN, ES, and FR keep approved landing copy and distinct share sources", () => {
  const slogans = {
    en: "A night to meet, connect, and let yourself be surprised.",
    es: "Una noche para conocer, conectar y dejarte sorprender.",
    fr: "Une soirée pour faire des rencontres, créer des liens et se laisser surprendre.",
  };
  const producerLabels = {
    en: "Produced by MOSAÏQUE",
    es: "Producido por MOSAÏQUE",
    fr: "Produit par MOSAÏQUE",
  };

  for (const locale of supportedLocales) {
    const { config, copy, share, sharePayloads, upcoming, menuEntry, socials, producer } =
      getLocalizedAmanteOAmigoEventLink(locale, [canonicalEvent]);
    assert.equal(copy, eventLinkTranslations[locale][config.eventId]);
    assert.equal(copy.slogan, slogans[locale]);
    assert.equal(copy.labels.producedBy, producerLabels[locale]);
    assert.equal(producer.id, config.producer.id);
    assert.equal(producer.logoAssetId, config.producer.logoAssetId);
    assert.equal(producer.href, config.producer.href);
    assert.equal(producer.label, producerLabels[locale]);
    assert.equal("location" in producer, false);
    assert.ok(copy.landingDescription);
    assert.equal(share.upcoming.startTime, config.upcomingEdition.startTime);
    assert.equal(share.upcoming.location, config.upcomingEdition.location);
    assert.equal(share.upcoming.ticketUrl, config.upcomingEdition.ticketUrl);
    assert.equal(share.landing.slug, canonicalEvent.slug);
    assert.equal("ticketUrl" in share.landing, false);
    assert.equal("slug" in share.upcoming, false);
    assert.deepEqual(sharePayloads.event, {
      title: "Amante o Amigo ❤️",
      text: `${{ en: "November 6 · 7:00 PM", es: "6 de noviembre · 7:00 PM", fr: "6 novembre · 19 h" }[locale]}\nLola Bar\n${copy.slogan}\n${copy.share.ticketPrefix} https://www.jasspass.com/event/amante-o-amigo`,
      url: "https://www.jasspass.com/event/amante-o-amigo",
    });
    assert.deepEqual(sharePayloads.landing, {
      title: "Amante o Amigo ❤️",
      text: `${copy.slogan}\n${copy.share.landingInvitation}`,
      slug: canonicalEvent.slug,
    });
    assert.equal(upcoming.title, canonicalEvent.title);
    assert.equal(
      upcoming.description,
      eventTranslations[locale][canonicalEvent.id].description,
    );
    assert.equal(menuEntry.href, config.menuUrl);
    assert.equal(menuEntry.label, copy.labels.menuAction);
    assert.deepEqual(socials, [
      {
        platform: "instagram",
        handle: "amanteoamigo.mtl",
        displayHandle: "@amanteoamigo.mtl",
        url: "https://www.instagram.com/amanteoamigo.mtl/",
      },
    ]);
  }
});

test("share providers encode approved Unicode text and preserve each payload URL", () => {
  assert.equal(isShareCancellation(new DOMException("Cancelled", "AbortError")), true);
  assert.equal(isShareCancellation(new Error("Network error")), false);
  const event = getLocalizedAmanteOAmigoEventLink("fr", [canonicalEvent]).sharePayloads.event;
  const landing = resolveSharePayload(
    { title: "Amante o Amigo ❤️", text: "Découvrez l’expérience.", url: "/fr/amante-o-amigo/" },
    "https://example.test",
  );
  assert.equal(landing.url, "https://example.test/fr/amante-o-amigo/");
  assert.equal(
    new URL(getShareProviderUrl("facebook", event)).searchParams.get("u"),
    event.url,
  );
  assert.equal(
    new URL(getShareProviderUrl("linkedin", landing)).searchParams.get("url"),
    landing.url,
  );
  assert.equal(
    new URL(getShareProviderUrl("whatsapp", event)).searchParams
      .get("text")
      ?.match(/https:\/\/www\.jasspass\.com\/event\/amante-o-amigo/g)?.length,
    1,
  );
  assert.ok(
    new URL(getShareProviderUrl("whatsapp", event)).searchParams
      .get("text")
      ?.includes("❤️\n6 novembre · 19 h\nLola Bar"),
  );
  assert.equal(
    new URL(getShareProviderUrl("x", landing)).searchParams.get("text"),
    `${landing.title}\n${landing.text}\n${landing.url}`,
  );
  const email = new URL(getShareProviderUrl("email", landing));
  assert.equal(email.protocol, "mailto:");
  assert.equal(email.searchParams.get("subject"), landing.title);
  assert.equal(
    email.searchParams.get("body"),
    `${landing.title}\n${landing.text}\n${landing.url}`,
  );
});

test("gallery directory exposes an honest empty state with no approved AOA editions", () => {
  for (const locale of supportedLocales) {
    const content = getLocalizedAmanteOAmigoEventLink(locale, [canonicalEvent]);
    assert.deepEqual(content.config.pastEditions, []);
    assert.deepEqual(content.galleryDirectory.editions, []);
    assert.equal(content.galleryDirectory.sectionLabel, content.copy.labels.photoGallery);
    assert.equal(content.galleryDirectory.directoryLabel, content.copy.labels.photoGallery);
    assert.equal(content.galleryDirectory.statusLabel, content.copy.labels.galleryEmpty);
    assert.deepEqual(
      getEventLinkGalleryDirectory(locale, [], content.copy),
      content.galleryDirectory,
    );
  }
});

test("gallery directory prepares singular and plural counts without image data", () => {
  const fixtures = [
    {
      id: "edition-test-01",
      date: "2026-10-01",
      galleryUrl: "/gallery/test-edition-01",
    },
    {
      id: "edition-test-02",
      galleryUrl: "https://gallery.example.test/edition-02",
    },
    {
      id: "edition-test-03",
      date: "2026-09-01",
      galleryUrl: "/gallery/test-edition-03",
    },
  ] as const;
  const galleryCounts = {
    en: ["1 gallery available", "2 galleries available", "3 galleries available"],
    es: ["1 galería disponible", "2 galerías disponibles", "3 galerías disponibles"],
    fr: ["1 galerie disponible", "2 galeries disponibles", "3 galeries disponibles"],
  } as const;

  for (const locale of supportedLocales) {
    const copy = {
      ...eventLinkTranslations[locale]["event-slot-07"],
      pastEditions: {
        "edition-test-01": { title: `Test Edition One ${locale}` },
        "edition-test-02": { title: `Test Edition Two ${locale}` },
        "edition-test-03": { title: `Test Edition Three ${locale}` },
      },
    };
    const one = getEventLinkGalleryDirectory(locale, fixtures.slice(0, 1), copy);
    const two = getEventLinkGalleryDirectory(locale, fixtures.slice(0, 2), copy);
    const three = getEventLinkGalleryDirectory(locale, fixtures, copy);
    assert.ok(one);
    assert.ok(two);
    assert.ok(three);
    assert.equal(one.sectionLabel, copy.labels.photoGallery);
    assert.equal(one.directoryLabel, copy.labels.photoGallery);
    assert.equal(one.statusLabel, galleryCounts[locale][0]);
    assert.equal(two.statusLabel, galleryCounts[locale][1]);
    assert.equal(three.statusLabel, galleryCounts[locale][2]);
    assert.deepEqual(
      three.editions.map(({ id, galleryUrl }) => ({ id, galleryUrl })),
      fixtures.map(({ id, galleryUrl }) => ({ id, galleryUrl })),
    );
    assert.equal(three.editions[0].title, `Test Edition One ${locale}`);
    assert.ok(three.editions[0].dateLabel);
    assert.equal(three.editions[1].date, undefined);
    assert.equal(three.editions[1].dateLabel, undefined);
    assert.equal(new Set(three.editions.map(({ galleryUrl }) => galleryUrl)).size, 3);
    assert.ok(
      three.editions.every(
        (edition) => !/image|lightbox|cover/.test(Object.keys(edition).join(" ")),
      ),
    );
    assert.throws(
      () => getEventLinkGalleryDirectory(locale, fixtures, { ...copy, pastEditions: {} }),
      /Missing Event Link past-edition title/,
    );
  }
});

test("the three localized Event Link pages render the shell and inherited SEO metadata", () => {
  const dist = new URL("../../../../dist/", import.meta.url);
  const routes = [
    {
      locale: "en-CA",
      path: "/amante-o-amigo/",
      activeLocale: "en",
      copy: eventLinkTranslations.en["event-slot-07"],
      dateLabel: "November 6, 2026",
      timeLabel: "7:00 p.m.",
    },
    {
      locale: "es",
      path: "/es/amante-o-amigo/",
      activeLocale: "es",
      copy: eventLinkTranslations.es["event-slot-07"],
      dateLabel: "6 de noviembre de 2026",
      timeLabel: "19:00",
    },
    {
      locale: "fr-CA",
      path: "/fr/amante-o-amigo/",
      activeLocale: "fr",
      copy: eventLinkTranslations.fr["event-slot-07"],
      dateLabel: "6 novembre 2026",
      timeLabel: "19 h 00",
    },
  ] as const;

  for (const { locale, path, activeLocale, copy, dateLabel, timeLabel } of routes) {
    const html = readFileSync(new URL(`${path.slice(1)}index.html`, dist), "utf8");
    assert.match(html, new RegExp(`<html lang="${locale}"`));
    assert.match(html, /<title>Amante o Amigo<\/title>/);
    assert.ok(html.includes(`content="${copy.landingDescription}"`));
    assert.ok(html.includes(`>${copy.slogan}</p>`));
    assert.ok(html.includes(`>${copy.landingDescription}</p>`));
    assert.ok(html.includes('class="event-link-page"'));
    assert.ok(html.includes('class="event-link-page__sheet"'));
    assert.match(html, /<img\b[^>]*\balt(?:="")?(?:\s|>)[^>]*class="event-link-page__logo"/);
    assert.ok(html.includes('id="main-content"'));
    assert.ok(html.includes('<h1 class="event-link-page__title">Amante o Amigo</h1>'));
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.ok(!html.includes("<astro-island"));

    const eventsSection = html.match(
      /<section class="event-link-section event-link-events"[\s\S]*?<\/section>/,
    )?.[0];
    assert.ok(eventsSection, `${path}: missing events section`);
    assert.ok(
      eventsSection.includes(
        `<h2 id="event-link-events-title" class="event-link-section-heading">${copy.labels.eventsHeading}</h2>`,
      ),
    );
    assert.match(eventsSection, /<details class="event-link-events__category" open>/);
    assert.ok(eventsSection.includes(`>${copy.labels.socialEvents}</strong>`));
    assert.ok(eventsSection.includes(`1 ${copy.labels.eventAvailableSingular}`));
    const categorySummary = eventsSection.match(
      /<details class="event-link-events__category" open><summary>[\s\S]*?<\/summary>/,
    )?.[0];
    assert.ok(categorySummary);
    assert.match(categorySummary, /class="event-link-events__icon"[^>]*><svg\b/);
    assert.doesNotMatch(categorySummary, /<img\b/);
    const upcoming = eventsSection.match(
      /<details class="event-link-upcoming">[\s\S]*?<\/details>/,
    )?.[0];
    assert.ok(upcoming, `${path}: missing compact event disclosure`);
    assert.match(upcoming, /<summary class="event-link-upcoming__summary">/);
    const eventSummary = upcoming.match(
      /<summary class="event-link-upcoming__summary">[\s\S]*?<\/summary>/,
    )?.[0];
    assert.ok(eventSummary);
    assert.match(eventSummary, /class="event-link-upcoming__logo" aria-hidden="true"/);
    assert.match(eventSummary, /<img\b[^>]*aoa_logo[^>]*\balt(?:="")?(?:\s|>)/);
    assert.ok(upcoming.includes(`<strong>${canonicalEvent.title}</strong>`));
    assert.ok(upcoming.includes(dateLabel));
    assert.ok(upcoming.includes(timeLabel));
    assert.ok(upcoming.includes("Lola Bar"));
    assert.ok(
      upcoming.indexOf("event-link-upcoming__summary") <
        upcoming.indexOf("event-link-upcoming__visual"),
    );
    assert.ok(upcoming.includes(`>${copy.labels.upcomingEvent}</p>`));
    assert.ok(
      upcoming.includes(`<h3 class="event-link-upcoming__title">${canonicalEvent.title}</h3>`),
    );
    assert.ok(
      upcoming.includes(eventTranslations[activeLocale][canonicalEvent.id].description),
    );
    assert.match(upcoming, /<picture\b[\s\S]*?<source\b[^>]*\.avif/);
    assert.match(upcoming, /<img\b[^>]*\.webp/);
    assert.ok(
      upcoming.includes(
        eventTranslations[activeLocale][canonicalEvent.id].media?.featuredAlt ?? "",
      ),
    );
    assert.match(upcoming, /<time datetime="2026-11-06">/);
    assert.match(upcoming, /<time datetime="19:00">/);
    assert.ok(upcoming.includes(dateLabel));
    assert.ok(upcoming.includes(timeLabel));
    assert.doesNotMatch(upcoming, /November 5|5 de noviembre|5 novembre/);
    assert.ok(upcoming.includes("Lola Bar"));
    assert.ok(upcoming.includes("Montréal"));
    assert.match(
      upcoming,
      /href="https:\/\/www\.jasspass\.com\/event\/amante-o-amigo" target="_blank" rel="noopener noreferrer"/,
    );
    assert.ok(upcoming.includes(copy.labels.ticketAction));
    assert.ok(upcoming.includes(copy.labels.opensNewTab));
    assert.match(
      upcoming,
      /<div class="event-link-upcoming__actions">[\s\S]*?class="event-link-upcoming__ticket"[\s\S]*?class="event-link-share event-link-share--icon-only"/,
    );
    assert.ok(upcoming.includes(`class="visually-hidden">${copy.labels.eventShare}</span>`));
    assert.doesNotMatch(upcoming, /instagram|sponsor|menu/i);

    const shareRoots = [
      ...html.matchAll(
        /<div class="event-link-share event-link-share--icon-only"[\s\S]*?<\/dialog><\/div>/g,
      ),
    ].map(([root]) => root);
    assert.equal(shareRoots.length, 2);
    const [globalShare, eventShare] = shareRoots;
    for (const [root, id] of [
      [globalShare, "share-event-link-page"],
      [eventShare, "share-upcoming-event"],
    ] as const) {
      assert.match(root, new RegExp(`aria-controls="${id}-dialog"`));
      assert.match(root, new RegExp(`<dialog id="${id}-dialog"`));
      assert.match(root, new RegExp(`aria-labelledby="${id}-title"`));
      assert.match(root, /<button type="button" class="event-link-share__trigger"/);
      assert.match(root, /<button type="button" class="event-link-share__close"/);
      assert.match(root, /<button type="button" class="event-link-share__copy"/);
      assert.ok(root.includes(`>${copy.labels.shareDialogTitle}</h2>`));
      assert.ok(root.includes(`>${copy.labels.shareVia}</p>`));
      assert.match(root, /<img[^>]*alt(?:\s|=)[^>]*class="event-link-share__preview-logo"/);
      assert.ok(
        root.includes(
          `<strong class="event-link-share__preview-title">${canonicalEvent.title}</strong>`,
        ),
      );
      assert.equal([...root.matchAll(/class="event-link-share__provider-icon"/g)].length, 6);
      assert.equal([...root.matchAll(/data-share-provider=/g)].length, 5);
      assert.match(root, /<li hidden data-share-native-option>/);
    }
    assert.ok(html.indexOf(globalShare) < html.indexOf(upcoming));
    assert.ok(html.indexOf(globalShare) < html.indexOf(eventsSection));
    assert.ok(
      globalShare.includes(`class="visually-hidden">${copy.labels.landingShare}</span>`),
    );
    assert.ok(upcoming.includes(eventShare));
    assert.ok(eventShare.includes(dateLabel));
    assert.ok(eventShare.includes(timeLabel));
    assert.ok(eventShare.includes("Lola Bar · Montréal"));
    assert.ok(eventShare.includes(copy.labels.ticketAction));
    assert.ok(eventShare.includes("www.jasspass.com/event/amante-o-amigo"));
    assert.doesNotMatch(globalShare, /Lola Bar|jasspass|event-link-share__preview-details/i);
    const parsePayload = (root: string) =>
      JSON.parse(
        root
          .match(/data-payload="([^"]+)"/)?.[1]
          ?.replaceAll("&quot;", '"')
          .replaceAll("&amp;", "&") ?? "null",
      );
    const eventPayload = parsePayload(eventShare);
    const globalPayload = parsePayload(globalShare);
    assert.equal(eventPayload.url, "https://www.jasspass.com/event/amante-o-amigo");
    assert.equal(
      globalPayload.url,
      process.env.SITE_URL ? new URL(path, process.env.SITE_URL).href : path,
    );
    assert.doesNotMatch(globalPayload.text, /Lola Bar|JassPass|noviembre|November|novembre/);
    assert.equal(
      [...html.matchAll(/id="share-(?:event-link-page|upcoming-event)-dialog"/g)].length,
      2,
    );

    const menuEntry = html.match(/<a class="event-link-menu-entry"[\s\S]*?<\/a>/)?.[0];
    assert.ok(menuEntry, `${path}: missing menu entry`);
    assert.equal([...html.matchAll(/<a class="event-link-menu-entry"/g)].length, 1);
    assert.match(
      menuEntry,
      /href="https:\/\/mosaiqueevenements\.com\/es\/menu\/alfajores-fleur\/"/,
    );
    assert.ok(menuEntry.includes(`>${copy.labels.menuAction}</span>`));
    assert.doesNotMatch(menuEntry, /target=|role=|onclick=|aria-disabled=/);
    assert.ok(menuEntry.includes('aria-hidden="true"'));
    assert.ok(html.indexOf(menuEntry) > html.indexOf(upcoming));
    const menuSection = html.match(
      /<section class="event-link-section event-link-menu"[\s\S]*?<\/section>/,
    )?.[0];
    assert.ok(menuSection, `${path}: missing menu section`);
    assert.ok(
      menuSection.includes(
        `<h2 id="event-link-menu-title" class="event-link-section-heading">${copy.labels.menuHeading}</h2>`,
      ),
    );
    assert.ok(menuSection.includes(menuEntry));
    assert.match(
      menuEntry,
      /class="event-link-menu-entry__icon" aria-hidden="true"[^>]*><svg\b/,
    );

    const gallerySection = html.match(
      /<section class="event-link-section event-link-gallery-directory"[\s\S]*?<\/section>/,
    )?.[0];
    assert.ok(gallerySection, `${path}: missing empty gallery section`);
    assert.ok(
      gallerySection.includes(
        `<h2 id="event-link-gallery-directory-title" class="event-link-section-heading">${copy.labels.photoGallery}</h2>`,
      ),
    );
    assert.ok(gallerySection.includes(`<strong>${copy.labels.photoGallery}</strong>`));
    assert.ok(gallerySection.includes(copy.labels.galleryEmpty));
    assert.match(
      gallerySection,
      /class="event-link-gallery-directory__empty-card event-link-gallery-directory__card"/,
    );
    assert.doesNotMatch(gallerySection, /<details\b|<summary\b|<a\b|<button\b|edition-test-0/);
    assert.ok(html.indexOf(eventsSection) < html.indexOf(menuSection));
    assert.ok(html.indexOf(menuSection) < html.indexOf(gallerySection));

    const socialSection = html.match(
      /<section class="event-link-section event-link-socials"[\s\S]*?<\/section>/,
    )?.[0];
    assert.ok(socialSection, `${path}: missing social section`);
    assert.ok(
      socialSection.includes(
        `<h2 id="event-link-socials-title" class="event-link-section-heading">${copy.labels.socialMedia}</h2>`,
      ),
    );
    assert.equal([...socialSection.matchAll(/<a\b/g)].length, 1);
    assert.match(
      socialSection,
      /<a class="event-link-socials__link" href="https:\/\/www\.instagram\.com\/amanteoamigo\.mtl\/" target="_blank" rel="noopener noreferrer">/,
    );
    assert.ok(socialSection.includes("Instagram"));
    assert.ok(socialSection.includes("@amanteoamigo.mtl"));
    assert.ok(socialSection.includes(`(${copy.labels.opensNewTab})`));
    assert.ok(socialSection.includes('aria-hidden="true"'));
    assert.doesNotMatch(
      socialSection,
      /vrfl|utm_source|tiktok|facebook|youtube|<button\b|role="button"/i,
    );
    assert.ok(html.indexOf(socialSection) > html.indexOf(gallerySection));

    const producerBlock = html.match(
      /<footer class="event-link-produced-by">[\s\S]*?<\/footer>/,
    )?.[0];
    assert.ok(producerBlock, `${path}: missing producer attribution`);
    assert.equal([...html.matchAll(/<footer class="event-link-produced-by">/g)].length, 1);
    assert.ok(producerBlock.includes(`>${copy.labels.producedBy}</span>`));
    assert.ok(
      producerBlock.includes(`href="${{ en: "/", es: "/es/", fr: "/fr/" }[activeLocale]}"`),
    );
    assert.match(
      producerBlock,
      /<img\b[^>]*src="[^"]*mosaique_logo_complete[^"]*\.webp"[^>]*\balt(?:="")?(?:\s|>)/,
    );
    assert.doesNotMatch(producerBlock, /Montréal, Québec/);
    assert.doesNotMatch(producerBlock, /target=|rel=|sponsor|<h[1-6]\b/i);
    assert.ok(html.indexOf(producerBlock) > html.indexOf(socialSection));

    const languageControl = html.match(
      /<nav class="event-link-page__languages"[^>]*>[\s\S]*?<\/nav>/,
    )?.[0];
    assert.ok(languageControl, `${path}: missing visible language control`);
    assert.ok(languageControl.includes(`aria-label="${copy.labels.languages}"`));
    const links = [...languageControl.matchAll(/<a\b[^>]*>[^<]*<\/a>/g)].map(([link]) => link);
    assert.equal(links.length, 3);
    for (const [index, target] of routes.entries()) {
      const link = links[index];
      assert.ok(link.includes(`href="${target.path}"`));
      assert.ok(link.includes(`lang="${target.locale}"`));
      assert.ok(link.includes(`hreflang="${target.locale}"`));
      assert.ok(link.includes(`aria-label="${eventLinkLanguageNames[target.activeLocale]}"`));
      assert.ok(link.includes(`>${target.activeLocale.toUpperCase()}</a>`));
      assert.equal(link.includes('aria-current="page"'), target.activeLocale === activeLocale);
    }

    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
    assert.ok(main);
    assert.doesNotMatch(main, /event-link-sponsor/);
    assert.equal([...main.matchAll(/<details\b/g)].length, 2);
    assert.doesNotMatch(html, /Test Edition|edition-test-0/);

    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical);
    assert.equal(new URL(canonical, "https://mosaique.local").pathname, path);

    for (const { language, alternatePath } of [
      { language: "en-CA", alternatePath: "/amante-o-amigo/" },
      { language: "es", alternatePath: "/es/amante-o-amigo/" },
      { language: "fr-CA", alternatePath: "/fr/amante-o-amigo/" },
      { language: "x-default", alternatePath: "/amante-o-amigo/" },
    ]) {
      const alternate = html.match(
        new RegExp(`<link rel="alternate" hreflang="${language}" href="([^"]+)"`),
      )?.[1];
      assert.ok(alternate, `${path}: missing ${language} alternate`);
      assert.equal(new URL(alternate, "https://mosaique.local").pathname, alternatePath);
    }
  }

  assert.equal(existsSync(new URL("en/amante-o-amigo/index.html", dist)), false);
  assert.equal(existsSync(new URL("events/amante-o-amigo/index.html", dist)), true);
  assert.equal(existsSync(new URL("es/menu/alfajores-fleur/index.html", dist)), true);
  assert.equal(existsSync(new URL("tree/index.html", dist)), true);
});

test("empty AOA sponsors produce no visible, accessible, or SEO markup in any locale", () => {
  assert.deepEqual(amanteOAmigoEventLink.sponsors, []);
  const dist = new URL("../../../../dist/", import.meta.url);

  for (const path of ["amante-o-amigo", "es/amante-o-amigo", "fr/amante-o-amigo"]) {
    const html = readFileSync(new URL(`${path}/index.html`, dist), "utf8");
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
    assert.ok(main, `${path}: missing main content`);
    assert.doesNotMatch(
      main,
      /sponsors?|patrocinadores?|commanditaires?|coming soon|próximamente|bientôt|test sponsor/i,
    );
    assert.doesNotMatch(html, /"sponsor"\s*:|"@type"\s*:\s*"Sponsor"|sponsor-test-/i);
    assert.equal([...main.matchAll(/<footer class="event-link-produced-by">/g)].length, 1);
  }
});
