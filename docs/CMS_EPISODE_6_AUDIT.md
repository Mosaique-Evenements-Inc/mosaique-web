# CMS Episode 6 — source and DEV audit

Status: **inventory, migration plans, Web service-gallery parity, and DEV Media ingestion prepared; editorial migration blocked by CMS-03 processing failures**.
This document records the source at `mosaique-web/main` commit
`e04b99e8ef58b5de0c9c7d35a873d6a43997c01d`. The feature branch is not a
source for editorial values. The generated [source manifest](./CMS_EPISODE_6_SOURCE_MANIFEST.json)
records every selected photo path, order, SHA-256, dimensions, byte size and reuse.
The [content plan](./CMS_EPISODE_6_CONTENT_PLAN.json),
[Media plan](./CMS_EPISODE_6_MEDIA_PLAN.json), and
[DEV Media mapping](./CMS_EPISODE_6_MEDIA_IMPORTED.json) pin the same source commit and DEV project.
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

Read-only Supabase checks targeted **`fwiquietxxvozyktaxyp`** only. DEV CURRENT
is `PUB-00000002`, generation 3. Its immutable snapshot contains four Services,
three Website Events and six Current Events with certification slugs, not the
real `main` dataset. DEV has 13 Service roots, nine Website Event roots, 16
Current Event roots, one Home root, and only two Media assets (one active).
Historical `PUB-00000003` must remain historical. Existing certification roots
must be made inactive through supported editorial lifecycle commands, not by
rewriting publication tables. A real publication must wait for all 78 editorial
photos to be verified/processed, all 14 real Service/Event roots to be closed,
the Home selection to resolve, certification content to be excluded, and
Preview/review to have zero blockers.

The Admin DEV session was verified against the exact project origin
`https://fwiquietxxvozyktaxyp.supabase.co`. Two images were uploaded manually;
the remaining 76 were uploaded through the same authenticated CMS Media
upload/finalize flow using a SHA-256-checked, resumable importer. The canonical
CMS-03 worker processed the originals. No publication or editorial revision was
created, and CURRENT remains `PUB-00000002` generation 3.

### Processing blocker at the Git/deployment boundary

After all jobs settled, the 78 editorial assets had **16 READY, 26 FAILED with
`RESOURCE_LIMIT`, and 36 FAILED with `OUTPUT_INVALID`**. The two pre-existing
Media assets are separate. The 26 resource failures are the source JPEGs at
6016 × 4016 or 4016 × 6016 (24,160,256 pixels), exceeding CMS-03's fixed
24,000,000-pixel limit despite being below its 25 MB byte limit. An example
`OUTPUT_INVALID` is `events/baby-shower/Karla&Gino-151.jpg` at 2403 × 3600:
the current recipe predicts a 480 × 719 variant while Sharp emits 480 × 720.
The worker rejects it before READY. This is a reproducible processor/profile
incompatibility with approved source media, not a network timeout or missing
asset. The Media originals remain private; no derivative rows were fabricated.

A local API patch adds the `cms03-v2-sharp0353` profile, raises the static
pixel ceiling to 25 MP, requests exact output dimensions from Sharp, and adds
an additive SQL migration that enqueues new profile jobs for verified versions.
The profile's recipe and its processing rows remain separate from v1. A real
source from each failure class and 20 worker tests passed locally. The patch
requires the user's Git checkpoint and coordinated migration/worker deployment
to DEV; neither was applied remotely. Only then can the new profile process
all originals. Creating partial editorial revisions or publishing a subset
would misrepresent the site; Preview, publication, cms-public, Web parity, and
the controlled edit proof remain pending.
