# Mosaïque Web Roadmap

Last verified against code and git history: 2026-08-28.

This document is the source of truth for implementation status. The existence of a module in `src/content/home/` does not mean its section has been implemented.

## Completed

### Foundation

- **Implementation: complete.** Astro static site foundation, React integration, Tailwind token consumption, linting, type checking, and production build are configured.
- **Validation: complete for the current implemented surface.** Build, lint, typecheck, and diff-check have passed during completed phases.

### Design System

- **Implementation: complete for the current foundation.** Primitive and semantic color, typography, spacing, layout, z-index, and motion tokens exist in `src/styles/tokens/`.
- Standard textual CTAs now render through one `Button.tsx` primitive with two inverse capsule variants and one transform-based vertical fill interaction: transparent to light, and light to transparent. Hero, Services, Final CTA, the quote form, and venue-dialog actions preserve their existing destinations, handlers, data attributes, disabled behavior, and contextual sizing. CTA labels use the display family; icon-only and low-chrome controls preserve their established contracts.
- CSS and TypeScript runtime motion tokens are documented and synchronized.
- UI primitives exist for Button, Container, Grid, Heading, Media, Section, Stack, and Text.
- Iconoir is the shared interface-icon source for navigation, disclosures, directional controls, quote-flow states, editorial actions, and the four-icon “¿Por qué elegir MOSAÏQUE?” proof band; decorative media geometry and required-field marks remain outside that icon contract.
- Motion primitives exist for Reveal, StaggerText, MediaCrossfade, StickyScene, and PanelReveal.
- **Production asset completion: deferred.** Approved self-hosted Cinzel and Montserrat files are still pending.

### Content Foundation

- **Implementation: complete.** `base_content.txt` is the business input; typed executable content lives in `src/content/home/`.
- Content modules exist for navigation, hero, about, milestones, metrics, why choose us, marquee, services, projects, process, testimonials, values, FAQ, final CTA, and footer.
- Only implemented sections consume their modules. Content-only modules are not treated as rendered product work.

### Navigation

- **Implementation: complete.** The approved leading logo and four-link desktop and responsive navigation render Nosotros, Servicios, Galería, and Contacto. Galería opens `/gallery`; Contacto opens the dedicated `/contact` page. Tablet and mobile retain the shared native-dialog fullscreen navigation, and no obsolete quote-trigger attributes remain.
- **Services Navigation: complete locally.** The eight canonical Service records own stable semantic slugs and derive one shared navigation model from `servicesContent.items`. Inline desktop navigation renders a compact start-aligned Services dropdown above the existing blur and sticky content; tablet and mobile reuse the fullscreen menu with a natural-flow Services accordion. The desktop panel uses content-sized geometry, `40px` link targets, token-driven `8px` vertical travel, symmetric open/close motion, hover continuity, outside-click cleanup, Escape, Arrow Down, and visible keyboard focus. Links derive the implemented `/services/[slug]` routes from each Service slug.
- The topbar keeps its progressively masked blur and adaptive foreground on overlay pages; event detail and contact retain their approved solid treatment. The shared `--site-navigation-height` value now also supplies exact sticky offsets to page-level navigation such as Gallery categories.
- **Fidelity Pass: complete.** Desktop, tablet, mobile, fullscreen-menu behavior, adaptive contrast, and active-route treatment were compared in-browser against the supplied references. The responsive dialog now follows the approved light editorial reference with the Mosaïque logo and unframed close control in its header, four centered primary links, and verified contact metadata anchored at the bottom. Runtime reduced-motion emulation remains pending; the CSS media paths passed code review.
- **Mobile Services accordion rhythm refined locally.** Its internal vertical padding now exists only while expanded, so the four primary navigation options retain uniform spacing when Services is collapsed. The established 68% subordinate-link tone remains unchanged, together with keyboard access, inert collapsed content, and the existing disclosure transition.
- **Mobile trigger refinement complete.** Below 48 rem, the menu trigger presents only its existing menu glyph while retaining the full 44 px interactive target, accessible name, active feedback, and visible keyboard focus treatment.

### Quote / Contact Flow

- **Implementation: complete for the available contact infrastructure.** The inline form at `/contact` now has one capture stage containing Contacto and Información del evento. Información adicional and the step indicator are no longer rendered. The former main quote dialog and its global trigger interception have been removed.
- Form validation runs only when opening review, focuses the first invalid control, and preserves every value through review edits. Review remains a separate confirmation state rather than a second form step.
- The phone control keeps a fixed, accessible `+1` prefix outside the editable value, accepts only decimal digits up to the existing 10-digit limit, and normalizes the submitted value to the `+1<digits>` contract.
- The existing cancellable `quote:submit-request` event now connects the form to the production `POST /functions/v1/leads` endpoint through typed validator, Zustand, hook, service, and repository layers. Only an HTTP 201 response completes the flow; validation, network, and backend errors preserve the form for retry. Venue-file transport remains outside the current inline form.
- All approved quote and contact actions now navigate to `/contact`; no homepage CTA opens an overlay, drawer, sheet, or dialog for the main form.
- Mobile uses natural page scroll, one-column fields, a full-width primary action, and media after the form. Tablet and desktop use the dedicated split form/media composition.
- **Implementation: complete.** Desktop uses the approved `logo_topbar.png` asset at the leading edge and a focused inline navigation containing Nosotros, Servicios, Galería, and Contacto without a hamburger. Contacto owns the centralized Quote Flow trigger; the former “Cotizar un evento” topbar action was removed. At the existing `xl` breakpoint (80 rem), tablet and mobile switch to one shared native-dialog fullscreen navigation whose Contacto item opens that same flow.
- The topbar uses one background-free, progressively masked backdrop-blur layer that extends visually below its fixed height without a divider, tint, shadow, layout space, or interaction interception. Its foreground switches between the existing light and dark text tokens according to the explicitly declared surface currently beneath its centerline across the entire page; solid event-detail navigation remains fixed to its approved dark foreground. The white transparent logo is applied as a current-color mask so it follows the same contrast state without introducing a duplicate asset.
- The fullscreen menu uses `100dvh` with a viewport fallback, safe-area padding, internal overflow, document scroll locking with exact restoration, native modal focus containment, Escape and close-button handling, link-close behavior, and focus return to the trigger.
- **Fidelity Pass: complete.** The desktop underline interaction and compact circular mobile control were reinterpreted from the supplied David Tutera references in Mosaïque tokens. The new composition was compared in-browser at 1440 px, the 1280 px desktop threshold, tablet landscape and portrait, 430 px and 390 px mobile, and 320 px narrow mobile. Runtime reduced-motion emulation remains pending; the CSS media path and immediate JavaScript close path passed code review.

### Contact Page

- **Implementation and Fidelity Pass: complete.** The static `/contact` route reuses Navigation, Footer, the two-tab QuoteForm, approved quote labels, and the verified contact email from the existing content foundation.
- **Cinematic surface refinement: complete locally.** `/contact` now selects the reusable `BaseLayout` cinematic surface and remaps its page-local form text, borders, placeholders, controls, focus ring, and action-button contrast to white over black. Navigation receives the existing light-contrast signal, the supporting media and Footer inherit the black handoff, and the shared QuoteForm remains unchanged for other consumers. Desktop `1440 × 900` and mobile `390 × 844` passed rendered contrast, zero-overflow, and console checks.
- Desktop follows the supplied reference with an approximately 40/60 form-media split, compact form density, pill-shaped token-driven fields, existing select contracts, a strong full-width action, and large sticky supporting photography. The single-stage form begins directly with its content and retains a visually hidden accessible heading without a redundant page title or step indicator. Tablet preserves a readable split; mobile stacks form then media in natural flow.
- The form's supporting photography is isolated in `ContactMedia.astro`, using an approved repository image without changing form behavior or page composition.
- The page introduces no complex motion. Labels, fieldsets, validation errors, keyboard navigation, focus states, loading status, review editing, auxiliary dialogs, and the accessible success toast remain available.
- **Production submission behavior restored locally.** The primary action again follows the original validate → review → production-endpoint flow: incomplete fields and request failures remain inline for correction, while the accessible toast appears only after a confirmed successful response. Its manual and timed dismissal behavior remains unchanged.
- **Form exit navigation added locally.** A compact, accessible left-arrow control now belongs to the form's normal flow at the upper-left, immediately above the `Contacto` heading, so it cannot cover fields or create a sticky black band while scrolling. It returns to the previous page with a locale-aware homepage fallback for direct entries; the lower action area retains one full-width primary action while form values and review behavior remain unchanged.
- **Primary contact action validation moved to intent locally.** The CTA now remains visually active and keyboard-operable before completion, retaining `disabled` only during a real submission. Clicking an incomplete form runs the existing global validation, renders every field-specific error, and focuses plus conditionally smooth-scrolls to the first invalid visible control; invalid review submissions reopen the form before moving focus, with all entered values preserved.
- **Canadian phone prefix restored locally.** The Contact phone field again uses a fixed Canada flag and `+1` prefix with a 7–10 digit national number; review and submission prepend the verified Canadian calling code without exposing a country selector.
- **Quote dropdown primitive implemented locally.** Every native selector visible in the quote form—preferred language, service, event type, and guest range—now renders through the shared `CustomSelect.astro` primitive. Its button/listbox UI preserves the existing typed option sources and hidden native form contract while adding selected checks, keyboard navigation, Escape/outside dismissal, internal list scrolling, responsive touch targets, subtle reduced-motion-safe chevron feedback, and Mosaïque's cinematic treatment.
- **Quote dropdown open-state restyled locally.** Open listboxes now follow the supplied dark editorial reference with a translucent cinematic surface, restrained backdrop blur, fine neutral border, cream text, generous option rhythm, subtle Champagne hover/selection feedback, and no light SaaS-style card treatment.
- **Quote dropdown density refined locally.** Open listboxes now match the Services navbar dropdown's `78%` cinematic transparency, `24%` inverse border, and shared blur strength. Their option rhythm is tightened further to the minimum accessible touch target, with a shorter internal viewport and scrolling retained for long lists.
- **Event calendar moved inline locally.** The date trigger now opens its existing calendar as an anchored panel directly beneath the field instead of invoking a modal dialog. Month navigation, day selection, keyboard movement, Escape and outside-click dismissal remain intact without a backdrop or page interruption.
- **Inline calendar density and period controls refined locally.** The anchored calendar now uses a compact 22 rem surface, tighter day grid, and the shared custom dropdown primitive for localized month and year selection. Past periods clamp to the current month while previous/next controls and the existing date-selection contract remain available.
- **Contact toast surface refinement complete locally.** The success notification uses the system's larger restrained radius and inherits a dark, inverse-text treatment on the cinematic Contact surface without introducing a light card that conflicts with the page background.
- **Inline contact-email row removed locally.** The redundant centered `Email / info@mosaique-events.com` line no longer renders beneath the form; the verified address remains available through the shared Footer contact block.

### Hero

- **Hero video delivery optimized locally.** The preserved `src/assets/video/hero.mp4` master (4K HEVC, 30 fps, 9.633 seconds, 43,146,092 bytes) now supplies `public/media/video/hero.webm` (VP9 CRF 31, 16,926,406 bytes), `hero.mp4` (H.264 slow/CRF 23, faststart, 13,489,799 bytes), and `hero-poster.avif` (frame at 1 second, Sharp quality 65/effort 6, 284,438 bytes). Both videos are uncropped 1920 x 1080, yuv420p, 30 fps, and audio-free. The Hero content module owns the public URLs; its existing media wrapper now renders WebM first, H.264 fallback, and the AVIF poster with muted inline autoplay, loop, and metadata preload. Only the existing media sizing selector was extended to video; overlay, caption script, sticky geometry, typography, CTA, and reduced-motion rules remain unchanged. Inspection found no active Hero media zoom to alter. Browser checks at 1280 x 720, 900 x 900, 390 x 844, and 320 x 800 confirmed cover framing, playback, zero horizontal overflow, and a clean console; desktop title/CTA geometry matches the placeholder baseline exactly. WebM loop, standalone H.264 playback, and AVIF decoding passed. Native Safari/iOS and runtime reduced-motion emulation were not tested. ffprobe, scoped Prettier, build, lint, typecheck, master SHA-256 preservation, and diff-check passed; no dependencies, commit, or push.
- **Implementation: complete.** Full-viewport media scene, initial title and CTA, replaceable media contract, and a CSS-only PanelReveal handoff into About. The former oversized Mosaïque brand and its scroll-linked morph were removed, together with the extra 45svh used to stage that animation.
- **Editorial emphasis refinement complete locally.** The approved Hero sentence remains unchanged while `viven`, `recuerdan`, and `comparten` render as semantic italic segments from the typed content source. Browser checks at `1440 × 900` and `375 × 844` confirmed exactly three italic segments, the unchanged accessible sentence, retained display-family inheritance, complete mobile wrapping, zero horizontal overflow, and no console warnings or errors. The heading level, CTA, scroll behavior, and media contract remain unchanged.
- **Hero copy width refinement complete locally.** The centered title measure increases from `18ch` to `24ch` so the approved sentence occupies a wider editorial block while retaining intrinsic wrapping and the existing responsive container boundary. Browser checks measured approximately `400px` at `1440 × 900` and `335px` at `375 × 844`, with the three italic segments intact, zero horizontal overflow, and no console warnings or errors.
- **Desktop Hero measure expanded and validated locally.** From the existing `lg` breakpoint, the title measure increases independently to `32ch`; compact viewports retain the validated `24ch` measure. Browser checks measured approximately `534px` at `1440 × 900` while mobile remained `335px` at `375 × 844`, with zero horizontal overflow and no console warnings or errors.
- **Hero phrase wrapping refined and validated locally.** A semantic non-breaking space keeps the roman `se` attached to italic `recuerdan`, so both words move together instead of splitting across lines. Browser geometry at `1280 × 720` confirmed both fragments share the exact line top, with unchanged accessible text, zero horizontal overflow, and no console warnings or errors.
- **Fidelity Pass: complete.** Initial, intermediate, final, and section-handoff states were compared against screenshots and recordings.
- Desktop, tablet, mobile, and reduced-motion states were validated.

### About

- **Homepage status corrected against code.** `AboutMilestones.astro` and its typed content remain available, but the section is currently commented out of the homepage composition and is not a rendered homepage surface.
- **Dedicated page implementation: complete locally.** `/about` reuses the shared Navigation and Footer, presents the approved About copy as a cinematic CSS-only line reveal, and follows it with a full-bleed, deterministic masonry mosaic sourced from a typed editorial selection of 31 available event photographs. The same media item supports future animated GIFs without sending them through static optimization.
- The hero preserves the `2420 / 1080` desktop reference proportion from `lg` upward; tablet and mobile use `100svh` so the editorial title remains readable. The mosaic uses the existing `sm`, `md`, `lg`, `xl`, and `2xl` breakpoints to progress from two through seven columns with no gutters, captions, frames, hydration, listener, or new dependency.
- **Fidelity and responsive validation: complete for the supplied references and local implementation.** Chrome measurements at `375`, `430`, `768`, `1024`, `1440`, and `1920px` confirmed two, two, four, five, six, and seven columns respectively, exact viewport-width sections, and zero horizontal overflow. Desktop captures preserve the `2420 / 1080` hero proportion and full-bleed mosaic handoff; compact layouts retain the title in a readable `100svh` composition. Runtime reduced-motion validation exposes the complete final title and caption with no reveal or drift.
- **Media hover refinement implemented locally.** Fine-pointer hover now applies a restrained zoom and contrast treatment, fades in a cinematic lower shade, and reveals an approved event or neutral category label through a masked vertical entrance. The unassigned K&T wedding photography deliberately uses `Boda` rather than being attributed to Wedding R&R. Touch layouts keep the photography unobstructed, reduced motion removes every transition, and no interactive semantics, runtime JavaScript, asset duplication, or new dependency was added.
- **Compact-title and mosaic-spacing refinement complete locally.** The About title now follows Gallery's word-safe wrapping contract with inline-block words, `1.08` line height, intrinsic height, and no clipping mask, while retaining its line-stagger reveal. The mobile caption receives an explicit `16px` internal inline inset so it cannot touch the viewport edges. The full-bleed mosaic keeps zero page-edge gutters and adds only a `2px` inter-item column/row separation. In-browser validation at `375`, `430`, and `1440px` confirmed complete title glyphs, the caption inset, exact viewport-width surfaces, zero outer mosaic gutters, exact `2px` internal gaps, the expected two/six columns, and no horizontal overflow.
- **Hero-to-mosaic scroll and title-motion alignment complete locally.** About now reuses the same shared `PanelReveal` composition as Home's Hero-to-Events handoff: its `145svh` lead contains one native `100svh` sticky scene while the full-bleed mosaic advances above it in document flow. The former automatic line reveal, caption fade, and perpetual drift are removed. The title now follows Gallery Archive's observed, one-time character reveal with word-safe spans, `22ms` stagger, shared motion tokens, and immediate final state under reduced motion. In-browser checks at `1440 × 900` and `375 × 844` confirmed the exact `145svh` / `100svh` geometry, sticky lead, progressive panel overlap, one-time 47-character reveal, complete mobile title, retained two/six-column mosaic, zero horizontal overflow, and no console warnings or errors. The current in-app browser cannot emulate reduced motion; the compiled immediate-state branch passed code inspection but fresh runtime emulation remains pending.
- **Mosaic scope refined locally.** The About surface now renders exactly 31 approved photographs from the supplied visual span instead of the complete 91-asset inventory. Six explicit editorial groups preserve that desktop composition at the validated six-column breakpoint, while compact and ultra-wide layouts retain their existing natural responsive column flow.

### Milestones

- **Implementation: complete.** Five semantic timeline items render from `src/content/home/milestones.ts`.
- **Fidelity Pass: complete.** Desktop label/description rows, sticky-media relationship, tablet split, and mobile linear flow were validated.

### Services

- **Home cinematic refactor: implemented locally.** The former `28/72` React scene was replaced
  by an Astro-only intro followed by eight Service preview scenes copied from the validated Event
  Detail “Más experiencias” pattern. Event components and CSS remain unchanged.
- The sequence consumes the canonical eight-Service catalog in editorial `index` order. Every
  scene renders Service index, title, description, “Ideal para” copy, `Ver más` to
  `/services/{slug}`, and `Cotizar` to the record's preselected Contact route.
- Desktop/tablet and mobile retain the Event preview geometry: first seven scenes use `250svh`,
  the final scene `150svh`, sticky surfaces use `100svh`, and consecutive scenes overlap by
  `-100svh`. Frame/media scale, copy travel, and outgoing overlay `0.12 → 0.80` use independent,
  production-safe Home Services timelines.
- Reduced motion restores eight `100svh` natural-flow scenes with no overlap, sticky takeover,
  scaling, copy motion, or scroll-linked darkening.
- The eight canonical `featuredMedia` records remain honestly `pending`; the copied media branch
  already supports the existing image/video pipeline and currently renders deterministic,
  token-driven placeholders at the final geometry. Asset 1–8 assignment remains pending delivery.
- The old `StickyServices`, `ServicesScene`, `ServicesIntro`, `services-spike.css`, and now-unused
  `ScrollLinkedScene` implementation were removed after confirming no remaining consumers.
- **Fidelity and responsive validation: complete for dev and optimized preview.** At
  `1280 × 720`, Home Services matches Event “Más experiencias” with `1800px` initial scenes,
  `1080px` final scenes, `720px` sticky surfaces, active reciprocal media animations, and the
  same outgoing overlay timeline. `900 × 900`, `390 × 844`, and `320 × 800` preserve all eight
  scenes, sixteen CTA links, full copy, and zero horizontal overflow. The optimized preview
  reports the same animation names/timelines and no console warnings or errors. Compiled reduced-
  motion CSS retains the natural-flow override; runtime media emulation is unavailable in the
  integrated browser.
- **Home Service photography darkened locally.** Every Service preview now begins with a `0.32`
  inverse overlay instead of `0.12`, producing the requested 20-percentage-point darker image
  treatment while retaining the existing outgoing `0.80` endpoint, scroll timeline, copy and CTA
  contrast, and the same static `0.32` treatment under reduced motion.

### Projects / Experiences

- **Implementation: complete.** The section now presents a six-slot gallery for completed events from `src/content/home/projects.ts` instead of five conceptual project categories.
- The six approved event names, descriptions, derived categories, slugs, detail links, and featured photographs live in one typed `eventGalleryItems` collection. Clients, venues, and dates remain unavailable, so the records preserve only verified metadata and stable identifiers.
- **Fidelity Pass: complete.** The Movra editorial split, divider, typography, portrait media, and desktop controls remain unchanged; responsive controls were aligned with the CTA row against the supplied mobile reference.
- The desktop carousel uses native horizontal scrolling, scroll snap, touch/keyboard scrolling, and accessible previous/next controls. Arrow navigation advances in derived two-event pages (`1–2`, `3–4`, `5–6`) without an isolated final card; the live status announces the first event in the visible pair as `Evento X de 6`.
- Tablet and mobile use the same data-driven carousel in a single-event mode: one complete event card is visible at a time, navigation advances by one, and the finite previous/next controls share the CTA row above the active card. Mobile keeps the full-width editorial heading clear of the navigation and uses one tokenized grid gap between that control row and the media; tablet retains its wider spacing. Approved featured photography is delivered through the shared Astro responsive-image contract.
- Desktop, tablet, mobile, breakpoint resize normalization, reduced-motion behavior, overflow, six-item completeness, all six responsive navigation states, and all three desktop paired navigation states were validated.
- **Carousel control refinement complete.** Previous and next controls now present only their arrow glyphs without a surrounding border or fill, while preserving the 44 px target, disabled state, accessible labels, focus visibility, and existing finite navigation behavior.

### Gallery / Eventos realizados

- **Implementation: Phase 4 structural build complete.** `/gallery` renders the `All` archive and static `/gallery/[category]` routes render each derived category. All routes compose the existing Navigation and Footer around `GalleryArchive.astro`, use `eventGalleryItems` as their only event source, and keep every row linked to its existing `/events/[slug]` detail route with approved featured media, category, and event title visible.
- `All` is selected by default. The remaining filter links and URL-safe route IDs derive from the categories present in the event records without React, duplicated records, or a parallel category list. Desktop and tablet portrait use the approved two-column composition with a sticky vertical sidebar; mobile uses wrapped category links and stacked event rows in natural flow.
- **Motion & Interactions: Phase 5 complete.** Filter hover, keyboard focus, and active state use the shared action-button fill behavior in Mosaïque colors. Ordinary same-tab category changes preserve their real link destinations while adding a short list exit and destination entrance; modifier clicks and reduced-motion navigation remain native and immediate. Event titles reveal once by character as their rows enter the viewport, with no invented row or media hover. Reduced motion reveals every title immediately and removes all Gallery animation and transition delays.
- **Shared button integration complete.** Gallery category links now render through the existing static `Button` contract, inheriting the same display typography, responsive label size, pill geometry, fill transition, active feedback, focus treatment, and reduced-motion behavior used by the site's other actions while preserving their real routes and active-category semantics.
- **Responsive Fidelity: Phase 6 complete.** Desktop and tablet landscape retain the wide two-column archive, tablet portrait now matches the audited compact proportions with a 9 rem sticky sidebar, 2.75 rem filters, narrow gutters, a reference-scale 331:200 media column, and restrained title sizing, while mobile switches below 48 rem to the audited wrapped filter composition and stacked 1.9:1 rows. The existing Mosaïque fullscreen navigation remains the intentional brand adaptation at tablet and mobile sizes. Browser comparison covered 1280, 1024, 768, 430, 390, and 320 px with no horizontal overflow.
- **Mosaïque Content Integration: Phase 7 complete.** The six approved names, categories, descriptions, slugs, detail destinations, status flags, and featured-media records remain centralized in `eventGalleryItems`; the Home gallery, archive, category routes, and detail pages consume that collection without parallel event data. Archive category routes derive from the source categories and visible copy remains limited to category and title. No clients, venues, dates, locations, or future destinations were invented.
- **Visual Fidelity Pass: Phase 8 complete.** Five browser passes covered macro proportions, typography/spacing, interactions/motion, responsive transformation, and polish. The archive remains fluid beyond 90 rem like the reference, with 1 vw outer/grid gutters, a 38% media column, 331:200 media, a 2 vw copy inset, uncapped reference-scale title growth through 8 rem, continuous character staggering, and section-owned sticky boundaries. Gallery filters intentionally follow the shared site button system rather than retaining reference-only dimensions and motion. Desktop, tablet, mobile, narrow mobile, scroll reveal, sticky stop, footer handoff, active navigation, and horizontal overflow were rechecked without console errors.
- **Title clipping regression corrected.** Gallery event headings retain their fluid scale and opacity/transform character reveal without a word-level overflow mask, so the display font's ascenders, accents, and descenders remain fully visible at every breakpoint.
- **Final QA: Phase 9 complete for the available browser environment.** The final matrix covered 2048, 1440, 1280, 1024, 768, 430, 390, and 320 px; `All` plus every derived category route; expected filtered counts; event-detail destinations; pointer/touch activation; filter hover; character reveal; sticky start, active state, stop, and footer handoff; mobile-dialog scroll lock, close control, and focus return; active navigation; console output; and horizontal overflow. Every generated route also passed the production build. The Gallery remains static Astro with no hydrated island. Native links/buttons and visible `:focus-visible` rules were reviewed for keyboard access, while this browser-control surface could not dispatch Tab/Escape or emulate `prefers-reduced-motion`; the native dialog cancel path and both reduced-motion CSS/JavaScript branches passed code review, but those two runtime checks remain an explicit environment limitation.
- **Controlled gallery roadmap:** Phase 1 Reference Audit, Phase 2 Mosaïque Audit, Phase 3 Architecture / Technical Plan, Phase 4 Structural Build, Phase 5 Motion & Interactions, Phase 6 Responsive Fidelity, Phase 7 Mosaïque Content Integration, Phase 8 Visual Fidelity Pass, and Phase 9 Final QA are complete.

### Event Detail

- **Implementation: complete for the approved event copy and supplied photography.** One Astro dynamic route at `/events/[slug]` composes the existing Navigation and Footer around an editorial event header, a data-driven gallery, and a reusable native-dialog lightbox. The six stable Project / Experience records now link to their corresponding generated detail routes without duplicating page templates.
- Event detail content is derived from the same typed event collection and adds only a slug, title, description, featured image, and curated gallery. No client, venue, date, location, or other unverified business metadata was introduced; the category used by `/gallery` remains in the shared source record and is not rendered as extra detail metadata.
- The gallery remains server-rendered Astro and follows the approved strict editorial composition: a constrained three-column 2:3 grid with a hairline gap on desktop, two columns on tablet, and one full-width column on mobile. Gallery crops use `object-fit: cover`; the lightbox preserves each complete asset without squashing. Approved local images use Astro Assets with responsive widths, sizes, intrinsic metadata, and selective loading priority; no gallery dependency or additional React island was introduced.
- **Baseline implementation retained; David Tutera reference-fidelity program complete.** The dynamic Astro route at `/events/[slug]`, its six stable Project / Experience records, Navigation, Footer, and typed media contract remain the foundation rather than being rebuilt.
- Reference Diagnostic, Current Mosaïque Diagnostic, and Page Shell + Routing + Content Model are complete: the existing route uses the shared overlay Navigation, a dark semantic event chapter, and separate typed contracts for featured media and gallery media without inventing location, category, client, venue, date, or approved assets.
- **Event Info Rail implementation and Fidelity Pass are complete for approved content.** Event Detail now begins directly with the visible Gallery Detail composition from the supplied asset; the previously proposed intro/entrance is explicitly outside scope and was removed before release. Desktop and tablet use a proportional 28/72 rail/media foundation with Mosaïque display hierarchy, restrained narrative placement, and a lower divider. Mobile returns the rail to natural flow. Desktop, tablet, mobile, narrow-mobile overflow, and browser-console behavior were validated against the supplied reference.
- No location, category, client, venue, or date is rendered because none is approved in the Content Foundation. The rail can receive verified metadata later without changing its composition.
- **Featured Media implementation is complete for the available content contract.** `EventFeaturedMedia.astro` owns a proportion-aware pending state plus approved image and captioned-video variants. All current events use approved Astro image assets; a future approved video would remain user-initiated, require captions in the typed model, and receive a control only when an actual source exists. Desktop, tablet, mobile, narrow-mobile geometry, overflow, and browser-console behavior were validated with the supplied photography.
- **Sticky Desktop Composition implementation and Fidelity Pass are complete.** From the existing `lg` breakpoint, the full-viewport Event Info Rail uses native CSS sticky positioning with a zero top offset, remains bounded by the real Event Detail chapter height, and releases progressively when that parent reaches its end. The gallery keeps native document scroll; Navigation remains above the rail without overlap. Tablet and mobile intentionally remain in normal flow. No listener, artificial scroll distance, fixed-position hack, or additional runtime was introduced.
- **Editorial Gallery implementation and Fidelity Pass are complete for the six available media slots.** The Content Foundation assigns explicit `pair-landscape`, `pair-portrait`, and `full-landscape` roles, and Astro renders the measured reference sequence as centered media inside two-column and full-width editorial rows rather than a generic masonry grid. Desktop media geometry, row spacing, responsive flow, six-slot order, lightbox indexing, expanded sticky duration, overflow, and browser-console behavior were validated. Approved local images continue to use Astro Assets; no gallery dependency or React island was introduced.
- **Sticky Release / End of Chapter implementation and Fidelity Pass are complete.** The final gallery row and the Event Detail chapter boundary now share the same tokenized editorial gap: `14px` at the measured desktop viewport and `8px` on compact viewports. The native sticky rail remains governed by the chapter boundary, releases progressively with its parent, and hands directly to the following content without a spacer, fade, listener, or fixed-position override. The wider negative space before the reference's More Galleries heading belongs to that next section and remains deferred to its own phase.
- **More Galleries / Next Gallery Preview implementation and Fidelity Pass are complete with approved featured media.** A dedicated Astro section uses the established event order to link each detail page to one next event, including the final-to-first boundary, without a carousel or related-content runtime. At `1440 × 900`, the rendered comparison reproduces the reference's `144px` chapter-to-heading gap, `144px / 122.4px` heading geometry, `130px` heading-to-preview gap, centered `70% → 100%` frame expansion with a compensating `130% → 100%` media contraction, `750svh` desktop chapter, full-viewport sticky state, and natural Footer release. Tablet, mobile, and narrow mobile return the preview to normal flow and passed overflow and console validation. Browsers without scroll-driven animation support receive a static `100svh` preview; reduced motion removes both scales and the additional sticky scroll distance. Static output confirms all six generated links, labels, and responsive images.
- **Responsive Fidelity is complete.** Laptop, desktop-threshold, tablet, mobile, and `320px` useful-width states preserve one semantic render tree, readable rail copy, the editorial gallery sequence, normal-flow compact previews, and a full-viewport responsive lightbox without horizontal overflow. All six current and next-event titles were exercised at compact widths. The tablet title scale now responds to the rail's actual width so the longest approved event name does not collide with media; desktop and mobile geometry remain unchanged.
- **Viewport-entry media reveal implementation and accessibility validation are complete.** The featured-media and gallery contracts now use nested, non-semantic visual wrappers to reproduce the measured reference behavior: each entering gallery frame progresses from `80% → 100%` while its media compensates from `120% → 100%`, with no opacity gate, listener, observer, hydration, or changed interactive target. Unsupported browsers retain fully visible media. Desktop, tablet, mobile, and `320px` useful-width geometry, six-control completeness, overflow, and browser-console behavior passed rendered validation.
- The accessibility tree preserves one `h1`, the labelled gallery region, all six descriptive image buttons, the labelled next-event region, and the existing heading order. The lightbox still moves focus to Close, reports its live position, updates finite boundaries, locks document scroll, and returns focus to the originating image control. The new visual wrappers do not add roles, names, focus stops, or reading-order changes.
- The `prefers-reduced-motion` branch removes both reveal transforms and animations, preserves every media item at full scale, disables hover enlargement and dialog entry motion, and collapses the long next-preview chapter back to `100svh` normal flow. Static CSS review passed, but runtime media-query emulation remains pending because the available in-app browser exposes neither media emulation nor CDP and no connected Chrome browser is available. This limitation is recorded rather than treating code inspection as runtime acceptance.
- **Full Fidelity Audit is complete for the approved media contract.** At `1440 × 900`, initial load, early scroll, normalized mid and late sticky-gallery states, chapter release, More Galleries entry, next-gallery preview, and Footer release were compared with the live reference. The audit corrected the gallery reveal to use the reference's full viewport-entry interval and added the preview's reciprocal inner-media contraction. The final checks align the first entering row within roughly one percentage point (`91.6%` local versus `90.7%` reference), the next entering row (`83.9%` versus `84.2%`), sticky release (`-199.7px` rail top in both), heading and preview gaps, and preview entry scales (`94.1% / 105.9%` local versus `94.0% / 106.0%` reference). A later real-media regression reconfirmed the geometry without changing the motion contract. The environment-limited reduced-motion exception is not recorded as runtime emulation.
- **Performance + Final QA are complete for the supplied photography.** The production Event Detail route emits approximately `5.5 KB` gzip of HTML and `2.8 KB` gzip of route CSS, creates no Astro/React island, and adds no route-specific gallery scroll listener. All six generated routes, variable gallery counts, cyclic next-event links, heading structures, landmarks, and Footer handoffs passed runtime checks. Only the featured image is eager; gallery, lightbox, and next-event media remain lazy. Laptop, mobile, and narrow-mobile states passed rendered overflow, long-title, natural-flow, preview, and menu checks. Final field LCP conclusions remain deployment acceptance work.
- The live reference contains seventeen visible gallery images while supplied Mosaïque galleries currently range from two to seven curated images. Exact photographic sequence and total scroll duration therefore remain event-specific rather than being padded with duplicated or unrelated media. The live event did not expose a three-column or asymmetric desktop row, so neither was invented in the current render.
- Runtime reduced-motion verification remains a separate production-acceptance item because the available browser cannot emulate the media feature.
- The finite native-dialog lightbox opens from the selected image, supports previous/next controls, Arrow keys, Escape, close control, appropriate outside-media close, document scroll locking, live position status, visible focus, disabled boundary states, and focus return to the originating image. Motion is token-driven and the reduced-motion media query removes decorative transitions without changing access to content or controls.
- The previous strict-grid validation remains historical baseline evidence, not acceptance of the new reference. Each new fidelity phase requires its own rendered desktop, tablet, mobile, scroll-state, and reduced-motion validation.

### Why Choose Us

- **Implementation: complete.** Four numbered reasons render from `src/content/home/whyChooseUs.ts` in a static Astro section positioned after About/Milestones according to the Content Foundation.
- The section uses a quiet editorial proof band with semantic articles, four columns on desktop, two columns on tablet, and a linear mobile flow.
- **Fidelity Pass: complete.** Desktop uses the Movra proof-band hierarchy with centered icon-led items, compact utility labels, body-led descriptions, lower vertical density, and vertical dividers between four columns without a visible section title.
- Compact desktop and tablet retain the two-column divided layout; mobile remains linear for readability.
- Desktop, desktop-minimum, tablet, mobile, overflow, content completeness, and the motion-free reduced-motion state were validated.

### Marquee

- **Implementation: complete.** A full-viewport Astro scene renders content from `src/features/home/content/marquee.ts` after Process in the current Home panel sequence.
- **Fidelity Pass: complete.** The scene enters through a three-step media reveal and remains sticky for a bounded scroll interval, while its oversized ticker runs independently as a token-driven CSS autoplay loop.
- The bounded reveal uses one passive scroll listener only while the scene is near the viewport, batches updates with requestAnimationFrame, and writes only transform and opacity styles without React hydration.
- **Photography integrated locally.** The full-bleed media contract now uses one approved Fan Fest photograph from the existing event inventory, delivered responsively through Astro Assets with its original overlay preserving text contrast. The former abstract placeholder shapes were removed without changing the sticky reveal, ticker, or reduced-motion contracts.
- **Scroll-driven depth transition implemented locally.** During the existing bounded sticky interval, the approved photography now performs a reversible `1 → 1.18` desktop dolly-in with a subtle upward focal drift and smoothstep progress; compact viewports use a restrained `1 → 1.10` range. The independent horizontal ticker, copy, curtain reveal, native scrolling, and section geometry remain unchanged. The passive, requestAnimationFrame-batched controller writes only compositor-friendly transforms and opacity, and responds to live reduced-motion preference changes without per-frame framework state.
- **Stepped reveal pacing aligned locally with Movra.** The desktop/tablet track increases from `260svh` to `310svh`: `12svh` of pre-entry leads into a `138svh` staggered curtain reveal that completes `50svh` into the sticky interval, then hands off to the original `160svh` motion range. Compact screens use a bounded `235svh` track with `8svh` pre-entry, `107svh` reveal, and the original `120svh` motion range. Curtain delays now overlap at `0.28 / 0.14 / 0` desktop and `0.18 / 0.09 / 0` compact so all three levels remain distinguishable without changing the existing depth values, smoothstep easing, copy timing, marquee loop, content, media, or neighboring sections.
- **Responsive browser and reference validation complete.** The supplied recording and live Movra page were compared against the local pre-entry, intermediate stair, full-media handoff, and first depth checkpoint. Desktop preserves an identity media transform until the reveal completes and reproduces the previous `1.03588` depth scale at the equivalent internal progress. `1440 × 900`, `900 × 900`, `390 × 844`, and `320 × 800` retain the `100svh` sticky surface, clear stepped geometry, zero horizontal overflow, and a clean browser console. Runtime reduced-motion emulation remains unavailable in the current browser; the unchanged live media-query reset and compiled natural-flow CSS passed code inspection.
- Reduced motion removes the sticky scroll distance and staged reveal, hides the visual duplicate, and presents the statement and ticker as a static full-viewport composition.
- Desktop, tablet, mobile, document overflow, scroll-linked stability, section handoff, and content duplication semantics were validated.

### Process

- **Implementation: complete.** Five semantic steps render from `src/content/home/process.ts` after Projects / Experiences.
- **Fidelity Pass: complete.** Desktop follows the Movra editorial split with a bounded sticky media contract on the left, compact process rows on the right, and a quiet central divider.
- The Testimonials collection is integrated directly below the process steps in the right column, so the sticky Process media accompanies both content groups as one continuous composition.
- Tablet preserves the split while stacking each row's title and description; mobile removes the placeholder media and uses a single-column reading flow.
- The section remains Astro-only with CSS sticky and no React, JavaScript, scroll listeners, or active-state machinery.
- Reduced motion returns the media to normal document flow. Desktop, tablet, mobile, sticky boundaries, content completeness, and document overflow were validated.

### Testimonials

- **Implementation: complete.** Five semantic blockquotes render from `src/content/home/testimonials.ts` inside Process, immediately below its final step rather than as a standalone page section.
- **Fidelity Pass: complete.** Five alternating media/testimonial rows follow the supplied Movra composition, with a compact name above each quote.
- Desktop and tablet alternate one-third media and two-thirds testimonial panels; mobile preserves a consistent media-then-testimonial reading order.
- The section remains Astro-only and motion-free. Replaceable CSS media placeholders are used while approved photography is pending.
- Names, quotes, and the explicit content status remain provisional; the internal editorial note is not rendered to visitors.

### FAQ

- **Implementation: complete.** Eight native disclosure items render from `src/content/home/faq.ts` after Process.
- The section uses semantic `details` and `summary` elements grouped by the native `name` attribute, so pointer and keyboard interaction work without React, custom JavaScript, or event listeners while only one answer remains open at a time.
- **Fidelity Pass: complete.** A centered editorial header leads into two independent, balanced question columns on desktop; tablet and mobile use one linear column. Each item remains a low-chrome row with a subtle divider, full-row interaction, a plus-to-close state, and an inline answer without cards or shadows.
- Questions are divided from the data source with a derived `ceil(total / 2)` split, so expanded content changes only its own column without forcing artificial height into the opposite column.
- A quiet closing CTA routes to the dedicated `/contact` form without duplicating form logic.
- Supporting browsers receive a token-driven CSS open/close transition through `::details-content`; other browsers retain immediate native disclosure behavior without JavaScript. Reduced motion removes the disclosure and icon transitions while preserving immediate state changes.

### Final CTA

- **Implementation: complete.** The closing section renders its title, concise supporting copy, and one quote-flow action from `src/content/home/finalCta.ts` after FAQ. The action uses an editorial line-arrow treatment, the title has a wider reading measure, and the former partnership action and closing statement have been removed.
- The CTA now uses a full-bleed green stage with container-bound content, subtle internal grid lines, and responsive CSS-only halftone clusters built from individually visible token-derived dots and radial masks. Fine pointers reveal a larger champagne dot layer around the cursor and apply compositor-only micro-parallax through requestAnimationFrame-batched custom properties; mobile remains static and reduced motion removes the reactive layer.
- Services, Hero, and Final CTA now consume the shared two-variant `Button` primitive. Its token-driven capsule, synchronized bottom-up surface and label wipe, title typography, line-arrow geometry, focus behavior, loading/disabled states, and reduced-motion treatment live in one component stylesheet; section styles retain only placement responsibilities. Final CTA no longer renders lateral grid lines, and its reactive dots use a brighter ivory–champagne mix with stronger hover opacity.
- **Fidelity Pass: complete.** The composition follows Movra's closing rhythm with centered copy and actions above a continuously moving gallery at the lower edge.
- The gallery is a CSS-only infinite loop driven by the existing `--motion-marquee-duration` token, with two identical visual groups and no hover pause, JavaScript, listeners, or React hydration.
- The strip now uses 12 existing event photographs selected in `src/features/home/content/final-cta-gallery.ts`, with fixed 9:16 portrait panels and Astro-generated AVIF/WebP thumbnails. The two identical groups retain the existing CSS loop and decorative accessibility treatment. Small thumbnails load eagerly to avoid blank panels when transformed into view; no runtime or dependency was added. The quote stage and action remain unchanged. The follow-up size adjustment increases strip height to `clamp(20rem, 29vw, 29rem)` on desktop/tablet and `18rem` on mobile, retaining 9:16 panels and no horizontal page overflow at 1280, 900, 390, and 320px. Reduced motion keeps the existing three-panel static treatment with portrait geometry (runtime emulation not available).
- Contact now reuses the optimized Hero WebM/MP4 and poster through the shared asset manifest `src/assets/video/delivery.ts`; Hero consumes that same manifest without changing its output. Only the media element and its sizing selector changed: the existing Contact panel dimensions, sticky behavior, cover crop, form, and localized copy remain intact. Video uses muted inline autoplay, loop, and metadata preload. Desktop Chromium playback and desktop/mobile panel geometry were checked; native iOS autoplay and runtime reduced motion remain unverified. Scoped Prettier, build, lint, typecheck, and diff-check passed.
- Reduced motion stops the animation, removes the duplicate group, and presents three static media panels without changing content or actions.
- Desktop, tablet, mobile, loop movement, action constraints, content completeness, document overflow, and reduced-motion code paths were validated.

### Footer

- Legal copy now composes the invariant copyright and company name from `footerContent.legal` with the existing localized `footerLegal` key: Spanish, English, and French rights-reserved text. Footer structure and styling remain unchanged.

- **Implementation: complete.** A semantic footer landmark renders the brand, seven navigation
  links, eight linked Service entries, contact details, closing statement, and legal copy from
  `src/features/site-shell/content/footer.ts` after `main`.
- **Route and action audit complete locally.** Inicio, Nosotros, Servicios, Eventos, Proceso,
  FAQ, and Contacto now resolve to the implemented root page, About route, Home sections, Gallery
  route, and Contact route in the active locale from every page that renders the Footer. The eight
  Service options derive their destinations from the canonical Service catalog and are now real
  links with current-page semantics. The superseded seven-label manual list remains commented in
  its content source instead of being deleted.
- **Footer action rhythm aligned locally.** Company, Resource, and Service links now reuse the
  topbar's left-origin Champagne underline for hover and keyboard focus. Hover also shifts the
  label to Champagne, while current-page semantics remain available through `aria-current`
  without a persistent visual selection. Their vertical list rhythm is compacted by one spacing
  step on desktop and mobile, while the native disclosure headers and their pointer targets remain
  unchanged. Reduced motion keeps every interaction state immediate.
- **Same-page Footer actions are immediate.** Root and section links now reuse the topbar logo's
  instant reset behavior whenever their destination belongs to the current document, temporarily
  overriding the global smooth-scroll rule without changing native cross-page, modifier-click, or
  missing-target behavior.
- **Email action surface refinement complete locally.** The framed Footer email CTA now uses the existing restrained medium radius while retaining its dimensions, arrow, verified destination, focus behavior, and responsive layout.
- **Collaborator frame refinement complete locally.** The three-logo wall now shares the same medium radius as the Footer email action, with its internal tiles clipped to the outer frame while preserving separators, logo interactions, destinations, and responsive sizing.
- On mobile, Compañía, Recursos, and Servicios use collapsed native disclosures to reduce scroll length; tablet and desktop keep all three groups expanded in the established grid.
- **Fidelity Pass: complete.** Final CTA now hands off through a compact edge-padded visual strip into Movra's two-row footer composition: aligned 50/50 desktop grids, inset vertical dividers, full-width horizontal dividers, three navigation groups, the framed three-collaborator logo grid, contact CTA and verified contact details, a six-item service grid, and the closing copy at opposite lower edges.
- Desktop uses paired information bands, tablet stacks those bands, and mobile follows a linear reading order without introducing reference-only newsletter, social links, or legal destinations. The three approved transparent collaborator assets are centered in equal framed tiles with uninterrupted dividers, contained without cropping, normalized to the footer's light monochrome treatment, and sourced from one typed collaborators module; each complete tile opens its approved external site in a separate, isolated tab.
- The footer is Astro-only; its only runtime behavior synchronizes the native mobile disclosures with the existing compact breakpoint. Reduced motion removes the collaborators' decorative hover transition without changing their links or content.
- Handoff color, link destinations, mail link, content completeness, desktop, tablet, mobile, long-copy constraints, and document overflow were validated.

### QA - Full Regression

- **Status: complete.** The approved page surface was validated on the production build across desktop, tablet, and mobile.
- Section anchors, unique IDs, landmarks, horizontal overflow, Navigation focus containment and Escape behavior, Projects controls, FAQ disclosure semantics, Services hydration, Footer constraints, and runtime console output passed.
- Reduced-motion CSS and JavaScript paths were reviewed across every animated section; static sections remain motion-free.
- Values / Spotlights remains outside the approved regression scope pending business review.

### Performance - Audit

- **Status: baseline complete.** The production build ships approximately 27 KB gzip of initial HTML and CSS and approximately 96 KB gzip for the complete core payload after the interactive Services scene hydrates.
- Services now uses `client:visible`: its complete server-rendered content remains available immediately, while React and Motion hydration is deferred until the section approaches the viewport.
- Desktop and mobile confirmed that Services remains unhydrated at the top of the page, hydrates correctly on entry, preserves all seven states, and produces no runtime console errors or horizontal overflow.
- Scroll work remains bounded through passive listeners, requestAnimationFrame batching, IntersectionObserver, and transform/opacity updates. No additional runtime dependency was introduced.
- Final Lighthouse and field Core Web Vitals conclusions remain pending approved production imagery, self-hosted fonts, and a production deployment.

### Accessibility - Audit

- **Status: complete for the current implemented surface.** Document language, landmarks, heading hierarchy, accessible names, references, unique IDs, image alternatives, and hidden-content focus safety passed semantic review.
- A keyboard-visible skip link now targets the main content, the title-less Why Choose Us proof band retains a visually hidden section heading, and the Navigation menu preserves focus containment and Escape close behavior.
- Small accent text on light surfaces and the global focus indicator now use a dedicated contrast-safe semantic token; key Navigation actions meet a 44 px minimum target height.
- Services uses one dedicated polite live region for state changes instead of two competing announcements.
- Desktop, tablet, mobile, 320 px reflow, menu-open containment, document overflow, and reduced-motion code paths were validated. Final assistive-technology testing with real users remains part of production acceptance.

### SEO / Metadata

- **Implementation: complete for the current public surface.** Spanish document language, descriptive titles and descriptions, robots directives, Open Graph metadata, Twitter card metadata, favicons, and Organization JSON-LD are present.
- `SITE_URL` is the single production URL source. Canonical, `og:url`, the Organization URL, sitemap generation, and the sitemap reference in robots are emitted only when it is configured, preventing localhost or speculative domains from entering production metadata.
- The official Astro sitemap integration generates the sitemap index and page sitemap. `robots.txt` remains valid without a configured domain and adds the absolute sitemap URL when one exists.
- Social image tags remain intentionally absent until an approved production image is available.

## Current

### Active Scope

- **Home:** `Eventos que ya tomaron forma` and the Astro-only cinematic Services sequence.
- **About:** the dedicated `/about` route, its animated typography hero, and full-bleed media mosaic.
- **Gallery:** `/gallery` and its generated category routes.
- **Event Detail:** the six generated `/events/[slug]` routes.
- **Service Detail:** Responsibilities 1–4 are implemented and validated locally in dev and the
  optimized preview build.
- **Domain normalization:** Responsibilities 1–3 of 3 are complete locally. The normalized
  Service, Event, category, media, selector, and integrity contracts are the only active domain
  source of truth; every current product surface remains behaviorally unchanged.
- Shared Navigation, Footer, layout, tokens, metadata, and asset infrastructure count only when a change is required to support or validate these scoped surfaces.
- Every other homepage section, absent section, deferred content concept, Storybook initiative, and unrelated business-asset request is outside the active roadmap and does not block acceptance or completion.

### Service Detail Domain

- **Responsibility 1 — Data Layer / Service Model: superseded by domain normalization.** The
  original seven-record Service Detail baseline and manually stored `relatedEvents` collection
  have been replaced by the canonical eight-Service model and derived Event relationships
  documented below.
- Service CTAs encode the handoff as `/contact?service={service.slug}`. Contact consumes only
  valid service slugs and leaves the default option selected for absent, empty, or invalid
  parameters.
- **Responsibility 2 — Service Detail Domain + Route: complete locally.** The independent
  `src/pages/services/[slug].astro` route resolves services by slug, uses the shared BaseLayout,
  Navigation, Footer, Heading, Text, and Button primitives, and renders a dedicated
  `ServiceHeader` with title, description, and the prepared Contact CTA. It does not import or
  branch Event Detail.
- **Responsibility 3 — Gallery + Related Events: complete locally.** `ServiceGallery` renders the
  explicit Service `featuredMedia` separately from its `gallery`, and
  `ServiceRelatedEvents` receives the Event records derived from canonical `Event.serviceId`
  relationships. Celebraciones resolves five approved Events, Bodas resolves Wedding R&R, and
  Services without Events render no related heading or spacing.
- **Responsibility 3 correction — Event Detail visual baseline: complete locally.** Service Detail
  now uses physically duplicated Service-owned copies of the Event Detail header, featured media,
  gallery/lightbox, related-event preview, and section CSS. The copies preserve the Event Detail
  grid, sticky boundaries, media geometry, spacing, lightbox behavior, and scroll-linked motion;
  only Service data, CTA, gallery source, and related-event responsibility differ. Event files,
  Event CSS, Navigation, Footer, Contact, and Home remain untouched.
- **Responsibility 4 — Service Detail Fidelity + Contact preselection: implemented locally.**
  Service Detail remains physically separate from Event Detail: `ServiceHeader`,
  `ServiceFeaturedMedia`, `ServiceGallery`, `ServiceLightbox`, `ServiceRelatedEventPreview`,
  `ServiceRelatedEvents`, `src/pages/services/[slug].astro`, and
  `src/styles/sections/service-detail.css` are Service-owned copies of the Event Detail
  composition with only service content, CTA, gallery source, and related-event responsibility
  adapted. Event components, Event CSS, Event data, Navigation, Footer, Contact layout, and Home
  remain unchanged. The Service route now preserves the copied chapter wrapper and overlay
  Navigation surface required by the Event `28/72` composition. The empty related-events branch
  renders no heading or spacing.
- Contact preselection derives option metadata from `servicesContent.items`: `/contact?service=`
  matches the service slug while the submitted option value remains the existing stable service
  ID, preserving the payload and submit transport. Empty, missing, and invalid values fall back
  to `Selecciona una opción`.
- **R4 visual and responsive validation:** browser comparison against `/events/nossa-copa`
  confirmed the same desktop `28/72` rail, `100svh` chapter/header, `16:9` featured media,
  sticky desktop header, mobile natural-flow switch, and compiled scroll-linked frame/media
  timelines. At `1280 × 720`, both pages resolve columns to approximately `354.19 / 910.80px`
  and featured media to `907.59 × 510.52px`; `900 × 900`, `390 × 844`, and `320 × 800` preserve
  the corresponding Event geometry without horizontal overflow. Differences in title wrapping,
  header height on compact screens, and final chapter length are authorized consequences of the
  longer Service title, CTA, pending featured media, empty gallery data, and derived related-event
  content.
- **R4 Contact validation:** `/contact?service=eventos-corporativos` selects “Eventos
  corporativos” while retaining `service-03` as the submitted value. Missing, empty, and invalid
  query values retain `Selecciona una opción`. Dev and optimized preview return equivalent
  results.
- **R4 technical validation:** `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `git diff --check`
  pass; the current build emits all eight Service Detail routes and preview reports no console warnings or
  errors. The optimized CSS retains the copied reduced-motion branch that removes media/gallery
  transforms, timelines, sticky takeover, and hover/lightbox motion; runtime media emulation was
  unavailable in the integrated browser, so that specific state is verified from compiled CSS
  rather than claimed as a runtime screenshot.
- **Service header constraints refined locally.** The Service-owned desktop and tablet header now
  constrains localized titles to its `28%` rail with width- and height-aware type scaling plus a
  defensive wrapping boundary. Its narrative uses a smaller description scale and reserves the
  remaining header space for the commercial CTA, keeping that action anchored above the bottom
  divider without expanding the `100svh` chapter. Mobile retains natural-flow stacking.
- **Visual roadmap:** Responsibility 4 is complete. The separate domain-normalization roadmap
  below now owns the next Service/Event data work.

### Service / Event Domain Normalization

- **Responsibility 1 — Shared Contracts: complete locally.** `src/content/media.ts` owns the
  reusable `FeaturedMedia`, `GalleryImage`, and `GalleryLayout` contracts. Responsibility 3
  migrated the final Event consumers to those shared types and removed the temporary
  `EventDetailFeaturedMedia`, `EventDetailImage`, and `EventGalleryLayout` aliases.
- `src/content/services/types.ts` defines `SERVICE_IDS` as the canonical const object and infers
  `ServiceId` from its values. Responsibility 2 now consumes this contract in every Service and
  Event record.
- `src/content/events/categories.ts` defines the stable `EventCategoryId` registry with separate
  `label` and routing `slug` values. Responsibility 2 now stores the stable category ID in Events
  while Gallery and preview consumers resolve its presentation metadata from the registry.
- **Canonical relationship decision:** `Event.serviceId → ServiceId` is implemented. Service does
  not store an event ID/slug array; Service → Events is derived by a selector. Slugs remain routing
  identifiers and IDs remain internal relationship identifiers.
- **Business relationship approval: resolved in Responsibility 2.** The six current Events now
  carry their approved `serviceId`; no relationship was inferred.
- **Technical validation:** formatter, `pnpm build`, `pnpm lint`, `pnpm typecheck`, and
  `git diff --check` pass for the final shared-contract change. No product component, page,
  stylesheet, content record, route, or asset changed.
- **Responsibility 2 — Service / Event Normalization: complete locally.** The catalog now contains
  eight Services. Celebraciones retains existing identity `service-02`; Bodas receives the new
  stable identity `service-08`; `service-01` and `service-03…07` retain their prior identities.
  Editorial `index` values provide the visible `01…08` order independently from IDs.
- The canonical Event model now stores required `serviceId: ServiceId` and stable `categoryId`.
  Event route `href` was removed because every current route is safely derived from its slug.
  Service removed both `media` and stored `relatedEvents`, and now owns explicit shared-contract
  `featuredMedia` plus `gallery`. The current pending featured placeholders preserve the previous
  Service Detail geometry while empty gallery collections avoid duplicating featured media.
- Approved relationships are explicit: Nossa Copa, Baila da Zaza, Baby Shower, Cumpleaños Ana
  Paula, and Fan Fest Club point to Celebraciones; Wedding R&R points to Bodas. Event category IDs
  remain editorial classifications independent from commercial Services.
- `getServiceById`, `getServiceBySlug`, `getEventsByServiceId`, and `getEventBySlug` own domain
  lookup. `getEventCategory` resolves category metadata and `getEventHref` derives the internal
  Event route. Service Detail no longer performs component/page-level Event `find`/`filter` work.
- Module-load integrity checks reject duplicate Service IDs/slugs, missing or extra `SERVICE_IDS`
  records, duplicate Event IDs/slugs, invalid Event → Service references, and unknown Event
  category IDs. `satisfies` and `astro check` enforce the shared FeaturedMedia/Gallery contracts.
- Navigation, Contact options, Homepage Services, Footer service labels, Service routes, and
  Gallery category routing consume the normalized data with no component redesign or stylesheet
  change. The optimized build emits 23 pages: eight Service Detail, six Event Detail, and the
  existing Gallery/category/public routes.
- **Technical validation:** scoped Prettier, `pnpm build`, `pnpm lint`, `pnpm typecheck`, and
  `git diff --check` pass. Generated output confirms five Celebraciones Event links, one Bodas
  Event link, all eight Contact options, all eight Service routes, and unchanged Gallery routes.
- **Responsibility 3 — Migration + Validation: complete locally.** The final consumer audit found
  temporary `ServiceContentItem`, Event media/category aliases, and the page-specific
  `EventDetail` domain name. Components now consume `Service`, `Event`, `FeaturedMedia`,
  `GalleryImage`, `EventCategoryId`, and `EventCategoryLabel` directly. No compatibility alias
  remains in the active domain exports.
- Valid audit hits were retained intentionally: `event.href` exists only on the derived Home /
  Gallery presentation model and is populated by `getEventHref`; `media` remains a presentation
  field in that model and in unrelated Hero content; Event/Service ownership `find`/`filter`
  calls live only in selectors. Other collection queries belong to UI state, category filtering,
  navigation, or integrity checks and do not resolve domain ownership.
- Integrity now also rejects duplicate Event-category route slugs and the obsolete combined
  `bodas-celebraciones-privadas` Service slug. Existing checks still reject duplicate Service and
  Event IDs/slugs, missing or extra `SERVICE_IDS`, invalid Event → Service references, and unknown
  Event categories.
- Optimized-build browser smoke passed `/events/wedding-r-r`, `/services/bodas`,
  `/services/celebraciones`, `/contact?service=bodas`, `/gallery`, and `/gallery/boda`. Bodas
  resolves only Wedding R&R; Celebraciones resolves Nossa Copa, Baila da Zaza, Baby Shower,
  Cumpleaños Ana Paula, and Fan Fest Club; Contact exposes all eight Services and selects
  `service-08`; Gallery retains all five derived category routes with no console warning/error.
- **Final technical validation:** scoped Prettier, `pnpm build`, `pnpm lint`, `pnpm typecheck`,
  and `git diff --check` pass. Domain normalization is complete; no UI, stylesheet, asset, or
  feature redesign was introduced by Responsibility 3.

### Production Asset Pipeline

1. **Raw Assets + Preparation Pipeline — complete.** Original event deliveries live under the Git-ignored `assets-raw/events/` tree. `pnpm images:prepare` recursively prepares versioned masters under `src/assets/images/events/`, preserves event subfolders, corrects EXIF orientation, strips unnecessary metadata, limits the longest edge to `3600px`, retains transparent PNGs, normalizes opaque sources to high-quality JPG, and refuses silent overwrites unless `--force` is supplied. Sharp is an explicit development dependency because pnpm does not expose Astro's transitive copy to project scripts.
2. **Event Content + Asset Curation — complete for the supplied event delivery.** All six event modules now import approved prepared masters through `src/assets/images/events/index.ts` and own their featured image, curated gallery order, layout roles, and explicit Spanish alternative text. Projects and Gallery derive their listing media from the same event records. The mixed Wedding raw delivery was reviewed: only the `_EB`/`DSC08265` R&R series is published as Wedding R&R; the unrelated K&T series remains available as an unassigned prepared source and is not rendered under that event.
3. **Astro Media Delivery — complete for Event surfaces.** Homepage Projects, Gallery Archive, featured media, detail galleries, lightbox panels, and next-event previews render through Astro `Picture`. One shared responsive contract generates five widths from 480–1920 px, AVIF sources, and WebP fallback during development/build; eager loading remains limited to immediately relevant detail media while below-fold and dialog media stay lazy. Desktop and mobile rendering, entry animation, lightbox loading/focus, crops, broken-image state, console output, and horizontal overflow passed browser validation. A clean build generates 407 active event derivatives totaling approximately 57 MB, down from the initial 664-variant configuration.
4. **Documentation + Guardrails — complete.** `docs/CONTENT.md` records raw ingestion, preparation, typed exports, manual event curation, build-time AVIF/WebP generation, and visual acceptance. Raw deliveries remain ignored; prepared masters and their semantic selection remain versioned.
5. **Real-media Final Regression — complete.** Homepage Projects, Gallery Archive, all six Event Detail routes, gallery counts, cyclic next-event links, AVIF/WebP contracts, image loading, and horizontal overflow passed at desktop and mobile widths with no broken images. Only the featured Event image is eager; gallery and lightbox images remain lazy so they do not compete with the LCP candidate. Runtime console checks reported no warnings or errors on the representative Home, Gallery, and Event Detail states.

### Event Detail Reference Fidelity

- **Current phase: Contact cinematic surface and Event Detail gallery-gap refinement complete locally.** The previous Event Detail motion and mobile QA remain accepted; the latest authorized changes are limited to page contrast and editorial media spacing.
- **Event header constraints aligned locally.** Event Detail now mirrors the Service-owned header
  organization while remaining physically separate: desktop and tablet titles stay inside the
  `28%` rail through width- and height-aware scaling, the description uses the same smaller
  reading scale, and the header remains bounded to its `100svh` chapter. Mobile keeps its existing
  natural-flow stack, and gallery, lightbox, related-event motion, Navigation, and Footer remain
  unchanged.
- **Responsibility 1 — Diagnostic: complete.** At the measured desktop state, the reference uses the existing `28/72` rail/media split, a `16:9` featured frame, and one editorial gap as the media inset. The local production build preserved the correct outer row geometry but rendered source-ratio featured media, undersized gallery triggers, and no viewport-entry transform. The absent production motion was isolated to CSS optimization producing an invalid `animation` shorthand; it is not a Vercel, hydration, asset, or deployment issue.
- **Responsibility 2 — Gallery Layout Fidelity: complete.** The featured frame now keeps the measured `16:9` editorial role and the featured, full-row, and paired gallery media share the same one-gap inset and leading alignment. At `1440 × 900`, rendered geometry measures `1022.39 × 575.09px` for the featured frame, `1022.39px` for full-row media, and approximately `504px` per paired medium inside the unchanged `28/72` composition. Tablet validation at `900 × 900` preserved the same proportional language with `639px` full media and `315px` paired media, no horizontal overflow, and no console warnings or errors.
- **Responsibility 3 — Production-safe Viewport-entry Motion: complete.** The frame and compensating media animations retain their original named view timelines, ranges, and `0.8 → 1` / `1.2 → 1` transforms. Their animation shorthands now resolve through a local custom property so Astro's CSS optimizer cannot merge the timeline into an invalid shorthand. The production preview reports the expected animation names and named timelines; at `1280 × 720`, the first entering frame progressed `0.828 → 0.913 → 1.000` while its media progressed reciprocally `1.172 → 1.087 → 1.000`, and the next row entered from the same contract. Tablet retained the accepted geometry, no horizontal overflow, and a clean console. No listener, observer, hydration, dependency, asset, or layout change was introduced.
- **Responsibility 4 — Final Component Fidelity Audit: complete for the local production build.** At the shared `1280 × 720`, DPR 1 viewport, the reference and local build align on the `28/72` rail/media split, approximately `908.8 × 512px` featured frame, one-gap media inset, role-based `3:2` / `2:3` geometry, dense background exposure, reciprocal entry transforms, and chapter-bounded sticky release. A clear medium discrepancy was corrected by replacing the light reveal-wrapper backing with Mosaïque's semantic dark background. The normalized release state measured rail tops at approximately `-98px` and chapter bottoms at approximately `622px` in both implementations. Tablet `900 × 900`, mobile `390 × 844`, and narrow mobile `320 × 800` preserve the intended responsive flow without horizontal overflow or console errors.
- **Difference classification:** the local build has no remaining critical, high, or clear medium system-fidelity gap. The roughly `1.6` percentage-point frame-scale difference sampled at one equivalent landscape entry is low and does not change pacing or final state. The reference's seventeen media items and longer gallery duration versus Nossa Copa's six approved items, plus photography, ordering, color, and typography, are deliberate content/brand differences and are not padded or copied. Vercel production remains a high deployment-sync difference because it still serves the previous source-ratio featured frame, reduced media widths, light wrapper backing, and inactive viewport-entry animation; no deployment was authorized in this phase.
- The available in-app browser cannot emulate `prefers-reduced-motion`, and no connected Chrome browser is available. The compiled production CSS keeps the existing `animation: none` and `transform: none` override after the new custom-property declaration, but a fresh runtime emulation of this exact build remains deployment acceptance work rather than being claimed from code inspection.
- **Next Events Responsibility 1 — Diagnostic: complete.** Direct browser inspection at `1280 × 720` confirmed that the reference uses five `100vh` sticky scenes, `250vh` parent pacing for the first four scenes, a `150vh` final release, `100vh` overlaps, an initial `91%` media frame, and a progressive expansion to full bleed. The current production page exposed one `750vh` next-event scene with an inactive compiled timeline and no event-to-event handoff.
- **Next Events Responsibility 2 — Fidelity implementation: complete for the local production build.** Every Event Detail route now derives the other five approved events in cyclic order from `eventDetails`. The Astro-only sequence renders one linked scene per event with its existing category, title, featured media, status, and route; no event data is duplicated. Desktop reproduces the measured `250svh` / `-100svh` stacked pacing, `150svh` final release, `0.91 → 1` frame expansion, reciprocal media compensation, subtle copy travel, 12% overlay, and later-scene stacking. The animation shorthand uses the production-safe custom-property pattern so the named view timeline remains active after build optimization.
- Desktop `1280 × 720` production preview confirmed five scenes, exact `1164.8 × 655.2px` entry geometry, full-viewport dominant states, sequential sticky release, clean Footer handoff, and zero horizontal overflow. The original tablet/mobile natural-flow fallback recorded during this desktop phase was subsequently superseded by the approved Mobile Responsibilities below. Reduced motion retains that natural-flow contract in compiled CSS.
- **Next Events Responsibility 3 — Contact Marquee implementation and fidelity pass complete for the local production build.** A dedicated Astro section now follows the five-scene sequence and reuses the approved Final CTA description, label, and `/contact` destination without duplicating business content. The Mosaïque-owned composition preserves the reference's dark handoff, centered lead-in, oversized repeated display text, and independent `20s` continuous horizontal loop while keeping one semantic link and no hydration, listener, observer, dependency, or scroll interception. At `1280 × 720`, the section measured `442px` high, its lead rendered at `24px / 32.4px`, and the ticker moved continuously without horizontal overflow. Tablet `900 × 900`, mobile `390 × 844`, and narrow mobile `320 × 800` retain the same hierarchy at `302–319px` high with natural page flow, readable wrapping, and no clipping or console warnings/errors. Reduced motion stops the loop and presents one centered label in compiled CSS; runtime emulation remains pending for the environment limitation recorded above. Footer and global Navigation remain unchanged.
- **Next Events Mobile Responsibility 1 — Diagnostic: complete.** Live-reference and local inspection at `390 × 844` confirmed that mobile retains the cinematic scene system rather than a flat stack: the first four reference scenes use `250svh`, the final scene uses `150svh`, every visual surface stays sticky for `100svh`, and consecutive scenes overlap by `100svh`. The reference expands each mobile frame from approximately `0.70 → 1`, contracts its inner media from approximately `1.30 → 1`, shifts copy subtly, and progressively darkens the outgoing scene from approximately `0.12 → 0.80`. Local mobile previously overrode this system with independent `100svh` relative scenes and a constant 12% overlay.
- **Next Events Mobile Responsibility 2 — Structure and motion fidelity: complete for dev and local production preview.** The existing Astro DOM and event data now retain the measured `250svh` / `150svh` pacing, `-100svh` overlap, `100svh` sticky surface, `0.70 → 1` mobile frame, reciprocal `1.30 → 1` inner-media compensation, and subtle copy travel through responsive CSS only. Outgoing scenes use a real view-timeline opacity interpolation from `0.12 → 0.80` over `contain 0% → contain 85%`; the final scene remains at the base 12% overlay so its release into Contact is not artificially darkened. Explicit `animation-*`, `animation-timeline`, and `animation-range` declarations survive Astro's optimized CSS build and report the same computed contracts in preview. `390 × 844`, `320 × 800`, `900 × 900`, and `1280 × 720` passed geometry, overflow, console, sticky-release, and dev-versus-preview checks.
- **Next Events Mobile Responsibility 3 — Post-implementation QA: complete for dev and local production preview.** Live-reference checkpoints A–F at `390 × 844` confirmed matching scene pacing and focus transfer: local outgoing opacity progressed approximately `0.34 → 0.55 → 0.66 → 0.80`, compared with reference samples `0.27 → 0.51 → 0.65 → 0.80`; incoming frame/inner-media samples stayed within roughly `0.4` percentage points at the 25–50% checkpoints, and the final scene released cleanly into unchanged Contact. No critical or high differences remain; sampled normal-motion differences are low. Runtime reduced-motion QA exposed one clear medium specificity gap that left the overlay timeline active; the reduced-motion selector now matches the production selector's specificity. The optimized preview reports five natural-flow `100svh` scenes, zero overlap, relative surfaces, no transforms or animation names, and the preserved `0.12` base overlay. Normal-motion mobile and desktop timelines remain active after the correction. No DOM, content, component, asset, dependency, or JavaScript changed.
- **Contact Marquee surface refinement: complete locally.** `BaseLayout` now exposes a reusable `default` / `cinematic` page-surface contract backed by semantic tokens; Event Detail alone selects the cinematic black surface, which flows through its existing inverse sections and Footer without duplicating component trees. The closing marquee keeps its single `/contact` link, accessible label, `20s` CSS loop, and content source while removing generated line separators and adding reference-aligned vertical space. At `1552 × 960` it measures approximately `538px` high; at `390 × 844` it measures approximately `334px`, with a continuous black handoff, zero horizontal overflow, and no console warnings or errors. Home retains its default cream page and green Footer.
- **Editorial gallery minimum-gap refinement: complete locally.** The existing shared `--event-gallery-gap` now ranges from `2–4px` instead of `8–16px`, preserving the same grid, media roles, insets, scroll-linked entry scales, and timeline ranges while making the fully entered separation nearly imperceptible. At `1280 × 720`, paired media and row gaps resolve to `3.2px`; mobile resolves to the `2px` minimum. No DOM, content, image, lightbox, or motion contract changed.

#### Mobile Fidelity Handoff

- **Status:** Responsibilities 1–3 are implemented and validated locally. The mobile fidelity pass is complete; no subsequent responsibility is authorized.
- **Implementation decisions:** preserve the existing `EventMoreGalleries` / `EventPreviewScene` DOM, event data, links, media, and component ownership; implement the responsive scene contract entirely in `src/styles/sections/event-detail.css`; use CSS view timelines with explicit `animation-name`, `animation-duration`, `animation-timing-function`, `animation-fill-mode`, `animation-timeline`, and `animation-range`; introduce no JavaScript, React, dependency, content, asset, Contact Marquee, Navigation, Footer, or Main Event Gallery change.
- **Final behavior:** mobile and eligible tablet use four `250svh` scenes, one `150svh` final scene, `100svh` sticky surfaces, `-100svh` overlap, `0.70 → 1` frame expansion, `1.30 → 1` inner-media compensation, and subtle copy travel. Desktop retains its approved `0.91 → 1` / `1.10 → 1` geometry and now shares the progressive outgoing-scene darkening. Non-final overlays interpolate from `0.12 → 0.80` over `contain 0% → contain 85%`; the final overlay stays at `0.12` and releases directly into the unchanged Contact section.
- **Affected files:** product implementation remains limited to `src/styles/sections/event-detail.css`; Responsibility 3 changed only the reduced-motion overlay selector. Phase status and QA evidence live in `docs/ROADMAP.md`. No Astro component or content module changed.
- **Validation evidence:** live reference, local dev, and optimized preview were compared at entering, dominant, 25–50% next-scene visibility, almost-dominant, and final-release checkpoints. `390 × 844`, `320 × 800`, `900 × 900`, and `1280 × 720` passed without horizontal overflow or browser console warnings/errors. Dev and preview reported equivalent geometry, timelines, ranges, transforms, opacity progression, and Contact release. Chrome runtime emulation at `390 × 844` confirmed the complete reduced-motion natural-flow contract after the specificity correction. `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `git diff --check` passed.

### Scoped Final QA

- **Status: complete for the current Home Projects, Gallery, and Event Detail revision.** Normal-motion checks at `1440 × 900` and `390 × 844` confirmed all scoped media, headings, controls, responsive layouts, and navigation without broken images, horizontal overflow, warnings, or errors.
- Runtime reduced motion was validated in Chrome headless with `prefers-reduced-motion: reduce` forced at desktop and mobile viewports. Home Projects uses immediate carousel scrolling; Gallery removes its motion attribute, reveals all six records, and keeps every title fully visible; Event Detail reports no featured, gallery, or next-preview animation or transform, collapses the desktop preview chapter to `100svh`, and returns the preview link to normal flow.
- The normal-motion Event Detail lightbox opens with focus on Close, locks document scroll, closes cleanly, restores scrolling, and returns focus to the originating image. Gallery category navigation reached the generated Festival route with the expected active filter and records.
- Desktop and mobile screenshots were inspected for Home Projects, Gallery, and Event Detail. The reduced-motion and normal-motion branches retain the intended composition, readable content, complete controls, and stable media crops.

### Deployment Sync / Verification

- **Status: current application revision deployed and scoped route acceptance complete.** `https://mosaique-web.vercel.app` serves the merged Home Projects media, Gallery, and Event Detail revision over HTTPS.
- Home Projects, `/gallery`, all generated Gallery categories, and all six Event Detail routes passed a production browser sweep with no route-level 404, broken image, horizontal overflow, warning, or error. The scoped surfaces deliver generated AVIF media; WebP remains the configured fallback.
- The warm Vercel build reused all 407 image-cache entries, completed Astro's build in approximately 4 seconds, and completed the full Vercel build in approximately 8 seconds.
- **Local production preflight: complete.** A temporary build with `SITE_URL=https://mosaique-web.vercel.app` emits the 14 static pages, 407 responsive image derivatives, canonical URLs for the audited routes, `robots.txt`, `sitemap-index.xml`, and its page sitemap. The value was supplied only to the build process; no environment file or production setting was created.
- **Remaining deployment configuration:** production does not currently expose canonical URLs and `/sitemap-index.xml` returns `404: NOT_FOUND`, confirming that `SITE_URL` is not configured in the deployed build. Confirm the definitive domain, add `SITE_URL` to Vercel, redeploy with the existing build cache, and verify canonical, `og:url`, JSON-LD URL, robots sitemap reference, and both sitemap files.

## Next

### Home Services Media + Service CTA Handoff

- **Complete locally.** Each canonical Service now owns one approved existing repository image
  through `featuredMedia`; these are provisional editorial assignments and can be replaced in the
  Service constants without changing Home or Service Detail composition.
- Home Services keeps the cinematic eight-scene contract while its intro uses a wider reading
  measure and shorter viewport footprint so the first service enters sooner. `Ver más` remains
  transparent-first and `Cotizar` now uses the light-to-transparent button variant.
- Mobile keeps the sticky scene rhythm but fixes each service media surface at its fully expanded
  `scale(1)` state. This prevents the longer Service copy from exposing and colliding with the
  outgoing scene through the smaller Event-preview entry frame.
- Service Detail applies the same light-to-transparent treatment to its commercial header CTA and
  now closes with a Service-owned physical copy of the Event Detail contact marquee structure,
  reusing the approved Final CTA content and existing Service Detail marquee styles.

### Architecture Audit

- **Architecture Audit: complete.** The approved migration uses a pragmatic feature-first
  structure with `core/`, Astro composition roots, feature-owned data/selectors, and no
  repositories for static catalogs.
- **Clean Architecture Responsibility 1 — Core + Feature Boundaries: complete locally.** Event
  types, category registry, catalog records, selectors, and public API now live under
  `src/features/events/`; Service types, IDs, catalog records, selectors, and public API live under
  `src/features/services/`. All consumers import those public feature APIs or explicit shared
  contracts; the former `src/content/events/` and `src/content/services/` compatibility paths were
  removed after repository-wide consumer verification.
- Shared `ContentLink`, media contracts, and unique-value integrity utility now live under
  `src/core/common/`. `StaticImageSource` replaces the former direct Astro `ImageMetadata` import
  with a framework-free structural contract that remains assignable to Astro Assets. Event and
  Service catalogs still import approved frontend assets because they are local static data, not
  pure domain persistence.
- **Clean Architecture Responsibility 2 — Quote + Infrastructure: complete locally.** The complete
  Quote ownership now lives under `src/features/quote/`: typed contracts, validation, Zustand
  state, React hook/transport, application service, repository port, HTTP repository adapter,
  reviewed form content, Astro UI, and feature-owned CSS. `/contact` remains a thin composition
  root and imports only the feature UI entry components.
- The preserved flow is `UI -> validation -> submit composition -> service -> repository port ->
HTTP adapter`. The service receives the repository contract, while `submit-lead.ts` is the
  feature-local composition boundary. Payload normalization, `POST /functions/v1/leads`, request
  headers, expected `201` response, field validation, loading/success/error state, preselection,
  and user-facing messages remain unchanged.
- Public Supabase environment access is centralized in `src/core/config/env.ts`. The unused
  `src/lib/supabase.ts` client and `@supabase/supabase-js` dependency were removed after confirming
  that they had no consumers; the working transport continues to use the existing Fetch adapter.
  Empty legacy root folders for hooks, repositories, services, stores, types, validators, and lib
  were removed. No empty folders remain under `src/`.
- Development and optimized preview passed `/contact?service=bodas` at `390 x 844` and
  `1280 x 720`: `service-08` remained preselected, there was no horizontal overflow or console
  error, local validation enabled `Revisar información`, and the review transition produced the
  unchanged `Enviar solicitud` state. The final external submission was intentionally not sent to
  avoid creating a production-like lead during architecture QA; endpoint and transport contracts
  were verified in code and the optimized client bundle built successfully.
- React, Zustand, the custom-event transport, Quote component decomposition, shared presentation
  primitives, Event/Service UI duplication, Home cinematic composition, routes, copy, assets, and
  visual behavior remain otherwise unchanged in Responsibility 2.
- Development and optimized-preview smoke matrices passed for Home, Gallery, Event Detail,
  Service Detail, and Contact at `1280 × 720`, `900 × 900`, `390 × 844`, and `320 × 800`: expected
  titles and landmarks, zero broken images, zero horizontal overflow, and clean browser consoles.
  Build, lint, typecheck, and diff-check pass.
- **Clean Architecture Responsibility 3 — UI Ownership + Presentation Cleanup: complete
  locally.** Feature components, route compositions, reviewed presentation content, and feature
  CSS now live under `src/features/<feature>/ui/` and their adjacent feature content/data folders
  for About, Events, Gallery, Home, Quote, Services, and Site Shell. Shared content-agnostic UI and
  Astro motion primitives live under `src/core/common/ui/`; `src/styles/` now contains only the
  global stylesheet and executable design tokens.
- `src/pages/` remains Astro's routing boundary. Static-path generation and route props stay in
  the dynamic route files, while the rendered compositions moved to feature-owned `ui/pages`.
  Event Detail, Service Detail, Gallery, Home, About, and Contact retain their existing DOM,
  content, CSS, assets, responsive geometry, scroll behavior, and navigation/footer composition.
- The former root `src/components/`, `src/content/`, and `src/tokens/` trees, plus empty section and
  component style folders, were removed after migration. Confirmed dead presentation artifacts
  were also removed: `MediaCrossfade`, `Reveal`, `StaggerText`, `StickyScene`, `Stack`,
  `AboutMilestones`, `WhyChooseUs`, three unused Quote subcomponents, and their orphaned content
  and styles.
- React remains required by the shared `Button` and Quote transport; Zustand remains required by
  Quote submission state. Motion had no remaining runtime consumer after the dead-component audit,
  so the `motion` dependency and its runtime token module were removed. No replacement dependency,
  shared Event/Service abstraction, UI redesign, or behavior change was introduced.
- Development browser QA passed `/`, `/about`, `/gallery`, `/gallery/celebracion`,
  `/events/nossa-copa`, `/services/celebraciones`, and `/contact` at `1280 × 720` and `390 × 844`:
  expected titles and landmarks, zero horizontal overflow, and clean consoles. Optimized preview
  passed representative Home, Gallery, Event Detail, Service Detail, and Contact routes with zero
  broken images or console issues; Service Detail also passed `320 × 800`. Build, lint, typecheck,
  scoped Prettier, and diff-check pass.
- **Clean Architecture Responsibility 4 — Safe Reuse + Architecture Enforcement: complete locally.**
  The stable Event/Service Contact Marquee equivalence was extracted into
  `src/core/common/ui/components/ContactMarquee.astro` with its shared CSS. The Event and Service
  components remain thin feature-owned adapters so each domain retains its content source and
  accessible heading ID. The rendered structure, animation, responsive sizing, reduced-motion
  behavior, and visual tokens remain unchanged.
- The Event and Service Lightbox, FeaturedMedia, Gallery, and detail stylesheet audits confirmed
  strong structural similarity but meaningful domain namespaces, data attributes, timeline hooks,
  and Service-specific CTA/related-event sections. They remain physically separate; no wholesale
  Detail abstraction was introduced. This is intentional safe reuse, not unfinished migration.
- Added a minimal ESLint boundary rule preventing `src/core/**` from importing `src/features/**`.
  No compatibility alias or legacy-root import remains in active code, and no new dependency or
  UI redesign was introduced.
- Build, lint, typecheck, diff-check, and scoped Prettier pass after the extraction. The existing
  development and optimized-preview smoke matrix remains green for Home, Gallery, Event Detail,
  Service Detail, and Contact at `1280 × 720`, `900 × 900`, `390 × 844`, and `320 × 800`; the
  affected Event and Service detail routes also preserve the shared marquee output.
- **Next architecture gate:** production acceptance and any future shared extraction require a
  separate approval. Do not merge Event Detail and Service Detail wholesale; only extract another
  primitive after a new equivalence audit demonstrates a stable, content-agnostic contract.

### Internationalization

- **✅ R1 — Localization Foundation + Architecture Contract: complete locally.** Astro
  native i18n is configured for `es`, `en-CA`, and `fr-CA`; Spanish remains the unprefixed default,
  while `/en/` and `/fr/` are the reserved URL prefixes. No existing Spanish route, copy, design,
  functionality, domain identity, or slug was changed.
- `src/core/i18n/` now owns locale configuration, URL locale/path helpers backed by `astro:i18n`,
  typed dictionary contracts, explicit Spanish fallback behavior, and language-tag/alternate SEO
  helpers. Feature translation ownership is defined with a minimal Site Shell contract under
  `src/features/site-shell/i18n/`; no complete translation inventory was started.
- `docs/I18N.md` records the operational contract, fallback policy, glossary foundation, and
  requirements for future feature and locale additions. `AGENTS.md` now requires localized
  user-facing text, locale-aware internal routing, locale-independent domain IDs, and all-locale
  validation for new UI.
- **✅ R2 — Translation Inventory + Content Migration: complete locally.** Typed ES / EN-CA / FR-CA
  projections now cover Home, About metadata, Service, Event, Gallery, Site Shell, and Quote/Contact
  without duplicating canonical domain records. Home editorial content, navigation/footer labels,
  carousel controls, ARIA text, calendar controls, validation/review copy, and route metadata are
  feature-owned and localized. Canonical form values, IDs, slugs, payloads, routes, business rules,
  and Spanish visual behavior remain unchanged. The hardcoded-text classification is recorded in
  `docs/I18N.md`; remaining literals are intentional proper nouns or technical/internal values.
- **🔄 CURRENT R3 — Locale Routing + Language Switcher + SEO: pending approval.** Generate localized
  route surfaces and add the language selector without manual locale-prefix concatenation. Connect
  locale-aware metadata, canonical URLs, `hreflang`, and sitemap behavior only after approval.
- **⏳ R4 — Translation Fidelity + Full QA.** Validate multilingual content, responsive behavior,
  metadata, accessibility, and visual fidelity.

### Production URL + Scoped SEO Acceptance

- Confirm the definitive public domain and configure it as `SITE_URL` in Vercel Production.
- Redeploy with the existing build cache, then verify canonical and `og:url` for `/`, `/gallery`, every generated Gallery category, and every Event Detail route.
- Verify the JSON-LD URL, robots sitemap reference, `sitemap-index.xml`, and its page sitemap include the scoped routes.

## Pending

### Scoped Production Acceptance

- Run Lighthouse and capture field-oriented performance evidence for Home Projects, `/gallery`, and one representative Event Detail route after `SITE_URL` is deployed.
- After the final `SITE_URL` deployment, run a focused metadata and route smoke check; the full desktop/mobile and reduced-motion matrices do not need to be repeated unless application code changes.

## Known Issues / Deferred Decisions

- The final public domain remains unconfirmed. Production must define `SITE_URL` before deployment acceptance so canonical and sitemap URLs are emitted.
