import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const distUrl = new URL("../../../../dist/", import.meta.url);

const readPage = (path: string) => readFile(new URL(path, distUrl), "utf8");

test("Latino Fake Mariage follows AOA in Home and shows its supplied photography in every locale", async () => {
  const descriptions = {
    "": "An immersive experience that recreates a wedding, where attendees take part as guests while enjoying a staged production, music, food, and dancing.",
    "es/":
      "Una experiencia inmersiva que recrea una boda, donde los asistentes participan como invitados mientras disfrutan de una puesta en escena, música, comida y baile.",
    "fr/":
      "Une expérience immersive qui recrée un mariage, où les participants prennent part à la fête en tant qu’invités tout en profitant d’une mise en scène, de musique, de nourriture et de danse.",
  } as const;

  for (const [prefix, description] of Object.entries(descriptions)) {
    const home = await readPage(`${prefix}index.html`);
    const aoaPosition = home.indexOf('data-event-id="event-slot-07"');
    const latinoPosition = home.indexOf('data-event-id="event-slot-08"');

    assert.ok(aoaPosition >= 0, `${prefix} Home is missing Amante o Amigo`);
    assert.ok(
      latinoPosition > aoaPosition,
      `${prefix} Home must show Latino Fake Mariage second`,
    );
    const latinoCard = home.slice(latinoPosition, home.indexOf("</li>", latinoPosition));
    assert.match(latinoCard, /data-media-status="approved"/);
    assert.match(latinoCard, /DSC_portada\./);
    assert.ok(home.includes(description), `${prefix} Home is missing localized event copy`);
    assert.match(home.slice(aoaPosition, latinoPosition), /data-media-status="approved"/);
    assert.match(
      home.slice(latinoPosition, home.indexOf("</li>", latinoPosition)),
      new RegExp(`href="/${prefix}events/latino-fake-mariage/?"`),
    );

    const detail = await readPage(`${prefix}events/latino-fake-mariage/index.html`);
    assert.match(detail, /<h1[^>]*>Latino Fake Mariage<\/h1>/);
    assert.ok(detail.includes(description), `${prefix} detail is missing localized event copy`);
    assert.match(detail, /<meta name="robots" content="index, follow"/);
    assert.match(detail, /data-kind="image"/);
    assert.match(
      detail.match(/<figure class="event-featured-media"[\s\S]*?<\/figure>/)?.[0] ?? "",
      /DSC_portada\./,
    );
    assert.match(detail, /DSC_3941\./);
    assert.match(detail, /LFM-\./);
    assert.match(detail, /LFMDSC00525\./);
    assert.equal((detail.match(/data-event-lightbox-trigger=/g) ?? []).length, 10);
    assert.equal((detail.match(/<picture>/g) ?? []).length > 10, true);
    assert.doesNotMatch(detail, /jasspass\.com/);
  }
});
