# Working notes

Operational backlog, standing conventions, and the traps that have cost real
time. **Not a session log.** Design decisions go in
`src/content/blog/yummacss-4.0.0.mdx`; shipped work goes in the monorepo
`CHANGELOG.md`; live API bugs go in `TODO.md`.

**`TODO.md` is Cursor's lane, not this one.** It holds small per-component API
fixes that Renildo is having Cursor work through. Do not pick items out of it
and do not fix them in passing; if something in this file overlaps, say so and
leave it.

Pruned 2026-08-28 from 2987 lines to this. **The rule that produced the cut:
an entry earns its place if it changes what someone does next.** A narrative
of work that is finished does not. If you close something in here, delete the
entry rather than striking it through, and do not add a "what shipped today"
section.

One meta-note worth keeping: clearing chats is not what costs tokens. A fresh
session re-derives from this file cheaply **if the reading is surgical**. Keep
clearing; keep this file short.

---

## House rules for a change

**Branch names are short and made of words.** `scanner-fix`, `sidebar-offset`,
`canon-rename`. No random suffixes, no six-word descriptions. (Sessions started
from the web get a generated branch name that breaks this; that is the harness,
not a precedent.)

**One line of comment, and only where the line is not obvious from the code.** No multi-line
block above every change, no restating what the next statement does, no narrating
a decision that the diff already shows. This applies to Cursor's changes as much
as to mine. The bar: a comment earns its place when it records something the
reader **cannot** recover by reading the code - a bug it works around, a value
that had to be measured, an ordering that looks arbitrary and is not. Everything
else belongs in this file or in the commit message. Existing multi-line comments
are not a licence to add more; shorten them when you are already in the file.

---

## Where things stand

| repo | branch | state |
| --- | --- | --- |
| `docs` | `main` | `b4bdde7`. Playground merged (#108, #129, #130). |
| `yummacss` | `main` | carries the 4.0 codemod (`migrate`, #10) and `fix/typecheck-clean` |
| `yummacss` | `v4` | 4 ahead of `main` and fast-forwardable: colon syntax, fixtures |
| `ui` | `main` | `d2d59f4`, published |

Published: `@yummacss/*` at `3.29.2`, **`yummaui` at `0.1.0`** (`0.0.1` on 2026-08-16,
`0.1.0` on 2026-08-20). Merged branches are deleted; restart from `main` for new work.

`@yummacss/intellisense` is published at `3.29.2`. Both editor extensions, their repos
and the Zed marketplace PR are deleted, but the package is **not** orphaned: `play`
imports `@yummacss/intellisense/monaco` in `src/utils/providers.ts`. That is its only
consumer. What happens to it is Phase 4, and the answer is "dissolve, after 4.0", not
"kill now" - the reasoning is there.

`ui` is a **separate repo** (`github.com/yummacss/ui`). The folder and repo are
`ui`; the **published npm package is `yummaui`**, because `ui` is taken. Do not
"fix" that mismatch.

---

## The plan, in phases

Ordered by severity. **Do not start a phase while an earlier one has open
items**, unless the item says it is parked on a decision. Each phase says what
"done" means, so the next session can pick up without asking what is next.

### Phase 0 - One extractor. Everything else is built on this

**Severity: this decides whether the 4.0 migration is correct.** Three separate
pieces of code answer "where are the class strings in this file", all three are
regex, and all three are wrong in different ways:

| Where | Shape | What it gets wrong |
| --- | --- | --- |
| `nitro/src/tokenizer.ts` | sweeps the file for lone quotes | parity bug, 469 tokens lost in `docs` |
| `cli/src/services/rewrite.ts` | anchored on `class=`, `cn(`, `clsx(`, `cva(` | never reaches class maps: **1161 of 2403 class tokens in `src/registry/ui` (48%, 55 of 84 files)** would stay on v3 |
| `intellisense/src/constants.ts` | anchored, quotes paired by backreference | correct on attributes, blind to class maps |

The codemod's narrowness is deliberate and right - it writes files back, so a
false match corrupts source. The answer is not to loosen it, it is to give all
three the same primitive.

- [ ] **Write `extractClassStrings(content)` in `@yummacss/nitro`.** A character
      lexer, not a regex sweep: walk the file, track whether you are inside a
      `"`, `'`, `` ` ``, a comment or an escape, and emit each literal with its
      offsets. ~50 lines, no dependency, and language-agnostic, which matters
      because the source glob includes `.mdx` and consumers use `.html`,
      `.vue`, `.svelte`. Emit a *context* with each literal (class attribute /
      call argument / object value / bare) so each caller can choose its own
      risk level from one scan.
- [ ] **Point the tokenizer at it.** Fixes the parity bug by construction.
      Regression fixture: a file with `item: ""` followed by a class map, which
      today loses everything after line 1.
- [ ] **Point the codemod at it** and let it rewrite object values whose content
      is all-classes - the same test `validate-yummacss.mjs` already uses for
      `UPPER_SNAKE` maps. Keep writing back only what the extractor located by
      offset, never by re-matching.
- [ ] **Point canon at it**, which closes "canon is blind to class maps" in the
      traps below without a fourth implementation.
- [ ] **Then delete the 16 scanner entries from `yumma.config.mjs`'s safelist**
      and confirm the CSS still generates. Only `mx--4` and `d-i` stay, and only
      because `src/lib/*.mjs` is genuinely outside `source`.

**Why a hand-written lexer and not a battle-tested parser.** The instinct is
right and the tool is wrong. A real JS parser (`oxc`, `acorn`, `swc`) only reads
JS and TS, and the scanner has to read `.mdx` today plus whatever a consumer
points `source` at - `.html`, `.vue`, `.svelte`, `.php`. One parser per language
is not a smaller pile of custom logic than one lexer, and it is why Tailwind
wrote its own scanner rather than adopting a parser. The bundle argument cuts
the other way too: nitro is build-time, so nothing here reaches the consumer's
CSS or their client bundle, but its dependencies do land in their
`node_modules`, their install time and their supply chain - `oxc-parser` ships
per-platform native binaries for this. **And an AST is more than the job needs.**
The question is "where does each string literal start and end", which is a
lexer, not a parse: no grammar, no language, ~50 lines, and exhaustively
testable. Reach for a real library where the grammar is genuinely hard and the
output is a file we hand to someone else - that is the codemod's *rewriting*
half (`magic-string` for offset-safe edits is worth a look), not the scanning
half.

**Done when:** the safelist is two entries, the tokenizer fixture passes, and the
codemod rewrites a class map in a test.

### Phase 1 - Ship 4.0

- [ ] Teach the extractor and the codemod the colon syntax; `d:f` and `@sm:h:`
      have to survive a round trip. This is why Phase 0 comes first.
- [ ] `@yummacss/canon`'s canon list ships with 4.0, or every v4 class reads as
      unknown to AI tools and to `validate()`.
- [ ] Run the codemod over `docs`. Largest real corpus, has to be migrated
      anyway, and it is the acceptance test for Phase 0.
- [ ] Fast-forward `v4` into `main`, or keep working on `v4` deliberately. It is
      4 commits ahead and `main` is 0 ahead of it, so the choice is still free.

**Done when:** `docs` builds green on v4 syntax and 4.0 is published.

### Phase 2 - The two layout bugs. Small, visible, not release-gated

Both hit every Yumma UI component page, both are diagnosed, neither is blocked
on anything. Do them whenever 4.0 is waiting on something else.

- [ ] **The sidebar's top items are hidden behind the navbar on any page short
      enough not to scroll.** On `/ui/components/*` and `/ui/customization` the
      first section label and its first links are unreachable. The navbar is
      `p-f ix-0 t-0` (`navbar.tsx`), `main` carries **no top padding**, and the
      article column compensates with its own `pt-12`. The sidebar compensates
      with nothing: it relies on `p-st t-20` in `sidebar-nav.tsx`, and sticky
      does not engage until the page scrolls, so on a short page the aside
      renders at document top with its first 5rem under the navbar. `toc.tsx`
      has the identical pattern and the same latent bug. **Fix the static
      offset, not the sticky one** - the sticky value is already right.
- [ ] **The page title and the pagination arrows overflow on small screens.**
      `d-f ai-c jc-sb` with an `fs-4xl` `h1` that cannot shrink, in both
      `app/docs/[slug]/page.tsx` and `app/ui/components/[slug]/page.tsx`. A long
      unbroken title (`@yummacss/runtime`) has a wide min-content width and
      pushes the arrows past the right edge. The docs page's `Pagination` also
      lacks the flex-shrink the UI page's wrapper has. Wants **`min-w-0`** on the
      title (`min-w` is the prefix; `mw-0` is not a class - it is one of the two
      things `pnpm validate` already flags in `admonition.tsx`) and either a wrap
      or a stack below `@sm`.

### Phase 3 - Yumma UI, next patch

- [ ] **The API bug list in `TODO.md`. Cursor owns this queue.** Renildo's own
      pass over the playground; everything in it is a real defect the playground
      exposed by making props exercisable for the first time. Listed here so the
      work is visible, not so it gets picked up.
- [ ] Badge's icon wrapper sets `w-3 h-3`/`w-4 h-4` on a `<span>` (`badge.tsx`
      `SIZES`, applied as `iconClasses`), which does not constrain the SVG inside
      it. Meter's `w-8 h-8` wrapper is the same.
- [ ] Seed an icon into the Badge, Separator, Meter and Tabs base demos. Each has
      an `icon` prop no demo passes, so the feature is invisible outside the
      table. Separator is the one that matters: an icon breaks the rule in half
      and centres the glyph in the gap, which is a spatial fact a type cannot
      state.
- [ ] A line on each page saying which file a code block belongs to. The base
      snippet's `@/components/ui/button` and the variant source's `./button` are
      both correct and look like drift. **`./` is load-bearing**:
      `generate-registry-json.mjs` builds `registryDependencies` by matching
      `from "./<id>"`, so rewriting it to the alias breaks
      `yummaui add <variant>` pulling its component.

### Phase 4 - After 4.0 ships: renames and package shape

One announcement, three moves. Not before 4.0: these are npm renames on top of a
syntax break, and the two should not land in one release.

- [ ] **`canon` -> `lint`, `runtime` -> `cdn`.** Both names describe what the
      package does rather than what it is called internally. What moves with
      each: the npm package, the monorepo directory, `canon.mdx` / `runtime.mdx`
      and their `sidebarConfig` entries, redirects in `redirects.ts`,
      `llms.txt`, site search, and every mention in the tooling pages. `canon`
      also survives in prose as a concept ("canon list", "canon-valid"), which
      the rename does not have to follow.
- [ ] **Then dissolve `@yummacss/intellisense`, in this order.** Its only
      consumer is `play` (`src/utils/providers.ts`, six registrations against
      `@yummacss/intellisense/monaco`). 1243 lines: 924 editor-agnostic plus a
      319-line Monaco adapter, one test (`tests/hover.test.ts`), published at
      `3.29.2`. It is not dead code, it is **misfiled** code:
      1. `validate.ts`, `conflicts.ts` and `sort.ts` are lint features, not
         editor features. They belong in `lint` once the rename lands, and the
         CLI grows sort and fix from them.
      2. `hover.ts`, `core.ts` and `adapters/monaco.ts` are `play`'s editor
         binding and belong in `play`.
      3. Deprecate `@yummacss/intellisense` on npm in the same announcement as
         the two renames.
      **Do not do this before 4.0.** Every one of those 924 lines has to learn
      the colon syntax, and doing that inside a Next app with no test harness,
      while also moving it, is the worst version of both jobs.

### Phase 5 - Docs debt. Real, none of it urgent

- [ ] **`pnpm lint` is not clean** (10 errors on `main`), and `pnpm validate`
      flags `admonition-body` and `mw-0` in `admonition.tsx` - `mw-0` is not a
      class at all, the fix is `min-w-0`. Pre-existing. Do not fold these into an
      unrelated PR, and do not get blamed for them.
- [ ] **Decide whether `ComponentPreview` stays.** No MDX page references it any
      more (0 hits for `<ComponentPreview` and `<PropsTable` across
      `src/content`), but `component-preview.tsx` and `props-table.tsx` are both
      still wired into `mdx-components.tsx`. If it goes, the leftover portal
      reset block in `globals.css` goes with it, and `props-table.tsx` with it.
- [ ] 24 `example`-kind registry entries are undocumented after the MDX
      migration.
- [ ] **Unreproduced:** radio, select, breadcrumb and onboarding pages reported
      as erroring. All four returned 200 with no console errors and
      `/api/ui-md/` 200. Needs the actual error text.
- [ ] 12 logical border utilities exist in core with no page and no
      `<Reference>`: `border-{block,inline}-{start,end}-{radius,width}` and
      `border-{start,end}-{start,end}-radius`. They belong as entries on
      `border-radius.mdx` and `border-width.mdx`, not as new pages.
- [ ] `grid-column-span.mdx` and `grid-row-span.mdx` duplicate `grid-column.mdx`
      and `grid-row.mdx` (core has `grid-column` with prefix `gc-s`, so the span
      concept *is* `grid-column`). Deleting needs redirects in `redirects.ts`
      **and** a check of what core's `slug` points at first: hover links are
      built as `yummacss.com/docs/${util.slug}`, so a careless delete recreates
      404s that were already fixed once.
- [ ] `ui/customization.mdx` becomes the Yumma UI API docs. Cut its two colour
      sections (they duplicate `colors.mdx`), keep and expand "Atomic
      customization" and "Component Slots". `### Flexible by Design` is an empty
      heading: write it or drop it.
- [ ] `llms-full.txt` walks `sidebarConfig` rather than the blog collection, so
      blog content is absent from it. **The live question is whether it should
      exist at all** - models are expensive to run over a dump, the per-page
      `.md` routes are the right granularity, and they already carry source plus
      the API. `llms.txt` (the index) stays either way.
- [ ] `normalize.mdx` is hand-written; consider sourcing it from
      `@yummacss/nitro` so it cannot drift.
- [ ] Draft blog posts have no listing. They are already excluded from the
      listing, RSS, sitemap and the production route, and render only in
      `next dev`. A dev-only listing is cheap; a public route exposes unfinished
      writing. Different decisions, decide which one is wanted.
- [ ] `CHANGELOG.md`: `3.24.7` writes `## Changed` instead of `### Changed`; one
      `### Fix` among 34 `### Fixed`; `3.28.0` has no date on its heading.
- [ ] Core's `scroll-*` slugs are inconsistent: mostly fully qualified
      (`scroll-margin#scroll-margin-top`) but three are short
      (`scroll-margin#bottom`, `scroll-margin#inline-start`,
      `scroll-padding#bottom`). The docs headings were written to match each slug
      exactly so all 16 anchors land; normalise core and those headings can go
      uniform.
- [ ] The `any` density is concentrated in `packages/intellisense`: 33 there, 0
      or 1 everywhere else, with the colour-merge block repeated four times.
      **Phase 4 deletes that package, so do not spend time here.**

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
| `stage.tsx` | `ComponentPlayground`, used from MDX. Live preview + usage snippet. Keeps the last ready frame while the next loads. |
| `rail.tsx` | The right column, Component API. Reads context; renders nothing when context is null. |
| `control.tsx` | One widget per prop. Enum -> select, boolean/icon slot -> `Toggle`. |
| `install.tsx` | `yummaui add` copy menu. `prominent` variant for the page header. |
| `../preview-frame.tsx` | The iframe. Exports `usePreviewContainer()` for portal targets. |
| `../../utils/demo.tsx` | `EXAMPLE_ICONS`, `exampleIcon`, `resolveIcons`, `seedValues`. |
| `../../utils/props.ts` | `typeOf`, `isControllable`. |
| `../../utils/snippet.ts` | `buildUsage`, `tokensToText`, `TOKEN_COLORS`. |

The provider lives in the layout, but **layouts do not re-render on navigation
in this Next**, so the slug comes from `usePathname` in a Client Component. Same
trick in `token-block.tsx` to find the current page's `primitive`.

333 of 407 props across 36 schemas are controllable (82%); no component has zero.

### Settled design, do not re-litigate

Each of these was asked for explicitly and at least one was lost once in a merge
and had to be restored.

- **One rail section.** Not two. Interactive and read-only props mix in the same
  list.
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

**The registry stays in `docs`, at `src/registry/`.** Served as static JSON from
`public/ui/r/`, generated at build time by `scripts/generate-registry-json.mjs`
(gitignored output). The CLI **fetches it over HTTP** and imports nothing. Six
things in `docs` need those files on disk: the `yumma.config.mjs` source glob
(CSS generation), `src/registry/index.ts`'s dynamic import map (bundling),
`rehype-registry.mjs`, both generators, and `validate-yummacss.mjs`. Moving the
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

  -a, --all              add every component
      --overwrite        replace existing files
  -y, --yes              skip prompts
```

**`--variant` is gone and stays gone.** It was advertised and never wired, its own
help example exited 1, and the decision was to let users customise the file they
own. `--all` took the slot. `VERSION` is no longer retyped either: `cli.ts` imports
`version` from `package.json`, after the two drifted once.

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

**`0.0.1` shipped, then `0.1.0` for `add --all`. Stay in `0.x`.** The version is
a claim about stability, and the schema has been proven against 36 components but
**zero outside users**. `0.x` is the range where every release is free. The number
is cheap to raise and expensive to lower, so nothing gets to `1.0` on a date or a
component count: **the trigger is the first outside user filing an issue the
schema cannot answer without a breaking change.**

---

## Docs site conventions

**Sharp angles only. No cards, no rails, no rounded corners, no framed images.**
`src/app`, `src/components` and `src/styles` contain **zero** `br-*` utilities
and zero `border-radius`; every route is plain typography grouped by whitespace.
The only circle in the repo is the logo. **Run that grep before proposing any new
visual structure.** (The 1690 `br-*` uses all live in `src/registry`, including
384 `br-9999` across 149 files - if "sharp only" ever becomes a brand rule rather
than a page preference, that is where the decision lands, and it is a large job.)

**Palette:** page `#151724`, surface `#1a1d2e`, border `#232741`, accent
`#bec6f2`, accent-dim `#9aa5ef`, code `#dda2f6`, diff-add `#a8e1ad`, diff-remove
`#e1a8a8`. Eight semantic colours, no light/dark pairs, because the site is
single-scheme.

**Grid:** `d-g gtc-1 g-8 @lg:gtc-12`. Sidebar 3, content `@lg:gc-s-6`, rail 3.
The rail is about 15rem of content at 1440px.

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

**Package managers: only pnpm and npm, pnpm always the first tab.** Every install
or CLI command lives in a `<CodeGroup>` with exactly two fences, `title="pnpm"`
then `title="npm"`, including in blog posts. `pnpm add X -D` / `npm install X -D`,
`pnpm dlx X` / `npx X`. **`pnpx` does not exist.**

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

**Tests:** `tests/copywriting.test.ts` bans em dashes, contractions and first
person outside the blog, trailing whitespace, and British spelling; headings are
Title Case; descriptions are one sentence, 120 chars max, ending in punctuation.
`tests/content.test.ts` checks that a playground is flagged in frontmatter and
only exists where a schema backs it.

---

## Traps

The expensive ones, in rough order of how much time they have cost.

**A class can be canon-valid and still generate no CSS.** `c-slate-12` is a real
token in `@yummacss/core` (`#101316`) but nothing is emitted for it, so four
popups inherited the page's own white text and Onboarding's step icon rendered
white on white. `validate-yummacss.mjs` will not catch this - it checks whether a
class is *canon*, which `c-slate-12` is. **`getComputedStyle` on the real element
is the only way to tell.** A different failure from the scanner bug below: the
class is extracted, it just generates nothing.

**The scanner drops class names by quote parity, and an empty string literal is
what flips it. Diagnosed 2026-08-28; this is one bug, not the two it looked
like.** `packages/nitro/src/tokenizer.ts` finds classes with a list of global
regexes, among them `/"([^"]+)"/g`. Because `[^"]+` spans newlines and demands at
least one character, the regex pairs quotes **across the whole file** rather than
per literal, and `""` cannot match: its opening quote fails, its closing quote
starts a match that runs to the *next* literal's opening quote. From that point
the phase is inverted - every real class string lands in a gap and is discarded,
while the code between literals is captured and scanned as classes. Proof in
`registry/ui/accordion.tsx`, where `square: { item: "" }` on line 24 flips it and
`"d-f fd-c w-100% max-w-96"` on line 77 is captured as
`";\n\n  const rootClasses = [\n    "` instead. This explains everything the
older notes could not: why the same class survives in one file and not another
(parity, not position), why `bc-accent-dim` lived while `bg-accent-dim` died, and
why `"className={\`d-f"` and `"o-60\""` came back from `nitro.scan()` as
garbage - the backtick regex has the same shape and any `"` inside a `${}` flips
it too.

**Scale:** across `docs`'s 165 scanned `.ts`/`.tsx` files, 70 contain an empty
literal and **469 distinct class tokens are lost**. Every non-`code-decorate`
entry in `yumma.config.mjs`'s safelist is a symptom of this one bug, so treat
that safelist as a bug list, not as configuration.

`[^"]+` -> `[^"]*` in all three quote regexes restores parity (`accordion.tsx`
goes from 29 tokens to 64) and needs a zero-length-match guard, but it is a patch
on a design that guesses at literals with regex alternation. **The real fix is a
literal scan, and 4.0 is when to do it**, since the colon syntax widens what the
regexes have to guess at. Until it lands the old workaround still holds: rewrite
dynamic classNames to `[...].filter(Boolean).join(" ")` with **zero** backticks,
not fewer.

**If a component renders unstyled despite the class name looking correct**, check
the built CSS for that literal before assuming the component is wrong:
`grep -o "\.<class>{[^}]*}" .next/static/chunks/*.css` after a clean
`rm -rf .next && pnpm build`. Reproducing the tokenizer itself needs no build:
copy it into a `.mjs` probe and run it over the file.

**Write probes to a `.mjs` file, never a bash heredoc.** Backslash mangling
between the heredoc and a JS regex has produced false "missing" results at least
three times, on classes that were present. `javascript_tool` against the live DOM
is better still - no shell in the path at all.

**`src/lib/*.mjs` is not scanned for classes and adding it to `source` does not
help.** `code-decorate.mjs` writes class names; the glob was tried and the
scanner still missed the file. Its classes must be safelisted by hand
(`mx--4`, `bg-accent-dim/10`, `bc-accent-dim/50`, `d-i`).

**A caller's `className` cannot reliably override a class the component already
sets** for the same property. Which one wins is decided by the generated
stylesheet's rule order, not by position in the `class` attribute. Confirmed:
`<Avatar className="bg-indigo-2">` against the component's own `bg-silver-1`
rendered silver; a `w-10` against its `w-12` rendered at 12. Yumma CSS has no
`!important` escape hatch. **When a recipe needs a real per-instance override,
that is a real prop, not a className string** (Avatar's `tint`, Skeleton's `size`,
Toggle's `swatchClassName`). `className` is still fine for anything the component
leaves unset.

**Canon is blind to class maps, and so is the 4.0 codemod** - both read
`className` attributes, which is useless for a prop-driven component where
classes live in
`const SHAPES = { rounded: "br-lg", square: "br-none" }`. `br-none` does not
exist and canon reported clean. `validate-yummacss.mjs` now also scans string
literals inside `UPPER_SNAKE` class maps plus any multi-token string whose tokens
*all* look like classes. Valid `br-` values: `0, xs, sm, md, lg, xl, xxl, 3xl,
100%, 50%, 9999, px`. Opacity is percentage-based, so `o-1` means 1%, not 1.

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

**Bump `RUNTIME_VERSION` in `play`'s `panels/preview.tsx` on every release**,
alongside the `package.json` dependencies. It was unpinned once and silently
tracked `latest`; pinning it swaps that for the opposite failure, a preview
quietly running an old runtime, which is harder to spot.

**Do not eyeball theme colours out of `eclipsa.json` by scope name.** Run
`codeToTokens` on the exact construct and read the colours off the output. Shell
command `#F5FAFF`, argument `#BEC6F2`, space `#B9BED5`.

**`yummacss.com` 308-redirects to `www.yummacss.com`.** `curl` checks without
`-L` are not outages.

---

## Rejected. Do not rebuild

- **The blog timeline**, after ten mockups. Rejected because it introduces a
  rail, marker blocks and bordered thumbs - three pieces of visual vocabulary
  that exist nowhere else on the site. Two findings worth keeping: a staggered
  timeline scans *worse* (3 posts above the fold versus 5, because the eye
  zigzags), and a snake weave cannot carry year headings without breaking the
  line.
- **A releases page.** Built and reverted the same day. It re-rendered
  `CHANGELOG.md`, which GitHub already renders, so `/releases.md` was
  byte-identical to GitHub's raw file, and the route was invisible to site search
  because `search-data.ts` indexes only `allDocs` and `allUis`. **If the itch
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
- **Landing page and logo redesign.** Both attempted, both dropped. **Do not
  restart unprompted.** Four landing directions (Specimen, Index, Mechanism,
  Marginalia) were rejected as "messy, hard to scan, overwhelming", and a calmer
  rebuild was dropped too; explicitly ruled out as too generic are a centred
  heading over centred buttons, and a code block comparing Yumma CSS to other
  frameworks. The logo brief sharpened to **one circle, one square and one
  triangle, white, sharp angles only**, eight arrangements were drawn, none
  chosen, and then it was shelved. Method note: mockups live at
  `public/mockups/` (gitignored) served by `next dev`, with real fonts copied out
  of `node_modules/@fontsource/*` so type is faithful.

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

**Nested variants: keep media + state, drop state+state.** Verified against the
generator: `f:h:bg-red` produces `.f\:h\:bg-red:focus:hover`, which is real but
almost useless; `@sm:h:bg-red` ("hover styles only above 40rem") is the valuable
case, since hover is unreliable on touch. Dropping state+state removes parser
surface and codemod cases at close to zero cost. Recorded as #20 in the 4.0 draft.
Also known: stacking is order-independent (`@sm:h:` == `h:@sm:`), and **two media
queries silently collapse** (`@sm:@lg:bg-red` emits only `64rem`, dropping `@sm`
with no warning).

### Killing custom classes, without arbitrary values

The goal is to remove the *need* to write custom CSS without adopting Tailwind's
arbitrary-value escape hatch. All three below take the same shape, which is why
they belong together: **move the thing into `yumma.config.mjs` and generate a
utility for it.** The user names a value once, in config, and gets a real utility
with a real name; they do not inline a value into a class and get an unnamed one.

1. **Custom font families.** Colours are already configurable; families are not,
   which is the whole reason `.ff-e` exists. Config gives `ff-<name>`. Two things
   to settle: the docs need `ff-e` scoped to `article h1..h6`, which a utility
   does not do by itself, so that rule stays and only the class definition goes;
   and `ff-m` plus the default family already exist as built-ins, so config has
   to merge rather than replace, exactly as `colors` does.
2. **A `container` config.** `.cnt {}` was cut in 3.0 for being opinionated, and
   that was right: **a built-in container is opinionated, a configured one is
   not.** This site would want **two**, so the config shape is a map of named
   containers, not a single value.
3. **Viewport-minus utilities.** `max-height: calc(100dvh - 5rem)` appears twice
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

**The honest ceiling on the whole idea:** `globals.css` today has two custom
classes (`docs-container`, `ff-e`), which #1 and #2 would remove entirely, plus
one selector-scoped rule no utility can replace - the preview reset, which matches
Base UI portals in `<body>` by role and attribute. **Some CSS is a *selector*
problem, not a value problem.** Aim at the value problems and say so.

---

## Parked

- **Interactive palette on `colors.mdx`**: type a hex, see the 13 generated
  shades. Same blocker as exposing `yumma.config.mjs` in `play` - `loadConfig`
  genuinely reads from disk (`node:fs`, `node:crypto`, `tinyglobby`), so it
  cannot simply be re-exported from `@yummacss/nitro/browser`. Needs a real
  browser config path: parse a config from a string in memory rather than resolve
  and import a file.
- **Colored box-shadows.** 3.29 or 4.0?
- **Delete the `skeleton` component and let `loading` cover it via a prop.** Way
  less code, and nothing obvious explains why nobody does this.
