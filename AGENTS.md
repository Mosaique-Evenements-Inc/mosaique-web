# Mosaïque Web Agent Protocol

> `AGENTS.md` provides working conventions, not a substitute for inspecting the repository.
> Before each task, verify the current implementation because the codebase may have evolved
> since this document was written.

## Project Overview

Mosaïque Web is the public website for **MOSAÏQUE ÉVÉNEMENTS**, an event planning,
production, logistics, rental, and venue-partnership business in Montréal.

The experience is editorial, premium, minimal, elegant, photography-led, and strongly shaped
by typography and scroll rhythm. It is not a SaaS product or a generic component dashboard.
Preserve generous negative space, restrained interface chrome, cinematic pacing, and clear
content hierarchy.

## Inspect Before Modifying

**Inspect before modifying.** Never rely on filenames, screenshots, this document, or prior
task context alone.

Before changing code:

1. Read this file completely.
2. Read `docs/ROADMAP.md` and the documentation relevant to its `Current` phase.
3. Run `git status --short` and inspect the relevant diff without changing it.
4. Inspect the affected implementation, content source, styles, consumers, and page composition.
5. Search for existing tokens, primitives, patterns, breakpoints, assets, and shared constants.
6. Compare the implementation with the roadmap and any supplied visual reference.
7. Run the base validations before implementation.
8. Only then make the smallest change that solves the confirmed requirement.

Code is authoritative when documentation is stale. If code and `docs/ROADMAP.md` disagree,
report the discrepancy and correct the roadmap before continuing, unless the task explicitly
limits edits to another file.

## Protect Current Work

Assume a dirty working tree contains valuable user work.

- Inspect `git status` and the relevant diffs before editing.
- Preserve unrelated modified, staged, and untracked files.
- Never use reset, destructive checkout, clean, or another command that discards work.
- Never overwrite or revert a file merely to simplify the task.
- If the requested area overlaps unclear user changes, inspect carefully and ask before taking
  an action that could replace their intent.
- Do not commit, push, deploy, or alter branches unless explicitly requested.

## Scope Discipline

- Change only the files required by the task.
- Do not perform preventive refactors, speculative cleanup, or unrelated copy/style edits.
- Do not add dependencies without a demonstrated need and explicit justification.
- Do not rebuild a validated section without an identified regression or explicit requirement.
- Do not modify a shared primitive or pattern to solve a local problem unless inspection proves
  that the shared layer is at fault.
- Do not create abstractions for hypothetical reuse. Generalize only after real reuse exists.
- Stop after the authorized phase; do not start the roadmap's `Next` phase automatically.

## Architecture

The current hierarchy is:

```text
Design Tokens
  -> UI / Motion Primitives
  -> Interaction Patterns
  -> Sections
  -> Pages
```

**Follow the architecture already present. Never impose a new architecture for a localized
task.**

Current responsibilities:

- `src/content/`: reviewed business copy and semantic content models.
- `src/content/home/`: one typed module per homepage section or editorial concept.
- `src/components/ui/`: small, reusable, content-agnostic Astro primitives.
- `src/components/motion/`: reusable motion and interaction orchestration.
- `src/components/sections/`: section composition, semantics, content binding, and local behavior.
- `src/pages/`: route composition and section order.
- `src/styles/tokens/`: executable CSS design-token source of truth.
- `src/styles/sections/`: section-owned styles.
- `src/tokens/motion.ts`: runtime equivalents of CSS motion tokens for React/Motion.
- `src/layouts/BaseLayout.astro`: shared document shell and metadata contract.

The current public surface includes the homepage at `/`, the contact page at `/contact`, event
detail pages at `/events/[slug]`, and `/robots.txt`. `src/pages/index.astro` currently composes
Navigation; then a `PanelReveal` containing Hero, Event Gallery, Services, Process with
Testimonials, and Marquee; followed by FAQ, Final CTA, and Footer. The `/contact` route owns the
inline two-tab QuoteForm and its replaceable media placeholder. About/Milestones and Why Choose
Us are currently commented out of the homepage composition. A module or component existing on
disk does not prove it is rendered.

## Technology Principle

**Static by default, interactive by exception.**

- Use Astro for pages, layouts, sections, and static components.
- Use CSS and native browser behavior for layout, sticky positioning, simple transitions, and
  local disclosures.
- Add a React island only when client-side state or orchestration is genuinely required.
- The current React island is the Services `ScrollLinkedScene` consumer, hydrated with
  `client:visible`; preserve its server-rendered content.
- Use Motion for established React motion primitives and scroll-linked orchestration.
- Do not introduce GSAP or another motion/runtime dependency unless the existing stack cannot
  express a confirmed requirement.
- Preserve native scrolling. Do not hijack wheel/touch input or introduce mandatory scroll snap.

## Clean Implementation

- Keep functions and components focused on one responsibility.
- Prefer clear names, explicit data flow, and small local changes over clever indirection.
- Reuse an existing primitive when its contract fits; do not force reuse when semantics differ.
- Keep UI and motion primitives content-agnostic.
- Keep business copy out of UI and motion primitives; sections connect content to presentation.
- Avoid duplicated render trees for responsive layouts. Use one semantic structure and adapt it
  with CSS whenever practical.
- Do not branch render output with `window.innerWidth`; use the existing CSS breakpoints or an
  established responsive mechanism.

## Brand and Visual System

Executable tokens in `src/styles/tokens/` win over prose documentation.

Current primitive palette:

- Dark Green: `--color-green-900` (`#0b241c`)
- Warm Tan: `--color-tan-500` (`#c49a6c`)
- Cream: `--color-cream-100` (`#f6f1e8`)
- Neutral Gray: `--color-gray-300` (`#c1c1c1`)
- White: `--color-white` (`#ffffff`)

Components and sections must consume semantic variables such as `--color-background`,
`--color-primary`, `--color-surface`, `--color-text-primary`, `--color-text-inverse`,
`--color-accent`, `--color-border-default`, and `--focus-ring-color`. Do not hardcode hex
colors in component or section styles. Add a primitive or semantic token only when a durable,
approved design role is missing.

Typography:

- Display and headings: `--font-family-display`, currently Cinzel with editorial fallbacks.
- Body and interface: `--font-family-body` / `--font-family-ui`, currently Montserrat with
  system fallbacks.
- Approved self-hosted font files are pending. Do not invent font asset paths.
- Use the existing display, heading, body, caption, navigation, and button type tokens.

Layout and rhythm:

- Content maximum: `--layout-max-content: 90rem`.
- Reading maximum: `--layout-max-reading: 44rem`.
- Grid: 12 columns with `--layout-grid-gap`.
- Page gutters and section spacing are fluid semantic spacing tokens.
- Radii are restrained (`none`, `xs`, `sm`, `md`); borders use semantic border tokens.
- Breakpoints: `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem.
- Use `100svh`/`100dvh` deliberately where mobile browser chrome matters.

Use the shared `Button.astro` variants (`primary`, `secondary`, `ghost`) when their contract
fits. Preserve the hierarchy: primary for the main action, secondary for a quieter framed action,
and ghost for low-chrome textual action. A destination uses a link; an in-page operation uses a
button. Never use `<a href="#">` as a placeholder action.

## Content Architecture and Sources of Truth

Content flows as follows:

```text
base_content.txt
  -> reviewed typed modules in src/content/
  -> section components
  -> UI and motion primitives
```

`base_content.txt` is the original business input and is not read at runtime. The typed modules
in `src/content/` are the executable content source. Keep them presentation-agnostic and preserve
stable identifiers. CTAs are modeled as label plus `href`; content modules do not create routes.

For a content change:

1. Find the current source and all consumers with repository search.
2. Update the source rather than duplicating copy in markup.
3. Preserve types, IDs, ordering, CTA destinations, and content status unless the requirement
   explicitly changes them.
4. Check repeated concepts across separate sources for intentional consistency.

`navigationContent` owns the main navigation labels and anchors. `footerContent` owns footer
navigation, service labels, contact details, brand, and legal copy; Navigation currently reuses
its contact details. These are distinct content modules, so verify cross-module consistency rather
than assuming a hidden global constant exists.

## Never Invent Business Data

**Never invent business data.** This includes phone numbers, email addresses, clients, event
names, testimonials, metrics, venues, dates, URLs, routes, social accounts, claims, and media.

- Search the repository for an approved value first.
- Reuse verified content exactly from its source.
- If the value is absent or explicitly pending, keep an honest placeholder/status and report it.
- Do not convert provisional content into a factual claim.
- Do not create a route or external destination merely because a CTA needs future behavior.

## Visual Reference and Fidelity

Movra is the primary reference for behavior and composition. Mosaïque retains its own brand,
copy, colors, typography, and photography. Use `docs/MOVRA_REFERENCE.md` for reference behavior
and `docs/PATTERNS.md` for Mosaïque-owned interactions.

When the user supplies a screenshot or recording, treat it as the main visual reference for the
requested state. Inspect it before implementation and compare:

- composition, proportions, and viewport occupation;
- typography scale, wrapping, weight, and media role;
- gutters, spacing rhythm, dividers, alignment, and hierarchy;
- explicit dimensions, crop, layering, sticky boundaries, and section handoffs;
- initial, intermediate, and final scroll states;
- desktop, tablet, and mobile behavior.

Implementation complete and fidelity complete are separate states. Compilation alone is not
visual acceptance. A fidelity pass requires rendering the affected states at representative
viewports and comparing them with the supplied reference. Document any remaining difference.

## No Magic Fixes

Solve layout at the responsible grid, flex, intrinsic sizing, alignment, token, or responsive
rule. Do not mask structural problems with:

- global `scale()` or browser zoom;
- arbitrary `translate` offsets;
- unexplained fixed heights;
- viewport-specific negative margins;
- empty spacer elements;
- duplicated markup for one breakpoint;
- scattered pixel nudges that only match one screenshot.

Section-specific geometry is acceptable when it expresses a real composition rule. Name it,
derive related values from a shared custom property where useful, and validate it across the
supported range.

## Responsive and Mobile

Validate desktop, laptop, tablet, mobile, and narrow mobile—not only the supplied viewport.

- Use the existing breakpoints before inventing a media query.
- Preserve reading order and content access before desktop geometry.
- On mobile, reduce unnecessary scroll distance, sticky takeover, and decorative media when the
  existing responsive design calls for it.
- Do not hide meaningful content to make a screenshot fit.
- Prevent horizontal overflow, clipped controls, inaccessible disclosures, distorted media, and
  text collisions.
- Verify both closed and expanded states for content whose height changes.
- Prefer intrinsic height and normal flow on compact screens.

## Sensitive Scroll and Motion Contracts

Treat these behaviors as regression-sensitive:

- Hero no longer renders or transforms a large Mosaïque brand; the topbar logo remains independent while the Hero script only coordinates navigation color and caption state.
- Hero hands off to About through the default `PanelReveal` sticky lead.
- Marquee hands off to Services through the overlapping `PanelReveal` form.
- Services synchronizes scroll progress, active copy, index, and media through
  `ScrollLinkedScene`.

Before changing wrappers, positioning, transforms, `overflow`, or z-index near these sections,
inspect the full ancestor chain and the initial/intermediate/final states. Preserve sticky
boundaries and navigation layering.

- Prefer transform and opacity for animation.
- Keep scroll listeners passive, bounded, and requestAnimationFrame-batched when CSS/native APIs
  cannot express the behavior.
- Avoid React state updates on every scroll pixel and avoid layout thrashing reads/writes.
- Preserve cleanup for listeners, observers, animation frames, and media-query subscriptions.
- Do not trap scrolling, intercept wheel/touch navigation, or add mandatory snapping.
- `prefers-reduced-motion` must retain content and state changes while removing non-essential
  movement and artificial scroll distance.

## Navigation and Menu Contract

The persistent navigation is conceptually:

```text
Mosaïque logo | desktop inline navigation or responsive menu control
```

Preserve the approved `src/assets/logos/logo_topbar.png` asset at the leading edge, the four-link
desktop navigation, and the tablet/mobile fullscreen menu. Contacto owns the centralized Quote
Flow trigger; do not restore a separate topbar quote action. The native dialog menu must continue
to support keyboard navigation, focus containment, Escape-to-close, close-button and link-close
behavior, scroll locking, and responsive sizing. Modify menu items in
`src/content/home/navigation.ts`, not by hardcoding parallel markup.

## Services Contract

Services is data-driven from `servicesContent.items` in `src/content/home/services.ts`. Preserve
stable IDs, numbering, compact descriptions, “Ideal para” copy, CTAs, and explicit media status.

- Do not duplicate service records inside the React renderer or styles.
- Keep the commercial CTA destination sourced from the record.
- Keep copy concise enough for the bounded editorial scene; solve overflow in the responsible
  layout before shortening approved content.
- Desktop and tablet synchronize copy and media; current mobile behavior hides decorative media
  at the existing 48rem breakpoint and keeps all service copy in natural flow.
- The contextual `Ver más` control currently has no approved route and only reports the stable
  service ID. Do not invent a destination.

## Event Gallery Contract

`src/content/home/projects.ts` exports `eventGalleryContent`; the section remains named
`ProjectsExperiences.astro`. Each record represents one future documented event and has a stable
ID suitable for later detail/gallery behavior.

The current six records are explicit placeholders because no verified event names, clients,
venues, dates, or photography exist in the repository. Keep that status honest. Do not invent
portfolio data or image paths. Desktop navigation advances the six items in pairs; tablet and
mobile use static responsive grids. Preserve keyboard/touch access and the live status when
changing carousel behavior.

## Footer Contract

`src/content/home/footer.ts` is the source for the footer's brand, navigation, service labels,
contact details, closing statement, and legal copy. `Footer.astro` owns the semantic composition.

Preserve the desktop two-band grid, dividers, contact hierarchy, brand wall, and responsive
stacking unless a visual requirement changes them. Validate alignment and long contact strings.
Do not introduce newsletter forms, partner brands, social links, legal routes, or contact data
without an approved source.

## Assets

Before referencing an asset, search `public/`, `src/assets/`, content modules, and existing usages.
Confirm its filename, location, dimensions, format, purpose, and alt-text requirement.

Only favicon assets are currently committed under `public/`; approved production photography
and self-hosted fonts are pending. Keep media contracts replaceable and explicit. Do not invent
paths, create fake branded raster assets, or use a decorative placeholder as factual portfolio
media. Prefer Astro Assets for approved local imagery, explicit aspect ratios, intentional crops,
lazy loading below the fold, and eager loading only for the actual LCP candidate.

## Accessibility

- Use semantic landmarks, headings, lists, `details`/`summary`, links, and buttons first.
- Preserve logical keyboard order, visible `:focus-visible`, and the skip link.
- Give icon-only controls an accessible name and decorative media empty/hidden alternatives.
- Informative images require meaningful approved alt text.
- Ensure hidden/inactive content cannot retain unintended focus.
- Announce important dynamic state once; avoid competing live regions.
- Maintain contrast and usable pointer targets.
- Never make information depend on animation, hover, color, or pointer input alone.
- Validate `prefers-reduced-motion` for every animated change.

## Performance

- Avoid unnecessary hydration, listeners, observers, and state.
- Do not update React state for raw scroll progress; keep high-frequency visual progress in
  transforms, opacity, or CSS custom properties.
- Batch necessary scroll work and avoid interleaved layout reads/writes.
- Preserve aspect ratios to prevent layout shift and do not ship oversized source images.
- Avoid duplicate responsive render trees and dependencies that outweigh the behavior they add.
- Keep cleanup paths intact and check the browser console for runtime and hydration errors.

## Required Workflow

Every product phase follows this sequence:

```text
INSPECT
  -> COMPARE
  -> IMPLEMENT
  -> VISUAL VALIDATION
  -> FIDELITY PASS
  -> RESPONSIVE VALIDATION
  -> TECHNICAL VALIDATION
  -> UPDATE ROADMAP
  -> STOP
```

Work one phase at a time. Update `docs/ROADMAP.md` in the same change when implementation,
fidelity, or phase status genuinely changes. Do not mark fidelity complete without visual
comparison, and do not mark deferred or content-only work as rendered implementation.

## Development Commands

Use Node `>=22.12.0`, pnpm, and the repository root.

```sh
pnpm dev
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop

pnpm build
pnpm lint
pnpm typecheck
pnpm format
pnpm preview
```

`pnpm dev` runs Astro in background mode. The `format` script writes the entire repository; in a
dirty worktree, format only files owned by the task with `pnpm exec prettier --write <files>` so
unrelated user changes remain untouched.

No automated test script is currently configured. Do not invent one. If tests are introduced,
use the script declared in `package.json` and update this section only if that becomes a durable
workflow change.

## Validation

Before and after implementation, run the checks appropriate to the task. Always run:

```sh
pnpm build
pnpm lint
pnpm typecheck
git diff --check
```

Also:

- inspect the final diff and confirm only authorized files changed;
- format/check the files owned by the task;
- report errors, warnings, and the absence of a test script honestly;
- render visual work at desktop, laptop/tablet, mobile, and narrow-mobile widths;
- check horizontal and vertical overflow, long copy, focus behavior, and browser console errors;
- test initial, intermediate, and final scroll states where applicable;
- test `prefers-reduced-motion` without relying only on code inspection;
- compare affected handoffs and neighboring sections for regressions.

A build proves technical viability, not visual fidelity.

## Documentation Map

- `docs/ROADMAP.md`: implementation status and next authorized phase.
- `docs/DESIGN_SYSTEM.md`: visual foundation, tokens, typography, layout, motion,
  accessibility, and performance.
- `docs/PATTERNS.md`: reusable interaction ownership and boundaries.
- `docs/MOVRA_REFERENCE.md`: external fidelity targets and behavior analysis.
- `docs/CONTENT.md`: business-source-to-application-content workflow.

For Astro framework work, consult the relevant official guide at `https://docs.astro.build` when
current framework behavior must be verified.

## Final Response

Finish in concise Spanish unless the user uses another language. Use these headings when they
apply:

- **Implementación:** outcome and implementation status.
- **Archivos:** every file modified, with a short purpose.
- **Decisiones:** important tradeoffs or preserved contracts.
- **Reutilización:** existing tokens, primitives, content sources, or patterns reused.
- **Validación:** formatter, build, lint, typecheck, tests, visual/responsive, reduced motion, and
  fidelity status reported separately.
- **Pendientes:** only real blockers, provisional content, or unverified states.

Show the summarized roadmap with status emojis when a product phase changes. State clearly when
implementation is complete but fidelity, responsive, reduced-motion, or browser validation is
still pending. Do not claim checks that were not run.

## Maintaining This File

Update `AGENTS.md` only when a durable architecture or working convention changes enough to make
an important rule inaccurate:

1. Detect and verify the inconsistency against code.
2. Update only the affected section.
3. Keep the document concise and operational.
4. Do not turn it into a changelog.

Do not update this file for routine copy changes, isolated CSS adjustments, temporary tasks, or
short-lived implementation details. Do not add chat history, screenshots, full volatile copy,
speculation, duplicated project code, or a backlog.
