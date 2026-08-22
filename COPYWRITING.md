# Copywriting

How the Yumma CSS site is written. Every rule below was derived by reading the
pages that already exist and counting what they do, so most of this describes
the site as it stands. Where the corpus contradicts itself, the rule picks a
side and says which pages have to change.

Applies to `src/content/docs`, `src/content/ui` and `src/content/blog`, plus
frontmatter, component copy and error strings. The mechanical rules are
enforced by `tests/copywriting.test.ts`, so this file is checked rather than
remembered.

## Two Bans

### The em dash

Never use `—`. There is no replacement character: the dash is a symptom, and
the sentence around it is the thing to fix. A parenthetical dash almost always
marks a sentence carrying two ideas, so give the second one its own sentence.

```diff
- Components are copied into your project rather than installed as a
- dependency — once a component is in your codebase, it is yours to edit.
+ Components are copied into your project rather than installed as a
+ dependency. Once a component is in your codebase, it is yours to edit.
```

When the dashed clause names a set, a colon does the work the dash was
pretending to do:

```diff
- Reports any class Yumma CSS does not recognize — typos, borrowed Tailwind
- classes, utilities renamed between versions.
+ Reports any class Yumma CSS does not recognize: typos, borrowed Tailwind
+ classes, utilities renamed between versions.
```

The en dash `–` survives in one place only, a numeric range, where it is
typography rather than punctuation: `` `1–6` `` in `colors.mdx`. Do not use it
between words.

A spaced hyphen is the same ban wearing a disguise. `works anywhere PostCSS
runs - not just Next.js` is an em dash typed on a keyboard that lacks one.

### "It is not X, it is Y"

Never sell a fact by first denying its opposite. The construction has a family
of shapes, and all of them are banned:

```
It is not a framework, it is a compiler.
This is not sugar. It is the whole API.
Not a rewrite, but a rename.
```

**This ban is narrow, and it is easy to over-apply.** A negation that corrects
something a reader would otherwise assume is not the slogan, it is the most
useful sentence on the page. Ten of these are in the docs today and every one
of them stays:

```
The binary is named `yummacss-canon`, not `canon`.
Each prefix is resolved by what it is, not by where it sits in the chain.
Container queries ship in 4.0, not a later minor.
```

The test: **would a reader plausibly believe the negated half?**

- Yes, so it is a correction. Keep it. Someone really would type `canon`.
- No, so it is a slogan. Cut it. Nobody thought Yumma CSS was a framework
  until the sentence raised the idea in order to knock it down.

When a slogan does turn up, the fix is to delete the negative half and keep
the positive one. The positive half was always the sentence.

```diff
- Yumma UI is not a dependency, it is source code you own.
+ `yummaui add` copies a real file into your project, and nothing overwrites
+ it later.
```

## Voice

### Write the rule, then the code, then the exception

The house structure, taken from `naming-convention.mdx`, which is the best
page on the site:

> A class is the initials of the CSS property, a dash, then the initials of the
> value.
>
> ```css
> display: flex;                   /* d-f   */
> justify-content: space-between;  /* jc-sb */
> ```
>
> Every class resolves to exactly one property.

State the rule flat. Let the code carry the example. Never narrate a code block
in the paragraph above it, because a reader who can read the class name does
not need the sentence, and a reader who cannot is not helped by a paraphrase.

Then give the exception, with its reason attached:

> `none` and `auto` are never abbreviated. Every other value shortens to its
> initials, but these two keep their full spelling in every utility that accepts
> them. Reserving both words stops them colliding with the initials of other
> values under a shared prefix.

The last sentence is the pattern to copy. An exception without its reason reads
as an inconsistency, and a reason given with "because" or "so" turns the same
sentence into a design decision.

### Short sentences, and no throat-clearing

Hand-written prose on the site runs to a median of 14 words, with 84% of
sentences under 25. That is the target, not a limit. The pages that read best
open on the fact:

```
Variants stack.
Every color utility applies in both color schemes by default.
Every class resolves to exactly one property.
```

Cut the run-up. "It is worth noting that", "you may want to", "in order to" and
"simply" contribute nothing. The corpus is already close to clean here: one
`simply`, one `just`, one `powerful` across 183 pages. Keep it that way.

### Say what a thing costs

The site is unusually willing to name a limit, and that is the most valuable
thing about its voice. Keep doing it.

```
It is not the right choice for a real application: the generation happens on
every load rather than once at build time.

Both class names generate their own rule, so mixing them across a project
ships the same declaration twice.
```

Hedging is different from honesty. "This may or may not win" is precise,
because which utility wins genuinely depends on rule order. "This might not
always work in some cases" is a hedge, and it means nothing.

### Second person, and no first person

`you` and `your` appear 80 times across the docs and UI pages. `we`, `our` and
`I` appear zero times. Address the reader and describe the software. The
software is not a person and has no intentions:

```diff
- We recommend reaching for the props table first.
+ Reach for the table before anything else.
```

The blog is the exception. It is the team speaking about work they did, so
`we` is correct there and used 8 times.

## Mechanics

### `&` and "and"

The site uses both, on a rule that the pages follow without ever having stated
it. `&` joins short parallel items. "and" joins clauses, or joins items long
enough that a lone `&` gets lost between them.

The clearest worked example, one sentence from `naming-convention.mdx` using
both correctly:

> Two utilities predate the rule & still abbreviate: `tt-n` for
> `text-transform: none`, and `tl-a` for `table-layout: auto`. Both become
> `tt-none` & `tl-auto` in 4.0.

`&` between the two short class names. "and" between the two long
`prefix for declaration` pairs.

Two hard exceptions:

- Never open a YAML scalar with `&`. It is an anchor, and the frontmatter will
  not parse.
- Never use `&` in a sentence that also shows a CSS nesting selector. On this
  site `&` is a character with a meaning, and the collision is not worth the
  four saved characters.

### No contractions

`cannot` (14 uses), `does not`, `is not`, `it is`. There are six contractions
left in the docs and all six are drift.

`cannot` is one word. `can not` appears nowhere and should stay that way.

### US spelling

`behavior`, `color`, `normalize`, `recognize`. `color` is not a preference,
it is the CSS property, and letting `behaviour` in behind it makes the page
look translated.

### Headings are Title Case

`Hover State`, `Negative Values`, `Single Sides`, `Logical Properties`,
`Order Does Not Matter`. This holds across every hand-written heading on the
site.

One exception: a heading that is a code identifier keeps the identifier's own
casing. `## @yummacss/vite` and `## yummacss` are correct, because the package
is named that.

### Frontmatter

Every page has a `title` and a `description`. The description is one sentence,
opens with an imperative verb and ends with a period. 129 of the 145 docs pages
open with `Set`:

```yaml
description: Set the display box type of an element.
description: Show a placeholder while content loads.
description: "Expand & collapse content sections vertically."
```

Quote the value only when YAML needs it. Keep it under about 100 characters,
because it is the meta description and the search result.

### Code in prose

Backtick every class, prefix, property, value, file name, package name and flag,
on every mention. `d-f`, `h:`, `yumma.config.mjs`, `@yummacss/core`, `--all`.
An unbackticked `d-f` in a paragraph reads as a typo.

Write class names as the utility writes them. `bg-blue-5`, not `bg blue 5`.

## Before Publishing

`pnpm test` runs `tests/copywriting.test.ts`, which fails on em dashes, spaced
hyphens, contractions, UK spellings, sentence-case headings and missing or
unpunctuated descriptions. The rules it cannot check:

1. **Read every negation.** Apply the "would a reader believe it?" test to each
   one. Corrections stay, slogans go.
2. **Read the sentence above each code block.** If it says what the code says,
   delete it.
3. **Check the claim against the code.** Every doc bug found so far came from
   prose that was true when written and never re-read: `DialogBackdrop` and
   `DialogContent` were documented and do not exist, `bs-none` is not a class,
   and three utility pages still document a Negative Values section for a
   utility with no numeric value to negate. Open the source. The framework is
   in this monorepo and there is no excuse for guessing.

## Where This Comes From

Renildo's reference points are Tailwind, Next.js and Radix. Nothing in this
file was copied from them, and no claim above describes how they write, because
the network in this environment cannot reach them to check. Every rule here was
measured against `src/content` instead, which is the better source anyway: it is
the voice this site already has on its best pages, written down so the worst
pages can be brought up to it.
