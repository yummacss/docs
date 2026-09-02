import { normalizeCSS } from "@yummacss/nitro/browser";

// The reset Yumma CSS ships, indexed by selector, so `normalize.mdx` can name a
// rule instead of copying it. `.mjs` so the rehype plugin can import it too.

const norm = (s) => s.replace(/\s+/g, " ").trim();

// Bodies are kept verbatim; only the selector is collapsed, as a lookup key.
const RULES = new Map();
for (const [, selector, body] of normalizeCSS.matchAll(
  /([^{}]+)\{([^{}]*)\}/g,
)) {
  RULES.set(norm(selector), `${norm(selector)} {${body}}`);
}

export function normalizeSelectors() {
  return [...RULES.keys()];
}

export function parseSelectors(attr) {
  return attr.split(";").map(norm).filter(Boolean);
}

// Throws rather than returning nothing: an empty fence is the failure this file
// exists to prevent.
export function rulesFor(selectors) {
  const missing = selectors.filter((s) => !RULES.has(s));
  if (missing.length > 0) {
    throw new Error(
      `normalize: no such rule in the shipped reset: ${missing.join(" | ")}`,
    );
  }
  return selectors.map((s) => RULES.get(s)).join("\n\n");
}

export function fillNormalizeFences(source) {
  return source.replace(
    /```css normalize="([^"]+)"\n```/g,
    (_, attr) => `\`\`\`css\n${rulesFor(parseSelectors(attr))}\n\`\`\``,
  );
}
