import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import process from "node:process";
import { readFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const locales = ["en", "es", "fr"];
const hashPattern = /^[0-9a-f]{64}$/;
const assetPattern = /^\/_cms\/assets\/([0-9a-f]{64})\.(avif|webp|gif)$/;
const instantPattern = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/;
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fail = (reason) => {
  throw new Error(`CMS publication input: ${reason}`);
};
const nonempty = (value, name) => {
  if (typeof value !== "string" || !value.trim() || value !== value.trim())
    fail(`missing ${name}`);
  return value;
};
const instant = (value, name) => {
  if (
    typeof value !== "string" ||
    !instantPattern.test(value) ||
    Number.isNaN(Date.parse(value))
  )
    fail(`invalid ${name}`);
  return value;
};
const localeValue = (record, fields, name) => {
  for (const locale of locales) {
    const item = record?.[locale];
    if (!item || typeof item !== "object") fail(`missing ${name}.${locale}`);
    for (const field of fields) nonempty(item[field], `${name}.${locale}.${field}`);
  }
};

const fixture = () => {
  const bytes = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64",
  );
  const digest = sha256(bytes);
  const path = `/_cms/assets/${digest}.gif`;
  const derivative = {
    assetPosition: 0,
    variantKind: "ANIMATED_GIF",
    profile: "cms03-v1-sharp0353",
    format: "gif",
    mime: "image/gif",
    width: 1,
    height: 1,
    byteSize: bytes.length,
    sha256: digest,
  };
  const media = (usage, decorative = false) => ({
    usage,
    mediaCode: "MED-00000001",
    mediaVersion: 1,
    decorative,
    alt: decorative
      ? null
      : { en: "Synthetic image", es: "Imagen sintética", fr: "Image synthétique" },
    layout: null,
    galleryPosition: null,
    derivatives: [derivative],
  });
  const localized = (title) =>
    Object.fromEntries(
      locales.map((locale) => [
        locale,
        {
          title: `${title} ${locale}`,
          description: `${title} ${locale}`,
          idealFor: `${title} ${locale}`,
          ctaLabel: `${title} ${locale}`,
          seoTitle: `${title} ${locale}`,
          seoDescription: `${title} ${locale}`,
        },
      ]),
    );
  const home = Object.fromEntries(
    locales.map((locale) => [
      locale,
      {
        seoTitle: `Mosaïque ${locale}`,
        seoDescription: `Synthetic Home ${locale}`,
        heroOverlay: `Synthetic overlay ${locale}`,
        heroCtaLabel: `Contact ${locale}`,
        eventsTitle: `Events ${locale}`,
        eventsIntroduction: `Events introduction ${locale}`,
        eventsCtaLabel: `Gallery ${locale}`,
        servicesTitle: `Services ${locale}`,
        servicesText: `Services introduction ${locale}`,
        marqueeText: `Mosaïque ${locale}`,
        marqueeStatement: `Statement ${locale}`,
        processTitle: `Process ${locale}`,
        processIntroduction: `Process introduction ${locale}`,
        processClosing: `Process closing ${locale}`,
        faqEyebrow: `FAQ ${locale}`,
        faqTitle: `Questions ${locale}`,
        faqPrompt: `Contact us ${locale}`,
        faqCtaLabel: `Contact ${locale}`,
        finalCtaTitle: `Final ${locale}`,
        finalCtaText: `Final text ${locale}`,
        finalCtaLabel: `Contact ${locale}`,
        heroSegments: [{ text: `Mosaïque ${locale}`, emphasis: false }],
        processSteps: [{ title: `Step ${locale}`, description: `Step text ${locale}` }],
        faqItems: [{ question: `Question ${locale}`, answer: `Answer ${locale}` }],
      },
    ]),
  );
  const now = "2026-09-29T12:00:00.000000Z";
  const snapshot = {
    schemaVersion: "cms-publication-v1",
    code: "PUB-00000001",
    asOf: now,
    nextExpiration: "2026-10-01T12:00:00.000000Z",
    home: { revision: 1, locales: home, events: [{ code: "PEV-00000001", revision: 1 }] },
    services: [
      {
        code: "SVC-00000001",
        revision: 1,
        slug: "synthetic-service",
        lifecycle: "ACTIVE",
        displayOrder: 1,
        locales: localized("Service"),
        mainImage: media("SERVICE:SVC-00000001:MAIN"),
        gallery: [],
      },
    ],
    websiteEvents: [
      {
        code: "PEV-00000001",
        revision: 1,
        slug: "synthetic-event",
        lifecycle: "ACTIVE",
        categoryId: "celebration",
        collaboration: false,
        displayOrder: 1,
        relatedService: { code: "SVC-00000001", revision: 1 },
        locales: localized("Event"),
        mainImage: media("EVENT:PEV-00000001:MAIN"),
        gallery: [
          {
            ...media("EVENT:PEV-00000001:GALLERY:1", true),
            galleryPosition: 1,
            layout: "full-landscape",
          },
        ],
      },
    ],
    currentEvents: [
      {
        code: "CEV-00000001",
        revision: 1,
        lifecycle: "ACTIVE",
        start: "2026-09-30T12:00:00.000000Z",
        end: "2026-10-01T12:00:00.000000Z",
        locales: Object.fromEntries(
          locales.map((locale) => [locale, { title: `Future event ${locale}` }]),
        ),
      },
      {
        code: "CEV-00000002",
        revision: 1,
        lifecycle: "ACTIVE",
        start: "2026-09-20T12:00:00.000000Z",
        end: "2026-09-28T12:00:00.000000Z",
        locales: Object.fromEntries(
          locales.map((locale) => [locale, { title: `Expired event ${locale}` }]),
        ),
      },
    ],
  };
  return {
    publicationCode: snapshot.code,
    snapshotHash: "a".repeat(64),
    webSha: "b".repeat(40),
    technicalAsOf: now,
    snapshot,
    assets: [
      { path, sha256: digest, mime: "image/gif", width: 1, height: 1, byteSize: bytes.length },
    ],
    usages: [
      { usage: "SERVICE:SVC-00000001:MAIN", position: 0, path },
      { usage: "EVENT:PEV-00000001:MAIN", position: 0, path },
      { usage: "EVENT:PEV-00000001:GALLERY:1", position: 0, path },
    ],
    fixtureBytes: { [path]: bytes.toString("base64") },
  };
};

const load = () => {
  if (process.env.CMS_PUBLICATION_MODE === "fixture") {
    if (process.env.CMS_PUBLICATION_INPUT)
      fail("fixture mode cannot be combined with a production input");
    return { input: fixture(), sourceDirectory: null };
  }
  if (process.env.CMS_PUBLICATION_MODE && process.env.CMS_PUBLICATION_MODE !== "publication")
    fail("unsupported build mode");
  const path = process.env.CMS_PUBLICATION_INPUT;
  if (!path) fail("CMS_PUBLICATION_INPUT is required for a publication build");
  if (!isAbsolute(path)) fail("CMS_PUBLICATION_INPUT must be an absolute path");
  const absolute = resolve(path);
  const input = JSON.parse(readFileSync(absolute, "utf8"));
  if ("fixtureBytes" in input) fail("fixture bytes are not valid in authoritative input");
  if (
    execFileSync("git", ["status", "--porcelain", "--untracked-files=normal"], {
      encoding: "utf8",
    }).trim()
  )
    fail("publication build requires a clean Web checkout");
  const checkoutSha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  if (input.webSha !== checkoutSha) fail("Web SHA does not match the checked-out commit");
  return { input, sourceDirectory: dirname(absolute) };
};

const loaded = load();
export const publicationInput = loaded.input;
export const publicationSourceDirectory = loaded.sourceDirectory;
export const publicationMode = "cms";

export const validatePublicationInput = (input) => {
  if (!input) return;
  const { snapshot, publicationCode, snapshotHash, webSha, technicalAsOf, assets, usages } =
    input;
  if (
    !snapshot ||
    snapshot.schemaVersion !== "cms-publication-v1" ||
    !/^PUB-[0-9]{8}$/.test(snapshot.code) ||
    snapshot.code !== publicationCode ||
    !hashPattern.test(snapshotHash) ||
    !/^[0-9a-f]{40}$/.test(webSha)
  )
    fail("invalid identity");
  instant(technicalAsOf, "technicalAsOf");
  instant(snapshot.asOf, "snapshot.asOf");
  if (
    !Array.isArray(assets) ||
    !Array.isArray(usages) ||
    !Number.isInteger(snapshot.home?.revision) ||
    snapshot.home.revision < 1 ||
    !Array.isArray(snapshot.home?.events) ||
    !Array.isArray(snapshot.services) ||
    !Array.isArray(snapshot.websiteEvents) ||
    !Array.isArray(snapshot.currentEvents)
  )
    fail("invalid collections");
  localeValue(
    snapshot.home?.locales,
    [
      "seoTitle",
      "seoDescription",
      "heroOverlay",
      "heroCtaLabel",
      "eventsTitle",
      "eventsIntroduction",
      "eventsCtaLabel",
      "servicesTitle",
      "servicesText",
      "marqueeText",
      "marqueeStatement",
      "processTitle",
      "processIntroduction",
      "processClosing",
      "faqEyebrow",
      "faqTitle",
      "faqPrompt",
      "faqCtaLabel",
      "finalCtaTitle",
      "finalCtaText",
      "finalCtaLabel",
    ],
    "home.locales",
  );
  for (const locale of locales) {
    const home = snapshot.home.locales[locale];
    if (
      !Array.isArray(home.heroSegments) ||
      !home.heroSegments.length ||
      !Array.isArray(home.processSteps) ||
      !Array.isArray(home.faqItems)
    )
      fail("invalid Home arrays");
    for (const segment of home.heroSegments) nonempty(segment.text, "hero segment");
    for (const step of home.processSteps) {
      nonempty(step.title, "process title");
      nonempty(step.description, "process description");
    }
    for (const item of home.faqItems) {
      nonempty(item.question, "faq question");
      nonempty(item.answer, "faq answer");
    }
  }
  const assetPaths = new Map();
  for (const asset of assets) {
    const match = assetPattern.exec(asset.path);
    if (
      !match ||
      match[1] !== asset.sha256 ||
      assetPaths.has(asset.path) ||
      asset.mime !== `image/${match[2]}` ||
      !Number.isInteger(asset.width) ||
      asset.width < 1 ||
      !Number.isInteger(asset.height) ||
      asset.height < 1 ||
      !Number.isInteger(asset.byteSize) ||
      asset.byteSize < 1 ||
      asset.byteSize > 26_214_400
    )
      fail("invalid public asset");
    assetPaths.set(asset.path, asset);
  }
  const usePaths = new Map();
  for (const usage of usages) {
    if (!assetPaths.has(usage.path) || !Number.isInteger(usage.position) || usage.position < 0)
      fail("invalid usage path");
    const key = `${usage.usage}:${usage.position}`;
    if (usePaths.has(key)) fail("duplicate usage");
    usePaths.set(key, usage.path);
  }
  const checkMedia = (media) => {
    if (
      !media ||
      !/^MED-[0-9]{8}$/.test(media.mediaCode) ||
      !Number.isInteger(media.mediaVersion) ||
      media.mediaVersion < 1 ||
      !Array.isArray(media.derivatives) ||
      !media.derivatives.length
    )
      fail("missing media derivatives");
    if (media.decorative) {
      if (media.alt !== null) fail("decorative alt must be null");
    } else
      localeValue(
        Object.fromEntries(locales.map((locale) => [locale, { alt: media.alt?.[locale] }])),
        ["alt"],
        "media.alt",
      );
    const positions = new Set();
    for (const derivative of media.derivatives) {
      if (positions.has(derivative.assetPosition)) fail("duplicate derivative position");
      positions.add(derivative.assetPosition);
      const path = usePaths.get(`${media.usage}:${derivative.assetPosition}`);
      const asset = assetPaths.get(path);
      if (
        !asset ||
        asset.sha256 !== derivative.sha256 ||
        asset.mime !== derivative.mime ||
        asset.width !== derivative.width ||
        asset.height !== derivative.height ||
        asset.byteSize !== derivative.byteSize ||
        derivative.mime !== `image/${derivative.format}`
      )
        fail("missing exact derivative");
    }
  };
  const identities = new Set();
  for (const [kind, collection, fields] of [
    [
      "service",
      snapshot.services,
      ["title", "description", "idealFor", "ctaLabel", "seoTitle", "seoDescription"],
    ],
    ["event", snapshot.websiteEvents, ["title", "description", "seoTitle", "seoDescription"]],
  ]) {
    const slugs = new Set();
    for (const item of collection) {
      if (
        !/^(SVC|PEV)-[0-9]{8}$/.test(item.code) ||
        !Number.isInteger(item.revision) ||
        item.revision < 1 ||
        !Number.isInteger(item.displayOrder) ||
        item.displayOrder < 0 ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) ||
        slugs.has(item.slug) ||
        identities.has(item.code) ||
        item.lifecycle !== "ACTIVE"
      )
        fail(`invalid ${kind} identity`);
      slugs.add(item.slug);
      identities.add(item.code);
      if (
        kind === "event" &&
        (!["birthday", "celebration", "festival", "privateCelebration", "wedding"].includes(
          item.categoryId,
        ) ||
          typeof item.collaboration !== "boolean")
      )
        fail("invalid event category or collaboration");
      localeValue(item.locales, fields, `${kind}.${item.code}`);
      const prefix = kind === "service" ? "SERVICE" : "EVENT";
      if (
        item.mainImage?.usage !== `${prefix}:${item.code}:MAIN` ||
        item.mainImage.galleryPosition !== null ||
        item.mainImage.layout !== null
      )
        fail("invalid main media usage");
      checkMedia(item.mainImage);
      if (!Array.isArray(item.gallery)) fail("invalid gallery");
      const galleryPositions = new Set();
      item.gallery.forEach((media) => {
        if (
          !Number.isInteger(media.galleryPosition) ||
          media.galleryPosition < 1 ||
          galleryPositions.has(media.galleryPosition) ||
          !["full-landscape", "pair-landscape", "pair-portrait"].includes(media.layout) ||
          media.usage !== `${prefix}:${item.code}:GALLERY:${media.galleryPosition}`
        )
          fail("invalid gallery usage");
        galleryPositions.add(media.galleryPosition);
        checkMedia(media);
      });
    }
  }
  for (const entry of snapshot.home.events)
    if (
      !snapshot.websiteEvents.some(
        (event) => event.code === entry.code && event.revision === entry.revision,
      )
    )
      fail("unresolved Home event");
  for (const item of snapshot.websiteEvents)
    if (
      item.relatedService &&
      !snapshot.services.some(
        (service) =>
          service.code === item.relatedService.code &&
          service.revision === item.relatedService.revision,
      )
    )
      fail("unresolved related Service");
  const currentCodes = new Set();
  for (const item of snapshot.currentEvents) {
    if (
      !/^CEV-[0-9]{8}$/.test(item.code) ||
      currentCodes.has(item.code) ||
      item.lifecycle !== "ACTIVE" ||
      Date.parse(instant(item.start, "CEV start")) >= Date.parse(instant(item.end, "CEV end"))
    )
      fail("invalid CEV");
    currentCodes.add(item.code);
    localeValue(item.locales, ["title"], `CEV.${item.code}`);
  }
};
validatePublicationInput(publicationInput);

export const getTreeAtAsOf = (currentEvents, technicalAsOf, locale) => {
  if (!locales.includes(locale)) fail("unsupported locale");
  instant(technicalAsOf, "technicalAsOf");
  return currentEvents
    .filter(
      (item) => item.lifecycle === "ACTIVE" && Date.parse(technicalAsOf) < Date.parse(item.end),
    )
    .sort(
      (a, b) =>
        Date.parse(a.start) - Date.parse(b.start) ||
        (a.code < b.code ? -1 : a.code > b.code ? 1 : 0),
    )
    .map((item) => ({
      code: item.code,
      title: nonempty(item.locales?.[locale]?.title, `CEV.${item.code}.${locale}.title`),
      start: item.start,
      end: item.end,
    }));
};

const usagePaths = new Map(
  publicationInput?.usages.map((item) => [`${item.usage}:${item.position}`, item.path]) ?? [],
);
const mediaModel = (usage, locale) => {
  const derivatives = usage.derivatives
    .map((item) => ({
      path: usagePaths.get(`${usage.usage}:${item.assetPosition}`),
      width: item.width,
      height: item.height,
      mime: item.mime,
    }))
    .sort((a, b) => a.width - b.width || (a.mime < b.mime ? -1 : a.mime > b.mime ? 1 : 0));
  const groups = ["image/avif", "image/webp", "image/gif"]
    .map((mime) => ({ mime, items: derivatives.filter((item) => item.mime === mime) }))
    .filter((group) => group.items.length);
  const fallback =
    groups.find((group) => group.mime === "image/webp") ??
    groups.find((group) => group.mime === "image/gif") ??
    groups[0];
  const largest = fallback.items.at(-1);
  return {
    src: largest.path,
    srcset: fallback.items.map((item) => `${item.path} ${item.width}w`).join(", "),
    sources: groups.map((group) => ({
      mime: group.mime,
      srcset: group.items.map((item) => `${item.path} ${item.width}w`).join(", "),
    })),
    width: largest.width,
    height: largest.height,
    alt: usage.decorative ? "" : usage.alt[locale],
    decorative: usage.decorative,
    layout: usage.layout,
  };
};

export const getPublication = (locale) => {
  if (!publicationInput) fail("CMS publication not selected");
  if (!locales.includes(locale)) fail("unsupported locale");
  const s = publicationInput.snapshot;
  const services = [...s.services]
    .sort((a, b) => a.displayOrder - b.displayOrder || (a.code < b.code ? -1 : 1))
    .map((item) => ({
      code: item.code,
      slug: item.slug,
      order: item.displayOrder,
      ...item.locales[locale],
      mainImage: mediaModel(item.mainImage, locale),
      gallery: [...item.gallery]
        .sort((a, b) => a.galleryPosition - b.galleryPosition)
        .map((usage) => mediaModel(usage, locale)),
    }));
  const events = [...s.websiteEvents]
    .sort((a, b) => a.displayOrder - b.displayOrder || (a.code < b.code ? -1 : 1))
    .map((item) => ({
      code: item.code,
      slug: item.slug,
      categoryId: item.categoryId,
      collaboration: item.collaboration,
      order: item.displayOrder,
      relatedServiceCode: item.relatedService?.code ?? null,
      ...item.locales[locale],
      mainImage: mediaModel(item.mainImage, locale),
      gallery: [...item.gallery]
        .sort((a, b) => a.galleryPosition - b.galleryPosition)
        .map((usage) => mediaModel(usage, locale)),
    }));
  const tree = getTreeAtAsOf(s.currentEvents, publicationInput.technicalAsOf, locale);
  return {
    home: {
      ...s.home.locales[locale],
      selectedEvents: s.home.events.map((reference) =>
        events.find((event) => event.code === reference.code),
      ),
    },
    services,
    events,
    tree,
  };
};

export const getServiceSlugs = () =>
  publicationInput.snapshot.services.map((item) => item.slug);
export const getEventSlugs = () =>
  publicationInput.snapshot.websiteEvents.map((item) => item.slug);
export const getGalleryCategoryIds = () =>
  [...new Set(publicationInput.snapshot.websiteEvents.map((item) => item.categoryId))].sort();

export const cmsRoutePaths = () => {
  if (!publicationInput) return [];
  const paths = new Set();
  for (const prefix of ["", "es/", "fr/"]) {
    for (const base of ["", "gallery/", "tree/"]) paths.add(`/${prefix}${base}index.html`);
    for (const slug of getServiceSlugs()) paths.add(`/${prefix}services/${slug}/index.html`);
    for (const slug of getEventSlugs()) paths.add(`/${prefix}events/${slug}/index.html`);
    for (const category of getGalleryCategoryIds())
      paths.add(`/${prefix}gallery/${category}/index.html`);
  }
  return [...paths].sort();
};
