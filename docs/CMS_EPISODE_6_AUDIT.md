# CMS Episode 6 — source and DEV audit

Status: **DEV Media v2 certified; real editorial dataset migrated and Preview verified; final visual parity and publication pending**.
This document records the source at `mosaique-web/main` commit
`e04b99e8ef58b5de0c9c7d35a873d6a43997c01d`. The feature branch is not a
source for editorial values. The generated [source manifest](./CMS_EPISODE_6_SOURCE_MANIFEST.json)
records every selected photo path, order, SHA-256, dimensions, byte size and reuse.
The [content plan](./CMS_EPISODE_6_CONTENT_PLAN.json),
[Media plan](./CMS_EPISODE_6_MEDIA_PLAN.json), and
[DEV Media mapping](./CMS_EPISODE_6_MEDIA_IMPORTED.json) pin the same source commit and DEV project.
The [DEV editorial mapping](./CMS_EPISODE_6_EDITORIAL_IMPORTED.json) records the
real Home revision and Service/Event codes created after Media certification.
Regenerate it from an export of that commit with:

```sh
node scripts/cms-episode6-source-manifest.mjs \
  /absolute/path/to/main-export \
  e04b99e8ef58b5de0c9c7d35a873d6a43997c01d \
  docs/CMS_EPISODE_6_SOURCE_MANIFEST.json
```

## Editorial mapping

| Area                  | `main` source                                                                              | CMS mapping                                                                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Home                  | `src/features/home/i18n/index.ts`, `src/features/home/content/*`                           | One Home revision: three locale bodies, ordered selection of all six Website Events. Visible marquee options 1 and 3 map to `marqueeText` and `marqueeStatement`; option 2 is unused. Five process steps and eight FAQ items keep source order.              |
| Services              | `src/features/services/data/{services,media}.ts`, `src/features/services/i18n/index.ts`    | Eight Service roots, one per public slug, with `displayOrder` 1–8 and EN/ES/FR fields. The corporate service uses the Fan Fest featured image and has no gallery.                                                                                            |
| Website Events        | `src/features/events/data/*.ts`, `src/features/events/i18n/index.ts`                       | Six Website Event roots with category, related Service, collaboration flag, ordered media and event gallery layouts. All six are selected by Home.                                                                                                           |
| Gallery               | `src/features/gallery/data/{archive,categories}.ts`                                        | Derived from the same six Website Events. No separate gallery records or independent category list.                                                                                                                                                          |
| Current Events / Tree | `src/features/tree-link/content/tree-link.ts`                                              | The three event slots are explicitly `pending`. There is no verified real Current Event, date or title to migrate. The real initial publication should contain no CEV.                                                                                       |
| Shell                 | `src/features/site-shell/content/{navigation,footer}.ts`, feature i18n                     | Service names and links derive from CMS Services. Navigation labels, contact destinations, collaborator identities and legal/interface labels remain code-owned under the current CMS scope.                                                                 |
| SEO                   | Home i18n; Service/Event localized titles and descriptions; `src/layouts/BaseLayout.astro` | Home localized metadata is explicit. Service/Event SEO title is localized title + ` — MOSAÏQUE EVENTS`; description is localized description. Canonical and hreflang remain route-derived. The CMS detail image becomes the social image in the runtime Web. |

Service order and slugs: `organizacion-produccion-integral`, `bodas`,
`celebraciones`, `eventos-corporativos`, `alianzas-venues`,
`montaje-logistica`, `alquiler-mobiliario`, `paquetes-personalizados`.

Event order and slugs: `nossa-copa` (festival → celebraciones),
`baila-da-zaza` (celebration → celebraciones), `baby-shower`
(privateCelebration → celebraciones), `wedding-r-r` (wedding → bodas),
`cumpleanos-ana-paula` (birthday → celebraciones), `fan-fest-club`
(festival → celebraciones). Only the first two have explicit EN/FR media-alt
translations. For the other four, `getLocalizedEvent` on `main` deliberately
falls back to the source Spanish alts; migration must preserve that fallback
without creating translations.

## Media decisions

The manifest selects 88 source photo paths for Service, Event and Home visual
usage, representing 80 distinct SHA-256 binaries. Five duplicate groups cover
eight redundant paths; upload once per hash and reuse the processed Media
version. Two binaries are used only in decorative Web regions, so 78 editorial
binaries were ingested. All selected files are JPEG and below the Media 25 MB
per-file limit.
The original bytes total about 454 MB before deduplication. Each Media asset
must pass the normal private-original upload, verification and processing flow;
the manifest contains no permanent Web asset URL or credential.

Service gallery alts on `main` are generated from localized service title plus
one-based position. The Web runtime now derives those alts from CMS title and
CMS image order. The original Service layout rule is portrait if height exceeds
width, otherwise full landscape; the Web derives it from CMS derivative geometry.
This preserves reuse of an identical binary across Service contexts without
duplicating uploads or changing the certified CMS schema. Service main-image
asset alts must be chosen from the source use; the corporate image retains its
specific Fan Fest alt, while the Event has contextual alt in its own revision.

Hero video and posters, the decorative marquee/process photographs, and the
duplicated Final CTA image strip are currently `aria-hidden` visual composition
owned by Web. They are inventoried in the manifest; the photo binaries already
selected by an Event or Service must use the same SHA identity if ingested.
`custom-packages/04.jpg` is currently used only in the decorative Process visual.
Moving these decorative slots to editorial control would require a deliberate
Home media contract change and a separate Web deployment; Episode 6 does not
invent that contract. Testimonials on `main` explicitly say they are provisional,
so they must not become factual CMS testimonials.

## DEV baseline and safe migration boundary

All remote changes targeted **`fwiquietxxvozyktaxyp`** only. DEV CURRENT
remains `PUB-00000002`, generation 3, containing the old certification snapshot.
Historical `PUB-00000003` remains historical. The scheduled DEV v1 worker was
disabled with `CMS_MEDIA_DEV_WORKER_ENABLED=false` before the additive v2
profile migration was applied. The workflow still checks out `development`
(v1); keep it disabled until a durable v2 worker deployment replaces it.

### CMS-03 v2 cutover and verification

Supabase MCP confirmed the exact DEV project and applied **only**
`20261110160000_cms_media_profile_v2.sql` to DEV. Two local v2 worker
processes finished the new queue and were stopped. All 78 editorial originals
are SHA/byte verified and READY under `cms03-v2-sharp0353`; the three historical
versions are also READY (81/81 total). Orientation is 1, oriented dimensions
match the pinned source manifest, and all 778 expected derivatives have the
expected geometry, MIME, byte size and private Storage object. Landscape and
portrait 1920 px WebP samples were independently decoded and compared with
the main sources (MAE about 3; PSNR about 34.5 dB). Both Media buckets remain
private. No failed v2 jobs remain.

### Editorial and Preview checkpoint

Only after the Media gate, 8 real Services and 6 real Website Events were
created and CLOSED, and Home revision 8 was CLOSED with all six real Event
slots. The 13 old Service roots, 9 old Website Event roots and 15 active old
Current Event roots were retired via Editorial API. Supabase MCP confirmed the
latest CLOSED active set is exactly 8 real Services, 6 real Events and zero
Current Events. Preview's publication selection for Home revision 8 has zero
blockers and zero warnings in EN/ES/FR. The three locales match the pinned
content plan in Home, catalog and all 14 detail views; the referenced main
images and galleries are available. Generic catalog Previews separately
report `WORKING_REVISION` for 15 inactive certification drafts; they are not
part of the Home publication selection. Admin visual Preview has not yet been
verified because the local Admin opens at login and the authenticated Admin
URL is pending. CURRENT, public Web parity, publication and the controlled
edit proof remain pending.

### Pre-publication local Web parity

The authenticated DEV Preview payload was rendered through the feature Web
against a localhost-only `cms-site-v1` stand-in, with its media paths resolved
to the SHA-pinned `main` originals. The reference was the static build of the
exact `main` commit above. Desktop Home, Gallery, Service Detail and Event
Detail were compared in Chrome; the feature's main layout geometry and
selected photographs match the reference. The Gallery at 390 px had no
horizontal overflow. This revealed and corrected local Web deviations:
Home Service scenes now retain `main`'s generic quote label and service query
destination, Process does not render its unused closing field, Service Detail
omits `idealFor` from its header and retains the service query destination,
and Gallery restores the original category order and public URL slugs in
EN/ES/FR (including sitemap). Localized routes and representative images
returned 200; the former English category path returns 404 as expected.
These Web corrections are local working-tree changes and are **not yet on the
deployed DEV Web**. The stand-in validates presentation of Preview content;
it is not evidence that `cms-public/site`, public derivative delivery, ISR or
the final deployed Web have passed. DEV CURRENT remains unchanged pending
that deployment-level check.

Web validation after these local corrections: `pnpm build`, `pnpm lint`,
`pnpm typecheck` (188 files, zero diagnostics), `pnpm test` (22/22), and
`git diff --check` passed. Admin's importer and Preview scripts were formatted;
Admin `pnpm build`, `pnpm lint`, `pnpm typecheck` and `pnpm test` (538/538)
passed. The current deployed Web still displays the certification content.
The attempted DEV publish command was rejected by automatic approval review
because the required final visual/parity validation had not been completed at
that point; it made no mutation. Local parity was completed subsequently, but
the corrected Web code has not been deployed, so publication has not been
retried. No PROD operation was performed.
