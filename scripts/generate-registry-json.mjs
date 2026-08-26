#!/usr/bin/env node

/** Emit static registry JSON for the `yummaui` CLI under `public/ui/r/`. */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, join } from "node:path";
import { isBlock } from "./lib/registry-blocks.mjs";
import { componentSlugs, splitId } from "./lib/registry-ids.mjs";

const cwd = process.cwd();
const uiDir = join(cwd, "src/registry/ui");
const metaDir = join(cwd, "src/registry/meta");
const contentDir = join(cwd, "src/content/ui");
const outDir = join(cwd, "public/ui/r");

const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"));
const versions = { ...pkg.dependencies, ...pkg.devDependencies };

// React is implied by a React component library.
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
  // Pin deps to the docs build ranges.
  return [...found].sort().map((name) => ({
    name,
    version: versions[name] ?? "latest",
  }));
}

/** `./autocomplete` registry ids referenced by relative imports. */
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

/** Prop schema beside the component file (not shipped with copied source). */
function metaOf(id) {
  const file = join(metaDir, `${id}.json`);
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    // Broken meta should fail the build.
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
const blocks = [];
let orphans = 0;

for (const id of ids) {
  const { component, variant, orphan } = splitId(id, slugs);
  // Orphan registry files match no content page.
  if (orphan) orphans++;

  const source = readFileSync(join(uiDir, `${id}.tsx`), "utf8");

  // component | block | example (prop demo, not installable).
  const kind =
    variant === "base" ? "component" : isBlock(id) ? "block" : "example";

  const entry = {
    id,
    component,
    variant,
    kind,
    // summary / props / children, when the component has a declared API.
    ...(metaOf(id) ?? {}),
    // Next App Router consumers need the directive; Vite ignores it.
    useClient: /^\s*["']use client["']/.test(source),
    dependencies: dependenciesOf(source),
    // Demo files importing their base component (resolved transitively by CLI).
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
        fallback: null,
      });
    }
    const group = components.get(component);
    if (variant === "base") group.base = id;
    // Fallback when a component has no `-base` file.
    else if (!group.fallback) group.fallback = id;

    if (kind === "block") blocks.push({ id, component });
  }
}

// Fall back to first variant when no base file exists.
const index = [...components.values()]
  .sort((a, b) => a.component.localeCompare(b.component))
  .map(({ fallback, ...g }) => ({ ...g, base: g.base ?? fallback }));

writeFileSync(
  join(outDir, "index.json"),
  `${JSON.stringify(
    {
      components: index,
      blocks: blocks.sort((a, b) => a.id.localeCompare(b.id)),
      generated: ids.length,
    },
    null,
    2,
  )}\n`,
);

const missingBase = index.filter((g) => !g.base).length;
const examples = ids.length - index.length - blocks.length - orphans;
console.log(
  `registry json: ${index.length} components, ${blocks.length} blocks, ${examples} examples -> public/ui/r/`,
);
if (orphans) console.log(`  ${orphans} file(s) match no /ui page`);
if (missingBase) console.log(`  ${missingBase} component(s) have no base`);
