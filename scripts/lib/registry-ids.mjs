import { readdirSync } from "node:fs";
import { basename } from "node:path";

/**
 * Splitting a registry id into the component and variant the CLI addresses.
 *
 * `yummaui add` resolves the **component** name against `/ui/r/index.json` and
 * takes the variant as a flag, so `add button-danger` is not a command: it is
 * `add button --variant danger`. The id is only how the registry files are
 * keyed. Two generators and the docs all need the same split, so it lives here
 * rather than being written out three times & drifting.
 */

/** Longest slug first so `checkbox-group` wins over `checkbox`. */
export function componentSlugs(contentDir) {
  return readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => basename(file, ".mdx"))
    .sort((a, b) => b.length - a.length);
}

/**
 * `button-danger` -> `{ component: "button", variant: "danger" }`.
 * `button` -> `{ component: "button", variant: "base" }`.
 *
 * An id matching no page keeps its whole name as the component & is flagged, so
 * a file nobody documents cannot rot silently.
 */
export function splitId(id, slugs) {
  const slug = slugs.find((s) => id === s || id.startsWith(`${s}-`));
  if (!slug) return { component: id, variant: "base", orphan: true };
  return {
    component: slug,
    variant: id === slug ? "base" : id.slice(slug.length + 1),
    orphan: false,
  };
}
