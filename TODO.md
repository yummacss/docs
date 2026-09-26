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

    Closed  141
    Open    23
    Done    86%

---

## Phase 1 - Broken

Renildo's pass over the site, 2026-09-18. Reproduce each before acting on it.

Empty.


## Phase 2 - Content model

Empty.


## Phase 3 - API changes

- [ ] **Fifteen more controls have no font size.** A sweep of every preview for
      buttons at the browser's 13.33px found, beyond the dialogs: Accordion,
      Combobox, Command Palette, Empty State, Menu, Number Field, Onboarding,
      Popover, Rating, Select, Tabs, Toggle, Toggle Group, Toolbar and Tooltip.
      The icon-only ones do not show it; the text ones do. Yumma's normalize
      inherits the whole font once `fix/controls-inherit-font` ships, which
      covers them, but a text control should name its size like Button does.
- [ ] **Meter's `animated` describes an animation Base UI's meter does not
      have.** Remove the prop.
- [ ] **Preview Card has no arrow** and Base UI supports one. Add it, on by
      default.
- [ ] **No way to turn a component's icons off.** There is no `icon` boolean on
      Menu, Menubar, Context Menu or the others that draw one.
- [ ] **Onboarding: drop the close button.** Esc dismisses, which is the
      default, with a prop to opt out of it. Under `shape="square"` the icon
      containers stay rounded and should not.
- [ ] **Does Badge have `focus`?** It declares the prop. Verify what it reaches:
      the badge itself is not focusable, but its close button renders a Base UI
      `Button`, so the prop may be right for the wrong reason.

## Phase 4 - Wants mockups

Design decisions. Nothing here starts without them.

- [ ] Replace the stage's tab bar with the **browser window** treatment,
      redrawn in Yumma CSS's own colours. **3 mockups.** Not urgent.
- [ ] **A small radius becomes the default shape**, in place of `square`.
      Renildo's call, 2026-09-18. Touches every component and the `shape`
      vocabulary in AGENTS.md, where `rounded` is already defined per control,
      so decide whether this changes the default or the definition.
- [ ] **Try other icon packs**, Phosphor and Solar among them, nothing
      overrated. Mockups first: the bar is that they look consistent across the
      whole site.
- [ ] **The icon is too big**, reported by Mayranne, who does not think it is
      deliberate.

## Phase 5 - Infrastructure

Nothing here blocks a release, and all of it makes the next change cheaper.

The Component API rail, from Renildo's pass on 2026-09-18.

- [ ] **A disabled prop explains itself in red.** Say why it is inert in a
      tooltip, or another Base UI part that fits, rather than an error colour on
      something that is not an error. `isInert` in `src/utils/props.ts` already
      returns the reason string.
- [ ] **A number control with no example and no default shows `0`.** The
      Stepper falls back to `prop.default ?? 0` for its display while the
      component receives `undefined`, so the control states a value the
      component is not using, and `0` is below the `min` of 1 it declares.
      `number-field`'s `min` and `max` and `rating`'s `value` are the three.
- [ ] **Remove the Reset button** from the rail.
- [ ] **Say that the component is theirs.** The rail shows the API; it should
      also say that they own the file and can change anything in it.
- [ ] **A long prop name pushes its control onto the next line.** Keep the name
      and its control inline at every width.
- [ ] **Search does not know about flags, config keys or component props.**
      Mayranne typed `--all` into the dialog and got nothing. `SEARCH_DATA` in
      `src/utils/search-data.ts` carries doc titles, component titles, the CSS
      properties `extractProperties` finds in page content, and the colour
      shades. It does not carry CLI commands and flags, `yumma.config.mjs` keys,
      or the 430 prop names in `src/registry/meta/*.json`, which is the one
      index that already exists and is not used. Someone looking up a prop or a
      flag is the likeliest search there is.


## Phase 6 - After v4

- [ ] **Cascade layers for the reset**, 4.2. The reset's `:is(...):focus` rule
      is (0,1,1) and beats every (0,1,0) outline utility, measured in Chromium,
      so `oc:*` does nothing on a focused button. Two layers fix it. Decide
      separately whether the utilities split into shorthand and longhand. See
      NOTES.md under Cascade layers.
- [ ] **Coloured box-shadow utilities**, 4.2. Renildo's call, 2026-09-16: it
      does not gate v4. Without them a halo-plus-outline focus treatment cannot
      be written at all.
- [ ] **Attribute variants**, 4.2 at the earliest, and not for `data-*`.
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
- [ ] **A lint plugin for oxlint and biome**, CSS 4.2 and UI 0.4.0. Replaces
      `canon`'s own CLI and report, and adds the rules a build cannot carry:
      `p-8` on a `Button` should be the `size` prop, `style={{ display: "flex" }}`
      should be `d-f`. See NOTES.md under Linting. Rename the package with it.

## Decisions

Blocked on Renildo. Each one holds up the entry beside it.

- [ ] **Alphabetical order in the Component API rail?** Renildo asked, and it
      fights the rule in AGENTS.md: a component's own props come first, then the
      shared ones in `SHARED_PROP_ORDER`, which puts `variant` above `shape`
      above `className` on purpose. Alphabetical is easier to scan and loses
      that grouping. One or the other, not both.
- [ ] **A destructive action's icon should be red.** Context Menu, Command
      Palette and anywhere else a delete sits in a list. Decide whether the icon
      takes the tone or the whole row does.


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
