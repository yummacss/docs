# Working notes

What is true now: conventions, traps and decisions. **Not a session log and not
a history**: finished work lives in git, the PRs and the CHANGELOG. An entry
earns its place if it changes what someone does next. Delete it when it stops
being true, and check the file it describes before acting on it.

`TODO.md` is the list of planned work. The writing rules live in `AGENTS.md`.

---

## Where things stand

Checked 2026-10-06.

| repo | `main` | published |
| --- | --- | --- |
| `yummacss` | `4.5.0` | `yummacss`, `@yummacss/core`, `nitro`, `lint`, `postcss`, `vite`: six packages |
| `yummaui` | `0.4.0` | `yummaui` |
| `docs` | on `4.3.0` | yummacss.com |

The playground (play.yummacss.com and `yummacss/play`) is retired.
`@yummacss/cdn` is unpublished; `@yummacss/intellisense` is deprecated at
`4.2.1`. Both left with 4.2.2.

**`docs` opens its own Yumma CSS PR.** `yummacss.yml` runs daily and on
demand: `pnpm upd`, the type check and tests against the new version, then a
PR named after it, which it merges itself. Dependabot keeps `web-features` and the
actions current.

`yummaui` is a **separate repo**, `github.com/yummacss/yummaui`. **`repository.url`
must name the repo, and a redirect does not count**: the publish workflow fails
the release when the two differ.

## Open

Everything open that `TODO.md` does not hold. Delete a line when it is done.

**Unmerged work**

- `feat/reset-layer` in `docs` and `yummacss`: the cascade layer work, on hold
  with its TODO entry.
- Rejected, kept for reference: `yummacss` `feat/oklab-shades` (see Rejected)
  and `docs` `feat/customize-drawer`.

**In code**

- `merge` (`yummacss/packages/cli/src/merge.ts`) expands only the logical
  shorthands, so `pt:2 p:4` keeps both. It fails safe. The fix expands
  `padding`, `margin`, `border-width`, `border-color` and `border-radius` to
  their physical edges too, but not `padding-inline` or `padding-block`, which
  depend on the writing mode.
- `merge`'s `ClassValue` rejects the `0` that `count && "ml:6"` can produce.
  Widen it to `string | number | boolean | null | undefined`.
- Meter and Tabs take an `icon` the rail cannot show: neither schema has an
  `exampleIcon`. Badge and Separator do.
- Doc comments in `badge.tsx` and `meter.tsx` spell sizes in the 3.x dash
  syntax (`w-3 h-3`).
- `@vercel/analytics` and `@vercel/speed-insights` request their scripts on
  every page, and the project has no Web Analytics enabled, so both may 404 in
  production. Enable them or drop the packages.

**Parked with Yumma UI** (see "Yumma UI parked, AI first")

- The dark theme across every component, and the colour palette update after
  it.
- Styles phase five: Minimal's filled fields and Elegant's serif.
- One breaking registry release: `public/ui/r` to `public/ui/registry` with a
  redirect (installs store the absolute URL), `registryDependencies` to
  `registryDeps`, the empty `blocks` key, and 16 `example` entries nothing can
  reach.

**Waiting on Renildo**

- Cascade layers (`TODO.md`).
- Bounded or unbounded scale (see "The 0-384 scale").
- The landing page.
- Branch cleanup: about 150 merged branches in `docs`, 45 in `yummacss` and 8
  in `yummaui`.

## Before you change anything

Run `pnpm vitest run`, `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build`
before believing a change works.

- **`pnpm build` prints "Compiled successfully" and *then* the type errors.**
  Run `tsc --noEmit`.
- **Base UI prop names and defaults are not guessable.** Read the `.d.ts` in
  `node_modules`. `ToggleGroup` takes `multiple`, and it defaults to **false**.
- **Do not rewrite a file's line endings.** Several are CRLF; a Python
  `open(p, "w").write(...)` turns a one-line change into a whole-file diff.
- **Regenerate after touching `src/registry/`**: `node
  scripts/generate-registry.mjs`, then `generate-registry-json.mjs`.
- **Biome formats generated JSON too.** Run `pnpm exec biome check --write` on
  it, or `pnpm lint` fails on format alone.

---

## The playground

Shipped across #108, #129 and #130. **This reverses the 2026-08-03 "do not
rebuild the `/ui` playground" ruling**, which was written after a Dimsum-style
stage was built and reverted the same day. The old objection was that a gallery
should show 27 finished previews in one flick rather than ask the reader to
operate one control panel. What changed: the playground is now the *page*, not a
replacement for the gallery, and Renildo asked for it directly. Do not resurrect
the revert note; do not re-propose the reverted design either.

Everything lives under `src/components/playground/` unless noted.

| File | Role |
| --- | --- |
| `context.tsx` | `PlaygroundProvider` keyed by slug. Holds `meta` + `values`, seeds from the schema, auto-satisfies `dependsOn` in `setValue`. |
| `stage.tsx` | `ComponentPlayground`, rendered by the UI shell, not the page, so it stays mounted across pages. The MDX tag renders nothing and stays for the Markdown export. |
| `rail.tsx` | The right column: Look (`style`, `radius`, `accent`) as rows, then the Component API, with the props it cannot set folded under "N more, set in code". |
| `control.tsx` | One widget per prop. Enum -> select, boolean/icon slot -> `Toggle`. |
| `../preview-frame.tsx` | The iframe. Exports `usePreviewContainer()` for portal targets. |
| `../../utils/demo.tsx` | `EXAMPLE_ICONS`, `exampleIcon`, `resolveIcons`, `seedValues`. |
| `../../utils/props.ts` | `typeOf`, `isControllable`. |
| `../../utils/snippet.ts` | `buildUsage`, `tokensToText`, `TOKEN_COLORS`. |

The provider lives in the layout, but **layouts do not re-render on navigation
in this Next**, so the slug comes from `usePathname` in a Client Component. Same
trick in `token-block.tsx` to find the current page's `primitive`.

**No flash between pages.** Measured on a production build, 2026-09-27: a
page change used to empty the rail, drop the stage to a spinner and recreate
the preview frame, three swaps in 50ms; a hard load sent neither the stage
nor the rail's rows, which arrived 500ms later. Four changes, one swap left:

- The schemas are imported eagerly (`scripts/generate-registry.mjs`), so the
  context reads one synchronously and never empties.
- Reading the address bails the playground out of server rendering. The
  Suspense fallback is `StaticPlayground`: the same page at its defaults, so
  the server renders the stage, the Code tab and the rail.
- The shell renders the stage, so the preview frame survives navigation.
- A component already loaded swaps in during render, and the previous and
  next components are loaded ahead.

333 of 407 props across 36 schemas are controllable (82%); no component has zero.

### Icons at 16px

Site icons are Phosphor **regular**, 2026-09-27. Duotone read soft at 16px,
and the cause is the art, not where the icon lands.

- **Position does not matter in Chrome.** It snaps an SVG to the pixel grid:
  the code block's Copy icon scored the same at y .25, .50 and .63 and moved
  by layout to a whole pixel (31% of its painted pixels partly covered). A
  `translate` nudge made it worse (72%), since a transform resamples.
  `will-change` changed nothing. The `h:5` on Edit page and View markdown
  centres their icons on a whole pixel, which may help another engine.
- **The weight does.** Eight site icons at 16px on the page background, share
  of painted pixels partly covered: Phosphor regular 63%, bold 66%, duotone
  79%, light 84%; Solar bold-duotone 71%, outline 82%, linear 87%. Regular's
  1px strokes fall on the grid; duotone's 20% fill blurs every edge. On the
  page, Copy went from 31% to 0%.
- `src/icons.tsx` is the one place site icons come from. The registry's
  Solar icons are a separate choice, see "Solar icons in the registry".

### Settled design, do not re-litigate

Each of these was asked for explicitly and at least one was lost once in a merge
and had to be restored.

- **Look, then the Component API**, Renildo's pick from the rail rework
  mockups, round 2, option 3 (2026-09-27). Look is three rows that read like
  props: a select, a stepper that stops at the style's range, and a select
  whose options are three shades (light, base, dark) of each family. The
  props the rail cannot set fold under "N more, set in code"; the
  style-owned ones and the blocked-radius reasons are not shown.
- **No copy button of its own.** The stage's code tabs copy through the code
  block's button. Copy component, which fetched the styled file from
  `/ui/r/<style>-<radius>/<id>.json`, went with the editor stage on
  2026-09-28; `addCommand` and `styleFlags` have no caller.
- **The rail stays.** No way to hide it at `@lg:`. Below it, the stage is
  fixed under the navbar at 45dvh and the page starts beneath it, so the
  controls scroll under the preview.
- **Every enum is a select**, however few values. Segmented controls wrapped in a
  three-column rail and broke the shared right edge.
- **Switches, not checkboxes.** Docs palette (`bg-accent-dim` on, `bg-border`
  off, `bg-page` thumb), square corners, geometry borrowed from Yumma UI's `sm`
  switch (`px-1` track, thumb `ml-0` to `ml-2`). The library's own `bg-indigo` on
  white does not belong in the rail.
- **No rounded corners anywhere.** See the sharp-angles rule below.
- **No reset button.** Leaving the page and coming back reseeds.
- **No copy button on the playground snippet.** The title bar carries Install and
  the Base UI link instead.
- **Install sits beside the pagination arrows** in the page header
  (`prominent`), and again in the snippet title bar.
- **`iconSide` fills its own icon.** Picking a side puts an icon there rather
  than doing nothing until one is toggled on. That is what `dependsOn` is for.
- **Read-only labels use existing text colors.** No new greys.
- **The preview does not stretch to fill the space under the code block.** Tried
  it, looked wrong, reverted.
- Base previews only in MDX. The playground does the transformation work.

---

## Yumma UI: architecture and conventions

Read before proposing a change to where things live or how a prop is shaped.

**Queued renames and additions, not yet done.** All three are breaking for
someone: do them together, in one release.

- [ ] `public/ui/r` to `public/ui/registry`. Old path needs a redirect - a
      published `yummaui.json` pins `registry` as an absolute URL, so every
      existing install points at `/ui/r`.
- [ ] `registryDependencies` to `registryDeps`, in the generator, the JSON, and
      `ui/src/registry.ts`. A CLI reading the new field cannot read old JSON, so
      the field ships in both shapes for one version or the CLI floor moves.
- [x] OTP Field ships, `src/registry/ui/otp-field.tsx`.

**The registry stays in `docs`, at `src/registry/`.** Served as static JSON from
`public/ui/r/`, generated at build time by `scripts/generate-registry-json.mjs`
(gitignored output). The CLI **fetches it over HTTP** and imports nothing. Six
things in `docs` need those files on disk: the `yumma.config.mjs` source glob
(CSS generation), `src/registry/index.ts`'s dynamic import map (bundling),
`rehype-registry.mjs`, both generators, and `tests/classes.test.ts`. Moving the
registry to `ui` optimises for the consumer that does not need it. shadcn keeps
its registry in the docs site with the CLI separate over HTTP, which is the shape
we already have. **If one repo is ever wanted, bring the CLI into `docs` as a
package; never move the registry out.**

**Yumma UI must never ship CSS.** Components are styled with utilities the
*consumer's own* Yumma CSS build generates. This makes
copy-source-not-a-dependency **load-bearing, not philosophical**:
`yummaui add button` writes the file into their project, so their scanner sees it
and generates exactly those utilities. As an installed dependency the classes
would sit unscanned in `node_modules` and nothing would be styled. The only "fix"
would be shipping prebuilt CSS, which duplicates the stylesheet and defeats the
premise. The launch post commits to this in print under a "Not a Dependency"
heading.

**Nothing in the registry imports anything local.** That property is what makes
`yummaui add autocomplete-inset` write one file that just works. Shared fixture
files were considered and rejected on those grounds (137 registry files declare
their own const array, 56 use dicebear across 283 lines) - revisit only with
`registryDependencies` wired through, and even then ask whether fixture data
belongs in someone else's project.

### The CLI surface

Source of truth is `ui/src/cli.ts` and `ui/src/commands/add.ts`. **This section
exists because it did not**: in 2026-08 the docs printed install commands in a
form the CLI does not accept and 414 of 450 were broken.

```text
yummaui init                     write yummaui.json
yummaui add <component...>       copy components in
yummaui list [component]         browse what is available

  -v, --variant <name>   NOT IMPLEMENTED, see backlog
      --overwrite        replace existing files
  -y, --yes              skip prompts
```

`index.json` also carries `theme`: the states and keyframes the components use,
copied from this site's `yumma.config.mjs`. `yummaui` writes them into the
config it creates and names any an existing config lacks, so the list lives in
one place.

`add` resolves its argument against `index.components[].component` in
`/ui/r/index.json`, which holds the **36 component names**, never the flat ids.
So `add button` works, `add button-pill` exits 1. The registry id is only how
registry *files* are keyed. That gap between "how files are keyed" and "what the
CLI addresses" is exactly what went wrong.

`scripts/lib/registry-ids.mjs` owns `splitId`, both generators import it, and
`generate-registry.mjs` emits a `registryTargets` map into `src/registry/index.ts`
so the browser can print a command that runs. **Duplicating that rule in a third
place is how it drifts again.** The check worth re-running after any registry
change replays the CLI's own lookup against every command the docs print:

```js
const entry = index.components.find((x) => x.component === target.component);
entry && (target.variant === "base" || entry.variants.includes(target.variant));
```

The usage snippet's `import Button from "@/components/ui/button";` assumes
`yummaui init`'s defaults (`ui/src/commands/init.ts`). **If those defaults
change, this string has to change with them** - it is the one place the docs
assume the CLI's config rather than reading it.

### Prop or compound part? Four fates, not two

Mask classNames, diff each variant against its base, and the line distance sorts
them:

1. **Prop** - styling only, or a fixed enumerable choice (0-3 lines).
2. **Compound part** - adds an element the consumer fills (6+ lines).
3. **Recipe** - a composition that stays in the docs and never becomes API.
4. **Separate component** - `avatar-stacked` maps over 5 members with overlap;
   that is `AvatarGroup`, not a variant.

Category 3 is the biggest lever and the easiest to miss.

**If an axis crosses with every other axis it must be a prop.** Badge has
`dot-pill`, `icon-pill`, `count-pill`, `close-pill`; `pill` multiplying against
everything is the tell.

**The test for keeping a recipe: is the difference in the props, or in the
structure?** Dialog kept 7 recipes because a dialog is a generic container and
the interesting thing is what you put inside it. Badge and Breadcrumb went to
zero because every variant was a prop combination. Menu's `menu-account`
collapsed despite looking bespoke, because its distinctiveness was entirely a
`trigger` ReactNode and per-item icons - both props.

### Standing prop rules

- **A state plus a message is one string prop.** `error?: string`,
  `success?: string`. Presence means "show this state, with this message". Not a
  `status` enum, not a compound part, not `<Field.Error>` in a copied file. The
  test for one prop or two: mutually exclusive alternatives (one prop, values
  swap) or genuinely two things sharing a visual pattern (two props). Error and
  success are the latter; `error` wins if both are set.
- **Item data has a fixed shape. The component does not go generic.** No render
  prop, no type parameter, no `itemToLabel`. **You own the file**, so data that
  does not fit is a five-line edit.
- **A menu genuinely *is* data**; a Collapsible's or Preview Card's panel is
  bespoke markup. That is the dividing line between a discriminated-union `items`
  prop and a `children` slot.
- **`shadow` is a prop everywhere**: `none | inset | outset` mapping to `""`,
  `bs-i-sm`, `bs-o-xs`.
- **Widen the component rather than leave a demo on `@base-ui/react`.** Standing
  rule from the demo-file import pass.
- Classes are plain object lookups, **not cva**. A copied component should not
  drag a class utility into someone's `package.json`.
- **Field does not wrap Autocomplete/Combobox/Checkbox.** They own their own
  label and description. Retrofitting Field as a universal wrapper was explicitly
  rejected; if revisited it is a deliberate breaking change, not a quiet refactor.
- **`Field.Label` auto-associates with `Field.Control`** through Base UI context.
  No `useId`/`htmlFor` bookkeeping.

### The schema

`src/registry/meta/<id>.json`, never exported from the component, because the
file is copied verbatim and metadata has no business shipping with it.
**One schema, four consumers:** the page's props table, the `.md` route, the
playground, and `yummaui add`. They cannot drift.

- `type` is `enum | boolean | string | number | none`. `none` plus `typeName`
  documents a `ReactNode` or `AutocompleteItem[]` that cannot have a control.
- `children` is a **top-level string field, sibling to `props`**, not a prop.
  Writing it as a prop silently renders empty. Absent means the component takes
  none and the snippet is written self-closing.
- `example` is a demo value, **not documentation**. `default` stays the truth the
  table reports. **Never give an `example` to a prop that is mutually exclusive
  with another** - the preview applies every example at once, which is how base
  Field once rendered a prefix and a suffix together.
- `exampleIcon` names an icon fixture for a `ReactNode` slot. `{ "$icon": "Star",
  "size": "w-4 h-4" }` is the array-shaped form, resolvable anywhere inside an
  example; the walk skips anything carrying `$$typeof`, because a React element
  is an object too. The icon map is **curated on purpose** - a dynamic
  `icons[name]` lookup would defeat tree-shaking and pull every glyph into the
  client bundle.
- `example: null` means the slot starts empty.
- `dependsOn` names the prop that must be filled for this one to do anything.
- `src/registry/index.ts` is **generated**. Type edits belong in
  `scripts/generate-registry.mjs`.

### Versioning

**One version number, on the CLI, and one changelog behind it.** The CLI is a
package at `0.3.0` with `CHANGELOG.md` in its own repo. The framework is a
package at `3.31.1` with its own. The registry is neither: `yummaui add` writes
a file into your repo and never touches it again, so there is no installed
version to compare against and nothing to publish an upgrade to.

**No Yumma UI `1.0`, and no changelog for the registry.** Renildo's call,
2026-09-14. A `1.0` would be a version number on the CLI, which is the part that
barely changes - almost everything lands in the registry, 110 commits against
`src/registry` including four global prop renames, and the CLI's version says
nothing about any of them. A second changelog was proposed and rejected on the
same day: **one changelog is enough, and it is the CLI's.**

**The consequence, accepted rather than solved:** somebody who ran
`yummaui add badge` before `color` became `intent` has a file the docs no longer
describe, and nothing tells them. Do not re-propose a registry changelog as the
fix. If this is ever worth solving it is a tool that compares their copy against
the registry, not another file to write by hand.

What carries forward from the old note is the trigger it named: **the thing that
forces a version decision is not a date and not a component count, it is the
first outside user filing an issue the schema cannot answer without a breaking
change.** Stay on patches until then.

---

## Docs site conventions

**Sharp angles only. No cards, no rails, no rounded corners, no framed images.**
`src/app`, `src/components` and `src/styles` contain **zero** `br-*` utilities
and zero `border-radius`; every route is plain typography grouped by whitespace.
**Run that grep before proposing any new
visual structure.** (The 1690 `br-*` uses all live in `src/registry`, including
384 `br-9999` across 149 files - if "sharp only" ever becomes a brand rule rather
than a page preference, that is where the decision lands, and it is a large job.)

**Palette:** page `#151724`, surface `#1a1d2e`, border `#232741`, accent
`#bec6f2`, accent-dim `#9aa5ef`, code `#dda2f6`, diff-add `#a8e1ad`, diff-remove
`#e1a8a8`. Eight semantic colours, no light/dark pairs, because the site is
single-scheme.

**Grid:** `d-g gtc-1 g-8 @lg:gtc-12`. Sidebar 3, content `@lg:gc-s-6`, rail 3.
The rail is about 15rem of content at 1440px.

**Every `oy-auto` gets `ob-c`.** `overscroll-behavior: contain` is what stops a
scroller handing the wheel to the page when it reaches its end. The left nav had
it; the other five scrollers on the site did not, which is why the chaining felt
random - it depended on what the pointer happened to be over. Measured on
`/docs/display`: wheeling a `<Reference>` filter list to its end threw the page
609px. The worst case was the mobile nav dialog (7936/720 on a phone), where the
page scrolls behind an open menu. `ob-c` is on all six now. **The registry
popups - `combobox`, `autocomplete`, `command-palette` - still lack it**; that is
a library change and needs the registry regenerated, so it was left alone.

**Containment is not the same as having something to scroll.** A scroller shorter
than its `max-height` is not a scroll container at all, so `overscroll-behavior`
does not apply and the wheel goes to the page - correct behaviour, not a bug. On
`/blog` the sidebar is 246px in an 820px column, so the empty space under it
scrolls the page. Nothing to fix; do not "fix" it by making the column a scroller.

**Fonts: Esteban for headings, iA Writer Quattro for body**, and there is an open
design decision here. Measured by rasterising text and counting ink pixels:

| Weight asked for | Ink pixels | Face actually used |
| --- | --- | --- |
| `fw-400` | 1654 | 400 |
| `fw-500` | 1654 | **400. Identical to regular** |
| `fw-600` | 2686 | 700 |
| `fw-700` | 2686 | 700 |

**`fw-500` is used 1144 times across `src` and renders exactly like `fw-400`**,
because Quattro has no 500 face and CSS weight matching resolves downward. That
is the flatness. To make emphasis visible it has to become `fw-600` (700 is the
only heavier face), but doing that across 1144 sites would make the whole site
noticeably bolder, so it probably wants to be selective: headings, nav active
states, table headers, labels, leaving body at 400. **Not done; needs a design
call.** Esteban ships 400 only, so display headings can never have weight
contrast without changing the face. Docs `h1` is `fs-4xl fw-400` = 36px on 54px
leading, loose for display type.

**Esteban only applies inside `<article>` or via `.ff-e`.** `globals.css` sets
`h1..h6` to `system-ui` and overrides only `article h1..h6, .ff-e`. Any new page
built from `<section>`/`<header>` gets system-ui headings silently.

**pnpm only.** Renildo's call, 2026-08-31, replacing the old two-tab rule:
every install or CLI command is a plain fence with the pnpm form, no
`<CodeGroup>` and no `title="pnpm"` label - a single tab labels nothing. `pnpm
add X -D`, `pnpm dlx X`. This holds in blog posts too, which is how the old rule
worked.
**`pnpx` DOES exist and the old note here was wrong.** Checked on pnpm 10.33:
`bin/pnpx.cjs` is four lines that splice `dlx` into argv and call pnpm, it is
shipped with pnpm, and it prints no deprecation warning. The five uses in
`yummacss-3.0.0.mdx` all ran fine. They were still changed to `pnpm dlx`,
because that is the form pnpm's own `--help` prints as canonical - a style
call, not a correctness one. **Do not repeat the claim that it does not
exist.**
**A CI example needs `pnpm/action-setup@v6` before `pnpm install`**, or the
snippet is broken for whoever copies it. `npm install` needed no setup step, so
this is not a find-and-replace.
**`playground/install.tsx` keeps every manager and is not part of this** - it is
a product feature handing a reader the command for the manager they use, not a
terminal example.

**An example earns its place when it shows something the API table cannot say.**
The table is good at **enumerable** facts (`shape: rounded | square | squircle`
is fully communicated) and bad at **spatial or structural** ones (it says
Separator takes `icon?: ReactNode`; it never says the icon sits centred in the
rule). One rule producing both answers, which is why it is the right one: it
deletes `autocomplete-lg` and keeps `separator-icon` without special pleading.
Corollaries: **base demos show range, not minimum** (Rating's base should pass
`count` even though 5 is the default), and icon *placement* is spatial, so icon
examples stay.

**How the API table is actually read**, from watching a real user: scan the
**Prop** column for the name, then conditionally read **Type** for that one row.
Not top to bottom, not every column. This validates the existing
`Prop | Type | Default | Description` order rather than asking for a change.
Description stays - `shadow`'s "inset reads as a well, outset as a raised
control" is not recoverable from the type alone.

**`## API Reference` is never called "Props"** and was the final section of a
component page, after every example, because the page's job is to show what the
library can do to someone who has not committed yet. The playground rail has
since taken that job; the density complaint that prompted a redesign ("it's
throwing way too many info in less than 3s") is what the rail answers.

A page with a playground renders the rail in place of the TOC, so the rail ends
with the TOC's Edit page and View markdown links.

**The "Base UI primitive" sidebar link is a different thing from the page's own
API reference**: ours documents what Yumma UI adds, theirs documents the
primitive underneath, which is what you need the moment you edit the file you
copied. `primitive` in frontmatter accepts `true` **or an explicit Base UI slug
string**, because the names diverge (Textarea is Field's `render={<textarea />}`
and `base-ui.com/react/components/textarea` is a 404). Re-run the
frontmatter-against-imports check if a new component's primitive name diverges
from its `@base-ui/react/*` import.

**`scripts/check-sidebar.mjs` runs before `next build`.** Every content page must
appear in `sidebarConfig` exactly once. It parses only the `sidebarConfig`
object, so link lists elsewhere in that file are ignored - which is why the
`/llms.txt` sidebar link is defined as `docsLinks` instead. Six consumers assume
every `sidebarConfig` entry resolves to an `.mdx`.

**`mdxToMarkdown` must stay client-safe by construction.** `registry-source.ts`
and `resolveRegistryMeta` are **injected** into it rather than imported by it. A
`node:fs` reachable from `mdx-components.tsx` is the leak that took the
playground down and failed the first OOM fix. Same rule for the Shiki theme:
module import, never `readFileSync`.

**`mdxToMarkdown` parses with remark and prints with remark-stringify.** Each
component is swapped for Markdown; what we build ourselves (reference tables,
props tables, registry source) goes into the tree as a raw node, as written.
Parsing a built table only to print it back cost about a second on `margin`.
A `<Palette data={...}>` renders the colors it lists, not the current palette.

**Tests:** `tests/copywriting.test.ts` bans em dashes, contractions and first
person outside the blog, trailing whitespace, and British spelling; headings are
Title Case; descriptions are one sentence, 120 chars max, ending in punctuation.
`tests/content.test.ts` checks that a playground is flagged in frontmatter and
only exists where a schema backs it.

---

## Traps

The expensive ones, in rough order of how much time they have cost.

**Negative Values taught the 3.x syntax after 4.0 shipped.** The prose said
`(prefix)--(value)` and listed `m-`, `t-` & `zi--` while its own examples used
`ml:-4`, and `m--4` is refused by 4.x. Fixed 2026-09-26, with the utilities that
take a negative listed from `acceptsNegative` and a line on what is refused.

**Docs pages compared with past versions.** Renildo's rule, 2026-09-26: the
docs document the latest version only, so no page says what used to be true.
A sweep found five: Naming Convention (`tt-n` & `tl-a`), CDN (the runtime
rename), UI Customization (what `c:accent` used to do), Lint ("older
versions") and Negative Values. Configuration's `prefix` example also generated
nothing on 4.1.2 (`prefix: "ui"` with `ui-bg:red`), and its sample output was
3.x. The rule is in AGENTS.md.

**`src/registry/index.ts` drifted from its generator.** A comment sweep
stripped its "generated" header, and later hand edits (`min`, `max`, `step`,
`optional`, `handler`, `conflictsWith`, `controlled`) never reached
`scripts/generate-registry.mjs`, so running the script would have deleted
them. The script's template is now the committed file verbatim, plus a header
naming it; `pnpm generate:registry` changes nothing.

**A stacked PR can report itself merged and still never reach `main`.** Three
PRs each based on the one below it. The bottom two merged, which carried the
chain to `main`; the top one then merged into a base branch that had already
been folded in, so its commit landed on a branch nobody reads. GitHub said
merged, the work was not on `main`, and only `git cat-file -e origin/main:<file>`
showed it. Branch from `main`, target `main`.

**The session link in a PR body is appended server side.** Not by the model, and
`.claude/settings.json`'s `attribution.pr` does not reach it: that setting is
why the commits are clean while the bodies are not. Anything the GitHub
integration opens or edits gets it, and re-sending a body without it gets it
appended again. It comes off by hand, or wherever that integration is
configured.

**A published GitHub Release does not mean a published npm package.** `3.30.0`
was tagged and released on 2026-08-29 and the publish run **failed** the first
time: build
green, 150 tests green, tarball packed, provenance signed, then
`npm error 404 Not Found - PUT https://registry.npmjs.org/@yummacss%2fcore`.
**A 404 on `PUT` is npm's way of saying unauthorized** - it will not admit
whether a package exists to a caller that cannot write it - so the cause is the
`NPM_TOKEN` secret being expired, revoked, or lacking write access to the
`@yummacss` scope, not a missing package. It died on the first package, so
nothing partially published; all nine stayed on `3.29.2`, verified against the
registry. **The fix is two steps and both are needed**: a new token in repo
secrets, *then* re-run the failed run from the Actions page. Re-running alone
changes nothing, and a new token alone does not retry - the run reads the
secret at start. No new tag or release either way. That is what happened: a
fresh granular token, a re-run, and `3.30.0` went out.

**Always check the Actions run, not the releases page,
before believing a version shipped**, and `npm view <pkg> version` is the
cheapest confirmation.

**The npm token needs "Bypass 2FA" ticked, and that is the wrong long-term
answer.** 2FA demands a one-time password on publish and a runner cannot type
one, so without the bypass the workflow fails with `EOTP`. The token also needs
**Read and write** on the `@yummacss` scope *and* the unscoped `yummacss`
package - npm's default of `No access` produces the same 404 as an expired one.
**The secret lives in repository settings, not the organization**, at
`github.com/yummacss/yummacss/settings/secrets/actions`, and is named
`NPM_TOKEN` - edit that entry rather than adding a new one, because the workflow
reads it by name. GitHub's iOS app has no repo settings at all, so rotating a
token is a mobile-Safari job; re-running the workflow afterwards is in the app.

**The token rotated on 2026-08-29 expires 2026-11-27** (90 days, npm's
default), so this breaks again then unless Trusted Publishing lands first.
Settings that work: Read and write, All packages, plus Read and write on the
`yummacss` organization - the scoped packages are org-owned, so both sections
are needed.

**npm's own form now steers to Trusted Publishing instead**, which is the real
fix: OIDC, so npm trusts `publish.yml` in this repo directly and the runner
exchanges its GitHub identity for a short-lived credential. Nothing to expire,
nothing to leak, and 2FA stops mattering. `publish.yml` already has
`id-token: write` for provenance, which is the same permission. **Two things to
check before migrating**: whether `pnpm -r publish` supports OIDC at the pinned
pnpm (the feature is in the npm CLI; pnpm's support arrived separately), and
that it is configured **per package on npmjs, so eight times**. Do not block a
release on this migration - rotate the token, ship, migrate separately.

**GitHub's "Generate release notes" button does not write notes.** It lists the
pull requests merged since the last release, one line each with author and link,
plus a compare URL. No prose, no AI, and **commits pushed straight to `main` do
not appear at all** because it only sees PRs. For `3.30.0` it would have listed
five PRs, three of them the same `fix-scanner` branch merged three times, and
advertised `#10 feat: add the v4 migrate command` - which this release
deliberately does not ship. **Keep the CHANGELOG as the source of the notes.**
It is fine as an addition below them, and `.github/release.yml` can categorise
by label if that is ever wanted.

**Cutting a release is `pnpm bump <version>` then `pnpm release`.** `release`
reads the version out of `package.json`, extracts that section of
`CHANGELOG.md` verbatim, and drafts the GitHub Release whose Publish button
fires `publish.yml`. It refuses on anything upstream being wrong: not on
`main`, a dirty tree, `main` and `origin/main` disagreeing, a tag that already
exists, a missing or empty changelog section, or a `package.json` the bump
missed. With `gh` present it creates the draft; without it, it prints a
prefilled `releases/new` URL. **Nothing about the release is typed by hand.**


**Yumma CSS updates come from a workflow in this repo, not from the release or
Dependabot.** A dispatch from the release had four failure points and sat dead
for three months; Dependabot then stopped opening Yumma CSS PRs after 4.0 with
nothing to say so, while it still opened `web-features` ones. `yummacss.yml`
does the same job as a plain Actions run, so a failure is a red run in the
Actions tab. It reads the version from `node_modules/yummacss/package.json`,
because the package's `exports` do not include `./package.json`. A PR opened
with `GITHUB_TOKEN` starts no other workflow, so the same run merges it.


**"Is it in the repo" and "is it in the package" are different questions.**
Every package sets `files: ["dist"]`, so `src` never publishes, and the bundler
tree-shakes anything the entry does not reach. Unwiring `migrate` from `cli.ts`
took the whole command out of the tarball: 43170 bytes to 39703, with every
identifier gone. **Check the built artifact, not the source**, when the question
is what a user receives - `grep` the `dist` bundle, or diff its size both ways.


**A class can be canon-valid and still generate no CSS.** `c-slate-12` is a real
token in `@yummacss/core` (`#101316`) but nothing is emitted for it, so four
popups inherited the page's own white text and Onboarding's step icon rendered
white on white. `tests/classes.test.ts` will not catch this - it checks whether a
class is *canon*, which `c-slate-12` is. **`getComputedStyle` on the real element
is the only way to tell.** Same family as the two scanner bugs below.

**The scanner mangles multi-`${}` template literals.** `@yummacss/nitro`'s
build-time scanner silently drops or corrupts class names extracted from template
literals containing two or more `${}` interpolations, especially with nested
ternaries. Confirmed by calling `nitro.scan()` directly and inspecting the
returned `Set`: it contained garbage like `"className={\`d-f"` and `"o-60\""` -
fragments of surrounding syntax. **Fix: rewrite every dynamic className to
`[...].filter(Boolean).join(" ")` with zero backticks**, not fewer, all the way
to zero. A single-interpolation literal looked safe in isolation and was not once
the file had other backtick classNames nearby.

**Plain string literals were dropped too: quote-parity drift.** Fixed in nitro
2026-08-28; kept because it explains every odd scanner report before that date
and because the shape recurs. `tokenizer.ts` matched bare strings with
`/"([^"]+)"/g`. `[^"]+` is *one*-or-more, so an empty literal `""` could not
match; the regex backtracked and began its next match on the **second** quote of
that pair, capturing the code *between* strings from there on. Every later class
in the file was lost until another `""` re-synced it - which is why
`bc-accent-dim` survived while `bg-accent-dim` from the same literal did not,
and why "position in the file" and "a per-file cap" were correctly ruled out and
nothing replaced them. A regex literal or a quote inside a comment did the same.
**The bitter part: the prescribed fix for the template-literal bug above -
`[...].filter(Boolean).join(" ")` - is what introduces the `: ""` falsy branches
that cause this.** There were 75 in `src`.

`tokenizer.ts` is now a lexer: JS-family files by extension get a scanner that
tracks comments, escapes, template literals and regex literals, and everything
else gets a line-scoped pass, because `.mdx` is prose and an apostrophe must not
cost more than its line. **Two consequences worth remembering.** Class names in
comments are no longer collected, which is correct - `m-23` was generating a
real rule because a sentence explains the scale runs past it - so a class that
exists *only* in a comment will not generate. And `src/lib/code-decorate.mjs`
was always scannable; the older note claiming the glob was tried and did not
help was wrong. Line 43 is `const regex = /"([^"]+)"/g;`, three quotes, hiding
everything below it. The file contained the very pattern that hid it.

**If a component renders unstyled despite the class name looking correct, check
the built CSS for that literal before assuming the component is wrong**:
`grep -o "\.<class>{[^}]*}" .next/static/chunks/*.css` after a clean
`rm -rf .next && pnpm build`.

**Write probes to a `.mjs` file, never a bash heredoc.** Backslash mangling
between the heredoc and a JS regex has produced false "missing" results at least
three times, on classes that were present. `javascript_tool` against the live DOM
is better still - no shell in the path at all.

**A caller's `className` cannot reliably override a class the component already
sets** for the same property. Which one wins is decided by the generated
stylesheet's rule order, not by position in the `class` attribute. Confirmed:
`<Avatar className="bg-indigo-2">` against the component's own `bg-silver-1`
rendered silver; a `w-10` against its `w-12` rendered at 12. Yumma CSS has no
`!important` escape hatch. **When a recipe needs a real per-instance override,
that is a real prop, not a className string** (Avatar's `tint`, Skeleton's `size`,
Toggle's `swatchClassName`). `className` is still fine for anything the component
leaves unset.

**Canon is blind to class maps** - it reads `className` attributes, which is
useless for a prop-driven component where classes live in
`const SHAPES = { rounded: "br-lg", square: "br-none" }`. `br-none` does not
exist and canon reported clean. `tests/classes.test.ts` also scans string
literals inside `UPPER_SNAKE` class maps plus any multi-token string whose tokens
*all* look like classes. Valid `br-` values: `0, xs, sm, md, lg, xl, xxl, 3xl,
100%, 50%, 9999, px`. Opacity is percentage-based, so `o-1` means 1%, not 1.

**Two layout bugs, one shape: a box that cannot shrink.** Both fixed 2026-08-28,
kept because both will recur.

*Sticky clamps to its containing block.* The sidebar's scroller asks for
`calc(100dvh - 5rem)`. On a page short enough not to scroll that is taller than
the grid row it sits in, and a sticky box may not be offset outside its
containing block, so it clamped to the grid top at y=0 - under the fixed 49px
navbar, eating the first section heading and its first link. `main` has no top
offset; the content column only clears the navbar because it carries `pt-12`.
Measured on 9 routes, 7 were affected, every Yumma UI component page among them.
Fixed with `@lg:pt-20` on the `<aside>`, matching `t-20` so the unscrolled and
stuck positions are identical. **The TOC and the playground rail sit in the same
grid and were fine** - they are short enough to fit, so sticky never clamped.
Anything new in that third column inherits the bug the moment it gets tall.

*Flex items default to `min-width: auto`.* The page title could not shrink below
its longest unbreakable run, so `@yummacss/runtime` pushed the header row 50px
past a 390px viewport while `Grid Template Columns` was fine. That is the whole
of the "weird" part: **hyphens and spaces are break opportunities, a slash is
not.** Fixed with `min-w-0` plus `ow-bw` on the `h1` and `fs-0` on the actions.
Note `ow-bw` alone does nothing here - `overflow-wrap: break-word` does not
reduce min-content size, so it cannot rescue a flex item that is not already
allowed to shrink. **`mw-0` is not a class**; it was sitting in `admonition.tsx`
doing nothing, which the class check had been reporting all along. The
min-width prefix is `min-w`.

**Base UI portals escape the iframe.** They resolve against the top-level
`document.body`, not the trigger's `ownerDocument`. Pass `container` from
`usePreviewContainer()`; threaded through 13 base components and 12 variant files.
The stage only passes it when the schema declares a `container` prop, otherwise it
hits the DOM as an unknown attribute. (This is also why `globals.css` still
matches `[role="listbox"]`, `[role="menu"]` and friends - the pre-iframe reset for
the same problem.)

**PreviewFrame height feedback loop.** Measure the inner `#root` div, never
`body`. Measuring body with `min-height: 100vh` grew frames to 1400px. And read
page styles **once as text** via `cssRules`: cloning `<link>` elements cost 22
network requests per scroll, versus 7 after.

**Shiki writes `class`, not `className`.** It sets `properties.class = "line"` as
a raw string, not hast's canonical `className`, so appending to `className`
emitted **two class attributes** and the browser silently dropped the second. The
damage was not cosmetic: the decorator strips `\n` text nodes deliberately,
because `d-b` is meant to supply the breaks, so 92 fences across 14 files rendered
with every line run together, in production. **If you add any class to Shiki
output, fold `properties.class` in.** Method worth reusing: count distinct
`getBoundingClientRect().top` values among line spans - a collapsed block has
fewer distinct tops than lines, which catches this by geometry rather than by eye.

**Merge timing on a long-running branch.** This bit twice: a PR merged at its
third commit while later commits were still being pushed, leaving the branch 40+
commits behind with `git rev-list --count main..branch` showing 0. Check whether
the PR merged out from under you before pushing. Recovery is
`git checkout -B <branch> origin/main` then replay the unmerged commits.

**A merge resolution can silently drop design.** When main and the branch both
built the same thing, taking main's side everywhere discarded
select-for-every-enum and the header install button, and the user saw nothing
after merging. Diff against the settled-design list after any conflict resolution.

**The dev server does not know registry files affect MDX pages.**
`remark-component-source.mjs` reads registry `.tsx` straight off disk, but
content-collections' watcher does not track that dependency, so editing a registry
file does not invalidate the cached page. `rm -rf .next .content-collections` and
restart before trusting what "Show code" renders.

**If a generated file has impossible syntax, regenerate before debugging.**
`content-collections` once left `allUis.js` with `]"path": "tooltip"` and every
route 500ing; Next's `.next/dev/types/routes.d.ts` duplicated a block and failed
typecheck with `TS1109`. Neither was a real bug.

**Do not run repo-wide `pnpm lint:fix`** - it reformats unrelated files across the
repo. Scope it to the touched files.

**`git checkout <sha> -- path` writes the index too**, so old files come back
*staged*. Unstage with `git reset -- src/` and delete leftovers via
`git ls-files --others --exclude-standard src/` rather than reaching for
`reset --hard` or `clean -fd`.

**On Windows, stopping a background task does not kill the `next dev` child.**
Orphans accumulate; one reached 3.6 GB RSS and hung. Kill by PID.

**pnpm's registry fetch flakes.** `ERR_PNPM_PNPM_ENGINE_IDENTITY_UNVERIFIABLE`
with `terminated` in the text is a truncated download, not a bad signature. The
identical setup step on the identical runner succeeded before and after the
failure, and it has now happened three times in one week across two unrelated
repos. **If a release appears stuck, re-run the job before changing anything.**

**A base demo that looks broken *is* broken, whatever the reason.** A `ReactNode`
prop cannot have a JSON example, which for most components costs a decoration and
for Popover and Toggle cost everything - an empty square and an empty circle, as
the first example on the page. Both shipped that way, twice, with a note to
myself that it was "expected given the mechanism". **The reader does not know the
mechanism.** Verify against the question a reader asks ("does this page show me
the component"), not only against the mechanism (does the class land, does the
type check).

**Not every odd pattern is a bug**, either. The original ~450 demo files were
DeepSeek-generated, which retroactively explains most defects found during the
migration and is good reason for suspicion - but suspicion still has to be
*checked*. A suspected Base UI children-replacement bug in the alert-dialog demos
was investigated and disproven; a false claim nearly went into a commit message.
The useful residue: **a generator copy-pastes a wrong pattern across ten files as
easily as a right one**, so "the majority of files agree" is evidence of shared
ancestry, not of correctness. Prefer: does it work when rendered, is it
internally consistent, does it match the component's own semantics.

**Verify positioned things by comparing bounding rects**, not by eye. Comparing
the Tabs indicator's rect to the selected tab's, in both orientations, before and
after switching, proved zero drift across a structural rewrite. Much stronger
than a screenshot.

**Base UI tooltips and Autocomplete popups do not open under synthetic pointer
events**, so their timing and contents cannot be self-verified. Right-click *does*
work, so context menus can be. Open the rest by hand before shipping.

**A default nobody can see is a default nobody can fix.** `TooltipBase` passed
`delay` straight through and the meta only said "Base UI's own default applies
when unset", which is how a 2s tooltip survived. State the number.

**Base UI 1.7 prop locations that the typecheck catches but memory does not:**
`openOnHover` and `delay` live on `Popover.Trigger`, not `Popover.Root`; tooltip
`delay` lives on `Tooltip.Provider`, not `Tooltip.Root`.

**In `react-resizable-panels` v4, bare numbers are pixels; in v3 they were
percentages.** `defaultSize={50}` silently became 50px. v4 also never fires
`onResize`, so panel open state comes from `isCollapsed()` plus the Group's
`onLayoutChange`. (`play` only.)

**`play`'s preview runtime is no longer a manual bump.** It loads
`@yummacss/runtime` from a CDN, so its version was never a dependency and no bot
could reach it - the pin sat at `3.29.2` while everything around it moved.
`next.config.ts` now reads the number off the `yummacss` devDependency and
inlines it, so Dependabot's PR moves the iframe too. Still pinned: the runtime
cannot change under a deployed build. Verified by bumping the spec and diffing
the built chunks.

**Do not eyeball theme colours out of `eclipsa.json` by scope name.** Run
`codeToTokens` on the exact construct and read the colours off the output. Shell
command `#F5FAFF`, argument `#BEC6F2`, space `#B9BED5`.

**`yummacss.com` 308-redirects to `www.yummacss.com`.** `curl` checks without
`-L` are not outages.

---

## Rejected. Do not rebuild

- **Replacing a dependency with our own code to save bytes.** `tinycolor2` was
  swapped for 40 lines of OKLab conversion, measured at a 25% cut to core, and
  rejected: a package is battle tested and shared across repos, ours is neither.
  Weigh a dependency by what it costs to own, not by what it weighs. The same
  rule is why Base UI beats handcrafted components in the registry.

- **Deleting `Skeleton` in favour of a `loading` prop.** Nobody does this
  because a prop cannot render before the component that declares it, and a
  skeleton stands where no component exists yet. Do not re-propose it as a
  code saving.

- **The editor extensions.** `intellisense` and `intellisense-zed` are deleted:
  repos gone, unpublished from the VS Code Marketplace and Open VSX, and the Zed
  marketplace PR (#6731, open since 2026-07-22) withdrawn. The 18k VSIX installs
  were read as bots, the same way the npm download counts are; the only real user
  was Renildo. **Do not re-propose an editor extension, and do not treat the
  download numbers as evidence of an audience.** Two live consequences: v4 no
  longer has to migrate any class-detection pattern to `d:f`, and the
  `yummacss.com/docs/${util.slug}` hover links no longer have a consumer - core's
  `slug` field now only feeds the docs, which changes who the `scroll-*` slug
  cleanup is for.
- **`@yummacss/intellisense` as a package** is likely to follow. The plan is for
  `play` to own completions, colour decorators and hovers itself. Not done, and
  the one thing to check before deleting: whether anything besides the extensions
  imported it, and where `play` gets its class list from once it does. This also
  closes most of the `any` density item in the small-monorepo list.

- **The blog timeline**, after ten mockups. Rejected because it introduces a
  rail, marker blocks and bordered thumbs - three pieces of visual vocabulary
  that exist nowhere else on the site. Two findings worth keeping: a staggered
  timeline scans *worse* (3 posts above the fold versus 5, because the eye
  zigzags), and a snake weave cannot carry year headings without breaking the
  line.
- **A releases page.** Built and reverted the same day. It re-rendered
  `CHANGELOG.md`, which GitHub already renders, so `/releases.md` was
  byte-identical to GitHub's raw file, and the route was invisible to site search
  because `/api/search` indexes only `allDocs` and `allUis`. **If the itch
  returns, build per-utility "added in 3.29" badges or a version switcher
  instead** - those carry information GitHub does not have.
- **A "For LLMs" docs page.** Replaced by the plain sidebar link to `/llms.txt`,
  which is what was wanted.
- **Driving the sidebar from frontmatter.** Section order and 16 nested groups
  would still need a config file, and numeric order across 254 files is exactly
  what had already drifted into four duplicate values.
- **Replacing the tooling pages with README links.** Canon's README documents
  neither `--config` nor `extractClasses`, and deleting the pages would drop
  canon from `llms.txt` and site search.
- **Anatomy sections** on Yumma UI pages. They exist in Base UI's docs because
  Base UI is headless and you *must* know the compound tree. This migration did
  the opposite on purpose: every migrated component is a single default-exported
  props-driven unit whose only other exports are TypeScript interfaces. An
  Anatomy tree would document an API surface the consumer does not have.
- **Landing page redesign.** Attempted and dropped. **Do not restart
  unprompted.** Four landing directions (Specimen, Index, Mechanism,
  Marginalia) were rejected as "messy, hard to scan, overwhelming", and a calmer
  rebuild was dropped too; explicitly ruled out as too generic are a centred
  heading over centred buttons, and a code block comparing Yumma CSS to other
  frameworks. Method note: mockups live at `public/mockups/` (gitignored)
  served by `next dev`, with real fonts copied out of `node_modules/@fontsource/*`
  so type is faithful.

---

## Yumma CSS v4

**Target was early September and the work has started**: `yummacss` branch `v4`
carries colon-syntax parsing and migrated fixtures. The rationale for holding v4
behind Yumma UI still stands as recorded: nobody uses Yumma CSS yet, a real
person is waiting on Yumma UI, and Yumma UI is what gives anyone a reason to
adopt the CSS. Decision #15 in the 4.0 draft already rejected a compat mode
because "the user base is one person who will be migrated by hand".

**The motivation, stated properly:** Cursor suggested Tailwind's `-m-4` to a real
user and she preferred it, and she already likes Tailwind. The lesson is not that
the docs are thin. It is that **the v3 dash syntax reads as a worse Tailwind
rather than as CSS**, which is the actual argument for the colon syntax.

**Nested variants: keep both. Decision #20 is reversed.** Renildo's call,
2026-09-16: `f:h:bg:red` next to `f:bg:red h:bg:red` reads as confusing at first
and then as the better tool, and it is shorter. The two are not alternatives, so
there was never a form to drop: one matches focused **and** hovered, the other
either. `nested-variants.mdx` no longer says the stacked form is going, and it
stops calling it "rarely the intent".

Nothing to build. The generator already does this, verified on the `v4` branch
2026-09-16: `f:h:bg:red` produces `.f\:h\:bg\:red:focus:hover`.

**Still open, and the real bug that entry was carrying:** `@sm:@lg:bg:red`
silently collapses to `64rem`. Two media queries cannot both apply, so one is
dropped with no warning. That is a canon question, not a parser one.

Originally verified against the generator: `f:h:bg-red` produces `.f\:h\:bg-red:focus:hover`, which is real but
almost useless; `@sm:h:bg-red` ("hover styles only above 40rem") is the valuable
case, since hover is unreliable on touch. Dropping state+state removes parser
surface and codemod cases at close to zero cost. Recorded as #20 in the 4.0 draft.
Also known: stacking is order-independent (`@sm:h:` == `h:@sm:`), and **two media
queries silently collapse** (`@sm:@lg:bg-red` emits only `64rem`, dropping `@sm`
with no warning).

### Family parity: make `theme.colors` reach the components

**The problem, from the Badge work.** A component that maps a semantic name to
several classes cannot support a user's own family without literals in source.
Adding `rose` to `theme.colors` today does not make `<Badge color="rose" />`
work: you add a `rose` block to your copy of `badge.tsx`, which supplies both
the type and the literals the scanner needs. One block, and the CSS follows.
That is the ownership model, and it is defensible, but it is not what someone
expects after editing config.

**The generator can close it, and only the generator can.** It already reads
`theme.colors` and already knows which colour utilities are used. If a utility
is used with any family, emit it for every **configured** family. Then adding
`rose` makes every Yumma UI component work with it and no file is edited.

- Cost is bounded and proportional: one family's worth of the colour classes
  already in use, not the whole palette crossed with every utility.
- It fixes Badge, Meter and anything built later in one place, rather than
  per component.
- `safelist` still exists (`nitro/src/config/schema.ts`) and is the manual
  version of this. That it is the current answer is the argument for the
  automatic one.

### Killing custom classes, without arbitrary values

The goal is to remove the *need* to write custom CSS without adopting Tailwind's
arbitrary-value escape hatch. All three below take the same shape, which is why
they belong together: **move the thing into `yumma.config.mjs` and generate a
utility for it.** The user names a value once, in config, and gets a real utility
with a real name; they do not inline a value into a class and get an unnamed one.

1. **Custom font families. Asked for directly, 2026-08-28 - `theme.fonts`, so
   the docs can dogfood it and drop `.ff-e`.** Colours are already
   configurable; families are not,
   which is the whole reason `.ff-e` exists. Config gives `ff-<name>`. Two things
   to settle: the docs need `ff-e` scoped to `article h1..h6`, which a utility
   does not do by itself, so that rule stays and only the class definition goes;
   and `ff-m` plus the default family already exist as built-ins, so config has
   to merge rather than replace, exactly as `colors` does.
2. **A `container` config.** `.cnt {}` was cut in 3.0 for being opinionated, and
   that was right: **a built-in container is opinionated, a configured one is
   not.** This site would want **two**, so the config shape is a map of named
   containers, not a single value.
3. **Viewport-minus utilities. Asked for directly, 2026-08-28**, framed as the
   answer to Tailwind users reaching for an arbitrary value on a genuinely common
   need. `max-height: calc(100dvh - 5rem)` appears twice
   as an inline style (`sidebar-nav.tsx`, `toc.tsx`). Shape: the existing 0-384
   scale subtracted from `100dvh`/`100vh`, e.g. `max-h-dvh--20`. **The sharpest
   version of the case:** an inline style cannot be made conditional on a
   breakpoint, so the moment one of these needs to apply only at `@lg` it becomes
   a custom class. That has happened once already. Note every call site is
   `p-st t-20` **plus** the cap, because the offset and the cap must agree -
   confirm `t-` already covers the sticky half before designing this in isolation.

A fourth candidate: **named grids**. `gtc-12` gives twelve equal columns and
that is the only shape available, which is why the `/ui` redesign once reached for
a raw `grid-template-columns` rule. `grid: { docs: "14rem minmax(0,1fr) 22rem" }`
-> `gt-docs`, same shape as #2. This may be the strongest of the four, since
asymmetric layout is the commonest reason to drop out of utilities.

**Careful with the count.** Four config-driven generators is where the config file
starts to *be* the design system rather than configure it. Decide up front whether
the answer is four keys or one `theme.extend`-shaped mechanism, because
retrofitting that is a breaking change and 4.0 is the cheapest moment to get it
right.

#### The docs go Yumma first, 2026-09-22

Renildo's direction: **the docs site is where Yumma proves itself**, so every
inline style and custom class in it is a data point. Each one is either a gap
Yumma should close with something true to CSS, or data that belongs inline, or a
utility that already exists and was missed. Special-purpose utilities that only
fit one call site are the wrong answer; `theme.fonts` (#1 above) is the model.
**`globals.css` stays.** It carries the `@yummacss` marker, and a rule that is
plain CSS with no utility form (a `light-dark()` value, a keyframe) belongs in
it. The audit shrinks what is in it for want of a utility, not the file.

Measured on `main` at `bcf4ea4d5`: **24 inline `style=` in 13 files** under
`src/app`, `src/components` and `src/mdx-components.tsx`, and **187 lines of
`globals.css`** beyond the `@yummacss` import. Sorted:

- [x] **Viewport-minus heights: five sites now, not two.** `sidebar-nav.tsx`
      and `toc.tsx` (`calc(100dvh - 5rem)`), `mobile-dialog-nav.tsx`
      (`calc(100dvh - 60px)`), `search-dialog.tsx` (`70vh` and
      `calc(70vh - 120px)`), plus `.playground-rail` and `.playground-column`
      in `globals.css`, which exist only because the cap had to be
      breakpoint-conditional. That is #3 above, with more evidence.
      Done with 4.2's CSS functions: `max-h:calc(100dvh-5rem)`,
      `h:calc(100dvh-60px)`, `max-h:calc(70vh-120px)`, and the rail's
      `@lg:p:st @lg:t:20 @lg:max-h:calc(100dvh-5rem)`.
- [x] **One fluid width, written twice.** `.docs-container` and the landing
      page's inline `maxWidth` both say `clamp(40rem, 80vw, 96rem)`. That is
      #2, the `container` config.
      Done without one: `max-w:clamp(40rem,80vw,96rem)` on the five sites.
- [x] **A utility that already exists.** Code blocks are held dark with a
      `[data-code] { color-scheme: dark }` rule, and `cs:d` is that exact
      declaration as a class. The rule goes and each shell carries `cs:d`.
      Done: the five shells in `code.tsx`, `code-group.tsx` and
      `token-block.tsx` carry `cs:d` and the attribute is gone. Measured in
      light theme: `color-scheme: dark`, background `#1a1d2e`, as before.
- [x] **Colours that skip the tokens, so they ignore the theme.**
      `reference.tsx` (`#b9bed5` on the detail column), `tabs.tsx` and
      `avatar.tsx` (`#989ec2`). Each has a token already: `c:ink/70` and
      `c:accent-dim` are the likely matches. A fourth, the Reference count
      chip's `#8892c2`, became `c:accent-dim` with the toggle fixes.
      Done: Reference's detail column is `c:ink/70` and Avatar's fallback is
      `c:accent-dim`; `tabs.tsx` had already moved to `c:ink/80`.
- [x] **A display size no scale reaches.** `.footer-version` is `min(17rem,
      100cqw / span)` inside a `container-type: inline-size` band. Neither a
      font-size past `3xl` nor a container-relative length has a Yumma form.
      Worth asking whether container queries are a variant, not a utility.
      Done with `ct:is` and `fs:min(17rem,calc(100cqw/(var(--span)*1.03)))`.
      Two lines stay in `.footer-version`, each a Yumma gap: line height has
      no step below `lh:1` (it needs `.74`), and a theme colour drops the
      alpha of an 8-digit hex, so `#4c5fc721` comes out `#4c5fc7`. Also seen:
      `ls:-1` is `+.05em`, since `ls:1` is already negative.
- [x] **State that lives in attributes.** `.yui-scrollbar[data-scrolling]`,
      `[data-fold]`, `:root[data-theme=...]`. Attribute variants are 4.2's,
      and the `data-*` limits in "Attribute variants" below still apply.
      The scrollbar uses `hovering:` and `scrolling:` states. `[data-fold]`
      and `:root[data-theme]` stay in `globals.css`: one styles a child from
      its parent's state, the other is the theme itself.

**Stays inline, correctly.** A value computed at runtime is data, not style:
the palette's `backgroundColor: shade` and `repeat(${scale.length}, ...)`,
the search dialog's swatch colour, `token-block.tsx`'s token colours, the
preview frame's measured height, `tabs.tsx`'s `--active-tab-left` and the
footer's `--span`. A custom property carrying a runtime number is the CSS-true
answer and needs nothing from Yumma.

### The 0-384 scale, the t-shirt aliases, and unbounded values

Measured, because the answers are not what they look like.

**384 is not arbitrary.** The base is `0.25rem` and the range is `0..384` step 1,
so `384 * 0.25rem = 96rem`, which is exactly the `xxl` breakpoint. **The scale
runs to the widest breakpoint and stops.** That is a defensible rule and it
should be written down as one rather than rediscovered.

**The t-shirt aliases are not redundant, with one exception.** `sm` 40rem, `md`
48rem, `lg` 64rem, `xl` 80rem and `xxl` 96rem are **identical to the media-query
breakpoints**, so `max-w-md` means "as wide as the `md` breakpoint" - a semantic
fact the numeric step cannot state, even though every one of them *is* also a
numeric step (`xs`=128, `sm`=160, `md`=192, `lg`=256, `xl`=320, `xxl`=384).
**`xs` at 32rem is the odd one out: there is no `xs` breakpoint.** So the answer
to "why do I even have these" is: keep them and document them as breakpoint
aliases, and either drop `xs` or add the breakpoint that would justify it.

**"Would unbounded values save SO MUCH code?" - not where it looks.** Generation
is scan-driven, so the scale costs **zero bytes of output CSS**; only classes
actually written are emitted. What it costs is the build-time value table: 385
numeric keys plus 37 aliases is 422 entries, and **34 utilities bind to one of
those scales, so ~14,300 entries are held per build**. Real, but it is memory and
table-building, not stylesheet weight. **The second argument for a small scale
was the IntelliSense completion list, and that argument died with the
extensions.**

**The idea is still right, for a better reason.** Parsing `w-97` and emitting
`calc(0.25rem * 97)` deletes the min/max question entirely - no cap to configure,
no ceiling to justify, no user asking to extend the range. It also stays on the
right side of the arbitrary-value line, and the distinction is worth stating in
the 4.0 post: **`w-97` still resolves through the named base, so it is a scale
step with no ceiling; `w-[24.25rem]` inlines a value and belongs to no scale.**
Unbounded is not arbitrary.

**What it costs, and what has to be decided first.** Canon stops being "is this
class in the set" and becomes "does this class parse", which changes
`validate()`, the canon list that has to ship with 4.0, and every consumer that
expected an enumerable list. Decide that *before* the canon list is built, not
after - it is the same "four keys or one mechanism" question as the config
generators above, and 4.0 is equally the cheapest moment for both.

**Do not rename `yumma.config.mjs`.** The asymmetry with the `yummacss` package
looks like a mistake and is the convention: `tailwindcss` ships
`tailwind.config.js`. The cost is not cosmetic either - 15 files in `docs` and 3
in the monorepo name it, plus every docs example, the blog posts and `play` - and
decision #15 rules out a compat mode, so `loadConfig` would hard-break rather
than accept both. Nothing is gained that a reader was confused by.

**The honest ceiling on the whole idea:** `globals.css` today has two custom
classes (`docs-container`, `ff-e`), which #1 and #2 would remove entirely, plus
one selector-scoped rule no utility can replace - the preview reset, which matches
Base UI portals in `<body>` by role and attribute. **Some CSS is a *selector*
problem, not a value problem.** Aim at the value problems and say so.

---

## What the codemod cannot see

Running it over `docs` was the point of running it over `docs`. Four things it
does not touch, three of them found only by reading the diff:

- **Code-fence highlight annotations.** ` ```tsx "ai-fs" ` sits above a line the
  codemod rewrites to `ai:fs`, so every migrated example lost its highlighting.
  36 of them across 10 files. Expressive Code's own syntax, not a class
  attribute, so this stays a docs problem and not the codemod's.
- **Class names built in code.** Four sites in `src/utils/yummacss.ts` and
  `src/utils/mdx-markdown.ts` join a prefix to a value with a dash, and they are
  what renders every reference table on the site. A template literal is not a
  class attribute, so nothing flagged them.
- **Class names in prose.** 51 inline mentions across six pages outside the
  blog, including a sentence in `naming-convention.mdx` whose whole point was
  that `tt-n` becomes the spelled-out value, which a half-migration turned into
  nonsense.
- **A `del={1}` line.** The 4.0 post shows the old syntax above the new one. The
  codemod rewrote the old line, so the post demonstrated a class becoming
  itself. Anywhere the docs teach the migration, the codemod erases the lesson.

**The release announcements keep the syntax they shipped with.** Rewriting
`yummacss-1.0.0.mdx` to 4.0 makes it claim a syntax that did not exist when it
was published. They are a record, so they are excluded, and they are why the
canon count above is quoted outside the blog.

**Three bugs it found in itself**, all the same shape: the codemod read core's
defaults where it should have read the project's config.

- `theme.screens` was ignored, so `@3xl:d-b` in a project with that breakpoint
  stayed in 3.x syntax. It was not even reported, because the skip filter
  required a letter after the `@`.
- `config.prefix` was ignored, so a prefixed project kept every class it had.
- All three variant splitters spelled a variant name `[a-z]+`, which no
  breakpoint called `2xl` or `3xl` can match.

`theme.colors` was handled from the start, which is what made the other two
visible: one branch of the same question was answered and the others were not.

---

## Attribute variants: not for `data-*`

Renildo's call, 2026-09-16. **`data-starting-style` and `data-ending-style` are
Base UI's vocabulary. They are not present in vanilla CSS, so Yumma CSS will not
grow variants that name them.** A general-purpose CSS framework that ships
selectors for one component library's conventions has stopped being general
purpose.

This kills the premise of the TODO entry, which was written entirely from the
registry's needs. **Verified 2026-09-16, the mechanism was never the problem:**
two entries in `pseudo-classes.ts` with a value of `[data-open]` produce
`.xo\:o\:100[data-open]`, stack correctly under `@sm:` and `h:`, and pass canon,
with no parser change at all. It was always a vocabulary question wearing a
parser question's clothes.

**So the 185 lines stay where they are.** Twelve components each carry a
`*_MOTION` template literal, 4 lines for a popup and 8 where a backdrop fades
too, and they are the last hand-written CSS in the registry. Yumma UI wraps Base
UI, so Yumma UI carrying Base-UI-shaped CSS is the right place for it. Yumma CSS
carrying it is not.

**What is actually left to decide, and it is not a 4.0 question:** whether
standard attributes earn a variant. `[open]`, `[hidden]`, `aria-expanded`,
`aria-selected`, `aria-current`, `aria-pressed` and `aria-invalid` are HTML and
W3C, present in vanilla CSS, and nothing to do with any library. The four that
overlap a pseudo class Yumma already has (`:disabled`, `:checked`, `:required`,
`:read-only`) are not candidates. This is a 4.2 question at the earliest.

---

## Doc comments are API, and the strip took them

Renildo wants them back on the config and on Yumma UI, after 4.0. **They were
there.** `chore: remove code comments` (`92e8557`) took 66 lines off
`packages/nitro/src/config/schema.ts`, 36 off canon's `index.ts`, 18 off vite,
5 off core, and shrank postcss. The blank line between every field of the
`Config` interface is where each one used to sit.

**Verified 2026-09-17: `@yummacss/nitro`'s shipped `index.d.mts` has zero doc
comments.** So hovering `source` in a `yumma.config.mjs` shows
`string[] | undefined` and nothing else, where it used to show what the field
is for, an `@example` and a `@default`.

**The rule that was missing, and the reason to write it down:** a comment in
implementation code explains the code to whoever maintains it. A doc comment on
an exported type is not that. It is copied into the emitted `.d.ts` and shipped,
so it is part of the published interface, and deleting it removes a feature
rather than tidying a file. The no-comments rule was meant for the first kind
and was applied to both.

**Nothing has replaced it.** Zed, VS Code and Cursor all read hover text through
the same TypeScript language server, which reads it out of the `.d.ts`, which
gets it from the doc comment above the declaration. There is no newer mechanism
to reach for, and `defineConfig` already carries the types themselves, so prose
is the only part missing.

**Two surfaces, and the second never had any.** The monorepo's is a restore:
`Config`, `defineConfig`, and what each package exports. Yumma UI's is new work:
`ButtonProps` declares six props and says nothing about any of them, and the
same holds across the registry, which is the case Renildo describes as writing
without knowing what A, B or C do.

Additive and non-breaking either way, so it does not gate 4.0 and fits a 4.0.1.

**Both surfaces are done.** The monorepo shipped its restore. The registry's was
not writing prose at all: **all 430 prop descriptions already existed**, in
`src/registry/meta/*.json`, where they have always driven the prop tables on the
site. They just never reached the `.tsx`, which is the file `yummaui add` copies
into someone's project and the only one they ever hover. So the work was a
carry-across, and it belongs to a script rather than to 39 files edited by hand:
`node scripts/doc-comments.mjs` writes them, and `tests/registry.test.ts` fails
naming any prop whose comment has drifted from its description. Same shape as
`order-props.mjs`.

**Six names the prop tables do not carry**, because adding them to the meta
would add a row to every table on the site: `className` and `children`, plus
`tint`, `ariaLabel`, `onQueryChange` and `onChange` on one component each. Those
live in an `EXTRA` map in the script. The component's `summary` goes above the
default export, so hovering the tag says what the component is.

**Props the interface does not declare get nothing**, and that is correct.
`ButtonProps extends ComponentProps<typeof Button>`, so `disabled` is described
in the meta and inherited from Base UI rather than declared; redeclaring it to
hang a comment on it would widen the API to document it.

---

## Cascade layers: yes for the reset, no for the merge problem

Renildo asked, 2026-09-19. These are two questions and the answer differs.

**The reset outranks the utilities today, and that is a bug.** `normalize.ts`
carries `:is(a, button, input, select, summary, textarea):focus { outline: 2px
solid transparent }`. `:is()` takes the highest specificity of its arguments, so
that selector is **(0,1,1)**, and a plain utility is **(0,1,0)**. Measured in
Chromium on a focused `<button class="os:s ow:2 oc:red">`: the flat output
computes `outline-color: rgba(0, 0, 0, 0)`, the same rules with the reset in a
lower layer compute `rgb(230, 57, 70)`. So `oc:*`, `ow:*` and `os:*` are dead on
every focused `a`, `button`, `input`, `select`, `summary` and `textarea`, and
nothing in the class name says so.

**This is why the registry reaches for `fv:` everywhere.** A `fv:` variant emits
`.fv\:oc\:red:focus-visible`, which is (0,2,0) and clears the reset. The
workaround is invisible until you ask why the plain utility does nothing. Worth
checking against the focus-outline flash in TODO's Phase 1 before assuming they
are the same bug; they may not be.

**Two layers, `reset` then `utilities`, fix it** and cost nothing in browser
support: `@layer` is baseline since 2022. It **is** a behaviour change, though,
and in the direction of being breaking: once the utilities sit in a layer, any
unlayered CSS a user writes beats them, whatever the order. That is the right
default and it is still a change, so it wants naming in a CHANGELOG rather than
slipping in.

**A third layer is worth thinking about and is not what the old note refused.**
`@layer` was ruled out for class merging above, and that refusal stands: two
colour classes on one element cannot be resolved by layers, because a class is
defined once and demoting it demotes it everywhere. But shorthand against
longhand is not arbitrary. `pt:8` should beat `p:4` for **every** element,
always, which is exactly what a layer expresses. Splitting the utilities into
`shorthand` then `longhand` would make that true in CSS rather than in
`merge()`. It does not replace `merge()`, which still has to dedupe for
class-string output, but it would stop the order of two classes deciding the
result.

---

## The runtime package is a CDN package

**4.1 shipped the rename and nothing else.** Everything that had been pencilled
in for it, coloured box-shadows, `theme.fonts`, the `container` config, the
`gc-s-*` shortening, attribute variants and the lint plugin, moves to 4.2. The
version was spent on a one-package rename because the rename could not wait for
them: `@yummacss/runtime` was deleted from npm, so `@yummacss/cdn` had to exist
before anything could point at it.


`@yummacss/runtime` is `@yummacss/cdn`. The name describes what the thing is, a
script tag served from a CDN, rather than what it is not.

**The old name is gone.** It shipped as a shim first, a manifest and a tsdown
config pointing at `../cdn/src/index.ts`, but Renildo deleted
`@yummacss/runtime` from npm on 2026-09-18 and the shim came back out: npm
refuses a version number that has been published once, so the next release would
have failed on that package and, because the publish loop runs under `bash -e`,
taken the packages after it down too.

**`exports` and `module` named a `./dist/index.js` the build never wrote.** The
tsdown config emits `iife` only, so `import "@yummacss/runtime"` has been failing
for as long as those fields have been there. Both are dropped from the cdn
manifest. A script tag reads `unpkg` and `jsdelivr`, which are correct.

**Play's preview is broken until `@yummacss/cdn` publishes.** `next.config.ts`
pins the script to the exact version in `devDependencies.yummacss`, and it
pointed at `@yummacss/runtime@4.0.2`, which now 404s. There is no URL that works
in the meantime: the old name is deleted and the new one has never published. It
now names `@yummacss/cdn`, so the only thing left at release time is bumping
`devDependencies.yummacss` to the version that ships it.

**Deleting beats deprecating here, and costs one thing.** A deprecation notice
would have left the old URL serving. Deleting means every page on the old script
tag breaks at once, which is the right call at zero users and the wrong one
later.

---

## Linting: hand the reporting to a real linter

Renildo's call, 2026-09-16, prompted by `https://github.com/shadcn-ui/lint`.
**Targets 4.2 for Yumma CSS and 0.4.0 for Yumma UI.** Neither gates v4.

**The shape: rules are ours, everything around them is not.** `@yummacss/canon`
today is 166 lines and most of them are a linter nobody asked us to write: its
own CLI, its own arg parsing, its own `--allow` flag, its own report format, its
own exit code. A rule plugin for **oxlint** and **biome** deletes all of it and
returns things we would otherwise have to build one at a time: a line and column
per finding, a per-line ignore comment, editor squiggles, CI annotations, and a
config file the project already has. The `--allow` flag in particular is the
wrong shape - an allowlist belongs next to the line it excuses, not in a CI
argument.

**Renamed, 2026-09-16, ahead of the plugin.** Renildo's call: 4.0 is the cheap
moment for a breaking rename, so it did not wait. `@yummacss/canon` is
`@yummacss/lint`, the binary is `yummacss-lint`, the docs page is `/docs/lint`,
and the API is unchanged. **`canon` is retired as a word too**, Renildo's call,
2026-10-01: the tool is lint, and its rules are named for what they forbid,
`no-unknown-classes` and `no-inline-styles` (`yummacss#64`). Older entries
below still say canon; read it as "a class Yumma generates".

**Two rule families, and the second is the interesting one.**

- *Is this a real class?* What `canon` does now: `bg-redd-5` is not canon, and
  the suggestion machinery in nitro already produces `bg-red-5`. Straight port.
- *Is this the right way to write it?* New. **`p-8` on a `Button` should be the
  `size` prop**, because a component that takes a size prop and then gets padded
  by hand has two sources of truth. **`style={{ display: "flex" }}` should be
  `d-f`**. Neither is a correctness error, so neither belongs in a build. Both
  are exactly what a linter is for.

**Why the rule can be stated at all: Yumma has no arbitrary values.** A class
either names a value in the tables or it is not a class, so "this component was
styled outside its own API" is a decidable question rather than a heuristic. The
same rule against a library that accepts one-off values in the class name has no
ground to stand on.

**This is also the answer to the AI question.** An agent writing Yumma UI has
nothing telling it that `size="lg"` exists and `p-8` is the wrong reach. A lint
rule is the one channel that reaches an agent, a reviewer and an editor at once,
and it is the channel they already read.

**JSDoc on both libraries belongs to the same push**, for the same reason: the
prop is documented where it is used rather than only on the docs site.

**What this does not change:** the canon check itself still comes from nitro's
tables, which is the part that cannot drift. The plugin is a reporting shell
around `validateClasses`, not a second source of truth. Anything that needs its
own table has failed the test.

---

## Queue, 2026-09-22

Renildo asked for these in priority order so the release is not starved by
the interesting work. Top first.

1. **Phase 1 is empty.** Nothing below blocks a release.
2. **Audit quick wins**: `avatar.tsx`'s `#989ec2` and `reference.tsx`'s
   `#b9bed5` onto tokens, and `[data-code]` onto `cs:d`.
3. **Icons from Nucleo, as one hand-written `icons.tsx`.** Renildo supplies the
   SVGs. Open question first: the chrome only (56 names in `src/icons.tsx`),
   or the registry too (21 iconoir icons across `src/registry/ui`, and the
   installation page tells users to `pnpm add iconoir-react`, so swapping
   there changes what every installer depends on).
4. **Motion out of the registry: evaluated, see the section below.** CSS
   covers all eleven; Onboarding's outgoing slide is the one loss.
5. **Component API as styles, not knobs.** A style select (working names:
   Elegant, sharp with an archival serif; Minimal; one on a medium radius; one
   on a small radius and tighter spacing; one on `corner-shape`), plus an
   accent colour and a bounded radius. The hard constraint is `corner-shape`:
   a squircle at a small size reads as a pill, so the radius scale has to stop
   where the shape still reads, per control size. Read-only props stay; they
   are the API reference. Mockups first. **Renildo's calls, 2026-09-26:**
   Soft (rounded, `br:lg` on controls) is the default, and a style blocks
   the combinations that make no sense for it, such as Squircle with no
   radius, rather than letting the rail produce them.
   **Phase one done, 2026-09-27:** every `shape` and `iconShape` that
   defaulted to `square` defaults to `rounded`, 31 in code and 32 in the
   schemas (Separator's schema said `square` while its code said `rounded`).
   `tests/registry.test.ts` fails when a schema default and a code default
   disagree.
   **Renildo's calls, 2026-09-27:** a style rewrites the component file,
   its defaults and its `SHAPES` tables, rather than presetting props in the
   usage; and `size`, `shape` and `shadow` stay as props, with the style
   setting their defaults. The plan, one PR each:
   2. `src/utils/styles.ts` holds the styles, their allowed radius steps and
      the reason for each refusal, and a pure `applyStyle(source, style,
      radius)`. Each `rounded:` entry moves along the Yumma radius scale from
      the value it has, which already names the part: `br:sm` a check,
      `br:md`/`br:lg` a control, `br:xl`/`br:xxl` a panel, `br:9999` a
      capsule that never moves. Tested on every component and every allowed
      pair, with every class validated.
   3. `public/ui/r/<style>/` builds per style, and `yummaui add --style`.
   4. The rail's Style and Radius controls, and a Code tab that shows the
      file as it would be copied.
   5. Minimal's filled fields and Elegant's serif, which need new classes.
   **Phase two done, 2026-09-27:** `src/utils/styles.mjs` holds Soft,
   Compact and Squircle with their allowed steps and refusals, and
   `applyStyle`. A step shifts each `rounded:` by -2, -1, 0 or +1 along the
   scale, bounded by the part (`br:sm` stays within `xs`-`md`, `md`/`lg`
   within `xs`-`xl`, `xl` and up within `sm`-`3xl`); `squircle:` entries stay
   within `lg`-`3xl`; `br:9999` never moves. Squircle sets `shape =
   "squircle"`, Compact `size = "sm"`, and no radius sets `shape = "square"`.
   `tests/styles.test.ts` runs all 550 file, style and step combinations
   through the class validator. Context Menu's trigger had `rounded` equal to
   `squircle`; it is `br:xxl`, and the test holds the two apart.
   **A container is rounder than what it holds, 2026-09-27.** Tabs' list and
   Menubar's bar matched their tabs and triggers at `br:lg`, so the outer
   corner read tighter than the inner one across the 4px padding; they are
   `br:xl` (and `br:3xl` for Menubar's squircle). The test for it caught a
   phase-two bug: past `3xl` a shift fell back to `0`, so Extra collapsed
   every `3xl` to its floor. It clamps now, and a `squircle:` entry only ever
   loses radius, since past its own it reads as a pill.
   **Renildo's answers to the mockup's open questions, 2026-09-27:**
   `size`, `shape` and `shadow` stay props in the installed API but leave the
   site's rail, which lists them as reference; `yummaui add` takes `--style`;
   and the Elegant serif comes from `theme.fonts`, which the CLI fills by
   offering three Fontsource faces or the user's own.

**Styles phase four, the controls, 2026-09-27:** the rail's Style and
Radius set `style` and `radius` in the URL through nuqs, the same way the
props are, and `localStorage` carries them to the next page; a blocked pair in
an address falls back to the nearest allowed step. The preview shows a style
the way the accent shows a colour: `radiusCss` redefines each `br:` class in
the preview frame, `:not(.cs\:s)` for rounded and `.cs\:s` for squircle, and
`styleProps` passes the shape and size defaults the style writes. The install
command carries `--style` and `--radius`. `size`, `shape`, `iconShape` and
`shadow` leave the controls and the URL. `applyStyle` shifts every `br:` in
a component's class strings, not only its `SHAPES` tables, since the preview
redefines classes by value: the table-only version had also missed
Accordion's nested table. `tests/styles.test.ts` compares the preview's CSS
with what `applyStyle` writes, token by token.

**Styles phase three, docs half, 2026-09-27:** `generate-registry-json.mjs`
writes each allowed style and radius as a folder of the whole registry,
`r/compact-small/button.json` and so on, plus `r/styles.json`, the table the
CLI validates against. The CLI swaps its base URL and nothing else.
`tests/registry-json.test.ts` builds it and checks every item in every folder
is `applyStyle` of the default.

## Motion out of the registry, evaluated 2026-09-23

**Verdict: yes, with our own CSS, not transitions.dev's.** transitions.dev is
copy-paste CSS plus a CLI, which would suit "Yumma CSS and Base UI only", but
its repository has no license file and part of the set sits behind a sign-in.
Unlicensed code pasted into an MIT registry that users install is not ours to
ship, so it is a reference for timings and nothing more.

The pattern already exists: twelve components carry a `*_MOTION` string in a
`<style href precedence>` tag, keyed off Base UI's `data-starting-style` and
`data-ending-style`, with a `prefers-reduced-motion` guard. `motion` is the
exception, in eleven files:

| Component | What `motion` does | CSS replacement | Lost |
|---|---|---|---|
| Progress | indeterminate bar slides, looping | `@keyframes` on `translate` | nothing |
| Skeleton | opacity pulse, per-row delay | `@keyframes`, delay as `animation-delay` | nothing |
| Autocomplete | loading spinner rotates | `@keyframes` on `rotate` | nothing |
| Switch | thumb moves `travel` px | `translate` transition on `data-checked` | nothing |
| Accordion | panel height to `auto`, chevron turns | Base UI's `--accordion-panel-height` with the starting and ending styles; `rotate` transition | nothing |
| Preview Card | fades in and out | starting and ending styles, as Popover | nothing |
| Toggle, Rating, Toolbar | `whileTap` scale 0.9, icon pops 0.8 to 1 | `:active` scale transition; a keyframe on the keyed icon | nothing |
| Radio | nothing: a `motion.span` with no animation props | delete it | nothing |
| Onboarding | height to the measured px; page slides in and out by direction | `height` transition on the px it already measures; a keyed enter keyframe per direction | the outgoing page no longer slides out, it is replaced as the new one slides in |

Onboarding is the only real decision: accept an enter-only slide, or keep the
old page mounted for 200ms ourselves, which is the state `AnimatePresence`
holds today. The prop API does not change anywhere. **Renildo's call: enter-only.**

**Done for the ten, 2026-09-23.** Each carries a `*_MOTION` block with a
reduced-motion guard, which `motion` never honoured. Measured in the browser
with real input: Switch travels 12px in 200ms, Toggle, Rating and Toolbar press
to 0.9 (0.92 on Toolbar) and the icon pops from 0.8, the Accordion panel and
chevron move together over 200ms, Preview Card fades, the spinner turns once
per 0.7s, and Progress's indeterminate bar loops at full width. Two changes
beyond a straight port: **Preview Card now fades out too**, since
`motion`'s `exit` never ran without `AnimatePresence`; and **Radio's
`animated` now does something**, a 150ms pop on the dot, where it used to
wrap the root in a `motion.span` that animated nothing. A `yui-*` class in a
template literal trips `tests/classes.test.ts`, so Skeleton's and
Accordion's go through a constant.

Order: one PR for the ten that lose nothing, one for Onboarding, then the four
docs chrome files (`control.tsx`, `install.tsx`, `mobile-dialog-nav.tsx`,
`search-dialog.tsx`), then `motion` leaves `package.json` and the install
command. Components installed before that still import `motion`, so the
install page says to keep it until they are re-added.

**Onboarding done, 2026-09-23, enter-only as decided.** The step is a keyed
`div` with `yui-onboarding-next` or `-prev`, a 200ms keyframe from 40px and
opacity 0; the popup height is a `tp:h` transition on the px the
`ResizeObserver` already measured, and the progress bar a `tp:w` transition on
its inline width. Measured: Next slides in from the right, Previous from the
left, and the height and bar move together over 200ms. Verifying it found the
header's Previous, Next and Finish buttons, and the dots row's Finish, with no
accessible name: icon-only, no `aria-label`. They have one now. The install
command keeps `motion` until this and the ten both land.

**`motion` is gone, 2026-09-26.** The search and mobile menu dialogs fade
with `opening:` and `closing:`, the Component API selects and the install
menu scale in with the registry's popup classes, and `motion` left
`package.json` and the install command.

## Solar icons in the registry, 2026-09-26

The registry draws its icons from Solar through `@solar-icons/react`, one
barrel import per style. Renildo's call: the package, not an `icons.tsx`
copied in beside each component.

- **Two styles, by kind.** Outline for marks, arrows and operators: check,
  close, magnifier, chevrons, arrows, command, plus, minus, text formatting.
  Bold Duotone for objects: cloud upload, the avatar's badge, rating stars,
  the alert triangle, the sort arrows, eye, lock, bell and the rest. Import
  and Export are `FileLeftIcon` and `FileRightIcon`, Outline like Menubar's
  Grid and Columns; Command Palette is Bold Duotone throughout,
  its own magnifier included. An icon has one style within a file, and
  `src/utils/icon-style.ts` names each demo icon's style so the Code tab
  imports from the right barrel. A demo marker can ask for another with
  `"style"`, which is how Command Palette's Search item is Bold Duotone.
  `tests/icons.test.ts` fails on a clash inside a file or a marker the demo
  cannot resolve. Renildo's calls, 2026-09-26 and -27.

- **Licence.** The icons are CC BY 4.0 (480 Design); the wrapper is MIT and
  ships the third-party notice. The Yumma UI installation page credits them.
  `solar-icon-set` on npm is a different wrapper under GPL-3.0; not that one.
- **Size.** Without a width, a Solar icon is `1em` of a `24px` font size set
  inline, so every usage carries `w:`/`h:`. All 66 already did.
- **Demo icon sizes** in seven schemas were `w-4 h-4`, a 3.x class that
  generated nothing, so every menu icon drew at Solar's 24px. They are
  `w:4 h:4`, and `tests/registry.test.ts` validates every marker's size. A
  destructive item's icon is `c:red` with its label in Menu, Context Menu and
  Menubar.
- **Fill.** Both styles set their own `fill`, so Rating's stars differ by
  colour alone: `c:yellow-5` lit, `c:slate-4` not.
- **The radio dot** in Menu, Context Menu and Menubar is a span,
  `d:b w:2 h:2 br:9999 bg:current`: Solar has no plain circle.
- **Demo icons.** `src/utils/demo.tsx` imports the same package, so the
  preview draws what the Code tab imports; it used the site's Phosphor module
  under Iconoir names before. Each demo icon now names its label: a pen for
  Rename and Edit, a keyboard for Shortcuts, a folder for "No files yet". The
  site's own icons stay Phosphor behind `src/icons.tsx`.

## Docs for 4.2, drafted 2026-09-26

Branch `feat/docs-4-2`, merged with the bump to 4.2.0: `src/utils/yummacss.ts`
and `tests/reference.test.ts` name `core.animationUtils`, which 4.1.2 does not
export.

New: the five `animation-*` pages, `container-type`, Container Queries, States,
Starting Style, CSS Functions. Updated: Configuration (`states`, `fonts`,
`keyframes`), Transition Property (`tp:t`), Font Family (`theme.fonts`), Media
Queries (`@xs`, `@prm`, a pointer to `@c:`), Nested Variants.

Four stale things found on the way, fixed in the same branch:
- **Configuration's `prefix` example generated nothing.** `prefix: "ui"` with
  `ui-bg:red` is refused, because the prefix is prepended as written; it is
  `"ui-"` now. Its sample output was 3.x (`.bg-white`) too.
- **Nested Variants documented the `@sm:@lg:` collapse** that 4.2 fixed, and
  its outputs used 3.x selectors (`bg-red`).
- **`@xs` and `@prm` were documented nowhere** but the 4.0 post.
- `Reference` said "1 utilities". It picks the singular now.

## Parked

- **Inspect mode**: overlay dimensions and the box model on a preview. Survives
  the `/ui` layout revert because it does not depend on any of it; attach it to
  the preview and leave the page structure alone.
- **Interactive palette on `colors.mdx`**: type a hex, see the 13 generated
  shades. Same blocker as exposing `yumma.config.mjs` in `play` - `loadConfig`
  genuinely reads from disk (`node:fs`, `node:crypto`, `tinyglobby`), so it
  cannot simply be re-exported from `@yummacss/nitro/browser`. Needs a real
  browser config path: parse a config from a string in memory rather than resolve
  and import a file.
- **A 4.2, for utilities that are additive rather than breaking.** Renildo's
  call, 2026-08-31: neither of these gates v4, so neither should delay it.
  - **Colored box-shadows.**
  - **Shorten what `gc-s-*` and `gr-s-*` emit.** `grid-column: span 3 / span 3`
    and `grid-column: span 3` are the same declaration - measured in Chromium,
    both render 120px, because the Grid spec discards the second span when a
    placement contains two. Across the 32 `grid-column`/`grid-row` values that
    is **956 to 654 bytes, 32% smaller**, with no rendering change and no class
    renamed, so it is **not breaking and does not need v4**.
  - **A `grid-column: 2 / 4` shorthand.** Lower value than it looks: `gcs-2
    gce-4` already does it, both taking 1-16. And `/` is the opacity separator
    (`bg-red/50`), so `gc-2/4` would parse as "gc-2 at 4% opacity" - it would
    cost a delimiter that already means something.
- **Stop `play` looking like Tailwind Play.** It is close to a clone: same split
  editor, same generated-CSS drawer, same top-left brand and top-right share.
  The reference points are `diffs.com` and `trees.software` - what they get right
  is that the *chrome* is the product: a real window frame with traffic lights, a
  file tree, tabs, per-line diff gutters, a command bar at the bottom. None of
  that is playground-specific and all of it reads as its own tool rather than a
  reskin. Possibly rename to `try.yummacss.com`. **The strategic point stands on
  its own**: Yumma CSS gets compared to Tailwind constantly, and the playground
  is the single most-seen surface, so it is the cheapest place to stop inviting
  the comparison. After v4 and the UI work.
  **2026-09-29:** diffs.com and trees.software are Pierre's `@pierre/diffs`
  (Shiki file and diff rendering, React and vanilla) and `@pierre/trees` (a
  path-first file tree, React and vanilla), both Apache 2.0. The tree renders
  in a shadow root and themes through CSS variables, so play's own classes
  cannot leak into it or out of it. Trellis UI has no npm package under
  `trellisui`, `trellis-ui` or `@trellis/ui`.

## Yumma UI parked, AI first, 2026-10-03

Renildo weighed deleting Yumma UI: it earns nothing and looks like every other
component set built on Base UI. It stays, for three reasons. Deleting it felt
like a loss, where the playground, the CDN and IntelliSense felt like relief.
A real app depends on it (link.dutfolio.com). And it is the largest body of
correct 4.x classes anywhere, served as plain text at
`/ui/components/<id>.md`, which is what an agent needs to learn the syntax.

So it is kept and its roadmap is parked: no dark theme, no palette update, no
new styles and no breaking registry release. Fixes still land, and anything
the one app using it needs. The parked items are listed on the scoreboard.

The main line of work is the AI track in `TODO.md`: an agent writes Yumma CSS
right first time, and the linter's message is enough to fix it when it does
not. The first finding, while writing the track: `/llms.txt`, the first file
an agent reads, still explains the 3.x dash syntax.

## Retired: the playground, `@yummacss/cdn` and `@yummacss/intellisense`

2026-09-30. play.yummacss.com redirects to the site, and the two packages
leave the Yumma CSS monorepo. The site drops the Playground link from the
navbar and the mobile menu, the home page's "Try now", the naming-convention
hint that pointed at the playground's hover, the `@yummacss/cdn` page and the
installation page's CDN section. `/docs/cdn` and `/docs/runtime` redirect to
installation. The 4.2.0 post's line on `@yummacss/cdn` is removed too,
2026-10-03: posts do not mention retired packages. The why is in the Yumma CSS repo's NOTES.md.

## Blog covers, 2026-10-02

Every post's cover is drawn by `src/app/blog/[slug]/cover.png/route.tsx` from
its frontmatter, and the hand-made PNGs are gone, along with six IntelliSense
screenshots no page used. Renildo picked option D, "Paper", out of five
mockups after rejecting a ruler along the bottom edge.

One layout on `indigo-10` (`#2c2d6a`) from the default scale: the headline
in Esteban and `indigo-3` (a release's number, or the title), the date in Quattro, and up to
four feature rows on the right, each with an optional `code` or svgl `logo`.
Renildo, 2026-10-02: light read wrong, and the product mark is redundant on
the site's own blog. The site's dark page made the cover vanish into it, so
the ground is indigo rather than any page token. `cover.png` comes from
`src/utils/cover-image.tsx` and has no mark; the link preview is separate (see
"OG images"). `cover` is
`release` or `text`, or an object with `text`, `product` and `features`. A
path to an image is refused, so a post cannot go back to a hand-made cover.
Logos come from svgl's GitHub repo, `pheralb/svgl` `static/library/`, since
svgl.app itself is blocked from the agent's network.

## Code block focus, 2026-10-04

Shiki makes each `pre` focusable so a long line can be scrolled from the
keyboard. The `pre` is the box that scrolls, and on keyboard focus it draws
the same inset accent outline as `Scroller` (`PRE_CLASSES` in
`src/lib/code-decorate.mjs`). When the wrapper scrolled instead, the browser's
default outline traced the overflowing lines and spilled past the box.

The author avatar beside a post's byline is a circle (`br:9999`).

## Wrap-ups, 2026-10-04

One post per month, "Wrap-up: Sep—26", holds every release of that
month, newest first, one heading per version with its date, and a 3.x upgrade
note. It is rewritten as the month's releases land: `updated` in frontmatter
shows "Updated …" beside the date and feeds `modifiedTime`, `dateModified`
and the sitemap. Its address is `/blog/wrap-up-<mon><yy>`. The month is
abbreviated so the cover headline stays large, and the em dash keeps
"Sep—26" from reading as the 26th; it is the one em dash the copy allows. A major release keeps its own
post (4.0, 5.0); 4.2 and 4.3 had theirs before wrap-ups and the wrap-ups link
them. Posts never mention a retired package, so 4.1.0's CDN and 4.2.2's
removals are left out. The cover is the `text` template with the title as its
headline. Satori breaks after a hyphen or a dash, so each word of a
dated headline is its own no-wrap span, and the headline is as large as its longest word lets it be
in the column (about 130px for "Wrap-up:"). Other covers render byte-identical to before. Mockups: claude.ai/artifact/BNcm2bbvcxQWQ9ihotmfrY, option E.

## Release videos, 2026-10-03

1.0, 2.0, 3.0 and 4.0 have videos, named by `video:` in frontmatter (the
YouTube id) and played by `src/components/release-video.tsx`. Until someone
presses play it is the post's cover with a play button in its empty top
corner; the video is mounted only then, from `youtube-nocookie.com`, with
YouTube's controls off. The index tags those posts "Video".

**Video.js 10 plays it**, 2026-10-03: `@videojs/react` with
`@videojs/youtube-video`, no skin. Video.js owns the YouTube API, the store
and the controls' behaviour (`PlayButton`, `Time`, `TimeSlider`,
`MuteButton`, `FullscreenButton`); the buttons render Base UI `Button` and
every part is styled with Yumma classes. The packaged skins are not used:
their controls are round (`9999px` radii hard-coded in `skin.css`). Vidstack
was the first candidate; its team moved to Video.js 10 and Vidstack 1.x gets
security patches only, until January 2028.

Two traps. `play()` before the video is attached throws `NO_TARGET`, which
takes the page down, so the first play comes from `autoplay` on the embed.
And the thumb has `role="slider"` too, so a test that clicks "the slider"
clicks the thumb.

Video.js 10.0.1 was a day old when it landed, inside pnpm's 24-hour
`minimumReleaseAge`, so every deploy stopped at install. Eight
`@videojs/*@10.0.1` exceptions unblocked it and came out once the release was
a day old: `minimumReleaseAgeExclude` holds only our own packages.

The player is square, like the cover it sits on: no radius on the frame, the
bar or the controls, and the play button is a white label rather than a
frosted circle. The cover is never removed: it fades out on play and back in
when the pointer leaves, which pauses the video, so the post rests on its
cover. Play then resumes the same player. Full screen skips that, since the
pointer cannot leave it.

No chapters yet: they need timestamps, which the videos' descriptions would
have to supply; `TimeSlider.Chapters` draws them once a chapters track
exists. YouTube is blocked from the agent's network, so the player was
checked against a stand-in `window.YT` in Chromium (play, the clock, pause on
leave, resume, mute, seeking to the middle) and not against a real video.

## Logomark

A glass cube with a solid cube inside it, in the accent. The glass is three
inner walls under three faint white faces; the solid sits at the centre, behind
the front faces. Light and dark differ in colour only, never in geometry.

- `src/components/icons/yummacss-mark.tsx` draws it for the navbar, the mobile
  nav and the footer, with no tile. Every colour is a `light-dark()` pair, so it
  follows `data-theme`; gradient ids come from `useId`, since the mark renders
  more than once a page.
- `public/logo.svg` and `public/logo-dark.svg` are the mark on its rounded tile
  (`rx` 23 of 100). `favicon.svg`, `favicon.ico` (16, 32, 48) and
  `apple-touch-icon.png` (180, square, for iOS to round) use the dark tile,
  which reads on light and dark tabs alike.
- One version at every size, glass included: there is no flat or one-colour
  variant.

## OG images

Every page's link preview is drawn by `ImageResponse` from
`src/components/og-image.tsx`, light only: a canvas with rulers, the product's
mark, and one selected layer with handles and a tag. Nothing is hand-made.

- `/og.png` and `/ui-og.png` are the two homes: two lines, one word selected.
- `/docs/[slug]/og.png` selects the page title, with its description and, on a
  utility page, the first five classes of its first `<Reference>`.
- `/blog/[slug]/og.png` is the mark and the post's title, nothing else, for
  every post whether or not it has a cover. Yumma UI posts get the Layers mark.
- `/ui/components/[slug]/og.png` selects the component itself, from
  `public/og/ui/<slug>.png`. A component without a screenshot falls back to
  the docs layout.
- The mark tells the products apart: the cube for Yumma CSS, the stacked panels
  for Yumma UI.
- `src/components/og-marks.tsx` holds the light marks as plain SVG, since
  `ImageResponse` has no `light-dark()`.
- `pnpm og:components [url] [slug ...]` writes the screenshots from a running
  site, at 2x, on the OG page colour rather than the preview's white. `ACTIONS` opens a popup first (a dialog, a menu, a tooltip);
  `SKIP` leaves out components too thin or too wide to read small. The
  previews draw in `system-ui`, so the images carry the font of the machine
  that ran it; rerun them all on one machine.

