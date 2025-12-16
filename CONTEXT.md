# Yumma CSS (v3.5.0) Context Guide

## Overview

Yumma CSS is a utility-first CSS framework that uses short, intuitive class names to style HTML elements. This document provides comprehensive context for understanding and using Yumma CSS syntax correctly.

## Core Principles

### 1. Prefix-Based System
Every Yumma CSS utility follows a consistent pattern:
```
[prefix]-[value]
```

For example:
- `m-4` = margin: 1rem (margin with value 4)
- `p-2` = padding: 0.5rem (padding with value 2)
- `bg-blue` = background-color: #3575dd

### 2. Numeric Scale System
Yumma CSS uses a base multiplier system where numbers multiply a base value:
- Base values are typically `0.25` for spacing
- `m-0` = 0rem, `m-1` = 0.25rem, `m-4` = 1rem, `m-8` = 2rem
- Range typically goes from 0 to 100

### 3. Directional Suffixes
For properties that apply to specific sides:
- `t` = top
- `r` = right
- `b` = bottom
- `l` = left
- `x` = horizontal (left and right)
- `y` = vertical (top and bottom)

Examples:
- `mt-4` = margin-top: 1rem
- `px-2` = padding-left and padding-right: 0.5rem
- `my-8` = margin-top and margin-bottom: 2rem

## Layout & Box Model

### Display
- `d-b` = display: block
- `d-f` = display: flex
- `d-g` = display: grid
- `d-i` = display: inline
- `d-ib` = display: inline-block
- `d-if` = display: inline-flex
- `d-none` = display: none

### Width & Height
- `w-[0-100]` = width in rem units (w-4 = 1rem)
- `w-px` = width: 1px
- `h-[0-100]` = height in rem units (h-8 = 2rem)
- `h-px` = height: 1px
- `w-full` = width: 100%
- `w-half` = width: 50%
- `w-auto` = width: auto
- `w-vw` = width: 100vw
- `w-vh` = width: 100vh
- `w-dvw` = width: 100dvw
- `w-dvh` = width: 100dvh
- `h-vw` = height: 100vw
- `h-vh` = height: 100vh
- `h-dvw` = height: 100dvw
- `h-dvh` = height: 100dvh
- `w-sm` = width: 40rem
- `w-md` = width: 48rem
- `w-lg` = width: 64rem
- `w-xl` = width: 80rem
- `w-xxl` = width: 96rem
- `h-sm` = height: 40rem
- `h-md` = height: 48rem
- `h-lg` = height: 64rem
- `h-xl` = height: 80rem
- `h-xxl` = height: 96rem

### Min/Max Width & Height
- `min-w-[0-100]` = min-width
- `max-w-[0-100]` = max-width
- `min-h-[0-100]` = min-height
- `max-h-[0-100]` = max-height

### Dimension (Width + Height)
- `d-[0-100]` = sets both width and height
- `d-px` = width and height: 1px
- `d-full` = 100% width and height
- `d-dvw` = width and height: 100dvw
- `d-sm` = width and height: 40rem
- `d-md` = width and height: 48rem
- `d-lg` = width and height: 64rem
- `d-xl` = width and height: 80rem
- `d-xxl` = width and height: 96rem
- `min-d-[0-100]` = sets both min-width and min-height
- `max-d-[0-100]` = sets both max-width and max-height

### Padding
- `p-[0-100]` = padding on all sides
- `p-px` = padding: 1px
- `pt-[0-100]` = padding-top
- `pr-[0-100]` = padding-right
- `pb-[0-100]` = padding-bottom
- `pl-[0-100]` = padding-left
- `px-[0-100]` = horizontal padding
- `py-[0-100]` = vertical padding
- `pbs-[0-100]` = padding-block-start
- `pbe-[0-100]` = padding-block-end
- `pis-[0-100]` = padding-inline-start
- `pie-[0-100]` = padding-inline-end

### Margin
- `m-[0-100]` = margin on all sides
- `m-px` = margin: 1px
- `mt-[0-100]` = margin-top
- `mr-[0-100]` = margin-right
- `mb-[0-100]` = margin-bottom
- `ml-[0-100]` = margin-left
- `mx-[0-100]` = horizontal margin
- `my-[0-100]` = vertical margin
- `m-auto` = margin: auto
- `mbs-[0-100]` = margin-block-start
- `mbe-[0-100]` = margin-block-end
- `mis-[0-100]` = margin-inline-start
- `mie-[0-100]` = margin-inline-end

### Box Sizing
- `bs-bb` = box-sizing: border-box
- `bs-cb` = box-sizing: content-box

## Flexbox

### Flex Container
- `d-f` = display: flex
- `fd-r` = flex-direction: row
- `fd-c` = flex-direction: column
- `fd-rr` = flex-direction: row-reverse
- `fd-cr` = flex-direction: column-reverse

### Flex Wrap
- `fw-w` = flex-wrap: wrap
- `fw-nw` = flex-wrap: nowrap
- `fw-wr` = flex-wrap: wrap-reverse

### Justify Content
- `jc-c` = justify-content: center
- `jc-fs` = justify-content: flex-start
- `jc-fe` = justify-content: flex-end
- `jc-sb` = justify-content: space-between
- `jc-sa` = justify-content: space-around
- `jc-se` = justify-content: space-evenly

### Align Items
- `ai-c` = align-items: center
- `ai-fs` = align-items: flex-start
- `ai-fe` = align-items: flex-end
- `ai-st` = align-items: stretch
- `ai-b` = align-items: baseline

### Align Content
- `ac-c` = align-content: center
- `ac-fs` = align-content: flex-start
- `ac-fe` = align-content: flex-end
- `ac-sb` = align-content: space-between
- `ac-sa` = align-content: space-around
- `ac-se` = align-content: space-evenly

### Align Self
- `as-auto` = align-self: auto
- `as-c` = align-self: center
- `as-fs` = align-self: flex-start
- `as-fe` = align-self: flex-end
- `as-st` = align-self: stretch

### Flex Properties
- `f-1` = flex: 1 1 0%
- `f-2` = flex: 2 2 0%
- `f-auto` = flex: 1 1 auto
- `f-none` = flex: none
- `fg-[0-8]` = flex-grow
- `fs-[0-8]` = flex-shrink
- `fb-[0-100]` = flex-basis in rem

### Order
- `or-l` = order: -9999 (first)
- `or-[0-10]` = order: 0-10
- `or-f` = order: 9999 (last)

## Grid

### Grid Container
- `d-g` = display: grid
- `gtc-[1-16]` = grid-template-columns (e.g., gtc-3 = 3 columns)
- `gtr-[1-16]` = grid-template-rows (e.g., gtr-4 = 4 rows)

### Gap
- `g-[0-100]` = gap (both row and column)
- `cg-[0-100]` = column-gap
- `rg-[0-100]` = row-gap

### Grid Item Placement
- `gc-s-[1-16]` = grid-column span
- `gr-s-[1-16]` = grid-row span
- `gcs-[1-16]` = grid-column-start
- `gce-[1-16]` = grid-column-end
- `grs-[1-16]` = grid-row-start
- `gre-[1-16]` = grid-row-end

### Grid Auto
- `gaf-r` = grid-auto-flow: row
- `gaf-c` = grid-auto-flow: column
- `gaf-d` = grid-auto-flow: dense
- `gac-auto` = grid-auto-columns: auto
- `gar-auto` = grid-auto-rows: auto

### Place Items
- `pi-c` = place-items: center
- `pi-s` = place-items: start
- `pi-e` = place-items: end
- `pi-st` = place-items: stretch

### Place Content
- `pc-c` = place-content: center
- `pc-s` = place-content: start
- `pc-e` = place-content: end
- `pc-sb` = place-content: space-between

### Place Self
- `ps-auto` = place-self: auto
- `ps-c` = place-self: center
- `ps-s` = place-self: start
- `ps-e` = place-self: end

### Justify/Align Items
- `ji-c` = justify-items: center
- `ji-s` = justify-items: start
- `ji-e` = justify-items: end

### Justify/Align Self
- `js-auto` = justify-self: auto
- `js-c` = justify-self: center
- `js-s` = justify-self: start
- `js-e` = justify-self: end

## Positioning

### Position
- `p-r` = position: relative
- `p-a` = position: absolute
- `p-f` = position: fixed
- `p-st` = position: sticky
- `p-s` = position: static

### Positioning Values (0-16 in rem)
- `t-[0-16]` = top
- `r-[0-16]` = right
- `b-[0-16]` = bottom (note: use `bo-` prefix, e.g., `bo-4`)
- `l-[0-16]` = left
- `i-[0-16]` = inset (all sides)
- `ix-[0-16]` = inset horizontal (left and right)
- `iy-[0-16]` = inset vertical (top and bottom)
- All support `full` (100%) and `half` (50%)

### Z-Index
- `zi-[0,10,20,30,40,50,60,70,80,90]` = z-index values
- `zi-auto` = z-index: auto

### Float & Clear
- `fl-l` = float: left
- `fl-r` = float: right
- `fl-none` = float: none
- `cl-l` = clear: left
- `cl-r` = clear: right
- `cl-b` = clear: both
- `cl-none` = clear: none

### Overflow
- `o-auto` = overflow: auto
- `o-h` = overflow: hidden
- `o-v` = overflow: visible
- `o-s` = overflow: scroll
- `o-c` = overflow: clip
- `o-x-[auto|h|v|s|c]` = overflow-x
- `o-y-[auto|h|v|s|c]` = overflow-y

### Visibility
- `v-v` = visibility: visible
- `v-h` = visibility: hidden
- `v-c` = visibility: collapse

### Object Fit & Position
- `of-c` = object-fit: cover
- `of-f` = object-fit: fill
- `of-none` = object-fit: none
- `of-sd` = object-fit: scale-down
- `op-c` = object-position: center
- `op-t` = object-position: top
- `op-b` = object-position: bottom
- `op-l` = object-position: left
- `op-r` = object-position: right

### Aspect Ratio
- `ar-auto` = aspect-ratio: auto
- `ar-1/1` = aspect-ratio: 1/1
- `ar-16/9` = aspect-ratio: 16/9
- `ar-4/3` = aspect-ratio: 4/3

### Columns
- `c-[1-16]` = columns

### Isolation
- `i-auto` = isolation: auto
- `i-i` = isolation: isolate

## Colors

### Color Palette
Yumma CSS includes 13 color families:
- `red`, `orange`, `yellow`, `green`, `teal`, `cyan`, `blue`, `indigo`, `violet`, `pink`, `slate`, `gray`, `silver`

Each color has 13 shades (1-6 lighter, base, 7-12 darker):
- `red-1` through `red-6` = lighter shades
- `red` = base color
- `red-7` through `red-12` = darker shades

### Special Colors
- `black` = black
- `white` = white
- `transparent` = transparent
- `current` = currentColor

### Color Properties
- `bg-[color]` = background-color
- `tc-[color]` = color (text color)
- `bc-[color]` = border-color
- `bc-t-[color]` = border-top-color
- `bc-r-[color]` = border-right-color
- `bc-b-[color]` = border-bottom-color
- `bc-l-[color]` = border-left-color
- `oc-[color]` = outline-color
- `ac-[color]` = accent-color
- `cc-[color]` = caret-color
- `tdc-[color]` = text-decoration-color
- `f-[color]` = fill (SVG)
- `s-[color]` = stroke (SVG)

### Opacity Variants
All color utilities support opacity variants using the `/` syntax:
- `bg-[color]/[0-95]` = background-color with opacity
- `tc-[color]/[0-95]` = text color with opacity
- `bc-[color]/[0-95]` = border-color with opacity
- And all other color properties...

Opacity values range from 0 to 95 (in steps of 5):
- `/0` = 0% opacity (fully transparent)
- `/5` = 5% opacity
- `/10` = 10% opacity
- ... up to `/95` = 95% opacity

Examples:
- `bg-indigo/5` = indigo background with 5% opacity
- `bg-blue-6/50` = blue-6 shade background with 50% opacity
- `bc-indigo-6/10` = indigo-6 border color with 10% opacity
- `tc-red/25` = red text with 25% opacity

**Note:** Opacity variants work with color shades but cannot yet be combined with pseudo-class variants (h:, f:, a:) or media query variants (sm:, md:, lg:, xl:, xxl:).

Examples:
- `bg-blue` = blue background
- `bg-blue-3` = light blue background
- `tc-red-10` = dark red text
- `bc-gray` = gray border

## Borders

### Border Width (0-8 in px)
- `b-[0-8]` = border-width on all sides
- `bt-[0-8]` = border-top-width
- `br-[0-8]` = border-right-width
- `bb-[0-8]` = border-bottom-width
- `bl-[0-8]` = border-left-width

### Border Style
- `b-s` = border-style: solid
- `b-d` = border-style: dashed
- `b-none` = border-style: none

### Border Radius (0-9 in rem, except rad-9)
- `rad-[0-8]` = border-radius on all corners (in rem × 0.25)
- `rad-9` = border-radius: 9999px (perfect circles/pill shape)
- `rad-full` = border-radius: 100%
- `rad-half` = border-radius: 50%
- `rad-t-[0-8]` = top corners
- `rad-r-[0-8]` = right corners
- `rad-b-[0-8]` = bottom corners
- `rad-l-[0-8]` = left corners
- `rad-tl-[0-8]` = top-left corner
- `rad-tr-[0-8]` = top-right corner
- `rad-br-[0-8]` = bottom-right corner
- `rad-bl-[0-8]` = bottom-left corner

### Border Collapse & Spacing
- `bc-c` = border-collapse: collapse
- `bc-s` = border-collapse: separate
- `bs-[0-8]` = border-spacing

## Typography

### Font Family
- `ff-s` = font-family: system-ui, sans-serif
- `ff-m` = font-family: monospace
- `ff-c` = font-family: Charter (serif)

### Font Size
- `fs-xs` = 0.75rem
- `fs-sm` = 0.875rem
- `fs-md` = 1rem
- `fs-lg` = 1.125rem
- `fs-xl` = 1.25rem
- `fs-xxl` = 1.5rem
- `fs-3xl` = 1.875rem
- `fs-4xl` = 2.25rem
- `fs-5xl` = 3rem
- `fs-6xl` = 3.75rem
- `fs-7xl` = 4.5rem
- `fs-8xl` = 6rem
- `fs-9xl` = 8rem

### Font Weight
- `fw-100` through `fw-900` = font weights

### Font Style
- `fs-n` = font-style: normal
- `fs-i` = font-style: italic

### Text Alignment
- `ta-l` = text-align: left
- `ta-c` = text-align: center
- `ta-r` = text-align: right
- `ta-j` = text-align: justify
- `ta-s` = text-align: start
- `ta-e` = text-align: end

### Text Decoration
- `td-none` = text-decoration: none
- `td-u` = text-decoration: underline
- `tdl-u` = text-decoration-line: underline
- `tdl-o` = text-decoration-line: overline
- `tdl-lt` = text-decoration-line: line-through
- `tds-s` = text-decoration-style: solid
- `tds-d` = text-decoration-style: dashed
- `tds-w` = text-decoration-style: wavy
- `tdt-[0-4]` = text-decoration-thickness (in px)
- `tdt-auto` = text-decoration-thickness: auto

### Text Transform
- `tt-u` = text-transform: uppercase
- `tt-l` = text-transform: lowercase
- `tt-c` = text-transform: capitalize
- `tt-n` = text-transform: none

### Line Height
- `lh-1` = 1
- `lh-2` = 1.25
- `lh-3` = 1.375
- `lh-4` = 1.5
- `lh-5` = 1.625
- `lh-6` = 2

### Letter Spacing
- `ls-0` = 0em
- `ls-1` = -0.05em
- `ls-2` = -0.025em
- `ls-3` = 0.025em
- `ls-4` = 0.05em
- `ls-5` = 0.1em

### Text Wrap & White Space
- `tw-w` = text-wrap: wrap
- `tw-n` = text-wrap: nowrap
- `tw-b` = text-wrap: balance
- `tw-p` = text-wrap: pretty
- `ws-n` = white-space: normal
- `ws-nw` = white-space: nowrap
- `ws-p` = white-space: pre
- `ws-pl` = white-space: pre-line
- `ws-pw` = white-space: pre-wrap

### Text Overflow
- `to-c` = text-overflow: clip
- `to-e` = text-overflow: ellipsis

### Text Indent
- `ti-0` = 0px
- `ti-1` = 1px
- `ti-2` = 0.25rem
- `ti-3` = 0.5rem
- `ti-4` = 0.75rem

### Text Underline Offset
- `tuo-0` = 0px
- `tuo-1` = 1px
- `tuo-2` = 2px
- `tuo-4` = 4px
- `tuo-8` = 8px
- `tuo-auto` = auto

### List Styles
- `lst-d` = list-style-type: disc
- `lst-c` = list-style-type: circle
- `lst-s` = list-style-type: square
- `lsp-i` = list-style-position: inside
- `lsp-o` = list-style-position: outside

### Overflow Wrap
- `ow-n` = overflow-wrap: normal
- `ow-bw` = overflow-wrap: break-word

## Background

### Background Attachment
- `ba-f` = background-attachment: fixed
- `ba-l` = background-attachment: local
- `ba-s` = background-attachment: scroll

### Background Clip
- `bc-bb` = background-clip: border-box
- `bc-pb` = background-clip: padding-box
- `bc-cb` = background-clip: content-box
- `bc-t` = background-clip: text

### Background Origin
- `bo-bb` = background-origin: border-box
- `bo-pb` = background-origin: padding-box
- `bo-cb` = background-origin: content-box

### Background Position
- `bp-c` = background-position: center
- `bp-t` = background-position: top
- `bp-r` = background-position: right
- `bp-b` = background-position: bottom
- `bp-l` = background-position: left
- `bp-lt` = background-position: left top
- `bp-rt` = background-position: right top
- `bp-rb` = background-position: right bottom
- `bp-lb` = background-position: left bottom

### Background Repeat
- `br-r` = background-repeat: repeat
- `br-nr` = background-repeat: no-repeat
- `br-rx` = background-repeat: repeat-x
- `br-ry` = background-repeat: repeat-y
- `br-ro` = background-repeat: round
- `br-s` = background-repeat: space

### Background Size
- `bs-auto` = background-size: auto
- `bs-c` = background-size: cover
- `bs-co` = background-size: contain

## Effects

### Opacity
- `o-0` through `o-100` (in steps of 10)
- Example: `o-50` = opacity: 0.5

### Box Shadow
- `bs-none` = box-shadow: none
- `bs-xs` = extra small shadow
- `bs-sm` = small shadow
- `bs-md` = medium shadow
- `bs-lg` = large shadow
- `bs-xl` = extra large shadow

### Blur
- `f-b-none` = filter: blur(0)
- `f-b-xs` = filter: blur(4px)
- `f-b-sm` = filter: blur(8px)
- `f-b-md` = filter: blur(16px)
- `f-b-lg` = filter: blur(32px)
- `f-b-xl` = filter: blur(64px)

### Backdrop Blur
- `bf-b-none` = backdrop-filter: blur(0)
- `bf-b-xs` = backdrop-filter: blur(4px)
- `bf-b-sm` = backdrop-filter: blur(8px)
- `bf-b-md` = backdrop-filter: blur(16px)
- `bf-b-lg` = backdrop-filter: blur(32px)
- `bf-b-xl` = backdrop-filter: blur(64px)

### Grayscale
- `f-g-0` through `f-g-100` (in steps of 10)
- Example: `f-g-50` = filter: grayscale(50%)

## Transforms

### Rotate
- `t-r-[0-100]` (in steps of 5 degrees)
- Example: `t-r-45` = transform: rotate(45deg)

### Scale
- `t-s-[0-100]` (in steps of 10)
- `t-sx-[0-100]` = scaleX
- `t-sy-[0-100]` = scaleY
- Example: `t-s-50` = transform: scale(50%)

### Skew
- `t-sk-[1,2,3,6,12]` = skew in degrees
- `t-skx-[1,2,3,6,12]` = skewX
- `t-sky-[1,2,3,6,12]` = skewY

### Transform Origin
- `t-o-c` = transform-origin: center
- `t-o-t` = transform-origin: top
- `t-o-tr` = transform-origin: top right
- `t-o-r` = transform-origin: right
- `t-o-br` = transform-origin: bottom right
- `t-o-b` = transform-origin: bottom
- `t-o-bl` = transform-origin: bottom left
- `t-o-l` = transform-origin: left
- `t-o-tl` = transform-origin: top left

## Interactivity

### Cursor
- `c-auto` = cursor: auto
- `c-d` = cursor: default
- `c-p` = cursor: pointer
- `c-w` = cursor: wait
- `c-t` = cursor: text
- `c-m` = cursor: move
- `c-na` = cursor: not-allowed
- `c-none` = cursor: none
- `c-h` = cursor: help
- `c-pr` = cursor: progress
- `c-zi` = cursor: zoom-in
- `c-zo` = cursor: zoom-out

### Pointer Events
- `pe-auto` = pointer-events: auto
- `pe-none` = pointer-events: none

### User Select
- `us-auto` = user-select: auto
- `us-none` = user-select: none
- `us-t` = user-select: text
- `us-a` = user-select: all

### Resize
- `r-none` = resize: none
- `r-v` = resize: vertical
- `r-h` = resize: horizontal
- `r-b` = resize: both

### Appearance
- `a-auto` = appearance: auto
- `a-none` = appearance: none

### Scroll Behavior
- `sb-auto` = scroll-behavior: auto
- `sb-s` = scroll-behavior: smooth

### Scroll Snap Type
- `sst-none` = scroll-snap-type: none
- `sst-x-m` = scroll-snap-type: x mandatory
- `sst-y-m` = scroll-snap-type: y mandatory
- `sst-x-p` = scroll-snap-type: x proximity
- `sst-y-p` = scroll-snap-type: y proximity
- `sst-b-m` = scroll-snap-type: both mandatory

### Scroll Snap Align
- `ssa-s` = scroll-snap-align: start
- `ssa-c` = scroll-snap-align: center
- `ssa-e` = scroll-snap-align: end
- `ssa-none` = scroll-snap-align: none

### Scroll Snap Stop
- `sss-n` = scroll-snap-stop: normal
- `sss-a` = scroll-snap-stop: always

### Scroll Margin (0-100)
- `sm-[0-100]` = scroll-margin
- `smt-[0-100]` = scroll-margin-top
- `smr-[0-100]` = scroll-margin-right
- `smb-[0-100]` = scroll-margin-bottom
- `sml-[0-100]` = scroll-margin-left
- `smx-[0-100]` = scroll-margin horizontal
- `smy-[0-100]` = scroll-margin vertical

### Scroll Padding (0-100)
- `sp-[0-100]` = scroll-padding
- `spt-[0-100]` = scroll-padding-top
- `spr-[0-100]` = scroll-padding-right
- `spb-[0-100]` = scroll-padding-bottom
- `spl-[0-100]` = scroll-padding-left
- `spx-[0-100]` = scroll-padding horizontal
- `spy-[0-100]` = scroll-padding vertical

### Field Sizing
- `fs-f` = field-sizing: fixed
- `fs-c` = field-sizing: content

## Outline

### Outline Width (0-4 in px)
- `ow-[0-4]` = outline-width

### Outline Style
- `os-none` = outline-style: none
- `os-s` = outline-style: solid
- `os-d` = outline-style: dashed

### Outline Offset (0-4 in px)
- `oo-[0-4]` = outline-offset

## SVG

### Stroke Width
- `sw-0` = stroke-width: 0
- `sw-2` = stroke-width: 0.2
- `sw-4` = stroke-width: 0.4
- `sw-6` = stroke-width: 0.6
- `sw-8` = stroke-width: 0.8
- `sw-1` = stroke-width: 1

## Table

### Caption Side
- `cs-t` = caption-side: top
- `cs-b` = caption-side: bottom

### Table Layout
- `tl-a` = table-layout: auto
- `tl-f` = table-layout: fixed

## Responsive Design

### Media Query Breakpoints
Yumma CSS uses prefix-based responsive utilities:

- `sm:` = @media (width >= 40rem) - 640px
- `md:` = @media (width >= 48rem) - 768px
- `lg:` = @media (width >= 64rem) - 1024px
- `xl:` = @media (width >= 80rem) - 1280px
- `xxl:` = @media (width >= 96rem) - 1536px

**Usage:**
```html
<!-- Hidden by default, visible on medium screens and up -->
<div class="d-none md:d-b">Content</div>

<!-- Full width on mobile, half width on large screens -->
<div class="w-full lg:w-half">Content</div>

<!-- Different padding at different breakpoints -->
<div class="p-2 md:p-4 lg:p-8">Content</div>
```

## Pseudo-Class Variants

Yumma CSS supports pseudo-class variants with prefixes:

- `h:` = :hover
- `f:` = :focus
- `a:` = :active

These variants can be used with any utility class.

**Hover Usage:**
```html
<!-- Background changes on hover -->
<button class="bg-blue h:bg-blue-8">Hover me</button>

<!-- Scale increases on hover -->
<div class="t-s-100 h:t-s-110">Hover to scale</div>
```

**Focus Usage:**
```html
<!-- Text color changes on focus -->
<input class="tc-gray f:tc-blue">

<!-- Button with focus ring -->
<button class="bg-indigo f:oc-indigo-5 f:oo-2 f:os-s f:ow-2 h:bg-indigo-7 px-4 py-2 rad-1 tc-white">Focus me!</button>
```

**Active Usage:**
```html
<!-- Background changes when pressed -->
<button class="bg-indigo h:bg-indigo-7 a:bg-indigo-9 px-4 py-2 rad-1 tc-white">Press me!</button>
```

## Common Patterns

### Centering Content
```html
<!-- Flexbox center -->
<div class="d-f jc-c ai-c">Centered</div>

<!-- Grid center -->
<div class="d-g pi-c">Centered</div>

<!-- Margin auto -->
<div class="mx-auto">Centered horizontally</div>
```

### Card Component
```html
<div class="bg-white rad-2 bs-md p-6">
  <h2 class="fs-xl fw-700 mb-2">Card Title</h2>
  <p class="tc-gray">Card content</p>
</div>
```

### Responsive Grid Layout
```html
<div class="d-g gtc-1 md:gtc-2 lg:gtc-3 g-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Button Styles
```html
<!-- Primary button -->
<button class="bg-blue tc-white px-4 py-2 rad-1 h:bg-blue-8">
  Click me
</button>

<!-- Outline button -->
<button class="bg-transparent bc-blue-2 b-s tc-blue px-4 py-2 rad-1 h:bg-blue-1">
  Outline
</button>
```

### Container with Max Width
```html
<div class="max-w-lg mx-auto px-4">
  <p>Centered container with max width</p>
</div>
```

### Sticky Header
```html
<header class="p-st t-0 bg-white bs-sm zi-50">
  <nav class="max-w-xl mx-auto px-4">Navigation</nav>
</header>
```

### Overlay
```html
<div class="p-f i-0 bg-black o-50 zi-40"></div>
```

### Image with Aspect Ratio
```html
<img src="image.jpg" class="w-full ar-16/9 of-c">
```

### Truncate Text
```html
<p class="to-e o-h ws-nw">
  This text will be truncated with ellipsis if too long
</p>
```

### Gradient Background (using multiple classes)
```html
<!-- Note: Gradients require custom CSS, but you can layer semi-transparent colors -->
<div class="p-r bg-blue">
  <div class="p-a i-0 bg-blue-8 o-50"></div>
  <div class="p-r">Content</div>
</div>
```

### Modal Dialog
```html
<div class="p-f i-0 d-f jc-c ai-c bg-black o-50 zi-50">
  <div class="bg-white rad-2 p-8 max-w-md w-full">
    <h2 class="fs-xl fw-700 mb-4">Modal Title</h2>
    <p class="mb-6">Modal content</p>
    <button class="bg-blue tc-white px-4 py-2 rad-1">Close</button>
  </div>
</div>
```

## Important Distinctions

### Prefix Conflicts
Some prefixes are used for multiple properties. Context matters:

- `b-` can mean border-width (e.g., `b-2`) OR border-style (e.g., `b-s`)
- `o-` can mean opacity (e.g., `o-50`) OR overflow (e.g., `o-h`)
- `t-` can mean top position (e.g., `t-4`) OR transform (e.g., `t-r-45`)
- `p-` can mean padding (e.g., `p-4`) OR position (e.g., `p-a`)
- `m-` can mean margin (e.g., `m-4`)
- `f-` can mean flex (e.g., `f-1`) OR filter (e.g., `f-b-sm`) OR fill (e.g., `f-blue`)
- `s-` can mean stroke color (e.g., `s-blue`)

**Rule of thumb:** 
- If it ends with a number, it's usually a size/spacing value
- If it ends with a letter abbreviation, it's usually a keyword value
- Color properties always include the color name

### Common Mistakes to Avoid

1. **Wrong prefix for border-bottom position:**
   - ❌ `b-4` for bottom: 1rem
   - ✅ `bo-4` for bottom: 1rem
   - (Note: `b-4` is border-width: 4px)

2. **Confusing text color prefix:**
   - ❌ `c-blue` (this is cursor, not color)
   - ✅ `tc-blue` (text color)

3. **Wrong gap syntax:**
   - ❌ `gap-4`
   - ✅ `g-4`

4. **Wrong justify-content values:**
   - ❌ `jc-center`
   - ✅ `jc-c`

5. **Wrong flex-direction syntax:**
   - ❌ `flex-col`
   - ✅ `fd-c`

6. **Forgetting the color name:**
   - ❌ `bg-500` 
   - ✅ `bg-blue-5`

7. **Wrong responsive prefix:**
   - ❌ `md-d-f` or `@md:d-f`
   - ✅ `md:d-f`

8. **Wrong hover syntax:**
   - ❌ `hover:bg-blue` or `hover-bg-blue`
   - ✅ `h:bg-blue`

## Value Ranges Quick Reference

| Property             | Range   | Unit                | Example             |
| -------------------- | ------- | ------------------- | ------------------- |
| Padding/Margin       | 0-100   | rem (×0.25)         | `p-4` = 1rem        |
| Width/Height         | 0-100   | rem (×0.25)         | `w-20` = 5rem       |
| Border Width         | 0-8     | px                  | `b-2` = 2px         |
| Border Radius        | 0-8     | rem (×0.25)         | `rad-4` = 1rem      |
| Gap                  | 0-100   | rem (×0.25)         | `g-6` = 1.5rem      |
| Flex Grow/Shrink     | 0-8     | unitless            | `fg-2` = 2          |
| Grid Columns/Rows    | 1-16    | fr units            | `gtc-3` = 3 columns |
| Z-Index              | 0-90    | unitless (step 10)  | `zi-50` = 50        |
| Opacity              | 0-100   | decimal (step 10)   | `o-50` = 0.5        |
| Rotate               | 0-100   | degrees (step 5)    | `t-r-45` = 45deg    |
| Scale                | 0-100   | percent (step 10)   | `t-s-80` = 80%      |
| Positioning          | 0-16    | rem (×0.25)         | `t-8` = 2rem        |
| Outline Width/Offset | 0-4     | px                  | `ow-2` = 2px        |
| Font Weight          | 100-900 | unitless (step 100) | `fw-600` = 600      |

## Best Practices

### 1. Use Semantic HTML
Yumma CSS works best with proper HTML structure:
```html
<article class="max-w-lg mx-auto">
  <header class="mb-6">
    <h1 class="fs-3xl fw-700">Article Title</h1>
  </header>
  <section class="tc-gray-9 lh-4">
    <p class="mb-4">Content...</p>
  </section>
</article>
```

### 2. Compose Utilities
Build complex components by combining simple utilities:
```html
<button class="
  d-if ai-c g-2
  bg-blue tc-white
  px-4 py-2 rad-1
  fs-sm fw-500
  h:bg-blue-8
  f:oc-blue f:oo-2
  a:t-s-95
">
  <svg class="w-4 h-4">...</svg>
  <span>Button Text</span>
</button>
```

### 3. Use Responsive Design Mobile-First
Start with mobile styles, then add responsive variants:
```html
<div class="
  w-full p-4
  md:w-half md:p-6
  lg:w-4 lg:p-8
">
  Content
</div>
```

### 4. Leverage Pseudo-Class Variants
Add interactivity with pseudo-class prefixes:
```html
<a href="#" class="
  tc-blue td-none
  h:tc-blue-8 h:td-u
  f:oc-blue f:oo-2
">
  Interactive Link
</a>
```

### 5. Create Consistent Spacing
Use a consistent spacing scale throughout your design:
```html
<!-- Use multiples of 4 for consistency -->
<section class="p-4 mb-8">
  <h2 class="mb-4">Title</h2>
  <p class="mb-4">Paragraph</p>
  <div class="d-f g-4">...</div>
</section>
```

### 6. Combine with Custom CSS
For complex designs, combine Yumma CSS with custom CSS:
```html
<div class="custom-gradient p-8 rad-2">
  <h2 class="fs-xxl fw-700 tc-white">Title</h2>
</div>

<style>
.custom-gradient {
  background: linear-gradient(135deg, #3575dd 0%, #7d53dd 100%);
}
</style>
```

## Quick Reference Tables

### Spacing Scale (multiply by 0.25rem)
| Class  | Value   | rem  | px  |
| ------ | ------- | ---- | --- |
| `p-0`  | 0       | 0    | 0   |
| `p-1`  | 0.25rem | 0.25 | 4   |
| `p-2`  | 0.5rem  | 0.5  | 8   |
| `p-4`  | 1rem    | 1    | 16  |
| `p-6`  | 1.5rem  | 1.5  | 24  |
| `p-8`  | 2rem    | 2    | 32  |
| `p-12` | 3rem    | 3    | 48  |
| `p-16` | 4rem    | 4    | 64  |
| `p-24` | 6rem    | 6    | 96  |
| `p-32` | 8rem    | 8    | 128 |

### Font Size Scale
| Class    | rem   | px  |
| -------- | ----- | --- |
| `fs-xs`  | 0.75  | 12  |
| `fs-sm`  | 0.875 | 14  |
| `fs-md`  | 1     | 16  |
| `fs-lg`  | 1.125 | 18  |
| `fs-xl`  | 1.25  | 20  |
| `fs-xxl` | 1.5   | 24  |
| `fs-3xl` | 1.875 | 30  |
| `fs-4xl` | 2.25  | 36  |
| `fs-5xl` | 3     | 48  |
| `fs-6xl` | 3.75  | 60  |
| `fs-7xl` | 4.5   | 72  |
| `fs-8xl` | 6     | 96  |
| `fs-9xl` | 8     | 128 |

## Summary

Yumma CSS is a utility-first framework that prioritizes:
- **Short, memorable class names** using intuitive prefixes
- **Consistent naming conventions** across all utilities
- **Responsive design** with breakpoint prefixes (sm:, md:, lg:, xl:, xxl:)
- **Interactive states** with pseudo-class prefixes (h:, f:, a:)
- **Flexible composition** to build complex designs from simple utilities

The key to mastering Yumma CSS is understanding its prefix system and value ranges. Once you know the pattern, you can predict class names without consulting documentation.