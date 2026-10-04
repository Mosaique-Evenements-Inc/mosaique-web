import type { CmsPublicImage, CmsPublicSite } from "../cms-client";

const mediaId = "123e4567-e89b-42d3-a456-426614174000";
const digest = "a".repeat(64);
const mediaPath = `/functions/v1/cms-public/media/${mediaId}/${digest}.webp`;
const image: CmsPublicImage = {
  decorative: false,
  alt: "Published image",
  layout: null,
  galleryPosition: null,
  src: mediaPath,
  width: 960,
  height: 540,
  sources: [
    {
      mime: "image/avif",
      variants: [
        { url: mediaPath.replace(".webp", ".avif"), width: 480, height: 270, byteSize: 1200 },
      ],
    },
    {
      mime: "image/webp",
      variants: [
        { url: mediaPath, width: 480, height: 270, byteSize: 1500 },
        { url: mediaPath, width: 960, height: 540, byteSize: 3000 },
      ],
    },
  ],
};

export const siteFixture: CmsPublicSite = {
  schemaVersion: "cms-site-v1",
  locale: "en",
  publication: { code: "PUB-00000001", generation: 7, nextExpiration: null },
  home: {
    content: {
      seoTitle: "CMS Home Title",
      seoDescription: "CMS Home Description",
      heroOverlay: "Published hero overlay",
      heroCtaLabel: "Contact us",
      heroSegments: [{ text: "Published hero", emphasis: false }],
      eventsTitle: "Published events",
      eventsIntroduction: "Events intro",
      eventsCtaLabel: "Gallery",
      servicesTitle: "Published services",
      servicesText: "Services intro",
      marqueeText: "Published marquee",
      marqueeStatement: "Published statement",
      processTitle: "Published process",
      processIntroduction: "Process intro",
      processClosing: "Process closing",
      processSteps: [{ title: "Step one", description: "Step text" }],
      faqEyebrow: "FAQ",
      faqTitle: "Questions",
      faqPrompt: "Ask us",
      faqCtaLabel: "Contact",
      faqItems: [{ question: "Question?", answer: "Answer." }],
      finalCtaTitle: "Final CTA",
      finalCtaText: "Final text",
      finalCtaLabel: "Contact",
    },
    eventCodes: ["PEV-00000001"],
  },
  services: [
    {
      code: "SVC-00000001",
      slug: "published-service",
      displayOrder: 1,
      content: {
        title: "Published Service",
        description: "Service description",
        idealFor: "Ideal for all",
        ctaLabel: "Ask",
        seoTitle: "Service SEO Title",
        seoDescription: "Service SEO Description",
      },
      mainImage: image,
      gallery: [],
    },
  ],
  events: [
    {
      code: "PEV-00000001",
      slug: "published-event",
      categoryId: "celebration",
      collaboration: false,
      displayOrder: 1,
      relatedServiceCode: "SVC-00000001",
      content: {
        title: "Published Event",
        description: "Event description",
        mainAlt: "Published image",
        seoTitle: "Event SEO Title",
        seoDescription: "Event SEO Description",
      },
      mainImage: image,
      gallery: [{ ...image, galleryPosition: 1, layout: "full-landscape" }],
    },
  ],
  currentEvents: [
    {
      code: "CEV-00000001",
      title: "Future event",
      start: "2030-01-01T00:00:00Z",
      end: "2030-01-02T00:00:00Z",
    },
  ],
};
