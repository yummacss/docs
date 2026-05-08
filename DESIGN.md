# Yumma UI — Design Guidelines

This document defines the exact design language, token usage, and component patterns for Yumma UI. Follow these rules precisely to produce consistent, professional components. When in doubt, look at the source files referenced throughout this document — they are the ground truth.

---

## Critical Rules (Never Break These)

1. **Yumma CSS only.** No Tailwind classes, no inline `style` attributes, no JSX globals. Every visual property must map to a Yumma CSS utility from `AGENTS.md`.
2. **No arbitrary values.** `w-[10px]` does not exist. Neither does `bg-[#f00]`. Use the scale.
3. **No decimal suffixes.** `w-1.5` is invalid. Round to `w-2`.
4. **Read the Base UI docs before building.** Every component marked `primitive: true` in `src/utils/ui-sidebar.ts` has a Base UI counterpart. Fetch `https://base-ui.com/react/components/{component-name}` to understand the full API before writing code. Do not guess props. Components that are NOT marked `primitive: true` (e.g. Badge) have no Base UI counterpart — do not fabricate one.
5. **Read `AGENTS.md` before using any utility.** It is the authoritative dictionary. If a utility is not listed there, it does not exist.
6. **Use Base UI components.** Do NOT use native HTML elements (like `<button>`, `<input>`) for interactive controls when a Base UI equivalent exists. Always prefer Base UI primitives to ensure accessibility and consistent API patterns.

---

## Typography

All text uses `fw-500` as the standard weight. There is no `fw-600` in Yumma UI.

| Role | Classes |
|---|---|
| Labels, item text, UI copy | `fs-sm fw-500` |
| Secondary / meta text | `fs-xs fw-400` or `fs-xs` (no explicit weight) |
| Dialog/panel titles | `fs-md fw-500` |
| Section headings inside content | `fs-sm fw-500` |
| Tiny caps label (e.g. menu group header) | `fs-xs fw-500 tt-u ls-3` |
| Captions / helper text | `fs-xs c-slate-6` or `fs-xs c-slate-8` |

---

## Color Usage

### Primary color
`bg-indigo` is the primary action color. Used on filled primary buttons, active tabs, checked checkboxes, active toggles, switch thumbtracks, progress bars, etc.

### Color scale rules
| Scale | When to use |
|---|---|
| `bg-indigo` | Primary filled state |
| `bg-indigo-1` | Soft/subtle tinted background (open accordion item, dialog header accent, chip background) |
| `bg-indigo-8` | Hover on filled indigo elements only (`h:bg-indigo-8`) |
| `c-indigo` | Indigo-colored text or icon on light background |
| `c-indigo-5` / `c-indigo-6` | Muted indigo icons in open/active states |
| `c-indigo-7` | Text inside indigo-tinted backgrounds |
| `bc-indigo` | Outlined button border |
| `bc-indigo-7` | Border on filled primary button |

### Neutral scale rules
| Class | When to use |
|---|---|
| `c-slate-10` | Primary text, labels, headings |
| `c-slate-8` | Secondary text, helper text |
| `c-slate-7` | Description text inside dialogs/panels |
| `c-slate-6` | Muted text, secondary handles, meta info |
| `c-slate-5` | Icon color inside menu/context menu items |
| `c-slate-4` | Chevron/arrow icons in collapsibles |
| `bg-silver-1` | Subtle hover background on items |
| `bg-silver-1/50` | Highlighted item state in menus, dropdowns, list items |
| `bg-silver-2` | Stronger hover, close button hover |
| `bg-silver-3` | Border on inputs, avatars, separators |
| `bc-silver-2` | Border on containers (dialogs, cards, popovers) |
| `bc-silver-3` | Border on inputs, avatars, form controls |

### Destructive / danger
| Class | When to use |
|---|---|
| `bg-red` | Filled danger button |
| `h:bg-red-8` | Hover on filled red button |
| `bc-red-7` | Border on filled red button |
| `c-red` | Danger text or icon |
| `bg-red-1/50` | Highlighted state for danger menu items |
| `fv:oc-red-6` | Focus ring on danger buttons |

---

## Border Radius Decision Tree

This is the single most important design rule. Never guess. Follow this exactly.

| Component type | Radius |
|---|---|
| **Floating panels** — `Component.Popup`, `Component.Panel` content, dropdowns, popovers, tooltips (large), modals | `br-xl` |
| **Triggers / inputs / buttons** that open a panel | `br-lg` |
| **Items inside a panel** (menu items, list items, combobox items) | `br-lg` |
| **Standard buttons** (primary, secondary, danger, ghost) | `br-md` |
| **Dialogs / modals** | `br-md` |
| **Inputs inside dialogs/forms** | `br-md` |
| **Checkbox / small controls** | `br-sm` |
| **Toolbar root, toggle group root, menubar root** | `br-lg` |
| **Toggle items inside toolbar/toggle group** | `br-md` |
| **Pill buttons** (small follow/CTA inside cards) | `br-pill` |
| **Avatar images** | `br-pill` |
| **Switch root** | `br-pill` |
| **Badges** | `br-sm` (base) or `br-pill` (pilled variant) |
| **Tooltip popup** | `br-sm` |
| **Collapsible bordered container** | `br-lg` (outer), `br-xl` (inner panel) |
| **Icon accent boxes** (small icon in dialog header) | `br-md` |

---

## Box Shadow Usage

Use `bs-o-xs` for small components. Never omit shadow on interactive controls — it adds depth and polish.

| Context | Shadow |
|---|---|
| Inputs, text fields, small triggers | `bs-o-xs` |
| Primary/danger buttons | `bs-o-md` |
| Secondary/outlined buttons | `bs-o-xs` |
| Floating panels (menus, dropdowns, popovers, dialogs) | `bs-o-lg` |
| Dialog/modal popup | `bs-o-lg` |
| Avatar (standard) | none |
| Switch thumb | `bs-o-sm` |
| Slider thumb | `bs-o-sm` |
| Small icon accent box in dialog | `bs-o-xs` |
| Badges | `bs-o-xs` (outline/base variant only, not soft) |

---

## Focus Visible (Accessibility)

Every interactive element MUST have focus-visible styles. 

### The Rule

**Default:** `fv:oo--1 fv:oc-{color}` (negative offset, inside border)

**Exception:** Buttons use `fv:oo-2 fv:oc-{color}` (outside border, looks better on buttons)

**Special case:** Checked checkboxes use `fv:oo-1` because without offset the indigo outline blends with the indigo background.

### Why No `fv:ow-2`?

Default `outline-width` is already 2px. Adding `fv:ow-2` explicitly is redundant.

### Examples

```
Standard (default):     fv:oo--1 fv:oc-indigo-5    (inputs, triggers, menu items)
Buttons:              fv:oo-2 fv:oc-indigo-5    (primary, secondary, danger buttons)
Danger buttons:        fv:oo-2 fv:oc-red-6
Accordion triggers:   fv:oo--1 fv:oc-indigo-5    (tighter offset for triggers)
Checked checkbox:    fv:oo-1 fv:oc-indigo-5    (needs offset from bg-indigo)
```

Never use `outline: none` without a visible replacement.

---

## Borders

All interactive form controls and containers use `bw-1` with an appropriate color.

| Context | Border |
|---|---|
| Inputs, selects, triggers | `bw-1 bc-silver-3` |
| Containers, cards, dialogs | `bw-1 bc-silver-2` |
| Avatar images | `bw-1 bc-white` (ALWAYS — prevents blending with background) |
| Primary filled button | `bw-1 bc-indigo-7` |
| Danger filled button | `bw-1 bc-red-7` |
| Outlined button | `bw-1 bc-indigo` |
| Secondary/ghost button | `bw-1 bc-silver-2` (secondary) or `bw-0` (ghost) |
| Separator (horizontal) | `h-px w-full bg-silver-2` |
| Separator (vertical) | `w-px h-5 bg-silver-3` |
| Divider inside dialog | `bc-silver-2 bbw-1` (empty div) |

---

## Interactive Item Highlight Pattern

This is the canonical pattern for ALL hoverable/highlightable items inside menus, dropdowns, autocompletes, comboboxes, context menus, select lists, etc.

```tsx
className={(state) =>
  `... br-lg mx-1 ${
    state.highlighted ? "bg-silver-1/50" : "bg-transparent"
  }`
}
```

- Always `br-lg` on items
- Always `mx-1` on items (inset from panel edge)
- Highlighted = `bg-silver-1/50` (not `bg-silver-1`)
- Not highlighted = `bg-transparent` (not `h:bg-silver-1`)
- For destructive items: `state.highlighted ? "bg-red-1/50" : "bg-transparent"`

---

## Hover States on Containers / Triggers

For triggers and container-level hover (not list items):

| Context | Hover |
|---|---|
| Secondary button / collapsible trigger | `h:bg-silver-1/50` |
| Ghost button | `h:bg-silver-2` |
| Menubar trigger (open state) | `bg-silver-1/50` |
| Collapsible bordered trigger | `h:bg-silver-1` |
| Navigation menu links | `h:bg-silver-1` |

---

## Transition Pattern for Buttons

All buttons that have visual transitions use this exact pattern:
```
tp-c tdu-150 ttf-io
```
That means `transition-property: color, background-color, border-color, ...` + `150ms` + `ease-in-out`.

---

## Animation (Framer Motion)

All animated floating elements use this entry/exit pattern:
```tsx
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.95 }}
transition={{ duration: 0.1, ease: "easeOut" }}
```

Panels that expand vertically (accordion, collapsible):
```tsx
animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
transition={{ duration: 0.2, ease: "easeOut" }}
className="d-b o-h"
```

Rotating chevrons:
```tsx
animate={{ rotate: isOpen ? 180 : 0 }}
transition={{ duration: 0.15, ease: "easeInOut" }}
```

Tooltips use a `y` offset:
```tsx
initial={{ opacity: 0, y: 4 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: 4 }}
transition={{ duration: 0.15, ease: "easeOut" }}
```

Switch thumb uses `x` translate:
```tsx
animate={{ x: checked ? 20 : 0 }}
transition={{ duration: 0.2, ease: "easeInOut" }}
```

### Static variant rule
Every component that uses `<AnimatePresence>` MUST have a `-static.tsx` sibling that removes all Framer Motion. In the static version:
- Replace `motion.div` with a plain `div`
- Remove `<AnimatePresence>`
- Remove `keepMounted` from portals (or keep it, but no animation)
- CSS-only rotation uses `ro-180` / `ro-0` classes
- The static description is always: **"No animation utilities or animation dependencies."**

**Static sections in docs must always appear LAST.** After showing all style and functional variants, place the Static variant as the final section. This follows the pattern: animated variants first, then CSS-only fallback last.

---

## Component File Structure Rules

### Required files
- `component-name-base.tsx` — mandatory, no description in docs
- `component-name-static.tsx` — required when `<AnimatePresence>` is used

### Registration
1. Create the file in `src/registry/ui/component-name.tsx`
2. Import and register in `src/registry/ui/index.tsx` under `baseComponents`
3. Remove `wip: true` from the component entry in `src/utils/ui-sidebar.ts` when at least one example is ready

### Section headings
Use single-word headings for docs sections (e.g., "Disabled" not "Disabled Item", "Open" not "Default Open"). Exception: when the Base UI prop requires two words (e.g., "Auto Highlight" for autocomplete), keep it as is.

### Naming convention for variants
When a variant name includes a feature name (e.g., "with icon"), use hyphen instead of hyphenated prefix. For example: `autocomplete-icon` instead of `autocomplete-with-icon`.

### Content themes
All component content MUST use the **SaaS / Project Management** domain only:
- Projects, tasks, boards, sprints
- Team members, roles, permissions
- Statuses, priorities, labels
- Billing, subscriptions, plans

Never use Social Media, E-commerce, or Music contexts. Never use generic Lorem Ipsum.

All components should consistently demonstrate SaaS/project management contexts across all variants.

---

## Avatar Rules

Avatars ALWAYS use `bw-1 bc-silver-3` to prevent blending with backgrounds.

### Avatar names
Use first names only. Never use full names or surnames (e.g., "Sarah" not "Sarah Chen").

### Canonical avatar list
Only use these names and seeds. Never invent new people.

```ts
const AVATARS = [
  { name: "Sarah",     avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9" },
  { name: "John",      avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2" },
  { name: "Noah",      avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Noah&backgroundColor=D0D1FB" },
  { name: "Melanie",   avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Melanie&backgroundColor=DCCEFC" },
  { name: "Riley",     avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Riley&backgroundColor=F4C8FA" },
  { name: "Adrian",    avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Adrian&backgroundColor=FFD4DE" },
  { name: "Jessica",   avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jessica&backgroundColor=DAF0B9" },
  { name: "Aiden",     avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Aiden&backgroundColor=B4E9F2" },
  { name: "Liam",      avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Liam&backgroundColor=D0D1FB" },
  { name: "Maria",     avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Maria&backgroundColor=DCCEFC" },
  { name: "Vivian",    avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Vivian&backgroundColor=F4C8FA" },
  { name: "Wyatt",     avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Wyatt&backgroundColor=FFD4DE" },
  { name: "Jade",      avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jade&backgroundColor=DAF0B9" },
  { name: "Nolan",     avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Nolan&backgroundColor=B4E9F2" },
  { name: "Sophia",    avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sophia&backgroundColor=D0D1FB" },
  { name: "Liliana",   avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Liliana&backgroundColor=DCCEFC" },
  { name: "Katherine", avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Katherine&backgroundColor=F4C8FA" },
  { name: "Aidan",     avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Aidan&backgroundColor=FFD4DE" },
  { name: "Jocelyn",   avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jocelyn&backgroundColor=DAF0B9" },
  { name: "Sadie",     avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sadie&backgroundColor=B4E9F2" },
];
```

### Canonical avatar component pattern
```tsx
<Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 bc-white br-pill bw-1 va-m us-none">
  <Avatar.Image src={user.avatar} alt={user.name} className="of-c w-full h-full" />
  <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-8 fs-xs">
    {user.name[0]}
  </Avatar.Fallback>
</Avatar.Root>
```

---

## Common Component Patterns

### Standard button (primary)
```tsx
<Button className="d-if ai-c px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5">
```

### Standard button (secondary)
```tsx
<Button className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5">
```

### Standard button (danger)
```tsx
<Button className="d-if ai-c px-3 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-red-6">
```

### Standard input
```tsx
<Input className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5" />
```

### Standard trigger (button that opens a panel)
```tsx
<Trigger className="d-f b-0 ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
```

### Floating panel popup
```tsx
<Popup className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg">
```

### Separator inside a panel
```tsx
<Separator className="my-1 w-full h-px bg-silver-2" />
```

### Vertical separator (toolbar)
```tsx
<Separator orientation="vertical" className="w-px h-5 bg-silver-3" />
```

### Form label
```tsx
<label className="c-slate-10 fs-sm fw-500">
```

### Field description / helper text
```tsx
<span className="c-slate-8 fs-xs">
```

### Small pill CTA (inside cards/collapsibles)
```tsx
<Button className="d-f ai-c jc-c h-7 px-3 bg-indigo h:bg-indigo-8 c-white br-pill fs-xs fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5">
  Follow
</Button>
```

### Dialog structure
```
Popup: o-h w-96 bg-white bc-silver-2 c-slate-12 br-md bw-1 bs-o-lg
  Header: d-f jc-sb ai-c px-4 py-2 bg-silver-1/50
    Title: fs-md fw-500
    Close button: d-f b-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-6 br-md h:bg-silver-2 fv:oo-2 fv:oc-indigo-5
  Divider: bc-silver-2 bbw-1 (empty div)
  [Optional accent header]: d-f ai-c g-3 px-4 py-3 bg-indigo-1/50
    Icon box: d-f ai-c jc-c fs-0 w-10 h-10 bg-white bc-silver-2 c-indigo br-md bw-1 bs-o-xs
  Body: px-4 py-5
  Footer: d-g gtc-2 g-3 px-4 py-3
```

### Menubar / toolbar container
```tsx
<Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
```

Menubar trigger buttons use `br-lg` and `h-8`. When open: `bg-silver-1/50`. When closed: `bg-transparent`.

### Toggle item inside toolbar/toggle group
```tsx
className={`d-f w-9 h-9 ai-c jc-c bw-0 br-md us-none c-p fv:oo--1 fv:oc-indigo-5 ${
  state.pressed ? "bg-indigo c-white" : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
}`}
```

### Checkbox (unchecked state includes shadow)
```tsx
state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
```

### Chip (multi-select)
```tsx
<Chip className="d-f ai-c g-1 px-2 py-0 h-6 bg-indigo-1 bc-indigo-2 c-indigo-7 bw-1 br-pill fs-xs fw-500">
```

---

## flex-grow vs flex usage

- `fg-1` = `flex-grow: 1` — use to make an element fill remaining space inside a flex row
- `f-1` through `f-6` = `flex: 1` through `flex: 6` — shorthand flex
- `fx-1` does NOT exist in Yumma CSS. Never use it.

---

## What NOT to Do

- Never use `style={{ ... }}` for any visual property
- Never use Tailwind classes (`rounded-md`, `text-sm`, `font-medium`, `bg-blue-500`, etc.)
- Never use `fw-600` — it does not exist in the current design system
- Never use `bg-silver-1` as highlighted state for list items — use `bg-silver-1/50`
- Never use `h:bg-silver-1` as the non-highlighted state for list items — use `bg-transparent`
- Never invent avatar names outside the approved list
- Never place content outside Social Media, SaaS/Project Management, E-commerce, or Music contexts
- Never fetch Base UI docs for components without `primitive: true` in `ui-sidebar.ts`
- Never fabricate a Base UI component that does not exist (e.g. `Badge`, `Breadcrumb` have no Base UI primitive)
- Never add `wip: true` to a component that has at least one working example
- Never use `bs-d` (dashed border) on elements other than placeholder/trigger zones
- **Never use custom SVGs.** Always use Gravity Icons (`@gravity-ui/icons`). Import icons as named imports (e.g., `import { PersonPlus } from "@gravity-ui/icons"`).
- **No external packages.** Only use Base UI (`@base-ui/react/*`), Framer Motion (`motion/react`), and Gravity Icons (`@gravity-ui/icons`). Never import `clsx`, `classnames`, `tailwind-merge`, or any other utility package. Use template literals for conditional classes.