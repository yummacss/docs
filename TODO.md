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

    Closed  192
    Open    4
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

Empty.

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
- [ ] **Dark theme across every component.** Yumma CSS has handled dark since
      3.29.0, so this is a Yumma UI concern now. Not a `1.0`: see NOTES.md
      under Versioning. Mockups need a theme toggle from the start.
- [ ] **A lint plugin for oxlint and biome**, CSS 4.2 and UI 0.4.0. Replaces
      `canon`'s own CLI and report, and adds the rules a build cannot carry:
      `p-8` on a `Button` should be the `size` prop, `style={{ display: "flex" }}`
      should be `d-f`. See NOTES.md under Linting. Rename the package with it.

- [ ] **`play` learns 4.2**: `theme.states`, `theme.keyframes`, `theme.fonts`,
      CSS function values, container queries and `@st:`. After its redesign,
      which NOTES.md lists. **On hold:** [Trellis UI](https://trellisui.com/)
      as a reference for that redesign, found by Renildo on 2026-09-28. Not
      reviewed yet.

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
