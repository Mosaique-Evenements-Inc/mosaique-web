import { Buffer } from "node:buffer";
import console from "node:console";
import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";
import { join, resolve } from "node:path";
import prettier from "prettier";
import ts from "typescript";

const [sourceDirectory, manifestPath, mediaPlanPath, outputPath] = process.argv.slice(2);
if (!sourceDirectory || !manifestPath || !mediaPlanPath || !outputPath) {
  throw new Error(
    "Usage: node scripts/cms-episode6-content-plan.mjs <main-export-dir> <source-manifest.json> <media-plan.json> <output.json>",
  );
}
const source = resolve(sourceDirectory);
const manifest = JSON.parse(await readFile(resolve(manifestPath), "utf8"));
const mediaPlan = JSON.parse(await readFile(resolve(mediaPlanPath), "utf8"));
if (
  manifest.sourceCommit !== mediaPlan.sourceCommit ||
  manifest.targetSupabaseProject !== "fwiquietxxvozyktaxyp" ||
  mediaPlan.targetSupabaseProject !== "fwiquietxxvozyktaxyp"
) {
  throw new Error("Source and DEV target differ");
}
const assetHash = new Map(manifest.assets.map(({ path, sha256 }) => [path, sha256]));
const sha = (path) => {
  const hash = assetHash.get(path);
  if (!hash) throw new Error(`Media missing from source manifest: ${path}`);
  return hash;
};

const loadMainDictionary = async (path) => {
  const input = await readFile(join(source, path), "utf8");
  const standalone = input.replace(
    /^import \{ defaultLocale, type [^\n]+ from "@\/core\/i18n";$/m,
    'const defaultLocale = "en";',
  );
  const output = ts.transpileModule(standalone, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
};
const homeModule = await loadMainDictionary("src/features/home/i18n/index.ts");
const serviceModule = await loadMainDictionary("src/features/services/i18n/index.ts");
const eventModule = await loadMainDictionary("src/features/events/i18n/index.ts");

const locales = ["en", "es", "fr"];
const home = Object.fromEntries(
  locales.map((locale) => {
    const shell = homeModule.homeTranslations[locale];
    const content = homeModule.homeContentTranslations[locale];
    const fields = {
      seoTitle: shell.metadataTitle,
      seoDescription: shell.metadataDescription,
      heroOverlay: shell.heroOverlay,
      heroCtaLabel: shell.planEvent,
      heroSegments: content.heroSegments,
      eventsTitle: content.projects.title,
      eventsIntroduction: content.projects.introduction,
      eventsCtaLabel: content.projects.ctaLabel,
      servicesTitle: content.servicesPanel.title,
      servicesText: content.servicesPanel.text,
      marqueeText: content.marqueeOptions[0],
      marqueeStatement: content.marqueeOptions[2],
      processTitle: content.process.title,
      processIntroduction: content.process.introduction,
      processClosing: content.process.closingStatement,
      processSteps: content.process.steps.map(({ title, description }) => ({
        title,
        description,
      })),
      faqEyebrow: content.faq.eyebrow,
      faqTitle: content.faq.title,
      faqPrompt: content.faq.prompt,
      faqCtaLabel: content.faq.ctaLabel,
      faqItems: content.faq.items,
      finalCtaTitle: shell.finalCtaTitle,
      finalCtaText: shell.finalCtaText,
      finalCtaLabel: shell.finalCtaAction,
    };
    return [locale, fields];
  }),
);
const serviceIds = {
  organizationProductionIntegral: "service-01",
  celebrations: "service-02",
  corporateEvents: "service-03",
  venuePartnerships: "service-04",
  setupLogistics: "service-05",
  furnitureRental: "service-06",
  customPackages: "service-07",
  weddings: "service-08",
};
const services = manifest.services.map((item, index) => ({
  sourceId: serviceIds[item.id],
  slug: item.slug,
  displayOrder: index + 1,
  locales: Object.fromEntries(
    locales.map((locale) => {
      const translated = serviceModule.serviceTranslations[locale][serviceIds[item.id]];
      return [
        locale,
        {
          title: translated.title,
          description: translated.description,
          idealFor: translated.idealFor,
          ctaLabel: translated.ctaLabel,
          seoTitle: `${translated.title} — MOSAÏQUE EVENTS`,
          seoDescription: translated.description,
        },
      ];
    }),
  ),
  mainSha256: sha(item.main),
  gallerySha256: item.gallery.map(sha),
}));
const events = manifest.events.map((item, index) => ({
  sourceId: item.id,
  slug: item.slug,
  displayOrder: index + 1,
  categoryId: item.category,
  relatedServiceSlug: item.relatedService,
  collaboration: item.collaboration,
  locales: Object.fromEntries(
    locales.map((locale) => {
      const translated = eventModule.eventTranslations[locale][item.id];
      return [
        locale,
        {
          title: translated.title,
          description: translated.description,
          mainAlt: mediaPlan.eventAlts[item.slug][locale].main,
          seoTitle: `${translated.title} — MOSAÏQUE EVENTS`,
          seoDescription: translated.description,
        },
      ];
    }),
  ),
  mainSha256: sha(item.main),
  gallery: item.gallery.map(({ path, layout }, position) => ({
    sha256: sha(path),
    layout,
    alts: Object.fromEntries(
      locales.map((locale) => [
        locale,
        mediaPlan.eventAlts[item.slug][locale].gallery[position],
      ]),
    ),
  })),
}));
if (
  services.length !== 8 ||
  events.length !== 6 ||
  Object.values(home).some(
    (value) => value.processSteps.length !== 5 || value.faqItems.length !== 8,
  )
) {
  throw new Error("Approved source collection changed");
}
const output = {
  sourceCommit: manifest.sourceCommit,
  targetSupabaseProject: manifest.targetSupabaseProject,
  home: { locales: home, selectedEventSlugs: events.map(({ slug }) => slug) },
  services,
  events,
  currentEvents: [],
};
await writeFile(
  resolve(outputPath),
  await prettier.format(JSON.stringify(output), { parser: "json" }),
);
console.log(
  `${services.length} Service, ${events.length} Event, Home EN/ES/FR; no real Current Events`,
);
