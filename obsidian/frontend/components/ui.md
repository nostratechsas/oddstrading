---
tags: [frontend, components, stable]
updated: 2026-07-29
---

# Catalog — UI Primitives

Files in `src/components/ui/`. Stateless design-system pieces with no provider
dependencies. Placement rules: [[component-conventions]].

> [!warning] Two responsive traps this project already hit
> 1. **Size logos with `max-h`, never `h`.** A fixed height is an unshrinkable
>    block — inside a grid column it overflows and paints over its neighbour.
>    `max-h-*` + `h-auto` + `max-w-full` caps it and lets it scale down.
> 2. **Every multi-column grid track needs `minmax(0,…)`.** An `fr`/`auto` track
>    takes its minimum from content, so one wide child (a `<pre>`, a long table)
>    stretches the track past the viewport instead of scrolling inside itself.

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

## `<Odometer>` — `odometer.tsx` `"use client"`

Digit-roll readout for a figure that changes in place. Each digit is a column of
0–9 clipped to one line box; a spring per digit drives the offset, so a price
ticking 2.05 → 2.11 rolls its last two wheels instead of hard-swapping the text.
Drives the prices and the latency figure in the hero's `LiveBoard`.

Props: `value`, `decimals` (fixed, so the glyph count never reflows), `className`.

- The mask is `h-[1lh]` — one *inherited* line box, so it tracks the caller's
  type scale and can never be shorter than the glyphs it clips.
- The wheels are `aria-hidden`; the formatted value is exposed once from an
  `sr-only` span, so assistive tech reads "2.11", not thirty digits.
- Wheels are keyed by **position**, not value. Crossing a digit boundary
  (9.99 → 10.01) re-slots the row and snaps rather than rolls.

Ported from 21st.dev, not installed — see [[decisions-log]] ADR-0022.

## `<TabRail>` — `tab-rail.tsx` `"use client"`

A real tablist whose selection is marked by **one pill that slides** between
tabs, instead of each tab repainting its own background. The pill is measured off
the active button in a layout effect and sprung to that box; the rail wraps, so
it springs `y`/`height` as well as `x`/`width` and a second-row selection slides
down to meet it.

Props: `items`, `active`, `onSelect`, `label`, `tabId`, `panelId`, `tone`,
`size`, `className`. `panelId` may return one shared id — `CodePanel`'s tabs all
drive the same `<pre>`.

- `tone`: `solid` (foreground-filled pill — the page's own tab sets, e.g.
  `CoverageSection`) or `subtle` (raised chip inside a bezel's chrome, e.g.
  `CodePanel`).
- Full keyboard tablist: roving `tabIndex`, arrows, `Home`/`End`.
- The pill re-fits **in place** on resize and only travels on a real selection.
- The selected label waits for the pill to have a box before taking its on-pill
  styling — see ADR-0022.

Ported from 21st.dev, not installed — see [[decisions-log]] ADR-0022.

## `<Reveal>` — `reveal.tsx` `"use client"`

The page's standard scroll entry: a fade-up that settles once. Wraps
`<Inview mode="once">` so every section shares one spring config. `step`
staggers entry by 90 ms per unit.

## `<Field>` / `<TextField>` / `<SelectField>` — `field.tsx`

Labelled form controls used by the checkout. Every input is named and tied to
its own `<label>` — placeholders are hints, never labels. `hint` doubles as the
validation message and turns red with `invalid`, which also sets `aria-invalid`.

## `<SectionHeading>` — `section-heading.tsx` `"use client"`

Two-line section headline on [[text-engine]] — a lead line plus a muted one.

> [!important] One engine per line
> `TextEngine` renders a wrapping flex row, so a `<br>` between words is **not**
> a break it can honour — a single engine collapses both lines into one. Each
> line therefore gets its own `TextEngine tag="span"`, which also lets the
> second line trail the first via `delayIn`.

## Related

[[components/common]] · [[components/animation-springs]] · [[design-system]]
