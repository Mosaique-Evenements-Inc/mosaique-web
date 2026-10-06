import type { Locale } from "@/core/i18n";

export interface CmsPublicImage {
  decorative: boolean;
  alt: string | null;
  layout: string | null;
  galleryPosition: number | null;
  src: string;
  width: number;
  height: number;
  sources: {
    mime: string;
    variants: { url: string; width: number; height: number; byteSize: number }[];
  }[];
}

export interface CmsPublicSite {
  schemaVersion: "cms-site-v1";
  locale: Locale;
  publication: { code: string; generation: number; nextExpiration: string | null };
  home: { content: Record<string, unknown>; eventCodes: string[] };
  services: Array<{
    code: string;
    slug: string;
    displayOrder: number;
    content: Record<string, unknown>;
    mainImage: CmsPublicImage;
    gallery: CmsPublicImage[];
  }>;
  events: Array<{
    code: string;
    slug: string;
    categoryId: string;
    collaboration: boolean;
    displayOrder: number;
    relatedServiceCode: string | null;
    content: Record<string, unknown>;
    mainImage: CmsPublicImage;
    gallery: CmsPublicImage[];
  }>;
  currentEvents: Array<{ code: string; title: string; start: string; end: string }>;
}

export class CmsUnavailableError extends Error {
  constructor(message = "Published CMS site is unavailable") {
    super(message);
  }
}

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const string = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const positive = (value: unknown): value is number =>
  Number.isSafeInteger(value) && (value as number) > 0;
const mediaPath =
  /^\/functions\/v1\/cms-public\/media\/[0-9a-f-]{36}\/[0-9a-f]{64}\.(?:avif|webp|gif)$/;
const image = (value: unknown): value is CmsPublicImage =>
  record(value) &&
  typeof value.decorative === "boolean" &&
  (value.decorative ? value.alt === null : string(value.alt)) &&
  (value.layout === null ||
    ["full-landscape", "pair-landscape", "pair-portrait"].includes(String(value.layout))) &&
  (value.galleryPosition === null || positive(value.galleryPosition)) &&
  string(value.src) &&
  mediaPath.test(value.src) &&
  positive(value.width) &&
  positive(value.height) &&
  Array.isArray(value.sources) &&
  value.sources.length > 0 &&
  value.sources.every(
    (source: unknown) =>
      record(source) &&
      ["image/avif", "image/webp", "image/gif"].includes(String(source.mime)) &&
      Array.isArray(source.variants) &&
      source.variants.length > 0 &&
      source.variants.every(
        (variant: unknown) =>
          record(variant) &&
          string(variant.url) &&
          mediaPath.test(variant.url) &&
          positive(variant.width) &&
          positive(variant.height) &&
          positive(variant.byteSize),
      ),
  );
const homeStrings = [
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
];
const optionalHomeContent = (value: unknown): value is Record<string, unknown> =>
  record(value) && homeStrings.every((field) => value[field] === null || string(value[field]));
const content = (value: unknown, fields: string[]): value is Record<string, unknown> =>
  record(value) && fields.every((field) => string(value[field]));
const item = (value: unknown, kind: "service" | "event") =>
  record(value) &&
  string(value.code) &&
  string(value.slug) &&
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug) &&
  Number.isSafeInteger(value.displayOrder) &&
  (value.displayOrder as number) >= 0 &&
  content(
    value.content,
    kind === "service"
      ? ["title", "description", "idealFor", "ctaLabel", "seoTitle", "seoDescription"]
      : ["title", "description", "seoTitle", "seoDescription"],
  ) &&
  image(value.mainImage) &&
  Array.isArray(value.gallery) &&
  value.gallery.every(image) &&
  (kind === "service" ||
    (["birthday", "celebration", "festival", "privateCelebration", "wedding"].includes(
      String(value.categoryId),
    ) &&
      typeof value.collaboration === "boolean" &&
      (value.relatedServiceCode === null || string(value.relatedServiceCode))));

export function validateCmsSite(value: unknown, locale: Locale): CmsPublicSite {
  if (
    !record(value) ||
    value.schemaVersion !== "cms-site-v1" ||
    value.locale !== locale ||
    !record(value.publication) ||
    !string(value.publication.code) ||
    !positive(value.publication.generation) ||
    (value.publication.nextExpiration !== null && !string(value.publication.nextExpiration)) ||
    !record(value.home) ||
    !optionalHomeContent(value.home.content) ||
    !string(value.home.content.seoTitle) ||
    !string(value.home.content.seoDescription) ||
    !Array.isArray(value.home.content.heroSegments) ||
    !value.home.content.heroSegments.every(
      (segment: unknown) =>
        record(segment) && string(segment.text) && typeof segment.emphasis === "boolean",
    ) ||
    !Array.isArray(value.home.content.processSteps) ||
    !value.home.content.processSteps.every(
      (step: unknown) => record(step) && string(step.title) && string(step.description),
    ) ||
    !Array.isArray(value.home.content.faqItems) ||
    !value.home.content.faqItems.every(
      (faq: unknown) => record(faq) && string(faq.question) && string(faq.answer),
    ) ||
    !Array.isArray(value.home.eventCodes) ||
    !value.home.eventCodes.every(string) ||
    !Array.isArray(value.services) ||
    !value.services.every((entry: unknown) => item(entry, "service")) ||
    !Array.isArray(value.events) ||
    !value.events.every((entry: unknown) => item(entry, "event")) ||
    !Array.isArray(value.currentEvents) ||
    !value.currentEvents.every(
      (event: unknown) =>
        record(event) &&
        string(event.code) &&
        string(event.title) &&
        string(event.start) &&
        string(event.end),
    )
  ) {
    throw new CmsUnavailableError("Invalid published CMS site response");
  }
  const events = value.events as CmsPublicSite["events"];
  if (
    new Set(events.map((event) => event.slug)).size !== events.length ||
    new Set((value.services as CmsPublicSite["services"]).map((service) => service.slug))
      .size !== value.services.length ||
    !(value.home.eventCodes as string[]).every((code) =>
      events.some((event) => event.code === code),
    )
  ) {
    throw new CmsUnavailableError("Inconsistent published CMS site response");
  }
  return value as unknown as CmsPublicSite;
}

export function cmsApiOrigin(raw = process.env.CMS_PUBLIC_API_ORIGIN): URL {
  if (!raw) throw new CmsUnavailableError("CMS_PUBLIC_API_ORIGIN is missing");
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new CmsUnavailableError("CMS_PUBLIC_API_ORIGIN is invalid");
  }
  if (
    (url.protocol !== "https:" &&
      !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new CmsUnavailableError("CMS_PUBLIC_API_ORIGIN must be an origin");
  }
  return url;
}

export async function fetchCmsSite(
  locale: Locale,
  options: { origin?: URL; fetcher?: typeof fetch; timeoutMs?: number } = {},
): Promise<CmsPublicSite> {
  if (!["en", "es", "fr"].includes(locale))
    throw new CmsUnavailableError("Unsupported CMS locale");
  const origin = options.origin ?? cmsApiOrigin();
  const url = new URL("/functions/v1/cms-public/site", origin);
  url.searchParams.set("locale", locale);
  let response: Response;
  try {
    response = await (options.fetcher ?? fetch)(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(options.timeoutMs ?? 5_000),
      cache: "no-store",
    });
  } catch {
    throw new CmsUnavailableError();
  }
  if (!response.ok) throw new CmsUnavailableError(`CMS site returned ${response.status}`);
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new CmsUnavailableError("Invalid CMS JSON");
  }
  return validateCmsSite(payload, locale);
}
