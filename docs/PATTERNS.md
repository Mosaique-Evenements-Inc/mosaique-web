# Mosaïque Interaction Patterns

This document defines reusable interaction and composition patterns owned by Mosaïque. Visual foundations and motion rules live in `DESIGN_SYSTEM.md`; external reference analysis and fidelity notes live in `MOVRA_REFERENCE.md`.

Patterns should be promoted here only after a real section demonstrates a reusable need. The governing principle is: generalize from evidence, not imagination.

## Panel Reveal

`PanelReveal` composes a sticky lead and a higher-layer panel while preserving both children in normal document flow. It is a CSS-only handoff: scroll position naturally controls how the panel covers the lead, so pausing or reversing scroll pauses or reverses the reveal without additional orchestration.

Hero/About uses the default form. Hero occupies the `lead` slot as a full-viewport media scene; About is the solid panel that enters from the viewport edge and then continues as ordinary content. The Hero script measures progress from the non-sticky `PanelReveal` wrapper only to coordinate the media caption while the CSS handoff remains stable. Navigation independently samples the explicitly declared contrast surface beneath its centerline so its foreground stays legible through this and later section handoffs.

The homepage uses the default form for its Hero handoff. Services now owns an independent Astro-only cinematic sequence inside the revealed page panel and does not require a second panel overlap.

The panel uses `--primitive-z-content`, below persistent navigation and modal layers. Reduced motion returns the lead to relative positioning and removes the optional overlap, preserving linear reading order without hiding content.

## Cinematic Preview Sequence

The Event Detail “Más experiencias” sequence and the Home Services showcase are intentionally
separate Astro implementations. Each scene uses a tall scroll wrapper, a `100svh` sticky surface,
reciprocal frame/media scaling, progressive outgoing darkening, and centered editorial copy.
Reduced motion removes the artificial scroll distance, overlap, scaling, and darkening while
preserving every scene and action in natural flow.

The implementations remain physically separate so Event navigation and commercial Service
storytelling can evolve independently. Their CSS view timelines use explicit animation
declarations that survive the optimized Astro build.
