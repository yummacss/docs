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

## Where things stand

| repo | branch | state |
| --- | --- | --- |
| `docs` | `main` | `6eca3b18`. Playground merged (#108, #129, #130). |
| `docs` | `fix-layout` | PR #132, layout fixes |
| `docs` | `notes` | PR #133, this file |
| `yummacss` | `fix-scanner` | PR #11, tokenizer fix + `3.30.0` release prep |
| `yummacss` | `v4` | 4 ahead of `main`: colon-syntax parsing, fixtures migrated |
| `ui` | `release` | **published, `yummaui@0.1.0`** |

Published: `@yummacss/*` at `3.29.2`, `yummaui` at `0.1.0`. **`3.30.0` is
prepared and unpublished** - see Phase 1. There are eight packages, not nine;
`language-server` was deleted with the extensions.

`ui` is a **separate repo** (`github.com/yummacss/ui`). The folder and repo are
`ui`; the **published npm package is `yummaui`**, because `ui` is taken. Do not
"fix" that mismatch.

---

## How to work this file

**One phase per chat session.** Phases are ordered so that finishing one makes
the next cheaper or safer; do not start two at once. Within a phase the items
are already in the order to do them.

**Starting a session.** Paste this:

> Working on yummacss/docs. Read NOTES.md first, then start Phase N. TODO.md is
> Cursor's queue, leave it alone.

Replace N with the first phase that is not marked done. That is the whole
message; everything else is in this file on purpose.

**Ending a session.** Say "Time to clear session. Wrap up everything in
NOTES.md." The wrap-up rewrites the phase's entry with what actually happened,
deletes what is finished, and hands back the one-line starter for the next
session. Clear only after that lands.

**How work lands. Pull requests, never a direct commit.** Renildo previews and
approves. Branch names are short and made of real words - `fix-scanner`,
`notes`, `fix-layout` - with no generated suffixes. **PR bodies stay minimal**:
a line or two on what changed and why. The detail lives in this file, so a PR
that restates it is duplicating something that will drift.

**The rule for what goes in here** has not changed: an entry earns its place if
it changes what someone does next. Delete finished entries rather than striking
them through.

---

## The plan, in phases

Status: **Phases 1 and 2 done, both waiting on the `3.30.0` release.**
Phase 3 is next.

| # | Phase | Repos | Why it sits here |
| --- | --- | --- | --- |
| 1 | Fix the class scanner | `yummacss`, `docs` | Root-caused, small, and everything downstream writes classes. |
| 2 | Fix negative values | `yummacss` | Done. 72 utilities emitted CSS the parser threw away; shipping in `3.30.0`. |
| 3 | Yumma UI: `prune` | `ui` | The one thing a real user said she would use. Everything else on Yumma UI is polish. |
| 4 | Docs debt | `docs` | Cheap, mechanical, and the corpus the 4.0 codemod runs against first. |
| 5 | Retire `@yummacss/intellisense` | `yummacss`, `play` | Frees `play` and closes most of the `any` item. Independent of everything. |
| 6 | v4 decisions | none, design only | These gate the codemod and the canon list. Decide before building. |
| 7 | v4 build | all | The codemod, the canon list, the migration. Gated on 6.

**`TODO.md` is Cursor's lane and is not a phase.** It holds per-component API
fixes Renildo is having Cursor work through. Do not pick items out of it, do not
fix them in passing, and do not fold them into any phase here.

---

### Phase 1 - Fix the class scanner

**Done except the last step, which is gated on a release.**

The tokenizer is rewritten as a lexer in `yummacss` on `fix-scanner`
(PR #11, `d32bc57`), with 16 regression tests in
`tests/tokenizer.test.ts`; five of them fail against the old tokenizer. Root
cause and the measurements are in the Traps section.

Against the real 331-file docs source: 1579 tokens before of which 971
generated nothing, 1262 after of which 588 do. Nine classes are no longer
found and **all nine are in comments and JSDoc discussing classes**, none in
any className on the site. 75 previously-dropped classes are now found.

- [ ] **Publish `3.30.0`.** Prepared on `fix-scanner` (PR #11), carrying both
      this and Phase 2: CHANGELOG written, `pnpm bump 3.30.0` run across all
      nine package.json files, build and 150 tests green. Only
      `pnpm publish-packages` and a `v3.30.0` tag are left.
      `docs` depends on the published package, not the workspace, so nothing in
      `docs` can change until this lands.
- [ ] **Minor, not a patch:** `tokenizer()` gained an optional `filename`
      parameter, and the fix removes CSS that used to be generated - a patch
      must not change how a page renders, and this can. (A third reason applied
      until `migrate` was unwired: `main` was carrying it as an unreleased
      feature.)
- [ ] **`yummacss migrate` is unwired from the CLI, not merely undocumented.**
      It rewrites classes into the v4 colon syntax and **v3 cannot compile what
      it writes** - verified: `d-f` generates, `d:f` generates nothing, same for
      `bg:red-1` and `m:4`. Shipping it reachable would hand users a command
      that silently unstyles their project. The import, the `case "migrate"`
      and the help line are removed from `packages/cli/src/cli.ts`, with a
      comment saying why; `commands/migrate.ts`, the services and all 152 lines
      of `tests/migrate.test.ts` stay, because the tests import the services
      directly. **Re-wire it when v4 lands** - that is the whole change.
      Confirmed against the built binary: `yummacss migrate` falls through to
      the help text.
- [ ] **Then, in `docs/yumma.config.mjs`, in one commit:** replace the five
      enumerated `source` entries with the single glob
      `"./src/**/*.{ts,tsx,mdx,mjs}"`, and delete `safelist` entirely.
      **Measured:** the enumerated list reaches 330 files and 1167 classes, the
      broad glob 363 and 1262, and **it loses nothing** - every class the list
      finds, the glob finds. It also picks up `mx--4`, `d-i` and
      `bc-accent-dim/50` from `src/lib`, which is precisely why they were
      safelisted. The 91 extra tokens it collects are registry ids, page slugs
      and package names, none of which match a utility prefix, so they generate
      no CSS. **Enumerating directories is what created this bug**: `src/lib`
      was left out by accident and nothing said so. One glob cannot be
      accidentally narrow. The config carries this as a comment so it is not
      lost.
- [ ] `ro-90` is already gone: zero occurrences anywhere in `src` under either
      tokenizer, so it was only ever generating dead CSS.

### Phase 2 - Fix negative values

**Done.** On `fix-scanner` (`e93c8bb`), shipping in `3.30.0` alongside Phase 1,
so both land in one release. 31 regression tests in `tests/negative.test.ts`,
150 in the suite, build green.

It was two defects sharing one line of code. A leading `-` was applied to any
utility whose value started with a digit with no notion of whether the property
accepts one, so **72 utilities emitted CSS the parser discards** (`w--1` was
`width: -.25rem`). And `negateValue` returned the value unchanged when there was
no number in it, so the `-` was simply **ignored**: `m--auto` resolved to
`margin: auto` and `bg--red-1` to the same declaration as `bg-red-1`. Every
keyword and colour utility had a silent second spelling.

One rule fixed both: a leading `-` is meaningful only where the property accepts
a negative **and** the value is a number to negate. Anything else resolves to no
class.

Three things worth keeping:

- **Legality is keyed on the CSS property, not the utility** -
  `core`'s `acceptsNegative` in `helpers/negatable.ts`. A property is a fact
  about CSS, so a new utility mapping onto `margin-inline` inherits the right
  answer instead of needing someone to remember a flag. **Do not convert this
  to a per-utility boolean.**
- **Canon needed no change.** `validateClasses` resolves through the same
  `generateCSSRule`, so it reports these as unknown for free. There is a test
  asserting that, because the shared path is the only thing holding it.
- **Two that look like bugs and are not**, both covered by tests so nobody
  "fixes" them: negative grid line numbers are legal (`gcs--1` counts back from
  the end of the explicit grid), and negative `scale` mirrors. Also
  `letter-spacing`'s scale is *already* negative, so `ls--1` correctly yields a
  positive `.05em`, and transforms put the sign inside the parens
  (`transform: skew(-1deg)`) - a naive "output contains a leading minus"
  assertion fails on both.

Checked before shipping: `docs`, `ui` and `play` write 19 negative classes
between them and **every one still generates**.

### Phase 3 - Yumma UI: `prune`

**Decided 2026-08-28, after a real user's reaction.** She was shown
`add button --variant pill` and `add button-pill`, said neither made sense, and
said what she actually wanted was a way to delete what she was not using. That
is the signal worth acting on.

**Addressing stays exactly as it is.** `--variant` is gone from `cli.ts`
(replaced by `-a, --all`), and `add.ts` resolves a name against
`index.components[].component` **and** `index.blocks[].id`, so
`yummaui add button-group-pill` works directly. No component carries a
`variants` array any more: 36 components, 25 blocks, blocks addressed by flat
id. **Do not re-propose a `--variant` flag** - the thing it was for is served by
making the id addressable.

- [ ] **`yummaui prune`.** Deletes component files nothing in the project uses.
      One thing it must get right: **blocks import each other** via
      `from "./<id>"`, so "does anything import this file" is the wrong test -
      `button` looks used because an unused `button-group-pill` imports it. The
      correct test is **reachability from outside `componentsDir`**. Dry-run by
      default, print what it would delete, confirm before writing. `yummaui.json`
      holds only `componentsDir`, `alias` and `registry` - no manifest of what
      was installed - but `prune` does not need one, because `componentsDir`
      *is* the candidate set.
- [ ] Worth knowing it is safer than the alternative: the workflow it replaces is
      "delete the unused ones with AI", whose failure mode is deleting a file
      that *is* used, silently, until a build breaks.

**Parked, deliberately: whether blocks should exist at all.** Renildo's lean is
no - quality over quantity, components only, not `dialog-sign-up`. Do not act on
this yet. What is known if it is revisited: **only 10 of 36 components have
blocks** (dialog 7, button 4, checkbox 3, then 1-2 each), and the cost of an
unused block is **lines you own, not CSS** - dialog goes 246 to 643 lines with
all 7, while the CSS grows only 2733B to 3409B, because blocks reuse the same
utilities. The whole 84-file registry is 14KB of CSS. **The CSS argument against
blocks does not hold; the ownership argument does.**

**Polish, after `prune`. `yummaui` is published at `0.1.0`, so none of this
blocks a release.**

- [ ] Badge's icon wrapper sets `w-3 h-3`/`w-4 h-4` on a `<span>`, which does not
      constrain the SVG inside it. Harmless, but a lie in the code. Check
      Meter's `w-8 h-8` wrapper at the same time.
- [ ] A line on each page saying which file a code block belongs to. The base
      snippet's `@/components/ui/button` and the variant source's `./button` are
      both correct and look like drift. **`./` is load-bearing**:
      `generate-registry-json.mjs` builds `registryDependencies` by matching
      `from "./<id>"`, so rewriting it to the alias breaks
      `yummaui add <variant>` pulling its component.
- [ ] Seed an icon into the Badge, Separator, Meter and Tabs base demos. Each has
      an `icon` prop no demo passes, so the feature is invisible outside the
      table. Separator is the one that matters: an icon breaks the rule in half
      and centres the glyph in the gap, which is a spatial fact a type cannot
      state.
- [ ] **The ~30 `className` "any utility you pass wins" descriptions cannot be
      found.** Checked 2026-08-28: zero hits for that phrasing anywhere in `src`,
      and `className` does not appear in any of the 36 meta schemas at all.
      **Confirm and delete this entry rather than hunting for a string that is
      not there.** The cascade gotcha it referred to is still real.

### Phase 4 - Docs debt

- [ ] **12 utilities exist with a page but are not listed on it**, all logical
      properties: `border-radius` is missing its 8 block/inline/start/end
      corners (`bber`, `bisr`, `bier`, `besr`, `beer`, `bbsr`, `bssr`, `bser`)
      and `border-width` its 4 sides (`bbew`, `bbsw`, `biew`, `bisw`). These
      need `<Reference>` entries on the existing pages, not new pages.
      **Measured 2026-08-28: 239 core utilities, 227 referenced, 0 with no page
      at all.** The old "25 utilities" entry here was stale - `scroll-padding-*`,
      `scroll-margin-*`, `border-*-color`, `scale-*` and `inset-*` are all
      covered now.
- [ ] **`pnpm lint` is not clean** (10 errors on `main`). `pnpm validate` is down
      to 3 non-canon classes, all deliberate custom ones (`admonition-body`,
      `invisible`, `preview-spinner`). Do not fold the lint pass into an
      unrelated PR, and do not get blamed for it.
- [ ] **Decide whether `ComponentPreview` stays.** No MDX page references it any
      more (0 hits for `<ComponentPreview` and `<PropsTable` across
      `src/content`); the playground replaced both. If it goes, the leftover
      portal reset block in `globals.css` goes with it, and `props-table.tsx`
      with it.
- [ ] 23 `example`-kind previews are undocumented after the MDX migration.
- [ ] **Unreproduced:** radio, select, breadcrumb and onboarding pages reported
      as erroring. All four returned 200 with no console errors and
      `/api/ui-md/` 200. Needs the actual error text.
- [ ] `grid-column-span.mdx` and `grid-row-span.mdx` duplicate `grid-column.mdx`
      and `grid-row.mdx` (core has `grid-column` with prefix `gc-s`, so the span
      concept *is* `grid-column`). Deleting needs redirects in `next.config.ts`
      **and** a check of what core's `slug` points at first. **The hover-link
      consumer for `slug` is gone with the extensions**, so this is now a
      docs-internal decision rather than an API contract.
- [ ] `ui/customization.mdx` becomes the Yumma UI API docs. Cut its two colour
      sections (they duplicate `colors.mdx`), keep and expand "Atomic
      customization" and "Component Slots". `### Flexible by Design` is an empty
      heading: write it or drop it. It also has a typo: "all you need need to do".
- [ ] `responsive-variant.tsx`, `hover-state.tsx` and `negative-values.tsx`
      render JSX rather than text, so their content is absent from the `.md`
      routes. Possible fix: drive them from `@yummacss/core` so the content is
      data.
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

### Phase 5 - Retire `@yummacss/intellisense`

The extensions are already deleted (see Rejected). This is the package.

- [ ] **`play` is the only consumer left**, importing
      `@yummacss/intellisense/monaco` from `play/src/utils/providers.ts`. The
      package is 1,243 lines and its **only adapter is Monaco**, which is play's
      own editor, so it has become play's editor logic living in the CSS
      monorepo.
- [ ] Before moving anything: `validate.ts` is a thin wrapper over
      `@yummacss/nitro/browser`, so the real logic is already in nitro. The
      substantial editor-agnostic parts are `sort.ts` (252) and `hover.ts` (251).
      Decide whether those move into `play` or become something nitro exposes.
      `constants.ts`'s `CLASS_ATTR_REGEX` is **not** a third copy of the scanner
      bug - it is anchored on `class=`, so it cannot desync.
- [ ] What survives of the `any` item afterwards is the colour-merge block
      (`const { percentage, ...userColors } = ... as any` then `createColors`),
      duplicated **five times**. Worth consolidating **only because 4.0 decision
      #16 (OKLCH) rewrites `createColors`** - five call sites, five chances to
      miss one. Do not refactor core/nitro/canon internals; they are clean and
      4.0 rewrites that surface anyway.
- [ ] `CHANGELOG.md`: `3.24.7` writes `## Changed` instead of `### Changed`; one
      `### Fix` among 34 `### Fixed`; `3.28.0` has no date on its heading.
- [ ] Core's `scroll-*` slugs are inconsistent: mostly fully qualified
      (`scroll-margin#scroll-margin-top`) but two are short (`#bottom`,
      `#inline-start`). The docs headings were written to match each slug exactly
      so all 16 anchors land; normalise core and those headings can go uniform.

### Phase 6 - v4 decisions

- [ ] **Bounded scale or unbounded?** See the 0-384 section below. This one
      decides the shape of canon, so it goes first.
- [ ] **Four config keys or one `theme.extend`-shaped mechanism?** Fonts,
      containers, viewport-minus and named grids all want the same shape.
- [ ] **What `@yummacss/canon` ships**, which falls out of the first two: an
      enumerable list, or a parser.
- [ ] Colored box-shadows: 3.29 or 4.0?
- [ ] `xs` at 32rem has no matching breakpoint. Drop it or add the breakpoint.

### Phase 7 - v4 build

- [ ] The 4.0 codemod. Everything else in 4.0 depends on it existing, and it
      gates the release.
- [ ] `@yummacss/canon`'s canon list, in whatever shape Phase 6 settled.
- [ ] `docs`: every code example. Run the codemod here first; largest real
      corpus, and it has to be migrated anyway.
- [ ] The config-driven generators, per the Phase 6 answer.
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

  -v, --variant <name>   NOT IMPLEMENTED, see backlog
      --overwrite        replace existing files
  -y, --yes              skip prompts
```

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

**Shipped at `0.1.0`.** The earlier argument for `0.0.1` - that `0.0.x` is the
only range where every release is free - is settled and does not need
re-litigating. What carries forward is the trigger it named: **the thing that
forces a version decision is not a date and not a component count, it is the
first outside user filing an issue the schema cannot answer without a breaking
change.** Stay on patches until then.

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
exist and canon reported clean. `validate-yummacss.mjs` now also scans string
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
doing nothing, which `validate-yummacss.mjs` had been reporting all along. The
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
- **Colored box-shadows.** 3.29 or 4.0?
- **Delete the `skeleton` component and let `loading` cover it via a prop.** Way
  less code, and nothing obvious explains why nobody does this.
