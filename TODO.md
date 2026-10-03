# Yumma UI and Yumma CSS: the list

One list, ordered by what blocks what. Phase 1 is what stops a release; Phase
6 is what happens after v4. Inside a phase, order is the order to do them in.

**Verify every entry against the code before acting on it.** Most are right
about the symptom and wrong about the cause, and several have turned out to
be already fixed.

When an entry is done it leaves this file and the finding goes in NOTES.md,
so the open count alone would flatter the progress. `Closed` is the number of
`- [x]` findings under **Phase 6** in NOTES.md, which is the record of the
work actually finished; `Open` is the `- [ ]` count here. Recount both rather
than adjusting the numbers by hand:

    grep -c '^- \[ \]' TODO.md

    Closed  207
    Open    8
    Done    96%

---

## Phase 1 - Broken

Renildo's pass over the site, 2026-09-18. Reproduce each before acting on it.

Empty.


## Phase 2 - Content model

Empty.


## Phase 3 - API changes

Empty.


## Phase 4 - Wants mockups

Design decisions. Nothing here starts without them.

- [ ] **Redesign the search dialog**, desktop and phone. Renildo, 2026-10-02.
      Today it is `src/components/ui/search-dialog.tsx`, one dialog at every
      width; mock both sizes before touching it.
- [ ] **A real mobile sidebar.** Renildo, 2026-10-02: the menu looks basic.
      Start from Yumma UI's own Drawer (`src/registry/ui/drawer.tsx`) and
      Base UI's drawer examples, and design one for the docs. Today it is
      `mobile-dialog.tsx` and `mobile-dialog-nav.tsx`.

## Phase 5 - Infrastructure

Nothing here blocks a release, and all of it makes the next change cheaper.

Empty.


## Phase 6 - After v4

- [ ] **Cascade layers for the reset**, 4.2. The reset's `:is(...):focus` rule
      is (0,1,1) and beats every (0,1,0) outline utility, measured in Chromium,
      so `oc:*` does nothing on a focused button. Two layers fix it. Decide
      separately whether the utilities split into shorthand and longhand. See
      NOTES.md under Cascade layers. **On hold:** Renildo wants to learn more
      about layers before adding them, 2026-09-28.

## AI track

The main line of work from 2026-10-03: an agent writing Yumma CSS gets it
right first time, and when it does not, the error tells it the fix. Yumma UI
is parked meanwhile; see NOTES.md under "Yumma UI parked, AI first".

- [ ] **Ship the lint rules**, 4.3. `no-unknown-classes` and
      `no-inline-styles` for Oxlint and `yummacss lint` are in review as
      `yummacss#64`. Closes when 4.3 is out and `/docs/lint` describes them;
      `lint.mdx` still documents `pnpm dlx @yummacss/lint` and `yummacss-lint`.
- [ ] **`/llms.txt` teaches 3.x.** Its header explains `jc-sb` and points at
      `pnpm dlx @yummacss/lint` (`src/app/llms.txt/route.ts`). The first file
      an agent reads states the colon syntax, the variant prefixes and the
      check command, and a test fails when it shows a dash class again.
- [ ] **A rules file to drop into a project**: the syntax, the scale, the
      colour ramp and "run the linter", short enough for an agent's context.
      One source, served by the site and linked from `llms.txt`.
- [ ] **Measure it.** A fixed set of prompts ("a centred card", "a sticky
      header"), each answer run through `validateClasses`, scored as the
      share of classes that exist. Run before and after each entry above.
- [ ] **Yumma UI as the worked examples.** The `/ui/components/<id>.md` twins
      already carry each component's source in 4.x classes. Point `llms.txt`
      and the rules file at a handful that show classes combining.

## Decisions

Blocked on Renildo. Each one holds up the entry beside it.

Empty.

## Known and accepted

Not bugs. Written down so they stop being rediscovered.

- Focus is treatment A and sits below WCAG 2.1 1.4.11. It was 1.21:1 for the
  outline and 1.80:1 for the border on indigo. The slate pair is 1.6:1 for
  the outline and 3.6:1 for the border, so a bordered control passes and
  a slider thumb or a switch does not. Deferred deliberately: no users, and a
  CSS change is reversible.
- Number Field and Toolbar outline the input, not the group around it, so the
  steppers sit outside it. Chosen knowingly: `fv:` everywhere is worth more
  than an outline that wraps the whole control, which only `fw:` can draw.
