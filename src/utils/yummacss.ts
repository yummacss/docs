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
