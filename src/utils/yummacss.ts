import * as core from "@yummacss/core";

export const categoryGetters = {
  background: core.backgroundUtils,
  border: core.borderUtils,
  boxModel: core.boxModelUtils,
  color: core.colorUtils,
  effect: core.effectUtils,
  flexbox: core.flexboxUtils,
  font: core.fontUtils,
  grid: core.gridUtils,
  interactivity: core.interactivityUtils,
  layout: core.layoutUtils,
  outline: core.outlineUtils,
  positioning: core.positioningUtils,
  text: core.textUtils,
  transform: core.transformUtils,
  transition: core.transitionUtils,
} as const;

export type Category = keyof typeof categoryGetters;

/**
 * What a reference block lists. Omitted means the utility's own classes.
 *
 * Each of these used to be its own component rendering a single card built
 * from a placeholder, which left the reader to guess which prefixes existed.
 * They are all the same table over a different row set.
 */
export type ReferenceVariant =
  | "media"
  | "pseudo-class"
  | "pseudo-element"
  | "negative"
  | "opacity";

export interface ReferenceRow {
  /** The real class, e.g. `@sm:m-4`. */
  className: string;
  /** What it resolves to, one line per CSS declaration. */
  details: string[];
}

export interface ReferenceData {
  /** Everything the block accepts, for the collapsed header. */
  summary: string[];
  rows: ReferenceRow[];
  /** What the rows are, for the count badge: `utilities`, `breakpoints`. */
  noun: string;
}

interface VariantEntry {
  prefix: string;
  value: string;
}

interface Variants {
  pseudoClasses?: VariantEntry[];
  pseudoElements?: VariantEntry[];
  mediaQueries?: VariantEntry[];
  opacity?: VariantEntry[];
}

/**
 * Gets the prefix for a utility based on its category and name.
 */
export function getPrefix(category: Category, name: string): string {
  try {
    const getter = categoryGetters[category];
    if (!getter) return name;

    const utils = getter();
    const util = utils[name];

    return util ? util.prefix : name;
  } catch (err) {
    console.error(`Failed to get prefix for ${category}:${name}`, err);
    return name;
  }
}

/** Every value a utility accepts, straight from `@yummacss/core`. */
export function getValues(category: Category, name: string): string[] {
  try {
    const getter = categoryGetters[category];
    if (!getter) return [];
    const util = getter()[name];
    return util ? Object.keys(util.values) : [];
  } catch (err) {
    console.error(`Failed to get values for ${category}:${name}`, err);
    return [];
  }
}

/**
 * A short summary of everything a block accepts, for the collapsed header.
 *
 * The point is that nothing looks excluded. A header reading `m-4  m-8  m-12`
 * invites the reader to think `m-23` is not a class, when the scale runs to
 * 384. So a numeric run is shown as a span rather than as examples, and a
 * short list is shown in full, because listing five values leaves no doubt.
 */
function summarize(classNames: string[]): string[] {
  if (classNames.length <= 6) return classNames;

  // Only a run varying by a trailing number on a shared stem is a scale, so
  // `m-0 … m-384` folds while `a:m-4  c:m-4` stays a list of sixteen states
  // that all happen to end in a digit.
  const stem = classNames.reduce((acc, c) => {
    let i = 0;
    while (i < acc.length && acc[i] === c[i]) i++;
    return acc.slice(0, i);
  });
  const isScale = (c: string) => /^\d+$/.test(c.slice(stem.length));

  const numeric = classNames.filter(isScale);
  const named = classNames.filter((c) => !isScale(c));
  const out: string[] = [];

  if (numeric.length > 2) {
    out.push(`${numeric[0]} … ${numeric.at(-1)}`);
  } else {
    out.push(...numeric);
  }

  const limit = numeric.length > 2 ? 2 : 3;
  out.push(...named.slice(0, limit));

  // A trailing ellipsis whenever something was left out, so three examples
  // never read as the complete set. The count beside it says how many.
  if (named.length > limit) out.push("…");
  return out;
}

/**
 * One real class off the utility's own scale, to hang variant prefixes on.
 *
 * Spread rather than sequential: `m-4` reads as a value you chose, where `m-0`
 * reads as the only one on offer. Falls back to whatever the utility has.
 */
const PREFERRED = ["4", "8", "12", "16"];

function exampleClass(category: Category, name: string): string {
  const prefix = getPrefix(category, name);
  const values = getValues(category, name);
  // Middle rather than first when the scale misses those, so `opacity` hangs
  // its variants off `o-50` instead of `o-0`, which reads as switched off.
  const value =
    PREFERRED.find((v) => values.includes(v)) ??
    values[Math.floor(values.length / 2)];
  return value === undefined || value === "" ? prefix : `${prefix}-${value}`;
}

/**
 * The rows one reference block renders.
 *
 * Every row is a class that resolves, read from the same definitions the
 * generator uses, so a value or variant added to the framework shows up
 * without anyone editing a page.
 */
export function getReferenceData(
  category: Category,
  name: string,
  variant?: ReferenceVariant,
): ReferenceData | null {
  let util: ReturnType<(typeof categoryGetters)[Category]>[string] | undefined;
  try {
    util = categoryGetters[category]?.()[name];
  } catch (err) {
    console.error(`Failed to get utility ${category}:${name}`, err);
    return null;
  }
  if (!util) return null;

  const { prefix, properties, values, variants } = util as {
    prefix: string;
    properties: readonly string[];
    values: Record<string, string>;
    variants?: Variants;
  };

  const declare = (value: string) => properties.map((p) => `${p}: ${value};`);
  const base = exampleClass(category, name);

  const fromVariants = (
    entries: VariantEntry[] | undefined,
    toClass: (entry: VariantEntry) => string,
    noun: string,
  ): ReferenceData | null => {
    if (!entries || entries.length === 0) return null;
    const rows = entries.map((entry) => ({
      className: toClass(entry),
      details: [entry.value],
    }));
    return { summary: summarize(rows.map((r) => r.className)), rows, noun };
  };

  switch (variant) {
    case "media":
      return fromVariants(
        variants?.mediaQueries,
        (v) => `@${v.prefix}:${base}`,
        "breakpoints",
      );

    case "pseudo-class":
      return fromVariants(
        variants?.pseudoClasses,
        (v) => `${v.prefix}:${base}`,
        "pseudo classes",
      );

    case "pseudo-element":
      return fromVariants(
        variants?.pseudoElements,
        (v) => `${v.prefix}:${base}`,
        "pseudo elements",
      );

    case "opacity":
      return fromVariants(
        variants?.opacity,
        (v) => `${base}/${v.prefix}`,
        "steps",
      );

    case "negative": {
      // `--0` is the same as `-0`, so the scale starts at one.
      const rows = Object.entries(values)
        .filter(([key]) => /^\d+$/.test(key) && Number(key) !== 0)
        .map(([key, value]) => ({
          className: `${prefix}--${key}`,
          details: declare(`-${value}`),
        }));
      if (rows.length === 0) return null;
      return {
        summary: summarize(rows.map((r) => r.className)),
        rows,
        noun: "utilities",
      };
    }

    default: {
      const rows = Object.entries(values).map(([key, value]) => ({
        className: key === "" ? prefix : `${prefix}-${key}`,
        details: declare(value),
      }));
      if (rows.length === 0) return null;
      return {
        summary: summarize(rows.map((r) => r.className)),
        rows,
        noun: "utilities",
      };
    }
  }
}
