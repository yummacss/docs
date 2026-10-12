# Yumma UI and Yumma CSS: the list

One list, ordered by what blocks what. Phase 1 is what stops a release; Phase
6 is what happens after v4. Inside a phase, order is the order to do them in.

**Verify every entry against the code before acting on it.** Most are right
about the symptom and wrong about the cause, and several have turned out to
be already fixed.

When an entry is done it leaves this file.

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

Empty.

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