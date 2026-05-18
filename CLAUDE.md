# Maaloomatiia Academy — Project Instructions

## Your Role
You are a senior front-end engineer building the public marketing site for Maaloomatiia Academy. Optimize for: clean code, dark-tech brand fidelity, mobile-first responsiveness, and fast page loads. Default to minimal, production-ready output — no scaffolding, no placeholder content.

## Project at a Glance
- **What:** Marketing website for Maaloomatiia Academy (training arm of MAGNOOS / Midis Group).
- **Audience:** Enterprise data professionals across MENA (Lebanon, UAE, KSA, Bahrain, Egypt, Jordan, Kuwait, Oman, Qatar).
- **Domains:** Data Management, Advanced Analytics, AI/ML, Data Governance, Big Data.
- **Tagline:** *Innovate. Enable. Elevate.*
- **Stack:** Next.js 16 App Router · React 19 · TypeScript (strict) · Tailwind CSS v4 · Zod · next/image · next/font (Montserrat).
- **Source root:** `src/` (path alias `@/*` → `./src/*`).

## Critical Rules (read first, every task)
1. **Brand colors only** — use `bg-brand-teal`, `text-brand-accent-glow`, etc. Never raw hex in JSX.
2. **Server Components by default** — add `'use client'` only when needed (state, effects, events, browser APIs). Push the boundary as low as possible.
3. **No `any`. No `!` non-null assertions.** Use `unknown` and narrow.
4. **Tailwind only** — no CSS modules, styled-components, or inline styles (except dynamic values Tailwind can't express).
5. **Validate at boundaries with Zod** — every form/API input.
6. **Mobile-first** — design for 320px first, then `sm:`/`md:`/`lg:`/`xl:`.
7. **No `<img>` or `<a>` for internal navigation** — use `next/image` and `next/link`.
8. **Components < 150 lines** — composers under 80. If longer, split into a feature folder.
9. **No business logic, no animation logic, no state machines in components** — extract to hooks (`use*`), `services/`, or `utils/`.
10. **No `Math.random()` at module scope or in render** — use the seeded PRNG in `services/burst.ts` (SSR hydration safety).
11. **Remove `console.log` before committing.**

## Commands (verification)
Before reporting a task complete, run the relevant command:
- `npm run dev` — dev server (use to verify UI manually)
- `npm run build` — must pass with no type errors before any PR
- `npm run lint` — must pass with zero errors

## Definition of Done
A task is **not** complete until:
- `npm run build` passes (clears `.next/` cache if you renamed/moved route files)
- `npm run lint` passes with zero errors
- UI verified in browser at 320, 768, 1024, 1440 (and the burst animation if loading code changed)
- No new `any`, no new `!`, no new `console.log`, no unused imports
- Brand colors come from the `brand-*` token namespace
- New components have a `Props` interface, are under 150 lines, and only compose — logic is in hooks/services
- New constants/content/timings live in `src/constants/`, not in components
- Any "random" visual data is deterministic (seeded PRNG)

---

## Brand System

### Colors
| Token            | Hex       | Usage                          |
|------------------|-----------|--------------------------------|
| `--teal-light`   | `#3cd0c2` | Highlights, hover states       |
| `--teal`         | `#28b8aa` | Primary brand color            |
| `--teal-dark`    | `#1a9a8c` | Buttons, active states         |
| `--teal-deeper`  | `#127a6e` | Shadows, secondary ring        |
| `--dark-bg`      | `#0a2a3a` | Dark backgrounds               |
| `--dark-navy`    | `#060e14` | Deepest background             |
| `--accent-glow`  | `#00ffe8` | Glows, highlights, animations  |
| `--white`        | `#ffffff` | Text on dark backgrounds       |
| `--white-muted`  | `rgba(255,255,255,0.5)` | Secondary text    |

### Tailwind v4 Theme
This project uses **Tailwind v4** — there is **no `tailwind.config.ts`**. Brand tokens and reusable animations live in `src/app/globals.css` under `@theme inline`:
```css
@theme inline {
  --color-brand-teal: #28b8aa;
  --color-brand-teal-light: #3cd0c2;
  /* ...etc */
  --animate-ls-flash: lsFlash 520ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```
Add new colors or animations there. **Do not** create a `tailwind.config.ts`.

### Typography
- Headings: Montserrat 600–700
- Body: Montserrat 300–400
- Tagline: italic, 300, letter-spacing 3–4px

### Logo
Two overlapping teal rings. Right ring overlaps in front of left. Crescent of left ring visible through right ring's inner hole. SVG only. Never stretch or recolor.

### Design Tone
Dark navy/teal backgrounds. Glowing teal accents. Subtle particle effects and light streaks in hero sections. Modern, clean, professional.

---

## Architecture Patterns (established conventions)

These patterns are already in use — match them when adding new code.

### Client-island pattern (`LoaderGate`)
When a page needs interactivity in only one spot, keep `page.tsx` as a Server Component and isolate the client tree behind a small `*Gate` wrapper.
```tsx
// src/app/page.tsx — Server Component
export default function Home() {
  return (<><LandingPage /><LoaderGate /></>);
}
// LoaderGate.tsx — 'use client', owns the show/hide state only
```

### Feature folder pattern
A feature is a folder under `components/features/` containing:
- the page-level composer (`LandingPage.tsx`, `LoadingScreen.tsx`) — under 80 lines, only composes
- atomic section components (`Hero`, `Description`, `BulletList`, `ComingSoon`) — 15–40 lines each
- per-feature visual sub-components when needed (`BurstEffects`, `Particles`, `Streaks`, `Shockwaves`)

### Hook responsibilities
- **State machine hooks** (`useLoadingPhases`): own phase transitions and their timers. Return `{ phase, fadeOut }`.
- **Animation hooks** (`useCoreAnimation`): own RAF loops, ref mutations, easing. Return refs + accept an `onComplete` callback.
- **Lifecycle hooks** (`useEnterTransition`): one purpose, parameterized.
- Hooks must clean up: `clearTimeout`, `cancelAnimationFrame`, remove listeners.

### Deterministic generators (SSR-safe)
Any "random" visual data (particle positions, streak angles) **must** be deterministic — server and client must produce identical output to avoid hydration mismatches. Use the seeded PRNG pattern in `services/burst.ts` (mulberry32). **Never** call `Math.random()` at module scope or during render.

### Animations
- Keyframes live in `globals.css`. Reference them by class (`.ls-particle`, `.ls-shockwave`) or via the `--animate-*` tokens.
- Per-instance dynamic values (delays, angles, sizes) pass through CSS custom properties (`--tx`, `--ty`, `--angle`) set inline via `style` — this is the **only** legitimate use of inline `style` in JSX.
- Respect `prefers-reduced-motion` (already wired in `globals.css`).

---

## Code Architecture

### Single Responsibility
One concern per component/function. If there are two reasons to change it, split it.

### No Side Effects in Pure Functions
Functions return values. Side effects belong in their own explicit function.

### Named Constants
No magic numbers/strings. Define in `constants/` or at file top.
```
BAD:  if (age <= 25)
GOOD: if (age <= YOUNG_DRIVER_AGE_LIMIT)
```

### Guard Clauses, Not Nested Ifs
Max 2 levels of if/else. Early returns.
```
BAD:  if (x) { if (y) { if (z) { ... } } }
GOOD: if (!x) return; if (!y) return; if (!z) return; ...
```

### Composition over Inheritance
Max 2 levels of inheritance. Prefer composition and interfaces.

### Minimal Coupling
Use dependency injection. Define interfaces for abstractions. No two names pointing to the same mutable data.

### Refactor Smells
- Large classes → split by responsibility
- Long functions → extract focused sub-functions
- Duplicated code → shared utility
- Vague names → rename descriptively
- Unused code → delete (git has history)

---

## React

### File Layout
1. Imports (external first, then internal)
2. Types/Interfaces
3. Constants
4. Component
5. Export

### Components
- Functional only. No classes.
- One per file. Filename = component name.
- Destructure props in the signature.
- `Props` interface named `ComponentNameProps`.

```tsx
// GOOD
function Card({ title, description }: CardProps) {
  return (
    <div className="rounded-lg bg-brand-dark-bg p-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-white/50">{description}</p>
    </div>
  );
}
```

### Hooks
- Custom hooks for reusable logic. Prefix `use`.
- One hook, one job.
- Never call hooks conditionally.
- Complete `useEffect` dependency arrays.
- Clean up listeners, intervals, subscriptions.

```tsx
// GOOD: logic extracted
function Dashboard() {
  const { users, loading, error } = useUsers();
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <UserList users={users} />;
}
```

### State
- `useState` for simple local state.
- `useReducer` for complex multi-value state.
- Lift state only as high as needed.
- Avoid prop drilling >2 levels — use context or composition.
- Never store derived data; compute it.

### Handlers & Keys
- Handlers: `handleClick`, `handleSubmit`. Props callbacks: `onClick`, `onSubmit`.
- Don't define functions inside JSX.
- Stable unique keys for lists. Never array index if list can reorder.

### Conditional Rendering
- Early return for loading/error.
- Ternary for simple in-JSX conditions.
- `&&` only with guaranteed-boolean values:
```tsx
{count > 0 && <Badge count={count} />}  // not {count && ...}
```

---

## Next.js (App Router)

- Use `app/`, not `pages/`.
- Each route is a folder with `page.tsx`. Shared UI in `layout.tsx`. Loading in `loading.tsx`. Errors in `error.tsx`.
- Default to Server Components. Add `'use client'` only when required, and as low in the tree as possible.
- Fetch data in Server Components with async/await. API routes go in `app/api/`. Never fetch initial page data in `useEffect`.
- `next/image` for all images (define `width`/`height` or `fill` with sized container). `next/link` for all internal navigation.
- Define metadata via the `metadata` export.
- Public env vars: `NEXT_PUBLIC_*`. Server-only: never accessed in client components.

---

## Tailwind (v4)

- Brand tokens only (`bg-brand-teal`, etc.). No arbitrary hex in className. If a color appears 2+ times, add it under `@theme inline` in `globals.css`.
- Class order: layout → sizing → spacing → typography → visual → interactive.
- Mobile-first. Test at 320, 768, 1024, 1440.
- If the same class combo appears 3+ times, extract a component (don't `@apply`).
- `@apply` only in global CSS for base elements (body, headings).
- Dark-first; use `dark:` only if a light variant exists.
- **No `tailwind.config.ts`** — this is Tailwind v4. Define colors/animations under `@theme inline { ... }` in `globals.css`.
- **No inline `<style>` blocks in JSX.** All keyframes and component-scoped CSS live in `globals.css`. The only legitimate `style={{...}}` use is passing per-instance dynamic values (e.g., CSS variables `--tx`, `--ty`).

---

## TypeScript

- Strict mode. No `any` — use `unknown` and narrow.
- Interfaces for all props, API responses, data shapes.
- Prefer union types over enums: `type Status = 'idle' | 'loading' | 'error'`.
- No `!` non-null assertions. Handle null/undefined properly.
- Infer where obvious; annotate where it adds clarity.

---

## Validation & Error Handling

- All form/API input goes through Zod schemas. Reject invalid input — never silently sanitize.
- Every `try` has a meaningful `catch`. Never swallow errors.
- Never expose credentials, env values, or stack traces in UI.
- Always check return codes and validate response shapes from external services.

---

## File & Folder Structure
```
src/
  app/                              # App Router pages & layouts
    layout.tsx
    page.tsx                        # Server Component
    globals.css                     # Tailwind v4 @theme + keyframes
  components/
    ui/                             # Atomic generic UI (BulletDot, Divider, BackgroundGlow)
    features/
      LoaderGate.tsx                # Pattern: client island wrapping a heavy client tree
      landing/                      # Feature folder: composed sections + page shell
      loading/                      # Feature folder: animated screen + atomic burst pieces
  hooks/                            # Reusable client hooks (useEnterTransition, useLoadingPhases, useCoreAnimation)
  services/                         # Pure functions, deterministic generators (burst.ts)
  constants/                        # Named constants by domain (landing.ts, loading.ts, motion.ts)
  types/                            # Shared types (loading.ts)
  utils/                            # Pure helpers (only when truly generic)
public/                             # SVG logos, static assets
```
One component per file. Filename = export name. **No barrel `index.ts`** (Next.js + Turbopack tree-shake direct imports better).

### Where new code goes
- New page section that's content-only → `components/features/<feature>/`.
- New animated piece (shockwave, particle variant, glow) → atomic component in `components/ui/` or `features/<feature>/`.
- New state machine, RAF loop, listener → custom hook in `hooks/`.
- New pure function (generators, math, formatters) → `services/` (if domain-specific) or `utils/` (if generic).
- New content string, timing, count, asset path → `constants/<domain>.ts`. Never hardcode in components.
- New shared shape → `types/<domain>.ts`.

---

## Git

- Imperative, short commit messages. `"Add login page"` not `"Added the login page component"`.
- One feature per branch. One concern per commit.
- Never commit: `.env`, `node_modules`, build output, `console.log` statements.

---

## Response Style

**Be minimal. No filler.**
- Confirm completed tasks in ≤5 words: `"Login page done."`
- No summaries unless asked. No "Here's what I did". No "Let me know if…".
- No markdown formatting in responses unless asked.
- Don't list files modified unless asked. Don't suggest next steps unless asked.
- Code comments only for non-obvious logic. No `// increment i`.
- Remove unused imports.

---

## When Stuck

- Ask one specific clarifying question rather than guessing.
- If two attempts fail, stop and surface the blocker before continuing.
- For UI work, manually verify in the browser — don't claim success based only on type-check.
