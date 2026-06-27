# Yumma CSS Messaging Guideline

Internal source of truth for how Yumma CSS is described everywhere: site, README,
npm, GitHub About, social bios, and posts. If a sentence about Yumma contradicts this
file, the sentence is wrong. Read this before writing any public copy.

## Who Yumma is for

- **For:** developers who already think in CSS properties and want a utility workflow
  without learning a new vocabulary.
- **Not for:** beginners learning CSS for the first time. Say this out loud. Owning a
  narrow audience makes the product defensible and stops the "beginners are hurt by
  cryptic names" criticism. Beginners should learn CSS first, then Yumma is trivial.

## The one message (lead with this everywhere)

> **If you know CSS, you already know Yumma.**

Supporting line:

> Yumma class names are derived from CSS property names by one rule. There is no
> invented vocabulary to memorize: just CSS, compressed.

## The pitch: derivation, not abbreviation

This is the single most important correction. Yumma is **not** "shorter spellings to
type less." It is a **derivation rule**, so a CSS-fluent developer can write any class
without a lookup table.

The rule:

- **Prefix** = initials of the words in the CSS **property**.
- **Suffix** = initials of the words in the CSS **value**.

Verified examples:

| CSS | Yumma |
| --- | --- |
| `display: flex` | `d-f` |
| `align-items: center` | `ai-c` |
| `justify-content: space-between` | `jc-sb` |
| `flex-direction: column` | `fd-c` |
| `margin-top: 1rem` | `mt-4` |
| `max-width: 72rem` | `max-w-288` |

Why this framing wins: Tailwind invents its own dialect (`items-center`,
`justify-between`, `shrink-0`, `flex-col`) that you must learn and that does not map to
CSS. Yumma adds zero vocabulary. That is the entire differentiator. Lead with it.

## The three pillars

1. **No new vocabulary.** Class names are mechanically derived from CSS you know.
2. **CSS-native.** You stay in the CSS mental model: property names, property values.
3. **Predictable by design.** A curated numeric scale (0 to 384 on a 0.25rem base) with
   no arbitrary-value escape hatches. Design systems stay consistent and hard to break,
   the opposite of arbitrary `[37px]`-style values that drift over time.

## Positioning vs alternatives

- **vs Tailwind:** "No vocabulary to memorize. If you know CSS, you can derive every
  Yumma class. You cannot say that about Tailwind." Do not call Yumma "Tailwind
  aliases" or "Tailwind but shorter."
- **vs vanilla CSS:** "The same property names you know, plus a utility workflow:
  responsive and state variants, build-time purging, and no naming-things problem."

## Vocabulary

**Use:** derive / derived, CSS-native, no new vocabulary, predictable, design system,
property names, utility, for people who think in CSS.

**Ban (these caused the bad feedback):**

- "abbreviated" / "abbreviations" as the headline idea
- "type less" / "less typing" / "faster typing"
- "simplified" / "easier CSS" / "CSS made easy"
- "Tailwind aliases" / "Tailwind but shorter"
- "ergonomic" as the *whole* message (fine as flavor, never the core claim)

The reason: every banned phrase sells typing speed or beginner-friendliness, the two
angles that lose the argument and attract dunks. Sell derivation and predictability.

## Approved copy (copy/paste)

**npm description / GitHub About (short):**

> Utility CSS with no new vocabulary. Class names are derived from CSS property names,
> so if you know CSS, you already know Yumma.

**Social bio (one line):**

> Utility CSS with no vocabulary to memorize. If you know CSS, you already know Yumma.

**Landing hero:**

> # If you know CSS, you already know Yumma.
> Class names derived from CSS property names by one rule. No invented vocabulary, no
> lookup tables: just CSS, compressed.

## Before and after (fix your current copy)

**Bio.** Before: "An ergonomic CSS framework."
After: "A utility CSS framework with no vocabulary to memorize."

**Bio.** Before: "Yumma CSS is an ergonomic CSS framework with abbreviated utility
classes. Write d-f instead of flex, fw-600 instead of font-semibold. Faster styling,
less typing."
After: "Yumma CSS is a utility framework whose class names are derived from CSS itself.
`d-f` is `display: flex`, `jc-sb` is `justify-content: space-between`: initials of the
property, initials of the value. If you know CSS, you can write Yumma without
memorizing a dictionary."

**Landing.** Before: "Type less. Style more." / "The ergonomic CSS framework with
abbreviated utility classes. d not display, fw not font-weight, g not gap."
After: "If you know CSS, you already know Yumma." / "Class names derived from CSS
property names by one rule. No invented vocabulary, no lookup tables: just CSS,
compressed."

Why the old landing copy is wrong: "Type less. Style more." and "d not display" frame
Yumma as shorter spellings, which directly invites "then why not just write CSS, or use
Tailwind?" It also advertises typing speed, the weakest and most-mocked claim. The
strength is derivability and a predictable design system, never character count.

## Consistency checklist

Before publishing copy anywhere, confirm:

- [ ] Leads with derivation ("derived from CSS"), not abbreviation.
- [ ] Contains no banned word from the Vocabulary section.
- [ ] States or implies the audience (people who know CSS).
- [ ] Does not sell typing speed as the primary benefit.
- [ ] Matches the one message: "If you know CSS, you already know Yumma."
