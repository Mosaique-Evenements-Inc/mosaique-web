# Mosaïque Web Roadmap

Last verified against code and git history: 2026-08-27.

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
- Motion primitives exist for Reveal, StaggerText, MediaCrossfade, StickyScene, PanelReveal, and ScrollLinkedScene.
- **Production asset completion: deferred.** Approved self-hosted Cinzel and Montserrat files are still pending.

### Content Foundation

- **Implementation: complete.** `base_content.txt` is the business input; typed executable content lives in `src/content/home/`.
- Content modules exist for navigation, hero, about, milestones, metrics, why choose us, marquee, services, projects, process, testimonials, values, FAQ, final CTA, and footer.
- Only implemented sections consume their modules. Content-only modules are not treated as rendered product work.

### Navigation

- **Implementation: complete.** Astro navigation with a topbar quote action routed to `/contact`, centered brand, semantic menu disclosure, keyboard Escape handling, and outside-click close behavior.
- **Fidelity Pass: complete.** Composition and Hero integration were compared against Movra reference states.
- Responsive mobile compaction is implemented.

### Quote / Contact Flow

- **Implementation: complete for the available contact infrastructure.** The inline form at `/contact` now has one capture stage containing Contacto and Información del evento. Información adicional and the step indicator are no longer rendered. The former main quote dialog and its global trigger interception have been removed.
- Form validation runs only when opening review, focuses the first invalid control, and preserves every value through review edits. Review remains a separate confirmation state rather than a second form step.
- The current repository has no form API, EmailJS integration, server endpoint, or attachment transport. Submit preserves the existing cancellable `quote:submit-request` integration event and completion fallback; venue photos remain local previews and require a future transport integration.
- All approved quote and contact actions now navigate to `/contact`; no homepage CTA opens an overlay, drawer, sheet, or dialog for the main form.
- Mobile uses natural page scroll, one-column fields, a full-width primary action, and media after the form. Tablet and desktop use the dedicated split form/media composition.
- **Implementation: complete.** Desktop uses the approved `logo_topbar.png` asset at the leading edge and a focused inline navigation containing Nosotros, Servicios, Galería, and Contacto without a hamburger. Contacto owns the centralized Quote Flow trigger; the former “Cotizar un evento” topbar action was removed. At the existing `xl` breakpoint (80 rem), tablet and mobile switch to one shared native-dialog fullscreen navigation whose Contacto item opens that same flow.
- The topbar uses one background-free, progressively masked backdrop-blur layer that extends visually below its fixed height without a divider, tint, shadow, layout space, or interaction interception. Its foreground switches between the existing light and dark text tokens according to the explicitly declared surface currently beneath its centerline across the entire page; solid event-detail navigation remains fixed to its approved dark foreground. The white transparent logo is applied as a current-color mask so it follows the same contrast state without introducing a duplicate asset.
- The fullscreen menu uses `100dvh` with a viewport fallback, safe-area padding, internal overflow, document scroll locking with exact restoration, native modal focus containment, Escape and close-button handling, link-close behavior, and focus return to the trigger.
- **Fidelity Pass: complete.** The desktop underline interaction and compact circular mobile control were reinterpreted from the supplied David Tutera references in Mosaïque tokens. The new composition was compared in-browser at 1440 px, the 1280 px desktop threshold, tablet landscape and portrait, 430 px and 390 px mobile, and 320 px narrow mobile. Runtime reduced-motion emulation remains pending; the CSS media path and immediate JavaScript close path passed code review.

### Quote / Contact Flow

- **Implementation: complete for the available contact infrastructure.** The Contacto navigation action opens a three-step native-dialog flow for Contacto, Tu evento, and Cuéntanos un poco más; the form is not rendered as a permanent visible page section.
- Step-local validation runs only when advancing, focuses the first invalid control, and preserves every value through Back, Close, and same-session reopen. The stepper reports active, completed, and pending states without enabling direct step jumps.
- Venue = Sí opens a second accessible native dialog with required venue name, optional JPEG/PNG/WEBP selection, five-file limit, local previews, individual removal, saved summary, and edit behavior. Venue details are excluded from the prepared payload when the final choice is No or Estoy buscando.
- The current repository has no form API, EmailJS integration, server endpoint, or attachment transport. Submit therefore prepares a truthful email draft through the verified `mailto:` contact channel; venue photos remain local previews and are explicitly reported as requiring separate delivery.
- `#contact` remains on Final CTA for the existing Hero, Services, navigation, footer, and deep-link contract. The topbar and fullscreen-menu Contacto actions intercept that destination to open the flow.
- Mobile uses a compact branded header, a complete three-stage connected stepper, an independently scrollable form body, and persistent bottom navigation with an icon-only Back control and full-width primary action. Tablet and desktop retain the established editorial dialog composition.
- The optional event-date field uses a localized, dependency-free calendar dialog instead of the browser-native picker. It preserves the ISO submission contract and Back/Next persistence while providing Spanish month navigation, circular day controls, distinct today/selected/past states, keyboard arrow navigation, Escape/backdrop close, and compatibility with “Aún no tengo fecha”.
- After capture, a separate review state summarizes Contacto and Información del evento without presenting a duplicate visible review title. Each summary section returns to the single form stage for edits, and the real email preparation occurs only from the final “Enviar solicitud” action.
- Form opening, review, back, and edit actions emit uppercase development logs without altering form state or transport behavior.
- A token-driven, accessible success toast confirms completion after every submission attempt, independently of whether the optional `quote:submit-request` transport integration resolves, rejects, or is not connected yet.
- Desktop, tablet, mobile, auxiliary-dialog stacking, validation, Back persistence, 500-character enforcement, and horizontal overflow were validated.

### Contact Page

- **Implementation and Fidelity Pass: complete.** The static `/contact` route reuses Navigation, Footer, the two-tab QuoteForm, approved quote labels, and the verified contact email from the existing content foundation.
- Desktop follows the supplied reference with an approximately 40/60 form-media split, compact form density, pill-shaped token-driven fields, existing select contracts, a strong full-width action, and a large sticky replaceable media placeholder. The single-stage form begins directly with its content and retains a visually hidden accessible heading without a redundant page title or step indicator. Tablet preserves a readable split; mobile stacks form then media in natural flow.
- The media placeholder is isolated in `ContactMediaPlaceholder.astro` so approved photography can replace it without changing form behavior or page composition.
- The page introduces no complex motion. Labels, fieldsets, validation errors, keyboard navigation, focus states, loading status, review editing, auxiliary dialogs, and the accessible success toast remain available.

### Hero

- **Implementation: complete.** Full-viewport media scene, initial title and CTA, replaceable media contract, and a CSS-only PanelReveal handoff into About. The former oversized Mosaïque brand and its scroll-linked morph were removed, together with the extra 45svh used to stage that animation.
- **Fidelity Pass: complete.** Initial, intermediate, final, and section-handoff states were compared against screenshots and recordings.
- Desktop, tablet, mobile, and reduced-motion states were validated.

### About

- **Implementation: complete.** Rendered through `AboutMilestones.astro` from `src/content/home/about.ts`; the section remains in normal flow while revealing over the temporarily sticky Hero.
- **Fidelity Pass: complete.** The two-column editorial composition, viewport proportions, divider, sticky media, and responsive reading order were compared against the Movra recording.

### Milestones

- **Implementation: complete.** Five semantic timeline items render from `src/content/home/milestones.ts`.
- **Fidelity Pass: complete.** Desktop label/description rows, sticky-media relationship, tablet split, and mobile linear flow were validated.

### Services

- **Implementation: complete.** StickyServices, ServicesScene, PanelReveal, and the neutral ScrollLinkedScene pattern are integrated. ServicesIntro was removed from the page; Marquee remains an independent preceding section while a panel-only overlap lets Services reveal over its final viewport.
- The seven service records use the approved compact title, description, audience, and commercial CTA copy from `src/content/home/services.ts`; the commercial actions target `/contact`.
- Desktop and tablet use equal scene columns plus an intrinsic-width index column so service copy and synchronized media carry comparable visual weight without increasing the bounded scroll interval.
- The synchronized media frame exposes one contextual `Ver más` button for the active service on desktop and tablet. It uses the existing stable service `id`, provides a descriptive accessible name, and currently logs the selected identifier without navigation so a future detail action can replace one handler.
- Mobile removes the media frame and its associated `Ver más` action at the existing 48 rem breakpoint, leaving the complete service copy in a full-width natural flow without reserved media space.
- The former Services transition CTA beginning “¿Tienes una idea, un espacio o una celebración en mente?” and its exclusive content and styles were removed by product direction, so Services now hands off directly to Projects / Experiences.
- **Fidelity Pass: complete.** Section overlap, sticky media, seven service states, scroll pacing, responsive behavior, and reduced motion were validated.
- React is limited to the interactive Services scene and hydrates with `client:visible`.

### Projects / Experiences

- **Implementation: complete.** The section now presents a six-slot gallery for completed events from `src/content/home/projects.ts` instead of five conceptual project categories.
- The six approved event names and descriptions live in one typed `eventGalleryItems` collection. Clients, venues, dates, and photography remain unavailable, so every record preserves its stable identifier and explicit pending-media status without inventing asset paths.
- **Fidelity Pass: complete.** The Movra editorial split, divider, typography, portrait media, and desktop controls remain unchanged; responsive controls were aligned with the CTA row against the supplied mobile reference.
- The desktop carousel uses native horizontal scrolling, scroll snap, touch/keyboard scrolling, and accessible previous/next controls. Arrow navigation advances in derived two-event pages (`1–2`, `3–4`, `5–6`) without an isolated final card; the live status announces the first event in the visible pair as `Evento X de 6`.
- Tablet and mobile use the same data-driven carousel in a single-event mode: one complete event card is visible at a time, navigation advances by one, and the finite previous/next controls share the CTA row above the active card. Mobile keeps the full-width editorial heading clear of the navigation and uses one tokenized grid gap between that control row and the media; tablet retains its wider spacing. Placeholder media remains lightweight and replaceable while approved event photography is pending.
- Desktop, tablet, mobile, breakpoint resize normalization, reduced-motion behavior, overflow, six-item completeness, all six responsive navigation states, and all three desktop paired navigation states were validated.

### Event Detail

- **Baseline implementation retained; David Tutera reference-fidelity program active.** The dynamic Astro route at `/events/[slug]`, its six stable Project / Experience records, Navigation, Footer, and pending-media contract remain the foundation rather than being rebuilt.
- Reference Diagnostic, Current Mosaïque Diagnostic, and Page Shell + Routing + Content Model are complete: the existing route uses the shared overlay Navigation, a dark semantic event chapter, and separate typed contracts for featured media and gallery media without inventing location, category, client, venue, date, or approved assets.
- **Event Info Rail implementation and Fidelity Pass are complete for approved content.** Event Detail now begins directly with the visible Gallery Detail composition from the supplied asset; the previously proposed intro/entrance is explicitly outside scope and was removed before release. Desktop and tablet use a proportional 28/72 rail/media foundation with Mosaïque display hierarchy, restrained narrative placement, and a lower divider. Mobile returns the rail to natural flow. Desktop, tablet, mobile, narrow-mobile overflow, and browser-console behavior were validated against the supplied reference.
- No location, category, client, venue, or date is rendered because none is approved in the Content Foundation. The rail can receive verified metadata later without changing its composition.
- **Featured Media implementation is complete for the available content contract.** `EventFeaturedMedia.astro` owns a proportion-aware pending state plus approved image and captioned-video variants. Approved images use Astro Assets; approved video remains user-initiated, uses native media playback, requires captions in the typed model, and receives a control only when an actual video source exists. The current pending records therefore remain honest and do not expose a non-functional Play action. Desktop, tablet, mobile, narrow-mobile geometry, overflow, and browser-console behavior were validated. Final photographic/video fidelity remains deferred until business supplies an approved asset.
- **Sticky Desktop Composition implementation and Fidelity Pass are complete.** From the existing `lg` breakpoint, the full-viewport Event Info Rail uses native CSS sticky positioning with a zero top offset, remains bounded by the real Event Detail chapter height, and releases progressively when that parent reaches its end. The gallery keeps native document scroll; Navigation remains above the rail without overlap. Tablet and mobile intentionally remain in normal flow. No listener, artificial scroll distance, fixed-position hack, or additional runtime was introduced.
- **Editorial Gallery implementation and Fidelity Pass are complete for the six available media slots.** The Content Foundation assigns explicit `pair-landscape`, `pair-portrait`, and `full-landscape` roles, and Astro renders the measured reference sequence as centered media inside two-column and full-width editorial rows rather than a generic masonry grid. Desktop media geometry, row spacing, responsive flow, six-slot order, lightbox indexing, expanded sticky duration, overflow, and browser-console behavior were validated. Approved local images continue to use Astro Assets; no gallery dependency or React island was introduced.
- **Sticky Release / End of Chapter implementation and Fidelity Pass are complete.** The final gallery row and the Event Detail chapter boundary now share the same tokenized editorial gap: `14px` at the measured desktop viewport and `8px` on compact viewports. The native sticky rail remains governed by the chapter boundary, releases progressively with its parent, and hands directly to the following content without a spacer, fade, listener, or fixed-position override. The wider negative space before the reference's More Galleries heading belongs to that next section and remains deferred to its own phase.
- **More Galleries / Next Gallery Preview implementation and Fidelity Pass are complete for pending media.** A dedicated Astro section uses the established event order to link each detail page to one next event, including the final-to-first boundary, without a carousel or related-content runtime. At `1440 × 900`, the rendered comparison reproduces the reference's `144px` chapter-to-heading gap, `144px / 122.4px` heading geometry, `130px` heading-to-preview gap, centered `70% → 100%` frame expansion with a compensating `130% → 100%` media contraction, `750svh` desktop chapter, full-viewport sticky state, and natural Footer release. Tablet, mobile, and narrow mobile return the preview to normal flow and passed overflow and console validation. Browsers without scroll-driven animation support receive a static `100svh` preview; reduced motion removes both scales and the additional sticky scroll distance. Static output confirms all six generated links and labels.
- **Responsive Fidelity is complete.** Laptop, desktop-threshold, tablet, mobile, and `320px` useful-width states preserve one semantic render tree, readable rail copy, the editorial gallery sequence, normal-flow compact previews, and a full-viewport responsive lightbox without horizontal overflow. All six current and next-event titles were exercised at compact widths. The tablet title scale now responds to the rail's actual width so the longest approved event name does not collide with media; desktop and mobile geometry remain unchanged.
- **Viewport-entry media reveal implementation and accessibility validation are complete.** The featured-media and gallery contracts now use nested, non-semantic visual wrappers to reproduce the measured reference behavior: each entering gallery frame progresses from `80% → 100%` while its media compensates from `120% → 100%`, with no opacity gate, listener, observer, hydration, or changed interactive target. Unsupported browsers retain fully visible media. Desktop, tablet, mobile, and `320px` useful-width geometry, six-control completeness, overflow, and browser-console behavior passed rendered validation.
- The accessibility tree preserves one `h1`, the labelled gallery region, all six descriptive image buttons, the labelled next-event region, and the existing heading order. The lightbox still moves focus to Close, reports its live position, updates finite boundaries, locks document scroll, and returns focus to the originating image control. The new visual wrappers do not add roles, names, focus stops, or reading-order changes.
- The `prefers-reduced-motion` branch removes both reveal transforms and animations, preserves every media item at full scale, disables hover enlargement and dialog entry motion, and collapses the long next-preview chapter back to `100svh` normal flow. Static CSS review passed, but runtime media-query emulation remains pending because the available in-app browser exposes neither media emulation nor CDP and no connected Chrome browser is available. This limitation is recorded rather than treating code inspection as runtime acceptance.
- **Full Fidelity Audit is complete for the approved pending-media contract.** At `1440 × 900`, initial load, early scroll, normalized mid and late sticky-gallery states, chapter release, More Galleries entry, next-gallery preview, and Footer release were compared with the live reference. The audit corrected the gallery reveal to use the reference's full viewport-entry interval and added the preview's reciprocal inner-media contraction. The final checks align the first entering row within roughly one percentage point (`91.6%` local versus `90.7%` reference), the next entering row (`83.9%` versus `84.2%`), sticky release (`-199.7px` rail top in both), heading and preview gaps, and preview entry scales (`94.1% / 105.9%` local versus `94.0% / 106.0%` reference). The environment-limited reduced-motion exception was accepted only to allow roadmap progression; it is not recorded as runtime emulation.
- **Performance + Final QA are complete for the approved pending-media contract.** The production Event Detail route emits approximately `5.5 KB` gzip of HTML and `2.8 KB` gzip of route CSS, creates no Astro/React island, and adds no route-specific JavaScript chunk or gallery scroll listener. All six generated routes, six-image lightboxes, cyclic next-event links, heading structures, landmarks, and Footer handoffs passed runtime checks. The lightbox opens with focus on Close, reports finite position, responds to Arrow keys and Escape, restores document scroll, and returns focus to its originating trigger. Laptop, `430px` mobile, and `335px` narrow-mobile states passed rendered overflow, long-title, natural-flow, preview, and menu checks. Final media-weight and LCP conclusions remain deferred until approved photography and video replace the current pending states.
- The live reference contains seventeen visible gallery images while the current Mosaïque contract contains six pending slots. Its exact photographic sequence and total scroll duration therefore remain content-constrained until business approves the final media count and assets. The live event did not expose a three-column or asymmetric desktop row, so neither was invented in the current render.
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

- **Implementation: complete.** A full-viewport Astro scene renders content from `src/content/home/marquee.ts` between Why Choose Us and Services.
- **Fidelity Pass: complete.** The scene enters through a three-step media reveal and remains sticky for a bounded scroll interval, while its oversized ticker runs independently as a token-driven CSS autoplay loop.
- The bounded reveal uses one passive scroll listener only while the scene is near the viewport, batches updates with requestAnimationFrame, and writes only transform and opacity styles without React hydration.
- Approved photography remains pending, so the full-bleed media contract currently renders a lightweight branded placeholder.
- Reduced motion removes the sticky scroll distance and staged reveal, hides the visual duplicate, and presents the statement and ticker as a static full-viewport composition.
- Desktop, tablet, mobile, document overflow, scroll-linked stability, section handoff, content duplication semantics, and reduced-motion behavior were validated.

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
- Approved photography remains pending, so five replaceable CSS media states are duplicated only for visual continuity and remain hidden from assistive technology.
- Reduced motion stops the animation, removes the duplicate group, and presents three static media panels without changing content or actions.
- Desktop, tablet, mobile, loop movement, action constraints, content completeness, document overflow, and reduced-motion code paths were validated.

### Footer

- **Implementation: complete.** A semantic footer landmark renders the brand, seven navigation links, six service labels, contact details, closing statement, and legal copy from `src/content/home/footer.ts` after `main`.
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

- **Implementation: complete for the current single-page surface.** Spanish document language, descriptive title, description, robots directives, Open Graph metadata, Twitter card metadata, favicons, and Organization JSON-LD are present.
- `SITE_URL` is the single production URL source. Canonical, `og:url`, the Organization URL, sitemap generation, and the sitemap reference in robots are emitted only when it is configured, preventing localhost or speculative domains from entering production metadata.
- The official Astro sitemap integration generates the sitemap index and page sitemap. `robots.txt` remains valid without a configured domain and adds the absolute sitemap URL when one exists.
- Social image tags remain intentionally absent until an approved production image is available.

## Current

### Event Detail Reference Fidelity

- **Current phase: Event Detail reference-fidelity program complete for the approved pending-media contract.** Implementation, fidelity, responsive behavior, accessibility, performance, and final regression checks are complete. Runtime reduced-motion emulation and final photographic rhythm remain production-acceptance items that depend respectively on a capable test browser and the final approved asset count and business media. No additional Event Detail implementation phase should begin without new content or product direction.
- The reference program is tracked as independent implementation, fidelity, responsive, accessibility, and QA phases. No later phase should begin automatically.

### Deployment Sync / Verification

- **Status: initial Vercel deployment live.** `https://mosaique-web.vercel.app` responds successfully over HTTPS.
- The live deployment currently predates the completed SEO work: redeploy the current code and configure `SITE_URL` after the definitive public domain is confirmed, then verify canonical, robots, sitemap, metadata, and runtime behavior on the deployed revision.

## Next

### Business Asset Brief

- **Status: pending business instruction.** Obtain approved photography, self-hosted font files, social sharing artwork, and any final content decisions before the production asset pass.

## Pending

### Metrics

- **Status: removed from the rendered page by product direction.** The metric tiles and their count-up runtime were removed from `AboutMilestones.astro`; typed content remains in `src/content/home/metrics.ts` for possible future review.
- About and Milestones retain their existing sticky-media composition without a separate Metrics block.

### Values / Spotlights

- **Status: deferred for business review.** The attempted implementation was fully removed; content remains only in `src/content/home/values.ts`.
- Revisit implementation and the Movra spotlight/floating-card reference only after business approval.

### Production Assets

- **Status: deferred pending business instruction.** Placeholder replacement, approved fonts, responsive image optimization, and social artwork will be completed when final assets are supplied.

### Storybook

- **Status: not started and not currently configured.** No Storybook dependency, stories, or build command exists.
- Add only under an explicit phase; it is not required for current section delivery.

### Vercel

- **Status: initial deployment complete.** The Vercel URL is live; synchronization of the current SEO revision, final domain configuration, and production acceptance checks remain pending.

## Known Issues / Deferred Decisions

- The current `src/pages/index.astro` composition comments out About/Milestones and Why Choose Us and changes previously validated section handoffs. Those homepage changes predate the Contact Page task and have not completed a new fidelity or full-regression pass; preserve them until their product intent is confirmed.
- Approved production photography is unavailable. Hero, About/Milestones, Marquee, Services, Projects, Process, Testimonials, FAQ, and Final CTA currently use lightweight replaceable placeholders.
- Approved self-hosted Cinzel and Montserrat font files are pending; see `docs/DESIGN_SYSTEM.md`.
- Approved social sharing artwork is pending; `og:image` and `twitter:image` should be enabled through the existing layout prop when it is delivered.
- The final public domain remains unconfirmed. Production must define `SITE_URL` before deployment acceptance so canonical and sitemap URLs are emitted.
- Services uses `client:visible`; preserve its server-rendered fallback and verify hydration again when production media is introduced.
- Media models for future sections must not invent asset paths while approved assets are unavailable.
