import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { canonicalArtifactJson, finalizeArtifact, sha256 } from "../artifact.mjs";
import {
  cmsRoutePaths,
  getPublication,
  getTreeAtAsOf,
  publicationInput,
  validatePublicationInput,
} from "../publication.mjs";

const root = process.cwd();
const marker = JSON.parse(readFileSync(join(root, "dist/_cms/artifact.json"), "utf8"));

test("08C canonical artifact fixed vector", () => {
  const input = {
    publicationCode: "PUB-00000001",
    snapshotHash: "a".repeat(64),
    webSha: "b".repeat(40),
    technicalAsOf: "2026-09-29T12:00:00.000000Z",
    assets: [],
  };
  const result = finalizeArtifact(
    input,
    [{ path: "/index.html", sha256: "c".repeat(64) }],
    ["/index.html"],
  );
  assert.equal(
    result.promotedArtifactSha256,
    "7c54e0b8b02be8486a0fc71878af375d50a6b5cbfc2bde0c17ff7399e3d7ea82",
  );
  assert.equal(
    sha256(Buffer.from(canonicalArtifactJson(result.manifest))),
    result.promotedArtifactSha256,
  );
});

test("strict locale model and immutable media paths", () => {
  const english = getPublication("en");
  const spanish = getPublication("es");
  const french = getPublication("fr");
  assert.equal(english.home.seoTitle, "Mosaïque en");
  assert.equal(spanish.home.seoTitle, "Mosaïque es");
  assert.equal(french.home.seoTitle, "Mosaïque fr");
  assert.deepEqual(english, getPublication("en"));
  assert.match(english.services[0].mainImage.src, /^\/_cms\/assets\/[0-9a-f]{64}\.gif$/);
  assert.equal(english.events[0].gallery[0].alt, "");
  assert.equal(spanish.services[0].mainImage.alt, "Imagen sintética");
  assert.throws(() => getPublication("de" as "en"), /unsupported locale/);
});

test("invalid localized content and media references fail before rendering", () => {
  const missingFrench = structuredClone(publicationInput) as unknown as {
    snapshot: { home: { locales: { fr: { heroOverlay: string } } } };
  };
  missingFrench.snapshot.home.locales.fr.heroOverlay = "";
  assert.throws(
    () => validatePublicationInput(missingFrench as never),
    /home\.locales\.fr\.heroOverlay/,
  );

  const wrongDerivative = structuredClone(publicationInput) as unknown as {
    snapshot: { services: { mainImage: { derivatives: { sha256: string }[] } }[] };
  };
  wrongDerivative.snapshot.services[0].mainImage.derivatives[0].sha256 = "0".repeat(64);
  assert.throws(
    () => validatePublicationInput(wrongDerivative as never),
    /missing exact derivative/,
  );
});

test("Tree uses supplied asOf, includes future ACTIVE, excludes expired and INACTIVE", () => {
  const snapshot = publicationInput.snapshot as unknown as {
    currentEvents: Parameters<typeof getTreeAtAsOf>[0];
  };
  const inactive = {
    ...snapshot.currentEvents[0],
    code: "CEV-00000003",
    lifecycle: "INACTIVE",
  };
  const events = [...snapshot.currentEvents, inactive];
  const before = getTreeAtAsOf(events, "2026-09-29T12:00:00.000000Z", "en");
  assert.deepEqual(
    before.map((event) => event.code),
    ["CEV-00000001"],
  );
  assert.deepEqual(before, getTreeAtAsOf(events, "2026-09-29T12:00:00.000000Z", "en"));
  const originalNow = Date.now;
  try {
    Date.now = () => Date.parse("2035-01-01T00:00:00.000Z");
    assert.deepEqual(before, getTreeAtAsOf(events, "2026-09-29T12:00:00.000000Z", "en"));
  } finally {
    Date.now = originalNow;
  }
  assert.deepEqual(getTreeAtAsOf(events, "2026-10-01T12:00:00.000000Z", "en"), []);
});

test("route inventory and exact public bytes finalize deterministically", () => {
  const paths = cmsRoutePaths();
  assert.deepEqual(paths, [...paths].sort());
  assert.equal(new Set(paths).size, paths.length);
  for (const locale of ["", "es/", "fr/"]) {
    for (const route of [
      "index.html",
      "gallery/index.html",
      "tree/index.html",
      "services/synthetic-service/index.html",
      "events/synthetic-event/index.html",
    ]) {
      assert.ok(paths.includes(`/${locale}${route}`));
      const html = readFileSync(join(root, "dist", locale, route));
      assert.equal(
        marker.routes.find((item: { path: string }) => item.path === `/${locale}${route}`)
          .sha256,
        sha256(html),
      );
    }
  }
  const routes = paths.map((path) => ({
    path,
    sha256: sha256(readFileSync(join(root, "dist", path.slice(1)))),
  }));
  assert.deepEqual(finalizeArtifact(publicationInput, routes, paths).marker, marker);
  assert.throws(
    () => finalizeArtifact(publicationInput, routes.slice(1), paths),
    /ARTIFACT_INCOMPLETE/,
  );
});

test("rendered CMS pages have exact locale content and Tree eligibility", () => {
  for (const [prefix, locale] of [
    ["", "en"],
    ["es/", "es"],
    ["fr/", "fr"],
  ]) {
    const read = (path: string) => readFileSync(join(root, "dist", prefix, path), "utf8");
    assert.match(read("index.html"), new RegExp(`Synthetic overlay ${locale}`));
    assert.match(
      read("services/synthetic-service/index.html"),
      new RegExp(`Service ${locale}`),
    );
    assert.match(read("events/synthetic-event/index.html"), new RegExp(`Event ${locale}`));
    assert.match(read("gallery/index.html"), new RegExp(`Event ${locale}`));
    assert.match(read("tree/index.html"), new RegExp(`Future event ${locale}`));
    assert.doesNotMatch(read("tree/index.html"), /Expired event/);
  }
});

test("marker is safe and missing authoritative input fails closed", () => {
  const bytes = JSON.stringify(marker);
  assert.doesNotMatch(
    bytes,
    /service_role|Authorization|signed|\/Users\/|\/private\/|cms-publication-coordinator|supabase/i,
  );
  const child = spawnSync(
    process.execPath,
    ["--input-type=module", "-e", "import('./src/features/publication/publication.mjs')"],
    {
      cwd: root,
      env: { ...process.env, CMS_PUBLICATION_MODE: "", CMS_PUBLICATION_INPUT: "" },
      encoding: "utf8",
    },
  );
  assert.notEqual(child.status, 0);
  assert.match(child.stderr, /CMS_PUBLICATION_INPUT is required/);
});
