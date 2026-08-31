import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as core from "@yummacss/core";
import { describe, expect, it } from "vitest";
import { rootDir } from "./helpers";

/**
 * A utility that core generates but no page lists is invisible: it works, it is
 * canon, and nobody can find out it exists. That is how the twelve logical
 * border properties went undocumented - nothing failed, so nothing said so.
 *
 * `<Reference>` renders null when `getReferenceData` finds no match, so a typo
 * in `name` costs a section silently too. Both directions are checked here.
 */

const CATEGORIES = {
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

/** Every `category:name` core exposes. */
function coreUtilities(): Set<string> {
  const out = new Set<string>();
  for (const [category, getter] of Object.entries(CATEGORIES)) {
    for (const name of Object.keys(getter())) out.add(`${category}:${name}`);
  }
  return out;
}

function mdxFilesIn(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) mdxFilesIn(full, out);
    else if (entry.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

/** Every `category:name` written in a `<Reference>` anywhere in the content. */
function referenced(): Set<string> {
  const out = new Set<string>();
  for (const file of mdxFilesIn(join(rootDir, "src/content"))) {
    const source = readFileSync(file, "utf-8");
    for (const match of source.matchAll(
      /<Reference\s+category="([^"]+)"\s+name="([^"]+)"/g,
    )) {
      out.add(`${match[1]}:${match[2]}`);
    }
  }
  return out;
}

describe("Reference coverage", () => {
  const inCore = coreUtilities();
  const onPages = referenced();

  it("lists every utility core generates", () => {
    const missing = [...inCore].filter((u) => !onPages.has(u)).sort();
    expect(missing).toEqual([]);
  });

  it("names only utilities that exist, so no section renders empty", () => {
    const unknown = [...onPages].filter((u) => !inCore.has(u)).sort();
    expect(unknown).toEqual([]);
  });
});
