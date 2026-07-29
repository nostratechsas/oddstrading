---
tags: [frontend, components, stable]
updated: 2026-07-29
---

# Catalog — UI Primitives

Files in `src/components/ui/`. Stateless design-system pieces with no provider
dependencies. Placement rules: [[component-conventions]].

## `<Shell>` — `shell.tsx`

The centred content column. Owns `max-w-shell` and the horizontal gutters so no
section restates them. Props: `tag`, `className`.

## `<Bezel>` — `bezel.tsx`

The double-bezel shell: an outer tray with a hairline edge wrapping an inner
core with its own top highlight. Concentric radii come from the `--radius-card`
/ `--radius-card-inner` component tokens, so anything nested inside can match.

- `glow` — tints the tray with the brand gradient; marks the hero surface, the
  featured pricing plan and the closing CTA.
- `innerClassName` — layout/padding for the core.

## `<ActionLink>` — `action-link.tsx`

Pill call to action with the trailing icon nested in its own circular well.
Tones: `primary` (brand mint), `ghost` (glass), `light` (inverted). Hover only
shifts colour and nudges the icon, so it stays CSS per ADR-0014.

## `<Eyebrow>` — `eyebrow.tsx`

Micro pill label above a headline. `live` prepends [[#`<PulseDot>` — `pulse-dot.tsx`|PulseDot]].

## `<PulseDot>` — `pulse-dot.tsx` `"use client"`

Live-feed indicator. The halo breathes on a looping `useSpring` — CSS
`@keyframes` are banned (hard rule #1), so the loop is a spring.

## `<TickList>` — `tick-list.tsx`

Feature list. The checkmark is the `.tick-marker::before` pseudo-element in
`globals.css` `@layer components` — a genuine ADR-0012 exception, since a
rotated two-border tick cannot be expressed with utilities.

## `<Reveal>` — `reveal.tsx` `"use client"`

The page's standard scroll entry: a fade-up that settles once. Wraps
`<Inview mode="once">` so every section shares one spring config. `step`
staggers entry by 90 ms per unit.

## `<SectionHeading>` — `section-heading.tsx` `"use client"`

Two-line section headline on [[text-engine]] — a lead line plus a muted one.

> [!important] One engine per line
> `TextEngine` renders a wrapping flex row, so a `<br>` between words is **not**
> a break it can honour — a single engine collapses both lines into one. Each
> line therefore gets its own `TextEngine tag="span"`, which also lets the
> second line trail the first via `delayIn`.

## Related

[[components/common]] · [[components/animation-springs]] · [[design-system]]
