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

    Closed  213
    Open    6
    Done    97%

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

Performance, Renildo, 2026-10-03. In this order: measure, then decide the
content pipeline, then decide the framework. Each decision rests on numbers
from "The site, measured" in NOTES.md.

- [ ] **Decide the content pipeline.** Today content-collections reads the
      frontmatter (schemas, computed fields such as the covers) and `@next/mdx`
      compiles the bodies. Weigh Next's MDX alone against what
      content-collections gives: the zod schemas, the search index, the `.md`
      twins and `llms.txt`. Measured 2026-10-04: none of it reaches the
      browser, so this is a build-time question, not a page-weight one.
- [ ] **Spike TanStack Start.** Vite-based, with MDX support. On a branch, one
      docs page and one component page, compared on build time, bundle and
      hydration against the numbers above. What a move costs: the routes,
      `next/og` covers, `next/image`, the Vercel setup and the redirects.
      Measured 2026-10-04: the weight was one misplaced `"use client"`, which
      a framework move would have carried along.


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

- [ ] **Measure it.** A fixed set of prompts ("a centred card", "a sticky
      header"), each answer run through `validateClasses`, scored as the
      share of classes that exist. Run with and without `agents.md` in the
      prompt, so the rules file shows what it is worth.

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