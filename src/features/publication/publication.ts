import type { Locale } from "@/core/i18n";
import {
  cmsApiOrigin,
  fetchCmsSite,
  type CmsPublicImage,
  type CmsPublicSite,
} from "./cms-client.ts";

export interface CmsMedia {
  src: string;
  srcset: string;
  sources: { mime: string; srcset: string }[];
  width: number;
  height: number;
  alt: string;
  decorative: boolean;
  layout: string | null;
}
export interface CmsItem {
  code: string;
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  idealFor?: string;
  ctaLabel?: string;
  categoryId?: string;
  collaboration?: boolean;
  relatedServiceCode?: string | null;
  order: number;
  mainImage: CmsMedia;
  gallery: CmsMedia[];
}
export interface CmsHome {
  seoTitle: string;
  seoDescription: string;
  heroOverlay: string;
  heroCtaLabel: string;
  eventsTitle: string;
  eventsIntroduction: string;
  eventsCtaLabel: string;
  servicesTitle: string;
  servicesText: string;
  marqueeText: string;
  marqueeStatement: string;
  processTitle: string;
  processIntroduction: string;
  processClosing: string;
  faqEyebrow: string;
  faqTitle: string;
  faqPrompt: string;
  faqCtaLabel: string;
  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaLabel: string;
  heroSegments: { text: string; emphasis: boolean }[];
  processSteps: { title: string; description: string }[];
  faqItems: { question: string; answer: string }[];
  selectedEvents: CmsItem[];
}
export interface CmsPublication {
  code: string;
  generation: number;
  locale: Locale;
  home: CmsHome;
  services: CmsItem[];
  events: CmsItem[];
  tree: { code: string; title: string; start: string; end: string }[];
}

export function mapCmsSite(site: CmsPublicSite, origin: URL): CmsPublication {
  const media = (image: CmsPublicImage): CmsMedia => {
    const groups = image.sources.map((source) => ({
      mime: source.mime,
      srcset: source.variants
        .map((variant) => `${new URL(variant.url, origin).href} ${variant.width}w`)
        .join(", "),
    }));
    const fallback =
      groups.find((group) => group.mime === "image/webp") ??
      groups.find((group) => group.mime === "image/gif") ??
      groups[0];
    return {
      src: new URL(image.src, origin).href,
      srcset: fallback.srcset,
      sources: groups,
      width: image.width,
      height: image.height,
      alt: image.decorative ? "" : (image.alt ?? ""),
      decorative: image.decorative,
      layout: image.layout,
    };
  };
  const services = [...site.services]
    .sort((a, b) => a.displayOrder - b.displayOrder || a.code.localeCompare(b.code))
    .map((item) => ({
      code: item.code,
      slug: item.slug,
      order: item.displayOrder,
      ...(item.content as unknown as Pick<
        CmsItem,
        "title" | "description" | "idealFor" | "ctaLabel" | "seoTitle" | "seoDescription"
      >),
      mainImage: media(item.mainImage),
      gallery: [...item.gallery]
        .sort((a, b) => (a.galleryPosition ?? 0) - (b.galleryPosition ?? 0))
        .map(media),
    }));
  const events = [...site.events]
    .sort((a, b) => a.displayOrder - b.displayOrder || a.code.localeCompare(b.code))
    .map((item) => ({
      code: item.code,
      slug: item.slug,
      order: item.displayOrder,
      categoryId: item.categoryId,
      collaboration: item.collaboration,
      relatedServiceCode: item.relatedServiceCode,
      ...(item.content as unknown as Pick<
        CmsItem,
        "title" | "description" | "seoTitle" | "seoDescription"
      >),
      mainImage: media(item.mainImage),
      gallery: [...item.gallery]
        .sort((a, b) => (a.galleryPosition ?? 0) - (b.galleryPosition ?? 0))
        .map(media),
    }));
  return {
    code: site.publication.code,
    generation: site.publication.generation,
    locale: site.locale,
    home: {
      ...(Object.fromEntries(
        Object.entries(site.home.content).map(([key, value]) => [key, value ?? ""]),
      ) as Omit<CmsHome, "selectedEvents">),
      selectedEvents: site.home.eventCodes.map((code) =>
        events.find((event) => event.code === code)!,
      ),
    },
    services,
    events,
    // The API already applies the server-time expiry rule. Never reconstruct expired entries here.
    tree: site.currentEvents,
  };
}

export function getPublication(locals: App.Locals, locale: Locale): CmsPublication {
  const publication = locals.cmsPublication;
  if (!publication || publication.locale !== locale)
    throw new Error("CMS publication missing from this request");
  return publication;
}

export function getGalleryCategoryIds(publication: CmsPublication): string[] {
  return [
    ...new Set(
      publication.events.map((event) => event.categoryId).filter((id): id is string => !!id),
    ),
  ].sort();
}

export async function loadPublication(
  locale: Locale,
  rawOrigin?: string,
): Promise<CmsPublication> {
  const origin = cmsApiOrigin(rawOrigin);
  return mapCmsSite(await fetchCmsSite(locale, { origin }), origin);
}
