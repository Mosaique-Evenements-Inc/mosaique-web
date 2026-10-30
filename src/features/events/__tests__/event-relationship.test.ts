import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const distUrl = new URL("../../../../dist/", import.meta.url);

const readEvent = (prefix: string, slug: string) =>
  readFile(new URL(`${prefix}events/${slug}/index.html`, distUrl), "utf8");

const getBadge = (html: string) =>
  html.match(/<p\b[^>]*event-header__relationship[^>]*>[\s\S]*?<\/p>/)?.[0];

test("Event Detail shows the shared non-interactive badge for approved relationship roles", async () => {
  const labels = {
    "": { collaborator: "We were collaborators", producer: "We were producers" },
    "es/": { collaborator: "Fuimos colaboradores", producer: "Fuimos productores" },
    "fr/": { collaborator: "Nous étions collaborateurs", producer: "Nous étions producteurs" },
  } as const;

  for (const [prefix, copy] of Object.entries(labels)) {
    for (const slug of ["amante-o-amigo", "latino-fake-mariage"]) {
      const badge = getBadge(await readEvent(prefix, slug));

      assert.ok(badge, `${prefix}${slug} is missing its producer badge`);
      assert.ok(badge.includes(copy.producer));
      assert.ok(!badge.includes(copy.collaborator));
      assert.doesNotMatch(badge, /<(?:a|button)\b/i);
    }

    for (const slug of ["nossa-copa", "baila-da-zaza"]) {
      const badge = getBadge(await readEvent(prefix, slug));

      assert.ok(badge, `${prefix}${slug} lost its collaborator badge`);
      assert.ok(badge.includes(copy.collaborator));
      assert.ok(!badge.includes(copy.producer));
      assert.doesNotMatch(badge, /<(?:a|button)\b/i);
    }

    assert.equal(getBadge(await readEvent(prefix, "baby-shower")), undefined);
  }
});
