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

    Closed  134
    Open     5
    Done    96%

---

## Phase 1 - Broken

Empty.


## Phase 2 - Content model

Empty.


## Phase 3 - API changes

Empty.

## Phase 4 - Wants mockups

Design decisions. Nothing here starts without them.

- [ ] Replace the stage's tab bar with the **browser window** treatment,
      redrawn in Yumma CSS's own colours. **3 mockups.** Not urgent.

## Phase 5 - Infrastructure

Nothing here blocks a release, and all of it makes the next change cheaper.


## Phase 6 - After v4

- [ ] **Coloured box-shadow utilities**, 4.1. Renildo's call, 2026-09-16: it
      does not gate v4. Without them a halo-plus-outline focus treatment cannot
      be written at all.
- [ ] **Attribute variants**, 4.1 at the earliest, and not for `data-*`.
      Renildo's call, 2026-09-16: `data-starting-style` and `data-ending-style`
      are Base UI's vocabulary, not vanilla CSS, so Yumma CSS will not grow
      variants for them. What is left to decide is whether standard attributes
      (`[open]`, `[hidden]`, `aria-expanded`, `aria-selected`) are worth a
      variant at all. The registry's 185 lines of popup CSS stay hand-written
      and become a Yumma UI concern. See NOTES.md under Attribute variants.
      Renildo, 2026-09-16: rarely used, not worth the work.
- [ ] **Dark theme across every component.** Yumma CSS has handled dark since
      3.29.0, so this is a Yumma UI concern now. Not a `1.0`: see NOTES.md
      under Versioning. Mockups need a theme toggle from the start.
- [ ] **A lint plugin for oxlint and biome**, CSS 4.1 and UI 0.4.0. Replaces
      `canon`'s own CLI and report, and adds the rules a build cannot carry:
      `p-8` on a `Button` should be the `size` prop, `style={{ display: "flex" }}`
      should be `d-f`. See NOTES.md under Linting. Rename the package with it.

## Decisions

Blocked on Renildo. Each one holds up the entry beside it.


## Known and accepted

Not bugs. Written down so they stop being rediscovered.

- Focus is treatment A and sits below WCAG 2.1 1.4.11. It was 1.21:1 for the
  outline and 1.80:1 for the border on indigo, and the silver pair that
  replaced it is no better. Deferred deliberately: no users, and a CSS change
  is reversible. A darker outline, `slate-4` or lower, would pass.
- Nothing in the playground survives a reload, by design, until the URL entry
  in Phase 5 lands.
- Number Field and Toolbar outline the input, not the group around it, so the
  steppers sit outside it. Chosen knowingly: `fv:` everywhere is worth more
  than an outline that wraps the whole control, which only `fw:` can draw.
- The focus outline's transition needs `outline-color` in `tp-c`, which landed in
  the yummacss repo. It reaches the docs on the next Yumma CSS release.
