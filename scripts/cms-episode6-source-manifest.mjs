import { createHash } from "node:crypto";
import console from "node:console";
import process from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import prettier from "prettier";
import sharp from "sharp";

const [sourceDirectory, sourceCommit, outputPath] = process.argv.slice(2);
if (!sourceDirectory || !/^[0-9a-f]{40}$/.test(sourceCommit ?? "") || !outputPath) {
  throw new Error(
    "Usage: node scripts/cms-episode6-source-manifest.mjs <main-export-dir> <main-sha> <output.json>",
  );
}

const source = resolve(sourceDirectory);
const file = async (path) => readFile(join(source, path), "utf8");
const eventExports = Object.fromEntries(
  [
    ...(await file("src/assets/images/events/index.ts")).matchAll(
      /export \{ default as (\w+) \} from "\.\/(.+\.jpg)";/g,
    ),
  ].map(([, name, path]) => [name, `src/assets/images/events/${path}`]),
);
const serviceMedia = await file("src/features/services/data/media.ts");
const serviceImports = Object.fromEntries(
  [
    ...serviceMedia.matchAll(/import (\w+) from "@\/assets\/images\/services\/(.+\.jpg)";/g),
  ].map(([, name, path]) => [name, `src/assets/images/services/${path}`]),
);
const serviceSource = await file("src/features/services/data/services.ts");
const serviceSlugs = Object.fromEntries(
  [...serviceSource.matchAll(/id: SERVICE_IDS\.(\w+),\s*slug: "([^"]+)"/g)].map(
    ([, id, slug]) => [id, slug],
  ),
);

const services = [];
for (const [, id, main, gallery] of serviceMedia.matchAll(
  /\[SERVICE_IDS\.(\w+)\]: \{\s*main: (\w+),\s*gallery: \[([^\]]+)\]/g,
)) {
  const paths = [main, ...gallery.matchAll(/\b\w+\b/g)].map(
    (value) => serviceImports[typeof value === "string" ? value : value[0]],
  );
  if (!serviceSlugs[id] || paths.some((path) => !path))
    throw new Error(`Unmapped service media: ${id}`);
  services.push({ id, slug: serviceSlugs[id], main: paths[0], gallery: paths.slice(1) });
}
const corporate = eventExports.fanFestMain;
if (!corporate || !serviceSlugs.corporateEvents)
  throw new Error("Corporate service media missing");
services.splice(3, 0, {
  id: "corporateEvents",
  slug: serviceSlugs.corporateEvents,
  main: corporate,
  gallery: [],
});
if (services.length !== 8) throw new Error(`Expected eight services, found ${services.length}`);

const events = [];
for (const name of [
  "nossa-copa",
  "baila-da-zaza",
  "baby-shower",
  "wedding-r-r",
  "cumpleanos-ana-paula",
  "fan-fest-club",
]) {
  const data = await file(`src/features/events/data/${name}.ts`);
  const slug = data.match(/slug: "([^"]+)"/)?.[1];
  const category = data.match(/categoryId: "([^"]+)"/)?.[1];
  const relatedService = data.match(/serviceId: SERVICE_IDS\.(\w+)/)?.[1];
  const sources = [...data.matchAll(/\bsrc: (\w+)/g)].map(([, alias]) => eventExports[alias]);
  const layouts = [...data.matchAll(/\blayout: "([^"]+)"/g)].map(([, layout]) => layout);
  if (
    slug !== name ||
    !category ||
    !serviceSlugs[relatedService] ||
    sources.some((path) => !path) ||
    sources.length !== layouts.length + 1
  )
    throw new Error(`Unmapped event media: ${name}`);
  events.push({
    id: data.match(/\bid: "([^"]+)"/)?.[1],
    slug,
    category,
    relatedService: serviceSlugs[relatedService],
    collaboration: /\bcollaboration: true/.test(data),
    main: sources[0],
    gallery: sources.slice(1).map((path, index) => ({ path, layout: layouts[index] })),
  });
}

const finalCtaSource = await file("src/features/home/content/final-cta-gallery.ts");
const finalCtaNames = finalCtaSource
  .match(/export const finalCtaGalleryImages = \[([\s\S]*?)\] as const;/)?.[1]
  .match(/\b\w+\b/g);
if (
  !finalCtaNames ||
  finalCtaNames.length !== 12 ||
  finalCtaNames.some((name) => !eventExports[name])
) {
  throw new Error("Unmapped Home final CTA photography");
}
const homeVisualMedia = {
  marquee: "src/assets/images/services/celebrations/main.jpg",
  process: "src/assets/images/services/custom-packages/04.jpg",
  finalCtaGallery: finalCtaNames.map((name) => eventExports[name]),
};

const paths = [
  ...new Set([
    ...services.flatMap(({ main, gallery }) => [main, ...gallery]),
    ...events.flatMap(({ main, gallery }) => [main, ...gallery.map(({ path }) => path)]),
    homeVisualMedia.marquee,
    homeVisualMedia.process,
    ...homeVisualMedia.finalCtaGallery,
  ]),
].sort();
const assets = [];
for (const path of paths) {
  const bytes = await readFile(join(source, path));
  const metadata = await sharp(bytes).metadata();
  assets.push({
    path,
    filename: basename(path),
    sha256: createHash("sha256").update(bytes).digest("hex"),
    bytes: bytes.length,
    width: metadata.width,
    height: metadata.height,
    mimeType: "image/jpeg",
  });
}
const byHash = new Map();
for (const asset of assets) {
  byHash.set(asset.sha256, [...(byHash.get(asset.sha256) ?? []), asset.path]);
}
const duplicateBinaries = [...byHash.values()].filter((group) => group.length > 1);
const manifest = {
  sourceRepository: "mosaique-web",
  sourceRef: "main",
  sourceCommit,
  targetSupabaseProject: "fwiquietxxvozyktaxyp",
  editorialSources: {
    home: ["src/features/home/i18n/index.ts", "src/features/home/content"],
    services: ["src/features/services/data/services.ts", "src/features/services/i18n/index.ts"],
    events: ["src/features/events/data", "src/features/events/i18n/index.ts"],
    tree: ["src/features/tree-link/content/tree-link.ts"],
  },
  services,
  events,
  homeVisualMedia,
  assets,
  duplicateBinaries,
};
await writeFile(
  resolve(outputPath),
  await prettier.format(JSON.stringify(manifest), { parser: "json" }),
);
console.log(
  `${services.length} services, ${events.length} events, ${assets.length} paths, ${byHash.size} unique binaries`,
);
