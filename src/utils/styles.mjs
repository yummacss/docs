// A style rewrites a component file: its shape and size defaults and its
// *SHAPES tables. See NOTES.md, "Component API as styles".

export const RADIUS = ["none", "small", "medium", "large", "extra"];

export const STYLES = {
  soft: {
    name: "Soft",
    radius: "large",
    allow: ["small", "medium", "large", "extra"],
    refused: { none: "Soft is rounded. No radius is a square." },
  },
  compact: {
    name: "Compact",
    radius: "small",
    size: "sm",
    allow: ["none", "small", "medium", "large"],
    refused: { extra: "At 30px tall, br:xl reads as a pill." },
  },
  squircle: {
    name: "Squircle",
    radius: "large",
    shape: "squircle",
    allow: ["medium", "large"],
    refused: {
      none: "A squircle with no radius is a square.",
      small: "Too small a radius for the curve to show.",
      extra: "br:3xl on a 36px control reads as a pill.",
    },
  },
};

export const DEFAULT_STYLE = "soft";

const SCALE = ["0", "xs", "sm", "md", "lg", "xl", "xxl", "3xl"];
const SHIFT = { none: -2, small: -2, medium: -1, large: 0, extra: 1 };

// the value a table holds today names the part, and the part bounds the shift
const BOUNDS = [
  { from: ["sm"], min: "xs", max: "md" },
  { from: ["md", "lg"], min: "xs", max: "xl" },
  { from: ["xl", "xxl", "3xl"], min: "sm", max: "3xl" },
];
// a squircle only ever loses radius: past its own it reads as a pill
const SQUIRCLE_MIN = "lg";

export function refusal(style, radius) {
  const entry = STYLES[style];
  if (!entry) return `There is no ${style} style.`;
  if (!RADIUS.includes(radius)) return `There is no ${radius} radius.`;
  if (entry.allow.includes(radius)) return null;
  return entry.refused[radius] ?? `${entry.name} does not take ${radius}.`;
}

function shift(value, radius, bounds) {
  const next = SCALE.indexOf(value) + SHIFT[radius];
  const lo = SCALE.indexOf(bounds.min);
  const hi = SCALE.indexOf(bounds.max);
  return SCALE[Math.min(Math.max(next, lo), hi)];
}

function shiftEntry(line, key, radius) {
  return line.replace(/\bbr:([a-z0-9]+)\b/, (whole, value) => {
    if (!SCALE.includes(value)) return whole;
    const bounds =
      key === "squircle"
        ? { min: SQUIRCLE_MIN, max: value }
        : BOUNDS.find((entry) => entry.from.includes(value));
    return bounds ? `br:${shift(value, radius, bounds)}` : whole;
  });
}

function unionOf(source, type) {
  const found = source.match(new RegExp(`^type ${type} = ([^;]+);`, "m"));
  return found ? [...found[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];
}

export function applyStyle(source, style, radius) {
  const refused = refusal(style, radius);
  if (refused) throw new Error(refused);
  const entry = STYLES[style];

  let out = source.replace(
    /^(const [A-Z_]*SHAPES\b[^=]*= \{\n)([\s\S]*?)(^\};)/gm,
    (_, open, body, close) =>
      open +
      body.replace(
        /^(\s*)(rounded|squircle): ("[^"]*"),$/gm,
        (line, _indent, key) => shiftEntry(line, key, radius),
      ) +
      close,
  );

  const shapes = unionOf(source, "Shape");
  const shape = radius === "none" ? "square" : (entry.shape ?? "rounded");
  if (shapes.includes(shape)) {
    out = out.replace(
      /^(\s*)(shape|iconShape) = "rounded",$/gm,
      `$1$2 = "${shape}",`,
    );
  }

  if (entry.size && unionOf(source, "Size").includes(entry.size)) {
    out = out.replace(/^(\s*)size = "md",$/gm, `$1size = "${entry.size}",`);
  }

  return out;
}
