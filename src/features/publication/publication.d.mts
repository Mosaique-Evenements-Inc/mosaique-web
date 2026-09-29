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
  home: CmsHome;
  services: CmsItem[];
  events: CmsItem[];
  tree: { code: string; title: string; start: string; end: string }[];
}
export interface CmsPublicationInput {
  publicationCode: string;
  snapshotHash: string;
  webSha: string;
  technicalAsOf: string;
  snapshot: {
    services: { slug: string }[];
    websiteEvents: { slug: string; categoryId: string }[];
  };
  assets: {
    path: string;
    sha256: string;
    mime: string;
    width: number;
    height: number;
    byteSize: number;
  }[];
  fixtureBytes?: Record<string, string>;
}
export const publicationInput: CmsPublicationInput;
export const publicationSourceDirectory: string | null;
export const publicationMode: "cms";
export function getPublication(locale: "en" | "es" | "fr"): CmsPublication;
export function cmsRoutePaths(): string[];
export function getServiceSlugs(): string[];
export function getEventSlugs(): string[];
export function getGalleryCategoryIds(): string[];
export function validatePublicationInput(input: CmsPublicationInput): void;
export function getTreeAtAsOf(
  events: {
    code: string;
    lifecycle: string;
    start: string;
    end: string;
    locales: Record<string, { title: string }>;
  }[],
  asOf: string,
  locale: "en" | "es" | "fr",
): { code: string; title: string; start: string; end: string }[];
