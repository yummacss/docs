<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Writing

Short. These were said out loud enough times to belong in a file.

- **PR bodies**: link every component you name to its page, with the link on
  the bold heading itself. While a branch is open the link is that branch's
  Vercel preview, so the page shows what the PR changed rather than what is
  already live:
  `https://docs-git-<branch>-rrenildopereiraas-projects.vercel.app/ui/components/<id>`,
  where `<branch>` is the branch name with `/` as `-`. Vercel reports it as
  `branchAlias` on any deployment of the branch, and it follows the latest
  push, unlike the per-deployment hash URL. Same for anything else on the docs
  site the PR touches. Once a branch is merged its alias dies, so a link to
  shipped work is `https://www.yummacss.com/...` again.
- The same link rule applies in chat, not only in PR bodies.
- **PR bodies**: one short block per topic, each under its own bold heading,
  then the checks line (`tsc`, test count, biome, `next build`). A sentence or
  two per topic saying **what changed**, and nothing else. No cause, no
  history, no justification: a reader outside the project does not care why a
  thing was renamed from A to B. The why goes in NOTES.md.
- **Commit messages**: a subject and a couple of lines. No essays.
- **Code comments**: one or two lines. A comment earns its length only where
  the code is genuinely surprising, and never by repeating the same paragraph
  in a dozen files - put it in NOTES.md once and point at it.
- **No attribution footers** in commits or PRs. `.claude/settings.json` clears
  them; do not add them by hand either.
- No em dashes.
- Never name another framework to explain a Yumma decision, and do not borrow
  its vocabulary either. Focus draws an **outline**, never a ring: Yumma has
  `os-`, `ow-`, `oo-` and `oc-`, so a box-shadow word for it describes a
  workaround the library does not need.

# Content model

What the examples are *about*, which is a separate question from how the copy
is written.

- One world: a person looking after their own files and settings. Files,
  folders, documents, search, themes, shortcuts, formatting.
- No organisations. No teams, members, roles, invitations, plans, billing,
  invoices, subscriptions, sprints or boards. A component demo that needs a
  second person to make sense is the wrong demo.
- People appear only where the component is about a person: Avatar, Avatar
  Stack, Preview Card. One person, not a cast, and nowhere else.
- Icons name the thing they sit beside. An icon chosen for decoration is a
  content decision, not a visual one, and belongs to this list.
- `tests/content-model.test.ts` holds the mechanical half.

# Shape

- `square` is no radius, `squircle` is `br-xxl cs-s`, and `rounded` is the
  natural round for that control: `br-sm` on a checkbox, `br-lg` on a panel,
  `br-9999` on a switch or a track, which is already a capsule at that height.
- `pill` appears only where a smaller `rounded` also makes sense, so a
  component offering both keeps them different. Never add `pill` as a synonym.
- Shape is not a style axis where it is the affordance. A radio is round
  because round means *one of these* and square means *any of these*, so it
  has no `shape` prop at all. Ask that question before adding one.
- `tests/registry.test.ts` holds the mechanical half.

# Prop order

- A component's own props come first, in whatever order reads best for that
  component. The props every component shares follow, in one fixed sequence:
  style, then state, then behavior, then the escape hatches. `shape` sits
  between `size` and `shadow` on all 32 components that have it.
- The sequence lives in `SHARED_PROP_ORDER` in `src/utils/props.ts`, the only
  place to change it. `node scripts/order-props.mjs` re-sorts every schema to
  match, and `tests/registry.test.ts` fails when one drifts.

# Carried styles

- `shape`, `size`, `shadow`, `animated` and `focus` follow you from one
  component page to the next, so trying a shape across the library is one
  click per page. `src/utils/sticky.ts` owns the list.
- `variant`, `tone` and `intent` are deliberately not carried: they share a
  name across components and nothing else.
- A value is carried only if the next component declares that prop and names
  that value. `shape` alone has six vocabularies, so `pill` reaches Button and
  never reaches Checkbox.
- The address wins over what was carried, so a link someone was sent renders
  what it says. Carrying writes into the URL on arrival rather than changing
  what a parser defaults to, which would make a clean address lie.

# Accent

- The accent recolours the **preview** and nothing anyone installs. It works by
  redefining the classes the components name, inside the preview frame only, so
  the Code tab stays byte-identical when it changes.
- `src/utils/accent.ts` holds the one table that drives both the CSS and the
  guard. A component that names a new `slate-11` or `slate-12` class fails
  `tests/accent.test.ts` until the table covers it.
- `c-slate-12` is a label on white, not a control, so it is never part of it.
- It lives in `localStorage`, never the URL: an address states what the
  component is, and the accent changes nothing about it.

# Page chrome

- Every page opens with `SkipLink` and has one `<main id="main">`, so the first
  Tab skips the navbar and the sidebar.
- No `title` attributes for tooltips. `HintTooltip` wraps the control and the
  accessible name stays on its `aria-label`. An `<iframe title>` is that
  frame's accessible name, not a tooltip, and stays.
- Bounded scrolling goes through `Scroller`, which is Base UI's Scroll Area
  with the site's own scrollbar. Two traps it works around: the scroll area's
  root sets `position: relative` inline, which beats a `p-st` class, so the
  positioning lives on a wrapper; and every box down to the viewport needs
  `f-1 min-h-0`, because a viewport on `h-100%` under a `max-height` parent
  grows to its content and never scrolls.
- The scrollbar fades on `data-hovering` and `data-scrolling`, written out in
  `globals.css` next to the popup animations, since Yumma has no attribute
  variants until v4.

# Working

- PRs, never direct commits to `main`. One PR per phase, on a branch named
  `feat/`, `fix/` or `chore/` plus a word or two of plain English. No hashes,
  no generated suffixes, nothing long.
- Every branch starts at `main` and every PR targets `main`. Never stack one on
  another: a stacked PR merged after its base has already gone up the chain
  lands on a dead branch and never reaches `main`, and it reports itself
  merged. Wait for `main` instead.
- A maintained dependency beats code we would own, even when ours is smaller.
  Weigh a package by what it costs to maintain, not by what it weighs.
- Base UI primitives over raw HTML. A `<button>`, `<input>`, `<fieldset>` or
  anything else with a primitive uses it; where a primitive has to render a
  different element, that is its `render` prop, not a raw tag. Raw tags are for
  what Base UI has no part for: layout, text, lists.
- Update NOTES.md in the same commit as the change. It is the source of truth;
  TODO.md is the list, one phase per blocking level, ordered within a phase.
- A closed entry leaves TODO.md and its finding goes in NOTES.md under the
  phase it belongs to. Then recount TODO.md's header block: closed is the
  `- [x]` count under NOTES.md's Phase 6, open is `- [ ]` in TODO.md. Report
  that percentage with every PR.
- Verify a TODO or NOTES entry against the code before acting on it. Most
  entries are right about the symptom and wrong about the cause.
- A generated file opens with a comment naming the script that writes it.
  The script writes that comment, so it survives a regeneration; never edit
  the file or strip the comment by hand.
