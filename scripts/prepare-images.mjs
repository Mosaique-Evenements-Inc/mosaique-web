#!/usr/bin/env node

import console from "node:console";
import { access, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_ROOT = path.join(PROJECT_ROOT, "assets-raw", "events");
const OUTPUT_ROOT = path.join(PROJECT_ROOT, "src", "assets", "images", "events");
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

// Current consumers request up to 1920px; 3600px preserves crop and high-density headroom.
const MAX_DIMENSION = 3600;
const JPEG_QUALITY = 88;

const args = process.argv.slice(2);
const unknownArgs = args.filter((arg) => arg !== "--force");

if (unknownArgs.length > 0) {
  console.error(`Unknown option: ${unknownArgs.join(", ")}`);
  console.error("Usage: pnpm images:prepare [--force]");
  process.exit(1);
}

const force = args.includes("--force");

const toDisplayPath = (filePath) => filePath.split(path.sep).join("/");

const destinationExists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const collectEntries = async (directory, relativeDirectory = "") => {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));

  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectEntries(absolutePath, relativePath)));
      continue;
    }

    files.push({
      absolutePath,
      relativePath,
      supported:
        entry.isFile() && SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    });
  }

  return files;
};

const getOutputPath = (relativePath, format) => {
  const parsed = path.parse(relativePath);
  const extension = format === "png" ? ".png" : ".jpg";

  return path.join(parsed.dir, `${parsed.name}${extension}`);
};

const prepareImage = async (sourcePath, outputFormat) => {
  let pipeline = sharp(sourcePath, { failOn: "warning" })
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .toColorspace("srgb");

  pipeline =
    outputFormat === "png"
      ? pipeline.png({ adaptiveFiltering: true, compressionLevel: 9 })
      : pipeline.jpeg({
          chromaSubsampling: "4:4:4",
          mozjpeg: true,
          progressive: true,
          quality: JPEG_QUALITY,
        });

  return pipeline.toBuffer({ resolveWithObject: true });
};

const run = async () => {
  await mkdir(INPUT_ROOT, { recursive: true });
  await mkdir(OUTPUT_ROOT, { recursive: true });

  const entries = await collectEntries(INPUT_ROOT);
  const claimedDestinations = new Map();
  const totals = { failed: 0, processed: 0, skipped: 0 };

  for (const entry of entries) {
    const sourceLabel = toDisplayPath(entry.relativePath);

    if (!entry.supported) {
      totals.skipped += 1;
      console.log(`SKIP ${sourceLabel}`);
      console.log("  unsupported file type");
      continue;
    }

    try {
      const metadata = await sharp(entry.absolutePath, { failOn: "warning" }).metadata();

      if (metadata.format !== "jpeg" && metadata.format !== "png") {
        totals.skipped += 1;
        console.log(`SKIP ${sourceLabel}`);
        console.log(`  detected format is ${metadata.format ?? "unknown"}`);
        continue;
      }

      if ((metadata.pages ?? 1) > 1) {
        totals.skipped += 1;
        console.log(`SKIP ${sourceLabel}`);
        console.log("  animated or multi-page images are not supported");
        continue;
      }

      const outputFormat = metadata.format === "png" && metadata.hasAlpha ? "png" : "jpeg";
      const outputRelativePath = getOutputPath(entry.relativePath, outputFormat);
      const outputPath = path.join(OUTPUT_ROOT, outputRelativePath);
      const outputLabel = toDisplayPath(outputRelativePath);
      const claimedBy = claimedDestinations.get(outputPath);

      if (claimedBy) {
        totals.skipped += 1;
        console.log(`SKIP ${sourceLabel}`);
        console.log(`  destination collides with ${claimedBy}: ${outputLabel}`);
        continue;
      }

      claimedDestinations.set(outputPath, sourceLabel);

      if (!force && (await destinationExists(outputPath))) {
        totals.skipped += 1;
        console.log(`SKIP ${sourceLabel}`);
        console.log(`  destination already exists: ${outputLabel}`);
        continue;
      }

      const { data, info } = await prepareImage(entry.absolutePath, outputFormat);
      await mkdir(path.dirname(outputPath), { recursive: true });

      try {
        await writeFile(outputPath, data, { flag: force ? "w" : "wx" });
      } catch (error) {
        if (
          !force &&
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "EEXIST"
        ) {
          totals.skipped += 1;
          console.log(`SKIP ${sourceLabel}`);
          console.log(`  destination already exists: ${outputLabel}`);
          continue;
        }

        throw error;
      }

      totals.processed += 1;
      const destinationSuffix = sourceLabel === outputLabel ? "" : ` → ${outputLabel}`;
      console.log(`✓ ${sourceLabel}${destinationSuffix}`);
      console.log(
        `  ${metadata.width ?? "?"}x${metadata.height ?? "?"} → ${info.width}x${info.height}`,
      );
    } catch (error) {
      totals.failed += 1;
      console.error(`ERROR ${sourceLabel}`);
      console.error(`  ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (entries.length === 0) {
    console.log("No files found in assets-raw/events/.");
  }

  console.log("");
  console.log(
    `Prepared ${totals.processed}; skipped ${totals.skipped}; failed ${totals.failed}.`,
  );

  if (totals.failed > 0) process.exitCode = 1;
};

await run();
