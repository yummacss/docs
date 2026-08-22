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

    const utils = getter();
    const util = utils[name];

    return util ? util.prefix : name;
  } catch (err) {
    console.error(`Failed to get prefix for ${category}:${name}`, err);
    return name;
  }
}

/**
 * Every value a utility accepts, straight from `@yummacss/core`.
 *
 * `getPrefix` above already loads the whole definition and throws this away,
 * which is why the variant components could only print `(value)` placeholders.
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

/** What a single value compiles to, e.g. `4` -> `1rem`. */
export function getValue(
  category: Category,
  name: string,
  key: string,
): string | undefined {
  try {
    const getter = categoryGetters[category];
    return getter?.()[name]?.values[key];
  } catch (err) {
    console.error(`Failed to get value for ${category}:${name}`, err);
    return undefined;
  }
}

/** The CSS properties a utility sets, e.g. `["margin"]`. */
export function getProperties(
  category: Category,
  name: string,
): readonly string[] {
  try {
    const getter = categoryGetters[category];
    return getter?.()[name]?.properties ?? [];
  } catch (err) {
    console.error(`Failed to get properties for ${category}:${name}`, err);
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
 * The pages hardcoded four breakpoints & one pseudo-class, so `@xl`, `@pc`,
 * the other fifteen pseudo-classes & all four pseudo-elements went
 * undocumented. Reading the definition means a variant added to the framework
 * shows up without anyone remembering to add it.
 */
export function getVariants(category: Category, name: string): Variants {
  try {
    const getter = categoryGetters[category];
    if (!getter) return {};
    const util = getter()[name];
    return (util?.variants ?? {}) as Variants;
  } catch (err) {
    console.error(`Failed to get variants for ${category}:${name}`, err);
    return {};
  }
}

/**
 * Numeric scales run to 400-odd entries, so a sample stands in for the whole
 * scale. These are spread rather than sequential: four cards reading `m-4`,
 * `m-8`, `m-12`, `m-16` show that the value is yours to choose, which four
 * cards reading `m-0`, `m-1`, `m-2`, `m-3` do not.
 */
const PREFERRED = ["4", "8", "12", "16", "24", "32"];

/**
 * A few real values for a utility, for documentation that can be copied.
 *
 * Enumerated utilities have few enough values to take from the front:
 * `align-items` has five, and `ai-b` is as good an example as any. Numeric
 * scales get the spread above, falling back to whatever the utility has when
 * it does not carry those keys.
 */
export function sampleValues(
  category: Category,
  name: string,
  count: number,
): string[] {
  const values = getValues(category, name);
  if (values.length === 0) return [];

  const preferred = PREFERRED.filter((v) => values.includes(v));
  const pool =
    preferred.length >= count ? preferred : [...preferred, ...values];

  return [...new Set(pool)].slice(0, count);
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
