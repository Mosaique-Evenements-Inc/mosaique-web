# Mosaïque Content Architecture

Content follows this flow:

```text
base_content.txt
  -> src/content/
  -> components/sections/
  -> UI and motion primitives
```

`base_content.txt` is the original document received from business. The application does not read it at runtime. `src/content/` is the reviewed, typed, semantic representation consumed by the website.

Homepage content lives in `src/content/home/`, with one module per significant editorial section or concept. Content modules describe what Mosaïque says; section components decide how that content is composed; UI primitives represent reusable interface elements; motion primitives own behavior; pages choose which sections appear and in what order.

CTAs and navigation destinations are modeled as labels plus `href` values. Anchors may target sections planned for later implementation, but content modules do not create routes or navigation behavior.

Approved Event media lives in dedicated modules under `src/content/events/`. Each event imports
its selected masters through `src/assets/images/events/index.ts` and owns its featured image,
ordered gallery, layout roles, and reviewed alternative text. Other sections may continue to use
an explicit pending-media state until their own production assets are approved.

## Event Image Workflow

1. Place original deliveries under the Git-ignored `assets-raw/events/<event-slug>/` folder.
2. Run `pnpm images:prepare`. The script corrects orientation, removes unnecessary metadata,
   limits the longest edge to 3600 px, and writes versioned masters to
   `src/assets/images/events/<event-slug>/` without silently overwriting existing files.
3. Export prepared masters from `src/assets/images/events/index.ts` and curate them in the
   corresponding `src/content/events/<event-slug>.ts` module. Do not render an unreviewed folder
   automatically or infer event ownership from filenames.
4. Render approved images through Astro `Picture` using the shared delivery values in
   `src/assets/images/events/delivery.ts`. Astro creates AVIF and WebP responsive variants during
   `pnpm dev` and `pnpm build`; the prepared JPG files remain source masters rather than direct
   production delivery.
5. Validate crops, loading priority, alternative text, layout stability, desktop/mobile behavior,
   and the lightbox before treating the asset pass as complete.

Original deliveries are not committed. Prepared masters, export declarations, and event curation
are committed so clean checkouts and deployments produce the same output.

Business copy must not be hardcoded in UI or motion primitives. A future CMS may replace the TypeScript content modules as the executable source without requiring sections to be rewritten.

Updates follow: business update -> `base_content.txt` -> review/diff -> `src/content/` -> website.
