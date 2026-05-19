---
name: ui-ux-pro-max
description: >-
  UI/UX design intelligence for web and mobile. Use this skill when the user
  asks to plan, build, create, design, implement, review, fix, improve,
  optimize, enhance, or refactor any UI/UX — websites, landing pages,
  dashboards, admin panels, e-commerce, SaaS, portfolios, blogs, or mobile
  apps — or when the user asks about buttons, modals, navbars, sidebars, cards,
  tables, forms, and charts; styles like glassmorphism, claymorphism,
  minimalism, brutalism, neumorphism, bento grid, dark mode, and flat design;
  or topics including color systems, accessibility, animation, layout,
  typography, font pairing, spacing, interaction states, shadow, and gradient.
  Apply whenever a task changes how a feature looks, feels, moves, or is
  interacted with.
---

# UI/UX Pro Max — Design Intelligence

Comprehensive design guide for web and mobile applications.

**Content database:** 50+ styles · 161 color palettes · 57 font pairings · 161 product types · 99 UX guidelines · 25 chart types · 10 technology stacks.

> Adapted from the upstream
> [`ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
> repository. The `search.py` CLI and its CSV databases referenced under
> **How to Use** belong to that repo; install them to use those commands. The
> design rules, checklists, and reference tables below are self-contained and
> usable on their own.

---

## When to Apply

### Must use

- Designing new pages (landing page, dashboard, admin, SaaS, mobile app).
- Creating or refactoring UI components (buttons, modals, forms, tables, charts).
- Choosing color schemes, typography systems, spacing standards, or layout systems.
- Reviewing UI code for UX, accessibility, or visual consistency.
- Implementing navigation structures, animations, or responsive behavior.
- Making product-level design decisions (style, information hierarchy, brand expression).
- Improving the perceived quality, clarity, or usability of interfaces.

### Recommended

- UI appears unprofessional but the reason is unclear.
- Receiving feedback on usability or experience.
- Pre-launch UI quality optimization.
- Aligning cross-platform design (Web / iOS / Android).
- Building design systems or reusable component libraries.

### Skip

- Pure backend logic development.
- Only API or database design involvement.
- Performance optimization unrelated to the interface.
- Infrastructure or DevOps work.
- Non-visual scripts or automation tasks.

**Decision criteria:** if the task will change how a feature **looks, feels, moves, or is interacted with**, apply this skill.

---

## Rule Categories by Priority

| # | Category | Impact | Domain | Key checks | Anti-patterns |
|---|----------|--------|--------|------------|---------------|
| 1 | Accessibility | CRITICAL | `ux` | Contrast 4.5:1, alt text, keyboard nav, aria-labels | Removing focus rings, icon-only buttons without labels |
| 2 | Touch & Interaction | CRITICAL | `ux` | Min size 44×44px, 8px+ spacing, loading feedback | Hover-only reliance, instant (0ms) state changes |
| 3 | Performance | HIGH | `ux` | WebP/AVIF, lazy loading, reserve space (CLS < 0.1) | Layout thrashing, cumulative layout shift |
| 4 | Style Selection | HIGH | `style`, `product` | Match product type, consistency, SVG icons (no emoji) | Mixing flat & skeuomorphic randomly, emoji as icons |
| 5 | Layout & Responsive | HIGH | `ux` | Mobile-first breakpoints, viewport meta, no horizontal scroll | Horizontal scroll, fixed px container widths, disabling zoom |
| 6 | Typography & Color | MEDIUM | `typography`, `color` | Base 16px, line-height 1.5, semantic color tokens | Body text < 12px, gray-on-gray, raw hex in components |
| 7 | Animation | MEDIUM | `ux` | Duration 150–300ms, motion conveys meaning, spatial continuity | Decorative-only animation, animating width/height, no reduced-motion |
| 8 | Forms & Feedback | MEDIUM | `ux` | Visible labels, error near field, helper text, progressive disclosure | Placeholder-only labels, errors only at top, overwhelm upfront |
| 9 | Navigation Patterns | HIGH | `ux` | Predictable back, bottom nav ≤ 5, deep linking | Overloaded nav, broken back behavior, no deep links |
| 10 | Charts & Data | LOW | `chart` | Legends, tooltips, accessible colors | Relying on color alone to convey meaning |

---

## Quick Reference — Rules by Category

### 1. Accessibility (CRITICAL)

- **color-contrast** — Minimum 4.5:1 ratio for normal text (large text 3:1).
- **focus-states** — Visible focus rings on interactive elements (2–4px).
- **alt-text** — Descriptive alt text for meaningful images.
- **aria-labels** — `aria-label` for icon-only buttons; `accessibilityLabel` in native.
- **keyboard-nav** — Tab order matches visual order; full keyboard support.
- **form-labels** — Use `label` with a `for` attribute.
- **skip-links** — "Skip to main content" for keyboard users.
- **heading-hierarchy** — Sequential h1→h6, no level skipping.
- **color-not-only** — Don't convey info by color alone (add icon/text).
- **dynamic-type** — Support system text scaling; avoid truncation as text grows.
- **reduced-motion** — Respect `prefers-reduced-motion`; reduce/disable animations.
- **voiceover-sr** — Meaningful `accessibilityLabel`/`accessibilityHint`; logical reading order.
- **escape-routes** — Provide cancel/back in modals and multi-step flows.
- **keyboard-shortcuts** — Preserve system and accessibility shortcuts.

### 2. Touch & Interaction (CRITICAL)

- **touch-target-size** — Min 44×44pt (Apple) / 48×48dp (Material).
- **touch-spacing** — Minimum 8px/8dp gap between touch targets.
- **hover-vs-tap** — Use click/tap for primary interactions; don't rely on hover.
- **loading-buttons** — Disable button during async operations; show a spinner.
- **error-feedback** — Clear error messages near the problem.
- **cursor-pointer** — Add `cursor-pointer` to clickable elements (web).
- **gesture-conflicts** — Avoid horizontal swipe on main content.
- **tap-delay** — Use `touch-action: manipulation` to reduce the 300ms delay.
- **standard-gestures** — Use platform-standard gestures consistently.
- **system-gestures** — Don't block system gestures (Control Center, back swipe).
- **press-feedback** — Visual feedback on press (ripple/highlight).
- **haptic-feedback** — Use haptics for confirmations and important actions.
- **gesture-alternative** — Don't rely on gesture-only interactions.
- **safe-area-awareness** — Keep primary touch targets away from the notch / Dynamic Island.
- **no-precision-required** — Avoid requiring pixel-perfect taps.
- **swipe-clarity** — Swipe actions must show a clear affordance or hint.
- **drag-threshold** — Use a movement threshold before starting a drag.

### 3. Performance (HIGH)

- **image-optimization** — Use WebP/AVIF, responsive images, lazy load.
- **image-dimension** — Declare width/height or use `aspect-ratio`.
- **font-loading** — Use `font-display: swap/optional`; reserve space.
- **font-preload** — Preload only critical fonts.
- **critical-css** — Prioritize above-the-fold CSS.
- **lazy-loading** — Lazy load non-hero components via dynamic import.
- **bundle-splitting** — Split code by route/feature.
- **third-party-scripts** — Load async/defer; audit and remove unnecessary.
- **reduce-reflows** — Avoid frequent layout reads/writes; batch operations.
- **content-jumping** — Reserve space for async content.
- **lazy-load-below-fold** — Use `loading="lazy"` for below-the-fold assets.
- **virtualize-lists** — Virtualize lists with 50+ items.
- **main-thread-budget** — Keep per-frame work under ~16ms for 60fps.
- **progressive-loading** — Use skeleton screens / shimmer for >1s operations.
- **input-latency** — Keep input latency under ~100ms.
- **tap-feedback-speed** — Provide visual feedback within 100ms of a tap.
- **debounce-throttle** — Use debounce/throttle for high-frequency events.
- **offline-support** — Provide offline-state messaging and fallback.
- **network-fallback** — Offer degraded modes for slow networks.

### 4. Style Selection (HIGH)

- **style-match** — Match style to product type.
- **consistency** — Use the same style across all pages.
- **no-emoji-icons** — Use SVG icons (Heroicons, Lucide), not emojis.
- **color-palette-from-product** — Choose the palette from product/industry.
- **effects-match-style** — Shadows, blur, radius aligned with the chosen style.
- **platform-adaptive** — Respect platform idioms (iOS HIG vs Material).
- **state-clarity** — Make hover/pressed/disabled states visually distinct.
- **elevation-consistent** — Use a consistent elevation/shadow scale.
- **dark-mode-pairing** — Design light/dark variants together.
- **icon-style-consistent** — Use one icon set / visual language.
- **system-controls** — Prefer native/system controls over custom.
- **blur-purpose** — Use blur to indicate background dismissal.
- **primary-action** — Each screen has only one primary CTA.

### 5. Layout & Responsive (HIGH)

- **viewport-meta** — `width=device-width, initial-scale=1` (never disable zoom).
- **mobile-first** — Design mobile-first, then scale up.
- **breakpoint-consistency** — Use systematic breakpoints (375 / 768 / 1024 / 1440).
- **readable-font-size** — Minimum 16px body text on mobile.
- **line-length-control** — Mobile 35–60 chars per line; desktop 60–75.
- **horizontal-scroll** — No horizontal scroll on mobile.
- **spacing-scale** — Use a 4pt/8dp incremental spacing system.
- **touch-density** — Keep component spacing comfortable for touch.
- **container-width** — Consistent desktop max-width (`max-w-6xl` / `7xl`).
- **z-index-management** — Define a layered z-index scale.
- **fixed-element-offset** — Fixed navbar / bottom bar must reserve safe padding.
- **scroll-behavior** — Avoid nested scroll regions that interfere.
- **viewport-units** — Prefer `min-h-dvh` over `100vh` on mobile.
- **orientation-support** — Keep layout readable in landscape mode.
- **content-priority** — Show core content first on mobile.
- **visual-hierarchy** — Establish hierarchy via size, spacing, contrast.

### 6. Typography & Color (MEDIUM)

- **line-height** — Use 1.5–1.75 for body text.
- **line-length** — Limit to 65–75 characters per line.
- **font-pairing** — Match heading/body font personalities.
- **font-scale** — Consistent type scale (12 / 14 / 16 / 18 / 24 / 32).
- **contrast-readability** — Darker text on light backgrounds.
- **text-styles-system** — Use the platform type system (iOS Dynamic Type / Material type roles).
- **weight-hierarchy** — Bold headings (600–700), regular body (400), medium labels (500).
- **color-semantic** — Define semantic color tokens (primary, secondary, error, surface).
- **color-dark-mode** — Dark mode uses desaturated / lighter tonal variants.
- **color-accessible-pairs** — Foreground/background pairs meet 4.5:1 (AA) or 7:1 (AAA).
- **color-not-decorative-only** — Functional color must include icon/text.
- **truncation-strategy** — Prefer wrapping over truncation.
- **letter-spacing** — Respect default letter-spacing per platform.
- **number-tabular** — Use tabular/monospaced figures for data columns.
- **whitespace-balance** — Use whitespace intentionally to group items.

### 7. Animation (MEDIUM)

- **duration-timing** — 150–300ms for micro-interactions; complex ≤ 400ms.
- **transform-performance** — Use `transform`/`opacity` only.
- **loading-states** — Show skeleton or progress when loading >300ms.
- **excessive-motion** — Animate 1–2 key elements per view, max.
- **easing** — Use ease-out for entering, ease-in for exiting.
- **motion-meaning** — Every animation must express a cause-effect relationship.
- **state-transition** — State changes should animate smoothly.
- **continuity** — Maintain spatial continuity in transitions.
- **parallax-subtle** — Use parallax sparingly; respect reduced-motion.
- **spring-physics** — Prefer spring / physics-based curves for a natural feel.
- **exit-faster-than-enter** — Exit animations shorter than enter (~60–70%).
- **stagger-sequence** — Stagger list/grid item entrance by 30–50ms per item.
- **shared-element-transition** — Use shared element for visual continuity.
- **interruptible** — Animations must be interruptible.
- **no-blocking-animation** — Never block user input during animation.
- **fade-crossfade** — Use crossfade for content replacement.
- **scale-feedback** — Subtle scale (0.95–1.05) on press.
- **gesture-feedback** — Drag, swipe, pinch provide real-time response.
- **hierarchy-motion** — Use translate/scale direction to express hierarchy.
- **motion-consistency** — Unify duration/easing tokens globally.
- **opacity-threshold** — Fading elements should not linger below opacity 0.2.
- **modal-motion** — Modals/sheets animate from the trigger source.
- **navigation-direction** — Forward left/up; backward right/down.
- **layout-shift-avoid** — Animations must not cause CLS.

### 8. Forms & Feedback (MEDIUM)

- **input-labels** — Visible label per input (not placeholder-only).
- **error-placement** — Show the error below the related field.
- **submit-feedback** — Loading, then success/error state on submit.
- **required-indicators** — Mark required fields (e.g. asterisk).
- **empty-states** — Helpful message and action when there is no content.
- **toast-dismiss** — Auto-dismiss toasts in 3–5s.
- **confirmation-dialogs** — Confirm before destructive actions.
- **input-helper-text** — Provide persistent helper text below inputs.
- **disabled-states** — Disabled elements use reduced opacity (0.38–0.5).
- **progressive-disclosure** — Reveal complex options progressively.
- **inline-validation** — Validate on blur; show error after the user finishes.
- **input-type-keyboard** — Use semantic input types to trigger the correct mobile keyboard.
- **password-toggle** — Provide a show/hide toggle for password fields.
- **autofill-support** — Use `autocomplete` / `textContentType` attributes.
- **undo-support** — Allow undo for destructive or bulk actions.
- **success-feedback** — Confirm completed actions with brief visual feedback.
- **error-recovery** — Error messages must include a recovery path.
- **multi-step-progress** — Multi-step flows show a step indicator or progress bar.
- **form-autosave** — Long forms should auto-save drafts.
- **sheet-dismiss-confirm** — Confirm before dismissing a sheet with unsaved changes.
- **error-clarity** — Error messages must state the cause + how to fix it.
- **field-grouping** — Group related fields logically.
- **read-only-distinction** — Read-only state visually/semantically different from disabled.
- **focus-management** — After a submit error, auto-focus the first invalid field.
- **error-summary** — For multiple errors, show a summary with anchor links.
- **touch-friendly-input** — Mobile input height ≥ 44px.
- **destructive-emphasis** — Destructive actions use a semantic danger color.
- **toast-accessibility** — Toasts use `aria-live="polite"`.
- **aria-live-errors** — Form errors use an `aria-live` region or `role="alert"`.
- **contrast-feedback** — Error and success state colors meet 4.5:1.
- **timeout-feedback** — Request timeout shows clear feedback with retry.

### 9. Navigation Patterns (HIGH)

- **bottom-nav-limit** — Bottom navigation max 5 items; use labels with icons.
- **drawer-usage** — Use a drawer/sidebar for secondary navigation.
- **back-behavior** — Back navigation must be predictable and consistent.
- **deep-linking** — All key screens reachable via deep link / URL.
- **tab-bar-ios** — iOS: use a bottom Tab Bar for top-level navigation.
- **top-app-bar-android** — Android: use a Top App Bar with a navigation icon.
- **nav-label-icon** — Navigation items must have both icon and text label.
- **nav-state-active** — The current location must be visually highlighted.
- **nav-hierarchy** — Primary nav vs secondary nav must be clearly separated.
- **modal-escape** — Modals must offer a clear close/dismiss affordance.
- **search-accessible** — Search must be easily reachable.
- **breadcrumb-web** — Web: use breadcrumbs for 3+ level deep hierarchies.
- **state-preservation** — Navigating back must restore the previous state.
- **gesture-nav-support** — Support system gesture navigation.
- **tab-badge** — Use badges on nav items sparingly.
- **overflow-menu** — Use an overflow/"more" menu when actions exceed space.
- **bottom-nav-top-level** — Bottom nav is for top-level screens only.
- **adaptive-navigation** — Large screens (≥1024px) prefer a sidebar; small use bottom/top nav.
- **back-stack-integrity** — Never silently reset the navigation stack.
- **navigation-consistency** — Navigation placement must stay the same.
- **avoid-mixed-patterns** — Don't mix Tab + Sidebar + Bottom Nav at the same hierarchy.
- **modal-vs-navigation** — Modals must not be used for primary navigation.
- **focus-on-route-change** — After a page transition, move focus to main content.
- **persistent-nav** — Core navigation must remain reachable from deep pages.
- **destructive-nav-separation** — Dangerous actions visually/spatially separated from nav.
- **empty-nav-state** — When a nav destination is unavailable, explain why.

### 10. Charts & Data (LOW)

- **chart-type** — Match chart type to data type.
- **color-guidance** — Use accessible color palettes; avoid red/green only.
- **data-table** — Provide a table alternative for accessibility.
- **pattern-texture** — Supplement color with patterns/textures.
- **legend-visible** — Always show a legend; position it near the chart.
- **tooltip-on-interact** — Provide tooltips / data labels on hover/tap.
- **axis-labels** — Label axes with units and a readable scale.
- **responsive-chart** — Charts must reflow on small screens.
- **empty-data-state** — Show a meaningful empty state when there is no data.
- **loading-chart** — Use a skeleton or shimmer placeholder.
- **animation-optional** — Chart animations must respect `prefers-reduced-motion`.
- **large-dataset** — For 1000+ points, aggregate or sample.
- **number-formatting** — Use locale-aware formatting.
- **touch-target-chart** — Interactive elements must have a ≥44pt tap area.
- **no-pie-overuse** — Avoid pie/donut charts for >5 categories.
- **contrast-data** — Data lines/bars vs background ≥ 3:1.
- **legend-interactive** — Legends should be clickable to toggle series.
- **direct-labeling** — For small datasets, label values directly.
- **tooltip-keyboard** — Tooltip content must be keyboard-reachable.
- **sortable-table** — Data tables must support sorting.
- **axis-readability** — Axis ticks must not be cramped.
- **data-density** — Limit information density per chart.
- **trend-emphasis** — Emphasize data trends over decoration.
- **gridline-subtle** — Grid lines should be low-contrast.
- **focusable-elements** — Interactive elements must be keyboard-navigable.
- **screen-reader-summary** — Provide a text summary of the chart's key insight.
- **error-state-chart** — Data load failure shows an error message with retry.
- **export-option** — Offer CSV / image export of chart data.
- **drill-down-consistency** — Drill-down interactions maintain a clear back-path.
- **time-scale-clarity** — Time-series charts must clearly label granularity.

---

## How to Use

> The commands below drive the upstream `search.py` CLI and its CSV databases.
> Install the [`ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
> repo to run them. Without it, use the Quick Reference and checklists above directly.

### Prerequisites

Check the Python installation:

```bash
python3 --version || python --version
```

- **macOS:** `brew install python3`
- **Ubuntu/Debian:** `sudo apt update && sudo apt install python3`
- **Windows:** `winget install Python.Python.3.12`

### Workflow overview

| Scenario | Examples | Start from |
|----------|----------|-----------|
| New project / page | "Build landing page", "Build dashboard" | Step 1 → Step 2 |
| New component | "Create pricing card", "Add modal" | Step 3 |
| Choose style / color / font | "What style fits fintech?" | Step 2 |
| Review existing UI | "Review for UX issues", "Check accessibility" | Quick Reference |
| Fix a UI bug | "Button hover broken", "Layout shifts" | Quick Reference → relevant section |
| Improve / optimize | "Make faster", "Improve mobile" | Step 3 |
| Implement dark mode | "Add dark mode support" | Step 3 |
| Add charts / data viz | "Add analytics dashboard chart" | Step 3 |
| Stack best practices | "React performance tips" | Step 4 |

### Step 1 — Analyze user requirements

Extract from the request:

- **Product type** — Entertainment (social, video, music, gaming), Tool (scanner, editor, converter), Productivity (task manager, notes, calendar), etc.
- **Target audience** — consumer vs. enterprise; age group; usage context.
- **Style keywords** — playful, vibrant, minimal, dark mode, content-first, immersive.
- **Stack** — React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, HTML/CSS.

### Step 2 — Generate the design system (required)

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

The search runs domains in parallel (product, style, color, landing, typography), applies the reasoning rules, and returns a complete design system — pattern, style, colors, typography, effects — including anti-patterns to avoid.

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
```

#### Step 2b — Persist the design system (master + overrides)

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

Creates:

- `design-system/MASTER.md` — the global source of truth.
- `design-system/pages/` — folder for page-specific overrides.

Add a page-specific override:

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```

Creates `design-system/pages/dashboard.md` — page-specific deviations.

**Hierarchical retrieval logic:**

1. Check `design-system/pages/[page-name].md` first.
2. If it exists, its rules **override** the master file.
3. If not, use `design-system/MASTER.md` exclusively.

Context-aware retrieval prompt:

```
I am building the [Page Name] page. Please read design-system/MASTER.md.
Also check if design-system/pages/[page-name].md exists.
If the page file exists, prioritize its rules.
If not, use the Master rules exclusively.
Now, generate the code...
```

### Step 3 — Supplement with detailed searches (as needed)

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

| Need | Domain | Example |
|------|--------|---------|
| Product type patterns | `product` | `--domain product "entertainment social"` |
| More style options | `style` | `--domain style "glassmorphism dark"` |
| Color palettes | `color` | `--domain color "entertainment vibrant"` |
| Font pairings | `typography` | `--domain typography "playful modern"` |
| Chart recommendations | `chart` | `--domain chart "real-time dashboard"` |
| UX best practices | `ux` | `--domain ux "animation accessibility"` |
| Individual Google Fonts | `google-fonts` | `--domain google-fonts "sans serif variable"` |
| Landing structure | `landing` | `--domain landing "hero social-proof"` |
| React / Next.js perf | `react` | `--domain react "rerender memo list"` |
| App interface a11y | `web` | `--domain web "touch safe-areas"` |
| AI prompt / CSS keywords | `prompt` | `--domain prompt "minimalism"` |

### Step 4 — Stack guidelines

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack>
```

---

## Search Reference

### Available domains

| Domain | Use for | Example keywords |
|--------|---------|------------------|
| `product` | Product-type recommendations | SaaS, e-commerce, portfolio, healthcare, beauty, service |
| `style` | UI styles, colors, effects | glassmorphism, minimalism, dark mode, brutalism |
| `typography` | Font pairings, Google Fonts | elegant, playful, professional, modern |
| `color` | Color palettes by product type | saas, ecommerce, healthcare, beauty, fintech, service |
| `landing` | Page structure, CTA strategies | hero, hero-centric, testimonial, pricing, social-proof |
| `chart` | Chart types, library recommendations | trend, comparison, timeline, funnel, pie |
| `ux` | Best practices, anti-patterns | animation, accessibility, z-index, loading |
| `google-fonts` | Individual Google Fonts lookup | sans serif, monospace, japanese, variable font, popular |
| `react` | React / Next.js performance | waterfall, bundle, suspense, memo, rerender, cache |
| `web` | App interface guidelines | accessibilityLabel, touch targets, safe areas, Dynamic Type |
| `prompt` | AI prompts, CSS keywords | (style name) |

### Output formats

```bash
# ASCII box (default) — best for terminal display
python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system

# Markdown — best for documentation
python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system -f markdown
```

---

## Example Workflow

**Request:** "Make an AI search homepage."

**Analysis**

- Product type: Tool (AI search engine).
- Target audience: consumers seeking fast, intelligent search.
- Style keywords: modern, minimal, content-first, dark mode.

**Step 2 — generate the design system**

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "AI search tool modern minimal" --design-system -p "AI Search"
```

**Step 3 — supplement with detailed searches**

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "minimalism dark mode" --domain style
python3 skills/ui-ux-pro-max/scripts/search.py "search loading animation" --domain ux
```

**Step 4 — stack guidelines**, then synthesize and implement.

---

## Tips for Better Results

### Query strategy

- Use **multi-dimensional keywords** — combine product + industry + tone + density: `"entertainment social vibrant content-dense"`, not just `"app"`.
- Try different keywords for the same need: "playful neon" → "vibrant dark" → "content-first minimal".
- Use `--design-system` first for full recommendations, then `--domain` to deep-dive.

### Common sticking points

| Problem | What to do |
|---------|------------|
| Can't decide on style/color | Re-run `--design-system` with different keywords |
| Dark mode contrast issues | Quick Reference §6: `color-dark-mode` + `color-accessible-pairs` |
| Animations feel unnatural | Quick Reference §7: `spring-physics` + `easing` + `exit-faster-than-enter` |
| Form UX is poor | Quick Reference §8: `inline-validation` + `error-clarity` + `focus-management` |
| Navigation feels confusing | Quick Reference §9: `nav-hierarchy` + `bottom-nav-limit` + `back-behavior` |
| Layout breaks on small screens | Quick Reference §5: `mobile-first` + `breakpoint-consistency` |
| Performance / jank | Quick Reference §3: `virtualize-lists` + `main-thread-budget` + `debounce-throttle` |

### Pre-delivery (quick pass)

- Run through Quick Reference **§1–§3** (CRITICAL + HIGH) as a final review.
- Test on 375px (small phone) and in landscape orientation.
- Verify behavior with **reduced-motion** enabled and **Dynamic Type** at the largest size.
- Check dark mode contrast independently.
- Confirm all touch targets ≥ 44pt.
- Verify no content is hidden behind safe areas.

---

## Common Rules for Professional UI

Scope: app UI (iOS / Android / React Native / Flutter) and web.

### Icons & visual elements

| Rule | Standard | Avoid | Why it matters |
|------|----------|-------|----------------|
| No emoji as structural icons | Use vector icons (Lucide, react-native-vector-icons, @expo/vector-icons) | Emojis (🎨 🚀 ⚙️) for navigation, settings, or system controls | Emojis are font-dependent and inconsistent across platforms |
| Vector-only assets | Use SVG or platform vector icons that scale cleanly | Raster PNG icons that blur or pixelate | Ensures scalability, crisp rendering, dark/light adaptability |
| Stable interaction states | Use color, opacity, or elevation transitions without changing bounds | Layout-shifting transforms that move surrounding content | Prevents unstable interactions and jitter |
| Correct brand logos | Use official brand assets and follow usage guidelines | Guessing logo paths, recoloring, modifying proportions | Prevents brand misuse and ensures compliance |
| Consistent icon sizing | Define icon sizes as design tokens (`icon-sm`, `icon-md = 24pt`) | Mixing arbitrary values (20 / 24 / 28pt) randomly | Maintains rhythm and visual hierarchy |
| Stroke consistency | Use a consistent stroke width within the same layer (1.5px or 2px) | Mixing thick and thin strokes arbitrarily | Inconsistent strokes reduce perceived polish |
| Filled vs outline discipline | Use one icon style per hierarchy level | Mixing filled and outline icons at the same level | Maintains semantic clarity and stylistic coherence |
| Touch target minimum | Minimum 44×44pt interactive area (use `hitSlop` if smaller) | Small icons without an expanded tap area | Meets accessibility and platform usability standards |
| Icon alignment | Align icons to the text baseline; keep consistent padding | Misaligned icons or inconsistent spacing | Prevents subtle visual imbalance |
| Icon contrast | Follow WCAG contrast: 4.5:1 small, 3:1 minimum for larger glyphs | Low-contrast icons that blend into the background | Ensures accessibility in light and dark modes |

### Interaction

| Rule | Do | Don't |
|------|----|----|
| Tap feedback | Provide clear pressed feedback (ripple/opacity/elevation) within 80–150ms | No visual response on tap |
| Animation timing | Keep micro-interactions ~150–300ms with platform-native easing | Instant transitions or slow animations (>500ms) |
| Accessibility focus | Screen-reader focus order matches visual order with descriptive labels | Unlabeled controls or confusing focus traversal |
| Disabled state clarity | Use disabled semantics, reduced emphasis, and no tap action | Controls that look tappable but do nothing |
| Touch target minimum | Keep tap areas ≥44×44pt (iOS) or ≥48×48dp (Android) | Tiny tap targets or icon-only hit areas without padding |
| Gesture conflict prevention | One primary gesture per region; avoid nested tap/drag | Overlapping gestures causing accidental actions |
| Semantic native controls | Prefer native interactive primitives with proper a11y roles | Generic containers used as primary controls |

### Light / dark mode contrast

| Rule | Do | Don't |
|------|----|----|
| Surface readability (light) | Keep cards/surfaces clearly separated from the background | Overly transparent surfaces that blur hierarchy |
| Text contrast (light) | Maintain body text contrast ≥4.5:1 against light surfaces | Low-contrast gray body text |
| Text contrast (dark) | Maintain primary text ≥4.5:1 and secondary ≥3:1 on dark surfaces | Dark-mode text that blends into the background |
| Border & divider visibility | Ensure separators are visible in both themes | Theme-specific borders disappearing in one mode |
| State contrast parity | Keep interaction states equally distinguishable in both themes | Defining interaction states for one theme only |
| Token-driven theming | Use semantic color tokens mapped per theme | Hardcoded per-screen hex values |
| Scrim & modal legibility | Use a modal scrim strong enough to isolate content (40–60% black) | Weak scrim that leaves the background visually competing |

### Layout & spacing

| Rule | Do | Don't |
|------|----|----|
| Safe-area compliance | Respect top/bottom safe areas for fixed headers, tabs, CTA bars | Placing fixed UI under the notch, status bar, or gesture area |
| System bar clearance | Add spacing for status/navigation bars and the gesture home indicator | Letting tappable content collide with OS chrome |
| Consistent content width | Keep a predictable content width per device class | Mixing arbitrary widths between screens |
| 8dp spacing rhythm | Use a consistent 4/8dp spacing system | Random spacing increments with no rhythm |
| Readable text measure | Keep long-form text readable on large devices | Full-width long text that hurts readability |
| Section spacing hierarchy | Define clear vertical rhythm tiers (16 / 24 / 32 / 48) | Similar UI levels with inconsistent spacing |
| Adaptive gutters by breakpoint | Increase horizontal insets on larger widths and landscape | The same narrow gutter on all sizes/orientations |
| Scroll & fixed-element coexistence | Add bottom/top content insets so lists aren't hidden behind bars | Scroll content obscured by sticky headers/footers |

---

## Pre-Delivery Checklist

### Visual quality

- [ ] No emojis used as icons (use SVG instead).
- [ ] All icons come from a consistent icon family and style.
- [ ] Official brand assets used with correct proportions and clear space.
- [ ] Pressed-state visuals do not shift layout bounds or cause jitter.
- [ ] Semantic theme tokens used consistently (no ad-hoc hardcoded colors).

### Interaction

- [ ] All tappable elements provide clear pressed feedback (ripple/opacity/elevation).
- [ ] Touch targets meet the minimum size (≥44×44pt iOS, ≥48×48dp Android).
- [ ] Micro-interaction timing stays in the 150–300ms range with native-feeling easing.
- [ ] Disabled states are visually clear and non-interactive.
- [ ] Screen-reader focus order matches visual order; interactive labels are descriptive.
- [ ] Gesture regions avoid nested/conflicting interactions (tap/drag/back-swipe).

### Light / dark mode

- [ ] Primary text contrast ≥4.5:1 in both light and dark mode.
- [ ] Secondary text contrast ≥3:1 in both light and dark mode.
- [ ] Dividers/borders and interaction states distinguishable in both modes.
- [ ] Modal/drawer scrim opacity strong enough for foreground legibility (40–60% black).
- [ ] Both themes tested before delivery (not inferred from a single theme).

### Layout

- [ ] Safe areas respected for headers, tab bars, and bottom CTA bars.
- [ ] Scroll content not hidden behind fixed/sticky bars.
- [ ] Verified on small phone, large phone, and tablet (portrait + landscape).
- [ ] Horizontal insets/gutters adapt correctly by device size and orientation.
- [ ] 4/8dp spacing rhythm maintained across component, section, and page levels.
- [ ] Long-form text measure remains readable on larger devices.

### Accessibility

- [ ] All meaningful images/icons have accessibility labels.
- [ ] Form fields have labels, hints, and clear error messages.
- [ ] Color is not the only indicator.
- [ ] Reduced motion and dynamic text size supported without layout breakage.
- [ ] Accessibility traits/roles/states (selected, disabled, expanded) announced correctly.