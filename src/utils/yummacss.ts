import * as core from "@yummacss/core";

export const categoryGetters = {
  animation: core.animationUtils,
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

export type ReferenceVariant =
  | "media"
  | "pseudo-class"
  | "pseudo-element"
  | "negative"
  | "opacity";

export interface ReferenceRow {
  className: string;
  details: string[];
}

export interface SummaryToken {
  id: string;
  text: string;
  punctuation?: boolean;
}

export interface ReferenceData {
  summary: SummaryToken[];
  rows: ReferenceRow[];
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

function summarize(classNames: string[]): string[] {
  if (classNames.length <= 6) return oneLine(classNames);

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

  if (named.length > limit) out.push("…");
  return oneLine(out);
}

const SEPARATOR = ", ";
const ELISION = " … ";

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
  const value =
    PREFERRED.find((v) => values.includes(v)) ??
    values[Math.floor(values.length / 2)];
  return value === undefined || value === "" ? prefix : `${prefix}:${value}`;
}

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
      const rows = Object.entries(values)
        .filter(([key]) => /^\d+$/.test(key) && Number(key) !== 0)
        .map(([key, value]) => ({
          className: `${prefix}:-${key}`,
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
        className: key === "" ? prefix : `${prefix}:${key}`,
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

export type CompactRow =
  | { kind: "row"; className: string; details: string[] }
  | { kind: "gap"; text: string };

const RUN = 12;
const HEAD = 5;

const suffixOf = (className: string, prefix: string) =>
  className === prefix ? "" : className.slice(prefix.length + 1);

function keyNumber(key: string): { n: number; unit: string } | null {
  const m = key.match(/^(\d+(?:\.\d+)?)(%?)$/);
  return m ? { n: Number(m[1]), unit: m[2] } : null;
}

function measure(detail: string): { n: number; unit: string } | null {
  const m = detail.match(/(-?\d*\.?\d+)(rem|px|ms|s|deg|%)\b/);
  return m ? { n: Number(m[1]), unit: m[2] } : null;
}

const formatStep = ({ n, unit }: { n: number; unit: string }) =>
  `${String(Number(n.toFixed(4))).replace(/^0\./, ".")}${unit}`;

/** Shades of one base collapse into a note: red-1 … red-12 sit behind red. */
function collapseShades(rows: ReferenceRow[], prefix: string) {
  const suffixes = new Set(rows.map((r) => suffixOf(r.className, prefix)));
  const shade = (s: string) => {
    const m = s.match(/^([a-z]+)-(\d+)$/);
    return m && suffixes.has(m[1]) ? { base: m[1], n: Number(m[2]) } : null;
  };
  const shaded = rows.filter((r) => shade(suffixOf(r.className, prefix)));
  const bases = new Set(
    shaded.map((r) => shade(suffixOf(r.className, prefix))?.base),
  );
  if (bases.size < 3) return null;

  const first = [...bases][0] as string;
  const steps = shaded
    .map((r) => shade(suffixOf(r.className, prefix)))
    .filter((s) => s?.base === first)
    .map((s) => s?.n as number);
  const out: CompactRow[] = [];
  for (const row of rows) {
    if (shade(suffixOf(row.className, prefix))) continue;
    out.push({ kind: "row", ...row });
    if (suffixOf(row.className, prefix) === first) {
      out.push({
        kind: "gap",
        text: `… ${prefix}:${first}-${Math.min(...steps)} to ${prefix}:${first}-${Math.max(...steps)}, & the same for every color …`,
      });
    }
  }
  return out;
}

/** A long even run keeps its first rows & its last; a gap row says what was left out. */
function collapseRuns(rows: ReferenceRow[], prefix: string): CompactRow[] {
  const out: CompactRow[] = [];
  let i = 0;
  while (i < rows.length) {
    const start = keyNumber(suffixOf(rows[i].className, prefix));
    let j = i + 1;
    if (start) {
      const next = keyNumber(suffixOf(rows[j]?.className ?? "", prefix));
      const diff = next && next.unit === start.unit ? next.n - start.n : 0;
      if (diff > 0) {
        while (j < rows.length) {
          const a = keyNumber(suffixOf(rows[j - 1].className, prefix));
          const b = keyNumber(suffixOf(rows[j].className, prefix));
          if (!a || !b || b.unit !== start.unit || b.n - a.n !== diff) break;
          j++;
        }
      }
    }

    const run = rows.slice(i, j);
    if (run.length >= RUN) {
      const [a, b] = [
        measure(run[0].details[0] ?? ""),
        measure(run[1].details[0] ?? ""),
      ];
      const step =
        a && b && a.unit === b.unit
          ? `one step per ${formatStep({ n: b.n - a.n, unit: a.unit })}`
          : b && /^0\b/.test((run[0].details[0] ?? "").split(": ")[1] ?? "")
            ? `one step per ${formatStep(b)}`
            : `${run.length - HEAD - 1} more`;
      out.push(
        ...run.slice(0, HEAD).map((r) => ({ kind: "row" as const, ...r })),
      );
      out.push({ kind: "gap", text: `… ${step} …` });
      out.push({ kind: "row", ...(run.at(-1) as ReferenceRow) });
    } else {
      out.push(...run.map((r) => ({ kind: "row" as const, ...r })));
    }
    i = j;
  }
  return out;
}

/** The rows a page shows: every class the scale has, written once. The `.md` twin keeps them all. */
export function compactRows(category: Category, name: string): CompactRow[] {
  const data = getReferenceData(category, name);
  if (!data) return [];
  const prefix = getPrefix(category, name);
  return collapseShades(data.rows, prefix) ?? collapseRuns(data.rows, prefix);
}

export interface VariantGroup {
  title: string;
  /** One sentence under the heading; `code` in backticks. */
  description: string;
  lines: { className: string; text: string }[];
}

const pick = <T extends { prefix: string }>(entries: T[], want: string) =>
  entries.find((e) => e.prefix === want) ?? (entries[0] as T);

const MEDIA_TEXT: Record<string, string> = {
  pc: "On a touch screen.",
  prm: "With reduced motion on.",
  st: "On the first frame.",
};

const COMMON_STATES = ["h", "f", "fv", "a", "d", "fc"];

const sentence = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Every kind of variant the utility takes, each with classes to copy. */
/** The lead under a page's Variants heading, its example built from the utility. */
export const variantsLead = (category: Category, name: string) =>
  `Prefix any class with a variant to apply it only under that condition. Variants stack, as in \`@md:h:${exampleClass(category, name)}\`.`;

export function variantGroups(
  category: Category,
  name: string,
  negative = false,
): VariantGroup[] {
  let util:
    | { prefix: string; values: Record<string, string>; variants?: Variants }
    | undefined;
  try {
    util = categoryGetters[category]?.()[name] as typeof util;
  } catch {
    return [];
  }
  if (!util) return [];

  const base = exampleClass(category, name);
  const v = util.variants ?? {};
  const media = v.mediaQueries ?? [];
  const out: VariantGroup[] = [];

  const widths = media.filter(
    (e) => /min-width/.test(e.value) && !e.prefix.startsWith("c:"),
  );
  if (widths.length) {
    out.push({
      title: "Breakpoints",
      description:
        "Apply a class from a viewport width up. Each breakpoint covers its width & every width above it.",
      lines: widths.map((e) => ({
        className: `@${e.prefix}:${base}`,
        text: `From ${e.value.match(/min-width: ([^)]+)/)?.[1]} up.`,
      })),
    });
  }

  const containers = media.filter((e) => e.prefix.startsWith("c:"));
  if (containers.length) {
    out.push({
      title: "Containers",
      description:
        "Apply a class from a container's width up, not the viewport's. Mark the parent with `ct:is` first.",
      lines: containers.map((e) => ({
        className: `@${e.prefix}:${base}`,
        text: `Container from ${e.value.match(/min-width: ([^)]+)/)?.[1]} up.`,
      })),
    });
  }

  const other = media.filter(
    (e) => !widths.includes(e) && !containers.includes(e),
  );
  if (other.length) {
    out.push({
      title: "Media",
      description:
        "Apply a class when the device or the page matches a condition, or on the first frame an element renders.",
      lines: other.map((e) => ({
        className: `@${e.prefix}:${base}`,
        text: MEDIA_TEXT[e.prefix] ?? `${e.value}.`,
      })),
    });
  }

  const states = v.pseudoClasses ?? [];
  if (states.length) {
    // the common ones first, then the rest in the generator's order
    const first = COMMON_STATES.flatMap((c) =>
      states.filter((e) => e.prefix === c),
    );
    out.push({
      title: "States",
      description:
        "Apply a class only while the element is in a state, such as hovered, focused or checked.",
      lines: [...first, ...states.filter((e) => !first.includes(e))].map(
        (e) => ({ className: `${e.prefix}:${base}`, text: `On ${e.value}.` }),
      ),
    });
  }

  if (v.pseudoElements?.length) {
    out.push({
      title: "Pseudo Elements",
      description:
        "Style a part of the element rather than the element itself, such as its placeholder or the selected text.",
      lines: v.pseudoElements.map((e) => ({
        className: `${e.prefix}::${base}`,
        text: `On ${e.value.replace(/^:+/, "::")}.`,
      })),
    });
  }

  if (v.opacity?.length) {
    const half = pick(v.opacity, "50");
    const steps = v.opacity.map((e) => Number(e.prefix));
    out.push({
      title: "Opacity",
      description: "Add a slash & a step after a color to set its opacity.",
      lines: [
        {
          className: `${base}/${half.prefix}`,
          text: sentence(
            `at ${half.value} opacity, in steps of ${steps[1] - steps[0]}.`,
          ),
        },
      ],
    });
  }

  const numeric = Object.keys(util.values).find(
    (k) => /^\d+$/.test(k) && Number(k) !== 0,
  );
  if (negative && numeric) {
    const key = PREFERRED.find((k) => k in util.values) ?? numeric;
    out.push({
      title: "Negative",
      description: "Put a minus after the colon to negate a value.",
      lines: [
        {
          className: `${util.prefix}:-${key}`,
          text: "A minus after the colon.",
        },
      ],
    });
  }

  return out;
}
