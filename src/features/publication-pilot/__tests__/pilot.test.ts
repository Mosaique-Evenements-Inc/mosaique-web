import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  getCurrentTreeEvents,
  getPilotHomeSelection,
  validatePilotPublication,
} from "../adapter.ts";
import { pilotPublication, type PilotEvent, type PublicationSnapshot } from "../snapshot.ts";

const at = new Date("2026-01-15T12:00:00Z");

const makeEvent = (
  code: string,
  start: string,
  end: string,
  showInTree = true,
): PilotEvent => ({
  ...pilotPublication.events[0],
  code,
  start,
  end,
  showInTree,
});

const withTreeEvents = (events: PilotEvent[]): PublicationSnapshot => ({
  ...pilotPublication,
  events,
  home: { ...pilotPublication.home, eventCodes: [] },
  tree: { eventCodes: events.map((event) => event.code) },
});

test("pilot snapshot is complete, serializable, and keeps explicit media versions", () => {
  assert.doesNotThrow(() => validatePilotPublication(pilotPublication));
  assert.doesNotThrow(() => JSON.stringify(pilotPublication));
  const en = getPilotHomeSelection(pilotPublication, "en");
  const fr = getPilotHomeSelection(pilotPublication, "fr");

  assert.equal(en.services[0].title, "Celebrations");
  assert.equal(fr.events[0].title, "Le Brésil à la Coupe du monde 2026");
  assert.equal(en.events[0].mainImage.code, "nossa-copa-main");
  assert.equal(en.events[0].mainImage.version, pilotPublication.events[0].mainImage.version);
  assert.notEqual(en.events[0].mainImage.code, en.events[0].gallery[0].code);
});

test("pilot media versions are the SHA-256 of the approved repo assets", async () => {
  const sources = {
    "celebrations-main": "../../../assets/images/services/celebrations/main.jpg",
    "nossa-copa-main": "../../../assets/images/events/nossa-copa/main.jpg",
    "nossa-copa-92": "../../../assets/images/events/nossa-copa/NossaCopa-92.jpg",
  } as const;

  for (const media of pilotPublication.media) {
    const bytes = await readFile(
      new URL(sources[media.code as keyof typeof sources], import.meta.url),
    );
    assert.equal(createHash("sha256").update(bytes).digest("hex"), media.version);
  }
});

test("publication rejects missing main image, stale version, and incomplete locale", () => {
  const original = pilotPublication.events[0];
  const withoutMain = {
    ...pilotPublication,
    events: [{ ...original, mainImage: undefined }],
  } as unknown as PublicationSnapshot;
  assert.throws(() => validatePilotPublication(withoutMain), /explicit main image/);

  const staleMedia = {
    ...pilotPublication,
    events: [{ ...original, mainImage: { ...original.mainImage, version: "stale" } }],
  } satisfies PublicationSnapshot;
  assert.throws(() => validatePilotPublication(staleMedia), /media version/);

  const missingFrench = {
    ...pilotPublication,
    events: [{ ...original, locales: { ...original.locales, fr: { title: "", mainAlt: "" } } }],
  } satisfies PublicationSnapshot;
  assert.throws(() => validatePilotPublication(missingFrench), /Missing fr content/);
});

test("Tree includes future and current events, then excludes expired, disabled, and exact end", () => {
  const future = makeEvent("future", "2026-02-01T00:00:00Z", "2026-03-01T00:00:00Z");
  const current = makeEvent("current", "2026-01-01T00:00:00Z", "2026-02-01T00:00:00Z");
  const expired = makeEvent("expired", "2025-01-01T00:00:00Z", "2026-01-15T11:59:59Z");
  const disabled = makeEvent("disabled", "2026-01-01T00:00:00Z", "2026-02-01T00:00:00Z", false);
  const exactEnd = makeEvent("exact-end", "2026-01-01T00:00:00Z", at.toISOString());
  const snapshot = withTreeEvents([future, expired, disabled, exactEnd, current]);

  assert.deepEqual(
    getCurrentTreeEvents(snapshot, at).map((event) => event.code),
    ["current", "future"],
  );
});

test("Tree order uses start ascending and code as deterministic tie break", () => {
  const later = makeEvent("later", "2026-02-01T00:00:00Z", "2026-03-01T00:00:00Z");
  const b = makeEvent("b", "2026-01-01T00:00:00Z", "2026-03-01T00:00:00Z");
  const a = makeEvent("a", "2026-01-01T00:00:00Z", "2026-03-01T00:00:00Z");
  assert.deepEqual(
    getCurrentTreeEvents(withTreeEvents([later, b, a]), at).map((event) => event.code),
    ["a", "b", "later"],
  );
});

test("opted-in pilot build contains localized content and no CMS runtime bootstrap", async () => {
  const dist = new URL("../../../../dist/cms-pilot/", import.meta.url);
  if (process.env.CMS_PILOT !== "1") {
    await assert.rejects(readFile(new URL("en/index.html", dist)), { code: "ENOENT" });
    return;
  }
  for (const [locale, title] of [
    ["en", "Brazil at the 2026 World Cup"],
    ["es", "Brasil en el Mundial 2026"],
    ["fr", "Le Brésil à la Coupe du monde 2026"],
  ]) {
    const html = await readFile(new URL(`${locale}/index.html`, dist), "utf8");
    assert.ok(html.includes(title));
    assert.match(html, /data-publication-id="cms-01-static-pilot"/);
    assert.match(html, /data-media-version="[0-9a-f]{64}"/);
    assert.match(html, /<picture\b[^>]*>[\s\S]*?<source[^>]*type="image\/avif"/);
    assert.match(html, /\bsrcset="[^"]+"/);
    assert.doesNotMatch(html, /<astro-island|<script\b|\bfetch\s*\(/);
  }
});
