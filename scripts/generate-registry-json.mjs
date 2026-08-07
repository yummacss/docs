#!/usr/bin/env node

/**
 * Emits the Yumma UI registry as static JSON under `public/ui/r/`.
 *
 * This is the contract the `yummaui` CLI reads over HTTP, so the CLI needs no
 * copy of the components & the registry never has to move out of this repo.
 * One file per variant plus an index, namespaced under /ui alongside the pages
 * that document them:
 *
 *   /ui/r/index.json        every component, its variants & which one is base
 *   /ui/r/<variant>.json    source, npm dependencies, target path
 *
 * Generated at build time & gitignored: committing 450 JSON files would churn
 * the diff on every component edit for no benefit.
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, join } from "node:path";
import { componentSlugs, splitId } from "./lib/registry-ids.mjs";

const cwd = process.cwd();
const uiDir = join(cwd, "src/registry/ui");
const metaDir = join(cwd, "src/registry/meta");
const contentDir = join(cwd, "src/content/ui");
const outDir = join(cwd, "public/ui/r");

const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"));
const versions = { ...pkg.dependencies, ...pkg.devDependencies };

// React is implied by using a React component library at all, so listing it
// would make every component look heavier than it is.
const IMPLIED = new Set(["react", "react-dom"]);

/** `@base-ui/react/button` -> `@base-ui/react`, `motion/react` -> `motion`. */
function packageName(specifier) {
  if (specifier.startsWith(".") || specifier.startsWith("@/")) return null;
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

function dependenciesOf(source) {
  const found = new Set();
  for (const [, spec] of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    const name = packageName(spec);
    if (!name || IMPLIED.has(name)) continue;
    found.add(name);
  }
  // Pin to the range the docs build against, so a copied component cannot
  // land next to an incompatible major.
  return [...found].sort().map((name) => ({
    name,
    version: versions[name] ?? "latest",
  }));
}

/**
 * `./autocomplete` -> `autocomplete`, when that id is another registry file.
 *
 * A demo file imports its component this way rather than by full path, and
 * the same specifier resolves after `add` copies both files flat into
 * `componentsDir`, so nothing about the import has to change between the
 * docs and a consumer's project.
 */
function registryDependenciesOf(source, id, allIds) {
  const found = new Set();
  for (const [, spec] of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    if (!spec.startsWith("./")) continue;
    const dep = spec.slice(2);
    if (dep !== id && allIds.has(dep)) found.add(dep);
  }
  return [...found].sort();
}

const slugs = componentSlugs(contentDir);

/**
 * The prop schema, if this component has one.
 *
 * Kept beside the component rather than exported from it, because the file is
 * copied verbatim into someone's project and metadata has no business shipping
 * with it. One schema then feeds the docs controls, the props table, the
 * generated snippet & anything else that needs to know the API.
 */
function metaOf(id) {
  const file = join(metaDir, `${id}.json`);
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    // A broken schema should fail the build rather than silently ship a
    // component whose controls have quietly vanished.
    throw new Error(`Invalid registry meta for "${id}": ${error.message}`);
  }
}

function titleOf(slug) {
  const raw = readFileSync(join(contentDir, `${slug}.mdx`), "utf8");
  return raw.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ?? slug;
}

const ids = readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => basename(f, ".tsx"))
  .sort();

if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const idSet = new Set(ids);
const components = new Map();
let orphans = 0;

for (const id of ids) {
  const { component, variant, orphan } = splitId(id, slugs);
  // A registry file no page references. Emitted anyway, but counted so it
  // cannot rot silently.
  if (orphan) orphans++;

  const source = readFileSync(join(uiDir, `${id}.tsx`), "utf8");

  const entry = {
    id,
    component,
    variant,
    // summary / props / children, when the component has a declared API.
    ...(metaOf(id) ?? {}),
    // 294 of 450 carry the directive. A Vite consumer ignores it; a Next App
    // Router consumer needs it, and stripping it would break them.
    useClient: /^\s*["']use client["']/.test(source),
    dependencies: dependenciesOf(source),
    // A demo importing the component it demonstrates, e.g. `autocomplete-inset`
    // importing `autocomplete`. The CLI resolves these transitively, so `add
    // autocomplete-inset` also writes `autocomplete.tsx`.
    registryDependencies: registryDependenciesOf(source, id, idSet),
    files: [
      {
        path: `${id}.tsx`,
        target: `components/ui/${id}.tsx`,
        content: source,
      },
    ],
  };

  writeFileSync(
    join(outDir, `${id}.json`),
    `${JSON.stringify(entry, null, 2)}\n`,
  );

  if (!orphan) {
    if (!components.has(component)) {
      components.set(component, {
        component,
        title: titleOf(component),
        base: null,
        variants: [],
      });
    }
    const group = components.get(component);
    if (variant === "base") group.base = id;
    else group.variants.push(variant);
  }
}

// A group with no `-base` file has nothing for a bare `add <component>` to
// resolve to, so fall back to its first variant rather than failing at runtime.
const index = [...components.values()]
  .sort((a, b) => a.component.localeCompare(b.component))
  .map((g) => ({
    ...g,
    base: g.base ?? `${g.component}-${g.variants[0]}`,
    variants: g.variants.sort(),
  }));

writeFileSync(
  join(outDir, "index.json"),
  `${JSON.stringify({ components: index, generated: ids.length }, null, 2)}\n`,
);

const missingBase = index.filter((g) => !g.base).length;
console.log(
  `registry json: ${ids.length} variants, ${index.length} components -> public/ui/r/`,
);
if (orphans) console.log(`  ${orphans} variant(s) match no /ui page`);
if (missingBase) console.log(`  ${missingBase} component(s) have no base`);
