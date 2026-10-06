import console from "node:console";
import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";
import { join, resolve } from "node:path";
import prettier from "prettier";
import ts from "typescript";

const [sourceDirectory, manifestPath, outputPath] = process.argv.slice(2);
if (!sourceDirectory || !manifestPath || !outputPath) {
  throw new Error(
    "Usage: node scripts/cms-episode6-media-plan.mjs <main-export-dir> <manifest.json> <output.json>",
  );
}
const source = resolve(sourceDirectory);
const manifest = JSON.parse(await readFile(resolve(manifestPath), "utf8"));
if (manifest.targetSupabaseProject !== "fwiquietxxvozyktaxyp")
  throw new Error("DEV target mismatch");

const syntax = async (path) =>
  ts.createSourceFile(
    path,
    await readFile(join(source, path), "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
const unwrap = (node) => {
  while (ts.isSatisfiesExpression(node) || ts.isAsExpression(node)) node = node.expression;
  return node;
};
const property = (object, key) => {
  const value = unwrap(object);
  if (!ts.isObjectLiteralExpression(value)) throw new Error(`Expected object for ${key}`);
  const found = value.properties.find(
    (item) =>
      ts.isPropertyAssignment(item) &&
      (ts.isStringLiteral(item.name) || ts.isIdentifier(item.name)) &&
      item.name.text === key,
  );
  if (!found) throw new Error(`Missing ${key}`);
  return unwrap(found.initializer);
};
const optionalProperty = (object, key) => {
  try {
    return property(object, key);
  } catch {
    return null;
  }
};
const literal = (node) => {
  if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) {
    throw new Error("Expected literal text in approved main source");
  }
  return node.text;
};
const array = (node) => {
  if (!ts.isArrayLiteralExpression(node))
    throw new Error("Expected array in approved main source");
  return node.elements;
};
const variable = (tree, name) => {
  for (const statement of tree.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const declaration = statement.declarationList.declarations.find(
      (item) => ts.isIdentifier(item.name) && item.name.text === name,
    );
    if (declaration?.initializer) return unwrap(declaration.initializer);
  }
  throw new Error(`Missing source variable ${name}`);
};
const serviceTree = await syntax("src/features/services/i18n/index.ts");
const serviceTitles = {};
for (const service of manifest.services) {
  const code = {
    organizationProductionIntegral: "service-01",
    celebrations: "service-02",
    corporateEvents: "service-03",
    venuePartnerships: "service-04",
    setupLogistics: "service-05",
    furnitureRental: "service-06",
    customPackages: "service-07",
    weddings: "service-08",
  }[service.id];
  if (!code) throw new Error(`Unknown service ${service.id}`);
  serviceTitles[service.slug] = Object.fromEntries(
    ["en", "es", "fr"].map((locale) => [
      locale,
      literal(property(property(variable(serviceTree, locale), code), "title")),
    ]),
  );
}
const serviceData = await syntax("src/features/services/data/services.ts");
const corporateRecord = array(variable(serviceData, "services")).find(
  (item) => property(item, "slug").text === "eventos-corporativos",
);
const corporateMedia = property(corporateRecord, "featuredMedia");
if (
  !ts.isCallExpression(corporateMedia) ||
  corporateMedia.expression.getText() !== "createFeaturedMedia"
) {
  throw new Error("Corporate media source changed");
}
const corporateAlt = literal(corporateMedia.arguments[1]);

const eventTranslations = await syntax("src/features/events/i18n/index.ts");
const eventAlt = {};
for (const event of manifest.events) {
  const tree = await syntax(`src/features/events/data/${event.slug}.ts`);
  const record = tree.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => statement.declarationList.declarations)
    .map((declaration) => declaration.initializer && unwrap(declaration.initializer))
    .find(
      (item) =>
        item &&
        ts.isObjectLiteralExpression(item) &&
        optionalProperty(item, "slug")?.text === event.slug,
    );
  if (!record) throw new Error(`Event source missing: ${event.slug}`);
  const sourceMain = literal(property(property(record, "featuredMedia"), "alt"));
  const sourceGallery = array(property(record, "gallery")).map((item) =>
    literal(property(item, "alt")),
  );
  if (sourceGallery.length !== event.gallery.length)
    throw new Error(`Gallery length changed: ${event.slug}`);
  eventAlt[event.slug] = Object.fromEntries(
    ["en", "es", "fr"].map((locale) => {
      const translation = property(variable(eventTranslations, locale), event.id);
      const media = optionalProperty(translation, "media");
      const translatedGallery = media
        ? array(property(media, "galleryAlts")).map(literal)
        : sourceGallery;
      if (translatedGallery.length !== sourceGallery.length)
        throw new Error(`Alt length changed: ${event.slug}`);
      return [
        locale,
        {
          main: media ? literal(property(media, "featuredAlt")) : sourceMain,
          gallery: translatedGallery,
        },
      ];
    }),
  );
}

const usages = new Map();
const use = (path, kind, owner, position, alt) => {
  usages.set(path, [...(usages.get(path) ?? []), { kind, owner, position, alt }]);
};
for (const service of manifest.services) {
  const title = serviceTitles[service.slug];
  use(
    service.main,
    "SERVICE_MAIN",
    service.slug,
    0,
    service.slug === "eventos-corporativos"
      ? { en: corporateAlt, es: corporateAlt, fr: corporateAlt }
      : title,
  );
  service.gallery.forEach((path, index) =>
    use(
      path,
      "SERVICE_GALLERY",
      service.slug,
      index + 1,
      Object.fromEntries(
        ["en", "es", "fr"].map((locale) => [locale, `${title[locale]} ${index + 1}`]),
      ),
    ),
  );
}
for (const event of manifest.events) {
  use(
    event.main,
    "EVENT_MAIN",
    event.slug,
    0,
    Object.fromEntries(
      ["en", "es", "fr"].map((locale) => [locale, eventAlt[event.slug][locale].main]),
    ),
  );
  event.gallery.forEach(({ path }, index) =>
    use(
      path,
      "EVENT_GALLERY",
      event.slug,
      index + 1,
      Object.fromEntries(
        ["en", "es", "fr"].map((locale) => [
          locale,
          eventAlt[event.slug][locale].gallery[index],
        ]),
      ),
    ),
  );
}
use(manifest.homeVisualMedia.marquee, "HOME_DECORATIVE", "marquee", 0, null);
use(manifest.homeVisualMedia.process, "HOME_DECORATIVE", "process", 0, null);
manifest.homeVisualMedia.finalCtaGallery.forEach((path, index) =>
  use(path, "HOME_DECORATIVE", "final-cta", index + 1, null),
);

const groups = new Map();
for (const asset of manifest.assets) {
  groups.set(asset.sha256, [...(groups.get(asset.sha256) ?? []), asset]);
}
const priority = {
  SERVICE_MAIN: 0,
  EVENT_MAIN: 1,
  EVENT_GALLERY: 2,
  SERVICE_GALLERY: 3,
  HOME_DECORATIVE: 4,
};
const media = [...groups].map(([sha256, assets]) => {
  const allUses = assets.flatMap((asset) =>
    (usages.get(asset.path) ?? []).map((usage) => ({
      path: asset.path,
      ...usage,
    })),
  );
  if (!allUses.length) throw new Error(`Asset has no use: ${sha256}`);
  allUses.sort((a, b) => priority[a.kind] - priority[b.kind]);
  const selected = allUses[0];
  return {
    sha256,
    sourcePath: selected.path,
    bytes: assets[0].bytes,
    decorative: selected.alt === null,
    alt: selected.alt ?? { en: null, es: null, fr: null },
    usages: allUses.map(({ path, kind, owner, position }) => ({ path, kind, owner, position })),
  };
});
if (
  media.length !== 80 ||
  media.some(
    (item) =>
      !item.decorative && Object.values(item.alt).some((alt) => !alt || alt.length > 500),
  )
)
  throw new Error("Media plan is incomplete");

const output = {
  sourceCommit: manifest.sourceCommit,
  targetSupabaseProject: manifest.targetSupabaseProject,
  eventAlts: eventAlt,
  media,
};
await writeFile(
  resolve(outputPath),
  await prettier.format(JSON.stringify(output), { parser: "json" }),
);
console.log(
  `${media.length} upload intents; ${media.filter((item) => item.decorative).length} decorative-only`,
);
