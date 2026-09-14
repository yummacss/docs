# Changelog

What changed in the **Yumma UI registry**: the components `yummaui add` copies
into your project.

The CLI keeps its own changelog in
[`yummacss/yummui`](https://github.com/yummacss/yummui/blob/main/CHANGELOG.md),
and the framework keeps its own in
[`yummacss/yummacss`](https://github.com/yummacss/yummacss/blob/main/CHANGELOG.md).
Those two are packages you install. The registry is not: `yummaui add` writes a
file into your repo and never touches it again, so **nothing here reaches you
until you copy a component a second time.** That is what this file is for.

Releases are dated rather than numbered. A version number would describe a
package you do not have installed.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [2026-09-14]

Where the registry stands as this file begins: **42 component pages, 39 prop
schemas**. Everything below landed before the first entry and is listed because
a copy taken earlier still has the old prop names.

### Changed

- `iconSide` is `iconPosition` on every component that positions an icon.
- `animate` is `animated` on every component that animates.
- Badge and Meter take `intent` instead of `color`, and five meanings instead
  of nineteen hues: `neutral`, `info`, `success`, `warning`, `danger`. Badge's
  default moved from `indigo` to `neutral`, Meter's from `yellow` to `info`.
- Tooltip has one `tone` covering the popup and the trigger:
  `light | dark | danger`.
- `focusOutline` and `focusClassName` are one `focus`, taking `true`, `false`
  or a class string. It reaches the parts `className` cannot, such as a
  dialog's close, cancel and confirm buttons.
- Every component orders its shared props the same way: style, then state, then
  behavior, then the escape hatches.

### Removed

- **Blocks.** Thirteen of them, and the concept with them. What survived became
  props on the component it was built from.
- **Collapsible.** A single-item Accordion is the same control; the page
  redirects.
- `fullWidth`. `className="w-100%"` does the same thing.
- Field's `multiline`. Textarea is the component for that.

### Fixed

Too many to list one by one, and each one is written up in `NOTES.md` under
Phase 6 with what was measured. The clusters worth knowing about: shadows that
rendered and could not be seen, disabled states that were transparency rather
than a surface, popups that stayed open when their trigger was disabled, and
several props documented as doing nothing that turned out to be demo data.
