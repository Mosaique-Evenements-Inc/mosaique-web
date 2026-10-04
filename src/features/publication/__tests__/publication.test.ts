import assert from "node:assert/strict";
import test from "node:test";
import { canonicalArtifactJson, finalizeArtifact, sha256 } from "../artifact.mjs";
import {
  CmsUnavailableError,
  cmsApiOrigin,
  fetchCmsSite,
  validateCmsSite,
} from "../cms-client.ts";
import { getGalleryCategoryIds, getPublication, mapCmsSite } from "../publication.ts";
import { siteFixture } from "./fixture.ts";

test("historical CMS-08C artifact helper retains its fixed vector", () => {
  const result = finalizeArtifact(
    {
      publicationCode: "PUB-00000001",
      snapshotHash: "a".repeat(64),
      webSha: "b".repeat(40),
      technicalAsOf: "2026-09-29T12:00:00.000000Z",
      assets: [],
    },
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

test("public DTO validation rejects malformed content and private media paths", () => {
  assert.deepEqual(validateCmsSite(siteFixture, "en"), siteFixture);
  assert.throws(() => validateCmsSite(siteFixture, "fr"), CmsUnavailableError);
  const broken = structuredClone(siteFixture);
  broken.services[0].mainImage.src = "/storage/v1/object/private/key";
  assert.throws(() => validateCmsSite(broken, "en"), CmsUnavailableError);
  broken.services[0].mainImage.src = siteFixture.services[0].mainImage.src;
  broken.home.content.heroOverlay = "";
  assert.throws(() => validateCmsSite(broken, "en"), CmsUnavailableError);
  broken.home.content.heroOverlay = null;
  assert.equal(validateCmsSite(broken, "en").home.content.heroOverlay, null);
});

test("client propagates locale, validates status, malformed JSON, and unavailable API", async () => {
  let requested = "";
  const fetcher: typeof fetch = async (input) => {
    requested = String(input);
    return Response.json({ ...siteFixture, locale: "es" });
  };
  const site = await fetchCmsSite("es", { origin: new URL("http://localhost:54321"), fetcher });
  assert.equal(site.locale, "es");
  assert.equal(new URL(requested).searchParams.get("locale"), "es");
  await assert.rejects(
    fetchCmsSite("en", {
      origin: new URL("http://localhost:54321"),
      fetcher: async () => new Response("", { status: 503 }),
    }),
    CmsUnavailableError,
  );
  await assert.rejects(
    fetchCmsSite("en", {
      origin: new URL("http://localhost:54321"),
      fetcher: async () => new Response("oops"),
    }),
    CmsUnavailableError,
  );
  await assert.rejects(
    fetchCmsSite("en", {
      origin: new URL("http://localhost:54321"),
      fetcher: async () => {
        throw new Error("offline");
      },
    }),
    CmsUnavailableError,
  );
  assert.throws(() => cmsApiOrigin("https://example.com/secret"), CmsUnavailableError);
});

test("one DTO maps to a coherent generation, public derivatives, and server-filtered agenda", () => {
  const origin = new URL("https://cms.example.test");
  const publication = mapCmsSite(siteFixture, origin);
  assert.equal(publication.generation, 7);
  assert.equal(publication.home.selectedEvents[0], publication.events[0]);
  assert.equal(getPublication({ cmsPublication: publication }, "en"), publication);
  assert.throws(() => getPublication({ cmsPublication: publication }, "fr"));
  assert.deepEqual(getGalleryCategoryIds(publication), ["celebration"]);
  assert.match(
    publication.services[0].mainImage.srcset,
    /https:\/\/cms\.example\.test\/functions\/v1\/cms-public\/media\//,
  );
  assert.deepEqual(
    publication.tree.map((event) => event.code),
    ["CEV-00000001"],
  );
  const expiredAtApi = structuredClone(siteFixture);
  expiredAtApi.currentEvents = [];
  assert.deepEqual(mapCmsSite(expiredAtApi, origin).tree, []);
});
