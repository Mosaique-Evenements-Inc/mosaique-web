import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { dev } from "astro";
import { siteFixture } from "./fixture.ts";

const root = fileURLToPath(new URL("../../../../", import.meta.url));

test("server render uses one CURRENT generation, public images, SEO, 404 and 503", async () => {
  let calls = 0;
  let unavailable = false;
  let currentEvents = siteFixture.currentEvents;
  const api = createServer((request, response) => {
    const url = new URL(request.url ?? "/", "http://localhost");
    if (url.pathname !== "/functions/v1/cms-public/site") {
      response.writeHead(404).end();
      return;
    }
    calls += 1;
    if (unavailable) {
      response.writeHead(503).end();
      return;
    }
    const locale = url.searchParams.get("locale");
    if (!["en", "es", "fr"].includes(locale ?? "")) {
      response.writeHead(400).end();
      return;
    }
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        ...siteFixture,
        locale,
        currentEvents,
        home: {
          ...siteFixture.home,
          content: { ...siteFixture.home.content, heroOverlay: `Published hero ${locale}` },
        },
      }),
    );
  });
  api.listen(0, "127.0.0.1");
  await once(api, "listening");
  const apiAddress = api.address();
  assert.ok(apiAddress && typeof apiAddress !== "string");
  const previous = process.env.CMS_PUBLIC_API_ORIGIN;
  process.env.CMS_PUBLIC_API_ORIGIN = `http://127.0.0.1:${apiAddress.port}`;
  let server: Awaited<ReturnType<typeof dev>> | undefined;
  try {
    server = await dev({ root, server: { host: "127.0.0.1", port: 0 } });
    const base = `http://127.0.0.1:${server.address.port}`;
    const request = (path: string) => fetch(new URL(path, base));
    let before = calls;
    const home = await request("/");
    assert.equal(home.status, 200);
    const homeHtml = await home.text();
    assert.equal(calls, before + 1);
    assert.match(homeHtml, /Published hero en/);
    assert.match(homeHtml, /<title>CMS Home Title<\/title>/);
    assert.match(homeHtml, /CMS Home Description/);
    assert.match(homeHtml, /rel="canonical" href="https:\/\/mosaiqueevenements.com\/"/);
    assert.match(homeHtml, /hreflang="fr-CA"/);
    assert.match(homeHtml, /Published Service/);
    assert.doesNotMatch(homeHtml, /fetch\([^)]*cms-public\/site/);

    before = calls;
    const service = await request("/services/published-service");
    assert.equal(service.status, 200);
    const serviceHtml = await service.text();
    assert.equal(calls, before + 1);
    assert.match(serviceHtml, /<title>Service SEO Title<\/title>/);
    assert.match(serviceHtml, /Service SEO Description/);
    assert.match(serviceHtml, /<picture>/);
    assert.match(serviceHtml, /type="image\/avif"/);
    assert.match(
      serviceHtml,
      new RegExp(`http://127\\.0\\.0\\.1:${apiAddress.port}/functions/v1/cms-public/media/`),
    );
    assert.doesNotMatch(serviceHtml, /\/storage\/v1\/object\/|private-key/);
    assert.equal((await request("/services/absent")).status, 404);
    assert.equal((await request("/events/published-event")).status, 200);
    assert.equal((await request("/events/absent")).status, 404);
    assert.equal((await request("/gallery/absent")).status, 404);
    const spanish = await request("/es/");
    assert.equal(spanish.status, 200);
    assert.match(await spanish.text(), /Published hero es/);
    const sitemap = await request("/cms-sitemap.xml");
    assert.equal(sitemap.status, 200);
    const sitemapXml = await sitemap.text();
    assert.match(sitemapXml, /https:\/\/mosaiqueevenements.com\/services\/published-service\//);
    assert.match(sitemapXml, /https:\/\/mosaiqueevenements.com\/es\/events\/published-event\//);
    const tree = await request("/tree");
    assert.equal(tree.status, 200);
    assert.match(await tree.text(), /Future event/);
    // The API omits an event at its exact end; a fresh render must not resurrect it.
    currentEvents = [];
    const expiredTree = await request("/tree");
    assert.equal(expiredTree.status, 200);
    assert.doesNotMatch(await expiredTree.text(), /Future event/);
    unavailable = true;
    const outage = await request("/services/new-uncached-slug");
    assert.equal(outage.status, 503);
    assert.equal(outage.headers.get("cache-control"), "no-store");
  } finally {
    await server?.stop();
    await new Promise<void>((resolve) => api.close(() => resolve()));
    if (previous === undefined) delete process.env.CMS_PUBLIC_API_ORIGIN;
    else process.env.CMS_PUBLIC_API_ORIGIN = previous;
  }
});
