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

/** Reference block row set; omitted means the utility's own classes. */
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

/** One token in a collapsed reference header (classes vs punctuation). */
export interface SummaryToken {
  /** Stable across renders. Separators repeat, so the text alone will not do. */
  id: string;
  text: string;
  punctuation?: boolean;
}

export interface ReferenceData {
  /** Everything the block accepts, for the collapsed header. */
  summary: SummaryToken[];
  rows: ReferenceRow[];
  /** What the rows are, for the count badge: `utilities`, `media queries`. */
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

const SUMMARY_BUDGET = 56;

/** Trim summary to one line by character width, not count. */
function oneLine(parts: string[]): string[] {
  const out: string[] = [];
  let width = 0;

  for (const part of parts) {
    if (out.length > 0 && width + part.length + 2 > SUMMARY_BUDGET) {
      out.push("…");
      break;
    }
    out.push(part);
    width += part.length + 2;
  }

  return out;
}

/** Collapsed header summary: scales fold to spans; short lists stay explicit. */
function summarize(classNames: string[]): string[] {
  if (classNames.length <= 6) return oneLine(classNames);

  // Only trailing-digit runs on a shared stem count as scales.
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

  // Ellipsis when named values were truncated.
  if (named.length > limit) out.push("…");
  return oneLine(out);
}

const SEPARATOR = ", ";
const ELISION = " … ";

/** Split summary strings into class tokens and dimmed punctuation. */
function tokenize(parts: string[]): SummaryToken[] {
  const out: SummaryToken[] = [];
  const push = (text: string, punctuation?: boolean) =>
    out.push({ id: `${out.length}:${text}`, text, punctuation });

  parts.forEach((part, index) => {
    if (index > 0) push(SEPARATOR, true);

    if (part === "…") {
      push(part, true);
      return;
    }

    const [from, to] = part.split(ELISION);
    if (to === undefined) {
      push(part);
      return;
    }

    push(from as string);
    push(ELISION, true);
    push(to);
  });

  return out;
}

const PREFERRED = ["4", "8", "12", "16"];

function exampleClass(category: Category, name: string): string {
  const prefix = getPrefix(category, name);
  const values = getValues(category, name);
  // Middle of scale when preferred values are missing (e.g. opacity).
  const value =
    PREFERRED.find((v) => values.includes(v)) ??
    values[Math.floor(values.length / 2)];
  return value === undefined || value === "" ? prefix : `${prefix}-${value}`;
}

/** Rows for one reference block, from `@yummacss/core` definitions. */
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
    return {
      summary: tokenize(summarize(rows.map((r) => r.className))),
      rows,
      noun,
    };
  };

  switch (variant) {
    case "media":
      return fromVariants(
        variants?.mediaQueries,
        (v) => `@${v.prefix}:${base}`,
        // Not "breakpoints": `@pc` is pointer coarse, not a width.
        "media queries",
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
        // `::` for pseudo-elements; generator checks `::` before `:`.
        (v) => `${v.prefix}::${base}`,
        "pseudo elements",
      );

    case "opacity":
      return fromVariants(
        variants?.opacity,
        (v) => `${base}/${v.prefix}`,
        "steps",
      );

    case "negative": {
      // Negative scale skips `0` (`--0` equals `-0`).
      const rows = Object.entries(values)
        .filter(([key]) => /^\d+$/.test(key) && Number(key) !== 0)
        .map(([key, value]) => ({
          className: `${prefix}--${key}`,
          details: declare(`-${value}`),
        }));
      if (rows.length === 0) return null;
      return {
        summary: tokenize(summarize(rows.map((r) => r.className))),
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
        summary: tokenize(summarize(rows.map((r) => r.className))),
        rows,
        noun: "utilities",
      };
    }
  }
}
