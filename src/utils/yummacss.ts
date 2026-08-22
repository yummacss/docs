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
 * Gets the prefix for a utility based on its category and name.
 */
export function getPrefix(category: Category, name: string): string {
  try {
    const getter = categoryGetters[category];
    if (!getter) return name;
    const util = getter()[name];
    return util ? util.prefix : name;
  } catch (err) {
    console.error(`Failed to get prefix for ${category}:${name}`, err);
    return name;
  }
}

/**
 * Every value a utility accepts, straight from `@yummacss/core`.
 *
 * The reference table reads these directly, so a value added to the framework
 * shows up in the docs without anyone editing a page.
 */
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

export interface VariantEntry {
  prefix: string;
  value: string;
}

export interface Variants {
  pseudoClasses?: VariantEntry[];
  pseudoElements?: VariantEntry[];
  mediaQueries?: VariantEntry[];
  opacity?: VariantEntry[];
}

/**
 * The variants a utility accepts, straight from its definition.
 *
 * The docs used to hardcode four breakpoints & one pseudo-class, so `xl:`,
 * `pc:`, the other fifteen pseudo-classes & all four pseudo-elements went
 * undocumented. Reading the definition means a variant added to the framework
 * shows up here without anyone remembering to add it.
 */
export function getVariants(category: Category, name: string): Variants {
  try {
    const getter = categoryGetters[category];
    if (!getter) return {};
    const util = getter()[name];
    return (util?.variants ?? {}) as Variants satisfies Variants;
  } catch (err) {
    console.error(`Failed to get variants for ${category}:${name}`, err);
    return {};
  }
}

export interface Scale {
  /** Lowest & highest keys in the run, e.g. 0 and 384. */
  min: number;
  max: number;
  /** What one step is worth, e.g. `.25rem`. */
  step: string;
  /** The unit every value in the run carries, e.g. `rem`. */
  unit: string;
  /** The multiplier one step is worth, e.g. 0.25. */
  factor: number;
}

export interface ValueShape {
  /** A contiguous, linear numeric run. Stated as a rule, never enumerated. */
  scale: Scale | null;
  /** Numeric keys that do not form such a run: opacity, z-index. */
  sparse: string[];
  /** Everything else: `auto`, `px`, `f`, `red-1`. Nobody can guess these. */
  named: string[];
}

const NUMBER = /^-?[\d.]+/;

function split(value: string): { n: number; unit: string } | null {
  const match = NUMBER.exec(value.trim());
  if (!match) return null;
  return { n: Number(match[0]), unit: value.trim().slice(match[0].length) };
}

/**
 * Sorts a utility's values into the three kinds that want different treatment.
 *
 * A scale like `margin` is 385 rows of a multiplication table: `m-23` is
 * 23 × .25rem, and rendering all of it says less than stating the rule does,
 * because nobody scrolls 385 rows. Stating it also answers the question the
 * rows leave open, which is whether `m-23` exists at all.
 *
 * The run has to be both contiguous & linear to qualify. `opacity` steps by
 * ten & `z-index` by tens, so neither collapses to a rule and both stay
 * enumerated.
 */
export function describeValues(category: Category, name: string): ValueShape {
  const values = getValues(category, name);
  const empty: ValueShape = { scale: null, sparse: [], named: [] };
  if (values.length === 0) return empty;

  const getter = categoryGetters[category];
  const util = getter?.()[name];
  if (!util) return empty;

  const numeric = values
    .filter((v) => /^\d+$/.test(v))
    .sort((a, b) => Number(a) - Number(b));
  const named = values.filter((v) => !/^\d+$/.test(v));

  // Too few to be a scale worth collapsing; listing them is clearer.
  if (numeric.length <= 8) return { scale: null, sparse: numeric, named };

  const nums = numeric.map(Number);
  const contiguous = nums.every(
    (v, i) => i === 0 || v === (nums[i - 1] ?? 0) + 1,
  );
  if (!contiguous) return { scale: null, sparse: numeric, named };

  const one = split(util.values["1"] ?? "");
  if (!one || one.n === 0) return { scale: null, sparse: numeric, named };

  // Linear, or the rule would lie about the values in between.
  const linear = numeric.every((key) => {
    const parsed = split(util.values[key] ?? "");
    if (!parsed) return Number(key) === 0;
    if (parsed.unit !== one.unit && Number(key) !== 0) return false;
    return Math.abs(parsed.n - Number(key) * one.n) < 1e-6;
  });
  if (!linear) return { scale: null, sparse: numeric, named };

  return {
    scale: {
      min: nums[0] as number,
      max: nums.at(-1) as number,
      step: util.values["1"] as string,
      unit: one.unit,
      factor: one.n,
    },
    sparse: [],
    named,
  };
}

/**
 * Resolves any point on a scale, so a reader can check a value the page never
 * had to print. `m-23` is the whole reason the scale is a rule.
 */
export function resolveScale(scale: Scale, n: number): string | null {
  if (!Number.isInteger(n) || n < scale.min || n > scale.max) return null;
  const value = Number((n * scale.factor).toFixed(6));
  return `${value}${scale.unit}`;
}

/**
 * A short summary of everything a utility accepts, for a collapsed header.
 *
 * The point is that nothing looks excluded. A header reading `m-4  m-8  m-12`
 * invites the reader to think `m-23` is not a class, when the scale runs to
 * 384. So a numeric run is shown as a span rather than as examples, and a
 * short list is shown in full, because listing five values leaves no doubt.
 *
 * Long named sets (`color` has 251) fall back to the first few. The utility
 * count sits next to this in the header & the full list is one click away, so
 * the summary never has to carry all of it.
 */
export function summarizeClasses(category: Category, name: string): string[] {
  const values = getValues(category, name);
  if (values.length === 0) return [];

  const prefix = getPrefix(category, name);
  const cls = (v: string) => (v === "" ? prefix : `${prefix}-${v}`);

  // Short enough to state completely.
  if (values.length <= 6) return values.map(cls);

  const numeric = values.filter((v) => /^\d+$/.test(v));
  const named = values.filter((v) => !/^\d+$/.test(v));
  const out: string[] = [];

  if (numeric.length > 2) {
    out.push(`${cls(numeric[0] as string)} … ${cls(numeric.at(-1) as string)}`);
  } else {
    out.push(...numeric.map(cls));
  }

  // Named values alongside a scale are usually a handful (`auto`, `px`), and
  // worth naming because nobody would guess them from the range.
  const limit = numeric.length > 2 ? 2 : 3;
  out.push(...named.slice(0, limit).map(cls));

  // A trailing ellipsis whenever something was left out, so three examples
  // never read as the complete set. The count beside it says how many.
  if (named.length > limit) out.push("…");
  return out;
}
