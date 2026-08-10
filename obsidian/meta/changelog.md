---
tags: [meta, changelog]
updated: 2026-07-29
---

# Changelog

Chronological log of notable changes to the project. Newest first.
This is a human-curated log — not a mirror of `git log`.

## 2026-08-09 (sign-in reaches the dashboard)

- **"Iniciar sesión" now goes to the dashboard.** It pointed at `/#contacto` — an
  anchor that does not exist, since the section id is `contact`. It was a dead
  link in every header on the site. It now resolves to `brand.app`
  (`app.oddstradingview.com`), as a plain anchor: the dashboard is a separate app
  on its own subdomain, so there is no client route for the router to push.
- **The mobile menu gained the same link**, which it never had.
- **The sign-in screen states where an account comes from.** Without it the page
  reads like an open sign-up and a visitor with no credentials has no next step.
  It now says access is handed over when the 7-day demo is activated, that there
  is no open registration, and offers a prefilled `mailto:` to
  `contact@oddstradingview.com`.
- The Demo tier lists "Credenciales del panel al activarlo" so the same promise
  is visible before anyone reaches the login.

## 2026-08-09 (showcase band)

A full-width dark bento between the stats and the platform section, adapted from
a dark portfolio layout. Four things in the source design could not be copied and
were rebuilt — see [[decisions-log]] ADR-0023.

- **`ShowcaseSection`** — header plus a three-column grid: the price pipeline
  over the brand film, a "why it matters" plate, the 14M+ figure, the stack
  marquee and a contact card.
- **`ShowcaseMarquee`** — two rows of glass tiles drifting in opposite
  directions on an infinite `useSpring` loop. The source used
  `@keyframes marquee-left/right`, which hard rule #1 bans.
- **`--showcase-*` tokens** — the band is dark on both themes by design.
- **`.liquid-glass` and `.noise-overlay`** join `.tick-marker` in
  `@layer components` as ADR-0012 exceptions: a masked gradient border and an
  SVG turbulence grain are not expressible as utilities.
- **New dependency: `lucide-react`.** Tree-shakes per import. Recorded in
  [[tech-stack]] along with when to use it instead of `card-icon`.

> [!note] What the source design offered and we did not take
> Three CloudFront video URLs from a third party's account, and a named client
> testimonial. The videos are neither ours nor licensed to us, so the band reuses
> `portada.mp4` and brand gradients. The quote card carries a factual statement
> about the problem instead of an invented customer — a fabricated testimonial on
> a commercial page is not a design detail, it is a false claim. Swap in a real
> quote and attribution when there is one; it is a content change, nothing more.

## 2026-07-29 (pricing pushes Pro)

The tiers were three near-identical cards distinguished only by feature-list
length, so nothing pulled a visitor toward Pro. Coverage is the axis these are
actually chosen on, so it was lifted out of the feature list and made the
comparison.

- **`Plan.coverage`** (new, required) — `{ label, capped }`. Rendered as its own
  row under the price: hairlined and muted when it caps you, brand-tinted when it
  does not. Starter now publishes its real ceiling — **max 12 bookmakers
  integrated** — and Pro's row states that ceiling coming off.
- **`Plan.valueNote`** (new, optional, featured tiers only) — the one-line case
  for the step up, set against the price in accent.
- **The featured card breaks the row's top line** (`lg:-mt-6`), so the eye lands
  on Pro before it reads a price.
- Starter's `scope` carries the cap too, so it follows the visitor into checkout
  (`PlanPicker`, `OrderSummary`) rather than disappearing after the landing.
- Duplicate coverage lines dropped from the Starter and Elite feature lists —
  they live in the coverage row now.

> [!warning] Pro's own ceiling is unstated
> Pro's row says the Starter cap is lifted, which is all that was confirmed. If
> Pro has its own bookmaker ceiling, that number needs to replace the current
> phrasing — as written the page implies none below Elite's 40+.

## 2026-07-29 (landing motion: three 21st.dev ports)

Three interactions taken from [21st.dev](https://21st.dev) as **reference** and
rebuilt on `@react-spring/web`. Nothing was installed — every one of those
components ships on framer-motion, which hard rule #1 bans. See
[[decisions-log]] ADR-0022. No dependency changes.

- **`<Odometer>`** (new UI primitive) — a spring per digit rolls a clipped 0–9
  column, so the hero's live prices and latency figure *move* instead of
  hard-swapping under a colour flash. Port of "Animated Number Flip".
- **`<TabRail>`** (new UI primitive) — one pill slides between tabs rather than
  each tab repainting itself. Port of ibelick's "Animated Tabs". `CoverageSection`
  and `CodePanel` both use it now (`tone="solid"` / `tone="subtle"`), which
  retired `CodePanel`'s hand-rolled tablist and gave both sets a full keyboard
  tablist — roving `tabIndex`, arrows, `Home`/`End` — that neither had.
- **Directional coverage panel** — the panel now enters from the side the rail
  moved, so a tab switch reads as travel across one surface. Port of ibelick's
  "Transition Panel", minus its blur: a filter on a panel that size is not worth
  the repaint.
- **Hero film parallax** — the cover film lags the page over one hero-height on
  `<SpringTrigger mode="scrub">`. Port of Aceternity's "Hero Parallax".
  `disableOnMobile`, and its drift is capped by the bleed around the frame.
- **Trap found while porting:** `utils/math.ts` `interpolate()` corrupts CSS
  transform *strings* — `translateY(0%)` → `translateY(4.5(%)`. `scrub` mode runs
  through it, so scroll-linked ports must pass plain numbers (`y`, `scale`).
  Recorded in ADR-0022; not fixed, since the engine is `#do-not-modify`.

## 2026-07-29 (light theme, English-first, real logos)

- **Light theme, and it is now the default.** Both palettes live in Tier 2 of
  `globals.css` and nowhere else; `data-theme="dark"` on `<html>` flips them.
  The light theme binds its own deeper brand shades — the mint that reads on
  `#050505` fails contrast on paper. Two new theme tokens carry what colour
  alone cannot: `--logo-plate` and the `--video-blend` / `--video-opacity` pair
  the hero film needs (`screen` on ink, `multiply` on paper). New
  `hooks/use-theme.ts` (zustand + localStorage), `ThemeToggle`, and an inline
  bootstrap script in the root layout so there is no theme flash.
- **English is the default locale; Spanish moved to `/es`.** Content now lives in
  `data/content/{en,es}.ts` with `SiteContent` inferred from `es.ts`, so a
  missing key fails the build. `HomeView` and `CheckoutView` take a `content`
  prop, which made `/`, `/es`, `/checkout` and `/es/checkout` the same tree with
  a different dictionary. The old `data/mocks/{home,plans,checkout}.ts` are gone.
- **`LocaleNotice`** — a spring-driven side panel offering the other language,
  dismissal remembered per direction. It links between routes rather than
  switching client-side, so both languages stay indexable.
- **Real bookmaker logos.** Eight official files (DraftKings, BetMGM, William
  Hill, Ladbrokes, 888sport, Stake, 22bet, BetRivers) trimmed from their 4K
  masters into `public/assets/bookmakers/`. They are mostly dark-on-transparent,
  so a logo tile now renders on a `--logo-plate` chip; operators still awaiting a
  file keep the brand-colour treatment. See [[decisions-log]] ADR-0021.
- Cookie banner and preferences modal back to English, matching the default locale.

## 2026-07-29 (responsive fixes)

- **`BrandLockup` is sized with `max-h`, not `h`.** A fixed height made it an
  unshrinkable block: in the footer's brand column it overflowed and painted over
  the "Producto" column. Now `max-h-*` + `h-auto` + `max-w-full` caps it where
  there is room and scales it down where there is not, and the `lg`/`xl` steps
  grow at the `xl` breakpoint instead of being one fixed size. New `sm` step.
- **`minmax(0,…)` on every multi-column grid track** (hero, integration, FAQ,
  checkout, footer). An `fr` or `auto` track takes its minimum from content, so
  the integration section's `<pre>` was stretching its track to 758 px inside a
  504 px viewport — the page scrolled horizontally on mobile instead of the code
  block scrolling inside itself. Verified `scrollWidth === clientWidth` at 390,
  768, 1024, 1280 and 1920 px, on both routes.

## 2026-07-29 (brand & logo wall)

- **Brand lockup split into symbol + wordmark** — `components/common/brand-lockup.tsx`.
  The symbol is re-derived from the favicon master (which the client replaced
  mid-project with a 1799 px version carrying transparent corners over a white
  ground) and the wordmark is cropped out of the logotype at `x=125`, the last
  column clear of the symbol inside the text band. Sizes are ~2× the previous
  logo; the `md/lg/xl` steps are calibrated against the adaptive grid, where the
  root font-size follows the viewport off a 1920 px base — `h-16` lands at ~49 px
  at 1500 px wide, not 64 px.
- **Bookmaker marquee is now a logo wall** — `bookmaker-tile.tsx` plus
  `data/mocks/bookmakers.ts` and the server-only
  `utils/assets/bookmaker-logos.ts`, which reads `public/assets/bookmakers/` at
  load. Drop an official press-kit file named after the slug and the tile
  switches from its colour treatment to the real logo, with no code change. See
  [[decisions-log]] ADR-0021.

## 2026-07-29 (later)

- **Commercial model replaced.** The four invented tiers are gone; the real
  catalogue is three monthly licences — Starter USD 3.000 (integración 1X2 a la
  media de mercado), Pro USD 5.000 (resto de deportes, mapeo de cuotas mejorado,
  mercados más apostados) and Elite USD 6.500 (40+ casas, datos en tiempo real,
  feed de cuotas). Prices moved out of `data/mocks/home.ts` into
  **`data/mocks/plans.ts`**, shared by the pricing section and the checkout, so
  the advertised price and the charged price cannot drift.
- **New `/checkout` route** — `app/checkout/page.tsx` → `views/checkout/`.
  Three steps (plan → datos de facturación → medio de pago) with a sticky order
  summary, plan preselected from `?plan=<slug>`. New UI primitive `Field` /
  `TextField` / `SelectField`; new util `utils/format/currency.ts`.
- **New `POST /api/checkout`** — validates the order with zod, **prices it
  server-side from the plan catalogue** (never from the client payload), and
  forwards it to `CHECKOUT_ENDPOINT` when configured, logging it otherwise. New
  env var documented in [[environment-variables]]. See [[decisions-log]] ADR-0020.
- **`SiteHeader` promoted to `components/common/`** — it is now shared by the
  home and checkout views, and its links became root-relative (`/#precios`) so
  the anchors resolve from any route.
- **Free-tier copy removed** across hero, CTA, lead form and FAQ: with a USD
  3.000 entry price the offer is a guided demo, not a free plan.
- Contact address is now **contact@oddstradingview.com**.

## 2026-07-29

- **Project rebranded to OddsTrading and the home view built out.** The starter
  shipped with an empty `views/home.tsx`; it is now `views/home/` — a Server
  Component assembling eleven sections (header, hero, marquee, stats, platform
  bento, coverage, integration, use cases, pricing, FAQ, CTA, footer) with the
  interactive pieces as client leaves beside it. Content comes from
  `data/mocks/home.ts` via props; nothing is hardcoded in a component.
- **Brand palette added to `globals.css`.** The starter deliberately ships no
  palette; this project adds one, sampled from the OddsTrading logotype
  (azure → teal → mint → leaf over an OLED ink canvas), as Tier 1 `--raw-color-brand-*`
  primitives plus Tier 2 semantic roles — surfaces, hairlines, actions, the
  brand gradient stops, four categorical data accents and the up/down odds
  signals. Also adds the first Tier 3 tokens the project needed: the concentric
  `--radius-card` / `--radius-card-inner` pair, `--radius-control`,
  `--radius-pill`, `--container-shell`, `--text-display` and `--text-headline`.
- **New UI primitives** — `Shell`, `Bezel`, `ActionLink`, `Eyebrow`, `PulseDot`,
  `TickList`, `Reveal`, `SectionHeading`. Catalogued in [[components/ui]].
- **New util** — `utils/code/tokenize.ts`, a dependency-free tokenizer for the
  code samples so no highlighting library ships to the client. See [[utils]].
- **Hero cover film composited transparently** with `mix-blend-mode: screen` —
  the clip has no alpha channel, so screen blending knocks out its near-black
  ground. See [[decisions-log]] ADR-0019.
- **Two `TextEngine` gotchas codified** — one engine per headline line, and
  `seo={false}` on gradient-clipped lines. See [[decisions-log]] ADR-0018.
- **Cookie banner and preferences modal translated to Spanish** to match
  `<html lang="es">`.
- **`lib/site.ts` filled in** with the real name, description, theme colour and
  social handle; favicons, touch icons and `open-graph.png` regenerated from the
  brand mark.

## 2026-07-25

- **Released into the public domain (Unlicense)** — the starter now ships a root
  `LICENSE.md` carrying the [Unlicense](https://unlicense.org) and declares
  `"license": "Unlicense"` in `package.json`. Anyone may copy, modify, sell, or
  redistribute it with **no attribution requirement and no copyright retained** —
  the intent being that projects built from this starter can absorb it wholesale
  without carrying a notice. Briefly authored as MIT in the same session and
  changed before any release; the MIT attribution clause was the specific thing
  being dropped, so a recognized no-attribution licence was chosen over an
  edited MIT text. `"private": true` is unchanged, so npm publishing stays
  blocked regardless — the licence governs redistribution of the source, not
  registry availability.

## 2026-07-24

- **`optimize-3d-scene` hardened from its first field run** — the skill was run
  on a real raw-WebGL scene (no three.js, no scroll) and eight gaps came back,
  ranked by the time each cost. Fixed in `SKILL.md` and `references/patterns.md`:
  **§0** now ships a `getContext` hook so a non-three.js scene has counted
  equivalents of `renderer.info` (`draws` / `verts` / `links[]` timestamps /
  captured `attrs`) — previously §0 was unexecutable there — plus the
  *measurement environment* rules that invalidate everything if missed
  (production build only: dev's eager chunks fake a §1 failure and Strict Mode's
  double-mount fakes 2 listeners and a halved fps; kill the stale server;
  `waitUntil: "load"`, since `networkidle0` never fires against `next start`;
  SwiftShader is not a GPU, so only counted quantities transfer). **§3** now
  states that **§1 breaks it** — `dynamic(ssr: false)` pushes compilation past
  hydration, measured at 5.0 s against a loader lifting at 2.36 s — and gains a
  fifth stall cause (CPU decode/parse → **Worker**, 3.9 s measured) and the
  `as="fetch"` preload credentials trap (only `use-credentials` + `include`
  dedupes; the others silently download twice). **§5** admits `1000/30` measures
  ~26 fps given the ticker's `<=` throttle. **§7** requires a decile ordering
  check before truncating a baked point buffer (one was spatially sorted —
  truncating would have deleted half the subject). **§13** splits canvas `lvh`
  from content `dvh`. **§1**'s poster is rejustified — crawler screenshots and
  the no-WebGL fallback, not layout stability — with two crops and the
  `headers()` → static-prerender (`○`→`ƒ`) trade-off named. Unchanged on
  purpose: the cheapest-first order, the canonical-file table, and "port, don't
  invent". ADR: [[decisions-log]] ADR-0017.
- **`optimize-3d-scene` skill registered in the vault** — the new skill at
  `.claude/skills/optimize-3d-scene/` is now a first-class part of the workflow
  set, documented in [[optimize-3d-scene]] and linked from the
  [[README|Map of Content]] and [[ai-agent-guide]].
  **Routing rule (AGENTS.md hard rule #11):**
  a performance / jank / pre-ship request on a project that renders a three.js
  or WebGL scene must invoke the skill and follow its fourteen-step order — no
  improvised fix list. The vault note also maps the skill's canonical patterns
  onto primitives the starter *already* ships, so nothing gets duplicated:
  `subscribeToTicker` (`src/lib/animation/ticker.ts`, ADR-0009) is the one
  app-wide rAF loop the skill's §4/§5 ask for, `isBot()` (`src/utils/is-bot.ts`,
  ADR-0010) is the §1 bot path, the Lenis scroll store is the §9/§10 scroll
  source, `useDynamicInView` is the §4 visibility gate, and `lvh.ts` covers §13
  sizing. Only device tiering (§2) has no local equivalent. The starter itself
  carries **no `three` dependency** ([[tech-stack]] unchanged) — this applies to
  projects built from it. ADR: [[decisions-log]] ADR-0016.
- **Fixed a broken path inside the skill** — its closing "write it down" step
  pointed at `obsidian/Meta/changelog.md` / `decisions-log.md` (capital `M`, and
  an `open-questions.md` that does not exist here), so an agent following it
  would have written to a non-existent folder. Rewritten against this vault's
  actual `obsidian/meta/` layout.
- **`ai-agent-guide` gained a Skills section** — how skills are registered
  (drop in `.claude/skills/<name>/`, add a `workflows/` note, link from the MoC
  and the skills table, log in the changelog), so the next skill follows the
  same path.

## 2026-07-17

- **README — one-prompt quick start** — added a copy-paste **⚡ Start in one
  prompt** block at the top of the README: a single prompt that has Claude Code
  (or Cursor) clone the starter, detach it from this repo's git history, read the
  vault first, and run the default install. The manual [Getting started](../../README.md#getting-started)
  path stays below for anyone who prefers it.
- **Fixed: `cp .env.example .env` broke `/api/contact`** — surfaced by writing
  that step into the quick-start prompt. Copying the example leaves
  `CONTACT_ENDPOINT=` (blank), which reaches zod as `""`, and `""` is not
  `undefined` — so `z.url().optional()` rejected it. The route returned **HTTP
  400 `{"path":"CONTACT_ENDPOINT","message":"Invalid URL"}`**, misreporting a
  *server misconfiguration* as the caller's bad input. `src/env.ts` now routes
  optional URLs through an `optionalUrl()` helper that preprocesses `""` →
  `undefined`. Verified end-to-end: a valid POST now returns 200, and genuinely
  invalid payloads still return 400. Any new **optional** variable must use the
  same helper — see [[environment-variables]].
- **README — corrected clone URL & Node requirement** — step 1 pointed at
  `github.com/textura/next16-claude-starter` (wrong org — the repo is
  `textura-agency/…`), so the documented clone would 404. Also added the Node
  floor (**22.13+**; 20.19+ works, 24 LTS recommended) — below it `yarn install`
  fails outright on `eslint-visitor-keys` — and the missing
  `cp .env.example .env` step.
- **TextEngine alignment & clipping rules documented** — two failure modes that
  bite every TextEngine block, now written into [[text-engine]] (new *Alignment &
  line-height* section), [[text-engine-reference]], and AGENTS.md hard rule #3.
  **(1)** The container renders `display: flex; flex-wrap: wrap`, so words are
  flex items and `text-align` cannot position them — a lone `text-center`
  silently does nothing. Always pair `text-*` with `justify-*` on the tag
  (`justify-between` is a trap: it spreads *words*, not lines). **(2)** `overflow`
  sets `overflow: hidden` on `inline-block` wrap layers whose height comes from
  `line-height`, so tight leading shaves descenders and accented caps — keep
  leading ≥ 1.1 via the new `leading-display` token, never `leading-none` with
  `overflow`, and watch for `text-5xl`+ which ship `line-height: 1`. Both fixes
  are **classes on the `TextEngine` tag** — no wrapper component, no helper to
  import. Verified against the `spring-text-engine@0.1.5` dist source.
- **Strict three-tier token naming convention** — tokens now follow a fixed,
  portable grammar so names are predictable across every project built from this
  starter: `--raw-<category>-<name>` primitives → `--<role>` semantic →
  `--<tw-namespace>-<role>: var(--<role>)` bindings in `@theme inline`. Only
  Tier 1 holds literals; Tier 2 names purpose and is the themeable layer.
  `globals.css` restructured accordingly — **no brand palette invented**, the
  convention is the deliverable. Two deviations from the reference article,
  verified by compiling a probe against `tailwindcss` v4.3.3: primitives are
  `--raw-*` and stay out of `@theme` (a `--color-*` entry would generate
  utilities and let markup skip the semantic tier), and **`--duration-*` is not a
  Tailwind v4 namespace** — `duration-fast` compiles to nothing, so durations
  stay Tier 2 and are used as `duration-[var(--duration-fast)]`. See
  [[decisions-log]] ADR-0015 and [[design-system]].
- **Narrow CSS-transition exception** — hard rule #1 no longer bans CSS
  transitions outright. CSS `transition-*` is allowed for simple discrete state
  changes only (hover/focus colour, opacity, border, small nudges), requiring
  token-backed timing (`duration-[var(--duration-fast)] ease-entrance`),
  `transition-*` only (`@keyframes` still banned), and utilities only. Everything
  scroll-driven, revealing, staggered, or layout-affecting stays spring-based.
  A hover colour fade no longer needs a client component wrapping `<Hover>`. See
  [[decisions-log]] ADR-0014, [[animation-system]], [[design-system]].
- **New tokens** — `--raw-color-white` / `--raw-color-neutral-100/900/950`,
  `--raw-duration-fast/normal`, `--duration-fast/normal`, `--leading-display`
  (1.1 — the TextEngine clip floor), `--ease-entrance`.
- **Build & lint verified clean** — `yarn lint` and `yarn build` both pass with 0
  errors and 0 warnings; no lint fixes were needed. Note: `yarn install` **fails
  on Node 20.17** (`eslint-visitor-keys` requires `^20.19 || ^22.13 || >=24`) —
  use Node ≥ 20.19; this repo was verified on 24.16.

## 2026-06-07

- **Fixed `<Inview>` standalone reveal + spring resize gating** — `<Inview>`
  never animated unless an external `trigger` ref was passed. The JSX `ref`
  callback wrote `inViewRef.current = node`, but that tuple slot is a *callback
  ref* (`setNode`), so the element was never observed and the `node` stayed
  `null`. Now calls `setInViewNode(node)`. This was also a build-breaking type
  error. Additionally, `<Inview>`, `<Spring>`, and `<Hover>` tracked `width` as a
  hook dependency but never passed it to `isMobileDisabled` — fixed by passing the
  tracked `width`, restoring resize re-evaluation and clearing the
  `react-hooks/exhaustive-deps` warnings. `yarn build` and `yarn lint` are now
  clean. See [[decisions-log]] ADR-0013 and [[components/animation-springs]].

## 2026-06-05

- **Home view emptied** — removed the animation showcase (`src/views/home-showcase.tsx`
  deleted) and reduced `HomeView` to an empty `<main>`. The home view is now the
  blank starting point for new work. Documented the convention — *if the project
  is empty and no other instructions are provided, start developing in the home
  view on route `/`* — in [[ai-agent-guide]] and [[new-page]].

## 2026-05-23

- **README — setup + Vercel deploy steps added** — *Getting started* expanded
  into a four-step flow (clone the template → delete bundled `.git` →
  initialise your own GitHub repo → install & run), with a macOS hint for
  revealing the hidden `.git` folder (`⇧ + ⌘ + .`). Added a *🚀 Deploy to
  Vercel* section covering the CLI flow (`vercel` / `vercel --prod`) and the
  dashboard import path, plus an `env pull` pointer to
  [[environment-variables]].
- **README rewritten to lead with the AI workflow** — root `README.md`
  reorganised so the AI usage guide is the first section: how the three
  `.claude/settings.json` hooks (`SessionStart`, `UserPromptSubmit`, `Stop`)
  enforce the vault workflow automatically, how to write a good request
  against this convention layer, and a cost-expectations note recommending
  **Claude Max (5×)** as the minimum plan (the vault-fan-out + hook
  re-injection on every turn is token-intensive by design). Technical
  *Getting started* and the existing AI-agents entry-point pointer stay
  below.

## 2026-05-22

- **Styling-placement convention added** — to stop `globals.css` accumulating
  hundreds of component-specific classes, styling now follows a strict
  placement order: one-offs are Tailwind utilities, repeated patterns become
  **React components** (not `@layer components` classes), and `@layer
  components` is reserved strictly for pseudo-elements and third-party
  overrides. `globals.css` stays bounded — `@import`, tokens, base resets only.
  No CSS Modules. Codified in [[decisions-log]] ADR-0012; [[design-system]]
  (new *Where a style goes* section) and [[component-conventions]] updated.
- **Semantic-HTML / SEO-markup convention added** — new [[html-semantics]]
  rulebook: landmarks, one `<h1>` + heading outline, native elements over
  `div`s, forms/images/ARIA, JSON-LD over microdata, a `data-*` convention, and
  passing a semantic `tag` to animation components. Codified as AGENTS.md hard
  rule #10; cross-linked from [[component-conventions]] and [[new-page]]. Fixed
  the demo (`home-showcase.tsx`) to a single `<h1>` to follow it.
- **API layer added** — a convention for reaching external services.
  `app/api/<resource>/route.ts` Route Handlers own their logic and read secret
  env vars directly (safe — route files never reach the browser). New: `zod`
  dependency; `src/env.ts` (validated env, public/server split); `src/lib/api/`
  (`handle` wrapper + `ApiError` + `{ data }`/`{ error }` envelope);
  `src/lib/api-client.ts` (typed same-origin fetch); example
  `app/api/contact/route.ts`. Codified as AGENTS.md hard rule #9. See
  [[decisions-log]] ADR-0011 and [[api-architecture]].

## 2026-05-21

- **Asset convention added** — site content assets (images, videos) now live
  under `public/assets/<section>/`, one folder per section; meta/PWA/SEO assets
  stay at the `public/` root. Documented in [[folder-structure]],
  [[component-conventions]], and the [[new-page]] playbook; `public/assets/`
  created with a `.gitkeep`.
- **SEO & performance hardening** — a broad pass on the starter. **SEO:** new
  `src/lib/site.ts` config (single source of truth, fed by `NEXT_PUBLIC_SITE_URL`);
  `metadataBase` is now always set (relative OG/canonical URLs resolve);
  `themeColor` moved to a `viewport` export; added `app/robots.ts`,
  `app/sitemap.ts`, and an `Organization`+`WebSite` JSON-LD helper; OG image
  dimensions corrected to match the asset; dead `keywords`/`other` tags dropped.
  **Performance:** populated `next.config.ts` (`removeConsole` in prod,
  AVIF/WebP, `next/image` breakpoints aligned to the grid, `poweredByHeader:
  false`); fixed a `requestAnimationFrame` leak in `ScrollLayout` (Lenis loop
  never cancelled on unmount); `HomeView` is now a Server Component with the
  animation demo split into the `HomeShowcase` client leaf; added
  `<ReducedMotion>` (honours `prefers-reduced-motion` via react-spring's global
  `skipAnimation`); removed a per-frame `console.log` from the demo; added
  `app/loading.tsx` / `error.tsx` / `not-found.tsx`. See [[decisions-log]]
  ADR-0010, [[seo-metadata]], and [[environment-variables]].
- **Animation engine — lint pass** — cleared all 13 pre-existing ESLint problems
  in the engine (2 errors + 11 warnings), an authorized engine edit (ADR-0009).
  `isMobileDisabled` now takes an optional `viewportWidth` argument, so the
  `active` memos in `<Spring>` / `<Hover>` / `<Inview>` / the trigger hooks
  depend on it genuinely. Added missing `disableOnMobile` effect deps; fixed a
  `trigger.current`-in-cleanup hazard in `<Hover>`; ref-stabilised `<Handle>`'s
  transition effects. **API change:** `useProgressTrigger` now returns `progress`
  as a `RefObject<number>` (read `.current`) instead of a render-time ref read —
  no consumer was affected (`<ProgressTrigger>` discards the return).
- **Animation engine — performance refactor** — fixed load issues that scaled
  with the number of animated components. Added `src/lib/animation/ticker.ts`, a
  single reference-counted `requestAnimationFrame` loop; `useLoop` (and all loop
  hooks) now subscribe to it instead of each starting its own rAF. `useWindowWidth`
  / `Height` / `Size` now share one debounced `resize` listener via a
  `useSyncExternalStore` store (the `debounceDelay` param was dropped — unused).
  `useDynamicInView` rewritten without the per-render `Proxy`/observer churn.
  Fixed a stale-closure bug in `useLoop`. `mode="forward"` scroll listeners made
  `passive`. This was an **authorized edit to `#do-not-modify` engine files** —
  hard rule #2 amended. See [[decisions-log]] ADR-0009 and [[animation-system]].
- **`spring-text-engine` updated** — bumped `^0.1.3` → `^0.1.5` (latest). The
  public API, types, and dependencies are unchanged between these versions
  (verified) — an internal-only patch bump, no code changes required.
- **Adaptive scaling grid added** — a root-font-size scaling system landed in
  `src/components/common/grid/` (`<AdaptiveGrid>` + `useAdaptiveGrid` hook +
  `grid.config.ts`), with `vw` media queries in `globals.css` for scale-down.
  It was dropped into `common/` as a `styled-components` system; ported to the
  project stack — config-driven TS + CSS-only Tailwind, no `styled-components`.
  The unused dropped files (`colors.ts`, `fonts.ts`, `utils.ts`, `index.ts`,
  the `styled-components` `grid.tsx`) were removed. Mounted via `<AdaptiveGrid>`
  in the root layout. See [[components/common]] and [[decisions-log]] ADR-0008.
- **Vault created** — `obsidian/` Obsidian vault initialised as the project's
  second brain. Architecture, frontend, and workflow docs populated. See [[decisions-log]] ADR-0001.
- **Root README rewritten** — replaced `create-next-app` boilerplate with a real
  project README that points into this vault.
- **`generic-layout-prompt.md` moved** — relocated from repo root to
  `obsidian/workflows/` as [[generic-layout-prompt]].
- **Navigation convention resolved** — standard `next/link` confirmed; the unbuilt
  `<AnimLink>` / `useAnimRouter()` convention dropped. See [[decisions-log]] ADR-0005.
- **Docs consolidated into the vault** — `project-specs.md` deleted (decomposed into
  vault notes + new [[environment-variables]]); `text-engine-docs.md` moved in as
  [[text-engine-reference]]. `AGENTS.md` rewritten as a thin shim; `.cursorrules`
  repointed to `@AGENTS.md`. The vault is now the single source of truth.
  See [[decisions-log]] ADR-0006.
- **Vault renamed & restructured** — vault folder `getlayers.io/` → `obsidian/`;
  number prefixes dropped from section folders (`00-meta` → `meta`, etc.). Project
  name standardised to **`next16-claude-starter`** across docs and `package.json`.
- **Components linked to docs** — every file in `src/components/` now carries a
  `// 📖 Docs:` pointer comment to its catalog note, so agents can jump from code
  to docs and back.
- **Vault workflow automated** — added `.claude/settings.json` with `SessionStart`,
  `UserPromptSubmit`, and `Stop` hooks that make agents read the vault first,
  follow the relevant guide, and update docs after every change — with no manual
  reminder. See [[decisions-log]] ADR-0007 and [[ai-agent-guide]].
- **Cookie component replaced** — the `react-cookie-consent`-based `cookie.tsx`
  was replaced by an in-house `Cookie/` component (banner + category preferences
  modal + Zustand store). `react-cookie-consent` removed from dependencies. The
  component shipped using `styled-components` + an external design system; it was
  ported to the project stack — Tailwind v4 tokens and `@react-spring/web` motion.
  Mounted via `<LazyCookie>`. See [[components/common]].
- **Fixed TextEngine spring type mismatch** — the `mode="once"` heading in
  `views/home.tsx` mixed `lineIn={{ y: 0 }}` (number) with `lineOut={{ y: "100%" }}`
  (string), throwing *"Cannot animate between _AnimatedString and _AnimatedValue"*.
  Changed to `y: "0%"`. The buggy pattern in [[text-engine]] / [[text-engine-reference]]
  examples was corrected and a type-matching gotcha note added.

## Project baseline (git history)

| Commit | Description |
|--------|-------------|
| `94b0870` | feat: update starter |
| `5280ef2` | fix: linter errors & build |
| `b2b84e6` | initial — `next16-claude-starter` scaffold |

> [!note]
> The starter shipped with: Next.js 16.2, React 19.2, Tailwind v4, `@react-spring/web`,
> `spring-text-engine`, Lenis, and Zustand. See [[tech-stack]] for the current state.
