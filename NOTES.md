# Working notes

Operational backlog & session log. Gitignored: this is a scratchpad, not a
deliverable.

---

## START HERE, written 2026-08-08 for picking this up cold

**Where the work is.** Branch `feat/yumma-ui`, commit `4ef86161`
("refactor: clean up unnecessary components in favor of the API reference
table"). 84 files, 865 insertions, 1724 deletions, 23 registry files removed.
Build green, 279 pages.

**If the files look old, check the branch.** `main` is at `68f3fc4f` and
predates the entire Yumma UI migration, so on `main` every `/ui` page still
has its pre-curation example list and the `-base` id suffix. Nothing is lost;
it is just a different branch.

```
git checkout feat/yumma-ui
```

There is also a `stash@{0}` ("WIP on feat/yumma-ui: b95bb645 restore the Base
suffix") that predates 2026-08-08 and has nothing to do with this work. Decide
whether it is still wanted or drop it.

**What is done.** All ten items raised 2026-08-07 are closed. The detail is in
the next section; the short version is that Command Palette, Button Group, the
invisible popup text, the props-table spacing, fixture folding, the
Installation section and the curation pass are all finished, and item 10's
"some components are not migrated" was Skeleton, now fixed.

**Two questions waiting on Renildo, both explained but not answered:**

1. **Cut the `--variant` lines from `ui/src/cli.ts`?** The help advertises
   `-v, --variant <name>` and gives `add button --variant pill` as an example;
   `add.ts` never reads the flag, so that command exits 1. Renildo's lean was
   "remove it, let users handle customization", which is already how it
   behaves. Blocks keep their own command (`add button-group`,
   `add dialog-sign-in`) because those are real files. `ui` is on branch
   `release` and clean, so nothing has been touched there.
2. **Seed an icon into the Badge, Separator, Meter & Tabs base demos?** Each
   has an `icon` prop that no demo anywhere passes, so the feature is invisible
   outside the props table. Separator is the one that matters: an icon breaks
   the rule in half and centres the glyph in the gap, which is Renildo's own
   example of a spatial fact a type cannot state. Renildo said the components
   "look good", which they do; this is about a prop nothing demonstrates,
   which is a different point and may not change his answer.

**Still in the bucket, nothing blocking:**

- ~30 `className` descriptions still promise "any utility you pass wins".
  Skeleton's two now tell the truth; copy that wording to the rest.
- A line on each page saying which file a code block belongs to, so the base
  snippet's `@/components/ui/button` and the variant source's `./button` stop
  looking like drift. Both are correct; see the section below for why `./` is
  load-bearing.
- Badge's icon wrapper sets `w-3 h-3`/`w-4 h-4` on a `<span>`, which does not
  constrain the SVG inside it. Harmless today, a lie in the code. Check
  Meter's `w-8 h-8` wrapper at the same time.
- `pnpm publish` from `ui` still waits on a human read of the widened APIs:
  thirteen components from the migration, plus Skeleton's `size` and Rating's
  `readOnly`. Skeleton's is the one to look at hardest, because it exists only
  because `className` cannot override what a component already sets. If the
  cascade is ever solved at the framework level, that prop is a workaround to
  remove.

**Parked on purpose:** the Yumma CSS v4 config work (font families,
containers, viewport-minus utilities, named grids). It was always "after Yumma
UI ships" and nothing here changes that.

---

## Curation pass done 2026-08-08. Items 3-10 all closed

All ten items from 2026-08-07 are resolved. Two findings below correct things
this file previously recorded as true.

**`c-slate-12` generates no CSS rule, so four popups had no text colour at
all.** `slate-12` is a real token in `@yummacss/core` (`#101316`), but nothing
is emitted for it, so `alert-dialog`, `command-palette`, `dialog` &
`onboarding` inherited the docs' own white page text. Onboarding's step icon
was rendering white on a white badge - item 5's "missing icons" was this, not
the nav buttons. All five sites (plus tooltip's `h:c-slate-12`) are
`c-slate-10` now, which 89 other places already use. **The lesson is the
check, not the value:** a class that does not exist fails silently & looks
exactly like a colour you did not set. `getComputedStyle` on the real element
is the only way to tell, and `validate-yummacss.mjs` will not catch it - it
checks whether a class is *canon*, which `c-slate-12` is.

**Autocomplete & Avatar were never actually collapsed. This file was wrong.**
The tally below says "Autocomplete DONE, 18 -> 8"; commit `3969af73` deleted
no files. It added the props API & left all 17 page sections standing, and
Avatar the same at 14. Every component from Button onward did delete. So the
friend's "why am I seeing so many components" was almost certainly one of
those two pages. Now 17 -> 6 and 14 -> 7. **Do not trust a "N -> M" line in
this file without counting the directory.**

**Item 10 has a concrete answer: Skeleton.** All 7 of its demos hand-rolled
`motion.div` bars & never imported the migrated component, so "Show code" on
any Skeleton example contained no `<Skeleton>` at all. `rating-readonly` was
the same. That is 8 of 73 variant demos, and it is a different question from
the one the 36/36 check answered - that check asks whether the *base* has a
props-driven schema, which was true. The sweep that finds it: for every
variant file, does it import `./<base>`? Both are fixed; Skeleton's four
surviving recipes now compose `<Skeleton>` and render pixel-identically
(verified bar by bar against the originals' rects).

**Skeleton gained `size`, and it is the cascade gotcha's first real
casualty.** Rewriting the recipes against the component needed per-instance
sizes, and `className` could not deliver them: of 13 overrides, **4 silently
lost** (`h-2` lost to the shape's `h-3`, `h-10` lost to `h-3`, `w-10 h-10`
lost wholesale to `w-24 h-8`). So `size` *replaces* the shape's default size
rather than being appended to it, and takes literal utilities (`"w-9 h-9"`)
so the scanner can still see them. Same shape as Toggle's `swatchClassName`.
**Every `className` doc string that promises "any utility you pass wins" is
still a lie** - Skeleton's two were rewritten, the other ~30 were not.

**Rating gained `readOnly`**, found the same way: `rating-readonly` wanted a
non-interactive rating & only `disabled` existed, which dims. They mean
different things - "you could, but not now" versus "this is someone else's
score" - so read-only draws at full strength, leaves the tab order, and is
announced once as `role="img"` rather than as five controls. The *example*
was then deleted anyway: `readOnly` is a boolean, the table says it, and the
rule does not bend for the prop that prompted it.

**Folding now works for registry source, which is what item 6 actually was.**
Base demos folded fine all along; the untruncated data was in variant demos,
whose "Show code" is the raw file through Shiki. `remark-component-source.mjs`
now finds the trailing `const x = [ ... ];` block & emits `fold={14-82}` in
the fence meta, and `decorateCodeHast` wraps those line spans in a
`<details>`. **`<details>`, not a client component**, because the block is a
server-rendered HTML string by then - giving it state would mean shipping a
parser to the browser to find the regions again. The `const x = [` and the
`];` stay visible either side of the `...`, so you can see what folded.
Measured on `autocomplete-grouped`, the worst offender at 71 of 84 lines:
338px closed, 1817px open. **This retires the "an authored Shiki fence cannot
fold" claim further down** - it can, once something emits line ranges for it.

**`src/lib/*.mjs` is not scanned for classes & adding it to `source` does not
help.** `code-decorate.mjs` writes class names; the glob was tried and the
scanner still missed the file, so its classes must be safelisted by hand. That
is why `mx--4`, `bg-accent-dim/10` & `bc-accent-dim/50` were already there,
which nothing had recorded. `d-i` joins them.

**The `$icon` marker carries a `size` now.** `{ "$icon": "PagePlus", "size":
"w-4 h-4" }`. A glyph's size belongs to the slot it sits in - a tour's step
badge wants 24px, a command palette row wants 16px - and the hardcoded
`w-6 h-6` was tuned for the one component that used the mechanism. The
snippet prints `icon: <PagePlus className="w-4 h-4" />`, so it still runs.

**Installation is a real section on all 38 pages**, an authored `<CodeGroup>`
after the frontmatter, base command only. The per-preview strip is gone and
`buildInstall`/`PACKAGE_MANAGERS` are deleted with it - one implementation for
every install block on the site instead of two.

**Item 1's follow-up is clean.** All 31 metas audited: Field's
`prefixNode`/`suffix` was the only mutually-exclusive pair both carrying an
`example`. Toggle's `icon`/`pressedIcon` & Popover/Tooltip's
`trigger`/`triggerLabel` look like the same shape but are not - one pair is
state-dependent, the other is a glyph plus its `aria-label`.

**Still open, deliberately:** the ~30 remaining `className` descriptions that
promise the caller's utility wins. They should say what Skeleton's now says.

### Raised by Renildo the same day, both confirmed, neither fixed yet

**`--variant` is advertised & not implemented. Its own help example fails.**
`ui/src/cli.ts` documents `-v, --variant <name>` and gives
`npx yummaui add button --variant pill` as an example, but
`ui/src/commands/add.ts` never reads it: `parse()` handles `--overwrite` and
`--yes` only, drops anything else starting with `-`, and pushes the rest as
*names*. So that command asks for two things, `button` and `pill`, and exits 1
with "Unknown component or block pill". The resolution loop matches a
component by name (writes the base) or a block by its own hyphenated id -
there is no variant path at all. **So the `--variant` idea is not dead, it was
never wired**, and Renildo's preference for `add button --v group` over
`add button-group` is a live design choice rather than a rollback. The
decision to make first: are *examples* addressable (prop combos, no file of
their own) or only *blocks*? The docs are safe under either answer right now,
because the new `## Installation` sections only ever emit `add <component>`.

**The base snippet and the variant source disagree about the import path, on
the same page.** Base reads `import Button from "@/components/ui/button";`;
every variant under it reads `import Button from "./button";`. Both are
correct in their own file - the snippet goes in the consumer's page, the
registry file lands *inside* `components/ui/` where `./button` resolves - and
**the `./` form is load-bearing**: `generate-registry-json.mjs` builds
`registryDependencies` by matching `from "./<id>"`, so rewriting it to the
alias would break `yummaui add <variant>` pulling its component. Nothing to
fix in the code; what is missing is a line on the page saying which file you
are looking at. (The bracketed imports Renildo also spotted are
`import { Bold } from "iconoir-react"` - real named exports from a third-party
package, not drift.)

## Demo-file import step, in progress 2026-08-07

Infra done & committed: emitter detects a demo's `./<id>` local import and
lists it under `registryDependencies` (`scripts/generate-registry-json.mjs`);
`ui/src/commands/add.ts` resolves those transitively so `add <variant>` also
writes the component it depends on. Both tested, typechecked, committed
(`docs@cf3cc488`, `ui@98306c2`).

Scope turned out bigger than "swap the import": several variants demo
something the migrated component's props did not yet cover (grouped items,
per-item icons, a debounced loading pattern). Renildo's call, asked
mid-session: widen the component's props rather than leave those on
`@base-ui/react`. That is the standing rule for the rest of this pass too.

**Cascade gotcha, found on Avatar, applies to every remaining component.**
A caller-supplied `className` cannot reliably override a class the migrated
component already applies for the same property (`bg-*`, `c-*`, `w-*`...).
Which one wins is decided by the generated stylesheet's rule order, not by
position in the `class` attribute - normal CSS, but easy to forget when a
component's own doc comment says "appended... so any utility you pass wins."
That claim is only true when nothing else in the component already sets that
property; Yumma CSS has no `!important` escape hatch to force a real override.
Confirmed live: `<Avatar className="bg-indigo-2">` next to the component's own
default `bg-silver-1` rendered silver, not indigo - and a `w-10` next to the
component's own `w-12` rendered at 12. Fix used on Avatar: a closed prop
(`tint`) the component applies itself, so only one background/foreground class
is ever in the output, never a competing pair. When a recipe needs a real
per-instance override of something the component already sets, that is the
pattern - a real prop, not a className string. `className` is still fine for
anything the component leaves unset (margin on a stack item, size on a bare
`Tooltip` trigger that has no default width).

**Autocomplete, done, all 17 variants.** Widened `AutocompleteBase`: `items`
now accepts grouped entries (Base UI's own prop already supports the shape,
only needed a render branch), `AutocompleteItem` gained an `icon` field
alongside `avatar`, added `onQueryChange` (forwards to Base UI's
`onValueChange`) for the loading recipe's debounce, and `label` widened
`string -> ReactNode` for the helper recipe's required-field asterisk.
Browser-verified: grouped headings, per-item icons, limit, and the loading
debounce all work live.

**Avatar, done, all 13 variants.** `AvatarBase` gained `fallback` (override
content, e.g. "+3"), `tint` (see cascade gotcha above), and `children`
(overlay content like an edit button). Browser-verified: all three tints,
both sizes distinct at 48/56px, both stacks, the edit overlay.

**Button, done, all 7 variants.** No Button widening needed - every group
recipe fits `variant`/`size`/`shape`/`iconOnly` already on the component.
Widened Separator instead: added `orientation` (`horizontal`/`vertical`),
since Base UI's Root already supports a vertical divider and only the
default classes were hardcoded to horizontal. Browser-verified: Group,
Group Icon, Group Pill, Group Pill Label all show proper vertical dividers
between segments; Leading/Trailing icon buttons; Favorite.

**Field, done, all 4 variants.** Widened FieldBase: `iconInteractive` (icon
slot receives pointer events, for a real button instead of a decorative
glyph), `prefixNode`/`suffix` (static content flush against the control's
edges, only the outer corner rounded - note the prop is `prefixNode` not
`prefix`, because `prefix` collides with a DOM attribute on the polymorphic
`Field.Control` element and fails TS2430). Also fixed a real bug found along
the way: the Password recipe's reveal toggle changed its own icon but never
the input's actual `type`, so it never revealed anything - wired `pressed` to
state that drives `type` now. Browser-verified including the fix (typed
"hunter2", toggled, watched it go from dots to plain text).

**Checkbox, done, all 3 variants.** Widened CheckboxBase to extend
`ComponentProps<typeof Checkbox.Root>` and spread the rest through (the
Button/Field pattern) - it only declared props for a standalone checkbox
before, so `name`/`value`/`parent` for a `CheckboxGroup` had no way in. Also
fixed the indeterminate indicator to read Base UI's `state.indeterminate`
instead of the caller-supplied prop, since a `parent` checkbox computes that
automatically and the old version never reflected it. Browser-verified:
indeterminate dash on partial selection, full check on all-checked, group
label, nested parent groups.

**Combobox, done, both variants.** Same widening as Autocomplete: `items`
accepts grouped entries, `label` widened to `ReactNode`. Browser-verified:
grouped headings with avatars, helper text with required asterisk.

**Preview Card, done, all 3 variants.** No widening needed - `trigger`/
`children` already covered an inline trigger inside a sentence. Multiple
just calls the component twice (one per person) instead of one Root sharing
a `payload` across two triggers.

**Popover, Select, Toolbar single-file recipes, done.** Widened
PopoverBase (`triggerVariant` icon/label, controlled `open`/`onOpenChange`
so a selection inside `children` can close the popup), SelectBase (grouped
`options`, same pattern as Autocomplete/Combobox), ToolbarBase (`number`
item type - NumberField composed with Toolbar.Input - alongside the
existing button/toggles/input/link/separator union). Browser-verified:
palette closes itself on pick and updates the trigger swatch, grouped
select headings, number stepper increments and the view toggles still work.

**Toggle, done, both variants.** Widened ToggleBase: `size` (sm/md), `tone`
(accent/ghost), `swatchClassName` (replaces `tone`, for a color-picker
swatch). Found and fixed a real bug while wiring `value` through for
`ToggleGroup` membership: ToggleBase always passed `pressed` to the
underlying Toggle even when uncontrolled, which overrides Base UI's own
group-derived pressed state, so a grouped toggle built from the unwidened
component would never have reflected the actual selection. Now
`pressed`/`onPressedChange` are only passed standalone. Browser-verified:
group selection moves correctly between B/I/U, color picker selection moves
and shows the checkmark.

**Rating, done, both variants.** Widened RatingBase: `icons` swaps the
repeated-star model for a single-choice picker (custom icon per option,
exactly one active, `value` indexes 0-based instead of counting stars);
`children` for extra content below the hint (a feedback field). Browser-
verified: emoji picker selection & color, feedback field renders alongside
stars.

**Onboarding, done, both variants.** The deepest widening in this pass.
`OnboardingStep.tasks` gates that step's forward button until every task is
checked (state tracked per page, cleared on close). `indicator` gained
`dots`, which replaces the top count/progress row entirely with a bottom
row of step dots (Tabs.Root) between prev/next arrows, rather than sitting
alongside it. The checklist case also needed the slide's fixed `h-48`
(sized for title+description alone) to become flexible: any step with tasks
now switches the whole tour to a Framer Motion `layout` animation, so the
popup resizes smoothly between a plain step and a checklist step instead of
jumping. Browser-verified: task gating blocks then unblocks the forward
arrow, popup resizes smoothly across steps, dots jump directly to a step.

**Dialog, done, all 7 variants - this was the last component. The demo-file
import step is complete.** Every demo file across all 36 components now
imports the migrated component it demonstrates instead of reimplementing it
against `@base-ui/react`, and `registryDependencies` (emitter + CLI, from
the top of this section) makes `yummaui add <variant>` pull the base
component with it.

Widened DialogBase: `triggerTone`/`triggerSize` for a trigger that isn't
the default neutral/medium button (a small red "Remove" row action),
`onTriggerClick`, and `confirmTone` so a destructive confirm can be red
instead of indigo. Nesting needed no widening - two `<Dialog>` instances
compose the same way Base UI's own `Dialog.Root` nests. Dialog recipes also
surfaced widening that belonged on other components, applied there instead
of on Dialog: Checkbox's `label` went `string -> ReactNode` (same fix as
Autocomplete/Combobox/Popover/Field earlier, for a checkbox whose label
contains a link); Field/Select/Autocomplete gained `fullWidth`, since all
three default to a fixed pixel width sized for a standalone control, which
left dead space next to a dialog's wider content column (the wrapping
label/row already stretches via flexbox's `align-items: stretch`, but the
control itself doesn't); Field also gained `multiline` for a
message/description `<textarea>`, needed by four of the seven recipes.

Caught one real gap on a final sweep (grepped every non-base variant file
for a surviving `@base-ui/react` import): `preview-card-multiple`'s two
mentioned-user avatars were still hand-rolled, including a manually drawn
status dot the migrated Avatar already renders via `status`. Fixed
separately. The sweep's other 11 hits are legitimate, not misses: a tiny
custom-chrome inline `Button` (an edit-pencil overlay, a 16px avatar-chip
context) has no equivalent in ButtonBase's variant system and was already
precedented in Avatar; `CheckboxGroup`/`ToggleGroup` are structural
primitives with no separate migrated component to point at.

Browser-verified all 7: Sign In / Sign Up fields render full-width and the
Terms-of-Service link checkbox works; New Task's textarea, select, and
autocomplete all render and filter correctly at full width; Edit Profile's
avatar-with-edit-overlay and email+suffix compound field render correctly;
Nested opens a second dialog from inside the first with a red trigger and a
red confirm button, using two independent `<Dialog>` instances rather than
the original's single shared-state implementation - functionally
equivalent, simpler.

## Docs curation pass, settled 2026-08-07. READ BEFORE TOUCHING /ui PAGES

Renildo's friend, the second time she has been right about something we got
wrong: **"Why am I seeing so many components when most of them just change
small things such as the color or the radius? I just need to know what is or
not customizable."**

**The rule, locked: an example earns its place when it shows something the
API table cannot say.**

- The table is good at **enumerable** facts. `shape: rounded | square |
  squircle` is fully communicated by the table. `autocomplete-lg` is
  `size="lg"`. Those examples get **deleted**.
- The table is bad at **spatial/structural** facts. It says Separator takes
  `icon?: ReactNode`; it never says the icon sits **centred in the rule**.
  Avatar stacks, icon leading vs trailing, what `inset` does to a shadow -
  none of that survives being written as a type. Those examples **stay**.

This is one rule producing both answers, which is why it is the right one:
it deletes `autocomplete-lg` and keeps `separator-icon` without special
pleading for either. Renildo argued the Separator case unprompted and it is
the clearest statement of the principle in the whole thread.

**Base demos show range, not minimum.** Rating's base omitted `count`
because 5 is the default - wrong instinct. Someone skimming the base demo
should learn `count` exists without opening the table. Applies to several
bases, not just Rating.

**Icon examples: add to Badge & anything else accepting icon children, do
not remove from Button.** Icon *placement* is spatial, so it passes the rule
above. The inconsistency Renildo spotted (Button has icon examples, Badge
does not) is Badge being under-documented, not Button being over-documented.

### The 12 items raised 2026-08-07, in the order agreed

Bugs first, curation last, because curation is the largest and benefits from
the rest being settled.

1. ~~**Base Field renders prefix AND suffix at once.**~~ **FIXED**
   (`d85d8793`). Was a regression from the Dialog pass: `prefixNode` and
   `suffix` both carried `example` values, and `ComponentPreview` applies
   every example to the base demo at once. **An `example` is a demo value,
   not documentation** - do not add one to a prop that is mutually exclusive
   with another. Worth checking the other 30 meta files against this.
2. ~~**Tooltip takes ~2s to open.**~~ **FIXED & CONFIRMED BY RENILDO**
   (`127148ac`). `TooltipBase` passed `delay` straight through, so leaving it
   unset inherited whatever Base UI's Provider defaults to, and the meta only
   said "Base UI's own default applies when unset" - **a default nobody can
   see is a default nobody can fix**. Now an explicit `300ms`, stated in the
   meta. Note for anything similar: Base UI tooltips & Autocomplete popups do
   **not** open under synthetic pointer events in the preview pane, so timing
   like this cannot be self-verified - it needs a real hover.
3. ~~**Command Palette does not look like it did pre-migration.**~~ **FIXED
   2026-08-08.** The meta's `groups` example had lost every icon in the
   migration, so the base demo was a plain text list.
4. ~~**Button Group does not look like it did pre-migration.**~~ **FIXED
   2026-08-08.** `size="sm"` (`px-2 py-1`) against pre-migration's
   `px-3 py-2`. `md` restores it: 41px against the original 39px.
5. ~~**Onboarding dialogs are missing icons on the nav buttons.**~~ **FIXED
   2026-08-08.** Not the nav buttons - the step icon, white on white, via
   `c-slate-12`. See the top of this file.
6. ~~**Mock data is not truncated in some demos.**~~ **FIXED 2026-08-08.**
   Base demos folded all along; the raw registry source behind a variant's
   "Show code" did not. It does now.
7. ~~**API Reference table: no spacing above the description.**~~ **FIXED
   2026-08-08.** The cell was `pt-0`.
8. ~~**Installation should be its own section using `CodeGroup`.**~~ **DONE
   2026-08-08**, all 38 pages, base command only.
9. ~~**The curation pass itself.**~~ **DONE 2026-08-08.** 22 files deleted
   across Autocomplete, Avatar & Skeleton; nothing cut was more than a single
   enumerable prop. See the top of this file for what the count was really
   hiding.
10. ~~**"Some components are not migrated / only the base is."**~~
    **ANSWERED 2026-08-08: Skeleton, plus `rating-readonly`.** Renildo was
    right and the 36/36 check was answering a different question. Both fixed.

### Context cost, raised the same day

Renildo asked whether clearing chats is what is costing tokens. It is not -
a fresh session re-derives from this file cheaply **if the reading is
surgical**. The 100k session was broad reading plus re-verifying things
already established. Keep clearing; keep this file good.

## Older: what was next before the list above

Two things worth a look before calling the migration fully shipped:

- The props-table redesign parked earlier in this file ("do not start until
  the demo-file import step is done") is now unblocked.
- `pnpm publish` from `ui` per the ship checklist recorded earlier in this
  file, once Renildo has reviewed the widened component APIs - many base
  components picked up new props in this pass (Autocomplete, Avatar,
  Checkbox, Combobox, Field, Onboarding, Popover, Rating, Select, Separator,
  Toggle, Toolbar, Dialog), all additive/backward-compatible, but worth a
  human look before the version bumps past `0.0.1`.
- Full inventory command: `node -e` snippet grepping `src/registry/ui/*.tsx`
  for `@base-ui/react` imports on non-base ids, grouped by component - see
  this session's transcript if reconstructing it is faster than rederiving.
- Pipeline per component: `pnpm check-types`, `node
  scripts/validate-yummacss.mjs`, `pnpm build`, browser-verify in the docs dev
  server, commit. Do not run repo-wide `pnpm lint:fix` - it reformats
  unrelated files across the repo; if formatting is wanted, scope it to the
  touched files only.
- Dev-server gotcha hit this session: `remark-component-source.mjs` reads
  registry `.tsx` files straight off disk to build the "Show code" panel, but
  content-collections' dev watcher does not know registry files affect the
  MDX pages that embed them, so editing a registry file does not invalidate
  the cached page. `rm -rf .next .content-collections` and restart the dev
  server before trusting what "Show code" renders.

Design decisions live in `src/content/blog/yummacss-4.0.0.mdx` instead, because
they are the substance of the 4.0 post. Shipped work goes in the monorepo
`CHANGELOG.md`. Nothing here is either of those.

## Yumma CSS v4: killing custom classes, without arbitrary values

Raised 2026-08-03 by Renildo, looking at `globals.css`. **Not for now: these
land after Yumma UI ships.** The goal is to remove the *need* for a user to
write custom CSS classes, without adopting Tailwind's arbitrary-value escape
hatch. The three below all take the same shape, which is why they belong
together: **move the thing into `yumma.config.mjs` and generate a utility for
it.** That is the anti-arbitrary answer. The user names a value once, in config,
and gets a real utility with a real name; they do not inline a value into a
class and get an unnamed one.

The docs site is the proof, because every custom class in `globals.css` today is
an instance of one of the three.

**1. Custom font families.** Colours are already configurable; families are not,
which is the whole reason `.ff-e` exists. Config gives `ff-<name>`, and
`.ff-e {}` deletes. **Strongly agree.** Two things to settle when it is built:

- The docs need `ff-e` scoped to `article h1..h6`, which a utility does not do
  by itself. That rule stays; only the class definition goes. Worth checking how
  much of `globals.css` actually disappears before promising it disappears.
- `ff-m` & the default family already exist as built-ins, so config has to merge
  rather than replace, exactly as `colors` does.

**2. A `container` config.** `.cnt {}` was cut in 3.0 for being opinionated, and
that was right: **a built-in container is opinionated, a configured one is not.**
The user names the widths; the framework only generates. Kills
`.docs-container`. Note this site would want **two** (`docs` at
`clamp(40rem, 80vw, 96rem)`, and `/ui` may want its own), so the config shape
should be a map of named containers, not a single `container:` value.

**3. Viewport-minus utilities.** `max-height: calc(100dvh - 5rem)` appears
twice on this site as an inline style, in `sidebar-nav.tsx` & `toc.tsx`, and
appeared a third time in the props panel before it was reverted. Renildo's note
on that CSS line was the same request. Shape: the existing 0-384 scale
subtracted from `100dvh`/`100vh`, e.g. `max-h-dvh--20` for
`calc(100dvh - 5rem)`. **The sharpest version of the case:** an inline style
cannot be made conditional on a breakpoint, so the moment one of these needs to
apply only at `@lg`, it stops being an inline style and becomes a custom class.
That happened once already.

### What else fits this theme, unprompted

- **Sticky offsets pair with #3 and are the other half of the same pattern.**
  Every one of those three call sites is `p-st t-20` **plus** the capped height,
  because the offset and the cap must agree. If `t-` already covers it, the pair
  is fine; worth confirming before designing #3 in isolation.
- **`grid-template-columns` beyond equal fractions.** `gtc-12` gives twelve
  equal columns & that is the only shape available, which is why the `/ui`
  redesign reached for a raw `grid-template-columns` rule and then reverted it.
  A **named grid** in config, same shape as #2, would cover it:
  `grid: { docs: "14rem minmax(0,1fr) 22rem" }` -> `gt-docs`. This is the fourth
  instance of the same pattern & it may be the strongest, since asymmetric
  layout is the single most common reason to drop out of utilities.
- **Careful with the count.** Four config-driven generators is where the config
  file starts to *be* the design system rather than configure it. Worth deciding
  up front whether the answer is four separate keys or one `theme.extend`-shaped
  mechanism, because retrofitting that is a breaking change & 4.0 is the
  cheapest moment to get it wrong or right.
- **The measurement that decides it:** grep the docs, `play` & `hellolinks` for
  every custom class & bucket them. Today `globals.css` has just two
  (`docs-container`, `ff-e`), which #1 and #2 between them would remove
  entirely, plus one selector-scoped rule that no utility can replace: the
  preview reset, which matches Base UI portals in `<body>` by role & attribute.
  **That last one is the honest ceiling on this idea**: some CSS is a *selector*
  problem, not a value problem, and no amount of config removes it. Aim at the
  value problems & say so.

## Start here 2026-08-03
### The `/ui` playground: built, reviewed, and reverted. Do not rebuild it

**Read this before proposing an interactive preview for `/ui` again.** Three
commits went into a Dimsum-style stage with live controls, and it was reverted
the same day on Renildo's call, quoted as given: *"I think that we wasted energy
on something it didn't deserve attention. The older setup and layout, showing
multiple components as we scroll, was fine. You get to see what Yumma UI and
Yumma CSS are capable of very quickly without having to touch anything. Leave
the customization to the ones who are interested."*

**The judgement, and it is the right one.** A component gallery's job is to show
what the library can do to someone who has not committed anything yet. A
scrolling page of 27 finished previews does that in one flick. A single live
component with a control panel asks the reader to operate it before it shows
them anything, and it trades 26 visible examples for one configurable one.
Configurability is for the person who has already decided; they read the props
table.

**What the detour cost & what survived.** Deleted: `component-playground.tsx`,
`ui/props-panel.tsx`, `ui/playground-context.tsx`, `.ui-container`,
`.ui-layout`, the `[data-chrome]` rule, the sidebar `className` prop. Kept,
because they were never really about the playground:

- **The prop APIs themselves.** Button, Skeleton & Avatar are still prop-driven
  components with `meta/<id>.json` schemas. That is the library, not the docs.
- **The props table**, now `src/components/props-table.tsx`, a plain
  `<PropsTable registryId="button" />` in the MDX under `## API Reference`. No
  context provider, no split subtrees.
- **The eclipsa token colours**, in `src/utils/snippet.ts`.
- The `.md` route's props table, which is now keyed off the `PropsTable`
  component rather than off `registryId`, so the source fence & the table have
  one emitter each instead of one emitting both.

**The layout is `/docs`'s layout again**: `docs-container`, `gtc-12`,
`TableOfContents` back in the third column. `/ui` and `/docs` differ in content
only.

### Page shape, settled 2026-08-03

**Showcases first, reference last.** `## API Reference` (never "Props") is the
**final** section of a component page, after every example. The page's job is to
show what the library can do to someone who has not committed yet; the props
table is what you come back for once you have.

**`ui/api-reference.tsx` in the table of contents is not dead**, but it was
renamed. It links to the **Base UI primitive** the component is built on, which
is a different thing from the page's own API Reference: ours documents the props
Yumma UI adds, theirs documents the primitive underneath, which is exactly what
you need the moment you edit the file you copied. Only the shared label was the
problem, so the link now reads "Base UI primitive". It still renders only for
pages with `primitive: true` in frontmatter.

**The install block is a pnpm/npm CodeGroup, generated not authored.** Same
two-tab convention as every other install command on the site, but built from
the registry id in `ComponentPreview` rather than written into 431 MDX files.
`ui/code-tabs.tsx` holds the strip & **`CodeGroup` was refactored to use it**,
so the authored fences and the generated ones are one implementation. npm form
is `npx yummaui add <component>`; `pnpm dlx` and `npx` tokenize identically.

**The usage snippet carries its import.** `import Button from
"@/components/ui/button";` above the element, because a snippet you can copy but
not run is not a snippet. `components/ui` and the `@/` alias are what
`yummaui init` defaults to (`ui/src/commands/init.ts`), so that is where the
file actually lands unless the user said otherwise. **If those defaults change,
this string has to change with them** - it is the one place the docs assume the
CLI's config rather than reading it.

**Nothing in a snippet is left undefined, & the component leads.** An
object-valued prop is emitted as a real `const items = [...]` literal - written
as JavaScript, unquoted keys - **below** the element, because the component is
what you came to read and the data is only what it happens to be fed. Every
registry file already puts its fixtures last, and it stays valid because the
array is evaluated when the component renders, not when the module loads.

**The literal is foldable**, so the default view is `const items = [...];` on
one line with a `...` control to open it. **Folding is not hiding**: every token
stays in the stream & the copy button takes the whole snippet either way. This
only works because the docs generate these tokens; **an authored Shiki fence
cannot fold**, because its output is opaque HTML with no region markers - so do
not promise folding as a site-wide feature without emitting fold markers from
the highlighter first.

**Shared fixture files were considered & rejected**, 2026-08-03. There is real
duplication to attack - **137 registry files declare their own const array**, 56
use dicebear across 283 lines, 22 distinct seed names - but a shared
`registry/data/team.ts` means registry files importing each other, and
**nothing in the registry imports anything local** is the property that makes
`yummaui add autocomplete-inset` write one file that just works. Revisit only
with `registryDependencies` wired through the emitter & the CLI, and even then
ask whether fixture data belongs in someone else's project.

### What `/ui` looks like now

Each `ComponentPreview` is preview, then the install command, then `Show code`:

```text
[ live preview                              ]
  pnpm dlx yummaui add button --variant danger
[ Show code / Hide code                     ]
```

The command is per variant, always visible, with the same `Code` chrome & copy
button as every other block on the site. **It is generated from
`getRegistryTarget(id)`, not from the id**; see the CLI section below for why
`add button-danger` is not a command. Source stays behind the toggle: the
command is what most people want, but copy-source-not-a-dependency is the whole
premise, so hiding the source entirely would undercut it.

**`ComponentPreview` renders migrated components from their own schema.** A
prop-driven component with no props is an empty shell: `<Button />` has no
label, `<Avatar />` no image. The preview now seeds `example ?? default` for
each prop plus `meta.children`, so `### Base` shows a real instance. A component
with no schema gets nothing extra & renders exactly as it always did, so there
is no fallback branch anywhere.

### Still true & worth keeping from that work

**Verifying in the browser pane, which fights back.** Two things cost time and
will again:

- **The pane's tab is backgrounded**, so `document.hidden` is true,
  `requestAnimationFrame` never fires, **every `motion` animation on the page is
  frozen**, and `computer{action:"screenshot"}` fails with "the pane is not
  compositing frames". A skeleton rendering a bare `<div>` with no inline style
  looks broken and is not. Verify structurally: read `textContent`,
  `className` & `getBoundingClientRect()`.
- **`navigate` gets denied** against a dev server this session did not start.
  Either `preview_start` with `.claude/launch.json`, or assign `location.href`
  inside `javascript_tool` and sleep several seconds.

**Two generated files tore mid-edit & neither was a real bug.**
`content-collections` left `allUis.js` with `]"path": "tooltip"` at line 637 and
every route 500ing; touching any content file regenerated it. Next's
`.next/dev/types/routes.d.ts` duplicated a block and failed `pnpm check-types`
with `TS1109`; stopping the dev server & `rm -rf .next/dev` cleared it. **If a
generated file has impossible syntax, regenerate before debugging.**

**The preview reset catches the docs' own Base UI portals.** `globals.css`
matches `[role="listbox"]`, `[role="menu"]` & friends because Base UI portals
render into `<body>`, out of reach of the preview container. That also hits
docs-side popups, which then get `color-scheme: light` and system-ui. The
`[data-chrome]` opt-out written for the panel's Select is gone with it, so **the
next docs-side Base UI portal will hit this again** & the fix is to bring that
rule back.

**Do not eyeball theme colours out of `eclipsa.json` by scope name.** Run
`codeToTokens` on the exact construct & read the colours off the output. Shell:
command `#F5FAFF`, argument `#BEC6F2`, space `#B9BED5`.


### What shipped earlier today: Skeleton & Avatar migrated, props table done

Items 1 & 2 of the previous "next session" list. The list below is now the
current one; the 2026-07-31 section beneath it is still accurate for everything
it describes, only its "Next session" list is superseded.

**Three components now have a real API: Button, Skeleton, Avatar.** Each is a
`meta/<id>.json` plus a prop-driven rewrite of `ui/<id>.tsx`. Nothing new was
plumbed for the second and third, which is the point: the pilot's machinery
held.

**Skeleton is the case that proves the four-fates rule pays.** Every one of its
8 files was a whole card, repeating the same animated bar 5 to 8 times. There
was no component in there at all, only recipes of one. The API is the *bar*:
`shape` (line / block / circle, each carrying a default size), `tone`,
`animate`, `delay`. All 7 remaining files stay exactly as they are, as recipes.
`skeleton-static` is now just `animate={false}` and `skeleton-inset` /
`-outset` were never about the skeleton at all, only about the card around it.

**Avatar needed one design call, recorded here because it is not obvious.**
`status` (a presence dot) and `verified` (a check) both wanted the bottom-right
corner, so as written they would collide. They are two independent props and
`verified` moved to the **top right**, which composes and is also where the
geometry works: on a 48px circle a 16px badge at `t-0 r-0` centres on the 45
degree point of the arc, the same relationship the existing bottom-right dot
already has. `avatar-edit`, `-detailed`, both fallbacks & `-stacked` stay
recipes; `-stacked` is still owed an `AvatarGroup`.

**The props table is in, in two places.** On the page it is
`<PropsTable registryId="button" />` under `## API Reference`, in the docs'
own table style (`bc-c`, `bw-1` cells), so it looks like every other table on
the site rather than a new visual idea. Descriptions are written as markdown in
the schema and the backticks are rendered as inline code, which is a 12-line
splitter, not a markdown pipeline.

The second place is new and matters more: **`/ui/components/<id>.md` now carries
the props table too.** The on-page table is React rendering a schema, so an
agent reading the `.md` got the entire implementation and no statement of the
API. `resolveRegistryMeta` is injected into `mdxToMarkdown` the same way
`resolveRegistrySource` is, for the same reason: that file must stay client-safe
by construction, never importing `node:fs`.

**Schema changes, all small:**

- `children` (string, optional) declares the children slot. Absent means the
  component takes none, and the snippet is written **self-closing**. Skeleton
  and Avatar are the first components where `<Name>text</Name>` would have been
  a lie.
- `example` is a representative value for a prop the component cannot sensibly
  default, like Avatar's `src`. `default` stays the truth the table reports,
  so the demo can be populated without the table claiming a default that does
  not exist.
- `number` joins enum / boolean / string, with a number input. It exists for
  Skeleton's `delay`, and the snippet writes it as JSX (`delay={0.15}`), not
  as a string.
- `examples` was **deleted**. Nothing read it. A schema field with no consumer
  is just a second place to drift.
- String props now get a text control. `className` is still excluded, by name
  rather than by type, which is what the original rationale actually meant.

**Lint went 87 errors to 84**: `button.tsx` & `button.json` were committed with
tabs against a 2-space Biome config. Everything touched today is clean; the
remaining 84 are the pre-existing docs debt listed further down.

### Clearing leftovers: the rule, and what Button's run of it produced

**A variant file survives only if the props genuinely cannot express it.** Apply
this to every component right after migrating it, not in a later sweep, or the
file count never reflects the collapse.

Button: **26 files -> 7**, 431 registry files in total now, down from 450. The
page went from 27 previews to 8.

**Deleted, 19**, each one or two props now: `danger` `ghost` `link` `secondary`
`subtle` (variant), `sm` `md` `lg` (size), `square` `pill` `squircle` (shape),
`inset` `outset` (shadow), `disabled` `loading` (booleans), `circle`
`icon-only` `icon-pill` (`iconOnly`, plus `shape` for two), `static` (`animate`).

**Kept, 7**, all compositions the props cannot reach: `group`, `group-icon`,
`group-pill`, `group-pill-label` (a bordered row with separators), `favorite`
(bespoke transparent styling with a coloured glyph and a count), `icon-leading`,
`icon-trailing` (children order, which is not a prop at all).

**Running the rule exposed two holes in the API**, which is the point of running
it. Both are now filled:

- **`shape` gained `squircle`.** Button had `rounded | square | pill` while
  Avatar and Autocomplete both had `squircle`, so `button-squircle.tsx` could
  not collapse. Shape vocabularies differ on purpose - a pill button and a
  circle avatar are both real - but a value only one component lacks is a gap,
  not a decision.
- **`animate` came to Button**, matching Skeleton and Autocomplete. The
  transition classes split out of `BASE` into `MOTION`. Without it
  `button-static.tsx` had nowhere to go, and Button would have been the one
  component of three where motion was not switchable.

**Expect this on every component.** The leftovers are the test of whether the
prop API is complete; a file that will not collapse is telling you something is
missing.

### Migration order & the three rules that came out of Autocomplete

**Sidebar order, decided 2026-08-03.** A complexity-ordered plan was proposed &
**rejected**: Autocomplete first, then straight down `sidebarConfig.ui`
(`src/config/sidebar.ts`) to Skeleton. Do not re-propose tiers. **Current
progress & what's next are tracked in one place**: item 2 of the numbered list
directly below, not here & not anywhere else this gets mentioned.

Three decisions were settled while doing it & they apply to every component
after it:

**1. Item data has a fixed shape. The component does not go generic.** No
render prop, no type parameter, no `itemToLabel`. Autocomplete ships
`AutocompleteItem { label; description?; avatar? }` and renders it. **You own
the file**, so data that does not fit is a five-line edit to the item body -
cheaper than an API everyone pays for. Combobox, Select, Menu, Command Palette
& Context Menu all take this shape.

**2. `shadow` is a prop everywhere.** `none | inset | outset` mapping to `""`,
`bs-i-sm`, `bs-o-xs`. Styling-only & enumerable, so the four fates say prop, &
about 15 components have inset/outset demo files. **Button was backfilled** in
the same commit rather than left as a standing exception nobody could infer.

**3. The schema has a `none` control type plus `typeName`.** A ReactNode or an
array of objects cannot have a JSON-driven control, but it still needs
documenting, so `type: "none"` means no control & `typeName` carries the real
TypeScript type for the table (`AutocompleteItem[]`, `ReactNode`). `example`
widened to `unknown` so seed arrays live in the schema rather than in the
component, & the usage snippet writes an object-valued prop as
`items={items}` rather than dumping four screens of data.

**Autocomplete's 18 files collapse into 15 props.** `sm`/`md`/`lg` -> `size`;
`square`/`squircle` -> `shape`; `inset`/`outset` -> `shadow`; `disabled`,
`loading`, `limit`, `auto-highlight` -> one prop each; `static` -> `animate`;
`icon`/`icon-leading`/`icon-trailing` -> `icon` + `iconSide`. **`grouped` &
`helper` stay recipes**: grouping is a data-shape change wanting
`Autocomplete.Group`, and the helper file is really a Field concern.

1. ~~**The 26 `button-*` files.**~~ **DONE 2026-08-03. 19 deleted, 7 kept.**
   See "Clearing leftovers: the rule" below.
2. **Sidebar-order migration, running tally** (Autocomplete first, then
   straight down `sidebarConfig.ui`, Skeleton last):
   - ~~Autocomplete~~ DONE, 18 -> 8
   - ~~Checkbox~~ DONE, 12 -> 4
   - ~~Combobox~~ DONE, 14 -> 3
   - ~~File Upload~~ DONE, 10 -> 1
   - ~~Field~~ **DONE**, 19 -> 5, 14 props. First component whose `error` is a
     state *and* a message, so it is where the compound-part contract got
     designed - see "prop or compound part? Four fates" below & "Field: the
     compound-part contract, settled" further down.
   - ~~Number Field~~ **DONE**, 10 -> 1, 12 props.
   - ~~Radio~~ **DONE 2026-08-04**, 12 -> 0 (no recipes at all - every variant
     was expressible). Found & fixed a real accessibility bug on the way: 9 of
     12 original files set `aria-labelledby={id}` on RadioGroup with no
     element anywhere carrying that id - a dangling reference, present since
     before this migration. `label` is now a real prop, wired correctly.
   - ~~Select~~ **DONE 2026-08-04**, 16 -> 2 (base + the `grouped` recipe).
     `select-bordered` was a dead file: byte-identical to base bar its id
     string, never even referenced from the page, deleted outright rather
     than collapsed into anything. `select-md` used `h-9` against base's own
     `h-10` - same category of defect as `checkbox-md` & `field-sm/md/lg`,
     standardized to h-10.
   - ~~Slider~~ **DONE 2026-08-04**, 8 -> 0 (no recipes - `range` fully
     folds into `defaultValue` accepting a number or a two-item array, same
     as Radio's full collapse). Three more small defects corrected on the
     way: `slider-outset` used `bs-o-sm` against every other component's
     `bs-o-xs`; `slider-range`'s track was `bg-silver-2` against every
     single-value file's `bg-silver-1` for the same unfilled-track role;
     `slider-disabled` hand-recolored the indicator to `bg-indigo-2` on top
     of the wrapper's `o-60`, the same redundant pattern already corrected
     on Number Field - standardized to `o-60 c-na` alone.
   - ~~Switch~~ **DONE 2026-08-04**, 9 -> 0 (no recipes). `switch-accent`
     was a dead duplicate of base like `select-bordered` - different label
     text & initial state, zero real difference, deleted outright.
     `switch-disabled` used `bg-red-1` for the unchecked track instead of
     `bg-silver-1`, a copy-paste slip standardized away. `switch-squircle`
     used `fv:oo-1` against every other file's `fv:oo-2`, corrected.
   - ~~Textarea~~ **DONE 2026-08-06**, 11 -> 0 (no recipes). `maxLength`
     earns a real prop (same reasoning as Combobox's `multiple`) rather than
     staying a recipe, since it's orthogonal to shape/shadow/error/disabled -
     it also drives the live remaining-character counter & warn-at-20 red
     state from `textarea-character-count.tsx`. No color/scale defects this
     time; the only snag was TypeScript: `Field.Control`'s prop types assume
     its default rendered element (`input`) regardless of the `textarea`
     passed via `render`, so every native event handler needed a cast at the
     boundary - both the explicit `onChange` prop and the rest spread had to
     be cast independently, casting just one left the other failing.
   - ~~Toggle~~ **DONE 2026-08-06**, 4 -> 2 recipes. Square, squircle &
     static collapse into `shape`/`animate`, same conventions as Switch.
     `toggle-group` & `toggle-color-picker` stay as recipes - both compose
     `ToggleGroup` with per-item data (icons, colors) rather than being
     expressible as props on a single Toggle, same call as Checkbox's group
     compositions. ~~`icon`/`pressedIcon` are `ReactNode`, so the live Base
     preview has no default icon - a limitation already accepted for Field's
     & Switch's `icon`, so not a new gap.~~ **That was the wrong call and
     this entry was wrong to wave it through** - the Toggle demo was
     shipping as a blank circle. Fixed 2026-08-06 by `exampleIcon`, commit
     `cda53877`; see "A base demo that looks broken is broken" below.
   - ~~Accordion~~ **DONE 2026-08-06**, 19 -> 0 (no recipes), the biggest
     migration so far. `variant` (default/bordered/ghost/subtle), `shape`,
     `shadow`, `separator`, `icon` (chevron/plus-minus), `iconPosition`,
     `multiple`, per-item `disabled` and `animate` absorb everything. Two
     real bugs in the original demos: `default-open` &
     `multiple-default-open` opened a value ("mentions"/"shipping") that
     matched no faq item, so nothing ever opened by default; `subtle` used a
     permanently-indigo background regardless of state while
     `multiple-subtle` (same style, different selection mode) correctly
     varied it - standardized on the varying version. Two defects found
     *while verifying*, not in the original demos: a static-rotation bug in
     my own component, and a real class-scanner bug in the Yumma CSS build
     pipeline itself - see "Yumma CSS's class scanner mangles multi-`${}`
     template literals" below, worth reading before the next
     many-conditional-classes component (Menu/Menubar/Context Menu/Command
     Palette are all candidates). Commit `509b90bd`.
   - ~~Badge~~ **DONE 2026-08-06**, 18 -> 0 (no recipes). `tone`
     (outline/subtle/solid), `color` (six options), `shape`, `size`,
     `shadow`, `icon`/`iconPosition`, `dot`, `count` & `onClose` absorb
     every variant. Real defect: the original `dot` variant tinted its
     outline-tone border/text to the status color, but its own `dot-pill`
     sibling (same content type, different shape) used the neutral
     treatment every other file uses - standardized on neutral, since 18 of
     19 files agreed. `count` is a deliberate exception worth keeping,
     not a bug: it reads attention-red on `outline` regardless of `color`,
     consistently across every file that has one, only tinting to match on
     `subtle`/`solid`. Caught myself reaching for `.replace()` on a class
     string for two of the accessory colors mid-write - worse than the
     scanner bug from Accordion, since a replace()'d string is invisible to
     the scanner in any form - rewrote as explicit static lookup tables
     before it shipped. Separately, `ComponentPreview`'s example-population
     doesn't read a `children`-named entry from the `props` array (I wrote
     one, it silently rendered empty) - `children` is a top-level string
     field in the meta JSON, sibling to `props`, not a prop - matches
     Button's `meta/button.json`, which I should have checked first.
     Commit `1a6ee3a0`.
   - ~~Breadcrumb~~ **DONE 2026-08-06**, 12 -> 0 (no recipes). `items`
     (label/href/icon/iconOnly per entry, same item-shape convention as
     Radio/Select), `bordered` + `shape` + `shadow` card, `size` &
     `separator` (chevron/slash) absorb everything. The last item is always
     the current-page span, never a link, matching every original file's
     own structure exactly. Real accessibility fix: the original
     icon-leading demo's first crumb was icon-only with zero accessible
     name (no text, no `aria-label`) - `iconOnly` now requires `label` to
     double as the link's `aria-label`. Verified every class landed in the
     real production CSS output directly (not just visually) given the
     Accordion scanner bug - clean this time since every className used
     array+join from the first draft. Commit `eeccec4f`.
   - ~~Collapsible~~ **DONE 2026-08-06**, 7 -> 0 (no recipes). `trigger` +
     `children` rather than a data-driven `items` array - every original
     demo's panel content is bespoke per-use markup (a task list, a sprint
     list, a milestone list), never a repeatable shape like Accordion's.
     Two real bugs: the original default-open demo tracked a redundant
     local `open` state via `onClick` purely to drive the chevron, separate
     from Base UI's own uncontrolled `defaultOpen` - fragile, keyboard
     activation could desync the chevron from the real state; fixed with
     one controlled/uncontrolled state driving both. `disabled`'s panel had
     no `keepMounted`, so Base UI never rendered its children at all - the
     CSS forcing it visually open had nothing to show. Caught live (trigger
     rendered, panel content didn't) - same bug likely already existed in
     the original `collapsible-disabled.tsx`, never verified until now.
     `shape` is `square | squircle` only, no `rounded` - unlike every other
     migrated component, no rounded-corner trigger was ever shown for this
     one, so inventing a `rounded` option would be undemonstrated behavior.
     3 more `safelist` entries needed (`o-100`, `tp-t`, `ro-90`) - same
     unexplained scanner gap as Accordion, different file. Commit
     `5e61099f`.
   - ~~Meter~~ **DONE 2026-08-06**, 5 -> 0 (no recipes). `value`/`min`/
     `max`/`label`/`description`/`icon`/`color`/`shadow`/`animate`. `icon`
     presence switches the whole header from a simple label+inline-value
     row to a grouped icon+label+description block with the value moved
     below the track - coupled, not independent props, since only that one
     combination was ever shown together. `shadow: "none"` means no card
     wrapper at all, not a borderless-but-padded one - inset & outset are
     the only two bordered demos in the source, both with a shadow, so a
     bordered-no-shadow state was never demonstrated & I didn't invent one.
     No safelist entries needed this time - clean on the first build. Commit
     `82d0f01b`.
   - ~~Preview Card~~ **DONE 2026-08-06**, 12 -> 3 recipes (compact,
     multiple, project - each a genuinely different popup composition, kept
     the same way Select kept `select-grouped`). `trigger` + `children`
     mirrors Collapsible's pattern, not a data-driven shape. Real bug caught
     live: the demo placeholder rendered white-on-white, invisible - the
     Popup portals to `document.body`, inheriting the dark page chrome's
     text color instead of anything from its light card context. Every
     original demo avoided this by coloring every inner span explicitly,
     which breaks down the moment `children` is an arbitrary, possibly
     unstyled slot rather than fixed content - fixed with a default
     `c-slate-10 fs-sm` on the popup itself. Commit `6fceb31e`.
   - ~~Progress~~ **DONE 2026-08-06**, 7 -> 0 (no recipes). `value`
     (`number | null`, `null` = indeterminate), `label`, `shape`, `shadow`,
     `animate`. Indeterminate always animates regardless of `animate` - a
     static indeterminate bar can't communicate anything (no fill level to
     show), never demonstrated, didn't invent it. Real defect:
     `progress-meter.tsx` was a dead duplicate - a literal unmodified copy
     of Meter's own base demo, not a Progress variant at all - deleted
     outright. Commit `83325fb5`.
   - ~~Separator~~ **DONE 2026-08-06**, 6 -> 0 (no recipes). `icon`/
     `onIconClick`, `label`, `shape`. `icon` and `label` are mutually
     exclusive slots (icon wins if both set) - one's an interactive button,
     the other's static text, genuinely different semantics rather than one
     generic children slot. Commit `94578f2b`.
   - **Display section is fully done**: accordion, avatar, badge,
     breadcrumb, collapsible, meter, preview-card, progress, separator - all
     9 migrated. 23 of 36 components done overall. Interactive
     (button, context-menu, menu, menubar) is next - **context-menu, menu &
     menubar are flagged for Opus** per the standing agreement from
     2026-08-06 ("I'll keep Sonnet until you said it's Opus time"). Button
     itself isn't one of the flagged compositional components & can still
     be done on Sonnet.
   - ~~Context Menu~~ **DONE 2026-08-06 (on Opus)**, 14 -> 0 (no recipes) -
     **the largest single collapse of the migration.** `items` is a
     discriminated union (action / separator / group / checkbox / radio /
     submenu, recursive) rather than a children slot: **a menu genuinely
     *is* data**, unlike Collapsible's or Preview Card's bespoke panel
     markup, so the data-driven shape is right here & the children shape
     was right there. Worth remembering as the dividing line when Menu &
     Menubar come up - they should follow this same model. Four
     inconsistencies standardized, each to the value the majority + the
     base demo already used: trigger border (10 files `bc-slate-3` vs 3
     `bc-silver-3`), heading style (2 files `fw-600 us-none` vs 2 `fw-500
     ls-3` - took `us-none`, menu chrome should never be selectable), item
     padding (`pl-2 pr-3` vs `pl-3 pr-4` only on checkbox/radio files),
     `sideOffset` (8 in 7 files vs 0 in 5 incl. base - took 0, a context
     menu belongs at the cursor). Headings are now real
     `ContextMenu.Group`s carrying `role="group"`, which only the grouped
     demo did before. Verified live: right-click DOES work under synthetic
     events (unlike the Autocomplete/Preview Card hover popups), and all
     six item types plus the submenu (via ArrowRight) render correctly.
     Commit `7acc9ce0`.
   - **Icon-wrapper finding, applies beyond this component:** a `w-4 h-4`
     class on a wrapper `<span>` does **not** constrain an SVG inside it -
     the SVG keeps its own intrinsic size (iconoir defaults to `1.5em`).
     So an icon wrapper should set colour + layout only & the consumer
     sizes their own glyph, which is what Field already does. **Badge has
     this latent no-op** (`iconClasses` puts `w-3 h-3`/`w-4 h-4` on the
     wrapper span, doing nothing) - harmless today because the icons look
     fine at their natural size, but it's a lie in the code. Worth a small
     follow-up pass over Badge, and worth checking Meter's `w-8 h-8` avatar
     wrapper too (that one is probably fine - it's a filled circle whose
     own size matters, not a pass-through).
   - ~~Menu~~ **DONE 2026-08-06 (on Opus)**, 19 -> 0 (no recipes). Reuses
     Context Menu's union verbatim, **duplicated rather than shared** -
     each registry file must stand alone, since the user copies one file.
     Adds `size` (sm/md/lg) & an optional `icon` on submenu triggers. Four
     real defects: (1) **`menu-md` was not the default size** - it had a
     third set of values (trigger `px-2 py-2`, popup `w-48`, item `pr-2`)
     sitting between `sm` and the base demo, so the published scale was
     four steps with no actual default, and "md" was smaller than the
     thing it was the medium of. `md` is now the base demo's values; the
     fourth step is gone. Same family as Checkbox's duplicate `md` &
     Field's non-linear scale. (2) `menu-nested` used popup `w-48` (the md
     width) not the base `w-52`. (3) leading-icon items used `g-3`,
     trailing/shortcut items `g-2` - standardized on `g-2` to match
     Context Menu. (4) plain items omitted `ai-c` entirely while icon
     items had it - now always applied. **`menu-account` &
     `menu-account-status` collapsed rather than becoming recipes**,
     because their distinctiveness is entirely the `trigger` ReactNode and
     per-item `icon` ReactNodes - both props. That's the opposite call
     from Preview Card, where the recipes were kept because their popup
     *content* was a different composition, not different props. **That's
     the test**: is the difference in the props, or in the structure? One
     more `h-fc` safelist entry needed (scanner gap again). Commit
     `67468087`.
   - **The shell-inlined-probe false negative recurred.** Writing a
     class-presence probe as a bash heredoc one-liner reported `fv:oo--1`
     and `h:bg-silver-1/50` missing when both were present - backslash
     mangling between the heredoc and the JS regex, exactly as warned in
     the Accordion writeup above. **Always write probes to a `.mjs` file**,
     or use `javascript_tool` against the live DOM, which has no shell in
     the path at all & is the better tool for this.
   - ~~Menubar~~ **DONE 2026-08-06 (on Opus)**, 14 -> 0 (no recipes).
     `menus: { label, items, disabled? }[]`, the union reused a third time.
     Each menu owns its open state via a small `MenubarEntry` subcomponent
     rather than one shared value - two popups can never be open at once &
     no id is needed to tell them apart. Verified hover-to-switch works,
     so Base UI's Menubar coordination reaches the entries through context
     even though they're wrapped a level deeper. Three defects: (1) item
     padding was chaotic - **six** different values across the variants,
     `pr-8` in grouped & icon-leading - standardized on Menu's exact item
     classes, since the two components' popups were already identical bar
     class order; (2) plain items in six variants carried `jc-sb g-4`,
     which does nothing with a single child - `jc-sb` now only when
     there's a trailing accessory; (3) **the disabled trigger dropped
     `bw-0`**, which every enabled trigger has to kill the browser's
     default button border, so a disabled menu button rendered with a UA
     border the others didn't have. Commit `8744a11a`.
   - ~~Open question: Menubar's shadow placement~~ **RESOLVED 2026-08-06** -
     Renildo confirmed it looked wrong. Moved to the bar (+ popups); the
     individual buttons no longer carry it. Commit `8467fe1b`. The
     original placement was a literal copy of Menu's, where the trigger
     *is* the only chrome - correct there, noise here.
   - **Interactive section is fully done**: button, context-menu, menu,
     menubar.
   - ~~Tabs~~ **DONE 2026-08-06 (on Opus)**, 15 -> 0 (no recipes). `items`
     (value/label/icon/iconOnly/count/disabled/panel), `orientation`,
     `size`, `shape` (**pill** is the default & `rounded` is its own
     separate step - 4 values, same as Badge), `iconPosition`, `animate`.
     `md` genuinely equals base here, no repeat of Menu's phantom step.
     Two structural simplifications, both verified pixel-identical: (1)
     **the chrome now always sits on the List** - the originals split it
     three ways (Root for the bare list, List for the panelled one, List
     again for vertical) while rendering the same box each time; (2) **the
     indicator uses one translate across both axes** instead of translate-X
     for horizontal and animated `left`/`top` for vertical - one code path,
     and composited in the vertical case where the original animated layout
     properties. Verified by comparing the indicator's bounding rect to the
     selected tab's in both orientations, before & after switching: **zero
     drift on x/y/width/height in every case.** That rect-comparison check
     is the right way to verify anything positioned - much stronger than
     eyeballing a screenshot. `panel` is raw ReactNode, consumer styles the
     wrapper, because the two panel demos wrapped it differently (bordered
     card vs plain flex column) & neither is canonical. One more `tp-a`
     safelist entry. Commit `cd028d48`.
   - ~~Toolbar~~ **DONE 2026-08-06 (on Opus)**, 11 -> 1 recipe. `items` is
     a union of button / separator / toggles / input / link, plus `shape`,
     `shadow`, `animate`. `toolbar-input` stays a recipe - it embeds a
     whole NumberField (decrement + input + increment), a composition not
     a prop combination. Two real defects: (1) **`toolbar-formatting`
     didn't use Base UI's Toolbar at all** - a plain `div` of raw
     `motion.button`s with hand-rolled toggle state, so no
     `role="toolbar"`, no roving focus, no ToggleGroup semantics. Invisible
     unless you arrow-key through it. Now the `toggles` item type on the
     real primitives; verified `role="toolbar"` present & ArrowRight moves
     focus. (2) **the disabled button's classes were identical to an
     enabled one** - it looked completely normal while doing nothing.
     Now `o-60 c-na`. Worth knowing: Base UI keeps a disabled toolbar item
     **arrow-reachable via `aria-disabled` rather than the native
     attribute** (correct ARIA toolbar practice - a natively-disabled
     button leaves the tab order and breaks roving focus), so the dimming
     is the *only* signal the user gets. Commit `770ccd6a`.
   - **Navigation section is fully done**: tabs, toolbar.
   - ~~Alert Dialog~~ **DONE 2026-08-06 (on Opus)**, 10 -> 0 (no recipes).
     `trigger`/`triggerIcon`/`triggerIconPosition`/`triggerTone`, `icon`,
     `tone`, `title`, `description`, `cancelLabel`/`confirmLabel`/
     `onConfirm`, `showClose`, `shape`/`shadow`/`animate`.
     **`alert-dialog-destructive` was misnamed** - it's the *neutral*
     archive dialog (silver badge) while the BASE is the actually
     destructive red one. Became `tone="neutral"`, danger stays default.
     `triggerTone` is separate from `tone` because that demo pairs a
     neutral trigger with a red confirm. Confirm padding `px-6` there vs
     `px-4` everywhere else, standardized. **A suspected bug was
     investigated & DISPROVEN** - see below. Commit `29287298`.
   - **Not every odd pattern is a bug.** The alert-dialog demos pass an
     icon inside `render={<Button><Icon/>text</Button>}` *and* give
     `Trigger` its own children, which looked like Base UI would replace
     the Button's children & silently drop the icon. Browser inspection
     showed the render element's children win & the icons **do** render.
     Worth recording as a counterweight to the DeepSeek-provenance
     section: that section makes me suspicious by default, which is
     right, but suspicion still has to be *checked* before it goes in a
     commit message. I nearly wrote a false claim.
   - ~~Dialog~~ **DONE 2026-08-06 (on Opus)**, 15 -> **7 recipes**, the
     most of any component. `trigger`/`triggerIcon`/`triggerIconPosition`,
     `header` (above the title), `title`, `description`, `children` (the
     body), `cancelLabel`/`confirmLabel`/`onConfirm`, `showClose`,
     `shape`/`shadow`/`animate`. Footer only renders when `confirmLabel`
     is set, so an informational dialog closes by its X alone.
     **Seven recipes is the right answer, not a failure to collapse.**
     Dialog is a generic container - the interesting thing about a dialog
     demo is *what you put inside it*, which is precisely what a recipe
     is for. sign-in, sign-up, new-task, edit-profile, send-invite &
     share-task are real forms on different primitives (autocomplete,
     select, checkbox, field, avatar), 127-315 lines each; nested is a
     dialog-within-a-dialog with per-member state. Contrast Badge or
     Breadcrumb, where every variant genuinely was a prop combination and
     the count went to zero. **The test, stated once more: is the
     difference in the props, or in the structure?** Commit `b5f4771a`.
   - ~~Popover~~ **DONE 2026-08-06 (on Opus)**, 11 -> 1 recipe
     (`popover-color-palette`, a swatch grid - content, not props).
     `trigger`/`triggerLabel`, `title`, `description`, `children`,
     `side`, `sideOffset`, `arrow`, `openOnHover`, `delay`, `showClose`,
     `shape`/`shadow`/`animate`. `popover-placement` was a 2x2 grid
     rendering the same popover four times to show one prop - became
     `side`. **The arrow is a real fix**: the original hand-positioned an
     SVG at `t--2 l-50%`, pinned to the popup's top edge pointing up,
     correct *only* while the popup sits below the trigger. Any other
     placement and it points into the popup instead of back at the
     trigger. Now uses Base UI's `Popover.Arrow`, which re-aims per side -
     verified with `side="top"` + `arrow` together: popup rect above the
     trigger's, arrow reports `data-side="top"`. **`openOnHover` & `delay`
     live on `Popover.Trigger`, not `Popover.Root`** in Base UI 1.7; the
     typecheck caught it. Hover verified with a real pointer event, not a
     synthetic one. `static` also dropped the trigger's `h:bg-silver-1` -
     hover is a state style, not motion, so it's kept unconditionally &
     `animate` governs only the popup's scale-in. Commit `c69bb563`.
   - ~~Tooltip~~ **DONE 2026-08-06**, 11 -> 0 recipes. **`delay` lives on
     `Tooltip.Provider`, not `Tooltip.Root`** in Base UI 1.7; the
     typecheck caught it. The arrow is the same real fix as Popover's: a
     hand-placed SVG that only aimed correctly on one side, replaced by
     `Tooltip.Arrow`. Commit `b877dc85`.
   - ~~Command Palette~~ **DONE 2026-08-06 (on Opus)**, 11 -> 0 recipes.
     `groups` is a `CommandGroup[]` of `CommandItem`s, the discriminated
     -array shape every data-driven menu got. Dividers between groups are
     drawn automatically rather than authored. Commit `9c8de493`.
   - ~~Empty State~~ **DONE 2026-08-07**, 12 -> 0 recipes. Every variant
     was props. The gap tightens to `g-1` with no badge & no action,
     since a title plus one line reads as a pair. Commit `f14362f4`.
   - ~~Rating~~ **DONE 2026-08-07**, 8 -> 3 recipes (`emoji`, `feedback`,
     `readonly` - the first two swap the control, the third replaces the
     interaction with a summary). **The shadow lands on each star, not on
     a card**, which is what both shadow demos actually did; there is no
     card here. **Real fix: disabled now dims the stars.** The old demo
     left them at full strength, which read as enabled. Commit
     `9327ce11`.
   - ~~Onboarding~~ **DONE 2026-08-07 (on Opus)**, 12 -> 2 recipes
     (`checklist` ticks steps off instead of paging through them,
     `pagination` adds clickable tabs). `steps`, `indicator`,
     `dismissible`, `triggerIcon`/`iconPosition`, `shape`/`shadow`/
     `animate`. Commit `0fcf5946`.

   **36 of 36 migrated. The migration is done.** 415 files changed,
   6,552 insertions against 26,187 deletions across `src/registry/ui`.
   109 files remain where ~450 stood.

### `$icon`, the array-shaped `exampleIcon`

`exampleIcon` only ever reached a top-level prop. Onboarding's badge is an
icon *inside* an array of steps, and JSON cannot hold a React element, so
the base example would have rendered the blank square Renildo caught on
Popover.

A `{ "$icon": "Star" }` marker nested anywhere in an example now resolves
to the glyph for the rendered preview & prints as `<Star />` in the
snippet, with the import added. The raw example is kept for the snippet &
the resolved copy feeds only the preview, so the two never cross. The
walk skips anything carrying `$$typeof`, because a React element is an
object too & recursing into its internals would shred it.

Worth knowing for the components that come after: **Command Palette's
`CommandItem.icon` & Menu's item icons can use this too**, and their
examples currently omit icons entirely.
3. **Then the demo files import the migrated components**, which is the step
   that turns `import { Autocomplete } from "@base-ui/react/autocomplete"` in
   every variant file into a Yumma UI import. Deliberately after the migration,
   not during: it needs `registryDependencies` wired through the emitter & the
   CLI so `add autocomplete-inset` also pulls `autocomplete`, and that is work
   to do once rather than 33 times.
4. Ship: merge `feat/yumma-ui`, push, `pnpm publish` from `ui`.

**Verification gap worth knowing.** Base UI's Autocomplete popup will not open
under synthetic events, so the filtered list, the loading row & the empty
message are **unverified in the browser pane**. This is not a regression: the
untouched demo files behave identically, `aria-expanded` stays `false` for all
of them, and the pane will not scroll or composite so a real coordinate click
is not available either. What was verified is everything outside the popup:
class composition, the label, the props table, the usage snippet & the build.
**Open one by hand before shipping.**

**Version: `0.0.1`, not `0.1.0`.** Renildo's instinct, and it is right for a
reason worth writing down: while Field was open, the schema was still being
learned & Field could have changed it. **It didn't** - the state-plus-message
question resolved to a string prop, the same shape already in use, so nothing
already shipped needed touching. `0.0.x` still stands until enough of the
sidebar list is done that the shape has been proven under real variety, not
just declared stable after one hard case.

**Dogfooding the registry is a later pass.** Registry variants importing the
migrated components (`preview-card-compact` using Yumma UI's Avatar rather than
hand-rolled Base UI) was raised & deferred: only three components exist to
import, so the payoff across 450 files is small now. It also turns on
`registryDependencies` for the first time - `add preview-card-compact` would
have to pull `avatar` too - which is CLI work worth doing once, deliberately,
rather than mid-migration. The emitter already has the field & it is always
empty today.

**`llms-full.txt` will not be fed the registry, and probably should not exist.**
Raised as an open call & answered by Renildo the same day: models are expensive
to run over a dump, so making one read the full version of everything is a cost
with no matching benefit. The per-page `.md` routes are the right granularity &
they already carry source plus the props table. So `llms-full.txt` keeps
rendering UI pages with no resolver at all, and **deleting it outright is now
the live question** rather than enriching it. `llms.txt` (the index) stays
either way.

### Anatomy sections: rejected 2026-08-06, but it flagged a real bug

Raised by Renildo after Textarea: Base UI's docs (e.g.
`base-ui.com/react/components/select`) have an `## Anatomy` section, a JSX
tree of every compound part (`Select.Root > Select.Trigger > Select.Portal >
...`) the consumer assembles themselves. Should Yumma UI's pages have one too?

**No.** Anatomy sections exist because Base UI is headless - you *must* know
the compound tree to build anything, since there is no default assembly. This
whole migration did the opposite on purpose: 36 components collapsed ~450
files into single default-exported, props-driven units (`<Select
options={...} />`), precisely so a consumer never assembles compound parts.
Checked: every migrated component's only extra exports are TypeScript
interfaces (`SelectOption`, etc.), never a second JSX part. An Anatomy tree
would document an API surface that does not exist for the consumer - the
compound parts live inside the registry file, not in what gets imported.

**The real question underneath it was legitimate, though:** once someone
`add`s a component and owns the file, how do they discover which Base UI
primitive it's built from, in case they want to go beyond the props? That
already has an answer - `src/components/ui/api-reference.tsx`, rendered as a
"Base UI primitive" sidebar link on any page with `primitive` set in its
frontmatter, linking to that primitive's own Base UI docs. It derived the URL
by guessing `base-ui.com/react/components/<page's-own-slug>`, which only
works when the two names match, and asking the question above surfaced three
places they didn't:

- **Textarea** had `primitive: true`, producing
  `base-ui.com/react/components/textarea#api-reference` - **a 404.** Textarea
  is Field's `render={<textarea />}`, not its own Base UI primitive (Base UI
  has no Textarea component at all).
- **File Upload** had `primitive: true` despite importing nothing from
  `@base-ui/react` - it's fully custom. Dead link, same as above.
- **Number Field** was missing `primitive: true` even though it's a genuine
  1:1 match (`@base-ui/react/number-field`) - the link was silently absent
  when it should have existed.

**Fixed same session**, commit `1321b657`: `primitive` now accepts an
explicit Base UI slug string (`primitive: field`) as well as `true`, so a
page can override the derived slug when the names diverge. Textarea now
points at `field`, File Upload's flag was removed, Number Field's was added.
Verified against `base-ui.com` directly (`field` and `number-field` both
resolve; `textarea` genuinely 404s, confirming the bug) and live in the
browser via DOM query for all three pages. All 28 `primitive`-flagged pages
were cross-checked against their registry file's actual `@base-ui/react/*`
imports in the same pass (grep, not spot-checked) - these three were the only
mismatches. Re-run that check if a new component's primitive name diverges
from its Base UI import when adding `primitive` in future.

### A base demo that looks broken *is* broken, whatever the reason

Renildo, 2026-08-06, on the Popover page: "there is no icon in the base
example, it's just a blank rounded bordered square." He was right, and the
worse part is that **I had already seen it and explained it away** - twice.

The mechanism: `ComponentPreview` fills demo props from the schema's
`example`/`default`, and a schema is JSON, so a `ReactNode` prop can't have
one. For most components that only costs a decoration - Badge still shows
its label, Field still shows its control. But for a component whose *only*
visible content is an icon it costs everything: Popover's trigger is a
`w-10 h-10` square holding one glyph, Toggle's face is a `w-12 h-12` circle
holding one glyph. With no icon they are an empty square and an empty
circle, on the first example of the page.

I shipped Toggle that way, wrote in its NOTES entry that this was a known
limitation "already accepted", and then shipped Popover the same way while
literally telling myself in a note "the trigger may render empty; that is
expected and correct." **"Expected given the mechanism" is not "correct on
the page."** The reader does not know the mechanism. They see a blank box on
a component library's own docs.

Fixed with an `exampleIcon` schema field (commit `cda53877`) - the preview
resolves it to a real element, the usage snippet prints it as inline JSX
*plus* its `iconoir-react` import so the copied code compiles. The icon map
in `component-preview.tsx` is **curated on purpose**: a dynamic
`icons[name]` lookup would defeat tree-shaking & pull every glyph into the
client bundle. Adding one is two lines.

Two traps it surfaced, both worth remembering:

- **`src/registry/index.ts` is generated.** The type edit belongs in
  `scripts/generate-registry.mjs`; my first edit to the generated file was
  silently overwritten by the next `generate` run.
- **A React element is an object**, so it fell into the branch that declares
  object-valued props as `const trigger = {...}` under the snippet. The
  attribute *and* the declaration both had to learn about icons, or the
  snippet contradicted itself - inline JSX above, a bogus object below.

**The general lesson, which is the reason this is written down at all:** I
was verifying every component against the *mechanism* (does the class land,
does the prop thread through, does the type check) and not against the
*question a reader asks*, which is "does this page show me the component."
Both matter. Screenshot the base example and ask whether it sells the thing.

### The original demo files were DeepSeek-generated. Read every one with suspicion

Told by Renildo 2026-08-06, while confirming the Menubar shadow fix: the
~450 original variant demos were generated by DeepSeek. **This is the single
most useful piece of context for the rest of the migration**, because it
retroactively explains almost every defect found so far, and they all rhyme:

- **Copy-paste that didn't get adapted.** Menubar's shadow on each button
  (right for Menu, wrong once the bar exists). `progress-meter.tsx` being a
  literal unmodified copy of Meter's demo under a Progress name.
  `switch-accent` & `select-bordered` as byte-level dead duplicates.
- **The wrong component entirely, or none at all.** `progress-meter` again,
  and `toolbar-formatting`, which was a plain `div` of raw `motion.button`s
  with hand-rolled toggle state - no `role="toolbar"`, no roving focus, no
  `ToggleGroup`. It *looked* right in a screenshot, which is exactly why it
  survived. **Check which primitive a demo actually imports**, not just how
  it renders.
- **Scales that aren't scales.** `menu-md` sitting *between* `sm` and base
  so there were four steps and no default. `checkbox-md` a byte-duplicate of
  `checkbox-sm`. Field's non-linear `sm/md/lg`.
- **A correct pattern in most files & a wrong one in a few**, with no
  reason for the difference: `switch-disabled`'s `bg-red-1` track,
  `slider-outset`'s `bs-o-sm`, `menubar-disabled` dropping `bw-0`,
  Context Menu's trigger border split 10/3.
- **Things that never worked at all**, because nobody opened them: the
  disabled Collapsible panel that rendered no children, Radio's
  `aria-labelledby` pointing at an id that existed nowhere, Breadcrumb's
  icon-only crumb with no accessible name, Accordion's `default-open`
  opening a value no item had.

**How this changes the work:** keep close-reading every remaining demo, and
weaken the "majority of files agree" heuristic. It's been my main tiebreaker
and it's still useful, but a generator copy-pastes a wrong pattern across
ten files as easily as a right one - agreement is evidence of shared
ancestry, not of correctness. Prefer: does it work when rendered, is it
internally consistent, does it match the component's own semantics. Close
reading has caught roughly a dozen real bugs across 26 components, which is
a hit rate worth the time it costs.

### Yumma CSS's class scanner mangles multi-`${}` template literals, found 2026-08-06

Discovered while verifying Accordion's `animate=false` chevron - the icon
never visibly rotated in the browser despite the class (`ro-180` at the time)
looking completely ordinary. Chased it a long way before landing on the real
cause, worth writing down precisely so the next component with heavy
conditional styling (Menu, Menubar, Context Menu, Command Palette - all
flagged for Opus, all likely to have more conditional classes than most
components so far) doesn't lose the same hour.

**What's actually true, in order of discovery:**

1. **`getComputedStyle(el).transform` is the wrong property to check.**
   Yumma CSS's rotate utility emits the modern `rotate:` CSS property, not
   `transform: rotate(...)`. Checking `.transform` always reads `"none"`
   whether or not the class is doing anything - check `.rotate` instead.
2. **The rotate scale is an index, not a literal degree value.** `ro-<n>`
   means "step `n` of a 5deg-per-step scale," not "n degrees." `ro-180` is a
   *valid* class - it compiles to `rotate(900deg)`, which is visually
   identical to 180deg (rotation is modular) - so this alone doesn't explain
   a missing rotation, only a red herring worth ruling out first. The
   correct literal-180deg class is `ro-36`.
3. **The real bug: `@yummacss/nitro`'s build-time scanner (used by
   `@yummacss/postcss`, wired in via `postcss.config.mjs`) silently drops or
   corrupts class names extracted from template literals containing two or
   more separate `${}` interpolations**, especially combined with nested
   ternaries. Confirmed by calling `nitro.scan()` directly against
   `accordion.tsx` in isolation (not through the full `next build` pipeline)
   and inspecting the returned class `Set`: it contained obvious garbage
   tokens like `"className={\`d-f"` and `"o-60\""` - fragments of the
   surrounding JSX/JS syntax, not class names - proving the extractor's
   regex loses its place partway through these expressions. This is
   independent of `@yummacss/canon`'s `validate()` (used by
   `scripts/validate-yummacss.mjs`), which uses a different, more robust
   extraction path and reported the exact same broken classes as
   structurally "valid" the whole time - **`validate` passing is not proof
   the class will actually render.** The fix: rewrite every dynamic
   className to the `[...].filter(Boolean).join(" ")` array pattern already
   used everywhere else in the codebase, with **zero backticks** - not just
   fewer, all the way to zero. A single-interpolation template literal
   looked safe in isolated tests but wasn't reliable once the file also
   had other backtick classNames nearby; array+join sidesteps the whole
   class of bug rather than trying to characterize its exact trigger
   condition.
4. **Even after removing every backtick, 5 classes still weren't in the
   built CSS**: `max-w-96`, `blc-indigo-5`, `c-indigo-6`, `c-indigo-9`,
   `ro-36`. These are plain, unconditional string literals with no
   interpolation at all - the array+join fix didn't reach them, and the
   root cause for *these specifically* is still not diagnosed (ruled out:
   truncation by position in file, a per-file class-count cap, and the `%`/
   `:` characters - none of those explain this particular set). Verified
   real (not a probing artifact) via a from-scratch `rm -rf .next && pnpm
   build` and a direct substring search of the emitted CSS in
   `.next/static/chunks/*.css`, both before and after. Worked around with
   `yumma.config.mjs`'s existing `safelist` array, which already had five
   unrelated entries for a similar reason - this makes 10. **If a future
   component's demo renders with an unstyled/unrotated/uncolored element
   despite the class name looking completely correct in the source, check
   the actual built CSS for that literal class before assuming the
   component code is wrong** - `grep -o "\.<class>{[^}]*}"
   .next/static/chunks/*.css` after a clean `rm -rf .next && pnpm build`,
   using a small Node script rather than shell `-e` one-liners (their
   backslash-escaping repeatedly produced false "missing" results during
   this investigation - write probes to a `.mjs` file and delete it after).

## Start here 2026-07-31

### The big decision: v4 is on hold, Yumma UI is next

Target for 4.0 is now **early September**. Reasoning, recorded as given:
nobody uses Yumma CSS yet so there is no rush, a real person is waiting on
Yumma UI & wants to use it in her `hellolinks` app, and Yumma UI is the thing
that gives anyone a reason to adopt the CSS at all.

This does **not** create a new migration risk. Decision #15 in the 4.0 draft
already rejected a compat mode on the grounds that "the user base is one
person who will be migrated by hand", so shipping UI on v3 & migrating in
September is the scenario that decision was already made under.

**Next session is Yumma UI architecture**: packaging, props, compound
components, CLI, registry. The open questions are further down under
"Yumma UI package & CLI" & they are bigger than anything left in the docs.

### Where the work is

**Nothing is uncommitted & nothing is local-only.** All three repos clean.

| repo | branch | state |
| --- | --- | --- |
| `docs` | `feat/yumma-ui` | 4 commits ahead of `main`, pushed, **not merged** |
| `docs` | `main` | == `origin/main`, clean |
| `ui` | `release` | == `origin/release`, 4 commits |
| `yummacss` | `main` | == `origin/main` |
| `yummacss` | `fix/typecheck-clean` | pushed, **not merged** |

`ui` is the Yumma UI CLI, a **separate repo** at
`C:/Users/rreni/Repositories/Yumma CSS/ui`, remote `github.com/yummacss/ui`.
The folder & repo are `ui`; the **published npm package is `yummaui`**,
because `ui` is taken on npm & `yummaui` is free. Do not "fix" that mismatch.

Deletable branches: local `fix/blog-layout` (merged), local `docs/variants`,
stale `origin/docs/variants`, 12 `update/yummacss-*` on the remote, and
`agents/css-properties-enhancement-flex-corner` in the monorepo (unknown, not
mine).

**To ship Yumma UI:** merge `feat/yumma-ui` into `main` & push, which makes
`/ui/r/` live; then `pnpm publish` from `ui`. Nothing else blocks it.

### The `yummaui` CLI surface. Never written down before, and it cost us

**This section exists because it did not.** The CLI was built in an earlier
session & its interface was never recorded here, so on 2026-08-03 the docs were
given install commands in a form the CLI does not accept. **414 of 450 were
broken.** Renildo caught it. Read this before printing, documenting or assuming
any `yummaui` command.

The source of truth is `C:/Users/rreni/Repositories/Yumma CSS/ui`, `src/cli.ts`
& `src/commands/add.ts`.

```text
yummaui init                     write yummaui.json
yummaui add <component...>       copy components in
yummaui list [component]         browse what is available

  -v, --variant <name>   add a variant instead of the base
      --overwrite        replace existing files
  -y, --yes              skip prompts
```

**The variant is a flag, not part of the name.** `add` resolves the argument
against `index.components[].component` in `/ui/r/index.json`, which holds the
**36 component names**, never the 450 flat ids. So:

| form | result |
| --- | --- |
| `add button` | base, written as `button.tsx` |
| `add button --variant pill` | written as `button-pill.tsx` |
| `add button-pill` | **exits 1**, "Unknown component" |

The registry id (`button-pill`) is only how registry *files* are keyed:
`/ui/r/button-pill.json` exists & `fetchItem` takes that id. It is not a name
the user ever types. That gap between "how files are keyed" and "what the CLI
addresses" is exactly what went wrong.

Two more constraints worth knowing, both enforced in `add.ts`:

- **`--variant` applies to one component at a time.** `add dialog tooltip
  --variant inset` is rejected rather than guessed at.
- **A component with no base file falls back to its first variant** in
  `index.json`, so a bare `add <component>` always resolves to something.

**The docs now generate commands from the same split the emitter uses.**
`scripts/lib/registry-ids.mjs` owns `splitId`, both generators import it, and
`generate-registry.mjs` emits a `registryTargets` map into `src/registry/
index.ts` so the browser can print a command that runs. Duplicating that rule in
a third place is how it drifts again.

**The check worth re-running after any registry change** replays the CLI's own
lookup against every command the docs print, rather than trusting that they
render:

```js
const entry = index.components.find((x) => x.component === target.component);
entry && (target.variant === "base" || entry.variants.includes(target.variant));
```

450 of 450 pass as of 2026-08-03. Under the old form it was 36 of 450.

**Still open:** `.md` routes carry component source but no install command, so
an agent reading `/ui/components/button.md` learns what the code is & not how
to get it. One line near the top would fix it; 27 lines, one per preview, would
not.

**Note the CLI's `VERSION` constant is `0.1.0`** while the plan is to ship
`0.0.1`. `src/cli.ts` and `package.json` both need setting before publish.

### Yumma UI: the architecture, settled 2026-07-31

Read this before proposing any change to where things live.

**The registry stays in `docs`, at `src/registry/`.** It is served as static
JSON from `public/ui/r/`, generated at build time by
`scripts/generate-registry-json.mjs` (gitignored output). The CLI **fetches it
over HTTP** & imports nothing.

**Why the CLI being separate is fine, and why moving the registry to it is
not.** The CLI has no dependency on those 450 files & never will. Six things
in `docs` do need them on disk:

1. `yumma.config.mjs` source glob - **CSS generation**. Every class must be
   scanned or previews render unstyled.
2. `src/registry/index.ts` -> `import("./ui/<id>")` - **bundling**. Next
   code-splits those relative dynamic imports.
3. `rehype-registry.mjs` - injects source into docs fences.
4. `generate-registry-json.mjs` - emits `/ui/r/*.json`.
5. `generate-registry.mjs` - builds the import map.
6. `validate-yummacss.mjs` - canon, in two places.

So moving the registry to the `ui` repo optimises for the consumer that does
not need it, at the cost of the one that does. shadcn keeps its registry in
`apps/www` (the docs site) with the CLI separate over HTTP, which is the shape
we already have. **If one repo is ever wanted, bring the CLI into `docs` as a
package; never move the registry out.**

**Yumma UI must never ship CSS.** Components are styled with utilities the
*consumer's own* Yumma CSS build generates. This makes copy-source-not-a-
dependency **load-bearing, not philosophical**: `yummaui add button` writes the
file into their project, so their scanner sees it & generates exactly those
utilities. As an installed dependency the classes would sit unscanned in
`node_modules` & nothing would be styled. The only "fix" would be shipping
prebuilt CSS, which duplicates the stylesheet & defeats the entire premise.

### Yumma UI: prop or compound part? Four fates, not two

The variant data answers this mechanically. Mask classNames, diff each variant
against its base, and the line distance sorts them:

1. **Prop** - styling only, or a fixed enumerable choice (0-3 lines).
2. **Compound part** - adds an element the consumer fills (6+ lines).
3. **Recipe** - a composition that stays in the docs & never becomes API.
4. **Separate component** - e.g. `avatar-stacked` maps over 5 members with
   overlap; that is `AvatarGroup`, not a variant.

Category 3 is the biggest lever & the easiest to miss. In a sample of four
components, **17 of 56 files were recipes**. They are documentation, not API
debt, and should keep existing exactly as they are.

Two sharper rules that fell out:

- ~~**When a variant contains both a state and content, it becomes one prop
  plus one part.** Field's `error` is the case: the *state* drives styling
  across every part (prop `status`), the *message* is only known to the caller
  (`<Field.Error>`).~~ **SUPERSEDED 2026-08-04.** This was a spec written
  before Field was actually built, and the migration went the other way on
  purpose: state *and* message collapse into **one string prop**, `error`,
  not a `status` enum plus a compound part. Read "Field: the compound-part
  contract, settled" below for why & what it commits every later component to.
- **If an axis crosses with every other axis it must be a prop.** Badge has
  `dot-pill`, `icon-pill`, `count-pill`, `close-pill`; `pill` multiplying
  against everything is the tell. Confirmed again on Combobox: `multiple`
  crosses every other axis (size, shape, shadow, disabled), so it is a prop
  even though it changes the input from a clear button to a row of chips.

Worked specs for Skeleton, Avatar, Field & Dialog were written out in the
session; the four fates above are the reusable part.

### Why this migration, in a real person's words. Read before doubting the cost

**A friend testing the project told Renildo, on Discord, that she was going to
drop Yumma UI from her project and keep only Yumma CSS.** Recorded here because
it is the sharpest statement of what this whole migration is for, sharper than
any internal design rationale, and because the instinct that produced the
four-fates rule turned out to already be the fix for a problem she hit
independently, before any of this was explained to her.

Her reason, paraphrased from the Portuguese: with the pre-migration registry,
building one real Radio - description **and** disabled **and** a specific
shadow - meant copying 3+ separate hardcoded variant files & asking an AI
editor to merge them into one component by hand. At that point, in her words,
the result is not Yumma UI anymore, it is her adaptation of it, and there was
no reason to have started from Yumma UI rather than building it herself. She
named the comparison herself: shadcn's button is a "zillion lines" precisely
because every possibility is built in to the one file you copy, and that is
what "installing a component" has to mean for the exercise to be worth it.

**That is exactly what the migration removes**, component by component, and it
was already the direction before this conversation, not a change of course
because of it: `yummaui add radio` followed by
`<Radio description disabled shadow="inset" />` is one file, every combination
reachable through props, nothing to merge, nothing ambiguous about whether the
result is "really" Yumma UI. Confirmation that the shape was right, not new
information changing it.

**Separately, she also confirmed the docs-density call** (asked & answered
before she saw any of the migrated pages): show the essentials plus the full
API in a table, not four separate example sections proving that `danger` turns
a button red. *"Não preciso de 4 visualizações pra isso... as docs embaixo
falariam todas as opções."* This was already true for every migrated
component - Button 27 previews to 8, Checkbox 12 to 4, Combobox 14 to 3, File
Upload 10 to 1, Field 19 to 5 - and her screenshot of Radio still showing the
old sprawl is simply Radio not being migrated yet, not a miss.

**The takeaway for every remaining component:** the leftover-collapsing rule
is not a code-cleanliness preference. It is the actual product. A component
page with four demo sections and a component people abandon the library over
are the same failure, just measured at different distances from the user.

**Follow-up, same conversation: how she actually reads the API Reference
table.** Shown Button's table & asked if she would read it to know what she
can and cannot do, her answer: she scans the **Prop** column for the name she
needs, then conditionally reads **Type** for that one row - not top to bottom,
not every column. Description & Default were not part of the loop she
described at all.

**This validates the table's column order rather than asking for a change.**
`src/components/props-table.tsx` already renders `Prop | Type | Default |
Description`, left to right, which is her scan order for the two columns she
actually named. Nothing was changed on the strength of this - Description
stays, since it carries real information a bare enum list does not (`shadow`'s
"inset reads as a well, outset as a raised control" is not recoverable from
the type alone), and one person's flow is not grounds to bury it. Recorded as
evidence for whoever next considers reordering or trimming the table: the
current shape has a real reader behind it, matched, not guessed at.

### Field: the compound-part contract, settled 2026-08-04

**Read this before designing any prop on a form component that carries both a
state and a message** - error text, success text, a hint, anything where the
prop is simultaneously "is this true" and "what does it say".

**The decision: one string prop. Not a `status` enum, not a compound part.**
`error?: string` and `success?: string`. Presence of the string means "show
this state, with this message"; absence means the default. This was asked as
an explicit choice, not inferred:

1. **Message shape.** Checkbox, Autocomplete, Combobox & File Upload already
   had `description?: string`. `error?: string` matches that precedent rather
   than introducing `error: boolean` + a separate message prop, or a
   `status: "error" | "success"` enum that would have needed a second prop for
   the text anyway. File Upload's `error?: boolean` is now the odd one out -
   **flagged as a follow-up, not yet done**: it should become `error?: string`
   to match, which is a small edit to `src/registry/ui/file-upload.tsx` &
   its schema.
2. **Field's scope.** Autocomplete, Combobox & Checkbox each already render
   their own label + description. Field does **not** wrap them - it stays a
   separate, simpler primitive for plain inputs (Number Field, Textarea,
   Radio, Select, Slider), and the three components already shipped keep
   owning their own label/description. **Retrofitting Field as a universal
   wrapper was explicitly rejected** because it would mean reopening three
   committed, verified components to remove working props. If this is
   revisited, it is a deliberate breaking change to announce, not a quiet
   refactor.

**What this means for every component after Field:** a state-plus-message pair
is `<name>?: string`, full stop. No enum, no compound part, no `<Field.Error>`
in a copied file. `success` earned its own prop rather than folding into
`error` because Field's demos showed it as a **second, independent** state
with its own icon & color, not a variant of the same one - the test is whether
the states are mutually exclusive alternatives (one prop, values swap) or
genuinely two different things that happen to share a visual pattern (two
props). Error and success are the latter; `error` wins if both are set,
documented rather than left to guess.

**Two smaller things worth carrying forward:**

- **`Field.Label` auto-associates with `Field.Control`** through Base UI's
  own context - no `useId`/`htmlFor` bookkeeping needed, unlike Autocomplete
  and Combobox which manage their own `id`. The original `field-icon-leading`
  /`-trailing` demo files used a plain `<label htmlFor>` instead of
  `Field.Label`, which was corrected in the migration rather than preserved -
  the plain-label form was demo drift, not a deliberate choice.
- **The size scale in the original `field-sm`/`-md`/`-lg` files was internally
  inconsistent**: `h-7`/`h-8`/`h-12` with mismatched `fs-xs`/`fs-sm`/`fs-lg` and
  non-matching padding, a non-linear jump nothing else in the migrated set has.
  Standardized to the same `h-8`/`h-10`/`h-12` + `w-56`/`w-64`/`w-72` scale
  Autocomplete & Combobox already use, fixed `fs-md` throughout rather than
  varying by size. Same category of defect as the `checkbox-md` duplicate
  found during Checkbox: **the rule catches these because collapsing a
  leftover forces someone to look at it closely enough to notice.**

### Yumma UI: what exists now

- **Button is migrated.** 27 variant files collapse into 6 props: `variant`,
  `size`, `shape`, `loading`, `iconOnly`, `disabled`. Classes are plain object
  lookups, **not cva** - a copied component should not drag a class utility
  into someone's `package.json`. `loading` sets `aria-busy` rather than
  `disabled`, because a busy control is not an unavailable one.
- **Prop schemas live at `src/registry/meta/<id>.json`**, never exported from
  the component, because the file is copied verbatim & metadata has no business
  shipping with it. The emitter merges it into `/ui/r/<id>.json`.
- **One schema, four consumers:** the page's props table, the `.md` route's
  props table, the demo props behind `### Base`, & `yummaui add`. They cannot
  drift.
- ~~**`ComponentPlayground`** renders one live component with controls.~~
  **Built & reverted 2026-08-03**; see the section at the top of the file. The
  schema outlived it.
- The 26 old `button-*` files are **still on disk & still in the sidebar**.
  Deciding which are recipes & which get deleted is where the 27 -> 1 collapse
  actually shows in the file count.

### Yumma UI: the `/ui` layout change. BUILT, THEN REVERTED

**Do not revive this section.** It planned a Dimsum-style layout: TOC out,
props panel in, preview filling the space, later a text control & an inspect
mode. All of it was built on 2026-08-03 and reverted the same day. The reasons
are at the top of the file under "The `/ui` playground: built, reviewed, and
reverted", and they apply to the whole idea, not to the execution.

What survived: the props table, now in the page flow rather than a panel.

**Inspect mode is the one bullet still worth wanting**, because it does not
depend on any of the above: it overlays dimensions & the box model on a
preview, which works just as well on a static one. If it ever gets built it
should attach to `ComponentPreview` & leave the page structure alone.

### Canon is blind to class maps. This bites every migrated component

`pnpm validate` reads `className` attributes, which is right for demo files &
useless for a prop-driven component, where classes live in a lookup:

```js
const SHAPES = { rounded: "br-lg", square: "br-none" };
```

`br-none` does not exist. Canon never saw it & reported clean. **Every
component with a real API has this shape**, so the registry would have drifted
out of validation as it migrated.

`scripts/validate-yummacss.mjs` now also scans string literals inside
`UPPER_SNAKE` class maps, plus any multi-token string whose tokens *all* look
like classes. Requiring all of them is what keeps prose out, since
`"or in-app alerts"` contains a token that passes on its own.

It found two live bugs immediately:

- `autocomplete-limit.tsx` used **`bg-rose-4`**. There is no rose in the
  palette, so that colour dot rendered with no background. Now `bg-red-4`.
- `collapsible-static.tsx` used **`o-1`**, meaning CSS opacity 1, but the scale
  is percentage based, so the open panel had no opacity class at all. Now
  `o-100`.

**Valid values worth remembering:** `br-` is `0, xs, sm, md, lg, xl, xxl, 3xl,
100%, 50%, 9999, px`. There is no `br-none`. Opacity is percentage based.

### What shipped 2026-07-31

1. **Blog listing rebuilt three times, ending plain.** Final shape: the docs
   12-column grid with the listing spanning **columns 1-9** (~724px at 1280)
   because the blog has no sidebar & those columns were dead space. TOC
   auto-places into 10-12. Card goes side-by-side at `@sm`; cover is 10rem,
   stepping to 14rem only at `@xl`.

   **A timeline/rail design was built & then reverted.** Do not rebuild it.
   See "Rejected: the blog timeline" below.

2. **Marked code fences were collapsing onto one line, in production.**
   Fixed (`f7dabde7`). Root cause & the general lesson are below under
   "Shiki writes `class`, not `className`" - worth reading before touching
   `code-decorate.mjs`.

3. **`.md` routes completed** (`ef1b54fa`). UI pages now carry component
   source (`button.md` 965 B -> 17.5 KB, all 38 pages); blog posts have `.md`
   routes at last, so the 4.0 decision log is finally agent-readable. Drafts
   gated with `isVisible`, verified 404 against a real production server.

4. **Monorepo typechecks clean for the first time** (branch, pushed, unmerged).
   Two failures, only one of which was known. See "Monorepo typecheck" below.

5. **Yumma UI started & is most of the way to shippable.** Registry emitted as
   JSON at `/ui/r/`, `yummaui` CLI built & tested (26 tests), Button migrated
   to a real prop API, interactive playground working. All four sections above.

### Next session, in order

**SUPERSEDED 2026-08-03.** Items 1 & 2 are done (Skeleton & Avatar migrated,
props table built); read the list at the top of the file instead. Kept because
items 3-5 are unchanged and the framing below still applies.

1. ~~**Migrate more components.**~~ Each one is a `meta/<id>.json` plus a
   prop-driven rewrite. No new plumbing. Skeleton, Avatar, Field & Dialog have
   worked specs; the four-fates rule covers the rest.
2. ~~**Props table** in the playground panel.~~ Schema already carries type,
   default & description; purely presentation.
3. **Decide the fate of the 26 `button-*` files** - recipe or delete - and the
   sidebar entries that go with them.
4. Then the `/ui` layout change (TOC out, props panel in).
5. Ship: merge `feat/yumma-ui`, push, `pnpm publish` from `ui`.

### Left in the docs bucket, in priority order

- **Docs lint is not clean.** Notes previously said "one import-sort error";
  actually **3 accessibility errors** ("Alternative text title element cannot
  be empty" - matters for a component library), 2 auto-fixable
  (`useNodejsImportProtocol` in `sitemap.ts`, an unused `tagline` in
  `app/page.tsx:6` that is dead because the h1 says something else), 3
  non-null assertions in the `[slug]` pages, & a format drift in
  `docs/layout.tsx`.
- **`grid-column-span` / `grid-row-span` duplicate pages.** Deleting needs
  redirects in `next.config.ts`, **and** check what core's `slug` points at
  first: IntelliSense builds hover links as `yummacss.com/docs/${util.slug}`,
  so a careless delete recreates the 404s that were already fixed once.
- **`ui/customization.mdx` becomes the Yumma UI API docs.** No longer "far
  off" now that UI is next. `### Flexible by Design` (line 15) is still an
  empty heading. Details under its own section below.

### What shipped on the branch, by phase

1. **Variants.** New `nested-variants.mdx` & a Variants sidebar section.
   Probed the generator directly: stacking is **order-independent**
   (`@sm:h:` == `h:@sm:`), & **two media queries silently collapse**
   (`@sm:@lg:bg-red` emits only `64rem`, dropping `@sm` with no warning).
   Fixed `pc:*` -> `@pc:` prose & a truncated `negative-values` description.
2. **Theming.** New `theming.mdx` as the parent page for semantic colours,
   with `dark-mode.mdx` left to the pair mechanism. Grounded in this site's
   own eight semantic colours (which use **no** light/dark pairs, because the
   site is single-scheme) & in the 4.0 draft's measured contrast numbers,
   re-derived from the real hexes. New Customization section.
   **Also switched prev/next to follow `sidebarConfig`** rather than the
   `order` frontmatter.
3. **Reference coverage: 239 of 239 utilities, 0 missing, 0 dangling.**
   25 were missing & split into two problems. **Nine were live 404s**:
   IntelliSense builds hover links as `yummacss.com/docs/${util.slug}`
   (`intellisense/src/hover.ts:201`) & core's slug pointed at pages that did
   not exist, so hovering `btc-red` or `sx-5` offered a dead link. Sixteen were
   sections owed to `scroll-margin` / `scroll-padding`.
4. **`llms.txt` linked from the sidebar** as `docsLinks`, under a Resources
   heading, in both navs.
5. **Releases page: built, then reverted.** See the section below before
   considering it again.

Plus: `order` & `updated` frontmatter deleted from 254 files with a build-time
sidebar guard added; the `percentage` config error fixed in
`ui/customization.mdx`; and the tooling pages reframed as optional with the
Packages section moved to the end of the sidebar.

### Phase 6, typography. Real weights imported; one decision left

**DONE:** `globals.css` now imports Quattro's `latin-400`, `latin-400-italic`,
`latin-700` & `latin-700-italic` explicitly. Before this the bare entry
declared **one** face at 400, so `fw-600` & `fw-700` were browser-synthesised
faux bold & `<em>` a synthetic oblique. Cost is about 44 KB per added woff2,
latin only, `font-display: swap`, fetched lazily.

**THE REAL FINDING, measured by rasterising text & counting ink pixels:**

| Weight asked for | Ink pixels | Face actually used |
| --- | --- | --- |
| `fw-400` | 1654 | 400 |
| `fw-500` | 1654 | **400. Identical to regular** |
| `fw-600` | 2686 | 700 |
| `fw-700` | 2686 | 700 |

**`fw-500` is used 1144 times across `src` & renders exactly like `fw-400`.**
Quattro has no 500 face, so CSS weight matching resolves 500 downward. That is
the flatness: the site's dominant emphasis weight does nothing at all. By
contrast `fw-400` is used 105 times & `fw-600` only 25.

**The open decision:** to make emphasis visible, intended-emphasis `fw-500`
has to become `fw-600`, because 700 is the only heavier face Quattro has. There
is no 500 to import. Doing it globally across 1144 sites would make the whole
site noticeably bolder, so it probably wants to be selective: headings, nav
active states, table headers & labels, leaving body copy at 400. **Not done;
needs a design call.**

Also unresolved & purely a design question: **Esteban ships 400 only**, so
display headings can never have weight contrast without changing the face.

Smaller refinement noticed: docs `h1` is `fs-4xl fw-400` = 36px on **54px**
leading, which is loose for display type.

### Phase 6 background, diagnosed before the fix

The complaint was that type looks "too small" & the family "too generic".
Measured rather than guessed:

- **Only weight 400 is loaded, for both families.** `globals.css` imports
  `@fontsource/esteban` & `@fontsource/ia-writer-quattro` bare, and each
  `index.css` declares exactly **one** `@font-face` at 400. Confirmed in the
  browser: `document.fonts` lists only `Esteban 400` & `iA Writer Quattro 400`.
  **So every `fw-500` / `fw-600` / `fw-700` on the site is browser-synthesised
  faux bold**, and every `<em>` a synthetic oblique. That is the most likely
  cause of "generic": there is no real weight contrast anywhere.
- **Quattro ships more & none of it is imported:** `700.css`,
  `400-italic.css`, `700-italic.css` all exist in `node_modules`. Importing
  them is one line each & is the cheapest large win available.
- **Esteban is 400-only by design.** No bold exists to import, so heading
  weight hierarchy is impossible without changing the display face. That is a
  design decision, not a bug.
- Both fonts **do** load; this is not a loading failure. Quattro's x-height is
  slightly larger than `system-ui` (52 vs 50 at 100px), so "too small" is not
  an x-height problem either.
- Sizes are consistent & sane: MDX `p` & `li` are both **16px** at 1.5.
  The 18px paragraph on a docs page is the page **description** (`fs-lg`), not
  prose. Docs `h1` is `fs-4xl fw-400` = **36px on 54px leading**, which is
  loose for display type & is a fair refinement.

Corrected mid-diagnosis: an earlier reading claimed `p` was 18px & `li` 16px,
i.e. an inconsistency. That was wrong; it was the description element.

### Do not rebuild these. They were considered & rejected

- **The blog timeline. Rejected 2026-07-31 after ten mockups.** Base UI's
  Releases page was the reference. Explored a staggered rail, a left rail with
  cards, a bare rail, a date gutter, a rail with covers, then five sharp forks
  of the last one including a serpentine "snake" weave. Built the winner
  (2px slab, sticky year labels, cover leading) & then reverted it.

  **Why, and the general rule it produced:** the site has **no cards, no
  rails, no framed images anywhere**. Verified by grep - `src/app`,
  `src/components` & `src/styles` contain **zero** `br-*` utilities and zero
  `border-radius`. Every route is plain typography grouped by whitespace. A
  timeline introduces a rail, marker blocks & bordered thumbs, which is three
  pieces of visual vocabulary that exist nowhere else, so it reads as foreign
  no matter how it is tuned. **Check that grep before proposing any new
  visual structure for this site.**

  Two other findings worth keeping. A staggered timeline scans *worse*:
  3 posts above the fold versus 5, because the eye zigzags. And a snake weave
  cannot carry year headings without breaking the line, and nothing tells a
  reader that row two runs right-to-left, so chronology can be misread.

  Also settled here: **sharp angles only, no circles or rounded corners.**
  The only remaining circle in the repo is the logo itself
  (`src/components/icons/yummacss-dark.tsx`). The 1690 `br-*` uses all live in
  `src/registry` (the Yumma UI components, incl. **384 `br-9999`** across 149
  files) - if "sharp only" becomes a brand rule rather than a page preference,
  that is where the decision actually lands, and it is a large job.
- **A releases page.** Built & reverted the same day. It re-rendered
  `CHANGELOG.md`, which GitHub already renders, so it added no information:
  `/releases.md` was **byte-identical** to GitHub's raw file, and the route was
  invisible to site search because `search-data.ts` indexes only `allDocs` &
  `allUis`. Its original purpose was replacing the release blog posts, and
  those were kept, so its job disappeared. Cost was a changelog parser that
  already needed two fixes for upstream typos, a CI sync step, a 54 KB churning
  data file, & a navbar slot. **If the itch returns, build per-utility "added in
  3.29" badges or a version switcher instead** - those carry information GitHub
  does not have.
- **A "For LLMs" docs page.** Written, then replaced by the plain sidebar link
  to `/llms.txt`, which is what was wanted.
- **Driving the sidebar from frontmatter.** The section order & the 16 nested
  groups would still need a config file, reordering would go from moving one
  line to editing many files, and numeric order across 254 files is exactly
  what had already drifted into four duplicate values.
- **Replacing the tooling pages with README links.** The READMEs are not a
  substitute: canon's documents neither `--config` nor `extractClasses`.
  Deleting the pages would also drop canon from `llms.txt` & from site search.

### Package manager convention, set 2026-07-30

**Only pnpm & npm, pnpm always the first tab.** yarn & bun were removed
everywhere. Every install or CLI command lives in a `<CodeGroup>` with exactly
two fences, `title="pnpm"` then `title="npm"`, including in blog posts. Current
count: 20 pairs, verified balanced.

Equivalences used: `pnpm add X -D` / `npm install X -D`, and
`pnpm dlx X` / `npx X`. **`pnpx` does not exist**; it was in `canon.mdx` briefly
& is wrong. pnpm's one-off runner is `pnpm dlx`.

### Gotchas worth keeping

- **Esteban only applies inside `<article>` or via `.ff-e`.** `globals.css`
  sets `h1..h6` to `system-ui` & overrides only `article h1..h6, .ff-e`. Any
  new page built from `<section>` / `<header>` gets system-ui headings silently.
- **`pnpm validate` runs canon over `src/app`, `src/components`,
  `src/registry`.** Use it to check class names in new components; it caught
  nothing invalid today but it is the right reflex.
- **`scripts/check-sidebar.mjs` runs before `next build`.** Every content page
  must appear in `sidebarConfig` exactly once. It parses only the
  `sidebarConfig` object, so link lists elsewhere in that file are ignored.
- **On Windows, stopping a background task does not kill the `next dev` child.**
  Several orphans accumulated; one reached 3.6 GB RSS & hung. Kill by PID.

### Small things found today, all unfixed & all in the monorepo

- `CHANGELOG.md`: `3.24.7` writes `## Changed` instead of `### Changed`; one
  `### Fix` among 34 `### Fixed`; `3.28.0` has no date on its heading.
- **Core's `scroll-*` slugs are inconsistent.** Most are fully qualified
  (`scroll-margin#scroll-margin-top`) but two are short (`#bottom`,
  `#inline-start`), and `scroll-margin` uses `#inline-start` where
  `scroll-padding` uses `#scroll-padding-inline-start`. The docs headings were
  written to match each slug exactly so all 16 anchors land; normalise core &
  those headings can become uniform.
- **`grid-column-span` & `grid-row-span` are not utilities.** Core has
  `grid-column` with prefix `gc-s`, so the span concept *is* `grid-column`.
  `grid-column-span.mdx` & `grid-row-span.mdx` therefore duplicate
  `grid-column.mdx` & `grid-row.mdx`, rendering identical tables. Deleting
  pages removes URLs & needs redirects, so it was left alone.
- **Blog posts have no `.md` route**, so the entire 4.0 rationale is unreadable
  to an agent. Detail further down under AI/LLM legibility.

## Earlier on 2026-07-30, superseded. Kept for the measurements only

Read the section above instead. This described the state before the docs
session & two of its claims are now stale: `main` **has** been pushed, and the
state+state decision **was** made (recorded as #20 in the 4.0 draft: drop
pseudo-class stacking in 4.0, keep every other stack).

Everything from 2026-07-29 shipped. `docs` `main` is pushed & live: canon page,
Packages category, changelog in the TOC, json/yaml grammars. Verified in
production, `/docs/canon`, `/docs/canon.md` & `/llms.txt` all 200, the llms.txt
header carries the canon paragraph & the `## Packages` section lists both pages.

**The `.md` routes are fixed. DONE, merged to local `main`.** (The original
line said "NOT PUSHED"; that was true on 2026-07-30 & is not now. Everything
here is pushed & live.)
`src/utils/mdx-markdown.ts` replaces the three near-duplicate regex renderers.
Paired components are unwrapped & their children de-indented; `Reference` still
expands to its table, a `Step` title becomes a numbered bold label, a `Hint`
becomes a blockquote, & a link card becomes a list item. Fenced code is tracked
throughout, so tags inside a fence stay as content.

Measured, not assumed:

| Surface | Before | After |
| --- | --- | --- |
| `/docs/installation.md` leaked tags | 10 | 0 |
| `llms-full.txt` raw JSX tag lines | 169 | 8 |

All 8 survivors are inside code fences (`React.StrictMode`, `Button`, `Dialog`
examples), verified with an awk fence walk. The `intellisense.md` editor links
now render as real markdown list items; they were invisible raw JSX before.

Also swapped the hand-rolled `GitHub` icon for iconoir's `Github`, which the
navbar already used, & deleted the local one plus its dead mdx-components entry.

Branches `docs/canon`, `claude/mystifying-swartz-49bdec` &
`claude/pensive-pascal-d41354` are deleted. `claude/nice-kilby-ce1a7b` is also
fully merged & can go whenever. Their worktree directories are unregistered but
still on disk at `.claude/worktrees/`, ~513 MB each; delete freely.

~~`main` is 2 commits ahead of `origin/main` & needs pushing.~~ Pushed & live.

~~Next real work is the state+state nested variants decision.~~ Decided; see
#20 in the 4.0 draft. **The codemod is now the thing that gates 4.0**, and it
has not been started.

## State as of 2026-07-29 (end of session)

Nothing is broken. The docs build & the playground were both fixed today; what
remains is chosen work.

**3.29.2 published to npm at 18:28 UTC & is `latest`. All three things that
were waiting on it are DONE & verified in production.**

1. **`play` runtime pin: merged & deployed.**
   [play#59](https://github.com/yummacss/play/pull/59) pinned
   `@yummacss/runtime@3.29.2` in `panels/preview.tsx` behind a
   `RUNTIME_VERSION` constant. Live on play.yummacss.com.
2. **`intellisense` is on 3.29.2. Done by CI, nothing was owed.** The dispatch
   fired at 18:29:13, `Update & Release` succeeded, `Publish VS Code extension`
   succeeded, release `v3.29.2` cut at 18:29:43. It shipped on pnpm `10.29.1`,
   i.e. without the local bump commit, which matters; see the corrected
   diagnosis below.
3. **`@sm:` rules work. Verified in production, not assumed.** Injecting
   `@sm:d-f @lg:c-red` into the editor on play.yummacss.com produces both
   `@media (min-width: 40rem) { .\@sm\:d-f { display: flex } }` & the `64rem`
   equivalent in the Generated CSS panel. The panel scrapes
   `style[data-yummacss]` out of the preview iframe, so it is downstream of the
   runtime pin; that is why it needed the deploy & not just the npm publish.

**The repo was renamed:** `yummacss/intellisense-vscode` is now
`yummacss/intellisense` on GitHub. The old URL redirects, so existing remotes,
`gh` invocations & the manual dispatch command further down all still work, but
`gh pr create` reports the new name & that is not a mistake.

`chore/align-pnpm` ([intellisense#11](https://github.com/yummacss/intellisense/pull/11))
was merged & closed. It fixes nothing; see the pnpm section below before
concluding it did.

**Done & verified today:** docs OOM fixed with highlighting restored & live
(784 spans in production); playground fixed end to end (`node:fs`, panels v4,
vestigial `yummacss build`, then two v4 runtime bugs); blog posts rewritten;
`Changelog` & `FileTree` components added; OOM-hunt branches deleted; Node 24
set on **both** Vercel projects, so the 2026-10-01 deadline is handled.

### Priority for next session

**SUPERSEDED 2026-07-31. Read "Start here" at the top instead.** This list is
2026-07-29 vintage and predates the v4-on-hold decision: the codemod &
state+state items are now September work, not next-session work, and
`@yummacss/ui` has moved from "Low" to the actual next thing. Kept for the
items that are still open (the 25 `<Reference>` entries, the playground
config, Zed).

**High**

- ~~Document `@yummacss/canon`~~ **DONE 2026-07-29, branch `docs/canon`, not
  yet pushed.** Page at Get Started order 4; both `llms.txt` headers now state
  the validator exists & is authoritative. Documents the `--config` flag & the
  exported `extractClasses`, neither of which is in the package README. Build
  green at 269 pages.
- Decide state+state nested variants before 4.0 (see the nested variants note
  further down). It shrinks the parser & the codemod, so decide before writing
  either.
- Start the 4.0 codemod. Everything else in 4.0 depends on it existing.
- 25 missing `<Reference>` entries. A few hours, mechanical.

**Low**

- Landing page & logo for 4.0 (blocked on Renildo's brief; do not propose
  concepts unprompted).
- `@yummacss/ui` package & CLI.
- Expose `yumma.config.mjs` in the playground.
- Small debt: nitro `pnpm check` fails on clean `main`
  (`generator.ts:545,546`); one Biome import-sort error in
  `docs/src/app/llms-full.txt/route.ts`; play's `pnpm.overrides` still pin
  `^3.27.0`; leftover `update/yummacss-*` branches in both repos.
- Zed PR #6731: nothing to do, waiting on a maintainer.

## Blocking a repo, do first

### ~~Playground is down~~ FIXED 2026-07-29, merged & green

Took four problems, each hiding the next: the `node:fs` leak (released as
3.29.1), the `react-resizable-panels` v4 API, a vestigial `yummacss build` step
in `vercel.json` left over from the PostCSS migration, and then two runtime
bugs in the v4 migration itself.

**The v4 trap worth remembering: bare numbers are PIXELS in v4, percentages in
v3.** `defaultSize={50}` silently became 50px. Every size is now an explicit
percentage string. Also, v4 never fires `onResize` at all, so panel open state
comes from `isCollapsed()` plus the Group's `onLayoutChange`.

`release` branches were renamed to `main` across the repos, so play now deploys
from `main`.

Original notes below, kept for the record.

### Playground was down, two independent blockers

`play` has been failing to deploy since v3.26.0 & serves a stale 3.26.0 build,
which is why `cs-ld` & other 3.29 utilities have no completions or hover there.
Open PR: [play#54](https://github.com/yummacss/play/pull/54).

**Blocker 1: `node:fs` in the browser bundle. FIXED, not published.**

```text
the chunking context does not support external modules (request: node:fs)
```

One line. `intellisense/src/validate.ts` imported `suggestClasses` /
`validateClasses` from `@yummacss/nitro`, the **root** entry, which re-exports
`loadConfig` & `scan` & therefore reaches `node:fs`, `node:crypto` &
`tinyglobby`. The Monaco adapter imports `findUnknownClasses` from that same
module, so the Node-only surface rode into the browser bundle. A `./browser`
entry already existed on nitro; nothing pointed at it.

Fixed in the monorepo, committed as `665251c`:

- `nitro/src/browser.ts` also exports `suggestClasses`, `validateClasses` & the
  `Config` / `ValidationResult` types. All live in `generator.ts`, which only
  ever depended on `@yummacss/core`, already browser-safe.
- `intellisense/src/validate.ts` imports from `@yummacss/nitro/browser`.
- `adapters/monaco.ts` takes its `Config` type from `/browser` too. Type-only,
  so no output change; it keeps the browser-facing file honest.

Verified by building `play` against the local packages. The committed state
reproduces the exact error (Turbopack, 9 errors, trace running `monaco.mjs` ->
`validate-*.mjs` -> `nitro/dist/index.mjs` -> `tinyglobby` -> `fdir`). With the
fix linked in: 4 errors, none mentioning `node:fs`. `play` was restored to its
committed state afterwards.

**Blocker 2: `react-resizable-panels` v4 migration. Open.**

Those remaining 4 errors. `play` is on 4.12.1 but `page.tsx` still imports the
v3 API: v4 renamed `PanelGroup` -> `Group` & `PanelResizeHandle` -> `Separator`.
Pre-existing & independent of the `node:fs` work. UI work, not a package
boundary fix.

Order to recover the playground:

1. Release the monorepo fix (3.29.1), then point `play` at it.
2. Migrate `page.tsx` to the `react-resizable-panels` v4 API.

Related: exposing `yumma.config.mjs` in the playground needs config loading to
work browser-side. Still open. `loadConfig` is genuinely Node-only, so it needs
a browser config path, not just a re-export.

Note `play`'s production branch is `release`, not `main`.

### Zed has no Yumma CSS support at all

The extension was never published, so nothing shipped in 3.29 (or any release)
reaches Zed. `intellisense-zed` is absent from `zed-industries/extensions`; the
submission is [PR #6731](https://github.com/zed-industries/extensions/pull/6731),
open since 2026-07-22 & labelled `needs author action`.

Blocked on two things, neither a real defect:

1. A standing `CHANGES_REQUESTED` review asking the extension ID to match the
   publishing prerequisites. Already done: `extension.toml` has
   `id = "yummacss-intellisense"`. The review was never dismissed, so the label
   is stale.
2. ~~A failing `package` check.~~ **RESOLVED, re-checked 2026-07-29.** Both
   `package` & `danger` now report SUCCESS; the run that failed on a corrupted
   pnpm binary has since been superseded. PR last updated 2026-07-27.

Re-verified 2026-07-29, the review really is stale: the pinned submodule commit
`7590afe` is on `origin/main` & its `extension.toml` already carries
`id = "yummacss-intellisense"`, while the PR's `.gitmodules` registers
`extensions/yummacss-intellisense` & `extensions.toml` has the matching
`[yummacss-intellisense]` entry at `0.1.0`. Nothing is left to change.

**The comment was posted 2026-07-29 13:42 UTC & this item is now genuinely
waiting on a maintainer.** It confirms the rename, links the pinned submodule
commit & asks for re-review, which is everything that was owed. All four checks
are green: `package` & `danger` both re-ran successfully at 20:25 UTC, CLA
signed. The `CHANGES_REQUESTED` review & the `needs author action` label are
both stale & only a maintainer can clear them.

**Do not post a second comment.** It would repeat the first & reads as nagging.
The one distinct signal left is re-requesting review, which puts the PR back in
the reviewer's queue rather than just their notifications:

```bash
gh pr edit 6731 --repo zed-industries/extensions --add-reviewer MrSubidubi
```

Hold that until roughly 2026-08-02 & only if there is still no response.

### ~~`notify-downstream` fails~~ ~~The VSIX was stuck on pnpm~~ It was a flake

**Resolved 2026-07-29. Diagnosed twice, wrong both times.** The extension is on
3.29.2 & the release path works untouched.

First it was blamed on `notify-downstream`. That was wrong: on 3.29.1 the
dispatch fired successfully, `Update & Release` started, and then died at
`pnpm/action-setup`:

```text
[ERR_PNPM_PNPM_ENGINE_IDENTITY_UNVERIFIABLE] Refusing to run pnpm@10.29.1:
its npm registry signature could not be verified (pnpm@10.29.1: terminated).
```

Then it was blamed on `10.29.1` being an unverifiable release, and a bump to
`10.30.3` was written as the fix. **Also wrong.** The identical setup step, same
runner image, same pinned version:

| Run | Time | Result |
| --- | --- | --- |
| 30462316345 | 14:43:56 | `Successfully updated pnpm to v10.29.1` |
| 30462727905 | 14:49:32 | `ERR_PNPM_PNPM_ENGINE_IDENTITY_UNVERIFIABLE` |
| 30480133144 | 18:29:27 | `Successfully updated pnpm to v10.29.1` |

3.29.2 shipped on `10.29.1` with no bump applied. Note the `terminated` in the
error text: that reads as a truncated download, not a signature that is
genuinely wrong. **It is a flake in fetching the pnpm tarball, and it will
recur.** If a release appears stuck, re-run the job before changing anything.

The bump survives as an optional PR
([intellisense#11](https://github.com/yummacss/intellisense/pull/11)), described
there as alignment with the monorepo rather than a fix. Closing it loses
nothing.

Worth noting the Zed submission was also blocked by a corrupted-pnpm failure in
Zed's own CI, which also cleared on a re-run. That is now three pnpm fetch
failures in one week across two unrelated repos, so it is the registry or the
CDN, not either repo.

### Nested variants: they work, & the useful shape is media + state

Checked directly against the generator on 2026-07-29:

```text
f:h:bg-red    -> .f\:h\:bg-red:focus:hover
@sm:h:bg-red  -> @media (min-width: 40rem) { .\@sm\:h\:bg-red:hover { ... } }
```

Nothing is broken. `f:h:` means focus **and** hover at once, which is why it
looks wrong: it is a real but almost useless combination.

**The valuable case is media query + state**, `@sm:h:bg-red`, meaning "hover
styles only above 40rem". Hover is unreliable on touch, so gating it behind a
breakpoint is a normal pattern.

Recommendation for 4.0: keep `@media + state`, drop state+state. It removes
parser surface & codemod cases at close to zero cost, since nobody uses it.

### Old note, kept for context: `notify-downstream` intermittency

After 3.29.0 published it failed twice with a network-level error octokit
reports as a 500, while the identical call to `docs` & `play` succeeded. The
same dispatch run by hand from a laptop worked immediately, so it is not the
payload, the token, or the target repo. Watch it on the next release before
attempting a fix; one more data point decides whether it is intermittent.

Manual retrigger:

```bash
gh api -X POST repos/yummacss/intellisense-vscode/dispatches -f event_type=yummacss-released -F 'client_payload[version]=v<version>'
```

### Release plumbing, done

- **Release workflows are manually runnable.** `workflow_dispatch` added to
  `docs` & `play` update-yummacss, and to `intellisense-vscode`
  update-and-release. Not being able to exercise a release path except by
  releasing is how the dead `release` branch ref survived unnoticed.
- **Extension versions track Yumma CSS** rather than incrementing
  independently. `intellisense-vscode` jumps 0.11.53 -> 3.29.0 on the next
  release, automatically, via CI. Breaks SemVer by design; the extension is
  `private: true` & ships as a VSIX, so nothing external depends on the number.

## Shiki writes `class`, not `className`. Read before touching code-decorate

**The bug, fixed 2026-07-31 (`f7dabde7`), was live in production.** Every
fence carrying `mark`, `del` or `ins` rendered with all its lines run
together. **92 such fences across 14 content files.** Plain fences were fine,
which is why it looked intermittent rather than total.

Shiki sets `properties.class = "line"` as a **raw string**, not hast's
canonical `className`. `decorateCodeHast` appended to `className`, so both
survived & `hastToHtml` emitted **two class attributes**:
`<span class="line" class="d-b">`. The browser keeps the first duplicate &
silently drops the rest, so the decoration never applied.

That alone would have been cosmetic. The damage is that the decorator
**strips the `\n` text nodes first**, deliberately, because `d-b`
(`display: block`) is meant to supply the breaks instead. With `d-b` dropped
the lines had neither newlines nor block display, so `white-space: pre` had
nothing to break on.

Fix folds both sources into `className` & deletes `class`. **If you add any
class to Shiki output, fold `properties.class` in or you will reintroduce
this.** Nothing in the CSS depends on `.line`, so it is preserved only for
safety.

Verified: the vite fence on `/docs/installation` went from 42px tall with 7
spans sharing 2 positions, to 148px with 7 lines at 21px & 7 distinct tops,
mark landing on lines 2 & 5 as `mark={2,5}` asks. Swept 51 multi-line blocks
across 7 routes: zero collapsed.

**Method worth reusing:** count distinct `getBoundingClientRect().top` values
among line spans. A collapsed block has fewer distinct tops than lines, which
catches this by geometry rather than by eye.

## Monorepo typecheck, clean for the first time

Branch `fix/typecheck-clean` (`0ef449e`) on `yummacss`, **not merged, not
pushed.** All nine packages now pass `pnpm check`; the suite stays at 87
passing tests.

Two failures, and only the first was in these notes:

- **nitro `generator.ts:545-546`.** Destructured regex groups are
  `string | undefined` under `noUncheckedIndexedAccess`. None of the three
  groups is optional, so defaults in the destructuring fix it without
  asserting anything the regex does not guarantee. `generation.test.ts`
  already covers both `negateValue` branches (`tsy--6` -> `skewY(-6deg)`,
  with an explicit assertion against `-skewY(6deg)`), so the change is proven
  behaviour-preserving rather than merely compiling.
- **`language-server`, 4 errors, previously unrecorded.**
  `IntellisenseConfig` was a hand-maintained copy of nitro's config shape
  declaring `colors?: Record<string, string>`, which stopped matching when
  **3.29 added paired `{ light, dark }` colors**. Never a runtime bug:
  `hover.ts` & `core.ts` already cast `as any`, so paired colors always
  worked & only the declaration was wrong. That is exactly why it survived a
  whole release.

  Now derived as `Pick<Config, "theme">` with a `ThemeColors` alias, so the
  next theme change cannot reintroduce the drift. **`Config` is imported from
  `@yummacss/nitro/browser`, never the root** - the root re-exports
  `loadConfig` & `scan` and so reaches `node:fs`, and this module is in the
  Monaco adapter's browser graph.

  **Gotcha:** `language-server` resolves `@yummacss/intellisense` through its
  built `.d.ts`, so a source-only fix looks like it has not worked until you
  run `pnpm --filter "@yummacss/intellisense..." build`.

### The DRY target worth taking, if the itch returns

`any` density is concentrated in exactly one package: core 0, nitro 1,
canon 0, cli 0, **intellisense 40**, language-server 0, postcss 0, runtime 0,
vite 0. Those 40 are the mechanism that let the type drift compile.

The colour-merge block (`const { percentage, ...userColors } = ... as any`
then `createColors`) exists **five times**: `intellisense/core.ts` &
`intellisense/sort.ts` (byte-identical apart from the function name),
inlined in `conflicts.ts` & `hover.ts`, plus a variant in
`nitro/generator.ts`.

Worth consolidating **only because #16 (OKLCH) rewrites `createColors`** -
today that is five call sites & five chances to miss one. Do **not** refactor
core/nitro/canon internals: they are already clean, and 4.0 rewrites that
surface anyway. Cap any cleanup at the config/colour boundary.

## Docs build OOM on Vercel

**Status 2026-07-29: FIXED, MERGED & LIVE (`913bfbc7`).** Verified in production:
784 highlighted spans across 35 blocks on /blog/yummacss-3.0.0. The two
`turbopack*` flags were dropped in the same merge; neither ever helped. Highlighting happens in a server component
during page generation instead of in the rehype pipeline, so the markup lands
in the generated HTML rather than in 260 compiled MDX modules. Local output:
server chunks 145 MB -> 109.5 MB, largest chunk ~11 MB -> 4.7 MB, client static
21.8 MB -> 14 MB.

Two things learned while doing it:

- `rehype-code`'s line & word decoration depended on Shiki's per-line spans &
  on the `data-meta` its transformer set, so it had to move too. It now lives
  in `src/lib/code-decorate.mjs`, unchanged, running on the same hast later.
- The first attempt read the theme with `readFileSync` & failed the build with
  `node:fs` in a client chunk, because `mdx-components.tsx` is dual-use & pulls
  the highlighter into the client graph. Same leak as the playground bug. The
  theme is a module import now. **Do not reintroduce `node:fs` anywhere
  reachable from `mdx-components`.**

Preview deployments are behind Vercel Authentication, so rendered output cannot
be checked by fetching the preview URL; verify locally or after merging.

### Does the Yumma UI migration help the OOM? Measured 2026-08-06

Asked by Renildo mid-migration. **First, the correction that matters: the OOM
is already fixed** (2026-07-29, `913bfbc7`, above) & the fix was structural -
highlighting moved out of the rehype pipeline into a server component. The
root cause was **one highlighter per build worker across 12 PIDs**, not the
volume of content. So the migration is *not* the fix, was never needed for it,
& deleting files would not have prevented that OOM.

**But it does buy real headroom.** Measured properly - two clean builds on the
same machine, same run, one definition measured myself, per this section's own
warning not to diff against remembered numbers:

| | `d3b17d7f` (pre-session) | `29287298` (now) | delta |
|---|---|---|---|
| `.next/server/chunks` | 59 MB | 51 MB | **-14%** |
| `.next/static` | 14 MB | 11 MB | **-21%** |
| chunk files | 541 | 315 | **-42%** |
| registry `ui/*.tsx` | 347 | 169 | **-51%** |
| largest single chunk | 3 MB | 3 MB | **unchanged** |

**The unchanged largest chunk is the important row.** OOM is a peak-memory
failure, and peak tracks the largest single unit of work far more closely than
it tracks total bytes. Halving the file count is breadth, not peak. So: more
comfortable, genuinely - 42% fewer modules for the bundler to hold - but if the
OOM ever returns it will be for the old reason (per-worker duplication of
something expensive), and none of this would have stopped it. **Don't bank the
migration as OOM insurance.**

Caveat on scope: this is only *this session's* slice. Button, Skeleton, Avatar,
Autocomplete, Checkbox, Combobox, File Upload, Field, Number Field, Radio,
Select & Slider were already migrated before `d3b17d7f`, so the full-migration
delta from the original ~450 files is larger than the table shows.

Method, if repeating: `git checkout <old-sha> -- src/ yumma.config.mjs`, build,
measure, then restore. **`git checkout <sha> -- path` writes the index too**, so
the old files come back *staged*; unstage with `git reset -- src/` and then
delete exactly the leftovers via `git ls-files --others --exclude-standard src/`
rather than reaching for `reset --hard` or `clean -fd`.

### Grammar count is now 9, & adding grammars is cheap

2026-07-30, branch `claude/mystifying-swartz-49bdec` (`c5ae4b7e`), not yet
pushed. `json` & `yaml` added to `src/lib/highlighter.ts`, so the count in that
file's doc comment is **9**, not 7. Both are single grammars with no
`embeddedLangs`; `yaml` brings the `yml` alias, `json` declares no aliases, so
`jsonc` & `json5` would still fall back to plain text.

**The headline: grammars no longer cost anything measurable.** Measured before &
after on an identical 268-page build, same machine, same run: server chunks
62.8 -> 62.9 MB, largest chunk 4.62 MB unchanged, client static 14.0 MB
unchanged, file counts identical. That is the render-time move paying off; the
old cost was one highlighter per build worker across 12 PIDs, not the grammars
themselves. **Adding a grammar for a fence that needs one is now a normal
change & does not need an OOM investigation.**

Two things to correct in the numbers above:

- **The `109.5 MB` figure in this section does not reproduce.** On the same
  tree, `.next/server` measures 153.5 MB & `.next/server/chunks` measures
  62.8 MB. Neither is 109.5, so that row used a boundary that was never written
  down. `largest chunk 4.7 MB` & `client static 14 MB` both reproduce exactly.
  **Compare before/after on one definition you measure yourself; do not diff
  against 109.5.**
- Only **one** `json` fence & **one** `yaml` fence exist in the whole repo, both
  in `canon.mdx`. Verified with a repo-wide search for json/yaml/yml fences at
  any indent. So this change lights up exactly two code blocks today.

Verification method worth reusing, since preview URLs cannot be fetched: run
`pnpm dev`, then from the page count styled spans with
`document.querySelectorAll('pre span[style]').length`, & `git stash` just
`highlighter.ts` to get the baseline from the same running server. On
`/docs/canon` that gives 136 -> 152, the two new blocks contributing 8 each.
Check the spans carry real eclipsa colours (JSON & YAML keys `#85B1E0`) rather
than only counting them, & check `text` fences still report 0, which is what
proves the plain-text fallback survived.

**`canon.mdx` is on the unmerged `docs/canon` branch, not on `main` or on this
branch.** It has to be checked out into the working tree to verify against, &
removed afterwards, or the highlighter commit silently carries the canon page
with it.

Previous status, kept for context: Shiki was disabled in the MDX pipeline on
`main` (merge `8fafd55d`) so the docs could deploy with unstyled code blocks.

Vercel's builder is 2 cores / 8 GB. The build dies with SIGKILL during
"Creating an optimized production build", the Turbopack compile, before page
generation. `experimental.cpus` cannot help; it only caps the later worker
pools.

### What was ruled out, one variable per deploy

| Configuration | Result |
| --- | --- |
| Build cache skipped | OOM |
| Build cache restored | OOM |
| `turbopackClientSideNestedAsyncChunking` + `turbopackSourceMaps` off | OOM at 49s |
| Shiki fine-grained: 7 grammars, JS regex engine, no WASM | OOM at 49s |
| Registry sources truncated to 3 lines | OOM at 161s |
| Registry sources marked `plaintext` | OOM at 160s |
| webpack instead of Turbopack | postcss loader error; OOMs V8 heap locally |
| **Shiki removed from the rehype pipeline** | **green, 1m, all 268 pages** |

### Corrections to earlier entries in this file

- **"CAUSE CONFIRMED: the build cache" was wrong.** A deploy of `31c5c20`
  logged `Skipping build cache, deployment was triggered without cache` at
  10:21:26 & still died at 10:22:32. A later run *restored* the cache & also
  died. `VERCEL_FORCE_NO_BUILD_CACHE=1` is not worth setting.
- **The registry-stub test was invalid.** It stubbed `src/registry/index.ts`,
  the dynamic import map. `rehype-registry.mjs` never reads that file; it reads
  `src/registry/ui/<id>.tsx` straight off disk. The stub never reduced Shiki's
  workload, so its failure proved nothing either way.
- **The old peak-RSS table was noise.** Single runs on a Windows workstation,
  with one row measuring *higher* than baseline after cutting grammars, which
  is impossible as a real effect. Only the Shiki-disabled row (-65%) was large
  enough to survive, & that one turned out to be right.

### What is actually true

- `rehype-registry.mjs` injects whole component sources into code fences before
  Shiki runs. 439 `registryId` fences, 450 files, **32,778 lines, 1.17 MB**.
  The site's ~130 hand-written prose fences are a rounding error next to this.
- Local production output with Shiki on: **145 MB** of server chunks, three
  single chunks near 11 MB, and `menubar.html` alone at 1.5 MB.
- The plugin module is evaluated **12 times across 12 PIDs** in a local build,
  one highlighter each.
- Input volume changes how fast memory climbs (49s vs 161s) but never prevents
  the OOM. Making Shiki itself lighter changed nothing at all.
- webpack is not an escape hatch. It is pure JS & hits V8's heap ceiling
  locally even on a large machine, and on Vercel it fails earlier on a postcss
  loader incompatibility with `src/styles/globals.css`.

### The actual fix, not yet built

Run Shiki in a standalone prebuild script that highlights everything once,
writes HTML to disk & exits, so its memory is freed before `next build` starts.
`next build` then runs Shiki-free, the one configuration proven to complete.
The `Code` component reads the pre-rendered HTML at render time, so the
highlighted markup never enters the module graph.

Caveat to respect while building it: do **not** simply inject the pre-rendered
markup back through a rehype plugin. That puts the 145 MB back into the modules
and likely reproduces the OOM. It has to be read at render time.

Splitting into two Vercel projects would only buy headroom, and the
plaintext test suggests even the smaller half would still fail. Larger Vercel
build machines are billed per CPU-minute ($0.0035/CPU-min; the 8-CPU Enhanced
tier is $0.028/min) on paid plans.

### Cleanup owed

- Throwaway branches on the remote: `test/registry-stub`,
  `test/truncate-registry-source`, `test/plain-registry-source`,
  `test/webpack-build`, `test/no-shiki`, `fix/shiki-oom`.
- `fix/shiki-oom` added `@shikijs/core`, `@shikijs/langs` &
  `@shikijs/engine-javascript` as direct deps. They are not on `main`, but the
  prebuild script will want them.
- `next.config.ts` keeps `turbopackClientSideNestedAsyncChunking: false` &
  `turbopackSourceMaps: false`. Neither helped. Not load-bearing, delete freely.

## Docs coverage (audited 2026-07-26)

- `@yummacss/canon` is mentioned nowhere in the docs. Biggest gap, it is a CLI
  a human types. (`@yummacss/nitro` was considered & dismissed: internal.)
- 25 utilities never referenced: `scroll-padding-*` (8), `scroll-margin-*` (8),
  `border-{top,right,bottom,left}-color` (4), `scale-{x,y,z}` (3),
  `inset-{x,y}` (2). Base pages exist; these need `<Reference>` entries, not new
  pages.
- `normalize.mdx` is hand-written; consider sourcing it from `@yummacss/nitro`
  so it cannot drift.
- ~~`dark-mode.mdx`~~ **DONE 2026-07-28.** Own page at order 5; `colors.mdx`
  moved to order 4 & keeps a short pointer. Live.
- ~~`color-scheme.mdx`~~ **DONE 2026-07-28.** Standard auto-generated page;
  `<Reference>` renders all three values. Live.
- ~~Sidebar entries for both new pages~~ **DONE 2026-07-28.** Live.
- ~~`configuration.mdx` paired colors~~ **DONE 2026-07-28.**
- ~~Dogfood `cs-*`~~ **DONE 2026-07-28.** `:root { color-scheme: dark }` is now
  `cs-d` on `<html>` in `layout.tsx`. The preview block in `globals.css` stays
  CSS on purpose: those selectors match Base UI portal elements rendered into
  `<body>`, so they inherit nothing from the preview container & cannot be
  reached by a class.
- ~~`percentage` placement~~ **RESOLVED 2026-07-28, the docs were wrong.**
  Verified by generating `bg-brand-1` three ways: default `#dae9fb`,
  `percentage` as a sibling of `colors` `#dae9fb` (identical, i.e. ignored),
  `percentage` inside `colors` `#ffffff`. It belongs **inside** `colors`.
  `colors.mdx` was wrong & is fixed; `configuration.mdx` was already correct.

## AI/LLM legibility

The theme tying several of these together.

- ~~Yumma UI routes expose no code blocks~~ **FIXED 2026-07-31 (`ef1b54fa`).**
  `/ui/components/button.md` was 965 B with **zero** fences; it is now 17.5 KB
  with 27 component sources, and all 38 UI pages carry code.

  The cause is worth remembering: a UI page's content is
  `<ComponentPreview registryId="button-base" />`, and `mdxToMarkdown` drops
  self-closing components as "nothing to unwrap". The real source is injected
  by `rehype-registry` **at compile time**, so it never existed in the MDX the
  route reads. `registryId` now expands to a fenced `tsx` block.

  The disk read lives in `src/utils/registry-source.ts` (server-only) and is
  **injected** into `mdxToMarkdown` rather than imported by it, so that shared
  file stays client-safe by construction - a `node:fs` there is the leak that
  took the playground down & failed the first OOM fix. Its lookup order
  mirrors `rehype-registry` exactly (`ui`, then `docs`) or a page and its
  `.md` could resolve different files.
- `responsive-variant.tsx`, `hover-state.tsx` & `negative-values.tsx` render JSX
  rather than text, so their content is absent from the `.md` routes.
  - Possible fix: drive these components from `@yummacss/core` so their content
    is real data, not markup.
  - Concern: folding them into tabs on the `Reference` component would shrink
    the pages further & risks looking oversimplified.
- **Correction 2026-07-29 on the `-m-4` story.** This was previously written up
  as a docs-coverage hypothesis. That is not the point. Cursor suggested
  Tailwind's `-m-4` to a real user, she preferred it, & she already likes
  Tailwind. The lesson is not "the `.md` routes are thin"; it is that the v3
  dash syntax reads as a worse Tailwind rather than as CSS. That is the actual
  motivation for the 4.0 colon syntax, & it is recorded in the 4.0 draft.
- ~~Mention `@yummacss/canon` in the `llms.txt` routes~~ **DONE 2026-07-29.**
  Both `llms.txt` & `llms-full.txt` headers now say canon exists, that it
  validates against the generator & is therefore authoritative, & explicitly
  that a Tailwind class name should not be assumed to have an equivalent.
- **`/llms.txt` is linked from the sidebar. DONE 2026-07-30.** Under a
  "Resources" heading at the end of the docs nav & in the mobile drawer, opening
  in a new tab. Defined as `docsLinks` in `src/config/sidebar.ts`.

  A "For LLMs" page was written first & then removed: Renildo wanted the route
  linked directly, which is simpler. Do not re-propose the page.

  The link is deliberately **not** in `sidebarConfig`. That maps slugs to
  content pages, & six consumers assume every entry resolves to an `.mdx`:
  `sidebar.tsx`, `mobile-dialog.tsx`, `utils/sidebar.ts`, `pagination.ts`,
  both llms routes & `scripts/check-sidebar.mjs`. Adding a link shape there
  would need a third branch in all of them for one link. `check-sidebar.mjs` now
  parses only the `sidebarConfig` object so link lists elsewhere in the file
  cannot be mistaken for slugs.
- ~~**Blog posts have no `.md` route**~~ **FIXED 2026-07-31 (`ef1b54fa`).**
  `api/blog-md/[slug]` plus the `/blog/:slug.md` rewrite. All 9 posts resolve;
  the 4.0 decision log is finally agent-readable.

  Drafts are gated with `isVisible`, **not** a bare `find` - reading
  `allBlogs` directly leaks drafts, and the 4.0 post is one. Verified against
  a real production server on port 3100: `yummacss-4.0.0.md` is 404 there and
  200 in dev, matching `/blog/[slug]`.

  Still true & not addressed: `llms-full.txt` walks `sidebarConfig` rather
  than the blog collection, so blog content is absent from it. Separate job.
- ~~**Paired JSX leaks into the `.md` routes**~~ **FIXED 2026-07-30**, merged to
  `main` as `d3931e77`. Measured before & after: `/docs/installation.md` went
  from 10 leaked tags to 0, `llms-full.txt` from 169 raw JSX tag lines to 8, &
  all 8 survivors are inside code fences where they are content. Original note
  below for the record.

  `renderDocMarkdown` in `api/docs-md/[slug]/route.ts` &
  `renderDocBody` in `llms-full.txt/route.ts` both strip only *self-closing*
  capitalised components (`/<[A-Z][A-Za-z]*(\s[^>]*)?\s*\/>/g`). Paired ones
  survive: `/docs/installation.md` contains literal `<Stepper>`,
  `<CodeGroup>` & `<Hint icon="info">` tags, & because their children are
  indented four spaces inside the JSX, markdown reads that content as code
  blocks. So the single most important page for a new user or agent is the most
  degraded one. This is a concrete, measurable instance of the AI-legibility
  theme rather than a hypothesis. `canon.mdx` sidesteps it by using plain
  markdown; the real fix is to unwrap paired components in both renderers.

## Playground follow-ups, raised 2026-07-29

- **Draft blog posts.** Idea raised: give drafts their own section on `/blog`.
  Pushback worth weighing first: drafts are already excluded from the listing,
  RSS, sitemap & the production route, and render only in `next dev`. A public
  route would expose unfinished writing. If the goal is finding them locally, a
  dev-only listing is cheap; if it is publishing work in progress on purpose,
  that is a different decision & should be made deliberately.
- **`@yummacss/runtime` dropped every responsive utility. FIXED in 3.29.2.**
  Its extractor filtered classes with `/^[a-z]/`, so `@sm:d-f` was discarded
  before reaching the generator & never appeared in the Generated CSS panel.
  Now `/^[a-z@]/`. nitro's own tokenizer applies no such filter, so the runtime
  was the odd one out. Ships on the next release.
- ~~**play loads the runtime unpinned**~~ **FIXED, merged & live.**
  `panels/preview.tsx` had `https://unpkg.com/@yummacss/runtime` with no
  version, so the playground silently tracked `latest` & could change behaviour
  with no deploy & no commit. Now a `RUNTIME_VERSION` constant pinned to
  `3.29.2` in [play#59](https://github.com/yummacss/play/pull/59). **Bump it
  alongside the `package.json` dependencies on every release** or the preview
  quietly runs an old runtime, which is the opposite failure & harder to spot.
- The Vercel project was deleted & recreated because it was still wired to the
  old `release` branch.

## Known small debt

- ~~`pnpm --filter @yummacss/nitro check` fails~~ **FIXED 2026-07-31** on
  branch `fix/typecheck-clean`, along with 4 unrecorded `language-server`
  errors. Not merged, not pushed. See "Monorepo typecheck" above.
- ~~`docs`: biome reports one import-sort error~~ **That count was wrong.**
  Actually 3 accessibility errors, 2 auto-fixable, 3 non-null assertions & a
  format drift. Listed in full under "Left in the docs bucket" at the top.
- `yummacss.com` 308-redirects to `www.yummacss.com`. Expected, noting it so
  `curl` checks without `-L` are not mistaken for outages.

## Redesign the API Reference table, raised 2026-08-07

Renildo, on the current `PropsTable`: "right now I feel like it's throwing way
too many info in less than 3s. To me at least it feels like I'm drowning IDK
why."

**The "IDK why" has an answer.** `src/components/props-table.tsx` renders four
columns with every prop's full prose description expanded at once. Three things
compound:

1. **The description column wins the page.** It is the widest column & holds
   the only multi-line content, so row heights vary with prose length. The prop
   names, which are the thing you actually scan for, sit in a narrow left
   column that the eye has to fight for.
2. **Enums spell themselves out inline.** `typeOf` joins values with `" | "`,
   so `shape` reads `rounded | square | squircle` in the Type column. Correct,
   but it competes with the description for attention & doubles the visual
   weight of a row that is conceptually simple.
3. **Nothing is deferred.** A migrated component now carries 8-11 props where a
   demo file carried none. The table got longer at exactly the moment each row
   got denser. Onboarding is 10 rows, all open.

**Constraint from Renildo: do not copy Base UI's.** "Base UI collapses their
info, but I don't want to copy their API Reference table." Their pattern is a
chevron per row expanding into a Name / Description / Type stack. The
collapsing instinct is right; the execution should not be theirs.

Worth considering, none decided:

- Drop Description out of the table entirely & let each row expand to it. Scan
  first, read second, which is the order you actually use a prop table in.
- Two columns, not four: `name` with its type set quietly beneath it, and the
  description. Default folds into the description's first clause ("Defaults to
  `rounded`.").
- Group by concern. Every migrated component ends with the same
  `shape`/`shadow`/`animate`/`className` tail; those are learned once & then
  never read again, so they could sit under a "Styling" divider below the
  props that differ per component.
- Leave the table alone & fix the density instead: the descriptions were
  written to be complete, not skimmable, and some are two sentences where one
  would do.

**Do not start this until the demo-file import step is done.** It is presentation
work on a schema that is now stable; the import step is the last thing that can
still change the schema.

## Versioning: `0.0.1` first, patches only, decide the real number at ship

Settled 2026-08-07. Renildo: "we'll only ship once it's ready. then we'll decide
if it's mature enough for 1.0 or 0.1.0 or not mature and we'll go with 0.0.1 and
move slowly with patch releases and avoid minor updates and focus on patches."

**Ship `0.0.1` and stay on patches.** The reasoning, which is the part worth
keeping:

- The version is a **claim about stability**, and the schema has been proven
  against 36 components but against **zero outside users**. Field was the one
  hard case & it resolved without changing anything already shipped, which is
  evidence but not the kind that `1.0` asserts.
- `0.0.x` is the only range where **every release is free**. Under semver
  proper, `0.x` still makes a minor bump mean "breaking," so moving to `0.1.0`
  buys a promise before there is anything to promise.
- The number is cheap to raise & expensive to lower. `0.0.9 -> 0.1.0` costs
  nothing. `1.0.0 -> 1.0.1` after a breaking fix costs the claim.

**The thing that should trigger the decision** is not a date & not a component
count: it is the first outside user filing an issue that the schema cannot
answer without a breaking change. Until that happens the schema is untested in
the only way that matters, whatever the internal coverage says.

## Knock-on work outside the monorepo, for 4.0

- `intellisense-vscode` & `intellisense-zed`: class-detection patterns assume
  the v3 shape & will not match `d:f`. 4.0 only.
- `@yummacss/canon`: the canon list is what AI tools & `validate()` check
  against; it has to ship with 4.0 or every v4 class reads as unknown.
- `docs`: every code example. Run the codemod here first; it is the largest real
  corpus & has to be migrated anyway.

  ## Yumma UI package & CLI

Raised 2026-07-28. Idea: extract the component registry into `@yummacss/ui`
with a CLI, shadcn style, so people pull components into their project instead
of copy-pasting out of the docs.

What was settled:

- **It does not fix the docs build.** Packaging relocates the cost rather than
  removing it, because the docs still bundle whatever they render. Confirmed by
  the OOM testing above: stubbing the registry changed nothing. Build this for
  distribution, never as a performance fix.
- **It has to copy source, not install a dependency.** The Yumma UI launch post
  now commits to this in print, under a "Not a Dependency" heading: no version
  to track, no breaking change to absorb, no wrapper API between the user & the
  markup. A published component package would contradict a public claim, so the
  CLI should write files into the project the way the docs' copy button does.

### `ui/customization.mdx` becomes the Yumma UI API docs. NOW LIVE WORK

**Was "far off, do not act yet". That is stale as of 2026-07-31**, since
Yumma UI is the next thing being built. Note Renildo has since **deleted**
`theming.mdx` in an uncommitted change, so the link target below may need
rechecking before use.

Raised 2026-07-30 while writing `docs/theming.mdx`. The two pages overlap:
`ui/customization.mdx` has its own "Extending Colors" & "Overriding Color
Shades" sections that duplicate `colors.mdx` & now `theming.mdx`.

The overlap is **not** worth fixing by deleting or redirecting the page.
**When `@yummacss/ui` ships, that route becomes the natural home for the
component API**: props, compound parts, slots & the Base UI mapping. None of
that exists anywhere today, & it is the one thing a component library must
document that a CSS framework must not. So the page is a placeholder holding a
useful URL, not dead weight.

What to do when the package lands:

- Cut the two colour sections & link to
  [Customization](/docs/colors) / [Theming](/docs/theming) instead. Colour
  config belongs in the CSS docs; it is the same `theme.colors` API either way.
- Keep & expand "Atomic customization" & "Component Slots". Both are about
  Yumma UI specifically & have no equivalent in the CSS docs.
- `### Flexible by Design` (line 17) is an empty heading with no body. Either
  write it or drop it.
- The page is `order: 2` in the `ui` collection. Props docs will want to be
  their own page rather than more sections here.

Open questions, none investigated:

- Where the registry source of truth lives. `docs/src/registry/ui/*.tsx` today,
  450 files; a CLI would want it somewhere both can read.
- Whether the CLI is its own package or a `yummacss ui add <name>` subcommand
  on the existing CLI. The second keeps one install.
- How component dependencies resolve. Most components import `@base-ui/react`,
  so the CLI has to add that or fail clearly.

## Expose `yumma.config.mjs` in the playground

Wanted so people can edit the theme in play & see the output change. Still
blocked on the same package boundary as the `node:fs` bug above, but the fix
that unblocked Monaco does not unblock this: `loadConfig` genuinely reads from
disk (`node:fs`, `node:crypto`, `tinyglobby`), so it cannot simply be
re-exported from `@yummacss/nitro/browser`.

Needs a real browser config path: parse a config from a string in memory rather
than resolve & import a file. Related to the parked interactive palette idea
below, which is the same problem in a smaller form.

## Landing page & logo redesign, for 4.0

**Status 2026-07-31: both attempted, both dropped. Do not restart unprompted.**

The "wait for his brief" instruction below was lifted on 2026-07-31 & concepts
were produced. What came back:

- **Landing mockups were rejected as "messy, hard to scan, overwhelming".**
  Four directions were built (Specimen, Index, Mechanism, Marginalia) & all
  four missed. A calmer single-page rebuild was then also dropped. Explicitly
  ruled out as **too generic**: a centred heading over centred buttons, and a
  code block comparing Yumma CSS to other frameworks.
- **The logo brief sharpened, then was dropped too.** It is now
  **one circle, one square & one triangle, white, sharp angles only**. Eight
  arrangements were drawn; none chosen. Renildo said to forget the logo for
  now & focus elsewhere.
- Useful method note: mockups live at `public/mockups/` (gitignored) served by
  `next dev`, with the real fonts copied out of `node_modules/@fontsource/*`
  so type is faithful. That folder was deleted after each round.

Original brief below, kept as given.

Landing page (`src/app/page.tsx`):

- Redesign for 4.0. Must still match the current design choices.
- It should actually say what Yumma CSS is about. Not just code blocks & plain
  text sections.
- His words: "actual professional 10k worth landing page".
- Current state for reference: a single hero, headline plus one paragraph plus
  two buttons. No sections below it at all.

Logo:

- White, simple, minimal.
- Thinking about circle, square & triangle.
- Open to designing it in Figma.
- He is unsure how he will make it, so this is the least settled part.

## Product ideas

- Colored box-shadows. 3.29 or 4.0?

## Ideas parked for later

- **Interactive palette on `colors.mdx`.** Let readers type a hex & see the 13
  generated shades, simulating `theme.colors` in `yumma.config.mjs`.
- ~~**Playground-style component previews.**~~ **Built & rejected 2026-08-03.**
  Do not park it again; see the section at the top of the file. The build-size
  argument was the only part not answered on the merits, & it was never
  measured.
