import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";

export const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
export const canonicalArtifactJson = (value) => {
  if (value === null || typeof value === "boolean" || typeof value === "string")
    return JSON.stringify(value);
  if (typeof value === "number" && Number.isSafeInteger(value)) return String(value);
  if (Array.isArray(value)) return `[${value.map(canonicalArtifactJson).join(",")}]`;
  if (value && typeof value === "object") {
    const keys = Object.keys(value).sort();
    if (keys.some((key) => value[key] === undefined))
      throw new Error("CANONICALIZATION_FAILED");
    return `{${keys.map((key) => `${JSON.stringify(key)}:${canonicalArtifactJson(value[key])}`).join(",")}}`;
  }
  throw new Error("CANONICALIZATION_FAILED");
};

export const finalizeArtifact = (input, routes, requiredPaths) => {
  const safeRoute = (path) =>
    /^\/(?:[A-Za-z0-9._~-]+\/)*[A-Za-z0-9._~-]+$/.test(path) &&
    !path.includes("..") &&
    path !== "/_cms/artifact.json" &&
    !path.startsWith("/_cms/assets/");
  if (
    !routes.length ||
    routes.length !== requiredPaths.length ||
    new Set(requiredPaths).size !== requiredPaths.length ||
    requiredPaths.some((path) => !safeRoute(path))
  )
    throw new Error("ARTIFACT_INCOMPLETE");
  const required = new Set(requiredPaths);
  const seen = new Set();
  for (const route of routes) {
    if (
      !safeRoute(route.path) ||
      !/^[0-9a-f]{64}$/.test(route.sha256) ||
      !required.has(route.path) ||
      seen.has(route.path)
    )
      throw new Error("ARTIFACT_INCOMPLETE");
    seen.add(route.path);
  }
  const manifest = {
    schemaVersion: "cms-static-artifact-v1",
    publicationCode: input.publicationCode,
    snapshotHash: input.snapshotHash,
    webSha: input.webSha,
    technicalAsOf: input.technicalAsOf,
    routes: [...routes].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0)),
    assets: [...input.assets]
      .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
      .map(({ path, sha256 }) => ({ path, sha256 })),
  };
  const promotedArtifactSha256 = sha256(Buffer.from(canonicalArtifactJson(manifest), "utf8"));
  return { manifest, promotedArtifactSha256, marker: { ...manifest, promotedArtifactSha256 } };
};
