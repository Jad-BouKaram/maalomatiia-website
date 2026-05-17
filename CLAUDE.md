# Maaloomatiia Academy
 
## Company Background
 
Regional technology and consulting company (part of MAGNOOS Information Systems / Midis Group). Focused on Enterprise Data Solutions: Data Management, Advanced Analytics, AI/ML, Data Governance, Big Data. Operates across MENA region (Lebanon, UAE, Saudi Arabia, Bahrain, Egypt, Jordan, Kuwait, Oman, Qatar). Tagline: **"Innovate. Enable. Elevate."**
 
## Brand & Design System
 
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
 
### Tailwind Config
Extend tailwind.config.ts with brand colors:
```js
colors: {
  brand: {
    teal: '#28b8aa',
    'teal-light': '#3cd0c2',
    'teal-dark': '#1a9a8c',
    'teal-deeper': '#127a6e',
    'dark-bg': '#0a2a3a',
    'dark-navy': '#060e14',
    'accent-glow': '#00ffe8',
  }
}
```
 
### Logo
Two overlapping teal rings. Right ring overlaps in front of left ring. Crescent of left ring visible through right ring's inner hole. Use SVG format. Never stretch or recolor.
 
### Typography
- Headings: `Montserrat`, weight 600-700
- Body: `Montserrat`, weight 300-400
- Tagline: italic, weight 300, letter-spacing 3-4px
### Design Tone
Dark tech aesthetic. Dark navy/teal backgrounds with glowing teal accents. Subtle particle effects and light streaks for hero sections. Modern, clean, professional.
 
---
 
## Code Architecture Rules (Reliable Programming)
 
### Fault Avoidance
 
**Single Responsibility Principle**
Every class/component handles ONE concern. If there are two reasons to change it, split it.
```
BAD:  UserProfile with fetchUser() + renderPDF()
GOOD: UserProfile + UserReportGenerator (separate classes)
```
 
**No Side Effects**
Functions return values. They do not mutate external state, write files, or call APIs unless that is their explicit single purpose.
 
**Named Constants**
No magic numbers or strings. Define all thresholds, limits, multipliers as named constants at the top of the file or in `constants/`.
```
BAD:  if (age <= 25)
GOOD: if (age <= YOUNG_DRIVER_AGE_LIMIT)
```
 
### Complexity Reduction
 
**No Deep Nesting**
Maximum 2 levels of if/else. Use early returns (guard clauses) instead.
```
BAD:  if (x) { if (y) { if (z) { ... } } }
GOOD: if (!x) return; if (!y) return; if (!z) return; ...
```
 
**No Deep Inheritance**
Max 2 levels. Prefer composition over inheritance. Use interfaces and abstract types.
 
**Avoid Threads/Parallelism**
Unless absolutely necessary. If needed, isolate concurrent logic into a dedicated module.
 
**Minimize Coupling**
Components should have minimal dependencies. Use dependency injection. Define interfaces for all abstractions.
 
**No Data Aliases**
One variable per data reference. No two names pointing to the same mutable data.
 
**Avoid Floating Point for Money/Precision**
Use integer math or dedicated decimal libraries.
 
### Input Validation
 
**Validate Every Input**
No user input goes unchecked. Define rules for every field:
- String inputs: min/max length, allowed characters, regex pattern
- Number inputs: min/max range, type coercion, sensibility checks
- Use built-in framework validators first, regex for custom patterns
**Reject, Don't Sanitize**
If input is invalid, reject it. Don't try to fix it silently.
 
### Failure Management
 
**Always Handle Exceptions**
Every try block has a meaningful catch. Never swallow errors silently.
 
**Fail Secure**
On failure: protect persistent data, allow user recovery, never expose credentials or sensitive state.
 
**External Service Calls**
Always check return codes. Validate response data with assertions. Never trust external data blindly.
 
**Auto-Save & Logging**
Implement auto-save at intervals. Log user actions since last save for crash recovery.
 
### Design Patterns
 
Use patterns to reduce complexity:
- **Factory** → creating object variants
- **Adapter** → matching incompatible interfaces
- **Facade** → single interface to a group of classes
- **Observer** → multiple views of same data, auto-update on change
- **State** → state machine behavior
- **Mediator** → reduce direct object-to-object coupling
### Refactoring
 
Refactor when you see these smells:
- Large classes → break into smaller single-responsibility classes
- Long functions → split into focused sub-functions
- Duplicated code → extract to shared utility
- Meaningless names → rename to be descriptive
- Unused code → delete it, git has history
---
 
## React Rules
 
### Component Structure
```tsx
// 1. Imports (external first, then internal)
// 2. Types/Interfaces
// 3. Constants
// 4. Component
// 5. Export
```
 
### Component Rules
- Functional components only. No class components.
- One component per file. File name = component name.
- Destructure props in function signature.
- Keep components under 150 lines. If longer, split.
- No business logic in components — extract to hooks or utils.
```tsx
// BAD
function Card(props: any) {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/api/data').then(r => r.json()).then(setData) }, []);
  return <div>{/* 200 lines of JSX */}</div>
}
 
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
 
### Hooks Rules
- Custom hooks for any reusable logic. Prefix with `use`.
- Keep hooks focused — one hook, one job.
- Never call hooks conditionally.
- Always include proper dependency arrays in useEffect.
- Clean up side effects (event listeners, intervals, subscriptions).
```tsx
// BAD: logic in component
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => { /* fetch logic */ }, []);
  // ... more logic
}
 
// GOOD: extracted to hook
function Dashboard() {
  const { users, loading, error } = useUsers();
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <UserList users={users} />;
}
```
 
### State Management
- useState for simple local state.
- useReducer for complex state with multiple related values.
- Lift state only as high as needed — no higher.
- Avoid prop drilling beyond 2 levels. Use context or composition.
- Never store derived data in state. Compute it.
```tsx
// BAD: derived state stored
const [items, setItems] = useState([]);
const [itemCount, setItemCount] = useState(0); // derived!
 
// GOOD: computed
const [items, setItems] = useState([]);
const itemCount = items.length;
```
 
### Event Handlers
- Name handlers with `handle` prefix: `handleClick`, `handleSubmit`.
- Props callbacks with `on` prefix: `onClick`, `onSubmit`.
- Never define functions inside JSX.
### Keys
- Always use stable, unique keys for lists. Never use array index as key if list can reorder.
### Conditional Rendering
- Use early return for loading/error states.
- Use ternary for simple conditions in JSX.
- Use `&&` only when falsy value is guaranteed boolean (not `0` or `""`).
```tsx
// BAD: 0 renders as "0"
{count && <Badge count={count} />}
 
// GOOD
{count > 0 && <Badge count={count} />}
```
 
---
 
## Next.js Rules
 
### App Router
- Use the `app/` directory (App Router), not `pages/`.
- Each route is a folder with `page.tsx`.
- Layouts go in `layout.tsx` — shared UI that doesn't re-render on navigation.
- Loading states in `loading.tsx`.
- Error boundaries in `error.tsx`.
### Server vs Client Components
- Default to Server Components. They are the default in App Router.
- Add `'use client'` only when the component needs: useState, useEffect, event handlers, browser APIs.
- Keep `'use client'` boundary as low as possible. Don't make a whole page client-side for one button.
```tsx
// BAD: entire page is client
'use client'
export default function Page() { /* everything */ }
 
// GOOD: only interactive part is client
// page.tsx (server)
export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>        {/* server rendered */}
      <InteractiveChart />       {/* client component */}
    </div>
  );
}
```
 
### Data Fetching
- Fetch data in Server Components directly (async/await).
- Use Route Handlers (`app/api/`) for API endpoints.
- Never fetch in useEffect for initial page data — use server-side fetching.
### Images
- Always use `next/image` for images. Never raw `<img>`.
- Define width and height or use `fill` with a sized container.
### Links
- Always use `next/link` for internal navigation. Never raw `<a>` for internal links.
### Metadata
- Define metadata in `page.tsx` or `layout.tsx` using the `metadata` export.
### Environment Variables
- Public variables: prefix with `NEXT_PUBLIC_`.
- Server-only variables: no prefix, never access in client components.
---
 
## Tailwind CSS Rules
 
### General
- Tailwind only. No CSS modules, no styled-components, no inline styles (except dynamic values that Tailwind can't handle like animations).
- Use brand color tokens defined in tailwind config: `bg-brand-teal`, `text-brand-accent-glow`, etc.
- Never use arbitrary hex values in className. If a color is used more than once, add it to the config.
### Class Order
Follow consistent order: layout → sizing → spacing → typography → visual → interactive.
```tsx
// Consistent order
className="flex items-center w-full px-4 py-2 text-sm font-medium text-white bg-brand-teal rounded-lg hover:bg-brand-teal-dark transition-colors"
```
 
### Responsive Design
- Mobile-first. Default styles for mobile, then `sm:`, `md:`, `lg:`, `xl:`.
- Test at 320px, 768px, 1024px, 1440px minimum.
### Reusable Patterns
- If the same Tailwind class combination appears 3+ times, extract to a component — not to @apply.
- `@apply` only in global CSS for base element styles (e.g., body, headings).
### Dark Mode
- The app is dark by default. Design dark-first.
- Use `dark:` prefix only if a light mode variant exists.
### Spacing & Sizing
- Use Tailwind spacing scale consistently. Don't mix `p-3` and `p-[13px]`.
- Arbitrary values only when the design system requires a specific pixel value.
### Animations
- Use Tailwind `transition-*` and `duration-*` for simple transitions.
- Custom keyframe animations go in tailwind config `extend.keyframes` and `extend.animation`.
- No inline `@keyframes` in JSX unless truly one-off.
```js
// tailwind.config.ts
extend: {
  keyframes: {
    shimmer: {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
  },
  animation: {
    shimmer: 'shimmer 4s ease infinite',
  },
}
```
 
---
 
## TypeScript Rules
 
- Strict mode enabled. No `any` type — ever. Use `unknown` and narrow.
- Define interfaces for all props, API responses, and data shapes.
- Props interfaces named `ComponentNameProps`.
- Use type inference where possible. Don't annotate the obvious.
- Enums only when needed. Prefer union types: `type Status = 'idle' | 'loading' | 'error'`.
- No non-null assertions (`!`). Handle null/undefined properly.
```tsx
// BAD
const data: any = await fetch('/api').then(r => r.json());
 
// GOOD
interface User { id: string; name: string; email: string; }
const data: User = await fetch('/api').then(r => r.json());
```
 
---
 
## File & Folder Structure
 
```
src/
  app/              # Next.js App Router pages & layouts
    (routes)/       # Route groups
    api/            # Route handlers
    layout.tsx      # Root layout
    page.tsx        # Home page
  components/
    ui/             # Generic reusable UI (Button, Card, Modal)
    features/       # Feature-specific components (LoginForm, Dashboard)
  hooks/            # Custom React hooks
  services/         # API calls, external service wrappers
  utils/            # Pure helper functions
  constants/        # Named constants, config values
  types/            # Shared TypeScript types/interfaces
public/
  images/           # Static images, logo SVGs
  fonts/            # Self-hosted fonts
```
 
One component per file. File name matches export name. No barrel exports (`index.ts` re-exports) unless the folder has 5+ files.
 
---
 
## Git Rules
 
- Commit messages: imperative, short. `"Add login page"` not `"Added the login page component"`
- One feature per branch. One concern per commit.
- Never commit: `.env`, `node_modules`, build output, console.logs.
---
 
## Token & Response Rules
 
**Be minimal. No filler.**
 
- After completing a task: confirm in ≤5 words. Example: `"Login page done."`, `"Component created."`, `"Bug fixed."`
- No summaries of what was done unless asked
- No "Here's what I did" paragraphs
- No "Let me know if you need anything else"
- No repeating back the requirements
- No explaining obvious code with comments unless logic is non-trivial
- No markdown formatting in responses unless asked
- Do not list files created/modified unless asked
- Do not suggest next steps unless asked
**Code comments:** only for non-obvious logic. No `// increment i` style comments.
 
**Imports:** keep minimal. Remove unused imports.
 
**Console logs:** remove before commit. Use proper error handling instead.
 
---
 
## Tech Stack
 
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS (brand color tokens)
- **Components:** React functional components + hooks only
- **Images:** next/image
- **Fonts:** next/font with Montserrat
- **State:** React state (useState, useReducer). No external state library unless justified.
- **Validation:** Zod for form/API validation
## Commands
 
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — linting
---
 
## Summary
 
Write clean code. One responsibility per unit. Validate inputs. Handle failures. Server components by default. Tailwind only. TypeScript strict. Keep responses short. Use the brand colors. No spaghetti.