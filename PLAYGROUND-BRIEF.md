# Yumma UI: component playground (layout F)

You are working in `yummacss/docs`. Next 16.3.1, App Router, MDX through
content-collections, Base UI 1.7, styled entirely with Yumma CSS v3 utility
classes. Read `AGENTS.md` first: this Next version has breaking changes and the
guides in `node_modules/next/dist/docs/` are the source of truth, not your
training data.

Work on a branch. Do not commit to `main`.

## What we are building

`/ui/components/button` becomes a live playground. The right rail stops being a
table of contents and becomes the component's controls. The props table is
deleted, because the controls already are the API.

A control row carries the prop's **name** (its label), its **type** (the widget:
a segment is an enum, a switch is a boolean, a field is a string), its
**default** (where the control sits before you touch it) and its **options**
(what the segment offers). The only thing a table adds is the **description**, so
the description moves onto the control row and opens on click.

Mockup, layout F, including the Dialog stress test:
https://claude.ai/code/artifact/73359fa8-51cd-445f-898a-ee6c72207516

## Five things that must not change

The last attempt at this broke the site's layout. These are the constraints.

1. **Only real Yumma CSS classes.** There are no arbitrary values and no
   Tailwind. `pnpm test` runs `tests/classes.test.ts`, which validates every
   class under `src/registry` through `@yummacss/canon` against a bare config,
   and `pnpm validate` checks the whole site. If a class you want does not
   exist, do not invent it. Use an inline `style` or restructure. A class that
   does not exist fails silently in the browser and loudly in CI.
2. **Keep the docs shell.** `src/app/ui/layout.tsx` grids as
   `d-g gtc-1 g-8 @lg:gtc-12`, with the sidebar at 3 columns, the article at
   `@lg:gc-s-6` and the rail at 3. Do not restyle the navbar, the sidebar or the
   page container.
3. **The page title and description stay where they are.** They are rendered in
   `src/app/ui/components/[slug]/page.tsx` inside the `data-meta` block, above
   the MDX, next to `Pagination`. Do not move them into the MDX, into the stage,
   or into the rail.
4. **Dark only.** Palette: page `#151724`, surface `#1a1d2e`, border `#232741`,
   accent `#bec6f2`, code `#dda2f6`. Use the existing `bg-page`, `bg-surface`,
   `bc-border`, `c-accent`, `c-code` classes. Headings are Esteban, body is iA
   Writer Quattro, code is the mono stack. Do not add a light theme.
5. **The copywriting tests are real.** `tests/copywriting.test.ts` bans em
   dashes, spaced hyphens used as dashes, contractions outside the blog, first
   person outside the blog, trailing whitespace and British spelling, requires
   `cannot` as one word, requires Title Case headings, and requires every page
   to carry a one-sentence description. This applies to any MDX you touch.

## The plumbing decision

`/ui/components/[slug]` serves both the schema-backed component pages
(`button`, `dialog`, ...) and the prose pages (`installation`, `customization`).
The prose pages still want a table of contents. The component pages want the
rail instead, and want the article to widen from 6 columns to 9.

Do this with a client shell rather than a second layout. A nested
`layout.tsx` under `[slug]` would nest inside `src/app/ui/layout.tsx`, not
replace it, so you would get the navbar twice.

Extract the grid out of `src/app/ui/layout.tsx` into a client component that
reads `usePathname`, looks the slug up in the `registryMeta` map exported from
`src/registry/index.ts`, and picks:

- slug has a meta schema: article `@lg:gc-s-9`, no `<TableOfContents />`
- slug has no meta schema: article `@lg:gc-s-6`, `<TableOfContents />` as today

Importing `registryMeta` client-side is cheap. It is a map of dynamic import
functions, so nothing is pulled in until a schema is actually requested.

Keep `Navbar` and `Sidebar` outside the client boundary.

## Do not lose the rail footer

`src/components/ui/toc.tsx` renders more than headings. Its footer carries
`EditPage`, `ViewMarkdown`, a `Separator`, and `ApiReference` when
`currentUI.primitive` is set, which is the link out to Base UI's own docs.
Every component page has `primitive: true` in its frontmatter, so these are
exactly the pages that would lose that link.

Move those three into the bottom of the controls rail. Deleting them is a
regression, not a simplification.

## The component

New client component, `src/components/component-playground.tsx`. It owns both
the stage and the rail, so no cross-tree state is needed: the rail is rendered
into the third grid column by the shell via a portal, or the playground renders
its own two-column grid inside the widened article. Prefer the second. It is
self-contained and it degrades to layout G on a phone by collapsing to one
column.

### State

Seed exactly the way `component-preview.tsx` already does:

```ts
const value = prop.example ?? prop.default;
if (value !== undefined) props[prop.name] = value;
```

Keep `resolveIcons` behavior for `exampleIcon` and `{ "$icon": "Star" }`
markers. Then render `<RegistryComponent {...values}>{meta.children}</...>`.

Add a reset control that returns every value to its seed.

### The snippet

Call `buildUsage(target.component, meta, values)` from `src/utils/snippet.ts` on
every change. **It already filters to props that differ from their default**, so
an untouched Button renders `<Button>Label</Button>` and grows as controls are
touched. That is the behavior that makes the snippet worth copying. Do not
write a second serializer.

`TokenBlock` and `Folded` live inside `component-preview.tsx` today. Extract
them into their own module and import from both places. Do not copy them.

The snippet sits directly under the stage, with the existing title bar and copy
button, so it is one glance from the preview.

### The controls

Map `RegistryProp.type` to a widget:

| type | widget |
| --- | --- |
| `enum`, 3 values or fewer | segmented buttons |
| `enum`, 4 or more | Base UI `Select` |
| `boolean` | Base UI `Switch` |
| `string` | Base UI text field |
| `number` | Base UI `NumberField` |
| `none` | no widget, see below |

Follow the Base UI import style already used in `src/registry/ui/*.tsx`.

### Props with no control

This is the part Button does not show you and the part most likely to be got
wrong. Across the 36 schemas in `src/registry/meta`, **80 of 406 props are
`type: "none"`**: callbacks, `ReactNode` slots, arrays of items. Button has
zero of them. Dialog has seven of nineteen. Popover has four.

If the table is deleted and the rail only lists controllable props, those 80
props stop being documented anywhere on the site.

So the rail lists every prop. A `type: "none"` prop keeps its row and its
click-to-open description, and shows `prop.typeName` where the widget would go,
dimmed and non-interactive. Put them under a `Not controllable` divider at the
bottom of the rail, in schema order within the group.

### Descriptions

`props-table.tsx` has a `describe()` helper that renders backticks as inline
`<code>`. Extract it and share it. The schema descriptions are written as
markdown with inline code and nothing else, deliberately, so that they stay
readable as prose in the JSON.

## MDX changes, Button only

In `src/content/ui/button.mdx`:

- `### Base` swaps `<ComponentPreview registryId="button" />` for
  `<ComponentPlayground registryId="button" />`
- delete `## API Reference` and its `<PropsTable registryId="button" />`
- delete the whole `## Group Examples` section and its four previews
  (`button-group`, `button-group-icon`, `button-group-pill`,
  `button-group-pill-label`). This is a deliberate cut.
- keep `## Installation`, `## Icon Examples` and `## More Examples` as ordinary
  `<ComponentPreview>` blocks

Leave `PropsTable` in the codebase and leave every other component page alone.
Button is the pilot. The other 35 migrate once this one is approved.

Deleting the `button-group*` previews from the MDX does not remove them from the
registry. `tests/registry.test.ts` checks the registry map against the files on
disk, not against the MDX, so the files stay.

## Order of work

Commit at each step. Small commits, because step 1 and step 2 should be
verifiable on their own.

1. Extract `TokenBlock` and `Folded` out of `component-preview.tsx`, and
   `describe()` out of `props-table.tsx`. No behavior change.
2. Add the client shell and the 6-versus-9 column branch. No playground yet, so
   the component pages simply lose their table of contents and widen.
3. Build `ComponentPlayground` and wire `button.mdx`.
4. Move `EditPage`, `ViewMarkdown` and `ApiReference` into the rail footer.

## Before you say it is done

```
pnpm lint
pnpm check-types
pnpm test
pnpm validate
```

All four must pass. Then load `/ui/components/button` and confirm:

- every one of the nine props has a control
- changing a control updates both the preview and the snippet
- an untouched Button reads `<Button>Label</Button>`
- clicking a prop name opens its description in place
- the copy button copies the whole snippet
- `/ui/components/installation` still has its table of contents and its
  6-column article
- the Edit, Markdown and Base UI links are still reachable from the component
  page
