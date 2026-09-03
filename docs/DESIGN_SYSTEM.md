# Mosaïque Web Design System

This document defines the technical and visual foundation for Mosaïque Web. It describes the system, but the executable CSS tokens in `src/styles/tokens/` are the final source of truth when documentation and implementation diverge.

## 1. Design Principles

Mosaïque Web should feel editorial, cinematic, premium, and photography-first. The interface favors generous negative space, strong hierarchy, restrained UI chrome, and minimal visual noise.

Compositions may be asymmetric when they improve rhythm or storytelling. Motion should be controlled, intentional, and supportive of content rather than decorative. The experience should feel refined through pacing, typography, image scale, and spatial contrast.

## 2. Design Token Architecture

The system follows this hierarchy:

`Primitive Tokens -> Semantic Tokens -> Motion Primitives -> Interaction Patterns -> Sections -> Pages`

Primitive tokens define raw values such as color palettes, spacing steps, type scales, durations, easing curves, breakpoints, and z-index levels.

Semantic tokens assign product meaning to primitives: background, surface, text, border, overlay, section padding, page gutters, motion timing, and layout widths.

Components and motion primitives consume semantic tokens. Interaction patterns coordinate primitives around proven behaviors. Sections apply those patterns to content, and pages compose sections. Reusable interaction and composition patterns are documented in `PATTERNS.md`.

CSS custom properties are the executable source of truth. Documentation explains intent, but implemented tokens win if a contradiction appears.

## Mosaïque Visual Identity

The approved Mosaïque identity is now represented in primitive and semantic tokens.

Colors:

- Black: `#000000`
- Warm Tan: `#C49A6C`
- Cream: `#F6F1E8`
- Neutral Gray: `#C1C1C1`
- White: `#FFFFFF`

Typography:

- Display / Headings: Cinzel
- Body / UI: Montserrat

Intent:

- Black functions as the primary dark color for text, inverse backgrounds, and high-contrast UI.
- Warm Tan functions primarily as the accent color.
- Cream functions as the main warm page background.
- Neutral Gray functions as the muted neutral.
- White provides clean surfaces and contrast.
- Cinzel gives display and heading typography an editorial, elegant character.
- Montserrat preserves legibility and neutrality across body copy, captions, navigation, and UI labels. Interactive CTA labels use Cinzel to retain the editorial title voice at control scale.

Font loading strategy:

- Preferred delivery is self-hosted WOFF2 from `src/assets/fonts/`.
- Use `font-display: swap` when adding the `@font-face` declarations.
- Load only the weights used by the current system.
- Required files are still pending and should be added before production font loading is enabled:
  `Cinzel-Variable.woff2` or selected Cinzel weights, and `Montserrat-Variable.woff2` or selected Montserrat weights.

## 3. Colors

The palette is official and intentionally limited. Do not introduce additional colors unless design approves a new primitive.

Color architecture:

- Primitive palette: Black, Warm Tan, Cream, Neutral Gray, and White.
- Semantic colors: product-facing variables mapped to primitive values.
- Background: page-level canvas.
- Surface and elevated surface: clean content surfaces.
- Primary text: highest-contrast foreground.
- Secondary text: supporting foreground.
- Muted text: quiet metadata and low-emphasis content.
- Borders: low-contrast separators.
- Overlays: translucent image and modal layers.

Components must consume semantic tokens rather than primitive hex values. Tailwind utilities should be generated from the token layer, for example `bg-background`, `bg-primary`, `text-primary`, `text-secondary`, `text-inverse`, `text-accent`, and `border-border-default`.

## 4. Typography

The official typography pairing is Cinzel for display and headings, and Montserrat for body copy and functional UI.

Type roles:

- `display-xl`: top-level editorial statements.
- `display-lg`: large section-level display text.
- `heading-lg`: major section headings.
- `heading-md`: component and subsection headings.
- `body-lg`: elevated prose and lead copy.
- `body`: default reading text.
- `caption`: metadata, labels, counters, and compact support text.
- `navigation`: navigation labels.
- `button`: button labels and compact UI commands.

Fluid `clamp()` scales are preferred for display and heading sizes where responsive range improves composition. Body sizes should remain stable and readable. Letter spacing is kept at `0` by default. Line height should tighten for display text and open for body copy.

Cinzel should feed `display-xl`, `display-lg`, `heading-lg`, `heading-md`, and interactive CTA labels. Montserrat should feed `body-lg`, `body`, `caption`, `navigation`, and other utility labels.

Each token should define:

- `font-family`
- `font-size`
- `line-height`
- `font-weight`
- `letter-spacing`
- responsive behavior

## 5. Spacing

Spacing is semantic, not arbitrary.

Categories:

- Micro spacing: icon gaps, inline rhythm, small control padding.
- Component spacing: buttons, cards, form-like groups, media captions.
- Content spacing: headline/body grouping and text stack rhythm.
- Section spacing: vertical page rhythm between major blocks.
- Page padding: viewport-responsive gutters.

Prefer tokens before introducing one-off values. If a new value repeats or represents intent, it should become a token.

## 6. Layout

The foundation supports editorial layouts with controlled width and full-bleed moments.

Rules:

- Max content width should be capped for readability and premium restraint.
- Page gutters should scale with viewport size.
- Editorial grids can use asymmetric columns for image/text relationships.
- A 12-column grid is available for structured multi-column layouts.
- Full-bleed sections may break out of the content width when photography or cinematic rhythm requires it.
- Breakpoints should remain few and meaningful.
- Use `100svh` for viewport-height sections to avoid mobile browser chrome issues.
- Sticky elements need explicit boundaries so they do not escape their section.
- Responsive behavior should preserve reading order and image intent before preserving desktop geometry.

## 7. Photography

Photography is structural, not decorative. Images are part of hierarchy, pacing, and story.

Rules:

- Hero images should be priority-loaded only when they are the LCP candidate.
- Full-bleed images should use intentional aspect ratio and crop direction.
- Section images should reinforce content hierarchy.
- Gallery images should maintain consistent rhythm while allowing editorial variety.
- Project images should preserve the project object, space, or result clearly.
- Use `object-fit: cover` for compositional crops and `contain` only when preserving the full object matters.
- `object-position` should be set deliberately, not left to accidental center crops when subject placement matters.
- Aspect ratios should be explicit to prevent layout shift.
- Responsive delivery should rely on Astro Assets where possible.
- Lazy loading is the default below the first viewport.
- Priority/eager loading is reserved for visible, critical media.

## 8. Motion System

Motion is part of the design system and should be tokenized.

Duration roles:

- Fast: controls, hover, small UI feedback.
- Standard: component entrance and regular transitions.
- Slow: larger reveals and media movement.
- Cinematic: section-level storytelling and crossfades.

Easing roles:

- `easing-standard`: calm and efficient.
- `easing-cinematic`: slower acceleration/deceleration for image and section transitions.

Motion rules:

- No bounce.
- No elastic easing.
- Avoid exaggerated movement.
- Prefer opacity and transform.
- Use scroll progress when interaction requires it.
- Avoid animating layout properties unnecessarily.
- Preserve native scroll.
- Respect `prefers-reduced-motion`.

Reveal distances, stagger intervals, and crossfade timings are tokens. Reduced motion should remove non-essential movement while preserving state changes.

Motion tokens deliberately have two synchronized representations: CSS custom properties in `src/styles/tokens/` for CSS, Tailwind, and layout motion; and TypeScript values in `src/tokens/motion.ts` for Motion and React runtime. Their conceptual names and values must remain equivalent. This avoids runtime CSS-variable reads, scattered component hardcodes, and unnecessary token-generation infrastructure.

## 9. Layering

Semantic z-index scale:

- Base: regular document flow.
- Content: elevated content within a section.
- Sticky content: pinned section elements.
- Navigation: persistent site navigation.
- Overlay: temporary scrims and panels.
- Modal: blocking dialogs.

Components should use semantic tokens rather than raw z-index values.

## 10. UI Primitives

Planned primitives:

- Container: width and gutter constraint.
- Section: vertical rhythm and section semantics.
- Grid: responsive column structure.
- Stack: vertical or horizontal spacing rhythm.
- Heading: semantic heading with type role mapping.
- Text: semantic text with readable defaults.
- Button: one accessible React command/link primitive that Astro renders statically unless a consumer already belongs to an interactive island. Its two capsule variants share a synchronized bottom-up surface and label transition: transparent to the light application background, and the inverse light-to-transparent state. Low-chrome editorial links and icon-only controls remain outside this treatment.
- Media: responsive image wrapper with aspect ratio and crop controls.

Primitives must remain content-agnostic, composable, and small.

## 11. Motion Primitives

Planned motion primitives:

- Reveal: basic entrance with opacity and transform.
- StaggerText: staged text reveal for editorial type.
- StickyScene: bounded sticky composition wrapper.
- ScrollProgress: maps section scroll progress to a normalized value.
- MediaCrossfade: image transition primitive.
- PanelReveal: staged panel transition for future sections.

Panel-level and cinematic patterns should be implemented only when a real section needs them.

## 12. Accessibility

Foundation rules:

- Use semantic HTML first.
- Preserve keyboard navigation.
- Provide visible focus states.
- Respect reduced-motion preferences.
- Maintain sufficient text and UI contrast.
- Require meaningful alt text for informative images.
- Use empty alt text only for decorative media.
- Do not make information depend on motion alone.

## 13. Performance

Initial targets:

- LCP under 2.5 seconds.
- INP under 200 milliseconds.
- CLS near 0.
- Lighthouse mobile above 90.
- Lighthouse desktop above 95.
- Smooth 60fps scroll animations where motion is used.

Rules:

- No direct 4K image delivery.
- No unnecessary hydration.
- No arbitrary scroll listeners.
- No JavaScript where CSS is enough.
- No oversized dependencies without justification.
