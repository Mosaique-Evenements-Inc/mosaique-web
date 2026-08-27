# Mosaïque Web Roadmap

Last verified against code and git history: 2026-08-26.

This document is the source of truth for implementation status. The existence of a module in `src/content/home/` does not mean its section has been implemented.

## Completed

### Foundation

- **Implementation: complete.** Astro static site foundation, React integration, Tailwind token consumption, linting, type checking, and production build are configured.
- **Validation: complete for the current implemented surface.** Build, lint, typecheck, and diff-check have passed during completed phases.

### Design System

- **Implementation: complete for the current foundation.** Primitive and semantic color, typography, spacing, layout, z-index, and motion tokens exist in `src/styles/tokens/`.
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

- **Implementation: complete.** Desktop uses the approved `logo_topbar.png` asset at the leading edge and a focused inline navigation containing Nosotros, Servicios, Galería, and Contacto without a hamburger. Contacto owns the centralized Quote Flow trigger; the former “Cotizar un evento” topbar action was removed. At the existing `xl` breakpoint (80 rem), tablet and mobile switch to one shared native-dialog fullscreen navigation whose Contacto item opens that same flow.
- The topbar no longer renders a background or divider strip. The white transparent logo is applied as a current-color mask so it remains legible on both overlay and solid navigation surfaces without introducing a duplicate asset.
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
- After the third capture step, a separate review state summarizes Contacto, Tu evento, and Cuéntanos un poco más without presenting itself as a fourth step. Each summary section returns directly to its corresponding step for edits, and the real email preparation occurs only from the final “Enviar solicitud” action.
- The former full-screen confirmation state and `mailto:`-based completion were removed. A token-driven, accessible success toast now closes the flow and confirms completion after every submission attempt, independently of whether the optional `quote:submit-request` transport integration resolves, rejects, or is not connected yet.
- Desktop, tablet, mobile, nested-dialog stacking, body-scroll restoration, Escape, focus return, validation, Back persistence, 500-character enforcement, and horizontal overflow were validated.

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
- The seven service records use the approved compact title, description, audience, and commercial CTA copy from `src/content/home/services.ts`; the commercial actions continue to target `#contact`.
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

- **Implementation: complete for the approved event copy and pending photography.** One Astro dynamic route at `/events/[slug]` composes the existing Navigation and Footer around an editorial event header, a data-driven gallery, and a reusable native-dialog lightbox. The six stable Project / Experience records now link to their corresponding generated detail routes without duplicating page templates.
- Event detail content is derived from the same typed event collection and adds only a slug, title, description, and image collection. No client, venue, date, location, category, or other unverified business metadata was introduced. Approved photography remains pending, so the current image records use explicitly pending, proportioned placeholders.
- The gallery remains server-rendered Astro and follows the approved strict editorial composition: a constrained three-column 2:3 grid with a hairline gap on desktop, two columns on tablet, and one full-width column on mobile. Gallery crops use `object-fit: cover`; the lightbox preserves each complete asset without squashing. Approved local images use Astro Assets with responsive widths, sizes, intrinsic metadata, and selective loading priority; no gallery dependency or additional React island was introduced.
- The finite native-dialog lightbox opens from the selected image, supports previous/next controls, Arrow keys, Escape, close control, appropriate outside-media close, document scroll locking, live position status, visible focus, disabled boundary states, and focus return to the originating image. Motion is token-driven and the reduced-motion media query removes decorative transitions without changing access to content or controls.
- The strict grid was compared with the supplied portfolio reference. Desktop, tablet, mobile, 320 px reflow, 2:3 gallery cells, complete lightbox proportions, horizontal overflow, route access from Projects, finite navigation boundaries, Escape, focus return, and browser console output were validated. Runtime media-query emulation for reduced motion remains pending; its CSS path passed code review.

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
- A quiet closing CTA reuses the established quote-flow trigger and `#contact` fallback instead of duplicating modal logic or inventing a route.
- Supporting browsers receive a token-driven CSS open/close transition through `::details-content`; other browsers retain immediate native disclosure behavior without JavaScript. Reduced motion removes the disclosure and icon transitions while preserving immediate state changes.

### Final CTA

- **Implementation: complete.** The closing section renders its title, concise supporting copy, and one quote-flow action from `src/content/home/finalCta.ts` after FAQ. The action uses an editorial line-arrow treatment, the title has a wider reading measure, and the former partnership action and closing statement have been removed.
- The CTA now uses a full-bleed green stage with container-bound content, subtle internal grid lines, and responsive CSS-only halftone clusters built from individually visible token-derived dots and radial masks. Fine pointers reveal a larger champagne dot layer around the cursor and apply compositor-only micro-parallax through requestAnimationFrame-batched custom properties; mobile remains static and reduced motion removes the reactive layer.
- The Services media action is now the source for a shared `EditorialAction` UI contract used by Services, Hero, and Final CTA. Its cream surface, intrinsic width, compact radius, typography, line-arrow geometry, hover tint, focus behavior, and reduced-motion treatment live in one component-owned stylesheet; section styles retain only placement responsibilities. Final CTA no longer renders lateral grid lines, and its reactive dots use a brighter ivory–champagne mix with stronger hover opacity.
- **Fidelity Pass: complete.** The composition follows Movra's closing rhythm with centered copy and actions above a continuously moving gallery at the lower edge.
- The gallery is a CSS-only infinite loop driven by the existing `--motion-marquee-duration` token, with two identical visual groups and no hover pause, JavaScript, listeners, or React hydration.
- Approved photography remains pending, so five replaceable CSS media states are duplicated only for visual continuity and remain hidden from assistive technology.
- Reduced motion stops the animation, removes the duplicate group, and presents three static media panels without changing content or actions.
- Desktop, tablet, mobile, loop movement, action constraints, content completeness, document overflow, and reduced-motion code paths were validated.

### Footer

- **Implementation: complete.** A semantic footer landmark renders the brand, seven navigation links, six service labels, contact details, closing statement, and legal copy from `src/content/home/footer.ts` after `main`.
- On mobile, Compañía, Recursos, and Servicios use collapsed native disclosures to reduce scroll length; tablet and desktop keep all three groups expanded in the established grid.
- **Fidelity Pass: complete.** Final CTA now hands off through a compact edge-padded visual strip into Movra's two-row footer composition: aligned 50/50 desktop grids, inset vertical dividers, full-width horizontal dividers, three navigation groups, the framed Mosaïque brand grid, contact CTA and verified contact details, a six-item service grid, and the closing copy at opposite lower edges.
- Desktop uses paired information bands, tablet stacks those bands, and mobile follows a linear reading order without introducing reference-only newsletter, partner brands, social links, or legal destinations.
- The footer is Astro-only and contains no runtime JavaScript or motion; reduced motion therefore preserves the same static experience.
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

- Approved production photography is unavailable. Hero, About/Milestones, Marquee, Services, Projects, Process, Testimonials, FAQ, and Final CTA currently use lightweight replaceable placeholders.
- Approved self-hosted Cinzel and Montserrat font files are pending; see `docs/DESIGN_SYSTEM.md`.
- Approved social sharing artwork is pending; `og:image` and `twitter:image` should be enabled through the existing layout prop when it is delivered.
- The final public domain remains unconfirmed. Production must define `SITE_URL` before deployment acceptance so canonical and sitemap URLs are emitted.
- Services uses `client:visible`; preserve its server-rendered fallback and verify hydration again when production media is introduced.
- Media models for future sections must not invent asset paths while approved assets are unavailable.
