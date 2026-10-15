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

## Yumma UI

Renildo's list, 2026-10-14, in order. What makes Yumma UI worth installing,
since it sits next to other component sets wherever it is shared.

- [ ] **A Yumma agent skill**, after transitions.dev's: a skill that
      installs with one command (`npx skills add` and the repo) and is
      listed in skill directories, where people browse for tools without a
      feed. Built from what `/agents.md` already teaches, the syntax, the 4.x
      rules and the migration, plus the Yumma UI `.md` pages as worked
      examples, so an agent writes correct classes from the first prompt.
      Check the layout the `skills` CLI expects before choosing a repo for it.
- [ ] **Button Group focus.** The group clips its buttons (`o:h` in
      `BASE`, so they follow its corners), and a button draws its focus
      outline 3px outside its border (`fv:ow:3 fv:oo:0`), so the group's edge
      cuts it off and the next button covers it. Reproduce in the browser
      first, then pick: an inset outline on a grouped button, or the group
      draws the outline with `fw:` as Number Field and Toolbar do.
- [ ] **Hold to confirm.** An Alert Dialog whose destructive action fills
      while it is pressed and fires only when full; letting go early cancels.
      Reference: https://video.twimg.com/amplify_video/1931666386645889024/vid/avc1/2168x2160/-9FdZ0x4SmXGtYwL.mp4
      It needs a keyboard path (holding Space or Enter), an accessible name
      that says to hold, and a reduced-motion version that still waits. The
      demo stays in one person's files: "Delete 12 files".
- [ ] **Blocks.** Sections composed from the components, installed with
      `yummaui add` like a component, their parts listed in `registryDeps`.
      The first: a heading with inline icons, each icon naming the word
      beside it ("written", "filmed", "recorded", from a partner page's
      hero). Decide the page structure (a Blocks section in the sidebar, one
      page per block) before the second one.
- [ ] **A gallery as yummaui.com's front page.** Every component rendered
      live in a grid, each linking to its page, so the first screen shows
      what Yumma UI looks like rather than how to install it.
- [ ] **Intro videos for both installation pages**, in place of the cover
      image: a short clip built from the cover's own graphics (the rulers,
      the selected word, the cursor), one for Yumma CSS to replace its
      3-year-old intro (https://www.youtube.com/watch?v=iS05_AV22qA) and one
      for Yumma UI for its release. Later, when Yumma UI feels release-ready.
- [ ] **Candidates to choose from**, none started: Toast (a Base UI
      primitive Yumma UI lacks), File Tree (the content model's own world),
      a theme switcher (light, dark, system), a keyboard shortcut hint, and
      a number that counts up to its value.


An agent writing Yumma CSS gets it right first time, and when it does not,
the error tells it the fix. Behind adoption (NOTES.md, "Focus: adoption"):
the measurement is worth running when its number can be published.

- [ ] **Measure it.** A fixed set of prompts ("a centred card", "a sticky
      header"), each answer run through `validateClasses`, scored as the
      share of classes that exist. Run with and without `agents.md` in the
      prompt, so the rules file shows what it is worth.

## Decisions

Blocked on Renildo. Each one holds up the entry beside it.

- **Squircle as the default shape** for every Yumma UI component. Two things
  to weigh first. AGENTS.md makes `rounded` the default wherever a component
  has a shape, and the Soft style is the default style, so both change with
  it. And `corner-shape` works in Chrome and Edge 139 and up only: in Firefox
  and Safari a squircle falls back to `br:xxl`, a plain and much rounder
  corner than today's `br:lg`. A mockup of three components in Chrome and in
  Safari shows what most visitors would get.

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