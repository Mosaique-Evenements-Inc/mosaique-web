import { Buffer } from "node:buffer";
import process from "node:process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  publicationInput,
  publicationSourceDirectory,
  cmsRoutePaths,
} from "../src/features/publication/publication.mjs";
import { finalizeArtifact, sha256 } from "../src/features/publication/artifact.mjs";

const dist = resolve("dist");
const requiredPaths = cmsRoutePaths();
const routes = requiredPaths.map((path) => {
  const file = join(dist, path.slice(1));
  if (!existsSync(file)) throw new Error(`ARTIFACT_INCOMPLETE: missing ${path}`);
  return { path, sha256: sha256(readFileSync(file)) };
});
for (const asset of publicationInput.assets) {
  const source = publicationSourceDirectory
    ? join(publicationSourceDirectory, asset.path.slice(1))
    : null;
  const bytes = source
    ? readFileSync(source)
    : Buffer.from(publicationInput.fixtureBytes?.[asset.path] ?? "", "base64");
  if (bytes.length !== asset.byteSize || sha256(bytes) !== asset.sha256)
    throw new Error(`BYTE_HASH_MISMATCH: ${asset.path}`);
  const target = join(dist, asset.path.slice(1));
  mkdirSync(resolve(target, ".."), { recursive: true });
  writeFileSync(target, bytes);
}
const { marker } = finalizeArtifact(publicationInput, routes, requiredPaths);
const markerFile = join(dist, "_cms/artifact.json");
mkdirSync(resolve(markerFile, ".."), { recursive: true });
writeFileSync(markerFile, `${JSON.stringify(marker)}\n`);
process.stdout.write(
  `CMS artifact finalized: ${marker.promotedArtifactSha256}, ${routes.length} routes, ${marker.assets.length} assets\n`,
);
